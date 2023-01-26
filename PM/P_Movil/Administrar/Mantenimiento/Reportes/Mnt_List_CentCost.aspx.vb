Imports VisualSoft.Suite80.BL
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.Utilitarios
Public Class Mnt_List_CentCost
    Inherits System.Web.UI.Page
    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim CentCost As BL_GEN_CentroCosto = Nothing
        Dim Nivel As BL_GEN_Nivel = Nothing
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Try
            oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Nivel = New BL_GEN_Nivel(oUsuario.IdCliente)
            CentCost = New BL_GEN_CentroCosto(oUsuario.IdCliente)

            If IsNothing(Session("Usuario")) Then
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then


                    'CENTRO DE COSTO
                    Dim dt As DataTable = CentCost.ListarCentroCostoTable()
                    Dim Datos As New StringBuilder
                    Datos.Append("var dataDDL = [")
                    Datos.Append("{ text: '<Todos>', value: '-1'},")
                    For i = 0 To dt.Rows.Count - 1
                        Datos.Append("{ text: '" + dt.Rows(i)("CCOS_vcNOMCCO").ToString + "', value: '" + dt.Rows(i)("CCOS_P_vcCODCCO").ToString + "' },")
                    Next
                    Datos.Append("];")
                    Page.ClientScript.RegisterClientScriptBlock(Me.GetType(), "CentroCosto", Datos.ToString(), True)


                    'NIVEL
                    Dim dtNivel As DataTable = Nivel.ListadoNivel()
                    Dim DatosNivel As New StringBuilder
                    DatosNivel.Append("var dataDDLNivel = [")
                    DatosNivel.Append("{ text: '<Todos>', value: '-1'},")
                    For i = 0 To dtNivel.Rows.Count - 1
                        DatosNivel.Append("{ text: '" + dtNivel.Rows(i)("NIVE_vcNOMNIV").ToString + "', value: '" + dtNivel.Rows(i)("NIVE_P_inCODNIV").ToString + "' },")
                    Next
                    DatosNivel.Append("];")
                    Page.ClientScript.RegisterClientScriptBlock(Me.GetType(), "Nivel", DatosNivel.ToString(), True)


                End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If CentCost IsNot Nothing Then CentCost.Dispose()
            If Nivel IsNot Nothing Then Nivel.Dispose()
        End Try
    End Sub

End Class