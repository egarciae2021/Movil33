Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports System.Data
Imports System.IO
Imports CompCorreo

Partial Class Common_Page_Adm_Correo
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Try
            If Not IsPostBack Then
                Dim Tipo As String = Request.QueryString("Tipo")
                Dim SubTipo As String = Request.QueryString("SubTipo")
                Dim NumCriterio As String = Request.QueryString("NumCriterio")
                Dim Detalle As String = Request.QueryString("Detalle")
                Dim Valor As String = Request.QueryString("Valor")

                hdfCod.Value = Valor
                hdfTipo.Value = Tipo

                btnEnviar.Style("display") = "none"

                Select Case Tipo
                    Case 1 'Factura
                        txtAsunto.Text = "Factura"
                        txtDestinatarios.Text = ""
                        txtMensaje.Text = "Envio de factura"
                End Select
            End If
            UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub

    Protected Sub btnEnviar_Click(ByVal sender As Object, ByVal e As System.EventArgs) Handles btnEnviar.Click
        Try
            GenerarFactura(hdfCod.Value, hdfTipo.Value)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub

    Private Sub GenerarFactura(ByVal inCodFac As Integer, ByVal Tipo As String)
        ''Dim Factura As BL_MOV_Factura = Nothing
        ''Dim Cliente As BL_GEN_Cliente = Nothing
        ''Dim CarpetaDominio As String = UtilitarioWeb.ObtenerCarpetaDominio(Server.MapPath("~/Images/Factura/"), "/")

        ''Try

        ''    Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
        ''    Factura = New BL_MOV_Factura(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        ''    Cliente = New BL_GEN_Cliente(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        ''    Dim dictCampoFormula As New Dictionary(Of String, String)
        ''    Dim vcReporte As String = ""
        ''    Dim vcSubReporte As String = ""
        ''    Dim vcEsquema As String = ""
        ''    Dim vcEsquema1 As String = ""
        ''    Dim vcEsquema2 As String = ""
        ''    Dim vcEsquemaSubReport As String = ""
        ''    Dim dsDatos As New DataSet
        ''    Dim dsDatosSubReporte As New DataSet
        ''    Dim dtCliente As DataTable = Nothing

        ''    vcReporte = "../../P_Movil/Administrar/Reportes/Adm_Rpt_Factura.rpt"
        ''    vcSubReporte = "Adm_Rpt_FacturaEmpleado"
        ''    vcEsquema = "GEN_s_Cliente_PorCodigo"
        ''    vcEsquema1 = "MOV_s_Factura"
        ''    vcEsquema2 = "MOV_s_FacturaDetalle"
        ''    vcEsquemaSubReport = "MOV_s_FacturaEmpleado"

        ''    crConsulta.Report.FileName = vcReporte

        ''    Dim ds As DataSet = Factura.ListarReporte(inCodFac)
        ''    dtCliente = Cliente.Mostrar(oUsuario.IdCliente)

        ''    dsDatos.Tables.Add(ds.Tables(0).Copy)
        ''    dsDatos.Tables(0).TableName = vcEsquema1
        ''    dsDatos.Tables.Add(ds.Tables(1).Copy)
        ''    dsDatos.Tables(1).TableName = vcEsquema2
        ''    dsDatos.Tables.Add(dtCliente.Copy)
        ''    dsDatos.Tables(2).TableName = vcEsquema

        ''    crConsulta.ReportDocument.SetDataSource(dsDatos)

        ''    dsDatosSubReporte.Tables.Add(ds.Tables(2).Copy)
        ''    dsDatosSubReporte.Tables(0).TableName = vcEsquemaSubReport

        ''    crConsulta.ReportDocument.Subreports(0).SetDataSource(dsDatosSubReporte)

        ''    Dim strfn As String = Server.MapPath("~/Images/Factura" + CarpetaDominio + "/Factura_" + inCodFac.ToString() + ".pdf")
        ''    Using mStream As MemoryStream = CType(crConsulta.ReportDocument.ExportToStream(ExportFormatType.PortableDocFormat), MemoryStream)
        ''        Dim byDoc As Byte() = mStream.ToArray()
        ''        Using fs As FileStream = New FileStream(strfn, FileMode.OpenOrCreate, FileAccess.Write)
        ''            fs.Write(byDoc, 0, byDoc.Length)
        ''            fs.Flush()
        ''            fs.Close()
        ''        End Using
        ''    End Using

        ''    Dim m_objCorreo As New CCorreo
        ''    Dim lstAdjunto As New ArrayList

        ''    lstAdjunto.Add(strfn)

        ''    Dim strMensaje As String = ""
        ''    Try
        ''        strMensaje = m_objCorreo.Enviar(False, txtDestinatarios.Text, txtAsunto.Text, txtMensaje.Text, lstAdjunto, True, BL_Base.GetConexionDatos(oUsuario.IdCliente))
        ''        If strMensaje = "" Then
        ''            strMensaje = "Correo enviado con exito"
        ''        End If
        ''    Catch ex As Exception
        ''        strMensaje = "Error: " & ex.Message
        ''    End Try

        ''    Dim Script As String = "Mensaje(""<img alt='' src='../Images/Mantenimiento/Correo32.png' /><br/><h1>" & strMensaje & "</h1>"", document, CerroMensaje); function CerroMensaje(){ window.parent.dialogo.dialog('close'); }"
        ''    'Dim Script As String = "Mensaje(""<img alt='' src='../Images/Mantenimiento/Correo32.png' /><br/><h1>" & strMensaje & "</h1>"", document, CerroMensaje); function CerroMensaje(){  window.parent.ListoEnvio(); window.parent.dialogo.dialog('close'); }" 'agregado 25-09-2013 wapumayta
        ''    Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", Script, True)

        ''Catch ex As Exception
        ''Finally
        ''    If Factura IsNot Nothing Then Factura.Dispose()
        ''    If Cliente IsNot Nothing Then Cliente.Dispose()
        ''End Try

    End Sub
End Class
