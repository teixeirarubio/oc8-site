@echo off
cd /d C:\Users\user\Desktop\oc8-site
echo.
echo Publicando site OC8...
echo.
git add .
git commit -m "Atualizacao %date% %time%"
git push origin main
echo.
echo Pronto! Site publicado em oc8.com.br em ~30 segundos.
echo.
pause
