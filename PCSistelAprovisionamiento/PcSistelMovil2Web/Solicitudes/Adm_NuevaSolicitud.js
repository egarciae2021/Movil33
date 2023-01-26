var TitularesSolicitud = [];
var Selecciono = false;
var TipoLicencia;


var oCultura = { dcNumDec: '2', vcSimDec: '.', vcSimSepMil: ',', Moneda: { vcSimMon: 'S/.'} };


function Dominio() {
    this.NombreEmpresa;
    this.RazonSocial;
    this.CodPais;
    this.Ruc
    this.FechaInicial;
    this.FechaFinal;
    this.Observacion;
    this.Descripcion;
    this.TipoLicencia;
    this.Lineas;
    this.Titulares = [];
}


function Solicitud() {

    this.IdSolicitud;
    this.IdOperador;
    this.IdEstado;
    this.IdTipoSolicitud;
    this.Codigo;
    this.NombreEmpresa;
    this.RazonSocial;
    this.Ruc;
    this.IdPais;
    this.Logo;
    this.FechaInicioContrato;
    this.FechaFinContrato;
    this.ObservacionContrato;
    this.DescripcionContrato;
    this.IdTipoLicencia;
    this.Lineas;
    this.Dominio;
    this.IdInstanciaBD;
    this.IdInstanciaAPP;
    this.FechaenProceso;
    this.FechaCulminada;
    this.FechaAnulada;
    this.TecnicoAsignado;
    this.TecnicoProcesar;
    this.Comentarios;
    this.FechaRegistro;
    this.IdUsuarioRegistro;
    this.Titulares = [];
}


function SolicitudTitulares() {

    this.IdSolicitudTitular;
    this.Nombre;
    this.Apellido;
    this.Usuario;
    this.Correo;
}


function Titulares(nombre, apellido, correo) {

    //this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.correo = correo;
    //this.usuario = usuario;
    //this.pass = pass;
}


$(document).ready(function () {

    var vMaximoUsuario;

    ValidarNumeroEnCajaTexto("txtLineas", ValidarSoloNumero, oCultura, true);
    ValidarNumeroEnCajaTexto("txtRuc", ValidarSoloNumero);
    //ValidarNumeroEnCajaTexto("txtLineas", ValidarSoloNumero);


    $("#txtFechaI").keypress(ValidarFecha);
    $("#txtFechaFin").keypress(ValidarFecha);

    $("#txtFechaI").datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: 'dd/mm/yy'
    });

    $("#txtFechaFin").datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: 'dd/mm/yy'
    });

    ListarTipoSolicitud();

    //$("#tdADDTitulares").show();

    $("#ddlTipo").change(function () {
        var codTipo = $("#ddlTipo").val();
        var TipoSolicitud = $($("#ddlTipo option:selected")[0]).text();

        LimpiarControles();
        BloquearControles(codTipo);

        if (codTipo == "1" || TipoSolicitud == "Alta") {
            $("#dvSolicitudAlta").css({ display: "" });
            $("#tdADDTitulares").show();
            $("#trEmpresaBusqueda").hide();
        }
        else if (codTipo == "3" || TipoSolicitud == "Upgrade") {
            $("#dvSolicitudAlta").css({ display: "none" });
            $("#tdADDTitulares").show();
            $("#trEmpresaBusqueda").show();

        }
        else {
            $("#dvSolicitudAlta").css({ display: "none" });
            $("#tdADDTitulares").show();
            $("#trEmpresaBusqueda").hide();
        }

        //if ($("#hdfEditar").val() == "1") {
        //    $("#dvSolicitudAlta").css({ display: "" });
        //}


    });


    $("#grid").jqGrid({
        datatype: "local",
        colNames: ['IdSolicitudTitular', 'Nombre', 'Apellido', 'Correo'],
        colModel: [
            { name: 'IdSolicitudTitular', index: 'IdSolicitudTitular', width: 60, sorttype: "int", hidden: true },
            { name: 'Nombre', index: 'Nombre', width: 140, sortable: false },
            { name: 'Apellido', index: 'Apellido', width: 140, sortable: false },
             { name: 'Correo', index: 'Correo', width: 180, sortable: false },
        //{ name: 'usuario', index: 'amount', width: 80 },
        //{ name: 'pass', index: 'note', width: 120 }
        ],
        //pager: '#pgrid',
        height: 150,
        width: 600,
        loadtext: 'Cargando datos...',
        //recordtext: '{0} - {1} de {2} Titulares',
        emptyrecords: 'No hay resultados',
        //pgtext: 'Pág: {0} de {1}',
        rowNum: 10,
        //rowList: [10, 20, 30],
        viewrecords: true,
        //multiselect: true,
        shrinkToFit: true,
        caption: "Lista de Titulares"
    });



    $("#btnDel").click(function () {

        var id = $("#grid").jqGrid('getGridParam', 'selrow');


        if (id) {
            TitularesSolicitud.splice(id - 1, 1);
            cargarTitulares();
        }
        else {
            alertaExterna('Seleccione un registro'); return;
        }

    });

    $("#btnADD").click(function () {

        vMaximoUsuario = $("#ddLicencia option:selected").attr("numerousuario");

        if ($("#grid").getGridParam("reccount") >= vMaximoUsuario) {
            alertaExterna("Tipo de Suscripción solo permite hasta: " + vMaximoUsuario + " titulares");
            BloquearPagina(false);
            return;
        }


        $("#hdfEditarTitular").val("1");

        $("#txtnombreT1").val("");
        $("#txtapeT1").val("");
        $("#txtcorreoT1").val("");

        var dlgTitulares = $('#div_modal_titular').dialog({
            title: 'Agregar Titulares',
            width: 280,
            height: 200,
            modal: true,
            resizable: false,
            position: ['center'],
            autoOpen: true
        });

    });

    $('#btnEditar').click(function () {
        EsEditar = 1;

        var id = $("#grid").jqGrid('getGridParam', 'selrow');

        if (id) {
            var datos = $("#grid").jqGrid('getRowData', id);


            $("#hdfEditarTitular").val("2");
            $("#txtnombreT1").val(datos.Nombre);
            $("#txtapeT1").val(datos.Apellido);
            $("#txtcorreoT1").val(datos.Correo);



            var dlgTitulares = $('#div_modal_titular').dialog({
                title: 'Editar Titulares',
                width: 280,
                height: 200,
                modal: true,
                resizable: false,
                position: ['center'],
                autoOpen: true
            });
        }
        else {
            alertaExterna('Seleccione un registro'); return;
        }


    });

    $("#btnTituCerrar").click(function () {
        $('#div_modal_titular').dialog('close');
    });

    $("#btnTituAdd").click(function () {
        var CorreoPersonal = $("#txtcorreoT1").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92");

        if ($("#txtnombreT1").val() == "") {
            $("#lbl_error").html("*Ingrese Nombre del Titular");
            return;
        }
        if ($("#txtapeT1").val() == "") {
            $("#lbl_error").html("*Ingrese Apellido del Titular");
            return;
        }
        if ($("#txtcorreoT1").val() == "") {
            $("#lbl_error").html("*Ingrese Correo del Titular");
            return;
        }

        if (validarEmail2($.trim(CorreoPersonal)) == false) {
            $("#lbl_error").html("*Revisar el formato del Correo xxxxx@xxx.xxx");
            $("#txtcorreoT1").focus();
            return;
        }

        var oTitular1 = new SolicitudTitulares();

        if ($("#hdfEditarTitular").val() == "1") {

            oTitular1.IdSolicitudTitular = 0;
            oTitular1.Nombre = $("#txtnombreT1").val();
            oTitular1.Apellido = $("#txtapeT1").val();
            oTitular1.Correo = $("#txtcorreoT1").val();
            TitularesSolicitud.push(oTitular1);

        }
        else {
            var id = $("#grid").jqGrid('getGridParam', 'selrow');
            var datos = $("#grid").jqGrid('getRowData', id);

            TitularesSolicitud[id - 1].Nombre = $("#txtnombreT1").val();
            TitularesSolicitud[id - 1].Apellido = $("#txtapeT1").val();
            TitularesSolicitud[id - 1].Correo = $("#txtcorreoT1").val();

        }





        $('#txtnombreT1').val("");
        $('#txtapeT1').val("");
        $('#txtcorreoT1').val("");
        $("#lbl_error").html("");

        cargarTitulares();
        $('#div_modal_titular').dialog('close');
    });



    $("#btnFinalizar").click(function () {
        //window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));        

        vMaximoUsuario = $("#ddLicencia option:selected").attr("numerousuario");

        if ($("#grid").getGridParam("reccount") == 0) {
            alertaExterna("Ingrese al menos un Titular");
            BloquearPagina(false);
            return;
        }

        if ($("#grid").getGridParam("reccount") > vMaximoUsuario) {
            alertaExterna("Tipo de Suscripción solo permite hasta: " + vMaximoUsuario + " titulares");
            BloquearPagina(false);
            return;
        }


        BloquearPagina(true);

        if ($("#txtnomempresa").val() == "") {
            alertaExterna("El nombre de la empresa es un Campo Obligatorio.");
            $("#txtCodigo").focus();
            BloquearPagina(false);
            return;
        }

        if ($("#txtrazon").val() == "") {
            alertaExterna("Razón Social es un Campo Obligatorio.");
            $("#txtrazon").focus();
            BloquearPagina(false);
            return;
        }

        if ($("#txtRuc").val() == "") {
            alertaExterna("El número de RUC es un Campo Obligatorio.");
            $("#txtRuc").focus();
            BloquearPagina(false);
            return;
        }

        if ($("#txtRuc").val().length < 11) {
            alertaExterna("El número de ruc debe tener mínimo 11 caracteres");
            $("#txtRuc").focus();
            BloquearPagina(false);
            return;
        }

        if ($("#txtFechaI").val() == "") {
            alertaExterna("La fecha de inicio es un Campo Obligatorio.");
            $("#txtFechaI").focus();
            BloquearPagina(false);
            return;
        }
        if ($("#txtFechaFin").val() == "") {
            alertaExterna("La fecha final es un Campo Obligatorio.");
            $("#txtFechaFin").focus();
            BloquearPagina(false);
            return;
        }
        if ($("#txtLineas").val() == "") {
            alertaExterna("El número de líneas es un Campo Obligatorio.");
            $("#txtLineas").focus();
            BloquearPagina(false);
            return;
        }

        /////////////////


        //var oDominio = new Dominio();
        //oDominio.NombreEmpresa = $("#txtnomempresa").val();
        //oDominio.RazonSocial = $("#txtrazon").val();
        //oDominio.CodPais = $("#ddlPais").val();
        //oDominio.Ruc = $("#txtRuc").val();
        //oDominio.FechaInicial = $("#txtFechaI").val();
        //oDominio.FechaFinal = $("#txtFechaFin").val();
        //oDominio.Observacion = $("#txtObs").val();
        //oDominio.Descripcion = $("#txtdesc").val();
        //oDominio.TipoLicencia = $("#ddLicencia").val();
        //oDominio.Lineas = $("#txtLineas").val();
        //
        //var oTitular1 = new Titulares();
        //oTitular1.Nombre = $("#txtnombreT1").val();
        //oTitular1.Apellido = $("#txtapeT1").val();
        //oTitular1.usuario = $("#txtcorreoT1").val();
        //oDominio.Titulares.push(oTitular1);
        //
        //var oTitular2 = new Titulares();
        //oTitular2.Nombre = $("#txtnombreT2").val();
        //oTitular2.Apellido = $("#txtapeT2").val();
        //oTitular2.usuario = $("#txtcorreoT2").val();
        //oDominio.Titulares.push(oTitular2);


        var oSolicitud = new Solicitud();

        oSolicitud.IdSolicitud = ($("#hdfTipoGuardar").val() == "1" ? 0 : $("#hdfIdSolicitud").val());
        //oSolicitud.IdOperador = 0;
        //oSolicitud.IdEstado=0;
        oSolicitud.IdTipoSolicitud = ($("#hdfTipoGuardar").val() == "1" ? $("#ddlTipo").val() : $("#hdfTipoSolicitud").val());
        //oSolicitud.Codigo = 0;
        oSolicitud.NombreEmpresa = $("#txtnomempresa").val();
        oSolicitud.RazonSocial = $("#txtrazon").val();
        oSolicitud.Ruc = $("#txtRuc").val();
        oSolicitud.IdPais = $("#ddlPais").val();
        //oSolicitud.Logo = "";
        oSolicitud.FechaInicioContrato = $("#txtFechaI").val();
        oSolicitud.FechaFinContrato = $("#txtFechaFin").val();
        oSolicitud.ObservacionContrato = $("#txtObs").val();
        oSolicitud.DescripcionContrato = $("#txtdesc").val();
        oSolicitud.IdTipoLicencia = $("#ddLicencia").val();
        oSolicitud.Lineas = DevuelveNumeroSinFormato($("#txtLineas").val(), oCultura, true);
        //oSolicitud.Dominio = "";
        //oSolicitud.IdInstanciaBD = 0;
        //oSolicitud.IdInstanciaAPP = 0;
        //oSolicitud.FechaenProceso = 0;
        //oSolicitud.FechaCulminada = 0;
        //oSolicitud.FechaAnulada = 0;
        //oSolicitud.TecnicoAsignado = 0;
        //oSolicitud.TecnicoProcesar = 0;
        //oSolicitud.Comentarios = 0;
        //oSolicitud.FechaRegistro = 0;
        //oSolicitud.IdUsuarioRegistro = 0;





        for (var i = 0; i < TitularesSolicitud.length; i++) {

            var oTitular = new SolicitudTitulares();
            oTitular.IdSolicitudTitular = TitularesSolicitud[i].IdSolicitudTitular;
            oTitular.Nombre = TitularesSolicitud[i].Nombre;
            oTitular.Apellido = TitularesSolicitud[i].Apellido;
            oTitular.Correo = TitularesSolicitud[i].Correo;
            oSolicitud.Titulares.push(oTitular);
        }


        //oSolicitud.Titulares.push(TitularesSolicitud);
        //var oTitular1 = new Titulares();
        //oTitular1.Nombre = $("#txtnombreT1").val();
        //oTitular1.Apellido = $("#txtapeT1").val();
        //oTitular1.Correo = $("#txtcorreoT1").val();
        //oSolicitud.Titulares.push(oTitular1);
        //
        //var oTitular2 = new Titulares();
        //oTitular2.Nombre = $("#txtnombreT2").val();
        //oTitular2.Apellido = $("#txtapeT2").val();
        //oTitular2.Correo = $("#txtcorreoT2").val();
        //oSolicitud.Titulares.push(oTitular2);


        if (TipoLicencia != "" & TipoLicencia >= oSolicitud.IdTipoLicencia) {
            alertaExterna("La Licencia para Upgrade debe ser mayor a la actual.");
            BloquearPagina(false);
            return;
        }

        $.ajax({
            type: "POST",
            url: "Adm_NuevaSolicitud.aspx/registrarEditar_Solicitud",
            //data: "{'oCompania': '" + oCompania + "'}",

            data: "{'prSolicitud': '" + JSON.stringify(oSolicitud) + "','TipoGuardar':'" + $("#hdfTipoGuardar").val() + "'}",


            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.d == "ok") {
                    Mensaje("<br/><h1>Solicitud guardada</h1>", document, CerroMensaje);
                    window.parent.$("#grid").trigger("reloadGrid");
                    //window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));
                }

                else if (result.d == "2") {
                    alertaExterna("La fecha fin no puede ser menor o igual que la fecha de inicio");
                    BloquearPagina(false);
                }

                else {
                    alertaExterna("Ocurrió un error al ingresar la Solicitud vuelva a intentarlo");
                    //alerta("El Código de la Sucursal ya ha sido registrado anteriormente, no se pudo grabar el registro");
                    //BloquearPagina(false);
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
                BloquearPagina(false);
            }
        });

    });

    $("#btnCancelar").click(function () {
        window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));
    });

    function cargarTitulares() {
        $("#grid").jqGrid("clearGridData", true);
        for (var i = 0; i < TitularesSolicitud.length; i++) {
            $("#grid").jqGrid('addRowData', i + 1, TitularesSolicitud[i]);
        }
    };



    if ($("#hdfEditar").val() == "1") {
        $("#dvSolicitudAlta").css({ display: "" });
        ListarUnaSolicitud();
    }

    function ListarUnaSolicitud() {

        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "Adm_NuevaSolicitud.aspx/ListarUnaSolicitud",
            data: "{'IdSolicitud':" + $("#hdfIdSolicitud").val() + "}",
            dataType: "json",
            success: function (result) {

                var lsSolicitud = result.d;

                $("#txtnomempresa").val(lsSolicitud[0].NombreEmpresa);
                $("#txtrazon").val(lsSolicitud[0].RazonSocial);
                $("#txtRuc").val(lsSolicitud[0].Ruc);
                $("#ddlPais").val(lsSolicitud[0].IdPais);
                $("#txtFechaI").val(lsSolicitud[0].FechaInicioContrato);
                $("#txtFechaFin").val(lsSolicitud[0].FechaFinContrato);
                $("#txtObs").val(lsSolicitud[0].ObservacionContrato);
                $("#txtdesc").val(lsSolicitud[0].DescripcionContrato);
                $("#ddLicencia").val(lsSolicitud[0].IdTipoLicencia);
                $("#txtLineas").val(FormatoNumero(lsSolicitud[0].Lineas, oCultura, true));
                $("#hdfTipoSolicitud").val(lsSolicitud[0].IdTipoSolicitud);

                vMaximoUsuario = lsSolicitud[0].NumeroUsuario;

                //alert(vMaximoUsuario);

                for (var i = 0; i < lsSolicitud[0].Titulares.length; i++) {

                    var oTitular = new SolicitudTitulares();
                    oTitular.IdSolicitudTitular = lsSolicitud[0].Titulares[i].IdSolicitudTitular;
                    oTitular.Nombre = lsSolicitud[0].Titulares[i].Nombre;
                    oTitular.Apellido = lsSolicitud[0].Titulares[i].ApellidoPaterno;
                    oTitular.Correo = lsSolicitud[0].Titulares[i].Correo;
                    TitularesSolicitud.push(oTitular);
                }
                cargarTitulares();

            },
            error: function (result) {
                alert("Error");
            }
        });

    }

    function ListarxEmpresa() {

        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "Adm_NuevaSolicitud.aspx/ListarxEmpresa",
            data: "{'IdEmpresa':" + $("#hdfIdSolicitud").val() + "}",
            dataType: "json",
            success: function (result) {

                var lsSolicitud = result.d;

                if (lsSolicitud.length > 0) {
                    $("#txtnomempresa").val(lsSolicitud[0].NombreEmpresa);
                    $("#txtrazon").val(lsSolicitud[0].RazonSocial);
                    $("#txtRuc").val(lsSolicitud[0].Ruc);
                    $("#ddlPais").val(lsSolicitud[0].IdPais);
                    $("#txtFechaI").val(lsSolicitud[0].FechaInicioContrato);
                    $("#txtFechaFin").val(lsSolicitud[0].FechaFinContrato);
                    $("#txtObs").val(lsSolicitud[0].ObservacionContrato);
                    $("#txtdesc").val(lsSolicitud[0].DescripcionContrato);
                    $("#ddLicencia").val(lsSolicitud[0].IdTipoLicencia);
                    $("#txtLineas").val(lsSolicitud[0].Lineas);
                    $("#hdfTipoSolicitud").val(lsSolicitud[0].IdTipoSolicitud);

                    vMaximoUsuario = lsSolicitud[0].NumeroUsuario;

                    for (var i = 0; i < lsSolicitud[0].Titulares.length; i++) {

                        var oTitular = new SolicitudTitulares();
                        oTitular.IdSolicitudTitular = lsSolicitud[0].Titulares[i].IdSolicitudTitular;
                        oTitular.Nombre = lsSolicitud[0].Titulares[i].Nombre;
                        oTitular.Apellido = lsSolicitud[0].Titulares[i].Apellido;
                        oTitular.Correo = lsSolicitud[0].Titulares[i].Correo;
                        TitularesSolicitud.push(oTitular);
                    }
                    cargarTitulares();

                    //Dato necesario para verificar el tipo de licencia
                    TipoLicencia = lsSolicitud[0].IdTipoLicencia;
                    $("#dvSolicitudAlta").show();
                }


            },
            error: function (result) {
                alert("Error");
            }
        });

    }

    function CerroMensaje() {
        BloquearPagina(false);
        window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));

    }
    //$("#hdfOperador").val()

    if ($("#txtEmpresaBusqueda").length > 0) {
        Selecciono = false;
        $("#txtEmpresaBusqueda").autocomplete({
            minLength: 0,
            source: function (request, response) {
                $.ajax({
                    type: "POST",
                    url: "Adm_NuevaSolicitud.aspx/ListarEmpresa_x_Criterio",
                    data: "{'vcCriterio': '" + $("#txtEmpresaBusqueda").val() + "','Operador': '" + $("#hdfOperador").val() + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        response($.map(result.d, function (item) {
                            return {
                                label: item.Nombre,
                                P_inCod: item.IdEmpresa
                            }
                        }));
                    },
                    error: function (xhr, err, thrErr) {
                        MostrarErrorAjax(xhr, err, thrErr);
                    }
                });
            },
            focus: function (event, ui) {
                $("#txtEmpresaBusqueda").val(ui.item.label);
                return false;
            },
            select: function (event, ui) {
                Selecciono = true;
                $("#txtEmpresaBusqueda").val(ui.item.label);
                $("#hdfIdSolicitud").val(ui.item.P_inCod);
                TitularesSolicitud = [];
                ListarxEmpresa();
                return false;
            },
            change: function (event, ui) {
                if (!Selecciono) {
                    //$("#txtServicio").val("");
                    $("#dvSolicitudAlta").hide();
                    LimpiarControles();
                }
                return false;
            },
            open: function (event, ui) {
                Selecciono = false;
                return false;
            }
        })
        .data("autocomplete")._renderItem = function (ul, item) {
            return $("<li></li>")
			    .data("item.autocomplete", item)
			    .append("<a>" + item.P_inCod + "=" + item.label + "</a>")
			    .appendTo(ul);
        };
    };


    function ListarTipoSolicitud() {
        $("#ddlTipo").append($("<option></option>").attr("value", -1).text("Seleccione"));
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "Adm_NuevaSolicitud.aspx/ListarTipoSolicitud",
            data: "{}",
            dataType: "json",
            success: function (result) {

                var lstTipoSolicitud = result.d;

                $(lstTipoSolicitud).each(function () {
                    $("#ddlTipo").append($("<option></option>").attr("value", this.IdTipoSolicitud).text(this.Nombre));
                });

            },
            error: function (result) {
                alert("Error");
            }
        });
    }


    function LimpiarControles() {
        $("#txtEmpresaBusqueda").val("");
        $("#hdfIdSolicitud").val("");
        $("#txtnomempresa").val("");
        $("#txtrazon").val("");
        $("#txtRuc").val("");
        $("#ddlPais").val("1");
        $("#txtFechaI").val("");
        $("#txtFechaFin").val("");
        $("#txtObs").val("");
        $("#txtdesc").val("");
        $("#ddLicencia").val("1");
        $("#txtLineas").val("");
        $("#hdfTipoSolicitud").val("");
        $("#grid").jqGrid("clearGridData", true);
        TitularesSolicitud = [];

    }

    function BloquearControles(IdTipo) {

        if (IdTipo == "1") {
            $("#txtnomempresa").prop('disabled', false);
            $("#txtrazon").prop('disabled', false);
            $("#txtRuc").prop('disabled', false);
            $('#ddlPais').removeAttr('disabled');
            $("#txtFechaI").prop('disabled', false);
            $("#txtFechaFin").prop('disabled', false);
            $("#txtObs").prop('disabled', false);
            $("#txtdesc").prop('disabled', false);
            $("#ddLicencia").removeAttr('disabled');
            $("#txtLineas").prop('disabled', false);
        }
        else {
            $("#txtnomempresa").prop('disabled', true);
            $("#txtrazon").prop('disabled', true);
            $("#txtRuc").prop('disabled', true);
            $('#ddlPais').attr('disabled', 'disabled');
            $("#txtFechaI").prop('disabled', false);
            $("#txtFechaFin").prop('disabled', false);
            $("#txtObs").prop('disabled', true);
            $("#txtdesc").prop('disabled', true);
            $("#ddLicencia").removeAttr('disabled');
            $("#txtLineas").prop('disabled', true);
        }
    }

});



