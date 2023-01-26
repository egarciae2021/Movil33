var valTipo = '-1';
var valSubTipo = '-1';
var valMedio = '-1';
var UltimaTeclaDigitadaDes = "";
var UltimaTeclaDigitadaAsunto = "";
$(function () {


    //debugger;
    if (window.parent.UsuarioConectado != $("#hfUsuario").val()) {
        window.location.href = '../Login.aspx';
        return;
    }


    $("#txtAsunto").attr('maxlength', '100');
    $("#txtDescripcion").attr('maxlength', '250');
    $("#ddlTipoDet").focus();



    $("#txtDescripcion,#txtAsunto").live("keypress", ValidarAlfaNumerico);


    //    $('#txtDescripcion').keypress(function (event) {
    //        if ($.trim($('#txtDescripcion').val()).length == 0) {
    //            //CAPTURAMOS POR DEFECTO EL ESPACIO SI ES QUE BORRA LO ESCRITO.
    //            UltimaTeclaDigitadaDes = '32';
    //        }
    //        //VALIDAMOS SI EL INGRESO ES UN ESPACIO
    //        if (event.which == '32') {
    //            //VALIDAMOS SI EL INGRESO ES UN ESPACIO Y SI EN LA DESCRIPCION ESTE VACIO EN ESE CASO NO PERMITE ESPACIO
    //            if ($.trim($('#txtDescripcion').val()).length > 0) {
    //                UltimaTeclaDigitadaDes = event.which;
    //                return true;
    //            } else {
    //                UltimaTeclaDigitadaDes = event.which;
    //                return false;
    //            }
    //        } else {
    //            UltimaTeclaDigitadaDes = event.which;
    //            return true;
    //        }
    //    });

    //    $('#txtAsunto').keypress(function (event) {
    //        if ($.trim($('#txtAsunto').val()).length == 0) {
    //            //CAPTURAMOS POR DEFECTO EL ESPACIO SI ES QUE BORRA LO ESCRITO.
    //            UltimaTeclaDigitadaAsunto = '32';
    //        }
    //        //VALIDAMOS SI EL INGRESO ES UN ESPACIO
    //        if (event.which == '32') {
    //            //VALIDAMOS SI EL INGRESO ES UN ESPACIO Y SI EN LA DESCRIPCION ESTE VACIO EN ESE CASO NO PERMITE ESPACIO
    //            if ($.trim($('#txtAsunto').val()).length > 0) {
    //                //VALIDAMOS SI LA ULTIMA LETRA ES UN ESPACIO DE ESE CASO NO VUELVE A INGRESO OTRO ESPACIO.
    //                if (UltimaTeclaDigitadaAsunto == '32') {
    //                    UltimaTeclaDigitadaAsunto = event.which;
    //                    return false;
    //                } else {
    //                    UltimaTeclaDigitadaAsunto = event.which;
    //                    return true;
    //                }
    //            } else {
    //                UltimaTeclaDigitadaAsunto = event.which;
    //                return false;
    //            }
    //        } else {
    //            UltimaTeclaDigitadaAsunto = event.which;
    //            return true;
    //        }
    //    });



    //    $.ajax({
    //        type: "POST",
    //        url: "Registrar_Incidencia.aspx/ObtenerTipo",
    //        data: "",
    //        contentType: "application/json; charset=utf-8",
    //        dataType: "json",
    //        success: function (resultado) {
    //            ActivarComboboxKendo("#ddlTipo", 120, resultado.d);
    //        },
    //        error: function (xhr, err, thrErr) {
    //            MostrarErrorAjax(xhr, err, thrErr);
    //        }
    //    });

    //    $.ajax({
    //        type: "POST",
    //        url: "Registrar_Incidencia.aspx/ObtenerMedioContacto",
    //        data: "",
    //        contentType: "application/json; charset=utf-8",
    //        dataType: "json",
    //        success: function (resultado) {
    //            ActivarComboboxKendo("#ddlMedio", 120, resultado.d);
    //        },
    //        error: function (xhr, err, thrErr) {
    //            MostrarErrorAjax(xhr, err, thrErr);
    //        }
    //    });

    //    if (valTipo == '-1') {
    //        CargarSubTipo("#ddlSubTipo", 120, valTipo);
    //    }

    $('#ddlTipoDet').change(function () {
        ObtieneDescripcionTipificacion($('#ddlTipoDet').val());
    });

    $("#btnRegistrarTicket").click(function () {
        var idTipoDetallado = $('#ddlTipoDet').val();
        valTipo = "-1";
        valSubTipo = "-1";
        valMedio = 1;
        if (idTipoDetallado.indexOf(',') >= 0) {
            valTipo = idTipoDetallado.split(',')[0];
            valSubTipo = idTipoDetallado.split(',')[1];
        }
        var usuario = $("#hdfIdUsuarioLogeado").val();
        var asunto = $("#txtAsunto").val().replace(/'/g, "&#39");
        var descripcion = $("#txtDescripcion").val().replace(/'/g, "&#39");
        var ususarioRegistro = $("#hdfIdUsuarioLogeado").val();
        if (usuario == "") {

            alerta("Ingrese un usuario", 'Registro Ticket');
            $("#txtUsuario").focus();
            return;
        }
        if (idTipoDetallado == "0") {

            alerta("Seleccione el Motivo", 'Registro Ticket');

            $("#ddlTipoDet").focus();
            return;
        }

        //        if (valTipo == "-1") {
        //            alerta("Seleccione Tipo", 'Registro Ticket');
        //            $("#ddlTipo").focus();
        //            return;
        //        }
        //        if (valSubTipo == "-1") {
        //            alerta("Seleccione Acerca de", 'Registro Ticket');
        //            $("#ddlSubTipo").focus();
        //            return;
        //        }
        //        if (valMedio == "-1") {
        //            alerta("Seleccione un medio de contacto.", 'Registro Ticket');
        //            $("#ddlMedio").focus();
        //            return;
        //        }

        if ($.trim(asunto) == "") {

            alerta("Ingrese asunto", 'Registro Ticket');

            $("#txtAsunto").val('');
            $("#txtAsunto").focus();
            return;
        }
        if ($.trim(descripcion) == "") {

            alerta("Ingrese descripción", 'Registro Ticket');

            $("#txtDescripcion").val('');
            $("#txtDescripcion").focus();
            return;
        }

        $.ajax({
            type: "POST",
            url: "Registrar_Incidencia.aspx/RegistrarTicket",
            data: "{'pUsuario': '" + usuario + "'," +
                           "'pUsuarioRegistro': '" + ususarioRegistro + "'," +
                           "'pMedioContacto': '" + valMedio + "'," +
                           "'pTipificacion': '" + valSubTipo + "'," +
                           "'pAsunto': '" + $.trim(asunto) + "'," +
                           "'pDescripcion': '" + $.trim(descripcion) + "'," +
                           "'pEsChat': false}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                var CodigoTicket = result.d;

                if (CodigoTicket.split('|')[0] == "OK") {
                    alerta("Ticket registrado con código: " + CodigoTicket.split('|')[1], 'Registro Ticket', fnResultadoRegistro);
                    //LimpiarControles();
                }
                else {
                    alerta(CodigoTicket.split('|')[2], 'Registro Ticket');
                }


            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    });

    //    function CargarSubTipo(control, altura, IdTipo) {
    //        $.ajax({
    //            type: "POST",
    //            url: "Registrar_Incidencia.aspx/obtenerSubTipo",
    //            data: "{'prIdTipo': '" + IdTipo + "'}",
    //            contentType: "application/json; charset=utf-8",
    //            dataType: "json",
    //            success: function (resultado) {
    //                valSubTipo = 0;
    //                ActivarComboboxKendo(control, altura, resultado.d);
    //            },
    //            error: function (xhr, err, thrErr) {
    //                MostrarErrorAjax(xhr, err, thrErr);
    //            }
    //        });
    //    }
    function fnResultadoRegistro() {
        window.location.href = 'Incidencia.aspx';
    }

    function ObtieneDescripcionTipificacion(IdTipoDetalle) {
        if (IdTipoDetalle.indexOf(',') >= 0) {
            var IdTipo = IdTipoDetalle.split(',')[0];
            var IdDetalleTipo = IdTipoDetalle.split(',')[1];
            $.ajax({
                type: "POST",
                url: "Registrar_Incidencia.aspx/ObtenerDescripcionTipificacion",
                data: "{'idtipo': '" + IdTipo + "','iddetalletipo':'" + IdDetalleTipo + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (resultado) {
                    $("#txtAsunto").val(resultado.d);
                    UltimaTeclaDigitadaAsunto = "";

                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        }
        else {
            $("#txtAsunto").val('');
        }
    }

    function ActivarComboboxKendo(control, altura, items) {
        $(control).removeClass("ui-widget-content ui-corner-all");
        $(control).css("padding", "0px");
        $(control).css("margin", "0px");
        $(control).css("height", "24px");
        if (control == "#ddlTipo") {
            $(control).kendoComboBox({
                dataTextField: "Nombre",
                dataValueField: "IdTipo",
                dataSource: items,
                filter: "contains",
                change: function (e) {
                    valTipo = this.value();
                    //alert(valTipo);
                    CargarSubTipo("#ddlSubTipo", 120, valTipo);
                },
                suggest: true,
                index: 0
            });
        }
        else if (control == "#ddlMedio") {
            $(control).kendoComboBox({
                dataTextField: "Titulo",
                dataValueField: "P_inCod",
                dataSource: items,
                filter: "contains",
                change: function (e) {
                    valMedio = this.value();
                    //alert(valMedio);
                },
                suggest: true,
                index: 0
            });
        } else {
            $(control).kendoComboBox({
                dataTextField: "Titulo",
                dataValueField: "P_inCod",
                dataSource: items,
                filter: "contains",
                change: function (e) {
                    valSubTipo = this.value();
                    //alert(valSubTipo);
                },
                suggest: true,
                index: 0
            });
        }
    }

    function LimpiarControles() {
        $("#ddlTipoDet").val(0);
        $("#txtAsunto").val("");
        $("#txtDescripcion").val("");
        $("#txtAsunto").focus();
    }
});

