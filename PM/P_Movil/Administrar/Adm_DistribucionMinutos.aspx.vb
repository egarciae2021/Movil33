Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Comun.Utilitarios
Imports System.Web.Services
Imports VisualSoft.Comun.ImportacionExportacion
Imports System.Data
Imports System.Web.Script.Services
Imports System.Web.Script.Serialization
Imports VisualSoft.PCSistelMovil.General.BE

Partial Class P_Movil_Administrar_Adm_DistribucionMinutos
    Inherits System.Web.UI.Page

    ' ==========================================================================================
    '   LOAD
    ' ==========================================================================================
    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Try

            If IsNothing(Session("Usuario")) Then

                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
            Else



                If Not IsPostBack Then




                    hdfidPeriodo.Value = Request.QueryString("idPer")

                    If hdfidPeriodo.Value <> "0" Then

                        hdfvcPeriodo.Value = Request.QueryString("vcPer")


                        txtDescrip.Text = Request.QueryString("vcDes")

                        hdfidOperador.Value = Request.QueryString("idOpe")
                        txtOperador.Text = Request.QueryString("vcOpe")


                        hdfidCuenta.Value = Request.QueryString("idCue")
                        txtCuenta.Text = Request.QueryString("vcCue")

                    Else
                        Dim Operador As BL_GEN_Operador = New BL_GEN_Operador(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                        Dim lstOperador As List(Of ENT_GEN_Operador) = Operador.Listar(-1, "<Seleccionar>")
                        Operador.Dispose()

                        UtilitarioWeb.Dataddl(ddlOperador, lstOperador, "vcNomOpe", "P_inCodOpe")

                        If lstOperador.Count = 1 Then
                            Dim script As String = "CerrarModulo('No hay ningun operador disponible.');"
                            Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
                        ElseIf lstOperador.Count = 2 Then
                            ddlOperador.SelectedIndex = 1
                            'tdOperador.Attributes("display") = "none"
                        End If
                    End If
                    'Dim LineaTipo As BL_MOV_LineaTipo = New BL_MOV_LineaTipo(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    'Dim MOV_ModeloDispositivo As BL_MOV_ModeloDispositivo = New BL_MOV_ModeloDispositivo(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    'Dim Parametros As BL_MOV_Parametros = New BL_MOV_Parametros(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)


                    'Parametros.Dispose()

                    'hdfValorIlimitado.Value = lstParametros(0).Valor



                    'Dim Parametros As BL_MOV_Parametros = New BL_MOV_Parametros(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
                    'Dim lstParametros As List(Of ENT_MOV_Parametros) = Parametros.ListarPorGrupo("D1")

                    'Dim lstParametros2 As List(Of ENT_MOV_Parametros) = Parametros.ListarPorGrupo("DB1")

                    'hdfTipoDistribucion.Value = lstParametros(0).Valor

                    'Dim lstParametrosDB1 As List(Of ENT_MOV_Parametros) = Parametros.ListarPorGrupo("DB1")

                    'hdfValorIlimitado.Value = lstParametrosDB1(0).Valor

                    'Parametros.Dispose()

                    'Select Case lstParametros(0).Valor
                    '    Case "1"
                    '        ifColumna.Attributes("src") = "Adm_DistribucionMinutosLinea.aspx"
                    '        'lblTituloOpciones.Text = "Lineas"
                    '    Case "2"
                    '        ifColumna.Attributes("src") = "Adm_DistribucionMinutosCentroCosto.aspx?Clase=" & lstParametros(1).Valor
                    '        'lblTituloOpciones.Text = "Centro de Costo - " & IIf(lstParametros(1).Valor = "C", "Cantidad", "Porcentaje")
                    '    Case "3"
                    '        ifColumna.Attributes("src") = "Adm_DistribucionMinutosOrganizacion.aspx?Clase=" & lstParametros(1).Valor
                    '        'lblTituloOpciones.Text = "Organización - " & IIf(lstParametros(1).Valor = "C", "Cantidad", "Porcentaje")
                    '    Case "4"
                    '        ifColumna.Attributes("src") = "Adm_DistribucionMinutosNivel.aspx?Clase=" & lstParametros(1).Valor
                    '        'lblTituloOpciones.Text = "Nivel - " & IIf(lstParametros(1).Valor = "C", "Cantidad", "Porcentaje")
                    '    Case "5"
                    '        ifColumna.Attributes("src") = "Adm_DistribucionMinutosGrupoOrigen.aspx?Clase=" & lstParametros(1).Valor
                    '        'lblTituloOpciones.Text = "Grupo Empleado - " & IIf(lstParametros(1).Valor = "C", "Cantidad", "Porcentaje")
                    'End Select

                    'ifColumna.Attributes("src") = "Adm_DistribucionMinutosLinea.aspx"


                End If
                UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub

   
    ' ===========================================================================================================
    '   LISTAR PRINCIPAL
    ' ===========================================================================================================
    <WebMethod()>
    Public Shared Function ListarPrincipal(ByVal vcCodInt As String) As List(Of Object)
        Try
            Dim Organizacion As BL_GEN_Organizacion = New BL_GEN_Organizacion(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim lstOrganizacion As List(Of ENT_GEN_Organizacion) = Organizacion.ListarDependencia(vcCodInt)
            Organizacion.Dispose()
            Dim NodoPrincipal As New List(Of Object)

            For Each oOrganizacion As ENT_GEN_Organizacion In lstOrganizacion
                Dim PrimerNivel As New List(Of Object)

                PrimerNivel.Add(oOrganizacion.vcCodInt)
                PrimerNivel.Add(0)
                PrimerNivel.Add(oOrganizacion.vcNomOrg)

                NodoPrincipal.Add(PrimerNivel)
            Next

            Return NodoPrincipal
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    ' ===========================================================================================================
    '   GUARDAR PERIODO
    ' ===========================================================================================================
    <WebMethod()>
    Public Shared Function GuardarPeriodo(ByVal vcPer As String, ByVal vcDes As String, ByVal idCue As String) As Integer
        Try
            Dim usuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)

            Dim CuentaBolsa As BL_MOV_CuentaBolsaPeriodo = New BL_MOV_CuentaBolsaPeriodo(usuario.IdCliente)

            'Return CuentaBolsa.Insertar(vcPer, vcDes, idCue, usuario.IdCliente)
            Return 0

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function
   

    <WebMethod()>
    Public Shared Function ListarCuentaPorOperador(ByVal inCodOpe As String) As List(Of ENT_MOV_Cuenta)
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario)
            Dim Cuenta As BL_MOV_Cuenta = New BL_MOV_Cuenta(oUsuario.IdCliente)
            Dim _return As List(Of ENT_MOV_Cuenta) = Cuenta.ListarPorOperadorDistribucionMinutos(inCodOpe)
            Cuenta.Dispose()

            Return _return
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function
End Class