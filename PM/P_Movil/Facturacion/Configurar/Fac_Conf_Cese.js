
$(document).ready(function () {

    $("select").removeClass("ui-corner-all");
    $("select").css("padding", "0px");
    $("select").css({ "border": "none" });

    //$("input:text").addClass("ui-widget-content ui-corner-all");
    $("input:text").removeClass("ui-corner-all");
    $("input:text").css("padding", "0px");
    $("input:text").css({ "border": "none" });

    $(".ddl").kendoDropDownList({});

    $("#ddlTipoEjecucion").kendoDropDownList({
        optionLabel: {
            text: "Seleccione la Ejecución...",
            value: ""
        },
        dataTextField: "text",
        dataValueField: "value",
        dataSource: [
                { text: "Automática", value: 0 },
                { text: "Manual y Automática", value: 1 }
        ],
        index: 0
        //        change: onChangeTipoEjec

    });

    if ($("#hdfHayResTec").val() == "0" || $("#hdfHayResApr").val() == "0") {

        $("#btnGuardar").button("option", "disabled", true);
        //        $("#btnCerrar").button("option", "disabled", true);

        if ($("#hdfHayResTec").val() == "0") {
            $("#lblMensaje").text("La configuración del tipo de solicitud de Cesión está incompleta. Falta asignar un especialista responsable al tipo de solicitud.");
        }
        if ($("#hdfHayResApr").val() == "0") {
            $("#lblMensaje").text("La configuración del tipo de solicitud de Cesión está incompleta. Falta asignar un responsable de aprobación al tipo de solicitud.");
        }

        //        var dropdownlist = $("#ddlTipoEjecucion").data("kendoDropDownList");
        //        dropdownlist.enable(false);

        //        $("#txtEmpleado").attr("disabled", true);
        //        start.enable(false);
        //        startFechaPago.enable(false);
        //        $("#txtDescripcion").attr("disabled", true);
        //        $("#ddlTipoCese").attr("disabled", true);
        //        $("#ddlTipoCese").val($("#hdfTipoCese").val());

        //        var _IdEmpleado = $("#hdfEmpleado").val();
        //        $("#Info").hide();
        //        $(".ocul").hide();

        //        

    }

    // Cargando Hora
    $("#txtHora").kendoNumericTextBox({
        //format: "p0",
        //decimals: 0,
        format: "{0:n0}",
        min: 1,
        max: 12,
        step: 1
    });

    // Inicializando Minuto
    $("#txtMinuto").kendoNumericTextBox({
        format: "{0:n0}",
        min: 0,
        max: 59,
        step: 1
    });
    //inicializando combo AM FM
    $("#txtIndTiempo").kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: [
            { text: "AM", value: "0" },
            { text: "PM", value: "1" }
        ]
    });
    //    $("#tbConfVeri tr.arriba").hide();


    cargar_datos();

    //Asignando los Valores en la carga deacuerdo al tipo de configuracion enviado por la url
    function cargar_datos() {

        //        var ejecu = $("#hdfEjecucion").val();

        //        if (ejecu == "1") {
        //            $("#tbConfVeri tr.arriba").hide();
        //            var numerictxtHora = $("#txtHora").data("kendoNumericTextBox");
        //            numerictxtHora.value("");

        //            var numerictxtMinuto = $("#txtMinuto").data("kendoNumericTextBox");
        //            numerictxtMinuto.value("");
        //        }
        //        else {
        //            $("#tbConfVeri tr.arriba").show();
        //        }


        var IdConf_O = $("#hdfProceso_Origen").val();
        if (IdConf_O != "0") {
            cargarConfiguracion(IdConf_O);
        }
    }


    //    function onChangeTipoEjec(e) {
    //        var _tipoEjec = this.value();
    //        if (_tipoEjec == "0") {

    //            $("#tbConfVeri tr.arriba").show();
    //        }
    //        else {
    //            $("#tbConfVeri tr.arriba").hide();
    //        }
    //    }

    //    $('[id=chkGenPagos]').click(function () {
    //        if ($(this).is(':checked')) {
    //            $("#dvIframe").hide();
    //        }
    //        else {
    //            $("#dvIframe").show();
    //        }

    //    });

    $("#btnPlantilla").on('click', function (e) {

        var _IdProceso = $("#ddlPlantilla_O").val();
        if (_IdProceso == "" || _IdProceso == null) {
            e.preventDefault();
            return;
        }
        Cargar_DetallePlantilla();
        MostrarPanel();
    });
    function MostrarPanel() {
        var dlg = $("#PanelCampos").dialog({
            title: 'Campos de la plantilla',
            resizable: false,
            modal: true,
            width: 600,
            height: 500,
            autoOpen: true
        }).dialog('open');

        dlg.dialog("option", "buttons", {
            "Cerrar": function () {
                $(this).dialog("close");
                return true;
            }
        });
    }

    function Cargar_DetallePlantilla() {
        var _IdProceso = $("#ddlPlantilla_O").val();
        $.ajax({
            type: "POST",
            url: "Fac_Conf_Cese.aspx/Listar_PlantillaDetalle",
            data: JSON.stringify({
                "IdConfigProceso": _IdProceso,
                "inTipOri": $("#hdfinTipOri").val()
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data.d.length > 0) {

                    var dataSource = new kendo.data.DataSource({
                        data: data.d,
                        pageSize: 10
                    });


                    var gridele = $("#grPlantilla").data("kendoGrid");
                    gridele.setDataSource(dataSource);
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }
    $("#btnGuardar").click(function () {

        var _TipoEjecucion = $("#ddlTipoEjecucion").val();
        var _NumDias = $("#txtVeriExp_DiaEjecuc").data("kendoNumericTextBox");
        var _Hora = $("#txtHora").data("kendoNumericTextBox");
        var _Minuto = $("#txtMinuto").data("kendoNumericTextBox");
        var _IndTiempo = $("#txtIndTiempo").data("kendoDropDownList");


        var hora = _Hora.value();
        var minuto = _Minuto.value();
        var indTiempo = _IndTiempo.text();

        //        if (_TipoEjecucion == "1") {
        //            dia = "-1";
        //            hora = "8"
        //            minuto = "8";
        //            indTiempo = "PM";

        //        }


        //Validaciones
        if (_TipoEjecucion == "" || _TipoEjecucion == null) {

            alerta("Seleccione el Tipo de Ejecución");
            $("#ddlTipoEjecucion").focus();
            return;

        }

        if (_TipoEjecucion == "0") {

            if (_Hora.value() == null || _Minuto.value() == null || _IndTiempo == "") {
                alerta('Ingrese la Hora de ejecución');
                $("#txtHora").focus();
                return;
            }
        }
        var Plantilla_O = 0;



        var TipoFuente_O = $("#ddlTipoFuente_O").val();
        var Medio_O = $("#ddlMedio_O").val();
        var Ubicacion_O = $("#ddlUbicacion_O").val();
        Plantilla_O = $("#ddlPlantilla_O").val();
        //        var Formato_O = $("#ddlFormato_O").val();

        //Origen
        if (TipoFuente_O == "") {
            alerta('Seleccione la Fuente de Origen');
            return;
        }
        if (TipoFuente_O == "AR") {
            if (Medio_O == "") {
                alerta('Seleccione el Medio de Origen');
                return;
            }
        }

        if (Ubicacion_O == "") {
            alerta('Seleccione la Ubicación de Origen');
            return;

        }

        if (Plantilla_O == "") {
            alerta('Seleccione la Plantilla de Origen');
            return;
        }

        if ($("#hdfProceso_Destino").val() == "-1") {
            alerta('Debe configurar un proceso de destino');
            return;
        }



        $.ajax({
            type: "POST",
            url: "Fac_Conf_Cese.aspx/Insertar_ConfCeses",
            data: JSON.stringify({
                "TipoEjecucion": _TipoEjecucion,
                "Hora": hora,
                "Minuto": minuto,
                "IndTiempo": _IndTiempo.text(),
                "IdConfigProceso_Origen": Plantilla_O,
                "IdConfigProceso_Destino": $("#hdfProceso_Destino").val(),
                "User": $("#hdfEmpleado").val(),
                "inTipOri": $("#hdfinTipOri").val()
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                //                alerta("Configuración Guardada");
                //                console.log(data);
                if (data.d == "Se guardó Correctamente.") {
                    Mensaje("<br/><h1>" + data.d + "</h1><br/>", document);
                }
                else {
                    alerta(data.d);
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }




        });
    });
    $("#btnCerrar").click(function () {
        var Nametab = window.parent.tabschild[window.parent.tabPrincipal.tabs("option", "selected")].id;
        var Accord = window.parent.$("#" + Nametab);
        Accord.tabs("remove", Accord.tabs("option", "selected"));
    });





    //
    enlacesLoad();
    $("#generalCarrito").show();
    function enlacesLoad() {
        $("#generalCarrito").show();
        $(".tap").removeClass("tapSelect");
        $("#tapTicket").addClass("tapSelect");
        $("#detalleTaps > div").hide(0, function () {
            $("#pSelecTicket").fadeIn(200);
        });

        $('.tabDesc').hover(function () {
            $(this).animate({ marginRight: '10px', marginLeft: '15px' }, 300);

        }, function () {
            $(this).animate({ marginRight: '0px', marginLeft: '2px' }, 300);
        });

        $('.tabDesc').click(function () {
            $('.tabDesc').removeClass("tabSelect");
            $(this).addClass("tabSelect");
        });

        $("#tapTicket").click(function () {
            $(".tap").removeClass("tapSelect");
            $("#tapTicket").addClass("tapSelect");
            $("#detalleTaps > div").hide(0, function () {
                $("#pSelecTicket").fadeIn(200);
            });
        });

        $("#tapDetalle").click(function () {
            $(".tap").removeClass("tapSelect");
            $("#tapDetalle").addClass("tapSelect");
            $("#detalleTaps > div").hide(0, function () {
                $("#pSelecDetalle").fadeIn(200);
            });
        });

        $('.tap').hover(function () {
            $(this).animate({ marginRight: '10px', marginLeft: '30px' }, 300);

        }, function () {
            $(this).animate({ marginRight: '0px', marginLeft: '20px' }, 300);
        });
    }

    $("#ddlTipoFuente_O").kendoDropDownList({
        optionLabel: {
            text: "Seleccione la Fuente...",
            value: ""
        },
        dataTextField: "text",
        dataValueField: "value",
        dataSource: [
                { text: "Fuente Base de Datos", value: "BD" },
                { text: "Fuente Archivo", value: "AR" }
        ],
        change: dropdownlist_cascade
    });


    $("#ddlMedio_O").kendoDropDownList({
        optionLabel: {
            text: "Seleccione el Medio...",
            value: ""
        },
        dataTextField: "text",
        dataValueField: "value",
        dataSource: [
                { text: "FTP", value: "FTP" },
                { text: "UNC", value: "UNC" }
        ],
        change: dropdownlist_Medio
    });


    $("#ddlUbicacion_O").kendoDropDownList({
        optionLabel: {
            VcNombre: "Selecciona la Ubicación...",
            P_IdConfigFuente: ""
        },
        dataTextField: "VcNombre",
        dataValueField: "P_IdConfigFuente",
        dataSource: {},
        change: dropdownlist_Ubicacion
    });


    $("#ddlPlantilla_O").kendoDropDownList({
        optionLabel: {
            VcNombre: "Seleccione la Plantilla...",
            P_inIdPlantilla: ""
        },
        dataTextField: "VcNombre",
        dataValueField: "P_inIdPlantilla",
        dataSource: {},
        change: dropdownlist_Plantilla,
        index: 0
    });



    //    $("#ddlFormato_O").kendoDropDownList({
    //        optionLabel: {
    //            VcNombre: "Seleccione el Formato...",
    //            P_inIdFormato: ""
    //        },
    //        dataTextField: "VcNombre",
    //        dataValueField: "P_inIdFormato"
    //    });

    $("#grPlantilla").kendoGrid({
        dataSource: {
        },
        width: 500,
        selectable: "single",
        sortable: false,
        pageable: {
            messages: {
                display: "{0}-{1} de {2} ítems",
                of: "Desde {0}",
                itemsPerPage: "ítems por página",
                empty: "No existe una configuración asociada",
                first: "Ir a primera página",
                last: "Ir a última página",
                next: "Ir a página siguiente",
                previous: "Ir a página anterior"
            }
        },
        columns: [
            {
                field: "VcNombre",
                headerAttributes: { "class": "table-header-cell", style: "text-align: center; width: 300px;" },
                attributes: { style: "text-align: left;" },
                width: "300px",
                title: "Campo"
            },
            {
                field: "Orden",
                headerAttributes: { "class": "table-header-cell", style: "text-align: center; width: 100px;" },
                width: "100px",
                attributes: { style: "text-align: center;" },
                title: "Orden"
            },
              {
                  field: "Obligatorio",
                  headerAttributes: { "class": "table-header-cell", style: "text-align: center; width: 100px;" },
                  width: "100px",
                  attributes: { style: "text-align: center;" },
                  title: "Obligatorio"
              }]

    });

    $("#gridDetalle_O").kendoGrid({
        dataSource: {
        },
        width: 180,
        selectable: "single",
        sortable: false,
        pageable: {
            messages: {
                display: "{0}-{1} de {2} ítems",
                of: "Desde {0}",
                itemsPerPage: "ítems por página",
                empty: "No existe una configuración asociada",
                first: "Ir a primera página",
                last: "Ir a última página",
                next: "Ir a página siguiente",
                previous: "Ir a página anterior"
            }
        },
        columns: [
            {
                field: "VcServidor",
                headerAttributes: { "class": "table-header-cell", style: "text-align: center; width: 50px;" },
                width: "50px",
                title: "Servidor"
            },
            {
                field: "VcRuta",
                headerAttributes: { "class": "table-header-cell", style: "text-align: center; width: 50px;" },
                width: "50px",
                title: "Ruta/Base De Datos"
            },
              {
                  field: "VcNombre",
                  headerAttributes: { "class": "table-header-cell", style: "text-align: center; width: 100px;" },
                  width: "100px",
                  title: "Nombre"
              }]

    });
    function getPlantilla() {
        var idPlantilla = 1;
        return idPlantilla;
    }

    function dropdownlist_cascade(e) {
        // Handle the event
        var _IdTipoFuente = this.value();
        var dropdownlist_ubicacion = $("#ddlUbicacion_O").data("kendoDropDownList");
        dropdownlist_ubicacion.select(0);
        dropdownlist_ubicacion.setDataSource(null);


        var dataSource = new kendo.data.DataSource({ data: {} });
        var grid = $("#gridDetalle_O").data("kendoGrid");
        grid.setDataSource(dataSource);

        var dropdownlistPlantilla = $("#ddlPlantilla_O").data("kendoDropDownList");
        dropdownlistPlantilla.select(0);
        dropdownlistPlantilla.setDataSource(null);


        //        var dropdownlistFormato = $("#ddlFormato_O").data("kendoDropDownList");
        //        dropdownlistFormato.select(0);
        //        dropdownlistFormato.setDataSource(null);


        if (_IdTipoFuente != "BD") {

            if (_IdTipoFuente == "")
            { $("#tbConfImp tr.medio").hide(); }
            else {
                $("#tbConfImp tr.medio").show();
            }

            var dropdownlist_medio = $("#ddlMedio_O").data("kendoDropDownList");
            dropdownlist_medio.select(0);
        }
        else {
            var _Tipo = "Origen";
            cargar_ubicacion(_IdTipoFuente, _Tipo);
        }
    }
    function dropdownlist_cascadeD(e) {
        // Handle the event

        var _IdTipoFuente = this.value();

        var dropdownlist_ubicacion = $("#ddlUbicacion_D").data("kendoDropDownList");
        dropdownlist_ubicacion.select(0);
        dropdownlist_ubicacion.setDataSource(null);

        var dataSource = new kendo.data.DataSource({ data: {} });
        var grid = $("#gridDetalle_D").data("kendoGrid");
        grid.setDataSource(dataSource);

        var dropdownlistPlantilla = $("#ddlPlantilla_D").data("kendoDropDownList");
        dropdownlistPlantilla.select(0);
        dropdownlistPlantilla.setDataSource(null);


        //        var dropdownlistFormato = $("#ddlFormato_D").data("kendoDropDownList");
        //        dropdownlistFormato.select(0);
        //        dropdownlistFormato.setDataSource(null);

        if (_IdTipoFuente != "BD") {
            $("#tbConfImpD tr.medio").show();

            if (_IdTipoFuente == "")
            { $("#tbConfImpD tr.medio").hide(); }
            else {
                $("#tbConfImpD tr.medio").show();
            }

            var dropdownlist_medio = $("#ddlMedio_D").data("kendoDropDownList");
            dropdownlist_medio.select(0);
        }
        else {
            var _Tipo = "Destino";
            cargar_ubicacion(_IdTipoFuente, _Tipo);
        }

    }
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
            url: "Fac_Conf_Cese.aspx/getListar_Ubicacion_ddl",
            data: JSON.stringify({
                'IdTipoFuente': tipo_Fuente,
                'Tipo': _Tipo,
                "inTipOri": $("#hdfinTipOri").val()
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {

                var dataSource = new kendo.data.DataSource({
                    data: data.d
                });

                var Ruta;
                if (_Tipo == "Origen") {
                    Ruta = $("#ddlUbicacion_O").data("kendoDropDownList");
                    Ruta.setDataSource(dataSource);
                    Ruta.select(0);
                }
                else {
                    Ruta = $("#ddlUbicacion_D").data("kendoDropDownList");
                    Ruta.setDataSource(dataSource);
                    Ruta.select(0);
                }



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
            url: "Fac_Conf_Cese.aspx/getListar_Ubicacion_ddl",
            data: JSON.stringify({
                'IdTipoFuente': tipo_Fuente,
                'Tipo': _Tipo,
                "inTipOri": $("#hdfinTipOri").val()
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {

                var dataSource = new kendo.data.DataSource({
                    data: data.d
                });

                if (_Tipo == "Origen") {
                    Ruta = $("#ddlUbicacion_O").data("kendoDropDownList");
                    Ruta.setDataSource(dataSource);
                    Ruta.select(0);
                    $("#ddlUbicacion_O").data("kendoDropDownList").value(_valor);
                }
                else {
                    Ruta = $("#ddlUbicacion_D").data("kendoDropDownList");
                    Ruta.setDataSource(dataSource);
                    Ruta.select(0);
                    $("#ddlUbicacion_D").data("kendoDropDownList").value(_valor);
                }
            }
        });

    }

    function dropdownlist_Medio(e) {
        var _Medio = this.value();

        var dropdownlist_ubicacion = $("#ddlUbicacion_O").data("kendoDropDownList");
        dropdownlist_ubicacion.select(0);
        dropdownlist_ubicacion.setDataSource(null);

        var dataSource = new kendo.data.DataSource({ data: {} });
        var grid = $("#gridDetalle_O").data("kendoGrid");
        grid.setDataSource(dataSource);

        var dropdownlist = $("#ddlPlantilla_O").data("kendoDropDownList");
        dropdownlist.select(0);
        dropdownlist.setDataSource(null);

        //        var dropdownlist = $("#ddlFormato_O").data("kendoDropDownList");
        //        dropdownlist.select(0);
        //        dropdownlist.setDataSource(null);

        var _Tipo = "Origen";
        cargar_ubicacion(_Medio, _Tipo);
    }
    function dropdownlist_MedioD(e) {
        var _Medio = this.value();

        var dropdownlist_ubicacion = $("#ddlUbicacion_D").data("kendoDropDownList");
        dropdownlist_ubicacion.select(0);
        dropdownlist_ubicacion.setDataSource(null);


        var dataSource = new kendo.data.DataSource({ data: {} });
        var grid = $("#gridDetalle_D").data("kendoGrid");
        grid.setDataSource(dataSource);


        var dropdownlist = $("#ddlPlantilla_D").data("kendoDropDownList");
        dropdownlist.select(0);
        dropdownlist.setDataSource(null);


        //        var dropdownlist = $("#ddlFormato_D").data("kendoDropDownList");
        //        dropdownlist.select(0);
        //        dropdownlist.setDataSource(null);

        var _Tipo = "Destino";
        cargar_ubicacion(_Medio, _Tipo);
    }

    function dropdownlist_Ubicacion(e) {
        var _IdConfigProceso = this.value();

        var dataSource = new kendo.data.DataSource({ data: {} });
        var grid = $("#gridDetalle_O").data("kendoGrid");
        grid.setDataSource(dataSource);

        var dropdownlist = $("#ddlPlantilla_O").data("kendoDropDownList");
        dropdownlist.select(0);
        dropdownlist.setDataSource(null);


        //        var dropdownlist = $("#ddlFormato_O").data("kendoDropDownList");
        //        dropdownlist.select(0);
        //        dropdownlist.setDataSource(null);

        var _Tipo = "Origen";
        cargar_grillaDetalle(_IdConfigProceso, _Tipo);
        cargar_plantilla(_IdConfigProceso, _Tipo);



    }

    function dropdownlist_UbicacionD(e) {
        var _IdConfigProceso = this.value();

        var dataSource = new kendo.data.DataSource({ data: {} });
        var grid = $("#gridDetalle_D").data("kendoGrid");
        grid.setDataSource(dataSource);

        var dropdownlist = $("#ddlPlantilla_D").data("kendoDropDownList");
        dropdownlist.select(0);
        dropdownlist.setDataSource(null);

        //        var dropdownlist = $("#ddlFormato_D").data("kendoDropDownList");
        //        dropdownlist.select(0);
        //        dropdownlist.setDataSource(null);


        var _Tipo = "Destino";
        cargar_grillaDetalle(_IdConfigProceso, _Tipo);
        cargar_plantilla(_IdConfigProceso, _Tipo);



    }

    function cargar_Formato(_IdConfigProceso, _Tipo) {
        if (_IdConfigProceso != "") {
            $.ajax({
                type: "POST",
                url: "Fac_Conf_Cese.aspx/getListar_Formato_ddl",
                data: JSON.stringify({
                    'IdConfigProceso': _IdConfigProceso,
                    'inTipOri': $("#hdfinTipOri").val()
                }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    var dataSource = new kendo.data.DataSource({
                        data: data.d
                    });

                    //                    if (_Tipo == "Origen") {
                    //                        var ddlFormato_O = $("#ddlFormato_O").data("kendoDropDownList");
                    //                        ddlFormato_O.setDataSource(dataSource);
                    //                        ddlFormato_O.select(0);
                    //                    }
                    //                    else {
                    //                        var ddlFormato_D = $("#ddlFormato_D").data("kendoDropDownList");
                    //                        ddlFormato_D.setDataSource(dataSource);
                    //                        ddlFormato_D.select(0);
                    //                    }

                },
                error: function (xhr, err, thrErr) {

                    MostrarErrorAjax(xhr, err, thrErr);
                }

            });
        }

    }
    function cargar_FormatoLista(_IdConfigProceso, _Tipo, _valor) {
        if (_IdConfigProceso != "") {
            $.ajax({
                type: "POST",
                url: "Fac_Conf_Cese.aspx/getListar_Formato_ddl",
                data: JSON.stringify({
                    'IdConfigProceso': _IdConfigProceso,
                    'inTipOri': $("#hdfinTipOri").val()
                }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    var dataSource = new kendo.data.DataSource({
                        data: data.d
                    });

                    //                    if (_Tipo == "Origen") {
                    //                        var ddlFormato_O = $("#ddlFormato_O").data("kendoDropDownList");
                    //                        ddlFormato_O.setDataSource(dataSource);
                    //                        ddlFormato_O.select(0);
                    //                        $("#ddlFormato_O").data("kendoDropDownList").value(_valor);
                    //                    }
                    //                    else {
                    //                        var ddlFormato_D = $("#ddlFormato_D").data("kendoDropDownList");
                    //                        ddlFormato_D.setDataSource(dataSource);
                    //                        ddlFormato_D.select(0);
                    //                        $("#ddlFormato_D").data("kendoDropDownList").value(_valor);
                    //                    }

                },
                error: function (xhr, err, thrErr) {

                    MostrarErrorAjax(xhr, err, thrErr);
                }

            });
        }

    }
    function dropdownlist_Plantilla(e) {
        var _IdConfigProceso = this.value();

        //        var dropdownlist = $("#ddlFormato_O").data("kendoDropDownList");
        //        dropdownlist.select(0);
        //        dropdownlist.setDataSource(null);

        //        var _Tipo = "Origen";
        //        cargar_Formato(_IdConfigProceso, _Tipo);

    }
    function dropdownlist_PlantillaD(e) {
        var _IdConfigProceso = this.value();

        //        var dropdownlist = $("#ddlFormato_D").data("kendoDropDownList");
        //        dropdownlist.select(0);
        //        dropdownlist.setDataSource(null);

        //        var _Tipo = "Destino";
        //        cargar_Formato(_IdConfigProceso, _Tipo);


    }



    function cargar_plantilla(_IdConfigProceso, _Tipo) {
        if (_IdConfigProceso != "") {
            $.ajax({
                type: "POST",
                url: "Fac_Conf_Cese.aspx/getListar_Plantilla_ddl",
                data: JSON.stringify({
                    'IdConfigProceso': _IdConfigProceso,
                    'Tipo': _Tipo,
                    'inTipOri': $("#hdfinTipOri").val()
                }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    if (data.d.length > 0) {
                        var dataSource = new kendo.data.DataSource({
                            data: data.d
                        });

                        if (_Tipo == "Origen") {
                            var ddlPlantilla_O = $("#ddlPlantilla_O").data("kendoDropDownList");
                            ddlPlantilla_O.setDataSource(dataSource);
                            ddlPlantilla_O.select(0);
                        }
                        else {
                            var ddlPlantilla_D = $("#ddlPlantilla_D").data("kendoDropDownList");
                            ddlPlantilla_D.setDataSource(dataSource);
                            ddlPlantilla_D.select(0);
                        }

                        $("#hdfPlantilla").val(data.d[0].Plantilla);
                    }
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
                url: "Fac_Conf_Cese.aspx/getListar_Plantilla_ddl",
                data: JSON.stringify({
                    'IdConfigProceso': _IdConfigProceso,
                    'Tipo': _Tipo,
                    'inTipOri': $("#hdfinTipOri").val()
                }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    var dataSource = new kendo.data.DataSource({
                        data: data.d
                    });

                    if (_Tipo == "Origen") {
                        var ddlPlantilla_O = $("#ddlPlantilla_O").data("kendoDropDownList");
                        ddlPlantilla_O.setDataSource(dataSource);
                        ddlPlantilla_O.select(0);
                        $("#ddlPlantilla_O").data("kendoDropDownList").value(_valor);
                    }
                    else {
                        var ddlPlantilla_D = $("#ddlPlantilla_D").data("kendoDropDownList");
                        ddlPlantilla_D.setDataSource(dataSource);
                        ddlPlantilla_D.select(0);
                        $("#ddlPlantilla_D").data("kendoDropDownList").value(_valor);
                    }
                    $("#hdfPlantilla").val(data.d[0].Plantilla);
                },
                error: function (xhr, err, thrErr) {

                    MostrarErrorAjax(xhr, err, thrErr);
                }

            });
        }

    }
    function cargar_grillaDetalle(_IdConfigProceso, _Tipo) {

        var _Medio;

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
                url: "Fac_Conf_Cese.aspx/getListar_DetalleUbicacion",
                data: JSON.stringify({
                    'IdConfigProceso': _IdConfigProceso,
                    'medio': _Medio,
                    'inTipOri': $("#hdfinTipOri").val()
                }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    var dataSource;
                    var gridele;
                    if (_Tipo == "Origen") {
                        dataSource = new kendo.data.DataSource({
                            data: data.d,
                            pageSize: 10
                        });


                        gridele = $("#gridDetalle_O").data("kendoGrid");
                        gridele.setDataSource(dataSource);
                    }
                    else {
                        dataSource = new kendo.data.DataSource({
                            data: data.d,
                            pageSize: 10
                        });

                        gridele = $("#gridDetalle_D").data("kendoGrid");
                        gridele.setDataSource(dataSource);

                    }
                },
                error: function (xhr, err, thrErr) {
                    $("#tbConfImp tr.grid").hide();
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        }
    }

    $("#ddlTipoFuente_D").kendoDropDownList({
        optionLabel: {
            text: "Seleccione la Fuente...",
            value: ""
        },
        dataTextField: "text",
        dataValueField: "value",
        dataSource: [
                { text: "Fuente Base de Datos", value: "BD" },
                { text: "Fuente Archivo", value: "AR" }
        ],
        change: dropdownlist_cascadeD
    });


    $("#ddlMedio_D").kendoDropDownList({
        optionLabel: {
            text: "Seleccione el Medio...",
            value: ""
        },
        dataTextField: "text",
        dataValueField: "value",
        dataSource: [
                { text: "FTP", value: "FTP" },
                { text: "UNC", value: "UNC" }
        ],
        change: dropdownlist_MedioD
    });



    $("#ddlUbicacion_D").kendoDropDownList({
        optionLabel: {
            VcNombre: "Seleccione la Ubicación...",
            P_IdConfigFuente: ""
        },
        dataTextField: "VcNombre",
        dataValueField: "P_IdConfigFuente",
        dataSource: {},
        change: dropdownlist_UbicacionD
    });


    $("#ddlPlantilla_D").kendoDropDownList({
        optionLabel: {
            VcNombre: "Seleccione la Plantilla...",
            P_inIdPlantilla: ""
        },
        dataTextField: "VcNombre",
        dataValueField: "P_inIdPlantilla",
        dataSource: {},
        change: dropdownlist_PlantillaD,
        index: 0
    });

    //    $("#ddlFormato_D").kendoDropDownList({
    //        optionLabel: {
    //            VcNombre: "Seleccione el Formato...",
    //            P_inIdFormato: ""
    //        },
    //        dataTextField: "VcNombre",
    //        dataValueField: "P_inIdFormato"
    //    });
    $("#gridDetalle_D").kendoGrid({
        dataSource: {
        },
        width: 180,
        selectable: "single",
        sortable: false,
        pageable: {
            messages: {
                display: "{0}-{1} de {2} items",
                of: "Desde {0}",
                itemsPerPage: "items por página",
                empty: "No existe una configuración asociada",
                first: "Ir a primera página",
                last: "Ir a última página",
                next: "Ir a página siguiente",
                previous: "Ir a página anterior"
            }
        },
        columns: [
            {
                field: "VcServidor",
                width: 50,
                title: "Servidor"
            },
            {
                field: "VcRuta",
                width: 30,
                title: "Ruta/BaseDatos"
            },
              {
                  field: "VcNombre",
                  width: 100,
                  title: "Nombre"
              }]

    });

    function setValores() {
        var ddlUbicacion_O = $("#ddlUbicacion_O").data("kendoDropDownList");
        ddlUbicacion_O.value($("#hdfUbicacion").val());

        var ddlPlantilla_O = $("#ddlPlantilla_O").data("kendoDropDownList");
        ddlPlantilla_O.value($("#hdfPlantilla").val());

        //        var ddlFormato_O = $("#ddlFormato_O").data("kendoDropDownList");
        //        ddlFormato_O.value($("#hdfFormato").val());

    }

    function cargarConfiguracion(_IdConfigProceso) {
        $.ajax({
            type: "POST",
            url: "Fac_Conf_Cese.aspx/getListar_Configuracion_Origen",
            data: JSON.stringify({
                'IdConfigProceso': _IdConfigProceso,
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
                    var _Tipo = "Origen";

                    var ddlTipoFuente = $("#ddlTipoFuente_O").data("kendoDropDownList");
                    ddlTipoFuente.value(_IdTipoFuente);

                    var ddlMedio;
                    if (_IdTipoFuente != "BD") {

                        if (_IdTipoFuente == "")
                        { $("#tbConfImp tr.medio").hide(); }
                        else {
                            $("#tbConfImp tr.medio").show();
                        }

                        ddlMedio = $("#ddlMedio_O").data("kendoDropDownList");
                        ddlMedio.select(0);
                    }
                    else {
                        cargar_ubicacionLista("BD", _Tipo, _Ubicacion);
                    }

                    if (_medio != "") {
                        ddlMedio = $("#ddlMedio_O").data("kendoDropDownList");
                        ddlMedio.value(_medio);
                        cargar_ubicacionLista(_medio, _Tipo, _Ubicacion);
                    }
                    if (_Ubicacion != "") {
                        cargar_grillaDetalle(_Ubicacion, _Tipo);
                        cargar_plantillaLista(_Ubicacion, _Tipo, _Plantilla);
                    }
                    if (_Plantilla != "") {
                        cargar_FormatoLista(_Plantilla, _Tipo, _Formato);
                    }
                }
            },
            error: function (xhr, err, thrErr) {
                $("#tbConfImp tr.grid").hide();
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }
});