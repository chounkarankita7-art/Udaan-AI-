@echo off
title Udaan AI - Starting Servers...

echo Starting Udaan AI servers...
echo.

REM Kill any existing processes on the ports to avoid conflicts
echo Checking for existing processes on ports 3001 and 5173...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":3001"') do taskkill /F /PID %%a >nul 2>&1
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":5173"') do taskkill /F /PID %%a >nul 2>&1

REM Start Backend Server in a new window
echo [1/2] Starting Backend Server on port 3001...
start "Udaan AI - Backend" cmd /k "cd /d "%~dp0" && node --env-file=".env" artifacts/api-server/dist/index.mjs"

REM Start Frontend Server in a new window
echo [2/2] Starting Frontend Server on port 5173...
start "Udaan AI - Frontend" cmd /k "cd /d "%~dp0artifacts\udaan-ai" && npm run dev"

echo.
echo Both servers are starting in separate windows...
echo Backend:  http://localhost:3001
echo Frontend: http://localhost:5173
echo.
echo Press any key to close this window (servers will continue running in their windows)...
pause
