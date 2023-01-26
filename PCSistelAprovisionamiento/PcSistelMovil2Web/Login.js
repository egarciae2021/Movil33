$(function () {
    localStorage.setItem('Raiz', $("#hdfRutaRaiz").val());

    $("#btn-login").click(function () {
        var user = $("#txtusuario").val();
        var pass = $("#txtclave").val();

        if (user == "") {
            alertaExterna('ingrese nombre usuario');
            return;
        }
        if (pass == "") {
            alertaExterna('ingrese contraseña');
            return;
        }
        window.location.href = 'MainPrincipal.aspx?user=' + user + '&pass=' + pass;

    });

    $("#dvenlaceConfig").click(function () {

        window.location.href = 'Configuracion.aspx';

    });

    if ($("#hfLoc").val() == "1") {
        $("#btnConfigBD").append('<a href="Configuracion.aspx"><img style="margin-top:8px;" src="Common/images/Login/OrangeGear.png" /></a>');
        $("#btnConfigBD").show();
    }

    //#region Recuperar Contraseña
    $("#LblOlvidoContrasena").click(function () {
        $("#dvRecordarContrasena").show();
        $("#txtCorreo").val('');
        $("#txtCorreo").focus();
        $(".popup-overlay").show();
    });


    //    $('#form1').on('keyup keypress', function (e) {
    //        var code = e.keyCode || e.which;
    //        if (code == 13) {
    //            e.preventDefault();
    //            return false;
    //        }
    //    });

    $("#txtCorreo").on('keypress', function (e) {
        var code = e.keyCode || e.which;
        if (code == 13) {
            e.preventDefault();
            $("#btnEnviar").click();
            return false;
        }
    });

    $("#txtCorreo").on('keyup', function (e) {
        var code = e.keyCode || e.which;
        if (code != 13) {
            if ($(this).val() != '') {
                if (validarEmail2($(this).val())) {
                    $("#dvFormatInvalid").hide();
                    $("#imgCorreo").attr("src", "Common/Images/Mantenimiento/Aprobar.png");
                    //$("#btnEnviar").button("option", "disabled", false);
                } else {
                    $("#dvFormatInvalid").show();
                    $("#imgCorreo").attr("src", "Common/Images/Mantenimiento/Alerta_16x16.png");
                    //$("#btnEnviar").button("option", "disabled", true);
                }
            } else {
                $("#dvFormatInvalid").hide();
                $("#imgCorreo").removeAttr("src");
            }
        }
    });

    $("#btnCerrar").click(function () {
        $("#dvRecordarContrasena").hide();
        $('.popup-overlay').hide();
    });

    $("#btnVolverLogin").click(function () {
        $("#dvConfirmacionEnvio").hide();
        $('.popup-overlay').hide();
    });

    $("#btnEnviar").click(function () {

        $("#btnEnviar").attr('disabled', 'disabled');
        //var URL = window.location.href;
        //var Path = window.location.pathname;
        //var URLhash = window.location.hash;
        //var URLsearch = window.location.search;
        var Host = window.location.host;
        var Protocol = window.location.protocol;
        var PagRestCont = "RestablecerContrasena.aspx";


        var Servidor = window.location.href.toString().toLowerCase().split('login.aspx')[0] + PagRestCont;
        //alert(Servidor);

        var PaginaRC = Servidor; // Protocol + '//' + Host + '/' + PagRestCont;

        var vCorreo = $.trim($("#txtCorreo").val());
        if (vCorreo == '') {
            alert("Ingrese su correo eléctronico.");
            $("#btnEnviar").removeAttr('disabled');
            return;
        }
        //if (!validarEmail2(vCorreo)) {
        //    alert("El formato del correo no es válido.");
        //    return;
        //}

        var Data_EnviarSolicitudReestablecerContrasena = { Correo: vCorreo, Url: PaginaRC };

        $.ajax({
            type: "POST",
            url: "Login.aspx/EnviarSolicitudRestablecimiento",
            data: JSON.stringify(Data_EnviarSolicitudReestablecerContrasena),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                var Resultado = result.d.split('|')[0];
                var Mensaje = result.d.split('|')[1];

                //alert(Resultado + "\n" + Mensaje);
                //alert(Mensaje);
                

                if (Resultado == '1') {
                    $("#lblCorreoEnvio").text(vCorreo);
                    //$("#lblCorreoEnvio").text(Mensaje); //debo comentar

                    $("#dvConfirmacionEnvio").show();
                    $("#dvRecordarContrasena").hide();
                } else {
                    //$("#dvRecordarContrasena").hide();
                    //$('.popup-overlay').hide();
                    alert(Mensaje);
                }

                $("#btnEnviar").removeAttr('disabled');
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });

        //$.ajax({
        //    type: "POST",
        //    //url: "Login.aspx/EnviarSolicitudReestablecerContrasena",
        //    url: "Login.aspx/EnviarSolicitudRestablecimiento",
        //    data: Data_EnviarSolicitudReestablecerContrasena,
        //    contentType: "application/json; charset=utf-8",
        //    dataType: "json",
        //    success: function (result) {
        //        var Resultado = result.d.split('|')[0];
        //        var Mensaje = result.d.split('|')[1];
        //        //alert(Resultado + "\n" + Mensaje);
        //        if (Resultado == '1') {
        //            $("#lblCorreoEnvio").text(vCorreo);
        //            $("#dvConfirmacionEnvio").show();
        //            $("#dvRecordarContrasena").hide();
        //        } else {
        //            //$("#dvRecordarContrasena").hide();
        //            //$('.popup-overlay').hide();
        //            alert(Mensaje);
        //        }
        //    },
        //    error: function (xhr, err, thrErr) {
        //        MostrarErrorAjax(xhr, err, thrErr);
        //    }
        //});

        //var strCorreoUser = $("#LblCorreoUsuario").text().toString();
        //var strCorreoIngresado = $("#txtCorreo").val().toString();
        //if (strCorreoUser.toLowerCase() == strCorreoIngresado.toLowerCase()) {
        //    alerta("Su contraseña sera enviada al correo ingresado");
        //    $("#dvRecordarContrasena").hide();
        //    //$('.popup-overlay').hide();
        //    //$('#abc').show();
        //}

    });
    //#endregion
});