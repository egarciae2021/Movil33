var oCampanaConfiguracion;
var oCulturaUsuario;
function ENT_MOV_CAM_CampanaConfiguracion() {
    this.CancelarPedido;
    this.CancelarPedidoDiasMax;
    this.CancelarPedidoDiasMaxFin;
    this.ModificarPedido;
    this.ReservarProducto;
    this.ReservarProductoDiasMax;
    this.ReservarProductoDiasMaxFin;
    this.GenerarCodigo;
    this.FormatoCodigo;
    this.MigrarContrato;
    this.LugarEntrega;
    this.DiasRecojo;
    this.DiasAntiguedad;
    this.CantidadPedidosxDia;
    //JBALMACEDA 20160624
    this.ElegirLugarEntrega;
    this.RenovarPlan;

    //JBALMACEDA 20160708 152000
    this.GastosAdministrativos;
    this.MontoGastosAdministrativos;
    this.UsarPlanesDependientes;

    this.UsarContratoResumen;
    this.FechaGenerarContratoResumen;
    this.Portabilidad;
    this.PortabilidadPlan;
}

function ObtieneConfiguracion() {

    var oCampanaConfiguracion = new ENT_MOV_CAM_CampanaConfiguracion();
    oCampanaConfiguracion.CancelarPedido = $('#chkCancelarPedido').is(':checked');
    oCampanaConfiguracion.CancelarPedidoDiasMax = ($("#txtCancelarPedidoDiasMax").val() == "" ? "0" : $("#txtCancelarPedidoDiasMax").val());
    oCampanaConfiguracion.CancelarPedidoDiasMaxFin = ($("#txtCancelarPedidoDiasMaxFin").val() == "" ? "0" : $("#txtCancelarPedidoDiasMaxFin").val());
    oCampanaConfiguracion.ModificarPedido = $('#chkModificarPedido').is(':checked');
    oCampanaConfiguracion.ReservarProducto = $('#chkReservarProducto').is(':checked');
    oCampanaConfiguracion.ReservarProductoDiasMax = ($("#txtReservarProductoDiasMax").val() == "" ? "0" : $("#txtReservarProductoDiasMax").val());
    oCampanaConfiguracion.ReservarProductoDiasMaxFin = ($("#txtReservarProductoDiasMaxFin").val() == "" ? "0" : $("#txtReservarProductoDiasMaxFin").val());
    oCampanaConfiguracion.GenerarCodigo = $('#chkGeneraCodigo').is(':checked');
    oCampanaConfiguracion.FormatoCodigo = $("#txtFormatoCodigo").val();
    oCampanaConfiguracion.MigrarContrato = $('#chkMigrarContrato').is(':checked');
    oCampanaConfiguracion.LugarEntrega = $("input[name='rblstLugarEntrega']:checked").val();
    oCampanaConfiguracion.DiasRecojo = ($("#txtDiasRecojo").val() == "" ? "0" : $("#txtDiasRecojo").val());
    oCampanaConfiguracion.DiasAntiguedad = ($("#txtDiasAntiguedad").val() == "" ? "0" : $("#txtDiasAntiguedad").val());
    oCampanaConfiguracion.CantidadPedidosxDia = ($("#txtCantidadPedidosxDia").val() == "" ? "0" : $("#txtCantidadPedidosxDia").val());
    //JBALMACEDA 20160624
    oCampanaConfiguracion.ElegirLugarEntrega = $('#chkElegirLugarEntrega').is(':checked');
    oCampanaConfiguracion.RenovarPlan = $('#chkRenovarPlan').is(':checked');

    //    JBALMACEDA 20160708 152200
    oCampanaConfiguracion.GastosAdministrativos = $('#chk_gadministrativos').is(':checked');


    var v_MontoGastosAdministrativos = $('#txt_montogadmin').val();
    //oCampanaConfiguracion.MontoGastosAdministrativos = v_MontoGastosAdministrativos;
    oCampanaConfiguracion.MontoGastosAdministrativos = DevuelveNumeroSinFormato(v_MontoGastosAdministrativos, oCulturaUsuario, false);
    oCampanaConfiguracion.UsarPlanesDependientes = $('#chk_usarPlanesPend').is(':checked');

    //actualizar en version 3.1 (9)
    oCampanaConfiguracion.UsarContratoResumen = $('#chkUsarContratoResumen').is(':checked');
    var FecGenerarConRes = Date.parseExact($("#txtFechaGenConRes").val(), oCulturaUsuario.vcFecCor);
    oCampanaConfiguracion.FechaGenerarContratoResumen = Date3Ansi(FecGenerarConRes);
    oCampanaConfiguracion.Portabilidad = $('#chkPortabilidad').is(':checked');
    oCampanaConfiguracion.PortabilidadPlan = $('#chkPortabilidadPlan').is(':checked');
    return oCampanaConfiguracion;
}

$(function () {
    //actualizar en version 3.1 (9)
    oCulturaUsuario = window.parent.oCulturaUsuario;
    //var indiceTab = window.parent.tab.tabs("option", "selected");
    //window.parent.tabschild[window.parent.tabPrincipal.tabs("option", "selected")].id;
    //var indiceTab = window.parent.tabschild[window.parent.tabPrincipal.tabs("option", "selected")];

    oCampanaConfiguracion = new MOV_CAM_CampanaConfiguracion();

    ko.validation.rules.pattern.message = 'Invalid.';
    ko.validation.configure({
        registerExtenders: true,
        messagesOnModified: true,
        insertMessages: true,
        parseInputAttributes: true,
        messageTemplate: null
    });
    ko.applyBindings(oCampanaConfiguracion);

    oCampanaConfiguracion.errors = ko.validation.group(oCampanaConfiguracion);

    //actualizar en version 3.1 (9)
    $("#txtFechaGenConRes").datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: 'dd/mm/yy' // See format options on parseDate
    });
    if ($("#chkUsarContratoResumen").is(':checked')) {
        $("#trFechaGenConRes").show();
    } else {
        $("#trFechaGenConRes").hide();
    }
    $('#chkUsarContratoResumen').change(function () {
        if ($(this).is(':checked')) {
            $("#trFechaGenConRes").show();
        }
        else {
            $("#trFechaGenConRes").hide();
            $("#txtFechaGenConRes").val('');
        }
    });

    $("#FormatoCodigo").keypress(ValidarCadena);

    $("#txtCantidadPedidosxDia").keypress(ValidarEnteroPositivo);
    $("#txt_montogadmin").focusout(function () {
        $("#txt_montogadmin").val(FormatoNumero($("#txt_montogadmin").val(), oCulturaUsuario));
    });
    $("#txt_montogadmin").val(FormatoNumero($("#txt_montogadmin").val(), oCulturaUsuario));
    $("#txtDiasRecojo").keypress(ValidarEnteroPositivo);
    $("#txtDiasAntiguedad").keypress(ValidarEnteroPositivo);

    $("#txtCancelarPedidoDiasMax,#txtCancelarPedidoDiasMaxFin,#txtReservarProductoDiasMax,#txtReservarProductoDiasMaxFin,#txtCancelarPedidoDiasMax,#txtCancelarPedidoDiasMaxFin").keypress(ValidarEntero);

    //$("input:checkbox,input:radio,input:file").uniform();
    $(".tdEtiqueta").css("width", "200px");

    var tabContenido = $("#tabContenido").tabs({});
    $("#tabContenido").css({ "height": "150px" });

    //--------------Inicializa los datos en controles (nuevo o actualizacion)---------------
    oCampanaConfiguracion.Inicio($("#hdfIdCampanaConfiguracion").val());
    //--------------------------------------------------------------------------------------

    //-------------------------------Eventos de Controles-----------------------------------
    //            $('#chkCancelarPedido').change(function () {
    //                if ($(this).is(":checked")) {
    //                    document.getElementById('trCancelarPedidoDiasMax').style.display = '';
    //                    document.getElementById('trCancelarPedidoDiasMaxFin').style.display = '';
    //                } else {
    //                    document.getElementById('trCancelarPedidoDiasMax').style.display = 'none';
    //                    document.getElementById('trCancelarPedidoDiasMaxFin').style.display = 'none';
    //                    $("#txtCancelarPedidoDiasMax").val("");
    //                    $("#txtCancelarPedidoDiasMaxFin").val("");
    //                    $("#txtCancelarPedidoDiasMax").focus();
    //                }

    //            });
    //            $('#chkReservarProducto').change(function () {
    //                if ($(this).is(":checked")) {
    //                    document.getElementById('trReservarProductoDiasMax').style.display = '';
    //                    document.getElementById('trReservarProductoDiasMaxFin').style.display = '';
    //                } else {
    //                    document.getElementById('trReservarProductoDiasMax').style.display = 'none';
    //                    document.getElementById('trReservarProductoDiasMaxFin').style.display = 'none';
    //                    $("#txtReservarProductoDiasMax").val("");
    //                    $("#txtReservarProductoDiasMaxFin").val("");
    //                    $("#txtReservarProductoDiasMax").focus();
    //                }

    //            });
    //            $('#chkGenerarCodigo').change(function () {
    //                if ($(this).is(":checked")) {
    //                    document.getElementById('trFormatoCodigo').style.display = '';
    //                } else {
    //                    document.getElementById('trFormatoCodigo').style.display = 'none';
    //                    $("#txtFormatoCodigo").val("");
    //                    $("#txtFormatoCodigo").focus();
    //                }
    //            });
    //--------------------------------------------------------------------------------------

    //----------------------------------Guardar Entidad-------------------------------------
    $("#btnGuardar").click(function () {
        var vcErrores = "0";

        if (oCampanaConfiguracion.CancelarPedido() == true && (oCampanaConfiguracion.CancelarPedidoDiasMax() == "" || oCampanaConfiguracion.CancelarPedidoDiasMaxFin() == "")) {
            vcErrores = "1";
        } else if (oCampanaConfiguracion.CancelarPedido() == false) {
            oCampanaConfiguracion.CancelarPedidoDiasMax(0);
            oCampanaConfiguracion.CancelarPedidoDiasMaxFin(0);
        }

        if (oCampanaConfiguracion.ReservarProducto() == true && (oCampanaConfiguracion.ReservarProductoDiasMax() == "" || oCampanaConfiguracion.ReservarProductoDiasMaxFin() == "")) {
            vcErrores = "1";
        } else if (oCampanaConfiguracion.ReservarProducto() == false) {
            oCampanaConfiguracion.ReservarProductoDiasMax(0);
            oCampanaConfiguracion.ReservarProductoDiasMaxFin(0);
        }

        if (oCampanaConfiguracion.GenerarCodigo() == true && oCampanaConfiguracion.FormatoCodigo == "") {
            vcErrores = "1";
        }

        if (oCampanaConfiguracion.errors().length == 0 && vcErrores == "0") {
            BloquearPagina(true);
            oCampanaConfiguracion.Guardar(SatisfactoriaGuardar, ErrorGuardar);
        } else {
            alerta('Por favor verifique los datos ingresados');
            oCampanaConfiguracion.errors.showAllMessages();
            return false;
        }
    });





    function SatisfactoriaGuardar(Resultado) {
        Mensaje("<br/><h1>Configuración guardada</h1><br/>", document, CerroMensaje);
    }
    function ErrorGuardar(xhr, err, thrErr) {
        BloquearPagina(false);
    }
    function CerroMensaje() {
        BloquearPagina(false);
        if (oCampanaConfiguracion.IdCampanaConfiguracion() == null) {//Nuevo
            oCampanaConfiguracion.Limpiar();
        }
        else {//Edicion
            var tab1 = window.parent.tabschild[window.parent.tabPrincipal.tabs("option", "selected")].id;
            var Accord = window.parent.$("#" + tab1);
            Accord.tabs("remove", Accord.tabs("option", "selected"));
        }
    }
    //--------------------------------------------------------------------------------------
    $("#btnCerrar").click(function () {
        var tab1 = window.parent.tabschild[window.parent.tabPrincipal.tabs("option", "selected")].id;
        var Accord = window.parent.$("#" + tab1);
        Accord.tabs("remove", Accord.tabs("option", "selected"));
    });

    $('#chkCancelarPedido').change(function () {
        if ($(this).is(':checked')) {
            $(".trCancelarPedidoDias").show();
            //            jbalmaceda
            //            $("#txtCancelarPedidoDiasMax").val("");
            //            $("#txtCancelarPedidoDiasMaxFin").val("");
        }
        else {
            $(".trCancelarPedidoDias").hide();
            //            $("#txtCancelarPedidoDiasMax").val("");
            //            $("#txtCancelarPedidoDiasMaxFin").val("");
        }
    });
    $('.tdEntrada').css({ "text-align": "center" });


    //jbalmaceda 
    if ($("#chkCancelarPedido").is(':checked')) {
        $(".trCancelarPedidoDias").show();
    }

    //jbalmaceda 20160708 174500
    $('#chk_gadministrativos').change(function () {
        if ($(this).is(':checked')) {
            $(".trMontoGastosAdmin").show();
        }
        else {
            $(".trMontoGastosAdmin").hide();
            $("#txt_montogadmin").val();
        }
    });

    if ($("#chk_gadministrativos").is(':checked')) {
        $(".trMontoGastosAdmin").show();
    }


    $("#txt_montogadmin").change(function () {
        if ($(this).val() == "") {
            $(this).val("0");
        }
    });




    //    jbalmaceda 20160718 111900
    //    Botón para abrir popup y hacer el mantenimiento
    //    de la tabla "MOV_CAM_CampanaPlanesDependencia".
    $("#btnCreaDependencias").click(function () {

        $("#dvCrearPlanesDependencia").dialog({
            title: "Planes de Dependencia",
            width: 850,
            //height: 400,
            modal: true,
            resizable: false
        });

    });

    //jbalmaceda 20160720 140600
    $("#btnAgregarAGrilla").on(function () {
        fCargarDatosPlanDependientePorId();
    });

    // jbalmaceda 20160720 161000
    $("#ddlPlanDep").change(function () {
        fCargarDataPorIdPlanDep();
    });

    //fCreaGrillaPlanesDepend();
});

function fCargarDataPorIdPlanDep() {
    var vfilterId = $("#ddlPlanDep").val();
    var vajax = $.ajax({
        //WebMethod "CargarDatosPlanDependientePorId" del CodeBehind "Cam_Conf_PoliticaCampana.aspx".
        url: "Cam_Conf_PoliticaCampana.aspx/CargarDatosPlanDependientePorId",
        data: "{ 'p_Id': '" + vfilterId + "' }",
        dataType: "json",
        type: "post",
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            //Cargo los campos ocultos con el IdCampana e IdPlanDependiente, según el Id del item seleccionado(DropDownList), para poder pasarlos a la grilla y luego poder grabarlos a la bd.
            $("#hfRetrieveIdCampana").val(response.d[0].IdCampana);
            $("#hfRetrieveIdPlanDep").val(response.d[0].IdPlanDependiente);
            //alert($("#hfRetrieveIdCampana").val() + " " + $("#hfRetrieveIdPlanDep").val());
        },
        error: function (ex) {
            //console.log("Error: " + ex);
        }
    });
}

function fCreaGrillaPlanesDepend() {
    $("#tbPlanesDependencia").jqGrid({
        url: '',
        datatype: 'json',
        colNames: ['Plan Base', 'Plan Dependiente', 'Nombre corto'],
        colModel: [
        { name: 'pbase', index: 'pbase', width: 20, stype: 'text' },
        { name: 'pdepend', index: 'pdepend', width: 20, stype: 'text' },
        { name: 'ncorto', index: 'ncorto', width: 20, stype: 'text' }
        ],
        rownum: 10,
        sortname: "id",
        viewrecords: true,
        sortorder: "desc",
        caption: "Planes Agregados"
    });
}
