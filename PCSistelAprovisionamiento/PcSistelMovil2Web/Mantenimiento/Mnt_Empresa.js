
function apr_Empresa() {
    this.IdEmpresa;
    this.RazonSocial;
    this.Ruc;
    this.Nombre;
    this.FechaFin;
}



var fila = 0;
var UsuarioEdit = ''
var EsEditar = 0;

$(function () {

    $("#fechaf").datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: 'dd/mm/yy'
    });

    ValidarNumeroEnCajaTexto("txtRuc", ValidarSoloNumero);
    // $("#btnActivar").button("disable");
    var indiceTab = window.parent.tab.tabs("option", "selected");

    $("#btnCerrar").click(function () {
        window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));
    });


    $("#btnGuardar").live("click", function () {

        BloquearPagina(true);

        var Apr_Empresa = new apr_Empresa()

        Apr_Empresa.IdEmpresa = $("#hdfIdEmpresa").val();
        Apr_Empresa.RazonSocial = $.trim($("#txtRazon").val());
        Apr_Empresa.Ruc = $.trim($("#txtRuc").val());
        Apr_Empresa.Nombre = $.trim($("#txtNombre").val());
        Apr_Empresa.FechaFin = $("#fechaf").val();


        if (Apr_Empresa.Nombre == "") {
            alertaExterna("El nombre de la Empresa es un campo obligatorio.");
            BloquearPagina(false);
            $("#txtNombre").focus();
            return;
        }

        if (Apr_Empresa.RazonSocial == "") {
            alertaExterna("La Razón Social de la Empresa es un campo obligatorio.");
            BloquearPagina(false);
            $("#txtRazon").focus();
            return;
        }

        if (Apr_Empresa.Ruc == "") {
            alertaExterna("El Ruc de la Empresa es un campo obligatorio.");
            BloquearPagina(false);
            $("#txtRuc").focus();
            return;
        }

        if (Apr_Empresa.Ruc.length < 11) {
            alertaExterna("La Ruc de la Empresa debe tener menos de 11 dígitos.");
            BloquearPagina(false);
            $("#txtRuc").focus();
            return;
        }

        
        var oApr_Empresa = JSON.stringify(Apr_Empresa);


        var datosTitulares = $('#grid').jqGrid('getGridParam', 'data')

        var xmlTitulares = "<?xml version=\"1.0\" encoding=\"iso-8859-1\"?><TABLE>";

        if (datosTitulares.length < 1) {
            BloquearPagina(false);
            alertaExterna("Ingrese por lo menos 1 titular.");
            return;
        }

        for (var i = 0; i < datosTitulares.length; i++) {

            var IdTitular = datosTitulares[i].IdTitular;
            var IdEmpresa = datosTitulares[i].IdEmpresa;
            var Nombres = datosTitulares[i].Nombres;
            var Apellidos = datosTitulares[i].Apellidos;
            var Usuario = datosTitulares[i].Usuario;
            var Contrasena = datosTitulares[i].Contrasena;
            var btVig = datosTitulares[i].btVig;
            var Correo = datosTitulares[i].Correo;

            xmlTitulares += "<DATA IdTitular=\"" + IdTitular + "\" IdEmpresa=\"" + IdEmpresa + "\" Nombres=\"" + Nombres;
            xmlTitulares += "\" Apellidos=\"" + Apellidos + "\" Usuario=\"" + Usuario + "\" Contrasena=\"" + Contrasena + "\" btVig=\"" + btVig + "\" Correo=\"" + Correo + "\"/>";

        }

        xmlTitulares += "</TABLE>";

        debugger;
        var fecha = $("#fechaf").val();

        if(fecha.trim()!=''){
            var anio = fecha.substring(6, 10);
            var mes = fecha.substring(3, 5);
            var dia = fecha.substring(0, 2);
            var fec_bd = '';
            fec_bd = anio + '' + mes + '' + dia;

            $.ajax({
                type: "POST",
                url: "Mnt_Empresa.aspx/Guardar",
                data: "{'oEmpresa': '" + oApr_Empresa + "','xmlTitulares':'" + xmlTitulares + "','fechafin':'" + fec_bd + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {

                    if (result.d == '1') {
                        BloquearPagina(false);
                        alertaExterna("Error grabando los datos");
                        // $("#txtvcUsu").focus();
                        return;
                    }
                    else {
                        //if ($("#hdfEsllamadaExterna").val() != "1") {
                        //    window.parent.ActualizarGrilla();
                        //}
                        window.parent.ActualizarGrilla();
                        Mensaje("<br/><h1>Registro guardado</h1><h2> Empresa:  " + Apr_Empresa.Nombre + "</h2>", document, CerroMensaje);
                    }
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                    BloquearPagina(false);
                }
            });
        } else {
            alertaExterna("Seleccione una fecha para el fin de contrato.");
        }

        


    });

    $("#btnAgregar").live("click", function () {

        EsEditar = 0;

        $("#lbl_error").html("");
        $("#txtnombreT1").val("");
        $("#txtapeT1").val("");
        $("#txtUsuario").val("");
        $("#txtContrasena").val("");
        $("#txtCorreo").val("");
        var dlgTitulares = $('#div_modal_titular').dialog({
            title: 'Agregar Titulares',
            width: 280,
            height: 260,
            modal: true,
            resizable: false,
            position: ['center'],
            autoOpen: true
        });
    });


    $("#btnTituAdd").click(function () {

        var datos = $('#grid').jqGrid('getGridParam', 'data')

        var Nombres = $("#txtnombreT1").val();
        var Apellidos = $("#txtapeT1").val();
        var Usuario = $("#txtUsuario").val();
        var Contrasena = $("#txtContrasena").val();
        var Correo = $("#txtCorreo").val();
        var Estado = ($("#chkActivo").is(':checked') == true ? "Activo" : "Inactivo");
        var btVig = ($("#chkActivo").is(':checked') == true ? 1 : 0);


        if (Nombres == "") {
            $("#lbl_error").html("*Ingrese Nombres del Titular");
            return;
        }

        if (Apellidos == "") {
            $("#lbl_error").html("*Ingrese Apellidos del Titular");
            return;
        }

        if (Usuario == "") {
            $("#lbl_error").html("*Ingrese Usuario del Titular");
            return;
        }

        for (var i = 0; i < datos.length; i++) {

            if (datos[i].Usuario == Usuario && Usuario != UsuarioEdit) {
                $("#lbl_error").html("*el Usuario " + Usuario + " ya se encuentra ingresado");
                return;
            }
        }

        if (validarEmail2($.trim(Correo)) == false) {
            $("#lbl_error").html("*Revisar el formato del Correo xxxxx@xxx.xxx");
            $("#txtCorreo").focus();
            return;
        }

        if (EsEditar == 0) {
            var datarow = { Fila: fila, IdTitular: 0, IdEmpresa: $("#hdfIdEmpresa").val(), Nombres: Nombres, Apellidos: Apellidos, Usuario: Usuario, Contrasena: Contrasena, Password: '************', btVig: 1, Estado: 'Activo', Correo: Correo };
            $("#grid").jqGrid('addRowData', fila, datarow);


            fila = fila + 1;
        }
        else {
            var id = $("#grid").jqGrid('getGridParam', 'selrow');
            $("#grid").jqGrid('setCell', id, 'Nombres', Nombres);
            $("#grid").jqGrid('setCell', id, 'Apellidos', Apellidos);
            $("#grid").jqGrid('setCell', id, 'Usuario', Usuario);
            $("#grid").jqGrid('setCell', id, 'Contrasena', Contrasena);
            $("#grid").jqGrid('setCell', id, 'Correo', Correo);
            $("#grid").jqGrid('setCell', id, 'Estado', Estado);
            $("#grid").jqGrid('setCell', id, 'btVig', btVig);
        }


        $("#grid").trigger("reloadGrid");
        $('#div_modal_titular').dialog('close');

    });


    $('#btnEditar').click(function () {
        EsEditar = 1;

        var id = $("#grid").jqGrid('getGridParam', 'selrow');

        if (id) {
            var datos = $("#grid").jqGrid('getRowData', id);

            $("#lbl_error").html("");
            $("#txtnombreT1").val(datos.Nombres);
            $("#txtapeT1").val(datos.Apellidos);
            $("#txtUsuario").val(datos.Usuario);
            $("#txtContrasena").val(datos.Contrasena);
            $("#txtCorreo").val(datos.Correo);

            if (datos.Estado == "Activo") {
                $('#chkActivo').prop('checked', true);
            }
            else {
                $('#chkActivo').prop('checked', false);
            }



            UsuarioEdit = datos.Usuario;

            var dlgTitulares = $('#div_modal_titular').dialog({
                title: 'Editar Titulares',
                width: 280,
                height: 260,
                modal: true,
                resizable: false,
                position: ['center'],
                autoOpen: true
            });

            $("#txtnombreT1").prop("disabled", "disabled");
            $("#txtapeT1").prop("disabled", "disabled");
            $("#txtUsuario").prop("disabled", "disabled");
            $("#txtContrasena").prop("disabled", "disabled");
            $("#txtCorreo").prop("disabled", "disabled");
            $("#chkActivo").prop("disabled", "disabled");
            $("#btnTituAdd").prop("style", "visibility:hidden");
        }




    });


    $('#btnEliminar').click(function () {
        var id = $("#grid").jqGrid('getGridParam', 'selrow');
        //$('#grid').jqGrid('delRowData', id);
        $("#grid").jqGrid('setCell', id, 'btVig', 0);
        $("#grid").jqGrid('setCell', id, 'Estado', 'Inactivo');
        $("#grid").trigger("reloadGrid");
    });

    $('#btnActivar').click(function () {

        var id = $("#grid").jqGrid('getGridParam', 'selrow');
        $("#grid").jqGrid('setCell', id, 'btVig', 1);
        $("#grid").jqGrid('setCell', id, 'Estado', 'Activo');
        $("#grid").trigger("reloadGrid");
    });


    $('#btnRestablecer').click(function () {

        var id = $("#grid").jqGrid('getGridParam', 'selrow');
        if (id) {

            var datos = $("#grid").jqGrid('getRowData', id);
            var Usuario = datos.Usuario;
            var IdEmpresa = datos.IdEmpresa;

            $("#MsgConfirmacionEliminar").dialog({
                title: "Confirmación",
                modal: true,
                buttons: {
                    "Si": function () {

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "Mnt_Empresa.aspx/RestablecerContrasena",
                            data: "{'IdEmpresa': " + $("#hdfIdEmpresa").val() + ",'Usuario':'" + Usuario + "'}",
                            dataType: "json",
                            success: function (result) {

                                $("#grid").trigger("reloadGrid");

                            },
                            error: function (result) {
                                alert("Error");
                            }
                        });

                        alertaExterna("La contraseña ha sido restablecida se enviara un correo al usuario.");

                        $(this).dialog("close");

                    },
                    "No": function () {
                        $(this).dialog("close");
                    }
                },
                resizable: false
            });


        }
        else {
            alertaExterna("Seleccione un Usuario.");
        }


    });

    function CerroMensaje() {
        BloquearPagina(false);
        if ($("#hdfIdServidor").val() == "0") {

            $("#txtNombre").val("");
            $("#txtNombre").focus();

        }
        else {
            //window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));
            window.parent.tab.tabs("remove", indiceTab);
        }
    }


    var tbDetalle = $("#grid").jqGrid({
        sortable: true,
        datatype: "local",
        colModel: [
                      { name: 'Fila', index: 'Fila', label: 'Fila', hidden: true, width: 60, sortable: false },
                       { name: 'IdTitular', index: 'IdTitular', label: 'IdTitular', hidden: true, key: true, width: 60, sortable: false },
                       { name: 'IdEmpresa', index: 'IdEmpresa', label: 'IdEmpresa', hidden: true, key: true, width: 60, sortable: false },

                       { name: 'Nombres', index: 'Nombres', label: 'Nombres', hidden: false, width: 120, align: 'left', editable: true, sortable: false },
                       { name: 'Apellidos', index: 'Apellidos', label: 'Apellidos', hidden: false, width: 140, align: 'left', sortable: false },
                       { name: 'Usuario', index: 'Usuario', label: 'Usuario', hidden: false, width: 120, align: 'left', sortable: false },
                       { name: 'Contrasena', index: 'Contrasena', label: 'Contraseña', hidden: true, width: 120, sortable: false },
                       { name: 'Password', index: 'Password', label: 'Contraseña', hidden: false, width: 80, align: 'center', sortable: false },
                       { name: 'btVig', index: 'btVig', label: 'btVig', hidden: true, width: 130, sortable: false },
                       { name: 'Estado', index: 'Estado', label: 'Estado', hidden: false, width: 60, align: 'center', sortable: false },
                       { name: 'Correo', index: 'Correo', label: 'Correo', hidden: false, width: 140, sortable: false }

   	                  ],
        ondblClickRow: function (id) {

            EditarFeriado()
            //var anio = ($('#txtAnio').val() == "" ? 0 : $('#txtAnio').val());

        },
        pagination: true,
        viewrecords: true,
        loadtext: 'Cargando datos...',
        recordtext: "{0} - {1} de {2} días",
        emptyrecords: 'No hay resultados',
        sortname: "Fila", //sortname: idTabla, //Default SortColumn
        sortorder: "asc", //Default SortOrder.
        rownumbers: true,
        shrinkToFit: false,
        width: 735,
        height: 150
        //  caption: "Titulares",
        //cellEdit: true


    }).navGrid("#pager", { edit: false, add: false, search: false, del: false });


    function ModalTitulares() {

    }


    function ListarUnaEmpresa() {

        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "Mnt_Empresa.aspx/ListaUnaEmpresa",
            data: "{'IdEmpresa':" + $("#hdfIdEmpresa").val() + "}",
            dataType: "json",
            success: function (result) {

                var lstEmpresa = result.d;

                $("#txtNombre").val(lstEmpresa[0].Nombre);
                $("#txtRazon").val(lstEmpresa[0].RazonSocial);
                $("#txtRuc").val(lstEmpresa[0].Ruc);
                $("#fechaf").val(lstEmpresa[0].FechaFin);

                var Titulares = lstEmpresa[0].Titulares;

                for (var i = 0; i < Titulares.length; i++) {

                    var datarow = { Fila: fila, IdTitular: Titulares[i].IdTitular, IdEmpresa: Titulares[i].IdEmpresa
                                    , Nombres: Titulares[i].Nombres, Apellidos: Titulares[i].Apellidos
                                    , Usuario: Titulares[i].Usuario, Contrasena: Titulares[i].Contrasena
                                    , Password: '************'
                                    , btVig: Titulares[i].btVig, Estado: (Titulares[i].btVig == true ? 'Activo' : 'Inactivo')
                                    , Correo: Titulares[i].Correo
                    };
                    $("#grid").jqGrid('addRowData', fila, datarow);

                    fila = fila + 1;
                }

                $("#grid").trigger("reloadGrid");

            },
            error: function (result) {
                alert("Error");
            }
        });

    }
    ListarUnaEmpresa();
});
