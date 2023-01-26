function empleado(P_vcCod, vcNom) {
    this.P_vcCod = P_vcCod;
    this.vcNom = vcNom;
}

$(document).ready(function () {

    Inicio();
    function Inicio() {
        if ($("#hdfEsAdm").val() != "1") {
            $("#dvEjecutarAhora").button("option", "disabled", true);
        }
    }

    $("#chkEnvio").on('change', function (e) {
        if ($('#chkEnvio').is(":checked")) {
            $("#tbConfVeri tr.mens").show();

            $("#tbConfVeri tr.mens").show();
            $("#txtAsunto").removeAttr("disabled");
            $("#txtSaludo").removeAttr("disabled");
            $("#txtMensaje").removeAttr("disabled");
            $("#lstEmpleado").removeAttr("disabled");
            $("#chkNombre").removeAttr("disabled");

            $("#txtFiltro").attr("disabled", false);
            $("#btnEmpleado").button("option", "disabled", false);
            $("#btnQuitarEmpleado").button("option", "disabled", false);
            $("#btnBuscar").button("option", "disabled", false);
        }
        else {
            $("#tbConfVeri tr.mens").hide();
            $("#txtAsunto").attr("disabled", true);
            $("#txtSaludo").attr("disabled", true);
            $("#txtMensaje").attr("disabled", true);
            $("#lstEmpleado").attr("disabled", true);
            $("#chkNombre").attr("disabled", true);

            $("#txtFiltro").attr("disabled", true);
            $("#btnEmpleado").button("option", "disabled", true);
            $("#btnQuitarEmpleado").button("option", "disabled", true);
            $("#btnBuscar").button("option", "disabled", true);

        }

    });


    $("#btnEmpleado").click(function (e) {
        if ($('#chkEnvio').is(":checked")) {
            abrirDialogSelectEmp();
        }
        else {
            e.preventDefault();
        }
    });

    $("#txtFiltro").keydown(function (event) {
        $("#txtFiltro").val($("#txtFiltro").val().replace(/\\/g, ""));
        if (event.keyCode == 13) {
            $("#btnBuscar").click();
            return false;
        }

    });

    $("#btnBuscar").on('click', function () {
        var filtro = $("#txtFiltro").val().replace(/^(\s|\&nbsp;)*|(\s|\&nbsp;)*$/g, "").toUpperCase();
        if (filtro != "") {

            if (filtro.length > 0) {
                var existe = 0;
                var lista = $("#lstEmpleado option");
                var numeroLetras = 0;
                var texto = "";
                var emple = "";
                $("#lstEmpleado option").each(function () {



                    var s = $(this).text().toUpperCase();
                    if (s.indexOf(filtro) != -1) {
                        existe = existe + 1;
                        // do something
                        lista.removeAttr('selected', '');
                        $(this).attr('selected', 'selected');
                        return false;
                    }

                });
                if (existe == 0) {
                    alerta("El filtro no coincide.");
                    //                    alert("El filtro no coincide.");
                }

            }
        }

    });

    $("#btnQuitarEmpleado").live("click", function () {
        var listaSelec = $("#lstEmpleado option:selected");

        if (listaSelec.length == 0) {
            alerta("Seleccione un empleado de la lista.");
        }
        else {
            listaSelec.remove();
        }
    });

    $("#btnGuardar").click(function () {

        var _biEnvio = "0";
        if ($("#chkEnvio").is(":checked")) {
            _biEnvio = "1";
        }
        var _asunto = $.trim($("#txtAsunto").val());
        var _saludo = $.trim($("#txtSaludo").val());
        var _mensaje = $("#txtMensaje").val();
        var _biIncNombre = "0";

        if ($("#chkNombre").is(":checked")) {
            _biIncNombre = "1";
        }

        //Validaciones
        if (_asunto == "") {
            if (!confirm('Esta seguro de enviar los mensajes sin un asunto?')) {
                return;
            }
            else {
                if (_asunto.length > 100) {
                    alerta("El asunto no puede sobrepasar los 100 caracteres.");
                    return;
                }
            }
        }
        if (_saludo == "") {
            if (!confirm('Esta seguro de enviar los mensajes sin un saludo?')) {
                return;
            }
            else {
                if (_saludo.length > 100) {
                    alerta("El asunto no puede sobrepasar los 100 caracteres.");
                    return;
                }
            }
        }
        if (_mensaje == "") {
            if (!confirm('Esta seguro de enviar el correo sin un mensaje?')) {
                return;
            }
            else {
                if (_mensaje.length > 100) {
                    alerta("El mensaje no puede sobrepasar los 100 caracteres.");
                    return;
                }
            }
        }

        var contador = 0;
        var _empleados1 = "";
        var _empleados2 = "";
        var _empleados3 = "";
        var _empleados4 = "";

        $("#lstEmpleado option").each(function () {
            contador = contador + 1;
            if (contador < 2000) {
                _empleados1 = _empleados1 + $(this).attr('value') + ",";
            }
            else if (contador < 4000) {
                _empleados2 = _empleados2 + $(this).attr('value') + ",";
            }
            else if (contador < 6000) {
                _empleados3 = _empleados3 + $(this).attr('value') + ",";
            }
            else if (contador < 8000) {
                _empleados4 = _empleados4 + $(this).attr('value') + ",";
            }
        });
        var cnt1 = _empleados1.length;
        var cnt2 = _empleados2.length;
        var cnt3 = _empleados3.length;
        var cnt4 = _empleados4.length;

        var total_reg = cnt1 + cnt2 + cnt3 + cnt4;

        //console.log(total_reg);
        if (cnt1 > 0) {
            _empleados1 = _empleados1.substr(0, cnt1 - 1);
        }
        else if (cnt2 > 0) {
            _empleados2 = _empleados2.substr(0, cnt2 - 1);
        }
        else if (cnt3 > 0) {
            _empleados3 = _empleados3.substr(0, cnt3 - 1);
        }
        else if (cnt4 > 0) {
            _empleados4 = _empleados4.substr(0, cnt4 - 1);
        }
        $.ajax({
            type: "POST",
            url: "Fac_Conf_EnvioPagos.aspx/Insertar_ConfEnvioCuentaCobro",
            data: JSON.stringify({
                "biEnvio": _biEnvio,
                "asunto": _asunto,
                "saludo": _saludo,
                "mensaje": _mensaje,
                "biIncNombre": _biIncNombre,
                "empleados1": _empleados1,
                "empleados2": _empleados2,
                "empleados3": _empleados3,
                "empleados4": _empleados4,
                "inTipOri": $("#hdfinTipOri").val()
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function () {

                Mensaje("<br/><h1>Se guardó Correctamente.</h1><br/>", document);
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    });

    $("#btnCerrar").click(function () {
        var Nametab = window.parent.tabschild[window.parent.tabPrincipal.tabs("option", "selected")].id;
        var Accord = window.parent.$("#" + Nametab);
        Accord.tabs("remove", Accord.tabs("option", "selected"));
    });


    cargar_datos();
    //Asignando los Valores en la carga deacuerdo al tipo de configuracion enviado por la url
    function cargar_datos() {


        $.ajax({
            type: "POST",
            url: "Fac_Conf_EnvioPagos.aspx/getListar_Configuracion",
            data: JSON.stringify({
                "inTipOri": $("#hdfinTipOri").val()
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {

                if (data.d.length > 0) {

                    if (data.d[0].BiEnvio == "1") {
                        $("#chkEnvio").attr("checked", "checked");
                    }
                    else {
                        $("#chkEnvio").removeAttr("checked");
                        $("#tbConfVeri tr.mens").hide();
                        $("#txtAsunto").attr("disabled", true);
                        $("#txtSaludo").attr("disabled", true);
                        $("#txtMensaje").attr("disabled", true);
                        $("#lstEmpleado").attr("disabled", true);
                        $("#chkNombre").attr("disabled", true);
                        $("#txtFiltro").attr("disabled", true);
                        $("#btnEmpleado").button("option", "disabled", true);
                        $("#btnQuitarEmpleado").button("option", "disabled", true);
                        $("#btnBuscar").button("option", "disabled", true);

                    }
                    if (data.d[0].biIncNombre == "1") {
                        $("#chkNombre").attr("checked", "checked");
                    }
                    else {
                        $("#chkNombre").removeAttr("checked");
                    }
                    $("#txtAsunto").val(data.d[0].Asunto);
                    $("#txtSaludo").val(data.d[0].Saludo);
                    $("#txtMensaje").val(data.d[0].Mensaje);

                    $("#txtRuta").val(data.d[0].Ruta);

                }
                else {
                    $("#txtMensaje").val("Se le esta enviando su estado de cuenta para el presente periodo. ");
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }




        });
    }

    $("#btnEjecutar").click(function () {
        confirmacion("Se generará una cola de Exportación de Estado de Cuenta, ¿Desea continuar?", EjecutarTarea, null, "Confirmación");
    });

    function EjecutarTarea() {
        var validar = $("#hdfEsAdm").val();
        if (validar === "1") {
            $.ajax({
                type: "POST",
                url: "Fac_Conf_EnvioPagos.aspx/InsertarCola_ExportaciónEstadoCuenta",
                //            data: JSON.stringify({ 'validar': validar }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    if (data.d === "1") {
                        Mensaje("<br/><h1>Se creó una cola de Exportación de Estado de Cuenta, ir al Visor de tareas.</h1><br/>", document);
                    } else {
                        alerta("No se realizó esta acción debido a que sólo es permitido al perfil Administrador.");
                    }
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        } else {
            alerta("Sólo es permitido a un perfil Administrador.");
        }
    }

});
var tabOpciones;
var Empleados;
function empleado(P_vcCod, vcNom) {
    this.P_vcCod = P_vcCod;
    this.vcNom = vcNom;
}
function abrirDialogSelectEmp() {
    var $width = 940;
    var $height = 505;
    Empleados = [];
    $("#lstEmpleado option").each(function () {
        var Empleado = this;
        Empleado.P_vcCod = $(this).val();
        Empleado.vcNom = $(this).html();
        Empleados.push(Empleado);
    });

    var $Pagina = '../../../P_Movil/Consultar/Con_SeleccionArea.aspx?Tipo=2&Multiple=1';
    $("#ifArea").attr("src", $Pagina);

    $("#ifArea").css("width", 930);

    Modal = $('#dvArea').dialog({
        title: "Seleccionar empleado",
        width: $width,
        height: $height,
        modal: true,
        resizable: false
    });

}
function IngresarEmpleados(empleados) {//Carga los empleados seleccionados del formulario respectivo
    $("#lstEmpleado").html("");
    Empleados = [];
    $(empleados).each(function () {
        var Empleado = this;

        Empleados.push(Empleado);
        $("#lstEmpleado").append($("<option></option>").attr("value", Empleado.P_vcCod).text(Empleado.vcNom));
    });
}
function IngresarEmpleadosSelecionados() {//Carga los empleados seleccionados del formulario respectivo

    
    Empleados = [];
    try{
        $("#lstEmpleado option").each(function () {
          
            var Empleado = new empleado();
            Empleado.P_vcCod = this.value;
            Empleado.vcNom = this.text;
            Empleados.push(Empleado);
        });
    }catch(Error){
    
    }
    return Empleados;
}