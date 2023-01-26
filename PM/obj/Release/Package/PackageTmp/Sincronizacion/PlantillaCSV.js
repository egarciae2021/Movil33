
$(function () {


    String.prototype.repeat = function (n) {
        var s = "";
        var t = this.toString();
        /// <reference path="../Mej_Abogados/Validacion/" />

        while (--n >= 0) {
            s += t;
        }

        return s;
    };


    var num;
    num = $("#hdfTipoOrigen").val();

    if (num == 1) {

        $("#tall tr:first-child").hide();
    }

    var TipoPlantilla;
    $(".btnNormal").button({});

    tabOpciones = $("#TabOpciones").tabs({});

    function inicio() {

        var tipoplantilla = $('#ddlplantilla').val();

        $("#tbCampoPlantilla").jqGrid('clearGridData');
        $("#txtOtroSeparador").hide();

        $("#tbCampoPlantilla").jqGrid('showCol', ["inLon"]);
        //$("#tbCampoPlantilla").jqGrid('hideCol', ["inLon"]);

        tabOpciones.tabs('select', '#TabOpciones_TabJQ1');

        if ($('#hdfTipoOrigen').val() == 'Texto Separador') {


            var strSeparador2 = $("#ddlseparador").val();
            var strAbrevSeparador2 = strSeparador2.substring(strSeparador2.indexOf(')'), strSeparador2.indexOf(')') - 1);

            $.ajax({
                type: "POST",
                url: "PlantillaCSV.aspx/CargarCampossin_plan",
                data: "{'tipoplantilla' : '" + strAbrevSeparador2 + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {

                    for (var i = 0; i < $(result.d).length; i++)
                        $("#tbCampoPlantilla").jqGrid('addRowData', result.d[i].P_inCodCam,
                            { P_inCodCam: result.d[i].P_inCodCam, vcCod: result.d[i].vcCod, vcDes: result.d[i].vcDes, inPos: result.d[i].inPos, inLon: result.d[i].inLon,
                                Obligatorio: result.d[i].obligatorio
                            });
                    ActualizaPlantilla();
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }

            });



        }
        else {

            $.ajax({
                type: "POST",
                url: "PlantillaCSV.aspx/CargarCampos",
                data: "{'tipoplantilla' : '" + tipoplantilla + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {

                    for (var i = 0; i < $(result.d).length; i++)
                        $("#tbCampoPlantilla").jqGrid('addRowData', result.d[i].P_inCodCam,
                            { P_inCodCam: result.d[i].P_inCodCam, vcCod: result.d[i].vcCod, vcDes: result.d[i].vcDes, inPos: result.d[i].inPos, inLon: result.d[i].inLon,
                                Obligatorio: result.d[i].obligatorio
                            });
                    ActualizaPlantilla();
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }

            });

        }





    }

    if ($('#hdfTipoOrigen').val() == 'Texto Separador') {



        var tbCampoPlantilla = $("#tbCampoPlantilla").jqGrid({
            datatype: "local",
            colModel: [{ name: 'P_inCodCam', index: 'P_inCodCam', label: 'inCodCam', hidden: true },
   		                   { name: 'vcCod', index: 'vcCod', label: 'Campo', width: '120' },
   		                   { name: 'vcDes', index: 'vcDes', label: 'Descripción', width: '350' },
   		                   { name: 'inPos', index: 'inPos', label: 'Columna', width: '120', sorttype: 'int' },
   		                   { name: 'inLon', index: 'inLon', label: 'Longitud', width: '120', sorttype: 'int', hidden: true },
                           { name: 'Obligatorio', index: 'Obligatorio', label: 'Obligatorio', width: '80' }
   	                      ],
            sortname: "inPos", //Default SortColumn
            sortorder: "asc", //Default SortOrder.
            shrinkToFit: false,
            width: "900",
            height: "140",
            rownumbers: true,
            caption: "Campos",
            ondblClickRow: function (id) { $("#btnModificar").click(); }
        }).navGrid("#pager", { edit: false, add: false, search: false, del: false }); //agregado por puribe 16/09/2015
    }
    else {
        var tbCampoPlantilla = $("#tbCampoPlantilla").jqGrid({
            datatype: "local",
            colModel: [{ name: 'P_inCodCam', index: 'P_inCodCam', label: 'inCodCam', hidden: true },
   		                   { name: 'vcCod', index: 'vcCod', label: 'Campo', width: '120' },
   		                   { name: 'vcDes', index: 'vcDes', label: 'Descripción', width: '350' },
   		                   { name: 'inPos', index: 'inPos', label: 'Posición', width: '120', sorttype: 'int' },
   		                   { name: 'inLon', index: 'inLon', label: 'Longitud', width: '120', sorttype: 'int', hidden: true },
                           { name: 'Obligatorio', index: 'Obligatorio', label: 'Obligatorio', width: '80' }
   	                      ],
            sortname: "inPos", //Default SortColumn
            sortorder: "asc", //Default SortOrder.
            shrinkToFit: false,
            width: "900",
            height: "140",
            rownumbers: true,
            caption: "Campos",
            ondblClickRow: function (id) { $("#btnModificar").click(); }
        }).navGrid("#pager", { edit: false, add: false, search: false, del: false }); //agregado por puribe 16/09/2015
        // });
    }



    $("#tbCampoPlantilla").jqGrid('bindKeys', { "onEnter": function (id) { $("#btnModificar").click(); }, "onSpace": function (id) { $("#btnModificar").click(); } });

    inicio();

    $("#btnAgregar").click(function () {

        var MaxPos = 0;
        $('#lblCampo').html("");
        $('#lblCampo').hide();
        $('#ddlCampo').show();
        $("select#ddlCampo").prop('selectedIndex', 0);
        $("#ddlCampo").html("");
        var tipoplantilla = $('#ddlplantilla').val();


        $.ajax({
            type: "POST",
            url: "PlantillaCSV.aspx/CargarCamposInactivos",
            data: "{'tipoplantilla' : '" + tipoplantilla + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {

                for (var i = 0; i < $(result.d).length; i++) {
                    // var inCodCam = result.d[i].P_inCodCam.toString(); // +'-' + result.d[i].vcCod;
                    var inCodCam = result.d[i].P_inCodCam.toString() + '-' + result.d[i].vcCod; //agregado por puribe 16/09/2015
                    var vcNomCam = result.d[i].vcDes;
                    $("#ddlCampo").append($("<option></option>").attr("value", inCodCam).text(vcNomCam));
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }

        });



        var datos = $("#tbCampoPlantilla").jqGrid('getRowData');

        $(datos).each(function () {
            if (MaxPos < parseInt(this.inPos)) {
                MaxPos = parseInt(this.inPos);
            }
        });

        MaxPos = MaxPos + 1;
        $('#txtPosicion').val(MaxPos);

        $('#dvCamposDetalle').dialog({
            title: "Agregar campo",
            modal: true,
            width: 350,
            buttons: {
                "Agregar": function () {
                    var inCodCam = $('#ddlCampo').val();
                    var inPos = $('#txtPosicion').val();
                    var inLon = $('#txtLongitud').val();
                    var obligatorio = $('#chkobligatorio').prop('checked');
                    var inSer = "-1";
                    var inTip = "-1";
                    var vcSer = "";
                    var vcDes = "";
                    var vcTip = "";
                    var Repetido = 0;
                    if (inCodCam == -1) {
                        alert("Seleccione un campo");
                        $('#ddlCampo').focus();
                        return;
                    }
                    if (inPos == "") {
                        alert("Ingrese una posición");
                        $('#txtPosicion').focus();
                        return;
                    }
                    if (parseInt(inPos) == 0) {
                        alert("Ingrese una posición mayor a cero");
                        $('#txtPosicion').focus();
                        return;
                    }
                    if (inLon == "") {
                        if ($("#ddlArchivo").val() == "2") {
                            alert("Ingrese una longitud");
                            $('#txtLongitud').focus();
                            return;
                        }
                        else {
                            inLon = "1";
                        }
                    }
                    if (parseInt(inLon) == 0) {
                        if ($("#ddlArchivo").val() == "2") {
                            alert("Ingrese una longitud mayor a cero");
                            $('#txtLongitud').focus();
                            return;
                        }
                        else {
                            inLon = "1";
                        }
                    }

                    if (inPos.substring(0, 1) == "0") {
                        alert("Ingrese una Posición válida - No se Permite que el Valor inicie con cero");
                        $('#txtPosicion').focus();
                        return;
                    }

                    if (inLon.substring(0, 1) == "0") {
                        alert("Ingrese una Longitud válida - No se Permite que el Valor inicie con cero");
                        $('#txtLongitud').focus();
                        return;
                    }

                    var datos = $("#tbCampoPlantilla").jqGrid('getRowData');

                    $(datos).each(function () {
                        if (parseInt($('#txtPosicion').val()) == parseInt(this.inPos)) {
                            //cadenaOriginal.replaceFirst ("^0*", "")
                            Repetido = 1;
                        }
                    });

                    if (Repetido == 1) {
                        alert("La posición ingresada ya ha sido registrada");
                        $('#txtPosicion').focus();
                        return;
                    }

                    //$("#tbCampoPlantilla").jqGrid('addRowData', inPos, { P_inCodCam: inCodCam, vcCod: String.fromCharCode(inCodCam), vcDes: $("#ddlCampo option:selected").text(),
                    //$("#tbCampoPlantilla").jqGrid('addRowData', inPos, { P_inCodCam: inCodCam, vcCod: String.fromCharCode(inCod), vcDes: $("#ddlCampo option:selected").text(), //agregado por puribe 16/09/2015

                    //$("#tbCampoPlantilla").jqGrid('addRowData', inPos, { P_inCodCam: inCodCam, vcCod: String.fromCharCode(inCodCam), vcDes: $("#ddlCampo option:selected").text(),
                    $("#tbCampoPlantilla").jqGrid('addRowData', inPos, { P_inCodCam: inCodCam.split('-')[0], vcCod: inCodCam.split('-')[1], vcDes: $("#ddlCampo option:selected").text(),
                        inPos: inPos, inLon: inLon, Obligatorio: obligatorio
                    }
                                                         );

                    ActualizaPlantilla();



                    Mensaje("<br/><h1>Campo agregado</h1><h2>Para guardar los cambios de forma permanente, dé click en el boton guardar</h2><br/>", document, CerroMensaje);
                    $(this).dialog("close");
                },
                Cancelar: function () {
                    $(this).dialog("close");
                }
            }
        });
    });

    function CerroMensaje() {
        $('#txtLongitud').val('');
    }

    $("#btnModificar").click(function () {
        var PosAct;
        var id = $("#tbCampoPlantilla").jqGrid('getGridParam', 'selrow');
        if (id) {
            var datos = $("#tbCampoPlantilla").jqGrid('getRowData', id);
            PosAct = datos.inPos;
            $('#ddlCampo').hide();
            $('#lblCampo').html(datos.vcDes);
            $('#lblCampo').show();
            $('#txtPosicion').val(PosAct);
            $('#txtLongitud').val(datos.inLon);
            $('#chkobligatorio').prop('checked', false);
            if (datos.Obligatorio == 'true') {
                $('#chkobligatorio').prop('checked', true);
            }
            $('#lblServicio').html("");
            $('#lblServicio').hide();
            $('#lblTipo').html("");
            $('#lblTipo').hide();
            $('#trServicio').hide();
            $('#trTipo').hide();
            $('#trDescripcion').hide();
            $('#ddlServicio').hide();
            $('#ddlTipoServicioImportador').hide();
            $("select#ddlServicio").prop('selectedIndex', 0);
            $("select#ddlTipoServicioImportador").prop('selectedIndex', 0);

            if (datos.vcCod == "s" && $('#chkServicioCampo').is(':checked')) {
                $('#lblTipo').html(datos.inCodTipSer);
                $("#txtDescripcion").val(datos.vcDesRes); //ojo
                $('#lblServicio').show();
                $('#lblTipo').show();
                $('#trServicio').show();
                $('#trTipo').show();
                $('#trDescripcion').show();
            }

            $('#dvCamposDetalle').dialog({
                title: "Editar Campo Plantilla",
                modal: true,
                buttons: {
                    "Modificar": function () {
                        var inPos = $('#txtPosicion').val();
                        var inLon = $('#txtLongitud').val();
                        var vcDes = $('#txtDescripcion').val();
                        var observacion = $('#chkobligatorio').prop('checked');
                        var Repetido = 0;

                        if (inPos == "") {
                            alert("Ingrese una posición");
                            $('#txtPosicion').focus();
                            return;
                        }
                        if (inLon == "") {
                            if ($("#ddlArchivo").val() == "2") {
                                alert("Ingrese una longitud");
                                $('#txtLongitud').focus();
                                return;
                            }
                            else {
                                inLon = "1";
                            }
                        }
                        if (parseInt(inLon) == 0) {
                            if ($("#ddlArchivo").val() == "2") {
                                alert("Ingrese una longitud mayor a cero");
                                $('#txtLongitud').focus();
                                return;
                            }
                            else {
                                inLon = "1";
                            }
                        }
                        if (parseInt(inPos) == 0) {
                            alert("Ingrese una posición mayor a cero");
                            $('#txtPosicion').focus();
                            return;
                        }

                        var datos = $("#tbCampoPlantilla").jqGrid('getRowData');
                        $(datos).each(function () {
                            if (parseInt($('#txtPosicion').val()) == parseInt(this.inPos)) {
                                Repetido = 1;
                            }
                        });

                        if (Repetido == 1 && PosAct != $('#txtPosicion').val()) {
                            alert("La posición ingresada ya ha sido registrada");
                            $('#txtPosicion').focus();
                            return;
                        }

                        $("#tbCampoPlantilla").jqGrid('setRowData', id, { 'inPos': inPos, 'inLon': inLon, 'vcDesRes': vcDes, 'Obligatorio': observacion });
                        ActualizaPlantilla();
                        Mensaje("<br/><h1>Campo actualizado</h1><h2>Para guardar los cambios de forma permanente, dé click en el boton guardar</h2><br/>", document, CerroMensaje);
                        $(this).dialog("close");

                    },
                    Cerrar: function () {
                        $(this).dialog("close");
                    }
                }
            });
        }
        else {
            alert("Seleccione un campo");
        }
    });

    $("#btnQuitar").click(function () {
        var id = $("#tbCampoPlantilla").jqGrid('getGridParam', 'selrow');
        if (id) {
            $('#divMsgConfirmacion').dialog({
                title: "Quitar campo",
                modal: true,
                buttons: {
                    "Si": function () {
                        var id = $("#tbCampoPlantilla").jqGrid('getGridParam', 'selrow');
                        var strSeparador = $("#ddlseparador").val();
                        var strAbrevSeparador = strSeparador.substring(strSeparador.indexOf(')'), strSeparador.indexOf(')') - 1);
                        var separador = $("#ddlseparador option:selected").text();
                        if (id) {
                            var datos = $("#tbCampoPlantilla").jqGrid('getRowData', id);
                            var inLong = parseInt(datos.inLon);
                            var inPos = parseInt(datos.inPos);
                            var vcCod = datos.vcCod;
                            var vcDes = datos.vcDes;
                            QuitarCampos_ActualizarAbreviaturaPlantilla(inLong, inPos, vcDes, vcCod, strSeparador, strAbrevSeparador, separador);
                            $("#tbCampoPlantilla").jqGrid('delRowData', id);
                        }

                        $("#ddlCampo").html("");

                        var Datos = $("#tbCampoPlantilla").jqGrid('getRowData');

                        $(window.parent.lstCampo).each(function () {
                            //      var inCodCam = this.P_inCodCam;
                            var inCod = this.P_inCodCam; //agregado por puribe 16/09/2015
                            var vcNomCam = this.vcDes;
                            var Existe = false;

                            $(Datos).each(function () {
                                //  if (this.P_inCod == inCodCam) {
                                if (this.P_inCod == inCod) {//agregado por puribe 16/09/2015
                                    Existe = true;
                                }
                            });

                            if (!Existe) {
                                $("#ddlCampo").append($("<option></option>").attr("value", inCodCam).text(vcNomCam));
                            }
                        });

                        Mensaje("<br/><h1>Campo removido</h1><h2>Para guardar los cambios de forma permanente, dé click en el boton guardar</h2><br/>", document, CerroMensaje);
                        $(this).dialog("close");
                    },
                    "Cancelar": function () {
                        $(this).dialog("close");
                    }
                }
            });
        }
        else {
            alert("Seleccione un campo");
        }
    });



    $("#ddlCampo").change(function () {
        if ($('#chkServicioCampo').is(':checked')) {
            if ($(this).val() == "115") {
                $("#trServicio").show();
                $("#trTipo").show();
                $('#trDescripcion').show();
                $("#ddlServicio").show();
                $("#ddlTipoServicioImportador").show();
                $("select#ddlServicio").prop('selectedIndex', 0);
                $("select#ddlTipoServicioImportador").prop('selectedIndex', 0);
                $("#txtDescripcion").val("");
            }
            else {
                $("#trServicio").hide();
                $("#trTipo").hide();
                $('#trDescripcion').hide();
            }
        }
    });

    $("#ddlServicio").change(function () {
        if ($("#ddlServicio").val() != -1) {
            $("#txtDescripcion").val($("#ddlServicio option:selected").html());
        }
        else {
            $("#txtDescripcion").val("");
        }
    });

    $("#ddlseparador").change(function () { //agregado por puribe 16/09/2015
        ActualizaPlantilla();
    });

    $("#rbSeparador").change(function () {
        var valor = $("input[name='rbSeparador']:checked").val();
        if (valor == "3") {
            $("#txtOtroSeparador").show();
        }
        else {
            $("#txtOtroSeparador").hide();
        }
    });

    function InsertarAbreviaturaPlantilla(inLong, inPosi, vcDesc, vcCodi, strSeparador, strAbrevSeparador, separador) {
        var vcPlan = "";
        var vcPlanDec = "";
        var vcPlanUn = "";
        var vcPlanLit = "";
        var lstPlan;
        var lstPlanLit;

        lstPlan = new Array(inPosi);
        lstPlanLit = new Array(inPosi);

        for (var i = 0; i < inPosi; i++) {
            if ($("#hdfTipoOrigen").val() == "Texto Posicion") {
                lstPlan[i] = '*';
                $("#trSeparador").hide();
            } else {
                lstPlan[i] = strAbrevSeparador;
                $("#trSeparador").show();
            }
            lstPlanLit[i] = '';
            var i2 = (i + 1).toString();

            if (i < 9) {
                vcPlanUn += i2;
            }
            else {
                vcPlanUn += i2.substring(i2.length - 1, i2.length);
            }
            if (i > 0) {
                if ((i + 1) % 10) {
                    vcPlanDec += "_";
                }
                else {
                    vcPlanDec += i2.substring(i2.length - 2, i2.length - 1);
                }
            }
        }

        if (strSeparador == "POR POSICION") {
            var comodin = "*";
            var valorrepetir = vcCodi;
            var cantidadrepetir = inLong;
            var posicion = inPosi;

            var mascara = posicion - vcplantillaposicion.length;
            vcplantillaposicion += comodin.repeat(mascara);
            vcplantillaposicion += valorrepetir.repeat(cantidadrepetir);

            lstPlan[parseInt(this.inPosi) - 1] = valorrepetir.repeat(cantidadrepetir);
            //lstPlanLit[parseInt(this.inPos) - 1] = this.vcDes;

        }
        else {
            //agregado por puribe 16/09/2015
            if ($("#hdfTipoOrigen").val() == "Texto Posicion") {
                var inlong = 0;
                var inPosc = parseInt(inPosi);

                while (inlong < parseInt(inLong)) {
                    lstPlan[parseInt(inPosi) + inlong - 1] = vcCodi;
                    lstPlanLit[parseInt(inPosi) + inlong - 1] = vcDesc;
                    inlong = inlong + 1;
                }

            } else {
                lstPlan[parseInt(inPosi) - 1] = vcCodi;
                lstPlanLit[parseInt(inPosi) - 1] = vcDesc;
            }
        }

        for (var i = 0; i < inPosi; i++) {
            vcPlan += lstPlan[i];
            vcPlanLit += lstPlanLit[i];
            if (i < inPosi - 1) {
                vcPlanLit += ",";
            }
        }

        if (separador == "POR POSICION") {
            vcplantillaposicion += "***";
            $("#lblPlan").html(vcplantillaposicion);
        }
        else {
            $("#lblPlan").html(vcPlan);
        }

        $("#lblPlanDec").html(vcPlanDec);
        $("#lblPlanUn").html(vcPlanUn);

    }

    function ActualizarAbreviaturaPlantilla(inLong, inPosi, vcDesc, vcCodi, strSeparador, strAbrevSeparador, separador) { //Actualizacion de las descripciones de la plantilla
        var vcPlantilla = $("#lblPlan").text().split(strAbrevSeparador);
        var inTotSeparador = vcPlantilla.length;

        var vcPlan = "";
        var vcPlanDec = "";
        var vcPlanUn = "";
        var vcPlanLit = "";
        var lstPlan;
        var lstPlanLit;
        var vcplantillaposicion = "";
        var isUpdate_Posi_Menor = false;

        lstPlan = new Array(inPosi);
        lstPlanLit = new Array(inPosi);

        if (inPosi > inTotSeparador) { //
            for (var z = 0; z < inTotSeparador; z++) {
                if ($("#hdfTipoOrigen").val() == "Texto Posicion") {
                    lstPlan[z] = '*';
                    $("#trSeparador").hide();
                } else {
                    lstPlan[z] = (vcPlantilla[z] != "" ? vcPlantilla[z] : "") + strAbrevSeparador;
                    $("#trSeparador").show();
                }
                lstPlanLit[z] = '';
                var i2 = (z + 1).toString();

                if (z < 9) {
                    vcPlanUn += i2;
                }
                else {
                    vcPlanUn += i2.substring(i2.length - 1, i2.length);
                }
                if (z > 0) {
                    if ((z + 1) % 10) {
                        vcPlanDec += "_";
                    }
                    else {
                        vcPlanDec += i2.substring(i2.length - 2, i2.length - 1);
                    }
                }
            }

            for (z; z < inPosi; z++) {
                if ($("#hdfTipoOrigen").val() == "Texto Posicion") {
                    lstPlan[z] = '*';
                    $("#trSeparador").hide();
                } else {
                    lstPlan[z] = strAbrevSeparador;
                    $("#trSeparador").show();
                }
                lstPlanLit[z] = '';
                var i2 = (z + 1).toString();

                if (z < 9) {
                    vcPlanUn += i2;
                }
                else {
                    vcPlanUn += i2.substring(i2.length - 1, i2.length);
                }
                if (z > 0) {
                    if ((z + 1) % 10) {
                        vcPlanDec += "_";
                    }
                    else {
                        vcPlanDec += i2.substring(i2.length - 2, i2.length - 1);
                    }
                }
            }
            isUpdate_Posi_Menor = false;
        }
        else {
            for (var x = 0; x < inTotSeparador; x++) {
                if ($("#hdfTipoOrigen").val() == "Texto Posicion") {
                    lstPlan[x] = '*';
                    $("#trSeparador").hide();
                } else {
                    if (x == (inPosi - 1)) {
                        lstPlan[x] = vcCodi + strAbrevSeparador;
                    } else if (x == (inTotSeparador - 1)) {
                        lstPlan[x] = vcPlantilla[x];
                    }
                    else {
                        lstPlan[x] = (vcPlantilla[x] != "" ? vcPlantilla[x] : "") + strAbrevSeparador;
                    }
                    $("#trSeparador").show();
                }
                lstPlanLit[x] = '';
                var i2 = (x + 1).toString();

                if (x < 9) {
                    vcPlanUn += i2;
                }
                else {
                    vcPlanUn += i2.substring(i2.length - 1, i2.length);
                }
                if (x > 0) {
                    if ((x + 1) % 10) {
                        vcPlanDec += "_";
                    }
                    else {
                        vcPlanDec += i2.substring(i2.length - 2, i2.length - 1);
                    }
                }
            }
            isUpdate_Posi_Menor = true;
        }


        if (isUpdate_Posi_Menor) {
            for (var f = 0; f < inTotSeparador; f++) {
                vcPlan += lstPlan[f];
                vcPlanLit += lstPlanLit[f];
                if (f < inTotSeparador - 1) {
                    vcPlanLit += ",";
                }
            }
        } else {
            if (strSeparador == "POR POSICION") {
                var comodin = "*";
                var valorrepetir = vcCodi;
                var cantidadrepetir = inLong;
                var posicion = inPosi;

                var mascara = posicion - vcplantillaposicion.length;
                vcplantillaposicion += comodin.repeat(mascara);
                vcplantillaposicion += valorrepetir.repeat(cantidadrepetir);

                lstPlan[parseInt(this.inPosi) - 1] = valorrepetir.repeat(cantidadrepetir);
            }
            else {
                //agregado por puribe 16/09/2015
                if ($("#hdfTipoOrigen").val() == "Texto Posicion") {
                    var inlong = 0;
                    var inPosc = parseInt(inPosi);

                    while (inlong < parseInt(inLong)) {
                        lstPlan[parseInt(inPosi) + inlong - 1] = vcCodi;
                        lstPlanLit[parseInt(inPosi) + inlong - 1] = vcDesc;
                        inlong = inlong + 1;
                    }

                } else {
                    lstPlan[parseInt(inPosi) - 1] = vcCodi;
                    lstPlanLit[parseInt(inPosi) - 1] = vcDesc;
                }
            }

            for (var i = 0; i < inPosi; i++) {
                vcPlan += lstPlan[i];
                vcPlanLit += lstPlanLit[i];
                if (i < inPosi - 1) {
                    vcPlanLit += ",";
                }
            }
        }

        if (separador == "POR POSICION") {
            vcplantillaposicion += "***";
            $("#lblPlan").html(vcplantillaposicion);
        }
        else {
            $("#lblPlan").html(vcPlan);
        }

        $("#lblPlanDec").html(vcPlanDec);
        $("#lblPlanUn").html(vcPlanUn);
    }

    function QuitarCampos_ActualizarAbreviaturaPlantilla(inLong, inPosi, vcDesc, vcCodi, strSeparador, strAbrevSeparador, separador) {
        var vcPlantilla = $("#lblPlan").text().split(strAbrevSeparador);
        var inTotSeparador = vcPlantilla.length;

        var vcPlan = "";
        var vcPlanDec = "";
        var vcPlanUn = "";
        var vcPlanLit = "";
        var lstPlan;
        var lstPlanLit;
        var vcplantillaposicion = "";

        lstPlan = new Array(inTotSeparador);
        lstPlanLit = new Array(inTotSeparador);

        for (var u = 0; u < inTotSeparador; u++) {
            if ($("#hdfTipoOrigen").val() == "Texto Posicion") {
                lstPlan[u] = '*';
                $("#trSeparador").hide();
            } else {
                if (u == (inPosi - 1)) {
                    lstPlan[u] = strAbrevSeparador;
                }
                else if (u == (inTotSeparador - 1)) {
                    lstPlan[u] = vcPlantilla[u];
                }
                else {
                    lstPlan[u] = (vcPlantilla[u] != "" ? vcPlantilla[u] : "") + strAbrevSeparador;
                }
                $("#trSeparador").show();
            }
            lstPlanLit[u] = '';
            var i2 = (u + 1).toString();

            if (u < 9) {
                vcPlanUn += i2;
            }
            else {
                vcPlanUn += i2.substring(i2.length - 1, i2.length);
            }
            if (u > 0) {
                if ((u + 1) % 10) {
                    vcPlanDec += "_";
                }
                else {
                    vcPlanDec += i2.substring(i2.length - 2, i2.length - 1);
                }
            }
        }

        for (var y = 0; y < inTotSeparador; y++) {
            vcPlan += lstPlan[y];
            vcPlanLit += lstPlanLit[y];
            if (y < inTotSeparador - 1) {
                vcPlanLit += ",";
            }
        }

        if (separador == "POR POSICION") {
            vcplantillaposicion += "***";
            $("#lblPlan").html(vcplantillaposicion);
        }
        else {
            $("#lblPlan").html(vcPlan);
        }

        $("#lblPlanDec").html(vcPlanDec);
        $("#lblPlanUn").html(vcPlanUn);


    }

    function ActualizaPlantilla() {
        var MaxPos = 0;
        var inPos = 0, inLong = 0;
        var vcDes = '';
        var vcCod = '';
        var datos = $("#tbCampoPlantilla").jqGrid('getRowData');
        var strSeparador = $("#ddlseparador").val();
        var strAbrevSeparador = strSeparador.substring(strSeparador.indexOf(')'), strSeparador.indexOf(')') - 1);
        var separador = $("#ddlseparador option:selected").text();

        $("#lblPlan").html('');

        $(datos).each(function () {
            inLong = parseInt(this.inLon);
            inPos = parseInt(this.inPos);
            vcCod = this.vcCod;
            vcDes = this.vcDes;

            if ($("#lblPlan").text().length > 0) {
                ActualizarAbreviaturaPlantilla(inLong, inPos, vcDes, vcCod, strSeparador, strAbrevSeparador, separador);
            }
            else {
                InsertarAbreviaturaPlantilla(inLong, inPos, vcDes, vcCod, strSeparador, strAbrevSeparador, separador);
            }
        });

        var vcPlan = $("#lblPlan").text().toString();
        if (vcPlan.substring(vcPlan.length - 1) == strAbrevSeparador) {
            vcPlan = vcPlan.substring(0, vcPlan.length - 1);
            $("#lblPlan").html(vcPlan);
        }
    }

    $("#btnvolver").click(function () {

        window.location = "Sin_Configura.aspx";

    });


    $('#ddlplantilla').change(function () { obtenerdatoplantilla($(this).val()); });


    function obtenerdatoplantilla(tipo) {
        //CARGAR NOMBRE ASUNTO
        $.ajax({
            type: "POST",
            url: "PlantillaCSV.aspx/CargarPlantillaTipo",
            data: "{'tipo': '" + tipo + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.d != "") {
                    $("#txtarchivo").val(result.d[0].archivo);
                    $("#txtbackup").val(result.d[0].backup);
                    $("#txterror").val(result.d[0].error);

                    $("#lblPlanLit").val(result.d[0].planlit);
                    $("#lblPlan").val(result.d[0].plan);

                    inicio();
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }

        });



    }

});



