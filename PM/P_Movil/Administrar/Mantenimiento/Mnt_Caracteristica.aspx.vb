Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports System.Web.Services
Imports VisualSoft.Comun.Utilitarios
Imports System.Data

Partial Class P_Movil_Administrar_Mantenimiento_Mnt_Caracteristica
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim CaracteristicaTipoDato As BL_MOV_CaracteristicaTipoDato = Nothing
        Try
            If Not IsPostBack Then
                CaracteristicaTipoDato = New BL_MOV_CaracteristicaTipoDato(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                Dim Entidad As BL_ENT_Entidad = New BL_ENT_Entidad(1, CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                Dim lstCaracteristicaTipoDato As List(Of ENT_MOV_CaracteristicaTipoDato)
                Dim inCod As String = Request.QueryString("Cod")

                lstCaracteristicaTipoDato = CaracteristicaTipoDato.Listar("C")

                UtilitarioWeb.Dataddl(ddlTipoDato, lstCaracteristicaTipoDato, "vcNom", "P_inCod")
                UtilitarioWeb.Dataddl(ddlTabla, Entidad.ListarConCaracteristica(), "vcDes", "P_inCod")
                Entidad.Dispose()

                For Each oCaracteristicaTipoDato As ENT_MOV_CaracteristicaTipoDato In lstCaracteristicaTipoDato
                    hdfTamano.Value = hdfTamano.Value + oCaracteristicaTipoDato.inLon.ToString + ","
                Next

                hdfTamano.Value = hdfTamano.Value.Substring(0, hdfTamano.Value.Length - 1)

                If Not IsNothing(inCod) Then
                    Dim Caracteristica As BL_MOV_Caracteristica = New BL_MOV_Caracteristica(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    Dim oCaracteristica As DataTable = Caracteristica.Mostrar(Integer.Parse(inCod))
                    Caracteristica.Dispose()
                    hdfCaracteristica.Value = inCod
                    txtDescripcion.Text = oCaracteristica.Rows(0)("vcDes").ToString()

                    'trCampo.Style("display") = "none"
                    'trTabla.Style("display") = "none"
                    'trTipoDato.Style("display") = "none"
                    'trTamDat.Style("display") = "none"

                    Dim blMostrarValoresCombo As Boolean = False
                    If Not IsDBNull(oCaracteristica.Rows(0)("F_inCodTipDat")) Then
                        Dim F_inCodTipDat As Integer = CType(oCaracteristica.Rows(0)("F_inCodTipDat"), Integer)
                        ddlTipoDato.SelectedValue = F_inCodTipDat
                        ddlTipoDato.Enabled = False
                        If F_inCodTipDat = 8 Then 'Lista de Selección
                            blMostrarValoresCombo = True
                        End If
                    End If
                    If blMostrarValoresCombo Then
                        'trCampo.Style("display") = "none"
                        ddlTipoDato.SelectedValue = 8
                        ddlTipoDato.Enabled = False
                    Else
                        'trCampo.Style("display") = "none"
                        'trTabla.Style("display") = "none"
                        'trTipoDato.Style("display") = "none"
                        trTamDat.Style("display") = "none"
                    End If

                    Dim strValoresCombo As String = ("" & oCaracteristica.Rows(0)("vcLon")).ToString()
                    Page.ClientScript.RegisterClientScriptBlock(Me.GetType(), "ValoresCombo", "var ValoresCombo = '" & strValoresCombo & "';", True)

                    If oCaracteristica.Columns.Contains("IdTabla") Then
                        ddlTabla.SelectedValue = oCaracteristica.Rows(0)("IdTabla").ToString()
                    Else
                        ddlTabla.Text = oCaracteristica.Rows(0)("vcTab").ToString()
                    End If
                    ddlTabla.Enabled = False
                    txtCampo.Text = ("" & oCaracteristica.Rows(0)("vcCam")).ToString()
                    txtCampo.Enabled = False


                    chkEstado.Checked = oCaracteristica.Rows(0)("btVig")
                    'jherrera 20130425 Se agrego el check de EsFormula
                    '-------------------------------------------------
                    Try
                        chkFormula.Checked = oCaracteristica.Rows(0)("btEsFor")
                    Catch ex As Exception
                        chkFormula.Checked = False
                    End Try

                    'jherrera 20140415
                    Dim vcTipDat = oCaracteristica.Rows(0)("F_inCodTipDat").ToString()
                    If vcTipDat = "1" Or vcTipDat = "2" Or vcTipDat = "4" Or vcTipDat = "5" Then
                        chkFormula.Enabled = True
                    Else
                        chkFormula.Enabled = False
                    End If
                    '-------------------------------------------------
                    If chkEstado.Checked Then
                        trEstado.Style("display") = "none"
                    End If

                    chkReporte.Checked = oCaracteristica.Rows(0)("MostrarReporteFact")

                    Dim Tabla As String = oCaracteristica.Rows(0)("vcTab").ToString()
                    If Tabla = "MOV_Dispositivo" Or Tabla = "MOV_Linea" Or Tabla = "M_EMPL" Then
                    Else
                        trReporte.Style("display") = "none"
                    End If
                Else
                    If ddlTipoDato.SelectedValue = "1" Or ddlTipoDato.SelectedValue = "2" Or ddlTipoDato.SelectedValue = "4" Or ddlTipoDato.SelectedValue = "5" Then
                        chkFormula.Enabled = True
                    Else
                        chkFormula.Enabled = False
                    End If
                    hdfCaracteristica.Value = ""
                    trEstado.Style("display") = "none"
                    TextoActualizar.Style("display") = "none"
                End If
            End If

            UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(CaracteristicaTipoDato) Then CaracteristicaTipoDato.Dispose()
        End Try
    End Sub

    'jherrera 20130425 Se Modifico el metodo para considerar e flag de formula
    '-------------------------------------------------------------------------
    <WebMethod()>
    Public Shared Function Guardar(ByVal Campo As String, ByVal Tabla As String, ByVal TipoDato As String, ByVal TamanoDato As String, ByVal Descripcion As String, ByVal inCodCar As String,
                                   ByVal btVig As String, ByVal btEsFor As String, ByVal btMosReporte As String) As Integer
        Try
            Dim Caracteristica As BL_MOV_Caracteristica = New BL_MOV_Caracteristica(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oCaracteristica As New ENT_MOV_Caracteristica
            oCaracteristica.vcCam = Campo
            oCaracteristica.inCodTab = Integer.Parse(Tabla)
            oCaracteristica.inCodTipDat = Integer.Parse(TipoDato)
            oCaracteristica.vcLon = TamanoDato
            oCaracteristica.ENT_Entidad.vcDes = Descripcion.Replace("&#39", "'")
            oCaracteristica.btVig = Boolean.Parse(btVig)
            oCaracteristica.btEsFor = Boolean.Parse(btEsFor)
            oCaracteristica.btMosReporte = Boolean.Parse(btMosReporte)
            Dim _return As Integer
            If inCodCar = "" Then
                _return = Caracteristica.Insertar(oCaracteristica)
            Else
                oCaracteristica.inCod = Integer.Parse(inCodCar)
                If oCaracteristica.inCodTipDat <> 8 Then
                    oCaracteristica.vcLon = ""
                End If

                Caracteristica.Actualizar(oCaracteristica)
                _return = 0
            End If
            Caracteristica.Dispose()
            Return _return

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function
    '----------------------------------------------------------------------------------------------------
End Class
