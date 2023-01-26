var Selecciono = false;
var oCulturaLocal;
var extArray = [".jpg", ".jpeg", ".bmp", ".png", ".gif"];
var vcNomModeloDispLigero = "";
var vcCodModeloDispLigero = "";

function item(Codigo, Valor) {
    this.Codigo = Codigo;
    this.Valor = Valor;
}

//        function ValidarExtencion() {
//            var ok = true;
//            if (!ValidaExtensionImagen()) {
//                alerta("Seleccione un archivo del tipo imagen(jpg, jpeg, bmp, png, gif)");
//                $("#fuArchivo").focus();
//                ok = false;
//            } else {
//                ok = true;
//            };
//            return ok;
//            //$("#btnCargar").click();
//        }

//        function CargarImagen() {
//              $.ajax({
//                  type: "POST",
//                  url: "Mnt_ModeloDispositivo.aspx/CarbarImagen",
//                  data: { file: $("#fuArchivo")[0].files["0"] },
//                  //contentType: 'multipart/form-data',
//                  //contentType: 'image/jpeg; charset=utf-8',
//                  success: function () { alerta("Data Uploaded: "); }
//              });
//        };

function cargaImagen() {
    var $pagina = "Mnt_ImagenCarga.aspx?md=" + $("#hdfModeloDispositivo").val() + "&vcArc=" + $("#hdfArchivo").val();
    //alert($pagina);
    $("#ifCargarImagen").attr("src", $pagina);
}

//        function ValidaExtensionImagen() {
//            var Archivo = $("#fuArchivo").val();
//            var ext = Archivo.slice(Archivo.lastIndexOf(".")).toLowerCase();
//            if (Archivo == "") {
//                return true;
//            }
//            alert($('#hdfArchivo').val());
//            for (var i = 0; i < extArray.length; i++) {
//                if (extArray[i] == ext) {
//                    return true;
//                }
//            }
//            
//            return false;
//        }

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
    if ($("#hdfModeloDispositivo").val() == "") {
        $("#txtNombre").val("");
        $(".VARCHAR").val("");
        $(".INT").val("");
        $(".DECIMAL").val("");
        $(".DATE").val("");
        $(".DATETIME").val("");
        $("#txtNombre").focus("");
        $("#ddlTipoServicio").prop('selectedIndex', 0);
    }
    else {
        window.parent.tab.tabs("remove", indiceTab);
        //eliminar temporales
    }
}

var oCulturaDispositivo;
$(function () {
    var indiceTab;
    try {
        indiceTab = window.parent.tab.tabs("option", "selected");
    }
    catch (e) {
    }

    try {
        oCulturaDispositivo = window.parent.parent.oCulturaUsuario;
        if (oCulturaDispositivo === undefined) {
            oCulturaDispositivo = window.parent.parent.parent.oCulturaUsuario;
        }

        if (oCulturaDispositivo === undefined) {
            $.ajax({
                type: "POST",
                url: "../../../Common/WebService/General.asmx/ObtenerCulturaPrincipalUsuario",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    oCulturaDispositivo = result.d;

                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        } else {
            //Inicio();
        }
    } catch (e) {

    }

    var dll = [];
    var lst = [];
    var dllAct = [];
    var cont = 0;
    var strFuncion = "function Precios(){ this.codOperador; ";
    var strOpeAnt = 0;
    var strOpeEdit;
    var vcNomCamXML = "P_F_inCodOpe,P_F_inCodModDis,";
    var vcTipDatXML = "P_F_inCodOpe INT,P_F_inCodModDis INT,";
    var preciosOperador = [];
    oCulturaLocal = window.parent.parent.oCulturaUsuario;

    //ValidarNumeroEnCajaTexto("txtCantidad", ValidarSoloNumero);
    try {
        $(".PRECIOS").each(function () {
            strFuncion = strFuncion + "this." + $(this).attr("obj") + "; ";
            vcNomCamXML = vcNomCamXML + $(this).attr("obj") + ",";
            vcTipDatXML = vcTipDatXML + $(this).attr("obj") + " " + $(this).attr("tipDat") + ",";

            if ($(this).attr("tipDat").indexOf("DECIMAL") >= 0) {
                if (oCulturaLocal.vcCodCul.toString().toLowerCase() == 'es-pe') {
                    ValidarNumeroEnCajaTexto("txt_" + $(this).attr("obj"), ValidarDecimalPositivo, oCulturaLocal, false);
                } else {
                    ValidarNumeroEnCajaTexto("txt_" + $(this).attr("obj"), FormatoNumero, oCulturaLocal);
                }
            }
            if ($(this).attr("tipDat").indexOf("INT") >= 0) {
                ValidarNumeroEnCajaTexto("txt_" + $(this).attr("obj"), ValidarEnteroPositivo, oCulturaLocal, false);
            }
        });
    }
    catch (e) {
        oCulturaLocal = window.parent.oCulturaUsuario;
        $(".PRECIOS").each(function () {
            strFuncion = strFuncion + "this." + $(this).attr("obj") + "; ";
            vcNomCamXML = vcNomCamXML + $(this).attr("obj") + ",";
            vcTipDatXML = vcTipDatXML + $(this).attr("obj") + " " + $(this).attr("tipDat") + ",";

            if ($(this).attr("tipDat").indexOf("DECIMAL") >= 0) {
                if (oCulturaLocal.vcCodCul.toString().toLowerCase() == 'es-pe') {
                    ValidarNumeroEnCajaTexto("txt_" + $(this).attr("obj"), ValidarDecimalPositivo, oCulturaLocal, false);
                } else {
                    ValidarNumeroEnCajaTexto("txt_" + $(this).attr("obj"), FormatoNumero, oCulturaLocal);
                }
            }
            if ($(this).attr("tipDat").indexOf("INT") >= 0) {
                ValidarNumeroEnCajaTexto("txt_" + $(this).attr("obj"), ValidarEnteroPositivo, oCulturaLocal, false);
            }
        });

    }
    

    Mantenimiento_Mostrar_VARBINARY("","../../../");

    strFuncion = strFuncion + "}";
    eval(strFuncion);
    cargaImagen();

    $("#ddlTipo").change(function () {
        fnObtenerTipoServicio_porIdTipoModeloDispisitivo();
    });

    //ActivarCombokendo("#ddlTipoServicio", 200);
    //ActivarCombokendo("#ddlTipo", 200);
    $("#ddlTipoServicio,#ddlTipo").removeClass("ui-widget-content ui-corner-all");
    $("#ddlTipoServicio,#ddlTipo").css("padding", "0px");
    $("#ddlTipoServicio,#ddlTipo").css("margin", "0px");
    $("#ddlTipoServicio").kendoComboBox(
    {
        filter: "contains",
        suggest: true,
        height: 200,
        dataTextField: "vcNom",
        dataValueField: "P_inCodTipSer"
    }
    );

    $("#ddlTipo").kendoComboBox(
    {
        filter: "contains",
        suggest: true,
        height: 200,
        dataTextField: "Descripcion",
        dataValueField: "IdTipoModeloDispositivo"
    }
    );

    $(".btnPicklist").button();
    $(".btnPicklist").css({ "width": "80px" });
    $("#lstPicklist").css({ "height": "150px" });

    $("#txt_Planes").keypress(ValidarAlfaNumericoConEspacios);  // $("#txt_Dispositivos").keypress(ValidarAlfaNumericoConEspacios);

    if ($("#hdfCodPlanes").val() != "") {
        var id = $("#hdfCodPlanes").val();
        var nombre = $("#hdfNomPlanes").val();
        var arrID = id.substring(0, id.length - 1).split(",");
        var arrNOM = nombre.substring(0, nombre.length - 2).split("*,");
        var t = 0;

        for (t = 0; t < arrID.length; t++) {
            if (arrNOM[t] != null && arrNOM[t] != "")
            { $('#lstPicklist').append('<option value="' + arrID[t] + '">' + arrNOM[t] + '</option>'); }
        }
    }

    $("#txt_Planes").autocomplete({
        minLength: 0,
        source: function (request, response) {

            var Dato = $("#txt_Planes").val();
            Dato = $.trim(Dato);
            if (Dato == '') {
                Dato = 'x@x@x';
            }

            $.ajax({
                type: "POST",
                url: "../../../Common/WebService/General.asmx/ListarPlanes",
                data: "{'maxFilas': '" + 10 + "'," +
                      "'vcNomPlan': '" + Dato.replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92") + "'," +
                      "'inTipLin': '0'," +
                //"'inTipLin': '" + $("#hdfCodLinTip_X_User").val() + "'," +
                      "'idCliente': '" + $("#hdfCodCliente").val() + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    response($.map(result.d, function (item) {
                        return {
                            label: $.trim(item.vcNom),
                            P_inCod: $.trim(item.P_inCod)
                        };
                    }));
                },
                cache: false,
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alerta(errorThrown);
                }
            });
        },
        focus: function (event, ui) {
            $("#txt_Planes").val(ui.item.label);
            return false;
        },
        select: function (event, ui) {
            Selecciono = true;
            $("#txt_Planes").val(ui.item.label);
            $("#hdfCodPlanes").val(ui.item.P_inCod);
            return false;
        },
        change: function (event, ui) {
            if (!Selecciono)
            { $("#hdfCodPlanes").val(""); }
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
            .append("<a>" + item.label + "</a>")
            .appendTo(ul);
    };

    $("#btnPicklistAgregar").live("click", function () {
        fnPicklistAgregar();
    });

    $("#btnPicklistEliminar").live("click", function () {
        fnPicklistEliminar();
    });
    $('#txt_Planes').keypress(function (event) {
        if (event.which == '13') {
            if ($.trim($('#txt_Planes').val()) != '' && Selecciono == true) {
                fnPicklistAgregar();
            }
        }
        else {
            Selecciono = false;
        }
    });

    ActivarCombokendo("#ddlOperador", 200);
    //$("#ddl_picTipMod").append($("<option></option>").val("-1").text("--Seleccione--"));
    //$("#ddl_picTipMod.option").eq(1).before($("<option></option>").val("-1").text("--Seleccione--"));
    //ActivarCombokendo("#ddl_picTipMod", 200);
    //ActivarCombokendo("#ddl_btSopLin", 200);
    //ActivarCombokendo(".VARCHAR", 200);
    //ActivarCombokendo(".BIT", 200);
    var i = 0;
    for (i = 0; i < $("#ddlOperador")[0].length; i++) {
        /*var preciosmovistar = new Precios();*/
        var strOperador = "precios" + $("#ddlOperador")[0][i].value;
        eval("var " + strOperador + " = new Precios(); " + strOperador + "['codOperador'] = " + $("#ddlOperador")[0][i].value + ";");
        eval("$('.PRECIOS').each(function () { " + strOperador + "[$(this).attr('obj')] = ''; }); preciosOperador.push(" + strOperador + ");");
    }

    //location.reload();
    $("#ddlOperador").focus(function () {
        strOpeAnt = this.value;
    }).change(function () {
        var combo = this;
        //Grabar datos en memoria
        eval(strOperador + "['codOperador'] = " + strOpeAnt + ";");
        $(".PRECIOS").each(function () {
            var cajaTexto = $(this);
            var i = 0;
            for (i = 0; i < $("#ddlOperador")[0].length; i++) {
                if ($("#ddlOperador")[0][i].value == strOpeAnt) {
                    var strOperador = "precios" + $("#ddlOperador")[0][i].value;
                    eval(strOperador + "[cajaTexto.attr('obj')] = cajaTexto.val();");
                }
            }
        });

        // Cargar datos del Item elegido
        $(".PRECIOS").each(function () {
            strOpeAnt = combo.value;
            var cajaTexto = $(this);
            var i = 0;
            for (i = 0; i < $("#ddlOperador")[0].length; i++) {
                if ($("#ddlOperador")[0][i].value == strOpeAnt) {
                    var strOperador = "precios" + $("#ddlOperador")[0][i].value;
                    if (oCulturaLocal.vcCodCul.toString().toLowerCase() == 'es-pe') {
                        cajaTexto.val(FormatoNumero(preciosOperador[i][cajaTexto.attr('obj')], oCulturaLocal));
                    } else {
                        cajaTexto.val(FormatoNumero(preciosOperador[i][cajaTexto.attr('obj')], oCulturaLocal));
                    }

                }
            }
            if ($(this).hasClass("DATE")) {
                cajaTexto.val(cajaTexto.val().substring(0, 10));
            }
        });
    });

    $(".PRECIOS").change(function () { fnActualizarVariablesPrecios($(this)); });
    $(".PRECIOS").keyup(function () { fnActualizarVariablesPrecios($(this)); });
    $(".PRECIOS").focusout(function () { fnActualizarVariablesPrecios($(this)); });
    function fnActualizarVariablesPrecios(_txt) {
        var cajaTexto = _txt;
        //alert(cajaTexto.val());
        preciosOperador[$("#ddlOperador")[0].selectedIndex][cajaTexto.attr('obj')] = cajaTexto.val();
    }

    IniciarPagina();
    $(".btnNormal").button();

    $("h3", "#bnValoresOperador").css({ "margin-top": "0px" });

    ValidarNumeroEnCajaTexto("txtPrecioLista", ValidarDecimal, oCulturaLocal, false);
    ValidarNumeroEnCajaTexto("txtPrecioEspecial", ValidarDecimal, oCulturaLocal, false);
    ValidarNumeroEnCajaTexto("txtCostoEquipo", ValidarDecimal, oCulturaLocal, false);
    ValidarNumeroEnCajaTexto("txtCostoReposicion", ValidarDecimal, oCulturaLocal, false);

    $(".VARCHAR").keypress(ValidarCadena);
    $(".INT").keypress(ValidarEntero);
    $(".DECIMAL").keypress(ValidarDecimal);
    $(".DATE").keypress(ValidarFecha);
    $(".DATETIME").keypress(ValidarFechaHora);

    $(".DATETIME").AnyTime_picker({
        format: "%d/%m/%Y %H:%i:%s",
        labelTitle: "Fecha-Hora",
        labelHour: "Hora",
        labelMinute: "Minuto",
        labelSecond: "Segundo",
        labelYear: "Año",
        labelMonth: "Mes",
        labelDayOfMonth: "Dia",
        monthAbbreviations: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        dayAbbreviations: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado']
    });

    $(".DATE").datepicker({
        changeMonth: true,
        changeYear: true
    });

    function IniciarPagina() {
        DimPosElementos();
        CargarComboLista();
        CargarOperadores();
    }

    $(window).resize(function () {
        DimPosElementos();
    });

    function DimPosElementos() {
        var Alto = $(window).height();
        $("#dvCampo").css({ height: Alto - 80 });
    }

    //            $("#txtNombre").focusout(function () {
    //                $("#txtNombre").val($("#txtNombre").val().replace(/\\/g, ""));
    //            });

    $("#btnModelosPlan").click(function (event) {
        $('#dvModelosPlan').dialog({
            title: "Modelos del Plan",
            width: 500,
            modal: true,
            buttons: {
                "Aceptar": function () {
                    $(this).dialog("close");
                },
                "Cerrar": function () {
                    $(this).dialog("close");
                }
            }
        });
    });

    $("#btnGuardar").live("click", function () {
        var Modelos_Plan = "";
        var Nombre = $.trim($("#txtNombre").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92"));
        var TipoServicio = $("#ddlTipoServicio").val();
        var btVig = 0;
        var Grupos = "";
        var CamposDinamicos = "";
        var descrip = $("#txtDescripcion").data("kendoEditor").value().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92");
        if ($('#chkEstado').is(':checked')) {
            btVig = 1;
        }
        var RolesTot = 0;
        var RolDelete = 0;
        var GruposDelete = "";
        cont = 0;

        $("#lstPicklist option").each(function (e) {
            Modelos_Plan += this.value + ',';
        });
        if (Modelos_Plan != "") {
            Modelos_Plan = Modelos_Plan.substring(0, Modelos_Plan.length - 1);
        }

        $.ajax({
            type: "POST",
            url: "Mnt_ModeloDispositivo.aspx/CargarRolesActualizados",
            data: "{'P_inCod': '" + 6 + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                $("#hdfddlGrupoActualizado").val(msg.d);
                dllAct = JSON.parse($("#hdfddlGrupoActualizado").val());
                $("#lstbRolesAgregados option").each(function (i) {
                    RolesTot += 1;
                    RolDelete = 0;
                    if ($(dllAct).length > 0) {
                        var x;
                        for (x in dllAct) {
                            if (parseInt(this.value) == parseInt(dllAct[x].Codigo)) {
                                cont += 1;
                                RolDelete += 1;
                                Grupos += this.value + ',';
                            }
                        }
                        if (RolDelete == 0) {
                            GruposDelete += (GruposDelete == "" ? $(this).text() : ',' + $(this).text());
                        }
                    }
                });
                //Validar Si un Rol agregado a la Lista esta eliminado.
                if (RolesTot > cont) {
                    RolesTot = 0;
                    cont = 0;
                    alerta("Algunos Roles (" + GruposDelete + ") ya no existen o fueron eliminados.");
                    return;
                }
                else {
                    if (Nombre == "") {
                        alerta("El nombre es un campo obligatorio");
                        $("#txtNombre").val('');
                        $("#txtNombre").focus();
                        return;
                    }
                    if (descrip == '') {
                        if ($("#hdfOcultarCamposLigero").val() != "1") {
                            alerta("La descripción es un campo obligatorio");
                            $("#txtDescripcion").focus();
                            return;
                        }
                    }
                    if (TipoServicio == '-1') {
                        alerta("El Tipo de Servicio es un campo obligatorio");
                        $("#ddlTipoServicio").focus();
                        return;
                    }
                    //if (TipoServicio == "-1") {
                    //    alerta("Seleccione un tipo de servicio, es campo obligatorio");
                    //    $("#ddlTipoServicio").focus();
                    //    return;
                    //}

                    $(".VARCHAR").each(function (i) {
                        if (this.value != "") {
                            if (!$(this).hasClass('PRECIOS') && $(this).attr("obj") != undefined) {
                                CamposDinamicos += "[" + $(this).attr("obj") + "]";
                                CamposDinamicos += " = \"";
                                CamposDinamicos += this.value.replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92");
                                CamposDinamicos += "\",";
                            }
                        }
                    });


                    $(".INT").each(function (i) {
                        if (this.value != "") {
                            if (!$(this).hasClass('PRECIOS')) {
                                CamposDinamicos += "[" + $(this).attr("obj") + "]";
                                CamposDinamicos += " = ";
                                CamposDinamicos += this.value;
                                CamposDinamicos += ",";
                            }
                        }
                    });

                    $(".DECIMAL").each(function (i) {
                        if (this.value != "") {
                            if (!$(this).hasClass('PRECIOS')) {
                                CamposDinamicos += "[" + $(this).attr("obj") + "]";
                                CamposDinamicos += " = ";
                                CamposDinamicos += this.value;
                                CamposDinamicos += ",";
                            }
                        }
                    });

                    //                            for (var k = 0; k < $(".DECIMAL").length; k++) {
                    //                                if ($($(".DECIMAL")[k]).val() != "") {
                    //                                    if ( $($(".DECIMAL")[k]).hasClass('PRECIOS')) {
                    //                                        CamposDinamicos += "[" + $($(".DECIMAL")[k]).attr("obj") + "]";
                    //                                        CamposDinamicos += " = ";
                    //                                        CamposDinamicos += $($(".DECIMAL")[k]).val();
                    //                                        CamposDinamicos += ",";
                    //                                    }
                    //                                }
                    //                            }


                    $(".DATE").each(function (i) {
                        if (this.value != "") {
                            if (!$(this).hasClass('PRECIOS')) {
                                CamposDinamicos += "[" + $(this).attr("obj") + "]";
                                CamposDinamicos += " = \"";
                                CamposDinamicos += this.value;
                                CamposDinamicos += "\",";
                            }
                        }
                    });
                    $(".DATETIME").each(function (i) {
                        if (this.value != "") {
                            if (!$(this).hasClass('PRECIOS')) {
                                CamposDinamicos += "[" + $(this).attr("obj") + "]";
                                CamposDinamicos += " = \"";
                                CamposDinamicos += this.value;
                                CamposDinamicos += "\",";
                            }
                        }
                    });
                    $(".BIT").each(function (i) {
                        if (!$(this).hasClass('PRECIOS')) {
                            CamposDinamicos += "[" + $(this).attr("obj") + "]";
                            CamposDinamicos += " = ";
                            if ($("input", this).is(':checked') == true) {
                                CamposDinamicos += "1";
                            }
                            else {
                                CamposDinamicos += "0";
                            }
                            CamposDinamicos += ",";
                        }
                    });


                    var vcAdjuntos = "";
                    $(".VARBINARY").each(function (i) {
                        var vcNomCon = $(this).attr("obj");
                        if ($(this).hasClass("imgButton")) { //habilitado
                            if ($(this).attr("oblig") == "True" && $('#file_' + vcNomCon).text() == "") {
                                vcVacio = "1";
                            } else {
                                
                                if (this.value != "") {
                                    vcAdjuntos += "[" + $(this).attr("obj") + "],";
                                    vcAdjuntos += $('#file_' + vcNomCon).text() + ";";
                                }
                                else {
                                    vcAdjuntos += "[" + $(this).attr("obj") + "],";
                                    vcAdjuntos += ";";
                                }
                            }
                        }
                    });

                    //Grabar datos en memoria del valor actual del combo
                    if ($("#hdfModeloDispositivo").val() == "") {
                        eval(strOperador + "['codOperador'] = " + strOpeAnt + ";");
                        $(".PRECIOS").each(function () {
                            var cajaTexto = $(this);
                            var i = 0;
                            for (i = 0; i < $("#ddlOperador")[0].length; i++) {
                                if ($("#ddlOperador")[0][i].value == strOpeAnt) {
                                    var strOperador = "precios" + $("#ddlOperador")[0][i].value;
                                    eval(strOperador + "[cajaTexto.attr('obj')] = cajaTexto.val();");
                                }
                            }
                        });
                    }
                    else {
                        //                                eval(strOperador + "['codOperador'] = " + strOpeAnt + ";")
                        //                                $(".PRECIOS").each(function () {
                        //                                    var cajaTexto = $(this);
                        //                                    for (var i = 0; i < $("#ddlOperador")[0].length; i++) {
                        //                                        if ($("#ddlOperador")[0][i].value == strOpeAnt) {
                        //                                            var strOperador = "precios" + $("#ddlOperador")[0][i].value;
                        //                                            eval(strOperador + "[cajaTexto.attr('obj')] = cajaTexto.val();");
                        //                                        }
                        //                                    };
                        //                                });

                        $("#ddlOperador option").each(function () {
                            strOpeEdit = $(this).val();
                            eval(strOperador + "['codOperador'] = " + strOpeEdit + ";");
                            $(".PRECIOS").each(function () {
                                var cajaTexto = $(this);
                                var i = 0;
                                for (i = 0; i < $("#ddlOperador")[0].length; i++) {
                                    if ($("#ddlOperador")[0][i].value == strOpeEdit) {
                                        var strOperador = "precios" + $("#ddlOperador")[0][i].value;
                                        eval(strOperador + "[cajaTexto.attr('obj')] = preciosOperador[i][cajaTexto.attr('obj')];");
                                    }
                                }
                            });
                        });

                        eval(strOperador + "['codOperador'] = " + strOpeAnt + ";");
                        $(".PRECIOS").each(function () {
                            var cajaTexto = $(this);
                            var i = 0;
                            for (i = 0; i < $("#ddlOperador")[0].length; i++) {
                                if ($("#ddlOperador")[0][i].value == strOpeAnt) {
                                    var strOperador = "precios" + $("#ddlOperador")[0][i].value;
                                    eval(strOperador + "[cajaTexto.attr('obj')] = cajaTexto.val();");
                                }
                            }
                        });
                    }

                    //Campos Dinamicos Por Operador
                    var XMLOperador = "<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?><ROOT>";
                    //eval(strOperador + "['codOperador'] = " + strOpeAnt + ";")
                    var i = 0;
                    for (i = 0; i < $("#ddlOperador")[0].length; i++) {
                        if ($("#ddlOperador")[0][i].value != 0) {
                            XMLOperador = XMLOperador + "<OPERADORES P_F_inCodOpe=\"" + $("#ddlOperador")[0][i].value + "\" P_F_inCodModDis=\"0\" ";
                            $(".PRECIOS").each(function () {
                                var objCajaTexto = $(this);
                                var strCam = objCajaTexto.attr('obj');
                                var valor = "";
                                eval("valor = precios" + $("#ddlOperador")[0][i].value + "[objCajaTexto.attr('obj')];");


                                //valor = ParseFloatMultiPais(valor, window.parent.parent.oCulturaUsuario);
                                valor = ParseFloatMultiPais(valor, oCulturaDispositivo)

                                if (valor != "") {
                                    if (objCajaTexto.hasClass('DATE')) {
                                        var dt = valor.substring(0, 10).split("/");
                                        valor = dt[1] + "/" + dt[0] + "/" + dt[2];
                                    } else if (objCajaTexto.hasClass('DECIMAL')) {
                                        //valor = valor.replace(window.parent.parent.oCulturaUsuario.vcSimSepMil, "");
                                        valor = valor;
                                    }
                                    XMLOperador = XMLOperador + strCam + "=\"" + valor.replace(/^\s+|\s+$/g, '') + "\" ";
                                } else {
                                    if (objCajaTexto.hasClass('INT') || objCajaTexto.hasClass('DECIMAL')) {
                                        XMLOperador = XMLOperador + strCam + "=\"0\" ";
                                    } else if (!objCajaTexto.hasClass('DATE')) { //si el tipo de dato es DATE no se carga su valor en XMLOperador - 28-11-2013 wapumayta
                                        XMLOperador = XMLOperador + strCam + "=\"NULL\" ";
                                    }
                                }
                            });
                            XMLOperador = XMLOperador + "/>";
                        }
                    }
                    XMLOperador = XMLOperador + "</ROOT>";

                    $.ajax({
                        type: "POST",
                        url: "Mnt_ModeloDispositivo.aspx/Guardar",
                        data: "{'inCod': '" + $("#hdfModeloDispositivo").val() + "'," +
                   "'vcNomModDis': '" + Nombre.replace(/'/g, "&#39") + "'," +
                   "'Grupos': '" + Grupos + "'," +
                   "'vcCamDim': '" + CamposDinamicos + "'," +
                   "'vcArc': '" + $("#hdfArchivo").val() + "'," +
                   "'btVig': '" + btVig + "'," +
                   "'inCodTipSer': '" + TipoServicio + "'," +
                   "'vcNomCamXML': '" + vcNomCamXML + "'," +
                   "'vcTipDatXML': '" + vcTipDatXML + "'," +
                   "'vcAdj': '" + vcAdjuntos + "'," +
                   "'vcDesc': '" + descrip.replace(/'/g, "&#39") + "'," +
                   "'XMLOperador': '" + XMLOperador + "'," +
                   "'vcTipoChip': '" + $("#ddlTipoChip").val() + "'," + //agregado 13/08/2014 - wapumayta
                   "'F_inCodMarca': '" + bpMarca_Valor + "'," +
                   "'vcPlanes': '" + Modelos_Plan + "'}",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (msg) {
                            if (msg.d != 0) {
                                if ($("#hdfOcultarCamposLigero").val() != "1") {
                                    window.parent.ActualizarGrilla();
                                }

                                if ($("#hdfOcultarCamposLigero").val() == "1") {

                                    if ($("#hdfTipoLinea").val() == "2") {
                                        $("#btnCerrar").click();
                                        return;
                                    }

                                    vcCodModeloDispLigero = msg.d.toString()
                                    vcNomModeloDispLigero = $("#txtNombre").val();
                                }

                                Mensaje("<br/><h1>Modelo de Dispositivo Guardado</h1><br/>", document, CerroMensaje);

                            } else {
                                alerta('Ya existe un Modelo de Dispositivo con el nombre "' + Nombre + '"');
                            }
                        },
                        error: function (xhr, err, thrErr) {
                            MostrarErrorAjax(xhr, err, thrErr);
                        }
                    });
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    });

    //            $("#btnCargarCli").click(function () {
    //                if (!ValidaExtensionImagen()) {
    //                    alerta("Seleccione un archivo del tipo imagen(jpg, jpeg, bmp, png, gif)");
    //                    $("#fuArchivo").focus();
    //                    return;
    //                }
    //                $("#btnCargar").click();
    //            });

    function CerroMensaje() {
        BloquearPagina(false);
        if ($("#hdfOcultarCamposLigero").val() == "1") {
            window.parent.ObtenerDatosModeloDispositivosLigero(vcCodModeloDispLigero, vcNomModeloDispLigero);
        }

        if ($("#hdfModeloDispositivo").val() == "") {
            window.location.reload();
            ////$("#txtNombre").val("");
            ////$("#txtDescripcion").data("kendoEditor").value('');
            ////$(".VARCHAR").val("");
            ////$(".INT").val("");
            ////$(".DECIMAL").val("");
            ////$(".DATE").val("");
            ////$(".DATETIME").val("");
            ////$("input", ".BIT").each(function (i) {
            ////    $(this).attr('checked', false);
            ////});
            //////$("#imgImagen").attr("src", "../../../Common/Images/Mantenimiento/NoDisponible.jpg");

            ////var i;
            ////for (i in lst) {
            ////    dll.push((new item(lst[i].Codigo, lst[i].Valor)));
            ////}
            ////lst = [];
            ////$("#hdfddlGrupo").val(JSON.stringify(dll));
            ////$("#hdflstGrupo").val(JSON.stringify(lst));
            ////$("#ddlRoles").html("");
            ////$("#lstbRolesAgregados").html("");
            ////$("#lstPicklist").html("");
            ////CargarComboLista();
            ////$("#txtNombre").focus();
            //////NUEVO 26-08-2013
            ////$("#ddlTipoServicio").data("kendoComboBox").select(0);


            ////$("#ddlOperador").data("kendoComboBox").select(0);
            ////$("#ddlOperador").data("kendoComboBox").enable(true);
            ////if ($("#ddlOperador option").length == 2) {
            ////    $("#ddlOperador").data("kendoComboBox").select(1);
            ////    $("#ddlOperador").data("kendoComboBox").enable(false);
            ////    $("#ddlOperador").change();
            ////}


            //////LIMPIAR IFRAME
            ////$("#ifCargarImagen").contents().find("#imgImagen").attr('src', '../../../Common/Images/Mantenimiento/NoDisponible.jpg');
            ////$("#ifCargarImagen").contents().find("#hdfArchivo").val('');
            ////preciosOperador = [];
            //////$("#hdfOperadores").val('');
            //////CargarOperadores();
            ////var i = 0;
            ////for (i = 0; i < $("#ddlOperador")[0].length; i++) {
            ////    /*var preciosmovistar = new Precios();*/
            ////    var strOperador = "precios" + $("#ddlOperador")[0][i].value;
            ////    eval("var " + strOperador + " = new Precios(); " + strOperador + "['codOperador'] = " + $("#ddlOperador")[0][i].value + ";");
            ////    eval("$('.PRECIOS').each(function () { " + strOperador + "[$(this).attr('obj')] = ''; }); preciosOperador.push('');");
            ////}
            //////FIN NUEVO
        }
        else {
            window.parent.tab.tabs("remove", indiceTab);
        }
    }

    $("#btnCerrar").live("click", function () {
        try {
            debugger;
            if ($("#hdfOcultarCamposLigero").val() == "1") {
                //window.parent.CerrarDialogDispositivoLigero();

                if (typeof window.parent.CerrarModalCreacion_Entidad === "function") {
                    window.parent.CerrarModalCreacion_Entidad();
                    return;
                    // safe to use the function
                }

                if (typeof window.parent.CerrarDialogDispositivoLigero === "function") {
                    window.parent.CerrarDialogDispositivoLigero();
                    return;
                    // safe to use the function
                }

            } else {
                window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));
            }
        } catch (e) {
        }
        try {
            window.top.fnObtenerWindowPlantillaTab().$('#div_modal').dialog('close');
        } catch (e) {
        }
    });


    function CargarComboListaActualizado() {
        if ($("#hdfddlGrupoActualizado").val() != "") {
            dll = JSON.parse($("#hdfddlGrupoActualizado").val());
            if ($(dll).length > 0) {
                var i;
                for (i in dll) {
                    $("#ddlRoles").append($("<option></option>").attr("value", dll[i].Codigo).text(dll[i].Valor));
                }
                //ActivarCombokendo("#ddlRoles", 200);
            }
            ActivarCombokendo("#ddlRoles", 200);
        }
        else {
            dll = [];
        }

        if ($("#hdflstGrupo").val() != "") {
            lst = JSON.parse($("#hdflstGrupo").val());

            if ($(lst).length > 0) {
                var i;
                for (i in lst) {
                    $("#lstbRolesAgregados").append($("<option></option>").attr("value", lst[i].Codigo).text(lst[i].Valor));
                }
            }
        }
        else {
            lst = [];
        }
    }


    function CargarComboLista() {
        if ($("#hdfddlGrupo").val() != "") {
            dll = JSON.parse($("#hdfddlGrupo").val());
            if ($(dll).length > 0) {
                var i;
                for (i in dll) {
                    $("#ddlRoles").append($("<option></option>").attr("value", dll[i].Codigo).text(dll[i].Valor));
                }
                //ActivarCombokendo("#ddlRoles", 200);
            }
            ActivarCombokendo("#ddlRoles", 200);
        }
        else {
            dll = [];
        }

        if ($("#hdflstGrupo").val() != "") {
            lst = JSON.parse($("#hdflstGrupo").val());

            if ($(lst).length > 0) {
                var i;
                for (i in lst) {
                    $("#lstbRolesAgregados").append($("<option></option>").attr("value", lst[i].Codigo).text(lst[i].Valor));
                }
            }
        }
        else {
            lst = [];
        }
    }

    function CargarOperadores() {
        if ($("#hdfOperadores").val() != "" && $("#hdfOperadores").val() != '[]') {
            preciosOperador = [];
            preciosOperador = JSON.parse($("#hdfOperadores").val());
        }
    }


    $("#imgAgregarRol").live("click", function () {
        if ($("#ddlRoles option:selected").html() != null) {
            var Item = new item(parseInt($("#ddlRoles").val()), $("#ddlRoles option:selected").html());
            $("#hdfddlGrupoActualizado").val("");
            $.ajax({
                type: "POST",
                url: "Mnt_ModeloDispositivo.aspx/CargarRolesActualizados",
                data: "{'P_inCod': '" + 6 + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {
                    $("#hdfddlGrupoActualizado").val(msg.d);
                    dllAct = JSON.parse($("#hdfddlGrupoActualizado").val());
                    cont = 0;
                    if ($(dllAct).length > 0) {
                        var x;
                        for (x in dllAct) {
                            if (parseInt($("#ddlRoles").val()) == parseInt(dllAct[x].Codigo)) {
                                cont += 1;
                            }
                        }
                    }
                    var dllAux = [];
                    if (cont == '0') {
                        var i;
                        for (i in dll) {
                            if (dll[i].Codigo == Item.Codigo) {
                                dllAux.push(new item(dll[i].Codigo, dll[i].Valor));
                            }
                        }
                        dll = dllAux;
                        $("#hdfddlGrupo").val(JSON.stringify(dll));
                        $("#hdflstGrupo").val(JSON.stringify(lst));
                        $("#ddlRoles").html("");
                        //$("#lstbRolesAgregados").html("");
                        //alerta("Este registro ya no existe");
                        //CargarComboListaActualizado();        /ECONDEÑA   27/10/2016
                    } else {
                        lst.push(Item);
                        var i;
                        for (i in dll) {
                            if (dll[i].Codigo != Item.Codigo) {
                                dllAux.push(new item(dll[i].Codigo, dll[i].Valor));
                            }
                        }
                        dll = dllAux;
                        $("#hdfddlGrupo").val(JSON.stringify(dll));
                        $("#hdflstGrupo").val(JSON.stringify(lst));
                        $("#ddlRoles").html("");
                        $("#lstbRolesAgregados").html("");
                        CargarComboLista();
                    }
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
            //alert((dllAct).length);

            //                    
            //                    dllAct = JSON.parse($("#hdfddlGrupoActualizado").val());
            //                    
            //                    if (cont == 0) {
            //                        alerta("Este registro no existe");
            //                        CargarComboListaActualizado();
            //                        return
            //                    } else {

            //                    }
        }
        else {
            alerta("No existen roles a agregar");
        }
    });

    $("#imgQuitarRol").live("click", function () {
        if ($("#lstbRolesAgregados option:selected").html() != null) {
            var Item = new item(parseInt($("#lstbRolesAgregados").val()), $("#lstbRolesAgregados option:selected").html());
            var lstAux = [];
            var i;

            for (i in lst) {
                if (lst[i].Codigo != Item.Codigo) {
                    lstAux.push(new item(lst[i].Codigo, lst[i].Valor));
                }
            }
            lst = lstAux;
            //lst.pop(Item);
            dll.push(Item);
            $("#hdfddlGrupo").val(JSON.stringify(dll));
            $("#hdflstGrupo").val(JSON.stringify(lst));
            $("#ddlRoles").html("");
            $("#lstbRolesAgregados").html("");
            CargarComboLista();
        }
        else {
            alerta("Seleccione un Item a quitar");
        }
    });

    $("#bnValoresOperador_Panel1_O").css({ "padding-top": "5px" });

    //DESCRIPCION - agregado 29-11-2013 wapumayta
    $("#txtDescripcion").kendoEditor({
        tools: ["bold", "italic", "underline", "strikethrough",
                    "justifyLeft", "justifyCenter", "justifyRight", "justifyFull",
                    "insertUnorderedList", "insertOrderedList",
                    "indent", "outdent"],
        messages: {
            bold: "Negritas", italic: "Cursiva", underline: "Subrayado", strikethrough: "Tachado",
            justifyLeft: "Alinear a la izquierda", justifyCenter: "Centrar", justifyRight: "Alinear a la derecha", justifyFull: "Justificar",
            insertUnorderedList: "Viñetas", insertOrderedList: "Numeración",
            indent: "Disminuir sangría", outdent: "Aumentar sangría",
            fontNameInherit: "(Fuente)", fontSizeInherit: "(Tamaño de fuente)"
        }
    });
    //FIN DESCRIPCION

    $("input[name='ddlTipo_input']").attr("disabled", true);
    $("input[name='ddlTipoServicio_input']").attr("disabled", true);
    $("input[name='ddlRoles_input']").attr("disabled", true);


    //$("input[name='ddlOperador_input']").attr("disabled", true);


    $("#txtNombre").focus();

    $("#ddlOperador").data("kendoComboBox").select(0);
    $("#ddlOperador").data("kendoComboBox").enable(true);
    if ($("#ddlOperador option").length == 2) {
        $("#ddlOperador").data("kendoComboBox").select(1);
        $("#ddlOperador").data("kendoComboBox").enable(false);
        $("#ddlOperador").change();
    }
    //debugger;
    if ($("#hdfOcultarCamposLigero").val() == "1") {
        $("#trRoles").hide();
        $("#trOperador").hide();
        $("#trImagen").hide();
        $("#trDescripcion").hide();
        $("#tbCamposDinamicos").css("width", "100%");
        $("#dvMarca").parent().parent().hide();
    }


    $("#ddl_btSopLin").css("width", "200px");
    $("#ddl_btMosEnSol").css("width", "200px");

    try {
        $("#txt_NombreTecnico").css("width", "290px");
    }
    catch (e) {
    }

    $(".tdTitulo").css("text-align", "left");

});

//function fechaformat(fecha) {
//    var ff = fecha.substring(0, 10).split("/");
//    var dtt = new Date(ff[1] + "/" + ff[0] + "/" + ff[2]);
//    return dtt.getDate() + "/" + dtt.getMonth() + "/" + dtt.getFullYear();
//}

function fnObtenerTipoServicio_porIdTipoModeloDispisitivo() {

    $.ajax({
        type: "POST",
        url: "Mnt_ModeloDispositivo.aspx/ObtenerTipoServicio_porIdTipoModeloDispisitivo",
        data: "{'prIdTipoModeloDispositivo': '" + $("#ddlTipo").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            var resul = msg.d;
            $("#ddlTipoServicio").data("kendoComboBox").setDataSource(resul);
            $("#ddlTipoServicio").data("kendoComboBox").select(0);
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });

}

function fnPicklistAgregar() {
    if (Selecciono == false) {
        $("#txt_Planes").val('');
        alerta('Debe seleccionar un plan');
        $("#txt_Planes").focus();
        return;
    }
    var Valor = $("#txt_Planes").val();
    Valor = Valor.replace("'", "");

    if ($("#hdfCodPlanes").val() == '') {
        $("#txt_Planes").val('');
        alerta('Debe seleccionar un plan');
        $("#txt_Planes").focus();
        return;
    }

    if (fnValidaExisteItem($("#hdfCodPlanes").val()) == 1) {
        alerta('El valor ingresado ya existe');
        $("#hdfCodPlanes").val('');
        $("#txt_Planes").focus();
        return;
    }

    $('#lstPicklist').append('<option value="' + $("#hdfCodPlanes").val() + '">' + Valor + '</option>');

    $("#txt_Planes").val('');
    $("#hdfCodPlanes").val('');
    $("#txt_Planes").focus();
    Selecciono = false;
}

function fnPicklistEliminar() {
    if ($('#lstPicklist option').length == 0) {
        return;
    }

    if ($('#lstPicklist option:selected').length == 0) {
        alerta('Seleccione un ítem como mínimo');
        $('#lstPicklist').focus();
        return;
    }

    var vMjsConfirm = "El valor asociado con esta opción de lista se eliminará de forma permanente. Una vez eliminado del sistema el valor de lista, no se puede volver a agregar. Los registros existentes que contengan este valor se deben actualizar manualmente con otro valor de la lista.<br /><br />¿Desea elminar el valor?.";
    confirmacion(vMjsConfirm, fnPicklistEliminar_SI, fnPicklistEliminar_NO, "Mensaje de Confirmación.");
}

function fnPicklistEliminar_SI() {
    $('#lstPicklist option:selected').remove();
}
function fnPicklistEliminar_NO() {
    return;
}

function fnValidaExisteItem(strNuevoValor) {
    var blExiste = 0;
    $('#lstPicklist option').each(function () {
        if ($(this).val().toLowerCase() == strNuevoValor.toString().toLowerCase()) {
            blExiste = 1;
            return false;
        }
    });
    return blExiste;
}


var MarcaSeleccionada = '';
function fnMostrarMarca(valor) {
    MarcaSeleccionada = valor;
}