var Feriados = [];
var IdSeleccionado;
var IdFeriadoEditar;
var tbCamposEstadoProceso;

function regi(REGI_F_vcCODPAI,
    REGI_vcNOMEMP,
    REGI_vcDIREMP,
    REGI_vcDESUSU,
    REGI_btMostrarDatosMantenimientos,
    REGI_btCargarOrganizacionBajoDemanda,
    REGI_btPreguntarActualizacionCCostoMoverEmpleado,
    REGI_btTrabajaSucursalesFisicas,
    REGI_AsociaCYA,
    REGI_btAreaCosCero,
    REGI_vcRuc,
    REGI_btMostrarLogoEnCabecera) {

    this.REGI_F_vcCODPAI = REGI_F_vcCODPAI;
    this.REGI_vcNOMEMP = REGI_vcNOMEMP;
    this.REGI_vcDIREMP = REGI_vcDIREMP;
    this.REGI_vcDESUSU = REGI_vcDESUSU;
    this.REGI_btMostrarDatosMantenimientos = REGI_btMostrarDatosMantenimientos;
    this.REGI_btCargarOrganizacionBajoDemanda = REGI_btCargarOrganizacionBajoDemanda;
    this.REGI_btPreguntarActualizacionCCostoMoverEmpleado = REGI_btPreguntarActualizacionCCostoMoverEmpleado;
    this.REGI_btTrabajaSucursalesFisicas = REGI_btTrabajaSucursalesFisicas;
    this.REGI_AsociaCYA = REGI_AsociaCYA;
    this.REGI_btAreaCosCero = REGI_btAreaCosCero;
    this.REGI_vcRuc = REGI_vcRuc;
    this.REGI_btMostrarLogoEnCabecera = REGI_btMostrarLogoEnCabecera;
}

function isIE() { //Vefiricar Version del Internet Explorer
    var myNav = navigator.userAgent.toLowerCase();
    return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
}

function generarOpcionesHoras(hora) {
    let optionHoras = "";
    for (let i = 0; i < 24; i++) {
        let selected = generaTagSelected(i, hora);

        optionHoras += '<option ' + selected + ' value="' + i + '">' + i.toString().padStart(2, "0") + '</option>';
    }

    return optionHoras;
}

function generarOpcionesMinutos(minuto) {
    let optionMinutos = "";
    for (let i = 0; i < 60; i++) {
        let selected = generaTagSelected(i, minuto);
        
        optionMinutos += '<option ' + selected + ' value="' + i + '">' + i.toString().padStart(2, "0") + '</option>';
    }
    return optionMinutos;
}

function generaTagSelected(tiempo, tiempoAlmacenado) {
    let selected = '';
    if (tiempo.toString() === tiempoAlmacenado) {
        selected = 'selected="selected"';
    }

    return selected;
}

function DefinirGrilla() {
    tbCamposEstadoProceso = $("#tbCamposEstadoProceso").jqGrid({
        sortable: true,
        datatype: "local",
        //cellsubmit: 'clientArray',
        //editurl: 'clientArray',
        //cellEdit: true,
        multiselect: true,
        colModel: [{ name: 'vcNom', index: 'vcNom', label: 'Día', hidden: false, width: 90 },
        {
            name: 'HoraInicial', index: 'HoraInicial', title:false, label: 'Hora Inicio', hidden: false, width: 140, align: 'center', //editable: true,
            formatter: function (value, options, rData) {

                let optionMinutos = generarOpcionesMinutos(rData.minutoInicial);
                let optionHoras = generarOpcionesHoras(rData.horaInicial);

                return "<select id='" + rData.idDiaSemana + "_ddlHoraIncial' class='Visible' selected='0'>" + optionHoras +
                    "</select > : <select id='" + rData.idDiaSemana + "_ddlMinutoIncial' class='Visible' selected='0'>" + optionMinutos + "</select > ";
            }
        },
        {
            name: 'horaFinal', index: 'horaFinal', label: 'Hora Fin', title: false, hidden: false, width: 140, align: 'center', //editable: true,
            formatter: function (value, options, rData) {
                let optionMinutos = generarOpcionesMinutos(rData.minutoFinal);
                let optionHoras = generarOpcionesHoras(rData.horaFinal);
                
                return "<select id='" + rData.idDiaSemana + "_ddlHoraFinal' class='Visible' selected='0'>" + optionHoras +
                    "</select > : <select id='" + rData.idDiaSemana + "_ddlMinutoFinal' class='Visible' selected='0'>" + optionMinutos + "</select > ";
            }
        },
        {
            name: 'idDiaSemana', index: 'idDiaSemana', label: 'idDiaSemana', hidden: true, width: 200
        },
            { name: 'btLaborable', index: 'btLaborable', label: 'btLaborable', hidden: true, width: 100 }
        ],

        emptyrecords: 'No hay resultados',
        //sortname: "vcCampo", //sortname: idTabla, //Default SortColumn
        //sortorder: "asc", //Default SortOrder.
        height: "auto",
        rownumbers: true,
        shrinkToFit: false,
        onRightClickRow: function () {
            tbCamposEstadoProceso.jqGrid('resetSelection');
            return false;
        },
        //onSelectRow: function (rowid, biSelect, iCol, e) {
        //    debugger;
        //    var row = $('#tbCamposEstadoProceso').getRowData(rowid);

        //    console.log(row);

        //},
        beforeSelectRow: function (rowid, e) {
            //return false;
        },
        afterInsertRow: function (rowid, aData, rowelem) {
            if (aData.btLaborable === 'True') {
                $('#tbCamposEstadoProceso').jqGrid('setSelection', rowid);
            }
        }
    }).navGrid("#pager", { edit: false, add: false, search: false, del: false });

    $.ajax({
        type: 'POST',
        url: 'Mnt_Regi.aspx/ListarHorarioEmpresa',
        data: JSON.stringify({}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resp) {
            //debugger;
            //console.log(resp.d);

            let myData = resp.d;

            myData.forEach(function (value) {

                tbCamposEstadoProceso.jqGrid('addRowData', value.idDiaSemana, value);

            });

            
        },
        error: function () {
            console.log('Ha ocurrido un error');
        }
    });
}


$(function () {

    var hdfMostrarLogo = $("#hdfMostrarLogo").val();
    if (hdfMostrarLogo == "1" || hdfMostrarLogo == "True" || hdfMostrarLogo == "true" ) {
        $("#chkMostrarLogo").prop('checked', true);
    }

    //var indiceTab = window.parent.tabschild.tabs("option", "selected");
    //alert(indiceTab);

    ValidarNumeroEnCajaTexto("txtAnio", ValidarSoloNumero);
    //ValidarNumeroEnCajaTexto("txtRUC", ValidarSoloNumero);

    function BloquearPagina(bloqueado) {
        $(".btnNormal").button("option", "disabled", bloqueado);

        if (bloqueado) {
            $("input").attr("disabled", "disabled");
            $("select").attr("disabled", "disabled");
        }
        else {
            $("input").removeAttr("disabled");
            $("select").removeAttr("disabled");
        }
    }

    function CerroMensaje() {
        BloquearPagina(false);
    }

    $(".btnNormal").button();

    if (isIE() == 6) {
        $("#btnGuardar").css('width', '100px');
        $("#btnCerrar").css('width', '100px');
        $("#btnGuardar").css('display', 'inline-block');
        $("#btnCerrar").css('display', 'inline-block');
    }

    $("#txtDireccion").focusout(function () {
        $("#txtDireccion").val($("#txtDireccion").val().replace(/\\/g, ""));
    });

    $("#txtNombre").focusout(function () {
        $("#txtNombre").val($("#txtNombre").val().replace(/\\/g, ""));
    });

    $("#TxtPais").focusout(function () {
        $("#TxtPais").val($("#TxtPais").val().replace(/\\/g, ""));
    });

    if ($("#TxtPais").length > 0) {
        $("#TxtPais").autocomplete({
            minLength: 0,
            source: function (request, response) {
                $.ajax({
                    type: "POST",
                    url: "../../Common/WebService/General.asmx/ListarPais_x_Codigo_o_Nombre",
                    data: "{'vcCriterio': '" + $("#TxtPais").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "") + "'," +
                           "'idCliente': '" + window.parent.parent.parent.idCliente + "', 'Activo':'1'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        response($.map(result.d, function (item) {
                            return {
                                label: item.vcNomPai,
                                P_vcCodPai: item.P_vcCodPai
                                //                                category: item.Grupo.vcNom,
                                //                                inCodGru: item.Grupo.P_inCod
                            };
                        }));
                    },
                    error: function (xhr, err, thrErr) {
                        MostrarErrorAjax(xhr, err, thrErr);
                    }
                });
            },
            focus: function (event, ui) {
                $("#TxtPais").val(ui.item.label);
                return false;
            },
            select: function (event, ui) {
                Selecciono = true;
                $("#TxtPais").val(ui.item.label);
                $("#hdfPais").val(ui.item.P_vcCodPai);
                return false;
            },
            change: function (event, ui) {
                if (!Selecciono) {
                    $("#hdfPais").val("");
                }
                return false;
            },
            open: function (event, ui) {
                Selecciono = false;
                return false;
            }
        })
        .data("autocomplete")._renderItem = function (ul, item) {
            return $("<li></li>")
			    .data("item.autocomplete", item)
			    .append("<a>" + item.P_vcCodPai + "=" + item.label + "</a>")
			    .appendTo(ul);
        };
    }




    $("#btnGuardar").click(function (event) {
        let dataHorarios = tbCamposEstadoProceso.jqGrid('getGridParam', 'data');

        let dtoHorarios = dataHorarios.map(function (value) {
            return {
                idDiaSemana: value.idDiaSemana,
                vcNom: value.vcNom,
                horaInicial: $('#' + value.idDiaSemana + '_ddlHoraIncial').val(),
                minutoInicial: $('#' + value.idDiaSemana + '_ddlMinutoIncial').val(),
                horaFinal: $('#' + value.idDiaSemana + '_ddlHoraFinal').val(),
                minutoFinal: $('#' + value.idDiaSemana + '_ddlMinutoFinal').val(),
                btLaborable: $('#jqg_tbCamposEstadoProceso_' + value.idDiaSemana).is(':checked')
            };
        });

        var Archivo = $("#hdfArchivo").val();
        var Regi = new regi();
        var oRegi = "";
        //$("#TxtPrueba").val(isIE());
        if ($.trim($("#hdfPais").val()) == "") {
            alerta("Seleccione un país, es un campo obligatorio");
            $("#TxtPais").focus();
            return;
        }
        if ($.trim($("#txtNombre").val()) == "") {
            alerta("El nombre es un campo obligatorio");
            $("#txtNombre").focus();
            return;
        }

        if ($.trim($("#txtRUC").val()) == "") {
            alerta("El número de RUC es un campo obligatorio");
            $("#txtRUC").focus();
            return;
        }

        //if ($("#txtRUC").val().length < 11) {
        //    alerta("El número de ruc debe tener mínimo 11 caracteres");
        //    $("#txtRUC").focus();
        //    return;
        //}


        if (isIE() == 6) {
            Regi.REGI_F_vcCODPAI = $.trim($("#hdfPais").val());
            Regi.REGI_vcNOMEMP = $("#txtNombre").val().replace(/'/g, "&#39").replace(/\\/g, "");
            Regi.REGI_vcDIREMP = $("#txtDireccion").val().replace(/'/g, "&#39").replace(/\\/g, "");
            Regi.REGI_vcDESUSU = ($("#txtDesUsu").val() == undefined ? "" : $("#txtDesUsu").val()); //$("#txtDesUsu").val();
            Regi.REGI_btMostrarDatosMantenimientos = true;
            Regi.REGI_btCargarOrganizacionBajoDemanda = true;
            Regi.REGI_btPreguntarActualizacionCCostoMoverEmpleado = true;
            Regi.REGI_btTrabajaSucursalesFisicas = true;
            Regi.REGI_AsociaCYA = true;
            Regi.REGI_btAreaCosCero = false;
            Regi.REGI_vcRuc = $("#txtRUC").val().replace(/'/g, "&#39").replace(/\\/g, "");
            Regi.REGI_btMostrarLogoEnCabecera = $('#chkMostrarLogo').is(":checked");
            oRegi = JSON.stringify(Regi);
        } else {
            Regi.REGI_F_vcCODPAI = $.trim($("#hdfPais").val());
            Regi.REGI_vcNOMEMP = $("#txtNombre").val().replace(/'/g, "&#39");
            Regi.REGI_vcDIREMP = $("#txtDireccion").val().replace(/'/g, "&#39");
            Regi.REGI_vcDESUSU = $("#txtDesUsu").val(); //($("#txtDesUsu").val() == undefined ? "" : $("#txtDesUsu").val()); //
            Regi.REGI_vcRuc = $("#txtRUC").val().replace(/'/g, "&#39").replace(/\\/g, "");
            Regi.REGI_btMostrarLogoEnCabecera = $('#chkMostrarLogo').is(":checked");
            oRegi = JSON.stringify(Regi);
        }
        //        if ($('#chkMantenimiento').is(':checked')) {
        //            Regi.REGI_btMostrarDatosMantenimientos = true;
        //        } else {
        //            Regi.REGI_btMostrarDatosMantenimientos = false;
        //        };
        //        if ($('#chkDemanda').is(':checked')) {
        //            Regi.REGI_btCargarOrganizacionBajoDemanda = true;
        //        } else {
        //            Regi.REGI_btCargarOrganizacionBajoDemanda = false;
        //        };
        //        if ($('#chkCC').is(':checked')) {
        //            Regi.REGI_btPreguntarActualizacionCCostoMoverEmpleado = true;
        //        } else {
        //            Regi.REGI_btPreguntarActualizacionCCostoMoverEmpleado = false;
        //        };
        //        if ($('#chkSucursales').is(':checked')) {
        //            Regi.REGI_btTrabajaSucursalesFisicas = true;
        //        } else {
        //            Regi.REGI_btTrabajaSucursalesFisicas = false;
        //        };
        //        if ($('#chkCya').is(':checked')) {
        //            Regi.REGI_AsociaCYA = true;
        //        } else {
        //            Regi.REGI_AsociaCYA = false;
        //        };
        //        if ($('#chkCero').is(':checked')) {
        //            Regi.REGI_btAreaCosCero = true;
        //        } else {
        //            Regi.REGI_btAreaCosCero = false;
        //        };

        var datosFeriado = $('#grid').jqGrid('getGridParam', 'data');

        var XML_Feriados = "<?xml version=\"1.0\" encoding=\"iso-8859-1\"?><TABLE>";

        var vcCODPAI = $("#hdfPais").val();
        var inCodcli = 0;
        var inCodOri = 510;

        var i;
        for (i = 0; i < datosFeriado.length; i++) {

            var inNUMDIA = datosFeriado[i].Dia;
            var inNUMMES = datosFeriado[i].Mes;
            var inNUMANIO = datosFeriado[i].Anio;
            var DiaAnterior = (datosFeriado[i].DiaAnterior == "" ? 0 : datosFeriado[i].DiaAnterior);
            var MesAnterior = (datosFeriado[i].MesAnterior == "" ? 0 : datosFeriado[i].MesAnterior);
            var AnioAnterior = (datosFeriado[i].AnioAnterior == "" ? 0 : datosFeriado[i].AnioAnterior);


            XML_Feriados += "<DATA FERI_PF_vcCODPAI=\"" + vcCODPAI + "\" P_F_inCodcli=\"" + inCodcli + "\" P_F_inCodOri=\"" + inCodOri;
            XML_Feriados += "\" FERI_P_inNUMDIA=\"" + inNUMDIA + "\" FERI_P_inNUMMES=\"" + inNUMMES + "\" FERI_P_inNUMANIO=\"" + inNUMANIO;
            XML_Feriados += "\" DiaAnterior=\"" + DiaAnterior + "\" MesAnterior=\"" + MesAnterior + "\" AnioAnterior=\"" + AnioAnterior + "\"/>";

        }

        XML_Feriados += "</TABLE>";


        $("#dvCargando").show();
        $.ajax({
            type: "POST",
            url: "Mnt_Regi.aspx/Actualizar",

            data: "{'oRegi': '" + oRegi + "','vcRuta': '" + Archivo +
                "','xml_Feriados': '" + XML_Feriados + "', " +
                "'dtoHorarios': " + JSON.stringify(dtoHorarios)
                + "}",

            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.d == "0") {
                    CargarFeriados();
                    Mensaje("<br/><h1>Se ha guardado</h1><br/>", document, CerroMensaje);
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
                BloquearPagina(false);
            }
        });
    });

    $('#chkAnio').click(function () {

        if ($(this).is(':checked')) {

            $('#txtAnio').removeAttr('disabled');

        }
        else {
            $('#txtAnio').attr('disabled', 'disabled');
            $('#txtAnio').val("");
        }

    });

    $('#btnAgregar').click(function () {

        if ($('#ddlMes').val() == "4" || $('#ddlMes').val() == "6" || $('#ddlMes').val() == "9" || $('#ddlMes').val() == "11") {

            var DiaValido = parseInt($('#ddlDia').val());

            if (DiaValido > 30) {
                alerta('El mes seleccionado no puede tener mas de 30 días');
                return;
            }
        }

        if ($('#ddlMes').val() == "2") {

            var DiaValido = parseInt($('#ddlDia').val());

            if (DiaValido > 29) {
                alerta('El mes seleccionado no puede tener mas de 29 días');
                return;
            }
        }

        if ($("#chkAnio").is(':checked')) {

            if ($('#txtAnio').val() == "" || $('#txtAnio').val().length < 4) {
                alerta('Ingrese un año válido');
                return;
            }
            var AnioValido = parseInt($('#txtAnio').val());

            if (AnioValido < 2015) {
                alerta('Ingrese un año válido');
                return;
            }
        }

        //var datos = $("#grid").getRowData();
        var datos = $('#grid').jqGrid('getGridParam', 'data');
        var fila = 0;
        fila = datos.length + 10;

        var anio = ($('#txtAnio').val() == "" ? 0 : $('#txtAnio').val());
        var Id = $('#ddlDia').val() + '-' + $('#ddlMes').val() + '-' + anio;
        //var datos = $("#grid").getRowData(Id);

        var i;
        for (i = 0; i < datos.length; i++) {


            if (datos[i].Id.substring(0, xIndexOf('-', datos[i].Id, 2)) == Id.substring(0, xIndexOf('-', Id, 2)) && (datos[i].Anio == 0 || datos[i].Anio == "")) {
                alerta('Ya existe esa feriado registrado');
                return;
            }

            if (datos[i].Id.substring(0, xIndexOf('-', datos[i].Id, 2)) == Id.substring(0, xIndexOf('-', Id, 2)) && (datos[i].Anio != 0 && datos[i].Anio != "")) {

                if (datos[i].Anio == anio) {
                    alerta('Ya existe esa feriado registrado con el año ' + anio);
                    return;
                }

                if (anio == "") {
                    alerta('No puede Insertar un Feriado sin Año');
                    return;
                }

            }
            fila = datos[i].Fila + 1;
        }


        var datarow = { Fila: fila, Id: Id, Dia: $('#ddlDia').val(), Mes: $('#ddlMes').val(), Anio: $('#txtAnio').val(), DiaAnterior: 0, MesAnterior: 0, AnioAnterior: 0 };
        $("#grid").jqGrid('addRowData', Id, datarow);
        feriadosDefaul();
        $("#grid").trigger("reloadGrid");

    });


    $('#btnQuitar').click(function () {
        var id = $("#grid").jqGrid('getGridParam', 'selrow');
        $('#grid').jqGrid('delRowData', id);
        $("#grid").trigger("reloadGrid");
    });





    var tbDetalle = $("#grid").jqGrid({
        sortable: true,
        datatype: "local",
        colModel: [
                       { name: 'Fila', index: 'Fila', label: 'Fila', hidden: true, width: 60, sortable: false },
                       { name: 'Id', index: 'Id', label: 'Id', hidden: true, key: true, width: 60, sortable: false },
                       { name: 'Dia', index: 'Dia', label: 'Día', hidden: false, width: 90, align: 'center', sortable: true, sorttype: 'int' },
                       { name: 'Mes', index: 'Mes', label: 'Mes', hidden: false, width: 90, align: 'center', sortable: true, sorttype: 'int' },
                       { name: 'Anio', index: 'Anio', label: 'Año', hidden: false, width: 90, align: 'center', sortable: true, sorttype: 'int' },
                       { name: 'DiaAnterior', index: 'DiaAnterior', label: 'DiaAnterior', hidden: true, width: 90, sortable: false },
                       { name: 'MesAnterior', index: 'MesAnterior', label: 'MesAnterior', hidden: true, width: 90, sortable: false },
                       { name: 'AnioAnterior', index: 'AnioAnterior', label: 'AnioAnterior', hidden: true, width: 90, sortable: false }
        ],
        ondblClickRow: function (id) {

            EditarFeriado();
            //var anio = ($('#txtAnio').val() == "" ? 0 : $('#txtAnio').val());

        },
        pagination: true,
        viewrecords: true,
        loadtext: 'Cargando datos...',
        recordtext: "{0} - {1} de {2} días",
        emptyrecords: 'No hay resultados',
        sortname: "Mes", //sortname: idTabla, //Default SortColumn
        sortorder: "desc", //Default SortOrder.
        rownumbers: true,
        shrinkToFit: false,
        //altRows: true,
        //pager: '#pager',
        //rowNum: 6,

        width: 335,
        height: 100
        //caption: "Servidores"

    }).navGrid("#pager", { edit: false, add: false, search: false, del: false });



    function CargarFeriados() {

        $("#grid").jqGrid("clearGridData", true);

        $.ajax({
            type: "POST",
            url: "Mnt_Regi.aspx/ListarFeriados",
            data: JSON.stringify({
                "codPais": $("#hdfPais").val()
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {

                var datos = data.d;

                if (datos.length > 0) {

                    var fila = 10;

                    var i;
                    for (i = 0; i < datos.length; i++) {
                        var datarow = { Fila: fila, Id: datos[i].idFeriado, Dia: datos[i].inNUMDIA, Mes: datos[i].inNUMMES, Anio: (datos[i].inNUMANIO == 0 ? "" : datos[i].inNUMANIO), DiaAnterior: datos[i].inNUMDIA, MesAnterior: datos[i].inNUMMES, AnioAnterior: (datos[i].inNUMANIO == 0 ? "" : datos[i].inNUMANIO) };
                        $("#grid").jqGrid('addRowData', datos[i].idFeriado, datarow);
                        fila = fila + 1;
                    }
                    $("#grid").trigger("reloadGrid");

                }

            }
        });
    }

    CargarFeriados();

    function EditarFeriado() {
        // 
        IdSeleccionado = undefined;

        IdSeleccionado = $('#grid').jqGrid('getGridParam', 'selrow');

        IdFeriadoEditar = IdSeleccionado;

        if (IdSeleccionado == undefined) {
            alerta("Seleccione un registro");
            return;
        }

        $("#btnQuitar").css({ "display": "none" });
        $("#btnAgregar").css({ "display": "none" });
        $("#btnEditar").css({ "display": "none" });

        $("#btnAceptar").css({ "display": "" });
        $("#btnCancelar").css({ "display": "" });


        var datos = $("#grid").jqGrid('getRowData', IdSeleccionado);

        $('#ddlDia').val(datos.Dia);
        $('#ddlMes').val(datos.Mes);

        if (datos.Anio != "") {

            $('#txtAnio').removeAttr('disabled');
            $('#txtAnio').val(datos.Anio);
            $('#chkAnio').prop('checked', true);
        }
        else {
            $('#txtAnio').attr('disabled', 'disabled');
            $('#txtAnio').val("");
            $('#chkAnio').prop('checked', false);
        }
    }

    $("#btnCerrar").live("click", function () {
        window.parent.tabschild.tabs("remove", indiceTab);
    });

    $("#btnEditar").live("click", function () {
        EditarFeriado();
    });

    $("#btnAceptar").live("click", function () {

        var anio = ($('#txtAnio').val() == "" ? 0 : $('#txtAnio').val());
        var Id = $('#ddlDia').val() + '-' + $('#ddlMes').val() + '-' + anio;

        var datos = $('#grid').jqGrid('getGridParam', 'data');

        var i;
        for (i = 0; i < datos.length; i++) {


            if (datos[i].Id.substring(0, xIndexOf('-', datos[i].Id, 2)) == Id.substring(0, xIndexOf('-', Id, 2)) && (datos[i].Anio == 0 || datos[i].Anio == "") && datos[i].Id.substring(0, xIndexOf('-', datos[i].Id, 2)) != IdFeriadoEditar.substring(0, xIndexOf('-', Id, 2))) {
                alerta('Ya existe esa feriado registrado');
                return;
            }

            if (datos[i].Id.substring(0, xIndexOf('-', datos[i].Id, 2)) == Id.substring(0, xIndexOf('-', Id, 2)) && (datos[i].Anio != 0 && datos[i].Anio != "")) {

                if (datos[i].Anio == anio && datos[i].Anio != IdFeriadoEditar.substring(9, 5)) {
                    alerta('Ya existe esa feriado registrado con el año ' + anio);
                    return;
                }

                if (anio == "") {
                    alerta('No puede Insertar un Feriado sin Año');
                    return;
                }
            }

        }

        if ($('#ddlMes').val() == "4" || $('#ddlMes').val() == "6" || $('#ddlMes').val() == "9" || $('#ddlMes').val() == "11") {

            var DiaValido = parseInt($('#ddlDia').val());

            if (DiaValido > 30) {
                alerta('El mes seleccionado no puede tener mas de 30 días');
                return;
            }
        }

        if ($('#ddlMes').val() == "2") {

            var DiaValido = parseInt($('#ddlDia').val());

            if (DiaValido > 29) {
                alerta('El mes seleccionado no puede tener mas de 29 días');
                return;
            }
        }

        if ($("#chkAnio").is(':checked')) {

            if ($('#txtAnio').val() == "" || $('#txtAnio').val().length < 4) {
                alerta('Ingrese un año válido');
                return;
            }
            var AnioValido = parseInt($('#txtAnio').val());

            if (AnioValido < 2015) {
                alerta('Ingrese un año válido');
                return;
            }
        }


        $("#btnQuitar").css({ "display": "" });
        $("#btnAgregar").css({ "display": "" });
        $("#btnEditar").css({ "display": "" });
        $("#btnAceptar").css({ "display": "none" });
        $("#btnCancelar").css({ "display": "none" });


        $("#grid").jqGrid('setCell', IdSeleccionado, 'Dia', $('#ddlDia').val());
        $("#grid").jqGrid('setCell', IdSeleccionado, 'Mes', $('#ddlMes').val());
        $("#grid").jqGrid('setCell', IdSeleccionado, 'Anio', ($('#txtAnio').val() == "" ? "" : $('#txtAnio').val()));
        $("#grid").jqGrid('setCell', IdSeleccionado, 'Id', Id);

        feriadosDefaul();
        $("#grid").trigger("reloadGrid");
    });


    function feriadosDefaul() {
        $('#ddlDia').val("1");
        $('#ddlMes').val("1");
        $('#txtAnio').val("");
    }

    $("#btnCancelar").live("click", function () {
        $("#btnQuitar").css({ "display": "" });
        $("#btnAgregar").css({ "display": "" });
        $("#btnEditar").css({ "display": "" });
        $("#btnAceptar").css({ "display": "none" });
        $("#btnCancelar").css({ "display": "none" });

        feriadosDefaul();
    });

    DefinirGrilla();


    $('#ddlConfigHorario').on('change', function () {
        if ($('#ddlConfigHorario').val() === '1') {
            $('#gbox_tbCamposEstadoProceso').hide();
        } else {
            $('#gbox_tbCamposEstadoProceso').show();
        }
    });

    $('#gbox_tbCamposEstadoProceso').css('margin-top', 20);
});

function xIndexOf(Val, Str, x) {
    if (x <= (Str.split(Val).length - 1)) {
        Ot = Str.indexOf(Val);
        if (x > 1) { var i; for (i = 1; i < x; i++) { var Ot = Str.indexOf(Val, Ot + 1); } }
        return Ot;
    } else { alert(Val + " Occurs less than " + x + " times"); return 0; }
}