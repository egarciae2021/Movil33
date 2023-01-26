
Imports System.Diagnostics.Eventing.Reader
Imports VisualSoft.PCSistelMovil.Importacion.BL
Imports VisualSoft.PCSistelMovil.Movil.BL
Imports VisualSoft.Suite80.BL
Imports System.Web.Services
Imports VisualSoft.Comun.Utilitarios
Imports System.Web.Script.Serialization
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.Auditoria
Imports System.Collections.Generic
Imports System.Data
Imports VisualSoft.PCSistelMovil.General.BE
Imports System.Web.Script.Services
Imports UtilitarioWeb

Public Class DashBoard_Incidencias
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load

        Dim dash_Incidencias As BL_DashBoard_Incidencias = Nothing

        Try

            If Not IsPostBack Then

                Me.hdfEsValido.Value = "1"

                Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
                Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
                Dim bl_ As BL_MOV_IMP_Servicio = New BL_MOV_IMP_Servicio(oUsuario.IdCliente)

                Dim niveles As New List(Of ENT_SOA_Nivel)
                Dim bolsas As New List(Of ENT_SOA_Bolsa)

                niveles = ListarNivel()

                If niveles.Count = 0 Then
                    Me.hdfEsValido.Value = "0"
                    Exit Sub
                End If

                bolsas = ListarBolsa(niveles(0).IdNivel)

                If bolsas.Count = 0 Then
                    Me.hdfEsValido.Value = "0"
                    Exit Sub
                End If

                For Each nivel As ENT_SOA_Nivel In niveles
                    Me.ddlNivel.Items.Add(New ListItem(nivel.Nombre, nivel.IdNivel))
                    Me.ddlNivelMeses.Items.Add(New ListItem(nivel.Nombre, nivel.IdNivel))
                Next

                For Each bolsa As ENT_SOA_Bolsa In bolsas
                    Me.ddlBolsa.Items.Add(New ListItem(bolsa.Nombre, bolsa.IdBolsa))
                Next

                Dim fechaSeleccionada As String

                If Request.QueryString("pe") IsNot Nothing Then
                    fechaSeleccionada = Request.QueryString("pe").ToString()
                Else
                    fechaSeleccionada = ""
                End If

                Dim script As String = ""
                script = script + " var p_dwDesde = '" + fechaSeleccionada + "';"

                Me.LlenarDdlMesesAtras(Me.dwDesde, 6, fechaSeleccionada)

                Try
                    lblPeriodo.Text = dwDesde.SelectedItem.Text
                Catch ex As Exception
                End Try

                Me.Page.ClientScript.RegisterStartupScript(Me.GetType(), "ScriptKey", script, True)
            End If
            UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If dash_Incidencias IsNot Nothing Then dash_Incidencias.Dispose()
        End Try


    End Sub

    Private Sub LlenarDdlMesesAtras(ByRef ddl As DropDownList, ByVal prMesesAtras As Integer, ByVal prMesSeleccionado As String)

        Dim miDateTime As Date
        Dim diferencia As Integer

        If prMesSeleccionado <> "" Then
            miDateTime = Date.ParseExact("20" + prMesSeleccionado.Substring(5, 2) + prMesSeleccionado.Substring(0, 2) + "010000", "yyyyMMddhhmm", Nothing)
        Else
            miDateTime = Date.Now
        End If
        diferencia = DateDiff(DateInterval.Month, miDateTime, Date.Today)
        For i = 0 To prMesesAtras
            Dim mes As Date
            If Request.QueryString("pe") IsNot Nothing Then
                If diferencia > 6 Then
                    mes = miDateTime.AddMonths(6 - i)
                Else
                    mes = miDateTime.AddMonths(diferencia - i)
                End If
            Else
                mes = miDateTime.AddMonths(-i)
            End If
            Select Case mes.Month
                Case 1
                    dwDesde.Items.Add(New ListItem("Enero " + mes.Year.ToString, mes.Month.ToString.PadLeft(2, "0") + "-" + mes.Year.ToString.Substring(0, 4)))
                    Exit Select
                Case 2
                    dwDesde.Items.Add(New ListItem("Febrero " + mes.Year.ToString, mes.Month.ToString.PadLeft(2, "0") + "-" + mes.Year.ToString.Substring(0, 4)))
                    Exit Select
                Case 3
                    dwDesde.Items.Add(New ListItem("Marzo " + mes.Year.ToString, mes.Month.ToString.PadLeft(2, "0") + "-" + mes.Year.ToString.Substring(0, 4)))
                    Exit Select
                Case 4
                    dwDesde.Items.Add(New ListItem("Abril " + mes.Year.ToString, mes.Month.ToString.PadLeft(2, "0") + "-" + mes.Year.ToString.Substring(0, 4)))
                    Exit Select
                Case 5
                    dwDesde.Items.Add(New ListItem("Mayo " + mes.Year.ToString, mes.Month.ToString.PadLeft(2, "0") + "-" + mes.Year.ToString.Substring(0, 4)))
                    Exit Select
                Case 6
                    dwDesde.Items.Add(New ListItem("Junio " + mes.Year.ToString, mes.Month.ToString.PadLeft(2, "0") + "-" + mes.Year.ToString.Substring(0, 4)))
                    Exit Select
                Case 7
                    dwDesde.Items.Add(New ListItem("Julio " + mes.Year.ToString, mes.Month.ToString.PadLeft(2, "0") + "-" + mes.Year.ToString.Substring(0, 4)))
                    Exit Select
                Case 8
                    dwDesde.Items.Add(New ListItem("Agosto " + mes.Year.ToString, mes.Month.ToString.PadLeft(2, "0") + "-" + mes.Year.ToString.Substring(0, 4)))
                    Exit Select
                Case 9
                    dwDesde.Items.Add(New ListItem("Septiembre " + mes.Year.ToString, mes.Month.ToString.PadLeft(2, "0") + "-" + mes.Year.ToString.Substring(0, 4)))
                    Exit Select
                Case 10
                    dwDesde.Items.Add(New ListItem("Octubre " + mes.Year.ToString, mes.Month.ToString.PadLeft(2, "0") + "-" + mes.Year.ToString.Substring(0, 4)))
                    Exit Select
                Case 11
                    dwDesde.Items.Add(New ListItem("Noviembre " + mes.Year.ToString, mes.Month.ToString.PadLeft(2, "0") + "-" + mes.Year.ToString.Substring(0, 4)))
                    Exit Select
                Case Else
                    dwDesde.Items.Add(New ListItem("Diciembre " + mes.Year.ToString, mes.Month.ToString.PadLeft(2, "0") + "-" + mes.Year.ToString.Substring(0, 4)))
                    Exit Select
            End Select
        Next
    End Sub

    <WebMethod()>
    Public Shared Function ListarNivel() As List(Of ENT_SOA_Nivel)
        Dim nivel As BL_SOA_Nivel = Nothing
        Try

            nivel = New BL_SOA_Nivel(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim _return As List(Of ENT_SOA_Nivel) = nivel.ListarNivelConBolsa(-1)
            Return _return

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If nivel IsNot Nothing Then
                nivel.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ListarBolsa(ByVal prIdNivel As Integer) As List(Of ENT_SOA_Bolsa)
        Dim bolsa As BL_SOA_Bolsa = Nothing
        Try

            bolsa = New BL_SOA_Bolsa(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim _return As List(Of ENT_SOA_Bolsa) = bolsa.ListarBolsa_porNivelExacto(prIdNivel)
            Return _return

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If bolsa IsNot Nothing Then
                bolsa.Dispose()
            End If
        End Try
    End Function

    <WebMethod()>
    Public Shared Function Grafico_IncidenciaPorTipo(ByVal vcPeriodo As String) As List(Of ENT_GEN_GrupoServicio)
        Dim bl_ As BL_DashBoard_Incidencias = Nothing
        Try

            Dim list_ As List(Of ENT_GEN_GrupoServicio) = New List(Of ENT_GEN_GrupoServicio)

            Dim oUsuario As ENT_SEG_Usuario = HttpContext.Current.Session("Usuario")
            bl_ = New BL_DashBoard_Incidencias(VisualSoft.Suite80.DL.DALC_Base.TipoOrigen.Datos, oUsuario.IdCliente)

            Dim dt As DataTable = bl_.ObtieneIncidencias_cantidadPortipo_(vcPeriodo)

            If dt.Rows.Count > 0 Then
                If dt.Rows(0)(0).ToString() <> "0" Then
                    Dim fila As Integer = 0

                    For Each row As DataRow In dt.Rows
                        If Convert.ToDouble(dt.Rows(fila)("Cantidad")) >= 0 Then
                            Dim ent As ENT_GEN_GrupoServicio = New ENT_GEN_GrupoServicio()

                            ent.vcGrupo01 = dt.Rows(fila)("Nombre").ToString()
                            ent.vcGrupo02 = dt.Rows(fila)("IdTipo").ToString()
                            ent.vcGrupo05 = dt.Rows(fila)("Cantidad").ToString()
                            ent.vcGrupo06 = dt.Rows(fila)("Color").ToString()

                            fila = fila + 1

                            list_.Add(ent)
                        End If
                    Next
                End If

            End If

            Return list_

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(ex.Message)
        Finally
            If bl_ IsNot Nothing Then bl_.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function Grafico_DistribucionPorTipificacion(ByVal vcPeriodo As String, ByVal prIdTipo As Integer) As List(Of ENT_GEN_GrupoServicio)
        Dim bl_ As BL_DashBoard_Incidencias = Nothing
        Try

            Dim list_ As List(Of ENT_GEN_GrupoServicio) = New List(Of ENT_GEN_GrupoServicio)

            Dim oUsuario As ENT_SEG_Usuario = HttpContext.Current.Session("Usuario")
            bl_ = New BL_DashBoard_Incidencias(VisualSoft.Suite80.DL.DALC_Base.TipoOrigen.Datos, oUsuario.IdCliente)

            Dim dt As DataTable = bl_.ObtieneIncidencias_cantidadPorTipificacion_(vcPeriodo, prIdTipo)

            If dt.Rows.Count > 0 Then
                If dt.Rows(0)(0).ToString() <> "0" Then
                    Dim fila As Integer = 0

                    For Each row As DataRow In dt.Rows
                        If Convert.ToDouble(dt.Rows(fila)("Cantidad")) >= 0 Then
                            Dim ent As ENT_GEN_GrupoServicio = New ENT_GEN_GrupoServicio()

                            ent.vcGrupo01 = dt.Rows(fila)("Nombre").ToString()
                            ent.vcGrupo02 = dt.Rows(fila)("IdTipificacion").ToString()
                            ent.vcGrupo05 = dt.Rows(fila)("Cantidad").ToString()
                            ent.vcGrupo06 = dt.Rows(fila)("Color").ToString()

                            fila = fila + 1

                            list_.Add(ent)
                        End If
                    Next
                End If

            End If

            Return list_

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(ex.Message)
        Finally
            If bl_ IsNot Nothing Then bl_.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function Grafico_AVG(ByVal vcPeriodo As String, ByVal prIdNivel As Integer) As List(Of ENT_GEN_GrupoServicio)
        Dim bl_ As BL_DashBoard_Incidencias = Nothing
        Try

            Dim list_ As List(Of ENT_GEN_GrupoServicio) = New List(Of ENT_GEN_GrupoServicio)

            Dim oUsuario As ENT_SEG_Usuario = HttpContext.Current.Session("Usuario")
            bl_ = New BL_DashBoard_Incidencias(VisualSoft.Suite80.DL.DALC_Base.TipoOrigen.Datos, oUsuario.IdCliente)

            Dim dt As DataTable = bl_.ObtieneIncidencias_AVG_(vcPeriodo, prIdNivel)

            If dt.Rows.Count > 0 Then
                If dt.Rows(0)(0).ToString() <> "0" Then
                    Dim fila As Integer = 0

                    For Each row As DataRow In dt.Rows
                        If Convert.ToDouble(dt.Rows(fila)("Cantidad")) >= 0 Then
                            Dim ent As ENT_GEN_GrupoServicio = New ENT_GEN_GrupoServicio()

                            ent.vcGrupo01 = dt.Rows(fila)("Nombre").ToString()
                            ent.vcGrupo02 = dt.Rows(fila)("IdBolsa").ToString()
                            ent.vcGrupo03 = dt.Rows(fila)("Promedio").ToString()
                            ent.vcGrupo04 = dt.Rows(fila)("NombrePromedio").ToString()
                            ent.vcGrupo05 = dt.Rows(fila)("Cantidad").ToString()
                            ent.vcGrupo06 = dt.Rows(fila)("Color").ToString()

                            fila = fila + 1

                            list_.Add(ent)
                        End If
                    Next
                End If

            End If

            Return list_

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(ex.Message)
        Finally
            If bl_ IsNot Nothing Then bl_.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function Grafico_CantidadPorMes(ByVal vcPeriodo As String, ByVal prIdBolsa As String) As List(Of ENT_GEN_GrupoServicio)
        Dim bl_ As BL_DashBoard_Incidencias = Nothing
        Try

            Dim list_ As List(Of ENT_GEN_GrupoServicio) = New List(Of ENT_GEN_GrupoServicio)

            Dim oUsuario As ENT_SEG_Usuario = HttpContext.Current.Session("Usuario")
            bl_ = New BL_DashBoard_Incidencias(VisualSoft.Suite80.DL.DALC_Base.TipoOrigen.Datos, oUsuario.IdCliente)

            Dim dt As DataTable = bl_.ObtieneCantidadIncidencias_porMes_(vcPeriodo, prIdBolsa)

            If dt.Rows.Count > 0 Then
                If dt.Rows(0)(0).ToString() <> "0" Then
                    Dim fila As Integer = 0

                    For Each row As DataRow In dt.Rows
                        If Convert.ToDouble(dt.Rows(fila)("Cantidad")) >= 0 Then
                            Dim ent As ENT_GEN_GrupoServicio = New ENT_GEN_GrupoServicio()

                            ent.vcGrupo01 = dt.Rows(fila)("Anio").ToString()
                            ent.vcGrupo03 = dt.Rows(fila)("Mes").ToString()
                            ent.vcGrupo05 = dt.Rows(fila)("Cantidad").ToString()
                            ent.vcGrupo06 = dt.Rows(fila)("Color").ToString()

                            fila = fila + 1

                            list_.Add(ent)
                        End If
                    Next
                End If

            End If

            Return list_

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(ex.Message)
        Finally
            If bl_ IsNot Nothing Then bl_.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function Grafico_DetallePorMes(ByVal vcPeriodo As String, ByVal vcNroMeses As String) As List(Of ENT_GEN_GrupoServicio)
        Dim bl_ As BL_DashBoard_Incidencias = Nothing
        Try

            Dim list_ As List(Of ENT_GEN_GrupoServicio) = New List(Of ENT_GEN_GrupoServicio)

            Dim oUsuario As ENT_SEG_Usuario = HttpContext.Current.Session("Usuario")
            bl_ = New BL_DashBoard_Incidencias(VisualSoft.Suite80.DL.DALC_Base.TipoOrigen.Datos, oUsuario.IdCliente)

            Dim dt As DataTable = bl_.ObtieneIncidenciasDetalle_porMes_(vcPeriodo, vcNroMeses)

            If dt.Rows.Count > 0 Then
                If dt.Rows(0)(0).ToString() <> "0" Then
                    Dim fila As Integer = 0

                    For Each row As DataRow In dt.Rows
                        If Convert.ToDouble(dt.Rows(fila)("Cantidad")) >= 0 Then
                            Dim ent As ENT_GEN_GrupoServicio = New ENT_GEN_GrupoServicio()

                            ent.vcGrupo01 = dt.Rows(fila)("Periodo").ToString()
                            ent.vcGrupo02 = dt.Rows(fila)("IdPeriodo").ToString()
                            ent.vcGrupo03 = dt.Rows(fila)("CodEstado").ToString()
                            ent.vcGrupo04 = dt.Rows(fila)("Estado").ToString()
                            ent.vcGrupo05 = dt.Rows(fila)("Cantidad").ToString()
                            ent.vcGrupo06 = dt.Rows(fila)("Color").ToString()

                            fila = fila + 1

                            list_.Add(ent)
                        End If
                    Next
                End If

            End If

            Return list_

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(ex.Message)
        Finally
            If bl_ IsNot Nothing Then bl_.Dispose()
        End Try
    End Function

#Region "clase GrupoServicio"
    Class ENT_GEN_GrupoServicio

#Region "Declaracion"
        Private _IdGrupo As String
        Private _vcGrupo As String
        Public _vcGrupoWidth As String
        Public _vcGrupoAlign As String

        Public _vcGrupoServicio As String
        Public _vcServicioEnlace As String
        Public _vcPrefijo As String
        Public _vcAbrt As String
        Public _vcPosicion As String
        Public _vcColor As String

        Public _vcGrupo01 As String
        Public _vcGrupo02 As String
        Public _vcGrupo03 As String
        Public _vcGrupo04 As String
        Public _vcGrupo05 As String
        Public _vcGrupo06 As String
        Public _vcGrupo07 As String
        Public _vcGrupo08 As String
        Public _vcGrupo09 As String
        Public _vcGrupo10 As String
        Public _vcGrupo11 As String
        Public _vcGrupo12 As String
        Public _vcGrupo13 As String
        Public _vcGrupo14 As String
        Public _vcGrupo15 As String
        Public _vcGrupo16 As String
        Public _vcGrupo17 As String
        Public _vcGrupo18 As String
        Public _vcGrupo19 As String
        Public _vcGrupo20 As String

        ''Cambio ECONDEÑA
        Public _vcGrupo21 As String

        Public _vcGrupoWidth01 As String
        Public _vcGrupoWidth02 As String
        Public _vcGrupoWidth03 As String
        Public _vcGrupoWidth04 As String
        Public _vcGrupoWidth05 As String
        Public _vcGrupoWidth06 As String
        Public _vcGrupoWidth07 As String
        Public _vcGrupoWidth08 As String

#End Region

#Region "Métodos"

        Public Property vcColor() As String
            Get
                Return _vcColor
            End Get
            Set(ByVal value As String)
                _vcColor = value
            End Set
        End Property

        Public Property vcServicioEnlace() As String
            Get
                Return _vcServicioEnlace
            End Get
            Set(ByVal value As String)
                _vcServicioEnlace = value
            End Set
        End Property

        Public Property vcPrefijo() As String
            Get
                Return _vcPrefijo
            End Get
            Set(ByVal value As String)
                _vcPrefijo = value
            End Set
        End Property

        Public Property vcAbrt() As String
            Get
                Return _vcAbrt
            End Get
            Set(ByVal value As String)
                _vcAbrt = value
            End Set
        End Property

        Public Property vcPosicion() As String
            Get
                Return _vcPosicion
            End Get
            Set(ByVal value As String)
                _vcPosicion = value
            End Set
        End Property

        Public Property vcGrupoServicio() As String
            Get
                Return _vcGrupoServicio
            End Get
            Set(ByVal value As String)
                _vcGrupoServicio = value
            End Set
        End Property

        Public Property vcGrupoAlign() As String
            Get
                Return _vcGrupoAlign
            End Get
            Set(ByVal value As String)
                _vcGrupoAlign = value
            End Set
        End Property

        Public Property vcGrupoWidth() As String
            Get
                Return _vcGrupoWidth
            End Get
            Set(ByVal value As String)
                _vcGrupoWidth = value
            End Set
        End Property

        Public Property vcGrupoWidth01() As String
            Get
                Return _vcGrupoWidth01
            End Get
            Set(ByVal value As String)
                _vcGrupoWidth01 = value
            End Set
        End Property

        Public Property vcGrupoWidth02() As String
            Get
                Return _vcGrupoWidth02
            End Get
            Set(ByVal value As String)
                _vcGrupoWidth02 = value
            End Set
        End Property

        Public Property vcGrupoWidth03() As String
            Get
                Return _vcGrupoWidth03
            End Get
            Set(ByVal value As String)
                _vcGrupoWidth03 = value
            End Set
        End Property

        Public Property vcGrupoWidth04() As String
            Get
                Return _vcGrupoWidth04
            End Get
            Set(ByVal value As String)
                _vcGrupoWidth04 = value
            End Set
        End Property

        Public Property vcGrupoWidth05() As String
            Get
                Return _vcGrupoWidth05
            End Get
            Set(ByVal value As String)
                _vcGrupoWidth05 = value
            End Set
        End Property

        Public Property vcGrupoWidth06() As String
            Get
                Return _vcGrupoWidth06
            End Get
            Set(ByVal value As String)
                _vcGrupoWidth06 = value
            End Set
        End Property

        Public Property vcGrupoWidth07() As String
            Get
                Return _vcGrupoWidth07
            End Get
            Set(ByVal value As String)
                _vcGrupoWidth07 = value
            End Set
        End Property

        Public Property vcGrupoWidth08() As String
            Get
                Return _vcGrupoWidth08
            End Get
            Set(ByVal value As String)
                _vcGrupoWidth08 = value
            End Set
        End Property


        Public Property IdGrupo() As String
            Get
                Return _IdGrupo
            End Get
            Set(ByVal value As String)
                _IdGrupo = value
            End Set
        End Property

        Public Property vcGrupo() As String
            Get
                Return _vcGrupo
            End Get
            Set(ByVal value As String)
                _vcGrupo = value
            End Set
        End Property

        Public Property vcGrupo01() As String
            Get
                Return _vcGrupo01
            End Get
            Set(ByVal value As String)
                _vcGrupo01 = value
            End Set
        End Property

        Public Property vcGrupo02() As String
            Get
                Return _vcGrupo02
            End Get
            Set(ByVal value As String)
                _vcGrupo02 = value
            End Set
        End Property

        Public Property vcGrupo03() As String
            Get
                Return _vcGrupo03
            End Get
            Set(ByVal value As String)
                _vcGrupo03 = value
            End Set
        End Property

        Public Property vcGrupo04() As String
            Get
                Return _vcGrupo04
            End Get
            Set(ByVal value As String)
                _vcGrupo04 = value
            End Set
        End Property

        Public Property vcGrupo05() As String
            Get
                Return _vcGrupo05
            End Get
            Set(ByVal value As String)
                _vcGrupo05 = value
            End Set
        End Property

        Public Property vcGrupo06() As String
            Get
                Return _vcGrupo06
            End Get
            Set(ByVal value As String)
                _vcGrupo06 = value
            End Set
        End Property

        Public Property vcGrupo07() As String
            Get
                Return _vcGrupo07
            End Get
            Set(ByVal value As String)
                _vcGrupo07 = value
            End Set
        End Property

        Public Property vcGrupo08() As String
            Get
                Return _vcGrupo08
            End Get
            Set(ByVal value As String)
                _vcGrupo08 = value
            End Set
        End Property

        Public Property vcGrupo09() As String
            Get
                Return _vcGrupo09
            End Get
            Set(ByVal value As String)
                _vcGrupo09 = value
            End Set
        End Property

        Public Property vcGrupo10() As String
            Get
                Return _vcGrupo10
            End Get
            Set(ByVal value As String)
                _vcGrupo10 = value
            End Set
        End Property

        Public Property vcGrupo11() As String
            Get
                Return _vcGrupo11
            End Get
            Set(ByVal value As String)
                _vcGrupo11 = value
            End Set
        End Property

        Public Property vcGrupo12() As String
            Get
                Return _vcGrupo12
            End Get
            Set(ByVal value As String)
                _vcGrupo12 = value
            End Set
        End Property

        Public Property vcGrupo13() As String
            Get
                Return _vcGrupo13
            End Get
            Set(ByVal value As String)
                _vcGrupo13 = value
            End Set
        End Property

        Public Property vcGrupo14() As String
            Get
                Return _vcGrupo14
            End Get
            Set(ByVal value As String)
                _vcGrupo14 = value
            End Set
        End Property

        Public Property vcGrupo15() As String
            Get
                Return _vcGrupo15
            End Get
            Set(ByVal value As String)
                _vcGrupo15 = value
            End Set
        End Property

        Public Property vcGrupo16() As String
            Get
                Return _vcGrupo16
            End Get
            Set(ByVal value As String)
                _vcGrupo16 = value
            End Set
        End Property

        Public Property vcGrupo17() As String
            Get
                Return _vcGrupo17
            End Get
            Set(ByVal value As String)
                _vcGrupo17 = value
            End Set
        End Property

        Public Property vcGrupo18() As String
            Get
                Return _vcGrupo18
            End Get
            Set(ByVal value As String)
                _vcGrupo18 = value
            End Set
        End Property

        Public Property vcGrupo19() As String
            Get
                Return _vcGrupo19
            End Get
            Set(ByVal value As String)
                _vcGrupo19 = value
            End Set
        End Property

        Public Property vcGrupo20() As String
            Get
                Return _vcGrupo20
            End Get
            Set(ByVal value As String)
                _vcGrupo20 = value
            End Set
        End Property

        Public Property vcGrupo21() As String
            Get
                Return _vcGrupo21
            End Get
            Set(value As String)
                _vcGrupo21 = value
            End Set
        End Property
#End Region

    End Class
#End Region

End Class