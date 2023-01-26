var Modal;
var miEmpleado;
var vcCodEmpLigero;
var vcNomEmpLigero;
var hdfIdArea;
function empleado(P_vcCod, vcNom) {
    this.P_vcCod = P_vcCod;
    this.vcNom = vcNom;
}

 

$(function () {
    hdfIdArea = $("#hdfIdArea").val();
    IniciarPagina();
    ValidarNumeroEnCajaTexto("txtDNI", ValidarSoloNumero);

    $('#trGrupoEmpleadoStaff').hide();
    //debugger;
    if ($("#hdfEsSuperAdmin").val() == "1") {
        $("#trGrupoEmpleadoStaff").show();
    }

    if ($("#hdfTipoLicencia").val() == "BASIC" || $("#hdfTipoLicencia").val() == "STANDARD") {
        $("#filaGrupoEmpleado").hide();
    }

    $("#btnAgregar").click(function (event) {
        $('#ifEleccionOficina').attr("src", "SeleccionarOficina.aspx");
        ModalNuevo = $('#dvSeleccionarOficina').dialog({
            title: "Seleccionar Oficina",
            height: 460,
            width: 780,
            modal: true,
            open: function (event, ui) {
                $("body").css({ overflow: 'hidden' })
            },
            beforeClose: function (event, ui) {
                $("body").css({ overflow: 'inherit' })
            }
        });
    });

    $(".btnNormal").button();

    if ($.trim($("#hdfEstado").val()) != "") {
        $("#BtnIrUsuario").css("display", "");
        $("#filaTooltipIrUsuario").css("display", "");
    } else {
        $("#BtnIrUsuario").css("display", "none");
        $("#filaTooltipIrUsuario").css("display", "none");
    }

    function IniciarPagina() {
        if ($("#hdfesInfo").val() == "0") {
            if ($.trim($("#hdfEstado").val()) == "") {
                $("#txtCodigo").focus();
            }
            else {
                //$("#txtCodArea").focus().select();
            }
            var btVig = $('#chActivo').is(':checked');

            if ($("#hdfEstado").val() == '') {
                $("#tdEstado").hide();
            }
            else {
                $("#tdEstado").show();
            }
        } else {
            esInfo();
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

    $("#btnGuardar").live("click", function () {
        var Codigo = $("#txtCodigo").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92");
        //var Area = $("#hdfCodAreaBusqueda").val();
        var GrupoOrigen = $("#hdfCodGruOriBusqueda").val();
        var Nombres = $("#txtNombre").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92");
        var Sucursal = $("#hdfCodSucBusqueda").val();
        var CentroCosto = $("#hdfCCOBusqueda").val();
        var CorreoPersonal = $("#txtMailPersonal").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92");
        var CorreoJefe = $("#txtMailJefe").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92");
        var UbiFis = $("#txtUbiFis").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92");
        var InfAdicional = $("#txtInfAdi").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92");
        //var CodIntArea = $("#cbeOrganizacion_hdControl").val(); //agregado 22-08-2013
        var CodIntArea = $("#hdfIdArea").val();  //agregado 10/07/2019 y comentado linea de cbeOrganizacion
        var GrupoOrigenF = ($.trim($("#hdfCodGrupoFalmiliaBusqueda").val()) == 0 ? 0 : $("#hdfCodGrupoFalmiliaBusqueda").val()); //agregado 18-11-2013
        var CodOficina = ($.trim($("#hdfCodOficinaBusqueda").val()) == "" ? "0" : $("#hdfCodOficinaBusqueda").val()); //agregado 18-11-2013
        var Estado = $('#chActivo').is(':checked');
        var ExoSinc = $('#ChkSincronizacion').is(':checked');
        var NroCuenta = $("#txtNroCuenta").val();
        //        if ($("#chkEstado").is(':checked')) {
        //            alert(1);
        //        } else {
        //            alert(0);
        //        }

        var CamposDinamicos = "";

        UbiFis = UbiFis.replace(/'/g, "&#39");
        InfAdicional = InfAdicional.replace(/'/g, "&#39");
        var DNI = $("#txtDNI").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92");

        if ($("#hdfOcultarCamposLigero").val() == "1") {
            /*Edgar Garcia 09112022*/
            //CodIntArea = '0000000000';
            CentroCosto = '0000000000';
            CodOficina = '1';
            Sucursal = '1';
        }

        if (!$('#ChkAutogenerado').is(':checked')) {
            if ($.trim(Codigo) == "") {
                alerta("El código es un campo obligatorio");
                $("#txtCodigo").focus();
                return;
            }
        }

        if ($.trim(CodIntArea) == "") {
            alerta("El Área es un campo obligatorio");
            //$("#txtCodArea").focus();
            return;
        }

        if ($.trim(GrupoOrigen) == "") {
            alerta("El grupo empleado es un campo obligatorio");
            $("#txtCodGrupoOrigen").focus();
            return;
        }

        if ($.trim(Nombres) == "") {
            alerta("El nombre es un campo obligatorio");
            $("#txtNombre").focus();
            return;
        }

        if ($.trim(Sucursal) == "") {
            alerta("El centro de trabajo es un campo obligatorio");
            $("#txtCodSucursal").focus();
            return;
        }

        if ($.trim(CentroCosto) == "") {
            alerta("El centro de costo es un campo obligatorio");
            $("#txtCodCCO").focus();
            return;
        }

        //if ($.trim(CodOficina) == "" || $.trim(CodOficina) == "0") {
        //    alerta("La oficina es un campo obligatorio");
        //    $("#txtOficina").focus();
        //    return;
        //}


        /*EDGAR GARCIA 04112022*/
        try {
            if ($("#hdfOcultarCamposLigero").val() != "1") {
                if ($.trim(CorreoPersonal) == "") {
                    //            alerta("El correo personal es un campo obligatorio");
                    //            $("#txtMailPersonal").focus();
                    //            return;
                } else {
                    if (validarEmail2($.trim(CorreoPersonal)) == false) {
                        alerta("Revisar el formato del Correo Personal xxxxx@xxx.xxx");
                        $("#txtMailPersonal").focus();
                        return;
                    }
                }

                if ($.trim(CorreoJefe) != "") {
                    if (validarEmail2($.trim(CorreoJefe)) == false) {
                        alerta("Revisar el formato del Correo Jefatura xxxxx@xxx.xxx");
                        $("#txtMailJefe").focus();
                        return;
                    }
                }

                //if ($.trim(DNI) == "" || $.trim(DNI) == "0") {
                //    alerta("Ingrese un DNI válido");
                //    $("#txtDNI").focus();
                //    return;
                //}
            }
        }

        catch(e) { console.log(e) }

      

        if ($("#hdfOcultarCamposLigero").val() == "1") {
            vcCodEmpLigero = Codigo;
            vcNomEmpLigero = Nombres;
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


        $("#dvCargando").show();

        $.ajax({
            type: "POST",
            url: "Mnt_Empleado.aspx/Guardar",
            //data: "{'Codigo': '" + Codigo + "', 'Area': '', 'Nombre': '" + $.trim(Nombres) + "', 'UbiFis': '" + $.trim(UbiFis) + "', 'CorPer': '" + $.trim(CorreoPersonal) + "', 'CorJef': '" + $.trim(CorreoJefe) + "', 'CodGruOri': '" + GrupoOrigen + "', 'InfAdi': '" + $.trim(InfAdicional) + "', 'CodSuc': '" + Sucursal + "', 'CodCco': '" + CentroCosto + "', 'inCodEst': '" + $("#hdfEstado").val() + "', 'CodIntArea':'" + CodIntArea + "', 'codGruOriFam': '" + GrupoOrigenF + "', 'codOficina':'" + CodOficina + "', 'blEstado':'" + Estado + "', 'DNI':'" + DNI + "'}",
            data: "{'Codigo': '" + Codigo + "', 'Area': '', 'Nombre': '" + $.trim(Nombres) + "', 'UbiFis': '" +
                  $.trim(UbiFis) + "', 'CorPer': '" + $.trim(CorreoPersonal) + "', 'CorJef': '" + $.trim(CorreoJefe) +
                  "', 'CodGruOri': '" + GrupoOrigen + "', 'InfAdi': '" + $.trim(InfAdicional) + "', 'CodSuc': '" + Sucursal +
                  "', 'CodCco': '" + CentroCosto + "', 'inCodEst': '" + $("#hdfEstado").val() + "', 'CodIntArea':'" + CodIntArea +
                  "', 'codGruOriFam': '" + GrupoOrigenF + "', 'codOficina':'" + CodOficina + "', 'blEstado':'" + Estado +
                  "', 'DNI':'" + DNI + "', 'NroCuenta':'" + NroCuenta + "', 'ExoSinc':'" + ExoSinc + "', 'vcCamDim':'" + CamposDinamicos + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                 $("#dvCargando").hide();
                //if (msg.d == "") {
                //    if ($("#hdfOcultarCamposLigero").val() == "1") {
                //        $("#btnGuardar").button("option", "disabled", true);
                //        $("#btnCerrar").button("option", "disabled", true);
                //        Mensaje("<br/><h1>Empleado guardado</h1><br/>", document, CerroMensaje);
                //    } else {
                //        Mensaje("<br/><h1>Empleado guardado</h1><br/>", document, CerroMensaje);
                //    }

                //}
                //else {
                //    alerta("Revisar: " + msg.d);
                //}
                  
                if (msg.d == "" ) { 
                    try {
                        if ($("#hdfOcultarCamposLigero").val() != "1") {

                            window.parent.ActualizarGrilla();
                            $("#btnGuardar").button("option", "disabled", true);
                            $("#btnCerrar").button("option", "disabled", true);
                        }
                    } catch (e) {
                    } 
                    try {
                        window.top.fnObtenerWindowPlantillaTab().$('#div_modal').dialog('close');
                    } catch (e) {
                    }

                     Mensaje("<br/><h1>Empleado guardado</h1><br/><h2>" + Nombres  + "</h2>", document, CerroMensaje);
                }
                else {
                    alerta("Revisar: " + msg.d);
                }
                if (!EsLlamadaExterna) {
                    if ($("#hdfOcultarCamposLigero").val() != "1") {
                        window.parent.ActualizarGrilla();
                    }
                }


            }, error: function (xhr, err) {
                $("#dvCargando").hide();
                alerta("Error, Estadow: " + xhr.readyState + "\nEstado: " + xhr.status);
            }
        });
    });

    /*Edgar Garcia 04112022*/
    try {
        if ($("#hdfOcultarCamposLigero").val() != "1") {
            if (!EsLlamadaExterna) {
                if ($("#hdfesInfo").val() == "0") {
                    var indiceTab = window.parent.tab.tabs("option", "selected");
                }
            }
        }
    }
    catch (e) {console.log(e) }

   



    function CerroMensaje() {
        if ($("#hdfOcultarCamposLigero").val() == "1") {
            
            if (vcCodEmpLigero == '') {
               
                $.ajax({
                    type: "POST",
                    url: "Mnt_Empleado.aspx/BuscarId",
                    data: "{'nombre':'" + vcNomEmpLigero + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (msg) {
                         
                        window.parent.ObtenerDatosEmpleadosLigero(msg.d, vcNomEmpLigero);
                    }, error: function (xhr, err) {
                        alerta("Error, Estado: " + xhr.readyState + err + "\nEstado: " + xhr.status);
                    }
                });

              

            } else {
                window.parent.ObtenerDatosEmpleadosLigero(vcCodEmpLigero, vcNomEmpLigero);
            }
        }
        if ($("#hdfEstado").val() == "") {
            if (!EsLlamadaExterna) {
                window.parent.tab.tabs("remove", indiceTab);

                $("#txtCodigo").val("");
                $("#txtNombre").val("");
                //$("#txtCodArea").val("");
                //$("#cbeOrganizacion_spControl").html('');
                //$("#cbeOrganizacion_hdControl").val('');
                $("#txtOrga").val("");  //agregado 10/07/2019 y comentado 2 lineas de cbeOrganizacion
                $("#hdfIdArea").val("");

                $("#txtCodGrupoOrigen").val("");
                $("#txtCodSucursal").val("");
                $("#txtCodCCO").val("");
                $("#txtMailPersonal").val("");
                $("#txtMailJefe").val("");
                $("#txtUbiFis").val("");
                $("#txtInfAdi").val("");
                $("#txtCodGrupoFalmilia").val(""); //agregado 18-11-2013
                $("#txtOficina").val(""); //agregado 18-11-2013
                $("#hdfCodGrupoFalmiliaBusqueda").val(""); //agregado 18-11-2013
                $("#hdfCodOficinaBusqueda").val(""); //agregado 18-11-2013
                $("#hdfCodGruOriBusqueda").val("");
                $("#hdfCodSucBusqueda").val("");
                $("#hdfCCOBusqueda").val("");
                $("#txtCodigo").focus();
            }
            else {
                window.parent.fnRetornaFrameModal();
                window.parent.$('#div_modal').dialog('close');
            }
        }
        else {
            if (!EsLlamadaExterna) {
                window.parent.tab.tabs("remove", indiceTab);
            }
            else {
                window.parent.fnRetornaFrameModal();
                window.parent.$('#div_modal').dialog('close');
            }
        }
    }

    $("#btnEliminar").live("click", function () {
        $("#txtOficina").val("");
        $("#hdfCodOficinaBusqueda").val("");
    });

    $("#btnCerrar").live("click", function () {
        if ($("#hdfOcultarCamposLigero").val() == "1") {
            window.parent.CerrarDialogEmpleadoLigero();
        } else {
            if (!EsLlamadaExterna) {
                if ($("#hdfesInfo").val() == "0") {
                    window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));
                } else {
                    //alerta("esInfo");
                    window.parent.ModalInfo.dialog('close');
                }
            }
            else {
                window.parent.$('#div_modal').dialog('close');
            }
        }

    });

    if (EsLlamadaExterna) {
        if ($("#txtCodigo").attr("disabled") == "disabled") {
            //Es Editar
            $("#trAreaLlamadaExterna").show();
            $("#trFilaArea").hide();
        }
        else {
            //Es Nuevo..
            $("#trAreaLlamadaExterna").hide();
            $("#trFilaArea").show();
        }
    }
    else {
        $("#trAreaLlamadaExterna").hide();
        $("#trFilaArea").show();
        $("#BtnIrUsuario").hide();
        $("#filaTooltipIrUsuario").hide();
    }

    if ($("#hdfOcultarCamposLigero").val() == "1") {
        //SE CAMBIO LAS SIGUIENTES 2 LINEAS A SHOW EDGAR GARCIA 08112022

        $("#trAreaLlamadaExterna").hide();
        $("#trFilaArea").show();
        //$("#trGrupoEmpleadoStaff").hide();
        //$("#filaGrupoEmpleado").hide();
        $("#trSucursal").hide();
        $("#trCentroCosto").hide();
        $("#trOficina").hide();

        $("#trCorreoPer").hide();
        $("#trCorreoJef").hide();
        $("#trUnidadFisica").hide();
        $("#trInforAdicional").hide();
        $("#trDocumentoIdentidad").hide();
        if ($("#hdfTipoLinea").val() == "1") {
            $("#filaGrupoEmpleado").hide();
        } else {
            $("#trGrupoEmpleadoStaff").hide();
        }
    }

    $("#dvGlobal").show();
    if ($("#hdfView").val() == "1") {
        window.top.$('#iframe_modal').show();
        $("#trGrupoEmpleadoStaff").hide();
        window.top.$("#dvCargando").hide();
        if ($("#hdfEsSuperAdmin").val() == "1") {
            $("#trGrupoEmpleadoStaff").show();
        }
    }

    if ($("#txtCodigo").val() == "") {
        $("#dvAutogenerado").css("display", "");
        $("#ChkAutogenerado").change(function () {
            if (this.checked) {
                $("#txtCodigo").attr("disabled", true);
            } else {
                $("#txtCodigo").attr("disabled", false);
                $('#txtCodigo').focus();
            }
        });
    } else {
        dvAutogenerado.InnerHtml = ""
        $("#dvAutogenerado").css("display", "none");
    }


    fnVerCredencialesUsuario();

});


function ObtenerOficina(DatosOficina) {
    if (DatosOficina[0].IdOficina != null) {
        $("#txtOficina").val((DatosOficina[0].Codigo == "" ? "" : DatosOficina[0].Codigo + " - ") + DatosOficina[0].Descripcion);
        $("#hdfCodOficinaBusqueda").val(DatosOficina[0].IdOficina);
    }
    $("#dvSeleccionarOficina").dialog("close");
}

function esInfo() { //agregado 10-03-2014 - wapumayta
    $("#txtCodigo").attr("disabled", true);
    $("#txtNombre").attr("disabled", true);
    //$("#txtCodArea").attr("disabled", true);
    $("#txtCodGrupoOrigen").attr("disabled", true);
    $("#txtCodSucursal").attr("disabled", true);
    $("#txtCodCCO").attr("disabled", true);
    $("#txtMailPersonal").attr("disabled", true);
    $("#txtMailJefe").attr("disabled", true);
    $("#txtUbiFis").attr("disabled", true);
    $("#txtInfAdi").attr("disabled", true);
    $("#txtCodGrupoFalmilia").attr("disabled", true);
    $("#txtOficina").attr("disabled", true);

    $("#ChkSincronizacion").attr("disabled", true);

    //por si el cliente tuviese caracteristicas adicionales personalizados. 
    $("input[type='text']").attr("disabled", true);

    $("#btnAgregarOrga").hide();
    $("#btnEliminar").hide();

    $("#btnGuardar").hide();
    $("#btnAgregar").hide();
}

//function verificaCambioArea(areaNueva, areaAntigua){
//    let resultado = false;

//    if (areaNueva.indexOf(areaAntigua) > -1) {
//        return true;
//    }
//    else {
//        if (areaNueva.substring(0, areaNueva.length - 3).indexOf(areaAntigua) > -1) {
//            return true;
//        }
//    }
//    return resultado;
//}

function verificaCambioArea(areaNueva, areaAntigua) {
    let resultado = false;

    if (areaNueva.indexOf(areaAntigua) > -1) {
        return true;
    }
    else {
        //if (areaNueva.substring(0, areaNueva.length - 3).indexOf(areaAntigua) > -1) {
        if (areaNueva.length - 3 > 3 && areaAntigua.length - 3 > 3) {
            if (areaNueva.substring(0, areaNueva.length - 3).indexOf(areaAntigua.substring(0, areaAntigua.length - 3)) > -1) {
                return true;
            }
        }
        else if (areaNueva.length - 3 == 3 && areaAntigua.length - 3 == 3) {
            if (areaNueva.indexOf(areaAntigua) > -1) {
                return true;
            }
        }
        else if (areaNueva.length - 3 > 3 && areaAntigua.length - 3 == 3) {
            if (areaNueva.substring(0, areaNueva.length - 3).indexOf(areaAntigua) > -1) {
                return true;
            }
        }
        else if (areaNueva.length - 3 == 3 && areaAntigua.length - 3 > 3) {
            if (areaNueva.indexOf(areaAntigua.substring(0, areaAntigua.length - 3)) > -1) {
                return true;
            }
        }
        else {
            return false;
        }

    }
    return resultado;
}

function IngresarAreaUnico(area) {//Carga el area seleccionada
    //$("#txtCodArea").val(area.vcNomOrg.split("=")[1]);
    //$("#hdfCodAreaBusqueda").val(area.vcNomOrg.split("=")[0]);
    //$("#hdfCodIntArea").val(area.P_inCodOrg);    
    //debugger;
    let CantidadLineasEmpleado = $("#hdfCantidadLineasEmpleado").val();
    let hdfCodigoOrganizacionCuenta = $("#hdfCodigoOrganizacionCuenta").val();

    if ($("#hdfAreaFacturacion").val() == "2") {
        if (parseInt(CantidadLineasEmpleado) > 0) {
            if (hdfCodigoOrganizacionCuenta != "") {
                if (!verificaCambioArea(area.P_inCodOrg, hdfCodigoOrganizacionCuenta)) {
                    $(this).dialog("close");
                    alerta("Usted no puede realizar el cambio de organización. Para realizar el cambio de la organización necesita modificarlo desde el mantenimiento de cuentas. ");
                    return;
                }
            }
            
            //if (!verificaCambioArea(area.P_inCodOrg, hdfIdArea)) {
            //    $(this).dialog("close");
            //    alerta("Usted no puede realizar el cambio de organización. Para realizar el cambio de la organización necesita modificarlo desde el mantenimiento de cuentas. ");
            //    return;
            //}
        }
    }
    
    var nombreArea = area.vcNomOrg.split("=")[1];
    if (nombreArea.length > 45) {
        nombreArea = nombreArea.substring(0, 45) + '...';
    }

    //$("#cbeOrganizacion_spControl").html(nombreArea);
    //$("#cbeOrganizacion_hdControl").val(area.P_inCodOrg);
    console.log(nombreArea);
    $("#txtOrga").val(nombreArea);   //agregado 10/07/2019 y comentado 2 lineas de cbeOrganizacion
    $("#hdfIdArea").val(area.P_inCodOrg);

    //Validar
    //debugger;
    if ($("#hdfCCOBusqueda").val() != "") {
        $('#divMsgConfirmacionCCO').dialog({
            title: "Actualizar Centro de Costo",
            modal: true,
            buttons: {
                "Aceptar": function () {
                    $(this).dialog("close");
                    //ActualizarCentroCosto(area.vcNomOrg.split("=")[0]);
                    ActualizarCentroCosto(area.P_inCodOrg);
                },
                "Cancelar": function () {
                    $(this).dialog("close");
                }
            }
        });
    } else {
        //ActualizarCentroCosto(area.vcNomOrg.split("=")[0]);
        ActualizarCentroCosto(area.P_inCodOrg);
    }
}

function ActualizarCentroCosto(vcCodArea) {
    $.ajax({
        type: "POST",
        url: "Mnt_Empleado.aspx/ObtenerCentroCostoXArea",
        data: "{'vcCodArea':'" + vcCodArea.toString() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            $("#txtCodCCO").val(result.d.vcNomCco);
            $("#hdfCCOBusqueda").val(result.d.F_vcCodCco);
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function fnVerCredencialesUsuario() {
    $("#BtnIrUsuario").click(function () {
        miEmpleado = new empleado($("#txtCodigo").val(), $("#txtNombre").val());
        var MiPagina;
        $("#dvGlobal").css({ "display": "none" });

        if ($("#hdfIdUsuario").val() == -1) {
            MiPagina = raiz('P_Configuracion/Seguridad/Administrar/Mnt_SEG_Usuario.aspx?view=1');
        }
        else {
            MiPagina = raiz('P_Configuracion/Seguridad/Administrar/Mnt_SEG_Usuario.aspx?Cod=' + $("#hdfIdUsuario").val().toString() + '&Par=P_inCod&view=1');
        }


        $('#ifCredencialesUsuario').attr('src', MiPagina);
        $("#dvPaneusuario").fadeIn(300);

    });
}

function fnMostrarPanelEmp() {
    $("#ifCredencialesUsuario")[0].contentWindow.IngresarEmpleadoUnico(miEmpleado);
}

function fnVolverAEmpleado() {
    $("#dvPaneusuario").css({ "display": "none" });
    $("#dvGlobal").fadeIn(200);
}

function fnVolverAEmpleadoReload() {
    location.reload(true);
}

function alertaPersonalizado(contenido, Titulo, fnCerrar) {
    //debugger;
    $("#dvContenidoAlertaPorLinea").html("");
    $("#dvContenidoAlertaPorLinea").html(contenido);

    if (Titulo == null || Titulo == undefined)
        Titulo = "Mensaje del sistema";

    $("#dvContenidoAlertaPorLinea").css("z-index", "100000000");
    $('#dvMsgAlertaPorLinea').css("z-index", "100000000");
    $('#dvMsgAlertaPorLinea').dialog({
        title: Titulo,
        buttons: {
            "Aceptar": function () {
                $(this).dialog("close");
                $("#" + idFocus).focus();
                if (fnCerrar != null && fnCerrar != undefined)
                    fnCerrar();
            }
        },
        position: { my: "center", at: "center", of: window },
        open: function (event, ui) {
            $('#dvContenidoAlertaPorLinea').focus();
        }
    });
}


/*****  29/12/2015  :   RURBINA *****/

var Selecciono;
$(function () {
    $("#txtCodigo").keypress(ValidarCodigoVarChar);

    ValidarNumeroEnCajaTexto("txtAsignado", ValidarDecimal);
    ValidarNumeroEnCajaTexto("txtMontoPersonal", ValidarDecimal);

    //var spinner = $("#spinner").spinner();

    if ($("#hdfCodCliente").val() != '') {
        Selecciono = true;
    }

    //VALIDAR SELECCION EN AUTOCOMPLETE
    $("#txtCodGrupoOrigen,#txtCodGrupoFalmilia,#txtCodSucursal,#txtCodCCO").keypress(function (e) {
        if (e.keyCode == 13) {
            switch ($(this).attr("id")) {
                case ("txtCodGrupoOrigen"):
                    $("#txtCodGrupoFalmilia").focus();
                    break;
                case ("txtCodGrupoFalmilia"):
                    $("#txtCodSucursal").focus();
                    break;
                case ("txtCodSucursal"):
                    $("#txtCodCCO").focus();
                    break;
                case ("txtCodCCO"):
                    $("#txtOficina").focus();
                    //$("#btnAgregar").focus();
                    //$("#btnAgregar").click();
                    //$("#txtCodCCO").focusout();
                    break;
                default:
                    $("#txtMailPersonal").focus();
                    break;
            }
        } else {
            Selecciono = false;
        }
    });

    //EDGAR GARCIA 04112022 AGREGE draggable y resizable y tambien el try
    $("#btnAgregarOrga").click(function () {

        var tamano = {
            ancho : 750,
            alto : 535     }
        const tam = Object.create(tamano);

        try { window.parent.Adaptartamaño(tam) }
       
        catch (e) { console.log(e)}

         var $width = 740;
        var $height = 505;
        var $Pagina = '../../../P_Movil/Consultar/Con_SeleccionArea.aspx?Tipo=1&Multiple=0';
        $("#ifArea").attr("src", $Pagina);
        Modal = $('#dvArea').dialog({
            title: "Seleccionar área",
            width: $width,
            height: $height,
            modal: true, 
            open: function (event, ui) {
                $("body").css({ overflow: 'hidden' })
            },
            beforeClose: function (event, ui) {
                var tamano = {
                    ancho: 760,
                    alto: 280
                }
                const tam = Object.create(tamano);
                try { window.parent.Adaptartamaño(tam) }

                catch (e) { console.log(e) }


                $("body").css({ overflow: 'inherit' })
            }
        });
    });

    //            $("#txtCodArea").keypress(function (e) {
    //                if (e.keyCode == 13) {
    //                    $("#txtCodGrupoOrigen").focus();
    //                } else {
    //                    SeleccionoModelo = false;
    //                };
    //            });
    //            $("#txtCodArea").autocomplete({
    //                minLength: 0,
    //                source: function (request, response) {
    //                    $.ajax({
    //                        type: "POST",
    //                        url: "../../../Common/WebService/General.asmx/ListarAreas",
    //                        data: "{'maxFilas': '" + 100 + "'," +
    //                               "'vcNomAre': '" + $("#txtCodArea").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92") + "'," + "'idCliente': '" + $("#hdfCodCliente").val() + "'}",
    //                        contentType: "application/json; charset=utf-8",
    //                        dataType: "json",
    //                        success: function (result) {
    //                            response($.map(result.d, function (item) {
    //                                return {
    //                                    label: item.Nombre.replace(/&#39/g, "'").replace(/&#92/g, "\\").replace(/&#34/g, '"'),
    //                                    inCodAre: item.Codigo,
    //                                    inCodInt: item.CodInt, //agregado 22-08-2013
    //                                    vcCodCCSTO: item.CodCentroCosto, //agregado 17-06-2014 RRAMOS
    //                                    vcNomCCSTO: item.NomCentroCosto  //agregado 17-06-2014 RRAMOS
    //                                }
    //                            }));
    //                        },
    //                        cache: false,
    //                        error: function (XMLHttpRequest, textStatus, errorThrown) {
    //                            alert(errorThrown);
    //                        }
    //                    });
    //                },
    //                focus: function (event, ui) {
    //                    $("#txtCodArea").val(ui.item.label);
    //                    return false;
    //                },
    //                select: function (event, ui) {
    //                    Selecciono = true;
    //                    $("#txtCodArea").val(ui.item.label);
    //                    $("#hdfCodAreaBusqueda").val(ui.item.inCodAre);
    //                    $("#hdfCodIntArea").val(ui.item.inCodInt); //agregado 22-08-2013
    //                    if ($("#txtCodigo").val() != "") {
    //                        if ($("#hdfCodCCOArea").val() == $("#hdfCCOBusqueda").val()) {
    //                            if (ui.item.vcCodCCSTO == $("#hdfCCOBusqueda").val()) {
    //                                return;
    //                            } else {
    //                                $("#txtCodCCO").val(ui.item.vcNomCCSTO);        //agregado 17-06-2014 RRAMOS
    //                                $("#hdfCCOBusqueda").val(ui.item.vcCodCCSTO);   //agregado 17-06-2014 RRAMOS
    //                            }
    //                        } else {
    //                            if (ui.item.vcCodCCSTO != $("#hdfCCOBusqueda").val()) {
    //                                return;
    //                            } else {
    //                                $("#txtCodCCO").val(ui.item.vcNomCCSTO);        //agregado 17-06-2014 RRAMOS
    //                                $("#hdfCCOBusqueda").val(ui.item.vcCodCCSTO);   //agregado 17-06-2014 RRAMOS
    //                            }
    //                        }
    //                    } else {
    //                        $("#txtCodCCO").val(ui.item.vcNomCCSTO);        //agregado 17-06-2014 RRAMOS
    //                        $("#hdfCCOBusqueda").val(ui.item.vcCodCCSTO);   //agregado 17-06-2014 RRAMOS
    //                    }
    //                    $("#txtCodGrupoOrigen").focus();
    //                    return false;
    //                },
    //                change: function (event, ui) {
    //                    if (!Selecciono) {
    //                        $("#hdfCodAreaBusqueda").val("");
    //                        $("#txtCodArea").val("");
    //                    };
    //                    return false;
    //                },
    //                open: function (event, ui) {
    //                    Selecciono = false;
    //                    return false;
    //                }
    //            })
    //            .data("autocomplete")._renderItem = function (ul, item) {
    //                return $("<li></li>")
    //			        .data("item.autocomplete", item)
    //                //.append("<a>" + item.VCNOMORG + "<br>" + item.label + "</a>")
    //			        .append("<a>" + item.label + "</a>")
    //			        .appendTo(ul);
    //            };


    $("#txtCodGrupoOrigen").autocomplete({
        minLength: 0,
        source: function (request, response) {
            $.ajax({
                type: "POST",
                url: "Mnt_Empleado.aspx/ListarGrupoOrigen",
                data: "{'maxFilas': '" + 100 + "'," +
                           "'intTipoLinea': '" + 1 + "'," +
                           "'vcNomGru': '" + $("#txtCodGrupoOrigen").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92") + "'," +
                           "'idCliente': '" + $("#hdfCodCliente").val() + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    response($.map(result.d, function (item) {
                        return {
                            label: item.vcNomGru.replace(/&#39/g, "'").replace(/&#92/g, "\\").replace(/&#34/g, '"'),
                            inCodGru: item.P_inCodGruOri
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
            $("#txtCodGrupoOrigen").val(ui.item.label);
            return false;
        },
        select: function (event, ui) {
            Selecciono = true;
            $("#txtCodGrupoOrigen").val(ui.item.label);
            $("#hdfCodGruOriBusqueda").val(ui.item.inCodGru);
            $("#txtCodGrupoFalmilia").focus();
            return false;
        },
        change: function (event, ui) {
            if (!Selecciono) {
                $("#hdfCodGruOriBusqueda").val("");
                $("#txtCodGrupoOrigen").val("");
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
                //.append("<a>" + item.VCNOMORG + "<br>" + item.label + "</a>")
			        .append("<a>" + item.label + "</a>")
			        .appendTo(ul);
            };

    $("#txtCodGrupoFalmilia").autocomplete({
        minLength: 0,
        source: function (request, response) {
            $.ajax({
                type: "POST",
                url: "Mnt_Empleado.aspx/ListarGrupoOrigen",
                data: "{'maxFilas': '" + 100 + "'," +
                           "'intTipoLinea': '" + 2 + "'," +
                           "'vcNomGru': '" + $("#txtCodGrupoFalmilia").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92") + "'," +
                           "'idCliente': '" + $("#hdfCodCliente").val() + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    response($.map(result.d, function (item) {
                        return {
                            label: item.vcNomGru.replace(/&#39/g, "'").replace(/&#92/g, "\\").replace(/&#34/g, '"'),
                            inCodGru: item.P_inCodGruOri
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
            $("#txtCodGrupoFalmilia").val(ui.item.label);
            return false;
        },
        select: function (event, ui) {
            Selecciono = true;
            $("#txtCodGrupoFalmilia").val(ui.item.label);
            $("#hdfCodGrupoFalmiliaBusqueda").val(ui.item.inCodGru);
            $("#txtCodSucursal").focus();
            return false;
        },
        change: function (event, ui) {
            if (!Selecciono) {
                $("#hdfCodGrupoFalmiliaBusqueda").val("");
                $("#txtCodGrupoFalmilia").val("");
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
                //.append("<a>" + item.VCNOMORG + "<br>" + item.label + "</a>")
			        .append("<a>" + item.label + "</a>")
			        .appendTo(ul);
            };

    $("#txtCodSucursal").autocomplete({
        minLength: 0,
        source: function (request, response) {
            $.ajax({
                type: "POST",
                url: "../../../Common/WebService/General.asmx/ListarSucursalCombo",
                data: "{'maxFilas': '" + 100 + "'," +
                               "'vcNomSuc': '" + $("#txtCodSucursal").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92") + "'," + "'idCliente': '" + $("#hdfCodCliente").val() + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    response($.map(result.d, function (item) {
                        return {
                            label: item.vcNom.replace(/&#39/g, "'").replace(/&#92/g, "\\").replace(/&#34/g, '"'),
                            inCodSuc: item.P_vcCod
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
            $("#txtCodSucursal").val(ui.item.label);
            return false;
        },
        select: function (event, ui) {
            Selecciono = true;
            $("#txtCodSucursal").val(ui.item.label);
            $("#hdfCodSucBusqueda").val(ui.item.inCodSuc);
            $("#txtCodCCO").focus();
            return false;
        },
        change: function (event, ui) {
            if (!Selecciono) {
                $("#hdfCodSucBusqueda").val("");
                $("#txtCodSucursal").val("");
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
                //.append("<a>" + item.VCNOMORG + "<br>" + item.label + "</a>")
			        .append("<a>" + item.label + "</a>")
			        .appendTo(ul);
            };



    $("#txtCodCCO").autocomplete({
        minLength: 0,
        source: function (request, response) {
            $.ajax({
                type: "POST",
                url: "../../../Common/WebService/General.asmx/ListarCCOCombo",
                data: "{'maxFilas': '" + 100 + "'," +
                               "'vcNomCCO': '" + $("#txtCodCCO").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92") + "'," + "'idCliente': '" + $("#hdfCodCliente").val() + "'}",
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
            Selecciono = true;
            $("#txtCodCCO").val(ui.item.label);
            $("#hdfCCOBusqueda").val(ui.item.inCodCCO);
            $("#txtMailPersonal").focus();
            return false;
        },
        change: function (event, ui) {
            if (!Selecciono) {
                $("#hdfCCOBusqueda").val("");
                $("#txtCodCCO").val("");
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
                //.append("<a>" + item.VCNOMORG + "<br>" + item.label + "</a>")
			        .append("<a>" + item.label + "</a>")
			        .appendTo(ul);
            };


});
