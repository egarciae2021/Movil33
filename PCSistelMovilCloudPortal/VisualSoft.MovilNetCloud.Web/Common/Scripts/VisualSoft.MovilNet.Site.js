
var BrowserDetect = {
    init: function () {
        this.browser = this.searchString(this.dataBrowser) || "Other";
        this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "Unknown";
    },
    searchString: function (data) {
        for (var i = 0; i < data.length; i++) {
            var dataString = data[i].string;
            this.versionSearchString = data[i].subString;

            if (dataString.indexOf(data[i].subString) !== -1) {
                return data[i].identity;
            }
        }
    },
    searchVersion: function (dataString) {
        var index = dataString.indexOf(this.versionSearchString);
        if (index === -1) {
            return;
        }

        var rv = dataString.indexOf("rv:");
        if (this.versionSearchString === "Trident" && rv !== -1) {
            return parseFloat(dataString.substring(rv + 3));
        } else {
            return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
        }
    },

    dataBrowser: [
        { string: navigator.userAgent, subString: "Edge", identity: "MS Edge" },
        { string: navigator.userAgent, subString: "Chrome", identity: "Chrome" },
        { string: navigator.userAgent, subString: "MSIE", identity: "Explorer" },
        { string: navigator.userAgent, subString: "Trident", identity: "Explorer" },
        { string: navigator.userAgent, subString: "Firefox", identity: "Firefox" },
        { string: navigator.userAgent, subString: "Safari", identity: "Safari" },
        { string: navigator.userAgent, subString: "Opera", identity: "Opera" }
    ]

};

$(function () {

    $(document).ajaxStart(function (e) {
        $("#dvWaiting").show();
    });
    $(document).ajaxStop(function (e) {
        $("#dvWaiting").hide();
    });

    BrowserDetect.init();
});



function miAlerta(prCabecera, prDescripcion, prIcono, prColor) {
    window.top.$.niftyNoty({
        type: "warning",
        container: "floating",
        title: prCabecera,
        message: prDescripcion,
        closeBtn: true,
        focus: true,
        //timer: ((_tipo == 'danger' || (typeof fnCerrar != 'undefined' && fnCerrar != null)) ? 0 : 2500),
        timer: 3500,
        onHide: function () {
            try {
                fnCerrar();
            } catch (e) {
            }
        }
    });
}

function miAlerta_original(prCabecera, prDescripcion, prIcono, prColor) {
    if (BrowserDetect.browser == "Explorer" && BrowserDetect.version < 9) {
        alert(prDescripcion);
        return;
    }

    if (prCabecera == "" || prCabecera == undefined) {
        prCabecera = "Mensaje";
    }

    if (prIcono == "" || prIcono== undefined) {
        prIcono = "glyphicon-warning-sign";
    }

    if (prColor == "" || prColor == undefined) {
        prColor = "skyblue";
    }

    $("#miAlerta .modal-header").html(prCabecera);
    $("#miAlerta .modal-header").append('<button type="button" class="close" data-dismiss="modal" style="color:white!important;opacity:0.6!important;">x</button>'); //RRAMOS
    
    $("#miAlerta .modal-body > span:first-child").attr("class", "");
    $("#miAlerta .modal-body > span:first-child").addClass("glyphicon");
    $("#miAlerta .modal-body > span:first-child").addClass(prIcono);
    $("#miAlerta .modal-body > span:first-child").css("color", prColor);
    $("#miAlerta .modal-body > span:nth-child(2)").html(prDescripcion);

    $("#miAlerta").modal('show');
};

function MostrarErrorAjax(xhr, err, thrErr) {
    var r = jQuery.parseJSON(xhr.responseText);
    if (r == null) {
        r = xhr.statusText;
        if (r == null || r == '') {
            miAlerta("Error", "Error Genérico", "glyphicon-exclamation-sign","red" );
        }
        else {
            miAlerta("Error", "Message: " + r + ". Codigo: " + xhr.status, "glyphicon-exclamation-sign", "red");
        }
    }
    else {
        miAlerta("Error", "Message: " + r.Message, "glyphicon-exclamation-sign", "red");
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
