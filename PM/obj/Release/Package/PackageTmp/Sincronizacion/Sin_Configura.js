
$(function () {

    $(".btnNormal").button();

    // $('#txtempleado').prop('disabled', true);

    var nombremodulo;
    // CARGAR MODULO ACTUAL Y SEGUN ESO OCULTA O MUESTRA CONFIGURACION
    $.ajax({
        type: "POST",
        url: "Sin_Configura.aspx/cargarmoduloactual",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {

            nombremodulo = result.d;

            if (nombremodulo == "abogados") {
                $('#sucursal').hide();
                $('#empleado').hide();
                $('#web').hide();
                $('#anexo').hide();
                $('#lectura_orga').hide();
            }

            else {
                $('#sucursal').show();
                $('#empleado').show();
                $('#web').show();
                $('#anexo').show();
                $('#lectura_orga').show();

                if ($("#ddlOrigen").val() != "Active Directory") {
                    $('#lectura_orga').hide();
                    $('#lectura_ldap').hide();
                }
                else {
                    $('#lectura_orga').show();
                    $('#lectura_ldap').show();
                }



            }

        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
    //MEJORA ABOGADOS

    /////////////////////////////////////////////////



    $("#btnorigen").click(function (event) {

        var valor = $("#ddlOrigen").val();
        var numeropos = 1;
        var numerosep = 2;

        var paginaMaestra;

        if (valor == "Texto Posicion") {
            paginaMaestra = "PlantillaCSV.aspx?TipoOrigen=" + valor;
        }

        if (valor == "Texto Separador") {
            paginaMaestra = "PlantillaCSV.aspx?TipoOrigen=" + valor;
        }

        if (valor == "Active Directory") {
            paginaMaestra = "PlantillaAD.aspx?TipoOrigen=" + valor;
        }

        if (valor == "Sql Server") {
            paginaMaestra = "PlantillaSQL.aspx?TipoOrigen=" + valor;
        }
        //$(location).attr('href', 'WebForm1.aspx');  

        //window.parent(paginaMaestra);
        var $width = 1100;
        var $height = 650;
        var $Pagina = paginaMaestra;
        // $("#iconfigurar").attr("src", $Pagina);
        //$("#iconfigurar").load($Pagina);
        window.location = $Pagina;
        //        Modal = $('#configurar').dialog({
        //            title: "Configurar Origen",
        //            width: $width,
        //            height: $height,
        //            modal: true,
        //            resizable: false,
        //            top:500
        //        });



    });



    $("#btnexcepto").click(function (event) {
        //paginaMaestra = "Sin_Exonerados.aspx?Tipo=2&Multiple=1&CodInt=001&Empleados="
        //window.parent(paginaMaestra);
        var $width = 760;
        var $height = 525;
        // var $Pagina = paginaMaestra;
        var $Pagina = 'Sin_Exonerados.aspx?Tipo=2&Multiple=1&CodInt=001';
        $("#iconfigurar").attr("src", $Pagina);
        Modal = $('#configurar').dialog({
            title: "Exonerados de Sincronización",
            width: $width,
            height: $height,
            modal: true,
            resizable: false
        });
    });

    $("#btnAbreviatura").click(function (event) {
        var $width = 760;
        var $height = 525;
        var $Pagina = 'Sin_Mnt_Abreviatura.aspx';
        $("#iAbreviatura").attr("src", $Pagina);
        Modal = $('#dvAbreviatura').dialog({
            title: "Mantenimiento de Abreviaturas",
            width: $width,
            height: $height,
            modal: true,
            resizable: false
        });
    });


    $("#ddlOrigen").live("change", function () {

        if ($("#ddlOrigen").val() != "Active Directory") {
            $('#lectura_orga').hide();
            $('#lectura_ldap').hide();
        }
        else {
            $('#lectura_orga').show();
            $('#lectura_ldap').show();
        }


        //        function LlenarEquiposPorEmpleado(valor) {
        //            $("#ddlEquipo").html("");
        //            if ($("#ddlTipoEquipo").val() != "-1" && $("#hdfCodEmpleadoSolicitante").val() != "") {

        //                $.ajax({
        //                    type: "POST",
        //                    url: "Adm_Solicitud.aspx/ListarDispositivoPorTipoPorEmpleado",
        //                    data: "{'IdTipoInventario': '" + $("#ddlTipoEquipo").val() + "'," +
        //                       "'IdEmpleado': '" + $("#hdfCodEmpleadoSolicitante").val() + "'," +
        //                      "'validar': '" + valor + "'}",
        //                    contentType: "application/json; charset=utf-8",
        //                    dataType: "json",
        //                    success: function (result) {
        //                        if ($(result.d).length > 0) {
        //                            $.each(result.d, function () {
        //                                $("#ddlEquipo").append($("<option></option>").attr("value", this.IdEquipo).text("(" + this.NumeroActivo + ")" + this.ModeloDispositivo));
        //                            });
        //                            $("#tdEquipo").show();


        //                            //  $("#grid").jqGrid('setSelection', 1, true); 
        //                            //                        $('#lblmarca').text(datos.Marca);
        //                            //                        $('#lblmodelo').text(datos.Modelo);
        //                            //                        $('#lblNumeroActivo').text(datos.NumeroActivo);
        //                            //                        $('#lblFechaAdquisicion').text(datos.FechaAdquisicion);
        //                            //                        $('#lblNumeroContrato').text(datos.NumeroContrato);
        //                            //                        $('#lblNumeroOC').text(datos.NumeroOC);

        //                            $('#grid').trigger('reloadGrid');
        //                            $("#campos").show();

        //                        }
        //                        else {
        //                            $("#tdEquipo").show();
        //                            $('#grid').trigger('reloadGrid');
        //                            $('#lblmarca').text('');
        //                            $('#lblmodelo').text('');
        //                            $('#lblNumeroActivo').text('');
        //                            $('#lblFechaAdquisicion').text('');
        //                            $('#lblNumeroContrato').text('');
        //                            $('#lblNumeroOC').text('');
        //                            $("#ddlEquipo").append($("<option></option>").attr("value", "-1").text("Sin Datos"));
        //                            alerta("El empleado seleccionado no tiene el tipo de equipo seleccionado");
        //                        }
        //                    },
        //                    error: function (xhr, err, thrErr) {
        //                        MostrarErrorAjax(xhr, err, thrErr);
        //                    }
        //                });
        //            }
        //            else {
        //                $("#tdEquipo").hide();
        //                $("#campos").hide();
        //            }
        //        }









    });



    $('#ddlladp').live('change', function () {

        if ($('#ddlladp').val() == "False") {
            $('#txtempleado').prop('disabled', true);
        }
        else {
            $('#txtempleado').prop('disabled', false);
            $('#txtempleado').focus();
        }

        //        $('#ddlfacilidad').html('');

        //        obtenerfacilidad($(this).val());

        //}
    });




    $('#ddlsucursal').change(function () {

        // if ($('#hdfacilidad').val == '1') {


        //}
        //else if ($('#hdfacilidad').val == '2') {
        $('#ddlfacilidad').html('');

        obtenerfacilidad($(this).val());

        //}
    });
    $('#ddlsucursal').change();
    //$("#ddlususuarioweb").attr("disabled", "disabled");

    $("#chkusuarioweb").click(function () {

        var checkAll = $("#chkusuarioweb").prop('checked');
        //alert(checkAll);
        if (!checkAll) {

            $("#ddlususuarioweb").attr("disabled", "disabled");
        } else {
            $("#ddlususuarioweb").removeAttr("disabled");
        }

    });




    $("#chkeliminar").click(function () {

        validarCheckBox();
    });


    function validarCheckBox() {
        var chkelimina = $("#chkeliminar").prop("checked");

        if (!chkelimina) {
            $("#btnexcepto").button({ disabled: true });

        }
        else {
            $("#btnexcepto").button({ disabled: false });

        }
    }



    $("#ddlnombre").on("change", function () {
        var valor = $(this).val();
        $("#ddlformato").prop("disabled", false);
        if (valor == "UN CAMPO") {
            $("#ddlformato").prop("disabled", true);
        }
    });


    $("#ddlorganizacion").on("change", function () {
        var valor = $(this).val();
        $("#txtnombreou").prop("disabled", false);
        if (valor == "0") {
            $("#txtnombreou").prop("disabled", true);
        }
        else {
            $("#txtnombreou").focus();
        }
    });


    $("#ddlnombre").change();
    $("#ddlorganizacion").change();


    function obtenerfacilidad(sucursal) {
        if (sucursal != "0") {
            $.ajax({
                type: "POST",
                url: "Sin_Configura.aspx/GetFacilidades",
                data: "{'codigo': '" + sucursal + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    for (var i = 0; i < result.d.length; i++) {
                        $("#ddlfacilidad").append($("<option></option>").attr("value", result.d[i].Value).text(result.d[i].Display));
                    }


                    $("#ddlfacilidad").val($("#hdfacilidad").val());
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });

        }
        else {
            $("#ddlfacilidad").html('<option value="0">---Seleccione----</option>');
            return;
        }

        $("#btngrabar").click(function (event) {

            var vcCorreo = $("#txtmail").val();
            if (vcCorreo == "") {
                alert("Debe ingresar al menos una cuenta de correo");
                $("#txtmail").focus();
                return;
            }
            //        data: "{'oCompania': '" + oCompania + "'," +
            //                            "'vcCodCom': '" + vcCodCom.replace(/'/g, "&#39") + "'}",
            var origen = $("#ddlOrigen").val();
            var correo = $("#txtmail").val();
            var sucursal = $("#ddlsucursal").val();
            var facilidad = $("#ddlfacilidad").val();
            var nombre = $("#ddlnombre").val();
            var formato = $("#ddlformato").val();
            var rol = $("#ddlrol").val();
            var manejaweb = $("#chkusuarioweb").prop('checked');

            var usuweb = $("#ddlususuarioweb").val();
            var anexo = $("#chkanexo").prop('checked');
            var codigo = $("#chkcodigo").prop('checked');
            var manejaanexo = $("#chkuniranexo").prop('checked');
            var manejacodigo = $("#chkunircodigo").prop('checked');
            var elimina = $("#chkeliminar").prop('checked');

            var organizacion = $("#ddlorganizacion").val();
            var nodoorga = $("#txtnombreou").val();
            var setecorreo = $("#chkcorreo").prop('checked');
            var seteldap = $("#ddlladp").val();
            var campoldap = $("#txtempleado").val();
            var setemultisucursal = $("#chkMultisucursal").prop('checked');

            if (campoldap == "" && seteldap == "True") {
                alert("Debe ingresar un nodo");
                return;
            }
            function CerroMensaje() {

            }


            $.ajax({
                type: "POST",
                url: "Sin_Configura.aspx/GuardarSeteo",
                data: "{'origen': '" + origen + "','correo': '" + correo + "','sucursal': '" + sucursal +
            "','facilidad': '" + facilidad + "','nombre': '" + nombre + "','formato': '" + formato +
            "','rol': '" + rol + "','manejaweb': '" + manejaweb + "','usuweb': '" + usuweb +
            "','anexo': '" + anexo + "','codigo': '" + codigo + "','uniranexo': '" + manejaanexo +
            "','unircodigo': '" + manejacodigo + "','eliminar': '" + elimina +
            "','organizacion': '" + organizacion + "','nodoorga': '" + nodoorga +
             "','setecorreo': '" + setecorreo +
              "','seteldap': '" + seteldap +
               "','campoldap': '" + campoldap +
                "','setemultisucursal': '" + setemultisucursal +
             "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    if (result.d == "0") {
                        Mensaje("<br/><h1>Datos Grabados</h1><br/><h2>Seteos de origen!</h2>", document, CerroMensaje);
                    }
                    else {
                        alert("Problemas al guardar");
                    }
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        });


    }


    validarCheckBox();


    if ($('#chkMultisucursal').is(':checked')) {

        $('#btnMultisucursal').css('display', '');
        $("#ddlsucursal").prop('disabled', 'disabled');
        $("#ddlfacilidad").prop('disabled', 'disabled');

    }
    else {
        $('#btnMultisucursal').css('display', 'none');
        $("#ddlsucursal").removeAttr("disabled");
        $("#ddlfacilidad").removeAttr("disabled");
    }

    $('#chkMultisucursal').click(function () {
        if ($('#chkMultisucursal').is(':checked')) {

            $('#btnMultisucursal').css('display', '');
            $("#ddlsucursal").prop('disabled', 'disabled');
            $("#ddlfacilidad").prop('disabled', 'disabled');

        }
        else {
            $('#btnMultisucursal').css('display', 'none');
            $("#ddlsucursal").removeAttr("disabled");
            $("#ddlfacilidad").removeAttr("disabled");
        }
    });





    //---------Modal Multisucursal--------------------
    $('#btnMultisucursal').live("click", function (e) {


        var $width = 620;
        var $height = 295;
        var $Pagina = 'Sin_Sucursales.aspx';
        $("#iSucursales").attr("src", $Pagina);
        Modal = $('#dvSucursales').dialog({
            title: "Mantenimiento de Múltiples Sucursales",
            width: $width,
            height: $height,
            modal: true,
            position: ['center', 150],
            resizable: false
        });

    });





});

