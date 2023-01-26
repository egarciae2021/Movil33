Imports VisualSoft.Suite80.BE
Imports System.Web.Services
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Comun.Utilitarios
Imports System.IO
Imports System.Data

Partial Class P_Movil_Administrar_Mantenimiento_Mnt_ImagenCarga
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(sender As Object, e As System.EventArgs) Handles Me.Load

        Try
            UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
        Catch
        End Try

        Dim P_inCod As String = Request.QueryString("md")
        hdfArchivo.Value = Request.QueryString("vcArc")

        Dim CarpetaDominio As String = UtilitarioWeb.ObtenerCarpetaDominio(Server.MapPath("~/Images/ModeloDispositivo/"), "/")
        
        'If Not IsNothing(P_inCod) Then
        If (P_inCod <> "") Then
            Dim ModeloDispositivo As BL_MOV_ModeloDispositivo = new BL_MOV_ModeloDispositivo(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            Dim oModeloDispositivo As DataTable = ModeloDispositivo.Mostrar(Integer.Parse(P_inCod)).Tables(0)
         ModeloDispositivo.Dispose()
            If Not IsDBNull(oModeloDispositivo(0)("imIma")) Then
                Dim nd As Date = Date.Now
                Dim varHora As String = nd.Hour.ToString + nd.Minute.ToString + nd.Second.ToString + nd.Millisecond.ToString
                Dim barrImg As Byte() = CType(oModeloDispositivo(0)("imIma"), Byte())
                Dim archivo As String = varHora & "-" & oModeloDispositivo(0)("P_inCod").ToString & ".jpg"
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
        Else
            imgImagen.Width = 150
            imgImagen.Height = 150
            imgImagen.Src = "../../../Common/Images/Mantenimiento/NoDisponible.jpg"
            imgImagen.Alt = "Imagen no disponible"
        End If
    End Sub

    Protected Sub btnCargar_Click(sender As Object, e As System.EventArgs) Handles btnCargar.Click
        Try
            Dim CarpetaDominio As String = UtilitarioWeb.ObtenerCarpetaDominio(Server.MapPath("~/Images/ModeloDispositivo/"), "/")
            
            Dim imgStream As Stream = fuArchivo.PostedFile.InputStream
            Dim imgLen As Integer = fuArchivo.PostedFile.ContentLength
            Dim imgBinaryData(imgLen) As Byte
            Dim n As Integer = imgStream.Read(imgBinaryData, 0, imgLen)
            Dim strfn As String = Server.MapPath("~/Images/ModeloDispositivo" + CarpetaDominio + "/Modelo" & hdfArchivo.Value & ".jpg")
            File.Delete(strfn)
            Dim fs As FileStream = New FileStream(strfn, FileMode.OpenOrCreate, FileAccess.Write)
            fs.Write(imgBinaryData, 0, imgBinaryData.Length)
            fs.Flush()
            fs.Close()

            imgImagen.Src = "../../../Images/ModeloDispositivo" + CarpetaDominio + "/Modelo" & hdfArchivo.Value & ".jpg"
            imgImagen.Alt = ""
            imgImagen.Width = 150
            imgImagen.Height = 150
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
    End Sub
End Class
