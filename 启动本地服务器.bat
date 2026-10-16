@echo off
chcp 65001 >nul
title 花瓶姑娘怪谈 · 本地服务器
cd /d "%~dp0"

echo.
echo   花瓶姑娘怪谈 · 本地预览服务器
echo   ================================
echo.

set PY=
for %%P in (
  "C:\Users\34104\.dsh\dsh-runtimes\dsh-primary-runtime\dependencies\python\python.exe"
) do if exist %%P set PY=%%P

if "%PY%"=="" (
  where python >nul 2>nul && set PY=python
)
if "%PY%"=="" (
  where py >nul 2>nul && set PY=py
)

if "%PY%"=="" (
  echo   [错误] 找不到 Python。
  echo.
  echo   没有 Python 也能预览，只是要装个浏览器插件；
  echo   或者直接用 Netlify Drop 传到网上看（见 部署说明.md）。
  echo.
  pause
  exit /b 1
)

echo   正在启动服务器 ...
echo   地址： http://127.0.0.1:8899/
echo.
echo   关掉这个黑窗口就是停止服务器。
echo.

start "" "http://127.0.0.1:8899/"
"%PY%" -m http.server 8899 --bind 127.0.0.1

pause
