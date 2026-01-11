@echo off
setlocal

REM masuk ke folder tempat file .bat berada
cd /d "%~dp0"

echo starting frontend...
start cmd /k "npm run dev"

echo starting backend...
cd /d "%~dp0backend"
start cmd /k "powershell -ExecutionPolicy Bypass -Command .\.venv\Scripts\Activate.ps1; pip install -r requirements.txt; python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000"

echo all services started.
pause
