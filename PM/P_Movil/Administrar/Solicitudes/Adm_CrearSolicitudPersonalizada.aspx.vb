Imports System.Data
Imports VisualSoft.Comun.Auditoria
Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports System.Web.Services
Imports System.IO
Imports VisualSoft.Comun.Utilitarios
Imports System.Web.Script.Serialization
Imports VisualSoft.PCSistelMovil.General.BE

Partial Class P_Movil_Administrar_Solicitudes_Adm_CrearSolicitudPersonalizada
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim TipoSolicitud As BL_MOV_TipoSolicitud = Nothing
        Try
            If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else
                hdfCodEmp.Value = Request.QueryString("vcCodEmp")
                hdfCodTipSol.Value = Request.QueryString("inTipSol")
                hdfAdmin.Value = Request.QueryString("biAdmin")
                hdfTamanoArchivo.Value = Convert.ToDouble("0" + ConfigurationManager.AppSettings("Adjuntar_TamanoMaximoMB").ToString()).ToString()

                Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)

                TipoSolicitud = New BL_MOV_TipoSolicitud(VisualSoft.Suite80.DL.DALC_Base.TipoOrigen.Datos, oUsuario.IdCliente)
                Dim dsCaracteristica As DataSet = TipoSolicitud.ListarCampos(Convert.ToInt32(hdfCodTipSol.Value), 0)
                Dim dtCaracteristica As DataTable = dsCaracteristica.Tables(0)
                Dim dtCondiciones As DataTable = dsCaracteristica.Tables(1)
                TipoSolicitud.Dispose()
                Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
                Dim vcPeriodo As String = ""
                For i As Integer = 0 To dtCaracteristica.Rows.Count - 1
                    If dtCaracteristica.Rows(i)("vcNomCam") = "inUsuarioCreacion" Then
                        hdfUsuarioCreacion.Value = oUsuario.vcUsu
                    ElseIf dtCaracteristica.Rows(i)("vcNomCam") = "daFechaCreacion" Then
                        hdfFechaCreacion.Value = DateTime.Now.ToString(oCultura.vcFecCor + " " + oCultura.vcHorCor)
                    ElseIf ((hdfCodTipSol.Value = "29" Or hdfCodTipSol.Value = "30") AndAlso dtCaracteristica.Rows(i)("vcNomCam") = "Periodo") Then
                        vcPeriodo = dtCaracteristica.Rows(i)("Periodo")
                    End If
                Next
                Dim scriptFunc As String = String.Empty
                scriptFunc = GeneralMantenimiento.Instance.CrearControlesSolicitudPersonalizada(dtCaracteristica, dtCondiciones, tbCamposDinamicos, "", False, False, hdfCodTipSol.Value)

                MostrarDatos(oCultura, vcPeriodo)

                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", scriptFunc, True)
            End If

            UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If TipoSolicitud IsNot Nothing Then TipoSolicitud.Dispose()
        End Try
    End Sub

    Private Sub MostrarDatos(ByVal oCultura As ENT_GEN_Cultura, ByVal vcPeriodo As String)

        Dim TipoSolicitud As BL_MOV_TipoSolicitud = Nothing
        Dim ds As DataSet = Nothing

        Try
            TipoSolicitud = New BL_MOV_TipoSolicitud(VisualSoft.Suite80.DL.DALC_Base.TipoOrigen.Datos, CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            ds = TipoSolicitud.Mostrar(Convert.ToInt32(hdfCodTipSol.Value))

            'Dim TipoSolicitud As BL_MOV_TipoSolicitud = New BL_MOV_TipoSolicitud(VisualSoft.Suite80.DL.DALC_Base.TipoOrigen.Datos, CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            'Dim ds As DataSet = TipoSolicitud.Mostrar(Convert.ToInt32(hdfCodTipSol.Value))
            'TipoSolicitud.Dispose()



            hdfFraccionamiento.Value = If(Convert.ToBoolean(ds.Tables(1).Rows(0)("biFraccionamiento")), "1", "0")

            If IsDBNull(ds.Tables(1).Rows(0)("inTipoFinanciamiento")) Then
                trMontoFijo.Style("display") = "none"
                trFInanciamiento.Style("display") = "none"
                txtMonto.Text = "0"
                txtMesesCuotas.Text = "0"
                txtPeriodoGracia.Text = "0"
            Else
                txtNombreFinanc.Text = ds.Tables(1).Rows(0)("vcFinanciamiento")
                hdfIdFInanciamiento.Value = ds.Tables(1).Rows(0)("inTipoFinanciamiento")

                If (hdfAdmin.Value <> "1") Then
                    If Convert.ToBoolean(ds.Tables(1).Rows(0)("biMontoFijo")) Then 'tiene monto fijo, mostrar deshabilitador
                        trMontoFijo.Style("display") = ""
                        If ds.Tables(1).Rows(0)("dcMonto") = 0 Then
                            txtMonto.Text = "Aún no definido"
                        Else
                            txtMonto.Text = UtilitarioWeb.DevuelveNumeroFormateado(ds.Tables(1).Rows(0)("dcMonto").ToString(), oCultura)
                        End If
                        txtMonto.Enabled = False
                    Else
                        trMontoFijo.Style("display") = "none"
                    End If
                Else
                    trMontoFijo.Style("display") = ""
                    If Convert.ToBoolean(ds.Tables(1).Rows(0)("biMontoFijo")) Then
                        If ds.Tables(1).Rows(0)("dcMonto") = 0 Then
                            txtMonto.Text = ""
                        Else
                            txtMonto.Text = UtilitarioWeb.DevuelveNumeroFormateado(ds.Tables(1).Rows(0)("dcMonto").ToString(), oCultura)
                        End If
                    End If
                End If

                'NÚMERO DE CUOTAS
                hdfNumMinCuo.Value = "0"
                hdfNumMaxCuo.Value = "0"
                hdfMesCuo.Value = "0"
                trMesesCuotas.Style("display") = "none"

                If IsDBNull(ds.Tables(1).Rows(0)("inTipoFinanciamiento")) Then
                    txtMesesCuotas.Text = "0"
                ElseIf Convert.ToBoolean(ds.Tables(1).Rows(0)("PagoContado")) Then
                    txtMesesCuotas.Text = "1"
                Else
                    trMesesCuotas.Style("display") = ""
                    If ds.Tables(1).Rows(0)("Cuotas").ToString() <> "0" Then 'Número de cuotas preestablecido
                        txtMesesCuotas.Text = ds.Tables(1).Rows(0)("Cuotas").ToString()
                        txtMesesCuotas.Enabled = False
                    ElseIf ds.Tables(1).Rows(0)("MinimoCuotas").ToString() <> "0" And ds.Tables(1).Rows(0)("MaximoCuotas").ToString() <> "0" Then 'Rango de número de cuotas
                        txtMesesCuotas.Text = ""
                        hdfNumMinCuo.Value = ds.Tables(1).Rows(0)("MinimoCuotas").ToString()
                        hdfNumMaxCuo.Value = ds.Tables(1).Rows(0)("MaximoCuotas").ToString()
                        lblMesesCuotas.Text = "El número de cuotas debe estar en el rango de " + hdfNumMinCuo.Value + " y " + hdfNumMaxCuo.Value + "."
                    ElseIf ds.Tables(1).Rows(0)("MesesCuotas").ToString() <> "" Then 'Meses de Financiamiento Predefinido
                        Dim lstMeses As String() = ds.Tables(1).Rows(0)("MesesCuotas").ToString().Split(",")
                        For i As Integer = 0 To lstMeses.Length - 1
                            txtMesesCuotas.Text += lstMeses(i).Replace("12", "Dic").Replace("11", "Nov").Replace("10", "Oct").Replace("9", "Set").Replace("8", "Ago").Replace("7", "Jul").Replace("6", "Jun").Replace("5", "May").Replace("4", "Abr").Replace("3", "Mar").Replace("2", "Feb").Replace("1", "Ene") + ","
                        Next
                        hdfMesCuo.Value = "1"
                        txtMesesCuotas.Text = txtMesesCuotas.Text.Substring(0, txtMesesCuotas.Text.Length - 1)
                        txtMesesCuotas.Enabled = False
                        txtMesesCuotas.Width = lstMeses.Length * 21
                    End If
                End If

                'PERIODO DE GRACIA
                If Convert.ToBoolean(ds.Tables(1).Rows(0)("PeriodoGracia")) = False Then
                    trPeriodoGracia.Style("display") = "none"
                    txtPeriodoGracia.Text = "0"
                Else
                    trPeriodoGracia.Style("display") = ""
                    If ds.Tables(1).Rows(0)("MesesPeriodoGracia").ToString() <> "0" Then 'Número de meses de periodo de gracia
                        txtPeriodoGracia.Text = ds.Tables(1).Rows(0)("MesesPeriodoGracia").ToString()
                        txtPeriodoGracia.Enabled = False
                    ElseIf ds.Tables(1).Rows(0)("MinimoMesesPeriodoGracia").ToString() <> "0" And ds.Tables(1).Rows(0)("MaximoMesesPeriodoGracia").ToString() <> "0" Then 'Rango de número de cuotas
                        txtPeriodoGracia.Text = ""
                        hdfMinPerGra.Value = ds.Tables(1).Rows(0)("MinimoMesesPeriodoGracia").ToString()
                        hdfMaxPerGra.Value = ds.Tables(1).Rows(0)("MaximoMesesPeriodoGracia").ToString()
                        lblPeriodoGracia.Text = "El periodo de gracia debe estar en el rango de " + hdfMinPerGra.Value + " y " + hdfMaxPerGra.Value + "."
                    End If
                End If


                If hdfCodTipSol.Value = "29" OrElse hdfCodTipSol.Value = "30" Then 'Es devolución
                    trMontoFijo.Style("display") = "none"


                    Dim objControlFinder As New ControlFinder

                    'actualizar en versión 3.1 (1)
                    If Not IsNothing(objControlFinder.FindControlRecursive(Me, "txt_IGV")) AndAlso Not IsNothing(objControlFinder.FindControlRecursive(Me, "txt_ImporteTotal")) Then
                        hdfIGV.Value = ds.Tables(1).Rows(0)("dcIGV").ToString()
                        CType(objControlFinder.FindControlRecursive(Me, "txt_IGV"), TextBox).ReadOnly = True
                        CType(objControlFinder.FindControlRecursive(Me, "txt_ImporteTotal"), TextBox).ReadOnly = True
                    Else
                        hdfIGV.Value = "0"
                    End If
                    CType(objControlFinder.FindControlRecursive(Me, "txt_Periodo"), TextBox).Text = vcPeriodo
                End If
            End If

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If TipoSolicitud IsNot Nothing Then
                TipoSolicitud.Dispose()
            End If
        End Try

    End Sub
End Class
