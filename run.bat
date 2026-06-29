@echo off
cd /d "%~dp0"
start "HETS Prototype" http://localhost:8000/
python -m http.server 8000
