var HabilitadoGrilla = true;

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
        }, 2500);
    }
};

//function validarEmail(valor) {
//    if (/^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/.test(valor)) {
//        //alert("La dirección de email " + valor + " es correcta.")
//        return (true)
//    } else {
//        //alert("La dirección de email es incorrecta.");
//        return (false);
//    }
//}


//function validarEmail(s) {
//    //var s = theElement.value;
//    var filter = /^[A-Za-z][A-Za-z0-9_]*@[A-Za-z0-9_]+.[A-Za-z0-9_.]+[A-za-z]$/;
//    if (s.length == 0) return true;
//    if (filter.test(s))
//        return true;
////    else
////        alert("Entre una direccion de corre valida");
//    //theElement.focus();
//    return false;
//}

function ValidarDecimalPositivo(event) {
    var key = window.event ? event.keyCode : event.which;
    if (key > 47 && key < 58) {//numeros
        if (this.value != "0")
            return true;
        else
            return false;
        return true;
    }
    else if (key == 46) {//punto
        if (this.value != "-" && this.value != "." && this.value != "" && this.value.indexOf('.') == -1)
            return true;
        else
            return false;
    }
    else
        return false;
};

function ValidarNoEspacio(event) {
    var key = window.event ? event.keyCode : event.which;
    if ((key > 64 && key < 91) || (key > 96 && key < 123) || (key > 47 && key < 58) || key == 95)//LETRAS MAYUSCULAS Y MINISCULAS, NUMEROS Y SIMBOLO "_"
        return true;
    else
        return false;
};

function ValidarDecimalComaPositivo(event) {
    var key = window.event ? event.keyCode : event.which;
    if (key > 47 && key < 58) {//numeros
        if (this.value != "0")
            return true;
        else
            return false;
        return true;
    }
    else if (key == 44) {//Coma
        if (this.value != "-" && this.value != "," && this.value != "" && this.value.indexOf(',') == -1)
            return true;
        else
            return false;
    }
    else
        return false;
};

function ValidarEnteroPositivo(event) {
    var key = window.event ? event.keyCode : event.which;
    if (key > 47 && key < 58) {//numeros
        if (this.value == "" && key == 48)
            return false;
        else
            return true;
    }
    else
        return false;
};

function ValidarSoloNumero(event) {
    var key = window.event ? event.keyCode : event.which;
    if (key > 47 && key < 58)//numeros
        return true;    
    else
        return false;
};

function ValidarEntero(event) {
    var key = window.event ? event.keyCode : event.which;
    if (key > 47 && key < 58) {//numeros
        return true;
    }
    else if (key == 45) {//negativo
        if (this.value == "")
            return true;
        else
            return false;
    }
    else
        return false;
};

function ValidarDecimal(event) {
    var key = window.event ? event.keyCode : event.which;
    if (key > 47 && key < 58) {//numeros
        if (this.value != "0")
            return true;
        else
            return false;
    }
    else if (key == 45) {//negativo
        if (this.value == "")
            return true;
        else
            return false;
    }
    else if (key == 46) {//punto
        if (this.value != "-" && this.value != "." && this.value != "" && this.value.indexOf('.') == -1)
            return true;
        else
            return false;
    }
    else
        return false;
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
            if (this.value.length < this.attributes[i].value)
                return true;
            else
                return false;
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
    if (mes < 10) mes = '0' + mes;
    if (dia < 10) dia = '0' + dia;
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
    if (HabilitadoGrilla)
        $(event.target.parentNode).addClass('Grilla-SelectedRowStyle');
}
//---------------------------------------------------------------------------------------------------------------------------------------

//-----------------------------------------------------Barra de navegación---------------------------------------------------------------
//$(".PanelBarraNavegacion").live("mousemove", function () {
    //$(this).addClass('ui-state-highlight quitarBorde');
//});
//$(".PanelBarraNavegacion").live("mouseout", function () {
    //$(this).removeClass('ui-state-highlight quitarBorde');
//});

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
    else//En el caso que exista lo muestra
        tab.tabs('select', Id);
};
//---------------------------------------------------------------------------------------------------------------------------------------


function MostrarErrorAjax(xhr, Metodo, thrErr) {
////    var r = jQuery.parseJSON(xhr.responseText);
////    if (r == null) {
////        r = xhr.statusText;
////        if (r == null || r == '') {
////            alert("Error Genérico");
////        }
////        else {
////            alert("Message: " + r + ". Codigo: " + xhr.status);
////        }
////    }
////    else {
////        alert("Message: " + r.Message);
    ////    }

    var r = jQuery.parseJSON(xhr.responseText);
    var Error = '';
    var Detalle = '';
    if (r == null) {
        r = xhr.statusText;
        if (r == null || r == '') {
            Error = "Error Genérico";
        }
        else {
            Error = "Message: " + r + ". Codigo: " + xhr.status;
            if (xhr.status != null && xhr.status == "0")
                return;
        }
        Detalle = Error;
    }
    else {
        Error = r.Message.replace(/"/g, " ").replace(/á/g, "a").replace(/é/g, "e").replace(/í/g, "i").replace(/ó/g, "o").replace(/ú/g, "u");
        Detalle = r.StackTrace.replace(/"/g, " ").replace(/á/g, "a").replace(/é/g, "e").replace(/í/g, "i").replace(/ó/g, "o").replace(/ú/g, "u");
        Metodo = Metodo.replace(/"/g, " ").replace(/á/g, "a").replace(/é/g, "e").replace(/í/g, "i").replace(/ó/g, "o").replace(/ú/g, "u");
    }
    fnFuncionNotificacionErr(Error,Metodo,Detalle);
    //    alert("StackTrace: " + r.StackTrace);
    //    alert("ExceptionType: " + r.ExceptionType);
    //    alert("ERROR" + xhr.d);
}

function LimpiarDatoString(dato) {
    if (dato == null)
        return ''
    else
        return dato.replace(/'/g, "").replace(/"/g, "").replace(/\\/g, "");
}

function ValidarNoEspacio_focusout() {
    $(this).val($(this).val().replace(/ /g, "").replace(/'/g, "").replace(/"/g, "").replace(/\\/g, ""));
}

function raiz(ruta) {
    var publicacion = "/";
    var FinDo = false;
    var Ventana = window;
    var contador = 0;
    //debugger;

    do {
        contador++; /// <reference path="jquery.scrollTo-min.js" />

        Ventana = Ventana.parent;
        if (Ventana != null && Ventana.location.href.toLowerCase().indexOf('MainPrincipal.aspx') == -1) {
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
    while (FinDo == false);

    return publicacion + ruta;
}

function raiz2(ruta) {

    var publicacion = "";
    var Pagina = window.location.pathname.toLowerCase();
    var Loc = new Array[0]();
    Loc = Pagina.split("/");
    var contadorr = Loc.length;
    var i;
    for (i = 2; i < Loc.length; i++) {
        publicacion = publicacion + "../";
    }


    return publicacion + ruta;

}
