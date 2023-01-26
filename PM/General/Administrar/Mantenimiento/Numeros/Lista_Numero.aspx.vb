Imports System.Web.Services
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Comun.Utilitarios
Imports System.Data
Imports VisualSoft.PCSistelMovil.General.BE
Imports VisualSoft.Suite80.BE

Partial Class General_Administrar_Mantenimiento_Numeros_Lista_Numero
   Inherits System.Web.UI.Page

   Protected Sub General_Administrar_Mantenimiento_Numeros_Lista_Numero_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
      Try
         Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)

         If IsNothing(oUsuario) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
            Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
         Else
            If Not IsPostBack Then

               hdfEmpleado.Value = oUsuario.F_vcCodEmp
               hdfIdUsuarioLogeado.Value = oUsuario.P_inCod
               hdfAdmin.Value = "0"
               hdfCod.Value = "-1"
               If UtilitarioWeb.Seguridad.EsAdministrador Then hdfAdmin.Value = "1"

               Dim GrupBaseDest As BL_GEN_GrupBaseDest = New BL_GEN_GrupBaseDest(oUsuario.IdCliente)
               Dim oGrupBaseDest As List(Of VisualSoft.PCSistelMovil.General.BE.M_GRUP_BASE_DEST) = GrupBaseDest.Listar_combo()
               GrupBaseDest.Dispose()

               ddlTipo.DataTextField = "GRBD_vcNOMGRU"
               ddlTipo.DataValueField = "GRBD_P_tiCODGRU"
               ddlTipo.DataSource = oGrupBaseDest
               ddlTipo.DataBind()

               'Dim empresa As BL_GEN_Empresa = new BL_GEN_Empresa(oUsuario.IdCliente)
               'Dim oEmpresa As List(Of ENT_GEN_Empresa) = empresa.Listar("0", "---Seleccione---")

               'ddlEmpresa.DataTextField = "vcRazSoc"
               'ddlEmpresa.DataValueField = "P_vcCodEmp"
               'ddlEmpresa.DataSource = oEmpresa
               'ddlEmpresa.DataBind()

            End If

            UtilitarioWeb.AgregarTema(Server, Page.Header, oUsuario.CaracteristicaUsuario.vcTem)
         End If
      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      End Try
   End Sub

   <WebMethod()>
   Public Shared Function ListarEmpresa(ByVal vcRazSoc As String) As List(Of ENT_GEN_Empresa)
      Try
         Dim Empresa As BL_GEN_Empresa = New BL_GEN_Empresa(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
         Dim LISTAEMPRESA As List(Of ENT_GEN_Empresa) = Empresa.ListarPorNombre(vcRazSoc)
         Empresa.Dispose()
         Return LISTAEMPRESA
      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      End Try
   End Function

   <WebMethod()>
   Public Shared Function ListarPais() As List(Of ENT_GEN_Pais)
      Dim Pais As BL_GEN_Pais = Nothing
      Dim LISTAPAIS As List(Of ENT_GEN_Pais) = Nothing
      Try
         Pais = New BL_GEN_Pais(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
         LISTAPAIS = Pais.Listar("", "")
      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      Finally
         If Pais IsNot Nothing Then
            Pais.Dispose()
         End If
      End Try
      Return LISTAPAIS
   End Function

   <WebMethod()>
   Public Shared Function ListarCiudad(ByVal prCodPais As String) As List(Of ENT_GEN_Ciudad)
      Try
         Dim codPais As String = prCodPais.Substring(prCodPais.IndexOf("(") + 1)
         codPais = codPais.Replace(")", "")
         Dim Ciudad As BL_GEN_Ciudad = New BL_GEN_Ciudad(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

         Dim _return As List(Of ENT_GEN_Ciudad) = Ciudad.ListarPorPais(codPais, "", "")
         Ciudad.Dispose()
         Return _return

      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      End Try
   End Function

   <WebMethod()>
   Public Shared Function ListarNumero_x_dato(ByVal prCodPais As String, ByVal prCodCiudad As String, _
                                               ByVal prDato As String, ByVal prTipoConsulta As Byte) As List(Of VisualSoft.PCSistelMovil.General.BE.M_NUME)
      Try
         Dim codPais As String = prCodPais.Substring(prCodPais.IndexOf("(") + 1)
         codPais = codPais.Replace(")", "")
         Dim codCiudad As String = prCodCiudad.Substring(prCodCiudad.IndexOf("(") + 1)
         codCiudad = codCiudad.Replace(")", "")
         Dim Numero As BL_GEN_Numero = New BL_GEN_Numero(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

         Dim _return As List(Of VisualSoft.PCSistelMovil.General.BE.M_NUME) = Numero.ListarNumero_x_dato(codPais, codCiudad, prDato, prTipoConsulta)
         Numero.Dispose()
         Return _return

      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      End Try
   End Function

   <WebMethod()>
   Public Shared Function obtenerSubtipo(ByVal prIdTipo As Integer) As List(Of VisualSoft.PCSistelMovil.General.BE.M_GRUP_DEST)
      Try

         Dim subtipo As BL_GEN_GrupDest = New BL_GEN_GrupDest(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
         Dim _return As List(Of VisualSoft.PCSistelMovil.General.BE.M_GRUP_DEST) = subtipo.obtener_M_GRUP_DEST_x_M_GRUP_BASE(prIdTipo)

         subtipo.Dispose()

         Return _return

      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      End Try
   End Function

    <WebMethod()>
    Public Shared Function Guardar(ByVal prCodPais As String, ByVal prCodCiudad As String, ByVal prNumTelefono As String, ByVal prDescNum As String, _
                                   ByVal prEsMonitoreado As Boolean, ByVal prTipo As Byte, ByVal prSubtipo As Byte, ByVal prCodEmpresa As String, _
                                   ByVal esInsertar As Boolean, ByVal prRedPrivada As String) As String
        Dim oNumero As New VisualSoft.PCSistelMovil.General.BE.M_NUME
        Dim numero As BL_GEN_Numero = New BL_GEN_Numero(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

        Dim codPais As String = prCodPais.Substring(prCodPais.IndexOf("(") + 1)
        codPais = codPais.Replace(")", "")
        Dim codCiudad As String = prCodCiudad.Substring(prCodCiudad.IndexOf("(") + 1)
        codCiudad = codCiudad.Replace(")", "")

        oNumero.Pais.P_vcCodPai = codPais.Trim
        oNumero.Ciudad.P_vcCodCiu = codCiudad.Trim
        oNumero.NUME_P_vcNUMTEL = prNumTelefono.Trim
        oNumero.NUME_vcDESNUM = prDescNum.Trim
        oNumero.NUME_btMON = prEsMonitoreado
        oNumero.Tipo.GRBD_P_tiCODGRU = prTipo
        oNumero.SubTipo.GRDE_P_tiCODGRU = prSubtipo
        oNumero.Empresa.P_vcCodEmp = prCodEmpresa.Trim
        oNumero.RedPrivada = prRedPrivada

        Dim resul As Boolean
        Try

            If esInsertar Then
                resul = numero.Actualizar(oNumero)
            Else
                resul = numero.Insertar(oNumero)
            End If
            numero.Dispose()

            If resul Then
                Return ""
            Else
                Return "Error al guardar"
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try

    End Function

   <WebMethod()>
   Public Shared Function Eliminar(ByVal prCodPais As String, ByVal prCodCiudad As String, ByVal prNumTelefono As String) As String
        'Dim oNumero As New M_NUME
      Dim numero As BL_GEN_Numero = New BL_GEN_Numero(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)


      Dim resul As Integer
      Try

         resul = numero.Eliminar(prCodPais, prCodCiudad, prNumTelefono)
         numero.Dispose()

         If resul <> -1 Then
            Return resul
         Else
            Return "No se pudo eliminar el Número. Tiene Dependencias con Exceptos."
         End If

      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      End Try

   End Function

   <WebMethod()>
   Public Shared Function ObtenerPaisInstalacion() As ENT_GEN_Pais
      Dim Pais As BL_GEN_Pais = Nothing
      Dim PaisInstalacion As ENT_GEN_Pais = Nothing
      Try
         Pais = New BL_GEN_Pais(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
         PaisInstalacion = Pais.MostrarPaisInstalacion()
      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      Finally
         If Pais IsNot Nothing Then
            Pais.Dispose()
         End If
      End Try

      Return PaisInstalacion

   End Function
End Class
