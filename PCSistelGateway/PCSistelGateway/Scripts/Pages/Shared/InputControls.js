$(document).ready(function () {
    $(document).on("keypress", ".onlyNumbers", function (e) {
        e.preventDefault;
        var key = e.keyCode;
        if ((key >= 48 && key <= 57) || key == 8 || key == 13) {
            if (key == 13) { return false; }
            else { return true; }
        }
        else { return false; }
    })

    $(document).on("keypress", ".onlyNumberDecimal", function (e) {
        if (e.shiftKey == true) {
            e.preventDefault();
        }
        var key = e.keyCode;
        if ((key >= 48 && key <= 57) || key == 8 || key == 13 || key == 46) {
            if (key == 13) { return false; }
            else {
                if ($(this).val().indexOf('.') !== -1 && key == 46)
                    e.preventDefault();
                return true;
            }
        }
        else { return false; }
    });
    $(document).on("keypress", ".onlyDate", function (e) {
        e.preventDefault;
        var key = e.keyCode;
        if ((key >= 48 && key <= 57) || key == 8 || key == 13 || key == 47)
            return true;
        else
            return false;
    })
    $(document).on("keypress", ".onlyCharacters", function (e) {
        e.preventDefault;
        key = e.keyCode || e.which;
        tecla = String.fromCharCode(key).toLowerCase();
        letras = " 'áéíóúabcdefghijklmnñopqrstuvwxyz";
        especiales = "8-37-39-46";
        tecla_especial = false
        for (var i in especiales) {
            if (key == especiales[i]) {
                tecla_especial = true;
                break;
            }
        }
        if (letras.indexOf(tecla) == -1 && !tecla_especial) {
            return false;
        }
    })
    $(document).on("keypress", ".onlyNumbersCharacters", function (e) {
        e.preventDefault;
        key = e.keyCode || e.which;
        tecla = String.fromCharCode(key).toLowerCase();
        letras = " áéíóúabcdefghijklmnñopqrstuvwxyz";
        especiales = "8-37-39-46";
        tecla_especial = false
        for (var i in especiales) {
            if (key == especiales[i] || (key >= 48 && key <= 57) || key == 8 || key == 13) {
                tecla_especial = true;
                break;
            }
        }
        if (letras.indexOf(tecla) == -1 && !tecla_especial) {
            return false;
        }
    })

    $(document).on("blur", ".upper", function (e) {
        this.value = this.value.toUpperCase();
    })
})

Number.prototype.pad = function (size) {
    var s = String(this);
    while (s.length < (size || 2)) { s = "0" + s; }
    return s;
}