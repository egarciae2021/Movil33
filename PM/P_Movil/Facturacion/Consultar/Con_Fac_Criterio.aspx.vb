Imports System.Web.Services
Imports System.Web.Script.Serialization
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Comun.Utilitarios

Public Class Con_Fac_Criterio
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim LineaTipo As BL_MOV_LineaTipo = Nothing
        Dim Operador As BL_GEN_Operador = Nothing
        Dim Criterio As BL_MOV_IMP_Criterio = Nothing
        Dim Cuenta As BL_MOV_Cuenta = Nothing

        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)
                If Not IsPostBack Then

                    Dim inCodCri As String = Request.QueryString("inCodCri")
                    hdfNumCri.Value = "1" ''Request.QueryString("inNumCri")

                    Operador = New BL_GEN_Operador(oUsuario.IdCliente)
                    Cuenta = New BL_MOV_Cuenta(oUsuario.IdCliente)
                    LineaTipo = New BL_MOV_LineaTipo(oUsuario.IdCliente)

                    ''Dim FechaActual As Date = DateTime.Now()
                    ''Dim inMesActual As Integer = FechaActual.Month
                    ''Dim inAnoActual As Integer = FechaActual.Year
                    ''Dim lstPer As New List(Of ENT_GEN_GrupoServicio)
                    ''For i As Integer = 0 To 11
                    ''    Dim ent_ As New ENT_GEN_GrupoServicio()

                    ''    Dim vcValue As String = IIf(inMesActual < 10, "0", "") + inMesActual.ToString + "-" + inAnoActual.ToString
                    ''    Dim vcTexto As String = IIf(inMesActual = 1, "Ene", IIf(inMesActual = 2, "Feb", IIf(inMesActual = 3, "Mar", IIf(inMesActual = 4, "Abr", IIf(inMesActual = 5, "May", IIf(inMesActual = 6, "Jun", IIf(inMesActual = 7, "Jul", IIf(inMesActual = 8, "Ago", IIf(inMesActual = 9, "Set", IIf(inMesActual = 10, "Oct", IIf(inMesActual = 11, "Nov", "Dic"))))))))))) + " / " + inAnoActual.ToString
                    ''    ent_.vcGrupo01 = vcTexto
                    ''    ent_.vcGrupo02 = vcValue
                    ''    lstPer.Add(ent_)
                    ''    If inMesActual = 1 Then
                    ''        inMesActual = 12
                    ''        inAnoActual = inAnoActual - 1
                    ''    Else
                    ''        inMesActual = inMesActual - 1
                    ''    End If
                    ''Next

                    hdfCodLinTip_X_User.Value = ObtenerTipoLinea_X_Usuario(oUsuario)
                    UtilitarioWeb.Dataddl(ddlLineaTipo, LineaTipo.Listar(Convert.ToInt32(hdfCodLinTip_X_User.Value), -1, "<Seleccionar>"), "vcDescripcion", "P_inCod")
                    'Tipo de Linea - wapumayta - 02-11-2015
                    Dim General = New General()
                    Dim inTipoLinea As Integer = General.ObtenerTipoLineaDesdePerfiles(oUsuario)
                    If hdfCodLinTip_X_User.Value <> 0 Then
                        ddlLineaTipo.Enabled = False
                        ddlLineaTipo.SelectedValue = hdfCodLinTip_X_User.Value
                    End If

                    'UtilitarioWeb.Dataddl(ddlPeriodo, lstPer, "vcGrupo01", "vcGrupo02")
                    ''UtilitarioWeb.DatachkLst(chklstOperador, Operador.Listar(), "vcNomOpe", "P_inCodOpe")

                    Operador = New BL_GEN_Operador(oUsuario.IdCliente)

                    UtilitarioWeb.Dataddl(ddlOperador, Operador.Listar(-1, "<< Todos >>"), "vcNomOpe", "P_inCodOpe")

                    Dim FiltroCodSucursalesParaCuentas As String = ""

                    If (oUsuario.F_vcCodInt.Contains(",")) Then

                        Dim arrayCodigosAreas As String() = oUsuario.F_vcCodInt.Split(",")

                        For Each codigo As String In arrayCodigosAreas
                            'CodigoOrganizacion LIKE @CodInt + '%' OR ISNULL(CodigoOrganizacion,'') = ''
                            FiltroCodSucursalesParaCuentas += "("
                            FiltroCodSucursalesParaCuentas += "CodigoOrganizacion LIKE '" & codigo.ToString & "%' OR ISNULL(CodigoOrganizacion,'') = ''"
                            FiltroCodSucursalesParaCuentas += ") OR"
                        Next
                    End If

                    If (FiltroCodSucursalesParaCuentas <> "") Then
                        FiltroCodSucursalesParaCuentas = FiltroCodSucursalesParaCuentas.Substring(0, FiltroCodSucursalesParaCuentas.Length - 3)
                    End If

                    If inCodCri <> "" Then
                        Criterio = New BL_MOV_IMP_Criterio(oUsuario.IdCliente)
                        Dim oCriterio As New ENT_MOV_IMP_Criterio

                        oCriterio = Criterio.Mostrar(Integer.Parse(inCodCri))
                        rblstTipoConsulta.SelectedValue = oCriterio.inTipCon

                        hdfCod.Value = inCodCri

                        ddlOperador.SelectedValue = oCriterio.OperadorCuenta.P_inCodOpe

                        Dim lstCuenta As List(Of ENT_MOV_Cuenta) = Cuenta.ListarPorOperador(oCriterio.OperadorCuenta.P_inCodOpe, oUsuario.P_inCod)

                        ''UtilitarioWeb.DatachkLst(chklstCuenta, lstCuenta, "vcNom", "P_vcCod")
                        UtilitarioWeb.Dataddl(ddlCuenta, lstCuenta, "vcNom", "P_vcCod")

                        ''For Each oCuenta As ENT_MOV_Cuenta In oCriterio.Cuentas
                        ''    For Each chkCuenta As ListItem In chklstCuenta.Items
                        ''        If chkCuenta.Value = oCuenta.P_vcCod Then
                        ''            chkCuenta.Selected = True
                        ''        End If
                        ''    Next
                        ''Next

                    Else
                        hdfCod.Value = "-1"
                        Dim lstCuenta As List(Of ENT_MOV_Cuenta) = Cuenta.ListarPorOperadorConFiltro("-1", oUsuario.P_inCod, FiltroCodSucursalesParaCuentas)
                        ''UtilitarioWeb.DatachkLst(chklstCuenta, lstCuenta, "vcNom", "P_vcCod")
                        UtilitarioWeb.Dataddl(ddlCuenta, lstCuenta, "vcNom", "P_vcCod")
                    End If

                End If

                If ddlOperador.Items.Count = 2 Then
                    ddlOperador.Enabled = False
                    ddlOperador.SelectedIndex = 1
                End If

                UtilitarioWeb.AgregarTema(Server, Page.Header, oUsuario.CaracteristicaUsuario.vcTem)
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Operador IsNot Nothing Then Operador.Dispose()
            If Cuenta IsNot Nothing Then Cuenta.Dispose()
            If Criterio IsNot Nothing Then Criterio.Dispose()
            If LineaTipo IsNot Nothing Then LineaTipo.Dispose()
        End Try

    End Sub

    <WebMethod()>
    Public Shared Function ListarCuentaPorOperador(ByVal inCodOpe As String) As List(Of ENT_MOV_Cuenta)
        Dim Cuenta As BL_MOV_Cuenta = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Cuenta = New BL_MOV_Cuenta(oUsuario.IdCliente)
            Dim _return As List(Of ENT_MOV_Cuenta) = Cuenta.ListarPorOperador(Integer.Parse(inCodOpe), oUsuario.P_inCod)
            Cuenta.Dispose()
            Return _return
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Cuenta IsNot Nothing Then Cuenta.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Sub SeteaValores(ByVal oCriterio As String)
        Try
            Dim oSerializer As New JavaScriptSerializer
            Dim v_oCriterio As ENT_MOV_IMP_Criterio = oSerializer.Deserialize(Of ENT_MOV_IMP_Criterio)(oCriterio)
            Dim miDiccionarioCriterio As Dictionary(Of String, IDictionary)

            miDiccionarioCriterio = HttpContext.Current.Session("MisCriterios")

            If miDiccionarioCriterio Is Nothing Then
                miDiccionarioCriterio = New Dictionary(Of String, IDictionary)

                Dim dic As New Dictionary(Of String, Object)
                dic.Add(v_oCriterio.vcTab.ToString(), v_oCriterio)
                miDiccionarioCriterio.Add(v_oCriterio.inNumCri.ToString(), dic)
            Else
                If miDiccionarioCriterio.ContainsKey(v_oCriterio.inNumCri.ToString()) Then
                    Dim miDic As IDictionary = miDiccionarioCriterio.Item(v_oCriterio.inNumCri.ToString())

                    If miDic.Contains(v_oCriterio.vcTab) Then
                        miDic.Item(v_oCriterio.vcTab) = v_oCriterio
                    Else
                        miDic.Add(v_oCriterio.vcTab, v_oCriterio)
                    End If

                    miDiccionarioCriterio.Item(v_oCriterio.inNumCri.ToString()) = miDic

                Else
                    Dim dic As New Dictionary(Of String, Object)
                    dic.Add(v_oCriterio.vcTab.ToString(), v_oCriterio)
                    miDiccionarioCriterio.Add(v_oCriterio.inNumCri.ToString(), dic)
                End If
            End If
            HttpContext.Current.Session("MisCriterios") = miDiccionarioCriterio
            HttpContext.Current.Session("MiCriterio") = v_oCriterio

            HttpContext.Current.Session("Criterio" & v_oCriterio.inNumCri.ToString()) = v_oCriterio
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function Carga_Periodo(ByVal p_vcNomGrupo_Para As String, ByVal p_vcValor_Para As String) As List(Of ENT_GEN_GrupoServicio)
        Dim bl_ As BL_MOV_IMP_Servicio = Nothing
        Try

            Dim oUsuario As ENT_SEG_Usuario = HttpContext.Current.Session("Usuario")
            bl_ = New BL_MOV_IMP_Servicio(oUsuario.IdCliente)

            Dim fecDesde As String = ""

            Dim dt As DataTable = bl_.Listar_tmp("tmp_cabecera_grupo", "Guarda_ParametrosReporte", p_vcNomGrupo_Para, p_vcValor_Para, "", "", "", "", "", "")
            For Each row As DataRow In dt.Rows
                Dim clave As String = row("Clave")
                Dim valor As String = row("Valor")
                If clave = "dwDesde" Then
                    fecDesde = valor
                End If
            Next
            Dim lstPeriodo As New List(Of ENT_GEN_GrupoServicio)


            Dim miDateTime As Date
            Dim diferencia As Integer

            If p_vcValor_Para IsNot Nothing Then
                miDateTime = Date.ParseExact("20" + fecDesde.Substring(5, 2) + fecDesde.Substring(0, 2) + "010000", "yyyyMMddhhmm", Nothing)
            Else
                miDateTime = Date.Now
            End If
            diferencia = DateDiff(DateInterval.Month, miDateTime, Date.Today)

            For i = 0 To 11
                Dim oPeriodo As New ENT_GEN_GrupoServicio
                Dim mes As Date
                If p_vcValor_Para IsNot Nothing Then
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
                        oPeriodo.vcGrupo = "Ene - " + mes.Year.ToString
                        oPeriodo.IdGrupo = mes.Month.ToString.PadLeft(2, "0") + "-" + mes.Year.ToString.Substring(0, 4)
                        Exit Select
                    Case 2
                        oPeriodo.vcGrupo = "Feb - " + mes.Year.ToString
                        oPeriodo.IdGrupo = mes.Month.ToString.PadLeft(2, "0") + "-" + mes.Year.ToString.Substring(0, 4)
                        Exit Select
                    Case 3
                        oPeriodo.vcGrupo = "Mar - " + mes.Year.ToString
                        oPeriodo.IdGrupo = mes.Month.ToString.PadLeft(2, "0") + "-" + mes.Year.ToString.Substring(0, 4)
                        Exit Select
                    Case 4
                        oPeriodo.vcGrupo = "Abr - " + mes.Year.ToString
                        oPeriodo.IdGrupo = mes.Month.ToString.PadLeft(2, "0") + "-" + mes.Year.ToString.Substring(0, 4)
                        Exit Select
                    Case 5
                        oPeriodo.vcGrupo = "May - " + mes.Year.ToString
                        oPeriodo.IdGrupo = mes.Month.ToString.PadLeft(2, "0") + "-" + mes.Year.ToString.Substring(0, 4)
                        Exit Select
                    Case 6
                        oPeriodo.vcGrupo = "Jun - " + mes.Year.ToString
                        oPeriodo.IdGrupo = mes.Month.ToString.PadLeft(2, "0") + "-" + mes.Year.ToString.Substring(0, 4)
                        Exit Select
                    Case 7
                        oPeriodo.vcGrupo = "Jul - " + mes.Year.ToString
                        oPeriodo.IdGrupo = mes.Month.ToString.PadLeft(2, "0") + "-" + mes.Year.ToString.Substring(0, 4)
                        Exit Select
                    Case 8
                        oPeriodo.vcGrupo = "Ago - " + mes.Year.ToString
                        oPeriodo.IdGrupo = mes.Month.ToString.PadLeft(2, "0") + "-" + mes.Year.ToString.Substring(0, 4)
                        Exit Select
                    Case 9
                        oPeriodo.vcGrupo = "Sep - " + mes.Year.ToString
                        oPeriodo.IdGrupo = mes.Month.ToString.PadLeft(2, "0") + "-" + mes.Year.ToString.Substring(0, 4)
                        Exit Select
                    Case 10
                        oPeriodo.vcGrupo = "Oct - " + mes.Year.ToString
                        oPeriodo.IdGrupo = mes.Month.ToString.PadLeft(2, "0") + "-" + mes.Year.ToString.Substring(0, 4)

                        Exit Select
                    Case 11
                        oPeriodo.vcGrupo = "Nov - " + mes.Year.ToString
                        oPeriodo.IdGrupo = mes.Month.ToString.PadLeft(2, "0") + "-" + mes.Year.ToString.Substring(0, 4)

                        Exit Select
                    Case Else
                        oPeriodo.vcGrupo = "Dic - " + mes.Year.ToString
                        oPeriodo.IdGrupo = mes.Month.ToString.PadLeft(2, "0") + "-" + mes.Year.ToString.Substring(0, 4)
                        Exit Select
                End Select

                lstPeriodo.Add(oPeriodo)
            Next

            Return lstPeriodo

            'Return dt.Rows.Count
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            'Throw New Exception(UtilitarioWeb.MensajeError)
            Throw New Exception(ex.Message)
        Finally
            If bl_ IsNot Nothing Then bl_.Dispose()
        End Try
    End Function

    Class ENT_GEN_GrupoServicio
        Private _IdGrupo As String
        Private _vcGrupo As String
        Private _vcGrupo01 As String
        Private _vcGrupo02 As String

        Public Property IdGrupo() As String
            Get
                Return _IdGrupo
            End Get
            Set(ByVal value As String)
                _IdGrupo = value
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

        Public Property vcGrupo() As String
            Get
                Return _vcGrupo
            End Get
            Set(ByVal value As String)
                _vcGrupo = value
            End Set
        End Property

    End Class

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