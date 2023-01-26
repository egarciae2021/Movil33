var HabilitadoGrilla = true;
var MostrarEspera;
var RaizWeb;


function Mensaje(msg, doc, callback) {    

    if (msg !== "") {
        var nInfo = doc.createElement("div");
        nInfo.className = "msgAlerta";
        nInfo.innerHTML = msg;
        doc.body.appendChild(nInfo);

        setTimeout(function () {
            $(nInfo).fadeOut("slow", function () {
                doc.body.removeChild(nInfo);
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
    //var ExpRegular = /(\w+)(\.?)(\w*)(\@{1})(\w+)(\.?)(\w*)(\.{1})(\w{2,3})/;
    var ExpRegular = /(\w+)(\.?)(\w*)(\@{1})(\w+)(\.?)(\-?)(\w*)(\.{1})(\w{2,3})/;

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

function ValidarDecimalComaPositivo(event,txt) {
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

function ValidarAlfaNumerico(event) {
    if (event.keyCode) {//Chrome, IE9, Comandos Firefox 9
        var key = event.keyCode;
        var control = $(event.srcElement);

        if ($.browser.mozilla) {
            return true;
        }
        else {
            if ((key > 47 && key < 58) || (key > 64 && key < 91) || (key > 96 && key < 123)) {//numeros y letras
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

function ValidarAlfaNumericoConEspacios(event) {
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
        if (key > 47 && key < 58 || key == 32) {//numeros
            return true;
        }
        else {
            return false;
        }
    }
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

function PeriodoFacturacionFin(fecha_i) {
    var fecha = fecha_i.split("/");
    var fecha_ingreso = new Date(fecha[2], fecha[1] - 1, fecha[0]);
    var i = 0;
    while (i < 30) {
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
    //$("#Capa").show();   
   // $("#dvCargando").show(); 
});
$(document).ajaxStop(function () {
    $("#Capa").hide();  
    $("#dvCargando").hide();
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


    //Comprobar Session
    //var datos = setInterval(ComprobarSession, 60000);
  
 
    $("select").addClass("ui-widget-content ui-corner-all");
    $("select").css("padding", "4px");
    $("select").css({ "border": "1px solid #DDDDDD" });

    $("input:text").addClass("ui-widget-content ui-corner-all");
    $("input:text").css("padding", "4px");
    $("input:text").css({ "border": "1px solid #DDDDDD" });

    $("input:password").addClass("ui-widget-content ui-corner-all");
    $("input:password").css("padding", "4px");
    $("input:password").css({ "border": "1px solid #DDDDDD" });

    $("textarea").addClass("ui-widget-content ui-corner-all");
    $("textarea").css("padding", "4px");

    $("input:checkbox").addClass("ui-widget-content ui-corner-all");
    $("input:checkbox").css("padding", "4px");

    $(".lblNormal").addClass("ui-widget-content ui-corner-all");
    $(".lblNormal").css("padding", "4px");
    //$(".lblNormal").css("margin-top", "10px");

    $(".dvPanel").addClass("ui-widget-content ui-corner-all");
    //$(".dvPanel").addClass("dvPanel ui-corner-all");

    $(".dvPanel").css("padding", "10px");
    $(".dvPanel").css("background-image", "none");

    //    if ($(".btnNormal").length > 0) {
    //        $(".btnNormal").button({});
    //    }
    try {
        if ($(".btnNormal").length > 0) {
            $(".btnNormal").button({});
        }
    }
    catch (err)
    { }
});

function MostrarErrorAjax(xhr, err, thrErr) {
  var r = jQuery.parseJSON(xhr.responseText);
  if (r == null) {
    r = xhr.statusText;
    if (r == null || r =='') {
      alert("Error Genérico");
  }   
    else {
      alert("Message: " + r + ". Codigo: " + xhr.status);
    }
}
else if (xhr.status == 500) {
   
}
  else {
      alert("Message: " + r.Message);
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

    if (parseInt(vcPorDiaFin) > parseInt(vcPorDiaIni)) {
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
            else if (t == "object" && v !== null){ v = JSON.stringify(v)};
            json.push((arr ? "" : '"' + n + '":') + String(v));
        }
        return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
    }
};

// implemento JSON.parse para navegadores viejos.
// Si es un navegador nuevo, se usa el parse nativo
JSON.parse = JSON.parse || function (str) {
    if (str === "") {str = '""'};
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


$(document).ajaxStart(function (e) {
    if ((e.currentTarget.URL.toLowerCase().indexOf('login.aspx') < 0) &&
        (e.currentTarget.URL.toLowerCase().indexOf('restablecercontrasena.aspx') < 0) &&
        (e.currentTarget.URL.toLowerCase().indexOf('configuracion.aspx') < 0)) {
        ComprobarSession();
        
        if (MostrarEspera != "0") {
            window.top.fnMostrarEspera();
        }
    }
});

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

function ComprobarSession() {

    MostrarEspera = "0";
    //alert(window.location.hostname);

//    var Directorio = window.top.location.href;

//    var director +window.top.location.href.indexOf('MainPrincipal.aspx')


    var directorio = window.location.origin;
    var vcRutaRaiz = localStorage.getItem('Raiz');
    //var Metodo = raiz2("Common/WebService/General.asmx/ComprobarSession");
    if (Right(vcRutaRaiz, 1) != "/") {
        vcRutaRaiz += "/";
    }
    var Metodo = vcRutaRaiz + "Common/WebService/General.asmx/ComprobarSession";

   $.ajax({
       type: "POST",
       url: Metodo,
       data: {},
       contentType: "application/json; charset=utf-8",
       dataType: "json",
       success: function (result) {
           MostrarEspera = "1";
           if (result.d == "0") {
               window.top.location.reload();
           }

       },
       error: function (xhr, err, thrErr) {
           window.top.location.reload();
       }

   });
        MostrarEspera = "1";
};




$(document).ajaxStop(function (e) {
    //    $("#Capa").hide();
    //    $("#dvCargando").hide();
    //    if (window.parent.$("#divWait").length > 0) {
    //        window.parent.$("#divWait").remove();
    //    }
    if ((e.currentTarget.URL.toLowerCase().indexOf('login.aspx') < 0) &&
        (e.currentTarget.URL.toLowerCase().indexOf('restablecercontrasena.aspx') < 0) && 
        (e.currentTarget.URL.toLowerCase().indexOf('configuracion.aspx') < 0)) {
        window.top.fnOcultarEspera();
    }
    //    window.parent.parent.activado = "1";
    //    window.parent.activado = "1";

});


function confirmacion(contenido, fncAccionSi, fncAccionNo, Titulo) {
    $("#dvContenidoAlerta").html("");
    $("#dvContenidoAlerta").html(contenido);

    if (Titulo == null || Titulo == undefined)
        Titulo = "Mensaje del sistema";

    $('#dvMsgAlerta').dialog({
        title: Titulo,
        modal: true,
        buttons: {
            "Si": function () {
                $(this).dialog("close");
                if (fncAccionSi != null && fncAccionSi != undefined)
                    fncAccionSi();
            },
            "No": function () {
                $(this).dialog("close");
                if (fncAccionNo != null && fncAccionNo != undefined)
                    fncAccionNo();
            }
        }
    });
}

function ValidarNumeroEnCajaTexto(_idTextBox, funcionValidacion, oCulturaUsuario, esEntero) {
    //$('#' + _idTextBox).removeAttr("keypress");

    $('#' + _idTextBox).unbind("keypress");
    $('#' + _idTextBox).keypress(funcionValidacion);
    //$('#' + _idTextBox).bind( "keypress", function( event ) {
    //    funcionValidacion();
    //});

    //$("#txtOperador").keypress(ValidarAlfaNumericoConEspacios);

    //$('#' + _idTextBox).bind('paste', function (e) { return false; });


    $("#" + _idTextBox).css({ "text-align": "right" });
    //$(".-ms-clear").hide();


    $("#" + _idTextBox).focusout(function () {
        //$(this).css("background-color", "#FF00FF");
        //Validar si el formato de numero es correcto...
        var dato = $.trim($("#" + _idTextBox).val());
        //debugger;
        if (oCulturaUsuario != null) {
            if (oCulturaUsuario.vcSimSepMil == ",") {
                dato = dato.replace(/,/g, "");
            }
        }

        if (dato != '') {
            if (!$.isNumeric(dato)) {
                alerta("Debe ingresar un valor correcto", "Validación",
               function () { return fnFocusCajaTexto_focusout(_idTextBox); });
            }
            else if (oCulturaUsuario != null) {
                $("#" + _idTextBox).val(FormatoNumero(dato, oCulturaUsuario, esEntero));
            }
        }
    });

}
var idFocus = '';
function alerta(contenido, Titulo, fnCerrar) {
    window.top.$("#dvContenidoAlerta").html("");
    window.top.$("#dvContenidoAlerta").html(contenido);

    if (Titulo == null || Titulo == undefined)
        Titulo = "Mensaje del sistema";

    $("input,select,div,button,textarea").bind("focus", function () {
        idFocus = $(this).attr("id");
        //$(this).unbind("focus");
    });

    window.top.$("#dvContenidoAlerta").css("z-index", "10");
    window.top.$('#dvMsgAlerta').css("z-index", "100000000");
    window.top.$('#dvMsgAlerta').dialog({
        title: Titulo,
        modal: true,
        buttons: {
            "Aceptar": function () {
                window.top.$(this).dialog("close");
                $("#" + idFocus).focus();
                if (fnCerrar != null && fnCerrar != undefined)
                    fnCerrar();
            }
        },
        position: { my: "center", at: "center", of: window },
        open: function (event, ui) {
            $('#dvContenidoAlerta').focus();
        }
    });
    setTimeout(function () { window.top.$('#dvMsgAlerta').focus(); }, 300);
}

function alertasReporte(contenido, Titulo, fnCerrar) {
    $("#dvContenidoAlertas").html("");
    $("#dvContenidoAlertas").html(contenido);

    if (Titulo == null || Titulo == undefined)
        Titulo = "Mensaje del sistema";

    $("input,select,div,button,textarea").bind("focus", function () {
        idFocus = $(this).attr("id");
        //$(this).unbind("focus");
    });

   $("#dvContenidoAlertas").css("z-index", "10");
    $('#dvMsgAlertas').css("z-index", "100000000");
    $('#dvMsgAlertas').dialog({
        title: Titulo,
        modal: true,
        buttons: {
            "Aceptar": function () {
                //window.parent.$(this).dialog("close");
                $(this).dialog("close");
                $("#" + idFocus).focus();
                if (fnCerrar != null && fnCerrar != undefined)
                    fnCerrar();
            }
        },
        position: { my: "center", at: "center", of: window },
        open: function (event, ui) {
            $('#dvContenidoAlerta').focus();
        }
    });
    setTimeout(function () { window.parent.$('#dvMsgAlerta').focus(); }, 300);
}

function ValidarCodigoVarChar_BlurKeyup(event) {
    if (event.keyCode) {//Chrome, IE9, Comandos Firefox 9
        var key = event.keyCode;
        var control = $(event.srcElement);

        if ($.browser.mozilla) {
            return true;
        }
        else {
            //            if ((key > 47 && key < 58) || (key > 64 && key < 91) || (key > 96 && key < 123) || key == 45 || key == 61) {//numeros y letras, guión (-), igual (=)
            if ((key > 47 && key < 58) || (key > 64 && key < 91) || (key > 96 && key < 123) || key == 45 || key == 61 || key == 189 || key == 189 || key == 109 || key == 241 || key == 209) {//numeros y letras, guión (-), igual (=) 192=Ñ
                //                return true;
            }
            else {
                if (event.keyCode != 8 && event.keyCode != 46 && event.keyCode != 37 && event.keyCode != 39 && event.keyCode != 32) {
                    $(this).val($(this).val().replace(/[^a-zA-Z0-9!-]/g, ''));
                }
            }
        }
    }
    else {
        //        var key = event.keyCode;
        var key = !event.charCode ? event.which : event.charCode
        var control = $(event.srcElement);
        //        if (key > 47 && key < 58) {//numeros
        if ((key > 47 && key < 58) || (key > 64 && key < 91) || (key > 96 && key < 123) || key == 45 || key == 61 || key == 189 || key == 109) {//|| key == 241 || key == 209) {//numeros y letras, guión (-), igual (=) 192=Ñ

            //            return true;
        }
        else {
            if (event.keyCode != 8 && event.keyCode != 46 && event.keyCode != 37 && event.keyCode != 39 && event.keyCode != 32) {
                $(this).val($(this).val().replace(/[^a-zA-Z0-9!-]/g, ''));
            }
        }

    }
};
function ValidarAlfaNumericoConEspaciosYCaracteres(event) {

    switch (event.keyCode) {
        case 35:
        case 40:
        case 41:
        case 42:
        case 44:
        case 45:
        case 46:
        case 58:
        case 59:
        case 64:
        case 95:
        case 127:
        case 209:
        case 241:
            return true;
        default:
            return ValidarAlfaNumericoConEspacios(event);
    }

}

function ValidarCadenaEnCajaTexto(_idTextBox) {
    //$('#' + _idTextBox).removeAttr("keypress");
    //$('#' + _idTextBox).keypress(ValidarAlfaNumericoConEspacios);
    $('#' + _idTextBox).unbind("focusout");
    $('#' + _idTextBox).unbind("keypress");
    //    $('#' + _idTextBox).bind("keypress", function (event) {
    //        ValidarAlfaNumericoConEspacios();
    //    });

    $('#' + _idTextBox).keypress(ValidarAlfaNumericoConEspacios);

    $('#' + _idTextBox).unbind("paste");
    $("#" + _idTextBox).css({ "text-align": "left" });
}

function raiz(ruta) {
    var publicacion = "/";
    var FinDo = false;
    var Ventana = window;
    var contador = 0;

    do {
        contador++; /// <reference path="jquery.scrollTo-min.js" />

        Ventana = Ventana.parent;
        if (Ventana != null && Ventana.location.href.toLowerCase().indexOf('mainprincipal.aspx') == -1) {
            if (Ventana.RaizSistema != undefined) {
                publicacion = Ventana.RaizSistema;
                FinDo = true;
                break;
            }
            else {
                //if (Ventana.location.href.toLowerCase().indexOf('.aspx') == -1 || Ventana.location.href.toLowerCase().indexOf('index.aspx') > -1) {
                if (Ventana.location.href.toLowerCase().indexOf('.aspx') == -1 || Ventana.location.href.toLowerCase().indexOf('mainprincipal.aspx') > -1) {                    
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

function raiz2(ruta) {

    var publicacion = "";  
    var Pagina = window.location.pathname.toLowerCase();
    var Loc = new Array();
    Loc = Pagina.split("/");
    var contadorr = Loc.length;

    for (var i = 2; i < Loc.length; i++) {
        publicacion = publicacion + "../";
    }


    return publicacion + ruta;

}


function JQGrid(IdGrilla, IdPaginado, fnData, oColModel, ancho, alto, sortname, multiSeleccion, fncDobleClick, fncSelect, fncAfterInsertRow, fncBeforeSelectRow, desahilitardobleclick, TamanosPagina) {
    var tbl;

    if (TamanosPagina == null || TamanosPagina == undefined)
        TamanosPagina = [10, 20, 30];

    if (fnData != "local") {
        tbl = $(IdGrilla).jqGrid({
            //sortable: true,
            datatype: fnData,
            jsonReader: //Set the jsonReader to the JQGridJSonResponse squema to bind the data.
            {
            root: "Items",
            page: "PaginaActual",
            total: "TotalPaginas",
            records: "TotalRegistros",
            repeatitems: true,
            cell: "Row",
            id: "ID"
        },
        colModel: oColModel,
        pager: IdPaginado, //Pager.
        loadtext: 'Cargando datos...',
        recordtext: "{0} - {1} de {2} elementos",
        emptyrecords: 'No hay resultados',
        pgtext: 'Pág: {0} de {1}', //Paging input control text format.
        rowNum: TamanosPagina[1], //$("#hdfTamPag").val(), //"10" PageSize.
        rowList: TamanosPagina, //[10, 20, 30],  //TamanosPaginaSel, //Variable PageSize DropDownList. 
        sortname: sortname, //sortname: idTabla, //Default SortColumn
        sortorder: "asc", //Default SortOrder.
        multiselect: multiSeleccion,
        width: ancho,
        height: alto,
        rownumbers: true,
        shrinkToFit: false,
        viewrecords: true, //Show the RecordCount in the pager.
        gridComplete: function () {
            //$(IdGrilla).jqGrid('hideCol', 'cb');
        },
        onSelectRow: function (id) {
            fncSelect(id);
//            try {
//                fncSelect(id);
//            } catch (e) {
//                
//            }
        },
        //        sortable: function (permutation) {
        //        },
        resizeStop: function (width, index) {
        },
        afterInsertRow: function (rowid, aData, rowelem) {
            if (fncAfterInsertRow != null && fncAfterInsertRow != undefined)
                fncAfterInsertRow(rowid, aData, rowelem);
            //                if (aData.btVig == 'False') {
            //                    var colModels = $("#grid").getGridParam("colModel");

            //                    for (var i in colModels) {
            //                        $("#grid").jqGrid('setCell', rowid, i, '', { color: 'red' });
            //                    }
            //                }
        },
        //onSortCol: function(name,index){  alerta("Column Name: "+name+" Column Index: "+index); },
        ondblClickRow: function (id) {
            if (desahilitardobleclick == null || desahilitardobleclick == undefined || !desahilitardobleclick) {
                $(IdGrilla).jqGrid('resetSelection');
                $(IdGrilla).jqGrid('setSelection', id);
                if (fncDobleClick != null && fncDobleClick != undefined)
                    fncDobleClick(id);
            }
        },
        beforeSelectRow: function (rowid, e) {
            if (fncBeforeSelectRow != null && fncBeforeSelectRow != undefined)
                fncBeforeSelectRow(rowid, e);
            //                if (!e.ctrlKey && !e.shiftKey) {
            //                    $("#grid").jqGrid('resetSelection');
            //                }
            //                else if (e.shiftKey) {
            //                    var initialRowSelect = $("#grid").jqGrid('getGridParam', 'selrow');
            //                    $("#grid").jqGrid('resetSelection');

            //                    var CurrentSelectIndex = $("#grid").jqGrid('getInd', rowid);
            //                    var InitialSelectIndex = $("#grid").jqGrid('getInd', initialRowSelect);
            //                    var startID = "";
            //                    var endID = "";
            //                    if (CurrentSelectIndex > InitialSelectIndex) {
            //                        startID = initialRowSelect;
            //                        endID = rowid;
            //                    }
            //                    else {
            //                        startID = rowid;
            //                        endID = initialRowSelect;
            //                    }

            //                    var shouldSelectRow = false;
            //                    $.each($("#grid").getDataIDs(), function (_, id) {
            //                        if ((shouldSelectRow = id == startID || shouldSelectRow)) {
            //                            $("#grid").jqGrid('setSelection', id, false);
            //                        }
            //                        return id != endID;
            //                    });
            //                }
            return true;
        }
    }).navGrid(IdPaginado, { edit: false, add: false, search: false, del: false });

    var parameters = {
        edit: false,
        editicon: "ui-icon-pencil",
        add: false,
        addicon: "ui-icon-plus",
        save: false,
        saveicon: "ui-icon-disk",
        cancel: false,
        cancelicon: "ui-icon-cancel",
        addParams: { useFormatter: false },
        editParams: {}
    }
    //$(IdGrilla).jqGrid('inlineNav', IdPaginado, parameters);

}
else {
    tbl = $(IdGrilla).jqGrid({
        datatype: "local",
        colModel: oColModel,
        sortname: sortname, //Default SortColumn
        sortorder: "asc", //Default SortOrder.
        multiselect: multiSeleccion,
        width: ancho,
        height: alto,
        rownumbers: true,
        shrinkToFit: false,
        gridComplete: function () {
            //$(IdGrilla).jqGrid('hideCol', 'cb');
        },
        onSelectRow: function (id) {
            //fncSelect(id);
            try {
                fncSelect(id);
            } catch (e) {
            }
        },
        //            sortable: function (permutation) {
        //            },
        resizeStop: function (width, index) {
        },
        afterInsertRow: function (rowid, aData, rowelem) {
            if (fncAfterInsertRow != null && fncAfterInsertRow != undefined)
                fncAfterInsertRow(rowid, aData, rowelem);
            //                if (aData.btVig == 'False') {
            //                    var colModels = $("#grid").getGridParam("colModel");

            //                    for (var i in colModels) {
            //                        $("#grid").jqGrid('setCell', rowid, i, '', { color: 'red' });
            //                    }
            //                }
        },
        ondblClickRow: function (id) {
            if (desahilitardobleclick == null || desahilitardobleclick == undefined || !desahilitardobleclick) {
                $(IdGrilla).jqGrid('resetSelection');
                $(IdGrilla).jqGrid('setSelection', id);
                if (fncDobleClick != null && fncDobleClick != undefined)
                    fncDobleClick(id);
            }
        },
        beforeSelectRow: function (rowid, e) {
            //                if (!e.ctrlKey && !e.shiftKey) {
            //                    $("#grid").jqGrid('resetSelection');
            //                }
            //                else if (e.shiftKey) {
            //                    var initialRowSelect = $("#grid").jqGrid('getGridParam', 'selrow');
            //                    $("#grid").jqGrid('resetSelection');

            //                    var CurrentSelectIndex = $("#grid").jqGrid('getInd', rowid);
            //                    var InitialSelectIndex = $("#grid").jqGrid('getInd', initialRowSelect);
            //                    var startID = "";
            //                    var endID = "";
            //                    if (CurrentSelectIndex > InitialSelectIndex) {
            //                        startID = initialRowSelect;
            //                        endID = rowid;
            //                    }
            //                    else {
            //                        startID = rowid;
            //                        endID = initialRowSelect;
            //                    }

            //                    var shouldSelectRow = false;
            //                    $.each($("#grid").getDataIDs(), function (_, id) {
            //                        if ((shouldSelectRow = id == startID || shouldSelectRow)) {
            //                            $("#grid").jqGrid('setSelection', id, false);
            //                        }
            //                        return id != endID;
            //                    });
            //                }
            return true;
        }
    });
}

return tbl;
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

function fnCambiarTituloTabUI(NombreTabPrincipal, indiceTab, ValorTitulo) {
    $('#' + NombreTabPrincipal + ' ul:first li:eq(' + indiceTab + ') a').text(ValorTitulo);
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

function fnMiFormetearNumero(prValor) {
    var construido = "";
    var valor = "";
    for (var i = 0; i < prValor.length; i++) {

        if (((i + 1) % 3) == 0 ) {
            construido += prValor[prValor.length - (i + 1)] ;
            if (prValor.length != (i+1)) {
                construido += ","
            }
        }
        else {
            construido += prValor[prValor.length - (i + 1)];
        }

    }

    for (var k = 0; k < construido.length; k++) {
        valor += construido[construido.length - (k + 1)];
    }

    return valor;

}

function alertaExterna(contenido, Titulo, fnCerrar) {
    $("#dvContenidoAlertaExterna").html("");
    $("#dvContenidoAlertaExterna").html(contenido);

    if (Titulo == null || Titulo == undefined)
        Titulo = "Mensaje del sistema";

    $("input,select,div,button,textarea").bind("focus", function () {
        idFocus = $(this).attr("id");
        //$(this).unbind("focus");
    });

    $("#dvContenidoAlertaExterna").css("z-index", "10");
    $('#dvMsgAlertaExterna').css("z-index", "100000000");
    $('#dvMsgAlertaExterna').dialog({
        title: Titulo,
        modal: true,
        buttons: {
            "Aceptar": function () {
                //window.parent.$(this).dialog("close");
                $(this).dialog("close");
                $("#" + idFocus).focus();
                if (fnCerrar != null && fnCerrar != undefined)
                    fnCerrar();
            }
        },
        position: { my: "center", at: "center", of: window },
        open: function (event, ui) {
            $('#dvContenidoAlertaExterna').focus();
        }
    });
    setTimeout(function () { window.$('#dvMsgAlertaExterna').focus(); }, 300);
}

function CancelarAsistente() {
    $("#dvContenidoAlertaExterna").html("");
    $("#dvContenidoAlertaExterna").html("Desea cancelar el Asistente de Instalación?");
    $('#dvMsgAlertaExterna').dialog({
        title: "Cancelar Operación",
        modal: true,
        //position: ['center', 250],
        buttons: {
            "Si": function () {
                window.parent.parent.tab.tabs("remove", window.parent.parent.tab.tabs("option", "selected"));
                //window.parent.parent.$("#ifTema").attr("src", "");
                //window.parent.$("#ifTemaAsistente").attr("src", "");
                $(this).dialog("close");

            },
            "No": function () {

                $(this).dialog("close");
            }
        }
    });
}

function LimpiarDatoString(dato) {
    if (dato == null)
        return ''
    else
        return dato.replace(/'/g, "").replace(/"/g, "").replace(/\\/g, "");
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

function ValidarNoEspacio_focusout() {
    $(this).val($(this).val().replace(/ /g, "").replace(/'/g, "").replace(/"/g, "").replace(/\\/g, ""));
}

function FormatoNumero(numero, oCultura, esEntero) {
    if (numero != undefined && numero != "") {
        if (esEntero != null && esEntero == true && numero.length > 1) {
            numero = numero.toString().replace(/^0+/, '');
        }
        numero = parseFloat(numero).toFixed(oCultura.dcNumDec);
        var n = numero.toString().split(oCultura.vcSimDec);
        var enteros = n[0].replace(/\B(?=(\d{3})+(?!\d))/g, oCultura.vcSimSepMil);

        if (esEntero != null && esEntero == true) {
            return enteros;
        } else {
            return (enteros + oCultura.vcSimDec + n[1]);
        }
    } else {
        return (0).toFixed(oCultura.dcNumDec);
    }
}

function DevuelveNumeroSinFormato(numero, oCultura, esEntero) {
    var varRepSepMil = new RegExp(oCultura.vcSimSepMil, 'g');
    var varRepSimMon = new RegExp(oCultura.Moneda.vcSimMon, 'g');
    if (esEntero != null && esEntero == true) {
        numero = $.trim(numero.toString().replace(varRepSepMil, '').replace(varRepSimMon, ''));
    } else {
        var parteEntero = '';
        var parteDecimal = '';
        if (numero.toString().indexOf(oCultura.vcSimDec) != -1) { //agregado 19-01-2015 wapumayta
            parteEntero = numero.toString().split(oCultura.vcSimDec)[0].replace(varRepSepMil, '');
            parteDecimal = numero.toString().split(oCultura.vcSimDec)[1];
        } else {
            parteEntero = numero;
            parteDecimal = '0';
        }
        numero = parteEntero + '.' + parteDecimal;
    }
    return numero;
}

function RecalcularColumnasGrilla(gridName, sinEspacioAdicional) {

    var columnNames = $("#" + gridName).jqGrid('getGridParam', 'colModel');
    var thisWidth, newWidth, columnsWidth = 0, otherColumnsWidth = 0, numColumnas = 0;
    var itm;

    if (columnNames != undefined) {
        // Loop through Cols        
        for (itm = 0, itmCount = columnNames.length; itm < itmCount; itm++) {
            if (columnNames[itm].name != "rn" && columnNames[itm].name != "cb" && columnNames[itm].hidden == false && columnNames[itm].resizable != false) {//Columna de rownumbers o multiselect
                columnsWidth = columnsWidth + columnNames[itm].width;
                numColumnas = numColumnas + 1;
            } else if ((columnNames[itm].name == "rn" || columnNames[itm].name == "cb" || columnNames[itm].resizable == false) && columnNames[itm].hidden == false) {//Columna de rownumbers o multiselect
                otherColumnsWidth = otherColumnsWidth + columnNames[itm].width + 5;
                numColumnas = numColumnas + 1;
            }
        }

        var gridWidth = $("#gbox_" + gridName).width();
        var gridUsedWidth = columnsWidth + otherColumnsWidth + ((sinEspacioAdicional == true) ? 0 : 30);
        var gridUnusedWidth = gridWidth - gridUsedWidth;
        if (gridUnusedWidth > 0) {

            for (itm = 0, itmCount = columnNames.length; itm < itmCount; itm++) {
                if (columnNames[itm].name != "rn" && columnNames[itm].name != "cb" && columnNames[itm].hidden == false && columnNames[itm].resizable != false) {//Columna de rownumbers o multiselect
                    thisWidth = columnNames[itm].width;
                    newWidth = thisWidth + ((thisWidth * gridUnusedWidth) / columnsWidth) - 5;

                    $('#' + gridName + ' .jqgfirstrow td:eq(' + itm + '), #' + gridName + '_' + columnNames[itm].name).width(newWidth).css('min-width', newWidth);
                }
            }
        } else {

            for (itm = 0, itmCount = columnNames.length; itm < itmCount; itm++) {
                if (columnNames[itm].name != "rn" && columnNames[itm].name != "cb" && columnNames[itm].hidden == false && columnNames[itm].resizable != false) {//Columna de rownumbers o multiselect
                    newWidth = columnNames[itm].width + 5;

                    $('#' + gridName + ' .jqgfirstrow td:eq(' + itm + '), #' + gridName + '_' + columnNames[itm].name).width(newWidth).css('min-width', newWidth);
                }
            }
        }
    }
}



