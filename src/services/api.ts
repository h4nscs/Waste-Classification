import { ClassificationResult } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export async function classifyImage(file: File): Promise<ClassificationResult> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_URL}/classify`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || 'Classification failed');
  }

  return response.json();
}

export async function getClasses(): Promise<string[]> {
  const response = await fetch(`${API_URL}/classes`);
  if (!response.ok) {
    throw new Error('Failed to fetch classes');
  }
  const data = await response.json();
  return data.classes;
}

export async function healthCheck(): Promise<boolean> {
  try {
    const response = await fetch(`${API_URL}/health`);
    return response.ok;
  } catch {
    return false;
  }
}
