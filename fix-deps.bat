@echo off
NET SESSION >nul 2>&1
if %errorLevel% neq 0 (
    echo This script needs admin rights. Please run as administrator.
    pause
    exit
)

echo Starting cleanup process...

:: Stop any running development servers
echo Stopping running processes...
taskkill /F /IM node.exe /T >nul 2>&1

:: Wait for processes to fully stop
timeout /t 5 /nobreak > nul

:: Try to remove .vite folder first
echo Removing .vite folder...
cd node_modules 2>nul
if exist .vite (
    attrib -r -s -h .vite /s /d
    rmdir /s /q .vite
)
cd ..

:: Remove node_modules with attrib command first
echo Removing node_modules...
attrib -r -s -h node_modules /s /d
rmdir /s /q node_modules

:: Delete package-lock and yarn.lock if they exist
echo Removing lock files...
if exist package-lock.json del /f /q package-lock.json
if exist yarn.lock del /f /q yarn.lock

:: Clear NPM cache
echo Clearing NPM cache...
call npm cache clean --force

:: Wait a moment
timeout /t 2 /nobreak > nul

:: Reinstall everything
echo Reinstalling dependencies...
call npm install

echo.
echo Cleanup complete! Please close this window and:
echo 1. Close VS Code completely
echo 2. Reopen VS Code
echo 3. Run 'npm run dev'
echo.
pause
