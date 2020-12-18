!macro customInstall
  WriteRegStr SHCTX "SOFTWARE\RegisteredApplications" "Chocola" "Software\Clients\StartMenuInternet\Chocola\Capabilities"

  WriteRegStr SHCTX "SOFTWARE\Classes\Chocola" "" "Chocola HTML Document"
  WriteRegStr SHCTX "SOFTWARE\Classes\Chocola\Application" "AppUserModelId" "Chocola"
  WriteRegStr SHCTX "SOFTWARE\Classes\Chocola\Application" "ApplicationIcon" "$INSTDIR\Chocola.exe,0"
  WriteRegStr SHCTX "SOFTWARE\Classes\Chocola\Application" "ApplicationName" "Chocola"
  WriteRegStr SHCTX "SOFTWARE\Classes\Chocola\Application" "ApplicationCompany" "Chocola"      
  WriteRegStr SHCTX "SOFTWARE\Classes\Chocola\Application" "ApplicationDescription" "A privacy-focused, extensible and beautiful web browser"      
  WriteRegStr SHCTX "SOFTWARE\Classes\Chocola\DefaultIcon" "DefaultIcon" "$INSTDIR\Chocola.exe,0"
  WriteRegStr SHCTX "SOFTWARE\Classes\Chocola\shell\open\command" "" '"$INSTDIR\Chocola.exe" "%1"'

  WriteRegStr SHCTX "SOFTWARE\Classes\.htm\OpenWithProgIds" "Chocola" ""
  WriteRegStr SHCTX "SOFTWARE\Classes\.html\OpenWithProgIds" "Chocola" ""

  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Chocola" "" "Chocola"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Chocola\DefaultIcon" "" "$INSTDIR\Chocola.exe,0"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Chocola\Capabilities" "ApplicationDescription" "A privacy-focused, extensible and beautiful web browser"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Chocola\Capabilities" "ApplicationName" "Chocola"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Chocola\Capabilities" "ApplicationIcon" "$INSTDIR\Chocola.exe,0"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Chocola\Capabilities\FileAssociations" ".htm" "Chocola"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Chocola\Capabilities\FileAssociations" ".html" "Chocola"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Chocola\Capabilities\URLAssociations" "http" "Chocola"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Chocola\Capabilities\URLAssociations" "https" "Chocola"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Chocola\Capabilities\StartMenu" "StartMenuInternet" "Chocola"
  
  WriteRegDWORD SHCTX "SOFTWARE\Clients\StartMenuInternet\Chocola\InstallInfo" "IconsVisible" 1
  
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Chocola\shell\open\command" "" "$INSTDIR\Chocola.exe"
!macroend
!macro customUnInstall
  DeleteRegKey SHCTX "SOFTWARE\Classes\Chocola"
  DeleteRegKey SHCTX "SOFTWARE\Clients\StartMenuInternet\Chocola"
  DeleteRegValue SHCTX "SOFTWARE\RegisteredApplications" "Chocola"
!macroend