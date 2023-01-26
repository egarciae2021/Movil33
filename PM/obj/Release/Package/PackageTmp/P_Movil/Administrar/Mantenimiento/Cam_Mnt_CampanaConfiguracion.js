function ENT_CFG_ConfiguracionGeneral() {
    this.VerLinkWeb;
    this.TextLinkWeb;
    this.UrlLinkWeb;
    this.VerBtnManual;
    this.TextBtnManual;
    this.UrlBtnManual;
    this.DocBtnManual;
    this.Consideraciones;
    this.DscPreventa;
    this.MsjMantenerPlan;
    this.MsjCambiarPlan;
    this.TituloChat;
    this.SubtituloChat;
    this.LimiteAtencionChat;
    this.SinAdministrador;
    this.SinAdministradorDisponible;
    this.AdministradorSaturado;
    this.IpNode;
    this.PuertoNode;
}

$(function () {
    //var Nametab = window.parent.tabschild[window.parent.tabPrincipal.tabs("option", "selected")].id;
    //var Accord = window.parent.$("#" + Nametab);

    $(".accordion").accordion({
        collapsible: true,
        autoHeight: false
    });

    var accordion = $("#AccordionJQ1").data("accordion");
    //    var tabOpciones = $("#tabPedidos").tabs({});

    $('#txtTextLinkWeb,#txtUrlLinkWeb,#txtTextBtnManual,#txtUrlBtnManual,#txtDocBtnManual,#txtConsideraciones,#txtDscPreventa,#txtMsjMantenerPlan,#txtMsjCambiarPlan,#txtTituloChat,#txtSubtituloChat,#txtLimiteAtencionChat,#txtSinAdministrador,#txtSinAdministradorDisponible,#txtAdministradorSaturado,#txtIpNode,#txtPuertoNode').keypress(function (event) {
        if (event.which == 39 || event.which == 34) {
            event.preventDefault(); //stop character from entering input
        }
    });

    $('#txtTextLinkWeb,#txtUrlLinkWeb,#txtTextBtnManual,#txtUrlBtnManual,#txtDocBtnManual,#txtConsideraciones,#txtDscPreventa,#txtMsjMantenerPlan,#txtMsjCambiarPlan,#txtTituloChat,#txtSubtituloChat,#txtLimiteAtencionChat,#txtSinAdministrador,#txtSinAdministradorDisponible,#txtAdministradorSaturado,#txtIpNode,#txtPuertoNode').keyup(function (event) {
        var vcCadena = $(this).val().replace(/'/g, '').replace(/"/g, '');
        $(this).val(vcCadena);
    });


    $("#txtLimiteAtencionChat").keypress(ValidarEntero);
    $("#txtPuertoNode").keypress(ValidarEntero);

    $("#chkVerLinkWeb").change(function () {
        if ($("#chkVerLinkWeb").is(":checked")) {
            $("#trTextLinkWeb").show();
            $("#trUrlLinkWeb").show();
        } else {
            $("#trTextLinkWeb").hide();
            $("#trUrlLinkWeb").hide();
        }
    });

    $("#chkVerBtnManual").change(function () {
        if ($("#chkVerBtnManual").is(":checked")) {
            $("#trTextBtnManual").show();
            //$("#trUrlBtnManual").show();
            $("#trDocBtnManual").show();
        } else {
            $("#trTextBtnManual").hide();
            //$("#trUrlBtnManual").hide();
            $("#trDocBtnManual").hide();
        }
    });

    $("#btnGuardar").click(function () {

        var oConfiguracion = new ENT_CFG_ConfiguracionGeneral();
        //PÁGINA INICIAL
        oConfiguracion.VerLinkWeb = "0";
        oConfiguracion.TextLinkWeb = $.trim($("#txtTextLinkWeb").val().replace(/'/g, '').replace(/"/g, ''));
        oConfiguracion.UrlLinkWeb = $.trim($("#txtUrlLinkWeb").val().replace(/'/g, '').replace(/"/g, ''));
        oConfiguracion.VerBtnManual = "0";
        oConfiguracion.TextBtnManual = $.trim($("#txtTextBtnManual").val().replace(/'/g, '').replace(/"/g, ''));
        oConfiguracion.UrlBtnManual = $.trim($("#txtUrlBtnManual").val().replace(/'/g, '').replace(/"/g, ''));
        oConfiguracion.DocBtnManual = $.trim($("#txtDocBtnManual").val().replace(/'/g, '').replace(/"/g, ''));

        //GENERAL
        oConfiguracion.Consideraciones = $.trim($("#txtConsideraciones").val().replace(/'/g, '').replace(/"/g, ''));
        oConfiguracion.DscPreventa = $.trim($("#txtDscPreventa").val().replace(/'/g, '').replace(/"/g, ''));
        oConfiguracion.MsjMantenerPlan = $.trim($("#txtMsjMantenerPlan").val().replace(/'/g, '').replace(/"/g, ''));
        oConfiguracion.MsjCambiarPlan = $.trim($("#txtMsjCambiarPlan").val().replace(/'/g, '').replace(/"/g, ''));

        //CHAT
        oConfiguracion.TituloChat = $.trim($("#txtTituloChat").val().replace(/'/g, '').replace(/"/g, ''));
        oConfiguracion.SubtituloChat = $.trim($("#txtSubtituloChat").val().replace(/'/g, '').replace(/"/g, ''));
        oConfiguracion.LimiteAtencionChat = $.trim($("#txtLimiteAtencionChat").val());
        oConfiguracion.SinAdministrador = $.trim($("#txtSinAdministrador").val().replace(/'/g, '').replace(/"/g, ''));
        oConfiguracion.SinAdministradorDisponible = $.trim($("#txtSinAdministradorDisponible").val().replace(/'/g, '').replace(/"/g, ''));
        oConfiguracion.AdministradorSaturado = $.trim($("#txtAdministradorSaturado").val().replace(/'/g, '').replace(/"/g, ''));

        //NODE
        oConfiguracion.IpNode = $.trim($("#txtIpNode").val().replace(/'/g, '').replace(/"/g, ''));
        oConfiguracion.PuertoNode = $.trim($("#txtPuertoNode").val().replace(/'/g, '').replace(/"/g, ''));

        if ($("#chkVerLinkWeb").is(":checked")) {
            if (oConfiguracion.TextLinkWeb == "") {
                alerta("'Texto de link web' es requerido.");
                FocusAlert(0, "#txtTextLinkWeb");
                return;
            }
            if (oConfiguracion.UrlLinkWeb == "") {
                alerta("'URL de link web' es requerida.");
                FocusAlert(0, "#txtUrlLinkWeb");
                return;
            }
            oConfiguracion.VerLinkWeb = "1";
        } else {
            oConfiguracion.TextLinkWeb = "";
            oConfiguracion.UrlLinkWeb = "";
        }

        if ($("#chkVerBtnManual").is(":checked")) {
            if (oConfiguracion.TextBtnManual == "") {
                alerta("'Texto de link del manual' es requerido.");
                FocusAlert(0, "#txtTextBtnManual");
                return;
            }
            if (oConfiguracion.UrlBtnManual == "") {
                alerta("'URL del link del manual' es requerida.");
                FocusAlert(0, "#txtUrlBtnManual");
                return;
            }
            if (oConfiguracion.DocBtnManual == "") {
                alerta("'Nombre del archivo' es requerido.");
                FocusAlert(0, "#txtDocBtnManual");
                return;
            }
            oConfiguracion.VerBtnManual = "1";
        } else {
            oConfiguracion.TextBtnManual = "";
            oConfiguracion.UrlBtnManual = "";
            oConfiguracion.DocBtnManual = "";
        }

        if (oConfiguracion.TituloChat == "") {
            alerta("'Título' es requerido.");
            FocusAlert(2, "#txtTituloChat");
            return;
        }
        if (oConfiguracion.SubtituloChat == "") {
            alerta("'Subtítulo' es requerido.");
            FocusAlert(2, "#txtSubtituloChat");
            return;
        }
        if (oConfiguracion.LimiteAtencionChat == "") {
            alerta("'Límite de atenciones' es requerido.");
            FocusAlert(2, "#txtLimiteAtencionChat");
            return;
        }
        if (oConfiguracion.IpNode == "") {
            alerta("'Ip' es requerida.");
            FocusAlert(3, "#txtIpNode");
            return;
        }
        if (oConfiguracion.PuertoNode == "") {
            alerta("'Puerto' es requerido.");
            FocusAlert(3, "#txtPuertoNode");
            return;
        }

        $.ajax({
            type: "POST",
            url: "Cam_Mnt_CampanaConfiguracion.aspx/Guardar",
            data: "{'oConfiguracion': '" + JSON.stringify(oConfiguracion) + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                if (msg.d == "1") {

                    Mensaje("<br/><h1>Configuración guardada correctamente</h1><br/>", document, CerroMensaje);
                }
                else {
                    alerta(msg.d);
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });

    });

    $("#btnCerrar").click(function () {
        //Accord.tabs("remove", Accord.tabs("option", "selected"));
    });

    function CerroMensaje() {
        btnCerrar.click();
    }

    $(window).resize(function () {
        DimPosElementos();
    });

    inicioPagina();
});

function DimPosElementos() {
    var Ancho = $(window).width();
    var Alto = $(window).height();
    var AnchoLateral = $(".LateralSplitter");

    //GENERAL
    $("#txtConsideraciones").css("width", Ancho - 240);
    $("#txtConsideraciones").css("height", 40);
    $("#txtDscPreventa").css("width", Ancho - 240);
    $("#txtMsjMantenerPlan").css("width", Ancho - 240);
    $("#txtMsjCambiarPlan").css("width", Ancho - 240);

    //CHAT
    $("#txtSinAdministrador").css("width", Ancho - 340);
    $("#txtSinAdministradorDisponible").css("width", Ancho - 340);
    $("#txtAdministradorSaturado").css("width", Ancho - 340);
}

function inicioPagina() {
    DimPosElementos();
}

function FocusAlert(IndexAccordion, Control) {
    if ($("#AccordionJQ1").accordion("option", "active").toString() == "false") {
        $("#AccordionJQ1").accordion("option", "active", IndexAccordion);
    } else {
        if ($("#AccordionJQ1").accordion("option", "active") != IndexAccordion) {
            $("#AccordionJQ1").accordion("option", "active", IndexAccordion);
        }
        if (Control != "") {
            $(Control).focus();
        }
    } 
}