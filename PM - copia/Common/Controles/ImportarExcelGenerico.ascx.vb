Imports VisualSoft.Comun.Utilitarios
Imports VisualSoft.Suite80.BE
Imports Utilitario
Imports System.Data
Imports System.IO
Imports System.Web.Services
Imports System.Web.Script.Services
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Comun.Proceso.BE
Imports VisualSoft.Comun.Proceso.BL
Imports VisualSoft.Comun.Proceso.Procesos

Partial Class Common_Controles_ImportarExcelGenerico
    Inherits System.Web.UI.UserControl



    Protected Sub Common_Controles_ImportarExcelGenerico_Load(sender As Object, e As System.EventArgs) Handles Me.Load


        If IsNothing(Session("Usuario")) Then
            'Dim script As String = "window.parent.location.reload()"
            Dim script As String = "window.top.location.reload();"
            Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
        Else

            Dim origen As String = Request.QueryString("ori")
            Dim destino As String = Request.QueryString("dest")
            Dim ruta As String = Request.QueryString("rut")
            'If origen IsNot Nothing AndAlso origen <> "" AndAlso destino IsNot Nothing AndAlso destino <> "" Then
            '    Dim funciones As New ProcesosFunciones()
            '    Try
            '        funciones.Proceso_General(CInt(origen), CInt(destino))
            '    Catch ex As Exception
            '        'Me.obteniendoPlant.Attributes.Add("style", "display:none")
            '        'Me.obteniendoPlant.Style.Add("display", "none")
            '        'Me.obteniendoPlant.Style("display") = "none"
            '        'Page.ClientScript.RegisterStartupScript(Me.GetType(), "myScript", "<script>javascript: document.getElementById('" + Me.obteniendoPlant.ClientID + "').style.display = 'none';</script>")
            '    End Try
            '    Exit Sub
            'Else
            '    If ruta IsNot Nothing AndAlso ruta <> "" Then
            '        Dim imgStream As Stream = FileUpload1.PostedFile.InputStream
            '        Dim imgLen As Integer = FileUpload1.PostedFile.ContentLength
            '        Dim imgBinaryData(imgLen) As Byte
            '        Dim n As Integer = imgStream.Read(imgBinaryData, 0, imgLen)
            '        'Dim strfn As String = Server.MapPath("~/Images/ModeloDispositivo/Modelo" & hdfArchivo.Value & ".jpg")
            '        Dim strfn As String = ruta
            '        Dim fs As FileStream = New FileStream(strfn, FileMode.OpenOrCreate, FileAccess.Write)
            '        fs.Write(imgBinaryData, 0, imgBinaryData.Length)
            '        fs.Flush()
            '        fs.Close()
            '    End If
            'End If


            If Not Page.IsPostBack Then

                Dim nombreTabla As String = Request.QueryString("vcTab")
                hdfNombreEntidad.Value = nombreTabla

                'Dim plantilla As List(Of ENT_PCS_IMP_Plantilla) = BL_PCS_IMP_Plantilla.Instance(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente).Listar_x_EntidadOrigenDestino(nombreTabla)
                'For Each plant As ENT_PCS_IMP_Plantilla In plantilla
                '    Me.ddlPlantillas.Items.Add(New ListItem(plant.Nombre, plant.IdPlantilla.ToString() _
                '                                              + "|" + plant.IdConfigProcesoOrigen.ToString() _
                '                                              + "|" + plant.IdConfigProcesoDestino.ToString() _
                '                                              + "|" + plant.IdConfigProcesoOrigen_Procesar.ToString() _
                '                                              + "|" + plant.IdConfigProcesoDestino_Procesar.ToString() _
                '                                              + "|" + plant.Ruta.ToString()))
                'Next

                IncrustarJavaScript()
            End If

            'UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
            'UtilitarioWeb.AgregarScriptJqueryUI(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
        End If
    End Sub

#Region "Scripts"

    Private Sub IncrustarJavaScript()

        Dim sbScript As New StringBuilder
        sbScript.AppendLine("$(document).ready(function () {")
        sbScript.AppendLine(" fnInicializarObjetos_" & Me.ClientID & "(); ")
        sbScript.AppendLine("});")

        sbScript.AppendLine(Script_InicializarObjetos())
        sbScript.AppendLine(ObtieneScript_fnObtenerPlantilla())
        'sbScript.AppendLine(ObtieneScript_fnCargarExcel())

        'sbScript.AppendLine(" function MostrarOcultarDiv(){  $('#" + Me.obteniendoPlant.ClientID + "').css('display','none'); }    ")

        Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey_ImportExcelObjetosJavaScript_" & Me.ClientID, sbScript.ToString, True)
    End Sub

    Private Function Script_InicializarObjetos() As String
        Dim sbScript As New StringBuilder

        sbScript.AppendLine("function fnInicializarObjetos_" & Me.ClientID & "() { ")
        sbScript.AppendLine(" $('.btnButton').button(); ")
        sbScript.AppendLine(" var Titulo = 'Importar datos'; ")
        sbScript.AppendLine(" $('#" & pnlImportar.ClientID & "').dialog({ ")
        sbScript.AppendLine(" width: 560, ")
        sbScript.AppendLine(" height: 330, ")
        sbScript.AppendLine(" title: Titulo, ")
        sbScript.AppendLine(" modal: true, ")
        sbScript.AppendLine(" autoOpen: false ")
        sbScript.AppendLine(" }); ")

        sbScript.AppendLine(" $('#" + btnExportarExcel.ClientID + "').click(function(){  ")
        sbScript.AppendLine(" $('#" & ifImportarExcel.ClientID & "').attr('src', 'Adm_ImportarExcelGenerico.aspx?vcTab=" + Me.hdfNombreEntidad.Value + "' ) ")
        sbScript.AppendLine(" $('#" & pnlImportar.ClientID & "').dialog('open'); ")
        sbScript.AppendLine(" }); ")

        'sbScript.AppendLine(" $('#" + btnObtenerPlantilla.ClientID + "').click(function(){  ")
        'sbScript.AppendLine(" fnObtenerPlantilla_" + Me.ClientID + "() ")
        'sbScript.AppendLine(" }); ")

        'sbScript.AppendLine(" $('#" + btnCargar.ClientID + "').click(function(){  ")
        'sbScript.AppendLine(" fnCargarExcel_" + Me.ClientID + "() ")
        'sbScript.AppendLine(" }); ")

        sbScript.AppendLine(" }; ")

        Return sbScript.ToString()
    End Function

    Private Function ObtieneScript_fnObtenerPlantilla() As String
        Dim sbScript As New StringBuilder

        sbScript.AppendLine(" function fnObtenerPlantilla_" + Me.ClientID + "(){ ")

        'sbScript.AppendLine(" var Origen_" + Me.ClientID + " = $('#" + Me.ddlPlantillas.ClientID + "').val().split('|')[1]")
        'sbScript.AppendLine(" var Destino_" + Me.ClientID + " = $('#" + Me.ddlPlantillas.ClientID + "').val().split('|')[2]")

        'sbScript.AppendLine(" var Metodo = raiz('Common/WebService/General.asmx/ObtenerPlantillaExcel');")
        'sbScript.AppendLine(" $.ajax({ ")
        'sbScript.AppendLine("     url: Metodo, //PageMethod")
        'sbScript.AppendLine("     data: " & Chr(34) & "{'ConfigOrigen':'" & Chr(34) & " + Origen_" + Me.ClientID + " + " & Chr(34) & "'," & Chr(34) & " +  ")
        'sbScript.AppendLine("     " & Chr(34) & "'ConfigDestino':'" & Chr(34) & " + Destino_" + Me.ClientID + " + " & Chr(34) & "'," & Chr(34) & " +  ")
        'sbScript.AppendLine("     " & Chr(34) & "'EsCondata':true}" & Chr(34) & ", ")
        'sbScript.AppendLine("     dataType: 'json',")
        'sbScript.AppendLine("     type: 'post',")
        'sbScript.AppendLine("     contentType: 'application/json; charset=utf-8',")
        'sbScript.AppendLine("     success: function (result) {")
        'sbScript.AppendLine("         alert(result.d);")
        'sbScript.AppendLine("         ")
        'sbScript.AppendLine("     },")
        'sbScript.AppendLine("     error: function (xhr, err, thrErr) {")
        'sbScript.AppendLine("         MostrarErrorAjax(xhr, err, thrErr);")
        'sbScript.AppendLine("     }")
        'sbScript.AppendLine(" });")

        'sbScript.AppendLine(" $('#" + Me.obteniendoPlant.ClientID + "').css('display','block'); ")
        sbScript.AppendLine("   window.location.href = window.location.href + '&ori='+ Origen_" + Me.ClientID + " +'&dest='+ Destino_" + Me.ClientID + ";")
        sbScript.AppendLine(" }; ")

        Return sbScript.ToString

    End Function

    Private Function ObtieneScript_fnCargarExcel() As String
        Dim sbScript As New StringBuilder

        sbScript.AppendLine(" function fnCargarExcel_" + Me.ClientID + "(){ ")

        'sbScript.AppendLine(" var ruta_" + Me.ClientID + " = $('#" + Me.ddlPlantillas.ClientID + "').val().split('|')[5]; ")
        'sbScript.AppendLine(" alert(ruta_" + Me.ClientID + ");")

        sbScript.AppendLine("   window.location.href = window.location.href + '&rut='+ ruta_" + Me.ClientID + ";")
        sbScript.AppendLine(" }; ")

        Return sbScript.ToString

    End Function
#End Region

    'Protected Sub btnCargar_Click(sender As Object, e As System.EventArgs) Handles btnCargar.Click
    '    Dim imgStream As Stream = FileUpload1.PostedFile.InputStream

    '    Dim imgLen As Integer = FileUpload1.PostedFile.ContentLength
    '    Dim imgBinaryData(imgLen) As Byte
    '    Dim n As Integer = imgStream.Read(imgBinaryData, 0, imgLen)
    '    'Dim strfn As String = Server.MapPath("~/Images/ModeloDispositivo/Modelo" & hdfArchivo.Value & ".jpg")
    '    Dim strfn As String = ""
    '    Dim fs As FileStream = New FileStream(strfn, FileMode.OpenOrCreate, FileAccess.Write)
    '    fs.Write(imgBinaryData, 0, imgBinaryData.Length)
    '    fs.Flush()
    '    fs.Close()
    'End Sub
End Class
