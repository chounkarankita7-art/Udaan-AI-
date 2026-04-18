@echo off
title Udaan AI - Stopping Servers...

echo Stopping Udaan AI servers...
echo.

REM Kill all node processes
echo [1/3] Killing all node processes...
taskkill /F /IM node.exe >nul 2>&1

REM Kill all npm processes
echo [2/3] Killing all npm processes...
taskkill /F /IM npm.cmd >nul 2>&1
taskkill /F /IM node.exe >nul 2>&1

REM Kill any processes on specific ports
echo [3/3] Killing processes on ports 3001 and 5173...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":3001"') do taskkill /F /PID %%a >nul 2>&1
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":5173"') do taskkill /F /PID %%a >nul 2>&1

echo.
echo All servers stopped successfully.
echo.
pause
