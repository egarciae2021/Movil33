$(function () {

    $(document).ajaxStart(function (e) {
        $("#dvWaiting").show();
    });
    $(document).ajaxStop(function (e) {
        $("#dvWaiting").hide();
    });

    $("select").addClass("ui-corner-all");
    $("select").css("padding", "4px");
    $("select").css({ "border": "1px solid #DDDDDD" });

    $("input:text").addClass("ui-corner-all");
    $("input:text").css("padding", "4px");
    $("input:text").css({ "border": "1px solid #DDDDDD" });

    $(".MiDateTimePicker").datepicker();


    $(".conPopOverTop").hover(function () {

        $("#miPopOver").removeClass("top");
        $("#miPopOver").removeClass("bottom");
        $("#miPopOver").removeClass("left");
        $("#miPopOver").removeClass("right");

        $("#miPopOver").addClass("top");

        $($("#miPopOver .popover-content")[0]).html("");
        $($("#miPopOver .popover-content")[0]).append($(this).find(".InfoPop").html());

        $(this).mousemove(function (e) {
            $("#miPopOver").css({ "left": e.pageX - ($("#miPopOver").outerWidth() / 2), "top": e.pageY - $("#miPopOver").outerHeight() - 10, "display": "block" });
        });
    },
    function () {
        $("#miPopOver").css("display", "none");
    })

    $(".conPopOverBottom").hover(function () {

        $("#miPopOver").removeClass("top");
        $("#miPopOver").removeClass("bottom");
        $("#miPopOver").removeClass("left");
        $("#miPopOver").removeClass("right");

        $("#miPopOver").addClass("bottom");

        $($("#miPopOver .popover-content")[0]).html("");
        $($("#miPopOver .popover-content")[0]).append($(this).find(".InfoPop").html());

        $(this).mousemove(function (e) {
            $("#miPopOver").css({ "left": e.pageX - ($("#miPopOver").outerWidth() / 2), "top": e.pageY +20, "display": "block" });
        });
    },
    function () {
        $("#miPopOver").css("display", "none");
    })

    $(".conPopOverLeft").hover(function () {

        $("#miPopOver").removeClass("top");
        $("#miPopOver").removeClass("bottom");
        $("#miPopOver").removeClass("left");
        $("#miPopOver").removeClass("right");

        $("#miPopOver").addClass("left");

        $($("#miPopOver .popover-content")[0]).html("");
        $($("#miPopOver .popover-content")[0]).append($(this).find(".InfoPop").html());

        $(this).mousemove(function (e) {
            $("#miPopOver").css({ "left": e.pageX - $("#miPopOver").outerWidth() - 10, "top": e.pageY - ($("#miPopOver").outerHeight() / 2), "display": "block" });
        });
    },
    function () {
        $("#miPopOver").css("display", "none");
    })

    $(".conPopOverRight").hover(function () {

        $("#miPopOver").removeClass("top");
        $("#miPopOver").removeClass("bottom");
        $("#miPopOver").removeClass("left");
        $("#miPopOver").removeClass("right");

        $("#miPopOver").addClass("right");

        $($("#miPopOver .popover-content")[0]).html("");
        $($("#miPopOver .popover-content")[0]).append($(this).find(".InfoPop").html());

        $(this).mousemove(function (e) {
            $("#miPopOver").css({ "left": e.pageX + 15, "top": e.pageY - ($("#miPopOver").outerHeight() / 2), "display": "block" });
        });
    },
    function () {
        $("#miPopOver").css("display", "none");
    })

});

function miAlerta(prCabecera, prDescripcion, prIcono, prColor) {

    if (prCabecera == "" || prCabecera == undefined) {
        prCabecera = "Mensaje";
    }

    if (prIcono == "" || prIcono == undefined) {
        prIcono = "glyphicon-warning-sign";
    }

    if (prColor == "" || prColor == undefined) {
        prColor = "skyblue";
    }

    $("#miAlerta .modal-header").html(prCabecera);
    if (prCabecera == "Registro" || prCabecera == "Alerta" || prCabecera == "Registrar" || prCabecera == "Eliminar" || prCabecera == "Error" || prCabecera == "Nivel" || prCabecera == "Bolsa" || prCabecera == "Subscripcion" || prCabecera == "Titular") {
        $("#miAlerta .modal-header").append('<button type="button" class="close" data-dismiss="modal" style="color:#31708f !important;opacity:0.6!important;">x</button>'); //RRAMOS
    } else {
        $("#miAlerta .modal-header").append('<button type="button" class="close" data-dismiss="modal" style="color:white !important;opacity:0.6!important;">x</button>'); //RRAMOS
    }    
    $("#miAlerta .modal-body > span:first-child").attr("class", "");
    $("#miAlerta .modal-body > span:first-child").addClass("glyphicon");
    $("#miAlerta .modal-body > span:first-child").addClass(prIcono);
    $("#miAlerta .modal-body > span:first-child").css("color", prColor);
    $("#miAlerta .modal-body > span:nth-child(2)").html(prDescripcion);

    $("#miAlerta").modal('show');
  
};

function miDialogo(pTitulo, pBody, pFuncion)
{
    $("#miDialogo .modal-header").html("");
    $("#miDialogo .modal-header").append('<button type="button" class="close" data-dismiss="modal" style="color:#31708f !important;opacity:0.6!important;">x</button>'); //RRAMOS
    $("#miDialogo .modal-body").html("");

    $("#miDialogo .modal-header").append(pTitulo);
    $("#miDialogo .modal-body").append(pBody);

    $("#btnGlobalAceptar").click(function () {
        $(this).unbind("click");
        $("#miDialogo").modal('hide');
        pFuncion();
    });

    $("#miDialogo").modal('show');
}

function miDialogoConfirmacion(pMensaje, pFnSi, pFnNo, pArgumentosSI, pArgumentosNO) {
    //debugger;
    $("#miDialogoConfirmacion .modal-content .modal-header").html("");
    $("#miDialogoConfirmacion .modal-content .modal-header").append("Confimación"); //RRAMOS
    $("#miDialogoConfirmacion .modal-content .modal-header").css("font-weight", "bold");
    $("#miDialogoConfirmacion .modal-content .modal-header").css("color", "#485CA4");
    $("#miDialogoConfirmacion .modal-content .modal-header").append('<button type="button" class="close" data-dismiss="modal" style="color:#31708f !important;opacity:0.6!important;">x</button>'); //RRAMOS
    $("#miDialogoConfirmacion .modal-body td:first-child").html("");
    $("#miDialogoConfirmacion .modal-body td:first-child").append(pMensaje);





    $("#btnSi").unbind("click");
    $("#btnNo").unbind("click");

    $("#btnSi").click(function () {
        $(this).unbind("click");
        $("#miDialogoConfirmacion").modal('hide');
        if (pArgumentosSI == undefined) {
            pFnSi();
        }
        else {
            pFnSi(pArgumentosSI);
        }
        
    });

    $("#btnNo").removeAttr("data-dismiss");

    if (pFnNo != undefined) {
        $("#btnNo").click(function () {
            $(this).unbind("click");
            $("#miDialogoConfirmacion").modal('hide');
            pFnNo;
            if (pArgumentosNO == undefined) {
                pFnNo();
            }
            else {
                pFnNo(pArgumentosNO);
            }
        });
    }
    else {
        $("#btnNo").attr("data-dismiss", "modal");
    }

    $("#miDialogoConfirmacion").modal('show');
}

function MostrarErrorAjax(xhr, err, thrErr) {
    //var r = jQuery.parseJSON(xhr.responseText);
    //if (r == null) {
    //    r = xhr.statusText;
    //    if (r == null || r == '') {
    //        miAlerta("Error", "Error Genérico", "glyphicon-exclamation-sign", "red");
    //    }
    //    else {
    //        miAlerta("Error", "Message: " + r + ". Codigo: " + xhr.status, "glyphicon-exclamation-sign", "red");
    //    }
    //}
    //else {
    //    miAlerta("Error", "Message: " + r.Message, "glyphicon-exclamation-sign", "red");
    //}

    if (xhr.status == 401) {
        window.location.reload();
    }
    else {
        miAlerta("Error", thrErr, "glyphicon-exclamation-sign", "#d9534f");
    }
}

function ValidarAlfaNumericoConEspacios(event) {
    var caract = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (event.keyCode) {//Chrome, IE9, Comandos Firefox 9
        var key = event.keyCode;
        var control = $(event.srcElement);

        if ($.browser.mozilla) {
            return true;
        }
        else {
            if ((key > 64 && key < 91) || (key > 96 && key < 123) || (key > 47 && key < 58) ||
             key == 241 || key == 209 || key == 192 || key == 8 ||
              key == 32 || key == 186 || key == 190 || key == 188 ||
              key == 46 || key == 20 || key == 37 || key == 40 || key == 41 || //37:IZ, 39:DER 40:( ,41:)
              key == 225 || key == 233 || key == 237 || key == 243 || key == 250 || //áéíóú
              key == 193 || key == 201 || key == 205 || key == 211 || key == 218 || //ÁÉÍÓÚ
              key == 44 || key == 59 //|| key == 39 //,;
              ) { //LETRAS MAYUSCULAS Y MINISCULAS, NUMEROS Y SIMBOLO "_", Ñ, ESPACIO 188,
                return true;
                //                
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
        //    if (event.which) {//Firefox 9
    else {

        var key = !event.charCode ? event.which : event.charCode

        var control = $(event.currentTarget);
        //        if ((key > 64 && key < 91) || (key > 96 && key < 123) || (key > 47 && key < 58) || key == 32) {//LETRAS MAYUSCULAS Y MINISCULAS, NUMEROS Y SIMBOLO "_"
        if ((key > 64 && key < 91) || (key > 96 && key < 123) || (key > 47 && key < 58) ||
             key == 241 || key == 209 || key == 192 || key == 8 ||
              key == 32 || key == 186 || key == 190 || key == 188 ||
              key == 46 || key == 20 || key == 37 || key == 39 || key == 40 || key == 41 || //37:IZ, 39:DER 40:( ,41:)
              key == 225 || key == 233 || key == 237 || key == 243 || key == 250 || //áéíóú
              key == 193 || key == 201 || key == 205 || key == 211 || key == 218 || //ÁÉÍÓÚ
              key == 44 || key == 59 //,;
              ) { //LETRAS MAYUSCULAS Y MINISCULAS, NUMEROS Y SIMBOLO "_", Ñ, ESPACIO 188,
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


function ValidarAlfaNumericoConEspaciosChat(event) {
    var caract = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (event.keyCode) {//Chrome, IE9, Comandos Firefox 9
        var key = event.keyCode;
        var control = $(event.srcElement);

        if ($.browser.mozilla) {
            return true;
        }
        else {
            if ((key > 64 && key < 91) || (key > 96 && key < 123) || (key > 47 && key < 58) ||
             key == 241 || key == 209 || key == 192 || key == 8 ||
              key == 32 || key == 186 || key == 190 || key == 188 ||
              key == 46 || key == 20 || key == 37 || key == 40 || key == 41 || //37:IZ, 39:DER 40:( ,41:)
              key == 225 || key == 233 || key == 237 || key == 243 || key == 250 || //áéíóú
              key == 193 || key == 201 || key == 205 || key == 211 || key == 218 || //ÁÉÍÓÚ
              key == 44 || key == 59 || key == 63 //|| key == 39 //,;
              ) { //LETRAS MAYUSCULAS Y MINISCULAS, NUMEROS Y SIMBOLO "_", Ñ, ESPACIO 188,
                return true;
                //                
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
        //    if (event.which) {//Firefox 9
    else {

        var key = !event.charCode ? event.which : event.charCode

        var control = $(event.currentTarget);
        //        if ((key > 64 && key < 91) || (key > 96 && key < 123) || (key > 47 && key < 58) || key == 32) {//LETRAS MAYUSCULAS Y MINISCULAS, NUMEROS Y SIMBOLO "_"
        if ((key > 64 && key < 91) || (key > 96 && key < 123) || (key > 47 && key < 58) ||
             key == 241 || key == 209 || key == 192 || key == 8 ||
              key == 32 || key == 186 || key == 190 || key == 188 ||
              key == 46 || key == 20 || key == 37 || key == 39 || key == 40 || key == 41 || //37:IZ, 39:DER 40:( ,41:)
              key == 225 || key == 233 || key == 237 || key == 243 || key == 250 || //áéíóú
              key == 193 || key == 201 || key == 205 || key == 211 || key == 218 || //ÁÉÍÓÚ
              key == 44 || key == 59 || key == 63//,;
              ) { //LETRAS MAYUSCULAS Y MINISCULAS, NUMEROS Y SIMBOLO "_", Ñ, ESPACIO 188,
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

function ValidarAlfaNumericoSinEspacios(event) {
    var caract = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (event.keyCode) {//Chrome, IE9, Comandos Firefox 9
        var key = event.keyCode;
        var control = $(event.srcElement);

        if ($.browser.mozilla) {
            return true;
        }
        else {
            if ((key > 64 && key < 91) || (key > 96 && key < 123) || (key > 47 && key < 58) ||
             key == 241 || key == 209 || key == 192 || key == 8 ||
              key == 186 || key == 190 || key == 188 ||
              key == 46 || key == 20 || key == 37 || key == 40 || key == 41 || //37:IZ, 39:DER 40:( ,41:)
              key == 225 || key == 233 || key == 237 || key == 243 || key == 250 || //áéíóú
              key == 193 || key == 201 || key == 205 || key == 211 || key == 218 || //ÁÉÍÓÚ
              key == 44 || key == 59 //|| key == 39 //,;
              ) { //LETRAS MAYUSCULAS Y MINISCULAS, NUMEROS Y SIMBOLO "_", Ñ, ESPACIO 188,
                return true;
                //                
            }
            else {

                    return false;
            }
        }
    }
        //    if (event.which) {//Firefox 9
    else {

        var key = !event.charCode ? event.which : event.charCode

        var control = $(event.currentTarget);
        //        if ((key > 64 && key < 91) || (key > 96 && key < 123) || (key > 47 && key < 58) || key == 32) {//LETRAS MAYUSCULAS Y MINISCULAS, NUMEROS Y SIMBOLO "_"
        if ((key > 64 && key < 91) || (key > 96 && key < 123) || (key > 47 && key < 58) ||
             key == 241 || key == 209 || key == 192 || key == 8 ||
              key == 186 || key == 190 || key == 188 ||
              key == 46 || key == 20 || key == 37 || key == 39 || key == 40 || key == 41 || //37:IZ, 39:DER 40:( ,41:)
              key == 225 || key == 233 || key == 237 || key == 243 || key == 250 || //áéíóú
              key == 193 || key == 201 || key == 205 || key == 211 || key == 218 || //ÁÉÍÓÚ
              key == 44 || key == 59 //,;
              ) { //LETRAS MAYUSCULAS Y MINISCULAS, NUMEROS Y SIMBOLO "_", Ñ, ESPACIO 188,
            return true;
        }
        else {

                return false;

        }
    }
};

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
            else {//if (oCulturaUsuario != null) {
                $("#" + _idTextBox).val(FormatoNumero(dato, oCulturaUsuario, esEntero));
            }
        }
    });

}

function FormatoNumero(numero, oCultura, esEntero) {
    //numero = DevuelveNumeroSinFormato(numero, oCultura, esEntero);
    if (oCultura != null) {
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
    } else {
        if (numero != undefined && numero != "") {
            if (esEntero != null && esEntero == true && numero.length > 1) {
                numero = numero.toString().replace(/^0+/, '');
            }
            numero = parseFloat(numero).toFixed("2");
            var n = numero.toString().split(".");
            var enteros = n[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

            if (esEntero != null && esEntero == true) {
                return enteros;
            } else {
                return (enteros + "." + n[1]);
            }
        } else {
            return (0).toFixed("2");
        }
    }
};

function DevuelveNumeroSinFormato(numero, oCultura, esEntero) {
    if (oCultura != null) {
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
    } else {
        var varRepSepMil = new RegExp(',', 'g');
        var varRepSimMon = new RegExp('S/.', 'g');
        if (esEntero != null && esEntero == true) {
            numero = $.trim(numero.toString().replace(varRepSepMil, '').replace(varRepSimMon, ''));
        } else {
            var parteEntero = '';
            var parteDecimal = '';
            if (numero.toString().indexOf('.') != -1) { //agregado 19-01-2015 wapumayta
                parteEntero = numero.toString().split('.')[0].replace(varRepSepMil, '');
                parteDecimal = numero.toString().split('.')[1];
            } else {
                parteEntero = numero;
                parteDecimal = '0';
            }
            numero = parteEntero + '.' + parteDecimal;
        }
        return numero;
    }
}

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

function ValidateEmail(email) {
    var expr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return expr.test(email);
};