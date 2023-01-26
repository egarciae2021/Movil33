var ListaResponsablesAreas = [];
var ListaResponsables = [];
var ListaResponsables_Filtro = [];
var DatosEmpleados = [];
var Procesando = false;

$(function () {
    $('#txtBuscar').keypress(function (event) {
        if (event.which == '13') {
            fnCargarResponsables_Filtro();
            return false;
        }
    });
    setTimeout(function () {
        $('#txtBuscar').focus();
    }, 500);

    $(window).resize(function (a, c) {
        DimPosElementos();
    });

    fnCargarResponsables(true);

    $("#btnAgregarEmpleado").live("click", function () {
        $("#bpEmpleado_btnBuscar").click();
    });

    $("#btnExportarResponsables").live("click", function () {
        ExportarExcelResponsables("ResponsablesAprobación");
    });

    $("#btnAgregarOrganizacion").live("click", function () {

        var $width = 750;
        var $height = 525;
        var $Pagina = '../../../P_Movil/Consultar/Con_SeleccionArea.aspx?Tipo=1&Multiple=1&UnPanel=1';
        $("#ifArea2").attr("src", $Pagina);
        Modal = $('#dvArea2').dialog({
            title: "Seleccionar Área",
            width: $width,
            height: $height,
            modal: true,
            resizable: false
        });

    });


    $("#cboTipoResponsable").live("change", function () {
        ActualizarTipoResponsable();
    });

    DimPosElementos();

});


function DimPosElementos() {
    var Ancho = $(window).width();
    var Alto = $(window).height();
    var AltoCampos = $("#tdDatosEmpleado").height();
    $("#dvResponsables").height(Alto - 90);
    $("#dvOrganizacion").height(Alto - AltoCampos - 170);
    $("#dvOrganizacion").width(Ancho - 422);

    $("#lblTituloEmpleado").width(Ancho - 420);
}

function fnMostrarDetalleEmpleado(CodEmpleado, oEmpleadoSeleccionado) {
    $("#tbDetalleEmpleado").hide();
    $.ajax({
        url: "Mnt_Responsables.aspx/Listar_ConsolidadoEmpleado",
        data: "{'CodEmpleado':'" + CodEmpleado + "'}",
        dataType: "json",
        type: "post",
        contentType: "application/json; charset=utf-8",
        success: function (result) {

            DatosEmpleados = result.d[0];
            $("#tdDatosEmpleado").html("");
            if (DatosEmpleados.length == 0) {
                return;
            }
            var Campos = Object.keys(DatosEmpleados[0]);
            var vcHTML = '';

            $("#cboTipoResponsable").val(DatosEmpleados[0]["TipoResponsable"]);


            vcHTML = '<div class="ElementoDatoEmpleado"><div class="clsElementoDatoEmpleado_Campo">Código</div>' +
                        '<div class="clsElementoDatoEmpleado_Valor">' + CodEmpleado + '</div></p>' +
                     '</div>';
            $("#tdDatosEmpleado").append(vcHTML);

            for (var i = 0; i < Campos.length; i++) {
                if (Campos[i] == "Empleado") {
                    $("#lblTituloEmpleado").html("RESPONSABLE: " + DatosEmpleados[0][Campos[i]].toUpperCase());
                    continue;
                }
                if (Campos[i] == "TipoResponsable") {
                    continue;
                }


                if (DatosEmpleados[0][Campos[i]] == "")
                    DatosEmpleados[0][Campos[i]] = "---";

                if (Campos[i] == "Cargo") {
                    var Cargo = $(oEmpleadoSeleccionado).find(".clsItem_CargoEmpleado").html();
                    if (Cargo == "Cargo: ") {
                        $(oEmpleadoSeleccionado).find(".clsItem_CargoEmpleado").html("Cargo: " + DatosEmpleados[0][Campos[i]]);
                    }
                }
                vcHTML = '<div class="ElementoDatoEmpleado"><div class="clsElementoDatoEmpleado_Campo">' + Campos[i] + '</div>' +
                            '<div class="clsElementoDatoEmpleado_Valor">' + DatosEmpleados[0][Campos[i]] + '</div></p>' +
                          '</div>';
                $("#tdDatosEmpleado").append(vcHTML);
            }


            //Mostrar Areas..
            vcHTML = '';
            $("#dvOrganizacion").html("");
            //debugger;
            fnCargarResponsables(false, function () {
                for (var i = 0; i < ListaResponsablesAreas.length; i++) {
                    if (ListaResponsablesAreas[i].CodEmpleado == CodEmpleado) {
                        vcHTML = "<div class='itemOrganizacion' CodEmpleado= '" + CodEmpleado + "' CodInt='" + ListaResponsablesAreas[i].CodInt + "' >";
                        vcHTML += "<table width='100%' border='0' cellpadding='2'><tr><td style='width:40px;' valign='top'>" +
                               "<img class='' src='../../../Common/Images/Usuario/if_vector_65_09_473792.png' /></td>" +
                               "<td><div class='clsItem_NombreEmpleado'>" + ListaResponsablesAreas[i].Area + "</div>" +
                            "<div class='clsItem_CargoEmpleado'>(" + ListaResponsablesAreas[i].NivelArea + ")</div>" +
                            ((ListaResponsablesAreas[i].EsAutorizador == "1") ? "<div class='clsItem_EsAutorizador'>Puede Autorizar: SI</div>" :  "") + "</td>" +
                               "<td align='right' style='width:35px'><div class='clsItem_Detalle' CodInt='" + ListaResponsablesAreas[i].CodInt + "' align='right'><img class='' src='../../../Common/Images/Mantenimiento/VerDetalle.png' /></div></td>" +
                               "<td align='right' style='width:35px'><div class='clsItem_Eliminar' CodInt='" + ListaResponsablesAreas[i].CodInt + "' align='right'><img class='' src='../../../Common/Images/Mantenimiento/remove.png' /></div></td></tr></table></div>";
                        $("#dvOrganizacion").append(vcHTML);
                    }
                }
                AsignarEventoClickItems_Organizacion();
                $("#tbDetalleEmpleado").show();
                DimPosElementos();
                Procesando = false;
            });
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function fnCargarResponsables(ActualizarFiltro, fnResult) {
    $.ajax({
        url: "Mnt_Responsables.aspx/Listar_Responsables",
        data: "{}",
        dataType: "json",
        type: "post",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            ListaResponsablesAreas = result.d[0];
            ListaResponsables = [];
            var Responsable = '';
            for (var i = 0; i < ListaResponsablesAreas.length; i++) {
                if (Responsable != ListaResponsablesAreas[i].Empleado) {
                    ListaResponsables.push({
                        "CodEmpleado": ListaResponsablesAreas[i].CodEmpleado,
                        "Empleado": ListaResponsablesAreas[i].Empleado,
                        "Cargo": ListaResponsablesAreas[i].Cargo,
                        "EsAutorizador": ListaResponsablesAreas[i].EsAutorizador
                    });
                    Responsable = ListaResponsablesAreas[i].Empleado;
                }
            }

            if (ActualizarFiltro == true) {
                fnCargarResponsables_Filtro();
            }
            else {
                fnResult();
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function fnCargarResponsables_Filtro() {
    ListaResponsables_Filtro = [];
    var Filtro = $.trim($("#txtBuscar").val()).toUpperCase();
    for (var i = 0; i < ListaResponsables.length; i++) {
        if (Filtro != "") {
            if (ListaResponsables[i].Empleado.toUpperCase().indexOf(Filtro) >= 0) {
                ListaResponsables_Filtro.push({
                    "CodEmpleado": ListaResponsables[i].CodEmpleado,
                    "Empleado": ListaResponsables[i].Empleado,
                    "Cargo": ListaResponsables[i].Cargo,
                    "EsAutorizador": ListaResponsablesAreas[i].EsAutorizador
                });
            }
        }
        else {
            ListaResponsables_Filtro.push({
                "CodEmpleado": ListaResponsables[i].CodEmpleado,
                "Empleado": ListaResponsables[i].Empleado,
                "Cargo": ListaResponsables[i].Cargo,
                "EsAutorizador": ListaResponsablesAreas[i].EsAutorizador
            });
        }
    }

    var vcHTML = '';
    $("#dvResponsables").html("");
    var Cargo = "";
    for (var i = 0; i < ListaResponsables_Filtro.length; i++) {
        if (ListaResponsables_Filtro[i].Cargo == "") {
            Cargo = "---";
        }
        else {
            Cargo = ListaResponsables_Filtro[i].Cargo;
        }
        vcHTML = "<div class='itemChat' CodEmpleado='" + ListaResponsables_Filtro[i].CodEmpleado + "' >";
        vcHTML += "<table width='100%' border='0' cellpadding='2'><tr><td style='width:55px;' valign='top'>" +
                   "<img class='clsItem_Imagen' src='../../../Common/Images/Usuario/if_user_1902268.png' /></td>" +
                   "<td><div class='clsItem_NombreEmpleado'>" + ListaResponsables_Filtro[i].Empleado + "</div><BR>" +
                   "<div class='clsItem_CargoEmpleado'>Cargo: " + Cargo + "</div></td>" +
                   "<td align='right'><div class='clsItem_Eliminar_Empleado' CodEmpleado='" + ListaResponsablesAreas[i].CodEmpleado + "' align='right'><img class='' src='../../../Common/Images/Mantenimiento/remove.png' /></div></td>" +
                   "</tr></table></div>";
        $("#dvResponsables").append(vcHTML);
    }
    if (ListaResponsables_Filtro.length > 0) {
        AsignarEventoClickItems();
        $(".itemChat")[0].click();
    }
}

var CodEmpleadoSeleccionado = '';
function AsignarEventoClickItems() {
    $(".itemChat").click(function () {
        if (Procesando) {
            return;
        }
        Procesando = true;
        $(".itemChatSeleccionado").removeClass("itemChatSeleccionado").addClass("itemChat");
        $(this).removeClass("itemChat").addClass("itemChatSeleccionado");
        var CodEmpleado = $(this).attr("CodEmpleado");
        CodEmpleadoSeleccionado = CodEmpleado;
        fnMostrarDetalleEmpleado(CodEmpleado, this);
    });

    $(".clsItem_Eliminar_Empleado").click(function () {
        var CodEmpleado = $(this).attr("CodEmpleado");
        btnQuitarEmpleado_click(CodEmpleado);
    });

}

function AsignarEventoClickItems_Organizacion() {
    $(".clsItem_Eliminar").click(function () {
        var CodInt = $(this).attr("CodInt");
        confirmacion("Se quitará la organización asignada al empleado. ¿Desea continuar?", function () {
            EliminarAreaEmpleado_async(CodInt, function () {
                //Remover de la lista...
                for (var i = 0; i < ListaResponsablesAreas.length; i++) {
                    if (ListaResponsablesAreas[i].CodEmpleado == CodEmpleadoSeleccionado) {
                        if (ListaResponsablesAreas[i].CodInt == CodInt) {
                            ListaResponsablesAreas.splice(i, 1);
                        }
                    }
                }
                $(".itemOrganizacion[CodInt='" + CodInt + "']").remove();
                if ($(".itemOrganizacion[CodEmpleado='" + CodEmpleadoSeleccionado + "'").length == 0) {
                    //Quitar empleado...
                    for (var i = 0; i < ListaResponsables.length; i++) {
                        if (ListaResponsables[i].CodEmpleado == CodEmpleadoSeleccionado) {
                            ListaResponsables.splice(i, 1);
                        }
                    }
                }
            });
        }, null, "Confirmación");

    });

    $(".clsItem_Detalle").click(function () {
        var CodInt = $(this).attr("CodInt");

        var $width = 810;
        var $height = 520;
        var $Pagina = 'General/Administrar/Mantenimiento/Mnt_Organizacion.aspx?view=1&Par=ORGA_P_inCODINT&Cod=' + CodInt;
        window.top.fnObtenerWindowPlantillaTab().$('#iframe_modal').width($width - 10);
        window.top.fnObtenerWindowPlantillaTab().$('#iframe_modal').height($height - 30);
        window.top.fnObtenerWindowPlantillaTab().$('#iframe_modal').attr('src', $Pagina);
        var dlgOrganizacion = window.top.fnObtenerWindowPlantillaTab().$('#div_modal').dialog({
            title: 'Organización',
            width: $width,
            height: $height,
            modal: true,
            resizable: false,
            close: function () {
                //Actualizar empleado seleccionado...
                Procesando = true;
                fnMostrarDetalleEmpleado(CodEmpleadoSeleccionado, this);
            }
        });



    });

}

function fnMostrarDatosEmpleado(e) {
    var CodEmpleado = e.EMPL_P_vcCODEMP;
    var NomEmpleado = e.EMPL_vcNOMEMP;

    //
    var ExisteCodEmpleado = ($("#dvResponsables").find("[codempleado='" + CodEmpleado + "']").length);
    if (ExisteCodEmpleado > 0) {
        alerta("El empleado ya existe como responsable", "Mensaje", function () {
            $("#txtBuscar").focus();
        });
        return;
    }

    //Validar si el código seleccionado ya existe..
    //for (var i = 0; i < ListaResponsables.length; i++) {
    //    if (ListaResponsables[i].CodEmpleado == CodEmpleado) {
    //        alerta("El empleado ya existe como responsable", "Mensaje", function () {
    //            $("#txtBuscar").focus();
    //        });
    //        return;
    //    }
    //}

    ListaResponsables.push({
        "CodEmpleado": CodEmpleado,
        "Empleado": NomEmpleado,
        "Cargo": "",
        "EsAutorizador": ""
    });

    vcHTML = "<div class='itemChat' CodEmpleado='" + CodEmpleado + "' >";
    vcHTML += "<table width='100%' border='0' cellpadding='2'><tr><td style='width:55px;' valign='top'>" +
                   "<img class='clsItem_Imagen' src='../../../Common/Images/Usuario/if_user_1902268.png' /></td>" +
                   "<td><div class='clsItem_NombreEmpleado'>" + NomEmpleado + "</div><BR>" +
                   "<div class='clsItem_CargoEmpleado'>Cargo: " + "" + "</div></td>" +
                   "<td align='right'><div class='clsItem_Eliminar_Empleado' CodEmpleado='" + CodEmpleado + "' align='right'><img class='' src='../../../Common/Images/Mantenimiento/remove.png' /></div></td>" +
                   "</tr></table></div>";

    $("#dvResponsables").prepend(vcHTML);
    $("#dvResponsables").scrollTop(0);

    AsignarEventoClickItems();
    if ($(".itemChat").length > 0) {
        $(".itemChat")[0].click();
    }


}

function IngresarAreas(e) {
    if (e.length == 0) {
        return;
    }
    for (var i = 0; i < e.length; i++) {

        var CodInt = e[i].P_inCodOrg;
        var NomArea = e[i].vcNomOrg;
        var NomAreaOnly = "";

        GuardarAreaEmpleado_async(CodInt, NomArea, function (result, _CodInt, _NomArea) {
            if (result.d.length == 0) {
                return;
            }
            var Nivel = result.d[0][0].NIVE_vcNOMNIV;
            //var vcHTML = "<div class='itemOrganizacion' CodEmpleado= '" + CodEmpleadoSeleccionado + "' CodInt='" + _CodInt + "' >";
            //_NomArea.replace("=", " - ")
            NomAreaOnly = _NomArea.substring(_NomArea.indexOf("=") + 1);
            var vcHTML = "<div class='itemOrganizacion' CodEmpleado= '" + CodEmpleadoSeleccionado + "' CodInt='" + _CodInt + "' >";
            vcHTML += "<table width='100%' border='0' cellpadding='2'><tr><td style='width:40px;' valign='top'>" +
                               "<img class='' src='../../../Common/Images/Usuario/if_vector_65_09_473792.png' /></td>" +
                               "<td><div class='clsItem_NombreEmpleado'>" + NomAreaOnly + "</div>" +
                               "<div class='clsItem_CargoEmpleado'>(" + Nivel + ")</div></td>" +
                               "<td align='right' style='width:35px'><div class='clsItem_Detalle' CodInt='" + _CodInt + "' align='right'><img class='' src='../../../Common/Images/Mantenimiento/VerDetalle.png' /></div></td>" +
                               "<td align='right' style='width:35px'><div class='clsItem_Eliminar' CodInt='" + _CodInt + "' align='right'><img class='' src='../../../Common/Images/Mantenimiento/remove.png' /></div></td></tr></table></div>";
            $("#dvOrganizacion").append(vcHTML);

            //Agregarlo a la matriz...
            ListaResponsablesAreas.push({
                "CodEmpleado": CodEmpleadoSeleccionado, "Empleado": "", "Cargo": "",
                "CodArea": _NomArea.split('=')[0], "Area": _NomArea.split('=')[1], "NivelArea": Nivel, "CodInt": _CodInt
            });

            AsignarEventoClickItems_Organizacion();
        });

    }

}

function GuardarAreaEmpleado_async(CodInt, NomArea, fnResultado) {
    $.ajax({
        type: "POST",
        url: "Mnt_Responsables.aspx/GuardarAreaEmpleado",
        data: "{'CodEmpleado': '" + CodEmpleadoSeleccionado + "','CodArea':'" + CodInt + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            fnResultado(result, CodInt, NomArea);
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}
function EliminarAreaEmpleado_async(CodInt, fnResultado) {
    $.ajax({
        type: "POST",
        url: "Mnt_Responsables.aspx/EliminarAreaEmpleado",
        data: "{'CodEmpleado': '" + CodEmpleadoSeleccionado + "','CodArea':'" + CodInt + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            fnResultado(result);
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function EliminarResponsable_async(fnResultado) {
    $.ajax({
        type: "POST",
        url: "Mnt_Responsables.aspx/EliminarResponsable",
        data: "{'CodEmpleado': '" + CodEmpleadoSeleccionado + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            fnResultado(result);
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function btnQuitarEmpleado_click(CodEmpleado) {
    confirmacion("Se quitará al empleado como responsable. ¿Desea continuar?", function () {
        EliminarResponsable_async(function () {
            for (var i = 0; i < ListaResponsables.length; i++) {
                if (ListaResponsables[i].CodEmpleado == CodEmpleado) {
                    ListaResponsables.splice(i, 1);
                }
            }
            for (var i = 0; i < ListaResponsablesAreas.length; i++) {
                if (ListaResponsablesAreas[i].CodEmpleado == CodEmpleado) {
                    ListaResponsablesAreas.splice(i, 1);
                }
            }

            $(".itemChatSeleccionado").remove();
            if ($(".itemChat").length > 0) {
                $(".itemChat")[0].click();
            }
            else {
                $("#tbDetalleEmpleado").hide();
            }
        });
    }, null, "Confirmación");
}

function ActualizarTipoResponsable() {
    var Tipo = $("#cboTipoResponsable").val();
    $.ajax({
        type: "POST",
        url: "Mnt_Responsables.aspx/ActualizarTipoResponsable",
        data: "{'CodEmpleado': '" + CodEmpleadoSeleccionado + "','TipoResponsable':'" + Tipo + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}










function ExportarExcelResponsables(NombreArchivo) {
    //debugger;
    var ExcelXML = '';
    ExcelXML = '<?xml version="1.0"?>' +
	'<?mso-application progid="Excel.Sheet"?> ' +
	'<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" ' +
    'xmlns:o="urn:schemas-microsoft-com:office:office" ' +
    'xmlns:x="urn:schemas-microsoft-com:office:excel" ' +
    'xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet" ' +
    'xmlns:html="http://www.w3.org/TR/REC-html40"> ' +
	'<DocumentProperties xmlns="urn:schemas-microsoft-com:office:office"> ' +
	'<Version>12.00</Version> ' +
	'</DocumentProperties> ' +
	'<ExcelWorkbook xmlns="urn:schemas-microsoft-com:office:excel"> ' +
	'<ProtectStructure>False</ProtectStructure> ' +
	'<ProtectWindows>False</ProtectWindows> ' +
	'</ExcelWorkbook> ' +
	'<Styles>' +
    '   <Style ss:ID="xls-style-0" ss:Name="xls-style-0">' +
	'		<Alignment ss:Vertical="Bottom" ss:Horizontal="Center"/>' +
	'		<Borders>' +
	'			<Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#A4BED4"/>' +
	'			<Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#A4BED4"/>' +
	'			<Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#A4BED4"/>' +
	'			<Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#A4BED4"/>' +
	'		</Borders>' +
	'		<Font ss:Color="#FFFFFF" ss:Bold="1" />' +
	'		<Interior ss:Color="#85B5D9" ss:Pattern="Solid"/>' +
	'	</Style>' +
    '   <Style ss:ID="xls-style-1-L" ss:Name="xls-style-1-L">' +
	'		<Alignment ss:Vertical="Bottom" ss:Horizontal="Left"/>' +
	'		<Borders>' +
	'			<Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#A4BED4"/>' +
	'			<Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#A4BED4"/>' +
	'			<Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#A4BED4"/>' +
	'			<Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#A4BED4"/>' +
	'		</Borders>' +
	'		<Font ss:Color="#000000" />' +
	'		<Interior ss:Color="#E0E9F5" ss:Pattern="Solid"/>' +
	'	</Style>' +
    '   <Style ss:ID="xls-style-1-R" ss:Name="xls-style-1-R">' +
	'		<Alignment ss:Vertical="Bottom" ss:Horizontal="Right"/>' +
	'		<Borders>' +
	'			<Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#A4BED4"/>' +
	'			<Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#A4BED4"/>' +
	'			<Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#A4BED4"/>' +
	'			<Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#A4BED4"/>' +
	'		</Borders>' +
	'		<Font ss:Color="#000000" />' +
	'		<Interior ss:Color="#E0E9F5" ss:Pattern="Solid"/>' +
	'	</Style>' +
    '   <Style ss:ID="xls-style-1-C" ss:Name="xls-style-1-C">' +
	'		<Alignment ss:Vertical="Bottom" ss:Horizontal="Center"/>' +
	'		<Borders>' +
	'			<Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#A4BED4"/>' +
	'			<Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#A4BED4"/>' +
	'			<Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#A4BED4"/>' +
	'			<Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#A4BED4"/>' +
	'		</Borders>' +
	'		<Font ss:Color="#000000" />' +
	'		<Interior ss:Color="#E0E9F5" ss:Pattern="Solid"/>' +
	'	</Style>' +
    '   <Style ss:ID="xls-style-2-L" ss:Name="xls-style-2-L">' +
	'		<Alignment ss:Vertical="Bottom" ss:Horizontal="Left"/>' +
	'		<Borders>' +
	'			<Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#A4BED4"/>' +
	'			<Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#A4BED4"/>' +
	'			<Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#A4BED4"/>' +
	'			<Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#A4BED4"/>' +
	'		</Borders>' +
	'		<Font ss:Color="#000000" />' +
	'		<Interior ss:Color="#FFFFFF" ss:Pattern="Solid"/>' +
	'	</Style>' +
    '   <Style ss:ID="xls-style-2-R" ss:Name="xls-style-2-R">' +
	'		<Alignment ss:Vertical="Bottom" ss:Horizontal="Right"/>' +
	'		<Borders>' +
	'			<Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#A4BED4"/>' +
	'			<Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#A4BED4"/>' +
	'			<Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#A4BED4"/>' +
	'			<Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#A4BED4"/>' +
	'		</Borders>' +
	'		<Font ss:Color="#000000" />' +
	'		<Interior ss:Color="#FFFFFF" ss:Pattern="Solid"/>' +
	'	</Style>' +
    '   <Style ss:ID="xls-style-2-C" ss:Name="xls-style-2-C">' +
	'		<Alignment ss:Vertical="Bottom" ss:Horizontal="Center"/>' +
	'		<Borders>' +
	'			<Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#A4BED4"/>' +
	'			<Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#A4BED4"/>' +
	'			<Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#A4BED4"/>' +
	'			<Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#A4BED4"/>' +
	'		</Borders>' +
	'		<Font ss:Color="#000000" />' +
	'		<Interior ss:Color="#FFFFFF" ss:Pattern="Solid"/>' +
	'	</Style>' +
    '</Styles>' +
    '<Worksheet ss:Name="Detalle">' +
    '<Table>';

    //ListaResponsablesAreas;
    //ListaResponsables;

    var iTotColumnas = 3;

    ExcelXML += '<Column ss:Width="100"/>';
    ExcelXML += '<Column ss:Width="250"/>';
    ExcelXML += '<Column ss:Width="100"/>';
    ExcelXML += '<Column ss:Width="250"/>';
    //ExcelXML += '<Column ss:Width="100"/>';


    ExcelXML += '<Row>';
    ExcelXML += '<Cell ss:StyleID="xls-style-0"><Data ss:Type="String">Cod. Empleado</Data></Cell>';
    ExcelXML += '<Cell ss:StyleID="xls-style-0"><Data ss:Type="String">Responsable</Data></Cell>';
    ExcelXML += '<Cell ss:StyleID="xls-style-0"><Data ss:Type="String">Cod. Área</Data></Cell>';
    ExcelXML += '<Cell ss:StyleID="xls-style-0"><Data ss:Type="String">Área</Data></Cell>';
    //ExcelXML += '<Cell ss:StyleID="xls-style-0"><Data ss:Type="String">Tipo Responsable</Data></Cell>';
    ExcelXML += '</Row>';

    var Estilo = "xls-style-1";
    var Alineacion = "-L";
    for (var i = 0; i < ListaResponsablesAreas.length; i++) {
        if (Estilo == "xls-style-1")
            Estilo = "xls-style-2";
        else
            Estilo = "xls-style-1";
        ExcelXML += '<Row>';
        ExcelXML += '<Cell ss:StyleID="' + Estilo + Alineacion + '"><Data ss:Type="String">' + ListaResponsablesAreas[i].CodEmpleado + '</Data></Cell>';
        ExcelXML += '<Cell ss:StyleID="' + Estilo + Alineacion + '"><Data ss:Type="String">' + ListaResponsablesAreas[i].Empleado + '</Data></Cell>';
        ExcelXML += '<Cell ss:StyleID="' + Estilo + Alineacion + '"><Data ss:Type="String">' + ListaResponsablesAreas[i].CodArea + '</Data></Cell>';
        ExcelXML += '<Cell ss:StyleID="' + Estilo + Alineacion + '"><Data ss:Type="String">' + ListaResponsablesAreas[i].Area + '</Data></Cell>';
        //ExcelXML += '<Cell ss:StyleID="' + Estilo + Alineacion + '"><Data ss:Type="String">' + ListaResponsablesAreas[i].TipoResponsable + '</Data></Cell>';
        ExcelXML += '</Row>';
    }

    ExcelXML += '</Table>';
    ExcelXML += '<AutoFilter x:Range="R1C1:R1C' + iTotColumnas + '" xmlns="urn:schemas-microsoft-com:office:excel"></AutoFilter>';
    ExcelXML += '</Worksheet></Workbook>';

    var blob = new Blob([ExcelXML]);
    if (navigator.appName == "Microsoft Internet Explorer") {
        navigator.msSaveBlob(blob, NombreArchivo + ".xls");
    }
    else {
        var a = window.document.createElement("a");
        a.href = window.URL.createObjectURL(blob, { type: "text/csv" });
        a.download = NombreArchivo + ".xls";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

}

