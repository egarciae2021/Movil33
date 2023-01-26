Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports System.Web.Services
Imports System.Data
Imports System.Web.Script.Serialization
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.PCSistelMovil.General.BE
Imports System.Web.Script.Services
Imports System.DirectoryServices



Public Class PlantillaAD
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load

        Dim Sincronizacion As BL_GEN_Sincronizacion = Nothing

        Try
            If Not Page.IsPostBack Then

                Sincronizacion = New BL_GEN_Sincronizacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                Session("tipoorigen") = Request.QueryString("TipoOrigen").ToString()

                Dim tipo As String = "pcsistel"
                Dim opcion As String = "pcsistel"


                Dim tablaorigen As DataTable = Sincronizacion.ListarCamposEquivalente()
                ddlcampopcsistel.DataTextField = "CAMP_vcDESCRIPCION"
                ddlcampopcsistel.DataValueField = "CAMP_vcDESCRIPCION"
                ddlcampopcsistel.DataSource = tablaorigen
                ddlcampopcsistel.DataBind()

                Dim tablaorigen1 As DataTable = Sincronizacion.ListarCamposLDAP(tipo, opcion, HttpContext.Current.Session("tipoorigen").ToString())

                Dim columna As String = tablaorigen1.Columns(0).ColumnName


                If (columna = "COAD_VCCAMPO") Then

                    ddlcampoldap.DataTextField = "COAD_vcCAMPO"
                    ddlcampoldap.DataValueField = "COAD_vcCAMPO"

                ElseIf (columna = "SIN_C_vcCOADCAMPO") Then

                    ddlcampoldap.DataTextField = "SIN_C_vcCOADCAMPO"
                    ddlcampoldap.DataValueField = "SIN_C_vcCOADCAMPO"
                End If


                ddlcampoldap.DataSource = tablaorigen1
                ddlcampoldap.DataBind()
                Session("tipoorigen") = Request.QueryString("TipoOrigen").ToString()

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


    <WebMethod()> _
    Public Shared Function CargarDominios() As List(Of ENTDominioSincronizacionAD)
        Dim Sincronizacion As BL_GEN_Sincronizacion = Nothing
        Try
            Sincronizacion = New BL_GEN_Sincronizacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)


            Dim lstCampo As New List(Of ENTDominioSincronizacionAD)()
            lstCampo = Sincronizacion.getDominios()

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
    Public Shared Function CargarCamposLDAP() As List(Of ENTCamposLDAP)
        Dim Sincronizacion As BL_GEN_Sincronizacion = Nothing
        Try
            Sincronizacion = New BL_GEN_Sincronizacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Dim tipo As String = "pcsistel"
            Dim opcion As String = "pcsistel"

            Dim lstCampo As New List(Of ENTCamposLDAP)()
            lstCampo = Sincronizacion.getCamposLDAP(tipo, opcion, HttpContext.Current.Session("tipoorigen").ToString())

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
    Public Shared Function CargarEquivalenciaCampos() As List(Of ENTEquivalenciaCampos)
        Dim Sincronizacion As BL_GEN_Sincronizacion = Nothing
        Try
            Sincronizacion = New BL_GEN_Sincronizacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Dim tipo As String = "pcsistel"
            Dim opcion As String = "pcsistel"

            Dim lstCampo As New List(Of ENTEquivalenciaCampos)()
            lstCampo = Sincronizacion.getEquivalenciaCampos(tipo, opcion, HttpContext.Current.Session("tipoorigen").ToString())

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
    Public Shared Function GrabarDominios(oDominio As String) As String
        Dim Sincronizacion As BL_GEN_Sincronizacion = Nothing
        Try
            Sincronizacion = New BL_GEN_Sincronizacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Dim TipoModulo As String = HttpContext.Current.Session("ModuloOpcion").ToString()
            Dim tipo As String = "pcsistel"


            Sincronizacion.Actualizar("SIN_D_ELIMINAR_DOMINIOS", TipoModulo, tipo, HttpContext.Current.Session("tipoorigen").ToString())


            Dim oSerializer As New JavaScriptSerializer()
            Dim ListaPlantilla As List(Of ENTDominioSincronizacionAD) = oSerializer.Deserialize(Of List(Of ENTDominioSincronizacionAD))(oDominio)

            For Each oPlantilla As ENTDominioSincronizacionAD In ListaPlantilla
                Sincronizacion.GrabarDominio(oPlantilla.Servidor, oPlantilla.Dominio, oPlantilla.Usuario, oPlantilla.Password, oPlantilla.Puerto)
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


    <WebMethod()> _
    Public Shared Function GrabarCamposLDAP(oDominio As String) As String
        Dim Sincronizacion As BL_GEN_Sincronizacion = Nothing
        Try
            Sincronizacion = New BL_GEN_Sincronizacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Dim TipoModulo As String = HttpContext.Current.Session("ModuloOpcion").ToString()
            Dim tipo As String = "pcsistel"

            Sincronizacion.Actualizar("SIN_D_ELIMINAR_CAMPOS_LDAP", TipoModulo, tipo, HttpContext.Current.Session("tipoorigen").ToString())


            Dim oSerializer As New JavaScriptSerializer()
            Dim ListaPlantilla As List(Of ENTCamposLDAP) = oSerializer.Deserialize(Of List(Of ENTCamposLDAP))(oDominio)

            For Each oPlantilla As ENTCamposLDAP In ListaPlantilla
                Sincronizacion.GrabarCampoLdap(oPlantilla.Campo, TipoModulo, tipo, HttpContext.Current.Session("tipoorigen").ToString())
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

    <WebMethod()> _
    Public Shared Function TestearAD(dominio As String, usuario As String, clave As String) As String

        Try

            Dim entry As DirectoryEntry = New DirectoryEntry("LDAP://" + dominio, dominio + "\" + usuario, clave)

            Dim obj As Object = entry.NativeObject
            Dim search As DirectorySearcher = New DirectorySearcher(entry)


            search.Filter = "(SAMAccountName=" & usuario & ")"
            search.PropertiesToLoad.Add("cn")
            Dim result As SearchResult = search.FindOne()

            If (result Is Nothing) Then
                Return "No se pudo conectar, Valide sus datos"
            Else
                Return "Conexión Satisfactoria"
            End If


        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            'Return ex.ToString()
            Return ex.Message.ToString()
        Finally

        End Try
    End Function



    <WebMethod()> _
    Public Shared Function TraerCamposLDAP(dominio As String, usuario As String, clave As String, autentificacion As String) As List(Of ENTCamposLDAP)

        Try


            Dim entry As DirectoryEntry = New DirectoryEntry("LDAP://" + dominio, dominio + "\" + usuario, clave)

            Dim obj As Object = entry.NativeObject
            Dim search As DirectorySearcher = New DirectorySearcher(entry)

            Dim strSearchAD As String = "(SAMAccountName=" & usuario & ")"


            search.Filter = "(&(objectClass=user)" & strSearchAD & ")"
            search.Filter = "(&(objectCategory=person)(objectClass=user)(SAMAccountName=" & usuario & ")"
            search.PropertiesToLoad.Add("cn")

            Dim adSearch As System.DirectoryServices.DirectorySearcher = New System.DirectoryServices.DirectorySearcher(entry)

            adSearch.Filter = "(&(objectClass=user)" & strSearchAD & ")"
            Dim objResultados As SearchResultCollection
            objResultados = adSearch.FindAll()


            Dim lstCampo As New List(Of ENTCamposLDAP)()



            For Each MiObjeto As SearchResult In objResultados

                For Each oo As System.Collections.DictionaryEntry In MiObjeto.Properties

                    Dim oCampo As New ENTCamposLDAP()
                    oCampo.Campo = oo.Key.ToString()
                    lstCampo.Add(oCampo)
                Next

            Next



            Return lstCampo

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally

        End Try
    End Function

    <WebMethod()> _
    Public Shared Function GrabarEquivalencia(oDominio As String) As String
        Dim Sincronizacion As BL_GEN_Sincronizacion = Nothing
        Try
            Sincronizacion = New BL_GEN_Sincronizacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            Dim TipoModulo As String = HttpContext.Current.Session("ModuloOpcion").ToString()
            Dim tipo As String = "pcsistel"

            Sincronizacion.Actualizar("SIN_D_ELIMINAR_EQUIVALENCIAS", TipoModulo, tipo, HttpContext.Current.Session("tipoorigen").ToString())


            Dim oSerializer As New JavaScriptSerializer()
            Dim ListaPlantilla As List(Of ENTEquivalenciaCampos) = oSerializer.Deserialize(Of List(Of ENTEquivalenciaCampos))(oDominio)

            For Each oPlantilla As ENTEquivalenciaCampos In ListaPlantilla

                If oPlantilla.CampoSistel.ToString().ToUpper() <> "REGISTRO" Then

                    oPlantilla.obligatorio = IIf(oPlantilla.obliga = "Verdadero", True, False)



                    Sincronizacion.GrabarEquivalencia(oPlantilla.CampoSistel, oPlantilla.TipoCampo, oPlantilla.CampoEquivale, oPlantilla.Columna,
                                                                   oPlantilla.Longitud, oPlantilla.obligatorio, TipoModulo, tipo, HttpContext.Current.Session("tipoorigen").ToString())

                End If


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

    <WebMethod()> _
    Public Shared Function Listarcampopcsistel(maxFilas As String, valor As String, tipo As String) As List(Of ENTBusqueda)
        Dim Sincronizacion As BL_GEN_Sincronizacion = Nothing


        Try
            Sincronizacion = New BL_GEN_Sincronizacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            valor = valor.Replace("&#39", "''")

            Return Sincronizacion.ListarBusqueda(valor, Val(maxFilas), tipo)


        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            Sincronizacion.Dispose()
        End Try
    End Function


    <WebMethod()> _
    Public Shared Function TraeUsuarios(servidor As String, dominio As String, usuario As String, clave As String, puerto As String, nombre As String, _
 autenticacion As String) As ArrayList


        Try

            Dim lista As New ArrayList()
            lista = ClaseLDAP.ClaseLDAP.ListarUsuarios(servidor, dominio, puerto, usuario, clave, autenticacion, False, nombre)

            Return lista
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally

        End Try
    End Function

    <WebMethod()> _
    Public Shared Function TraeDataUsuarios(servidor As String, dominio As String, usuario As String, clave As String, puerto As String, nombre As String, _
 autenticacion As String) As List(Of ENTCamposUsuarios)

        Try
            Dim lstCampo As New List(Of ENTCamposUsuarios)()
            'lstCampo = ClaseLDAP.ClaseLDAP.ListarDatos(servidor, dominio, puerto, usuario, clave, autenticacion, False, nombre)
            lstCampo = ListarDatos(servidor, dominio, puerto, usuario, clave, autenticacion, False, nombre)
            Return lstCampo
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try

    End Function

    Public Shared Function ListarDatos(ByVal servidor As String, ByVal dominio As String,
                                  ByVal puerto As String, ByVal usuario As String,
                                  ByVal clave As String, Optional ByVal autenticacion As String = "0",
                                  Optional ByVal Busca_Particion As Boolean = False,
                                  Optional ByVal ValorBuscado As String = "") As List(Of ENTCamposUsuarios)

        Dim domainAndUsername As String = Convert.ToString(dominio & Convert.ToString("\")) & usuario
        Dim entry As New DirectoryEntry("", domainAndUsername, clave)
        Dim lista As New List(Of ENTCamposUsuarios)()
        Try
            'Bind to the native AdsObject to force authentication.
            Dim obj As Object = entry.NativeObject
            Dim strIdUser As String = ""
            Dim search As New DirectorySearcher(entry)
            search.Filter = "(SAMAccountName=" + ValorBuscado + ")"
            search.SearchScope = SearchScope.Subtree
            search.Sort.Direction = System.DirectoryServices.SortDirection.Ascending

            Using UserAD = search.FindAll
                For Each User As SearchResult In UserAD
                    If Not User.Properties("SamAccountName").Item(0) = "" Then
                        For Each o As PropertyValueCollection In User.GetDirectoryEntry().Properties
                            Dim oCampo As New ENTCamposUsuarios
                            Debug.Print(o.PropertyName + " = " + o.Value.ToString())
                            oCampo.Campo = o.PropertyName
                            oCampo.Valor = o.Value.ToString()
                            lista.Add(oCampo)
                        Next
                    End If
                Next
            End Using
            Return lista
Continua:
            Return lista
        Catch ex As Exception
            Throw New Exception("Error authenticating user. " + ex.Message)
        End Try
    End Function


End Class