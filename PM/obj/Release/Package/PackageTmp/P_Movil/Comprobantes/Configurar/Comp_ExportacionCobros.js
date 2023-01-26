

$(function () {

    $('.txtHoraEJ').datetimepicker({
        datepicker: false,
        format: 'H:i',
        step: 5
    });


    CargarTipofuenteDefault();
    CargarMedioDefault();
    CargarUbicacionDefault();
    CargarPlantillaDefault();

    function CargarTipofuenteDefault() {
        $("#ddlTipoFuente_D").html("");
        $("#ddlTipoFuente_D").append($("<option></option>").attr("value", "").text("<Seleccionar>"));
        $("#ddlTipoFuente_D").append($("<option></option>").attr("value", "BD").text("Fuente Base de Datos"));
        $("#ddlTipoFuente_D").append($("<option></option>").attr("value", "AR").text("Fuente Archivo"));
    }

    function CargarMedioDefault() {
        $("#ddlMedio_D").html("");
        $("#ddlMedio_D").append($("<option></option>").attr("value", "").text("<Seleccionar>"));
        $("#ddlMedio_D").append($("<option></option>").attr("value", "FTP").text("FTP"));
        $("#ddlMedio_D").append($("<option></option>").attr("value", "UNC").text("UNC"));
    }

    function CargarUbicacionDefault() {
        $("#ddlUbicacion_D").html("");
        $("#ddlUbicacion_D").append($("<option></option>").attr("value", "").text("<Seleccionar>"));
    }

    function CargarPlantillaDefault() {
        $("#hdfPlantillaD").val("");
        $("#ddlPlantilla_D").html("");
        $("#ddlPlantilla_D").append($("<option></option>").attr("value", "").text("<Seleccionar>"));
    }

    $('#ddlTipoFuente_D').change(function () {


        CargarPlantillaDefault();
        CargarMedioDefault();
        CargarUbicacionDefault();
        var _IdTipoFuente = $(this).val();

        if (_IdTipoFuente != "BD") {

            if (_IdTipoFuente == "")
            { $(".medio").hide(); }
            else {
                $(".medio").show();
            }
            //var dropdownlist_medio = $("#ddlMedio_O").data("kendoDropDownList");
            //dropdownlist_medio.select(0);
        }
        else {
            $(".medio").hide();
            var _Tipo = "Destino";
            cargar_ubicacion(_IdTipoFuente, _Tipo);
        }

    });


    $('#ddlMedio_D').change(function () {


        CargarPlantillaDefault();
        CargarUbicacionDefault();
        var _Medio = $(this).val();
        var _Tipo = "Destino";
        cargar_ubicacion(_Medio, _Tipo);

    });

    $('#ddlUbicacion_D').change(function () {


        var _IdConfigProceso = $(this).val();
        var _Tipo = "Destino";
        CargarPlantillaDefault();

        //Limpiar ddlplantilla ddlformato

        var _Tipo = "Destino";
        //cargar_grillaDetalle(_IdConfigProceso, _Tipo);

        cargar_plantilla(_IdConfigProceso, _Tipo);

    });


    function cargar_ubicacion(_IdTipoFuente, _Tipo) {

        var tipo_Fuente = _IdTipoFuente;
        //si es bd carga defrente la ubicacion 
        //case contrario carga el combo de Medio FTP UNC

        if (tipo_Fuente == "BD") {

            if (_Tipo == "Origen") {
                $("#tbConfImp tr.medio").hide();
            }
            else { $("#tbConfImpD tr.medio").hide(); }
        }

        $.ajax({
            type: "POST",
            url: "Comp_ExportacionCobros.aspx/getListar_Ubicacion_ddl",
            data: JSON.stringify({
                'IdTipoFuente': tipo_Fuente,
                'Tipo': _Tipo,
                "inTipOri": $("#hdfinTipOri").val()
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {

                var lstUbicacion = data.d;

                $(lstUbicacion).each(function () {
                    $("#ddlUbicacion_D").append($("<option></option>").attr("value", this.P_IdConfigFuente).text(this.VcNombre));
                });
            }
        });

    }

    function cargar_ubicacionLista(_IdTipoFuente, _Tipo, _valor) {

        var tipo_Fuente = _IdTipoFuente;
        //si es bd carga defrente la ubicacion 
        //case contrario carga el combo de Medio FTP UNC

        if (tipo_Fuente == "BD") {

            if (_Tipo == "Origen") {
                $("#tbConfImp tr.medio").hide();
            }
            else { $("#tbConfImpD tr.medio").hide(); }
        }

        $.ajax({
            type: "POST",
            url: "Comp_ExportacionCobros.aspx/getListar_Ubicacion_ddl",
            data: JSON.stringify({
                'IdTipoFuente': tipo_Fuente,
                'Tipo': _Tipo,
                "inTipOri": $("#hdfinTipOri").val()
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {

                var lstUbicacion = data.d;

                $(lstUbicacion).each(function () {
                    $("#ddlUbicacion_D").append($("<option></option>").attr("value", this.P_IdConfigFuente).text(this.VcNombre));
                });
                $("#ddlUbicacion_D").val(_valor);
            }
        });

    }




    function cargar_grillaDetalle(_IdConfigProceso, _Tipo) {

        var _Medio

        if (_Tipo == "Origen") {
            _Medio = $("#ddlTipoFuente_O").val();
        }
        else {
            _Medio = $("#ddlTipoFuente_D").val();
        }

        if (_Medio != "BD") {
            if (_Tipo == "Origen") { _Medio = $("#ddlMedio_O").val(); }
            else { _Medio = $("#ddlMedio_D").val(); }
        }

        if (_IdConfigProceso != "") {
            $.ajax({
                type: "POST",
                url: "Comp_ExportacionCobros.aspx/getListar_DetalleUbicacion",
                data: JSON.stringify({
                    'IdConfigProceso': _IdConfigProceso,
                    'medio': _Medio,
                    'inTipOri': $("#hdfinTipOri").val()
                }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {

                    var lstGridDetalle = data.d;

                    var datarow = { Id: "1", Servidor: lstGridDetalle[0].VcServidor, Ruta: lstGridDetalle[0].VcRuta, Nombre: lstGridDetalle[0].VcNombre, Plantilla: $("#ddlPlantilla_D option:selected")[0].text };
                    $("#grid").jqGrid('addRowData', 1, datarow);

                },
                error: function (xhr, err, thrErr) {
                    $("#tbConfImp tr.grid").hide();
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        }
    }

    var tbDetalle = $("#grid").jqGrid({
        sortable: true,
        datatype: "local",
        datatype: function () {

        },
        colModel: [
                       { name: 'Id', index: 'Id', label: 'Código', hidden: true, key: true, width: 60 },
                       { name: 'Servidor', index: 'Servidor', label: 'Servidor', hidden: false, width: 80 },
                       { name: 'Ruta', index: 'Ruta', label: 'Ruta/baseDatos', hidden: false, width: 180 },
                       { name: 'Nombre', index: 'Nombre', label: 'Nombre', hidden: false, width: 160 },
                       { name: 'Plantilla', index: 'Plantilla', label: 'Plantilla', hidden: false, width: 160, align: "center",
                           formatter: function (cellValue, options, rowObject) {
                               return '<a id="imgMostarPlantilla" style="cursor: pointer !important; text-decoration: underline;" title="Ver detalle Plantilla">' + cellValue + '</a>';
                           }
                       },
                       { name: 'Editar', index: 'Editar', label: 'Editar', hidden: false, width: 40, align: "center",
                           formatter: function (cellValue, options, rowObject) {
                               return '<img src="../../../Common/Images/Mantenimiento/edit_16x16.gif" id="imgEditarPlantilla" style="cursor: pointer !important;" title="Editar Plantilla"/>';
                               ;
                           }
                       }
   	                  ],

        //viewrecords: true,      
        loadtext: 'Cargando datos...',
        recordtext: "{0} - {1} de {2} elementos",
        sortname: "Nombre", //sortname: idTabla, //Default SortColumn
        sortorder: "desc", //Default SortOrder.
        rownumbers: true,
        shrinkToFit: false,
        width: 700,
        height: 50
        //caption: "Servidores"

    }).navGrid("#pager", { edit: false, add: false, search: false, del: false });

    ///******************************
    var tbPlantilla = $("#grPlantilla").jqGrid({
        sortable: true,
        datatype: 'local',
        datatype: function () {

        },
        colNames: ['ID', 'Campo', 'Orden', 'Obligatorio'],
        colModel: [{ name: 'ID', index: 'ID', label: 'ID', hidden: true, width: 50, key: true, sortable: false },
                       { name: 'Campo', index: 'Campo', label: 'Campo', hidden: false, width: 310, sortable: false },
                       { name: 'Orden', index: 'Orden', label: 'Orden', hidden: false, width: 60, align: 'center', sortable: false },
                       { name: 'Obligatorio', index: 'Obligatorio', label: 'Obligatorio', hidden: false, width: 70,align:'center', sortable: false },

   	                  ],

        rowNum: 10,
        //rowList: [5, 10, 20],
        //pager: '#pager2',
        gridview: true,
        rownumbers: true,
        viewrecords: true,
        shrinkToFit: false,
        sortorder: 'desc',
        height: 225,
        width: 550

    }).navGrid("#pager2", { edit: false, add: false, search: false, del: false });

    
    function cargar_plantilla(_IdConfigProceso, _Tipo) {
        if (_IdConfigProceso != "") {

            $.ajax({
                type: "POST",
                url: "Comp_ExportacionCobros.aspx/getListar_Plantilla_ddl",
                data: JSON.stringify({
                    'IdConfigProceso': _IdConfigProceso,
                    'Tipo': _Tipo,
                    'inTipOri': $("#hdfinTipOri").val()
                }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {

                    var lstPlantilla = data.d;

                    $(lstPlantilla).each(function () {
                        $("#ddlPlantilla_D").append($("<option></option>").attr("value", this.P_inIdPlantilla).text(this.VcNombre));
                    });

                    $("#hdfPlantilla").val(data.d[0].Plantilla);

                },
                error: function (xhr, err, thrErr) {

                    MostrarErrorAjax(xhr, err, thrErr);
                }

            });
        }

    }

    function cargar_plantillaLista(_IdConfigProceso, _Tipo, _valor) {
        if (_IdConfigProceso != "") {

            $.ajax({
                type: "POST",
                url: "Comp_ExportacionCobros.aspx/getListar_Plantilla_ddl",
                data: JSON.stringify({
                    'IdConfigProceso': _IdConfigProceso,
                    'Tipo': _Tipo,
                    'inTipOri': $("#hdfinTipOri").val()
                }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {

                    var lstPlantilla = data.d;

                    $(lstPlantilla).each(function () {
                        $("#ddlPlantilla_D").append($("<option></option>").attr("value", this.P_inIdPlantilla).text(this.VcNombre));
                    });
                    $("#ddlPlantilla_D").val(_valor);
                    $("#hdfPlantillaD").val(_valor);

                    $("#hdfPlantilla").val(data.d[0].Plantilla);

                    cargar_grillaDetalle(_IdConfigProceso, _Tipo);

                },
                error: function (xhr, err, thrErr) {

                    MostrarErrorAjax(xhr, err, thrErr);
                }

            });
        }

    }

    if ($("#hdfProceso_Destino").val() != "") {
        $("#btnMostrarPlantilla").button("disable");
        $("#btnMostrarPlantilla").css("display","none");
        
    }

    $("#btnPlantilla").live("click", function (e) {
        var _IdPlantilla = $("#hdfPlantilla").val();
        var _IdProceso = $("#ddlPlantilla_D").val();
        if (_IdPlantilla == "" || _IdProceso == "") {
            alerta('Seleccione la Plantilla de Destino');
            e.preventDefault();
            return;
        }
        Cargar_DetallePlantilla(_IdProceso);
        MostrarPanel();
    });

    $("#imgMostarPlantilla").live("click", function (e) {
        var _IdPlantilla = $("#hdfPlantilla").val();
        var _IdProceso = $("#hdfPlantillaD").val(); //$("#ddlPlantilla_D").val();
        if (_IdPlantilla == "" || _IdProceso == "") {
            alerta('Seleccione la Plantilla de Destino');
            e.preventDefault();
            return;
        }
        Cargar_DetallePlantilla(_IdProceso);
        MostrarPanel();
    });


    function MostrarPanel() {
        var dlg = $("#PanelCampos").dialog({
            title: 'Campos de la plantilla',
            resizable: false,
            modal: true,
            width: 600,
            height: 350,
            autoOpen: true
        }).dialog('open');

        dlg.dialog("option", "buttons", {
            "Cerrar": function () {
                $(this).dialog("close");

                return true;
            }
        });
    };

    function MostrarModalPlantilla() {
        var dlg = $("#dvPlantillaModal").dialog({
            title: 'Seleccione una plantilla',
            resizable: false,
            modal: true,
            width: 500,
            height: 220,
            autoOpen: true
        }).dialog('open');

        dlg.dialog("option", "buttons", {

            "Aceptar": function () {

                if ($("#ddlPlantilla_D").val() == "") {
                    alerta('Seleccione la Plantilla de Destino');
                    return;
                }

                $("#grid").jqGrid("clearGridData", true);
                $("#hdfPlantillaD").val($("#ddlPlantilla_D").val());
                var _IdConfigProceso = $('#ddlUbicacion_D').val()
                var _Tipo = "Destino";
                cargar_grillaDetalle(_IdConfigProceso, _Tipo);

                $(this).dialog("close")

                return true;
            },
            "Cancelar": function () {
                $(this).dialog("close")
                return true;
            }
        });
    };


    $("#btnMostrarPlantilla,#imgEditarPlantilla").live("click", function () {
        MostrarModalPlantilla();
    });


    function Cargar_DetallePlantilla(_IdProceso) {
        //var _IdProceso = $("#hdfPlantillaD").val(); // $("#ddlPlantilla_D").val();
        $("#grPlantilla").jqGrid("clearGridData", true);

        $.ajax({
            type: "POST",
            url: "Comp_ExportacionCobros.aspx/Listar_PlantillaDetalle",
            data: JSON.stringify({
                "IdConfigProceso": _IdProceso,
                "inTipOri": $("#hdfinTipOri").val()
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {

                var lstPlantilla = data.d;

                for (var i = 0; i < lstPlantilla.length; i++) {

                    var datarow = { ID: i, Campo: lstPlantilla[i].VcNombre, Orden: lstPlantilla[i].Orden, Obligatorio: lstPlantilla[i].Obligatorio };
                    $("#grPlantilla").jqGrid('addRowData', 1, datarow);

                }


            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }



    $("#btnGuardar").click(function () {

        var IdFacConfiguracion = 11;
        var _TipoEjecucion = "0";
        var TipoFuente_D = $("#ddlTipoFuente_D").val();
        var Medio_D = $("#ddlMedio_D").val();
        var Ubicacion_D = $("#ddlUbicacion_D").val();
        var Plantilla_D = $("#hdfPlantillaD").val(); //$("#ddlPlantilla_D").val();

        var CorreoNotificacion = $("#txtCorreo").val();
        if (!validarEmailMultiple(CorreoNotificacion)) {
            alerta("Debe ingresar correo(s) válido(s)");
            return;
        }

        var XML_CfgDetalle = "<?xml version=\"1.0\" encoding=\"iso-8859-1\"?><TABLE>";

        var IdConfiguracionDetalle;
        var Tabla;
        var IdConfiguracionConcepto = "ddlTipoConcepto_";
        var EsDiaCalendario = "ddlDiaCalendario_";
        var DiaConcepto = "ddlDiaConcepto_";
        var HoraEjecucion = "txtHoraEjecucion_";
        var DiasUtilesAntes = "ddlDiasAntes_";




        for (i = 0; i < $("#tblEquipo tr").length; i++) {
            Tabla = "Eq";
            IdConfiguracionDetalle = $("#tblEquipo tr").eq(i).attr("id");
            IdConfiguracionConcepto = $("#ddlTipoConcepto_" + Tabla + i.toString()).val();
            EsDiaCalendario = $("#ddlDiaCalendario_" + Tabla + i.toString()).val();
            DiaConcepto = $("#ddlDiaConcepto_" + Tabla + i.toString()).val();
            HoraEjecucion = $("#txtHoraEjecucion_" + Tabla + i.toString()).val();
            DiasUtilesAntes = $("#ddlDiasAntes_" + Tabla + i.toString()).val();

            if (IdConfiguracionConcepto == -1 || IdConfiguracionConcepto == 0) {
                alerta('Seleccione el día concepto de Equipo');
                return;
            }

            if (EsDiaCalendario == -1) {
                alerta('Seleccione si es un día Calendario o Útil');
                return;
            }

            if (HoraEjecucion == "") {
                alerta('Ingrese una Hora de ejecución');
                return;
            }

            XML_CfgDetalle += "<DATA IdConfiguracionDetalle=\"" + IdConfiguracionDetalle + "\" IdConfiguracionConcepto=\"" + IdConfiguracionConcepto + "\" EsDiaCalendario=\"" + EsDiaCalendario;
            XML_CfgDetalle += "\" DiaConcepto=\"" + DiaConcepto + "\" HoraEjecucion=\"" + HoraEjecucion + "\" DiasUtilesAntes=\"" + DiasUtilesAntes + "\"/>";
        }

        for (i = 0; i < $("#tblServicio tr").length; i++) {
            Tabla = "Srv";
            IdConfiguracionDetalle = $("#tblServicio tr").eq(i).attr("id");
            IdConfiguracionConcepto = $("#ddlTipoConcepto_" + Tabla + i.toString()).val();
            EsDiaCalendario = $("#ddlDiaCalendario_" + Tabla + i.toString()).val();
            DiaConcepto = $("#ddlDiaConcepto_" + Tabla + i.toString()).val();
            HoraEjecucion = $("#txtHoraEjecucion_" + Tabla + i.toString()).val();
            DiasUtilesAntes = $("#ddlDiasAntes_" + Tabla + i.toString()).val();

            if (IdConfiguracionConcepto == -1 || IdConfiguracionConcepto == 0) {
                alerta('Seleccione el día concepto de Equipo');
                return;
            }

            if (EsDiaCalendario == -1) {
                alerta('Seleccione si es un día Calendario o Útil');
                return;
            }

            if (HoraEjecucion == "") {
                alerta('Ingrese una Hora de ejecución');
                return;
            }


            XML_CfgDetalle += "<DATA IdConfiguracionDetalle=\"" + IdConfiguracionDetalle + "\" IdConfiguracionConcepto=\"" + IdConfiguracionConcepto + "\" EsDiaCalendario=\"" + EsDiaCalendario;
            XML_CfgDetalle += "\" DiaConcepto=\"" + DiaConcepto + "\" HoraEjecucion=\"" + HoraEjecucion + "\" DiasUtilesAntes=\"" + DiasUtilesAntes + "\"/>";
        }

        for (i = 0; i < $("#tblNotaCredito tr").length; i++) {
            Tabla = "Nt";
            IdConfiguracionDetalle = $("#tblNotaCredito tr").eq(i).attr("id");
            IdConfiguracionConcepto = $("#ddlTipoConcepto_" + Tabla + i.toString()).val();
            EsDiaCalendario = $("#ddlDiaCalendario_" + Tabla + i.toString()).val();
            DiaConcepto = $("#ddlDiaConcepto_" + Tabla + i.toString()).val();
            HoraEjecucion = $("#txtHoraEjecucion_" + Tabla + i.toString()).val();
            DiasUtilesAntes = $("#ddlDiasAntes_" + Tabla + i.toString()).val();

            if (IdConfiguracionConcepto == -1 || IdConfiguracionConcepto == 0) {
                alerta('Seleccione el día concepto de Equipo');
                return;
            }

            if (EsDiaCalendario == -1) {
                alerta('Seleccione si es un día Calendario o Útil');
                return;
            }

            if (HoraEjecucion == "") {
                alerta('Ingrese una Hora de ejecución');
                return;
            }
            XML_CfgDetalle += "<DATA IdConfiguracionDetalle=\"" + IdConfiguracionDetalle + "\" IdConfiguracionConcepto=\"" + IdConfiguracionConcepto + "\" EsDiaCalendario=\"" + EsDiaCalendario;
            XML_CfgDetalle += "\" DiaConcepto=\"" + DiaConcepto + "\" HoraEjecucion=\"" + HoraEjecucion + "\" DiasUtilesAntes=\"" + DiasUtilesAntes + "\"/>";
        }


        XML_CfgDetalle += "</TABLE>";


        //Destino
        if (_TipoEjecucion == "0") {
            //if (TipoFuente_D == "") {
            //    alerta('Seleccione la Fuente de Destino');
            //    return;
            //}
            //if (TipoFuente_D == "AR") {
            //    if (Medio_D == "") {
            //        alerta('Seleccione el Medio de Destino');
            //        return;
            //    }
            //}
            //
            //if (Ubicacion_D == "") {
            //    alerta('Seleccione la Ubicación de Destino');
            //    return;
            //
            //}

            if (Plantilla_D == "") {
                alerta('Seleccione la Plantilla de Destino');
                return;
            }
            if ($("#hdfProceso_Origen").val() == "-1") {
                alerta('Debe configurar el proceso de Origen [Opción: Mantenimiento Proceso Tabla[MOV_FAC_CuentaCobro_Exportar]] ');
                return;
            }
        }
        $("#hdfProceso_Destino").val();

        if (CorreoNotificacion == "") {
            alerta("Debe ingresar por lo menos un destinatario.");
            return;
        }

        $.ajax({
            type: "POST",
            url: "Comp_ExportacionCobros.aspx/Insertar_ConfExportCobros",
            data: JSON.stringify({
                "IdFacConfiguracion": IdFacConfiguracion,
                "TipoEjecucion": _TipoEjecucion,
                "IdConfigProceso_Origen": $("#hdfProceso_Origen").val(),
                "IdConfigProceso_Destino": Plantilla_D,
                "XML_CfgDetalle": XML_CfgDetalle,
                "CorreoNotificacion": CorreoNotificacion
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data.d == "0") {
                    Mensaje("<br/><h1>" + "Se grabaron los datos correctamente" + "</h1><br/>", document, CerroMensaje);
                }
                else {
                    alerta("Error intentando grabar datos");
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    });




    $('.ddlTipoConcepto').change(function () {

        var id = $(this).val()

        if (id == 1) {
            $(this).closest('td').next('td').find('select').show();
        }
        else {
            $(this).closest('td').next('td').find('select').val("0");
            $(this).closest('td').next('td').find('select').hide();
        }

    });


    $("#btnCerrar").click(function () {
        window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));
    });


    function CerroMensaje() {
        BloquearPagina(false);
        window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));
    }


    function cargarConfiguracion() {
        $.ajax({
            type: "POST",
            url: "Comp_ExportacionCobros.aspx/getListar_Configuracion_Origen",
            data: JSON.stringify({
                'IdConfigProceso': $("#hdfProceso_Destino").val(),
                'inTipOri': $("#hdfinTipOri").val()
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {

                var resultado = data.d;

                if (resultado.length > 0) {

                    var _IdTipoFuente = resultado[0].VcTipoFuente;
                    var _medio = resultado[0].VcMedio;
                    var _Ubicacion = resultado[0].InIdFuente;
                    var _Plantilla = resultado[0].P_inIdConfigProceso;
                    var _Formato = resultado[0].InIdFormato;
                    var _Tipo = "Destino";


                    $("#ddlTipoFuente_D").val(_IdTipoFuente);

                    if (_IdTipoFuente != "BD") {

                        if (_IdTipoFuente == "")
                        { $(".medio").hide(); }
                        else {
                            $(".medio").show(); ;
                        }

                        $("#ddlMedio_D").val(_medio);
                        //var ddlMedio = $("#ddlMedio_D").data("kendoDropDownList");
                        //ddlMedio.select(0);
                    }
                    else {
                        $(".medio").hide();

                        cargar_ubicacionLista("BD", _Tipo, _Ubicacion);
                    }

                    if (_medio != "") {
                        $("#ddlMedio_D").val(_medio);
                        cargar_ubicacionLista(_medio, _Tipo, _Ubicacion);
                    }

                    if (_Ubicacion != "") {
                        cargar_plantillaLista(_Ubicacion, _Tipo, _Plantilla);

                    }
                    //if (_Plantilla != "") {
                    //    cargar_FormatoLista(_Plantilla, _Tipo, _Formato);
                    //}
                }
            },
            error: function (xhr, err, thrErr) {
                $("#tbConfImp tr.grid").hide();
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }

    cargarConfiguracion();
});
