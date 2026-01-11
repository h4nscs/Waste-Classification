from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image, UnidentifiedImageError
import torch
import torch.nn as nn
import torchvision.transforms as transforms
import torchvision.models as models
import numpy as np
import io
import os
from pathlib import Path

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

CLASS_NAMES = [
    "metal",
    "glass",
    "biological",
    "paper",
    "battery",
    "trash",
    "cardboard",
    "shoes",
    "clothes",
    "plastic"
]

NUM_CLASSES = len(CLASS_NAMES)
DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")
MODEL_PATH = "best_resnet50_model_2.pth"

model = None

# Mapping from model output labels to desired labels (user-provided permutation)
# e.g. if model predicts 'plastic' we want to report 'trash'
CLASS_MAPPING = {
    "metal": "battery",
    "glass": "biological",
    "biological": "cardboard",
    "paper": "clothes",
    "battery": "glass",
    "trash": "metal",
    "cardboard": "paper",
    "shoes": "plastic",
    "clothes": "shoes",
    "plastic": "trash",
}

def load_model():
    """Load ResNet50 model from checkpoint"""
    global model
    try:
        # Load a ResNet50 and replace the final fc layer to match NUM_CLASSES
        model = models.resnet50(pretrained=False)
        model.fc = nn.Linear(model.fc.in_features, NUM_CLASSES)

        if os.path.exists(MODEL_PATH):
            checkpoint = torch.load(MODEL_PATH, map_location=DEVICE)
            if isinstance(checkpoint, dict) and 'model_state_dict' in checkpoint:
                model.load_state_dict(checkpoint['model_state_dict'])
            else:
                model.load_state_dict(checkpoint)

        model = model.to(DEVICE)
        model.eval()
        print("Model loaded successfully")
    except Exception as e:
        print(f"Error loading model: {e}")
        model = None

def get_transforms():
    """Get image preprocessing transforms"""
    return transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize(
            mean=[0.485, 0.456, 0.406],
            std=[0.229, 0.224, 0.225]
        )
    ])

@app.on_event("startup")
async def startup_event():
    load_model()

@app.get("/health")
async def health_check():
    return {"status": "healthy", "model_loaded": model is not None}

@app.post("/classify")
async def classify_image(file: UploadFile = File(...)):
    """Classify trash image"""
    if model is None:
        raise HTTPException(status_code=503, detail="Model not loaded")

    try:
        if not file.content_type.startswith("image/"):
            raise HTTPException(status_code=400, detail="File must be an image")

        contents = await file.read()
        if not contents:
            raise HTTPException(status_code=400, detail="Empty file uploaded")

        try:
            image = Image.open(io.BytesIO(contents))
            image = image.convert("RGB")
        except UnidentifiedImageError:
            print(f"UnidentifiedImageError: content_type={file.content_type}, size={len(contents)}")
            raise HTTPException(status_code=400, detail="Uploaded file is not a valid image")
        except Exception as e:
            print(f"Error opening image: {e}")
            raise HTTPException(status_code=500, detail="Error opening uploaded image")

        transform = get_transforms()
        tensor = transform(image).unsqueeze(0).to(DEVICE)

        with torch.no_grad():
            outputs = model(tensor)
            probabilities = torch.nn.functional.softmax(outputs, dim=1)
            confidence, predicted = torch.max(probabilities, 1)

        class_idx = predicted.item()
        confidence_percent = float(confidence.item()) * 100
        original_predicted = CLASS_NAMES[class_idx]

        # Translate predicted class using user-provided mapping
        translated_predicted = CLASS_MAPPING.get(original_predicted, original_predicted)

        # Build translated all_classes dict (preserve original probabilities, but map keys)
        all_classes_translated = {}
        for i in range(NUM_CLASSES):
            orig_name = CLASS_NAMES[i]
            mapped_name = CLASS_MAPPING.get(orig_name, orig_name)
            all_classes_translated[mapped_name] = round(float(probabilities[0][i].item()) * 100, 2)

        return {
            "predicted_class": translated_predicted,
            "confidence": round(confidence_percent, 2),
            "all_classes": all_classes_translated
        }

    except HTTPException as e:
        raise e
    except Exception as e:
        print(f"Classification error: {e}")
        raise HTTPException(status_code=500, detail="Error processing image")

@app.get("/classes")
async def get_classes():
    """Get list of trash classes"""
    return {"classes": CLASS_NAMES}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
