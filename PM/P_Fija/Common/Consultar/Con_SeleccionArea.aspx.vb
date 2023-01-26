Imports System.Collections.Generic
Imports System.Linq
Imports System.Web
Imports System.Web.UI
Imports System.Web.UI.WebControls
Imports VisualSoft.PCSistel.Utilitarios
Imports System.Web.Script.Serialization
Imports System.Web.Services
Imports System.Web.Script.Services
Imports VisualSoft.PCSistel.General.BE
Imports VisualSoft.PCSistel.BL
Imports VisualSoft.Comun.Utilitarios
Imports System.IO

Partial Class Con_SeleccionArea_Fija
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(sender As Object, e As EventArgs) Handles Me.Load
        Try
            If (Session("Usuario") IsNot Nothing) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
                Me.Page.ClientScript.RegisterStartupScript(Me.[GetType](), "ScriptKey", script, True)
            Else
                If Not IsPostBack Then
                    Dim Nivel As New BL_GEN_Nivel()
                    Dim lstNivel As List(Of ENT_GEN_Nivel) = Nivel.Listar()
                    'Nivel.Dispose();
                    hdfTipo.Value = Request.QueryString("Tipo")
                    hdfMultiple.Value = Request.QueryString("Multiple")
                    hdfEmpleado.Value = Request.QueryString("vcCodEmp")

                    'Determina la cantidad de paneles, pero sólo si multiple es 1
                    If Request.QueryString("UnPanel") IsNot Nothing Then
                        hdfUnPanel.Value = Request.QueryString("UnPanel")
                    Else
                        hdfUnPanel.Value = "0"
                    End If

                    'Dim empl As Dynamic = Request.QueryString("Empleados")
                    Dim empl As String = Request.QueryString("Empleados")

                    If hdfTipo.Value = "1" Then
                        dvDatosSeleccion.InnerHtml = "Áreas disponibles"
                    ElseIf hdfTipo.Value = "2" Then
                        dvDatosSeleccion.InnerHtml = "Empleados disponibles"
                    End If
                    'else if (hdfTipo.Value == "3")
                    '{
                    '    dvDatosSeleccion.InnerHtml = "Celulares disponibles";
                    '    //ElseIf hdfTipo.Value = "4" Then '11-02-2014 - wapumayta
                    '    //    dvDatosSeleccion.InnerHtml = "Usuarios disponibles"
                    '}

                    If hdfMultiple.Value = "0" Then
                        tdControles.Style("display") = "none"
                        tdDatosSeleccionados.Style("display") = "none"
                        'tdDatosSeleccion.Style("width") = "600px"
                        lstResultado.Width = New Unit(410)
                        lstResultado.SelectionMode = ListSelectionMode.[Single]
                    ElseIf hdfMultiple.Value = "1" And hdfUnPanel.Value = "1" Then
                        tdControles.Style("display") = "none"
                        tdDatosSeleccionados.Style("display") = "none"
                        lstResultado.Width = New Unit(410)
                    End If

                    For Each oNivel As ENT_GEN_Nivel In lstNivel
                        oNivel.vcUrlIcoNiv = "~/Common/Images/Controles/dhtmlx/TreeView/Niveles/" + oNivel.P_inCodNiv + ".ico"

                        If oNivel.imIcoNiv IsNot Nothing Then
                            Try
                                Dim strfn As String = Server.MapPath(oNivel.vcUrlIcoNiv)
                                Dim fs As New FileStream(strfn, FileMode.OpenOrCreate, FileAccess.Write)
                                fs.Write(oNivel.imIcoNiv, 0, oNivel.imIcoNiv.Length)
                                fs.Flush()
                                fs.Close()
                            Catch
                            End Try
                        End If

                        'if (!string.IsNullOrEmpty(hdfEmpleado.Value))
                        '{
                        '    //BL_MOV_Linea Linea = new BL_MOV_Linea(((ENT_SEG_Usuario)HttpContext.Current.Session["Usuario"]).IdCliente);
                        '    //List<ENT_MOV_Linea> lstLinea = new List<ENT_MOV_Linea>();

                        '    //lstLinea = Linea.ListarPorEmpleado(hdfEmpleado.Value, -1);
                        '    //Linea.Dispose();
                        '    //TabOpciones.Visible = false;
                        '    //dvEstado.Visible = false;
                        '    //tdOpciones.Style("width") = "145px";
                        '    //foreach (ENT_MOV_Linea oLinea in lstLinea)
                        '    //{
                        '    //    lstResultado.Items.Add(new ListItem(oLinea.P_vcNum + "=" + oLinea.Empleado.vcNom, oLinea.P_vcNum));
                        '    //}
                        '}
                    Next
                    'UtilitarioWeb.AgregarTema(Server, Page.Header, ((ENT_SEG_Usuario)Session["Usuario"]).CaracteristicaUsuario.vcTem);
                End If
            End If
        Catch ex As Exception
            Dim util As New ClaseUtilitarios()
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil)
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try

    End Sub

    <WebMethod()> _
    Public Shared Function ListarPrincipal(vcCodInt As String) As List(Of Object)
        Try
            Dim Organizacion As New BL_GEN_Organizacion()

            'vcCodInt = ((ENT_SEG_Usuario)HttpContext.Current.Session["Usuario"]).F_vcCodInt;
            vcCodInt = "001"
            'comentar luego
            If vcCodInt Is Nothing OrElse String.IsNullOrEmpty(vcCodInt.Trim()) Then
                vcCodInt = "001"
            End If
            Dim oOrganizacion As ENT_GEN_Organizacion = Organizacion.ObtieneOrganizacion(vcCodInt)
            'Organizacion.Dispose();
            Dim NodoPrincipal As New List(Of Object)()
            Dim PrimerNivel As New List(Of Object)()
            PrimerNivel.Add(vcCodInt)
            PrimerNivel.Add(0)
            PrimerNivel.Add(oOrganizacion.vcNomOrg)
            NodoPrincipal.Add(PrimerNivel)
            Return NodoPrincipal
        Catch ex As Exception
            Dim util As New ClaseUtilitarios()
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil)
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    <WebMethod()> _
    Public Shared Function ListarOrganizacion(vcCodInt As String) As List(Of ENT_GEN_Organizacion)
        Try
            Dim Organizacion As New BL_GEN_Organizacion()
            Dim _return As List(Of ENT_GEN_Organizacion) = Organizacion.ListarDependencia(vcCodInt)
            'Organizacion.Dispose();
            Return _return
        Catch ex As Exception
            Dim util As New ClaseUtilitarios()
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil)
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Function

    <WebMethod()> _
    Public Shared Function ListarArea(vcCodInt As String, btIncDep As String, inCodEst As String, vcValBus As String, inTip As String) As List(Of ENT_GEN_Organizacion)
        'ENT_SEG_Usuario oUsuario = null;
        Dim Organizacion As BL_GEN_Organizacion = Nothing

        Try
            'string vcCodIntUsuario = ((ENT_SEG_Usuario)HttpContext.Current.Session["Usuario"]).F_vcCodInt;
            Dim vcCodIntUsuario As String = "001"
            'comentar luego
            'if (string.IsNullOrEmpty(vcCodIntUsuario) || (vcCodInt).Length == 3)
            If (vcCodInt).Length = 3 Then
                'modificado el lenght
                'If vcCodInt Is Nothing OrElse vcCodInt.Trim = "" Then vcCodInt = "001"
                vcCodInt = vcCodIntUsuario
                'vcCodInt = vcCodIntUsuario;
            Else
            End If


            'oUsuario = (ENT_SEG_Usuario)HttpContext.Current.Session["Usuario"];
            Organizacion = New BL_GEN_Organizacion()
            Dim lstOrganizacion As New List(Of ENT_GEN_Organizacion)()
            Dim lstOrganizacion2 As New List(Of ENT_GEN_Organizacion)()

            If inTip = "0" Then
                lstOrganizacion2 = Organizacion.ListarDependencia(vcCodInt, Convert.ToBoolean(btIncDep), Convert.ToInt32(inCodEst))
            Else
                'lstOrganizacion2 = Organizacion.ListarPorCodigoPorNombre(vcValBus, Convert.ToInt32(inCodEst), oUsuario.F_vcCodInt);  //descomentar luego
                lstOrganizacion2 = Organizacion.ListarPorCodigoPorNombre(vcValBus, Convert.ToInt32(inCodEst))
            End If
            If Not String.IsNullOrEmpty(vcCodInt) Then
                Dim oENT_GEN_Organizacion As ENT_GEN_Organizacion = Organizacion.ObtieneOrganizacion(vcCodInt)
                oENT_GEN_Organizacion.btVig = True
                oENT_GEN_Organizacion.vcCodInt = vcCodInt
                lstOrganizacion.Add(oENT_GEN_Organizacion)
            End If
            lstOrganizacion.AddRange(lstOrganizacion2)

            Return (lstOrganizacion)
        Catch ex As Exception
            Dim util As New ClaseUtilitarios()
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil)
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try

    End Function

    <WebMethod()> _
    Public Shared Function ListarEmpleado(vcCodInt As String, btIncDep As String, inCodEst As String, vcValBus As String, inTip As String) As List(Of ENT_GEN_Empleado)
        Dim Empleado As BL_GEN_Empleado = Nothing
        'ENT_SEG_Usuario oUsuario = null;
        Try
            'oUsuario = (ENT_SEG_Usuario)HttpContext.Current.Session["Usuario"];               
            Empleado = New BL_GEN_Empleado()
            Dim lstEmpleado As New List(Of ENT_GEN_Empleado)()

            If inTip = "0" Then
                lstEmpleado = Empleado.ListarPorOrganizacion(vcCodInt, Convert.ToBoolean(btIncDep), Convert.ToInt32(inCodEst))
            Else
                'lstEmpleado = Empleado.ListarPorNombrePorCodigo(vcValBus, Convert.ToInt32(inCodEst), oUsuario.F_vcCodInt);
                'comentar luego
                lstEmpleado = Empleado.ListarPorNombrePorCodigo(vcValBus, Convert.ToInt32(inCodEst), "1")
            End If
            Return lstEmpleado
        Catch ex As Exception
            Dim util As New ClaseUtilitarios()
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil)
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try

    End Function

    '[WebMethod()]
    'public static List<ENT_MOV_Linea> ListarLinea(string vcCodInt, string btIncDep, string inCodEst, string vcValBus, string inTip)
    '{
    '    //BL_MOV_Linea Linea = null;  //descomentar
    '    //ENT_SEG_Usuario oUsuario = null;

    '    try
    '    {
    '        oUsuario = (ENT_SEG_Usuario)HttpContext.Current.Session["Usuario"];
    '        Linea = new BL_MOV_Linea(oUsuario.IdCliente);
    '        List<ENT_MOV_Linea> lstLinea = new List<ENT_MOV_Linea>();
    '        if (inTip == "0")
    '        {
    '            lstLinea = Linea.ListarPorOrganizacion(vcCodInt, Convert.ToBoolean(btIncDep), Convert.ToInt32(inCodEst));
    '        }
    '        else
    '        {
    '            lstLinea = Linea.ListarPorLineaPorEmpleado(vcValBus, Convert.ToInt32(inCodEst), oUsuario.F_vcCodInt);
    '        }
    '        return lstLinea;
    '    }
    '    catch (Exception ex)
    '    {
    '        ClaseUtilitarios util = new ClaseUtilitarios();
    '        util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil);
    '        Throw New Exception(UtilitarioWeb.MensajeError);
    '    }

    '}


End Class