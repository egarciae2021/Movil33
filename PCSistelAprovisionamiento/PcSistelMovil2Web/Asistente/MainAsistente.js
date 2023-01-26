var IdSolicitud = "";
var IdTipoSolicitud = "";
var nombreempresa = "";
var razon = "";
var ruc = "";
var codpais = "1";
var nombrepais = "";
var fechai = "";
var fechaf = "";
var obs = "";
var descrip = "";
var nlineas = "";
var titular = "";
var Titulares = [];
var tipoli = "";
var codtipoli = "";
var nombredom = "";
var IdServidor = "";
var IdServidorBD = "";
var ServidorBD = "";
var IdServidorAPP = "";
var IdInstanciaAPP = "";
var ServidorAPP = "";
var servapp = "";
var codservapp = "";
var servbd = "";
var codservbd = "";
var Logo = "";
var CargarSolicitud = 0;
var NombreServidor = "";
var NombreServidorAPP = "";
var IdContratoTerminos = "";
var ContratoTermino = "";
var IdPortal = "";
var IdBDCliente = 0;
var IdServidorAPPA1 = "";
var NombreServidorAPPA1 = "";
var IdServidorAPPA2 = "";
var NombreServidorAPPA2 = "";
var IdInstanciaAPPA1 = "";
var IdInstanciaAPPA2 = "";

function RecargarPaginaAsistente(url) {

    $("#ifTemaAsistente").attr("src", url);
    //alerta('x');
    //var d = new Date();
    //console.log('mpajuelo: ' + d.getTime());

    // document.  .writeln(d.getTime());
    //alert('z');
}

function SolicitudTitulares() {

    this.IdSolicitudTitular;
    this.Nombre;
    this.Apellido;
    this.Usuario;
    this.Correo;
    this.Clave
}


$(function () {
    var $Pagina = 'Asistente1.aspx';
    $("#ifTemaAsistente").attr("src", $Pagina);

    $("#MenuInstalacion").css({ height: window.parent.parent.$("#ifTema").height() - 20 });
    $("#MenuAsistenderecha").css({ width: $("#MenuInstalacion").width() - 224 });
    $("#MenuAsistenderecha").css({ height: window.parent.parent.$("#ifTema").height() - 50 });


    $(window).resize(function () {
        $("#MenuInstalacion").css({ height: window.parent.parent.$("#ifTema").height() - 20 });
        $("#MenuAsistenderecha").css({ width: $("#MenuInstalacion").width() - 224 });
        $("#MenuAsistenderecha").css({ height: window.parent.parent.$("#ifTema").height() - 50 });
        //$("#ifTemaAsistente").width($(window).height() - inQuitarAlto);
    });

    //    function ListarUnaSolicitud() {

    //        $.ajax({
    //            type: "POST",
    //            contentType: "application/json; charset=utf-8",
    //            url: "../Solicitudes/Adm_NuevaSolicitud.aspx/ListarUnaSolicitud",
    //            data: "{'IdSolicitud':" + $("#hdfIdSolicitud").val() + "}",
    //            dataType: "json",
    //            success: function (result) {

    //                var lsSolicitud = result.d;

    //                IdSolicitud = lsSolicitud[0].IdSolicitud;
    //                IdTipoSolicitud = lsSolicitud[0].IdTipoSolicitud;
    //                nombreempresa = lsSolicitud[0].NombreEmpresa;
    //                razon = lsSolicitud[0].RazonSocial;
    //                ruc = lsSolicitud[0].Ruc;
    //                codpais = lsSolicitud[0].Ruc;

    //                fechai = lsSolicitud[0].FechaInicioContrato;
    //                fechaf = lsSolicitud[0].FechaFinContrato;
    //                obs = lsSolicitud[0].ObservacionContrato;
    //                descrip = lsSolicitud[0].DescripcionContrato;

    //                nlineas = lsSolicitud[0].Lineas;


    //                //$("#txtnomempresa").val(lsSolicitud[0].NombreEmpresa);
    //                //$("#txtrazon").val(lsSolicitud[0].RazonSocial);
    //                //$("#txtRuc").val(lsSolicitud[0].Ruc);
    //                //$("#ddlPais").val(lsSolicitud[0].IdPais);
    //                //$("#txtFechaI").val(lsSolicitud[0].FechaInicioContrato);
    //                //$("#txtFechaFin").val(lsSolicitud[0].FechaFinContrato);
    //                //$("#txtObs").val(lsSolicitud[0].ObservacionContrato);
    //                // $("#txtdesc").val(lsSolicitud[0].DescripcionContrato);
    //                //$("#ddLicencia").val(lsSolicitud[0].IdTipoLicencia);
    //                //$("#txtLineas").val(lsSolicitud[0].Lineas);
    //                //$("#hdfTipoSolicitud").val(lsSolicitud[0].IdTipoSolicitud);

    //                for (var i = 0; i < lsSolicitud[0].Titulares.length; i++) {

    //                    var oTitular = new SolicitudTitulares();
    //                    oTitular.IdSolicitudTitular = lsSolicitud[0].Titulares[i].IdSolicitudTitular;
    //                    oTitular.Nombre = lsSolicitud[0].Titulares[i].Nombre;
    //                    oTitular.Apellido = lsSolicitud[0].Titulares[i].Apellido;
    //                    oTitular.Correo = lsSolicitud[0].Titulares[i].Correo;
    //                    oTitular.Usuario = "";
    //                    oTitular.Clave = "";
    //                    Titulares.push(oTitular);
    //                }
    //                //cargarTitulares();



    //            },
    //            error: function (result) {
    //                alert("Error");
    //            }
    //        });

    //    }

    //    ListarUnaSolicitud();

});