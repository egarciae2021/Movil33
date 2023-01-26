Imports Microsoft.VisualBasic
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports System.Data.SqlClient
Imports System.Data
Imports System.IO
Imports System.Net.Mail
Imports VisualSoft.Comun.Utilitarios
Imports System.Xml.Serialization
Imports System.Net
Imports System.Threading
Imports System
Imports System.Globalization
Imports ClosedXML.Excel
Imports VisualSoft.PCSistelMovil.General.BE
Imports Ionic.Zip
Imports System.ComponentModel

Public Structure LicenciaWeb
    Public CantidadDispositivos As Integer
    Public TipoLicencia As String
    Public DiasDemo As Integer
    Public FechaInicioDemo As String
End Structure

Public Class UtilitarioWeb
    Public Shared MensajeError As String = "Error en la acción realizada, comuníquese con el área de sistemas"


    Public Shared Function ConvertirDataSet_ListaObjetos(ByVal dsResultado As DataSet) As List(Of Object)
        Dim lstObjPrincipal As New List(Of Object)
        Try
            If dsResultado IsNot Nothing AndAlso dsResultado.Tables.Count > 0 Then
                Dim lstObj As List(Of Object)
                Dim dict As Dictionary(Of String, Object)
                'Listado..
                For Each Tabla As DataTable In dsResultado.Tables
                    lstObj = New List(Of Object)
                    For i As Integer = 0 To Tabla.Rows.Count - 1
                        dict = New Dictionary(Of String, Object)
                        For Each Columna As DataColumn In Tabla.Columns
                            dict.Add(Columna.ColumnName, Tabla.Rows(i)(Columna.ColumnName).ToString())
                        Next
                        lstObj.Add(dict)
                    Next
                    lstObjPrincipal.Add(lstObj)
                Next
            End If
        Catch ex As Exception
        End Try
        Return lstObjPrincipal
    End Function

    Public Shared Function ConvertirListaObjectos_Datatable(Of T)(ByVal data As IList(Of T)) As DataTable
        Dim properties As PropertyDescriptorCollection = TypeDescriptor.GetProperties(GetType(T))
        Dim table As DataTable = New DataTable()
        For Each prop As PropertyDescriptor In properties
            table.Columns.Add(prop.Name, If(Nullable.GetUnderlyingType(prop.PropertyType), prop.PropertyType))
        Next
        For Each item As T In data
            Dim row As DataRow = table.NewRow()
            For Each prop As PropertyDescriptor In properties
                row(prop.Name) = If(prop.GetValue(item), DBNull.Value)
            Next
            table.Rows.Add(row)
        Next
        Return table
    End Function

    Private Shared Function AppPath() As String
        Return System.AppDomain.CurrentDomain.BaseDirectory()
    End Function

    Public Shared Sub procGeneraLOG(ByVal pstrValor As String)

        Dim generarLog As Boolean = False

        Try
            Dim strStreamW As Stream
            Dim strStreamWriter As StreamWriter
            Dim strLog As String = ConfigurationManager.AppSettings("GenerarLog")

            generarLog = If(Not String.IsNullOrEmpty(strLog) AndAlso (strLog = "0" Or strLog = "1"), Convert.ToBoolean(Convert.ToInt32(strLog)), False)

            If generarLog Then
                Dim FilePath As String = AppPath() & "\LogErrores\Log_Error_" & Format(Now, "yyyyMMdd") & ".log"
                If Not Directory.Exists(AppPath() & "\LOG") Then
                    Directory.CreateDirectory(AppPath() & "\LOG")
                End If

                strStreamW = File.Open(FilePath, FileMode.Append)
                strStreamWriter = New StreamWriter(strStreamW, System.Text.Encoding.UTF8)
                strStreamWriter.WriteLine(Now & ": " & pstrValor)
                strStreamWriter.Close()
            End If

        Catch ex As Exception
        End Try
    End Sub


    Public Shared Function ObtieneMO360() As String
        Dim OrigenMO360 As String = "" & ConfigurationManager.AppSettings("OrigenMO360")
        If OrigenMO360 = "" Then OrigenMO360 = "0"
        Return OrigenMO360
    End Function

    Public Shared Function ObtieneVersionArchivoEstatico(ByVal RutaWeb As String) As String
        Dim RutaArchivo As String = HttpContext.Current.Server.MapPath(RutaWeb)
        Dim VersionArchivo As String = ""
        If File.Exists(RutaArchivo) Then
            If (RutaWeb = "Adm_ListadoSolicitudes.js") Then
                Dim horaActual = DateAndTime.Now().ToString("yyyyMMddhhmmss")
                VersionArchivo = "?v=" & horaActual
            Else
                VersionArchivo = "?v=" & New FileInfo(RutaArchivo).LastWriteTime.ToString("yyyyMMddhhmmss")
            End If
        End If
        Return RutaWeb & VersionArchivo
    End Function

    Public Shared Function ObtieneTemaPrincipal() As String
        Dim Tema As String = "theme-navy"
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            'para validar el tipo de tema  del entorno. -------JPareja
            If oUsuario.CaracteristicaUsuario IsNot Nothing Then
                If (oUsuario.CaracteristicaUsuario.vcTemPrincipal = "redmond") And (oUsuario.CaracteristicaUsuario.vcTem = "redmond") Then
                    Tema = "theme-navy"
                ElseIf (oUsuario.CaracteristicaUsuario.vcTemPrincipal = "redmond") And Not (oUsuario.CaracteristicaUsuario.vcTem = "redmond") Then
                    Tema = oUsuario.CaracteristicaUsuario.vcTem
                ElseIf Not (oUsuario.CaracteristicaUsuario.vcTemPrincipal = "redmond") And (oUsuario.CaracteristicaUsuario.vcTem = "redmond") Then
                    Tema = IIf(oUsuario.CaracteristicaUsuario.vcTemPrincipal = "", "theme-navy", oUsuario.CaracteristicaUsuario.vcTemPrincipal)
                Else
                    If oUsuario.CaracteristicaUsuario.vcTem Is "redmond" Then
                        Tema = oUsuario.CaracteristicaUsuario.vcTemPrincipal
                    Else
                        Tema = oUsuario.CaracteristicaUsuario.vcTem
                    End If
                End If

            Else
                Tema = "theme-navy"
            End If
            'ned
        Catch ex As Exception
        End Try
        Return "Content/css/themes/" & Tema & ".min.css"
    End Function

    Public Shared Function ObtienePublicacionSignalR(ByVal RutaWeb As String) As String
        Dim RutaArchivo As String = ConfigurationManager.AppSettings("pathSignalRPCSistel")
        If Not RutaArchivo.EndsWith("\") Then RutaArchivo &= "\"
        Return RutaArchivo & RutaWeb
    End Function

    Public Shared Function CorrijeNombreArchivo(ByVal name As String) As String
        name = Replace(name, "\", Space(1))
        name = Replace(name, "/", Space(1))
        name = Replace(name, ":", Space(1))
        name = Replace(name, "*", Space(1))
        name = Replace(name, "?", Space(1))
        name = Replace(name, """", Space(1))
        name = Replace(name, "<", Space(1))
        name = Replace(name, ">", Space(1))
        name = Replace(name, "|", Space(1))

        name = HttpUtility.HtmlDecode(name)
        Return name
    End Function

    Public Shared Function NombreArchivoEstandarizado(ByVal pDominio As String, ByVal pUsuario As String)
        pUsuario = Right("00" + pUsuario, 2)
        Dim Dia As String = Right("00" + Now.Day.ToString, 2)
        Dim Mes As String = Right("00" + Now.Month.ToString, 2)
        Dim Anio As String = Right("0000" + Now.Year.ToString, 4)
        Dim Hora As String = Right("00" + Now.Hour.ToString, 2)
        Dim Minuto As String = Right("00" + Now.Minute.ToString, 2)
        Dim Segundo As String = Right("00" + Now.Second.ToString, 2)
        Dim Fecha As String = Anio + Mes + Dia + Hora + Minuto + Segundo

        Return pDominio + "_" + pUsuario + "_" + Fecha
    End Function

    Public Shared Function ComprimeArchivo(ByVal vcRutaArchivoCopiar As String, ByVal vcRutaTMP As String, ByVal NombreZip As String, ByVal NombreArchivo As String, ByVal ExtensionArchivo As String, Optional ByVal CopiaArchivo As Boolean = True) As String

        If Not System.IO.Directory.Exists(vcRutaTMP) Then
            System.IO.Directory.CreateDirectory(vcRutaTMP)
        End If

        If Left(ExtensionArchivo, 1) <> "." Then
            ExtensionArchivo = "." + ExtensionArchivo
        End If

        If CopiaArchivo = True Then
            Try
                FileCopy(vcRutaArchivoCopiar, vcRutaTMP + NombreArchivo + ExtensionArchivo)
            Catch ex As Exception
                File.Copy(vcRutaArchivoCopiar, vcRutaTMP + NombreArchivo + ExtensionArchivo)
            End Try
        End If

        Using zip As New ZipFile
            zip.AddDirectory(vcRutaTMP)
            zip.Save(vcRutaTMP & NombreZip & ".zip")
        End Using

        Dim ArchivoZipeado As String = vcRutaTMP & NombreArchivo & ".zip"

        Return ArchivoZipeado

    End Function


    Public Shared Function QuitarAcentos(inputString As String) As String
        Dim a As New Regex("[á|à|ä|â]", RegexOptions.Compiled)
        Dim e As New Regex("[é|è|ë|ê]", RegexOptions.Compiled)
        Dim i As New Regex("[í|ì|ï|î]", RegexOptions.Compiled)
        Dim o As New Regex("[ó|ò|ö|ô]", RegexOptions.Compiled)
        Dim u As New Regex("[ú|ù|ü|û]", RegexOptions.Compiled)
        Dim n As New Regex("[ñ|Ñ]", RegexOptions.Compiled)
        inputString = a.Replace(inputString, "a")
        inputString = e.Replace(inputString, "e")
        inputString = i.Replace(inputString, "i")
        inputString = o.Replace(inputString, "o")
        inputString = u.Replace(inputString, "u")
        inputString = n.Replace(inputString, "n")
        Return inputString
    End Function


    Public Class JQGridItem
        Sub New()
        End Sub
#Region "Passive attributes"
        Private _id As String
        Private _row As List(Of String)
#End Region
#Region "Properties"
        ''' <summary>
        ''' RowId de la fila.
        ''' </summary>
        Public Property ID As String
            Get
                Return _id
            End Get
            Set(ByVal value As String)
                If _id = value Then
                    Return
                End If
                _id = value
            End Set
        End Property

        ''' <summary>
        ''' Fila del JQGrid.
        ''' </summary>
        Public Property Row() As List(Of String)
            Get
                Return _row
            End Get
            Set(ByVal value As List(Of String))

                _row = value
            End Set
        End Property

#End Region
#Region "Active Attributes"
        ''' <summary>
        ''' Contructor.
        ''' </summary>
        Public Sub New(ByVal pId As String, ByVal pRow As List(Of String))
            _id = pId
            _row = pRow
        End Sub
#End Region
    End Class

    Public Class JQGridJsonResponse
        Sub New()
        End Sub
#Region "Passive attributes."
        Private _totalPaginas As Integer
        Private _paginaActual As Integer
        Private _totalRegistros As Integer
        Private _items As List(Of JQGridItem)
        Private _validate As Integer
#End Region
#Region "Properties"
        ''' <summary>
        ''' Cantidad de páginas del JQGrid.
        ''' </summary>
        Public Property TotalPaginas As Integer
            Get
                Return _totalPaginas
            End Get
            Set(ByVal value As Integer)
                If _totalPaginas = value Then
                    Return
                End If
                _totalPaginas = value
            End Set
        End Property
        ''' <summary>
        ''' Página actual del JQGrid.
        ''' </summary>
        Public Property PaginaActual As Integer
            Get
                Return _paginaActual
            End Get
            Set(ByVal value As Integer)
                If _paginaActual = value Then
                    Return
                End If
                _paginaActual = value
            End Set
        End Property
        ''' <summary>
        ''' Cantidad total de elementos de la lista.
        ''' </summary>
        Public Property TotalRegistros As Integer
            Get
                Return _totalRegistros
            End Get
            Set(ByVal value As Integer)
                If _totalRegistros = value Then
                    Return
                End If
                _totalRegistros = value
            End Set
        End Property

        ''' <summary>
        ''' Cantidad total de elementos de la lista.
        ''' </summary>
        Public Property Validate As Integer
            Get
                Return _validate
            End Get
            Set(ByVal value As Integer)
                If _validate = value Then
                    Return
                End If
                _validate = value
            End Set
        End Property

        ''' <summary>
        ''' Lista de elementos del JQGrid.
        ''' </summary>
        Public Property Items() As List(Of JQGridItem)
            Get
                Return _items
            End Get
            Set(ByVal value As List(Of JQGridItem))
                _items = value
            End Set
        End Property
#End Region
#Region "Active attributes"
        ''' <summary>
        ''' Constructor.
        ''' </summary>
        ''' <param name="dtDetalle">Lista de elementos a mostrar en el JQGrid</param>
        Public Sub New(ByVal p_TotalPaginas As Integer, ByVal p_PaginaActual As Integer, ByVal p_TotalRegistros As Integer, ByVal dtDetalle As DataTable, ByVal inId As Integer)
            _totalPaginas = p_TotalPaginas
            _paginaActual = p_PaginaActual
            _totalRegistros = p_TotalRegistros
            _items = New List(Of JQGridItem)()
            If dtDetalle IsNot Nothing Then
                For Each dr As DataRow In dtDetalle.Rows
                    Dim lstCampo As New List(Of String)
                    Dim ValId As String = ""
                    Dim contReg As Integer = 1

                    For Each obj As Object In dr.ItemArray
                        If contReg > 1 Then
                            lstCampo.Add(obj.ToString)
                        End If
                        If contReg = inId Then
                            ValId = obj.ToString
                        End If
                        contReg = contReg + 1
                    Next
                    _items.Add(New JQGridItem(ValId, lstCampo))
                Next
            End If
        End Sub

        Public Sub New(ByVal p_TotalPaginas As Integer, ByVal p_PaginaActual As Integer, ByVal p_TotalRegistros As Integer, ByVal dtDetalle As DataTable, ByVal inId As Integer, ByVal p_validate As Integer)
            _totalPaginas = p_TotalPaginas
            _paginaActual = p_PaginaActual
            _totalRegistros = p_TotalRegistros
            _items = New List(Of JQGridItem)()
            _validate = p_validate
            If dtDetalle IsNot Nothing Then
                For Each dr As DataRow In dtDetalle.Rows
                    Dim lstCampo As New List(Of String)
                    Dim ValId As String = ""
                    Dim contReg As Integer = 1

                    For Each obj As Object In dr.ItemArray
                        If contReg > 1 Then
                            lstCampo.Add(obj.ToString)
                        End If
                        If contReg = inId Then
                            ValId = obj.ToString
                        End If
                        contReg = contReg + 1
                    Next
                    _items.Add(New JQGridItem(ValId, lstCampo))
                Next
            End If
        End Sub

#End Region
    End Class

    Public Shared NombreSistemaMovil As String = "PCSISTEL_MOVIL"
    Public Shared NombreSistemaHotel As String = "PCSISTEL_HOTELERO"

    Public Shared Sub ConfigurarColumnasServicios(ByVal offset As Integer, ByVal propiedadesServicio As Integer, ByVal dt As DataTable, ByVal vcValIli As String,
                                                  ByRef colmodel As List(Of Object))
        Dim contCol As Integer = 1
        Dim Ancho As Integer = 0

        Dim OpcionesEdicionCantidad(2) As String
        Dim OpcionesEdicionIlimitado(1) As String

        OpcionesEdicionIlimitado(0) = vcValIli
        OpcionesEdicionCantidad(0) = "10" 'size
        OpcionesEdicionCantidad(1) = "4" 'maxlength

        For i = offset To dt.Columns.Count - 1
            If contCol = propiedadesServicio Then
                contCol = 0
                Dim lstPalabras As String() = dt.Rows(1).Item(i).ToString().Split(" ")
                Ancho = 0
                For Each palabra As String In lstPalabras
                    If Ancho < palabra.Length Then
                        Ancho = palabra.Length
                    End If
                Next
                OpcionesEdicionCantidad(0) = Ancho.ToString() 'size
                Ancho *= 9
                If dt.Rows(2).Item(i).ToString() = "0" Then
                    colmodel.Add(JQGrid.Columna(dt.Rows(0).Item(i), dt.Rows(1).Item(i), False, True, Ancho, True, False, "integer", JQGrid.FormatoEdicion.Editable, OpcionesEdicionCantidad))
                Else
                    colmodel.Add(JQGrid.Columna(dt.Rows(0).Item(i), dt.Rows(1).Item(i), False, True, Ancho, True, False, "", JQGrid.FormatoEdicion.Check, OpcionesEdicionIlimitado))
                End If
            Else
                Ancho = dt.Rows(0).Item(i).Length * 8
                colmodel.Add(JQGrid.Columna(dt.Rows(0).Item(i), dt.Rows(0).Item(i), True, True, Ancho, False, False, ""))
            End If
            contCol += 1
        Next
    End Sub

    Public Shared Function fnDetectaSerieAdicional() As String
        Dim strIps As String = fnObtenerIP()
        Dim strIDCliente As String = My.Computer.Name.ToUpper & "&" & strIps
        Return strIDCliente
    End Function
    Private Shared Function fnObtenerIP() As String
        Dim host As String = Dns.GetHostName()
        Dim ip As IPHostEntry = CType(Dns.GetHostEntry(host), IPHostEntry)
        Dim strIps As String = ""
        For x As Integer = 0 To ip.AddressList.Length - 1
            If ip.AddressList(x).ToString.Contains(".") Then
                strIps &= ";" & ip.AddressList(x).ToString
            End If
        Next
        If strIps.Trim.Length > 0 Then strIps = strIps.Substring(1)
        Return strIps
    End Function

    Public Shared Function fnValidaLicenciaPCSistelMovil(ByRef pstrMensaje As String) As Boolean
        'Validacion de Licencia
        Dim _return As Boolean = True
        Dim strMensajeLicencia As String = "<br>Lo sentimos... el producto no ha sido Licenciado.<br>Contácte con su Distribuidor.<br><br>"

        If ConfigurationManager.AppSettings("Identificacion") Is Nothing OrElse ConfigurationManager.AppSettings("Identificacion") = "" Then
            'pstrMensaje = "<br>El archivo web.config no está actualizado.<br>Valide el archivo indicado.<br><br>"
            pstrMensaje = strMensajeLicencia
            _return = False
        Else

            Dim strKey As String = VisualSoft.Comun.Utilitarios.Utilitarios.fnDetectaSerieAdicional
            Dim strLlaveCliente As String = ConfigurationManager.AppSettings("Identificacion")
            Dim strLlaveClienteDesencriptada As String = ""

            'strLlaveClienteDesencriptada = CompLicencia.SecurityVSNet.fnDesEncriptarClave(strLlaveCliente, "PCSISTELMOVIL20")
            'strLlaveClienteDesencriptada = CompLicencia.SecurityVSNet.fnDesEncriptarClave(strLlaveCliente, "")

            Try
                strLlaveClienteDesencriptada = VisualSoft.Comun.Utilitarios.Cryptographics.DecryptString(strLlaveCliente, strKey)


                'Obtener Licencia Base de Datos...




                'Valida condiciones basica..
                Dim blLicenciaCorrecta As Boolean = False
                Dim mInfoLicencia() As String = strLlaveClienteDesencriptada.Split("|") 'CantidadDispositivos|TipoLicencia|DiasDemo
                If mInfoLicencia.Length >= 3 Then
                    If IsNumeric(mInfoLicencia(0)) AndAlso IsNumeric(mInfoLicencia(2)) Then
                        blLicenciaCorrecta = True
                        Dim oLicenciaWeb As New LicenciaWeb
                        oLicenciaWeb.CantidadDispositivos = mInfoLicencia(0)
                        oLicenciaWeb.TipoLicencia = mInfoLicencia(1)
                        oLicenciaWeb.DiasDemo = mInfoLicencia(2)
                        oLicenciaWeb.FechaInicioDemo = mInfoLicencia(3)

                        If oLicenciaWeb.DiasDemo > 0 Then
                            'Obtener Licencia Demo Utilizada...
                            'Tomar el mayor valor obtenido de tres casos
                            '1ero: Diferencia directa entre fecha inicial de demo con fecha actual
                            '2do: Diferencia entre data historica de la tabla SEG_UsuarioHistorico
                            '3ero: Diferencia entre data historica de la tabla SEG_Usuario
                            Dim iMaximoDias As Integer = -1
                            Dim inAnio As Integer = oLicenciaWeb.FechaInicioDemo.Substring(0, 4)
                            Dim inMes As Integer = oLicenciaWeb.FechaInicioDemo.Substring(4, 2)
                            Dim inDia As Integer = oLicenciaWeb.FechaInicioDemo.Substring(6, 2)
                            Dim inHora As Integer = oLicenciaWeb.FechaInicioDemo.Substring(9, 2)
                            Dim inMinuto As Integer = oLicenciaWeb.FechaInicioDemo.Substring(12, 2)
                            Dim inSegundo As Integer = oLicenciaWeb.FechaInicioDemo.Substring(15, 2)
                            Dim dtFechaInicioDemo As New Date(inAnio, inMes, inDia, inHora, inMinuto, inSegundo)
                            iMaximoDias = DateDiff(DateInterval.Day, dtFechaInicioDemo, Now.AddDays(2))
                            Dim dtDiasAcumulados As DataTable = VisualSoft.Comun.Utilitarios.Utilitarios.ObtenerDiferenciaDiasPorUso()
                            If dtDiasAcumulados IsNot Nothing AndAlso dtDiasAcumulados.Rows.Count > 0 Then
                                If dtDiasAcumulados.Rows(0)("Diferencia1") > iMaximoDias Then
                                    iMaximoDias = dtDiasAcumulados.Rows(0)("Diferencia1")
                                End If
                                If dtDiasAcumulados.Rows(0)("Diferencia2") > iMaximoDias Then
                                    iMaximoDias = dtDiasAcumulados.Rows(0)("Diferencia2")
                                End If
                                If iMaximoDias > oLicenciaWeb.DiasDemo Then
                                    pstrMensaje = strMensajeLicencia
                                    'Limpiar Web.config...
                                    VisualSoft.Comun.Util.ArchivoConfiguracion.CambiarValorAppSettings(HttpContext.Current.Server.MapPath("~/web.config"), "Identificacion", "")
                                    Return False
                                End If
                            Else
                                Throw New Exception("No existen datos en tablas que deberian tener información.")
                            End If
                        End If

                        HttpContext.Current.Session("LicenciaWeb") = oLicenciaWeb
                        _return = True

                    End If

                End If

                If Not blLicenciaCorrecta Then
                    pstrMensaje = strMensajeLicencia
                    _return = False
                End If
            Catch
                pstrMensaje = strMensajeLicencia
                _return = False
            End Try

        End If

        Return _return

    End Function

    Enum TipoDistribucionServicios
        Linea = 0
        CentroCosto = 1
        Organizacion = 2
        Nivel = 3
        GrupoEmpleados = 4
    End Enum

    Class Itemlst
        Private _inCod As Integer
        Private _vcNom As String

        Public Property inCod As Integer
            Get
                Return _inCod
            End Get
            Set(ByVal value As Integer)
                _inCod = value
            End Set
        End Property
        Public Property vcNom As String
            Get
                Return _vcNom
            End Get
            Set(ByVal value As String)
                _vcNom = value
            End Set
        End Property
    End Class

    Public Shared Function TraeCuerpoCorreo(ByVal Plantilla As String) As String
        Dim Cuerpo As New StringBuilder
        Dim objReader As StreamReader = New StreamReader(Plantilla)
        Dim sLine As String = ""

        While Not IsNothing(sLine)
            sLine = objReader.ReadLine()
            If Not IsNothing(sLine) Then
                Cuerpo.Append(sLine)
            End If
        End While
        objReader.Close()
        Return Cuerpo.ToString()
    End Function

    Public Shared Function ComprobarBoolNULL(ByVal Campo As Object, ByVal ValorDefecto As Boolean) As Boolean
        If IsDBNull(Campo) Then
            Return ValorDefecto
        Else
            Return Convert.ToBoolean(Campo)
        End If
    End Function
    Public Shared Function ComprobarDecimalNULL(ByVal Campo As Object, ByVal ValorDefecto As Decimal) As Decimal
        If IsDBNull(Campo) Then
            Return ValorDefecto
        Else
            Return Convert.ToDecimal(Campo)
        End If
    End Function
    'Public Shared Function ComprobarDecimalNULL_MultiPais(ByVal pvcNumero As String, ByVal oCultura As ENT_GEN_Cultura) As String
    '    Dim ciNuevaCultura As New CultureInfo(oCultura.vcCodCul)
    '    Thread.CurrentThread.CurrentCulture = ciNuevaCultura
    '    Thread.CurrentThread.CurrentUICulture = ciNuevaCultura
    '    Return pvcNumero
    'End Function
    Public Shared Function ComprobarIntNULL(ByVal Campo As Object, ByVal ValorDefecto As Integer) As Integer
        If IsDBNull(Campo) Then
            Return ValorDefecto
        Else
            Return Convert.ToInt32(Campo)
        End If
    End Function
    Public Shared Function ComprobarDoubleNULL(ByVal Campo As Object, ByVal ValorDefecto As Double) As Double
        Return IIf(IsDBNull(Campo), ValorDefecto, Convert.ToDouble(Campo))
    End Function
    Public Shared Function ComprobarDateTimeNULL(ByVal Campo As Object, ByVal ValorDefecto As DateTime) As DateTime
        Return IIf(IsDBNull(Campo), ValorDefecto, Convert.ToDateTime(Campo))
    End Function
    Public Shared Function ComprobarStringNULL(ByVal Campo As Object, ByVal ValorDefecto As String) As String
        Return IIf(IsDBNull(Campo), ValorDefecto, Campo.ToString())
    End Function

    Shared Function ObtenerParametros(ByVal CandenaConexion As String, ByVal Valor As String) As String
        Dim Param As String() = CandenaConexion.Split(";")
        For Each Parametro As String In Param
            If Parametro.Split("=")(0).Trim().ToLower() = Valor.Trim().ToLower() Then
                Return Parametro.Split("=")(1).Trim()
            End If
        Next
        Return ""
    End Function
    Shared Sub ValorDefectoddl(ByVal ddl As DropDownList, ByVal Texto As String, ByVal Valor As String)
        Dim lstItemSD As New ListItem
        lstItemSD.Text = Texto
        lstItemSD.Value = Valor
        ddl.Items.Add(lstItemSD)
    End Sub

    Shared Function ObtieneRaizSistema() As String
        Dim _return As String = ""
        'Dim _host As String = HttpContext.Current.Request.Url.Host
        'Dim _Authority As String = HttpContext.Current.Request.Url.Authority
        Dim _ApplicationPath As String = HttpContext.Current.Request.ApplicationPath
        Dim strPathAndQuery As String = HttpContext.Current.Request.Url.PathAndQuery
        Dim strUrl As String = HttpContext.Current.Request.Url.AbsoluteUri.Replace(strPathAndQuery, "/")
        _return = strUrl & _ApplicationPath
        If Right(_return, 1) <> "/" Then _return = _return & "/"
        _return = _return.Replace("//", "/")
        _return = _return.Replace("https:/", "https://")
        _return = _return.Replace("http:/", "http://")
        Return _return
    End Function

    ''' <summary>
    ''' Verifica la existencia de la carpeta del cliente si la web esta en modo cloud (2015-07-13 wapumayta)
    ''' Si la carpeta no existe la crea
    ''' </summary>
    ''' <param name="path">Ruta a analizar</param>
    ''' <param name="sep">Concatenador para la carpeta del cliente</param>
    ''' <returns>Nombre de la carpeta del cliente antemoniendo el concatenador</returns>
    ''' <remarks></remarks>
    Shared Function ObtenerCarpetaDominio(ByVal path As String, ByVal sep As String) As String
        Dim CarpetaDominio As String = String.Empty
        'HttpContext.Current.Session("IdDominio") = "BCP"
        If Not IsNothing(HttpContext.Current.Session("IdDominio")) And HttpContext.Current.Session("IdDominio") <> "" Then
            CarpetaDominio = HttpContext.Current.Session("IdDominio").ToString()
            path = path + CarpetaDominio
            'validar existencia de carpeta
            If Not System.IO.Directory.Exists(path) Then
                System.IO.Directory.CreateDirectory(path)
            End If
            CarpetaDominio = sep + CarpetaDominio
        End If
        Return CarpetaDominio
    End Function

    Class OpcionesSeguridad
        Public Class Opciones
            Private Shared _ActivoInsertar As Boolean
            Private Shared _ActivoActualizar As Boolean
            Private Shared _ActivoActualizarSimple As Boolean
            Private Shared _VerDetalle As Boolean
            Private Shared _ActivoEliminar As Boolean
            Private Shared _ActivoAccion As Boolean
            Private Shared _ActivoExportar As Boolean
            Private Shared _ActivoImportar As Boolean
            Public Shared Property ActivoInsertar As Boolean
                Get
                    Return _ActivoInsertar
                End Get
                Set(ByVal value As Boolean)
                    _ActivoInsertar = value
                End Set
            End Property
            Public Shared Property ActivoActualizar As Boolean
                Get
                    Return _ActivoActualizar
                End Get
                Set(ByVal value As Boolean)
                    _ActivoActualizar = value
                End Set
            End Property
            Public Shared Property ActivoActualizarSimple As Boolean
                Get
                    Return _ActivoActualizarSimple
                End Get
                Set(ByVal value As Boolean)
                    _ActivoActualizarSimple = value
                End Set
            End Property
            Public Shared Property VerDetalle As Boolean
                Get
                    Return _VerDetalle
                End Get
                Set(ByVal value As Boolean)
                    _VerDetalle = value
                End Set
            End Property

            Public Shared Property ActivoEliminar As Boolean
                Get
                    Return _ActivoEliminar
                End Get
                Set(ByVal value As Boolean)
                    _ActivoEliminar = value
                End Set
            End Property
            Public Shared Property ActivoAccion As Boolean
                Get
                    Return _ActivoAccion
                End Get
                Set(ByVal value As Boolean)
                    _ActivoAccion = value
                End Set
            End Property
            Public Shared Property ActivoExportar As Boolean
                Get
                    Return _ActivoExportar
                End Get
                Set(ByVal value As Boolean)
                    _ActivoExportar = value
                End Set
            End Property
            Public Shared Property ActivoImportar As Boolean
                Get
                    Return _ActivoImportar
                End Get
                Set(ByVal value As Boolean)
                    _ActivoImportar = value
                End Set
            End Property
        End Class

        Shared Sub ObtenerValores(ByVal lstPerfil As List(Of ENT_SEG_Perfil))
            Opciones.ActivoInsertar = False
            Opciones.ActivoActualizar = False
            Opciones.ActivoActualizarSimple = False
            Opciones.VerDetalle = False
            Opciones.ActivoEliminar = False
            Opciones.ActivoAccion = False
            Opciones.ActivoAccion = False
            Opciones.ActivoExportar = False
            Opciones.ActivoImportar = False

            If lstPerfil.Count > 0 Then
                For Each oPerfil As ENT_SEG_Perfil In lstPerfil
                    Opciones.ActivoInsertar = Opciones.ActivoInsertar Or oPerfil.btIns
                    Opciones.ActivoActualizar = Opciones.ActivoActualizar Or oPerfil.btAct
                    Opciones.ActivoActualizarSimple = Opciones.ActivoActualizarSimple Or oPerfil.btActSim
                    Opciones.VerDetalle = Opciones.VerDetalle Or oPerfil.btVer
                    Opciones.ActivoEliminar = Opciones.ActivoEliminar Or oPerfil.btEli
                    Opciones.ActivoExportar = Opciones.ActivoExportar Or oPerfil.btExp
                    Opciones.ActivoImportar = Opciones.ActivoImportar Or oPerfil.btImp
                Next
                Opciones.ActivoAccion = Opciones.ActivoInsertar Or Opciones.ActivoActualizar Or Opciones.ActivoEliminar Or Opciones.ActivoActualizarSimple Or Opciones.VerDetalle
            Else 'si no tiene perfiles asociados se mostrarán todas las opciones
                Opciones.ActivoInsertar = True
                Opciones.ActivoActualizar = True
                Opciones.ActivoActualizarSimple = False
                Opciones.ActivoEliminar = True
                Opciones.VerDetalle = True
                Opciones.ActivoAccion = True
                Opciones.ActivoExportar = True
                Opciones.ActivoImportar = True
            End If
        End Sub
    End Class

    Shared Sub AgregarTema(ByVal Server As HttpServerUtility, ByVal head As HtmlHead, ByVal vcTem As String)
        Dim archivoCss As String = "/jquery-ui-1.8.16.custom.css"
        Dim rutaCss As String = "~/Common/Styles/JqueryThemeRoller/"
        Dim AgregarPrincipal As Boolean = True
        Dim AgregarFonts As Boolean = True
        Dim AgregarTema As Boolean = True

        For Each tagHeader As Control In head.Controls
            If TypeOf tagHeader Is HtmlLink Then
                If CType(tagHeader, HtmlLink).Href.ToLower.Contains("common/styles/principal.css") Then
                    AgregarPrincipal = False
                End If
                If CType(tagHeader, HtmlLink).Href.ToLower.Contains("content/css/shared/fonts.googleapis.com.css") Then
                    AgregarFonts = False
                End If
                If CType(tagHeader, HtmlLink).Href.ToLower.Contains(archivoCss) Then
                    AgregarTema = False
                End If
            End If
        Next

        If AgregarTema Then
            If vcTem <> "" Then
                Dim ExisteArchivo As Boolean
                Dim RutaTema As String = Server.MapPath(rutaCss & vcTem & archivoCss)

                ExisteArchivo = (System.IO.File.Exists(RutaTema))

                If ExisteArchivo = True Then
                    Dim cssTheme As New HtmlLink
                    cssTheme.Attributes("type") = "text/css"
                    cssTheme.Attributes("href") = rutaCss & vcTem & archivoCss
                    cssTheme.Attributes("rel") = "stylesheet"
                    head.Controls.Add(cssTheme)
                Else
                    Dim cssTheme As New HtmlLink
                    cssTheme.Attributes("type") = "text/css"
                    cssTheme.Attributes("href") = rutaCss & "redmond" & archivoCss ' Por defecto Jpareja cambio  Principal a redmond
                    cssTheme.Attributes("rel") = "stylesheet"
                    head.Controls.Add(cssTheme)
                End If
            Else
                Dim cssTheme As New HtmlLink
                cssTheme.Attributes("type") = "text/css"
                cssTheme.Attributes("href") = rutaCss & "redmond" & archivoCss
                cssTheme.Attributes("rel") = "stylesheet"
                head.Controls.Add(cssTheme)
            End If
        End If

        If AgregarFonts Then
            Dim cssPrincipal As New HtmlLink
            cssPrincipal.Attributes("type") = "text/css"
            cssPrincipal.Attributes("href") = "~/Content/css/shared/fonts.googleapis.com.css"
            cssPrincipal.Attributes("rel") = "stylesheet"
            head.Controls.Add(cssPrincipal)
        End If

        If AgregarPrincipal Then
            Dim cssPrincipal As New HtmlLink
            cssPrincipal.Attributes("type") = "text/css"
            cssPrincipal.Attributes("href") = "~/Common/Styles/Principal.css"
            cssPrincipal.Attributes("rel") = "stylesheet"
            head.Controls.Add(cssPrincipal)
        End If

        'Agregar JS...
        'Validar si ya se cargo previamente...
        'Dim jsKnockOut As New HtmlLink
        'jsKnockOut.Attributes("type") = "text/javascript"
        'jsKnockOut.Attributes("href") = "~/Common/Scripts/knockout-3.0.0.js"
        'head.Controls.Add(jsKnockOut)

        'head.Controls.Add(New HtmlHead("<meta  http-equiv = ""X-UA-Compatible""  content = ""IE = Edge""  />"))

    End Sub

    Shared Function fnValidarRutaHttp(ByVal strRuta As String) As String
        If strRuta IsNot Nothing Then
            Dim _return As String = strRuta.Replace("//", "/")
            If _return.ToLower.Contains("https") Then
                _return = _return.Replace("https:/", "https://")
            ElseIf _return.ToLower.Contains("http") Then
                _return = _return.Replace("http:/", "http://")
            End If
            Return _return
        Else
            Return ""
        End If
    End Function

    Private Shared Sub CargarScript(ByVal head As HtmlHead, ByVal ruta As String)
        Dim strRaiz As String = ObtieneRaizSistema()
        Dim rutaJs As String = ""
        Dim js As HtmlGenericControl
        rutaJs = fnValidarRutaHttp(strRaiz & ruta)
        js = New HtmlGenericControl("script")
        js.Attributes("type") = "text/javascript"
        js.Attributes("src") = rutaJs
        head.Controls.Add(js)
    End Sub

    Private Shared Sub CargarCSS(ByVal head As HtmlHead, ByVal ruta As String)
        Dim cssPrincipal As New HtmlLink
        cssPrincipal.Attributes("type") = "text/css"
        cssPrincipal.Attributes("href") = ruta
        cssPrincipal.Attributes("rel") = "stylesheet"
        head.Controls.Add(cssPrincipal)
    End Sub

    Shared Sub AgregarScriptJqueryUI(ByVal Server As HttpServerUtility, ByVal head As HtmlHead, ByVal vcTem As String)
        Try

            Dim AgregarJQGrid As Boolean = True
            Dim AgregarUI As Boolean = True
            Dim AgregarJSON2 As Boolean = True
            Dim AgregarJQUERY As Boolean = True

            Dim strRaiz As String = ObtieneRaizSistema()

            For Each tagHeader As Control In head.Controls
                If TypeOf tagHeader Is HtmlLink Then
                    If CType(tagHeader, HtmlLink).Href.ToLower.Contains("jqgrid") Then
                        AgregarJQGrid = False
                    End If
                ElseIf TypeOf tagHeader Is LiteralControl Then
                    If CType(tagHeader, LiteralControl).Text.ToLower.Contains("jqgrid") Then
                        AgregarJQGrid = False
                    End If
                    If CType(tagHeader, LiteralControl).Text.ToLower.Contains("jquery-ui") Or CType(tagHeader, LiteralControl).Text.ToLower.Contains("jqueryui") Then
                        AgregarUI = False
                    End If
                    If CType(tagHeader, LiteralControl).Text.ToLower.Contains("json2.js") Then
                        AgregarJSON2 = False
                    End If
                    If CType(tagHeader, LiteralControl).Text.ToLower.Contains("jquery-1.7.2.js") Then
                        AgregarJQUERY = False
                    End If
                End If
            Next

            If AgregarJSON2 Then
                CargarScript(head, "Common/Scripts/json2.js")
            End If
            If AgregarJQUERY Then
                CargarScript(head, "Common/Scripts/jquery-1.7.2.js")
            End If
            If AgregarJQGrid Then
                CargarCSS(head, "~/Common/Styles/jqGrid/ui.jqgrid.css")
                CargarScript(head, "Common/Scripts/jqGrid/i18n/grid.locale-es.js")
                CargarScript(head, "Common/Scripts/jqGrid/jquery.jqGrid.min.js")
                CargarScript(head, "Common/Scripts/jqGrid/plugins/jquery.tablednd.js")
            End If
            If AgregarUI Then
                CargarScript(head, "Common/Scripts/JqueryUI/jquery-ui.js")
            End If
        Catch ex As Exception
            Throw
        End Try
    End Sub

    Shared Sub Dataddl(ByVal ddl As DropDownList, ByVal Datos As Object, ByVal Texto As String, ByVal Valor As String)
        ddl.DataSource = Datos
        ddl.DataTextField = Texto
        ddl.DataValueField = Valor
        ddl.DataBind()
    End Sub

    Shared Sub DatachkLst(ByVal chklst As CheckBoxList, ByVal Datos As Object, ByVal Texto As String, ByVal Valor As String)
        chklst.DataSource = Datos
        chklst.DataTextField = Texto
        chklst.DataValueField = Valor
        chklst.DataBind()
    End Sub

    Shared Sub DatarbLst(ByVal rblst As RadioButtonList, ByVal Datos As Object, ByVal Texto As String, ByVal Valor As String)
        rblst.DataSource = Datos
        rblst.DataTextField = Texto
        rblst.DataValueField = Valor
        rblst.DataBind()
    End Sub

    Shared Sub DataLst(ByVal lst As ListBox, ByVal Datos As Object, ByVal Texto As String, ByVal Valor As String)
        lst.DataSource = Datos
        lst.DataTextField = Texto
        lst.DataValueField = Valor
        lst.DataBind()
    End Sub

    Shared Function ListarDias() As List(Of String)
        Dim lstDias As New List(Of String)

        For i = 1 To 31
            lstDias.Add(i.ToString)
        Next

        Return lstDias
    End Function

    Shared Function ListarAnhos(ByVal AnhoIni As Integer, ByVal AnhoFin As Integer) As List(Of String)
        Dim lstAnhos As New List(Of String)

        For i = AnhoIni To AnhoFin
            lstAnhos.Add(i.ToString)
        Next

        Return lstAnhos
    End Function

    'Shared Function ListarTipoSolicitud(ByVal inCod As Integer, ByVal vcNom As String) As List(Of Itemlst)
    '    Dim lstTipoSolicitud As New List(Of Itemlst)
    '    Dim item As New Itemlst
    '    Dim item1 As New Itemlst
    '    Dim item2 As New Itemlst
    '    Dim item3 As New Itemlst
    '    Dim item4 As New Itemlst
    '    Dim item5 As New Itemlst 'activacion
    '    Dim item6 As New Itemlst 'ampliacion
    '    If vcNom <> "" Then
    '        item.inCod = inCod
    '        item.vcNom = vcNom
    '        lstTipoSolicitud.Add(item)
    '    End If

    '    item1.inCod = TipoSolicitud.Cambio
    '    item1.vcNom = "Cambio"
    '    item2.inCod = TipoSolicitud.Nuevo
    '    item2.vcNom = "Nuevo"
    '    item3.inCod = TipoSolicitud.Reposicion
    '    item3.vcNom = "Reposición"
    '    item4.inCod = TipoSolicitud.Reparacion
    '    item4.vcNom = "Reparación"
    '    'nuevo-estado de solicitudes de servicios
    '    item5.inCod = TipoSolicitud.Activacion
    '    item5.vcNom = "Activación"
    '    item6.inCod = TipoSolicitud.Ampliacion
    '    item6.vcNom = "Ampliación"

    '    lstTipoSolicitud.Add(item1)
    '    lstTipoSolicitud.Add(item2)
    '    lstTipoSolicitud.Add(item3)
    '    lstTipoSolicitud.Add(item4)
    '    'solicitudes de servicios
    '    lstTipoSolicitud.Add(item5)
    '    lstTipoSolicitud.Add(item6)

    '    Return lstTipoSolicitud
    'End Function

    Shared Function ListarCampoSolicitud() As List(Of Itemlst)
        Dim lstCampoSolicitud As New List(Of Itemlst)
        Dim item1 As New Itemlst
        Dim item2 As New Itemlst
        Dim item3 As New Itemlst
        Dim item4 As New Itemlst

        item1.inCod = 1
        item1.vcNom = "Celular"
        item2.inCod = 2
        item2.vcNom = "Codigo empleado"
        item3.inCod = 3
        item3.vcNom = "Empleado"
        item4.inCod = 4
        item4.vcNom = "Fecha"

        lstCampoSolicitud.Add(item1)
        lstCampoSolicitud.Add(item2)
        lstCampoSolicitud.Add(item3)
        lstCampoSolicitud.Add(item4)

        Return lstCampoSolicitud
    End Function

    Shared Function ListarMeses() As List(Of String)
        Dim lstMeses As New List(Of String)

        For i = 1 To 12
            lstMeses.Add(i.ToString)
        Next

        Return lstMeses
    End Function

    Shared Function ListarMesesLiteral() As List(Of String)
        Dim lstMeses As New List(Of String)

        lstMeses.Add("Enero")
        lstMeses.Add("Febrero")
        lstMeses.Add("Marzo")
        lstMeses.Add("Abril")
        lstMeses.Add("Mayo")
        lstMeses.Add("Junio")
        lstMeses.Add("Julio")
        lstMeses.Add("Agosto")
        lstMeses.Add("Septiembre")
        lstMeses.Add("Octubre")
        lstMeses.Add("Noviembre")
        lstMeses.Add("Diciembre")

        Return lstMeses
    End Function

    Shared Function SaveToDB(ByVal imgId As Integer, ByVal imgBinaryData As Byte(), ByVal imgContentType As String) As Integer

        'use the web.config to store the connection string
        Dim connection As New SqlConnection("server=130.1.7.21\SQL2000;database=PCSISTEL8_BASE;user id =desarrollo; password=desarrollo")
        Dim command As New SqlCommand("UPDATE GEN_Cliente SET imLogo = @img_data WHERE P_inCodCli = @img_Id", connection)
        Dim param0 As New SqlParameter("@img_data", SqlDbType.Image)
        param0.Value = imgBinaryData
        command.Parameters.Add(param0)

        Dim param1 As New SqlParameter("@img_Id", SqlDbType.Int)

        param1.Value = imgId
        command.Parameters.Add(param1)

        connection.Open()

        Dim numRowsAffected As Integer = command.ExecuteNonQuery()

        connection.Close()

        Return numRowsAffected
    End Function

    Public Shared Sub SaveJPG(ByVal image As Drawing.Image, ByVal szFileName As String)
        'Si ya existe una imagen se tendra que eliminar
        File.Delete(szFileName)
        'Despues de eliminar la imagen existe se crea otra con el Drawing.Image nuevo
        image.Save(szFileName)
    End Sub
    'Recibe  los bytes de la imagen guardada en sql y devuelve un Bitmap
    Public Shared Function Bytes2Image(ByVal bytes() As Byte) As Drawing.Bitmap
        If bytes Is Nothing Then Return Nothing
        Dim ms As New MemoryStream(bytes)
        Dim bm As Drawing.Bitmap = Nothing
        Try
            bm = New Drawing.Bitmap(ms)
        Catch ex As Exception
            System.Diagnostics.Debug.WriteLine(ex.Message)
        End Try
        Return bm
    End Function

    Public Shared Function DevuelveFormatoNumero(ByVal oCultura As ENT_GEN_Cultura) As String
        ActualizarCultura(oCultura)
        Dim strFormato As String = String.Empty
        If oCultura.dcNumDec = 0 Then
            strFormato = "###" + oCultura.vcSimSepMil + "##0"
        Else
            strFormato = "###" + oCultura.vcSimSepMil + "##0" + oCultura.vcSimDec
            For i As Integer = 0 To oCultura.dcNumDec - 1
                strFormato = strFormato + "0"
            Next
        End If

        Return strFormato
    End Function

    'MPAJUELO_3.0.4_20161107
    Public Shared Function DevuelveFormatoNumeroGenerico(oCultura As ENT_GEN_Cultura) As String
        Dim strForNum As String = String.Empty
        'Esta configuración de formato es estandar y genérica para el framework (Se probó en varias culturas)
        If oCultura.dcNumDec = 0 Then
            strForNum = "###,##0"
        Else
            strForNum = "###,##0."
            For i As Integer = 0 To oCultura.dcNumDec - 1
                strForNum = strForNum + "0"
            Next
        End If
        Return strForNum
    End Function
    ''Public Shared Function DevuelveFormatoNumeroGenerico_XtraReport(oCultura As ENT_GEN_Cultura) As String
    ''    Dim strForNum As String = String.Empty
    ''    strForNum = "#,#0." 'Esta configuración de formato es estandar y genérica para el framework (Se probó en varias culturas)
    ''    For i As Integer = 0 To oCultura.dcNumDec - 1
    ''        strForNum = strForNum + "0"
    ''    Next
    ''    Return strForNum
    ''End Function
    Public Shared Function DevuelveFormatoNumeroGenerico() As String
        Dim strForNum As String = String.Empty
        strForNum = "###,##0." 'Esta configuración de formato es estandar y genérica para el framework (Se probó en varias culturas)
        For i As Integer = 0 To 1
            strForNum = strForNum + "0"
        Next
        Return strForNum
    End Function

    'JHERRERA 20161123
    Public Shared Function DevuelveFormatoNumeroGenericoEntero(oCultura As ENT_GEN_Cultura) As String
        Dim strForNum As String = String.Empty
        strForNum = "###,##0" 'Esta configuración de formato es estandar y genérica para el framework (Se probó en varias culturas)
        Return strForNum
    End Function

    Public Shared Function DevuelveFormatoNumero_To_Pivot(ByVal oCultura As ENT_GEN_Cultura, ByVal dcNumDec As Integer) As String
        ActualizarCultura_Pivot(oCultura)
        Dim strFormato As String = String.Empty
        strFormato = "###" + "," + "##0" + IIf(dcNumDec > 0, ".", "") '"###,##0."
        For i As Integer = 0 To dcNumDec - 1
            strFormato = strFormato + "0"
        Next
        Return strFormato
    End Function

    Public Shared Function DevuelveNumeroFormateado(ByVal pvcNumero As String, ByVal oCultura As ENT_GEN_Cultura) As String
        ''ActualizarCultura(oCultura)
        Dim strForNum As String
        If oCultura Is Nothing Then
            oCultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
        End If
        strForNum = DevuelveFormatoNumeroGenerico(oCultura) ''DevuelveFormatoNumero(oCultura)
        Dim vcNumero As String = ""
        If pvcNumero.Trim() <> "" Then
            If Convert.ToDecimal(pvcNumero) < 0 Then
                vcNumero = (Convert.ToDecimal(pvcNumero)).ToString(strForNum)
            Else
                vcNumero = (Convert.ToDecimal("0" + pvcNumero)).ToString(strForNum)
            End If
        End If

        If oCultura.vcSimSepMil = "." Then
            vcNumero = vcNumero.Replace(".", "*")
            vcNumero = vcNumero.Replace(",", ".")
            vcNumero = vcNumero.Replace("*", ",")
        End If
        Return vcNumero
    End Function

    Public Shared Function DevuelveNumeroFormateado_MultiPais(ByVal pvcNumero As String, ByVal oCultura As ENT_GEN_Cultura) As String
        'Dim ciNuevaCultura As New CultureInfo(oCultura.vcCodCul)
        'Thread.CurrentThread.CurrentCulture = ciNuevaCultura
        'Thread.CurrentThread.CurrentUICulture = ciNuevaCultura

        If oCultura.vcSimDec.ToString() = "," Then
            If pvcNumero.ToString().Contains(".") Then
                pvcNumero = pvcNumero.ToString().Replace(".", ",")
            End If
        End If

        Return pvcNumero
    End Function

    Public Shared Function DevuelveNumero_ToDouble_MultiPais(ByVal pvcNumero As String, ByVal oCultura As ENT_GEN_Cultura) As String
        If pvcNumero.ToString().Contains(".") Then
            pvcNumero = pvcNumero.ToString().Replace(".", "")
        End If
        Return pvcNumero
    End Function

    Public Shared Function DevuelveNumeroSinFormato(ByVal pvcNumero As String, ByVal oCultura As ENT_GEN_Cultura) As String
        'ActualizarCultura(oCultura)
        If oCultura Is Nothing Then
            Return pvcNumero
        End If
        If oCultura.vcSimSepMil = "." Then pvcNumero = pvcNumero.Replace(".", "")
        If oCultura.vcSimSepMil = "," Then pvcNumero = pvcNumero.Replace(",", "")
        If pvcNumero.StartsWith(oCultura.vcSimDec) Then pvcNumero = "0" & pvcNumero

        Return pvcNumero
    End Function
    Public Shared Function DevuelveNumeroSinFormato(ByVal pvcNumero As String) As String
        Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
        If oCultura Is Nothing Then
            Return pvcNumero
        End If
        If oCultura.vcSimSepMil = "." Then pvcNumero = pvcNumero.Replace(".", "")
        If oCultura.vcSimSepMil = "," Then pvcNumero = pvcNumero.Replace(",", "")
        If pvcNumero.StartsWith(oCultura.vcSimDec) Then pvcNumero = "0" & pvcNumero

        Return pvcNumero
    End Function

    Public Shared Function DevuelveNumeroFormateado(ByVal pvcNumero As String) As String
        Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
        Dim strForNum = DevuelveFormatoNumero(oCultura)

        Dim vcNumero As String = ""
        If pvcNumero.Trim() <> "" Then
            vcNumero = (Convert.ToDecimal(pvcNumero)).ToString(strForNum)
        End If

        Return vcNumero
    End Function

    Public Shared Function DevuelveNumeroFormateado(ByVal pvcNumero As String, ByVal strForNum As String) As String
        Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)

        Dim vcNumero As String = ""
        If pvcNumero.Trim() <> "" Then
            vcNumero = (Convert.ToDecimal(pvcNumero)).ToString(strForNum)
        End If
        If vcNumero.StartsWith(oCultura.vcSimDec) Then vcNumero = "0" & vcNumero

        Return vcNumero

    End Function

    Public Shared Function DevuelveFechaHoraFormateada(ByVal vcFechaHoraANSI As String, ByVal strForFec As String) As String
        Dim vcFecha As String = ""
        If vcFechaHoraANSI.Trim() <> "" Then
            'vcFecha = (Convert.ToDateTime(vcFechaHoraANSI)).ToString(strForFec)
            Dim daFecha As DateTime = New DateTime()
            daFecha = New DateTime(vcFechaHoraANSI.Substring(0, 4), vcFechaHoraANSI.Substring(4, 2), vcFechaHoraANSI.Substring(6, 2), _
                                   vcFechaHoraANSI.Substring(9, 2), vcFechaHoraANSI.Substring(12, 2), vcFechaHoraANSI.Substring(15, 2))

            vcFecha = daFecha.ToString(strForFec)
        End If
        Return vcFecha
    End Function

    Public Shared Function DevuelveFechaFormateada(ByVal vcFechaANSI As String, ByVal strForFec As String) As String
        Dim vcFecha As String = ""
        If vcFechaANSI.Trim() <> "" Then
            Dim daFecha As DateTime = New DateTime()
            daFecha = New DateTime(vcFechaANSI.Substring(0, 4), vcFechaANSI.Substring(4, 2), vcFechaANSI.Substring(6, 2))
            vcFecha = daFecha.ToString(strForFec)
        End If
        Return vcFecha
    End Function

    Public Shared Function DevuelveHoraFormateada(ByVal vcHoraANSI As String, ByVal strForHor As String) As String
        Dim vcFecha As String = ""
        If vcHoraANSI.Trim() <> "" Then
            'vcFecha = (Convert.ToDateTime(vcFechaHoraANSI)).ToString(strForFec)
            Dim daNow As DateTime = DateTime.Now
            Dim daFecha As DateTime = New DateTime()
            daFecha = New DateTime(daNow.Year, daNow.Month, daNow.Day, vcHoraANSI.Substring(9, 2), vcHoraANSI.Substring(12, 2), vcHoraANSI.Substring(15, 2))
            vcFecha = daFecha.ToString(strForHor)
        End If
        Return vcFecha
    End Function

    Public Shared Sub ActualizarCultura(ByVal oCultura As ENT_GEN_Cultura)
        Dim ciNuevaCultura As New CultureInfo(oCultura.vcCodCul)
        Thread.CurrentThread.CurrentCulture = ciNuevaCultura
        Thread.CurrentThread.CurrentUICulture = ciNuevaCultura
        Thread.CurrentThread.CurrentCulture.NumberFormat.NumberDecimalDigits = oCultura.dcNumDec
        Thread.CurrentThread.CurrentCulture.NumberFormat.NumberDecimalSeparator = oCultura.vcSimDec
        Thread.CurrentThread.CurrentCulture.NumberFormat.NumberGroupSeparator = oCultura.vcSimSepMil
    End Sub

    Public Shared Sub ActualizarCultura_Pivot(ByVal oCultura As ENT_GEN_Cultura)
        'Dim ciNuevaCultura As New CultureInfo(oCultura.vcCodCul)
        'Thread.CurrentThread.CurrentCulture = CultureInfo.CreateSpecificCulture(oCultura.vcCodCul)
        'Thread.CurrentThread.CurrentCulture = ciNuevaCultura
        'Thread.CurrentThread.CurrentCulture.NumberFormat.NumberDecimalDigits = oCultura.dcNumDec
        'Thread.CurrentThread.CurrentCulture.NumberFormat.NumberDecimalSeparator = oCultura.vcSimDec
        'Thread.CurrentThread.CurrentCulture.NumberFormat.NumberGroupSeparator = oCultura.vcSimSepMil
        'Thread.CurrentThread.CurrentUICulture = ciNuevaCultura
        'Thread.CurrentThread.CurrentUICulture.NumberFormat.NumberDecimalDigits = oCultura.dcNumDec
        'Thread.CurrentThread.CurrentUICulture.NumberFormat.NumberDecimalSeparator = oCultura.vcSimDec
        'Thread.CurrentThread.CurrentUICulture.NumberFormat.NumberGroupSeparator = oCultura.vcSimSepMil

        Thread.CurrentThread.CurrentCulture = CultureInfo.CreateSpecificCulture(oCultura.vcCodCul)
        Thread.CurrentThread.CurrentUICulture = New CultureInfo(oCultura.vcCodCul)
    End Sub

    Public Shared Function ObtieneFechaHoraANSIServidor(ByVal biIncluyeHora As Boolean) As String
        Dim vcReturn As String
        Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
        Dim ClienteDatos As BL_GEN_Cliente = New BL_GEN_Cliente(VisualSoft.Suite80.DL.DALC_Base.TipoOrigen.Base)
        Try
            Dim vcFechaHora As String = ClienteDatos.ObtieneFechaHoraServidor()

            If biIncluyeHora Then vcReturn = vcFechaHora Else vcReturn = vcFechaHora.Substring(0, 8)
        Catch ex As Exception
            Throw ex
        Finally
            If (ClienteDatos IsNot Nothing) Then
                ClienteDatos.Dispose()
            End If
        End Try
        Return vcReturn
    End Function


    Class NumLetra
        Shared Function Convertir(ByVal numero As String, ByVal mayusculas As Boolean) As String
            Dim r As Regex
            Dim literal As String = ""
            Dim parte_decimal As String = ""
            'si el numero utiliza (.) en lugar de (,) -> se reemplaza
            numero = Replace(numero, ".", ",")
            'si el numero no tiene parte decimal, se le agrega ,00        
            If numero.IndexOf(",") = -1 Then
                numero = numero & ",00"
            End If
            'se valida formato de entrada -> 0,00 y 999 999 999,00
            'if (Pattern.matches("\\d{1,9},\\d{1,2}", numero)) {

            r = New Regex("\d{1,9},\d{1,2}")
            Dim mc As MatchCollection = r.Matches(numero)
            If mc.Count > 0 Then
                'se divide el numero 0000000,00 -> entero y decimal
                Dim Num As String() = numero.Split(",")
                'de da formato al numero decimal
                parte_decimal = Num(1) & "/100"
                'se convierte el numero a literal            
                If Num(0) = 0 Then
                    literal = "cero "
                ElseIf Num(0) > 999999 Then
                    literal = getMillones(Num(0))
                ElseIf Num(0) > 999 Then
                    literal = getMiles(Num(0))
                ElseIf Num(0) > 99 Then
                    literal = getCentenas(Num(0))
                ElseIf Num(0) > 9 Then
                    literal = getDecenas(Num(0))
                Else
                    literal = getUnidades(Num(0))
                End If
                'devuelve el resultado en mayusculas o minusculas
                If mayusculas Then
                    Return (literal & parte_decimal).ToUpper
                Else
                    Return literal & parte_decimal
                End If
            Else
                Return ""
            End If
        End Function

        ' funciones para convertir los numeros a literales
        Private Shared Function getUnidades(ByVal numero As String) As String '1 - 9
            Dim UNIDADES As String() = {"", "un ", "dos ", "tres ", "cuatro ", "cinco ", "seis ", "siete ", "ocho ", "nueve "}
            'si tuviera algun 0 antes se lo quita -> 09 = 9 o 009=9
            Dim num As String = numero.Substring(numero.Length - 1)
            Return UNIDADES(num)
        End Function

        Private Shared Function getDecenas(ByVal numero As String) As String '99
            Dim DECENAS As String() = {"diez ", "once ", "doce ", "trece ", "catorce ", "quince ", "dieciseis ", "diecisiete ", "dieciocho ", "diecinueve", "veinte ", "treinta ", "cuarenta ", "cincuenta ", "sesenta ", "setenta ", "ochenta ", "noventa "}
            If numero < 10 Then 'para casos como -> 01 - 09
                Return getUnidades(numero)
            ElseIf numero > 19 Then 'para 20...99
                Dim u As String = getUnidades(numero)
                If u.Equals("") Then 'para 20,30,40,50,60,70,80,90
                    Return DECENAS(numero.Substring(0, 1) + 8)
                Else
                    Return DECENAS(numero.Substring(0, 1) + 8) & "y " & u
                End If
            Else
                Return DECENAS(numero - 10)
            End If
        End Function

        Private Shared Function getCentenas(ByVal numero As String) As String
            Dim CENTENAS As String() = {"", "ciento ", "doscientos ", "trecientos ", "cuatrocientos ", "quinientos ", "seiscientos ", "setecientos ", "ochocientos ", "novecientos "}
            If numero > 99 Then 'es centena
                If numero = 100 Then 'caso especial
                    Return "cien "
                Else
                    Return CENTENAS(numero.Substring(0, 1)) & getDecenas(numero.Substring(1))
                End If
            Else 'se quita el 0 antes de convertir a decenas
                Return getDecenas(numero)
            End If
        End Function

        Private Shared Function getMiles(ByVal numero As String) As String
            'obtiene las centenas'
            Dim c As String = numero.Substring(numero.Length - 3)
            'obtiene los miles
            Dim m As String = numero.Substring(0, numero.Length - 3)
            Dim n As String = ""
            'se comprueba que miles tenga valor entero
            If m > 0 Then
                n = getCentenas(m)
                Return n & " mil " & getCentenas(c)
            Else
                Return "" & getCentenas(c)
            End If
        End Function

        Private Shared Function getMillones(ByVal numero As String) As String
            'se obtiene los miles
            Dim miles As String = numero.Substring(numero.Length - 6)
            'millones
            Dim millon As String = numero.Substring(0, numero.Length - 6)
            Dim n As String = ""
            If millon > 9 Then
                n = getCentenas(millon) & " millones "
            Else
                n = getUnidades(millon) & " millon "
            End If
            Return n & getMiles(miles)
        End Function
    End Class

    Class Permisos

    End Class


    Class ExportarExcel
        Public Shared Sub ExportDataTableToExcel(ByVal table As DataTable, ByVal name As String, ByVal lstCampo As List(Of ENT_ENT_Campo), ByVal Dominio As String, ByVal Usuario As String)
            Dim attachment As String = "attachment; filename=" & name & ".xls"

            Dim context As HttpContext = HttpContext.Current

            'context.Response.ClearContent()
            'context.Response.AddHeader("content-disposition", attachment)
            'context.Response.ContentType = "application/vnd.ms-excel"

            Dim tab As String = ""
            Dim strContenido As New StringBuilder()

            'context.Response.ContentEncoding = Encoding.Default
            'context.Response.Write("<table cellspacing='0' rules='all' border='1' id='tbl_" + name + "' style='border-collapse:collapse;'>")
            strContenido.Append("<table cellspacing='0' rules='all' border='1' id='tbl_" + name + "' style='border-collapse:collapse;'>")
            'context.Response.Write(vbLf)
            strContenido.Append(vbLf)

            'context.Response.Write(vbTab + "<tr style='font-weight:bolder;'>")
            strContenido.Append(vbTab + "<tr style='font-weight:bolder;'>")
            'context.Response.Write(vbLf + vbTab + vbTab)
            strContenido.Append(vbLf + vbTab + vbTab)

            'If lstCampo Is Nothing Then
            '    For Each col As DataColumn In table.Columns
            '        context.Response.Write("<td style='background-color: #66CCFF;'>")
            '        context.Response.Write(col.ColumnName)
            '        context.Response.Write("</td>")
            '    Next
            'Else
            '    For Each oCampo As ENT_ENT_Campo In lstCampo
            '        context.Response.Write("<td style='background-color: #66CCFF;'>")
            '        context.Response.Write(oCampo.vcDes)
            '        context.Response.Write("</td>")
            '    Next
            'End If

            For Each col As DataColumn In table.Columns
                'context.Response.Write("<td style='background-color: #66CCFF;'>")
                strContenido.Append("<td style='background-color: #66CCFF;'>")
                'context.Response.Write(col.ColumnName)
                strContenido.Append(col.ColumnName)
                'context.Response.Write("</td>")
                strContenido.Append("</td>")
            Next

            'context.Response.Write(vbLf)
            strContenido.Append(vbLf)
            'context.Response.Write(vbTab + "</tr>")
            strContenido.Append(vbTab + "</tr>")
            'context.Response.Write(vbLf)
            strContenido.Append(vbLf)

            For Each dr As DataRow In table.Rows
                'context.Response.Write(vbTab + "<tr>")
                strContenido.Append(vbTab + "<tr>")
                'context.Response.Write(vbLf + vbTab + vbTab)
                strContenido.Append(vbLf + vbTab + vbTab)

                For i = 0 To table.Columns.Count - 1
                    Dim cont As Boolean = False
                    Dim ValVer As String = "", ValFal As String = ""

                    If lstCampo IsNot Nothing Then
                        For Each oCampo As ENT_ENT_Campo In lstCampo
                            If (table.Columns(i).ToString() = oCampo.vcNom And oCampo.inTipDat = 6) Then
                                ValVer = oCampo.vcValVer.ToString()
                                ValFal = oCampo.vcValFal.ToString()
                                cont = True
                                Exit For
                            End If
                        Next
                    End If

                    If (cont = True) Then
                        If (ValVer.ToString() = "" And ValFal.ToString() = "") Then
                            'context.Response.Write("<td " + IIf(dr(i).ToString() = "False", "style='color: Red;'", "") + ">&nbsp;")
                            strContenido.Append("<td " + IIf(dr(i).ToString() = "False", "style='color: Red;'", "") + ">&nbsp;")
                            'context.Response.Write(IIf(dr(i).ToString() = "True", "Activo", "Baja"))
                            strContenido.Append(IIf(dr(i).ToString() = "True", "Activo", "Baja"))
                            'context.Response.Write("</td>")
                            strContenido.Append("</td>")
                        Else
                            'context.Response.Write("<td " + IIf(dr(i).ToString() = "False", "style='color: Red;'", "") + ">&nbsp;")
                            strContenido.Append("<td " + IIf(dr(i).ToString() = "False", "style='color: Red;'", "") + ">&nbsp;")
                            'context.Response.Write(IIf(dr(i).ToString() = "True", ValVer, ValFal))
                            strContenido.Append(IIf(dr(i).ToString() = "True", ValVer, ValFal))
                            'context.Response.Write("</td>")
                            strContenido.Append("</td>")
                        End If
                    Else
                        'context.Response.Write("<td>&nbsp;")
                        strContenido.Append("<td>&nbsp;")
                        'context.Response.Write(dr(i).ToString())
                        strContenido.Append(dr(i).ToString())
                        'context.Response.Write("</td>")
                        strContenido.Append("</td>")
                    End If
                Next
                'context.Response.Write(vbLf)
                strContenido.Append(vbLf)
                'context.Response.Write(vbTab + "</tr>")
                strContenido.Append(vbTab + "</tr>")
                'context.Response.Write(vbLf)
                strContenido.Append(vbLf)
            Next

            'context.Response.Write("</table>")
            strContenido.Append("</table>")

            Try
                'context.Response.End()
                'HttpContext.Current.ApplicationInstance.CompleteRequest()

                name = UtilitarioWeb.CorrijeNombreArchivo(name)
                Dim vcRutaTMP As String = HttpContext.Current.Server.MapPath("~/P_Movil/Administrar/Temporal/" + UtilitarioWeb.NombreArchivoEstandarizado(Dominio, Usuario) + "/")


                If Not File.Exists(vcRutaTMP) Then
                    Directory.CreateDirectory(vcRutaTMP)
                End If

                For Each file In Directory.GetFiles(vcRutaTMP)
                    IO.File.Delete(file)
                Next

                Dim writer As StreamWriter = File.CreateText(vcRutaTMP & name & ".xls")
                writer.WriteLine(strContenido)
                writer.Close()

                Using zip As New ZipFile
                    zip.AddDirectory(vcRutaTMP)
                    zip.Save(vcRutaTMP + "/" & name & ".zip")
                End Using

                Dim destPath As String = String.Empty
                Dim mediaName As String = vcRutaTMP + name + ".zip"
                destPath = context.Server.MapPath("~/" + mediaName)

                Dim fi As FileInfo = New FileInfo(destPath)
                If (fi.Exists) Then
                    HttpContext.Current.Response.ClearHeaders()
                    HttpContext.Current.Response.ClearContent()
                    HttpContext.Current.Response.AppendHeader("Content-Disposition", "attachment; filename=" + UtilitarioWeb.QuitarAcentos(fi.Name) + ";")
                    HttpContext.Current.Response.AppendHeader("Content-Length", fi.Length.ToString())
                    HttpContext.Current.Response.ContentType = "application/octet-stream"
                    HttpContext.Current.Response.TransmitFile(fi.FullName)
                    HttpContext.Current.Response.Flush()
                End If

            Catch ex1 As ThreadAbortException
                'Thread.ResetAbort()
                'context.Response.End()
            Catch ex As Exception
            End Try
        End Sub

        Public Shared Sub ExportDataTableToExcel(ByRef table As DataTable, ByVal name As String, ByVal lstCampo As List(Of ENT_ENT_Campo), ByVal blXLWorkbook As Boolean, ByVal Dominio As String, ByVal Usuario As String)
            Try
                ProcesaFormatoDataTableExportar(table, lstCampo)
                If blXLWorkbook Then
                    ExportDataTableToExcelXLWorkbook(table, name, Dominio, Usuario)
                Else
                    ExportDataTableToExcel(table, name, lstCampo, Dominio, Usuario)
                End If
            Catch ex As Exception
                Dim util As New Utilitarios
                util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
                Throw New Exception(UtilitarioWeb.MensajeError)
            End Try
        End Sub

        Public Shared Sub ExportDataTableToExcel_Fija(ByVal table As DataTable, ByVal name As String, ByVal lstCampo As List(Of VisualSoft.PCSistel.Producto.BE.ENT_ENT_Campo))
            Dim attachment As String = "attachment; filename=" & name & ".xls"

            Dim context As HttpContext = HttpContext.Current

            context.Response.ClearContent()
            context.Response.AddHeader("content-disposition", attachment)
            context.Response.ContentType = "application/vnd.ms-excel"

            Dim tab As String = ""

            context.Response.ContentEncoding = Encoding.Default
            context.Response.Write("<table cellspacing='0' rules='all' border='1' id='tbl_" + name + "' style='border-collapse:collapse;'>")
            context.Response.Write(vbLf)

            context.Response.Write(vbTab + "<tr style='font-weight:bolder;'>")
            context.Response.Write(vbLf + vbTab + vbTab)

            'If lstCampo Is Nothing Then
            '    For Each col As DataColumn In table.Columns
            '        context.Response.Write("<td style='background-color: #66CCFF;'>")
            '        context.Response.Write(col.ColumnName)
            '        context.Response.Write("</td>")
            '    Next
            'Else
            '    For Each oCampo As ENT_ENT_Campo In lstCampo
            '        context.Response.Write("<td style='background-color: #66CCFF;'>")
            '        context.Response.Write(oCampo.vcDes)
            '        context.Response.Write("</td>")
            '    Next
            'End If

            For Each col As DataColumn In table.Columns
                context.Response.Write("<td style='background-color: #66CCFF;'>")
                context.Response.Write(col.ColumnName)
                context.Response.Write("</td>")
            Next

            context.Response.Write(vbLf)
            context.Response.Write(vbTab + "</tr>")
            context.Response.Write(vbLf)

            For Each dr As DataRow In table.Rows
                context.Response.Write(vbTab + "<tr>")
                context.Response.Write(vbLf + vbTab + vbTab)
                For i = 0 To table.Columns.Count - 1
                    Dim cont As Boolean = False
                    Dim ValVer As String = "", ValFal As String = ""

                    If lstCampo IsNot Nothing Then
                        For Each oCampo As VisualSoft.PCSistel.Producto.BE.ENT_ENT_Campo In lstCampo
                            If (table.Columns(i).ToString() = oCampo.vcNom And oCampo.inTipDat = 6) Then
                                ValVer = oCampo.vcValVer.ToString()
                                ValFal = oCampo.vcValFal.ToString()
                                cont = True
                                Exit For
                            End If
                        Next
                    End If

                    If (cont = True) Then
                        If (ValVer.ToString() = "" And ValFal.ToString() = "") Then
                            context.Response.Write("<td " + IIf(dr(i).ToString() = "False", "style='color: Red;'", "") + ">&nbsp;")
                            context.Response.Write(IIf(dr(i).ToString() = "True", "Activo", "Baja"))
                            context.Response.Write("</td>")
                        Else
                            context.Response.Write("<td " + IIf(dr(i).ToString() = "False", "style='color: Red;'", "") + ">&nbsp;")
                            context.Response.Write(IIf(dr(i).ToString() = "True", ValVer, ValFal))
                            context.Response.Write("</td>")
                        End If
                    Else
                        context.Response.Write("<td>&nbsp;")
                        context.Response.Write(dr(i).ToString())
                        context.Response.Write("</td>")
                    End If
                Next
                context.Response.Write(vbLf)
                context.Response.Write(vbTab + "</tr>")
                context.Response.Write(vbLf)
            Next

            context.Response.Write("</table>")
            Try
                context.Response.End()
                'HttpContext.Current.ApplicationInstance.CompleteRequest()
            Catch ex1 As ThreadAbortException
                'Thread.ResetAbort()
                context.Response.End()
            Catch ex As Exception
            End Try
        End Sub


        Private Shared Function ProcesaFormatoDataTableExportar(ByRef table As DataTable, ByVal _lstCampo As List(Of ENT_ENT_Campo))

            Dim _return As DataTable = Nothing

            Try

                If _lstCampo IsNot Nothing Then

                    'lstCampo.Sort()

                    'Dim lstCampo As List(Of ENT_ENT_Campo) = _lstCampo.OrderBy(Function(o) o.inOrd).ToList()
                    Dim lstCampo As List(Of ENT_ENT_Campo) = (From c In _lstCampo Where c.btVig = True And c.btVis = True).ToList() '(From c In _lstCampo Where c.btVig = True And c.btVis = True Order By c.inOrd).ToList()
                    Try
                        'Reubicar columnas...
                        Dim x As Int16 = 0
                        For Each oCampo As ENT_ENT_Campo In lstCampo
                            oCampo.inOrd = x
                            x = x + 1
                        Next
                    Catch
                    End Try

                    '_lstCampo.Item(0).
                    Try
                        'Renombrar y ordenar columnas...
                        For Each oCampo As ENT_ENT_Campo In lstCampo
                            If table.Columns.Contains(oCampo.vcNomAlias) Then
                                table.Columns(oCampo.vcNomAlias).SetOrdinal(oCampo.inOrd)
                                table.Columns(oCampo.vcNomAlias).ColumnName = oCampo.vcDes '.Replace("ó", "o")
                            End If
                        Next
                    Catch ex As Exception
                    End Try

                    Try
                        'Quitar columnas...
                        For Each oCampo As ENT_ENT_Campo In _lstCampo
                            If Not oCampo.btVis Then
                                table.Columns.Remove(oCampo.vcDes)
                            End If
                        Next
                    Catch ex As Exception
                    End Try

                    'Valida data de la tabla....
                    Dim arrCampoEstados As New ArrayList
                    For Each oCampo As ENT_ENT_Campo In lstCampo
                        If oCampo.btVis = True And oCampo.inTipDat = 6 Then
                            arrCampoEstados.Add(oCampo)
                            'Agregar nueva columna...
                            Dim colString As DataColumn = New DataColumn(oCampo.vcDes & "_stragregado_")
                            colString.DataType = System.Type.GetType("System.String")
                            table.Columns.Add(colString)
                        End If
                    Next

                    Dim cont As Boolean = False, ValVer As String = "", ValFal As String = ""
                    Dim oCampoEstado As ENT_ENT_Campo = Nothing
                    Try

                        For Each dr As DataRow In table.Rows
                            For i = 0 To table.Columns.Count - 1
                                cont = False
                                For x As Integer = 0 To arrCampoEstados.Count - 1
                                    oCampoEstado = arrCampoEstados(x)
                                    If (table.Columns(i).ToString() = oCampoEstado.vcDes) Then
                                        ValVer = oCampoEstado.vcValVer.ToString()
                                        ValFal = oCampoEstado.vcValFal.ToString()
                                        cont = True
                                        Exit For
                                    End If
                                Next
                                If ("" & dr(i) <> "") Then
                                    If (cont = True) Then
                                        If (ValVer.ToString() = "" And ValFal.ToString() = "") Then
                                            dr(oCampoEstado.vcDes & "_stragregado_") = IIf("" & dr(i) = "True", "Activo", "Baja")
                                        Else
                                            dr(oCampoEstado.vcDes & "_stragregado_") = IIf("" & dr(i) = "True", ValVer, ValFal)
                                        End If
                                    End If
                                End If
                            Next
                            dr.AcceptChanges()
                        Next

                    Catch ex As Exception

                    End Try
                    'Quitar columnas...
                    Try
                        For x As Integer = 0 To arrCampoEstados.Count - 1
                            oCampoEstado = arrCampoEstados(x)
                            table.Columns.Remove(oCampoEstado.vcDes)
                        Next
                    Catch
                    End Try

                    'Editar Nombre columnas...
                    Try
                        For x As Integer = 0 To table.Columns.Count - 1
                            If table.Columns(x).ColumnName.Contains("_stragregado_") Then
                                table.Columns(x).ColumnName = table.Columns(x).ColumnName.Replace("_stragregado_", "")
                            End If
                        Next
                    Catch
                    End Try
                End If

            Catch
            End Try

            Return Nothing
            'Return _return

        End Function

        Private Shared Function DevuelveLetraPorNumeroColumnaExcel(ByVal inNumero As Integer) As String
            Dim _return As String
            Dim inValorInicial As Integer = 64
            _return = ChrW(inValorInicial + inNumero)
            Return _return
        End Function

        Private Shared Sub ExportDataTableToExcelXLWorkbook(ByRef table As DataTable, ByVal name As String, ByVal Dominio As String, ByVal Usuario As String)


            Try

                'Optional Dominio As String = "0", Optional Usuario As String = "0"
                Dim CarpetaDominio As String = ObtenerCarpetaDominio(HttpContext.Current.Server.MapPath("~/") + "/P_Movil/Administrar/Temporal/", "/")

                'Dim rootPath As String = HttpContext.Current.Server.MapPath("~/") + "P_Movil/Administrar/Temporal" + CarpetaDominio + "/"
                Dim rootPath As String = HttpContext.Current.Server.MapPath("~/") + "P_Movil/Administrar/Temporal/" + UtilitarioWeb.NombreArchivoEstandarizado(Dominio, Usuario) + "/"

                Dim attachment As String = name & ".xlsx"
                Dim context As HttpContext = HttpContext.Current

                Dim inInicioFila As Integer = 1
                Dim inInicioColumna As Integer = 1
                Dim workbook = New XLWorkbook()
                Dim worksheet = workbook.Worksheets.Add(table, name)



                Dim strLetraInicio As String = DevuelveLetraPorNumeroColumnaExcel(inInicioColumna)
                Dim strLetraFin As String = DevuelveLetraPorNumeroColumnaExcel(IIf(table.Columns.Count > 26, 26, table.Columns.Count))
                worksheet.Range(strLetraInicio & inInicioFila.ToString & ":" & strLetraFin & inInicioFila.ToString).Style.Fill.SetBackgroundColor(XLColor.FromArgb(102, 204, 255))
                worksheet.Range(strLetraInicio & inInicioFila.ToString & ":" & strLetraFin & inInicioFila.ToString).Style.Font.SetFontColor(XLColor.FromArgb(1, 1, 1))

                'formato a columna IMEI y Linea
                If (name = "Despacho (Oficina)" Or name = "Despacho (Empleado)") Then
                    If table.Columns.IndexOf("IMEI") > -1 Then
                        Dim inFinFila_F As Integer = worksheet.Rows.Count()
                        Dim strLetraIMEI_F As String = DevuelveLetraPorNumeroColumnaExcel(table.Columns.IndexOf("IMEI") + 1)
                        Dim strLetraLinea_F As String = DevuelveLetraPorNumeroColumnaExcel(table.Columns.IndexOf("Línea") + 1)
                        Dim dataFormatIMEI As IXLNumberFormat = worksheet.Range(strLetraIMEI_F & (inInicioFila + 1).ToString & ":" & strLetraIMEI_F & inFinFila_F.ToString).Style.NumberFormat()
                        Dim dataFormatLinea As IXLNumberFormat = worksheet.Range(strLetraLinea_F & (inInicioFila + 1).ToString & ":" & strLetraLinea_F & inFinFila_F.ToString).Style.NumberFormat()

                        dataFormatIMEI.SetFormat("@")
                        dataFormatLinea.SetFormat("@")
                    End If
                End If

                If (name = "Incidencias") Then
                    If table.Columns.Contains("LeidoPorUsuario") Then
                        table.Columns.Remove("LeidoPorUsuario")
                    End If
                    If table.Columns.Contains("opAccion") Then
                        table.Columns.Remove("opAccion")
                    End If

                End If

                If (name = "Despacho (Oficina)") Then
                    Dim strLetraIMEI As String = DevuelveLetraPorNumeroColumnaExcel(table.Columns.IndexOf("IMEI") + 1)
                    Dim strLetraLinea As String = DevuelveLetraPorNumeroColumnaExcel(table.Columns.IndexOf("Línea") + 1)
                    If table.Columns.IndexOf("IdDetallePedido") >= 0 Then
                        worksheet.Columns(table.Columns.IndexOf("IdDetallePedido") + 1).Hide()
                    Else
                        worksheet.Columns(table.Columns.IndexOf("IdSolicitud") + 1).Hide()
                    End If

                    Dim inFinFila As Integer = worksheet.Rows.Count()
                    worksheet.Range(strLetraIMEI & (inInicioFila + 1).ToString & ":" & strLetraIMEI & inFinFila.ToString).Style.Fill.SetBackgroundColor(XLColor.FromArgb(185, 213, 253))
                    worksheet.Range(strLetraLinea & (inInicioFila + 1).ToString & ":" & strLetraLinea & inFinFila.ToString).Style.Fill.SetBackgroundColor(XLColor.FromArgb(185, 213, 253))

                    If table.Columns.IndexOf("Observación") <> -1 Then
                        For i As Integer = 0 To table.Rows.Count - 1
                            If table.Rows(i)("Observación").ToString() <> "" Then
                                worksheet.Range(strLetraInicio & (i + inInicioFila + 1).ToString() & ":" & strLetraFin & (i + inInicioFila + 1).ToString()).Style.Fill.SetBackgroundColor(XLColor.FromArgb(252, 185, 194))
                                worksheet.Range(strLetraInicio & (i + inInicioFila + 1).ToString() & ":" & strLetraFin & (i + inInicioFila + 1).ToString()).Style.Font.SetFontColor(XLColor.FromArgb(1, 1, 1))
                            End If
                        Next
                    End If
                ElseIf (name = "Errores") Then
                    worksheet.Columns(table.Columns.IndexOf("Fila_Id") + 1).Hide()
                    worksheet.Columns(table.Columns.IndexOf("Filas_Id") + 1).Hide()
                End If

                'Dim muestraNumeroFolio As String = ConfigurationManager.AppSettings.Get("VerNumeroFolio")

                If (HttpContext.Current.Session("Cultura").F_inCodPai <> 56) Then

                    If (name.Contains("Facturación_Cuentas") Or name.Contains("Facturación_Lineas")) Then

                    Else
                        worksheet.Column(4).Hide()

                    End If

                End If

                workbook.SaveAs(rootPath + attachment)
                workbook.Dispose()

                '=================================================================================================================================
                name = UtilitarioWeb.CorrijeNombreArchivo(name)
                Dim destPath As String = UtilitarioWeb.ComprimeArchivo(rootPath + attachment, rootPath, name, name, "xlsx", False)
                '=================================================================================================================================

                Dim fi As FileInfo = New FileInfo(destPath)
                Try
                    If (fi.Exists) Then
                        HttpContext.Current.Response.ClearHeaders()
                        HttpContext.Current.Response.ClearContent()
                        HttpContext.Current.Response.AppendHeader("Content-Disposition", "attachment; filename=" + UtilitarioWeb.QuitarAcentos(fi.Name) + ";")
                        HttpContext.Current.Response.AppendHeader("Content-Length", fi.Length.ToString())
                        HttpContext.Current.Response.ContentEncoding = Encoding.UTF8
                        HttpContext.Current.Response.ContentType = "application/octet-stream;"
                        HttpContext.Current.Response.TransmitFile(fi.FullName)
                        HttpContext.Current.Response.Flush()

                    End If
                Catch ex As Exception
                    Dim util As New Utilitarios
                    util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
                    Throw New Exception(UtilitarioWeb.MensajeError)
                End Try

            Catch ex As Exception
                HttpContext.Current.Response.ContentType = "text/plain"
                HttpContext.Current.Response.Write(ex.Message)
            Finally
                HttpContext.Current.Response.End()
            End Try

        End Sub
    End Class

    Public Class Seguridad
        Public Shared Function EsAdministrador() As Boolean
            Dim resul As Boolean = False
            For Each oPerfil As ENT_SEG_Perfil In CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).Perfiles
                If oPerfil.P_inCod = 1 Or oPerfil.P_inCod = 43 OrElse oPerfil.CodigoPerfil = "ADMIN" OrElse oPerfil.CodigoPerfil = "SUPADM" Then 'Es administrador
                    resul = True
                    Exit For
                End If
            Next
            Return resul
        End Function

        Public Shared Function EsBASIC_BOLSA() As Boolean
            Dim resul As Boolean = False
            For Each oPerfil As ENT_SEG_Perfil In CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).Perfiles
                If oPerfil.P_inCod = 56 Then 'Es administrador BOLSA BASIC
                    resul = True
                    Exit For
                End If
            Next
            Return resul
        End Function

    End Class

    Public Class TipoSolicitud

        Enum TipoSolicitud
            Cambio = 1
            Nuevo = 2
            Reposicion = 3
            Reparacion = 4
            Prestamo = 5
            Activacion = 6 'agreagdo 09-09-2013
            Ampliacion = 7 'agreagdo 09-09-2013
        End Enum

        Public Shared Sub ActualizarUsuario()
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim TipoSolicitud As BL_MOV_TipoSolicitud = New BL_MOV_TipoSolicitud(VisualSoft.Suite80.DL.DALC_Base.TipoOrigen.Base, oUsuario.IdCliente)
            Try
                Dim vcEsAdmin As String = "0"
                Dim vcCodInt As String = oUsuario.F_vcCodInt

                If Seguridad.EsAdministrador Then vcEsAdmin = "1"
                Dim ds As DataSet = TipoSolicitud.ListarSeguridad(oUsuario.P_inCod, oUsuario.Empleado.P_vcCod, vcEsAdmin)
                Dim dtUsuTipSol As DataTable = ds.Tables(0)
                Dim dtGruTipSol As DataTable = ds.Tables(1)
                Dim dtAprTipSol As DataTable = ds.Tables(2)
                Dim dtAreaResp As DataTable = ds.Tables(3) 'agregado 06-03-2014 wapuamyta
                Dim dtTecnResp As DataTable = ds.Tables(4) 'agregado 18-08-2014 jherrera
                Dim dtTecnicos As DataTable = ds.Tables(5)

                Dim oUsuTipSol As New ENT_MOV_TipoSolicitud_Usuario
                oUsuario.TipoSolicitudTecnico.Clear()
                For i As Integer = 0 To dtUsuTipSol.Rows.Count - 1
                    oUsuTipSol = New ENT_MOV_TipoSolicitud_Usuario
                    oUsuTipSol.F_inTipSol = dtUsuTipSol.Rows(i)("F_inTipSol")
                    oUsuTipSol.vcNomTipSol = dtUsuTipSol.Rows(i)("vcNomTipSol")
                    oUsuTipSol.biLeer = dtUsuTipSol.Rows(i)("biLeer")
                    oUsuTipSol.biCrear = dtUsuTipSol.Rows(i)("biCrear")
                    oUsuTipSol.biEditar = dtUsuTipSol.Rows(i)("biEditar")
                    oUsuTipSol.biEliminar = dtUsuTipSol.Rows(i)("biEliminar")
                    oUsuario.TipoSolicitudTecnico.Add(oUsuTipSol)
                Next
                Dim oGruTipSol As New ENT_MOV_TipoSolicitud_GrupoOrigen
                oUsuario.TipoSolicitudGrupoOrigen.Clear()
                For i As Integer = 0 To dtGruTipSol.Rows.Count - 1
                    oGruTipSol = New ENT_MOV_TipoSolicitud_GrupoOrigen
                    oGruTipSol.F_inTipSol = dtGruTipSol.Rows(i)("F_inTipSol")
                    oGruTipSol.vcNomTipSol = dtGruTipSol.Rows(i)("vcNomTipSol")
                    oGruTipSol.biLeer = dtGruTipSol.Rows(i)("biLeer")
                    oGruTipSol.biCrear = dtGruTipSol.Rows(i)("biCrear")
                    oGruTipSol.biEditar = dtGruTipSol.Rows(i)("biEditar")
                    oGruTipSol.biEliminar = dtGruTipSol.Rows(i)("biEliminar")
                    oUsuario.TipoSolicitudGrupoOrigen.Add(oGruTipSol)
                Next
                Dim oAprTipSol As New ENT_MOV_SolicitudTipo
                oUsuario.TipoSolicitudAprobacion.Clear()
                For i As Integer = 0 To dtAprTipSol.Rows.Count - 1
                    oAprTipSol = New ENT_MOV_SolicitudTipo
                    oAprTipSol.inCodTipSol = dtAprTipSol.Rows(i)("F_inTipSol")
                    oAprTipSol.vcNomTipSol = dtAprTipSol.Rows(i)("vcNomTipSol")
                    oUsuario.TipoSolicitudAprobacion.Add(oAprTipSol)
                Next

                Dim oResTecTipSol As New ENT_MOV_SolicitudTipo
                oUsuario.TipoSolicitudTecnicoResponsable.Clear()
                For i As Integer = 0 To dtTecnResp.Rows.Count - 1
                    oResTecTipSol = New ENT_MOV_SolicitudTipo
                    oResTecTipSol.inCodTipSol = dtTecnResp.Rows(i)("F_inTipSol")
                    oResTecTipSol.vcNomTipSol = dtTecnResp.Rows(i)("vcNomTipSol")
                    oUsuario.TipoSolicitudTecnicoResponsable.Add(oResTecTipSol)
                Next

                oUsuario.CodIntResp = ""
                If (dtAreaResp.Rows.Count > 0) Then 'agregado 06-03-2014 wapuamyta
                    oUsuario.esJefeArea = True

                    'jherrera 02/06/2014
                    For i As Integer = 0 To dtAreaResp.Rows.Count - 1
                        If ComprobarStringNULL(dtAreaResp.Rows(i)("vcCodInt"), "") <> "" Then
                            oUsuario.CodIntResp = oUsuario.CodIntResp + dtAreaResp.Rows(i)("vcCodInt").ToString() + ","
                        End If
                    Next

                    If oUsuario.CodIntResp <> "" Then oUsuario.CodIntResp = oUsuario.CodIntResp.Substring(0, oUsuario.CodIntResp.Length - 1)
                End If

                'JHERRERA 16/10/2004: Lista de usuarios con perfil técnico, s eusa para filtrarlo en los contorles de búsqueda principal
                'Dim dtTecnicos As DataTable = Perfil.ObtenerUsuarios_Perfil(42, "").Tables(0)
                Dim vcTecnicos As String = ""
                For i As Integer = 0 To dtTecnicos.Rows.Count - 1
                    vcTecnicos = vcTecnicos + dtTecnicos.Rows(i)("P_inCod").ToString() + ","
                Next
                If vcTecnicos <> "" Then vcTecnicos = vcTecnicos.Substring(0, vcTecnicos.Length - 1)
                HttpContext.Current.Session("vcTecnicos") = vcTecnicos
                '-->

                HttpContext.Current.Session("Usuario") = oUsuario
            Catch ex As Exception

            Finally
                If (TipoSolicitud IsNot Nothing) Then
                    TipoSolicitud.Dispose()
                End If
            End Try
        End Sub

        ''' <summary>
        ''' Retorna el la lista de tipos de solicitud del tipo de acción solicitado(1: Leer, 2: Crear, 3: Editar, 4: Eliminar)
        ''' </summary>
        ''' <param name="inAccion"></param>
        ''' <returns></returns>
        ''' <remarks></remarks>

        Public Shared Function ListarTipoSolicitudGrupo(ByVal inAccion As Integer) As String
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)

            Dim vcGruTipSol As String = ""
            For i As Integer = 0 To oUsuario.TipoSolicitudGrupoOrigen.Count - 1
                If inAccion = 1 And oUsuario.TipoSolicitudGrupoOrigen.Item(i).biLeer = True Then
                    vcGruTipSol += oUsuario.TipoSolicitudGrupoOrigen.Item(i).F_inTipSol.ToString() + ","
                ElseIf inAccion = 2 And oUsuario.TipoSolicitudGrupoOrigen.Item(i).biCrear = True Then
                    vcGruTipSol += oUsuario.TipoSolicitudGrupoOrigen.Item(i).F_inTipSol.ToString() + ","
                ElseIf inAccion = 3 And oUsuario.TipoSolicitudGrupoOrigen.Item(i).biEditar = True Then
                    vcGruTipSol += oUsuario.TipoSolicitudGrupoOrigen.Item(i).F_inTipSol.ToString() + ","
                ElseIf inAccion = 4 And oUsuario.TipoSolicitudGrupoOrigen.Item(i).biEliminar = True Then
                    vcGruTipSol += oUsuario.TipoSolicitudGrupoOrigen.Item(i).F_inTipSol.ToString() + ","
                End If
            Next
            If vcGruTipSol.Length > 0 Then
                vcGruTipSol = vcGruTipSol.Substring(0, vcGruTipSol.Length - 1)
            Else
                vcGruTipSol = "0"
            End If

            Return vcGruTipSol

        End Function

        Public Shared Function ObtenerTiposPorUsuario() As String
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)

            Dim vcGruTipSol As String = ""
            For i As Integer = 0 To oUsuario.TipoSolicitudGrupoOrigen.Count - 1
                vcGruTipSol += oUsuario.TipoSolicitudGrupoOrigen.Item(i).F_inTipSol.ToString() + ","
            Next
            If vcGruTipSol.Length > 0 Then
                vcGruTipSol = vcGruTipSol.Substring(0, vcGruTipSol.Length - 1)
            Else
                vcGruTipSol = "0"
            End If

            Return vcGruTipSol

        End Function

        Public Shared Function EsTecnico() As Boolean
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim blnTecnico As Boolean = False

            For Each Perfil As ENT_SEG_Perfil In oUsuario.Perfiles
                If (Perfil.P_inCod = 42) Then
                    blnTecnico = True
                End If
            Next

            Return blnTecnico
        End Function

        Public Shared Function EsResponsableAprobacion() As Boolean
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim blnResponsable As Boolean = False

            If oUsuario.TipoSolicitudAprobacion.Count > 0 Then
                blnResponsable = True
            End If

            Return blnResponsable

        End Function

        ''' <summary>Retorna true o false si el usuario logueado es responsable del tipo de solicitud</summary>
        ''' <param name="IdTipoSolicitud">Id del tipo de solicitud</param>
        ''' <returns>True o False</returns>
        ''' <remarks></remarks>

        Public Shared Function EsResponsableAprobacion(ByVal IdTipoSolicitud As Integer) As Boolean
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim blnResponsable As Boolean = False

            For i As Integer = 0 To oUsuario.TipoSolicitudAprobacion.Count - 1
                If oUsuario.TipoSolicitudAprobacion(i).inCodTipSol = IdTipoSolicitud Then
                    blnResponsable = True
                    Exit For
                End If
            Next

            Return blnResponsable

        End Function

        Public Shared Function ListarTipoSolicitudAprobacion() As String
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)

            Dim vcTipSolApr As String = ""
            For i As Integer = 0 To oUsuario.TipoSolicitudAprobacion.Count - 1
                vcTipSolApr += oUsuario.TipoSolicitudAprobacion(i).inCodTipSol.ToString() + ","
            Next

            If vcTipSolApr.Length = 0 Then vcTipSolApr = "0" Else vcTipSolApr = vcTipSolApr.Substring(0, vcTipSolApr.Length - 1)

            Return vcTipSolApr
        End Function

        ''' <summary>
        ''' Retorna la lista de tipos de solicitud para técnico del tipo de acción solicitado(0: Todos, 1: Leer, 2: Asignar, 3: Procesar, 4: Anular)
        ''' </summary>
        ''' <param name="inAccion"></param>
        ''' <returns></returns>
        ''' <remarks></remarks>

        Public Shared Function ListarTipoSolicitudTecnico(ByVal inAccion As Integer) As String
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)

            Dim vcTipSolTec As String = ""
            For i As Integer = 0 To oUsuario.TipoSolicitudTecnico.Count - 1
                If inAccion = 0 Then
                    vcTipSolTec += oUsuario.TipoSolicitudTecnico(i).F_inTipSol.ToString() + ","
                ElseIf inAccion = 1 And oUsuario.TipoSolicitudTecnico(i).biLeer = True Then
                    vcTipSolTec += oUsuario.TipoSolicitudTecnico(i).F_inTipSol.ToString() + ","
                ElseIf inAccion = 2 And oUsuario.TipoSolicitudTecnico(i).biCrear = True Then
                    vcTipSolTec += oUsuario.TipoSolicitudTecnico(i).F_inTipSol.ToString() + ","
                ElseIf inAccion = 3 And oUsuario.TipoSolicitudTecnico(i).biEditar = True Then
                    vcTipSolTec += oUsuario.TipoSolicitudTecnico(i).F_inTipSol.ToString() + ","
                ElseIf inAccion = 4 And oUsuario.TipoSolicitudTecnico(i).biEliminar = True Then
                    vcTipSolTec += oUsuario.TipoSolicitudTecnico(i).F_inTipSol.ToString() + ","
                End If
            Next

            If vcTipSolTec.Length = 0 Then vcTipSolTec = "0" Else vcTipSolTec = vcTipSolTec.Substring(0, vcTipSolTec.Length - 1)

            Return vcTipSolTec
        End Function

        ''' <summary>
        ''' Retorna la lista de tipos de solicitud de los que el usuario es técnico responsable
        ''' </summary>
        ''' <returns></returns>
        ''' <remarks></remarks>
        Public Shared Function ListarTipoSolicitudTecnicoResponsable() As String
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)

            Dim vcTipSolResTec As String = ""
            For i As Integer = 0 To oUsuario.TipoSolicitudTecnicoResponsable.Count - 1
                vcTipSolResTec += oUsuario.TipoSolicitudTecnicoResponsable(i).inCodTipSol.ToString() + ","
            Next

            If vcTipSolResTec.Length = 0 Then vcTipSolResTec = "0" Else vcTipSolResTec = vcTipSolResTec.Substring(0, vcTipSolResTec.Length - 1)

            Return vcTipSolResTec
        End Function

        ''' <summary>Retorna true o false si el usuario logueado es técnico con permiso de asignación del tipo de solicitud</summary>
        ''' <param name="IdTipoSolicitud">Id del tipo de solicitud</param>
        ''' <returns>True o False</returns>
        ''' <remarks></remarks>
        Public Shared Function TecnicoPuedeAsignar(ByVal IdTipoSolicitud As Integer) As String
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim biRetorna As Boolean = False

            For i As Integer = 0 To oUsuario.TipoSolicitudTecnico.Count - 1
                If oUsuario.TipoSolicitudTecnico(i).F_inTipSol = IdTipoSolicitud And oUsuario.TipoSolicitudTecnico(i).biCrear = True Then
                    biRetorna = True
                    Exit For
                End If
            Next
            Return biRetorna

        End Function

        ''' <summary>Retorna true o false si el usuario logueado es técnico con permiso de culminar el tipo de solicitud</summary>
        ''' <param name="IdTipoSolicitud">Id del tipo de solicitud</param>
        ''' <returns>True o False</returns>
        ''' <remarks></remarks>
        Public Shared Function TecnicoPuedeCulminar(ByVal IdTipoSolicitud As Integer) As String
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim biRetorna As Boolean = False

            For i As Integer = 0 To oUsuario.TipoSolicitudTecnico.Count - 1
                If oUsuario.TipoSolicitudTecnico(i).F_inTipSol = IdTipoSolicitud And oUsuario.TipoSolicitudTecnico(i).biEditar = True Then
                    biRetorna = True
                    Exit For
                End If
            Next
            Return biRetorna

        End Function

    End Class

    Public Class Atenciones
        Public Shared Sub ActualizarUsuario()
            Dim Atencion As BL_MOV_ATE_Atencion = Nothing
            Try
                Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
                Atencion = New BL_MOV_ATE_Atencion(oUsuario.IdCliente)

                Dim dt As DataTable = Atencion.ListarParaLogin(oUsuario.P_inCod).Tables(0)
                Dim oVentanilla As ENT_MOV_ATE_Ventanilla = New ENT_MOV_ATE_Ventanilla

                If dt.Rows.Count > 0 Then
                    'oVentanilla.IdVentanilla = ComprobarIntNULL(dt.Rows(0)("IdVentanilla"), -1)
                    'oVentanilla.IdModulo = ComprobarIntNULL(dt.Rows(0)("IdModulo"), -1)
                    'oVentanilla.IdOpcion = ComprobarIntNULL(dt.Rows(0)("IdOpcion"), -1)
                    'oVentanilla.Numero = ComprobarIntNULL(dt.Rows(0)("Numero"), -1)
                    'oVentanilla.IdOperador = ComprobarIntNULL(dt.Rows(0)("IdOperador"), -1)
                    'oVentanilla.IdAtencion = ComprobarIntNULL(dt.Rows(0)("IdAtencion"), -1)
                    'oVentanilla.Descripcion = dt.Rows(0)("Descripcion").ToString()
                    'oVentanilla.Automatico = ComprobarBoolNULL(dt.Rows(0)("Automatico"), False)
                    'oVentanilla.IdEstado = ComprobarIntNULL(dt.Rows(0)("IdEstado"), -1)
                    'oVentanilla.btVig = ComprobarBoolNULL(dt.Rows(0)("btVig"), False)

                    oUsuario.EsOperador = True
                    oUsuario.IdOperador = ComprobarIntNULL(dt.Rows(0)("IdOperador"), -1)
                    oUsuario.IdEstadoOperador = ComprobarIntNULL(dt.Rows(0)("IdEstadoOperador"), -1)
                Else
                    oUsuario.EsOperador = False
                    oUsuario.IdOperador = 0
                    oUsuario.IdEstadoOperador = 0
                End If

                oVentanilla.IdVentanilla = 0
                oVentanilla.IdEstado = 0
                oVentanilla.IdOpcion = 0
                oUsuario.Ventanilla = oVentanilla

                HttpContext.Current.Session("Usuario") = oUsuario

            Catch ex As Exception
                System.Diagnostics.Debug.WriteLine(ex.Message)
            Finally
                If (Atencion IsNot Nothing) Then
                    Atencion.Dispose()
                End If
            End Try

            'Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)

            'Dim vcTipSolTec As String = ""
            'For i As Integer = 0 To oUsuario.TipoSolicitudTecnico.Count - 1
            '    vcTipSolTec += oUsuario.TipoSolicitudTecnico(i).F_inTipSol.ToString() + ","
            'Next

            'If vcTipSolTec.Length = 0 Then vcTipSolTec = "0" Else vcTipSolTec = vcTipSolTec.Substring(0, vcTipSolTec.Length - 1)

            'Return vcTipSolTec
        End Sub



        Public Shared Function EsSupervisor() As Boolean
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim blnSupervisor As Boolean = False

            For Each Perfil As ENT_SEG_Perfil In oUsuario.Perfiles
                If (Perfil.P_inCod = 59) Then
                    blnSupervisor = True
                End If
            Next

            Return blnSupervisor
        End Function



    End Class

    'RURBINA 20190423
    Public Class LicenciaUsuarioModulos
        Public Shared Sub GuardarLicencia()
            Dim eLicUsuarioModulo As ENT_LIC_UsuariosModulos = Nothing
            Try
                Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
                eLicUsuarioModulo = New ENT_LIC_UsuariosModulos
                For i As Integer = 0 To oUsuario.LicenciaUsuarioModulos.Count - 1
                    eLicUsuarioModulo.Cantidad = oUsuario.LicenciaUsuarioModulos(i).Cantidad
                    eLicUsuarioModulo.Tipo = oUsuario.LicenciaUsuarioModulos(i).Tipo
                    eLicUsuarioModulo.Licencia = oUsuario.LicenciaUsuarioModulos(i).Licencia
                    'eLicUsuarioModulo.TipoLicencia = oUsuario.LicenciaUsuarioModulos(i).TipoLicencia
                    'eLicUsuarioModulo.FechaFin = oUsuario.LicenciaUsuarioModulos(i).FechaFin

                    HttpContext.Current.Session("LicUsuarioModulo") = eLicUsuarioModulo
                Next
            Catch ex As Exception
                Try
                    Dim util As New Utilitarios
                    util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
                    Throw New Exception(UtilitarioWeb.MensajeError)
                Catch exC As Exception
                End Try
            Finally

            End Try
        End Sub

        Public Shared Function ObtieneLicencia(ByVal valor As Integer) As String
            Dim eUsuarioLicenciaModulo As New ENT_LIC_UsuariosModulos
            Dim resultado As String = ""
            Try
                Select Case valor
                    Case 1
                        If Not IsNothing(HttpContext.Current.Session("LicUsuarioModulo")) Then
                            eUsuarioLicenciaModulo = CType(HttpContext.Current.Session("LicUsuarioModulo"), ENT_LIC_UsuariosModulos)
                            resultado = eUsuarioLicenciaModulo.Licencia
                        Else
                            GuardarLicencia()
                            eUsuarioLicenciaModulo = CType(HttpContext.Current.Session("LicUsuarioModulo"), ENT_LIC_UsuariosModulos)
                            resultado = eUsuarioLicenciaModulo.Licencia
                        End If
                    Case 2
                        If Not IsNothing(HttpContext.Current.Session("LicUsuarioModulo")) Then
                            eUsuarioLicenciaModulo = CType(HttpContext.Current.Session("LicUsuarioModulo"), ENT_LIC_UsuariosModulos)
                            resultado = eUsuarioLicenciaModulo.Cantidad
                        Else
                            GuardarLicencia()
                            eUsuarioLicenciaModulo = CType(HttpContext.Current.Session("LicUsuarioModulo"), ENT_LIC_UsuariosModulos)
                            resultado = eUsuarioLicenciaModulo.Cantidad
                        End If
                    Case 3
                        If Not IsNothing(HttpContext.Current.Session("LicUsuarioModulo")) Then
                            eUsuarioLicenciaModulo = CType(HttpContext.Current.Session("LicUsuarioModulo"), ENT_LIC_UsuariosModulos)
                            resultado = eUsuarioLicenciaModulo.Tipo
                        Else
                            GuardarLicencia()
                            eUsuarioLicenciaModulo = CType(HttpContext.Current.Session("LicUsuarioModulo"), ENT_LIC_UsuariosModulos)
                            resultado = eUsuarioLicenciaModulo.Tipo
                        End If
                End Select
            Catch ex As Exception
                Try
                    Dim util As New Utilitarios
                    util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
                    Throw New Exception(UtilitarioWeb.MensajeError)
                Catch exC As Exception
                End Try
            Finally

            End Try
            Return resultado
        End Function
        Public Shared Function ObtenerKeyServidor() As String
            Dim strKeyServidor As String = ""
            Try
                strKeyServidor = ConfigurationManager.AppSettings("KeyServidor")
            Catch ex As Exception
                Try
                    Dim util As New Utilitarios
                    util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
                    Throw New Exception(UtilitarioWeb.MensajeError)
                Catch exC As Exception
                End Try
            End Try
            Return strKeyServidor
        End Function
    End Class
End Class
