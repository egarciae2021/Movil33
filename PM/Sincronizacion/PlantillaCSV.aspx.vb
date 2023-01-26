Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports System.Web.Services
Imports System.Data
Imports System.Web.Script.Serialization
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.PCSistelMovil.General.BE
Imports System.Web.Script.Services

Public Class PlantillaCSV
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim Sincronizacion As BL_GEN_Sincronizacion = Nothing
        Try

            If Not Page.IsPostBack Then
                Sincronizacion = New BL_GEN_Sincronizacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                Session("tipoorigen") = Request.QueryString("TipoOrigen").ToString()


                Dim tablaorigen As DataTable = Sincronizacion.ListarSeparadores()
                ddlseparador.DataTextField = "SEPARADOR"
                ddlseparador.DataValueField = "SEPARADOR"
                ddlseparador.DataSource = tablaorigen
                ddlseparador.DataBind()

                Dim tipomodulo As String = Session("ModuloOpcion").ToString()
                hdfTipoOrigen.Value = Request.QueryString("TipoOrigen").ToString()

                Dim dtOrigenPlantilla As DataTable = Sincronizacion.CargaComboOrigenInfo(tipomodulo)

                ddlplantilla.DataTextField = "TIPO"
                ddlplantilla.DataValueField = "TIPO"
                ddlplantilla.DataSource = dtOrigenPlantilla
                ddlplantilla.DataBind()

                fillDatos()
                '
                hdfTipoOrigen.Value = Request.QueryString("TipoOrigen").ToString()


            End If
            UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
        Catch exc As Exception
            Dim util As New Utilitarios
            util.GrabarLog(exc, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            Sincronizacion.Dispose()
        End Try

    End Sub

    Protected Sub fillDatos()
        Dim Sincronizacion As BL_GEN_Sincronizacion = Nothing
        Try
            Sincronizacion = New BL_GEN_Sincronizacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim tipomodulo As String = Session("ModuloOpcion").ToString()
            Dim tipoplantilla As String = ddlplantilla.Text

            Dim dtPlantilla As DataTable = Sincronizacion.getPlantilla(tipomodulo, tipoplantilla)

            Session("plantilla") = dtPlantilla.Rows(0)(0).ToString()

            Dim dtOrigen As DataTable = Sincronizacion.getOrigen(tipomodulo, tipoplantilla)

            If dtPlantilla IsNot Nothing Then
                If dtPlantilla.Rows.Count > 0 Then

                    ' ORIGEN
                    Dim sSeparador As String = dtPlantilla.Rows(0)("PLAN_vcSEPARADOR").ToString()
                    'lblPlan.Text = dtPlantilla.Rows[0]["PLAN_vcPLANTILLA"].ToString();
                    If sSeparador <> "" Then
                        If ddlseparador.Items.FindByValue(sSeparador) IsNot Nothing Then

                            ddlseparador.Items.FindByValue(sSeparador).Selected = True
                        End If

                    End If
                End If
            End If

            If dtOrigen IsNot Nothing Then
                If dtOrigen.Rows.Count > 0 Then
                    txtarchivo.Text = Convert.ToString(dtOrigen.Rows(0)("ORIG_vcARCHIVO").ToString()).Replace("\\", "\")
                    txtbackup.Text = Convert.ToString(dtOrigen.Rows(0)("ORIG_vcBACKUP").ToString()).Replace("\\", "\")
                    txterror.Text = Convert.ToString(dtOrigen.Rows(0)("ORIG_vcERROR").ToString()).Replace("\\", "\")

                End If
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            Sincronizacion.Dispose()
        End Try

    End Sub


    <WebMethod()> _
    Public Shared Function GuardarOrigen(separador As String, plantilla As String, archivo As String, backup As String, [error] As String, tipoplantilla As String) As String
        Dim Sincronizacion As BL_GEN_Sincronizacion = Nothing
        Try
            Sincronizacion = New BL_GEN_Sincronizacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim TipoModulo As String = HttpContext.Current.Session("ModuloOpcion").ToString()
            Sincronizacion.LimpiaOrigen(TipoModulo, tipoplantilla)
            Dim resultado As String = Sincronizacion.ActualizaPlantilla(separador, plantilla, TipoModulo, tipoplantilla)
            Dim resultado2 As String = Sincronizacion.ActualizaOrigen(archivo, backup, [error], "", "", "", _
             "", "", "", "", False, TipoModulo, _
             tipoplantilla)
            Return "0"
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            Sincronizacion.Dispose()
        End Try
    End Function

    <WebMethod()> _
    Public Shared Function CargarPlantillaTipo(tipo As String) As ArrayList
        Dim Sincronizacion As BL_GEN_Sincronizacion = Nothing
        Try
            Sincronizacion = New BL_GEN_Sincronizacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            'new BLLSincronizacion().LimpiaPlantilla();
            Dim TipoModulo As String = HttpContext.Current.Session("ModuloOpcion").ToString()
            Dim dt As DataTable = Sincronizacion.getPlantilla(TipoModulo, tipo)
            Dim dt1 As DataTable = Sincronizacion.getOrigen(TipoModulo, tipo)

            Dim lista As New ArrayList()
            For i As Integer = 0 To dt.Rows.Count - 1
                lista.Add(New With { _
                 Key .archivo = dt1.Rows(i)("ORIG_vcARCHIVO").ToString(), _
                 Key .backup = dt1.Rows(i)("ORIG_vcBACKUP").ToString(), _
                 Key .[error] = dt1.Rows(i)("ORIG_vcARCHIVO").ToString(), _
                 Key .planlit = dt.Rows(i)("PLAN_vcPLANTILLA").ToString(), _
                 Key .plan = dt.Rows(i)("PLAN_vcPLANTILLA").ToString() _
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


    <WebMethod()> _
    Public Shared Function CargarCampos(tipoplantilla As String) As List(Of ENTCamposSincronizacion)
        Dim Sincronizacion As BL_GEN_Sincronizacion = Nothing
        Try
            Sincronizacion = New BL_GEN_Sincronizacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Dim TipoModulo As String = HttpContext.Current.Session("ModuloOpcion").ToString()
            Dim lstCampo As New List(Of ENTCamposSincronizacion)()
            lstCampo = Sincronizacion.getCampos(TipoModulo, tipoplantilla)
            'BLLSincronizacion Campo = default(BLLSincronizacion);
            'Dictionary<string, object> dict = new Dictionary<string, object>();
            'dict.Add("lstCampo", Campo.getCampos());
            Return lstCampo
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            Sincronizacion.Dispose()
        End Try
    End Function


    <WebMethod()> _
    Public Shared Function CargarCampossin_plan(tipoplantilla As String) As List(Of ENTCamposSincronizacion)

        Dim Sincronizacion As BL_GEN_Sincronizacion = Nothing
        Try
            Sincronizacion = New BL_GEN_Sincronizacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Dim plantilla As String = ""
            plantilla = HttpContext.Current.Session("plantilla").ToString()
            plantilla = plantilla.Replace(",", "")
            plantilla = plantilla.Replace("|", "")
            plantilla = plantilla.Replace(".", "")
            plantilla = plantilla.Replace(";", "")
            plantilla = plantilla.Replace("*", "")

            plantilla = plantilla.Replace(tipoplantilla, "")

            Dim planti As String() = New String(9999) {}

            Dim cadena As String = ""

            For i As Integer = 0 To plantilla.Length - 1
                planti(i) = plantilla.Substring(i, 1)
                cadena = (cadena & Convert.ToString("'")) + planti(i)
                If i < plantilla.Length - 1 Then
                    cadena = cadena & Convert.ToString("',")
                Else
                    cadena = cadena & "'"
                End If
            Next

            Dim lstCampo As New List(Of ENTCamposSincronizacion)()
            lstCampo = Sincronizacion.getCampossinplan(cadena)

            Return lstCampo
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            Sincronizacion.Dispose()
        End Try
    End Function


    <WebMethod()> _
    Public Shared Function CargarCamposInactivos(tipoplantilla As String) As List(Of ENTCamposSincronizacion)

        Dim Sincronizacion As BL_GEN_Sincronizacion = Nothing
        Try
            Sincronizacion = New BL_GEN_Sincronizacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Dim TipoModulo As String = HttpContext.Current.Session("ModuloOpcion").ToString()
            Dim lstCampo As New List(Of ENTCamposSincronizacion)()
            lstCampo = Sincronizacion.getCamposInactivos(TipoModulo, tipoplantilla)
          
            Return lstCampo
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            Sincronizacion.Dispose()
        End Try
    End Function


    <WebMethod()> _
    Public Shared Function GrabarCamposCSV(oCampos As String, tipoplantilla As String) As String
        Dim Sincronizacion As BL_GEN_Sincronizacion = Nothing
        Try
            Sincronizacion = New BL_GEN_Sincronizacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Dim TipoModulo As String = HttpContext.Current.Session("ModuloOpcion").ToString()
            Sincronizacion.Actualizar("SIN_D_ELIMINAR_CAMPOS", TipoModulo, tipoplantilla, HttpContext.Current.Session("tipoorigen").ToString())

            Dim oSerializer As New JavaScriptSerializer()
            Dim ListaPlantilla As List(Of ENTCamposSincronizacion) = oSerializer.Deserialize(Of List(Of ENTCamposSincronizacion))(oCampos)

            For Each oPlantilla As ENTCamposSincronizacion In ListaPlantilla
                Sincronizacion.GrabarCampoCSV(oPlantilla.P_inCodCam, oPlantilla.vcCod, oPlantilla.vcDes, oPlantilla.inPos, oPlantilla.inLon, oPlantilla.obligatorio, TipoModulo)
            Next

            Return "0"
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            Sincronizacion.Dispose()
        End Try
    End Function
End Class