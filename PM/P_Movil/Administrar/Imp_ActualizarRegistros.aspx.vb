Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports System.IO
Imports System.Web.Services
Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Comun

Partial Class P_Movil_Administrar_Imp_ActualizarRegistros
    Inherits System.Web.UI.Page
    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim Operador As BL_GEN_Operador = Nothing
        Dim Llamada As BL_MOV_IMP_Llamada = Nothing
        Dim Plantilla As BL_MOV_IMP_Plantilla = Nothing
        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
                    Operador = New BL_GEN_Operador(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    'Dim Servicio As BL_GEN_Servicio = new BL_GEN_Servicio(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    Llamada = New BL_MOV_IMP_Llamada(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    Plantilla = New BL_MOV_IMP_Plantilla(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

                    UtilitarioWeb.Dataddl(ddlOperador, Operador.Listar(-1, "<Seleccionar>"), "vcNomOpe", "P_inCodOpe")


                    'UtilitarioWeb.Dataddl(ddlTipoTelefonia, Llamada.ListarTipoTelefonia(-1, "<Seleccionar>"), "vcNom", "P_inCod")

                    UtilitarioWeb.Dataddl(ddlTipoLlamada, Llamada.ListarTipoLlamada(), "vcNom", "P_inCod")
                    'UtilitarioWeb.Dataddl(ddlPlantilla, Plantilla.ListarTipoArchivo("-1", "<Seleccionar>"), "vcNomTipArc", "P_inCodTipArc")

                    ddlTipoLlamada.Items.Insert(0, New ListItem("<Seleccionar>", "-1"))

                    'mpajuelo   21/01/2016
                    UtilitarioWeb.Dataddl(ddlTipoPlantilla, Plantilla.ListarTipoPlantilla("-1", "<Seleccionar>"), "vcNomTipPla", "P_inCodTipPla")

                    If oUsuario.Empleado.Licencia.ToUpper() <> "PREMIUM" Then
                        ddlTipoPlantilla.Items.Remove(ddlTipoPlantilla.Items.FindByValue("1"))
                    End If

                    'UtilitarioWeb.Dataddl(ddlServicioDefecto, Servicio.Listar(-1, "<Seleccionar>"), "vcNom", "P_inCod")
                End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
            End If

            If ddlOperador.Items.Count = 2 Then
                ddlOperador.Enabled = False
                ddlOperador.SelectedIndex = 1
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Operador IsNot Nothing Then
                Operador.Dispose()
            End If
            If Llamada IsNot Nothing Then
                Llamada.Dispose()
            End If
            If Plantilla IsNot Nothing Then
                Plantilla.Dispose()
            End If
        End Try
    End Sub
    <WebMethod()>
    Public Shared Function ProcesarActualizacion(ByVal pinCodOpe As String, ByVal pinTipPla As String, ByVal pinTipTel As String, ByVal pinTipLla As String, ByVal pinTarCre As String, _
                                                 ByVal pinPro As String, ByVal pdtFecPro As String, ByVal pdtMesIni As String, ByVal pdtMesFin As String, _
                                                 ByVal pbtActGenLin As String, ByVal pbtActCos As String, ByVal pbtSerOff As String, ByVal pbtEmpDes As String, _
                                                 ByVal pbtActNum As String, ByVal pbtActAcu As String, ByVal pstrLineas As String, ByVal pbtTodasLineas As String, _
                                                 ByVal pbtActPref As String, ByVal pbtActTipCosto As String, ByVal pbtActConceptos As String, _
                                                 ByVal pinCodPla As String, ByVal pblActRngoDias As String, _
                                                 ByVal pdtFecDiaIni As String, ByVal pdtFecDiaFin As String) As String
        Dim Llamada As BL_MOV_IMP_Llamada = Nothing

        Try
            Llamada = New BL_MOV_IMP_Llamada(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oIMP_Actualizar As New ENT_MOV_IMP_Actualizar
            Dim lstLineas As New List(Of ENT_MOV_Linea)
            Dim strLineas As String()

            oIMP_Actualizar.F_inCodOpe = Convert.ToInt32(pinCodOpe)
            oIMP_Actualizar.inTipTel = Convert.ToInt32(1)
            oIMP_Actualizar.inTipLla = Convert.ToInt32(pinTipLla)
            oIMP_Actualizar.inTipPla = Convert.ToInt32(pinTipPla)
            oIMP_Actualizar.inCodPla = Convert.ToInt32(pinCodPla)
            oIMP_Actualizar.dtFecCre = DateTime.Now
            oIMP_Actualizar.inTarCre = Integer.Parse(pinTarCre)
            oIMP_Actualizar.inPro = Integer.Parse(pinPro)
            If pinPro = 1 Then
                oIMP_Actualizar.dtFecPro = Convert.ToDateTime(pdtFecPro)
            Else
                oIMP_Actualizar.dtFecPro = DateTime.Now
            End If
            'oIMP_Actualizar.dtMesPer = "01/" & pdtMesPer
            oIMP_Actualizar.btActGenLin = Convert.ToBoolean(pbtActGenLin)
            oIMP_Actualizar.btActCos = Convert.ToBoolean(pbtActCos)
            oIMP_Actualizar.btSerOff = Convert.ToBoolean(pbtSerOff)
            oIMP_Actualizar.btActNum = Convert.ToBoolean(pbtActNum)
            oIMP_Actualizar.btEmpDes = Convert.ToBoolean(pbtEmpDes)
            oIMP_Actualizar.btActAcu = Convert.ToBoolean(pbtActAcu)
            oIMP_Actualizar.btActTodasLin = Convert.ToBoolean(pbtTodasLineas)
            oIMP_Actualizar.btActPref = Convert.ToBoolean(pbtActPref)
            oIMP_Actualizar.blActRangoDias = Convert.ToBoolean(pblActRngoDias)

            oIMP_Actualizar.btActConcepto = Convert.ToBoolean(pbtActConceptos)

            If oIMP_Actualizar.blActRangoDias = True Then
                oIMP_Actualizar.dtFecDiaIni = Convert.ToDateTime(pdtFecDiaIni)
                oIMP_Actualizar.dtFecDiaFin = Convert.ToDateTime(pdtFecDiaFin)
            Else
                oIMP_Actualizar.dtFecDiaIni = DateTime.Now
                oIMP_Actualizar.dtFecDiaFin = DateTime.Now
            End If
            If oIMP_Actualizar.btActCos = False Then
                oIMP_Actualizar.btActTipCosto = 0
            Else
                oIMP_Actualizar.btActTipCosto = Convert.ToBoolean(Convert.ToInt32(pbtActTipCosto))
            End If

            If pstrLineas.Trim() <> String.Empty Then
                pstrLineas = pstrLineas.Trim().Substring(0, pstrLineas.Trim().Length - 1)
                strLineas = pstrLineas.Split(",")
                For i As Integer = 0 To strLineas.Length - 1
                    Dim objLinea As New ENT_MOV_Linea
                    objLinea.P_vcNum = strLineas(i).Trim()
                    lstLineas.Add(objLinea)
                Next
            End If
            oIMP_Actualizar.Lineas = lstLineas

            Dim CantidadMeses As Integer = DateDiff("m", pdtMesIni, pdtMesFin)
            For i As Integer = 0 To CantidadMeses
                If i > 0 Then
                    oIMP_Actualizar.dtMesPer = "01/" & DateAdd("m", i, pdtMesIni).ToString("MM/yyyy")
                Else
                    oIMP_Actualizar.dtMesPer = "01/" & pdtMesIni
                End If
                Llamada.ProcesarActualizacion(oIMP_Actualizar)
            Next

            Return ""
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Llamada IsNot Nothing Then
                Llamada.Dispose()
            End If
        End Try
    End Function
    Public Function fnRetornaPeriodos(ByVal pdFecIni As Date, ByVal pdFecFin As Date) As String()
        Dim strCadenaPeriodos As String
        Dim Arreglo() As String = Nothing
        Dim intPos As Integer, i As Integer
        Try

            strCadenaPeriodos = fnObtienePeriodos(pdFecIni, pdFecFin, False)
            i = 0
            Do While strCadenaPeriodos <> ""
                ReDim Preserve Arreglo(i)
                intPos = InStr(strCadenaPeriodos, ",")
                If intPos = 0 Then
                    Arreglo(i) = strCadenaPeriodos
                    Exit Do
                Else
                    Arreglo(i) = Mid(strCadenaPeriodos, 1, intPos - 1)
                End If
                strCadenaPeriodos = Mid(strCadenaPeriodos, intPos + 1)
                i = i + 1
            Loop
            'fnRetornaPeriodos = Arreglo
            Return Arreglo
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    Public Function fnObtienePeriodos(ByVal pdaPerIni As Date, ByVal pdaPerFin As Date, ByVal blAno4Digitos As Boolean) As String
        Dim strPeriodos As String, intC As Integer
        Dim strMax As String, strMin As String, strSgte As String
        Dim inLongitudAno As Integer
        Try
            If pdaPerFin < pdaPerIni Then
                Return ""
            End If
            If blAno4Digitos = True Then inLongitudAno = 4 Else inLongitudAno = 2

            strMax = Util.Genericos.fnAgregaCeros(Trim(Str(DatePart("m", pdaPerFin))), 2) & Trim(Microsoft.VisualBasic.Right(Str(DatePart("yyyy", pdaPerFin)), inLongitudAno))
            If blAno4Digitos = False Then
                strMin = Util.Genericos.fnAgregaCeros(Trim(Str(DatePart("m", pdaPerIni))), 2) & Mid(Trim(Str(DatePart("yyyy", pdaPerIni))), 3, 2)
            Else
                strMin = Util.Genericos.fnAgregaCeros(Trim(Str(DatePart("m", pdaPerIni))), 2) & Trim(Str(DatePart("yyyy", pdaPerIni)))
            End If
            strSgte = strMin
            intC = 0
            strPeriodos = strSgte

            While strMax <> strSgte
                If Trim(Mid(strSgte, 1, 2)) = "12" Then
                    strSgte = "01" & Util.Genericos.fnAgregaCeros(Int(Mid(strSgte, 3, 4)) + 1, 2)
                Else
                    strSgte = Util.Genericos.fnAgregaCeros(Int(Mid(strSgte, 1, 2)) + 1, 2) & Trim(Mid(strSgte, 3, 4))
                End If
                strPeriodos = strPeriodos & "," & strSgte
            End While
            Return strPeriodos

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
        Return ""
    End Function

    <WebMethod()>
    Public Shared Function ListarPlantillaPorOperador(ByVal inCodOpe As String) As List(Of ENT_MOV_IMP_Plantilla)
        'Dim newResult As List(Of ENT_MOV_IMP_Plantilla)
        Dim Plantilla As BL_MOV_IMP_Plantilla = Nothing
        Try
            Dim oIMP_Plantilla As New ENT_MOV_IMP_Plantilla
            oIMP_Plantilla.Operador.P_inCodOpe = Integer.Parse(inCodOpe)
            oIMP_Plantilla.inTipArc = Integer.Parse(-1)
            Plantilla = New BL_MOV_IMP_Plantilla(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim _return As List(Of ENT_MOV_IMP_Plantilla) = Plantilla.ListarPorOperadorArchivo(oIMP_Plantilla, "-1", "<Seleccionar>")
            'newResult = (From c In _return Where c.F_inCodTip = inCodTip).ToList()
            Return _return
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Plantilla) Then Plantilla.Dispose()
        End Try
    End Function

    <WebMethod()>
    Public Shared Function ObtenerRangoDiasXPeriodo(ByVal strTipoLlam As String, ByVal strTipoTelef As String, ByVal strPeriodo As String, ByVal strCodOpe As String) As List(Of String)
        Dim fechas As New List(Of String)()
        Dim ds As DataSet
        Dim Plantilla As BL_MOV_IMP_Plantilla = Nothing
        Try
            Plantilla = New BL_MOV_IMP_Plantilla(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            ds = Plantilla.ObtenerRangoDiasXPeriodo(Convert.ToInt32(strTipoLlam), Convert.ToInt32(strTipoTelef), strPeriodo.ToString(), strCodOpe)
            If Not ds Is Nothing Then
                fechas.Add(ds.Tables(0).Rows(0)(0).ToString())
                fechas.Add(ds.Tables(0).Rows(0)(1).ToString())
            End If
            Return fechas
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Plantilla) Then Plantilla.Dispose()
        End Try
    End Function
End Class
