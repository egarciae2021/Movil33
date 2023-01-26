var biQuitarIcono = 1;
var VistaSimple = false;
var SimboloNoPermitidoContraseniaUsu;
try {
    SimboloNoPermitidoContraseniaUsu = localStorage.getItem("SimbNoPermitidos");
}
catch {
    SimboloNoPermitidoContraseniaUsu = "";
}



(function ($, len, createRange, duplicate) {
    $.fn.caret = function (options, opt2) {
        var start, end, t = this[0], browser = $.browser.msie;
        if (typeof options === "object" && typeof options.start === "number" && typeof options.end === "number") {
            start = options.start;
            end = options.end;
        } else if (typeof options === "number" && typeof opt2 === "number") {
            start = options;
            end = opt2;
        } else if (typeof options === "string") {
            if ((start = t.value.indexOf(options)) > -1) end = start + options[len];
            else start = null;
        } else if (Object.prototype.toString.call(options) === "[object RegExp]") {
            var re = options.exec(t.value);
            if (re != null) {
                start = re.index;
                end = start + re[0][len];
            }
        }
        if (typeof start != "undefined") {
            if (browser) {
                var selRange = this[0].createTextRange();
                selRange.collapse(true);
                selRange.moveStart('character', start);
                selRange.moveEnd('character', end - start);
                selRange.select();
            } else {
                this[0].selectionStart = start;
                this[0].selectionEnd = end;
            }
            this[0].focus();
            return this;
        } else {
            // Modification as suggested by ?????? ?????
            if (browser) {
                var selection = document.selection;
                if (this[0].tagName.toLowerCase() != "textarea") {
                    var val = this.val(),
                    range = selection[createRange]()[duplicate]();
                    range.moveEnd("character", val[len]);
                    var s = (range.text == "" ? val[len] : val.lastIndexOf(range.text));
                    range = selection[createRange]()[duplicate]();
                    range.moveStart("character", -val[len]);
                    var e = range.text[len];
                } else {
                    var range = selection[createRange](),
                    stored_range = range[duplicate]();
                    stored_range.moveToElementText(this[0]);
                    stored_range.setEndPoint('EndToEnd', range);
                    var s = stored_range.text[len] - range.text[len],
                    e = s + range.text[len];
                }
                // End of Modification
            } else {
                var s = t.selectionStart,
					e = t.selectionEnd;
            }
            var te = t.value.substring(s, e);
            return {
                start: s, end: e, text: te, replace: function (st) {
                    return t.value.substring(0, s) + st + t.value.substring(e, t.value[len]);
                }
            };
        }
    };
})(jQuery, "length", "createRange", "duplicate");
//**** jquery.caret.1.02.js ****************************************************************************************************



var HabilitadoGrilla = true;
//var asciiValidos = [45,40,41,46,44,58,59,64,127,95]

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
    if (msg !== "") {

        var msg1 = msg;
        var find, re;
        find = '<h1>';
        re = new RegExp(find, 'g');
        msg1 = msg1.replace(re, '');

        find = '</h1>';
        re = new RegExp(find, 'g');
        msg1 = msg1.replace(re, '');

        find = '<h2>';
        re = new RegExp(find, 'g');
        msg1 = msg1.replace(re, '');

        find = '</h2>';
        re = new RegExp(find, 'g');
        msg1 = msg1.replace(re, '');

        msg1 = msg1.replace("<br/>", "");

        try {
            var tipo = "success";
            if (msg1.toLowerCase().indexOf("debe ") >= 0 || msg1.toLowerCase().indexOf("no es válido") >= 0) {
                tipo = "warning";
            }
            window.top.$.niftyNoty({
                type: tipo,
                container: "floating",
                //title: "Mensaje",
                message: msg1,
                closeBtn: true,
                focus: true,
                timer: 2000,
                onHide: function () {
                    try {
                        callback();
                    } catch (e) {
                    }
                }
            });

        } catch (e) {
            MensajeVersion31(msg, doc, callback);
        }
    }
}


function MensajeVersion31(msg, doc, callback) {

    try {
        $(doc).scrollTop(0);
    } catch (e) {

    }

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

function Mensaje_Personalizado(msg, doc, callback) {
    if (msg !== "") {
        var nInfo = doc.createElement("div");
        nInfo.className = "msgAlertaPer";
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

//agregado 10-09-2015 wapuamyta
function validarEmailMultiple(valor) {
    var separador = ';';
    var result = 0;
    var arEmail = valor.split(separador);
    var i = 0;
    for (i = 0; i < arEmail.length; i++) {
        if (validarEmail2(arEmail[i])) {
            result = result + 0;
        } else {
            result = result + 1;
        }
    }
    return result == 0 ? true : false;
}

//function validarEmail(s) {
//    //var s = theElement.value;
//    var filter = /^[A-Za-z][A-Za-z0-9_]*@[A-Za-z0-9_]+.[A-Za-z0-9_.]+[A-za-z]$/;
//    if (s.length == 0){ return true;}
//    if (filter.test(s)){
//        return true;}
////    else{
////        alerta("Entre una direccion de corre valida");}
//    //theElement.focus();
//    return false;
//}

function ValidarDecimalPositivo(event) {
    if (event.keyCode) {//Chrome, IE9, Comandos Firefox 9
        var key = event.keyCode;
        var control = $(event.srcElement);
        //alerta("event.keyCode: " + key + "val: " + control.val());        
        //control.caret().start;
        if ($.browser.mozilla) {
            return true;
        }
        else {
            if (key > 47 && key < 58) {//numeros
                //                if (control.val() != "0") {
                //                    if (key == 48 && control.caret().start == 0 && control.caret().end == 0)
                //                        return false;
                //                    else
                //                        return true;
                //                }
                //                else {
                //                    if(control.caret().start == 1){
                //                        control.val("");
                //                    }
                //                    else
                //                        if(key == 48 && control.caret().start == 0){
                //                            return false;
                //                        }
                //                    return true;
                //                    //return false;
                //                }
                //                return true;
                if (control.val() == "0") {
                    return false;
                }
                else if (control.val() == "") {
                    return true;
                }
                else {
                    if (control.val().indexOf('.') == -1) {
                        return true;
                    }
                    else {
                        if (key == 48 && control.caret().start == 0) {
                            if (control.val().substring(0, 1) == ".") {
                                return true;
                            }
                            else {
                                return false;
                            }
                        }
                        else {
                            if (key == 48 && (control.val().split('.')[0] == "0" || control.val().split('.')[0] == "00" || control.val().split('.')[0] == "000" || control.val().split('.')[0] == "0000" || control.val().split('.')[0] == "00000" || control.val().split('.')[0] == "000000" || control.val().split('.')[0] == "0000000" || control.val().split('.')[0] == "00000000" || control.val().split('.')[0] == "000000000" || control.val().split('.')[0] == "00000000000" || control.val().split('.')[0] == "000000000000" || control.val().split('.')[0] == "0000000000000")) {
                                if (control.caret().end > control.val().indexOf('.')) {
                                    return true;
                                }
                                else {
                                    return false;
                                }
                            }
                            else {
                                return true;
                            }
                        }
                    }
                }
            }
            else if (key == 46 && control.val().indexOf(',') == -1) {//punto
                if (control.val() != "-" && control.val() != "." && control.val() != "" && control.val().indexOf('.') == -1) {
                    return true;
                }
                else {
                    return false;
                }
            }
            else if (key == 44 && control.val().indexOf('.') == -1) {//coma
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
        //alerta("event.keyCode: " + key + "val: " + control.val());

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
        alerta("event.charCode: " + key + "val: " + control.val());
    }
}

function ValidarCaracteresFormatoFecha_Y_Hora(event) {
    switch (event.keyCode) {
        case 45:
        case 46:
        case 47:
        case 58:
        case 92:
            return true;
        default:
            return false;
    }
}

function ValidarAlfaNumericoConEspaciosYCaracteres(event) {
    switch (event.keyCode) {
        case 13:
        case 35:
        case 40:
        case 41:
        case 42:
        case 44:
        case 45:
        case 46:
        case 47:
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
}

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
}

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
}

function ValidarRPM(event) {
    if (event.keyCode) {//Chrome, IE9, Comandos Firefox 9
        var key = event.keyCode;
        var control = $(event.srcElement);

        if ($.browser.mozilla) {
            return true;
        }
        else {
            if ((key > 47 && key < 58) || key == 35 || key == 42) {//numeros
                if (control.val() != "" && (key == 35 || key == 42)) {
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

        if ((key > 47 && key < 58) || key == 35 || key == 42) {//(*/#)numeros
            if (control.val() != "" && (key == 35 || key == 42)) {
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
}

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
}

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
        if ((key > 47 && key < 58) || (key > 64 && key < 91) || (key > 96 && key < 123)) {//numeros
            return true;
        }
        else {
            return false;
        }
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

        var key = !event.charCode ? event.which : event.charCode;

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
}

function ValidarAlfaNumericoConEspacios_BlurKeyup(event) {
    if (event.keyCode) {//Chrome, IE9, Comandos Firefox 9
        var key = event.keyCode;
        var control = $(event.srcElement);

        //        if ($.browser.mozilla) {
        //            return true;
        //        }
        //        else {
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
            $(this).val($(this).val().replace(/[^a-zA-Z0-9 !-.,;ñÑ()áéíóúÁÉÍÓÚ]/g, ''));
        }
        //        }
    }

        //   if (event.which) {//Firefox 9
    else {
        //        var key = event.which;
        var key = !event.charCode ? event.which : event.charCode;
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
                //                return true;
            } else {
                $(this).val($(this).val().replace(/[^a-zA-Z0-9 !-.,;ñÑ()áéíóúÁÉÍÓÚ]/g, ''));
            }
        }
    }
}

function ValidarAlfaNumericosToAllExplorer(event) {
    var key = window.event ? event.keyCode : event.which;
    var i;
    for (i in this.attributes) {
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
}

//validar codigos varchar alfanumérico,guion e igual 
function ValidarCodigoVarChar(event) {
    if (event.keyCode) {//Chrome, IE9, Comandos Firefox 9
        var key = event.keyCode;
        var control = $(event.srcElement);

        if ($.browser.mozilla) {
            return true;
        }
        else {
            //            if ((key > 47 && key < 58) || (key > 64 && key < 91) || (key > 96 && key < 123) || key == 45 || key == 61) {//numeros y letras, guión (-), igual (=)
            if ((key > 47 && key < 58) || (key > 64 && key < 91) || (key > 96 && key < 123) || key == 45 || key == 61 || key == 189 || key == 109) {//|| key == 241 || key == 209) {//numeros y letras, guión (-), igual (=) 192=Ñ 190.
                return true;
            }
            else {
                return false;
            }
        }
    }
        //    if (event.keyCode) {//Firefox 9
        //    if (event.which) {
    else {
        //        var key = event.keyCode;
        var key = !event.charCode ? event.which : event.charCode;
        var control = $(event.srcElement);
        //        if (key > 47 && key < 58) {//numeros
        if ((key > 47 && key < 58) || (key > 64 && key < 91) || (key > 96 && key < 123) || key == 45 || key == 61 || key == 189 || key == 109) {//|| key == 241 || key == 209) {//numeros y letras, guión (-), igual (=) 192=Ñ

            return true;
        }
        else {
            return false;
        }
    }
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
        var key = !event.charCode ? event.which : event.charCode;
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
}
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
}

function ValidarSoloEntero(event) {
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
}

function ValidarDecimal(event, oCultura) {
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
                if (key == 44) {//COMA
                    if (control.val() != "-" && control.val() != "," && control.val() != "" && control.val().indexOf(',') == -1) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
                //return false;
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
}

function ValidarDecimal2(event, oCultura) {

    if (event.keyCode) {//Chrome, IE9, Comandos Firefox 9
        var key = event.keyCode;
        var control = $(event.srcElement);
        if ($.browser.mozilla) {
            return true;
        }
        else {
            if (key > 47 && key < 58) {//numeros
                return true;
                //if (control.val() != "0") {
                //    return true;
                //}
                //else {
                //    return false;
                //}
            }
            else if (key == 45) {//negativo
                return false;
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
                if (key == 44) {//COMA
                    if (control.val() != "-" && control.val() != "," && control.val() != "" && control.val().indexOf(',') == -1) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
                //return false;
            }
        }
    }
    if (event.which) {//Firefox 9
        var key = event.which;
        var control = $(event.currentTarget);

        if (key > 47 && key < 58) {//numeros
            //if (control.val() != "0") {
            return true;
            //}
            //else {
            //    return false;
            //}
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

function ValidarFecha(event) {
    var key = window.event ? event.keyCode : event.which;
    return false;
}

function ValidarFechaHora(event) {
    var key = window.event ? event.keyCode : event.which;
    return false;
}

function ValidarCadena(event) {
    var key = window.event ? event.keyCode : event.which;
    var i;
    for (i in this.attributes) {
        if (this.attributes[i].name == "maxlength" && key != 8) {
            if (this.value.length <= this.attributes[i].value) {
                return true;
            }
            else {
                return false;
            }
        }
    }
    return true;
}


function diaFinMes(mes, anno) {
    mes = parseInt(mes);
    anno = parseInt(anno);
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
    if (mes < 10) { mes = '0' + mes; }
    if (dia < 10) { dia = '0' + dia; }
    var fecha = dia + '/' + mes + '/' + fecha_ingreso.getFullYear();

    return fecha;
}

function fnArmaCadenaDeControles() {
    var vcCadena = "";
    var control;

    $("input,select").each(function (i) {
        control = $(this)[0];

        if ($("#" + control.id).parents("#dvBuscarLinea").length == 0 && $("#" + control.id).parents("#dvBuscarEquipo").length == 0 && control.id != "") {
            if (control.type == "hidden" && control.id != "__VIEWSTATE" && control.id != "__EVENTVALIDATION") {
                vcCadena = vcCadena + control.value.toString() + ",";
            } else if (control.type == "text") {
                vcCadena = vcCadena + control.value.toString() + ",";
            } else if (control.type == "checkbox") {
                vcCadena = vcCadena + control.checked.toString() + ",";
            } else if (control.type == "select-one") {
                vcCadena = vcCadena + control.value.toString() + ",";
            }
        }
    });
    //alerta(vcCadena);
    return vcCadena;
}

//--------------------------------------------------------Grilla-------------------------------------------------------------------
/* Get the rows which are currently selected */
function fnGetSelected(oTableLocal) {
    var aReturn = [];
    var aTrs = oTableLocal.fnGetNodes();
    var i = 0;
    for (i = 0; i < aTrs.length; i++) {
        if ($(aTrs[i]).hasClass('Grilla-SelectedRowStyle')) {
            aReturn.push(aTrs[i]);
        }
    }
    return aReturn;
}

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
}
//$(document).bind("contextmenu", function(e){
//    return false;
//});
document.onkeydown = function (event) {
    event = (event || window.event);
    if (event.keyCode == 123) {
        return false;
    }
};

$(document).ajaxSend(function (event, jqxhr, settings) {
    try {
        if (settings.url == "Common/WebService/General.asmx/VerificaSesion") {
            return;
        }
        window.top.FnPublicReiniciar();
    } catch (e) {

    }

    //if (settings.url == "ajax/test.html") {
    //    $(".log").text("Triggered ajaxSend handler.");
    //}
});

$(document).ajaxStart(function (e) {
    //    alert("hola");
    //console.log(e);
    //    alert(e.target.activeElement.value);
    try {
        var Origen = $(e.currentTarget.activeElement).attr("id");
        switch (Origen) {
            case "cboTipoResponsable":
                if ((e.currentTarget.URL.indexOf('Mnt_Responsables.aspx') > 0)) {
                    return;
                }
                break;
            default:
                break;
        }
    } catch (e) {

    }

    try {

        if ((e.currentTarget.URL.indexOf('Imp_VisorTarea.aspx') < 0) &&
            (e.currentTarget.URL.indexOf('ATE_Listado.aspx') < 0) &&
            (e.currentTarget.URL.indexOf('SOA_Adm_Solicitudes.aspx') < 0) &&
            (e.currentTarget.URL.indexOf('Validar.aspx') < 0) &&
            (e.currentTarget.URL.indexOf('Cierre.aspx') < 0) &&
            (e.currentTarget.URL.indexOf('Mnt_Responsables.aspx/ActualizarTipoResponsable') < 0) &&
            (e.currentTarget.URL.indexOf('Mnt_Consolidado.aspx') < 0) &&
            (e.currentTarget.URL.indexOf('AdmTck_PanelAdministracion.aspx') < 0) &&
            (e.currentTarget.URL.indexOf('Imp_VisorTareaFacturacion.aspx') < 0) &&
            (e.currentTarget.URL.indexOf('Imp_VisorTareaImportacion.aspx') < 0) &&
            (e.currentTarget.URL.indexOf('Sin_Utilitarios.aspx') < 0) &&
            (e.currentTarget.URL.indexOf('Comp_Proc_VisorTarea.aspx') < 0)
           ) {
            //$("#Capa").show();
            //$("#dvCargando").show();
            try {
                window.top.MostrarLoading();
            } catch (e) {
            }
        }
    }
    catch (err) {
        //$("#Capa").show();
        //$("#dvCargando").show();
        try {
            window.top.MostrarLoading();
        } catch (e) {
        }
    }



});
$(document).ajaxStop(function (e) {
    try {
        if ((e.currentTarget.URL.indexOf('Imp_VisorTarea.aspx') < 0) &&
            (e.currentTarget.URL.indexOf('ATE_Listado.aspx') < 0) &&
            (e.currentTarget.URL.indexOf('SOA_Adm_Solicitudes.aspx') < 0) &&
            (e.currentTarget.URL.indexOf('AdmTck_PanelAdministracion.aspx') < 0) &&
            (e.currentTarget.URL.indexOf('Imp_VisorTareaFacturacion.aspx') < 0) &&
            (e.currentTarget.URL.indexOf('Imp_VisorTareaImportacion.aspx') < 0) &&
            (e.currentTarget.URL.indexOf('Comp_Proc_VisorTarea.aspx') < 0)
           ) {
            //$("#Capa").hide();
            //$("#dvCargando").hide();
            try {
                window.top.OcultarLoading();
            } catch (e) {
            }
        }
    }
    catch (err) {
        //$("#Capa").hide();
        //$("#dvCargando").hide();
        try {
            window.top.OcultarLoading();
        } catch (e) {
        }
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

    //$(".ui-accordion-header").hide();
    //.ui-helper-reset.ui-state-default.ui-corner-all

    //CargarIdioma();
    //$("select").addClass("ui-widget-content ui-corner-all");
    $("select").addClass("ui-corner-all");
    $("select").css("padding", "4px");
    $("select").css({ "border": "1px solid #DDDDDD" });

    //$("input:text").addClass("ui-widget-content ui-corner-all");
    $("input:text").addClass("ui-corner-all");
    $("input:text").css("padding", "4px");
    $("input:text").css({ "border": "1px solid #DDDDDD" });

    $("input:password").addClass("ui-widget-content ui-corner-all");
    $("input:password").css("padding", "4px");

    //$("textarea").addClass("ui-widget-content ui-corner-all");
    $("textarea").addClass("ui-corner-all");
    $("textarea").css("padding", "4px");
    $("textarea").css({ "border": "1px solid #DDDDDD" });

    //    $("input:checkbox").addClass("ui-widget-content ui-corner-all");
    //    $("input:checkbox").css("padding", "4px");

    $(".lblNormal").addClass("ui-widget-content ui-corner-all");
    $(".lblNormal").css("padding", "4px");
    //$(".lblNormal").css("margin-top", "10px");

    //    $("input:file").addClass(" ui-input ui-widget-content ui-corner-all");
    //    $("input:file").css("padding", "4px");

    $(".dvPanel").addClass("ui-widget-content ui-corner-all");
    if ($('#dvContenido:contains("Solicitud")').length > 0) {
        $(".dvPanel").css("padding", "0px 10px");
    }
    else {
        $(".dvPanel").css("padding", "10px");
    }
    $(".dvPanel").css("background-image", "none");

    $("#form1").append($("<div></div>").attr("id", "dvMsgAlerta").css({ "display": "none" }));
    $("#dvMsgAlerta").append($("<span></span>").addClass("ui-icon ui-icon-alert").css({ "float": "left" }));
    $("#dvMsgAlerta").append($("<div></div>").attr("id", "dvContenidoAlerta"));

    if ($(".dvCargando").length == 0)
        $("#form1").append($("<div></div>").attr("id", "dvCargando").addClass("dvCargando"));
    //    <div id="divMsgInformativo" style="display:none;">
    //        <span class="ui-icon ui-icon-alert" style="float:left;"></span>
    //        <div id="dvContenidoInformativo"></div>
    //    </div>

    //    css(raiz('Common/Styles/Uniform/default/css/uniform.default.min.css'));
    ////    script('../../Common/Scripts/jquery-1.7.2.js');
    //    script(raiz('Common/Scripts/jquery.uniform.min.js'));
    //        
    //    $("input:checkbox").uniform();
    //    $("input:radio").uniform();
    //    $("input:file").uniform();

    try {
        if ($(".btnNormal").length > 0) {
            $(".btnNormal").button({});

            //JHERRERA 20161013: Se quitan los íconos para TDP
            if (biQuitarIcono == 1) {
                $(".btnNormal").each(function (i) {
                    if ($(this).text().trim() != "") {
                        $(this).find("img").remove();
                    }
                });
            }
        }
    }
    catch (err)
    { }

    //    $("*").click(function(){
    //        fnRenicioTemporizador();
    //    });

    try {
        window.top.FnPublicReiniciar();
    }
    catch (err)
    { }

    //debugger;
    if ($(this)[0].URL.indexOf("Mantenimiento") > -1) {
        //debugger;
        if ($(this)[0].URL.indexOf("EditSimple=1") > -1 || $(this)[0].URL.indexOf("VistaVer=1") > -1) {
            VistaSimple = true;

            //BLOQUEO DE INPUTS
            $("input[type=text]").prop('disabled', true);
            $("input[type=checkbox]").prop('disabled', true);
            $("textarea").prop('disabled', true);
            $("input[type=file]").prop("disabled", true);
            $("input[type=submit]").prop("disabled", true);
            
            //BLOQUEO DE BOTONES
            let lstBotones = $(".ui-button");
            for (let i = 0; i < lstBotones.length; i++) {
                if (lstBotones[i].id != "btnCerrar") {
                    $(lstBotones[i]).button("option", "disabled", true);
                }
                if (lstBotones[i].id == "btnGuardar") {
                    if ($(this)[0].URL.indexOf("VistaVer=1") > -1) {
                        $(lstBotones[i]).hide();
                    }
                }
            }

            //BLOQUEO DE COMPONENTE KENDO SELECTOR
            let lstSelectKendo = $("select.ui-corner-all");
            for (let i = 0; i < lstSelectKendo.length; i++) {
                $(lstSelectKendo[i]).prop('disabled', true);
            }

            if ($(this)[0].URL.indexOf("EditSimple=1") > -1) {
                let URLWeb = window.location.href.substr(0, window.location.href.indexOf("P_Movil"));
                let URL = URLWeb + "/Common/Page/Adm_Lista.aspx/ObtenerControles";
                let datosURL = $(this)[0].URL.split("&");

                let codEntidad = "-1";
                for (let i = 0; i < datosURL.length; i++) {
                    if (datosURL[i].indexOf("CodEntidad") > -1) {
                        codEntidad = datosURL[i].split("=")[1];
                    }
                }

                $.ajax({
                    type: "POST",
                    url: URL,
                    data: "{'IdEntidad': '" + codEntidad + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        try {
                            let lstControlActivo = result.d;
                            if (lstControlActivo.length > 0) {
                                $("#btnGuardar").button("option", "disabled", false);
                                for (let i = 0; i < lstControlActivo.length; i++) {
                                    if (lstControlActivo[i].TipoControl == "Kendo") {
                                        $("#" + lstControlActivo[i].NombreControl).button("option", "disabled", false);
                                    }
                                    else {
                                        $("#" + lstControlActivo[i].NombreControl).prop('disabled', false);
                                    }
                                }
                            }
                        }
                        catch (e) {

                        }
                    },
                    error: function (xhr, err, thrErr) {
                        MostrarErrorAjax(xhr, err, thrErr);
                    }
                });
            }
        }
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
        while (FinDo == false);
        return;
    }

    var r = $.parseJSON(xhr.responseText);
    if (r == null) {
        return;
    }
    else {
        alerta("" + r.Message, "Problema", null, "danger");
    }
    //    alerta("StackTrace: " + r.StackTrace);
    //    alerta("ExceptionType: " + r.ExceptionType);
    //    alerta("ERROR" + xhr.d);
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

function ValidarFechaFormatoIguales(FechaInicial, FechaFinal, Formato) {
    var vcPorDiaIni = FechaInicial.substring(Formato.indexOf("yy"), Formato.indexOf("yy") + 4) + FechaInicial.substring(Formato.indexOf("mm"), Formato.indexOf("mm") + 2) + FechaInicial.substring(Formato.indexOf("dd"), Formato.indexOf("dd") + 2);
    var vcPorDiaFin = FechaFinal.substring(Formato.indexOf("yy"), Formato.indexOf("yy") + 4) + FechaFinal.substring(Formato.indexOf("mm"), Formato.indexOf("mm") + 2) + FechaFinal.substring(Formato.indexOf("dd"), Formato.indexOf("dd") + 2);

    if (parseInt(vcPorDiaFin) >= parseInt(vcPorDiaIni)) {
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
        if (t == "string") { obj = '"' + obj + '"'; }
        return String(obj);
    }
    else {
        // recurse array or object
        var n, v, json = [], arr = (obj && obj.constructor == Array);
        for (n in obj) {
            v = obj[n]; t = typeof (v);
            if (t == "string") { v = '"' + v + '"'; }
            else if (t == "object" && v !== null) { v = JSON.stringify(v); }
            json.push((arr ? "" : '"' + n + '":') + String(v));
        }
        return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
    }
};

// implemento JSON.parse para navegadores viejos.
// Si es un navegador nuevo, se usa el parse nativo
JSON.parse = JSON.parse || function (str) {
    if (str === "") { str = '""'; }
    eval("var p=" + str + ";");
    return p;
};

function CargarIdioma() {
    var texto = $.cookie(window.location.pathname);
    oPagina = JSON.parse(texto);
    var i;
    for (i in oPagina.Controles) {
        $("#" + oPagina.Controles[i].vcConId).val(oPagina.Controles[i].vcVal).html(oPagina.Controles[i].vcCap).attr("title", oPagina.Controles[i].vcTooTip);
    }
}

function ActivarCombokendo(Control, Altura) {
    try {
        $(Control).removeClass("ui-widget-content ui-corner-all");
        $(Control).css("padding", "0px");
        $(Control).css("margin", "0px");
        $(Control).kendoComboBox({ filter: "contains", suggest: true, height: Altura });

        var combobox = $(Control).data("kendoComboBox");
        $(combobox.input).attr("readonly", "readonly");
    } catch (e) {
    }
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
};

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

var idFocus = '';
function alerta(contenido, Titulo, fnCerrar, tipo, tiempoEspera) {
    try {
        var _tipo = tipo || "success";

        if (contenido.toLowerCase().indexOf("debe ") >= 0 ||
            contenido.toLowerCase().indexOf("no es válido") >= 0 ||
            contenido.toLowerCase().indexOf("no existe datos") >= 0 ||
            contenido.toLowerCase().indexOf("seleccione un") >= 0 ||
            contenido.toLowerCase().indexOf("se encuentra") >= 0
            ){
            _tipo = "warning";
        }

        var _timer = 0;
        if (typeof fnCerrar != 'undefined' && fnCerrar != null) {
            _timer = 0;
        }
        else {
            _timer = 3500;
        }
        if (_tipo == "warning") {
            _timer = 3500;
        }

        if (typeof tiempoEspera != 'undefined' && tiempoEspera != null) {
            _timer = tiempoEspera;
        }

        if (Titulo == null) {
            Titulo = "Mensaje";
        }


        window.top.$.niftyNoty({
            type: _tipo,
            container: "floating",
            title: Titulo,
            message: contenido,
            closeBtn: true,
            focus: true,
            //timer: ((_tipo == 'danger' || (typeof fnCerrar != 'undefined' && fnCerrar != null)) ? 0 : 2500),
            timer: _timer,
            onHide: function () {
                try {
                    fnCerrar();
                } catch (e) {
                }
            }
        });

    } catch (e) {
        alertaVersion31(contenido, Titulo, fnCerrar);
    }
}

function alertaVersion31(contenido, Titulo, fnCerrar) {
    $("#dvContenidoAlerta").html("");
    $("#dvContenidoAlerta").html(contenido);

    if (Titulo == null || Titulo == undefined)
        Titulo = "Mensaje del sistema";

    $("input,select,div,button,textarea").bind("focus", function () {
        idFocus = $(this).attr("id");
        //$(this).unbind("focus");
    });

    $("#dvContenidoAlerta").css("z-index", "100000000");
    $('#dvMsgAlerta').css("z-index", "100000000");
    $('#dvMsgAlerta').dialog({
        title: Titulo,
        modal: true,
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
            $('#dvContenidoAlerta').focus();
        }
    });
    setTimeout(function () { $('#dvMsgAlerta').focus(); }, 300);
}

function alertaURLVersion31(contenido, Titulo, fnRuta) {
    $("#dvContenidoAlerta").html("");
    $("#dvContenidoAlerta").html(contenido);

    if (Titulo == null || Titulo == undefined)
        Titulo = "Mensaje del sistema";

    $("input,select,div,button,textarea").bind("focus", function () {
        idFocus = $(this).attr("id");
        //$(this).unbind("focus");
    });

    $("#dvContenidoAlerta").css("z-index", "100000000");
    $('#dvMsgAlerta').css("z-index", "100000000");
    $('#dvMsgAlerta').dialog({
        title: Titulo,
        modal: true,
        buttons: {
            "Aceptar": function () {
                $(this).dialog("close");
                if (fnRuta != null && fnRuta != undefined)
                    window.location = fnRuta;
            }
        },
        position: { my: "center", at: "center", of: window },
        open: function (event, ui) {
            $('#dvContenidoAlerta').focus();
        }
    });
    setTimeout(function () { window.location = fnRuta; }, 8000);
}

function alertaURL(contenido, Titulo, fnCerrar, tipo, tiempoEspera, fnRuta) {
    try {
        var _tipo = tipo || "success";

        if (contenido.toLowerCase().indexOf("licencias ") >= 0 ||
            contenido.toLowerCase().indexOf("proveedor ") >= 0) {
            _tipo = "warning";
        }

        var _timer = 0;
        if (typeof fnCerrar != 'undefined' && fnCerrar != null) {
            _timer = 0;
        }
        else {
            _timer = 3500;
        }
        if (_tipo == "warning") {
            _timer = 3500;
        }

        if (typeof tiempoEspera != 'undefined' && tiempoEspera != null) {
            _timer = tiempoEspera;
        }

        if (Titulo == null) {
            Titulo = "Mensaje";
        }


        window.top.$.niftyNoty({
            type: _tipo,
            container: "floating",
            title: Titulo,
            message: contenido,
            closeBtn: true,
            focus: true,
            //timer: ((_tipo == 'danger' || (typeof fnCerrar != 'undefined' && fnCerrar != null)) ? 0 : 2500),
            timer: _timer,
            onHide: function () {
                try {
                    fnCerrar();
                } catch (e) {
                }
            }
        });
        setTimeout(function () { window.location = fnRuta; }, 8000);

    } catch (e) {
        alertaURLVersion31(contenido, Titulo, fnRuta);
    }
}


function alertaTabVersion31(contenido, Titulo, fnCerrar) {

    try {
        //var Nametab = window.parent.tabschild[window.parent.tabPrincipal.tabs("option", "selected")].id;
        var tabPrincipal = window.parent.$("#tbPrincipalProducto");
        var indiceTab = tabPrincipal.tabs("option", "selected");
        var tabHijo = tabPrincipal.find("a")[indiceTab].hash;

        $("#dvContenidoAlerta").html("");
        $("#dvContenidoAlerta").html(contenido);

        if (Titulo == null || Titulo == undefined)
            Titulo = "Mensaje del sistema";

        $("input,select,div,button,textarea").bind("focus", function () {
            idFocus = $(this).attr("id");
            //$(this).unbind("focus");
        });

        $("#dvContenidoAlerta").css("z-index", "100000000");
        $('#dvMsgAlerta').css("z-index", "100000000");
        $('#dvMsgAlerta').dialog({
            title: Titulo,
            modal: true,
            buttons: {
                "Aceptar": function () {
                    $(this).dialog("close");
                    $("#" + idFocus).focus();
                    if (fnCerrar != null && fnCerrar != undefined)
                        fnCerrar();
                }
            },
            position: { my: "center", at: "center", of: window },
            closeOnEscape: false,
            open: function (event, ui) {
                $(".ui-dialog-titlebar-close", ui.dialog | ui).hide();
                $('#dvContenidoAlerta').focus();
            }
        });
        setTimeout(function () { $('#dvMsgAlerta').focus(); }, 300);
    } catch (e) {
    }
}



function alertaTab(contenido, Titulo, fnCerrar, tipo, tiempoEspera) {
    try {
        var _tipo = tipo || "success";

        if (contenido.toLowerCase().indexOf("licencias ") >= 0 ||
            contenido.toLowerCase().indexOf("proveedor ") >= 0) {
            _tipo = "warning";
        }

        var _timer = 0;
        if (typeof fnCerrar != 'undefined' && fnCerrar != null) {
            _timer = 0;
        }
        else {
            _timer = 3500;
        }
        if (_tipo == "warning") {
            _timer = 3500;
        }

        if (typeof tiempoEspera != 'undefined' && tiempoEspera != null) {
            _timer = tiempoEspera;
        }

        if (Titulo == null) {
            Titulo = "Mensaje";
        }


        window.top.$.niftyNoty({
            type: _tipo,
            container: "floating",
            title: Titulo,
            message: contenido,
            closeBtn: true,
            focus: true,
            //timer: ((_tipo == 'danger' || (typeof fnCerrar != 'undefined' && fnCerrar != null)) ? 0 : 2500),
            timer: _timer,
            onHide: function () {
                try {
                    fnCerrar();
                } catch (e) {
                }
            }
        });
        //setTimeout(function () { window.location = fnRuta; }, 8000);

    } catch (e) {
        alertaURLVersion31(contenido, Titulo, fnRuta);
    }
}


function alertaTabLicencia(contenido, Titulo, fnCerrar, tipo, tiempoEspera, tbPrincipal, indiceTab) {
    try {
        var _tipo = tipo || "success";

        if (contenido.toLowerCase().indexOf("licencias ") >= 0 ||
            contenido.toLowerCase().indexOf("proveedor ") >= 0) {
            _tipo = "warning";
        }

        var _timer = 0;
        if (typeof fnCerrar != 'undefined' && fnCerrar != null) {
            _timer = 0;
        }
        else {
            _timer = 3500;
        }
        if (_tipo == "warning") {
            _timer = 3500;
        }

        if (typeof tiempoEspera != 'undefined' && tiempoEspera != null) {
            _timer = tiempoEspera;
        }

        if (Titulo == null) {
            Titulo = "Mensaje";
        }


        window.top.$.niftyNoty({
            type: _tipo,
            container: "floating",
            title: Titulo,
            message: contenido,
            closeBtn: true,
            focus: true,
            //timer: ((_tipo == 'danger' || (typeof fnCerrar != 'undefined' && fnCerrar != null)) ? 0 : 2500),
            timer: _timer,
            onHide: function () {
                try {
                    fnCerrar();
                } catch (e) {
                }
            }
        });
        setTimeout(function () { tbPrincipal.tabs('remove', indiceTab); }, tiempoEspera);

    } catch (e) {
        alertaURLVersion31(contenido, Titulo, fnRuta);
    }
}

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

function FechaJSON(fecha) {
    if (fecha.substring(0, 6) == "/Date(") {
        var dt = new Date(parseInt(fecha.substring(6, fecha.length - 2)));
        var dtString = ('0' + dt.getDate()).slice(-2).toString() + "/" + ('0' + (dt.getMonth() + 1)).slice(-2).toString() + "/" + dt.getFullYear();
        return dtString;
    }
    else
        return fecha;
}

function FechaDiferenciaDDMMYYYY(fecha1, fecha2) {
    if (fecha1 == "" || fecha2 == "")
        return null;
    var miFecha1 = new Date(fecha1.split("/")[2], fecha1.split("/")[1], fecha1.split("/")[0]);
    var miFecha2 = new Date(fecha2.split("/")[2], fecha2.split("/")[1], fecha2.split("/")[0]);
    var diferencia = miFecha2.getTime() - miFecha1.getTime();
    var dias = Math.floor(diferencia / (3600000 * 24));
    var segundos = Math.floor(diferencia / 1000);
    var meses = Math.floor(diferencia / (3600000 * 24 * 30));
    return meses;
}

function css(src) {
    document.write('<link rel="stylesheet" href="' + src + '" type="text/css" />');
}

function script(src) {
    document.write('<script src="' + src + '" type="text/javascript" charset="utf-8"></sc' + 'ript>');
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
    while (FinDo == false);

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
                fncSelect;
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
        };
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

function ObtieneFechaGeneral() {
    var ahora = new Date();
    var retorno = '';
    retorno = Right('0' + ahora.getDate(), 2) + '/' + Right('0' + (ahora.getMonth() + 1), 2) + '/' + ahora.getFullYear();
    return retorno;
}
function ObtieneHoraGeneral() {
    var fecha = new Date();
    var hora = fecha.getHours();
    var minuto = fecha.getMinutes();
    var segundo = fecha.getSeconds();

    if (hora < 10) { hora = "0" + hora; }
    if (minuto < 10) { minuto = "0" + minuto; }
    if (segundo < 10) { segundo = "0" + segundo; }
    retorno = hora + ":" + minuto + ":" + segundo;

    return retorno;
}

function ObtieneNumeroAleatorio() {
    //Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;
    var aleatorio = Math.floor(Math.random() * (1000000 - 1 + 1)) + 1;
    return aleatorio;
}

var rutaEmoticon = "../../Common/Images/Chat/emoticones/";
var mapChat = {
    ':putnam:': '<img src="' + rutaEmoticon + 'putnam.gif"/>',
    ':poop:': '<img src="' + rutaEmoticon + 'trucolog-poo.png"/>',
    '3:)': '<img src="' + rutaEmoticon + 'diablo.gif"/>',
    'O:)': '<img src="' + rutaEmoticon + 'angel.gif"/>',
    ':)': '<img src="' + rutaEmoticon + 'feliz.gif"/>',
    '(:': '<img src="' + rutaEmoticon + 'feliz.gif"/>',
    '(=': '<img src="' + rutaEmoticon + 'feliz.gif"/>',
    '=)': '<img src="' + rutaEmoticon + 'feliz.gif"/>',
    ':-)': '<img src="' + rutaEmoticon + 'feliz.gif"/>',
    ':D': '<img src="' + rutaEmoticon + 'muy-feliz.gif"/>',
    ':d': '<img src="' + rutaEmoticon + 'muy-feliz.gif"/>',
    ':-D': '<img src="' + rutaEmoticon + 'muy-feliz.gif"/>',
    ':-d': '<img src="' + rutaEmoticon + 'muy-feliz.gif"/>',
    ';)': '<img src="' + rutaEmoticon + 'guino.gif"/>',
    '(;': '<img src="' + rutaEmoticon + 'guino.gif"/>',
    ';-)': '<img src="' + rutaEmoticon + 'guino.gif"/>',
    '(-;': '<img src="' + rutaEmoticon + 'guino.gif"/>',
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

function fnVerificarEmoticones(Dato) {
    if (Dato == null || Dato == "") {
        return "";
    }

    if (Dato.length < 10) {
        Dato += "&nbsp;";
    }
    Object.keys(mapChat).forEach(function (ico) {
        // escape special characters for regex
        var icoE = ico.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");

        // now replace actual symbols
        Dato = Dato.replace(new RegExp(icoE, 'g'), mapChat[ico]);
    });
    return Dato;
}

function funcionValidacionCero(_idTextBox) {
    var valor = $('#' + _idTextBox).val();
    if (valor != null && valor != "") {
        if (valor.length <= 1) {
            return;
        }
        //console.log(valor, valor.substring(0, 1), valor.substring(1, 2));

        while (valor.substring(0, 1) == "0" && (valor.substring(1, 2) != "." && valor.substring(1, 2) != ",")) {
            valor = valor.substring(1, valor.length);
            $('#' + _idTextBox).val(valor);
        }
        //if (valor.substring(0,1) == "0") {
        //}
    }
}

function ValidarNumeroEnCajaTexto2(_idTextBox, funcionValidacion, oCulturaUsuario, esEntero) {

    $('#' + _idTextBox).unbind("keypress");
    $('#' + _idTextBox).keypress(funcionValidacion);
    $('#' + _idTextBox).keyup(function () {
        funcionValidacionCero(_idTextBox)
    });

    $("#" + _idTextBox).css({ "text-align": "right" });

    $("#" + _idTextBox).focusout(function () {
        //Validar si el formato de numero es correcto...
        var dato = $.trim($("#" + _idTextBox).val());
        if (oCulturaUsuario != null) {
            if (oCulturaUsuario.vcSimSepMil == ",") {
                dato = dato.replace(/,/g, "");
            } else if (oCulturaUsuario.vcSimSepMil == ".") {
                dato = dato.replace(oCulturaUsuario.vcSimSepMil, "");
            }
        }

        if (dato != '') {
            if (!$.isNumeric(dato) && oCulturaUsuario != null && oCulturaUsuario.vcSimDec == ".") {
                alerta("Debe ingresar un valor correcto", "Validación",
               function () { return fnFocusCajaTexto_focusout(_idTextBox); });
            }
            else if (oCulturaUsuario != null) {
                $("#" + _idTextBox).val(FormatoNumero(dato, oCulturaUsuario, esEntero));
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
        if (oCulturaUsuario != null) {
            if (oCulturaUsuario.vcSimSepMil == ",") {
                dato = dato.replace(/,/g, "");
            }
        }

        if (dato != '') {
            if (!$.isNumeric(parseFloat(dato.replace(/\s/g, "").replace(",", ".")))) {
                alerta("Debe ingresar un valor correcto", "Validación",
               function () { return fnFocusCajaTexto_focusout(_idTextBox); });
            }
                //else if (!/^([0-9])*$/.test(dato)) {
                //    //alerta("Debe ingresar un valor correcto", "Validación",
                //   function () { return fnFocusCajaTexto_focusout(_idTextBox); });
                //}
            else if (oCulturaUsuario != null) {
                $("#" + _idTextBox).val(FormatoNumero(dato, oCulturaUsuario, esEntero));
            }
        }


    });

}

function ValidarTextoConfiguracionRegional(_idTextBox, funcionValidacion, oCulturaUsuario, esEntero) {
    $('#' + _idTextBox).unbind("keypress");
    $('#' + _idTextBox).keypress(funcionValidacion);
    $("#" + _idTextBox).css({ "text-align": "right" });
    $("#" + _idTextBox).focusout(function () {
        var dato = $.trim($("#" + _idTextBox).val());
        if (oCulturaUsuario != null) {
            if (oCulturaUsuario.vcSimSepMil == ",") {
                dato = dato.replace(/,/g, "");
            }
        }

        if (dato == '') {
            //if (!$.isNumeric(dato)) {
            alerta("Debe ingresar un valor correcto", "Validación",
               function () { return fnFocusCajaTexto_focusout(_idTextBox); });
        }
        else if (oCulturaUsuario != null) {
            $("#" + _idTextBox).val(FormatoNumero(dato, oCulturaUsuario, esEntero));
        }
        //}
    });

}

function fnFocusCajaTexto_focusout(_idTextBox) {
    $("#" + _idTextBox).focus();
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

function CargarEstilosControles() {
    $("select").addClass("ui-corner-all");
    $("select").css("padding", "4px");
    $("select").css({ "border": "1px solid #DDDDDD" });

    //$("input:text").addClass("ui-widget-content ui-corner-all");
    $("input:text").addClass("ui-corner-all");
    $("input:text").css("padding", "4px");
    $("input:text").css({ "border": "1px solid #DDDDDD" });

    $("input:password").addClass("ui-widget-content ui-corner-all");
    $("input:password").css("padding", "4px");

    //$("textarea").addClass("ui-widget-content ui-corner-all");
    $("textarea").addClass("ui-corner-all");
    $("textarea").css("padding", "4px");
    $("textarea").css({ "border": "1px solid #DDDDDD" });
    $("textarea").css({ "resize": "none" });

    //    $("input:checkbox").addClass("ui-widget-content ui-corner-all");
    //    $("input:checkbox").css("padding", "4px");

    $(".lblNormal").addClass("ui-widget-content ui-corner-all");
    $(".lblNormal").css("padding", "4px");
}

function LimpiarDatoString(dato) {
    if (dato == null)
        return '';
    else
        return dato.replace(/'/g, "").replace(/"/g, "").replace(/\\/g, "");
}

function Date2Ansi(Fecha) {
    try {
        return Fecha.getFullYear().toString() + FormatoDigitos(Fecha.getMonth() + 1, 2) + FormatoDigitos(Fecha.getDate(), 2) + " " +
               FormatoDigitos(Fecha.getHours(), 2) + ":" + FormatoDigitos(Fecha.getMinutes(), 2) + ":" + FormatoDigitos(Fecha.getSeconds(), 2);
    }
    catch (e) {
        return "";
    }
}

function Date3Ansi(Fecha) {
    try {
        return Fecha.getFullYear().toString() + FormatoDigitos(Fecha.getMonth() + 1, 2) + FormatoDigitos(Fecha.getDate(), 2);
    }
    catch (e) {
        return "";
    }
}

function FormatoDigitos(Numero, Digitos) {
    try {
        //        if (Numero.toString().length >= Digitos)
        //            return Numero;
        while (Numero.toString().length < Digitos) {
            Numero = "0" + Numero.toString();
        }
        return Numero.toString();
    } catch (e) {
        return Numero.toString();
    }
}

function ValidarNoEspacio_focusout() {
    $(this).val($(this).val().replace(/ /g, "").replace(/'/g, "").replace(/"/g, "").replace(/\\/g, ""));
}

function fnCambiarTituloTabUI(NombreTabPrincipal, indiceTab, ValorTitulo) {
    $('#' + NombreTabPrincipal + ' ul:first li:eq(' + indiceTab + ') a').text(ValorTitulo);
}

function DateDiff(fromDate, toDate, interval) {
    /*
    * DateFormat month/day/year hh:mm:ss
    * ex.
    * datediff('01/01/2011 12:00:00','01/01/2011 13:30:00','seconds');
    */
    var second = 1000, minute = second * 60, hour = minute * 60, day = hour * 24, week = day * 7;
    fromDate = new Date(fromDate);
    toDate = new Date(toDate);
    var timediff = toDate - fromDate;
    if (isNaN(timediff)) return NaN;
    switch (interval) {
        case "years": return toDate.getFullYear() - fromDate.getFullYear();
        case "months": return (
                        (toDate.getFullYear() * 12 + toDate.getMonth())
                        -
                        (fromDate.getFullYear() * 12 + fromDate.getMonth())
                    );
        case "weeks": return Math.floor(timediff / week);
        case "days": return Math.floor(timediff / day);
        case "hours": return Math.floor(timediff / hour);
        case "minutes": return Math.floor(timediff / minute);
        case "seconds": return Math.floor(timediff / second);
        default: return undefined;
    }
}

function validaFechaDDMMAAAA(fecha) {
    var dtCh = "/";
    var minYear = 1900;
    var maxYear = 2100;
    function isInteger(s) {
        var i;
        for (i = 0; i < s.length; i++) {
            var c = s.charAt(i);
            if (((c < "0") || (c > "9"))) return false;
        }
        return true;
    }
    function stripCharsInBag(s, bag) {
        var i;
        var returnString = "";
        for (i = 0; i < s.length; i++) {
            var c = s.charAt(i);
            if (bag.indexOf(c) == -1) returnString += c;
        }
        return returnString;
    }
    function daysInFebruary(year) {
        return (((year % 4 == 0) && ((!(year % 100 == 0)) || (year % 400 == 0))) ? 29 : 28);
    }
    function DaysArray(n) {
        var i = 1;
        for (i = 1; i <= n; i++) {
            this[i] = 31;
            if (i == 4 || i == 6 || i == 9 || i == 11) { this[i] = 30; }
            if (i == 2) { this[i] = 29; }
        }
        return this;
    }
    function isDate(dtStr) {
        var daysInMonth = DaysArray(12);
        var pos1 = dtStr.indexOf(dtCh);
        var pos2 = dtStr.indexOf(dtCh, pos1 + 1);
        var strDay = dtStr.substring(0, pos1);
        var strMonth = dtStr.substring(pos1 + 1, pos2);
        var strYear = dtStr.substring(pos2 + 1);
        strYr = strYear;
        if (strDay.charAt(0) == "0" && strDay.length > 1) strDay = strDay.substring(1);
        if (strMonth.charAt(0) == "0" && strMonth.length > 1) strMonth = strMonth.substring(1);
        var i = 1;
        for (i = 1; i <= 3; i++) {
            if (strYr.charAt(0) == "0" && strYr.length > 1) strYr = strYr.substring(1);
        }
        month = parseInt(strMonth);
        day = parseInt(strDay);
        year = parseInt(strYr);
        if (pos1 == -1 || pos2 == -1) {
            return false;
        }
        if (strMonth.length < 1 || month < 1 || month > 12) {
            return false;
        }
        if (strDay.length < 1 || day < 1 || day > 31 || (month == 2 && day > daysInFebruary(year)) || day > daysInMonth[month]) {
            return false;
        }
        if (strYear.length != 4 || year == 0 || year < minYear || year > maxYear) {
            return false;
        }
        if (dtStr.indexOf(dtCh, pos2 + 1) != -1 || isInteger(stripCharsInBag(dtStr, dtCh)) == false) {
            return false;
        }
        return true;
    }
    if (isDate(fecha)) {
        return true;
    } else {
        return false;
    }
}

//function FormatoNumero(numero, oCultura, esEntero) {
//    //numero = DevuelveNumeroSinFormato(numero, oCultura, esEntero);
//    if (numero != undefined && numero != "") {
//        if (esEntero != null && esEntero == true && numero.length > 1) {
//            numero = numero.toString().replace(/^0+/, '');
//        }
//        numero = parseFloat(numero).toFixed(oCultura.dcNumDec);
//        var n = numero.toString().split(oCultura.vcSimDec);
//        var enteros = n[0].replace(/\B(?=(\d{3})+(?!\d))/g, oCultura.vcSimSepMil);
//        if (esEntero != null && esEntero == true) {
//            return enteros;
//        } else {
//            return (enteros + oCultura.vcSimDec + n[1]);
//        }
//    } else {
//        return (0).toFixed(oCultura.dcNumDec);
//    }
//}

function FormatoNumero(numero, oCultura, esEntero) {
    var vcSepMil = '';
    var enteros = 0;
    var numformateado=false;

    /*Edgar Garcia 14/07/2022*/
    //if (oCultura.vcCodCul.toString().toLowerCase() == 'es-co' || oCultura.vcCodCul.toString().toLowerCase() == 'es-bo'){
    if (oCultura.vcCodCul.toString().toLowerCase() != 'es-pe') {
        if (numero != undefined && numero != "") {
            if (esEntero != null && esEntero == true && numero.length > 1) {
                numero = numero.toString().replace(/^0+/, '');
            }
            if (numero.indexOf(oCultura.vcSimSepMil) > -1 && numero.indexOf(oCultura.vcSimDec) > -1 && oCultura.dcNumDec > 0) {
            
                numformateado = true;
            }
            vcSepMil = oCultura.vcSimSepMil;
            if (vcSepMil.toString() == '.' && numformateado == true) {
                numero = numero.toString().replace(/[.*+?^${}()|[\]\\]/g, '');
            }
            //numero = ParseFloatMultiPais_2(numero.toString(), oCultura);
            //numero = numero.toString().replace(oCultura.vcSimSepMil, '');
            //numero = parseFloat(numero).toFixed(oCultura.dcNumDec).replace('.', oCultura.vcSimDec);        
            numero = numero.toString().replace('.', oCultura.vcSimDec);
            var n = numero.toString().split(oCultura.vcSimDec);
            enteros = n[0].replace(/\B(?=(\d{3})+(?!\d))/g, oCultura.vcSimSepMil);
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
            enteros = n[0].replace(/\B(?=(\d{3})+(?!\d))/g, oCultura.vcSimSepMil);

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

function ObtenerDecimalesMultiPais(inDec, inNumDec, inTotalDec) {

    if (inDec >= inNumDec) {
        if (inTotalDec.toString() == "0") {
            inTotalDec = inTotalDec.toString();
            while (inTotalDec.length < inNumDec)
                inTotalDec = inTotalDec + "0";
        } else {
            inTotalDec = String(inTotalDec).substring(0, inNumDec);
        }

    } else {
        inTotalDec = inTotalDec.toString();
        while (inTotalDec.length < inNumDec)
            inTotalDec = inTotalDec + "0";
    }
    return inTotalDec;
}

function ParseFloatMultiPais(vcMonto, oCultura) {
    if (oCultura.vcSimDec === ',') {
        vcMonto = vcMonto.toString().replace(/[.*+?^${}()|[\]\\]/g, "");
        vcMonto = vcMonto.toString().replace(/\,/g, ".");
    } else {
        vcMonto = vcMonto.toString().replace(/[,*+?^${}()|[\]\\]/g, "");
        //vcMonto = vcMonto.toString().replace(/,/g, ".");
    }

    return vcMonto;
}

function ParseFloatMultiPais_2(vcMonto, vcSimDec) {
    if (vcSimDec === ',') {
        vcMonto = vcMonto.toString().replace(/[.*+?^${}()|[\]\\]/g, "");
        vcMonto = vcMonto.toString().replace(/\,/g, ".");
    }
    else {
        vcMonto = vcMonto.toString().replace(/[,*+?^${}()|[\]\\]/g, "");
    }
    return vcMonto;
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

function DevuelveNumeroSinFormato2(numero, oCultura, esEntero) {
    if (typeof oCultura != 'undefined') {
        var varRepSepMil = oCultura.vcSimSepMil;
        var varRepSimMon = new RegExp(oCultura.Moneda.vcSimMon, 'g');
        if (esEntero != null && esEntero == true) {
            numero = $.trim(numero.toString().replace(varRepSepMil, '').replace(varRepSimMon, ''));
        } else {
            var parteEntero = '';
            var parteDecimal = '';
            if (numero.toString().indexOf(oCultura.vcSimDec) != -1) { //agregado 19-01-2015 wapumayta
                parteEntero = numero.toString().split(oCultura.vcSimDec)[0].replace(varRepSepMil, "");
                parteDecimal = numero.toString().split(oCultura.vcSimDec)[1];
            } else {
                parteEntero = numero;
                parteDecimal = '0';
            }
            numero = parteEntero + '.' + parteDecimal;
        }
    }
    else {
        var varRepSepMil = new RegExp(',', 'g');
        var varRepSimMon = new RegExp('S/.', 'g');
        if (esEntero != null && esEntero == true) {
            numero = $.trim(numero.toString().replace(varRepSepMil, '').replace(varRepSimMon, ''));
        } else {
            var parteEntero = '';
            var parteDecimal = '';
            if (numero.toString().indexOf(',') != -1) { //agregado 19-01-2015 wapumayta
                parteEntero = numero.toString().split(',')[0].replace(varRepSepMil, '');
                parteDecimal = numero.toString().split(',')[1];
            } else {
                parteEntero = numero;
                parteDecimal = '0';
            }
            numero = parteEntero + '.' + parteDecimal;
        }
    }
    return numero;
}

/*
function DevuelveFormatoNumero(oCultura)
{
var strFormato = "";
strFormato = "###" + oCultura.vcSimSepMil + "##0" + oCultura.vcSimDec;
for (var i = 0; i <= oCultura.dcNumDec - 1; i++) {
strFormato = strFormato + "0";
}

return strFormato;
}
*/

function scroolIntoView(id, duration) {
    var duration = (duration) ? duration : "slow";
    jQuery("html,body").animate({ scrollTop: jQuery(id).offset().top }, duration);
    return false;
}

function fnRenicioTemporizador() {
    try {
        window.top.FnPublicReiniciar();
    } catch (e) {

    }
}

function IndexOfIe(Arreglo, item, i) {
    if (Arreglo == null) return -1;

    var array = Object(Arreglo), length = array.length >>> 0;
    if (length === 0) return -1;

    i = Number(i);
    if (isNaN(i)) {
        i = 0;
    } else if (i !== 0 && isFinite(i)) {
        i = (i > 0 ? 1 : -1) * Math.floor(Math.abs(i));
    }

    if (i > length) return -1;

    var k = i >= 0 ? i : Math.max(length - Math.abs(i), 0);
    for (k; k < length; k++)
        if (k in array && array[k] === item) return k;
    return -1;
}

function esIe8() {
    if ($.browser.msie && $.browser.version <= 8) {
        //alert(8);
        return true;
    }
    else {
        //alert(-1);
        return false;
    }
}

if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (elt /*, from*/) {
        var len = this.length >>> 0;

        var from = Number(arguments[1]) || 0;
        from = (from < 0) ? Math.ceil(from) : Math.floor(from);
        if (from < 0)
            from += len;

        for (from; from < len; from++) {
            if (from in this && this[from] === elt)
                return from;
        }
        return -1;
    };
}


function ObtenerNombreMes(iMes) {
    iMes = parseInt(iMes);
    var _return = "";
    switch (iMes) {
        case 1: _return = "Ene"; break;
        case 2: _return = "Feb"; break;
        case 3: _return = "Mar"; break;
        case 4: _return = "Abr"; break;
        case 5: _return = "May"; break;
        case 6: _return = "Jun"; break;
        case 7: _return = "Jul"; break;
        case 8: _return = "Ago"; break;
        case 9: _return = "Set"; break;
        case 10: _return = "Oct"; break;
        case 11: _return = "Nov"; break;
        case 12: _return = "Dic"; break;
        default: _return = "Desconocido";
    }
    return _return;
}

Date.prototype.addMonths = function (value) {
    var _fecha = new Date();
    _fecha.setDate(1);
    var _Nuevafecha = new Date(new Date(_fecha).setMonth(this.getMonth() + value));
    return _Nuevafecha;
};
Date.prototype.Ansi = function () {
    var year, month, day;
    year = String(this.getFullYear());
    month = String(this.getMonth() + 1);
    if (month.length == 1) {
        month = "0" + month;
    }
    day = String(this.getDate());
    if (day.length == 1) {
        day = "0" + day;
    }
    return year + month + day;
};
Date.prototype.AnsiUltimoDiaMes = function () {
    var year, month, day;
    var d = new Date(this.getFullYear(), this.getMonth() + 1, 0);
    year = String(d.getFullYear());
    month = String(d.getMonth() + 1);
    if (month.length == 1) {
        month = "0" + month;
    }
    day = String(d.getDate());
    if (day.length == 1) {
        day = "0" + day;
    }
    return year + month + day;
};
Date.prototype.FechaTexto = function () {
    var year, month;
    year = String(this.getFullYear());
    month = String(this.getMonth() + 1);
    return ObtenerNombreMes(month) + '-' + year;
};








function RecalcularColumnasGrilla(gridName, sinEspacioAdicional) {

    var columnNames = $("#" + gridName).jqGrid('getGridParam', 'colModel');
    var thisWidth, newWidth, columnsWidth = 0, otherColumnsWidth = 0, numColumnas = 0;

    if (columnNames != undefined) {
        // Loop through Cols
        var itm;
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
            var itm;
            for (itm = 0, itmCount = columnNames.length; itm < itmCount; itm++) {
                if (columnNames[itm].name != "rn" && columnNames[itm].name != "cb" && columnNames[itm].hidden == false && columnNames[itm].resizable != false) {//Columna de rownumbers o multiselect
                    thisWidth = columnNames[itm].width;
                    newWidth = thisWidth + ((thisWidth * gridUnusedWidth) / columnsWidth) - 5;

                    $('#' + gridName + ' .jqgfirstrow td:eq(' + itm + '), #' + gridName + '_' + columnNames[itm].name).width(newWidth).css('min-width', newWidth);
                }
            }
        } else {
            var itm;
            for (itm = 0, itmCount = columnNames.length; itm < itmCount; itm++) {
                if (columnNames[itm].name != "rn" && columnNames[itm].name != "cb" && columnNames[itm].hidden == false && columnNames[itm].resizable != false) {//Columna de rownumbers o multiselect
                    newWidth = columnNames[itm].width + 5;

                    $('#' + gridName + ' .jqgfirstrow td:eq(' + itm + '), #' + gridName + '_' + columnNames[itm].name).width(newWidth).css('min-width', newWidth);
                }
            }
        }
    }
}

function ActualizarPageSizeGrillas(inFilas) {
    ArrayPaginacion.push(inFilas);
    ArrayPaginacion.push(inFilas + inFilas);
    ArrayPaginacion.push(inFilas + inFilas + inFilas);

    $(".ui-pg-selbox").children().remove();

    if (inFilas <= 0) {
        $(".ui-pg-selbox").append('<option value=1>1</option>');
    }
    else {
        var k;
        for (k = 1; k <= 5; k++) {
            $(".ui-pg-selbox").append('<option value=' + inFilas * k + '>' + inFilas * k + '</option>');
        }
    }

    if (inFilas <= 0) { inFilas = 1; }

    $(".ui-pg-selbox").val(inFilas);
    $(".ui-pg-selbox").change();
}

function ActualizarPageSizeGrillasTab(gridName, inFilas) {
    ArrayPaginacion.push(inFilas);
    ArrayPaginacion.push(inFilas + inFilas);
    ArrayPaginacion.push(inFilas + inFilas + inFilas);

    $("#" + gridName).closest('.ui-jqgrid').find('.ui-pg-selbox').children().remove();
    if (inFilas <= 0) {
        $("#" + gridName).closest('.ui-jqgrid').find('.ui-pg-selbox').append('<option value=1>1</option>');
    }
    else {
        var k;
        for (k = 1; k <= 5; k++) {
            $("#" + gridName).closest('.ui-jqgrid').find('.ui-pg-selbox').append('<option value=' + inFilas * k + '>' + inFilas * k + '</option>');
        }
    }

    if (inFilas <= 0) { inFilas = 1; }

    $("#" + gridName).closest('.ui-jqgrid').find('.ui-pg-selbox').val(inFilas);
    $("#" + gridName).closest('.ui-jqgrid').find('.ui-pg-selbox').change();
}










function JqGrid_FormatoNumero(Valor, decimal) {
    //var fo = { prefix: '($', suffix: ')', thousandsSeparator: '.', decimalSeparator: ',' };
    var fo = { thousandsSeparator: ',' };
    if (decimal == true) {
        fo = { thousandsSeparator: ',', decimalSeparator: '.', decimalPlaces: 2 };
    }
    var ValorFormateado = $.fmatter.util.NumberFormat(Valor, fo);
    return ValorFormateado;
}
function JqGrid_ExportarExcel(NombreGrilla, NombreArchivo, AutoFilter) {
    var Columnas = jQuery("#" + NombreGrilla).jqGrid("getGridParam", "colModel");
    var Registros = $('#' + NombreGrilla).getGridParam('data');
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
    var iTotColumnas = 0;
    for (var i = 0; i < Columnas.length; i++) {
        if (Columnas[i].hidden == false) {
            if (Columnas[i].name != "rn" && Columnas[i].name != "cb" && $.trim(Columnas[i].label) != "") {
                iTotColumnas++;
                ExcelXML += '<Column ss:Width="' + Columnas[i].width + '"/>';
            }
        }
    }
    ExcelXML += '<Row>';
    for (var j = 0; j < Columnas.length; j++) {
        if (Columnas[j].hidden == false) {
            if (Columnas[j].name != "rn" && Columnas[j].name != "cb" && $.trim(Columnas[j].label) != "") {
                ExcelXML += '<Cell ss:StyleID="xls-style-0"><Data ss:Type="String">' + Columnas[j].label + '</Data></Cell>';
            }
        }
    }
    ExcelXML += '</Row>';

    var Estilo = "xls-style-1";
    var Alineacion = "I";
    for (var i = 0; i < Registros.length; i++) {
        if (Estilo == "xls-style-1")
            Estilo = "xls-style-2";
        else
            Estilo = "xls-style-1";

        ExcelXML += '<Row>';
        for (var j = 0; j < Columnas.length; j++) {
            if (Columnas[j].hidden == false) {
                if (Columnas[j].name != "rn" && Columnas[j].name != "cb" && $.trim(Columnas[j].label) != "") {
                    Alineacion = "-" + Columnas[j].align.substring(0, 1).toUpperCase();
                    ExcelXML += '<Cell ss:StyleID="' + Estilo + Alineacion + '"><Data ss:Type="String">' + Registros[i][Columnas[j].name] + '</Data></Cell>';
                }
            }
        }
        ExcelXML += '</Row>';
    }

    ExcelXML += '</Table>';
    if (AutoFilter) {
        ExcelXML += '<AutoFilter x:Range="R1C1:R1C' + iTotColumnas + '" xmlns="urn:schemas-microsoft-com:office:excel"></AutoFilter>'
    }
    ExcelXML += '</Worksheet></Workbook>';

    var blob = new Blob([ExcelXML]);
    //debugger;
    if (Object.hasOwnProperty.call(window, "ActiveXObject") && !window.ActiveXObject) {
        navigator.msSaveBlob(blob, NombreArchivo + ".xls");
    }
    else if (navigator.appName == "Microsoft Internet Explorer") {
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



    //if (navigator.appName == "Microsoft Internet Explorer") {
    //    navigator.msSaveBlob(blob, NombreArchivo + ".xls");
    //}
    //else {
    //    var a = window.document.createElement("a");
    //    a.href = window.URL.createObjectURL(blob, { type: "text/csv" });
    //    a.download = NombreArchivo + ".xls";
    //    document.body.appendChild(a);
    //    a.click();
    //    document.body.removeChild(a);
    //}

}






function DeleteFileMantenimiento(RutaUploadHandler, file, vcNomCon) {

    var IdDominio = "-1";
    try {
        IdDominio = window.top.$("#hdfCodigoDominio").val();
    } catch (e) {
        //alert("Error: " + e);
    }

    $.ajax({
        url: RutaUploadHandler + "UploadHandlerMantenimiento.ashx?file=" + file + "&accion=delete&dominio=" + IdDominio,
        type: "GET",
        cache: false,
        async: true,
        success: function (html) {
            $('#file_' + vcNomCon).html("");
            $("#upl_" + vcNomCon).show();
        }
    });
}


function Mantenimiento_Mostrar_VARBINARY(RutaUploadHandler, RutaRaiz) {
    $(".VARBINARY").each(function (i) {
        var vcNomCon = $(this).attr("obj");
        var vcTipExt = $(this).attr("vcTipExt");
        var IdDominio = "-1";
        try {
            IdDominio = window.top.$("#hdfCodigoDominio").val();
        } catch (e) {
            //alert("Error: " + e);
        }

        if ($(this).hasClass("imgButton")) {

            new AjaxUpload('#upl_' + vcNomCon, {
                action: RutaUploadHandler + 'UploadHandlerMantenimiento.ashx?dominio=' + IdDominio,
                accept: vcTipExt,
                onComplete: function (file, response) {

                    if (response != "" && response != '<pre style="word-wrap: break-word; white-space: pre-wrap;"></pre>') {
                        var vcHtml = "<div class='imgBtn' style='margin-top:1px; height:21px; margin-left: 2px;' ><img src='" + RutaRaiz + "Common/Images/remove.png' onclick=\"DeleteFileMantenimiento('" + RutaUploadHandler + "','" + response + "','" + vcNomCon + "')\"/>";
                        vcHtml += "<span style='margin-left:5px;' id='span_" + vcNomCon + "' style='text-decoration:underline;' nombre='" + response + "'>" + response + "</span> </div>";

                        $(vcHtml).appendTo('#file_' + vcNomCon);

                        $("#upl_" + vcNomCon).hide();
                    } else {
                        alerta('El archivo supera el tamaño máximo permitido (10 MB)');
                    }
                },
                onSubmit: function (file, ext) {
                    var lstExt = vcTipExt.split(",");
                    var biExt = "0";
                    var i = 0;
                    for (i = 0; i < lstExt.length; i++) {
                        if (ext.toLowerCase() == lstExt[i].toLowerCase())
                            biExt = "1";
                    }

                    if (biExt == "0") {
                        alerta('Formato inválido. Los formatos permitidos son: ' + vcTipExt);
                        return false;
                    }
                }
            });
        }

        try {
            $("#span_" + vcNomCon).live("click", function () {
                var archivo = $(this).attr("nombre");
                fnDescargarArchivoMantenimiento(archivo, 1);
            });
        } catch (e) {
            //alert('e1');
        }
        try {
            $("#span_" + vcNomCon).on("click", function () {
                var archivo = $(this).attr("nombre");
                fnDescargarArchivoMantenimiento(archivo, 1);
            });
        } catch (e) {
            //alert('e2');
        }

    });

}

var ultimaDescarga = new Date();
function fnDescargarArchivoMantenimiento(NomArc, tipo) {
    const descargaActual = new Date();
    if (descargaActual - ultimaDescarga < 2500) {
        return
    }
    ultimaDescarga = descargaActual;

    var IdDominio = "";
    try {
        var Codigo = window.top.$("#hdfCodigoDominio").val();
        if (Codigo != "") {
            IdDominio = "/" + window.top.$("#hdfCodigoDominio").val();
        }
    } catch (e) {
        //alert("Error: " + e);
    }
    if (tipo == 1) {
        var filePath = "P_Movil/Administrar/Temporal/Mantenimiento" + IdDominio + "/" + NomArc;
        SaveToDisk_Mantenimiento(filePath, NomArc);
    }
}

function SaveToDisk_Mantenimiento(fileURL, fileName) {
    // for non-IE
    if (!window.ActiveXObject) {
        var save = document.createElement('a');
        save.href = raiz(fileURL);
        save.target = '_blank';
        save.download = fileName || fileURL;
        var evt = document.createEvent('MouseEvents');
        evt.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0,
            false, false, false, false, 0, null);
        save.dispatchEvent(evt);
        (window.URL || window.webkitURL).revokeObjectURL(save.href);
    }

        // for IE
    else if (!!window.ActiveXObject && document.execCommand) {
        //alert(fileURL + "\n" + raiz(fileURL));
        var _window = window.open(raiz(fileURL), "_blank");
        _window.document.close();
        _window.document.execCommand('SaveAs', true, fileName || fileURL);
        _window.close();
    }
}


//**********************************************************************
//AES: Advanced Encryption Standard  
//_tipo:1 (Encriptar); _tipo_2(Desencriptar)
function GenerarAES(_texto, _tipo) {
    var _return = "";
    var key = CryptoJS.enc.Utf8.parse('v1su@ls0ftv1su@l');
    var fecha = new Date();
    var fechaansi = Date3Ansi(fecha);
    var ivfecha = fechaansi + fechaansi;
    var iv = CryptoJS.enc.Utf8.parse(ivfecha);
    if (_tipo == 1) {
        var encrypted = CryptoJS.AES.encrypt(
          _texto,
          key,
          {
              iv: iv,
              mode: CryptoJS.mode.CBC,
              padding: CryptoJS.pad.Pkcs7
          }
        );
        _return = encrypted.toString();
    }
    else {
        var decrypted = CryptoJS.AES.decrypt(
          _texto,
          key,
          {
              iv: iv,
              mode: CryptoJS.mode.CBC,
              padding: CryptoJS.pad.Pkcs7
          }
        );
        _return = decrypted.toString(CryptoJS.enc.Utf8);
    }
    return _return;
}

function kFormatter(num, oCultura, esEntero) {
    return num > 999 ? FormatoNumero((num / 1000).toFixed(1), oCultura, esEntero) + 'K' : FormatoNumero(num, oCultura, esEntero)
}


window.GUID = (function () {
    function GUID() {
        do {
            var guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        } while (!GUID.register(guid));
        return guid;
    };
    GUID.version = "1.4.2";
    GUID.create = function () {
        return GUID();
    };
    GUID._list = {};
    Object.defineProperty(GUID, "list", {
        get: function () {
            var list = [];
            for (var k in GUID._list) {
                list.push(k);
            }
            return list;
        },
        set: function (newList) {
            GUID._list = {};
            for (var i = 0; i < newList.length; i++) {
                GUID._list[newList[i]] = 1;
            }
        }
    });
    GUID.exists = function (guid) {
        return !!(GUID._list[guid]);
    };
    GUID.register = function (guid) {
        if (GUID.exists(guid)) {
            return false;
        } else {
            GUID._list[guid] = 1;
            return true;
        }
    };
    return GUID;
})();


function getAjax(_url, _data) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST",
            url: _url,
            data: _data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                resolve(data);
            },
            error: function (xhr, err, thrErr) {
                reject(xhr, err, thrErr);
            }
        });
    });
}

function AgregarMensajeValidacionContrasenia(elemento, AgregarTR, LongTR, PosicionMenTR) {
    const dvBox = document.createElement("div");
    dvBox.id = "dv-" + elemento.id.toString();
    dvBox.style.width = elemento.style.width;

    const lblBox = document.createElement("label");
    lblBox.id = "msj-" + elemento.id.toString();
    lblBox.style.display = "none";
    lblBox.style.color = "red";
    lblBox.innerText = "No está permitido los siguientes valores: " + SimboloNoPermitidoContraseniaUsu;

    dvBox.appendChild(lblBox);

    if (AgregarTR) {
        let cont = 1;
        let tr = document.createElement("tr");
        tr.id = "tr-" + dvBox.id;
        while (cont <= LongTR) {
            let td = document.createElement("td");
            if (cont == PosicionMenTR) {
                td.appendChild(dvBox);
            }
            tr.appendChild(td);
            cont++;
        }
        if (elemento.parentNode.nextSibling) {
            elemento.parentNode.parentNode.parentNode.insertBefore(tr, elemento.parentNode.parentNode.nextSibling);
        } else {
            elemento.parentNode.parentNode.appendChild(tr);
        }
    }
    else {
        if (elemento.nextSibling) {
            elemento.parentNode.insertBefore(dvBox, elemento.nextSibling);
        } else {
            elemento.parentNode.appendChild(dvBox);
        }
    }

    $(elemento).keydown(function (e) {
        //debugger;
        var lblMensaje = "msj-" + elemento.id.toString();
        console.log(String.fromCharCode(e.keyCode));
        if ((SimboloNoPermitidoContraseniaUsu.indexOf(String.fromCharCode(e.keyCode)) > -1) || (SimboloNoPermitidoContraseniaUsu.indexOf(e.key) > -1)) {
            document.getElementById(lblMensaje).style.display = "block";
            e.preventDefault();
            return false;
        }
        document.getElementById(lblMensaje).style.display = "none";
    });
}
