@echo off
DEL "P_Movil\Administrar\Distribucion\*.*" /Q > NUL
DEL "P_Movil\Administrar\Temporal\Incidencias\*.*"  /Q > NUL
DEL "P_Movil\Administrar\Temporal\Solicitudes\*.*" /Q > NUL
DEL "P_Movil\Facturacion\Exportacion\Cronograma\*.*" /Q > NUL
DEL "P_Movil\Facturacion\Exportacion\EstadoCuenta\*.*" /Q > NUL
DEL "P_Movil\Facturacion\Importacion\*.*" /Q > NUL
DEL "P_Movil\Importacion\*.*" /Q > NUL
DEL "LogErrores\*.*" /Q > NUL
DEL "Images\ModeloDispositivo\*.*" /Q > NUL
DEL "Images\Factura\*.*" /Q > NUL
DEL "Images\Campanas\Banner\Servicio\*.*" /Q > NUL
DEL "Images\Campanas\ContratosOperador\*.*" /Q > NUL
DEL "Images\Temporal\*.*" /Q > NUL
DEL "General\Administrar\Proceso\Archivos\*.*" /Q > NUL
DEL "General\Uploads\DownloadedFiles\*.*" /Q > NUL
DEL "Images\Campanas\Anuncio\*.*" /Q > NUL
xcopy VisualSoft\Leeme.txt P_Movil\Administrar\Distribucion  > NUL
xcopy VisualSoft\Leeme.txt P_Movil\Administrar\Temporal\Incidencias > NUL
xcopy VisualSoft\Leeme.txt P_Movil\Administrar\Temporal\Solicitudes > NUL
xcopy VisualSoft\Leeme.txt P_Movil\Facturacion\Exportacion\Cronograma > NUL
xcopy VisualSoft\Leeme.txt P_Movil\Facturacion\Exportacion\EstadoCuenta > NUL
xcopy VisualSoft\Leeme.txt P_Movil\Importacion > NUL
xcopy VisualSoft\Leeme.txt P_Movil\Facturacion\Importacion > NUL
xcopy VisualSoft\Leeme.txt LogErrores > NUL
xcopy VisualSoft\Leeme.txt Images\ModeloDispositivo > NUL
xcopy VisualSoft\Leeme.txt Images\Factura > NUL
xcopy VisualSoft\Leeme.txt Images\Campanas\Banner\Servicio > NUL
xcopy VisualSoft\Leeme.txt Images\Campanas\ContratosOperador > NUL
xcopy VisualSoft\Leeme.txt Images\Temporal > NUL
xcopy VisualSoft\Leeme.txt General\Administrar\Proceso\Archivos > NUL
xcopy VisualSoft\Leeme.txt General\Uploads\DownloadedFiles > NUL
xcopy VisualSoft\web.config Images\Campanas\Anuncio > NUL
