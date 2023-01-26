Imports VisualSoft.Suite80.BE
Imports System.Web.Services
Imports VisualSoft.Suite80.BL
Imports System.Data
Imports VisualSoft.Comun.Utilitarios
Imports System.Web.Script.Serialization
Imports VisualSoft.PCSistelMovil.General.BE

Partial Class P_Movil_Consultar_Con_SumarioGrafico
   Inherits System.Web.UI.Page

   Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
      Try
         If IsNothing(Session("Usuario")) Then
                'Dim script As String = "window.parent.location.reload()"
                Dim script As String = "window.top.location.reload();"
            Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
         Else
            If Not IsPostBack Then
               hdfTipoSumario.Value = Request.QueryString("Tipo")
               hdfValorSumario.Value = Request.QueryString("Valor")
            End If
            UtilitarioWeb.AgregarTema(Server, Page.Header, CType(Session("Usuario"), ENT_SEG_Usuario).CaracteristicaUsuario.vcTem)
         End If
      Catch ex As Exception
         Dim util As New Utilitarios
         util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
         Throw New Exception(UtilitarioWeb.MensajeError)
      End Try
   End Sub

   Private Shared Function obtenerJsonChart(ByVal tabla As DataTable, ByVal prEjex As String, ByVal prEjey As String, ByVal prTitulo As String, ByVal prNumeroPrefijo As String, _
                                            ByVal prEtiquetaData As String, ByVal prValorData As String, Optional prConcatenar As String = "") As String

        Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)
        Dim cadenaJson As String = """caption"":""{0}"",""xaxisname"":""{1}"",""yaxisname"":""{2}"", ""numberprefix"":""{3}"", ""formatNumberScale"":""0"""
        cadenaJson = cadenaJson + ",""formatNumber"":""1"",""showvalues"":""0"",""decimalSeparator"":""" + oCultura.vcSimDec + """,""thousandSeparator"":""" + oCultura.vcSimSepMil + """, ""showlegend"":""1" + """,""decimals"":""" + oCultura.dcNumDec.ToString() + """" 'formato de numeros
      Dim dataJson As String = """label"":""{0}"",""value"":""{1}"""
      Dim listaDatos As New List(Of String)

      For i = 0 To tabla.Rows.Count - 1
         Dim data As String = "{"
         data = data & String.Format(dataJson, If(prConcatenar = "", tabla.Rows(i).Item(prEtiquetaData), tabla.Rows(i).Item(prEtiquetaData).ToString() + " (" + tabla.Rows(i).Item(prConcatenar).ToString() + ")"), tabla.Rows(i).Item(prValorData))
         data = data & "}"
         listaDatos.Add(data)
      Next

      cadenaJson = "{""chart"":{" + String.Format(cadenaJson, prTitulo, prEjex, prEjey, prNumeroPrefijo) + " },""data"":["

      Return cadenaJson + String.Join(",", listaDatos) + "]}"
   End Function

   <WebMethod()>
   Public Shared Function ListarSumario(ByVal oCriterio As String, ByVal inNumReg As String, ByVal inTipDat As String, ByVal inTipSum As String, ByVal vcValSum As String) As Object
      Try
         Dim Llamada As BL_MOV_IMP_Llamada = New BL_MOV_IMP_Llamada(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
         Dim oSerializer As New JavaScriptSerializer
         Dim v_oCriterio As ENT_MOV_IMP_Criterio = oSerializer.Deserialize(Of ENT_MOV_IMP_Criterio)(oCriterio)
         Dim vcNomCam As String = ""
         Dim vcNomCam2 As String = ""
         Dim vcValCam As String = ""
         Dim dt As New DataTable
         Dim vcTit As String = ""
         Dim vcSubTit1 As String = ""
         Dim vcSubTit2 As String = ""
         Dim vcCodInt As String = CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).F_vcCodInt
         Dim ejex As String = ""

         Dim oCultura As ENT_GEN_Cultura = CType(HttpContext.Current.Session("Cultura"), ENT_GEN_Cultura)

         Select Case Convert.ToInt32(inTipSum)
            Case 1 'Organizacion Nivel
               dt = Llamada.ListarSumarioPorOrganizacionNivel(v_oCriterio, Convert.ToInt32(inNumReg), _
                                                              Convert.ToInt32(inTipDat), Convert.ToInt32(vcValSum), vcCodInt)
               vcNomCam = "ORGA_P_inCODINT"
               vcNomCam2 = "ORGA_vcNOMORG"
               vcTit = "Top - Sumario Por Organización Por Nivel"
               vcSubTit1 = "Detalle Por Organización"
               vcSubTit2 = "Detalle De Globales De La Organización"
               ejex = "Organización Nivel"
            Case 2 'Organizacion Area
               dt = Llamada.ListarSumarioPorOrganizacionArea(v_oCriterio, Convert.ToInt32(inNumReg), Convert.ToInt32(inTipDat), Convert.ToInt32(vcValSum), vcCodInt)
               vcNomCam = "ORGA_P_inCODINT"
               vcNomCam2 = "ORGA_vcNOMORG"
               vcTit = "Top - Sumario Por Organización Por Área"
               vcSubTit1 = "Detalle Por Organización"
               vcSubTit2 = "Detalle De Globales De La Organización"
               ejex = "Organización Área"
            Case 3 'Linea
               dt = Llamada.ListarSumarioPorLinea(v_oCriterio, Convert.ToInt32(inNumReg), Convert.ToInt32(inTipDat), vcCodInt)
               vcNomCam = "LLAM_P_vcCODEXT"
               vcNomCam2 = "LLAM_vcNOMEMP"
               vcTit = "Top - Sumario Por Líneas"
               vcSubTit1 = "Detalle Por Línea"
               vcSubTit2 = "Detalle De Globales De La Línea"
               ejex = "Linea"
            Case 4 ' Empleado
               dt = Llamada.ListarSumarioPorEmpleado(v_oCriterio, Convert.ToInt32(inNumReg), Convert.ToInt32(inTipDat), vcCodInt)
               vcNomCam = "LLAM_vcCODEMP"
               vcNomCam2 = "LLAM_vcNOMEMP"
               vcTit = "Top - Sumario Por Empleados"
               vcSubTit1 = "Detalle Por Empleado"
               vcSubTit2 = "Detalle De Globales Del Empleado"
               ejex = "Empleado"
            Case 5 'Centro de costo
               dt = Llamada.ListarSumarioPorCentroCosto(v_oCriterio, Convert.ToInt32(inNumReg), Convert.ToInt32(inTipDat), vcCodInt)
               vcNomCam = "CCOS_P_vcCODCCO"
               vcNomCam2 = "CCOS_vcNOMCCO"
               vcTit = "Top - Sumario Por Centro De Costo"
               vcSubTit1 = "Detalle Por Centro De Costo"
               vcSubTit2 = "Detalle De Globales Del Centro De Costo"
               ejex = "Centro de costo"
            Case 6 ' Numero
               dt = Llamada.ListarSumarioPorNumero(v_oCriterio, Convert.ToInt32(inNumReg), Convert.ToInt32(inTipDat), vcCodInt)
               vcNomCam = "LLAM_P_vcNUMTEL"
               vcNomCam2 = "LLAM_vcNOMTEL"
               vcTit = "Top - Sumario Por Números"
               vcSubTit1 = "Detalle Por Número"
               vcSubTit2 = "Detalle De Globales Del Número"
               ejex = "Número"
            Case 7 'Frecuencia llamada
               dt = Llamada.ListarSumarioPorFrecuenciaLlamada(v_oCriterio, Convert.ToInt32(inNumReg), Convert.ToInt32(inTipDat), vcCodInt)
               vcNomCam = "LLAM_P_vcNUMTEL"
               vcNomCam2 = "LLAM_vcNOMTEL"
               vcTit = "Top - Sumario Por Frecuencia llamada"
               vcSubTit1 = "Detalle Por Frecuencia llamada"
               vcSubTit2 = "Detalle De Globales De La Frecuencia llamada"
               ejex = "Frecuencia llamada"
            Case 8 'Operador
               dt = Llamada.ListarSumarioPorOperador(v_oCriterio, Convert.ToInt32(inNumReg), Convert.ToInt32(inTipDat), vcCodInt)
               vcNomCam = "COMP_vcNOMCIA"
               vcNomCam2 = ""
               vcTit = "Top - Sumario Por Operador"
               vcSubTit1 = "Detalle Por Operador"
               vcSubTit2 = "Detalle De Globales Del Operador"
               ejex = "Operador"
            Case 9 'Pais
               dt = Llamada.ListarSumarioPorPais(v_oCriterio, Convert.ToInt32(inNumReg), Convert.ToInt32(inTipDat), vcCodInt)
               vcNomCam = "LLAM_vcCODPAI"
               vcNomCam2 = "PAIS_vcNOMPAI"
               vcTit = "Top - Sumario Por Países"
               vcSubTit1 = "Detalle Por País"
               vcSubTit2 = "Detalle De Globales Del País"
               ejex = "País"
            Case 10 'Ciudad
               dt = Llamada.ListarSumarioPorCiudad(v_oCriterio, Convert.ToInt32(inNumReg), Convert.ToInt32(inTipDat), Convert.ToInt32(vcValSum), vcCodInt)
               vcNomCam = "LLAM_vcCODPAI"
               vcNomCam2 = "CIUD_vcNOMCIU"
               vcTit = "Top - Sumario Por Ciudades"
               vcSubTit1 = "Detalle Por Ciudad"
               vcSubTit2 = "Detalle De Globales De La Ciudad"
               ejex = "Ciudad"
            Case 11 'Fecha
               dt = Llamada.ListarSumarioPorFecha(v_oCriterio, Convert.ToInt32(inNumReg), Convert.ToInt32(inTipDat), vcCodInt)
               vcNomCam = "vcFec"
               vcNomCam2 = ""
               vcTit = "Top - Sumario Por Fechas"
               vcSubTit1 = "Detalle Por Fecha"
               vcSubTit2 = "Detalle De Globales De La Fecha"
               ejex = "Fecha"
            Case 12 'Hora
               dt = Llamada.ListarSumarioPorHora(v_oCriterio, Convert.ToInt32(inNumReg), Convert.ToInt32(inTipDat), vcCodInt)
               vcNomCam = "vcHor"
               vcNomCam2 = ""
               vcTit = "Top - Sumario Por Horas"
               vcSubTit1 = "Detalle Por Hora"
               vcSubTit2 = "Detalle De Globales De La Hora"
               ejex = "Hora"
         End Select
         Llamada.Dispose()
         Dim dict As New Dictionary(Of String, Object)
         Dim dictCosto As New Dictionary(Of String, Object)
         Dim dictDuracion As New Dictionary(Of String, Object)
         Dim dictLlamada As New Dictionary(Of String, Object)
         Dim dictDatosDetalleCosto As New Dictionary(Of String, Object)
         Dim dictDatosDetalleDuracion As New Dictionary(Of String, Object)
         Dim dictDatosDetalleLlamada As New Dictionary(Of String, Object)

            If inTipSum = 3 Or inTipSum = 6 Or inTipSum = 7 Then
                dt = ordernarTabla(dt, "dcCosLlatot")
                dictCosto.Add("Datos", obtenerJsonChart(dt, ejex, "Costo (" + oCultura.Moneda.vcSimMon + ")", vcTit, "", vcNomCam2, "dcCosLlaTot", vcNomCam)) '(From entry In dictDatosCosto Order By entry.Value Descending).ToDictionary(Function(pair) pair.Key, Function(pair) pair.Value))

                dt = ordernarTabla(dt, "vcDurLlaTot")
                dictDuracion.Add("Datos", obtenerJsonChart(dt, ejex, "Duración (Min.)", vcTit, "", vcNomCam2, "inDurReaLlaTot", vcNomCam)) '(From entry In dictDatosDuracion Order By entry.Value Descending).ToDictionary(Function(pair) pair.Key, Function(pair) pair.Value))

                If inTipDat = 3 Then dt = ordernarTabla(dt, "inNumLlaTot") Else dt = ordernarTabla(dt, "inDurReaLlaTot")
                dictLlamada.Add("Datos", obtenerJsonChart(dt, ejex, "Cantidad", vcTit, "", vcNomCam2, "inNumLlaTot", vcNomCam)) '(From entry In dictDatosLlamada Order By entry.Value Descending).ToDictionary(Function(pair) pair.Key, Function(pair) pair.Value))
            Else
                vcValCam = vcNomCam
                If vcNomCam2 <> "" Then
                    vcValCam = vcNomCam2
                End If

                dt = ordernarTabla(dt, "dcCosLlatot")
                dictCosto.Add("Datos", obtenerJsonChart(dt, ejex, "Costo (" + oCultura.Moneda.vcSimMon + ")", vcTit, "", vcValCam, "dcCosLlaTot")) '(From entry In dictDatosCosto Order By entry.Value Descending).ToDictionary(Function(pair) pair.Key, Function(pair) pair.Value))

                dt = ordernarTabla(dt, "vcDurLlaTot")
                dictDuracion.Add("Datos", obtenerJsonChart(dt, ejex, "Duración (Min.)", vcTit, "", vcValCam, "inDurReaLlaTot")) '(From entry In dictDatosDuracion Order By entry.Value Descending).ToDictionary(Function(pair) pair.Key, Function(pair) pair.Value))

                If inTipDat = 3 Then dt = ordernarTabla(dt, "inNumLlaTot") Else dt = ordernarTabla(dt, "inDurReaLlaTot")
                dictLlamada.Add("Datos", obtenerJsonChart(dt, ejex, "Cantidad", vcTit, "", vcValCam, "inNumLlaTot")) '(From entry In dictDatosLlamada Order By entry.Value Descending).ToDictionary(Function(pair) pair.Key, Function(pair) pair.Value))
            End If


            For Each oRow As DataRow In dt.Rows
                Dim dictDatosDetalleGlobalCosto As New Dictionary(Of String, Object)
                Dim dictDatosDetalleGlobalDuracion As New Dictionary(Of String, Object)
                Dim dictDatosDetalleGlobalLlamada As New Dictionary(Of String, Object)

                vcValCam = oRow(vcNomCam).ToString()
                If vcNomCam2 <> "" Then
                    vcValCam &= " - " & oRow(vcNomCam2).ToString()
                End If

                Dim dtGlobalCosto As DataTable = creaTabla("tbGlobalCosto")
                'CargarDatosTabla(dtGlobalCosto, "Local", String.Format("#.00", oRow("dcCosLlaLoc").ToString()))
                CargarDatosTabla(dtGlobalCosto, "Local", String.Format(UtilitarioWeb.DevuelveFormatoNumero(oCultura), oRow("dcCosLlaLoc").ToString()))
                CargarDatosTabla(dtGlobalCosto, "Celular", String.Format("#.00", oRow("dcCosLlaCel").ToString()))
                CargarDatosTabla(dtGlobalCosto, "DDN", String.Format("#.00", oRow("dcCosLlaDdn").ToString()))
                CargarDatosTabla(dtGlobalCosto, "DDI", String.Format("#.00", oRow("dcCosLlaDdi").ToString()))
                CargarDatosTabla(dtGlobalCosto, "SRCEL", String.Format("#.00", oRow("dcCosLlaSRCel").ToString()))

                Dim dtGlobalDuracion As DataTable = creaTabla("tbGlobalDuracion")
                CargarDatosTabla(dtGlobalDuracion, "Local", oRow("inDurReaLlaLoc").ToString())
                CargarDatosTabla(dtGlobalDuracion, "Celular", oRow("inDurReaLlaCel").ToString())
                CargarDatosTabla(dtGlobalDuracion, "DDN", oRow("inDurReaLlaDdn").ToString())
                CargarDatosTabla(dtGlobalDuracion, "DDI", oRow("inDurReaLlaDdi").ToString())

                Dim dtGlobalLlamada As DataTable = creaTabla("tbGlobalLlamada")
                CargarDatosTabla(dtGlobalLlamada, "Local", oRow("inNumLlaLoc").ToString())
                CargarDatosTabla(dtGlobalLlamada, "Celular", oRow("inNumLlaCel").ToString())
                CargarDatosTabla(dtGlobalLlamada, "DDN", oRow("inNumLlaDdn").ToString())
                CargarDatosTabla(dtGlobalLlamada, "DDI", oRow("inNumLlaDdi").ToString())

                dictDatosDetalleCosto.Add(vcValCam, obtenerJsonChart(dtGlobalCosto, "Globales", "Costo", vcTit, oCultura.Moneda.vcSimMon, "global", "valor"))
                dictDatosDetalleDuracion.Add(vcValCam, obtenerJsonChart(dtGlobalDuracion, "Globales", "Duración", vcTit, "Min.", "global", "valor"))
                dictDatosDetalleLlamada.Add(vcValCam, obtenerJsonChart(dtGlobalLlamada, "Globales", "Cantidad", vcTit, "", "global", "valor"))
            Next

            dictCosto.Add("DatosDetalle", dictDatosDetalleCosto)
            dictDuracion.Add("DatosDetalle", dictDatosDetalleDuracion)
            dictLlamada.Add("DatosDetalle", dictDatosDetalleLlamada)

            dict.Add("1", dictCosto)
            dict.Add("2", dictDuracion)
            dict.Add("3", dictLlamada)

            Return dict
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try
   End Function

   Private Shared Function creaTabla(ByVal nombre As String) As DataTable
      Dim dt As New DataTable(nombre)
      dt.Columns.Add("global", Type.GetType("System.String"))
      dt.Columns.Add("valor", Type.GetType("System.String"))
      Return dt
   End Function

   Private Shared Sub CargarDatosTabla(ByVal dtGlobal As DataTable, ByVal globalServ As String, ByVal valor As String)
      Dim row As DataRow
      'Create a new DataRow.
      row = dtGlobal.NewRow()
      dtGlobal.Rows.Add(row)
      dtGlobal.AcceptChanges()
      row("global") = globalServ
      row("valor") = valor
    End Sub

    Private Shared Function ordernarTabla(ByVal tabla As DataTable, ByVal NombreCampo As String) As DataTable
        Dim existeCampo As Boolean = False
        Try

            For index = 0 To tabla.Columns.Count - 1
                If tabla.Columns(index).ColumnName.ToUpper = NombreCampo.ToUpper Then
                    existeCampo = True
                    Exit For
                End If
            Next

            If Not existeCampo Then Return tabla

            tabla.DefaultView.Sort = NombreCampo + " desc"
            tabla = tabla.DefaultView.ToTable()

        Catch ex As Exception

        End Try

        Return tabla
    End Function
End Class