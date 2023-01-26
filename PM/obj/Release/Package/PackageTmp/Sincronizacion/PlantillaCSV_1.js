

$(function () {



    $(".btnNormal").button();


    $("#btngrabar").click(function (event) {

        var archivo = $("#txtarchivo").val();
        //var ruta = $("#txtruta").val();
        var backup = $("#txtbackup").val();
        var error = $("#txterror").val();
        // var separador = $("#ddlseparador").val();
        var separador;
        if ($("#hdfTipoOrigen").val() == "Texto Posicion") {
            separador = "";
        } else {
            separador = $("#ddlseparador").val();
        }

        var strAbrevSeparador = separador.substring(separador.indexOf(')'), separador.indexOf(')') - 1);

        var plantilla = $("#lblPlan").text() + strAbrevSeparador.toString();

        var tipoplantilla = $("#ddlplantilla").val();


        archivo = archivo.replace(/\\/g, "\\\\");
        //ruta = ruta.replace(/\\/g, "\\\\");
        backup = backup.replace(/\\/g, "\\\\");
        error = error.replace(/\\/g, "\\\\");

        if (archivo == "") {
            alert("Debe ingresar el nombre y extensión del archivo a leer");
            $("#txtarchivo").focus();
            return;
        }

        //        if (ruta == "") {
        //            alert("Debe ingresar la ruta a leer");
        //            $("#txtruta").focus();
        //            return;
        //        }

        if (backup == "") {
            alert("Debe ingresar la ruta backuo");
            $("#txtbackup").focus();
            return;
        }

        if (error == "") {
            alert("Debe ingresar ela ruta de errores");
            $("#txterror").focus();
            return;
        }



        var gridData = jQuery("#tbCampoPlantilla").getRowData();
        var postData = JSON.stringify(gridData);

        $.ajax({
            type: "POST",
            url: "PlantillaCSV.aspx/GrabarCamposCSV",
            data: "{'oCampos': '" + postData + "'," +
            "'tipoplantilla':'" + tipoplantilla + "'}",
            contentType: "application/json; charset=iso-8859-1",
            dataType: "json",
            success: function (result) {
                /////////
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
                BloquearPagina(false);
            }
        });



        function CerroMensaje() {

        }


        $.ajax({
            type: "POST",
            url: "PlantillaCSV.aspx/GuardarOrigen",
            data: "{'separador': '" + separador + "','archivo': '" + archivo + "','plantilla': '" + plantilla + "','backup': '" + backup + "','error': '" + error + "','tipoplantilla': '" + tipoplantilla + "'}",
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


});