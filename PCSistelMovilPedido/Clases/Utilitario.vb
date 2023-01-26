Imports VisualSoft.Suite80.DL
Imports VisualSoft.Suite80.BL
Imports Microsoft.VisualBasic
Imports VisualSoft.Suite80.BE
Imports System.Data.SqlClient
Imports System.Data
Imports System.IO
Imports System.Net.Mail
Imports VisualSoft.Comun.Utilitarios
Imports System.Xml.Serialization
Imports System.Net
Imports System.Threading
Imports System.Globalization
Imports VisualSoft.PCSistelMovil.General.BE
Imports Ionic.Zip


Namespace UtilitarioPCSistel

    Public Class UtilitarioGeneral
        Public Shared Function ObtieneVersionArchivoEstatico(ByVal RutaWeb As String) As String
            Dim RutaArchivo As String = HttpContext.Current.Server.MapPath(RutaWeb)
            Dim VersionArchivo As String = ""
            If File.Exists(RutaArchivo) Then
                VersionArchivo = "?v=" & New FileInfo(RutaArchivo).LastWriteTime.ToString("yyyyMMddhhmmss")
            End If
            Return RutaWeb & VersionArchivo
        End Function
    End Class

End Namespace

Public Structure LicenciaWeb
    Public CantidadDispositivos As Integer
    Public TipoLicencia As String
    Public DiasDemo As Integer
    Public FechaInicioDemo As String
End Structure

Public Class Utilitario
    Public Shared MensajeError As String = "Error en la acción realizada, comuníquese con el área de sistemas"

    
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

    Public Shared Function ObtieneNombreMes(intMes As Integer) As String
        Dim _return As String = ""

        Select Case intMes
            Case 1 : _return = "Enero"
            Case 2 : _return = "Febrero"
            Case 3 : _return = "Marzo"
            Case 4 : _return = "Abril"
            Case 5 : _return = "Mayo"
            Case 6 : _return = "Junio"
            Case 7 : _return = "Julio"
            Case 8 : _return = "Agosto"
            Case 9 : _return = "Setiembre"
            Case 10 : _return = "Octubre"
            Case 11 : _return = "Noviembre"
            Case 12 : _return = "Diciembre"
        End Select

        Return _return
    End Function

    Public Shared Function ReemplazarTilder(ByVal strValor As String) As String
        strValor = strValor.Replace("Á", "A")
        strValor = strValor.Replace("É", "E")
        strValor = strValor.Replace("Í", "I")
        strValor = strValor.Replace("Ó", "O")
        strValor = strValor.Replace("Ú", "U")
        strValor = strValor.Replace("á", "a")
        strValor = strValor.Replace("é", "e")
        strValor = strValor.Replace("í", "i")
        strValor = strValor.Replace("ó", "o")
        strValor = strValor.Replace("ú", "u")

        Return strValor
    End Function

    Public Shared Function NombreArchivoEstandarizado(ByVal pFileName As String, ByVal pUsuario As String)
        pUsuario = Right("00" + pUsuario, 2)
        Dim Dia As String = Right("00" + Now.Day.ToString, 2)
        Dim Mes As String = Right("00" + Now.Month.ToString, 2)
        Dim Anio As String = Right("0000" + Now.Year.ToString, 4)
        Dim Hora As String = Right("00" + Now.Hour.ToString, 2)
        Dim Minuto As String = Right("00" + Now.Minute.ToString, 2)
        Dim Segundo As String = Right("00" + Now.Second.ToString, 2)
        Dim Fecha As String = Anio + Mes + Dia + Hora + Minuto + Segundo

        Return pUsuario + "_" + pFileName + "_" + Fecha
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

    Public Shared Function ObtieneFechaHoraANSIServidor(ByVal biIncluyeHora As Boolean) As String
        Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
        Dim ClienteDatos As BL_GEN_Cliente = New BL_GEN_Cliente(DALC_Base.TipoOrigen.Datos)

        Dim vcFechaHora As String = ClienteDatos.ObtieneFechaHoraServidor()
        Dim vcReturn As String

        If biIncluyeHora Then vcReturn = vcFechaHora Else vcReturn = vcFechaHora.Substring(0, 8)

        Return vcReturn

    End Function

    Public Class JQGridItem
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
#Region "Passive attributes."
        Private _totalPaginas As Integer
        Private _paginaActual As Integer
        Private _totalRegistros As Integer
        Private _items As List(Of JQGridItem)
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
        ''' <param name="pItems">Lista de elementos a mostrar en el JQGrid</param>
        Public Sub New(ByVal p_TotalPaginas As Integer, ByVal p_PaginaActual As Integer, ByVal p_TotalRegistros As Integer, ByVal dtDetalle As DataTable, ByVal inId As Integer)
            _totalPaginas = p_TotalPaginas
            _paginaActual = p_PaginaActual
            _totalRegistros = p_TotalRegistros
            _items = New List(Of JQGridItem)()
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
        End Sub
#End Region
    End Class

    Public Shared NombreSistemaMovil As String = "GESTION_MOVIL"
    Public Shared NombreSistemaHotel As String = "PCSISTEL_HOTELERO"

    Public Shared Sub ConfigurarColumnasServicios(ByVal offset As Integer, ByVal propiedadesServicio As Integer, ByVal dt As DataTable, ByVal vcValIli As String, _
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

    'Public Shared Function fnValidaLicenciaPCSistelMovil(ByRef pstrMensaje As String) As Boolean
    '    'Validacion de Licencia
    '    Dim _return As Boolean = True
    '    If ConfigurationManager.AppSettings("Identificacion") Is Nothing OrElse ConfigurationManager.AppSettings("Identificacion") = "" Then
    '        pstrMensaje = "<br>El archivo web.config no está actualizado.<br>Valide el archivo indicado.<br><br>"
    '        _return = False
    '    Else

    '        Dim strLlaveClienteActual As String = Utilitario.fnDetectaSerieAdicional()
    '        Dim strLlaveCliente As String = ConfigurationManager.AppSettings("Identificacion")
    '        strLlaveCliente = CompLicencia.SecurityVSNet.fnDesEncriptarClave(strLlaveCliente, "")

    '        If strLlaveClienteActual <> strLlaveCliente Then
    '            pstrMensaje = "<br>Lo sentimos... el módulo que ha ejecutado <br>no ha sido Licenciado.<br>Contácte con su Distribuidor.<br><br>"
    '            _return = False
    '        End If
    '    End If

    '    Return _return

    'End Function


    Enum TipoSolicitud
        Cambio = 1
        Nuevo = 2
        Reposicion = 3
        Reparacion = 4
        Prestamo = 5
        Activacion = 6 'agreagdo 09-09-2013
        Ampliacion = 7 'agreagdo 09-09-2013
    End Enum

    Enum TipoPedido
        'Nuevo = 8
        'Cancelado = 9
        'Editar = 10
        'Baja = 11
        'RenovarLinea = 12
        'RenovarPlan = 13
        'RenovarEquipo = 14


        Nuevo = 8
        Cancelado = 9
        Editar = 10
        Baja = 11
        RenovarEquipo = 12
        RenovarPlan = 13
        RenovarLinea = 14
    End Enum


    Enum TipoDistribucionServicios
        Linea = 1
        CentroCosto = 2
        Organizacion = 3
        Nivel = 4
        GrupoEmpleados = 5
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

    Class OpcionesSeguridad
        Public Class Opciones
            Private Shared _ActivoInsertar As Boolean
            Private Shared _ActivoActualizar As Boolean
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
            Opciones.ActivoInsertar = True
            Opciones.ActivoActualizar = True
            Opciones.ActivoEliminar = True
            Opciones.ActivoAccion = True
            Opciones.ActivoAccion = True
            Opciones.ActivoExportar = True
            Opciones.ActivoImportar = True

            For Each oPerfil As ENT_SEG_Perfil In lstPerfil
                Opciones.ActivoInsertar = Opciones.ActivoInsertar Or oPerfil.btIns
                Opciones.ActivoActualizar = Opciones.ActivoActualizar Or oPerfil.btAct
                Opciones.ActivoEliminar = Opciones.ActivoEliminar Or oPerfil.btEli
                Opciones.ActivoExportar = Opciones.ActivoExportar Or oPerfil.btExp
                Opciones.ActivoImportar = Opciones.ActivoImportar Or oPerfil.btImp
            Next
            Opciones.ActivoAccion = Opciones.ActivoInsertar Or Opciones.ActivoActualizar Or Opciones.ActivoEliminar
        End Sub
    End Class

    Shared Sub AgregarTema(ByVal Server As HttpServerUtility, ByVal head As HtmlHead, ByVal vcTem As String)
        Dim archivoCss As String = "/jquery-ui-1.8.16.custom.css"
        Dim rutaCss As String = "~/Common/Styles/JqueryThemeRoller/"

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
                cssTheme.Attributes("href") = rutaCss & "Principal" & archivoCss
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

        Dim cssPrincipal As New HtmlLink
        cssPrincipal.Attributes("type") = "text/css"
        cssPrincipal.Attributes("href") = "~/Common/Styles/Principal.css"
        cssPrincipal.Attributes("rel") = "stylesheet"
        head.Controls.Add(cssPrincipal)

        'Agregar JS...
        'Validar si ya se cargo previamente...
        'Dim jsKnockOut As New HtmlLink
        'jsKnockOut.Attributes("type") = "text/javascript"
        'jsKnockOut.Attributes("href") = "~/Common/Scripts/knockout-3.0.0.js"
        'head.Controls.Add(jsKnockOut)

        'head.Controls.Add(New HtmlHead("<meta  http-equiv = ""X-UA-Compatible""  content = ""IE = Edge""  />"))

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

    Shared Function ListarTipoSolicitud(ByVal inCod As Integer, ByVal vcNom As String) As List(Of Itemlst)
        Dim lstTipoSolicitud As New List(Of Itemlst)
        Dim item As New Itemlst
        Dim item1 As New Itemlst
        Dim item2 As New Itemlst
        Dim item3 As New Itemlst
        Dim item4 As New Itemlst
        Dim item5 As New Itemlst 'activacion
        Dim item6 As New Itemlst 'ampliacion
        If vcNom <> "" Then
            item.inCod = inCod
            item.vcNom = vcNom
            lstTipoSolicitud.Add(item)
        End If

        item1.inCod = TipoSolicitud.Cambio
        item1.vcNom = "Cambio"
        item2.inCod = TipoSolicitud.Nuevo
        item2.vcNom = "Nuevo"
        item3.inCod = TipoSolicitud.Reposicion
        item3.vcNom = "Reposición"
        item4.inCod = TipoSolicitud.Reparacion
        item4.vcNom = "Reparación"
        'nuevo-estado de solicitudes de servicios
        item5.inCod = TipoSolicitud.Activacion
        item5.vcNom = "Activación"
        item6.inCod = TipoSolicitud.Ampliacion
        item6.vcNom = "Ampliación"

        lstTipoSolicitud.Add(item1)
        lstTipoSolicitud.Add(item2)
        lstTipoSolicitud.Add(item3)
        lstTipoSolicitud.Add(item4)
        'solicitudes de servicios
        lstTipoSolicitud.Add(item5)
        lstTipoSolicitud.Add(item6)

        Return lstTipoSolicitud
    End Function


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
        strFormato = "###" + oCultura.vcSimSepMil + "##0" + oCultura.vcSimDec '"###,##0."

        For i As Integer = 0 To oCultura.dcNumDec - 1
            strFormato = strFormato + "0"
        Next

        Return strFormato
    End Function

    Public Shared Function DevuelveNumeroFormateado(ByVal pvcNumero As String, ByVal oCultura As ENT_GEN_Cultura) As String
        'ActualizarCultura(oCultura)
        Dim strForNum = DevuelveFormatoNumero(oCultura)
        Dim vcNumero As String = ""

        If pvcNumero.Trim() <> "" Then
            vcNumero = (Convert.ToDecimal("0" + pvcNumero)).ToString(strForNum)
        End If

        Return vcNumero
    End Function

    Public Shared Function DevuelveNumeroFormateado(ByVal pvcNumero As String, ByVal strForNum As String) As String
        Dim vcNumero As String = ""
        If pvcNumero.Trim() <> "" Then
            vcNumero = (Convert.ToDecimal(pvcNumero)).ToString(strForNum)
        End If

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
        Thread.CurrentThread.CurrentCulture.NumberFormat.NumberDecimalDigits = oCultura.dcNumDec
        Thread.CurrentThread.CurrentCulture.NumberFormat.NumberDecimalSeparator = oCultura.vcSimDec
        Thread.CurrentThread.CurrentCulture.NumberFormat.NumberGroupSeparator = oCultura.vcSimSepMil
    End Sub

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

    Shared Sub AgregarScriptJqueryUI(ByVal Server As HttpServerUtility, ByVal head As HtmlHead, ByVal vcTem As String)

        Dim strRaiz As String = ObtieneRaizSistema()

        Dim rutaJs As String = ""
        Dim js As HtmlGenericControl
        rutaJs = fnValidarRutaHttp(strRaiz & "/Common/Scripts/JqueryUI/jquery-ui.js")
        js = New HtmlGenericControl("script")
        js.Attributes("type") = "text/javascript"
        js.Attributes("src") = rutaJs
        head.Controls.Add(js)

        'http://localhost:49248/WebSite8/General/Administrar/Mantenimiento/~/Common/Scripts/JqueryUI/jquery-ui.js 404 (Not Found) 

        'Grilla JqGrid...
        Dim cssPrincipal As New HtmlLink
        cssPrincipal.Attributes("type") = "text/css"
        cssPrincipal.Attributes("href") = "~/Common/Styles/jqGrid/ui.jqgrid.css"
        cssPrincipal.Attributes("rel") = "stylesheet"
        head.Controls.Add(cssPrincipal)

        rutaJs = fnValidarRutaHttp(strRaiz & "/Common/Scripts/jqGrid/i18n/grid.locale-es.js")
        js = New HtmlGenericControl("script")
        js.Attributes("type") = "text/javascript"
        js.Attributes("src") = rutaJs
        head.Controls.Add(js)

        rutaJs = fnValidarRutaHttp(strRaiz & "/Common/Scripts/jqGrid/jquery.jqGrid.min.js")
        js = New HtmlGenericControl("script")
        js.Attributes("type") = "text/javascript"
        js.Attributes("src") = rutaJs
        head.Controls.Add(js)

        rutaJs = fnValidarRutaHttp(strRaiz & "/Common/Scripts/jqGrid/grid.base.js")
        js = New HtmlGenericControl("script")
        js.Attributes("type") = "text/javascript"
        js.Attributes("src") = rutaJs
        head.Controls.Add(js)

        rutaJs = fnValidarRutaHttp(strRaiz & "/Common/Scripts/jqGrid/grid.common.js")
        js = New HtmlGenericControl("script")
        js.Attributes("type") = "text/javascript"
        js.Attributes("src") = rutaJs
        head.Controls.Add(js)

        rutaJs = fnValidarRutaHttp(strRaiz & "/Common/Scripts/jqGrid/grid.formedit.js")
        js = New HtmlGenericControl("script")
        js.Attributes("type") = "text/javascript"
        js.Attributes("src") = rutaJs
        head.Controls.Add(js)

        rutaJs = fnValidarRutaHttp(strRaiz & "/Common/Scripts/jqGrid/jquery.fmatter.js")
        js = New HtmlGenericControl("script")
        js.Attributes("type") = "text/javascript"
        js.Attributes("src") = rutaJs
        head.Controls.Add(js)

        rutaJs = fnValidarRutaHttp(strRaiz & "/Common/Scripts/jqGrid/JsonXml.js")
        js = New HtmlGenericControl("script")
        js.Attributes("type") = "text/javascript"
        js.Attributes("src") = rutaJs
        head.Controls.Add(js)

        rutaJs = fnValidarRutaHttp(strRaiz & "/Common/Scripts/jqGrid/plugins/jquery.tablednd.js")
        js = New HtmlGenericControl("script")
        js.Attributes("type") = "text/javascript"
        js.Attributes("src") = rutaJs
        head.Controls.Add(js)

        rutaJs = fnValidarRutaHttp(strRaiz & "/Common/Scripts/jqGrid/jqDnR.js")
        js = New HtmlGenericControl("script")
        js.Attributes("type") = "text/javascript"
        js.Attributes("src") = rutaJs
        head.Controls.Add(js)

        rutaJs = fnValidarRutaHttp(strRaiz & "/Common/Scripts/jqGrid/jqModal.js")
        js = New HtmlGenericControl("script")
        js.Attributes("type") = "text/javascript"
        js.Attributes("src") = rutaJs
        head.Controls.Add(js)


        rutaJs = fnValidarRutaHttp(strRaiz & "/Common/Scripts/jqGrid/grid.jqueryui.js")
        js = New HtmlGenericControl("script")
        js.Attributes("type") = "text/javascript"
        js.Attributes("src") = rutaJs
        head.Controls.Add(js)

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
        _return = _return.Replace("http:/", "http://")
        Return _return
    End Function

    Shared Function fnValidarRutaHttp(strRuta As String) As String
        If strRuta IsNot Nothing Then
            Dim _return As String = strRuta.Replace("//", "/")
            If _return.ToLower.Contains("http") Then
                _return = _return.Replace("http:/", "http://")
            End If
            Return _return
        Else
            Return ""
        End If
    End Function

    Public Shared Function ComprimeArchivo(ByVal NombreArchivo As String, ByVal FormatoNombreArchivo As String, ByVal NombreArchivoComprimido As String, ByVal RutaTemporal As String, ByVal IdDominio As String, ByVal CopiaArchivo As Boolean, Optional RutaExternaArchivo As String = "%") As String

        If Not System.IO.Directory.Exists(RutaTemporal + IdDominio + "/" + NombreArchivoComprimido) Then
            System.IO.Directory.CreateDirectory(RutaTemporal + IdDominio + "/" + NombreArchivoComprimido)
        End If

        'If Not System.IO.Directory.Exists(RutaTemporal + IdDominio + "/" + NombreArchivoComprimido) Then
        '    System.IO.Directory.CreateDirectory(RutaTemporal + IdDominio + "/" + NombreArchivoComprimido)
        'End If

        If CopiaArchivo = True Then

            If RutaExternaArchivo = "%" Then
                'FileCopy(RutaTemporal + NombreArchivo + FormatoNombreArchivo, RutaTemporal + IdDominio + "/" + NombreArchivoComprimido + "/" + NombreArchivo + FormatoNombreArchivo)
                'FileCopy(RutaTemporal + NombreArchivo + FormatoNombreArchivo, RutaTemporal + IdDominio + "/" + NombreArchivoComprimido + "/" + NombreArchivo + FormatoNombreArchivo)
            Else
                FileCopy(RutaExternaArchivo, RutaTemporal + IdDominio + "/" + NombreArchivoComprimido + "/" + NombreArchivo + FormatoNombreArchivo)
            End If

        End If

        Using zip As New ZipFile
            zip.AddDirectory(RutaTemporal + IdDominio + "/" + NombreArchivoComprimido)

            Dim ZipEntryFiles As ICollection(Of ZipEntry)
            ZipEntryFiles = zip.SelectEntries("*.zip")
            Dim zipextract As ZipEntry
            For Each zipextract In ZipEntryFiles
                If (zipextract.FileName <> NombreArchivoComprimido + ".zip") Then
                    zip.RemoveEntry(zipextract.FileName)
                End If
            Next

            zip.Save(RutaTemporal + IdDominio + "/" + NombreArchivoComprimido + "/" + NombreArchivoComprimido + ".zip")

            FileCopy(RutaTemporal + IdDominio + "/" + NombreArchivoComprimido + "/" + NombreArchivoComprimido + ".zip", RutaTemporal + IdDominio + "/" + NombreArchivoComprimido + ".zip")
            System.IO.Directory.Delete(RutaTemporal + IdDominio + "/" + NombreArchivoComprimido, True)

        End Using

        'System.IO.File.Delete(RutaTemporal + NombreArchivo + FormatoNombreArchivo)
        'System.IO.File.Delete(RutaTemporal + IdDominio + "/" + NombreArchivoComprimido + "/" + NombreArchivo + FormatoNombreArchivo)

        Return RutaTemporal + IdDominio + "/" + NombreArchivoComprimido + ".zip"

    End Function

End Class

Public Class Seguridad
    Public Shared Function EsAdministrador() As Boolean
        Dim resul As Boolean = False
        For Each oPerfil As ENT_SEG_Perfil In CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).Perfiles
            If oPerfil.P_inCod = 1 Then 'Es administrador
                resul = True
                Exit For
            End If
        Next
        Return resul
    End Function

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

            name = Utilitario.CorrijeNombreArchivo(name)
            Dim vcRutaTMP As String = HttpContext.Current.Server.MapPath("~/P_Movil/Administrar/Temporal/" + Dominio + "/" + Utilitario.NombreArchivoEstandarizado(Dominio, Usuario) + "/")


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
                HttpContext.Current.Response.AppendHeader("Content-Disposition", "attachment; filename=" + Utilitario.QuitarAcentos(fi.Name) + ";")
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

End Class