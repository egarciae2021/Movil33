$(function () {
    $(".popup-overlay").show();
    $("#txtContrasena1").focus();

    $("#txtContrasena1").keyup(function (e) {
        if (e.keyCode == 13) {
            $("#txtContrasena2").focus();
        } else {
            passwordStrength($(this).val());
        }
    });

    $("#txtContrasena2").keyup(function (e) {
        if ($("#txtContrasena1").val() != $(this).val()) {
            $("#dvFormatInvalid").show();
            $("#imgCorreo").attr("src", "Common/Images/Mantenimiento/Alerta_16x16.png");
            $("#lblCoincidenciaPass").text("La contraseñas deben ser iguales.");
        } else {
            $("#dvFormatInvalid").hide();
            $("#imgCorreo").attr("src", "Common/Images/Mantenimiento/Aprobar.png");
            $("#lblCoincidenciaPass").text("");
        }
    });

    $("#btnEnviar").click(function () {
        $("#lblCoincidenciaPass").text("");
        var vPass1 = $("#txtContrasena1").val();
        var vPass2 = $("#txtContrasena2").val();

        if (vPass1 == '') {
            $("#lblCoincidenciaPass").text("Ingrese su nueva contraseña.");
            $("#txtContrasena1").focus();
            return;
        }
        if (vPass2 == '') {
            $("#lblCoincidenciaPass").text("Confirme su contraseña antes de continuar.");
            $("#txtContrasena2").focus();
            return;
        }
        if (vPass1.length < 6) {
            $("#lblCoincidenciaPass").text("La contraseña debe contener como mínimo 6 caracteres.");
            $("#txtContrasena1").focus();
            return;
        }
        if (vPass1 != vPass2) {
            $("#lblCoincidenciaPass").text("La contraseñas no coinciden.");
            $("#txtContrasena2").focus();
            return;
        }

        var Data_RestablecerContrasenaUsuario = {
            CodigoSolicitud: $("#hdfCodReestablecimiento").val(),
            NuevaContrasena: vPass1,
            ConfirmacionContrasena: vPass2,
            PaginaLogin: fnObtenerPaginaLogin(),
            IdDominio: $("#hdfIdDominio").val()
        };
        $.ajax({
            type: "POST",
            url: "RestablecerContrasena.aspx/RestablecerContrasenaUsuario",
            data: JSON.stringify(Data_RestablecerContrasenaUsuario),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.d == '-2') {
                    $("#lblCoincidenciaPass").text("La contraseñas no coinciden.");
                } else if (result.d == '-1') {
                    $("#dvReestablecimiento").hide();
                    $("#dvErrorSolicitud").show();
                } else if (result.d == '0') {
                    $("#dvReestablecimiento").hide();
                    $("#dvCaducado").show();
                } else {
                    $("#dvReestablecimiento").hide();
                    $("#dvExito").show();
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });

    });

    $(".ir-login").click(function () {
        window.location.href = "Login.aspx";
    });

    $("#imgInfoFortaleza").click(function () {
        $("#dvFortalezaContraseña").show();
    });

    $(".info-fortaleza-cerrar").click(function () {
        $("#dvFortalezaContraseña").hide();
    });
});

function fnObtenerPaginaLogin() {
    var Host = window.location.host;
    var Protocol = window.location.protocol;
    var PagLogin = "Login.aspx";
    return Protocol + '/' + Host + '/' + PagLogin;
}

function passwordStrength(pass) {
    var colors = [];
    colors[0] = "#cccccc";
    colors[1] = "#ff0000";
    colors[2] = "#ff5f5f";
    colors[3] = "#56e500";
    colors[4] = "#399800"; //"#4dcd00";
    colors[5] = "#0000FF"; //"#5665B0"; //"#399800";

    var fortaleza = [];
    fortaleza[0] = ""; //"Inválida";
    fortaleza[1] = "Muy Débil";
    fortaleza[2] = "Débil";
    fortaleza[3] = "Media";
    fortaleza[4] = "Buena";
    fortaleza[5] = "Óptima";

    var password = pass;
    var score = 0;

    if (password.length < 6) {
        score = 0;
    } else {
        //if (password.length >= 6) { //longitud mayor o igual a 6 caracteres
        //    score++;
        //}
        //if ((password.match(/[a-z]/)) && (password.match(/[A-Z]/))) { //letras mayusculas y minuscuals
        //    score++;
        //}
        if (password.match(/[A-Z]/)) { //letras mayusculas
            score++;
        }
        if (password.match(/[a-z]/)) { //letras y minusculas
            score++;
        }
        if (password.match(/\d+/)) { //digitos
            score++;
        }
        if (password.match(/[^a-z\d]+/)) { //simbolos
            score++;
        }
        if (password.length > 12) { //longitud mayor a 12 caracteres
            score++;
        }
    }
    //return score;
    $("#PassFortaleza").css("background-color", colors[score]);
    $("#lblFortalezaPass").css("color", colors[score]);
    $("#lblFortalezaPass").text(fortaleza[score]);

    $("#PassFortaleza").css("width", (parseInt(score,0) * 20).toString() + "%");
}

function generatePWD() {
    var i;
    var maxAlpha = 26;
    var strSymbols = "~!@#$%^&*(){}?><`=-|][";
    var password = '';
    for (i = 0; i < 3; i++) {
        password += String.fromCharCode("a".charCodeAt(0) + getRand(maxAlpha));
    }
    for (i = 0; i < 3; i++) {
        password += String.fromCharCode("A".charCodeAt(0) + getRand(maxAlpha));
    }
    for (i = 0; i < 3; i++) {
        password += String.fromCharCode("0".charCodeAt(0) + getRand(10));
    }
    for (i = 0; i < 4; i++) {
        password += strSymbols.charAt(getRand(strSymbols.length));
    }

    password = shuffleString(password);
    password = shuffleString(password);
    password = shuffleString(password);

    return password;
}