Imports VisualSoft.Suite80.BE
Imports VisualSoft.Suite80.BL
Imports VisualSoft.Comun.Proceso.BL
Imports VisualSoft.Comun.Proceso.BE
Imports VisualSoft.Comun.Proceso.Procesos
Imports System.Web.Services
Imports System.Data
Imports System.Web.Script.Serialization
Imports VisualSoft.Comun.Utilitarios

Partial Class General_Administrar_Proceso_General_Mnt_Plantilla
    Inherits System.Web.UI.Page

    Protected Sub General_Administrar_Proceso_General_Mnt_Plantilla_Load(sender As Object, e As System.EventArgs) Handles Me.Load
        Dim Plantilla As BL_PCS_IMP_Plantilla = Nothing
        Try
            Dim oUsuario As ENT_SEG_Usuario = CType(Session("Usuario"), ENT_SEG_Usuario)

            If Not IsPostBack Then

                Dim codigo As String = Request.QueryString("Cod")
                UtilitarioWeb.AgregarTema(Server, Page.Header, oUsuario.CaracteristicaUsuario.vcTem)

                If Not IsNothing(codigo) Then
                    hdfCodigo.Value = codigo
                    hdfAccion.Value = "UPD"
                    Plantilla = New BL_PCS_IMP_Plantilla(oUsuario.IdCliente)
                    Dim ePlantilla As New ENT_PCS_IMP_Plantilla
                    ePlantilla.IdPlantilla = codigo
                    Dim oPlantilla As List(Of ENT_PCS_IMP_Plantilla) = Plantilla.Listar_x_Codigo(ePlantilla)

                    If oPlantilla.Count <> 0 Then
                        txtnombre.Text = oPlantilla.ElementAt(0).Nombre.ToString().Trim()
                        txtdescripcion.Text = oPlantilla.ElementAt(0).Descripcion.ToString().Trim()
                        hdfEntidad.Value = oPlantilla.ElementAt(0).F_inEntidad
                        txtEntidad.Text = oPlantilla.ElementAt(0).vcDes.ToString().Trim()
                        txtEntidad.Enabled = False

                        txtposicionfila.Text = oPlantilla.ElementAt(0).PosicionFila
                        hdfTabla.Value = oPlantilla.ElementAt(0).vcTab.ToString().Trim()
                        txtIdentificador.Text = oPlantilla.ElementAt(0).NombreHoja.ToString().Trim()
                        txtSeparador.Text = oPlantilla.ElementAt(0).Separador.ToString().Trim()
                        'chActivo.Visible = True

                        If oPlantilla.ElementAt(0).btEst Then
                            chActivo.Checked = True
                            hdfEstado.Value = 1
                            trEstado.Style("display") = "none"
                        Else
                            chActivo.Checked = False
                            hdfEstado.Value = 0
                            trEstado.Style("display") = ""
                        End If

                        If oPlantilla.ElementAt(0).UsaLongProceso Then
                            hdfUsaLongProc.Value = 1
                        Else
                            hdfUsaLongProc.Value = 0
                        End If


                    Else
                        Dim script As String = ""
                        script += "alert('No se puede editar este registro porque es parte del Sistema');window.parent.tab.tabs('remove', window.parent.tab.tabs('option', 'selected'));"
                        Me.Page.ClientScript.RegisterStartupScript(Me.GetType, "ScriptKey", script, True)
                    End If
                Else
                    'hdfAccion.Value = "Guardar"
                    hdfAccion.Value = "INS"
                    chActivo.Visible = False
                    chActivo.Checked = True
                    hdfEstado.Value = ""
                    trEstado.Style("display") = "none"
                End If
            End If
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Not IsNothing(Plantilla) Then Plantilla.Dispose()
        End Try
    End Sub

    <WebMethod()>
    Public Shared Function Guardar(pCod As String, _
                                   pNom As String, _
                                   pDescripcion As String, _
                                   pEntidad As String, _
                                   pPosicionfila As String, _
                                   pIdentificador As String, _
                                   pSeparador As String, _
                                   pNombreCampo As List(Of String), _
                                   pTabla As List(Of String), _
                                   pAccion As List(Of String), _
                                   pId As List(Of String), _
                                   pPosicion As List(Of String), _
                                   pCampoIdent As List(Of String), _
                                   pLongitudCampo As List(Of Integer), _
                                   pUsoPrc As List(Of String), _
                                   pDescripcionCampo As List(Of String), _
                                   pFormatos As List(Of String), _
                                   pBtVig As Boolean) As String

        Dim Plantilla As BL_PCS_IMP_Plantilla = Nothing
        Dim Campo As BL_PCS_IMP_Campo = Nothing

        Try
            Dim vProceso As New ProcesosFunciones

            Dim ePlantilla As New ENT_PCS_IMP_Plantilla
            Plantilla = New BL_PCS_IMP_Plantilla(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)
            'Dim resultado As Integer
            'Dim resultado2 As Integer
            'Dim oPlantilla As List(Of ENT_PCS_IMP_Plantilla) = Plantilla.Listar_x_Valida_Nombre(pNom)

            ''Validacion (el nombre de la plantilla no sea repetido)
            'If oPlantilla.Count > 0 Then
            '    Return "2"
            'End If
            If pCod = "" Then
                ePlantilla.IdPlantilla = 0
            Else
                ePlantilla.IdPlantilla = Convert.ToInt32(pCod)
            End If

            ePlantilla.Descripcion = pDescripcion
            ePlantilla.F_inEntidad = pEntidad
            ePlantilla.IdCliente = 0
            ePlantilla.Nombre = pNom
            ePlantilla.NombreHoja = pIdentificador
            ePlantilla.PosicionFila = pPosicionfila
            ePlantilla.Separador = pSeparador
            ePlantilla.btEst = pBtVig

            Dim lista As New List(Of ENT_PCS_IMP_Campo)


            For i = 0 To pNombreCampo.Count - 1

                Dim eCampo As New ENT_PCS_IMP_Campo
                Dim lstInformacionCampo As List(Of ENT_Information_Schema_Columns) = vProceso.ObtenerInformacion_Campo_Tabla(pTabla.ElementAt(i).ToString(), pNombreCampo.ElementAt(i).ToString())

                For J = 1 To 10

                Next

                For Each infor As ENT_Information_Schema_Columns In lstInformacionCampo
                    eCampo.IdCliente = 0
                    eCampo.NombreCampo = infor.COLUMN_NAME
                    eCampo.DescripcionCampo = pDescripcionCampo.ElementAt(i)
                    eCampo.Servidor = "VISUALSOFT"
                    eCampo.BaseDatos = infor.TABLE_CATALOG
                    eCampo.Tabla = infor.TABLE_NAME
                    eCampo.Campo = infor.COLUMN_NAME
                    eCampo.Longitud = infor.CHARACTER_MAXIMUM_LENGTH
                    eCampo.Tipo = infor.DATA_TYPE
                    eCampo.Orden = infor.ORDINAL_POSITION
                    eCampo.ServidorForaneo = ""
                    eCampo.BaseDatosForanea = ""
                    eCampo.TablaForanea = ""
                    eCampo.CampoForaneo = infor.ForeignKey

                    If infor.PrimaryKey <> "" Then
                        eCampo.PrimaryKey = True

                    Else
                        eCampo.PrimaryKey = False
                    End If

                    If infor.IS_NULLABLE = "YES" Then
                        eCampo.PermiteNull = True
                    Else
                        eCampo.PermiteNull = False
                    End If

                    eCampo.Obligatorio = True
                    eCampo.isIdentity = infor.is_identity

                    If infor.COLUMN_DEFAULT <> "" Then
                        eCampo.isValorDefecto = True
                    Else
                        eCampo.isValorDefecto = False
                    End If

                    eCampo.ValorDefecto = infor.COLUMN_DEFAULT
                    If pUsoPrc.ElementAt(i) = "SI" Then
                        eCampo.UsoPrc = True
                    Else
                        eCampo.UsoPrc = False
                    End If

                    'eCampo.UsoPrc = True
                    eCampo.PosicionColumna = pPosicion.ElementAt(i)
                    eCampo.Identificador = pCampoIdent.ElementAt(i)
                    eCampo.LongitudCampoPlantilla = pLongitudCampo.ElementAt(i)

                    eCampo.Formato = pFormatos.ElementAt(i)
                Next

                lista.Add(eCampo)
                'If pAccion.ElementAt(i).ToString() = "INS" Then
                '    Dim CodPlantilla As List(Of ENT_PCS_IMP_Plantilla) = Plantilla.Listar_x_Valida_Nombre(pNom)
                '    eCampo.IdPlantilla = CodPlantilla.ElementAt(0).IdPlantilla
                '    resultado2 = Campo.Insertar(eCampo)

                'ElseIf pAccion.ElementAt(i).ToString() = "UPD" Then
                '    eCampo.IdCampo = pId.ElementAt(i).ToString()
                '    eCampo.IdPlantilla = Convert.ToInt32(pCod)
                '    resultado2 = Campo.Actualizar(eCampo)
                'End If

            Next
            Return Plantilla.Insertar(ePlantilla, lista)

            'If pCod = "" Then
            '    resultado = Plantilla.Insertar(ePlantilla)
            'If oPlantilla.Count = 0 Then
            '    resultado = Plantilla.Insertar(ePlantilla)
            'Else
            '    resultado = "2"
            'End If

            'Else
            'If oPlantilla.Count = 0 Or oPlantilla.Count = 1 Then
            'ePlantilla.IdPlantilla = pCod
            'resultado = Plantilla.Actualizar(ePlantilla)
            'Else
            '    resultado = "2"
            'End If
            'End If

            'If resultado = 0 Then

            '    Campo = New BL_PCS_IMP_Campo(CType(HttpContext.Current.Session("Usuario"), ENT_SEG_Usuario).IdCliente)

            '    For x = 0 To pEliminando.Count - 1

            '        If pEliminando.ElementAt(x).ToString() <> "" Or pEliminando.ElementAt(x).ToString() <> Nothing Then
            '            Dim iCampo As New ENT_PCS_IMP_Campo
            '            iCampo.IdCampo = pEliminando.ElementAt(x).ToString()
            '            Campo.Eliminar(iCampo)
            '        End If
            '    Next

            '    For i = 0 To pNombreCampo.Count - 1

            '        Dim eCampo As New ENT_PCS_IMP_Campo
            '        Dim lstInformacionCampo As List(Of ENT_Information_Schema_Columns) = vProceso.ObtenerInformacion_Campo_Tabla(pTabla.ElementAt(i).ToString(), pNombreCampo.ElementAt(i).ToString())
            '        For Each infor As ENT_Information_Schema_Columns In lstInformacionCampo
            '            eCampo.IdCliente = 0
            '            eCampo.NombreCampo = infor.COLUMN_NAME
            '            eCampo.DescripcionCampo = pDescripcionCampo.ElementAt(i)
            '            eCampo.Servidor = "VISUALSOFT"
            '            eCampo.BaseDatos = infor.TABLE_CATALOG
            '            eCampo.Tabla = infor.TABLE_NAME
            '            eCampo.Campo = infor.COLUMN_NAME
            '            eCampo.Longitud = infor.CHARACTER_MAXIMUM_LENGTH
            '            eCampo.Tipo = infor.DATA_TYPE
            '            eCampo.Orden = infor.ORDINAL_POSITION
            '            eCampo.ServidorForaneo = ""
            '            eCampo.BaseDatosForanea = ""
            '            eCampo.TablaForanea = ""
            '            eCampo.CampoForaneo = infor.ForeignKey

            '            If infor.PrimaryKey <> "" Then
            '                eCampo.PrimaryKey = True

            '            Else
            '                eCampo.PrimaryKey = False
            '            End If

            '            If infor.IS_NULLABLE = "YES" Then
            '                eCampo.PermiteNull = True
            '            Else
            '                eCampo.PermiteNull = False
            '            End If

            '            eCampo.Obligatorio = True
            '            eCampo.isIdentity = infor.is_identity

            '            If infor.COLUMN_DEFAULT <> "" Then
            '                eCampo.isValorDefecto = True
            '            Else
            '                eCampo.isValorDefecto = False
            '            End If

            '            eCampo.ValorDefecto = infor.COLUMN_DEFAULT
            '            eCampo.UsoPrc = True
            '            eCampo.PosicionColumna = pPosicion.ElementAt(i)
            '            eCampo.Identificador = pCampoIdent.ElementAt(i)
            '        Next


            '        If pAccion.ElementAt(i).ToString() = "INS" Then
            '            Dim CodPlantilla As List(Of ENT_PCS_IMP_Plantilla) = Plantilla.Listar_x_Valida_Nombre(pNom)
            '            eCampo.IdPlantilla = CodPlantilla.ElementAt(0).IdPlantilla
            '            resultado2 = Campo.Insertar(eCampo)

            '        ElseIf pAccion.ElementAt(i).ToString() = "UPD" Then
            '            eCampo.IdCampo = pId.ElementAt(i).ToString()
            '            eCampo.IdPlantilla = Convert.ToInt32(pCod)
            '            resultado2 = Campo.Actualizar(eCampo)
            '        End If

            '    Next



            '    For i = 0 To pNombreCampo.Count - 1
            '        Dim eCampo As New ENT_PCS_IMP_Campo




            '        If pAccion.ElementAt(i).ToString() = "INS" Then
            '            Dim CodPlantilla As List(Of ENT_PCS_IMP_Plantilla) = Plantilla.Listar_x_Valida_Nombre(pNom)
            '            eCampo.IdPlantilla = CodPlantilla.ElementAt(0).IdPlantilla
            '            resultado2 = Campo.Insertar(eCampo)

            '        ElseIf pAccion.ElementAt(i).ToString() = "UPD" Then
            '            eCampo.IdCampo = pId.ElementAt(i).ToString()
            '            eCampo.IdPlantilla = Convert.ToInt32(pCod)
            '            resultado2 = Campo.Actualizar(eCampo)
            '        End If
            '    Next

            'End If

            'Return resultado2
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Plantilla IsNot Nothing Then Plantilla.Dispose()
            If Campo IsNot Nothing Then Campo.Dispose()
        End Try
    End Function

    <WebMethod()> _
    Public Shared Function Search_Entidad(nombre As String, idCliente As Integer) As List(Of ENT_PCS_IMP_Plantilla)
        Dim Plantilla As BL_PCS_IMP_Plantilla = Nothing
        Try
            'Solo buscara aquellas entidades que no tengan ahun una plantilla
            Plantilla = New BL_PCS_IMP_Plantilla(idCliente)
            Return Plantilla.Search_Entidad(nombre)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Plantilla IsNot Nothing Then Plantilla.Dispose()
        End Try
    End Function

    <WebMethod()> _
    Public Shared Function Listar_Campos_x_Tabla(tabla As String, idcliente As Integer) As List(Of ENT_Information_Schema_Columns)

        Dim Information_Schema As BL_Information_Schema_Columns = Nothing
        Try
            Information_Schema = New BL_Information_Schema_Columns(idcliente)
            Dim lstInformation_Schema As List(Of ENT_Information_Schema_Columns) = Information_Schema.Listar_Information_Schema_Columns_x_Tabla(tabla)
            Return lstInformation_Schema
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Information_Schema IsNot Nothing Then Information_Schema.Dispose()
        End Try
        
    End Function

    <WebMethod()> _
    Public Shared Function Listar_Campos_x_Plantilla(idPlantilla As String, idcliente As Integer) As List(Of ENT_PCS_IMP_Campo)
        Dim Campo As BL_PCS_IMP_Campo = Nothing
        Try
            Campo = New BL_PCS_IMP_Campo(idcliente)
            Dim eCampo As New ENT_PCS_IMP_Campo
            eCampo.IdPlantilla = idPlantilla
            Dim lstCampo As List(Of ENT_PCS_IMP_Campo) = Campo.Listar_x_Plantilla(eCampo)
            Return lstCampo

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Campo IsNot Nothing Then Campo.Dispose()
        End Try
    End Function

    <WebMethod()> _
    Public Shared Function CargarData_Tree(idPlantilla As String, idcliente As Integer, tabla As String) As String
        Dim Campo As BL_PCS_IMP_Campo = Nothing
        Try
            Campo = New BL_PCS_IMP_Campo(idcliente)
            Dim proceso As New ProcesosFunciones
            Dim eCampo As New ENT_PCS_IMP_Campo
            eCampo.IdPlantilla = idPlantilla
            Dim lstCampo As List(Of ENT_PCS_IMP_Campo) = Campo.Listar_x_Plantilla(eCampo)
            Return proceso.CargarData_Tree_RelacionTablas(tabla, lstCampo)
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            Campo.Dispose()
        End Try

    End Function

    <WebMethod()> _
    Public Shared Function Listar_Campos_Informacion_x_Tabla(tabla As String, columna As String, idcliente As Integer) As List(Of ENT_Information_Schema_Columns)

        Dim Information_Schema As BL_Information_Schema_Columns = Nothing
        Try
            Information_Schema = New BL_Information_Schema_Columns(idcliente)
            Dim lstInformation_Campo As List(Of ENT_Information_Schema_Columns) = Information_Schema.Listar_Information_Schema_Columns_x_CampoTabla(tabla, columna)
            Dim lstInformaTion_Campo_PK As List(Of ENT_Information_Schema_Columns) = Information_Schema.Listar_Information_Schema_Columns_x_Tabla_PK(tabla, columna)
            Dim lstInformaTion_Campo_Identity As List(Of ENT_Information_Schema_Columns) = Information_Schema.Listar_Information_Schema_Columns_x_Tabla_identity(tabla, columna)

            Dim lstInformation_Campo_Final As New List(Of ENT_Information_Schema_Columns)
            Dim eInformation_Campo As New ENT_Information_Schema_Columns
            eInformation_Campo.CHARACTER_MAXIMUM_LENGTH = lstInformation_Campo.ElementAt(0).CHARACTER_MAXIMUM_LENGTH


            Select Case lstInformation_Campo.ElementAt(0).COLUMN_DEFAULT

                Case "('')"
                    eInformation_Campo.COLUMN_DEFAULT = "''"
                Case "(getdate())"
                    eInformation_Campo.COLUMN_DEFAULT = Date.Now.ToShortDateString()
                Case "(0)"
                    eInformation_Campo.COLUMN_DEFAULT = "0"
                Case "(1)"
                    eInformation_Campo.COLUMN_DEFAULT = "1"
                Case "((1))"
                    eInformation_Campo.COLUMN_DEFAULT = "1"
                Case "((0))"
                    eInformation_Campo.COLUMN_DEFAULT = "0"
                Case "(480)"
                    eInformation_Campo.COLUMN_DEFAULT = "480"
                Case "(30)"
                    eInformation_Campo.COLUMN_DEFAULT = "30"
                Case "('000.000.000.000')"
                    eInformation_Campo.COLUMN_DEFAULT = "000.000.000.000"
                Case "(0.00)"
                    eInformation_Campo.COLUMN_DEFAULT = "0.00"
                Case Else
                    eInformation_Campo.COLUMN_DEFAULT = lstInformation_Campo.ElementAt(0).COLUMN_DEFAULT
            End Select

            eInformation_Campo.COLUMN_NAME = lstInformation_Campo.ElementAt(0).COLUMN_NAME
            eInformation_Campo.constraint_name = lstInformation_Campo.ElementAt(0).constraint_name

            Select Case lstInformation_Campo.ElementAt(0).DATA_TYPE
                Case "bigint"
                    eInformation_Campo.DATA_TYPE = "Numerico"
                Case "bit"
                    eInformation_Campo.DATA_TYPE = "Logico"
                Case "char"
                    eInformation_Campo.DATA_TYPE = "Texto"
                Case "datetime"
                    eInformation_Campo.DATA_TYPE = "Fecha"
                Case "decimal"
                    eInformation_Campo.DATA_TYPE = "Decimal"
                Case "float"
                    eInformation_Campo.DATA_TYPE = "Moneda"
                Case "bigint"
                    eInformation_Campo.DATA_TYPE = "Numerico"
                Case "bit"
                    eInformation_Campo.DATA_TYPE = "Logico"
                Case "image"
                    eInformation_Campo.DATA_TYPE = "Texto"
                Case "int"
                    eInformation_Campo.DATA_TYPE = "Numerico"
                Case "nchar"
                    eInformation_Campo.DATA_TYPE = "Texto"
                Case "numeric"
                    eInformation_Campo.DATA_TYPE = "Numerico"
                Case "nvarchar"
                    eInformation_Campo.DATA_TYPE = "Texto"
                Case "smalldatetime"
                    eInformation_Campo.DATA_TYPE = "Fecha"
                Case "smallint"
                    eInformation_Campo.DATA_TYPE = "Numerico"
                Case "text"
                    eInformation_Campo.DATA_TYPE = "Texto"
                Case "tinyint"
                    eInformation_Campo.DATA_TYPE = "Numerico"
                Case "varchar"
                    eInformation_Campo.DATA_TYPE = "Texto"
            End Select

            eInformation_Campo.ForeignKey = ""
            eInformation_Campo.Table_Foreign = ""

            If lstInformaTion_Campo_Identity.Count <> 0 Then
                eInformation_Campo.is_identity = lstInformaTion_Campo_Identity.ElementAt(0).is_identity
            Else
                eInformation_Campo.is_identity = False
            End If

            eInformation_Campo.IS_NULLABLE = lstInformation_Campo.ElementAt(0).IS_NULLABLE
            eInformation_Campo.ORDINAL_POSITION = lstInformation_Campo.ElementAt(0).ORDINAL_POSITION

            If lstInformaTion_Campo_PK.Count <> 0 Then
                eInformation_Campo.PrimaryKey = lstInformaTion_Campo_PK.ElementAt(0).PrimaryKey
            Else
                eInformation_Campo.PrimaryKey = ""
            End If

            eInformation_Campo.TABLE_CATALOG = lstInformation_Campo.ElementAt(0).TABLE_CATALOG
            eInformation_Campo.TABLE_NAME = lstInformation_Campo.ElementAt(0).TABLE_NAME

            Dim lstInformaTion_Campo_FK As List(Of ENT_Information_Schema_Columns) = Information_Schema.Listar_Information_Schema_Columns_x_Tabla_FK(tabla)

            For Each eInf As ENT_Information_Schema_Columns In lstInformaTion_Campo_FK
                If columna = eInf.ForeignKey Then
                    Dim lstInformaTion_Tabla_FK As List(Of ENT_Information_Schema_Columns) = Information_Schema.Listar_Information_Schema_Columns_x_Constraint_FK(eInf.constraint_name)
                    eInformation_Campo.Table_Foreign = lstInformaTion_Tabla_FK.ElementAt(0).TABLE_NAME
                End If
            Next

            lstInformation_Campo_Final.Add(eInformation_Campo)
            Return lstInformation_Campo_Final

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Information_Schema IsNot Nothing Then
                Information_Schema.Dispose()
            End If
        End Try
    End Function

    <WebMethod()> _
    Public Shared Function Listar_Campo_FK_x_Tabla(tabla As String, idcliente As Integer) As List(Of ENT_Information_Schema_Columns)
        Dim Information_Schema As BL_Information_Schema_Columns = Nothing
        Try
            Information_Schema = New BL_Information_Schema_Columns(idcliente)
            Dim lstInformaTion_Campo_FK As List(Of ENT_Information_Schema_Columns) = Information_Schema.Listar_Information_Schema_Columns_x_Tabla_FK(tabla)
            Return lstInformaTion_Campo_FK
        Catch ex As Exception
            If Information_Schema IsNot Nothing Then Information_Schema.Dispose()
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        End Try

    End Function

    <WebMethod()> _
    Public Shared Function Listar_Tabla_FK_x_Constraint(constraint As String, idcliente As Integer) As List(Of ENT_Information_Schema_Columns)
        Dim Information_Schema As BL_Information_Schema_Columns = Nothing
        Try
            Information_Schema = New BL_Information_Schema_Columns(idcliente)
            Dim lstInformaTion_Tabla_FK As List(Of ENT_Information_Schema_Columns) = Information_Schema.Listar_Information_Schema_Columns_x_Constraint_FK(constraint)
            Return lstInformaTion_Tabla_FK
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Information_Schema IsNot Nothing Then Information_Schema.Dispose()

        End Try
        
    End Function

    <WebMethod()> _
    Public Shared Function Listar_CamposPF_x_TablaFK(tabla As String, idcliente As Integer) As List(Of String)

        Dim Information_Schema As BL_Information_Schema_Columns = Nothing

        Try
            Information_Schema = New BL_Information_Schema_Columns(idcliente)
            Dim lstCampos_PK As New List(Of String)
            Dim lstInformaTion_Campo_Tabla As List(Of ENT_Information_Schema_Columns) = Information_Schema.Listar_Information_Schema_Columns_x_Tabla(tabla)

            For Each Infor As ENT_Information_Schema_Columns In lstInformaTion_Campo_Tabla
                lstCampos_PK.Add(Infor.COLUMN_NAME)
            Next

            Return lstCampos_PK

        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
        Finally
            If Information_Schema IsNot Nothing Then Information_Schema.Dispose()
        End Try
        

    End Function

    <WebMethod()>
    Public Shared Function TreeRelacionTabla(pTabla As String) As String
        Dim proceso As New ProcesosFunciones
        Return proceso.Tree_RelacionTablas(pTabla)
    End Function

    <WebMethod()> _
    Public Shared Function AgregarCamposPK_FK(pTabla As String) As List(Of ENT_Information_Schema_Columns)

        Dim Information_Schema As BL_Information_Schema_Columns = Nothing

        Try
            Dim lstCamposFinal As New List(Of ENT_Information_Schema_Columns)

            Information_Schema = New BL_Information_Schema_Columns(0)
            Dim lstCamposAll As List(Of ENT_Information_Schema_Columns) = Information_Schema.Listar_Information_Schema_Columns_x_Tabla(pTabla)
            Dim lstCamposFK As List(Of ENT_Information_Schema_Columns) = Information_Schema.Listar_Information_Schema_Columns_x_Tabla_FK(pTabla)

            If lstCamposFK.Count = 0 Then

                For a = 0 To lstCamposAll.Count - 1
                    Dim lstTablasPK As List(Of ENT_Information_Schema_Columns) = Information_Schema.Listar_Information_Schema_Columns_x_Tabla_PK(pTabla, lstCamposAll.ElementAt(a).COLUMN_NAME)
                    If lstTablasPK.Count <> 0 Then
                        lstCamposFinal.Add(New ENT_Information_Schema_Columns With {.TABLE_NAME = pTabla, .COLUMN_NAME = lstTablasPK.ElementAt(0).PrimaryKey, .COLUMN_DEFAULT = "PK"})
                    End If
                Next

            Else

                Dim x As Integer = 0

                While x < lstCamposFK.Count
                    Dim lstCamposConstraint As List(Of ENT_Information_Schema_Columns) = Information_Schema.Listar_Information_Schema_Columns_x_Constraint_FK(lstCamposFK.ElementAt(x).constraint_name)
                    lstCamposFinal.Add(New ENT_Information_Schema_Columns With {.TABLE_NAME = lstCamposConstraint.ElementAt(0).TABLE_NAME, .COLUMN_NAME = lstCamposFK.ElementAt(x).ForeignKey, .COLUMN_DEFAULT = "FK"})
                    Dim lstCamposFK2 As List(Of ENT_Information_Schema_Columns) = Information_Schema.Listar_Information_Schema_Columns_x_Tabla_FK(lstCamposConstraint.ElementAt(0).TABLE_NAME)
                    If lstCamposFK2.Count <> 0 Then
                        lstCamposFK.AddRange(lstCamposFK2.ToList())
                    End If
                    x += 1
                End While

                Dim lstTablasObt = (From c In lstCamposFinal
                                     Select c.TABLE_NAME).Distinct().ToList()

                Dim y As Integer = 0
                While y < lstTablasObt.Count

                    Dim lstTablasObtAll As List(Of ENT_Information_Schema_Columns) = Information_Schema.Listar_Information_Schema_Columns_x_Tabla(lstTablasObt.ElementAt(y).ToString())

                    For z = 0 To lstTablasObtAll.Count - 1
                        Dim lstTablasObtPK As List(Of ENT_Information_Schema_Columns) = Information_Schema.Listar_Information_Schema_Columns_x_Tabla_PK(lstTablasObt.ElementAt(y).ToString(), lstTablasObtAll.ElementAt(z).COLUMN_NAME)
                        If lstTablasObtPK.Count <> 0 Then
                            lstCamposFinal.Add(New ENT_Information_Schema_Columns With {.TABLE_NAME = lstTablasObt.ElementAt(y).ToString(), .COLUMN_NAME = lstTablasObtPK.ElementAt(z).PrimaryKey, .COLUMN_DEFAULT = "PK"})
                        End If
                    Next
                    y += 1
                End While

            End If
            Return lstCamposFinal
        Catch ex As Exception
            Dim util As New Utilitarios
            util.GrabarLog(ex, HttpContext.Current.Server.MapPath("~/"), Utilitario.NombreSistemaMovil, HttpContext.Current.Session("Usuario"))
            Throw New Exception(UtilitarioWeb.MensajeError)
            Return Nothing
        Finally
            If Information_Schema IsNot Nothing Then Information_Schema.Dispose()
        End Try
    End Function

End Class
