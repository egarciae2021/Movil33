Imports System.Web.Services
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Suite80.BE
Imports System.Data
Imports VisualSoft.PCSistelMovil.General.BE
Imports UtilitarioWeb
Imports VisualSoft.Comun.Auditoria

Partial Class General_Administrar_Mantenimiento_Mnt_CentroCosto
   Inherits System.Web.UI.Page


   Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
      If IsNothing(Session("Usuario")) Then
            'Dim script As String = "window.parent.location.reload()"
            Dim script As String = "window.top.location.reload();"
         Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
      Else
         If Not Page.IsPostBack Then
            Dim codigo As String = Request.QueryString("Cod")
            hdfEstado.Value = codigo
            UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)

            If Not IsNothing(codigo) Then
               Dim centroCosto As BL_GEN_CentroCosto = New BL_GEN_CentroCosto(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
               Dim oCentroCosto As List(Of ENT_GEN_CenCosto) = centroCosto.Listar(codigo)
               centroCosto.Dispose()
               If oCentroCosto.Count > 0 Then
                  txtCodigo.Text = oCentroCosto(0).vcCodCco.ToString().Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """")
                  txtCodigo.Enabled = False
                  txtNombre.Text = oCentroCosto(0).vcNomCco.ToString().Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """")
                  txtMailPersonal.Text = oCentroCosto(0).vcCorPer.ToString().Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """")
                  txtMailJefe.Text = oCentroCosto(0).vcCorJef.ToString().Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """")
                  chActivo.Visible = True
                  If Not Page.IsPostBack Then
                     If oCentroCosto(0).btEst Then
                        chActivo.Checked = True
                        hdfEstadoCCO.Value = 1
                        trEstado.Style("display") = "none"
                     Else
                        chActivo.Checked = False
                        hdfEstadoCCO.Value = 0
                     End If
                  End If
               Else
                  Dim script As String = ""
                  script += "alert('No se puede editar este registro porque es parte del Sistema');window.parent.tab.tabs('remove', window.parent.tab.tabs('option', 'selected'));"
                  Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
               End If
               'chkDefecto.Checked = Boolean.Parse(oEstado(0)("btDef").ToString)
            Else
               chActivo.Visible = False
               chActivo.Checked = True
               hdfEstadoCCO.Value = 1
               trEstado.Style("display") = "none"
            End If

         End If
      End If
   End Sub

    <WebMethod()>
    Public Shared Function Guardar(ByVal Codigo As String, ByVal Nombre As String, ByVal inCodEst As String, ByVal estado As String, ByVal CorPer As String, ByVal CorJef As String) As String
        Dim oCentroCosto As New ENT_GEN_CenCosto
        Dim CentroCosto As BL_GEN_CentroCosto = Nothing
        Dim _return As String = ""
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            CentroCosto = New BL_GEN_CentroCosto(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim coincidencias As Boolean
            Dim estadoCco As Boolean
            estadoCco = False
            If estado = 1 Then estadoCco = True
            oCentroCosto.vcCodCco = Codigo
            oCentroCosto.vcNomCco = Nombre
            oCentroCosto.vcCorPer = CorPer
            oCentroCosto.vcCorJef = CorJef
            oCentroCosto.F_inCodCli = 0
            oCentroCosto.btEst = estadoCco

            Dim oAuditoria As New ProcesaAuditoria
            oAuditoria.Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            oAuditoria.Producto = Constantes.AuditoriaConstantes.Name
            'oAuditoria.Modulo = Constantes.AuditoriaConstantes.Name
            oAuditoria.Modulo = "General"
            oAuditoria.NombreUsuario = oUsuario.vcUsu
            oAuditoria.Opcion = "Centro de Costo"
            oAuditoria.Tabla = Constantes.TableNames.Centrocosto

            Dim strAntes As String = ""
            If inCodEst <> "" Then
                'oCentroCosto.P_inCodCco = inCodEst
                strAntes = oAuditoria.AntesActualizar(New String() {oCentroCosto.vcCodCco})

                Utilitario.RegistrarLog(PCSistelMovilLog45.LogBE.eNivel.Auditoria,
                oAuditoria.Opcion, "Actualizar", "USUARIO: " & oAuditoria.NombreUsuario & ". MÓDULO: " & oAuditoria.Modulo & ".TABLA: " & oAuditoria.Tabla & ". Antes: " & strAntes)

                CentroCosto.Actualizar(oCentroCosto)
                ''oAuditoria.DespuesActualizar(New String() {oCentroCosto.vcCodCco}, strAntes)
                _return = ""
            Else
                coincidencias = CentroCosto.ExisteCodigo(Codigo, "M_CENT_COST", "CCOS_P_vcCODCCO")
                If coincidencias Then
                    _return = "El código ingresado ya existe"
                Else
                    CentroCosto.Insertar(oCentroCosto)

                    Utilitario.RegistrarLog(PCSistelMovilLog45.LogBE.eNivel.Auditoria,
                    oAuditoria.Opcion, "Agregar", "USUARIO: " & oAuditoria.NombreUsuario & ". MÓDULO: " & oAuditoria.Modulo & ".TABLA: " & oAuditoria.Tabla)

                    ''oAuditoria.Insertar(New String() {oCentroCosto.vcCodCco})
                    _return = ""
                End If
            End If
        Catch ex As Exception
            _return = "Error: " & ex.Message
        Finally
            If CentroCosto IsNot Nothing Then CentroCosto.Dispose()
        End Try
        Return _return
    End Function

   'Protected Sub chActivo_CheckedChanged(ByVal sender As Object, ByVal e As System.EventArgs) Handles chActivo.CheckedChanged

   '    If Me.chActivo.Checked Then
   '        hdfEstadoCCO.Value = 1
   '    Else
   '        hdfEstadoCCO.Value = 0
   '    End If

   'End Sub
End Class
