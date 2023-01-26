Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports System.Web.Services
Imports System.Data
Imports System.Web.Script.Serialization
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.PCSistelMovil.General.BE


Public Class Sin_Configura
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Try
            If Not Page.IsPostBack Then

                fillDatos()

            End If
            UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
        Catch exc As Exception
            Dim util As New Utilitarios
            util.GrabarLog(exc, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub


    Private Sub fillDatos()
        Try
            traedatoscombos()
            'DataTable dt = new BLLSincronizacion().getOrigen();
            cargadata()
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub


    <WebMethod()> _
    Public Shared Function cargarmoduloactual() As String
        Try
            Return HttpContext.Current.Session("ModuloOpcion").ToString()
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function


    <WebMethod()> _
    Public Shared Function GetFacilidades(codigo As String) As ArrayList
        Dim Sincronizacion As BL_GEN_Sincronizacion = Nothing
        Try
            Sincronizacion = New BL_GEN_Sincronizacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim dt As DataTable = Sincronizacion.ListadoFacilidades(codigo)
            Dim lista As New ArrayList()
            For i As Integer = 0 To dt.Rows.Count - 1
                lista.Add(New With { _
                 Key .Value = dt.Rows(i)("CODIGO").ToString(), _
                 Key .Display = dt.Rows(i)("NOMBRE").ToString() _
                })
            Next
            Return lista
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            Sincronizacion.Dispose()
        End Try
    End Function


    Private Sub traedatoscombos()
        Dim Sincronizacion As BL_GEN_Sincronizacion = Nothing
        Try
            ' COMBO ORIGEN


            Sincronizacion = New BL_GEN_Sincronizacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Dim tablaorigen As DataTable = Sincronizacion.ListarComboOrigen()


            Dim modulo As String = Session("ModuloOpcion").ToString()
            ' Filtra si la peticion es de Abogados, para que no muestre como fuente de origen LDAP
            If modulo = "abogados" Then
                For Each dr As DataRow In tablaorigen.Rows

                    If dr("origen").ToString() = "Active Directory" Then
                        dr.Delete()
                    End If
                Next
                tablaorigen.AcceptChanges()
            End If

            ddlOrigen.DataTextField = "ORIGEN"
            ddlOrigen.DataValueField = "ORIGEN"
            ddlOrigen.DataSource = tablaorigen
            ddlOrigen.DataBind()


            ' COMBO SUCURSALES
            Dim tablamaestra As DataTable = Sincronizacion.ListadoSucursales()
            ddlsucursal.DataTextField = "NOMBRE"
            ddlsucursal.DataValueField = "CODIGO"
            ddlsucursal.DataSource = tablamaestra
            ddlsucursal.DataBind()

            'COMBO ROLES
            tablamaestra = Sincronizacion.ListarRoles()
            ddlrol.DataTextField = "GROR_vcNOMGRU"
            ddlrol.DataValueField = "GROR_P_inCODGRUORI"
            ddlrol.DataSource = tablamaestra
            ddlrol.DataBind()

            'COMBO NOMBRE
            tablamaestra = Sincronizacion.ListarNombreComboEMP()
            ddlnombre.DataTextField = "CAMPO"
            ddlnombre.DataValueField = "CAMPO"
            ddlnombre.DataSource = tablamaestra
            ddlnombre.DataBind()

            'COMBO FORMATO
            tablamaestra = Sincronizacion.ListarFormatoComboEMP()
            ddlformato.DataTextField = "CAMPO"
            ddlformato.DataValueField = "CAMPO"
            ddlformato.DataSource = tablamaestra
            ddlformato.DataBind()

            'COMBO usuario web
            tablamaestra = Sincronizacion.ListarUsuariowebCombo()
            ddlususuarioweb.DataTextField = "CAMPO"
            ddlususuarioweb.DataValueField = "CAMPO"
            ddlususuarioweb.DataSource = tablamaestra
            ddlususuarioweb.DataBind()

            'COMBO LECTURA DE ORGANIZACION
            tablamaestra = Sincronizacion.ListarFormatoComboORG
            ddlorganizacion.DataTextField = "CAMPO"
            ddlorganizacion.DataValueField = "ITEM"
            ddlorganizacion.DataSource = tablamaestra
            ddlorganizacion.DataBind()
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            Sincronizacion.Dispose()
        End Try
    End Sub


    Private Sub cargadata()
        Dim Sincronizacion As BL_GEN_Sincronizacion = Nothing
        Try
            Dim TipoModulo As String = HttpContext.Current.Session("ModuloOpcion").ToString()
            Sincronizacion = New BL_GEN_Sincronizacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Dim dt As New DataTable
            dt = Sincronizacion.getSeteos(TipoModulo)
            If dt IsNot Nothing Then
                If dt.Rows.Count > 0 Then

                    ' ORIGEN
                    Dim sOrigen As String = dt.Rows(0)("SETE_vcORIGEN").ToString()
                    If sOrigen <> "" Then
                        Try
                            ddlOrigen.Items.FindByText(sOrigen).Selected = True
                        Catch
                        End Try
                    End If


                    txtmail.Text = Convert.ToString(dt.Rows(0)("SETE_vcCORREO").ToString())

                    ' SUCURSAL
                    Dim sCampoSucursal As String = Convert.ToString(dt.Rows(0)("SETE_vcSUCURSAL").ToString())
                    If sCampoSucursal <> "" Then
                        If ddlsucursal.Items.FindByValue(sCampoSucursal) IsNot Nothing Then
                            ddlsucursal.Items.FindByValue(sCampoSucursal).Selected = True
                        End If
                    End If


                    Dim filtro As String = Convert.ToString(dt.Rows(0)("SETE_btUsaFiltroOU").ToString())
                    If filtro <> "" Then
                        If ddlladp.Items.FindByValue(filtro) IsNot Nothing Then



                            ddlladp.Items.FindByValue(filtro).Selected = True
                        End If
                    End If

                    If filtro = "False" Then
                        txtempleado.Enabled = False
                    End If
                    Dim campoldap As String = Convert.ToString(dt.Rows(0)("SETE_vcFiltroOU").ToString())
                    txtempleado.Text = campoldap
                    '--------------------------------------------------------
                    ' FACILIDAD
                    hdfacilidad.Value = Convert.ToString(dt.Rows(0)("SETE_vcFACILIDAD").ToString())

                    ' ROL
                    Dim sCampoRol As String = dt.Rows(0)("SETE_vcROL").ToString()
                    If sCampoRol <> "" Then
                        If ddlrol.Items.FindByValue(sCampoRol) IsNot Nothing Then
                            ddlrol.Items.FindByValue(sCampoRol).Selected = True
                        End If
                    End If

                    ' NOMBRE EMPLEADO
                    Dim sCampoNombre As String = dt.Rows(0)("SETE_vcNOMBRE").ToString()
                    If sCampoNombre <> "" Then
                        If ddlnombre.Items.FindByValue(sCampoNombre) IsNot Nothing Then
                            ddlnombre.Items.FindByValue(sCampoNombre).Selected = True
                        End If
                    End If

                    ' FORMATO NOMBRE
                    Dim sCampoFormato As String = dt.Rows(0)("SETE_vcFORMATO").ToString()
                    If sCampoFormato <> "" Then
                        If ddlformato.Items.FindByValue(sCampoFormato) IsNot Nothing Then
                            ddlformato.Items.FindByValue(sCampoFormato).Selected = True
                        End If
                    End If

                    'USUARIO WEB
                    Dim bCampoWeb As Boolean = Convert.ToBoolean(dt.Rows(0)("SETE_btUSUWEB").ToString())
                    If bCampoWeb Then
                        chkusuarioweb.Checked = True
                        ddlususuarioweb.Enabled = True
                    Else
                        ddlususuarioweb.Enabled = False
                    End If

                    'Multisucursales
                    Dim btmultisucursal As Boolean = Convert.ToBoolean(dt.Rows(0)("SETE_btMULTISUCURSAL").ToString())
                    If btmultisucursal Then

                        chkMultisucursal.Checked = True
                    Else
                        chkMultisucursal.Checked = False
                    End If

                    Dim sCampoWeb As String = dt.Rows(0)("SETE_vcUSUWEB").ToString()
                    If sCampoWeb <> "" Then
                        ddlususuarioweb.SelectedValue = sCampoWeb
                    End If


                    ' COMBO ORGANIZACION
                    Dim sCampoOrganizacion As Boolean = Convert.ToBoolean(dt.Rows(0)("SETE_btAREAPROP").ToString())

                    If sCampoOrganizacion <> False Then
                        If ddlorganizacion.Items.FindByValue("1") IsNot Nothing Then
                            ddlorganizacion.Items.FindByValue("1").Selected = True
                            txtnombreou.Enabled = True

                            txtnombreou.Text = dt.Rows(0)("SETE_vcAREAPRINCIPAL").ToString()
                        Else
                            txtnombreou.Enabled = False
                        End If
                    Else

                        txtnombreou.Enabled = False
                    End If


                    'CHECKED
                    chkanexo.Checked = Convert.ToBoolean(dt.Rows(0)("SETE_btANEXO").ToString())
                    chkcodigo.Checked = Convert.ToBoolean(dt.Rows(0)("SETE_btCODIGO").ToString())
                    chkuniranexo.Checked = Convert.ToBoolean(dt.Rows(0)("SETE_btUNIRANEXO").ToString())
                    chkunircodigo.Checked = Convert.ToBoolean(dt.Rows(0)("SETE_btUNIRCODIGO").ToString())
                    chkeliminar.Checked = Convert.ToBoolean(dt.Rows(0)("SETE_btELIMINAR").ToString())

                    Dim columna As String = ""
                    For i As Integer = 0 To dt.Columns.Count - 1
                        columna = dt.Columns(i).ColumnName

                        If columna = "SETE_btCorreoCreaCodigo" Then

                            Exit For
                        End If
                    Next

                    If columna = "SETE_btCorreoCreaCodigo" Then

                        If [String].IsNullOrEmpty(dt.Rows(0)("SETE_btCorreoCreaCodigo").ToString()) Then
                        Else
                            chkcorreo.Checked = Convert.ToBoolean(dt.Rows(0)("SETE_btCorreoCreaCodigo").ToString())
                        End If
                    End If
                End If
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub


    <WebMethod()> _
    Public Shared Function GuardarSeteo(origen As String, correo As String, sucursal As String, rol As String, facilidad As String, nombre As String, _
 formato As String, usuweb As String, manejaweb As Boolean, anexo As Boolean, codigo As Boolean, uniranexo As Boolean, _
 unircodigo As Boolean, eliminar As Boolean, organizacion As Integer, nodoorga As String, setecorreo As Boolean, seteldap As Boolean, _
 campoldap As String, setemultisucursal As Boolean) As String

        Dim Sincronizacion As BL_GEN_Sincronizacion = Nothing
        Dim _return As Integer = 0
        Try

            Sincronizacion = New BL_GEN_Sincronizacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Dim TipoModulo As String = HttpContext.Current.Session("ModuloOpcion").ToString()
            Sincronizacion.LimpiaSeteos(TipoModulo)

            nodoorga = If(organizacion = 1, nodoorga, "")
           

            'se forzo para que no sincronize codigo ni anexos, comentar cuando se necesite utilizar
            anexo = False
            codigo = False
            setemultisucursal = False
            '****************



            Dim resultado As String = Sincronizacion.ActualizaSeteos(origen, correo, sucursal, facilidad, nombre, formato, _
             rol, manejaweb, usuweb, anexo, codigo, uniranexo, _
             unircodigo, eliminar, organizacion, nodoorga, setecorreo, TipoModulo, _
             seteldap, campoldap, setemultisucursal)
            Return "0"
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            Sincronizacion.dispose()
        End Try
    End Function

End Class