Imports VisualSoft.Comun.Utilitarios
Imports System.Data
Imports System.Web.Script.Serialization
Imports System.IO
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Suite80.BE
Imports VisualSoft.PCSistelMovil.General.BE

Partial Class P_Movil_Administrar_Mantenimiento_Mnt_DetalleDispositivoServicio
   Inherits System.Web.UI.Page

   Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
      Try
         If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
            Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
         Else
            If Not IsPostBack Then
               Dim vcCodDis As String = Request.QueryString("CodDis")
               hdfServ.Value = Request.QueryString("serv")
               Dim Dispositivo As New BL_MOV_Dispositivo(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
               Dim oDispositivo As New ENT_MOV_Dispositivo
               oDispositivo = Dispositivo.MostrarDatosSolicitudModelo(vcCodDis)

               Dim ModeloDispositivo As BL_MOV_ModeloDispositivo = New BL_MOV_ModeloDispositivo(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
               Dim oModeloDispositivo As DataTable = ModeloDispositivo.Mostrar(oDispositivo.ModeloDispositivo.P_inCod).Tables(0)
               ModeloDispositivo.Dispose()
               Dim dtDistositivo As New DataTable()
               dtDistositivo = Dispositivo.Mostrar(vcCodDis)
               Dispositivo.Dispose()

               'DATOS DE LA LINEA
               Dim dtLinea As New DataTable()
               Dim Linea As BL_MOV_Linea = New BL_MOV_Linea(CType(Session("Usuario"), ENT_SEG_Usuario).IdCliente)
               dtLinea = Linea.MostrarPorCodIMEI(dtDistositivo.Rows(0)("P_vcCodIMEI").ToString())

               If dtLinea.Rows.Count > 0 Then
                  lblNumero.Text = dtLinea.Rows(0)("P_vcNum").ToString()
                  lblRPM.Text = dtLinea.Rows(0)("rpm").ToString()
                  lblMinutosAsignados.Text = dtLinea.Rows(0)("inMin").ToString()
               End If
               '-------------------------------------------------------------------------

               Dim oSerializer As New JavaScriptSerializer
               lblModeloDispositivo.Text = oModeloDispositivo(0)("vcNom").ToString() 'MOSTRAR MODELO DISPOSITIVO
               'MOSTRANDO ESTADO DE DISPOSITIVO
               If Convert.ToBoolean(oModeloDispositivo(0)("btVig")) Then
                  lblEstado.Text = "Activo"
               Else
                  lblEstado.Text = "Inactivo"
                    End If

                    Dim CarpetaDominio As String = UtilitarioWeb.ObtenerCarpetaDominio(Server.MapPath("~/Images/ModeloDispositivo/"), "/")
                    
               'MOSTRAR IMAGEN DEL DISPOSITIVO
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
               'MOSTRAR SERVICIOS
               Dim oLineaDS As DataSet = Linea.Mostrar(dtLinea.Rows(0)("P_vcNum").ToString())
               Dim lstServicio As New List(Of ENT_GEN_Servicio)
               For Each dr As DataRow In oLineaDS.Tables(1).Rows
                  Dim oServicio As New ENT_GEN_Servicio()
                  If Not IsDBNull(dr("P_F_inCodTipSer")) Then
                     oServicio.P_inCod = UtilitarioWeb.ComprobarIntNULL(dr("P_F_inCodTipSer"), -1)
                     oServicio.vcNom = UtilitarioWeb.ComprobarStringNULL(dr("vcNomTipoSer"), "")
                     oServicio.inCodTipDat = 2
                  Else
                     oServicio.P_inCod = UtilitarioWeb.ComprobarIntNULL(dr("P_F_inCodSer"), -1)
                     oServicio.vcNom = UtilitarioWeb.ComprobarStringNULL(dr("vcNomSer"), "")
                     oServicio.inCodTipDat = 1
                  End If
                  oServicio.dcCan = UtilitarioWeb.ComprobarDecimalNULL(dr("dcCan"), 0)
                  lstServicio.Add(oServicio)
               Next
               If oLineaDS.Tables(1).Rows.Count > 0 Then
                  Dim oSerial As New JavaScriptSerializer
                  hdfServicio.Value = oSerial.Serialize(lstServicio)
               End If
               Linea.Dispose()

            End If
            UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
         End If
      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      End Try
   End Sub

End Class
