@echo off
echo ========================================
echo MCP Hub - Docker Setup Script
echo ========================================
echo.

REM Check if Docker is running
docker info >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Docker is not running!
    echo Please start Docker Desktop and try again.
    echo.
    pause
    exit /b 1
)

echo [OK] Docker is running
echo.

REM Copy environment file if it doesn't exist
if not exist .env (
    echo [SETUP] Creating .env file from template...
    copy .env.example .env
    echo.
    echo [ACTION REQUIRED] Please edit .env file with your configuration!
    echo Press any key to continue after editing...
    pause >nul
    echo.
)

echo [INFO] Starting core services (MongoDB and Redis)...
echo This may take a few minutes on first run...
echo.

docker compose up -d mongodb redis

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Services Running:
echo  - MongoDB: localhost:27017
echo  - Redis: localhost:6379
echo.
echo NOTE: Backend, Agent, and Frontend services will be
echo available once your team adds the code.
echo.
echo Useful Commands:
echo  docker compose ps              - List running containers
echo  docker compose logs mongodb    - View MongoDB logs
echo  docker compose logs redis      - View Redis logs
echo  docker compose down            - Stop all services
echo  docker compose up -d           - Start all services
echo.
pause