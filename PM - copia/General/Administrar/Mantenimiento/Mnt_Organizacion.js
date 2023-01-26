var Empleados;
var Criterio;
var Autorizador;
var strEmp;

function empleado() {
    this.P_vcCod;
    this.vcNom;
    this.vcVal;
    this.EsAutorizador;
}

function IngresarEmpleados(empleados) {//Carga los empleados seleccionados del formulario respectivo
    //$("#lstEncargado").html("");
    //Criterio.Empleados = [];
    var Existe = false;
    $(empleados).each(function () {
        var Empleado = this;
        //Validar si existe..
        Existe = false;
        for (var i = 0; i < Criterio.Empleados.length; i++) {
            if (Criterio.Empleados[i].P_vcCod == Empleado.P_vcCod) {
                Existe = true;
                break;
            }                
        }
        if (!Existe) {
            Criterio.Empleados.push(Empleado);
            $("#lstEncargado").append($("<option></option>").attr("value", Empleado.P_vcCod).text(Empleado.vcNom));
        }        
    });
}

function ActualizarEmpleados(empleados) {//Carga los empleados seleccionados del formulario respectivo
    Criterio.Empleados = [];
    Criterio.Empleados = [];
    $(empleados).each(function () {
        var Empleado = this;
        Criterio.Empleados.push(Empleado);
        //$("#lstEncargado").append($("<option></option>").attr("value", Empleado.P_vcCod).text(Empleado.vcNom));
    });
}

$(function () {
    $("#btnValor").live("click", function () {
        alert(bpNivel_Valor);
        alert(bpCentroCosto_Valor);
    });


    Mantenimiento_Mostrar_VARBINARY("../../../P_Movil/Administrar/Mantenimiento/", "../../../");

    if (EsLlamadaExterna == true) {
        $("#btnAgregarOrga").hide();
    }
    else {
        $("#btnAgregarOrga").show();
    }

    if ($("#hdfCodInt2").val().length == 3) {
        $("#NivAreaSuperior").hide();
    } else {
        $("#NivAreaSuperior").show();
    }

    $("#txt_codorg").keypress(ValidarCodigoVarChar);
    $("#txt_codorg").keyup(ValidarCodigoVarChar_BlurKeyup);
    $("#txt_codorg").blur(ValidarCodigoVarChar_BlurKeyup);
    IniciarPagina();
    $(".btnNormal").button();
    function IniciarPagina() {
        //debugger;
        Criterio = new ENT_MOV_IMP_Criterio();
        if ($.trim($("#hdfEstado").val()) == "") {
            $("#txt_codorg").focus();
        }
        else {
            Criterio = new ENT_MOV_IMP_Criterio();
            Empleados = [];
            $("#lstEncargado option").each(function () {
                var Empleado = new empleado();
                Empleado.P_vcCod = $(this).val();
                Empleado.vcNom = $(this).html();
                Empleados.push(Empleado);
            });
            ActualizarEmpleados(Empleados);
            $("#txt_nivelorga").focus().select();


            //Autorizador
            Autorizador = [];
            $("#lstAutorizadores option").each(function () {
                var oAutorizador = new empleado();
                oAutorizador.P_vcCod = $(this).val();
                oAutorizador.vcNom = $(this).html();
                oAutorizador.EsAutorizador = true;
                Autorizador.push(oAutorizador);
            });
        }

        var btVig = $('#chkEstado').is(':checked');

        if ($("#hdfEstado").val() == '') {
            $("#tdEstado").hide();
        }
        else {
            $("#tdEstado").show();
        }
        validacionAutorizacion();
    }

    function validacionAutorizacion() {
        var btTieneAutorizacion = $("#ddl_RequiereAutorizacion option:selected").val();
        if (btTieneAutorizacion == '1') {
            $("#trAutorizador").show();
        }
        else {
            $("#trAutorizador").hide();
        }
    }

    function validarEmail2(valor) {
        var ExpRegular = /(\w+)(\.?)(\w*)(\@{1})(\w+)(\.?)(\w*)(\.{1})(\w{2,3})/;

        if (ExpRegular.test(valor)) {
            return true;
        }
        else {
            return false;
        }
    }

    //Agregado por Mauricio Benavides 12/07/2013
    $("#chActivo").bind('change', function () {
        if ($(this).is(":checked")) {
            $("#hdfEstadoORGA").val("1");
        }
        else {
            $("#hdfEstadoORGA").val("0");
        }
    });

    $("#btnAgregarEmpleado").click(function () {
        var $width = 935;
        var $height = 505;

        //if ($(window).width() <= $width) {
        //    $width = $(window).width() - 50;
        //}

        //if ($(window).height() <= $height) {
        //    $height = $(window).height() - 10;
        //}

        var $Pagina = '../../../P_Movil/Consultar/Con_SeleccionArea.aspx?Tipo=2&Multiple=1&EsResponsable=1';
        $("#ifArea").attr("src", $Pagina);
        $("#ifArea").css("width", $width - 20);
        Modal = $('#dvArea').dialog({
            title: "Seleccionar empleado",
            width: $width,
            height: $height,
            modal: true,
            resizable: false
        });
    });

    $("#btnQuitarEmpleado").click(function () {
        //var indice = 0;
        //var Item = $("#lstEmpleado").val();
        $("#lstEncargado option:selected").each(function () {
            var indice = 0;
            var Item = $(this).val();
            var i;
            for (i in Criterio.Empleados) {
                if (Criterio.Empleados[i].P_vcCod == Item) {
                    indice = i;
                    break;
                }
            }
            if (indice > -1) {
                Criterio.Empleados.splice(indice, 1);
                $("#lstEncargado option:selected").remove();
            }
        });
    });

    $("#lstEncargado").keyup(function (e) {
        //var indice = 0;
        var Item = ""; //$("#lstEmpleado").val();
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 46) {
            if (Item != null) {
                $("#lstEncargado option:selected").each(function () {
                    var indice = 0;
                    Item = $(this).val();
                    var i;
                    for (i in Criterio.Empleados) {
                        if (Criterio.Empleados[i].P_vcCod == Item) {
                            indice = i;
                            break;
                        }
                    }
                    if (indice > -1) {
                        Criterio.Empleados.splice(indice, 1);
                        $("#lstEncargado option:selected").remove();
                    }
                });
            }
        }
    });

    // INICIO - SECCION REPONSABLE AUTORIZACION
    $("#ddl_RequiereAutorizacion").change(function () {
        validacionAutorizacion();
    });

    $("#btnAgregarAutorizador").click(function () {
        //debugger;
        var $width = 600;
        var $height = 300;

        $("#lstResultadoAutorizador").html("");
        $("#lstSeleccionadosAutorizador").html("");

        $(Criterio.Empleados).each(function () {
            var Autorizadores = this;
            $("#lstResultadoAutorizador").append($("<option></option>").attr("value", Autorizadores.P_vcCod).text(Autorizadores.vcNom));
        });

        $(Autorizador).each(function () {
            var Autorizadores = this;
            $("#lstSeleccionadosAutorizador").append($("<option></option>").attr("value", Autorizadores.P_vcCod).text(Autorizadores.vcNom));
        });

        Modal = $('#dvResponsablesAutorizacion').dialog({
            title: "Seleccionar Autorizador",
            width: $width,
            height: $height,
            modal: true,
            resizable: false
        });
    });

    $("#btnQuitarAutorizador").click(function () {
        $("#lstAutorizadores option:selected").each(function () {
            //debugger;
            var indice = 0;
            var Item = $(this).val();
            var i;
            for (i in Autorizador) {
                if (Autorizador[i].P_vcCod == Item) {
                    indice = i;
                    break;
                }
            }
            if (indice > -1) {
                Autorizador.splice(indice, 1);
                $("#lstAutorizadores option:selected").remove();
            }
        });
    });

    $("#lstAutorizadores").keyup(function (e) {
        //var indice = 0;
        var Item = ""; //$("#lstEmpleado").val();
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 46) {
            if (Item != null) {
                $("#lstAutorizadores option:selected").each(function () {
                    var indice = 0;
                    Item = $(this).val();
                    var i;
                    for (i in Criterio.Empleados) {
                        if (Criterio.Empleados[i].P_vcCod == Item) {
                            indice = i;
                            break;
                        }
                    }
                    if (indice > -1) {
                        Criterio.Empleados.splice(indice, 1);
                        $("#lstAutorizadores option:selected").remove();
                    }
                });
            }
        }
    });



    $("#btnDerechaAutorizador").click(function () {
        if ($("#lstResultadoAutorizador option:selected").length > 0) {
            if ($("#lstResultadoAutorizador option:selected").length > 500) {
                confirmacion("La cantidad seleccionada es muy grande, esta acción bajará el performance de su equipo. ¿Desea continuar con el proceso?", AgregaItems, null, "Confirmación");
            }
            else {
                AgregaItem("#lstResultadoAutorizador option:selected");
            }
        }
        else {
            alerta("Seleccione un ítem");
        }
    });
    $("#btnIzquierdaAutorizador").click(function () {
        if ($("#lstSeleccionadosAutorizador option:selected").length > 0) {
            $("#lstSeleccionadosAutorizador option:selected").remove();
        }
        else {
            alerta("Seleccione un ítem");
        }
    });
    $("#btnDerechaTodoAutorizador").click(function () {
        if ($("#lstResultadoAutorizador option").length > 0) {
            if ($("#lstResultadoAutorizador option").length > 500) {
                confirmacion("La cantidad seleccionada es muy grande, esta acción bajará el performance de su equipo. ¿Desea continuar con el proceso?", AgregaItems, null, "Confirmación");
            }
            else {
                AgregaItems("#lstResultado option");
            }
        }
        else {
            alerta("No hay datos disponibles");
        }
    });
    $("#btnIzquierdaTodoAutorizador").click(function () {
        if ($("#lstSeleccionadosAutorizador option").length > 0) {
            $("#lstSeleccionadosAutorizador").html("");
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
            $("#lstSeleccionadosAutorizador option").each(function () {
                if (Seleccionado.val() == $(this).val()) {
                    Existe = true;
                    ValorAgregado = true;
                    return false;
                }
            });
            if (!Existe) {
                $("#lstSeleccionadosAutorizador").append($("<option></option>").attr("value", Seleccionado.val()).text(Seleccionado.html()).css("color", "black"));
            }
        });
        if (ValorAgregado) {
            alerta("Algunos ítems seleccionados ya han sido agregados");
        }
    }

    function AgregaItems() {
        var selector = "#lstResultadoAutorizador option";
        var ValorAgregado = false;
        $(selector).each(function () {
            var Seleccionado = $(this);
            var Existe = false;
            $("#lstSeleccionadosAutorizador option").each(function () {
                if (Seleccionado.val() == $(this).val()) {
                    Existe = true;
                    ValorAgregado = true;
                    return false;
                }
            });
            if (!Existe) {
                $("#lstSeleccionadosAutorizador").append($("<option></option>").attr("value", Seleccionado.val()).text(Seleccionado.html()).css("color", "black"));
            }
        });
        if (ValorAgregado) {
            alerta("Algunos ítems seleccionados ya han sido agregados");
        }
    }

    $("#btnCerrarAutorizador").click(function () {
        $('#dvResponsablesAutorizacion').dialog('close');
    });


    $("#btnAceptarAutorizador").click(function () {
        $("#lstAutorizadores").html("");
        try {
            Autorizador = [];
            $("#lstSeleccionadosAutorizador option").each(function () {
                var oAutorizador = new empleado();
                oAutorizador.P_vcCod = $(this).val();
                oAutorizador.vcNom = $(this).html();
                oAutorizador.EsAutorizador = true;
                Autorizador.push(oAutorizador);
            });

            $(Autorizador).each(function () {
                var Autorizadores = this;
                $("#lstAutorizadores").append($("<option></option>").attr("value", Autorizadores.P_vcCod).text(Autorizadores.vcNom));
            });


            $('#dvResponsablesAutorizacion').dialog('close');
        }
        catch (e) {

        }
        
    });

    // FIN - SECCION REPONSABLE AUTORIZACION



    $("#btnGuardar").live("click", function () {
        //debugger;
        //var NivelArea = $("#hdfCodNivOrgBusqueda").val();
        var CodOrg = $("#txt_codorg").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92");
        var NomOrg = $("#txt_nombre").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92");
        var AreaSuperior = $("#cbeOrganizacion_hdControl").val();
        var CentroCosto = $("#hdfCCOBusqueda").val();
        var CorreoPersonal = $("#txt_correo1").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92");
        var CorreoJefe = $("#txt_correo2").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92");
        var CamposDinamicos = "";

        var XMLEmpleado = "<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?><ROOT>";
        $("#lstEncargado option").each(function () {
            XMLEmpleado = XMLEmpleado + "<ENCARGADO  P_F_vcCodEmp=\"" + $(this).val() + "\" />";
        });
        XMLEmpleado = XMLEmpleado + "</ROOT>";

        var lstAutorizador = "";
        $("#lstAutorizadores option").each(function () {
            lstAutorizador = lstAutorizador + $(this).val() + ",";
        });
        if (lstAutorizador != "") {
            lstAutorizador = lstAutorizador.substring(0, lstAutorizador.length - 1);;
        }
        
        if ($.trim(CodOrg) == "") {
            alerta("El código de la organización es un campo obligatorio");
            $("#txt_codorg").focus();
            return;
        }
        ////        if ($.trim(NivelArea) == "") {
        ////            alerta("El nivel del área es un campo obligatorio");
        ////            $("#txt_nivelorga").focus();
        ////            return;
        ////        }

        if ($.trim(NomOrg) == "") {
            alerta("El nombre de la organización es un campo obligatorio");
            $("#txt_nombre").focus();
            return;
        }
        if ($.trim(AreaSuperior) == "" && $("#hdfCodInt2").val().length > 4) { //modificado 02-09-2013
            alerta("El área superior es un campo obligatorio");
            $("#txt_orga").focus();
            return;
        }

        if ($.trim(CentroCosto) == "") {
            alerta("El centro de costo es un campo obligatorio");
            $("#txtCodCCO").focus();
            return;
        }

        if ($.trim(CorreoPersonal) == "") {
            //            alerta("El correo principal es un campo obligatorio");
            //            $("#txtMailPersonal").focus();
            //            return;

        } else {
            if (validarEmail2($.trim(CorreoPersonal)) == false) {
                alerta("Revisar el formato del Correo Principal xxxxx@xxx.xxx");
                $("#txt_correo1").focus();
                return;
            }

        }

        if ($.trim(CorreoJefe) != "") {
            if (validarEmail2($.trim(CorreoJefe)) == false) {
                alerta("Revisar el formato del Correo Alternativo xxxxx@xxx.xxx");
                $("#txt_correo2").focus();
                return;
            }
        }
        if (CorreoPersonal != "" && CorreoJefe != "") {
            if (CorreoPersonal == CorreoJefe) {
                alerta("Correo Principal y Alternativo no pueden se iguales");
                return;
            }
        }


        $(".VARCHAR").each(function (i) {
            CamposDinamicos += "[" + $(this).attr("obj") + "]";
            CamposDinamicos += " = \"";
            CamposDinamicos += this.value.replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92");
            CamposDinamicos += "\",";

        });

        var ValidacionNumerica = true;
        $(".INT").each(function (i) {
            CamposDinamicos += "[" + $(this).attr("obj") + "]";
            CamposDinamicos += " = ";
            if ($.trim(this.value) == "") {
                CamposDinamicos += "0";
            }
            else {
                CamposDinamicos += this.value.replace(new RegExp('\\' + oCulturaUsuario.vcSimSepMil, 'g'), "");
                var NumeroDecimal = parseFloat(this.value.replace(new RegExp('\\' + oCulturaUsuario.vcSimSepMil, 'g'), ""));
                if (isNaN(NumeroDecimal)) { NumeroDecimal = 0; }
                if (NumeroDecimal > 99999999.99) {
                    alerta("El valor ingresado '" + this.value + "' debe ser menor.");
                    ValidacionNumerica = false;
                    return;
                }
            }
            CamposDinamicos += ",";
        });
        if (!ValidacionNumerica) { return; }

        ValidacionNumerica = true;
        $(".DECIMAL").each(function (i) {
            CamposDinamicos += "[" + $(this).attr("obj") + "]";
            CamposDinamicos += " = ";
            if ($.trim(this.value) == "") {
                CamposDinamicos += "0";
            }
            else {
                CamposDinamicos += this.value.replace(new RegExp('\\' + oCulturaUsuario.vcSimSepMil, 'g'), "");
                var NumeroDecimal = parseFloat(this.value.replace(new RegExp('\\' + oCulturaUsuario.vcSimSepMil, 'g'), ""));
                if (isNaN(NumeroDecimal)) { NumeroDecimal = 0; }
                if (NumeroDecimal > 99999999.99) {
                    alerta("El valor ingresado '" + this.value + "' debe ser menor.");
                    ValidacionNumerica = false;
                    return;
                }
            }
            CamposDinamicos += ",";
        });
        if (!ValidacionNumerica) { return; }

        $(".DATE").each(function (i) {
            CamposDinamicos += "[" + $(this).attr("obj") + "]";
            CamposDinamicos += " = \"";
            CamposDinamicos += this.value;
            CamposDinamicos += "\",";
        });
        $(".DATETIME").each(function (i) {
            var nVal = this.value.substring(0, 20);
            CamposDinamicos += "[" + $(this).attr("obj") + "]";
            CamposDinamicos += " = \"";
            CamposDinamicos += nVal;
            CamposDinamicos += "\",";
        });
        $(".BIT").each(function (i) {
            CamposDinamicos += "[" + $(this).attr("obj") + "]";
            CamposDinamicos += " = ";
            if ($("input", this).is(':checked') == true) {
                CamposDinamicos += "1";
            }
            else {
                CamposDinamicos += "0";
            }

            CamposDinamicos += ",";
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
                }
            }
        });

        $("#dvCargando").show();

        $.ajax({
            type: "POST",
            url: "Mnt_Organizacion.aspx/Guardar",
            data: "{'CodOrg': '" + $.trim(CodOrg) + "', 'NomOrg': '" + $.trim(NomOrg) + "', 'Niv': '0', 'CorPer': '" +
                  $.trim(CorreoPersonal) + "', 'CorJef': '" + $.trim(CorreoJefe) + "', 'CodCCO': '" + $.trim(CentroCosto) +
                  "', 'AreaSuperior': '" + $.trim(AreaSuperior) + "', " +
                  "'vcAdj': '" + vcAdjuntos + "'," +
                  "'inCodEst': '" + $.trim($("#hdfEstado").val()) +
                  "', 'estado': '" + $.trim($("#hdfEstadoORGA").val()) + "', 'vcCamDim':'" + CamposDinamicos + "'," +
                  "'vcCodInt2Ant': '" + $.trim($("#hdfCodInt2Anterior").val()) + "'," +
                  "'vcCodInt2': '" + $.trim($("#hdfCodInt2").val()) + "'," +
                  "'lstAutorizador': '" + lstAutorizador + "'," +
                  "'vcCodEmp': '" + JSON.stringify(Criterio) + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                $("#dvCargando").hide();
                //debugger
                if (msg.d == "1") {
                    if (EsLlamadaExterna == false) {
                        window.parent.ActualizarGrilla();
                    }
                    Mensaje("<br/><h1>Organización guardada</h1><br/>", document, CerroMensaje);
                    $("#txtCodigo").focus();
                }
                else {
                    if (msg.d == "2") {
                        alerta("Ya existe una organización en este nivel de área, no se puede ingresar mas de una organización en el Nivel Organización");
                    } else if (msg.d.toLowerCase().indexOf("m_nive") >= 0) {
                        alerta("El sistema no cuenta con mas niveles organizativos, por favor ingresarlos en el mantenimiento de Niveles.");
                    }
                    else if (msg.d.indexOf("AliasOrganizacion") > -1) {
                        let mensaje = msg.d.substring(17);
                        let MensajeMostrar = 'Se ha detectado que';
                        let lstOrgas = mensaje.split("¬");
                        let varOrga;
                        let mens = '';
                        for (let i = 0; i < lstOrgas.length; i++) {
                            varOrga = lstOrgas[i].split("|");
                            mens += ' el alias "' + varOrga[1] + '" ya existe, en la organización "' + varOrga[0] + '"; ';
                        }
                        MensajeMostrar = MensajeMostrar + mens;
                        alerta(MensajeMostrar);

                    }
                    else {
                        alerta("El código de la organización ya ha sido registrado anteriormente, no se pudo grabar el registro");
                    BloquearPagina(false);
                }
                }
            },
            error: function (xhr, err) {
                $("#dvCargando").hide();
                alerta("Error, Estadow: " + xhr.readyState + "\nEstado: " + xhr.status);
            }
        });
    });

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

    function IngresarEmpleados(empleados) {//Carga los empleados seleccionados del formulario respectivo
        alert(empleados);
        //        $("#lstEmpleado").html("");
        //        Criterio.Empleados = new Array();
        //        $(empleados).each(function () {
        //            var Empleado = this;
        //            Criterio.Empleados.push(Empleado);
        //            $("#lstEmpleado").append($("<option></option>").attr("value", Empleado.P_vcCod).text(Empleado.vcNom));
        //        });
    }

    var indiceTab = 0;
    if (EsLlamadaExterna == false) {
        indiceTab = window.parent.tab.tabs("option", "selected");
    }
    function CerroMensaje() {
        if ($("#hdfEstado").val() == "") {
            window.location.reload();
            ////$("#txtCodigo").val("");
            ////$("#cbeOrganizacion_spControl").html('');
            ////$("#cbeOrganizacion_hdControl").val('');
            ////$("#txtNombre").val("");
            ////$("#txt_nivelorga").val("");
            ////$("#txt_codorg").val("");
            ////$("#txt_nombre").val("");
            ////$("#txt_orga").val("");
            ////$("#txtCodCCO").val("");
            ////$("#txt_correo1").val("");
            ////$("#txt_correo2").val("");
            ////$("#lstEncargado").html("");
            ////Criterio.Empleados = [];

            ////$("#hdfCodNivOrgBusqueda").val("");
            ////$("#hdfCCOBusqueda").val("");
            ////$("#txt_codorg").focus();
        }
        else {
            //window.parent.location.reload();
            if (EsLlamadaExterna == true) {
                window.parent.$('#div_modal').dialog('close');
            }
            else {
                window.parent.tab.tabs("remove", indiceTab);
            }
        }
        //window.parent.location.reload();
    }

    $("#btnCerrar").live("click", function () {
        if (EsLlamadaExterna == true) {
            window.parent.$('#div_modal').dialog('close');
        }
        else {
            window.parent.tab.tabs("remove", indiceTab);
        }

    });
});



function IngresarAreaUnico(area) {//Carga el area seleccionada
    //$("#txtCodArea").val(area.vcNomOrg.split("=")[1]);
    //$("#hdfCodAreaBusqueda").val(area.vcNomOrg.split("=")[0]);
    //$("#hdfCodIntArea").val(area.P_inCodOrg);
    if ($("#hdfCodInt2").val() == area.P_inCodOrg) {
        alerta("El área seleccionada no puede ser igual al área editada");
    }
    else {
        $("#cbeOrganizacion_spControl").html(area.vcNomOrg.split("=")[1]);
        $("#cbeOrganizacion_hdControl").val(area.P_inCodOrg);
    }
}




/*****  29/12/2015  :   RURBINA *****/
var nivsup = 0;
var Selecciono;

var SeleccionoNivel;
var SeleccionoSuperior;
var SeleccionoCentroCosto;
$(function () {


    $("#btnAgregarOrga").click(function () {
        var $width = 740;
        var $height = 505;
        var $Pagina = '../../../P_Movil/Consultar/Con_SeleccionArea.aspx?Tipo=1&Multiple=0';
        $("#ifArea").attr("src", $Pagina);
        Modal = $('#dvArea').dialog({
            title: "Seleccionar área",
            width: $width,
            height: $height,
            modal: true,
            resizable: false
        });
    });

    //nivel superior
    //            if ($("#txt_orga").val() == '') {
    //                $("#txt_orga").attr("disabled", true);
    //                $("#txt_orga").val('Seleccione un nivel de organización.');
    //                $("#txt_orga").css({ 'color': 'grey', 'font-size': '90%', 'font-weight': 'bold', 'font-style': 'italic' });
    //            }

    //configurar validacion de seleccion de autocomplete
    if ($("#hdfEstado").val() != '') {
        SeleccionoNivel = true;
        SeleccionoSuperior = true;
        SeleccionoCentroCosto = true;
    } else {
        SeleccionoNivel = false;
        SeleccionoSuperior = false;
        SeleccionoCentroCosto = false;
    }

    //Autocompletado Nivel de organización
    //$("#txt_nivelorga").live("keydown", function (e) {
    //    if (e.keyCode != 13) {
    //        SeleccionoNivel = false;
    //    }
    //});
    //            $("#txt_nivelorga").keypress(function (e) {
    //                if (e.keyCode == 13) {
    //                    $("#txt_nombre").focus();
    //                } else {
    //                    SeleccionoNivel = false;
    //                };
    //            });
    //            $("#txt_nivelorga").autocomplete({
    //                minLength: 0,
    //                source: function (request, response) {
    //                    $.ajax({
    //                        type: "POST",
    //                        url: "../../../Common/WebService/General.asmx/ListarNivelOrganizacion",
    //                        data: "{'maxFilas': '" + 100 + "'," +
    //                               "'vcNomAre': '" + $("#txt_nivelorga").val().replace(/'/g, "&#39").replace(/\\/g, "&#92").replace(/"/g, "&#34") + "'," + "'idCliente': '" + $("#hdfCodCliente").val() + "'}",
    //                        contentType: "application/json; charset=utf-8",
    //                        dataType: "json",
    //                        success: function (result) {
    //                            response($.map(result.d, function (item) {
    //                                return {
    //                                    label: item.vcNomNiv.replace(/&#39/g, "'").replace(/&#92/g, "\\").replace(/&#34/g, '"'),
    //                                    inCodNiv: item.P_inCodNiv
    //                                }
    //                            }));
    //                        },
    //                        cache: false,
    //                        error: function (XMLHttpRequest, textStatus, errorThrown) {
    //                            alert(XMLHttpRequest.responseText);
    //                            alert(errorThrown);
    //                        }
    //                    });
    //                },
    //                focus: function (event, ui) {
    //                    $("#txt_nivelorga").val(ui.item.label);
    //                    return false;
    //                },
    //                select: function (event, ui) {
    //                    SeleccionoNivel = true;
    //                    $("#txt_nivelorga").val(ui.item.label.replace(/&#39/g, "'"));
    //                    $("#hdfCodNivOrgBusqueda").val(ui.item.inCodNiv);
    //                    $('#txt_orga').val("");
    //                    //$('#txtCodCCO').val("");
    //                    $('#hdfCodOrgBusqueda').val("");
    //                    //$('#hdfCCOBusqueda').val("");
    //                    if (ui.item.inCodNiv == 1) {//agregado 02-09-2013
    //                        $("#txt_orga").prop("disabled", true);
    //                        $("#txt_orga").val('El nivel organización no tiene áreas superiores.');
    //                        $("#txt_orga").css({ 'color': 'grey', 'font-size': '90%', 'font-weight': 'bold', 'font-style': 'italic' });
    //                    } else {
    //                        $("#txt_orga").prop("disabled", false);
    //                        $("#txt_orga").css({ 'color': '', 'font-size': '', 'font-weight': '', 'font-style': '' });
    //                        activa(ui.item.inCodNiv);
    //                    }
    //                    $("#txt_nombre").focus();
    //                    return false;
    //                },
    //                change: function (event, ui) {
    //                    if (!SeleccionoNivel) {
    //                        $("#hdfCodNivOrgBusqueda").val("");
    //                        $("#txt_nivelorga").val('');
    //                        //area suuperior
    //                        $('#txt_orga').val("");
    //                        $("#hdfCodOrgBusqueda").val('');
    //                        //----
    //                        $("#txt_orga").attr("disabled", true);
    //                        $("#txt_orga").val('Seleccione un nivel de organización.');
    //                        $("#txt_orga").css({ 'color': 'grey', 'font-size': '90%', 'font-weight': 'bold', 'font-style': 'italic' });

    //                        //centro de costo
    //                        //$('#txtCodCCO').val("");
    //                        //$("#hdfCCOBusqueda").val("");
    //                    }
    //                    return false;
    //                },
    //                open: function (event, ui) {
    //                    SeleccionoNivel = false;
    //                    return false;
    //                }
    //            })
    //            .data("autocomplete")._renderItem = function (ul, item) {
    //                if (item.label != 'DESCONOCIDO') {//agregado 23-09-2013 wapumayta
    //                    return $("<li></li>")
    //			            .data("item.autocomplete", item)
    //                    //.append("<a>" + item.VCNOMORG + "<br>" + item.label + "</a>")
    //			            .append("<a>" + item.label + "</a>")
    //			            .appendTo(ul);
    //                };
    //            };

    if ($("#hdfCodNivOrgBusqueda").val() != '' && $("#hdfCodNivOrgBusqueda").val() > 0) {
        var nivsup = $("#hdfCodNivOrgBusqueda").val();
        activa(nivsup);
    }
    //activa(nivsup);
    //Autocompletado de Organización
    //            $("#txt_orga").keypress(function (e) {
    //                if (e.keyCode == 13) {
    //                    $("#txtCodCCO").focus();
    //                } else {
    //                    SeleccionoSuperior = false;
    //                };
    //            });
    function activa(codniv) {
        nivsup = codniv - 1; //agregado 02-09-2013 para mostrar areas de nivel superior al nivel seleccionado (wapumayta)
        //                $("#txt_orga").autocomplete({
        //                    minLength: 0,
        //                    source: function (request, response) {
        //                        $.ajax({
        //                            type: "POST",
        //                            url: "../../../Common/WebService/General.asmx/ListarOrganizacion",
        //                            data: "{'maxFilas': '" + 100 + "'," +
        //                               "'vcNomOrg': '" + $("#txt_orga").val().replace(/'/g, "&#39").replace(/\\/g, "&#92").replace(/"/g, "&#34") + "', 'vcCodNiv':'" + nivsup + "'," + "'idCliente': '" + $("#hdfCodCliente").val() + "'}",
        //                            contentType: "application/json; charset=utf-8",
        //                            dataType: "json",
        //                            success: function (result) {
        //                                response($.map(result.d, function (item) {
        //                                    return {
        //                                        label: item.vcNomOrg.replace(/&#39/g, "'").replace(/&#92/g, "\\").replace(/&#34/g, '"'),
        //                                        inCodOrg: item.vcCodInt
        //                                    }
        //                                }));
        //                            },
        //                            cache: false,
        //                            error: function (XMLHttpRequest, textStatus, errorThrown) {
        //                                alert(errorThrown);
        //                            }
        //                        });
        //                    },
        //                    focus: function (event, ui) {
        //                        $("#txt_orga").val(ui.item.label);
        //                        return false;
        //                    },
        //                    select: function (event, ui) {
        //                        SeleccionoSuperior = true;
        //                        $("#txt_orga").val(ui.item.label);
        //                        $("#hdfCodOrgBusqueda").val(ui.item.inCodOrg);
        //                        //centro de costo
        //                        //$('#txtCodCCO').val("");
        //                        //$('#hdfCCOBusqueda').val("");
        //                        $('#txtCodCCO').focus();
        //                        return false;
        //                    },
        //                    change: function (event, ui) {
        //                        if (!SeleccionoSuperior) {
        //                            $("#hdfCodOrgBusqueda").val("");
        //                            $("#txt_orga").val('');
        //                        }
        //                        return false;
        //                    },
        //                    open: function (event, ui) {
        //                        SeleccionoSuperior = false;
        //                        return false;
        //                    }
        //                })
        //            .data("autocomplete")._renderItem = function (ul, item) {
        //                return $("<li></li>")
        //			        .data("item.autocomplete", item)
        //                //.append("<a>" + item.VCNOMORG + "<br>" + item.label + "</a>")
        //			        .append("<a>" + item.label + "</a>")
        //			        .appendTo(ul);
        //            };
    }


    $("#txtCodCCO").keypress(function (e) {
        if (e.keyCode == 13) {
            $("#txt_correo1").focus();
        } else {
            SeleccionoCentroCosto = false;
        }
    });
    $("#txtCodCCO").autocomplete({
        minLength: 0,
        source: function (request, response) {
            $.ajax({
                type: "POST",
                url: "../../../Common/WebService/General.asmx/ListarCCOCombo",
                data: "{'maxFilas': '" + 100 + "'," +
                               "'vcNomCCO': '" + $("#txtCodCCO").val().replace(/'/g, "&#39").replace(/\\/g, "&#92").replace(/"/g, "&#34") + "'," + "'idCliente': '" + $("#hdfCodCliente").val() + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    response($.map(result.d, function (item) {
                        return {
                            label: item.vcNomCco.replace(/&#39/g, "'").replace(/&#92/g, "\\").replace(/&#34/g, '"'),
                            inCodCCO: item.vcCodCco
                        };
                    }));
                },
                cache: false,
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(errorThrown);
                }
            });
        },
        focus: function (event, ui) {
            $("#txtCodCCO").val(ui.item.label);
            return false;
        },
        select: function (event, ui) {
            SeleccionoCentroCosto = true;
            $("#txtCodCCO").val(ui.item.label);
            $("#hdfCCOBusqueda").val(ui.item.inCodCCO);
            $("#txt_correo1").focus();
            return false;
        },
        change: function (event, ui) {
            if (!SeleccionoCentroCosto) {
                $("#hdfCCOBusqueda").val("");
                $("#txtCodCCO").val('');
            }
            return false;
        },
        open: function (event, ui) {
            SeleccionoCentroCosto = false;
            return false;
        }
    })
            .data("autocomplete")._renderItem = function (ul, item) {
                return $("<li></li>")
			        .data("item.autocomplete", item)
                //.append("<a>" + item.VCNOMORG + "<br>" + item.label + "</a>")
			        .append("<a>" + item.label + "</a>")
			        .appendTo(ul);
            };
});
