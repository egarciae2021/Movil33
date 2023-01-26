Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports System.Web.Services
Imports System.Data
Imports System.Net.Mail
Imports VisualSoft.Comun.Utilitarios
Imports System.IO
Imports Utilitario
Imports System.Web.Script.Services

Partial Class P_Movil_Administrar_Adm_CargarArchivo
    Inherits System.Web.UI.Page

    Protected Sub form1_Load(sender As Object, e As System.EventArgs) Handles form1.Load
        Try

            Dim Script As String = "var mostrarAlerta = false; var textoAlerta = ''; "
            Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey1", Script, True)

            hdfTipoSolicitud.Value = Request.QueryString("TipSol")

            'NUEVAS VALIDACIONES PARA ADJUNTAR ARCHIVOS (WAPUMAYTA 12-09-2014)
            hdfCanMax.Value = Request.QueryString("CanMax")
            hdfExtPer.Value = Request.QueryString("ExtPer")
            hdfTamTip.Value = Request.QueryString("TamTip")
            hdfTamMax.Value = Request.QueryString("TamMax")
            hdfTamMed.Value = Request.QueryString("TamMed")
            'FIN NUEVAS VALIDACIONES

            UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub

    Protected Sub btnSubir_Click(sender As Object, e As System.EventArgs) Handles btnSubir.Click
        Try

            'Dim oArchivoAdjunto As New ENT_MOV_ArchivoAdjunto
            'Dim ArchivoAdjunto As BL_MOV_ArchivoAdjunto = new BL_MOV_ArchivoAdjunto(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            'Dim listaArchivos As New List(Of ENT_MOV_ArchivoAdjunto)
            'Dim listaAdjuntosUbicacion As New List(Of String)
            hdfNombreAdjungo.Value = ""
            hdfUbicacionAdjunto.Value = ""
            If fuAdjuntar.PostedFile.FileName = "" Then
                Dim Script As String = "mostrarAlerta = true; textoAlerta = 'No ha seleccionado ningún archivo'; "
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", Script, True)
                Exit Sub
            Else

                Dim CarpetaDominio As String = UtilitarioWeb.ObtenerCarpetaDominio(Server.MapPath("~/P_Movil/Administrar/Temporal/"), "/")

                hdfNombreTemporarl.Value = Guid.NewGuid().ToString().Replace("-", "")
                Dim s As Stream = fuAdjuntar.PostedFile.InputStream
                Dim filePath As String = fuAdjuntar.PostedFile.FileName
                Dim fileName As String = Path.GetFileName(filePath)

                Dim fileLen As Integer = fuAdjuntar.PostedFile.ContentLength
                Dim ext As String = Path.GetExtension(fileName).Substring(1)

                If fileLen < 1024 Then 'BYTE
                    hdfTamañoAdjunto.Value = "1 Kb"
                ElseIf fileLen >= 1024 And fileLen < 1048576 Then 'KBYTE
                    hdfTamañoAdjunto.Value = Decimal.Round(Convert.ToDecimal(fileLen) / 1024, 2) & " Kb"
                Else 'MBYTE
                    hdfTamañoAdjunto.Value = Decimal.Round(Convert.ToDecimal(fileLen) / 1048576, 2) & " Mb"
                End If

                Dim br As New BinaryReader(s)
                Dim bytes As Byte() = br.ReadBytes(s.Length)

                Dim binairyData(fileLen) As Byte
                'Dim nTemp As String = hdfNombreTemporarl.Value & "--" & fileName
                Dim nTemp As String = hdfNombreTemporarl.Value & "--" & hdfTamañoAdjunto.Value & "--" & fileName
                'validar tamaño de ruta de archivo
                If (Server.MapPath("~/P_Movil/Administrar/Temporal" + CarpetaDominio + "/File").Length + nTemp.Length > 248) Then
                    Dim Script As String = "mostrarAlerta = true; textoAlerta = 'La ruta de acceso especificada o el nombre de archivo (o ambos) son demasiado largos. El nombre de archivo completo debe ser inferior a 260 caracteres y el nombre del directorio debe ser inferior a 248.'; "
                    Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", Script, True)
                    Exit Sub
                End If
                Dim strfn As String = Server.MapPath("~/P_Movil/Administrar/Temporal" + CarpetaDominio + "/File" & nTemp)
                Dim n1 As Integer = s.Read(binairyData, 0, fileLen)
                Dim n2 As Integer = s.Read(bytes, 0, fileLen)


                'validaciones por tipo de solicitud
                Dim adjGrabar As Boolean = True
                Dim msgValid As String = String.Empty
                Dim lstAdjuntosTemporal As New List(Of ENT_MOV_ArchivoAdjunto)
                lstAdjuntosTemporal = CType(Session("ArchisoAdjuntosNuevo"), List(Of ENT_MOV_ArchivoAdjunto))

                'validar cantidad maximoa de adjuntos
                If hdfCanMax.Value <> "0" And lstAdjuntosTemporal.Count = hdfCanMax.Value Then 'cantidad limite permitida alcanzada
                    msgValid = "Ha llegado al límite de archivos adjuntos permitidos."
                    adjGrabar = False
                End If
                'extensiones permitidas
                If adjGrabar AndAlso hdfExtPer.Value <> "" Then 'existe lista de extensiones permitidas
                    Dim lstExtensionesPermitidas As List(Of String) = Split(hdfExtPer.Value, ",").ToList()
                    If lstExtensionesPermitidas.IndexOf(ext) = -1 Then 'extension de archivos no está incluida en las extensiones permitidas
                        msgValid = "La extensión del archivo no está permitida actualmente."
                        adjGrabar = False
                    End If
                End If
                'tamaño maximo de archivo
                If adjGrabar AndAlso hdfTamTip.Value <> "" AndAlso hdfTamMax.Value <> "0" AndAlso hdfTamMed.Value <> "" Then 'existe datos para tipo,tamaño maximo y medida
                    'tipo de validación - t=total; i=individual;
                    Dim tamMaxBytes As Integer = -1
                    Select Case hdfTamMed.Value.ToUpper()
                        Case "KB"
                            tamMaxBytes = Convert.ToDecimal(hdfTamMax.Value) * 1024
                        Case "MB"
                            tamMaxBytes = Convert.ToDecimal(hdfTamMax.Value) * 1024 * 1024
                        Case "GB"
                            tamMaxBytes = Convert.ToDecimal(hdfTamMax.Value) * 1024 * 1024 * 1024
                        Case Else
                            tamMaxBytes = -1
                    End Select
                    If hdfTamTip.Value = "i" Then 'validación de archivo de manera individual
                        If fileLen > tamMaxBytes Then
                            msgValid = "El tamaño del archivo desborda el límite permitido por archivo de " + hdfTamMax.Value + " " + hdfTamMed.Value + "."
                            adjGrabar = False
                        End If
                    ElseIf hdfTamTip.Value = "t" Then 'validación del total de adjutnos
                        Dim tamañoAdjuntosActuales As Integer = 0
                        tamañoAdjuntosActuales = (From oAdj In lstAdjuntosTemporal Select oAdj.binData.Length).Sum()
                        If tamañoAdjuntosActuales + fileLen > tamMaxBytes Then
                            msgValid = "El tamaño del archivo desborda el límite permitido del total de archivos " + hdfTamMax.Value + " " + hdfTamMed.Value + "."
                            adjGrabar = False
                        End If
                    End If
                End If

                If adjGrabar Then
                    Dim nowDate As DateTime = Date.Now
                    Dim nomTemp As String = nowDate.Minute.ToString + nowDate.Second.ToString + nowDate.Millisecond.ToString
                    'agregar a session archivos adjuntos temmporales
                    Dim oAdjuntoTemporal As New ENT_MOV_ArchivoAdjunto()
                    oAdjuntoTemporal.vcNomAdj = fileName
                    oAdjuntoTemporal.vcExtAdj = ext
                    oAdjuntoTemporal.binData = bytes
                    oAdjuntoTemporal.F_vcCodSol = -1
                    oAdjuntoTemporal.P_inIdAdj = nomTemp
                    lstAdjuntosTemporal.Add(oAdjuntoTemporal)
                    Session("ArchisoAdjuntosNuevo") = lstAdjuntosTemporal

                    'escribir archivo temporal
                    Dim fs As FileStream = New FileStream(strfn, FileMode.OpenOrCreate, FileAccess.Write)
                    fs.Write(bytes, 0, bytes.Length)
                    fs.Flush()
                    fs.Close()
                    'enviar datos a padre
                    hdfNombreAdjungo.Value = fileName
                    hdfUbicacionAdjunto.Value = nTemp
                    hdfNombreTemporarl.Value = nomTemp
                Else
                    Dim Script As String = "mostrarAlerta = true; textoAlerta = '" + msgValid + "'; "
                    Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", Script, True)
                    Exit Sub
                End If

            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub

End Class
