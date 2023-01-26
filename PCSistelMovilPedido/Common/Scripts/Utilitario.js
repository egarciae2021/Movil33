/// <reference path="jquery-2.0.0-vsdoc.js" />
var oCulturaUsuario = null;
var HabilitadoGrilla = true;

function Left(str, n) {
    if (n <= 0)
        return "";
    else if (n > String(str).length)
        return str;
    else
        return String(str).substring(0, n);
}
function Right(str, n) {
    if (n <= 0)
        return "";
    else if (n > String(str).length)
        return str;
    else {
        var iLen = String(str).length;
        return String(str).substring(iLen, iLen - n);
    }
}

function Mensaje(msg, doc, callback) {
    //debugger;
    if (msg !== "") {
        var nInfo = doc.createElement("div");
        nInfo.className = "msgAlerta";
        nInfo.innerHTML = msg;
        doc.body.appendChild(nInfo);

        setTimeout(function () {
            $(nInfo).fadeOut("slow", function () {
                doc.body.removeChild(nInfo);
                if (callback != null && callback != undefined)
                    callback();
            });
        }, 2000);
    }
};

function validarEmail(valor) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3,4})+$/.test(valor)) {
        return true;
    }
    else {
        return false;
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

//function validarEmail(s) {
//    //var s = theElement.value;
//    var filter = /^[A-Za-z][A-Za-z0-9_]*@[A-Za-z0-9_]+.[A-Za-z0-9_.]+[A-za-z]$/;
//    if (s.length == 0){ return true;}
//    if (filter.test(s)){
//        return true;}
////    else{
////        alert("Entre una direccion de corre valida");}
//    //theElement.focus();
//    return false;
//}

function ValidarDecimalPositivo(event) {
    if (event.keyCode) {//Chrome, IE9, Comandos Firefox 9
        var key = event.keyCode;
        var control = $(event.srcElement);
        //alert("event.keyCode: " + key + "val: " + control.val());

        if ($.browser.mozilla) {
            return true;
        }
        else {
            if (key > 47 && key < 58) {//numeros
                if (control.val() != "0") {
                    return true;
                }
                else {
                    return false;
                }
                return true;
            }
            else if (key == 46) {//punto
                if (control.val() != "-" && control.val() != "." && control.val() != "" && control.val().indexOf('.') == -1) {
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                return false;
            }
        }
    }
    if (event.which) {//Firefox 9
        var key = event.which;
        var control = $(event.currentTarget);
        //alert("event.keyCode: " + key + "val: " + control.val());

        if (key > 47 && key < 58) {//numeros
            if (control.val() != "0") {
                return true;
            }
            else {
                return false;
            }
            return true;
        }
        else if (key == 46) {//punto
            if (control.val() != "-" && control.val() != "." && control.val() != "" && control.val().indexOf('.') == -1) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }

    if (event.charCode) {//Firefox 9
        var key = event.charCode;
        alert("event.charCode: " + key + "val: " + control.val());
    }
};

function ValidarNoEspacio(event) {
    if (event.keyCode) {//Chrome, IE9, Comandos Firefox 9
        var key = event.keyCode;
        var control = $(event.srcElement);

        if ($.browser.mozilla) {
            return true;
        }
        else {
            if ((key > 64 && key < 91) || (key > 96 && key < 123) || (key > 47 && key < 58) || key == 95) {//LETRAS MAYUSCULAS Y MINISCULAS, NUMEROS Y SIMBOLO "_"
                return true;
            }
            else {
                return false;
            }
        }
    }
    if (event.which) {//Firefox 9
        var key = event.which;
        var control = $(event.currentTarget);

        if ((key > 64 && key < 91) || (key > 96 && key < 123) || (key > 47 && key < 58) || key == 95) {//LETRAS MAYUSCULAS Y MINISCULAS, NUMEROS Y SIMBOLO "_"
            return true;
        }
        else {
            return false;
        }
    }
};

function ValidarDecimalComaPositivo(event) {
    if (event.keyCode) {//Chrome, IE9, Comandos Firefox 9
        var key = event.keyCode;
        var control = $(event.srcElement);

        if ($.browser.mozilla) {
            return true;
        }
        else {
            if (key > 47 && key < 58) {//numeros
                if (control.val() != "0") {
                    return true;
                }
                else {
                    return false;
                }
                return true;
            }
            else if (key == 44) {//Coma
                if (control.val() != "-" && control.val() != "," && control.val() != "" && control.val().indexOf(',') == -1) {
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                return false;
            }
        }
    }
    if (event.which) {//Firefox 9
        var key = event.which;
        var control = $(event.currentTarget);

        if (key > 47 && key < 58) {//numeros
            if (control.val() != "0") {
                return true;
            }
            else {
                return false;
            }
            return true;
        }
        else if (key == 44) {//Coma
            if (control.val() != "-" && control.val() != "," && control.val() != "" && control.val().indexOf(',') == -1) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
};

function ValidarDecimalComaPositivo(event, txt) {
    if (event.keyCode) {//Chrome, IE9, Comandos Firefox 9
        var key = event.keyCode;
        var control = $(event.srcElement);

        if ($.browser.mozilla) {
            return true;
        }
        else {
            if (key > 47 && key < 58) {//numeros
                if (control.val() != "0") {
                    return true;
                }
                else {
                    return false;
                }
                return true;
            }
            else if (key == 44) {//Coma
                if (control.val() != "-" && control.val() != "," && control.val() != "" && control.val().indexOf(',') == -1) {
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                return false;
            }
        }
    }
    if (event.which) {//Firefox 9
        var key = event.which;
        var control = $(event.currentTarget);
        if (key > 47 && key < 58) {//numeros
            if (control.val() != "0") {
                return true;
            }
            else {
                return false;
            }
            return true;
        }
        else if (key == 44) {//Coma
            if (control.val() != "-" && control.val() != "," && control.val() != "" && control.val().indexOf(',') == -1) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
};

function ValidarEnteroPositivo(event) {
    if (event.keyCode) {//Chrome, IE9, Comandos Firefox 9
        var key = event.keyCode;
        var control = $(event.srcElement);

        if ($.browser.mozilla) {
            return true;
        }
        else {
            if (key > 47 && key < 58) {//numeros
                if (control.val() == "" && key == 48) {
                    return false;
                }
                else {
                    return true;
                }
            }
            else {
                return false;
            }
        }
    }
    if (event.which) {//Firefox 9
        var key = event.which;
        var control = $(event.currentTarget);

        if (key > 47 && key < 58) {//numeros
            if (control.val() == "" && key == 48) {
                return false;
            }
            else {
                return true;
            }
        }
        else {
            return false;
        }
    }
};

function ValidarSoloNumero(event) {
    if (event.keyCode) {//Chrome, IE9, Comandos Firefox 9
        var key = event.keyCode;
        var control = $(event.srcElement);

        if ($.browser.mozilla) {
            return true;
        }
        else {
            if (key > 47 && key < 58) {//numeros
                return true;
            }
            else {
                return false;
            }
        }
    }
    if (event.which) {//Firefox 9
        var key = event.which;
        var control = $(event.currentTarget);
        if (key > 47 && key < 58) {//numeros
            return true;
        }
        else {
            return false;
        }
    }
};

function ValidarDatosConfRegional(event) {
    if (event.keyCode) {//Chrome, IE9, Comandos Firefox 9
        var key = event.keyCode;
        var control = $(event.srcElement);

        if ($.browser.mozilla) {
            return true;
        }
        else {
            if (key == 44 || key == 46) {//Punto y Coma
                return true;
            }
            else {
                return false;
            }
        }
    }
    if (event.which) {//Firefox 9
        var key = event.which;
        var control = $(event.currentTarget);
        if (key == 44 || key == 46) {//Punto y Coma
            return true;
        }
        else {
            return false;
        }
    }
};

function ValidarAlfaNumerico(event) {
    if (event.keyCode) {//Chrome, IE9, Comandos Firefox 9
        var key = event.keyCode;
        var control = $(event.srcElement);

        if ($.browser.mozilla) {
            return true;
        }
        else {
            if ((key > 47 && key < 58) || (key > 64 && key < 91) || (key > 96 && key < 123) || key == 32) {//numeros y letras
                return true;
            }
            else {
                return false;
            }
        }
    }
    if (event.which) {//Firefox 9
        var key = event.which;
        var control = $(event.currentTarget);
        if ((key > 47 && key < 58) || (key > 64 && key < 91) || (key > 96 && key < 123) || key == 32) {//numeros
            return true;
        }
        else {
            return false;
        }
    }
};

function ValidarAlfaNumericoConEspacios(event) {
    if (event.keyCode) {//Chrome, IE9, Comandos Firefox 9
        var key = event.keyCode;
        var control = $(event.srcElement);

        if ($.browser.mozilla) {
            return true;
        }
        else {
            if ((key > 64 && key < 91) || (key > 96 && key < 123) || (key > 47 && key < 58)) { //LETRAS MAYUSCULAS Y MINISCULAS, NUMEROS Y SIMBOLO "_"
                return true;
            }
            else {
                if (key == 32) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    }
    if (event.which) {//Firefox 9
        var key = event.which;
        var control = $(event.currentTarget);
        if ((key > 64 && key < 91) || (key > 96 && key < 123) || (key > 47 && key < 58) || key == 32) {//LETRAS MAYUSCULAS Y MINISCULAS, NUMEROS Y SIMBOLO "_"
            return true;
        }
        else {
            if (key == 32) {
                return true;
            } else {
                return false;
            }
        }
    }
};

function ValidarAlfaNumericosToAllExplorer(event) {
    var key = window.event ? event.keyCode : event.which;

    for (var i in this.attributes) {
        if (this.attributes[i].name == "maxlength") {
            if (this.value.length < this.attributes[i].value) {
                return true;
            }
            else {
                return false;
            }
        }
    }
    return true;
};

//validar codigos varchar alfanumérico,guion e igual 
function ValidarCodigoVarChar(event) {
    if (event.keyCode) {//Chrome, IE9, Comandos Firefox 9
        var key = event.keyCode;
        var control = $(event.srcElement);

        if ($.browser.mozilla) {
            return true;
        }
        else {
            if ((key > 47 && key < 58) || (key > 64 && key < 91) || (key > 96 && key < 123) || key == 45 || key == 61) {//numeros y letras, guión (-), igual (=)
                return true;
            }
            else {
                return false;
            }
        }
    }
    if (event.keyCode) {//Firefox 9
        var key = event.keyCode;
        var control = $(event.srcElement);
        if (key > 47 && key < 58) {//numeros
            return true;
        }
        else {
            return false;
        }
    }
};

function ValidarEntero(event) {
    if (event.keyCode) {//Chrome, IE9, Comandos Firefox 9
        var key = event.keyCode;
        var control = $(event.srcElement);

        if ($.browser.mozilla) {
            return true;
        }
        else {
            if (key > 47 && key < 58) {//numeros
                return true;
            }
            else if (key == 45) {//negativo
                if (control.val() == "") {
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                return false;
            }
        }
    }
    if (event.which) {//Firefox 9
        var key = event.which;
        var control = $(event.currentTarget);

        if (key > 47 && key < 58) {//numeros
            return true;
        }
        else if (key == 45) {//negativo
            if (control.val() == "") {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
};

function ValidarDecimal(event) {
    if (event.keyCode) {//Chrome, IE9, Comandos Firefox 9
        var key = event.keyCode;
        var control = $(event.srcElement);

        if ($.browser.mozilla) {
            return true;
        }
        else {
            if (key > 47 && key < 58) {//numeros
                if (control.val() != "0") {
                    return true;
                }
                else {
                    return false;
                }
            }
            else if (key == 45) {//negativo
                if (control.val() == "") {
                    return true;
                }
                else {
                    return false;
                }
            }
            else if (key == 46) {//punto
                if (control.val() != "-" && control.val() != "." && control.val() != "" && control.val().indexOf('.') == -1) {
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                return false;
            }
        }
    }
    if (event.which) {//Firefox 9
        var key = event.which;
        var control = $(event.currentTarget);

        if (key > 47 && key < 58) {//numeros
            if (control.val() != "0") {
                return true;
            }
            else {
                return false;
            }
        }
        else if (key == 45) {//negativo
            if (control.val() == "") {
                return true;
            }
            else {
                return false;
            }
        }
        else if (key == 46) {//punto
            if (control.val() != "-" && control.val() != "." && control.val() != "" && control.val().indexOf('.') == -1) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
};

function ValidarFecha(event) {
    var key = window.event ? event.keyCode : event.which;
    return false;
};

function ValidarFechaHora(event) {
    var key = window.event ? event.keyCode : event.which;
    return false;
};

function ValidarCadena(event) {
    var key = window.event ? event.keyCode : event.which;
    for (var i in this.attributes) {
        if (this.attributes[i].name == "maxlength") {
            if (this.value.length < this.attributes[i].value) {
                return true;
            }
            else {
                return false;
            }
        }
    }
    return true;
};

function diaFinMes(mes, anno) {
    mes = parseInt(mes, 10);
    anno = parseInt(anno, 10);
    switch (mes) {
        case 1: case 3: case 5: case 7: case 8: case 10: case 12: return 31;
        case 2: return (anno % 4 == 0) ? 29 : 28;
    }
    return 30;
}

function PeriodoFacturacionFin(fecha_i) {
    var fecha = fecha_i.split("/");
    var fecha_ingreso = new Date(fecha[2], fecha[1] - 1, fecha[0]);
    var DiaFinalMes = diaFinMes(fecha[1], fecha[2]);
    var i = 1;

    while (i < DiaFinalMes) {
        fecha_ingreso.setTime(fecha_ingreso.getTime() + 24 * 60 * 60 * 1000);
        i = i + 1;
    }
    var mes = fecha_ingreso.getMonth() + 1;
    var dia = fecha_ingreso.getDate();

    //Si el mes es menor a 10 pues lo concatenamos con un cero por delante
    if (mes < 10) { mes = '0' + mes };
    if (dia < 10) { dia = '0' + dia };
    var fecha = dia + '/' + mes + '/' + fecha_ingreso.getFullYear();

    return fecha;
}

//--------------------------------------------------------Grilla-------------------------------------------------------------------
/* Get the rows which are currently selected */
function fnGetSelected(oTableLocal) {
    var aReturn = new Array();
    var aTrs = oTableLocal.fnGetNodes();
    for (var i = 0; i < aTrs.length; i++) {
        if ($(aTrs[i]).hasClass('Grilla-SelectedRowStyle')) {
            aReturn.push(aTrs[i]);
        }
    }
    return aReturn;
};

function ConfigurarGrilla(idTable, msgVacio, autowidth, yscroll, columns) {
    if (yscroll == "0") {
        return $(idTable).dataTable({
            "bJQueryUI": true,
            "oLanguage": {
                "sProcessing": "Procesando...",
                "sLengthMenu": "Mostrar _MENU_ registros",
                "sZeroRecords": msgVacio,
                "sEmptyTable": msgVacio,
                "sLoadingRecords": "Cargando...",
                "sInfo": "Mostranto _START_ de _END_ de un total de _TOTAL_ registros",
                "sInfoEmpty": "Mostrando 0 de 0 de 0 registros",
                "sInfoFiltered": "(Filtrado de un total de _MAX_ registros)",
                "sInfoPostFix": "",
                "sInfoThousands": ",",
                "sSearch": "Buscar:",
                "sUrl": "",
                "oPaginate": { "sFirst": "Primero", "sPrevious": "Anterior", "sNext": "Siguiente", "sLast": "Último" }
            },
            "aoColumnDefs": columns,
            "bPaginate": false,
            "bFilter": false,
            "bInfo": false,
            "bAutoWidth": autowidth
        });
    }
    else {
        return $(idTable).dataTable({
            "bJQueryUI": true,
            "oLanguage": {
                "sProcessing": "Procesando...",
                "sLengthMenu": "Mostrar _MENU_ registros",
                "sZeroRecords": msgVacio,
                "sEmptyTable": msgVacio,
                "sLoadingRecords": "Cargando...",
                "sInfo": "Mostranto _START_ de _END_ de un total de _TOTAL_ registros",
                "sInfoEmpty": "Mostrando 0 de 0 de 0 registros",
                "sInfoFiltered": "(Filtrado de un total de _MAX_ registros)",
                "sInfoPostFix": "",
                "sInfoThousands": ",",
                "sSearch": "Buscar:",
                "sUrl": "",
                "oPaginate": { "sFirst": "Primero", "sPrevious": "Anterior", "sNext": "Siguiente", "sLast": "Último" }
            },
            "aoColumnDefs": columns,
            "bPaginate": false,
            "bFilter": false,
            "bInfo": false,
            "sScrollY": yscroll
        });
    }
}

function LimpiarGrilla(grilla) {
    $(grilla.fnSettings().aoData).each(function () {
        grilla.fnDeleteRow($(this.nTr)[0]);
    });
}

function SeleccionarFilaGrilla(grilla, event) {
    $(grilla.fnSettings().aoData).each(function () {
        $(this.nTr).removeClass('Grilla-SelectedRowStyle');
    });
    if (HabilitadoGrilla) {
        $(event.target.parentNode).addClass('Grilla-SelectedRowStyle');
    }
}
//---------------------------------------------------------------------------------------------------------------------------------------

//-----------------------------------------------------Barra de navegación---------------------------------------------------------------
$(".PanelBarraNavegacion").live("mousemove", function () {
    $(this).addClass('ui-state-highlight quitarBorde');
});
$(".PanelBarraNavegacion").live("mouseout", function () {
    $(this).removeClass('ui-state-highlight quitarBorde');
});

function AbrirOpcion(tab, Id, Titulo, h, w) {
    var $panel = tab.find(Id);
    if (!$panel.length) {//En el caso que no exista el tab, lo crea
        tab.tabs("add", Id, Titulo);
        $(Id).css("width", w);
        $(Id).css("height", h);
        $(Id).css("margin-top", "0px");
        $(Id).css("margin-left", "0px");
        $(Id).css("margin-bottom", "0px");
        $(Id).css("margin-right", "0px");
        $(Id).css("padding-top", "0px");
        $(Id).css("padding-left", "0px");
        $(Id).css("padding-bottom", "0px");
        $(Id).css("padding-right", "0px");
    }
    else {//En el caso que exista lo muestra
        tab.tabs('select', Id);
    }
};
$(document).ajaxStart(function () {
//    $("#Capa").show();
    //    $("#dvCargando").show();
    
    $(window.parent.$("form")[0]).append('<div id="divWait" style="width:100%;height:100%;position:absolute;left:0px;top:0px;background: rgb(240,240,240);background: rgba(0,0,0,.3);z-index:999999;"><div style=" position:relative;top:50%; left:45%; width:225px; height:50px;padding-bottom:8px;background-image: url(\'../Common/Images/progressbar_load.gif\');background-repeat:no-repeat;background-position: center;font-weight:bolder;color: darkblue;background-color:rgba(200,200,200,.8);border-radius: 10px;padding-left:5px;">Espere por favor...</div></div>')
});
$(document).ajaxStop(function () {
    //    $("#Capa").hide();
    //    $("#dvCargando").hide();
    if (window.parent.$("#divWait").length > 0) {
        window.parent.$("#divWait").remove();
    }
});

$(document).ajaxError(function () {
    if (window.parent.$("#divWait").length > 0) {
        window.parent.$("#divWait").remove();
    }
});
//---------------------------------------------------------------------------------------------------------------------------------------



//-----------------------------------------------------------Deshabilitar teclas---------------------------------------------------------
//begin desabilitar teclas 
//document.onkeydown = function () {
//    //116->f5 
//    //122->f11 
//    if (window.event && (window.event.keyCode == 122 || window.event.keyCode == 116)) {
//        window.event.keyCode = 505;
//    }

//    if (window.event.keyCode == 505) {
//        return false;
//    }

//    if (window.event && (window.event.keyCode == 8)) {
//        valor = document.activeElement.value;
//        if (valor == undefined) { return false; } //Evita Back en página. 
//        else {
//            if (document.activeElement.getAttribute('type') == 'select-one')
//            { return false; } //Evita Back en select. 
//            if (document.activeElement.getAttribute('type') == 'button')
//            { return false; } //Evita Back en button. 
//            if (document.activeElement.getAttribute('type') == 'radio')
//            { return false; } //Evita Back en radio. 
//            if (document.activeElement.getAttribute('type') == 'checkbox')
//            { return false; } //Evita Back en checkbox. 
//            if (document.activeElement.getAttribute('type') == 'file')
//            { return false; } //Evita Back en file. 
//            if (document.activeElement.getAttribute('type') == 'reset')
//            { return false; } //Evita Back en reset. 
//            if (document.activeElement.getAttribute('type') == 'submit')
//            { return false; } //Evita Back en submit. 
//            else //Text, textarea o password 
//            {
//                if (document.activeElement.value.length == 0)
//                { return false; } //No realiza el backspace(largo igual a 0). 
//                else
//                { document.activeElement.value.keyCode = 8; } //Realiza el backspace. 
//            }
//        }
//    }
//}
//end desabilitar teclas

//Estilo de algunos controles heredados de themeroller
$(function () {
    //CargarIdioma();
    $("select").addClass("ui-widget-content ui-corner-all");
    $("select").css("padding", "4px");

    $("input:text").addClass("ui-widget-content ui-corner-all");
    $("input:text").css("padding", "4px");

    $("input:password").addClass("ui-widget-content ui-corner-all");
    $("input:password").css("padding", "4px");

    $("textarea").addClass("ui-widget-content ui-corner-all");
    $("textarea").css("padding", "4px");

    $("input:checkbox").addClass("ui-widget-content ui-corner-all");
    $("input:checkbox").css("padding", "4px");

    $(".lblNormal").addClass("ui-widget-content ui-corner-all");
    $(".lblNormal").css("padding", "4px");
    //$(".lblNormal").css("margin-top", "10px");

    $("input:file").addClass(" ui-input ui-widget-content ui-corner-all");
    $("input:file").css("padding", "4px");

    $(".dvPanel").addClass("ui-widget-content ui-corner-all");
    $(".dvPanel").css("padding", "10px");
    $(".dvPanel").css("background-image", "none");

    $("#form1").append($("<div></div>").attr("id", "dvMsgAlerta").css({ "display": "none" }));
    //$("#dvMsgAlerta").append($("<span></span>").addClass("ui-icon ui-icon-alert").css({ "float": "left" }));
    $("#dvMsgAlerta").append($("<div style='margin:10px;'></div>").attr("id", "dvContenidoAlerta"));

    if ($(".dvCargando").length == 0)
        $("#form1").append($("<div></div>").attr("id", "dvCargando").addClass("dvCargando"));
    //    <div id="divMsgInformativo" style="display:none;">
    //        <span class="ui-icon ui-icon-alert" style="float:left;"></span>
    //        <div id="dvContenidoInformativo"></div>
    //    </div>

    if ($(".btnNormal").length > 0) {
        $(".btnNormal").button({});
    }
});

function MostrarErrorAjax(xhr, err, thrErr) {
    if (xhr != null && xhr.status == 401) {
        var FinDo = false;
        var Ventana = window;
        do {
            Ventana = Ventana.parent;
            if (Ventana != null && Ventana.location.href.toLowerCase().indexOf('login.aspx') == -1) {
                if (Ventana.PaginaPadre != undefined) {
                    Ventana.location.href = raiz('Login.aspx');
                    FinDo = true;
                    return;
                }
                else {
                    if (Ventana.location.href.toLowerCase().indexOf('.aspx') == -1) {
                        FinDo = true;
                        return;
                    }
                }
            }
            else {
                FinDo = true;
            }
        }
        while (FinDo == false)
        return;
    }

    var r = $.parseJSON(xhr.responseText);
    if (r == null) {
        return;
    }
    else {
        alerta("Message: " + r.Message);
    }
    //    alert("StackTrace: " + r.StackTrace);
    //    alert("ExceptionType: " + r.ExceptionType);
    //    alert("ERROR" + xhr.d);
}

//function CambiarDuracionStr(inDur) {
//    return inDur.toString();
//}

function CambiarDuracionStr(inDur) {
    segundos = inDur * 1000;
    //var hours = Math.floor(segundos / 3600);
    var hours = Math.floor(segundos / 3600000);
    //var minutes = Math.floor((segundos - (hours * 3600)) / 60);
    var minutes = Math.floor((segundos - (hours * 3600000)) / 60000);
    //var segundos = segundos - (hours * 3600) - (minutes * 60);
    var segundos = segundos - (hours * 3600000) - (minutes * 60000);
    segundos = segundos / 1000;

    var time = "";

    if (hours != 0 && hours < 10) {
        time = "0" + hours + ":";
    }

    if (hours != 0 && hours > 9) {
        time = hours + ":";
    }

    if (minutes != 0 || time !== "") {
        minutes = (minutes < 10 && time !== "") ? "0" + minutes : String(minutes);
        time += minutes + ":";
    }

    if (time === "") {
        time = segundos;
    }
    else {
        time += (segundos < 10) ? "0" + segundos : String(segundos);
    }
    return time;
}

function ValidarFechaFormato(FechaInicial, FechaFinal, Formato) {
    var vcPorDiaIni = FechaInicial.substring(Formato.indexOf("yy"), Formato.indexOf("yy") + 4) + FechaInicial.substring(Formato.indexOf("mm"), Formato.indexOf("mm") + 2) + FechaInicial.substring(Formato.indexOf("dd"), Formato.indexOf("dd") + 2);
    var vcPorDiaFin = FechaFinal.substring(Formato.indexOf("yy"), Formato.indexOf("yy") + 4) + FechaFinal.substring(Formato.indexOf("mm"), Formato.indexOf("mm") + 2) + FechaFinal.substring(Formato.indexOf("dd"), Formato.indexOf("dd") + 2);

    if (parseInt(vcPorDiaFin, 10) > parseInt(vcPorDiaIni, 10)) {
        return true;
    }
    else {
        return false;
    }
}

function ValidarFechaFormatoIguales(FechaInicial, FechaFinal, Formato) {
    var vcPorDiaIni = FechaInicial.substring(Formato.indexOf("yy"), Formato.indexOf("yy") + 4) + FechaInicial.substring(Formato.indexOf("mm"), Formato.indexOf("mm") + 2) + FechaInicial.substring(Formato.indexOf("dd"), Formato.indexOf("dd") + 2);
    var vcPorDiaFin = FechaFinal.substring(Formato.indexOf("yy"), Formato.indexOf("yy") + 4) + FechaFinal.substring(Formato.indexOf("mm"), Formato.indexOf("mm") + 2) + FechaFinal.substring(Formato.indexOf("dd"), Formato.indexOf("dd") + 2);

    if (parseInt(vcPorDiaFin, 10) >= parseInt(vcPorDiaIni, 10)) {
        return true;
    }
    else {
        return false;
    }
}

var JSON = JSON || {}; // si el objeto JSON no está definido, creo un objeto.
// implemento stringify para navegadores viejos.
// Si es un navegador nuevo, se usa el stringify nativo
JSON.stringify = JSON.stringify || function (obj) {
    var t = typeof (obj);
    if (t != "object" || obj === null) {
        // simple data type
        if (t == "string") { obj = '"' + obj + '"' };
        return String(obj);
    }
    else {
        // recurse array or object
        var n, v, json = [], arr = (obj && obj.constructor == Array);
        for (n in obj) {
            v = obj[n]; t = typeof (v);
            if (t == "string") { v = '"' + v + '"'; }
            else if (t == "object" && v !== null) { v = JSON.stringify(v) };
            json.push((arr ? "" : '"' + n + '":') + String(v));
        }
        return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
    }
};

// implemento JSON.parse para navegadores viejos.
// Si es un navegador nuevo, se usa el parse nativo
JSON.parse = JSON.parse || function (str) {
    if (str === "") { str = '""' };
    eval("var p=" + str + ";");
    return p;
};

function CargarIdioma() {
    var texto = $.cookie(window.location.pathname);
    oPagina = JSON.parse(texto);

    for (var i in oPagina.Controles) {
        $("#" + oPagina.Controles[i].vcConId).val(oPagina.Controles[i].vcVal).html(oPagina.Controles[i].vcCap).attr("title", oPagina.Controles[i].vcTooTip);
    }
}

function ActivarCombokendo(Control, Altura) {
    $(Control).removeClass("ui-widget-content ui-corner-all");
    $(Control).css("padding", "0px");
    $(Control).css("margin", "0px");
    $(Control).kendoComboBox({ filter: "contains", suggest: true, height: Altura });
}

function ActivarDatePickerPeriodoKendo(Control, Altura, onChange) {
    $(Control).removeClass("ui-widget-content ui-corner-all");
    $(Control).css("padding", "0px");
    $(Control).css("margin", "0px");

    $(Control).kendoDatePicker({
        // defines the start view
        start: "year",
        // defines when the calendar should return date
        depth: "year",
        // display month and year in the input
        format: "MM/yyyy",
        change: onChange
    });
    //    //$(Control).kendoComboBox({ filter: "contains", suggest: true, height: Altura });
}

String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second parm
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours < 10) { hours = "0" + hours; }
    if (minutes < 10) { minutes = "0" + minutes; }
    if (seconds < 10) { seconds = "0" + seconds; }
    var time = hours + ':' + minutes + ':' + seconds;
    return time;
}

function MetodoWeb(Metodo, Data, fncSatisfactoria, fncError) {
    $.ajax({
        type: "POST",
        url: Metodo,
        data: Data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (fncSatisfactoria != null && fncSatisfactoria != undefined)
                fncSatisfactoria(result.d);
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
            if (fncError != null && fncError != undefined)
                fncError(xhr, err, thrErr);
        }
    });
}

function BloquearPagina(bloqueado) {
    if ($(".btnNormal").length > 0)
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

function alerta(contenido, Titulo, fnResult) {
    if ($.browser.msie && $.browser.version == "6.0")
        alert(contenido, Titulo);
    else
        czDLG(Titulo, contenido, "czInformation", [], fnResult);
}

function confirma(contenido, Titulo, fnResult) {
    czDLG(Titulo, contenido, "czConfirm", ["Aceptar", "Cancelar"], fnResult);
}





var czDLGResult = "Cancel";
var czDLGWindow;
var czDLGCallBack;

function czDLGClose(BtnResult) {
    czDLGResult = BtnResult;
    czDLGWindow.close();
};

function czDLGCloseCallBack(e) {
    czDLGWindow.unbind("close", czDLGCloseCallBack);
    if (czDLGCallBack !== null) {
        czDLGCallBack(czDLGResult);
    }
}

function czDLG(Title, Message, Type, Buttons, theFunction) {


    czDLGWindow = $("#dvMsgAlerta").kendoWindow({
        actions: ["Close"],
        draggable: true,
        modal: true,
        resizable: true,
        visible: false
    }).data("kendoWindow");

    var DLGData = '<table width="100%" cellpadding="0" align="center" border="0" cellspacing="0"><tr><td><div class="czDLGIcon ' + Type + '"></div></td>' +
        '<td><div class="czDLGText">' + Message + '</div></td></tr></table><div>';
    for (var i in Buttons) {
        var s = Buttons[i];
        DLGData += '<input class="czDLGBtn" type="button" onclick="czDLGClose(\'' + s + '\')" value="' + s + '">';
    }
    DLGData += '</div>';
    czDLGResult = "Cancel";
    if (theFunction !== undefined) {
        czDLGCallBack = theFunction;
    } else {
        czDLGCallBack = null;
    }
    czDLGWindow.bind("close", czDLGCloseCallBack);

    if (Title == null) {
        Title = "Mensaje";
    }
    czDLGWindow.title(Title);
    czDLGWindow.center();
    czDLGWindow.content(DLGData);
    czDLGWindow.open();

    $(".k-window").css({ "-webkit-transform": "" });

}

























function FechaJSON(fecha) {
    if (fecha.substring(0, 6) == "/Date(") {
        var dt = new Date(parseInt(fecha.substring(6, fecha.length - 2), 10));
        var dtString = ('0' + dt.getDate()).slice(-2).toString() + "/" + ('0' + (dt.getMonth() + 1)).slice(-2).toString() + "/" + dt.getFullYear();
        return dtString;
    }
    else
        return fecha;
}

function FechaDiferenciaDDMMYYYY(fecha1, fecha2) {
    if (fecha1 == "" || fecha2 == "")
        return null;
    var miFecha1 = new Date(fecha1.split("/")[2], fecha1.split("/")[1], fecha1.split("/")[0])
    var miFecha2 = new Date(fecha2.split("/")[2], fecha2.split("/")[1], fecha2.split("/")[0])
    var diferencia = miFecha2.getTime() - miFecha1.getTime();
    var dias = Math.floor(diferencia / (3600000 * 24));
    var segundos = Math.floor(diferencia / 1000);
    var meses = Math.floor(diferencia / (3600000 * 24 * 30));
    return meses;
}


var formatNumber = {
    separador: window.parent.oCulturaUsuario.vcSimSepMil, // separador para los miles
    sepDecimal: window.parent.oCulturaUsuario.vcSimDec, // separador para los decimales
    numDecimal: window.parent.oCulturaUsuario.dcNumDec, // numero de decimales
    formatear: function (num) {
        num += '';
        var splitStr = num.split('.');
        var splitLeft = splitStr[0];
        var splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : '';
        var regx = /(\d+)(\d{3})/;
        while (regx.test(splitLeft)) {
            splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
        }
        //return this.simbol + splitLeft;
        return this.simbol + splitLeft + splitRight;
    },
    newo: function (num, simbol, numdec) {
        this.simbol = simbol || '';
        if (numdec != '' && numdec != undefined && numdec != null) {
            this.numDecimal = numdec;
        }
        num = parseFloat(num).toFixed(this.numDecimal);
        return this.formatear(num);
    }
};
var formatNumberDecimal = {
    separador: window.parent.oCulturaUsuario.vcSimSepMil, // separador para los miles
    sepDecimal: window.parent.oCulturaUsuario.vcSimDec, // separador para los decimales
    formatear: function (num) {
        num += '';
        var splitStr = num.split('.');
        var splitLeft = splitStr[0];
        var splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : '';
        var regx = /(\d+)(\d{3})/;
        while (regx.test(splitLeft)) {
            splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
        }
        return this.simbol + splitLeft + splitRight;
    },
    newo: function (num, simbol) {
        this.simbol = simbol || '';
        return this.formatear(num);
    }
};

function ObtieneFechaActual() {
    var ahora = new Date();
    dias = new Array("Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado");
    meses = new Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre");

    var retorno = '';
    retorno = dias[ahora.getDay()] + ', ' + ahora.getDate() + ' de ' + meses[ahora.getMonth()] + ' del ' + ahora.getFullYear();

    return retorno;
}


function ObtieneFechaGeneral() {
    var ahora = new Date()
    var retorno = '';
    retorno = Right('0' + ahora.getDate(), 2) + '/' + Right('0' + (ahora.getMonth() + 1), 2) + '/' + ahora.getFullYear();
    return retorno;
}
function ObtieneHoraGeneral() {
    var fecha = new Date()
    var hora = fecha.getHours()
    var minuto = fecha.getMinutes()
    var segundo = fecha.getSeconds()

    if (hora < 10) { hora = "0" + hora }
    if (minuto < 10) { minuto = "0" + minuto }
    if (segundo < 10) { segundo = "0" + segundo }
    retorno = hora + ":" + minuto + ":" + segundo

    return retorno;
}

function ObtieneNumeroAleatorio() {
    //Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;
    var aleatorio = Math.floor(Math.random() * (1000000 - 1 + 1)) + 1;
    return aleatorio;
}


var rutaEmoticon = "../Common/Images/Chat/emoticones/";
var mapChat = {
    ':putnam:': '<img src="' + rutaEmoticon + 'putnam.gif"/>',
    ':poop:': '<img src="' + rutaEmoticon + 'trucolog-poo.png"/>',
    '3:)': '<img src="' + rutaEmoticon + 'diablo.gif"/>',
    'O:)': '<img src="' + rutaEmoticon + 'angel.gif"/>',
    ':)': '<img src="' + rutaEmoticon + 'feliz.gif"/>',
    ':-)': '<img src="' + rutaEmoticon + 'feliz.gif"/>',
    ':D': '<img src="' + rutaEmoticon + 'muy-feliz.gif"/>',
    ':d': '<img src="' + rutaEmoticon + 'muy-feliz.gif"/>',
    ':-D': '<img src="' + rutaEmoticon + 'muy-feliz.gif"/>',
    ':-d': '<img src="' + rutaEmoticon + 'muy-feliz.gif"/>',
    ';)': '<img src="' + rutaEmoticon + 'guino.gif"/>',
    ';-)': '<img src="' + rutaEmoticon + 'guino.gif"/>',
    '^_^': '<img src="' + rutaEmoticon + 'happy.gif"/>',
    '>:o': '<img src="' + rutaEmoticon + 'risa.gif"/>',
    '>:O': '<img src="' + rutaEmoticon + 'risa.gif"/>',
    ':3': '<img src="' + rutaEmoticon + 'gato.gif"/>',
    '>:-(': '<img src="' + rutaEmoticon + 'enojado.gif"/>',
    ':(': '<img src="' + rutaEmoticon + 'triste.gif"/>',
    ':-(': '<img src="' + rutaEmoticon + 'triste.gif"/>',
    ":'(": '<img src="' + rutaEmoticon + 'llora.gif"/>',
    ':o': '<img src="' + rutaEmoticon + 'o.gif"/>',
    ':O': '<img src="' + rutaEmoticon + 'o.gif"/>',
    ':-o': '<img src="' + rutaEmoticon + 'o.gif"/>',
    ':-O': '<img src="' + rutaEmoticon + 'o.gif"/>',
    '8)': '<img src="' + rutaEmoticon + 'gafas.gif"/>',
    '8-)': '<img src="' + rutaEmoticon + 'gafas.gif"/>',
    '8-|': '<img src="' + rutaEmoticon + 'lentes.gif"/>',
    ':p': '<img src="' + rutaEmoticon + 'lengua.gif"/>',
    ':P': '<img src="' + rutaEmoticon + 'lengua.gif"/>',
    ':-p': '<img src="' + rutaEmoticon + 'lengua.gif"/>',
    ':-P': '<img src="' + rutaEmoticon + 'lengua.gif"/>',
    'O.o': '<img src="' + rutaEmoticon + 'woot.gif"/>',
    '-_-': '<img src="' + rutaEmoticon + 'dork.gif"/>',
    ':/': '<img src="' + rutaEmoticon + 'duh.gif"/>',
    ':-*': '<img src="' + rutaEmoticon + 'beso.gif"/>',
    ':*': '<img src="' + rutaEmoticon + 'beso.gif"/>',
    '<3': '<img src="' + rutaEmoticon + 'corazon.gif"/>',
    ':v': '<img src="' + rutaEmoticon + 'pacman.gif"/>',
    ':V': '<img src="' + rutaEmoticon + 'pacman.gif"/>',
    '(^^^)': '<img src="' + rutaEmoticon + 'tiburon.gif"/>',
    ':|]': '<img src="' + rutaEmoticon + 'robot.gif"/>',
    '<(")': '<img src="' + rutaEmoticon + 'pinguino.png"/>',
    ':42:': '<img src="' + rutaEmoticon + '42.gif"/>',
    '(y)': '<img src="' + rutaEmoticon + 'megusta-icon.png"/>',
    '(Y)': '<img src="' + rutaEmoticon + 'megusta-icon.png"/>',
    ':caramario:': '<img src="' + rutaEmoticon + 'caramario.jpg"/>',
    '¬¬': '<img src="' + rutaEmoticon + 'botado.png"/>',
    ':s': '<img src="' + rutaEmoticon + 'preocupado.png"/>',
    ':S': '<img src="' + rutaEmoticon + 'preocupado.png"/>',
    ':caramarco:': '<img src="' + rutaEmoticon + 'caramarco.jpg"/>'
};


Object.keys = Object.keys || function (o) {
    var result = [];
    for (var name in o) {
        if (o.hasOwnProperty(name))
            result.push(name);
    }
    return result;
};

function fnVerificarEmoticones(Dato) {
    if (Dato.length < 10) {
        Dato += "&nbsp;";
    }

    $.each(mapChat, function (clave, imagen) {
        //alert( clave + ": " + imagen );
        var icoE = clave.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
        Dato = Dato.replace(new RegExp(icoE, 'g'), imagen);

    });
    // Object.keys(mapChat).forEach(function (ico) {
    // // escape special characters for regex
    // var icoE = ico.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");

    // // now replace actual symbols
    // Dato = Dato.replace(new RegExp(icoE, 'g'), mapChat[ico]);
    // });   
    return Dato;
}

function parseDouble(value) {
    if (typeof value == "string") {
        value = value.match(/^-?\d*/)[0];
    }

    return !isNaN(parseInt(value)) ? value * 1 : NaN;
}


function raiz(ruta) {
    var publicacion = "/";
    var FinDo = false;
    var Ventana = window;
    var contador = 0;

    do {
        contador++;
        Ventana = Ventana.parent;
        if (Ventana != null && Ventana.location.href.toLowerCase().indexOf('login.aspx') == -1) {
            if (Ventana.RaizSistema != undefined) {
                publicacion = Ventana.RaizSistema;
                FinDo = true;
                break;
            }
            else {
                if (Ventana.location.href.toLowerCase().indexOf('.aspx') == -1 || Ventana.location.href.toLowerCase().indexOf('index.aspx') > -1) {
                    FinDo = true;
                    break;
                }
            }
        }
        else {
            FinDo = true;
        }

        if (contador > 50) {
            FinDo = true;
            publicacion = "/";
        }
    }
    while (FinDo == false)

    return publicacion + ruta;
}

function raiz_1(ruta) {
    var rutaFinal = "";
    var n = window.location.pathname.split("/");

    for (var i = 0; i < n.length - 3; i++) {
        rutaFinal += "../";
    }
    rutaFinal += ruta;
    return rutaFinal;
}

//function raiz(ruta) {
//    var rutaFinal = "";
//    var n = window.location.pathname.split("/");

////    for (var i = 0; i < n.length - 3; i++) {
////        rutaFinal += "../";
////    }

//    for (var i = 0; i < n.length - 2; i++) {
//        rutaFinal += "../";
//    }

//    rutaFinal += ruta;

//    return rutaFinal;
//}


function fnEsCampanaActivaGlobal() {
    window.parent.$("#dvNuevoPedido").show();
    window.parent.esCampanaActiva = true;
}

function fnEsCampanaPorActivarGlobal() {
    window.parent.$("#dvNuevoPedido").hide();
    window.parent.esCampanaActiva = false;
}

function fnEsCampanaDesactivaGlobal() {
    window.parent.$("#dvNuevoPedido").hide();
    window.parent.$("#btnChat").hide();
    window.parent.$("#lblChat").hide();
    window.parent.esCampanaActiva = false;
}

function fnEsCampanaPreventaGlobal() {
    window.parent.$("#dvNuevoPedido").show();
    window.parent.esCampanaActiva = false;
    window.parent.esPreVentaActiva = true;
}

function fnEsCampanaPorActivarReservaGlobal() {
    window.parent.$("#dvNuevoPedido").hide();
    window.parent.esCampanaActiva = false;
}


function FormatoNumero(numero, oCultura, esEntero) {
    var vcSepMil = '';
    //if (oCultura.vcCodCul.toString().toLowerCase() == 'es-co' || oCultura.vcCodCul.toString().toLowerCase() == 'es-bo'){
    if (oCultura.vcCodCul.toString().toLowerCase() != 'es-pe') {
        if (numero != undefined && numero != "") {
            if (esEntero != null && esEntero == true && numero.length > 1) {
                numero = numero.toString().replace(/^0+/, '');
            }
            vcSepMil = oCultura.vcSimSepMil;
            if (vcSepMil.toString() == '.') {
                numero = numero.toString().replace(/[.*+?^${}()|[\]\\]/g, '');
            }
            //numero = ParseFloatMultiPais_2(numero.toString(), oCultura);
            //numero = numero.toString().replace(oCultura.vcSimSepMil, '');
            //numero = parseFloat(numero).toFixed(oCultura.dcNumDec).replace('.', oCultura.vcSimDec);        
            numero = numero.replace('.', oCultura.vcSimDec);
            var n = numero.toString().split(oCultura.vcSimDec);
            var enteros = n[0].replace(/\B(?=(\d{3})+(?!\d))/g, oCultura.vcSimSepMil);
            if (esEntero != null && esEntero == true) {
                //return enteros.replace('.', oCultura.vcSimDec).replace('*', oCultura.vcSimSepMil);
                return enteros;
            } else {
                if (oCultura.dcNumDec == 0) {
                    //return enteros.replace('.', oCultura.vcSimDec).replace('*', oCultura.vcSimSepMil);
                    return enteros;
                } else {
                    return (enteros + oCultura.vcSimDec + ObtenerDecimalesMultiPais((n[1] == undefined ? 0 : n[1].length), oCultura.dcNumDec, parseFloat((n[1] == undefined ? 0 : n[1]))));
                }
            }
        }
        else {
            if (oCultura.dcNumDec > 0) {
                return (0) + oCultura.vcSimDec + ObtenerDecimalesMultiPais(0, oCultura.dcNumDec, parseFloat(0));
            } else {
                return (0);
            }
        }
    } else {
        //numero = DevuelveNumeroSinFormato(numero, oCultura, esEntero);
        if (numero != undefined && numero != "") {
            if (esEntero != null && esEntero == true && numero.length > 1) {
                numero = numero.toString().replace(/^0+/, '');
            }
            if (numero.toString().indexOf(oCultura.vcSimSepMil.toString()) >= 0) {
                numero = parseFloat(ParseFloatMultiPais(numero, oCultura)).toFixed(oCultura.dcNumDec);
            } else {
                numero = parseFloat(numero).toFixed(oCultura.dcNumDec);
            }
            //numero = parseFloat(numero).toFixed(oCultura.dcNumDec);

            var n = numero.toString().split(oCultura.vcSimDec);
            var enteros = n[0].replace(/\B(?=(\d{3})+(?!\d))/g, oCultura.vcSimSepMil);

            if (esEntero != null && esEntero == true) {
                return enteros;
            } else {
                if (oCultura.dcNumDec == 0) {
                    return enteros;
                } else {
                    return (enteros + oCultura.vcSimDec + n[1]);
                    //return (enteros);
                }
            }
        } else {
            if (esEntero != null && esEntero == true) {
                return enteros;
            } else {
                return (0).toFixed(oCultura.dcNumDec);
            }

        }
    }
};

