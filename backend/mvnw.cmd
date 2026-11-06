@REM ----------------------------------------------------------------------------
@REM PlacePilot Maven Wrapper for Windows
@REM ----------------------------------------------------------------------------
@echo off
setlocal

set "MVN_EXEC=mvn.cmd"
where %MVN_EXEC% >nul 2>&1
if %ERRORLEVEL% equ 0 (
    %MVN_EXEC% %*
    exit /b %ERRORLEVEL%
)

set "FALLBACK_MVN=C:\Users\%USERNAME%\.m2\wrapper\dists\apache-maven-3.10.0\2aaba761688b1a6ea5a46e7e5f4d5406ed7a75ee8da95e5e3079863a23461c9b\bin\mvn.cmd"
if exist "%FALLBACK_MVN%" (
    call "%FALLBACK_MVN%" %*
    exit /b %ERRORLEVEL%
)

set "FALLBACK_MVN2=C:\ProgramData\chocolatey\lib\maven\apache-maven-3.9.6\bin\mvn.cmd"
if exist "%FALLBACK_MVN2%" (
    call "%FALLBACK_MVN2%" %*
    exit /b %ERRORLEVEL%
)

echo [ERROR] Maven not found on PATH or standard directories.
exit /b 1

