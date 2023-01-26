$(function () {
    $(".txtFecha").datepicker({
        changeMonth: true,
        changeYear: true
    });
    $(".txtFecha").keypress(ValidarFecha);
    //$(".ui-datepicker").css("font-size", "11px");
    window.parent.$("#dvCargando").hide();
});

fnAbrirMisReportes = function () {
    var $width = 420;
    var $height = 350;
    var $Pagina = 'Con_MisReportes.aspx?Pivot=Organizacion_Plan&Tipo=2&Multiple=1';
    $("#ifArea").attr("src", $Pagina);
    Modal = $('#dvArea').dialog({
        title: "Mis Reportes",
        width: $width,
        height: $height,
        modal: true,
        resizable: false
    });
};

//        $(".btnNormal").button();
//        function BloquearPagina(bloqueado) {
//            $(".btnNormal").button("option", "disabled", bloqueado);
//            if (bloqueado) {
//                $("input").attr("disabled", "disabled");
//                $("select").attr("disabled", "disabled");
//            }
//            else {
//                $("input").removeAttr("disabled");
//                $("select").removeAttr("disabled");
//            }
//        }

function CerroMensaje() { }
fnGrabarReporte = function () {
    if (document.getElementById('hdTipo').value == 'edit') {
        document.getElementById('txtplantilla').value = document.getElementById('lblNombreReporte').innerText.substring(2);
        $("#lblTituloNombreReporte").html("Edite el nombre del Reporte:");
        $('#dvNombreReporte').dialog({
            title: "Editar Reporte",
            width: 400,
            modal: true,
            buttons: {
                "Actualizar": function () {
                    if ($.trim($("#txtplantilla").val()) == "") {
                        alert('Ingrese un nombre');
                        $("#txtplantilla").focus();
                        return;
                    }
                    window.parent.$("#dvCargando").show();
                    __doPostBack("actualizarreporte", $("#txtplantilla").val());
                    $(this).dialog("close");
                },
                "Cancelar": function () {
                    $(this).dialog("close");
                }
            }
        });
    }
    else {
        //$("#txtplantilla").html("");
        document.getElementById('txtplantilla').value = '';
        //
        $("#lblTituloNombreReporte").html("Ingrese el nombre del Reporte:");

        $('#dvNombreReporte').dialog({
            title: "Grabar Nuevo Reporte",
            width: 400,
            modal: true,
            buttons: {
                "Grabar": function () {
                    if ($.trim($("#txtplantilla").val()) == "") {
                        alert('Ingrese un nombre');
                        $("#txtplantilla").focus();
                        return;
                    }
                    window.parent.$("#dvCargando").show();
                    __doPostBack("grabarreporte", $("#txtplantilla").val());
                    $(this).dialog("close");
                },
                "Cancelar": function () {
                    $(this).dialog("close");
                }
            }
        });
    }
};

fnGrabarReporteComo = function () {
    //$("#dvCargando").show();
    document.getElementById('txtplantilla').value = '';
    $("#lblTituloNombreReporte").html("Ingrese el nombre del Reporte:");

    $('#dvNombreReporte').dialog({
        title: "Grabar Nuevo Reporte",
        width: 400,
        modal: true,
        buttons: {
            "Grabar": function () {
                if ($.trim($("#txtplantilla").val()) == "") {
                    alert('Ingrese un nombre');
                    $("#txtplantilla").focus();
                    return;
                }
                window.parent.$("#dvCargando").show();
                __doPostBack("grabarreportecomo", $("#txtplantilla").val());
                $(this).dialog("close");
            },
            "Cancelar": function () {
                $(this).dialog("close");
            }
        }
    });
};


fnNuevaConsulta = function () {
    $("#global").hide(300, function () {
        window.top.MostrarLoading();
        //window.parent.$("#dvCargando").show();
        window.location.href = 'PivotReporteOrganizacional_PorPlan.aspx?reportenuevo=1';
    });
};

fnNuevaConsulta_General = function () {
    $("#global").hide(300, function () {
        window.top.MostrarLoading();
        //window.parent.$("#dvCargando").show();
        window.location.href = 'PivotReporteOrganizacional_General.aspx';
    });
};

fnNuevaConsulta_PorBolsa = function () {
    $("#global").hide(300, function () {
        //window.parent.$("#dvCargando").show();
        window.top.MostrarLoading();
        window.location.href = 'PivotReporteOrganizacional.aspx';
    });
};

fnCargarGrafico = function () {
    //window.parent.$("#dvCargando").show();
    window.top.MostrarLoading();
    __doPostBack("", "");
};