Imports VisualSoft.Suite80.BE
Imports System.Web.Services
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Comun.Utilitarios
Imports Utilitario
Imports System.Data
Imports System.Web.Script.Serialization
Imports System.IO
Imports VisualSoft.PCSistelMovil.General.BE

Imports VisualSoft.PCSistelMovil.Solicitudes.BE
Imports VisualSoft.PCSistelMovil.Solicitudes.BL

Partial Class P_Movil_Conciliar_ValidarNota
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim Detalle As BL_MOV_ConciliaNota = Nothing
        ''Dim Solicitud As BL_MOV_Solicitud = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)

            If IsNothing(oUsuario) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    ttgInfoAdjunto.Mensaje = "El correo a enviar de la nota, no incluirá el archivo adjunto."
                    Dim oCultura As ENT_GEN_Cultura = CType(Session("Cultura"), ENT_GEN_Cultura)
                    Dim fecha As Date = Now.Date

                    hdfIdUsuario.Value = oUsuario.P_inCod
                    hdfUsuario.Value = oUsuario.vcNom
                    hdfPeriodo.Value = Request.QueryString("Periodo")
                    hdfCodEnlace.Value = Request.QueryString("Enlace") & ""
                    hdfEsEnlace.Value = Request.QueryString("EsEnlace") & ""
                    hdfOperador.Value = Request.QueryString("Operador") & ""

                    odsNotas.SelectParameters("Periodo").DefaultValue = hdfPeriodo.Value
                    odsNotas.SelectParameters("vcFecCor").DefaultValue = oCultura.vcFecCor
                    odsNotas.SelectParameters("vcHorCor").DefaultValue = oCultura.vcHorCor
                    odsNotas.SelectParameters("inCliente").DefaultValue = oUsuario.IdCliente
                    odsNotas.SelectParameters("CodEnlace").DefaultValue = hdfCodEnlace.Value
                    odsNotas.SelectParameters("Operador").DefaultValue = hdfOperador.Value
                    'dlNotas.DataBind()

                    Dim Concilia As BL_MOV_Concilia = New BL_MOV_Concilia(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    Dim dsCierrePeriodo As DataSet = Concilia.ObtenerCierrePeriodo(hdfPeriodo.Value, hdfOperador.Value)
                    Concilia.Dispose()
                    hdfCerrado.Value = "0"
                    If dsCierrePeriodo IsNot Nothing AndAlso dsCierrePeriodo.Tables.Count > 0 Then
                        If dsCierrePeriodo.Tables(0).Rows.Count > 0 Then
                            If dsCierrePeriodo.Tables(0).Rows(0)("Tipo").ToString() <> "OPEN" Then
                                hdfCerrado.Value = "1"
                            End If
                        End If
                    End If



                    Detalle = New BL_MOV_ConciliaNota(oUsuario.IdCliente)
                    Detalle.InsertarVisto(hdfPeriodo.Value, oUsuario.P_inCod, oUsuario.vcUsu, hdfCodEnlace.Value, hdfOperador.Value)
                    ''Solicitud = New BL_MOV_Solicitud(oUsuario.IdCliente)
                    ''Solicitud.RegistrarSeguimientoVisto(Convert.ToInt32(hdfIdSolicitud.Value), oUsuario.P_inCod, oUsuario.vcUsu)
                End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, oUsuario.CaracteristicaUsuario.vcTem)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Detalle IsNot Nothing Then Detalle.Dispose()
            ''If Solicitud IsNot Nothing Then Solicitud.Dispose()
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function RegistrarDetalle(ByVal Periodo As String, ByVal vcDetalle As String,
                                            ByVal vcFileName As String, ByVal vcEnviaCorreo As String, CodEnlace As String, Operador As String) As List(Of String)
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
            Dim oNota As ENT_MOV_ConciliaNota = New ENT_MOV_ConciliaNota()
            Dim Detalle As BL_MOV_ConciliaNota = New BL_MOV_ConciliaNota(oUsuario.IdCliente)
            Dim vcExtension = ""
            Dim deLength As Decimal = 0
            Dim lstRespuesta As List(Of String) = New List(Of String)

            oNota.Periodo = Periodo
            oNota.Detalle = (vcDetalle.Replace("&lt;", "<")).Replace("&gt;", ">")
            oNota.EsTecnico = True
            oNota.RegistradoPor = oUsuario.vcNom

            If vcFileName <> "" Then
                Dim CarpetaDominio As String = UtilitarioWeb.ObtenerCarpetaDominio(HttpContext.Current.Server.MapPath("~") + "//P_Movil//Conciliar//Temporal//", "//")
                Dim vcFilePath = HttpContext.Current.Server.MapPath("~") + "//P_Movil//Conciliar//Temporal" + CarpetaDominio + "//" + vcFileName
                Dim vcName = vcFileName.Substring(0, vcFileName.LastIndexOf("."))
                vcExtension = vcFileName.Substring(vcFileName.LastIndexOf(".") + 1)

                Dim fs As New FileStream(vcFilePath, FileMode.Open, FileAccess.Read)
                deLength = fs.Length / 1024
                Dim byFileData As Byte() = New Byte(fs.Length - 1) {}
                fs.Read(byFileData, 0, System.Convert.ToInt32(fs.Length))
                fs.Close()

                oNota.Archivo = byFileData
                oNota.Nombre = vcName
                oNota.TamanioKB = deLength
            End If

            lstRespuesta.Add((DateTime.Now.ToString(oCultura.vcFecCor + " " + oCultura.vcHorCor)).ToUpper().Replace(".", ""))

            Dim biEnviaCorreo As Boolean = False
            If vcEnviaCorreo = "1" Then biEnviaCorreo = True

            Dim intDetalle = Detalle.Insertar(oNota, vcExtension, oUsuario.P_inCod, biEnviaCorreo, CodEnlace, Operador)
            Detalle.Dispose()

            lstRespuesta.Add(intDetalle.ToString())
            lstRespuesta.Add(deLength.ToString("N4") + " KB")

            Return lstRespuesta

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    <WebMethod()>
    Public Shared Function DescargarArchivoBD(ByVal inIdDet As Integer, ByVal Operador As String) As String
        Dim CarpetaDominio As String = UtilitarioWeb.ObtenerCarpetaDominio(HttpContext.Current.Server.MapPath("~") + "\P_Movil\Conciliar\Temporal\", "\")

        Dim Resultado As String = ""
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
            Dim Detalle As BL_MOV_ConciliaNota = New BL_MOV_ConciliaNota(oUsuario.IdCliente)
            Dim vcNombre As String = ""

            Dim dtDetalle As DataTable = Detalle.Mostrar(-1, oCultura.vcFecCor, oCultura.vcHorCor, inIdDet, "", Operador)
            Detalle.Dispose()

            Dim vcFilePath = ""

            If Not IsNothing(dtDetalle.Rows(0)("Archivo")) Then
                vcFilePath = HttpContext.Current.Server.MapPath("~") + "\P_Movil\Conciliar\Temporal" + CarpetaDominio + "\" + dtDetalle.Rows(0)("NomArc").ToString()
                Dim byFileData As Byte() = dtDetalle.Rows(0)("Archivo")
                File.WriteAllBytes(vcFilePath, byFileData)
                Resultado = vcFilePath
            End If

            Return Resultado

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ActualizarVisto(ByVal Periodo As String, ByVal CodEnlace As String, ByVal Operador As String) As String
        Dim Detalle As BL_MOV_ConciliaNota = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Detalle = New BL_MOV_ConciliaNota(oUsuario.IdCliente)
            Detalle.InsertarVisto(Periodo, oUsuario.P_inCod, oUsuario.vcUsu, CodEnlace, Operador)
            Return "OK"
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Detalle IsNot Nothing Then Detalle.Dispose()
        End Try
    End Function

End Class