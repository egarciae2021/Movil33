function apr_InstanciaBD() {
    this.IdInstanciaBD = 0;
    this.Instancia = "";
    this.Servidor = new setServidor();
    this.Usuario_dbo = "";
    this.Pass_dbo = "";
    this.Usuario_Apr = "";
    this.Pass_Apr = "";
    this.EsMultiCliente = false;
    this.BaseDatosCliente = [];
}

function setServidor() {
    this.IdServidor = 0;
}
function BDCliente() {
    this.IdBDCliente = 0;
    this.BaseDatos = "";
}

var lst = [];
var dllAct = [];
$(function () {
    var indiceTab = window.parent.tab.tabs("option", "selected");
    if ($("#chkUsaInstancia").is(':checked')) {
        $("#txtNombre").val("[Sin instancia]");
        $("#txtNombre").attr("disabled", true);
        $("#txtNombre").css({ "background": "#BDBDBD" });
    }

    $("#btnCerrar").click(function () {
        window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));

    });


    $("#btnGuardar").live("click", function () {


        BloquearPagina(true);

        var Apr_InstanciaBD = new apr_InstanciaBD();

        Apr_InstanciaBD.IdInstanciaBD = $("#hdfIdInstanciaBD").val();
        Apr_InstanciaBD.Instancia = $.trim($("#txtNombre").val());
        Apr_InstanciaBD.Servidor.IdServidor = $("#ddlServidor").val();
        Apr_InstanciaBD.Usuario_dbo = $.trim($("#txtUsuariodbo").val());
        Apr_InstanciaBD.Pass_dbo = $.trim($("#txtPassdbo").val());
        Apr_InstanciaBD.Usuario_Apr = $.trim($("#txtUsuarioAPr").val());
        Apr_InstanciaBD.Pass_Apr = $.trim($("#txtpassApr").val());


        if (Apr_InstanciaBD.Instancia == "") {
            alertaExterna("El nombre de Instancia es un campo obligatorio.");
            BloquearPagina(false);
            $("#txtNombre").focus();
            return;
        }

        if (Apr_InstanciaBD.Usuario_dbo == "") {
            alertaExterna("El Usuario dbo es un campo obligatorio.");
            BloquearPagina(false);
            $("#txtUsuariodbo").focus();
            return;
        }

        if (Apr_InstanciaBD.Pass_dbo == "") {
            alertaExterna("La contraseña de Usuario dbo es un campo obligatorio.");
            BloquearPagina(false);
            $("#txtPassdbo").focus();
            return;
        }

        if (Apr_InstanciaBD.Pass_dbo.length < 6) {
            alertaExterna("La contraseña de Usuario no debe tener menos de 6 caracteres.");
            BloquearPagina(false);
            $("#txtPassdbo").focus();
            return;
        }


        if (Apr_InstanciaBD.Usuario_Apr == "") {
            alertaExterna("El Usuario de Aprovisionamiento es un campo obligatorio.");
            BloquearPagina(false);
            $("#txtUsuarioAPr").focus();
            return;
        }

        if (Apr_InstanciaBD.Pass_Apr == "") {
            alertaExterna("La contraseña de Usuario de Aprovisionamiento es un campo obligatorio.");
            BloquearPagina(false);
            $("#txtpassApr").focus();
            return;
        }

        if (Apr_InstanciaBD.Pass_Apr.length < 6) {
            alertaExterna("La contraseña de Usuario de Aprovisionamiento no debe tener menos de 6 caracteres.");
            BloquearPagina(false);
            $("#txtpassApr").focus();
            return;
        }


        if ($("#chkUsaInstancia").is(':checked')) {
            Apr_InstanciaBD.Instancia = "";
        }
        
        if ($("#chkMultiCliente").is(':checked')) {
            Apr_InstanciaBD.EsMultiCliente = true;

            var lstBDs = $.map($('#lstBdClientes option'), function (e) { return e.value + "|" + e.text; });
            
            if (lstBDs.length <= 0) {
                alertaExterna("Debe agregar Base de Datos Cliente.");
                BloquearPagina(false);
                return;
            }

            for (var i = 0; i < lstBDs.length; i++) {
                var bdCliente = new BDCliente();
                bdCliente.IdBDCliente = lstBDs[i].split("|")[0];
                bdCliente.BaseDatos = lstBDs[i].split("|")[1];
                Apr_InstanciaBD.BaseDatosCliente.push(bdCliente);
            }
        }
        
        var oApr_InstanciaBD = JSON.stringify(Apr_InstanciaBD);


        $.ajax({
            type: "POST",
            url: "Mnt_InstanciaBD.aspx/Guardar",
            data: "{'oInstanciaBD': '" + oApr_InstanciaBD + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {

                if (result.d == '1') {
                    BloquearPagina(false);
                    alertaExterna("La Instancia ya existe en la base de datos");
                    // $("#txtvcUsu").focus();
                    return;
                }
                else {
                    //if ($("#hdfEsllamadaExterna").val() != "1") {
                    //    window.parent.ActualizarGrilla();
                    //}
                    window.parent.ActualizarGrilla();
                    Mensaje("<br/><h1>Registro guardado</h1><h2> ID " + Apr_InstanciaBD.IdInstanciaBD + "</h2>", document, CerroMensaje);
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
                BloquearPagina(false);
            }
        });
    });


    function CerroMensaje() {
        BloquearPagina(false);
        if ($("#hdfIdServidor").val() == "0") {

            $("#txtNombre").val("");
            $("#txtUsuariodbo").val("");
            $("#txtPassdbo").val("");
            $("#txtUsuarioAPr").val("");
            $("#txtpassApr").val("");

            $("#txtNombre").focus();

        }
        else {
            //window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));
            window.parent.tab.tabs("remove", indiceTab);
        }
    }

    $('#chkUsaInstancia').click(function () {
        if ($(this).is(':checked')) {
            $("#txtNombre").val("[Sin instancia]");
            $("#txtNombre").attr("disabled", true);
            $("#txtNombre").css({ "background": "#BDBDBD" });
            return;
        } else {
            $("#txtNombre").attr("disabled", false);
            $("#txtNombre").val("");
            $("#txtNombre").css({ "background": "" });
            return;
        }
    });


    $('#chkMostrarContrasena').click(function () {
        //        if ($(this).is(':checked')) {
        //            $("#txtNombre").val("[Sin instancia]");
        //            $("#txtNombre").attr("disabled", true);
        //            $("#txtNombre").css({ "background": "#BDBDBD" });
        //            return;
        //        } else {
        //            $("#txtNombre").attr("disabled", false);
        //            $("#txtNombre").val("");
        //            $("#txtNombre").css({ "background": "" });
        //            return;
        //        }

        if ($(this).is(':checked')) {
            $('#txtpassApr').get(0).type = 'text';

            //$("#txtpassApr").attr("type", "Password");
        } else {
            $('#txtpassApr').get(0).type = 'Password';
            //$("#txtpassApr").attr("type", "text");
        }
    });

    $("#chkMultiCliente").change(function () {
        if ($("#chkMultiCliente").is(':checked')) {
            $("#trMulticliente").show();
        } else {
            $("#trMulticliente").hide();
        }
    });
    $("#btnAgregarBDCliente").click(function () {
        $("#txtAddBD").val("");
        $("#lblMsg").text("");
        $("#dvBDCliente").dialog({
            title: "Agregar Base de Datos Cliente",
            width: 350,
            height: 145,
            modal: true,
            resizable: false,
            position: ['center'],
            autoOpen: true,
            buttons: {
                "Agregar": function () {
                    var valorAdd = $("#txtAddBD").val();
                    if (valorAdd == "") {
                        return;
                    }
                    if (!fnAgregarBD(valorAdd.toUpperCase())) {
                        return;
                    }
                    $(this).dialog("close");
                },
                "Cancelar": function () {
                    $(this).dialog("close");
                }
            }
        });
    });
    $("#btnQuitarBDCliente").click(function () {
        $("[id*=lstBdClientes] option:selected").remove();
        return false;
    });
    $("#txtAddBD").focus(function () { $(this).select(); });
    CargarComboLista();
});

function CargarComboLista() {
    if ($("#hdflstBDCliente").val() != "") {
        lst = JSON.parse($("#hdflstBDCliente").val());
        if ($(lst).length > 0) {
            var i;
            for (i in lst) {
                $("#lstBdClientes").append($("<option></option>").attr("value", lst[i].Codigo).text(lst[i].Nombre));
            }
        }
    }
    else {
        lst = [];
    }
}
function fnAgregarBD(valorAdd) {
    var retorno = false;
    var selectedList = $("#lstBdClientes")[0];
    var exists = false;
    $('#lstBdClientes  option').each(function () {
        if (this.text.toUpperCase() == valorAdd.toUpperCase()) {
            exists = true;
        }
    });
    if (!exists) {
        retorno = true;
        $("#lstBdClientes").append($("<option></option>").attr("value", "-1").text(valorAdd));
    } else {
        $("#lblMsg").text("El nombre de Base de Datos ya está agregada.");
    }



    //$.each(selectedList, function (index, value) {
    //    //Check if particular element in array exists on dropdownlist
    //    if (!retorno && $('#lstBdClientes').find("option[text='" + valorAdd + "']").length < 1) {
    //        //If not exists show value not exist message
    //        $("#lstBdClientes").append($("<option></option>").attr("value", "-1").text(valorAdd));
    //        retorno = true;
    //        return;
    //    }
    //    else {
    //        //If exists show value exist message
    //        $("#lblMsg").text("El nombre de Base de Datos ya está agregada.");
    //    }
    //});
    //if ($('#lstBdClientes option').length == 0) {
    //    $("#lstBdClientes").append($("<option></option>").attr("value", "-1").text(valorAdd));
    //    retorno = true;
    //}

    return retorno;
}