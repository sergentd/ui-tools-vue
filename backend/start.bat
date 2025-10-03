@echo off
echo Starting Pocketbase for UI Tools Atelier...
echo.
echo Admin UI will be available at: http://localhost:8090/_/
echo API will be available at: http://localhost:8090/api/
echo.

pocketbase.exe serve --http="0.0.0.0:8090"
