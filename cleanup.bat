@echo off
echo Cleaning up project...

:: Kill any running Node processes
taskkill /F /IM node.exe > nul 2>&1

:: Wait a moment
timeout /t 2 /nobreak > nul

:: Remove problematic directories
if exist "node_modules\.vite" (
    rd /s /q "node_modules\.vite"
)
if exist "node_modules" (
    rd /s /q "node_modules"
)
if exist "package-lock.json" (
    del /f /q package-lock.json
)

:: Clear npm cache
call npm cache clean --force

:: Reinstall dependencies
call npm install

echo Cleanup complete! You can now run 'npm run dev'
pause
