$(function () {
    $(".txtFecha").datepicker({
        changeMonth: true,
        changeYear: true
    });
    $(".txtFecha").keypress(ValidarFecha);
    $("#ChartType_I").css("padding", "0px");
    //$(".ui-datepicker").css("font-size", "11px");
});

fnAbrirMisReportes = function () {
    var $width = 420;
    var $height = 350;
    var $Pagina = 'Con_MisReportes.aspx?Pivot=Llamadas&Tipo=2&Multiple=1';
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
    window.parent.$("#dvCargando").show();
    window.location.href = 'PivotReporte.aspx';
};

fnCargarGrafico = function () {
    window.parent.$("#dvCargando").show();
    __doPostBack("", "");
};