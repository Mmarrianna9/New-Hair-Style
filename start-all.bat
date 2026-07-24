@echo off
TITLE New Hair Style - Avvio Totale Progetto
COLOR 0A

echo ==========================================
echo    AVVIO SISTEMA NEW HAIR STYLE (TREVISO)
echo ==========================================

echo [1/3] Avvio Backend (Spring Boot)...
cd backend
start cmd /k "./mvnw spring-boot:run"
cd ..

echo [2/3] Avvio Frontend (React / Vite)...
cd frontend
start cmd /k "npm run dev"
cd ..

echo [3/3] Avvio Chatbot (Python)...
cd chatbot
start cmd /k "py main.py"
"py -m streamlit run main.py"
cd ..

echo ==========================================
echo   TUTTI I SERVIZI SONO STATI AVVIATI!
echo ==========================================
pause