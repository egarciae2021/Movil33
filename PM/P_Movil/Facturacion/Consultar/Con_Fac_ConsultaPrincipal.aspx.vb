Imports System.Web.Services
Imports VisualSoft.PCSistelMovil.General.BE
Imports VisualSoft.PCSistelMovil.Importacion.BL
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Suite80.BE
Imports DevExpress.XtraEditors

Public Class Con_Fac_ConsultaPrincipal
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        'Dim blGrupoConcepto As BL_PCS_MOV_GrupoConcepto = Nothing
        Dim bl_ As BL_MOV_IMP_Facturacion = Nothing
        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    Dim oUsuario As ENT_SEG_Usuario = HttpContext.Current.Session("Usuario")
                    Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)

                    bl_ = New BL_MOV_IMP_Facturacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

                    Dim p_vcNum As String = "",
                        p_vcCodCue As String = "",
                        p_vcPer As String = "",
                        p_inCodGrupo,
                        p_inCodConcepto As String
                    If hdfNumCel.Value = "" Then
                        p_vcNum = Request.QueryString("p_vcNum")
                        hdfNumCel.Value = Request.QueryString("p_vcNum")
                    End If
                    If hdfCodCue.Value = "" Then
                        p_vcCodCue = Request.QueryString("p_vcCodCue")
                        hdfCodCue.Value = Request.QueryString("p_vcCodCue")
                    End If
                    If hdfPer.Value = "" Then
                        p_vcPer = Request.QueryString("p_vcPer")
                        hdfPer.Value = Request.QueryString("p_vcPer")
                    End If

                    If hdfCodGrupo.Value = "" Then
                        p_inCodGrupo = Request.QueryString("p_inCodGrupo")
                        hdfCodGrupo.Value = Request.QueryString("p_inCodGrupo")
                    End If

                    If hdfCodConcepto.Value = "" Then
                        p_inCodConcepto = Request.QueryString("p_inCodConcepto")
                        hdfCodConcepto.Value = Request.QueryString("p_inCodConcepto")
                    End If

                    If hdfCodGrupo.Value = "undefined" Then hdfCodGrupo.Value = ""
                    If hdfCodConcepto.Value = "undefined" Then hdfCodConcepto.Value = ""

                    Dim mesPer As String = ""

                    If p_vcPer <> "" Then
                        Dim dt As DataTable = bl_.Listar_Resumen(hdfPer.Value, "cabecera_superior", "", "", "", "",
                                                                 hdfCodCue.Value, hdfNumCel.Value, "", IIf(hdfCodGrupo.Value = "", "-1", hdfCodGrupo.Value),
                                                                 IIf(hdfCodConcepto.Value = "", "-1", hdfCodConcepto.Value), -1)

                        If dt.Rows.Count > 0 Then
                            If p_vcNum = "" Then
                                divCuenta.Style("display") = "block"
                                divLinea.Style("display") = "none"

                                lblCodCuenta.InnerText = dt.Rows(0)("codCue").ToString()
                                lblNomCuenta.InnerText = dt.Rows(0)("nomCue").ToString()
                                lblCodOperador.InnerText = dt.Rows(0)("codOpe").ToString()
                                lblOperador.InnerText = dt.Rows(0)("vcNomOpe").ToString() & " - " & dt.Rows(0)("vcCodCia").ToString()
                                lblCantLin.InnerText = dt.Rows(0)("inLin").ToString()
                                mesPer = dt.Rows(0)("daPer").ToString().Substring(4, 2) & "-" & dt.Rows(0)("daPer").ToString().Substring(0, 4)
                                hdfCodOpe.Value = dt.Rows(0)("codOpe").ToString()
                                hfdMesPer.Value = mesPer
                                lblPer.InnerText = MostrarMes(mesPer)
                            Else
                                divLinea.Style("display") = "block"
                                divCuenta.Style("display") = "none"

                                lblNum.InnerText = dt.Rows(0)("vcNum").ToString()
                                lblNomEmp.InnerText = dt.Rows(0)("codEmp").ToString() & " - " & dt.Rows(0)("nomEmp").ToString()
                                lblOpe.InnerText = dt.Rows(0)("vcNomOpe").ToString()
                                lblArea.InnerText = dt.Rows(0)("vcNomOrg").ToString()
                                mesPer = dt.Rows(0)("daPer").ToString().Substring(4, 2) & "-" & dt.Rows(0)("daPer").ToString().Substring(0, 4)
                                hdfCodOpe.Value = dt.Rows(0)("codOpe").ToString()
                                hfdMesPer.Value = mesPer
                                lblPer.InnerText = MostrarMes(mesPer)
                            End If

                        End If
                    End If

                    Dim Script As String
                    Script = "var dcNumDec = '" & oCultura.dcNumDec & "'; var vcSimDec = '" & oCultura.vcSimDec & "'; var vcSimSepMil = '" & oCultura.vcSimSepMil & "';"
                    Script = Script & "var oCulturaLocal = new Object();"
                    Script = Script & "oCulturaLocal.dcNumDec=" & oCultura.dcNumDec & "; oCulturaLocal.vcSimDec='" & oCultura.vcSimDec & "'; oCulturaLocal.vcSimSepMil='" & oCultura.vcSimSepMil & "'; oCulturaLocal.vcCodCul='" & oCultura.vcCodCul & "';"
                    Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", Script, True)
            End If
            End If

            UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(ex.Message)
        Finally
            If bl_ IsNot Nothing Then bl_.Dispose()
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function ListarResumenLinea(ByVal p_mesPer As String, ByVal p_vcNum As String, ByVal p_codCue As String, ByVal p_codOpe As String, ByVal p_inCodGrupo As String, ByVal p_inCodConcepto As string) As List(Of ENT_GEN_GrupoServicio)

        Dim bl_ As BL_MOV_IMP_Facturacion = Nothing
        Try
            Dim list_ As List(Of ENT_GEN_GrupoServicio) = New List(Of ENT_GEN_GrupoServicio)

            Dim oUsuario As ENT_SEG_Usuario = HttpContext.Current.Session("Usuario")
            bl_ = New BL_MOV_IMP_Facturacion(oUsuario.IdCliente)

            p_codCue = p_codCue.Replace("|", "'")

            Dim dt As DataTable = bl_.Listar_Resumen(p_mesPer, "datos_GrupoConcepto", "", "", "", p_codOpe, p_codCue, p_vcNum, "",
                                                     IIf(p_inCodGrupo = "", "-1", p_inCodGrupo), IIf(p_inCodConcepto = "", "-1", p_inCodConcepto), -1)

            Dim fila As Integer = 0

            For Each ent As ENT_GEN_GrupoServicio In From row As DataRow In dt.Rows Select New ENT_GEN_GrupoServicio()

                ent.IdGrupo = dt.Rows(fila)("P_in_CodGruSer").ToString()
                ent.vcGrupo01 = dt.Rows(fila)("vcNomGruSer").ToString()
                ent.vcGrupo02 = dt.Rows(fila)("vcNomAbrv").ToString()
                ent.vcGrupo03 = dt.Rows(fila)("nuValor").ToString()
                ent.vcGrupo04 = dt.Rows(fila)("Valor").ToString()

                fila = fila + 1

                list_.Add(ent)
            Next

            Return list_

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            'Throw New Exception(UtilitarioWeb.MensajeError)
            Throw New Exception(ex.Message)
        Finally
            If bl_ IsNot Nothing Then bl_.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function GraficoSuperior(ByVal p_mesPer As String, ByVal p_vcNum As String, ByVal p_codCue As String, ByVal p_codOpe As String) As List(Of ENT_GEN_GrupoServicio)
        Dim bl_ As BL_MOV_IMP_Facturacion = Nothing
        Try
            Dim list_ As List(Of ENT_GEN_GrupoServicio) = New List(Of ENT_GEN_GrupoServicio)

            Dim oUsuario As ENT_SEG_Usuario = HttpContext.Current.Session("Usuario")
            bl_ = New BL_MOV_IMP_Facturacion(oUsuario.IdCliente)

            Dim dt As DataTable = bl_.Listar_Resumen(p_mesPer, "datos_GrupoConcepto", "", "", "", p_codOpe, p_codCue, p_vcNum, "", -1, -1, -1)

            Dim fila As Integer = 0

            For Each ent As ENT_GEN_GrupoServicio In From row As DataRow In dt.Rows Select New ENT_GEN_GrupoServicio()
                If Convert.ToDouble(dt.Rows(fila)("Valor")) >= 0 Then
                    ent.vcGrupo01 = dt.Rows(fila)("vcNomGruSer").ToString()
                    ent.vcGrupo02 = dt.Rows(fila)("vcNomAbrv").ToString()
                    ent.vcGrupo03 = dt.Rows(fila)("Valor").ToString()

                    fila = fila + 1

                    'If ent.vcGrupo03 > 0 Then
                    list_.Add(ent)
                    'End If
                End If
            Next

            Return list_

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            'Throw New Exception(UtilitarioWeb.MensajeError)
            Throw New Exception(ex.Message)
        Finally
            If bl_ IsNot Nothing Then bl_.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function GraficoSuperiorxGrupo(ByVal p_vcCriterio As String, ByVal p_mesPer As String, ByVal p_vcNum As String, ByVal p_codCue As String, ByVal p_codOpe As String, ByVal p_inCodGrupo As String, ByVal p_inCodConcepto As String) As List(Of ENT_GEN_GrupoServicio)
        Dim bl_ As BL_MOV_IMP_Facturacion = Nothing
        Try
            Dim list_ As List(Of ENT_GEN_GrupoServicio) = New List(Of ENT_GEN_GrupoServicio)

            Dim oUsuario As ENT_SEG_Usuario = HttpContext.Current.Session("Usuario")
            bl_ = New BL_MOV_IMP_Facturacion(oUsuario.IdCliente)

            Dim dt As DataTable = bl_.Listar_Resumen(p_mesPer, "datos_GrupoConcepto", p_vcCriterio, "", "", p_codOpe, p_codCue, p_vcNum, "", IIf(p_inCodGrupo = "", "-1", p_inCodGrupo), IIf(p_inCodConcepto = "", "-1", p_inCodConcepto))

            Dim fila As Integer = 0

            For Each ent As ENT_GEN_GrupoServicio In From row As DataRow In dt.Rows Select New ENT_GEN_GrupoServicio()
                If Convert.ToDouble(dt.Rows(fila)("nuValor").ToString().Replace(".", "").Replace(",", "")) >= 0 Then
                    ent.vcGrupo01 = dt.Rows(fila)("vcNomCon").ToString()
                    ent.vcGrupo02 = dt.Rows(fila)("vcNomAbrvSr").ToString()
                    ent.vcGrupo03 = dt.Rows(fila)("Valor").ToString()

                    fila = fila + 1

                    'If ent.vcGrupo03 > 0 Then
                    list_.Add(ent)
                    'End If
                End If
            Next

            Return list_

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            'Throw New Exception(UtilitarioWeb.MensajeError)
            Throw New Exception(ex.Message)
        Finally
            If bl_ IsNot Nothing Then bl_.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function Grafico_Historico_Linea(ByVal p_criterio As String, ByVal p_mesPer As String, ByVal p_codOpe As String, ByVal p_codCue As String, ByVal p_vcNum As String, ByVal p_vcMes As String, ByVal p_inCodGrupo As String, ByVal p_inCodConcepto As String) As List(Of ENT_GEN_GrupoServicio)
        Dim bl_ As BL_MOV_IMP_Facturacion = Nothing
        Try
            Dim list_ As List(Of ENT_GEN_GrupoServicio) = New List(Of ENT_GEN_GrupoServicio)

            Dim oUsuario As ENT_SEG_Usuario = HttpContext.Current.Session("Usuario")
            bl_ = New BL_MOV_IMP_Facturacion(oUsuario.IdCliente)

            Dim dtTem As DataTable = bl_.Listar_Resumen(p_mesPer, "historico_resumen", p_criterio, "", "", p_codOpe, p_codCue, p_vcNum, p_vcMes, IIf(p_inCodGrupo = "", "-1", p_inCodGrupo), IIf(p_inCodConcepto = "", "-1", p_inCodConcepto))

            Dim fila As Integer = 0
            For Each ent As ENT_GEN_GrupoServicio In From row As DataRow In dtTem.Rows Select New ENT_GEN_GrupoServicio()
                ent.vcGrupo01 = dtTem.Rows(fila)("Id").ToString()
                ent.vcGrupo03 = dtTem.Rows(fila)("nuValor").ToString()
                Dim anio As String = dtTem.Rows(fila)("Anio").ToString()

                Dim res As String = ""
                Select Case dtTem.Rows(fila)("Mes").ToString()
                    Case 1
                        res = "Ene"
                    Case 2
                        res = "Feb"
                    Case 3
                        res = "Mar"
                    Case 4
                        res = "Abr"
                    Case 5
                        res = "May"
                    Case 6
                        res = "Jun"
                    Case 7
                        res = "Jul"
                    Case 8
                        res = "Ago"
                    Case 9
                        res = "Set"
                    Case 10
                        res = "Oct"
                    Case 11
                        res = "Nov"
                    Case 12
                        res = "Dic"
                End Select

                ent.vcGrupo05 = res & "." & anio.Substring(2)

                ent.vcGrupo21 = ent.vcGrupo01.Substring(0)

                fila = fila + 1

                list_.Add(ent)
            Next

            Return list_

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            'Throw New Exception(UtilitarioWeb.MensajeError)
            Throw New Exception(ex.Message)
        Finally
            If bl_ IsNot Nothing Then bl_.Dispose()
        End Try

    End Function

    <WebMethod()>
    Public Shared Function ListarResumenConceptos(ByVal p_idGru As String, ByVal p_mesPer As String, ByVal p_vcNum As String, ByVal p_codCue As String, ByVal p_codOpe As String, ByVal p_inCodGrupo As String, ByVal p_inCodConcepto As String) As List(Of ENT_GEN_GrupoServicio)
        Dim bl_ As BL_MOV_IMP_Facturacion = Nothing
        Try
            Dim list_ As List(Of ENT_GEN_GrupoServicio) = New List(Of ENT_GEN_GrupoServicio)

            Dim oUsuario As ENT_SEG_Usuario = HttpContext.Current.Session("Usuario")
            bl_ = New BL_MOV_IMP_Facturacion(oUsuario.IdCliente)

            Dim dt As DataTable = bl_.Listar_Resumen(p_mesPer, "resumen_conceptos", "", p_idGru, "", p_codOpe, p_codCue, p_vcNum, "", IIf(p_inCodGrupo = "", "-1", p_inCodGrupo), IIf(p_inCodConcepto = "", "-1", p_inCodConcepto))

            Dim fila As Integer = 0

            For Each ent As ENT_GEN_GrupoServicio In From row As DataRow In dt.Rows Select New ENT_GEN_GrupoServicio()

                ent.vcGrupo01 = dt.Rows(fila)("vcConcepto").ToString()
                ent.vcGrupo02 = dt.Rows(fila)("nuCON").ToString()
                ent.vcGrupo03 = dt.Rows(fila)("nuCOS").ToString()

                'Dim tamano As Decimal = Convert.ToDecimal(dt.Rows(fila)("nuCON").ToString())
                'If tamano < 1024 Then 'BYTE
                '    ent.vcGrupo02 = Convert.ToDecimal(tamano)
                '    ent.vcGrupo02 = ent.vcGrupo02 + "b"
                'ElseIf tamano >= 1024 And tamano < 1048576 Then 'KBYTE
                '    ent.vcGrupo02 = Decimal.Round(Convert.ToDecimal(tamano) / 1024, 2)
                '    ent.vcGrupo02 = ent.vcGrupo02 + "KB"
                'Else 'MBYTE
                '    ent.vcGrupo02 = Decimal.Round(Convert.ToDecimal(tamano) / 1048576, 2)
                '    ent.vcGrupo02 = ent.vcGrupo02 + "MB"
                'End If

                fila = fila + 1

                list_.Add(ent)
            Next

            Return list_

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            'Throw New Exception(UtilitarioWeb.MensajeError)
            Throw New Exception(ex.Message)
        Finally
            If bl_ IsNot Nothing Then bl_.Dispose()
        End Try
    End Function

    Private Function MostrarMes(ByVal p_perMes As String) As String
        Dim mes As String = p_perMes.Substring(0, 2)
        Dim anio As String = p_perMes.Substring(3)
        Dim fecha As String = ""
        Select Case mes
            Case "01"
                fecha = "Enero" & "-" & anio
            Case "02"
                fecha = "Febrero" & "-" & anio
            Case "03"
                fecha = "Marzo" & "-" & anio
            Case "04"
                fecha = "Abril" & "-" & anio
            Case "05"
                fecha = "Mayo" & "-" & anio
            Case "06"
                fecha = "Junio" & "-" & anio
            Case "07"
                fecha = "Julio" & "-" & anio
            Case "08"
                fecha = "Agosto" & "-" & anio
            Case "09"
                fecha = "Setiembre" & "-" & anio
            Case "10"
                fecha = "Octubre" & "-" & anio
            Case "11"
                fecha = "Noviembre" & "-" & anio
            Case "12"
                fecha = "Diciembre" & "-" & anio
        End Select
        Return fecha
    End Function

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

        Private list_ent_gen_gruposervicio_ As List(Of ENT_GEN_GrupoServicio)
        Public Property List_ENT_GEN_GrupoServicio As List(Of ENT_GEN_GrupoServicio)
            Get
                Return list_ent_gen_gruposervicio_
            End Get
            Set(value As List(Of ENT_GEN_GrupoServicio))
                list_ent_gen_gruposervicio_ = value
            End Set
        End Property

    End Class

End Class