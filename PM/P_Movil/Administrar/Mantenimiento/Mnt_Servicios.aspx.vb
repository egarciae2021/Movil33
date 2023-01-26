Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports System.Web.Services
Imports System.Data
Imports System.Web.Script.Serialization
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.PCSistelMovil.General.BE

Partial Class P_Movil_Administrar_Mantenimiento_Mnt_Servicios
   Inherits System.Web.UI.Page

    Protected Sub form1_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles form1.Load
        Dim Operador As BL_GEN_Operador = Nothing
        Dim Grupo As BL_GEN_Grupo = Nothing
        Dim ServicioOperador As BL_MOV_ServicioOperador = Nothing
        Dim oUsuario As ENT_SEG_Usuario = Nothing
        Try
            If IsNothing(Session("Usuario")) Then
                Dim script As String = "window.top.location.reload()"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                Dim vcCodServ As String = Request.QueryString("Cod")
                If Not IsPostBack Then
                    'OPERADOR
                    Operador = New BL_GEN_Operador(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    oUsuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
                    'UtilitarioWeb.Dataddl(ddlOperador, Operador.Listar(-1, "<Seleccionar>"), "vcNomOpe", "P_inCodOpe")
                    UtilitarioWeb.Dataddl(ddlOperador, Operador.Listar(), "vcNomOpe", "P_inCodOpe")

                    'GRUPO ORIGEN
                    'Dim GrupoOrigen As BL_GEN_GrupoOrigen = new BL_GEN_GrupoOrigen(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    hdfCodLinTip_X_User.Value = ObtenerTipoLinea_X_Usuario(oUsuario)
                    Grupo = New BL_GEN_Grupo(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    UtilitarioWeb.Dataddl(ddlGruposOrigen, Grupo.Listar(Convert.ToInt32(hdfCodLinTip_X_User.Value)), "vcNom", "P_inCod")
                    'CARGAR DATOS (EDICION)
                    If Not String.IsNullOrEmpty(vcCodServ) Then
                        hdfIdServicio.Value = vcCodServ
                        ServicioOperador = New BL_MOV_ServicioOperador(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                        Dim oServicioOperador As ENT_MOV_ServicioOperador = ServicioOperador.Mostrar(vcCodServ)
                        ddlOperador.SelectedValue = oServicioOperador.idOpe
                        txtServicio.Text = oServicioOperador.nomSer
                        txtDescripcion.Text = oServicioOperador.desSer
                        If (oServicioOperador.cost = 0) Then
                            chkSinCosto.Checked = True
                            txtCosto.Text = ""
                            trCosto.Style("display") = "none"
                        Else
                            chkSinCosto.Checked = False
                            txtCosto.Text = oServicioOperador.cost
                        End If
                        UtilitarioWeb.DataLst(lstGrupos, oServicioOperador.grup, "vcNomGru", "P_inCodGruOri")

                        'GRUPOS ACTUALES
                        Dim lstIdGrupAct As New List(Of String)
                        For Each oGrupo As ENT_GEN_GrupoOrigen In oServicioOperador.grup
                            lstIdGrupAct.Add(oGrupo.P_inCodGruOri)
                        Next
                        hdfGrupAct.Value = String.Join(",", lstIdGrupAct)

                    Else
                        hdfIdServicio.Value = "-1"
                    End If
                End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Operador IsNot Nothing Then Operador.Dispose()
            If Grupo IsNot Nothing Then Grupo.Dispose()
            If ServicioOperador IsNot Nothing Then ServicioOperador.Dispose()
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function GuardarServicio(ByVal inIdSer As Integer, ByVal inIdOpe As Integer, ByVal vcNom As String, _
                                           ByVal vcDes As String, ByVal dcCos As Decimal, ByVal vcGrupAdd As String, ByVal vcGrupDel As String) As Integer

      Dim ServicioOperador As BL_MOV_ServicioOperador = Nothing
      Try
         Dim resultado As Integer = 0
         ServicioOperador = New BL_MOV_ServicioOperador(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
         Dim oServicio As New ENT_MOV_ServicioOperador()
         oServicio.idSer = inIdSer
         oServicio.idOpe = inIdOpe
         oServicio.nomSer = vcNom
         oServicio.desSer = vcDes
         oServicio.cost = dcCos
         'GRUPOS
         Dim lstGrupoOrigen As New List(Of ENT_GEN_GrupoOrigen)
         If vcGrupAdd <> "" Then
            Dim lstIdGrupsAdd As List(Of String) = vcGrupAdd.Split(",").ToList()
            For Each id As String In lstIdGrupsAdd
               Dim oGrupo As New ENT_GEN_GrupoOrigen
               oGrupo.P_inCodGruOri = Convert.ToInt32(id)
               oGrupo.btEst = True
               lstGrupoOrigen.Add(oGrupo)
            Next
         End If
         If vcGrupDel <> "" Then
            Dim lstIdGrupsDel As List(Of String) = vcGrupDel.Split(",").ToList()
            For Each id As String In lstIdGrupsDel
               Dim oGrupo As New ENT_GEN_GrupoOrigen
               oGrupo.P_inCodGruOri = Convert.ToInt32(id)
               oGrupo.btEst = False
               lstGrupoOrigen.Add(oGrupo)
            Next
         End If
         oServicio.grup = lstGrupoOrigen
         'FIN GRUOS
         If (inIdSer = -1) Then
            resultado = ServicioOperador.Insertar(oServicio)
         Else
            resultado = ServicioOperador.Actualizar(oServicio)
         End If

         Return resultado
      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      Finally
         If ServicioOperador IsNot Nothing Then ServicioOperador.Dispose()

      End Try
    End Function

    Private Function ObtenerTipoLinea_X_Usuario(ByVal oUsuario As ENT_SEG_Usuario) As String
        Dim vcPerfiles As String = String.Empty
        Dim vcPerfil As String = ""
        For p As Integer = 0 To oUsuario.Perfiles.Count - 1
            If (vcPerfiles = "") Then
                If oUsuario.Perfiles(p).inCodTip_General.ToString() = 1 And Not vcPerfiles.Contains(oUsuario.Perfiles(p).inCodTip_General()) Then
                    vcPerfiles = oUsuario.Perfiles(p).inCodTip_General.ToString()
                ElseIf oUsuario.Perfiles(p).inCodTip_General.ToString() = 2 And Not vcPerfiles.Contains(oUsuario.Perfiles(p).inCodTip_General.ToString()) Then
                    vcPerfiles = oUsuario.Perfiles(p).inCodTip_General.ToString()
                ElseIf oUsuario.Perfiles(p).inCodTip_General.ToString() = 0 And Not vcPerfiles.Contains(oUsuario.Perfiles(p).inCodTip_General.ToString()) Then
                    vcPerfiles = oUsuario.Perfiles(p).inCodTip_General.ToString()
                End If
            Else
                If oUsuario.Perfiles(p).inCodTip_General.ToString() = 1 And Not vcPerfiles.Contains(oUsuario.Perfiles(p).inCodTip_General.ToString()) Then
                    vcPerfiles += "," + oUsuario.Perfiles(p).inCodTip_General.ToString()
                ElseIf oUsuario.Perfiles(p).inCodTip_General.ToString() = 2 And Not vcPerfiles.Contains(oUsuario.Perfiles(p).inCodTip_General.ToString()) Then
                    vcPerfiles += "," + oUsuario.Perfiles(p).inCodTip_General.ToString()
                ElseIf oUsuario.Perfiles(p).inCodTip_General.ToString() = 0 And Not vcPerfiles.Contains(oUsuario.Perfiles(p).inCodTip_General.ToString()) Then
                    vcPerfiles += "," + oUsuario.Perfiles(p).inCodTip_General.ToString()
                End If
            End If
        Next
        '---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        If vcPerfiles = "1,2" Or vcPerfiles = "2,1" Or vcPerfiles.Contains("0") Then
            vcPerfil = "0"
        ElseIf vcPerfiles <> "" Then
            vcPerfil = vcPerfiles.ToString()
        End If

        Return vcPerfil

    End Function


End Class
