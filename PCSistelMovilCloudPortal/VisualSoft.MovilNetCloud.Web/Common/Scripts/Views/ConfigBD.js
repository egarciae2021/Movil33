

    function ENT_MVVM_ConfiguracionBD() {
        this.Servidor;
        this.Usuario;
        this.Contrasena;
        this.BaseDatos;
        this.TieneConexion;
    };

$(function () {
    $("#txtServidor").focus();
    fnEnlazar();
});

function fnEnlazar() {

    $("#btnProbarConexion").click(function () {
        if (fnVerificarFormulario()) {

            var oPrConfiguracionBD = new ENT_MVVM_ConfiguracionBD();

            oPrConfiguracionBD.Servidor = $.trim($("#txtServidor").val().replace('\\', '\\\\'));
            oPrConfiguracionBD.Usuario = $.trim($("#txtUsuario").val().replace('\\', '\\\\'));
            oPrConfiguracionBD.Contrasena = $.trim($("#txtContrasena").val().replace('\\', '\\\\'));
            oPrConfiguracionBD.BaseDatos = $.trim($("#txtBaseDatos").val().replace('\\', '\\\\'));
            oPrConfiguracionBD.TieneConexion = false;

            $.ajax({
                type: "POST",
                url: miRaiz + "Login/VerificarCnx",
                //url: '@Url.Action("VerificarCnx", "Login")',
                data: "{'prConfiguracionBD' : '" + JSON.stringify(oPrConfiguracionBD) + "'}",
                cache: false,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    if (response.TieneConexion) {
                        miAlerta("Base de datos", "Conexión exitosa", "glyphicon-ok-sign", "#1DA68A");
                        $("#spanGlyBD").css("color", "#1DA68A");
                        $("#pMensaje").html("Conexión exitosa");
                    }
                    else {
                        miAlerta("Base de datos", "Conexión fallida", "glyphicon-remove-sign", "#F64032");
                        $("#spanGlyBD").css("color", "#F64032");
                        $("#pMensaje").html("Conexión fallida");
                    }
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });

        }
    });

    $("#btnGuardar").click(function () {
        if (fnVerificarFormulario()) {

            var oPrConfiguracionBD = new ENT_MVVM_ConfiguracionBD();

            oPrConfiguracionBD.Servidor = $.trim($("#txtServidor").val().replace('\\', '\\\\'));
            oPrConfiguracionBD.Usuario = $.trim($("#txtUsuario").val().replace('\\', '\\\\'));
            oPrConfiguracionBD.Contrasena = $.trim($("#txtContrasena").val().replace('\\', '\\\\'));
            oPrConfiguracionBD.BaseDatos = $.trim($("#txtBaseDatos").val().replace('\\', '\\\\'));
            oPrConfiguracionBD.TieneConexion = false;

            $.ajax({
                type: "POST",
                url: miRaiz + "Login/GuardarConexion",
                //url: '@Url.Action("GuardarConexion", "Login")',
                data: "{'prConfiguracionBD' : '" + JSON.stringify(oPrConfiguracionBD) + "'}",
                cache: false,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    if (response.TieneConexion) {
                        miAlerta("Base de datos", "Se guardo la conexión exitosamente", "glyphicon-ok-sign", "#1DA68A");
                    }
                    else {
                        miAlerta("Base de datos", "Error al guardar conexión", "glyphicon-remove-sign", "#F64032");
                    }
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });

        }
    });
};

function fnVerificarFormulario() {
    var esValido = true;
    if ($.trim($("#txtServidor").val()) == "") {
        miAlerta("Servidor", "Ingrese Servidor", "", "#FFCC66");
        esValido = false;
    }
    else {
        if ($.trim($("#txtUsuario").val()) == "") {
            miAlerta("Usuario", "Ingrese Usuario", "", "#FFCC66");
            esValido = false;
        }
        else {
            if ($.trim($("#txtContrasena").val()) == "") {
                miAlerta("Contraseña", "Ingrese Contraseña", "", "#FFCC66");
                esValido = false;
            }
            else {
                if ($.trim($("#txtBaseDatos").val()) == "") {
                    miAlerta("Base de datos", "Ingrese Base de datos", "", "#FFCC66");
                    esValido = false;
                }
            }
        }
    }
    return esValido;

}

function miAlerta(titulo, mensaje) {
    alert(mensaje);
}