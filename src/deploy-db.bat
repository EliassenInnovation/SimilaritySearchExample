
@REM @ECHO OFF

SETLOCAL

SET SCRIPT_ROOT=%~dp0
PUSHD "%SCRIPT_ROOT%"

IF /I "%1"=="CLEAN" SET DEPLOY_ACTION=/p:BlockOnPossibleDataLoss=False

REM Start -- Configuration this section Only
CALL config.bat
REM End -- Configuration this section Only 

@REM CALL generate-db.bat

ECHO "Cleanup Database"
%DATALOADER_COMMAND% "--connection-string=%DATABASE_CONNECTION%" "--path=..\data\cleanup" --action=Execute
@IF NOT %ERRORLEVEL%==0 GOTO :error

ECHO "Deploy Database Schema"
dotnet publish ^
--configuration Release ^
/p:TargetServerName=127.0.0.1 ^
/p:TargetDatabaseName=%DATABASE_NAME% ^
/p:TargetUser=%DATABASE_USER% ^
/p:TargetPassword=%DATABASE_PASSWORD% ^
/p:DeployOnPublish=true ^
%DEPLOY_ACTION% %COLLECTION_ASSEMBLY%
@IF NOT %ERRORLEVEL%==0 GOTO :error

ECHO "Deploy Master Data"
%DATALOADER_COMMAND% "--connection-string=%DATABASE_CONNECTION%" "--path=..\data\master-data" --action=Import
@IF NOT %ERRORLEVEL%==0 GOTO :error

ECHO "Deploy Testing Data"
%DATALOADER_COMMAND% "--connection-string=%DATABASE_CONNECTION%" "--path=..\data\testing" --action=Import
@IF NOT %ERRORLEVEL%==0 GOTO :error

GOTO done

:error
SET REAL_ERROR=%ERRORLEVEL%
@ECHO OFF
POPD
ENDLOCAL
EXIT /B %REAL_ERROR%

:done
POPD
ENDLOCAL
EXIT /B 0