Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports System.Web.Services
Imports System.Web.Script.Serialization
Imports VisualSoft.Comun.Utilitarios

Partial Class P_Movil_Administrar_Mantenimiento_Mnt_Modulo
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    Dim Producto As BL_PRO_Producto = New BL_PRO_Producto(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    Dim inCodModulo As String = Request.QueryString("Cod")

                    UtilitarioWeb.Dataddl(ddlProducto, Producto.Listar(), "vcNom", "P_inCod")
                    Producto.Dispose()
                    '------------------------------------------------------

                    'Cargar Tipo Origen...
                    ddlTipoOrigen.Items.Clear()
                    ddlTipoOrigen.Items.Add(New ListItem("<Ninguro>", "99"))
                    ddlTipoOrigen.Items.Add(New ListItem("Base", "0"))
                    ddlTipoOrigen.Items.Add(New ListItem("Datos", "1"))
                    ddlTipoOrigen.SelectedIndex = 0

                    If inCodModulo <> "" Then
                        Dim oSerializer As New JavaScriptSerializer
                        Dim Script As String
                        Dim Modulo As BL_PRO_Modulo = New BL_PRO_Modulo(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                        Dim oModulo As ENT_PRO_Modulo = Modulo.Mostrar(Convert.ToInt32(inCodModulo))
                        Modulo.Dispose()

                        ddlProducto.SelectedValue = oModulo.F_inProd
                        ddlTipoOrigen.SelectedValue = oModulo.inTipOri

                        ddlTabla.DataSource = ListarTablas(oModulo.inTipOri)
                        ddlTabla.DataTextField = "vcTab"
                        ddlTabla.DataValueField = "vcTab"
                        ddlTabla.DataBind()
                        ddlTabla.SelectedValue = oModulo.vcTab

                        txtNombreModulo.Text = oModulo.vcNom
                        txtOrden.Text = oModulo.inOrd
                        txtUrl.Text = oModulo.vcURL

                        If oModulo.vcTab <> "OTRO" And oModulo.vcTab <> "" Then
                            txtTabla.Style("display") = "none"
                        Else
                            txtTabla.Style("display") = ""
                        End If

                        chkEstado.Checked = IIf(oModulo.inEst = 0, False, True)

                        If chkEstado.Checked Then
                            trEstado.Style("display") = "none"
                        End If

                        hdfModulo.Value = inCodModulo
                        Script = " var lstOpciones=" & oSerializer.Serialize(oModulo.Opciones) & ";"
                        Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", Script, True)
                    Else
                        Dim Script As String
                        hdfModulo.Value = ""
                        txtOrden.Text = "1"
                        trEstado.Style("display") = "none"
                        Script = " var lstOpciones;"

                        Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", Script, True)
                    End If
                End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub


    <WebMethod()> _
    Public Shared Function ListarTablas(ByVal TipoOrigen As String) As List(Of ENT_ENT_Entidad)

        If TipoOrigen Is Nothing OrElse TipoOrigen.Trim = "99" Then
            Dim objLista As New List(Of ENT_ENT_Entidad)
            Dim eEntidad As New ENT_ENT_Entidad
            eEntidad.vcTab = ""
            eEntidad.P_inCod = 0
            objLista.Add(eEntidad)
            Return New List(Of ENT_ENT_Entidad)
            Exit Function
        End If

        Dim objBL As BL_ENT_Entidad = New BL_ENT_Entidad(CType(TipoOrigen, Integer), CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
        Dim _return As List(Of ENT_ENT_Entidad) = objBL.Listar()
        objBL.Dispose()

        Return _return

    End Function

    <WebMethod()>
    Public Shared Sub Guardar(ByVal oModulo As String)
        Try
            Dim Modulo As BL_PRO_Modulo = New BL_PRO_Modulo(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oSerializer As New JavaScriptSerializer
            Dim v_oModulo As ENT_PRO_Modulo = oSerializer.Deserialize(Of ENT_PRO_Modulo)(oModulo)

            v_oModulo.vcNom = v_oModulo.vcNom.Replace("&#39", "'")

            For Each oOpcion As ENT_PRO_Opcion In v_oModulo.Opciones
                oOpcion.vcNom = oOpcion.vcNom.Replace("&#39", "'")
            Next

            If v_oModulo.P_inCod < 0 Then
                Modulo.Insertar(v_oModulo)
            Else
                Modulo.Actualizar(v_oModulo)
            End If

            Modulo.Dispose()

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub
End Class