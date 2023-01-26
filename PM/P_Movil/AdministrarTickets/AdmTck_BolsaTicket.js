var listaTickets;
//var listaBolsas_deTecnico;
var BolsaElegida;

var MargenFiltro = 0;
var MargenHeight = 48;
var inAltGrid;
var inFilas;


$(function () {


    if ($("#hdfIdTecnico").val() == '-1') {
        $("#btnTomarCaso").hide();
        $("#global").css("display","none");
        //alert('Usted no es Tecnico');
        //Mensaje("<br/><h1>Usted no es Tecnico</h1><br/>", document);
        $("form").append('<div style="width:90%; height:90%; padding:20px; font-size:large; color:Gray; ">Usted no es especialista...</div>');
        return;
    }

    //obtenerTicketsAbiertosSinAsignacion()
    $(".btnNormal").button();
    $("#btnTomarCaso").button({ icons: { primary: "ui-icon-plusthick"} });
    $("#radio").buttonset();

    //tbUsuarios = $("#tbTickets").jqGrid({

    $("#txtFechaInicio").datepicker({
        changeMonth: true,
        changeYear: true,
        //minDate: new Date(),
        dateFormat: "dd/mm/yy"
    });

    $("#txtFechaFin").datepicker({
        changeMonth: true,
        changeYear: true,
        //minDate: new Date(),
        dateFormat: "dd/mm/yy"
    });

    $("#btnTomarCaso").click(function () {
        tomarCaso();
    });

    $("#ddlNivel").change(function () {
        //obtenerTicketsAbiertosSinAsignacion();
        $("#tbTickets").trigger("reloadGrid");
    });

    $("#ddlTipo").change(function () {
        tipificacion_porTipo();
    });

    $("#ddlTipo,#ddlTipificacion,#txtFechaInicio,#txtFechaFin").change(function () {
        $("#tbTickets").trigger("reloadGrid");
    });

    $('#txtCodigoTicket').live("keypress", function (e) {
        if (e.keyCode == 13) {
            $("#tbTickets").trigger("reloadGrid");
        }
        else {
            return ValidarAlfaNumericoConEspaciosYCaracteres(e);
        }
    });

    $("#imgBorrarFechaInicio").click(function () {
        $("#txtFechaInicio").val("");
        $("#tbTickets").trigger("reloadGrid");
    });

    $("#imgBorrarFechaFin").click(function () {
        $("#txtFechaFin").val("");
        $("#tbTickets").trigger("reloadGrid");
    });

    $("#btnCerrar_conBolsa").click(function () {
        $('#dvBolsas').dialog('close');
    });

    $("#btnAsignar_conBolsa").click(function () {
        seleccionarBolsa();
    });

    $("#btnAsignar").click(function () {
        var id = $("#tbTickets").jqGrid('getGridParam', 'selrow');
        if (id) {
            tomarCaso();
        }
        else {
            alerta("Seleccione un registro");
            //Mensaje("<br/><h1>Seleccione un registro</h1><br/>", document);
        }

    });

    //    $('#txtNombre,#txtDescripcion,#txtNombreTipificacion,#txtDescripcionTipificacion').live("keypress", function (e) {
    //        return ValidarAlfaNumericoConEspacios(e);
    //    });

    load();

    $(window).resize(function () {
        DimPosElementos();
        NumeroInicialFilas();
    });

    DimPosElementos();
    NumeroInicialFilas();

});

//Redimencionar grilla
function NumeroInicialFilas() {
    var nuAltoFila = 23.04;
    inFilas = Math.floor(inAltGrid / nuAltoFila);
}

function DimPosElementos() {
    var Ancho = $(window).width();
    var Alto = $(window).height();
    var AnchoLateral = $(".LateralSplitter");
    $(".tabs").css({ height: Alto - 23, width: Ancho - AnchoLateral, marginbotton: 0, paddingbotton: 0 });

    //$(".Splitter").css({ height: Alto - 18 });
    inAltGrid = $(window).height() - 121 - $("#dvFiltros").height() - MargenFiltro * MargenHeight;
    $("#tbTickets").setGridWidth($(window).width() - 31);
    $("#tbTickets").setGridHeight(inAltGrid);
}

function seleccionarBolsa() {

    BolsaElegida = $("#ddlBolsas_paraTomarCaso").val().split('-')[0];
    $('#dvBolsas').dialog('close');
    asignarCaso();
}

function load() {
    obtenerTicketsAbiertosSinAsignacion();

//    $.ajax({
//        type: "POST",
//        url: "AdmTck_BolsaTicket.aspx/ListarNivel_deTecnico",
//        data: "{'prIdTecnicoSupervisor': '" + $("#hdfIdTecnico").val() + "'}",
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        success: function (resultado) {
//            var resul = resultado.d;

//            for (var i = 0; i < resul.length; i++) {
//                $("#ddlNivel").append("<option value='" + resul[i].IdNivel.toString() + "-" + resul[i].Orden.toString() + "' >" + resul[i].Nombre.toString() + "</option>");
//            }

//            //obtenerBolsas_deTecnico()
//            //obtenerTicketsAbiertosSinAsignacion();
//            obtenerTicketsAbiertosSinAsignacion();

//        },
//        error: function (xhr, err, thrErr) {
//            MostrarErrorAjax(xhr, err, thrErr);
//        }
//    });

}

function obtenerBolsas_deTecnico() {

    $.ajax({
        type: "POST",
        url: "AdmTck_BolsaTicket.aspx/ListarBolsa_deTecnico",
        data: "{'prIdTecnicoSupervisor': '" + $("#hdfIdTecnico").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultado) {
            listaBolsas_deTecnico = resultado.d;

            obtenerTicketsAbiertosSinAsignacion();


        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });

}

function ElegirBolsa() {

    var orden = $("#ddlNivel").val().split('-')[1];
    var misBolsas = obtenerBolsas_porOrden(orden);

    if (misBolsas.length > 0) {
        if (misBolsas.length == 1) {
            BolsaElegida = misBolsas[0].IdBolsa;
            asignarCaso();
        }
        else {

            $("#ddlBolsas_paraTomarCaso").html("");
            var i = 0;
            for (i = 0; i < misBolsas.length; i++) {
                $("#ddlBolsas_paraTomarCaso").append("<option value='" + misBolsas[i].IdBolsa.toString() + "-" + misBolsas[i].IdNivel.toString() + "' >" + misBolsas[i].Nombre.toString() + "</option>");
            }

            $('#dvBolsas').dialog({
                title: "Seleccionar Bolsa",
                height: 130,
                width: 270,
                modal: true
            });
        }
    }
    else {
        //alerta("No tienes bolsas asignadas para este nivel");
        Mensaje("<br/><h1>No tienes bolsas asignadas para este nivel</h1><br/>", document);
    }

}

function obtenerBolsas_porOrden(orden) {
    var misBolsas = [];
    var i = 0; 
    for (i = 0; i < listaBolsas_deTecnico.length; i++) {
        if (listaBolsas_deTecnico[i].Orden == orden) {
            misBolsas.push(new miBolsa(listaBolsas_deTecnico[i].IdBolsa,
            listaBolsas_deTecnico[i].Nombre,
            listaBolsas_deTecnico[i].IdNivel,
            listaBolsas_deTecnico[i].Descripcion,
            listaBolsas_deTecnico[i].Orden));
        }
    }
    return misBolsas;
}

function miBolsa(_idBolsa, _nombre, _idNivel, _descripcion,_orden) {

    this.IdBolsa = _idBolsa;
    this.Nombre = _nombre;
    this.IdNivel = _idNivel;
    this.Descripcion = _descripcion;
    this.Orden = _orden;

}

function CrearBotonesSemaforo(id, vcUmbral) {
    if (vcUmbral != "")
    { return '<img src="../../Common/Images/Semaforos/' + vcUmbral + '_16x16.png" />'; }
    else
    { return ''; }
}

function obtenerTicketsAbiertosSinAsignacion() {
    $("#tbTickets").jqGrid({
        datatype: function () {

            var IdTipo;
            var IdTipificacion;
            var miCodigoTicket;
            var miFechaInicio;
            var miFechaFin;

            if ($("#ddlTipo").val() == "Todos")
            { IdTipo = "-1"; }
            else
            { IdTipo = $("#ddlTipo").val(); }

            if (IdTipo == "-1") {
                IdTipificacion = "-1";
            }
            else {
                if ($("#ddlTipificacion").val() == "Todos")
                { IdTipificacion = "-1"; }
                else
                { IdTipificacion = $("#ddlTipificacion").val(); }
            }

            if ($.trim($("#txtCodigoTicket").val()) == "")
            { miCodigoTicket = '-1'; }
            else
            { miCodigoTicket = $.trim($("#txtCodigoTicket").val()); }

            miFechaInicio = $("#txtFechaInicio").datepicker("getDate");
            miFechaFin = $("#txtFechaFin").datepicker("getDate");

            if (miFechaInicio == undefined) {
                miFechaInicio = "-1";
            }
            else {
                var DiaInicio = miFechaInicio.getDate().toString();
                var MesInicio = (parseInt(miFechaInicio.getMonth()) + 1).toString();
                var AnoInicio = miFechaInicio.getFullYear().toString();

                if (DiaInicio.length < 2)
                { DiaInicio = "0" + DiaInicio; }

                if (MesInicio.length < 2)
                { MesInicio = "0" + MesInicio; }

                miFechaInicio = AnoInicio + MesInicio + DiaInicio;
            }

            if (miFechaFin == undefined) {
                miFechaFin = "-1";
            }
            else {
                var DiaFin = miFechaFin.getDate().toString();
                var MesFin = (parseInt(miFechaFin.getMonth()) + 1).toString();
                var AnoFin = miFechaFin.getFullYear().toString();

                if (DiaFin.length < 2)
                { DiaFin = "0" + DiaFin; }

                if (MesFin.length < 2)
                { MesFin = "0" + MesFin; }

                miFechaFin = AnoFin + MesFin + DiaFin;
            }

            $.ajax({
                type: "POST",
                url: "AdmTck_BolsaTicket.aspx/obtenerTicketsAbiertosSinAsignacion_deTecnico",
                data: "{'inPagTam':'" + $('#tbTickets').getGridParam("rowNum") + "'," + //Tamaño de pagina
                       "'inPagAct':'" + $('#tbTickets').getGridParam("page") + "'," + //FiltroRegistro
                       "'prIdNivel':'" + $("#ddlNivel").val().split('-')[0] + "'," +
                       "'prIdTecnicoSupervisor':'" + $("#hdfIdTecnico").val() + "'," +
                       "'prIdTipo':'" + IdTipo + "'," +
                       "'prIdTipificacion':'" + IdTipificacion + "'," +
                       "'prCodTicket':'" + miCodigoTicket + "'," +
                       "'prFechaInicio':'" + miFechaInicio + "'," +
                       "'prFechaFin':'" + miFechaFin + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    //                    $("#tbTickets").jqGrid('clearGridData');

                    //                    if ($(result.d).length == 0) {
                    //                        alerta("No existen tickets abiertos sin asignar")
                    //                        return;
                    //                    }
                    //                    //            for (var i = 0; i < $(result.d).length; i++)
                    //                    //                $("#tbTickets").jqGrid('addRowData', result.d[i].P_inCod, result.d[i]);
                    //                    listaTickets = result.d
                    $("#tbTickets")[0].addJSONData(result.d);


                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        },
        jsonReader: //Set the jsonReader to the JQGridJSonResponse squema to bind the data.
        {
        root: "Items",
        page: "PaginaActual",
        total: "TotalPaginas",
        records: "TotalRegistros",
        repeatitems: true,
        cell: "Row",
        id: "IdTicket"
    },
    //data: listaTickets,
    colModel: [{ name: 'IdTicket', index: 'IdTicket', label: 'IdTicket', hidden: true, sortable: false },
   		            { name: 'CodigoTicket', index: 'CodigoTicket', label: 'Código', width: 100, sortable: false },
   		            { name: 'IdUsuario', index: 'IdUsuario', label: 'IdUsuario', hidden: true },
                    { name: 'vcNom', index: 'vcNom', label: 'Usuario', sortable: false, width: 250 },
   		            { name: 'CodEstado', index: 'CodEstado', label: 'CodEstado', sortable: false, hidden: true },
                    { name: 'NombreEstado', index: 'NombreEstado', label: 'Estado', sortable: false, width: 70 },
                    { name: 'IdTipificacion', index: 'IdTipificacion', label: 'IdTipificacion', sortable: false, hidden: true },
                    { name: 'NombreTipificacion', index: 'NombreTipificacion', label: 'Tipo', sortable: false, width: 120 },
                    { name: 'Asunto', index: 'Asunto', label: 'Asunto', sortable: false, width: 150 },
                    { name: 'Descripcion', index: 'Descripcion', label: 'Descripción', sortable: false, width: 250 },
                    { name: 'FechaRegistro', index: 'FechaRegistro', label: 'Fecha registro', sortable: false, width: 150 },
                    { name: 'opUmbral', index: 'opUmbral', label: 'Umbral', hidden: false, width: 50, align: 'center', sortable: false, resizable: false,
                        formatter: function (value, options, rData) { return CrearBotonesSemaforo(rData[0], rData[11]); }
                    },
                    { name: 'inDiaTra', index: 'inDiaTra', label: 'Días Transc.', hidden: false, align: 'center', width: 50, sortable: false }
                ],
    rowNum: 15,
    rowList: [5, 15, 25],
    pager: '#pager',
    loadtext: 'Cargando datos...',
    recordtext: "{0} - {1} de {2} elementos",
    shrinkToFit: false,
    height: "100%",
    gridview: true,
    emptyrecords: "No hay tickets que mostrar",
    viewrecords: true,
    sortname: "vcNom", //Default SortColumn
    sortorder: "asc", //Default SortOrder
    rownumbers: true,
    width: 1120,
    ondblClickRow: function () { tomarCaso(); }
}).navGrid("#pager", { edit: false, add: false, search: false, del: false });

    $("#tbTickets").jqGrid('bindKeys', { "onEnter": function () { tomarCaso(); }, "onSpace": function () { tomarCaso(); } });


}

//};

 function Prueba() {
     alert('hola');
 }

 function asignarCaso() {

         var id = $("#tbTickets").jqGrid('getGridParam', 'selrow');
         if (id) {
             var datos = $("#tbTickets").jqGrid('getRowData', id);
             var idTicket = datos['IdTicket'];
             var codTicket = datos['CodigoTicket'];
             var idtecnico = $("#hdfIdTecnico").val();

             $.ajax({
                 type: "POST",
                 url: "AdmTck_BolsaTicket.aspx/asignarTicketTecnico",
                 data: "{'p_incodTicket': '" + idTicket + "'," +
                        "'pCodTicket': '" + codTicket + "'," +
                        "'p_inCodTecnico': '" + idtecnico + "',"+
                        "'prIdBolsa': '" + BolsaElegida.toString() + "'}",
                 contentType: "application/json; charset=utf-8",
                 dataType: "json",
                 success: function (result) {
                     
                     var resultado = result.d;
                     if (resultado.split('|')[0] == "OK") {
                         //alert('Ticket asignado');
                         Mensaje("<br/><h1>Ticket asignado</h1><br/>", document, fnmostrarti(id));
                         
                     }
                     else{
                         //alert('Error al asignar, comuniquese con su administrador')
                         //alert(resultado.split('|')[1]);
                         Mensaje("<br/><h1>" + resultado.split('|')[1] + "</h1><br/>", document);
                     }
                 },
                 error: function (xhr, err, thrErr) {
                     MostrarErrorAjax(xhr, err, thrErr);
                 }
             });
             
         }
         else {
             //alerta("Seleccione un registro");
             Mensaje("<br/><h1>Seleccione un registro</h1><br/>", document);
         }

 }

 function tomarCaso() {

     if ($("#ddlNivel").val() == '6-0') {

         var id = $("#tbTickets").jqGrid('getGridParam', 'selrow');
         
         if (id) {
             var datos = $("#tbTickets").jqGrid('getRowData', id);
             var idTicket = datos['IdTicket'];
             var codTicket = datos['CodigoTicket'];
             var idtecnico = $("#hdfIdTecnico").val();

             $.ajax({
                 type: "POST",
                 url: "AdmTck_BolsaTicket.aspx/asignarTicketTecnicoDirecto",
                 data: "{'p_incodTicket': '" + idTicket + "'," +
                        "'pCodTicket': '" + codTicket + "'," +
                        "'p_inCodTecnico': '" + idtecnico  + "'}",
                 contentType: "application/json; charset=utf-8",
                 dataType: "json",
                 success: function (result) {

                     var resultado = result.d;
                     if (resultado.split('|')[0] == "OK") {
                         //alert('Ticket asignado');
                         Mensaje("<br/><h1>Ticket asignado</h1><br/>", document, fnmostrarti(id));

                     }
                     else {
                         //alert('Error al asignar, comuniquese con su administrador')
                         //alert(resultado.split('|')[1]);
                         Mensaje("<br/><h1>" + resultado.split('|')[1] + "</h1><br/>", document);
                     }
                 },
                 error: function (xhr, err, thrErr) {
                     MostrarErrorAjax(xhr, err, thrErr);
                 }
             });

         }
         else {
             //alerta("Seleccione un registro");
             Mensaje("<br/><h1>Seleccione un registro</h1><br/>", document);
         }

     }
     else {
         ElegirBolsa();
     }

 }

 function tipificacion_porTipo() {

     var miTipo = $("#ddlTipo").val();
     $("#ddlTipificacion").html("");

     if (miTipo == "Todos") {
         $("#ddlTipificacion").attr("disabled", "disabled");
         $("#ddlTipificacion").fadeOut(200); 
     }
     else {
         $("#ddlTipificacion").removeAttr("disabled");
         $("#ddlTipificacion").fadeIn(200);
         $("#ddlTipificacion").append("<option value='Todos' >Todos</option>");
         var i = 0;
         for (i = 0; i < misTipificaciones.length; i++) {
             if (misTipificaciones[i].IdTipo == miTipo) {
                 $("#ddlTipificacion").append("<option value='" + misTipificaciones[i].P_inCod.toString() + "' >" + misTipificaciones[i].Titulo.toString() + "</option>");
             }
         }
     }

 }

 function fnmostrarti(id) {
     $("#tbTickets").jqGrid('delRowData', id);
 }