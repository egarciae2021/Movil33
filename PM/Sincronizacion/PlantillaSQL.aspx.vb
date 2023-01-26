Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports System.Web.Services
Imports System.Data
Imports System.Data.SqlClient
Imports System.Web.Script.Serialization
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.PCSistelMovil.General.BE
Imports System.Web.Script.Services
Imports System.DirectoryServices

Public Class PlantillaSQL
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim Sincronizacion As BL_GEN_Sincronizacion = Nothing
        Try

            If Not Page.IsPostBack Then
                Sincronizacion = New BL_GEN_Sincronizacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                Session("tipoorigen") = Request.QueryString("TipoOrigen").ToString()

                hdtipo.Value = HttpContext.Current.Session("ModuloOpcion").ToString()

                Dim tipo As String
                tipo = Opcion.SelectedValue.ToString()
                Dim opcion__1 As String = HttpContext.Current.Session("ModuloOpcion").ToString()

                Dim tablaorigen As DataTable = Sincronizacion.ListarCamposOrdenFiltroEqui(HttpContext.Current.Session("tipoorigen").ToString())
                ddlcampopcsistel.DataTextField = "CAMP_vcDESCRIPCION"
                ddlcampopcsistel.DataValueField = "CAMP_vcDESCRIPCION"
                ddlcampopcsistel.DataSource = tablaorigen
                ddlcampopcsistel.DataBind()


                ' COMBO SEPARADOR
                Dim tablaorigen1 As DataTable = Sincronizacion.ListarCamposLDAP(opcion__1, tipo, HttpContext.Current.Session("tipoorigen").ToString())

                Dim columna As String = tablaorigen1.Columns(0).ColumnName
                If columna = "COAD_VCCAMPO" Then

                    ddlcampoldap.DataTextField = "COAD_vcCAMPO"
                    ddlcampoldap.DataValueField = "COAD_vcCAMPO"
                ElseIf columna = "SIN_C_vcCOADCAMPO" Then
                    ddlcampoldap.DataTextField = "SIN_C_vcCOADCAMPO"
                    ddlcampoldap.DataValueField = "SIN_C_vcCOADCAMPO"
                End If
                ddlcampoldap.DataSource = tablaorigen1
                'fillDatos();


                ddlcampoldap.DataBind()


            End If
            UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try

    End Sub

    <WebMethod> _
    Public Shared Function Cargarservidor(tipo As String) As List(Of ENTOrigen)
        Dim Sincronizacion As BL_GEN_Sincronizacion = Nothing
        Try
            Sincronizacion = New BL_GEN_Sincronizacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim opcion As String = HttpContext.Current.Session("ModuloOpcion").ToString()

            Dim lstCampo As New List(Of ENTOrigen)()
            lstCampo = Sincronizacion.getServidor(tipo, opcion, HttpContext.Current.Session("tipoorigen").ToString())
            Return lstCampo
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            Sincronizacion.Dispose()
        End Try
    End Function

    <WebMethod> _
    Public Shared Function CargarCamposLDAP(tipo As String) As List(Of ENTCamposLDAP)
        Dim Sincronizacion As BL_GEN_Sincronizacion = Nothing
        Try
            Sincronizacion = New BL_GEN_Sincronizacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim opcion As String = HttpContext.Current.Session("ModuloOpcion").ToString()

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

    <WebMethod> _
    Public Shared Function Actualizarcomboldap(tipo As String) As List(Of String)
        Dim Sincronizacion As BL_GEN_Sincronizacion = Nothing
        Try
            Sincronizacion = New BL_GEN_Sincronizacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim opcion As String = HttpContext.Current.Session("ModuloOpcion").ToString()
            Dim list As New List(Of String)()

            Dim tablaorigen As DataTable = Sincronizacion.ListarCamposLDAP(opcion, tipo, HttpContext.Current.Session("tipoorigen").ToString())

            Dim columna As String = tablaorigen.Columns(0).ColumnName
            If columna = "COAD_VCCAMPO" Then
                For Each row As DataRow In tablaorigen.Rows
                    list.Add(String.Format("{0}", row("COAD_VCCAMPO")))
                Next
            ElseIf columna = "SIN_C_vcCOADCAMPO" Then
                For Each row As DataRow In tablaorigen.Rows
                    list.Add(String.Format("{0}", row("SIN_C_vcCOADCAMPO")))

                Next
            End If
            Return list
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            Sincronizacion.Dispose()
        End Try
    End Function

    <WebMethod> _
    Public Shared Function CargarEquivalenciaCampos(tipo As String) As List(Of ENTEquivalenciaCampos)
        Dim Sincronizacion As BL_GEN_Sincronizacion = Nothing
        Try
            Sincronizacion = New BL_GEN_Sincronizacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim opcion As String = HttpContext.Current.Session("ModuloOpcion").ToString()
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

    <WebMethod> _
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
                'Sincronizacion.GrabarDominio(oPlantilla.Servidor, oPlantilla.Dominio, oPlantilla.Usuario, oPlantilla.Password, oPlantilla.Puerto, "", False)
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

    <WebMethod> _
    Public Shared Function GrabarServidor(oServidor As String, tipo As String) As String
        Dim Sincronizacion As BL_GEN_Sincronizacion = Nothing
        Try
            Sincronizacion = New BL_GEN_Sincronizacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim opcion As String = HttpContext.Current.Session("ModuloOpcion").ToString()
            Sincronizacion.Actualizar("SIN_D_ELIMINAR_SERVIDORES", opcion, tipo, HttpContext.Current.Session("tipoorigen").ToString())

            Dim oSerializer As New JavaScriptSerializer()
            Dim ListaPlantilla As List(Of ENTOrigen) = oSerializer.Deserialize(Of List(Of ENTOrigen))(oServidor)

            For Each oPlantilla As ENTOrigen In ListaPlantilla
                ' oServidor=oServidor.Replace("&#92", "\\");
                Sincronizacion.GrabarServidor(oPlantilla.servidor.Replace("&#92", "\"), oPlantilla.BASEDATO, oPlantilla.usuario.Replace("&#92", "\"), oPlantilla.PWD.Replace("&#92", "\"), oPlantilla.tabla, oPlantilla.autentificacion, _
                                              tipo, opcion, HttpContext.Current.Session("tipoorigen").ToString())
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

    <WebMethod> _
    Public Shared Function GrabarCamposLDAP(oDominio As String, tipo As String) As String
        Dim Sincronizacion As BL_GEN_Sincronizacion = Nothing
        Try
            Sincronizacion = New BL_GEN_Sincronizacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim opcion As String = HttpContext.Current.Session("ModuloOpcion").ToString()

            Sincronizacion.Actualizar("SIN_D_ELIMINAR_CAMPOS_LDAP", opcion, tipo, HttpContext.Current.Session("tipoorigen").ToString())

            Dim oSerializer As New JavaScriptSerializer()
            Dim ListaPlantilla As List(Of ENTCamposLDAP) = oSerializer.Deserialize(Of List(Of ENTCamposLDAP))(oDominio)

            For Each oPlantilla As ENTCamposLDAP In ListaPlantilla
                Sincronizacion.GrabarCampoLdap(oPlantilla.Campo, opcion, tipo, HttpContext.Current.Session("tipoorigen").ToString())
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

    <WebMethod> _
    Public Shared Function TestearAD(dominio As String, usuario As String, clave As String) As String
        Try
            Dim entry As New DirectoryEntry(Convert.ToString("LDAP://") & dominio, Convert.ToString(dominio & Convert.ToString("\")) & usuario, clave)

            'creamos un objeto nativo para forzar la autenticación 
            Dim obj As [Object] = entry.NativeObject
            Dim search As New DirectorySearcher(entry)

            search.Filter = (Convert.ToString("(SAMAccountName=") & usuario) + ")"
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
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    <WebMethod> _
    Public Shared Function TraerCamposLDAP(dominio As String, usuario As String, clave As String, autentificacion As String) As List(Of ENTCamposLDAP)
        Try
            Dim entry As New DirectoryEntry(Convert.ToString("LDAP://") & dominio, Convert.ToString(dominio & Convert.ToString("\")) & usuario, clave)

            'creamos un objeto nativo para forzar la autenticación 
            Dim obj As [Object] = entry.NativeObject
            Dim search As New DirectorySearcher(entry)
            Dim strSearchAD As String = (Convert.ToString("(sAMAccountName=") & usuario) + ")"
            search.Filter = (Convert.ToString("(&(objectClass=user)") & strSearchAD) + ")"
            search.Filter = (Convert.ToString("(&(objectCategory=person)(objectClass=user)(SAMAccountName=") & usuario) + ")"
            search.PropertiesToLoad.Add("cn")
            Dim adSearch As New System.DirectoryServices.DirectorySearcher(entry)
            adSearch.Filter = (Convert.ToString("(&(objectClass=user)") & strSearchAD) + ")"
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
        End Try
    End Function

    <WebMethod> _
    Public Shared Function Traercampos(Servidor As String, Autenticacion As String, BaseDatos As String, Usuario As String, Password As String, tabla As String) As Object
        Dim tb As New DataTable()
        Dim list As New List(Of String)()
        Try
            Dim vcServidor As String = ""
            Dim vcUsuario As String = ""
            Dim vcContraseña As String = ""
            vcServidor = Servidor.ToString().Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """")
            vcUsuario = Usuario.ToString().Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """")
            vcContraseña = Password.ToString().Replace("&#39", "'").Replace("&#92", "\").Replace("&#34", """")
            Dim connectionstring As String = ""
            Dim myStrings As IList(Of String) = New List(Of String)()

            If Autenticacion = "Windows" Then
                connectionstring = (Convert.ToString((Convert.ToString("Data Source=") & vcServidor) + ";Initial Catalog=") & BaseDatos) + "; Integrated Security = True; connection timeout=2;"
            ElseIf Autenticacion = "Usuario y Contraseña" Then
                connectionstring = (Convert.ToString((Convert.ToString((Convert.ToString((Convert.ToString("Data Source=") & vcServidor) + ";Initial Catalog=") & BaseDatos) + ";user id=") & vcUsuario) + ";password=") & vcContraseña) + ";connection timeout=2;"
            Else
                connectionstring = (Convert.ToString((Convert.ToString((Convert.ToString((Convert.ToString("Data Source=") & vcServidor) + ";Initial Catalog=") & BaseDatos) + ";user id=") & vcUsuario) + ";password=") & vcContraseña) + ";connection timeout=2;"
            End If

            tb = traecolumnastabla(connectionstring, tabla)

            For Each row As DataRow In tb.Rows
                list.Add(String.Format("{0}", row("COLUMN_NAME")))
            Next

            Return list
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    <WebMethod> _
    Public Shared Function GrabarEquivalencia(oDominio As String, tipo As String) As String
        Dim Sincronizacion As BL_GEN_Sincronizacion = Nothing
        Try
            Sincronizacion = New BL_GEN_Sincronizacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim opcion As String = HttpContext.Current.Session("ModuloOpcion").ToString()
            Sincronizacion.Actualizar("SIN_D_ELIMINAR_EQUIVALENCIAS", opcion, tipo, HttpContext.Current.Session("tipoorigen").ToString())

            Dim oSerializer As New JavaScriptSerializer()
            Dim ListaPlantilla As List(Of ENTEquivalenciaCampos) = oSerializer.Deserialize(Of List(Of ENTEquivalenciaCampos))(oDominio)

            For Each oPlantilla As ENTEquivalenciaCampos In ListaPlantilla
                If oPlantilla.CampoSistel.ToString().ToUpper() <> "REGISTRO" Then
                    oPlantilla.obligatorio = (If(oPlantilla.obliga = "Verdadero", True, False))
                    Sincronizacion.GrabarEquivalencia(oPlantilla.CampoSistel, oPlantilla.TipoCampo, oPlantilla.CampoEquivale, oPlantilla.Columna, oPlantilla.Longitud, oPlantilla.obligatorio, tipo, opcion, HttpContext.Current.Session("tipoorigen").ToString())
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

    <WebMethod(EnableSession:=True)> _
    Public Shared Function Listarcampopcsistel(maxFilas As String, valor As String, tipo As String) As List(Of ENTBusqueda)
        Dim Sincronizacion As BL_GEN_Sincronizacion = Nothing
        Try
            Sincronizacion = New BL_GEN_Sincronizacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            'Dim Empleado As New BLLSincronizacion()

            valor = valor.Replace("&#39", "''")
            Return Sincronizacion.ListarBusqueda(valor, Integer.Parse(maxFilas), tipo)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            Sincronizacion.Dispose()
        End Try
    End Function

    <WebMethod> _
    Public Shared Function TraeUsuarios(servidor As String, dominio As String, usuario As String, clave As String, puerto As String, nombre As String, autenticacion As String) As ArrayList
        Try
            Dim lista As New ArrayList()
            lista = ClaseLDAP.ClaseLDAP.ListarUsuarios(servidor, dominio, puerto, usuario, clave, autenticacion, False, nombre)

            Return lista
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    <WebMethod> _
    Public Shared Function TraeDataUsuarios(servidor As String, dominio As String, usuario As String, clave As String, puerto As String, nombre As String, autenticacion As String) As List(Of ENTCamposUsuarios)
        Try
            Dim lstCampo As New List(Of ENTCamposUsuarios)()
            lstCampo = ListarDatos(servidor, dominio, puerto, usuario, clave, autenticacion, False, nombre)
            Return lstCampo
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try

    End Function

    <WebMethod> _
    Public Shared Function ComprobarConexion(Servidor As String, Autenticacion As String, Usuario As String, Password As String, BaseDatos As String, tabla As String) As Object
        Try
            Dim connectionstring As String
            Dim myStrings As IList(Of String) = New List(Of String)()

            If Autenticacion = "SI" Then
                connectionstring = (Convert.ToString((Convert.ToString("Data Source=") & Servidor) + ";Initial Catalog=") & BaseDatos) + "; Integrated Security = True; connection timeout=2;"
            Else
                connectionstring = (Convert.ToString((Convert.ToString((Convert.ToString((Convert.ToString("Data Source=") & Servidor) + ";Initial Catalog=") & BaseDatos) + ";user id=") & Usuario) + ";password=") & Password) + ";connection timeout=2;"
            End If

            If VerificaConexionBD(connectionstring) Then
                myStrings.Add("1")

                If verificatabla(connectionstring, tabla) Then
                    myStrings.Add("2")

                End If
            Else
                myStrings.Add("3")
            End If
            Return myStrings
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

    Public Shared Function VerificaConexionBD(strCadenaConexion As String) As Boolean
        Try
            Using conn As New SqlConnection(strCadenaConexion)
                conn.Open()
                conn.Close()
            End Using
            Return True
        Catch ex As Exception
            Return False
        End Try
    End Function

    Public Shared Function verificatabla(strCadenaConexion As String, tabla As String) As Boolean
        Try
            Using conn As New SqlConnection(strCadenaConexion)
                conn.Open()
                Dim comando As String = (Convert.ToString("SELECT count(*) FROM sysobjects WHERE type IN (N'U', N'V') AND name = '") & tabla) + "'"

                'string comando = "if EXISTS (SELECT * FROM sysobjects WHERE type = 'U' AND name = '"+tabla+"') begin select * from "+tabla+" end";
                Dim cmd As New SqlCommand(comando, conn)

                '    SqlDataReader reader= cmd.ExecuteReader();
                Dim resultado As Integer = Convert.ToInt32(cmd.ExecuteScalar())
                'if (String.IsNullOrEmpty(Convert.ToString(reader)))
                If resultado = 1 Then
                    Return True
                Else
                    Return False
                End If

            End Using
        Catch ex As Exception
            Return False
        End Try

    End Function

    Public Shared Function traecolumnastabla(strCadenaConexion As String, tabla As String) As DataTable
        Dim resultado As New DataTable()
        Try
            Using conn As New SqlConnection(strCadenaConexion)
                conn.Open()
                Dim comando As String = (Convert.ToString((Convert.ToString(" IF EXISTS (SELECT * FROM sysobjects WHERE type IN (N'U', N'V') AND name = '") & tabla) + "')" + " begin " + " SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS where table_name = '") & tabla) + "' " + " end " + " else " + " begin " + " select '' " + " end"

                Dim cmd As New SqlCommand(comando, conn)
                Dim da As New SqlDataAdapter(cmd)
                da.Fill(resultado)
                Return resultado
            End Using
        Catch ex As Exception
            resultado.Columns.Add("COLUMN_NAME")
            Dim renglon As DataRow = resultado.NewRow()
            renglon("COLUMN_NAME") = "1"
            resultado.Rows.Add(renglon)
            Return resultado
        End Try
    End Function

End Class