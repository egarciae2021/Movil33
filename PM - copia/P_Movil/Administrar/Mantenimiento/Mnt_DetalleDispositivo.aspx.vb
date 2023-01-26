Imports VisualSoft.Comun.Utilitarios
Imports System.Data
Imports System.Web.Script.Serialization
Imports System.IO
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Suite80.BE
Imports VisualSoft.PCSistelMovil.General.BE

Partial Class P_Movil_Administrar_Mantenimiento_Mnt_DetalleDispositivo
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim BL_MOV_Parametros As BL_MOV_Parametros = Nothing
        Dim Dispositivo As BL_MOV_Dispositivo = Nothing
        Dim ModeloDispositivo As BL_MOV_ModeloDispositivo = Nothing
        Dim Linea As BL_MOV_Linea = Nothing
        Dim Campo As BL_ENT_Campo = Nothing

        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    Dim vcCodDis As String = Request.QueryString("CodDis")
                    Dim vcOpcion As String = Request.QueryString("vcOpc")

                    Dispositivo = New BL_MOV_Dispositivo(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    Dim oDispositivo As New ENT_MOV_Dispositivo
                    ''If vcOpcion Is Nothing OrElse vcOpcion = "" Then
                    ''   oDispositivo = Dispositivo.MostrarDatosSolicitudModelo(vcCodDis)
                    ''Else
                    ''   oDispositivo = Dispositivo.MostrarDatosModelo(vcCodDis)
                    ''End If
                    oDispositivo = Dispositivo.MostrarDatosSolicitudModelo(vcCodDis)

                    ModeloDispositivo = New BL_MOV_ModeloDispositivo(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    Dim oModeloDispositivo As DataTable = ModeloDispositivo.Mostrar(oDispositivo.ModeloDispositivo.P_inCod).Tables(0)

                    'Obtiene controles dinámicos con sus respectivos valores...
                    'GeneralMantenimiento.Instance.CrearLabelsDinamicosMantenimiento("MOV_ModeloDispositivo", oModeloDispositivo.Rows(0), tbDetalleModeloDispositivo)
                    If (oModeloDispositivo.Rows.Count > 0) Then
                        lblUltimaFechaCambio.Text = IIf(oDispositivo.dtFecUltCam.Year.ToString() = "1", "", oDispositivo.dtFecUltCam.ToShortDateString())
                        If oDispositivo.inNumMesProCam = 0 Then
                            lblProximaFechaCambio.Text = IIf(oDispositivo.dtFecUltCam.AddMonths(oDispositivo.inNumMesProCam).Year.ToString() = "1", "", oDispositivo.dtFecUltCam.AddMonths(oDispositivo.inNumMesProCam).ToShortDateString())
                            lblNumeroMesesCambio.Text = "Ilimitado"
                        End If
                        If oDispositivo.inNumMesProCam > 0 Then
                            lblProximaFechaCambio.Text = IIf(oDispositivo.dtFecUltCam.AddMonths(oDispositivo.inNumMesProCam).Year.ToString() = "1", "", oDispositivo.dtFecUltCam.AddMonths(oDispositivo.inNumMesProCam).ToShortDateString())
                            lblNumeroMesesCambio.Text = oDispositivo.inNumMesProCam.ToString()
                        End If
                        If oDispositivo.inNumMesProCam = 1000 Then
                            'lblUltimaFechaCambio.Text = Date.Now.ToShortDateString
                            lblProximaFechaCambio.Text = "-"
                            lblNumeroMesesCambio.Text = "-"
                        End If
                    Else
                        lblUltimaFechaCambio.Text = Date.Now.ToShortDateString
                        lblProximaFechaCambio.Text = "-"
                        lblNumeroMesesCambio.Text = "-"
                    End If
                    lblPenalidadCambio.Text = ""

                    'jherrera 20130508 Se agrego los labels de Numero, RPM Y Minutos asignados
                    '----------------------------------------------------------------------------
                    Dim dtDistositivo As New DataTable()
                    dtDistositivo = Dispositivo.Mostrar(vcCodDis)
                    Dim dtLinea As New DataTable()
                    Linea = New BL_MOV_Linea(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    dtLinea = Linea.MostrarPorCodIMEI(dtDistositivo.Rows(0)("P_vcCodIMEI").ToString())

                    If dtLinea.Rows.Count > 0 Then
                        'GeneralMantenimiento.Instance.CrearLabelsDinamicosMantenimiento("MOV_Linea", dtLinea.Rows(0), tbCamposDinamicos)
                        GeneralMantenimiento.Instance.CrearLabelsDinamicosMantenimiento("MOV_Linea", dtLinea.Rows(0), tbCamposDinamicosDetalle)
                        lblNumero.Text = dtLinea.Rows(0)("P_vcNum").ToString()
                        lblPlan.Text = dtLinea.Rows(0)("vcNomPlan").ToString()
                        lblRPM.Text = dtLinea.Rows(0)("rpm").ToString()
                        lblMinutosAsignados.Text = dtLinea.Rows(0)("inMin").ToString()
                        hdfTieneLinea.Value = "1"
                    Else
                        hdfTieneLinea.Value = "0"
                    End If
                    '-------------------------------------------------------------------------

                    Dim lstGrupoAgregado As New List(Of Object)
                    Dim lstGrupoNoAgregado As New List(Of Object)
                    Dim oSerializer As New JavaScriptSerializer

                    For Each oGrupo As ENT_GEN_Grupo In ModeloDispositivo.ListarGrupoSinModelo(oDispositivo.ModeloDispositivo.P_inCod)
                        Dim dict As New Dictionary(Of String, Object)

                        dict.Add("Codigo", oGrupo.P_inCod)
                        dict.Add("Valor", oGrupo.vcNom)

                        lstGrupoNoAgregado.Add(dict)
                    Next

                    For Each oGrupo As ENT_GEN_Grupo In ModeloDispositivo.ListarGrupoxModelo(oDispositivo.ModeloDispositivo.P_inCod)
                        Dim dict As New Dictionary(Of String, Object)

                        dict.Add("Codigo", oGrupo.P_inCod)
                        dict.Add("Valor", oGrupo.vcNom)

                        lstGrupoAgregado.Add(dict)
                    Next

                    lblModeloDispositivo.Text = oModeloDispositivo(0)("vcNom").ToString()
                    lblIMEI.Text = "IMEI: " & vcCodDis

                    If Convert.ToBoolean(oModeloDispositivo(0)("btVig")) Then
                        lblEstado.Text = "Activo"
                    Else
                        lblEstado.Text = "Inactivo"
                    End If

                    Dim CarpetaDominio As String = UtilitarioWeb.ObtenerCarpetaDominio(Server.MapPath("~/Images/ModeloDispositivo/"), "/")

                    If Not IsDBNull(oModeloDispositivo(0)("imIma")) Then
                        Dim barrImg As Byte() = CType(oModeloDispositivo(0)("imIma"), Byte())
                        Dim archivo As String = oModeloDispositivo(0)("P_inCod").ToString & ".jpg"
                        Dim strfn As String = Server.MapPath("~/Images/ModeloDispositivo" + CarpetaDominio + "/" + archivo)
                        Dim fs As FileStream = New FileStream(strfn, FileMode.OpenOrCreate, FileAccess.Write)
                        fs.Write(barrImg, 0, barrImg.Length)
                        fs.Flush()
                        fs.Close()
                        imgImagen.Src = "../../../Images/ModeloDispositivo" + CarpetaDominio + "/" + archivo
                        imgImagen.Alt = oModeloDispositivo(0)("vcNom").ToString
                        imgImagen.Width = 150
                        imgImagen.Height = 150
                    Else
                        imgImagen.Width = 150
                        imgImagen.Height = 150
                        imgImagen.Src = "../../../Common/Images/Mantenimiento/NoDisponible.jpg"
                        imgImagen.Alt = "Imagen no disponible"
                    End If

                    'jherrera 20130429 Ejecución de fórmula
                    '--------------------------------------
                    BL_MOV_Parametros = New BL_MOV_Parametros(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    Campo = New BL_ENT_Campo(1, CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)

                    Dim dtParametros As New DataTable()
                    dtParametros = BL_MOV_Parametros.MostrarGrupo("F2").Tables(0)
                    Dim dtFormula As New DataTable()
                    Dim strFormula As String = (BL_MOV_Parametros.MostrarGrupo("F1").Tables(0)).Rows(0)("Valor").ToString().Trim().ToUpper()
                    Dim strValor As String = "Sujeto a Cotización"

                    ''If strFormula <> String.Empty Then
                    ''    Dim strParametros(0 To dtParametros.Rows.Count) As String

                    ''    For i As Integer = 0 To dtParametros.Rows.Count - 1

                    ''        Dim objCampo As New ENT_ENT_Campo()
                    ''        objCampo = Campo.ObtieneCampoReal(dtParametros.Rows(i)("Valor"))

                    ''        'If (objCampo.vcNom.ToUpper() = "P_DTFECINI" And objCampo.vcTab.ToUpper() = "MOV_DISPOSITIVO" And objCampo.vcTabFor.ToUpper() = "MOV_DISPOSITIVOHISTORICO") Then
                    ''        If (objCampo.inTipDat = 3 And objCampo.vcTab.ToUpper() = "MOV_DISPOSITIVO" And objCampo.vcTabFor.ToUpper() = "MOV_DISPOSITIVOHISTORICO") Then
                    ''            If (lblProximaFechaCambio.Text.Trim() <> "En cualquier momento") Then
                    ''                If (lblProximaFechaCambio.Text.Trim() <> String.Empty) Then
                    ''                    If (Convert.ToDateTime(lblProximaFechaCambio.Text) > DateTime.Now) Then
                    ''                        strParametros(i) = DateDiff("m", DateTime.Now, Convert.ToDateTime(lblProximaFechaCambio.Text)).ToString()
                    ''                    Else
                    ''                        strParametros(i) = "0"
                    ''                    End If
                    ''                Else
                    ''                    strParametros(i) = "0"
                    ''                End If
                    ''            Else
                    ''                strParametros(i) = "0"
                    ''            End If

                    ''        Else
                    ''            Dim dsParam As New DataSet()
                    ''            dsParam = BL_MOV_Parametros.ObtenerValoresParaFormula(dtParametros.Rows(i)("Valor").ToString(), oDispositivo.ModeloDispositivo.P_inCod.ToString())
                    ''            If dsParam.Tables(0).Rows.Count > 0 Then
                    ''                strParametros(i) = (dsParam).Tables(0).Rows(0)(0)
                    ''            Else
                    ''                strParametros(i) = "0"
                    ''            End If
                    ''        End If

                    ''        For j As Integer = 0 To strFormula.Length - 1
                    ''            If (dtParametros.Rows(i)("Clave").ToString().ToUpper() = strFormula.Substring(j, 1)) Then
                    ''                strFormula = strFormula.Replace(strFormula.Substring(j, 1), strParametros(i))
                    ''            End If
                    ''        Next
                    ''    Next

                    ''    strValor = Convert.ToDouble(Evaluar(strFormula)).ToString("#,##.00")
                    ''    If strValor = ".00" Then
                    ''        strValor = "0.00"
                    ''    End If
                    ''    If Convert.ToDouble(strValor) <= 0 Then
                    ''    If Convert.ToDouble(strValor) <= 0 Then
                    ''        strValor = "0.00"
                    ''    End If

                    ''End If
                    '-----------------------------------------------------------------------------------------------------------------------------------------------
                    strValor = Dispositivo.CostoReposicion_x_IMEI(vcCodDis).ToString()  'Convert.ToDouble(Dispositivo.CostoReposicion_x_IMEI(vcCodDis).ToString()).ToString("#,##.00")
                    If strValor = ".00" OrElse strValor = "0" OrElse strValor = "0.00" Then
                        'strValor = "0.00"
                        If strValor = ".00" Then strValor = "0.00"
                        trPenalidad.Style("display") = "none"
                    Else
                        lblPenalidadCambio.Text = strValor
                        trPenalidad.Style("display") = ""
                    End If

                    Dim oJavaScriptSerializer As New JavaScriptSerializer
                    Dim sbScript As New StringBuilder
                    sbScript.AppendLine("var miTipoAsignacion = " & oJavaScriptSerializer.Serialize(oDispositivo.TipoAsiganacion) & ";")
                    sbScript.AppendLine("var misAsignaciones = " & oJavaScriptSerializer.Serialize(oDispositivo.Asignacion) & ";")

                    Page.ClientScript.RegisterClientScriptBlock(Me.GetType, "ScriptKey", sbScript.ToString, True)


                End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If BL_MOV_Parametros IsNot Nothing Then BL_MOV_Parametros.Dispose()
            If Dispositivo IsNot Nothing Then Dispositivo.Dispose()
            If ModeloDispositivo IsNot Nothing Then ModeloDispositivo.Dispose()
            If Linea IsNot Nothing Then Linea.Dispose()
            If Campo IsNot Nothing Then Campo.Dispose()

        End Try
    End Sub



    Function Evaluar(ByVal Txt As String) As String
        Dim i As Integer, oNB As Integer, fNB As Integer
        Dim P1 As Integer, P2 As Integer
        Dim Buff As String
        Dim T As String = ""
        'Para los calculos es necesario un punto en lugar de la coma  
        Txt = Replace(Txt, ",", ".")
        'Ver si hay (  
        For i = 1 To Len(Txt)
            If Mid(Txt, i, 1) = "(" Then oNB = oNB + 1
        Next i
        'Si hay ( (abiertos), ver si concuerdan) (cerrados)  
        If oNB > 0 Then
            For i = 1 To Len(Txt)
                If Mid(Txt, i, 1) = ")" Then fNB = fNB + 1
            Next i
        Else
            'No hay parentesis, Evalua directamente el calculo  
            Return EvaluaExpresion(Txt)
        End If
        If oNB <> fNB Then
            'Los parentesis no concuerdan, mostrar mensaje de error de parentesis  
            Return ""
        End If

        While oNB > 0
            'busca el ultimo parentesis abierto  
            P1 = InStrRev(Txt, "(")
            'Busca el parentesis que cierra la expresion  
            P2 = InStr(Mid(Txt, P1 + 1), ")")
            'Evalua la expresion que esta entre parentesis  
            Buff = EvaluaExpresion(Mid(Txt, P1 + 1, P2 - 1))
            'Reemplazar la expresion con el resultado y eliminar los parentesis  
            Txt = Left(Txt, P1 - 1) & Buff & Mid(Txt, P1 + P2 + 1)
            oNB = oNB - 1
        End While
        'no mas parentesis, evaluar la ultima expresion  
        Return EvaluaExpresion(Txt)

    End Function

    Function EvaluaExpresion(ByVal A As String) As String
        Dim T As Integer, S As Integer
        Dim i As Integer, C As Boolean
        Dim c1 As Double, c2 As Double, Signe As Integer
        Dim Fin As Boolean
        Dim blnNegativo = False
        Dim R As String = ""
        'quitar los espacios  
        A = Replace(A, " ", "")

        While Not Fin
            For i = 1 To Len(A)
                T = Asc(Mid(A, i, 1))
                If T < 48 And T <> 46 Or i = Len(A) Then
                    If C Then 'evalua  
                        If i = Len(A) Then
                            c2 = Val(Mid(A, S))
                        Else
                            c2 = Val(Mid(A, S, i - S))
                        End If
                        R = Str(CalculSimple(c1, c2, Signe))
                        If i = Len(A) Then
                            Fin = True
                        Else
                            A = Trim(R & Mid(A, i))
                            C = False
                        End If
                        Exit For
                    Else 'separa la 1ra cifra  
                        If i <> 1 Or T <> 45 Then
                            c1 = Val(Left(A, i - 1))
                            Signe = T
                            S = i + 1
                            C = True
                        End If
                    End If
                End If
            Next i
        End While
        'reemplazar la expresión con el resultado  
        EvaluaExpresion = Trim(R)
    End Function

    Function CalculSimple(ByVal n1 As Double, ByVal n2 As Double, ByVal Signe As Integer) As Double
        Select Case Signe
            Case 43 ' +  
                CalculSimple = n1 + n2
            Case 45 ' -  
                CalculSimple = n1 - n2
            Case 42 ' *  
                CalculSimple = n1 * n2
            Case 47 ' /  
                CalculSimple = n1 / n2
                'Aquí, agregar otro calculo...  
        End Select
    End Function
End Class