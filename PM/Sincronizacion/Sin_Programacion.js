

$(function () {


    $(".btnNormal").button({});

    $(".txthora").AnyTime_picker({ format: "%H:%i:%s",
        labelTitle: "Hora",
        labelHour: "Hora",
        labelMinute: "Minuto",
        labelSecond: "Segundo",
        labelYear: "Año",
        labelMonth: "Mes",
        labelDayOfMonth: "Dia",
        monthAbbreviations: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        dayAbbreviations: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado']
    });


    $("#chkahora").prop('checked', false);

    $("#ddlperiodo").on("change", function () {
        var valor = $(this).val();
        $('#ddldia').html('');
        $('#dvdia').show();
        $("#ddldia").prop("disabled", false);

        if (valor == "DIARIO") {
            $("#ddldia").prop("disabled", true);
            $('#dvdia').hide();
        }



        if (valor == "MENSUAL") {
            var optionList = {
                1: '1', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6', 7: '7', 8: '8', 9: '9', 10: '10', 11: '11', 12: '12', 13: '13', 14: '14',
                15: '15', 16: '16', 17: '17', 18: '18', 19: '19', 20: '20', 21: '21', 22: '22', 23: '23', 24: '24', 25: '25', 26: '26', 27: '27', 28: '28'
            };
        }
        if (valor == "SEMANAL") {
            var optionList = { Lunes: 'Lunes', Martes: 'Martes', Miercoles: 'Miercoles', Jueves: 'Jueves', Viernes: 'Viernes', Sabado: 'Sabado', Domingo: 'Domingo' };
        }

        if (valor != "DIARIO") {
            $.each(optionList, function (val, text) {

                $('#ddldia').append($('<option></option>').val(val).html(text));
            });


        }



    });

    $("#ddlperiodo").change();

    function grabardatos(ahora) {
        var fecha_actual = new Date();
        var vcperiodo = $("#ddlperiodo").val();
        var vcdia = $("#ddldia").val();

        if (vcperiodo == 'DIARIO') {
            vcdia = fecha_actual.getDate();
        } else {
            vcdia = $("#ddldia").val();
        }
        var vchora = $("#txthora").val();
        var bAhora = ahora;
        if (vcperiodo == "") {
            alert("Debe ingresar el tipo de programación");
            $("#ddlperiodo").focus();
            return;
        }

        if (vcdia == "") {
            alert("Debe ingresar el dia de la ejecución");
            $("#ddldia").focus();
            return;
        }

        if (vchora == "") {
            alert("Debe ingresar la fecha de ejecución");
            $("#txthora").focus();
            return;
        }

        function CerroMensaje() {

        }


        $.ajax({
            type: "POST",
            url: "Sin_Programacion.aspx/GuardarProgramacion",
            data: "{'tipo': '" + vcperiodo + "','dia': '" + vcdia + "','hora': '" + vchora + "','ahora': '" + bAhora + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.d == "0") {
                    if (ahora) {
                        Mensaje("<br/><h1>Datos Grabados</h1><br/><h2>Enviar Ahora!</h2>", document, CerroMensaje);
                    }
                    else {
                        Mensaje("<br/><h1>Datos Grabados</h1><br/><h2>Programación!</h2>", document, CerroMensaje);
                    }
                }
                else {
                    alert("Problemas al guardar");
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }

    $("#btnahora").click(function (event) {

        grabardatos(true);
    });

    $("#btngraba").click(function (event) {

        grabardatos(false);
    });


});

