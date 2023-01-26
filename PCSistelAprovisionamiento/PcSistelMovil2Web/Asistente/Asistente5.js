
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
    this.IdContratoTerminos;
    this.IdPortal;
    this.IdInstanciaPedidos;
    this.IdBDCliente;    
    this.IdInstanciaAPP_A1; // APP PCSISTEL MOVIL
    this.IdInstanciaAPP_A2; // APP PCSISTEL SECURITY
}

function SolicitudTitulares() {

    this.IdSolicitudTitular;
    this.Nombre;
    this.Apellido;
    this.Usuario;
    this.Correo;
}

var TitularesSolicitud = [];

function CerroMensaje() {
    window.parent.parent.tab.tabs("remove", window.parent.parent.tab.tabs("option", "selected"));
    BloquearPagina(false);
}
var oCultura = { dcNumDec: '2', vcSimDec: '.', vcSimSepMil: ',', Moneda: { vcSimMon: 'S/.' } };
$(function () {

    //window.parent.$("#DivConsolidado").find(".lblMenu").css({ color: "#424242" }); 
    window.parent.$("#DivConsolidado").find(".lblMenu").css({ "text-decoration": "underline" });
    window.parent.$("#edit7").css({ "display": "" });


    //**************Cargando datos consolidados****************

    var servidorBD;
    var ServidorAPP;
    var ServidorAPP_A1;
    var ServidorAPP_A2;
    $("#lblempresa").html(window.parent.nombreempresa);
    $("#lblrazon").html(window.parent.razon);
    $("#lblruc").html(window.parent.ruc);
    $("#lblpais").html(window.parent.nombrepais);

    $("#lflfechai").html(window.parent.fechai);
    $("#lflfechafin").html(window.parent.fechaf);
    $("#lblobs").html(window.parent.obs);
    $("#lbldesc").html(window.parent.descrip);

    $("#lbltipolic").html(window.parent.tipoli);
    $("#lbllineas").html(FormatoNumero(window.parent.nlineas, oCultura, true));

    $("#lbldominio").html(window.parent.nombredom);

    if (window.parent.ServidorBD == "[Sin instancia]") {
        servidorBD = window.parent.NombreServidor;
    }
    else {
        servidorBD = window.parent.NombreServidor + " \\ " + window.parent.ServidorBD;
    }

    if (window.parent.ServidorAPP == "[Sin instancia]") {
        ServidorAPP = window.parent.NombreServidorAPP;
    }
    else {
        ServidorAPP = window.parent.NombreServidorAPP + " \\ " + window.parent.ServidorAPP;
    }

    if (window.parent.ServidorAPPA1 == "[Sin instancia]") {
        ServidorAPP_A1 = window.parent.NombreServidorAPPA1;
    }
    else {
        ServidorAPP_A1 = window.parent.NombreServidorAPPA1 + " \\ " + window.parent.ServidorAPPA1;
    }

    if (window.parent.ServidorAPPA2 == "[Sin instancia]") {
        ServidorAPP_A2 = window.parent.NombreServidorAPPA2;
    }
    else {
        ServidorAPP_A2 = window.parent.NombreServidorAPPA2 + " \\ " + window.parent.ServidorAPPA2;
    }

    debugger;
    $("#lblsrvBD").html(servidorBD);
    $("#lblsrvAPP").html(ServidorAPP);
    $("#lblsrvAPP_A1").html(ServidorAPP_A1);
    $("#lblsrvAPP_A2").html(ServidorAPP_A2);


    $("#grid").jqGrid({
        datatype: "local",
        //colNames: ['id', 'nombre', 'apellido', 'usuario', 'pass'],
        colNames: ['IdSolicitudTitular', 'Nombre', 'Apellido', 'Correo', 'Usuario'],
        colModel: [
            { name: 'IdSolicitudTitular', index: 'IdSolicitudTitular', width: 60, sorttype: "int", hidden: true },
            { name: 'Nombre', index: 'Nombre', width: 90 },
            { name: 'Apellido', index: 'Apellido', width: 160 },
            { name: 'Correo', index: 'Correo', width: 160 },
            { name: 'Usuario', index: 'Usuario', width: 80, editable: true }
        //{ name: 'Clave', index: 'Clave', width: 120 }
        ],
        pager: '#pgrid',
        height: 150,
        width: 510,
        loadtext: 'Cargando datos...',
        recordtext: '{0} - {1} de {2} elementos',
        emptyrecords: 'No hay resultados',
        pgtext: 'Pág: {0} de {1}',
        rowNum: 10,
        rowList: [10, 20, 30],
        viewrecords: true,
        shrinkToFit: false
        //multiselect: true,       
    });

    for (var i = 0; i < window.parent.Titulares.length; i++) {
        $("#grid").jqGrid('addRowData', i + 1, window.parent.Titulares[i]);
    }



    $("#tipolicencia").html(window.parent.tipoli);
    $("#nombreDominio").html(window.parent.nombredom);
    $("#servidorAPP").html(window.parent.servapp);
    $("#servidorBD").html(window.parent.servbd);
    //*********************************************************


    $("#btnatras").click(function () {

        window.parent.$("#DivConsolidado").find(".lblMenu").css({ "text-decoration": "none" });
        window.parent.$("#edit7").css({ "display": "none" });
        var $Pagina = 'AsistenteSelectAPPMovil.aspx';
        window.parent.$("#ifTemaAsistente").attr("src", $Pagina);
    });

    $("#btcancelar").click(function () {
        CancelarAsistente();
    });

    $("#btnfinalizar").click(function () {

        GrabarAsistente();
    });
});

function GrabarAsistente() {
    $("#dvContenidoAlertaExterna").html("");
    $("#dvContenidoAlertaExterna").html("Desea Finalizar el Asistente de Instalación?");

    $('#dvMsgAlertaExterna').dialog({
        title: "Grabar Operación",
        modal: true,
        buttons: {
            "Si": function () {

                //******************Metodo para grabar**************


                var oSolicitud = new Solicitud();

                oSolicitud.IdSolicitud = window.parent.IdSolicitud;
                //oSolicitud.IdOperador = 0;
                oSolicitud.IdEstado = 2;
                oSolicitud.IdTipoSolicitud = window.parent.IdTipoSolicitud;
                //oSolicitud.Codigo = 0;
                oSolicitud.NombreEmpresa = window.parent.nombreempresa;
                oSolicitud.RazonSocial = window.parent.razon;
                oSolicitud.Ruc = window.parent.ruc;
                oSolicitud.IdPais = window.parent.codpais;
                //oSolicitud.Logo = "";                
                var dtFechaInicio, dtFechaFin;
                try {
                    dtFechaInicio = Date.parseExact(window.parent.fechai, "dd/MM/yyyy");
                    if (dtFechaInicio == null) {
                        alerta("La fecha de inicio de contrato no es correcta");
                        return;
                    }
                }
                catch (e) {
                    alerta("La fecha de inicio de contrato no es correcta");
                    return;
                }
                oSolicitud.FechaInicioContrato = Date2Ansi(dtFechaInicio);
                try {
                    dtFechaFin = Date.parseExact(window.parent.fechaf, "dd/MM/yyyy");
                    if (dtFechaFin == null) {
                        alerta("La fecha fin de contrato no es correcta");
                        return;
                    }
                }
                catch (e) {
                    alerta("La fecha fin de contrato no es correcta");
                    return;
                }
                oSolicitud.FechaFinContrato = Date2Ansi(dtFechaFin);
                oSolicitud.ObservacionContrato = window.parent.obs;
                oSolicitud.DescripcionContrato = window.parent.descrip;
                oSolicitud.IdTipoLicencia = window.parent.codtipoli;
                oSolicitud.Lineas = window.parent.nlineas;
                oSolicitud.Dominio = window.parent.nombredom;
                oSolicitud.IdInstanciaBD = window.parent.IdServidorBD;
                oSolicitud.IdInstanciaAPP = window.parent.IdInstanciaAPP;
                oSolicitud.IdInstanciaPedidos = window.parent.IdInstanciaWEB;
                oSolicitud.IdContratoTerminos = window.parent.IdContratoTerminos;
                oSolicitud.IdPortal = window.parent.IdPortal;
                debugger;
                oSolicitud.IdBDCliente = window.parent.IdBDCliente;

                oSolicitud.IdInstanciaAPP_A1 = window.parent.IdInstanciaAPPA1;
                oSolicitud.IdInstanciaAPP_A2 = window.parent.IdInstanciaAPPA2;

                //oSolicitud.FechaenProceso = 0;
                //oSolicitud.FechaCulminada = 0;
                //oSolicitud.FechaAnulada = 0;
                //oSolicitud.TecnicoAsignado = 0;
                //oSolicitud.TecnicoProcesar = 0;
                //oSolicitud.Comentarios = 0;
                //oSolicitud.FechaRegistro = 0;
                //oSolicitud.IdUsuarioRegistro = 0;

                for (var i = 0; i < window.parent.Titulares.length; i++) {

                    var oTitular = new SolicitudTitulares();
                    oTitular.IdSolicitudTitular = window.parent.Titulares[i].IdSolicitudTitular;
                    oTitular.Nombre = window.parent.Titulares[i].Nombre;
                    oTitular.Apellido = window.parent.Titulares[i].Apellido;
                    oTitular.Correo = window.parent.Titulares[i].Correo;
                    oTitular.Usuario = window.parent.Titulares[i].Usuario;
                    oSolicitud.Titulares.push(oTitular);
                }

                $.ajax({
                    type: "POST",
                    url: "Asistente5.aspx/registrarCola",
                    //data: "{'oCompania': '" + oCompania + "'}",
                    data: "{'prSolicitud': '" + JSON.stringify(oSolicitud) + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        if (result.d == "ok") {
                            //window.parent.ActualizarGrilla();
                            window.parent.parent.$("#grid").trigger("reloadGrid");
                            Mensaje("<br/><h1>La solicitud fue procesada correctamente</h1><br/><h2> Cod. " + oSolicitud.IdSolicitud + "</h2>", document, CerroMensaje);
                            //window.parent.parent.tab.tabs("remove", window.parent.parent.tab.tabs("option", "selected"));
                            //
                            //alertaExterna("Los datos fueron grabados Correctamente");
                        }
                        else {

                        }
                    },
                    error: function (xhr, err, thrErr) {
                        MostrarErrorAjax(xhr, err, thrErr);
                        BloquearPagina(false);
                    }
                });

                //                //**************************************************               
                //                
                //                //window.parent.parent.$("#ifTema").attr("src", "");
                //                //window.parent.$("#DivConsolidado").find(".lblMenu").css({ "text-decoration": "none" });
                //                //window.parent.$("#edit5").css({ "display": "none" });
                //                //window.parent.$("#ifTemaAsistente").attr("src", "");

                $(this).dialog("close");

            },
            "No": function () {

                $(this).dialog("close");
            }
        }
    });
}


function Date2Ansi(Fecha) {
    try {
        return Fecha.getFullYear().toString() + FormatoDigitos(Fecha.getMonth() + 1, 2) + FormatoDigitos(Fecha.getDate(), 2); /* + " "+
               FormatoDigitos(Fecha.getHours(), 2) + ":" + FormatoDigitos(Fecha.getMinutes(), 2) + ":" + FormatoDigitos(Fecha.getSeconds(), 2);*/
    }
    catch (e) {
        return "";
    }
}

function FormatoDigitos(Numero, Digitos) {
    try {
        //        if (Numero.toString().length >= Digitos)
        //            return Numero;
        while (Numero.toString().length < Digitos) {
            Numero = "0" + Numero.toString();
        }
        return Numero.toString();
    } catch (e) {
        return Numero.toString();
    }
}
