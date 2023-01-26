@echo off
mode con: cols=65 lines=50

:: loop running the rm command
:loop
deno run --no-check --allow-all script.ts

:: wait for user click to reload
pause

goto loop
