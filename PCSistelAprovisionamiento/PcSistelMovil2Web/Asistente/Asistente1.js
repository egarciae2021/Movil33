

$(function () {
    // $("#nombreempresa").val("asdas");
    $('#Pais').attr('disabled', 'disabled');
    if (window.parent.CargarSolicitud == 0) {

        var id = window.parent.$("#hdfIdSolicitud").val();
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "Asistente1.aspx/ListarUnaSolicitud",
            data: "{'IdSolicitud':" + id + "}",
            dataType: "json",
            success: function (result) {

                var lsSolicitud = result.d;

                window.parent.IdSolicitud = lsSolicitud[0].IdSolicitud;
                window.parent.IdTipoSolicitud = lsSolicitud[0].IdTipoSolicitud;
                window.parent.nombreempresa = lsSolicitud[0].NombreEmpresa;
                window.parent.razon = lsSolicitud[0].RazonSocial;
                window.parent.ruc = lsSolicitud[0].Ruc;
                window.parent.codpais = lsSolicitud[0].IdPais;

                window.parent.fechai = lsSolicitud[0].FechaInicioContrato;
                window.parent.fechaf = lsSolicitud[0].FechaFinContrato;
                window.parent.obs = lsSolicitud[0].ObservacionContrato;
                window.parent.descrip = lsSolicitud[0].DescripcionContrato;

                window.parent.nlineas = lsSolicitud[0].Lineas;
                window.parent.codtipoli = lsSolicitud[0].IdTipoLicencia;


                $("#nombreempresa").val(lsSolicitud[0].NombreEmpresa);
                $("#idRazon").val(lsSolicitud[0].RazonSocial);
                $("#txtruc").val(lsSolicitud[0].Ruc);
                $("#Pais").val(lsSolicitud[0].IdPais);

                //$("#txtnomempresa").val(lsSolicitud[0].NombreEmpresa);
                //$("#txtrazon").val(lsSolicitud[0].RazonSocial);
                //$("#txtRuc").val(lsSolicitud[0].Ruc);
                //$("#ddlPais").val(lsSolicitud[0].IdPais);
                //$("#txtFechaI").val(lsSolicitud[0].FechaInicioContrato);
                //$("#txtFechaFin").val(lsSolicitud[0].FechaFinContrato);
                //$("#txtObs").val(lsSolicitud[0].ObservacionContrato);
                // $("#txtdesc").val(lsSolicitud[0].DescripcionContrato);
                //$("#ddLicencia").val(lsSolicitud[0].IdTipoLicencia);
                //$("#txtLineas").val(lsSolicitud[0].Lineas);
                //$("#hdfTipoSolicitud").val(lsSolicitud[0].IdTipoSolicitud);

                window.parent.Titulares = [];
                var i = 0;
                for (i = 0; i < lsSolicitud[0].Titulares.length; i++) {

                    var oTitular = new window.parent.SolicitudTitulares();
                    oTitular.IdSolicitudTitular = lsSolicitud[0].Titulares[i].IdSolicitudTitular;
                    oTitular.Nombre = lsSolicitud[0].Titulares[i].Nombre;
                    oTitular.Apellido = lsSolicitud[0].Titulares[i].ApellidoPaterno;
                    oTitular.Correo = lsSolicitud[0].Titulares[i].Correo;
                    oTitular.Usuario = "";
                    oTitular.Clave = "";
                    window.parent.Titulares.push(oTitular);
                }
                //cargarTitulares();

                window.parent.CargarSolicitud = 1;


            },
            error: function (result) {
                alert("Error");
            }
        });
    }
    else {
        $("#nombreempresa").val(window.parent.nombreempresa);
        $("#idRazon").val(window.parent.razon);
        $("#txtruc").val(window.parent.ruc);
        $("#Pais").val(window.parent.codpais);
    }



    //window.parent.$("#divEmpresa").find(".lblMenu").css({ color: "#424242" });
    window.parent.$("#divEmpresa").find(".lblMenu").css({ "text-decoration": "underline" });
    window.parent.$("#edit1").css({ "display": "" });
    CargarIFrame($("#hdfCodigo").val());



    $("#btnsiguiente").click(function () {

        if ($("#nombreempresa").val() == "") {
            alertaExterna("Ingrese un nombre de empresa");
            $("#nombreempresa").focus();
            return;
        }
        if ($("#idRazon").val() == "") {
            alertaExterna("Ingrese una razòn social");
            $("#idRazon").focus();
            return;
        }

        window.parent.nombreempresa = $("#nombreempresa").val();
        window.parent.razon = $("#idRazon").val();
        window.parent.codpais = $("#Pais").val();
        window.parent.ruc = $("#txtruc").val();
        window.parent.nombrepais = $($("#Pais option:selected")[0]).text();

        window.parent.$("#divEmpresa").find(".lblMenu").css({ "text-decoration": "none" });
        window.parent.$("#edit1").css({ "display": "none" });

        var $Pagina = 'Asistente2.aspx';
        window.parent.$("#ifTemaAsistente").attr("src", $Pagina);
    });

    $("#btcancelar").click(function () {
        CancelarAsistente();
    });







});

function CargarIFrame(idnivel) {
    //var idnivel = $("#hdfCodigo").val();
    var $paginaI = "CargarLogoAsistente.aspx?Id=" + idnivel;
    $("#ifCargaIcono").attr("src", $paginaI);
}