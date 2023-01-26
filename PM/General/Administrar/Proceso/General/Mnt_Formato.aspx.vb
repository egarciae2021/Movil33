Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Comun.Proceso.BL
Imports VisualSoft.Comun.Proceso.BE
Imports System.Web.Services
Imports System.Data
Imports System.Web.Script.Serialization
Imports VisualSoft.Comun.Utilitarios

Partial Class General_Administrar_Proceso_General_Mnt_Formato
    Inherits System.Web.UI.Page

    Protected Sub General_Administrar_Proceso_General_Mnt_Formato_Load(sender As Object, e As System.EventArgs) Handles Me.Load

        Dim Formato As BL_PCS_IMP_Formato = Nothing

        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)

            If IsNothing(oUsuario) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then

                    Dim codigo As String = Request.QueryString("Cod")
                    UtilitarioWeb.AgregarTema(Server, Page.Header, oUsuario.CaracteristicaUsuario.vcTem)

                    If Not IsNothing(codigo) Then
                        hdfCodigo.Value = codigo

                        Formato = New BL_PCS_IMP_Formato(oUsuario.IdCliente)
                        Dim eFormato As New ENT_PCS_IMP_Formato
                        eFormato.IdFormato = codigo
                        Dim oFormato As List(Of ENT_PCS_IMP_Formato) = Formato.Listar_x_Codigo(eFormato)

                        If oFormato.Count <> 0 Then
                            txtNombreFormato.Text = oFormato.ElementAt(0).Nombre.ToString().Trim().Replace("&#39", "'")
                            txtIdentificador.Text = oFormato.ElementAt(0).Identificador.ToString().Trim().Replace("&#39", "'")
                            txtposdia.Text = oFormato.ElementAt(0).DiaInicio.ToString().Trim()
                            txtlogdia.Text = oFormato.ElementAt(0).DiaLongitud.ToString().Trim()
                            txtposmes.Text = oFormato.ElementAt(0).MesInicio.ToString().Trim()
                            txtlogmes.Text = oFormato.ElementAt(0).MesLongitud.ToString().Trim()
                            txtposano.Text = oFormato.ElementAt(0).AnoInicio.ToString().Trim()
                            txtlogano.Text = oFormato.ElementAt(0).AnoLongitud.ToString().Trim()
                            chActivo.Visible = True
                            If oFormato.ElementAt(0).btEst Then
                                chActivo.Checked = True
                                'hdfEstado.Value = 1
                                trEstado.Style("display") = "none"
                            Else
                                chActivo.Checked = False
                                hdfEstado.Value = 0
                            End If

                        Else
                            Dim script As String = ""
                            script += "alert('No se puede editar este registro porque es parte del Sistema');window.parent.tab.tabs('remove', window.parent.tab.tabs('option', 'selected'));"
                            Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
                        End If
                    Else
                        chActivo.Visible = False
                        chActivo.Checked = True
                        hdfEstado.Value = ""
                        trEstado.Style("display") = "none"
                    End If
                End If
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Formato IsNot Nothing Then Formato.Dispose()
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function Guardar(pCod As String, _
                                   pNom As String, _
                                   pIdent As String, _
                                   pPosDia As Integer, _
                                   pLogDia As Integer, _
                                   pPosMes As Integer, _
                                   pLogMes As Integer, _
                                   pPosAno As Integer, _
                                   pLogAno As Integer, _
                                   btVig As Integer) As String
        Dim Formato As BL_PCS_IMP_Formato = Nothing
        Try
            Dim eFormato As New ENT_PCS_IMP_Formato
            Formato = New BL_PCS_IMP_Formato(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim resultado As Integer

            Dim oFormato As List(Of ENT_PCS_IMP_Formato) = Formato.Listar_x_Valida_Nombre(pNom)

            eFormato.Nombre = pNom
            eFormato.Identificador = pIdent
            eFormato.IdCliente = 0
            eFormato.Tipo = "Formato"
            eFormato.DiaInicio = pPosDia
            eFormato.DiaLongitud = pLogDia
            eFormato.MesInicio = pPosMes
            eFormato.MesLongitud = pLogMes
            eFormato.AnoInicio = pPosAno
            eFormato.AnoLongitud = pLogAno
            'eFormato.btEst = Convert.ToBoolean(btVig)
            eFormato.btEst = btVig = 1
            If pCod = "" Then
                If oFormato.Count = 0 Then
                    resultado = Formato.Insertar(eFormato)
                Else
                    resultado = "2"
                End If

            Else
                If oFormato.Count = 0 Or oFormato.Count = 1 Then
                    eFormato.IdFormato = pCod
                    resultado = Formato.Actualizar(eFormato)
                Else
                    resultado = "2"
                End If
            End If

            Return resultado
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Formato IsNot Nothing Then Formato.Dispose()
        End Try
    End Function

End Class
