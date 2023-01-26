
var mvvm;

$(function () {

    if (BrowserDetect.browser == "Explorer" && BrowserDetect.version < 9) {
        $("#dvLogin").html("");
        $("#dvLogin").html('<p style="float:left; font-size:18pt;"><span style="color:#d9534f; font-size:26pt; float:left;" class="glyphicon glyphicon-ban-circle" aria-hidden="true"></span> La versi�n m�nima para ingresar a MovilNet es <b>Internet Explorer 9</b></p>');
    }
    else {

        if ($("#alertaSumary").attr("id") != undefined) {
            $("#hdfCapcha").val("1");
            $("#dvCapcha").css("display", "block");
        }

        $("#btnAceptarContrato").attr("disabled", "disabled");

        fnEventos();
        $("#txtDominio").focus();
    }

    $("#dvLogin").show();

});

function fnEventos() {

    //$("#txtDominio,#txtContrasena").change(function () {
    //    $(this).val($.trim($(this).val()));
    //});

    $("#btnIngresar").click(function () {

        if (fnValidarFormulario()) {
            $("#dvWaiting").show();
            //@*$.ajax({
            //    type: "POST",
            //    //url: "/Login/Acreditar",
            //    url: '@Url.Action("Acreditar", "Login")',
            //    data: "{'pDominio' : '" + $.trim($("#txtDominio").val()) + "', " +
            //        "'pContrasena' : '" + $.trim($("#txtContrasena").val())  + "'}",
            //    cache: false,
            //    contentType: "application/json; charset=utf-8",
            //    dataType: "json",
            //    success: function (response) {
            //        mvvm = response;
            //        if (response.TieneAcreditacion) {
            //            //miAlerta("Acreditaci�n", "ok", "glyphicon-ok-sign", "#1DA68A");
            //            //window.location = response.Redirect;
            //            if (response.Dominio.Empresa.ListaTitulares.length && !response.Dominio.Empresa.ListaTitulares[0].AceptoContrato) {
            //                //$($("#dvDialogoContrato object")[0]).attr("data", window.location + "/Temporal/" + response.NombreArchivoContrato)
            //                $("#dvDialogoContrato").modal('show');
            //            }
            //            else {
            //                $("#dvWaiting").show();
            //                window.location = response.Redirect;
            //            }
            //        }
            //        else {
            //            $("#hdfCapcha").val("1");
            //            $("#dvCapcha").css("display", "block");
            //            miAlerta("Acreditaci�n", "Credenciales ingresadas no son correctas", "glyphicon-remove-sign", "#F64032");
            //        }

            //    },
            //    error: function (xhr, err, thrErr) {
            //        MostrarErrorAjax(xhr, err, thrErr);
            //    }
            //});*@

        }
        else {
            return false;
        }

    });

    $("#btnAceptarContrato").click(function () {
        $("#dvDialogoContrato").modal('hide');
        $("#dvWaiting").show();
        //$("#btnIngresar").click();
        $.ajax({
            type: "POST",
            url: '@Url.Action("AceptoTerminoContrato", "Login")',
            data: "{'pDominio' : '" + $("#txtDominio").val().split('@("@")')[1].split('.')[0] + "'," +
                "'pUsuario' : '" + $("#txtDominio").val().split('@("@")')[0] + "'}",
            cache: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                if (response) {
                    $("#dvWaiting").show();
                    //window.location = mvvm.Redirect;
                    $("#btnIngresar").click();
                }
                else {
                    miAlerta("Terminos contratos", "Error al aceptar terminos del contrato", "glyphicon-remove-sign", "#F64032");
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });

    });

    $("#chkAceptoContrato").change(function () {

        if ($(this).prop("checked")) {
            $("#btnAceptarContrato").removeAttr("disabled");
        }
        else {
            $("#btnAceptarContrato").attr("disabled", "disabled");
        }

    });

    //#region Recuperar Contrase�a
    $("#LblOlvidoContrasena").click(function () {
        $("#dvRecordarContrasena").show();
        $("#txtCorreo").focus();
        $(".popup-overlay").show();
    });

    $("#txtCorreo").keyup(function (e) {
        if (e.keyCode != 13) {
            if ($(this).val() == "") {
                //$("#imgWarning").hide();
                $("#dvFormatInvalid").hide();
                //$("#imgOk").hide();
                $("#txtCorreo").css("border-color", "");
            } else {
                if (fnValidarControlKeypress($(this).attr("data-val-regex-pattern"), $(this).val())) {
                    //$("#imgWarning").hide();
                    $("#dvFormatInvalid").hide();
                    //$("#imgOk").show();
                    $("#txtCorreo").css("border-color", "green");
                } else {
                    //$("#imgWarning").show();
                    $("#dvFormatInvalid").show();
                    //$("#imgOk").hide();
                    $("#txtCorreo").css("border-color", "#CF2C2C");
                }
            }
        }
        //else {
        //    $("#btnEnviar").click();
        //}
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
        $("#dvWaiting").show();

        var vCorreo = $.trim($("#txtCorreo").val());
        if (vCorreo == '') {
            miAlerta("Correo", "Ingrese su correo electr�nico", "", "#FFCC66");
            $("#dvWaiting").hide();
            return;
        }

        //if (!validarEmail2(vCorreo)) {
        //    alert("El formato del correo no es v�lido.");
        //    $("#dvWaiting").hide();
        //    return;
        //}

        var Data_RestablecerContrasenaPortal = { Correo: vCorreo };
        $.ajax({
            type: "POST",
            url: '@Url.Action("RestablecerContrasenaPortal", "Login")',
            data: JSON.stringify(Data_RestablecerContrasenaPortal),
            cache: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                var Resultado = result.split('|')[0];
                var Mensaje = result.split('|')[1];
                $("#dvWaiting").hide();
                if (Resultado == '1') {
                    var CorreoReal = result.split('|')[2];
                    $("#lblCorreoEnvio").text(CorreoReal);
                    $("#dvConfirmacionEnvio").show();
                    $("#dvRecordarContrasena").hide();
                } else {
                    miAlerta("Mensaje", Mensaje, "", "#FFCC66");
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    });
    //#endregion
}

function fnValidarFormulario() {
    var resultado = true;

    if ($.trim($("#txtDominio").val()) == "") {
        miAlerta("Dominio", "Ingrese Dominio", "", "#FFCC66");
        resultado = false;
    }
    else {
        if ($.trim($("#txtContrasena").val()) == "") {
            miAlerta("Contrase�a", "Ingrese Contrase�a", "", "#FFCC66");
            resultado = false;
        }
    }

    if ($("#hdfCapcha").val() == "1") {
        if (!jcap()) {
            if ($.trim($("#uword").val()) == '') {
                miAlerta("c�digo de seguridad", "Debe ingresar el c�digo de seguridad", "", "#FFCC66");
                resultado = false;
            }
            else {
                miAlerta("c�digo de seguridad", "El c�digo ingresado no es correcto", "", "#FFCC66");
                resultado = false;
            }
        }
    }

    if (!resultado) {
        $("#dvWaiting").hide();
    }

    return resultado;
}

function fnValidarControlKeypress(regex, valor) {
    var ExpRegular = new RegExp(regex);

    if (ExpRegular.test(valor)) {
        return true;
    }
    else {
        return false;
    }
}
