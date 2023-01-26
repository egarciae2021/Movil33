
var mvvm;

$(function () {
    debugger;

    var MostrarAcuerdo = ($("#hdfMostrarAcuerdo").val() == "1" ? true : false);

    var tNombreArchivoAcuerdo = $("#hdftNombreArchivoAcuerdo").val();
    var tNombreHtmlAcuerdo = $("#hdftNombreHtmlAcuerdo").val();
    var tDominio = $("#hdftDominio").val();
    var tContrasena = $("#hdftContrasena").val();

    if (MostrarAcuerdo) {
        $("#txtContrasena").val(tContrasena);
        $($("#dvDialogoContrato iframe")[0]).removeAttr("src");
        $("#aDescargaContrato").removeAttr("href");
        $("#aDescargaContrato").attr("href", window.location.toString().split('?')[0] + "/Temporal/" + tNombreArchivoAcuerdo);
        $($("#dvDialogoContrato iframe")[0]).attr("src", window.location.toString().split('?')[0] + "/Temporal/" + tNombreHtmlAcuerdo);
        $("#hdDominio").val(tDominio);
        $("#dvDialogoContrato").appendTo($("body"));

        $("#dvDialogoContrato").modal('show');
    }



    var Mensaje = $("#hdfMensaje").val();
    if (Mensaje != undefined && Mensaje != "") {
        miAlerta("Mensaje", Mensaje, "", "#FFCC66");
    }

    if ($("#alertaSumary").attr("id") != undefined) {
        $("#hdfCapcha").val("1");
        $("#dvCapcha").css("display", "block");
    }
    $("#btnAceptarContrato").attr("disabled", "disabled");
    fnEventos();
    setTimeout(function () { $("#txtDominio").focus(); }, 600);
    $("#dvLogin").show();

    var claveUsu = GenerarAES("usuario", 1);
    var clavePas = GenerarAES("contraseña", 1);
    var valUsu = $.Storage.get(claveUsu);
    var valPas = $.Storage.get(clavePas);

    if (valUsu != null && valUsu != "") {
        $('#chkRecordar').prop('checked', true);
        $("#txtDominio").val(GenerarAES(valUsu, 2));
        $("#txtContrasena").val(GenerarAES(valPas, 2));
    } else {
        if (!MostrarAcuerdo) {
            $("#txtDominio").val("");
            $("#txtContrasena").val("");
            setTimeout(function () { $("#txtDominio").val(""); $("#txtContrasena").val(""); }, 50);
            setTimeout(function () { $("#txtDominio").val(""); $("#txtContrasena").val(""); }, 100);
            setTimeout(function () { $("#txtDominio").val(""); $("#txtContrasena").val(""); }, 200);
            setTimeout(function () { $("#txtDominio").val(""); $("#txtContrasena").val(""); }, 400);
            setTimeout(function () { $("#txtDominio").val(""); $("#txtContrasena").val(""); }, 800);
        }
    }




});


const togglePassword = document.getElementById("toggle-password");
const password = document.getElementById("txtContrasena");
togglePassword.addEventListener("click", toggleClicked);
function toggleClicked() {
    password.classList.toggle("visible");
    if (this.checked) {
        password.type = "text";
    } else {
        password.type = "password";
    }
}




function fnEventos() {

    //$("#txtDominio,#txtContrasena").change(function () {
    //    $(this).val($.trim($(this).val()));
    //});


    $("#btnIngresar").click(function () {
        //debugger;

        if (fnValidarFormulario()) {
            $("#dvWaiting").show();
            var name = $.trim($("#txtDominio").val());
            var user_ = name.lastIndexOf("@");
            name = name.substring(0, user_);

            $.ajax({
                url: miRaiz + "/Login/RetornaUsuario_ValidarKey",
                data: { name: name },
                type: "POST",
                datatype: "json",
                async: false,
                success: function (result) {
                    console.log(result)
                    var stg_cli = localStorage.getItem(result.toString());

                    if (stg_cli != null) {
                        $('#hKeySessionLocal').val(stg_cli);
                    } else {
                        $('#hKeySessionLocal').val("vacio");
                    }
                }
            });
            var claveUsu = GenerarAES("usuario", 1);
            var clavePas = GenerarAES("contraseña", 1);
            if ($('#chkRecordar').is(":checked")) {
                var valUsu = GenerarAES($.trim($("#txtDominio").val()), 1);
                var valPas = GenerarAES($.trim($("#txtContrasena").val()), 1);
                $.Storage.set(claveUsu, valUsu);
                $.Storage.set(clavePas, valPas);
            }
            else {
                $.Storage.remove(claveUsu);
                $.Storage.remove(clavePas);
            }






            // GetSession($.trim($("#txtDominio").val()));

            // $.ajax({
            //    type: "POST",
            //    //url: "/Login/Acreditar",
            //    url: '@Url.Action("Acreditar", "Login")',
            //    data: "{'pDominio' : '" + $.trim($("#txtDominio").val()) + "', " +
            //        "'pContrasena' : '" + $.trim($("#txtContrasena").val())  + "'}",
            //    cache: false,
            //    contentType: "application/json; charset=utf-8",
            //    dataType: "json",
            //     success: function (response) {
            //        console.log(response)
            //        mvvm = response;
            //        if (response.TieneAcreditacion) {
            //            //miAlerta("Acreditación", "ok", "glyphicon-ok-sign", "#1DA68A");
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
            //            miAlerta("Acreditación", "Credenciales ingresadas no son correctas", "glyphicon-remove-sign", "#F64032");
            //        }

            //    },
            //    error: function (xhr, err, thrErr) {
            //        MostrarErrorAjax(xhr, err, thrErr);
            //    }
            //}); 

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
            //url: '@Url.Action("RestablecerContrasenaPortal", "Login")',
            url: miRaiz + "Login/AceptoTerminoContrato",
            //data: "{'pDominio' : '" + $("#txtDominio").val().split('@')[1].split('.')[0] + "'," +
            data: "{'pDominio' : '" + $("#hdDominio").val().toString() + "'," +
                "'pUsuario' : '" + $("#txtDominio").val().split('@')[0] + "'}",
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
                    miAlerta("Términos Contratos", "Error al aceptar términos del contrato", "glyphicon-remove-sign", "#F64032");
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

    //#region Recuperar Contraseña
    $("#LblOlvidoContrasena").click(function () {
        $("#dvRecordarContrasena").show();
        $("#txtCorreo").val("");
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

    $("#txtCorreo").keypress(function (e) {
        if (e.keyCode == 13) {
            $("#btnEnviar").click();
            return false;
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
        $("#dvWaiting").show();

        var vCorreo = $.trim($("#txtCorreo").val());
        if (vCorreo == '') {
            miAlerta("Usuario", "Ingrese su usuario", "", "#FFCC66");
            $("#dvWaiting").hide();
            return;
        }
        if (!validarEmail2(vCorreo)) {
            //mialerta("El formato del correo no es válido.");
            miAlerta("Usuario", "El formato del usuario no es válido.", "", "#FFCC66");
            $("#dvWaiting").hide();
            return;
        }
        var Data_RestablecerContrasenaPortal = { Correo: vCorreo };
        $.ajax({
            type: "POST",
            //url: '@Url.Action("RestablecerContrasenaPortal", "Login")',
            url: miRaiz + "Login/RestablecerContrasenaPortal",
            //data: JSON.stringify(Data_RestablecerContrasenaPortal),
            data: "{ 'Correo': '" + vCorreo + "' }",
            cache: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                //debugger; //here
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

    //success
    //$.niftyNoty({
    //    type: "warning",
    //    container: "floating",
    //    title: Titulo,
    //    message: contenido,
    //    closeBtn: true,
    //    focus: true,
    //    //timer: ((_tipo == 'danger' || (typeof fnCerrar != 'undefined' && fnCerrar != null)) ? 0 : 2500),
    //    timer: ((typeof fnCerrar != 'undefined' && fnCerrar != null) ? 0 : 2500),
    //    onHide: function () {
    //        try {
    //            fnCerrar();
    //        } catch (e) {
    //        }
    //    }
    //});

}

function fnValidarFormulario() {
    var resultado = true;

    if ($.trim($("#txtDominio").val()) == "") {
        miAlerta("Acceso", "Ingrese el usuarios", "", "#FFCC66");
        resultado = false;
    }
    else {
        if ($.trim($("#txtContrasena").val()) == "") {
            miAlerta("Acceso", "Ingrese la contraseña", "", "#FFCC66");
            resultado = false;
        }
    }

    if ($("#hdfCapcha").val() == "1") {
        if (!jcap()) {
            if ($.trim($("#uword").val()) == '') {
                miAlerta("Código de Seguridad", "Debe ingresar el código de seguridad", "", "#FFCC66");
                resultado = false;
            }
            else {
                miAlerta("Código de Seguridad", "El código ingresado no es correcto", "", "#FFCC66");
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

function validarEmail2(valor) {
    var ExpRegular = /(\w+)(\.?)(\w*)(\@{1})(\w+)(\.?)(\w*)(\.{1})(\w{2,3})/;

    if (ExpRegular.test(valor)) {
        return true;
    }
    else {
        return false;
    }
}