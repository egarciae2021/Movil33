
function producto(P_inCod, inOrd, vcNom, vcURL, vcTab, inEst) {
  this.P_inCod = P_inCod;
  this.inOrd = inOrd;
  this.vcNom = vcNom;
  this.vcURL = vcURL;
  this.vcTab = vcTab;
  this.inEst = inEst;
}


$(function () {
    IniciarPagina();
    $(".btnNormal").button();
    var indiceTab = window.parent.tab.tabs("option", "selected");
    var lstAnexos;

    ValidarNumeroEnCajaTexto("txtOrden", ValidarEnteroPositivo);

    function IniciarPagina() {
    }
    function BloquearPagina(bloqueado) {
        $(".btnNormal").button("option", "disabled", bloqueado);

        if (bloqueado) {
            $("input").attr("disabled", "disabled");
            $("select").attr("disabled", "disabled");
        }
        else {
            $("input").removeAttr("disabled");
            $("select").removeAttr("disabled");
        }
    }
    $("#btnGuardar").live("click", function () {

        BloquearPagina(true);

        var Producto = new producto();

        if ($("#hdfCodigo").val() == "") {
            Producto.P_inCod = "-1";
        }
        else {
            Producto.P_inCod = $("#hdfCodigo").val();
        }
        Producto.vcNom = $("#txtNombre").val();
        Producto.vcTab = "";
        Producto.inOrd = $("#txtOrden").val();
        Producto.vcURL = $("#txtUrl").val();
        Producto.vcURL = Producto.vcURL.replace("\\", '/');
        Producto.inEst = 0;

        if ($('#chkEstado').is(':checked')) {
            Producto.inEst = 1;
        }

        if (Producto.vcNom == "") {
            alerta("El nombre del Producto es un campo obligatorio");
            $("#txtNombre").focus();
            BloquearPagina(false);
            return;
        }

        var oProducto = JSON.stringify(Producto);

        $.ajax({
            type: "POST",
            url: "Mnt_Producto.aspx/Guardar",
            data: "{'oProducto': '" + oProducto + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                window.parent.ActualizarGrilla();
                Mensaje("<br/><h1>Producto guardado</h1><br/><h2>" + Producto.vcNom + "</h2>", document, CerroMensaje);
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
                BloquearPagina(false);
            }
        });

        //    $.ajax({
        //      type: "POST",
        //      url: "Mnt_Anexo.aspx/Guardar",
        //      data: "{'vcID': '" + DatoID.replace(/'/g, "&#39") + "'," +
        //             "'vcAnexo': '" + DatoAnexo.replace(/'/g, "&#39") + "'," +
        //             "'vcHabitacion': '" + DatoHabitacion.replace(/'/g, "&#39") + "'}",
        //      contentType: "application/json; charset=utf-8",
        //      dataType: "json",
        //      success: function (result) {
        //        if (result.d == "0") {
        //          window.parent.ActualizarGrilla();
        //          //Actualizar Lista Anexos....
        //          ActualizarListaAnexos();
        //          Mensaje("<br/><img src=\"../../../Common/Images/Mantenimiento/Grabar32.png\" /><br/><h1>Anexo-Habitaci&oacute;n guardado</h1><br/>", document, CerroMensaje);
        //        }
        //        else {
        //          //alerta("Ya se ingreso un destino con los mismo datos");
        //          BloquearPagina(false);
        //        }
        //      },
        //      error: function (xhr, err, thrErr) {
        //        MostrarErrorAjax(xhr, err, thrErr);
        //        BloquearPagina(false);
        //      }
        //    });


    });


    ActualizarListaAnexos = function () {

        $("#ddlAnexo").html("");

        $.ajax({
            type: "POST",
            url: "Mnt_Anexo.aspx/ListarAnexosLibres",
            data: "{'idCliente': " + window.parent.parent.parent.idCliente + "}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                lstAnexos = result.d;
                $.each(lstAnexos, function () {
                    $("#ddlAnexo").append($("<option></option>").attr("value", this.Habitacion).text(this.Anexo));
                    inicio = false;
                });
            },
            error: function (xhr, err, thrErr) {
                alert(xhr.responseText);
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });

    };

    function CerroMensaje() {
        BloquearPagina(false);
        if ($("#hdfEstado").val() == "") {
            $("#txtAnexo").val("");
            //$("#ddlAnexo").val("");
            $("#txtAnexo").focus();
        }
        else {
            window.parent.tab.tabs("remove", indiceTab);
        }
    }

    $("#btnCerrar").live("click", function () {
        window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));
    });
});