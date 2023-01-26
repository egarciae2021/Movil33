var Areas;
var Empleados;
var Lineas;
var tieneMultipleArea = false;

function area(P_inCodOrg, vcNomOrg, vcCodInt, vcCodOrg, vcCodOfi, vsSucursal) {
    this.P_inCodOrg = P_inCodOrg;
    this.vcNomOrg = vcNomOrg;
    this.vcCodInt = vcCodInt;
    this.vcCodOrg = vcCodOrg;
    //Edgar Garcia 09112022
    this.vcCodOfi = vcCodOfi;
    this.vsSucursal = vsSucursal;
}
function empleado(P_vcCod, vcNom) {
    this.P_vcCod = P_vcCod;
    this.vcNom = vcNom;
}
function linea(P_vcNum) {
    this.P_vcNum = P_vcNum;
    this.Empleado = new empleado();
}
$(function () {

    var tree = null;
    var idTree = "-1";

    $(".btnNormal").button({});

    if (isIE() == 6) {
        $("#btnCancelar").css('width', '100px');
        $("#btnAceptar").css('width', '100px');
        $("#btnCancelar").css('display', 'inline-block');
        $("#btnAceptar").css('display', 'inline-block');
    }


    var tabOpciones = $("#TabOpciones").tabs({});

    inicio();
    var nodos;
    function inicio() {
        try {
            tree = new dhtmlXTreeObject("dvOrganizacion", "100%", "100%", 0);
            tree.setImagePath("../../Common/Images/Controles/dhtmlx/TreeView/");
            tree.setOnClickHandler(CargarDependecia);

        }
        catch (Error) {
            //some error
        }


        if ($("#hdfTipo").val() == "1") {//Area
            Areas = [];
        }
        if ($("#hdfTipo").val() == "2") {//Empleado
            Empleados = [];
            $("#tbFiltroTipo").show();
        }
        else if ($("#hdfTipo").val() == "3") {//Celular
            Lineas = [];
        }

        try {
            var aux = window.parent.IngresarEmpleadosSelecionados();
            $(aux).each(function () {
                var Empleado = this;

                //                            Empleados.push(Empleado);
                $("#lstSeleccionados").append($("<option></option>").attr("value", Empleado.P_vcCod).text(Empleado.vcNom));
            });
        } catch (Error) {

        }

    }

    if (tree != null) {
        $.ajax({
            type: "POST",
            url: "Con_SeleccionArea.aspx/ListarPrincipal",
            data: "{'vcCodInt': '" + "" + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                //debugger;

                tieneMultipleArea = result.d[0][3]; //Almaceno si será multi área
                tree.loadJSArray(result.d);

                $(result.d).each(function () {
                    fixImage(this[0]);
                });

                CargarDetalle(0);
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }

    function isIE() { //Vefiricar Version del Internet Explorer
        var myNav = navigator.userAgent.toLowerCase();
        return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
    }

    function CargarDependecia() {
        if (tree != null) {

            if (idTree != tree.getSelectedItemId()) {

                $.ajax({
                    type: "POST",
                    url: "Con_SeleccionArea.aspx/ListarOrganizacion",
                    data: "{'vcCodInt': '" + tree.getSelectedItemId() + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        var idtree = tree.getSelectedItemId();
                        var texto = tree.getAllChildless();

                        $(result.d).each(function () {
                            if (texto.indexOf(this.vcCodInt) == -1) {
                                tree.insertNewItem(idtree, this.vcCodInt, this.vcNomOrg, 0, 0, 0, 0, '');
                                fixImage(this.vcCodInt);

                            }
                            else {
                                return false;
                            }
                        });
                    },
                    error: function (xhr, err, thrErr) {
                        MostrarErrorAjax(xhr, err, thrErr);
                    }
                });
                //alert(idTree);
                //if (idTree != "-1") {
                CargarDetalle(0);
                //}
            }
            idTree = tree.getSelectedItemId();
        }
    }

    function fixImage(id) {
        //Cerrar, abrir, cerrar
        var Archivo = 'Niveles/' + (id.length / 3).toString() + '.ico';
        //if (id.length != 3) {
        tree.setItemImage2(id, Archivo, Archivo, Archivo);
        //}
    }

    function CargarDetalle(tipo) {
        
        var MetodoListar = "";
        if ($("#hdfTipo").val() == "1") {//Empleado
            MetodoListar = "ListarArea";
        }
        if ($("#hdfTipo").val() == "2") {//Empleado
            if (tipo == "0")
                MetodoListar = "ListarEmpleadoString"; //ListarEmpleadoString
            else
                MetodoListar = "ListarEmpleado";
        }
        else if ($("#hdfTipo").val() == "3") {//Celular
            MetodoListar = "ListarLinea";
        }

        var ParametroResponsable = "";
        if ($("#hdfTipo").val() == "2") {//Empleado
            ParametroResponsable = "'EsResponsable':'" + $("#hdfEsResponsable").val() + "',"
        }


        var TipoBusqueda = "";
        if ($("#optEmpleado").attr('checked') == 'checked')
            TipoBusqueda = "1";
        if ($("#optLinea").attr('checked') == 'checked')
            TipoBusqueda = "2";
        if ($("#optDispositivo").attr('checked') == 'checked')
            TipoBusqueda = "3";

        if (MetodoListar != "") {
            if ((tieneMultipleArea && tree.getSelectedItemId() === '001') || tree.getSelectedItemId() === '' )  {
                //return;
            } else {
            $.ajax({
                type: "POST",
                url: "Con_SeleccionArea.aspx/" + MetodoListar,
                data: "{'vcCodInt': '" + tree.getSelectedItemId() + "'," +
                    "'btIncDep': '" + $('#chkIncluirDependencia').is(':checked') + "'," +
                    ParametroResponsable +
                    "'inCodEst': '" + $("#ddlEstado").val() + "'," +
                    "'vcValBus': '" + $("#txtBusqueda").val() + "'," +
                    "'inTip': '" + tipo + "','TipoBusqueda':'" + TipoBusqueda + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    //debugger;
                    $("#lstResultado").html("");
                    if ($("#hdfTipo").val() == "1") {//Area
                        var contador = 0;
                        $(result.d).each(function () {
                            let color = "";
                            let valor = "";
                            if (!this.btVig) {
                                color = "Red";
                            }
                            if (contador == 0) {
                                valor = "2px";
                            }
                            else {
                                valor = "20px";
                            }
                            contador++;

                            $("#lstResultado").append($("<option P_inCodOrg='" + this.P_inCodOrg.toString() + "'></option>").attr("value", this.vcCodInt).text(this.vcCodOrg + "=" + this.vcNomOrg).css({ "color": color, "padding-left": valor }));
                        });
                    }
                    else if ($("#hdfTipo").val() == "2") {//Empleado
                        if (result.d == "") {
                            return;
                        }
                        var color;
                        if (tipo == "0") {
                            var Registros = JSON.parse("[" + result.d + "]");
                            $(Registros).each(function () {
                                color = "";
                                if (this.btVig != "1") {
                                    color = "Red";
                                }
                                $("#lstResultado").append($("<option></option>").attr("value", this.P_vcCod).text(this.P_vcCod + "=" + this.vcNom).css("color", color));
                            });
                        }
                        else {
                            $(result.d).each(function () {
                                color = "";
                                if (!this.btVig) {
                                    color = "Red";
                                }
                                $("#lstResultado").append($("<option></option>").attr("value", this.P_vcCod).text(this.P_vcCod + "=" + this.vcNom).css("color", color));
                            });
                        }
                    }
                    else if ($("#hdfTipo").val() == "3") {//Celular
                        $(result.d).each(function () {
                            var color = "";
                            if (!this.btVig) {
                                color = "Red";
                            }
                            $("#lstResultado").append($("<option></option>").attr("value", this.P_vcNum).text(this.P_vcNum + "=" + this.Empleado.vcNom).css("color", color));
                        });
                    }
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        }
        }
    }

    $("#chkIncluirDependencia").change(function () {
        CargarDetalle(0);
    });

    $("#ddlEstado").change(function () {
        if ($("#TabOpciones").tabs("option", "selected") == 0) {
            CargarDetalle(0);
        } else {
            $("#btnBuscar").click();
            return false;
        }
    });

    $('#txtBusqueda').live("keydown", function (e) {
        if (e.keyCode == 13) {
            $("#btnBuscar").click();
            return false; // prevent the button click from happening
        }
    });

    $("#btnBuscar").click(function () {
        if ($("#txtBusqueda").val() == "") {
            alerta("Ingrese un valor a buscar");
            $("#txtBusqueda").focus();
            return;
        }

        if (($("#txtBusqueda").val()).indexOf("'") != -1) {
            alerta("No se permiten apóstrofes.");
            return;
        }
        if (($("#txtBusqueda").val()).indexOf("\\") != -1) {
            alerta("No se permite el caracter barra invertida.");
            return;
        }
        CargarDetalle(1);
    });

    $("#btnDerecha").click(function () {
        if ($("#lstResultado option:selected").length > 0) {
            if ($("#lstResultado option:selected").length > 500) {
                confirmacion("La cantidad seleccionada es muy grande, esta acción bajará el performance de su equipo. ¿Desea continuar con el proceso?", AgregaItems, null, "Confirmación");
                //                if (confirm('La cantidad seleccionada es muy grande. ¿Desea continuar con el proceso? Esta acción bajará el performance de su equipo.')) {
                //                    AgregaItems("#lstResultado option:selected");
                //                }
            }
            else {
                AgregaItem("#lstResultado option:selected");
            }
        }
        else {
            alerta("Seleccione un ítem");
        }
    });
    $("#btnIzquierda").click(function () {
        if ($("#lstSeleccionados option:selected").length > 0) {
            $("#lstSeleccionados option:selected").remove();
        }
        else {
            alerta("Seleccione un ítem");
        }
    });
    $("#btnDerechaTodo").click(function () {
        if ($("#lstResultado option").length > 0) {
            if ($("#lstResultado option").length > 500) {
                confirmacion("La cantidad seleccionada es muy grande, esta acción bajará el performance de su equipo. ¿Desea continuar con el proceso?", AgregaItems, null, "Confirmación");
                //if (confirm('La cantidad seleccionada es muy grande. ¿Desea continuar con el proceso? Esta acción bajará el performance de su equipo.')) {
                //    AgregaItems("#lstResultado option");
                //}
            }
            else {
                AgregaItems("#lstResultado option");
            }
        }
        else {
            alerta("No hay datos disponibles");
        }
    });
    $("#btnIzquierdaTodo").click(function () {
        if ($("#lstSeleccionados option").length > 0) {
            $("#lstSeleccionados").html("");
        }
        else {
            alerta("No hay datos seleccionados");
        }
    });

    function AgregaItem(selector) {
        var ValorAgregado = false;
        $(selector).each(function () {
            var Seleccionado = $(this);
            var Existe = false;
            $("#lstSeleccionados option").each(function () {
                if (Seleccionado.val() == $(this).val()) {
                    Existe = true;
                    ValorAgregado = true;
                    return false;
                }
            });
            if (!Existe) {
                $("#lstSeleccionados").append($("<option></option>").attr("value", Seleccionado.val()).text(Seleccionado.html()).css("color", "black"));
            }
        });
        if (ValorAgregado) {
            alerta("Algunos ítems seleccionados ya han sido agregados");
        }
    }

    function AgregaItems() {
        var selector = "#lstResultado option";
        var ValorAgregado = false;
        $(selector).each(function () {
            var Seleccionado = $(this);
            var Existe = false;
            $("#lstSeleccionados option").each(function () {
                if (Seleccionado.val() == $(this).val()) {
                    Existe = true;
                    ValorAgregado = true;
                    return false;
                }
            });
            if (!Existe) {
                $("#lstSeleccionados").append($("<option></option>").attr("value", Seleccionado.val()).text(Seleccionado.html()).css("color", "black"));
            }
        });
        if (ValorAgregado) {
            alerta("Algunos ítems seleccionados ya han sido agregados");
        }
    }

    $("#btnAceptar").click(function () {
        //debugger;
        if ($("#hdfTipo").val() == "1") { //Area
            if ($("#hdfMultiple").val() == "1" && $("#hdfUnPanel").val() == "0") {//Selección múltiple con dos paneles
                $("#lstSeleccionados option").each(function () {
                    var Area = new area();
                    Area.P_inCodOrg = $(this).val();
                    Area.vcNomOrg = $(this).html();
                    Areas.push(Area);
                });
                window.parent.IngresarAreas(Areas);
            } else if ($("#hdfMultiple").val() == "1" && $("#hdfUnPanel").val() == "1") {// JHERRERA 20140807 -- Selección múltiple con un panel
                if ($("#lstResultado option:selected").length > 0) {
                    $("#lstResultado option:selected").each(function () {
                        var Area = new area();
                        Area.P_inCodOrg = $(this).val();
                        Area.vcCodOrg = this.getAttribute("p_incodorg");
                        Area.vcNomOrg = $(this).html();
                        Areas.push(Area);
                    });
                    window.parent.IngresarAreas(Areas);
                } else {
                    alerta("Seleccione un área");
                    return;
                }
            } else { //Selección individual
                if ($("#lstResultado option:selected").length > 0) {
                    var Area = new area();
                    Area.P_inCodOrg = $("#lstResultado option:selected").val();
                    Area.vcNomOrg = $("#lstResultado option:selected").html();
                    window.parent.IngresarAreaUnico(Area);
                }
                else {
                    alerta("Seleccione un área");
                    return;
                }
            }
        }
        else if ($("#hdfTipo").val() == "2") {//Empleado
            if ($("#hdfMultiple").val() == "1" && $("#hdfUnPanel").val() == "0") {//Selección múltiple con dos paneles
                $("#lstSeleccionados option").each(function () {
                    var Empleado = new empleado();
                    Empleado.P_vcCod = $(this).val();
                    Empleado.vcNom = $(this).html();
                    Empleados.push(Empleado);
                });
                window.parent.IngresarEmpleados(Empleados);
            } else if ($("#hdfMultiple").val() == "1" && $("#hdfUnPanel").val() == "1") {// JHERRERA 20140807 -- Selección múltiple con un panel
                $("#lstResultado option:selected").each(function () {
                    var Empleado = new empleado();
                    Empleado.P_vcCod = $(this).val();
                    Empleado.vcNom = $(this).html();
                    Empleados.push(Empleado);
                });
                window.parent.IngresarEmpleados(Empleados);
            } else { //Múltiple = 0
                if ($("#lstResultado option:selected").length > 0) {
                    var Empleado = new empleado();
                    Empleado.P_vcCod = $("#lstResultado option:selected").val();
                    Empleado.vcNom = $("#lstResultado option:selected").html();
                    window.parent.IngresarEmpleadoUnico(Empleado);
                }
                else {
                    alerta("Seleccione un empleado");
                }
            }
        }
        else if ($("#hdfTipo").val() == "3") {//Celular
            if ($("#hdfMultiple").val() == "1" && $("#hdfUnPanel").val() == "0") {//Selección múltiple con dos paneles
                $("#lstSeleccionados option").each(function () {
                    var Linea = new linea();
                    Linea.P_vcNum = $(this).val();
                    Linea.Empleado.vcNom = $(this).html();
                    Lineas.push(Linea);
                });
                window.parent.IngresarLineas(Lineas);
            } else if ($("#hdfMultiple").val() == "1" && $("#hdfUnPanel").val() == "1") {// JHERRERA 20140807 -- Selección múltiple con un panel
                $("#lstResultado option:selected").each(function () {
                    var Linea = new linea();
                    Linea.P_vcNum = $(this).val();
                    Linea.Empleado.vcNom = $(this).html();
                    Lineas.push(Linea);
                });
                window.parent.IngresarLineas(Lineas);
            } else {
                if ($("#lstResultado option:selected").length > 0) {
                    var Linea = new empleado();
                    Linea.P_vcNum = $("#lstResultado option:selected").val();
                    Linea.Empleado.vcNom = $("#lstResultado option:selected").html();
                    window.parent.IngresarLineaUnica(Linea);
                }
                else {
                    alerta("Seleccione una linea");
                }
            }
        }
        try {
            window.parent.Modal.dialog("close");
        }
        catch (e) {
            //some err
        }
    });

    $("#btnCancelar").click(function () {
        window.parent.Modal.dialog("close");
        window.parent.parent.lanzar();

    });
    var Alto = $(window).height();
    var Ancho = $(window).width();
    var $height = Alto - 100;
    document.getElementById("dvOrganizacionC").style.height = ($height).toString() + "px";
    document.getElementById("ctbBusquedaAvanzada").style.height = ($height).toString() + "px";
    document.getElementById("lstResultado").style.height = ($height).toString() + "px";
    document.getElementById("lstSeleccionados").style.height = ($height).toString() + "px";
    $height = Alto - 200;
    document.getElementById("dvOrganizacion").style.height = ($height).toString() + "px";
}); 






