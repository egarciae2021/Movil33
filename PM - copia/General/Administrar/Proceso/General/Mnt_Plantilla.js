var arrCampos = [];


$(function () {


    IniciarPagina();


    var indiceTab = window.parent.tab.tabs("option", "selected");

    function IniciarPagina() {

        ValidarNumeroEnCajaTexto("txtposicionfila", ValidarSoloNumero);
        $("#txtLongitud").removeClass("ui-corner-all");
        $("#txtLongitud").css("padding", "0px");
        $("#txtLongitud").css({ "border": "none" });

        $("#txtLongitud").kendoNumericTextBox({
            format: "{0:n0}",
            min: 1,
            max: 100,
            step: 1
        });
        $(".btnNormal").button();

        //        if ($("#hdfEstado").val() == '') {
        //            $("#trEstado").hide();
        //            $("#tdEstado").hide();
        //        }
        //        else {
        //            $("#trEstado").show();
        //            $("#tdEstado").show();
        //        }

        $("#gridCampos").hide();
        $("#PanelCampoUbicacion").hide();

        if ($("#hdfCodigo").val() != "") {
            Cargar_Grilla_Campos();
        }

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

    //    $("#chActivo").bind('change', function () {
    //        if ($(this).is(":checked")) {
    //            $("#hdfEstado").val("1");
    //        }
    //        else {
    //            $("#hdfEstado").val("0");
    //        }
    //    });

    //    function Buscar_TablaFK_x_Constraint(valorconst, accion, valor) {
    //        $.ajax({
    //            type: "POST",
    //            url: "Mnt_Plantilla.aspx/Listar_Tabla_FK_x_Constraint",
    //            data: "{'constraint': '" + valorconst.replace(/'/g, "&#39").replace(/"/g, "&#34") + "'," +
    //                           "'idcliente': '" + window.parent.parent.parent.idCliente + "'}",
    //            contentType: "application/json; charset=utf-8",
    //            dataType: "json",
    //            success: function (result) {

    //                if (result.d.length != 0) {
    //                    $("#txttabladestino").val(result.d[0].TABLE_NAME);
    //                    Buscar_Campo_x_TablaFK(accion, valor);
    //                } else {
    //                    $("#txttabladestino").val("");
    //                }

    //            },
    //            error: function (xhr, err, thrErr) {
    //                MostrarErrorAjax(xhr, err, thrErr);
    //            }
    //        });
    //    };

    //    function Buscar_Campo_x_TablaFK(accion, valor) {
    //        $.ajax({
    //            type: "POST",
    //            url: "Mnt_Plantilla.aspx/Listar_CamposPF_x_TablaFK",
    //            data: "{'tabla': '" + $("#txttabladestino").val().replace(/'/g, "&#39").replace(/"/g, "&#34") + "'," +
    //                           "'idcliente': '" + window.parent.parent.parent.idCliente + "'}",
    //            contentType: "application/json; charset=utf-8",
    //            dataType: "json",
    //            success: function (result) {

    //                if (result.d.length != 0) {

    //                    $("#ddlcampomostrar").removeAttr('disabled');
    //                    $("#ddlcampomostrar").empty();
    //                    $("#ddlcampomostrar").append("<option value='-1'>--Selecione--</option>");
    //                    for (var i = 0; i < result.d.length; i++) {
    //                        $("#ddlcampomostrar").append("<option value='" + result.d[i] + "'>" + result.d[i] + "</option>");
    //                    }

    //                    if (accion == "UPD") {
    //                        $("#ddlcampomostrar").val(valor);
    //                    }


    //                } else {
    //                    $("#ddlcampomostrar").empty();
    //                }

    //            },
    //            error: function (xhr, err, thrErr) {
    //                MostrarErrorAjax(xhr, err, thrErr);
    //            }
    //        });
    //    };


    //    $("#ddlcampoforaneo").bind('change', function () {

    //        if ($("#ddlcampoforaneo").val() == "-1") {
    //            $("#txttabladestino").val("");
    //            $("#ddlcampomostrar").empty();
    //            $("#ddlcampomostrar").attr('disabled', 'disabled');
    //            $("#txtdescripcionCampo").val('');
    //            $("#txtorden").val('');
    //            $("#txtlongitud").val('');
    //            $("#txttipodato").val('');
    //            $("#chkPK").attr("checked", false);
    //            $("#chkIdentity").attr("checked", false);
    //            $("#chkPN").attr("checked", false);
    //            $("#chkdefault").attr("checked", false);
    //            $("#txtvalorDefault").val("");
    //            $("#txtdescripcionCampo").val('');
    //            //    $("#ddlNombreCampo").val("-1");
    //            $("#txtposiciocolumna").val('');
    //            $("#chkuso").attr("checked", false);

    //        } else {
    //            $("#txtdescripcionCampo").val('');
    //            $("#txtorden").val('');
    //            $("#txtlongitud").val('');
    //            $("#txttipodato").val('');
    //            $("#chkPK").attr("checked", false);
    //            $("#chkIdentity").attr("checked", false);
    //            $("#chkPN").attr("checked", false);
    //            $("#chkdefault").attr("checked", false);
    //            $("#txtvalorDefault").val("");
    //            $("#txtdescripcionCampo").val('');
    //            //$("#ddlNombreCampo").val("-1");
    //            $("#txtposiciocolumna").val('');
    //            $("#chkuso").attr("checked", false);
    //            Buscar_TablaFK_x_Constraint($("#ddlcampoforaneo").val(), "", "");
    //        }

    //    });

    //    $("#ddlcampomostrar").bind('change', function () {

    //        if ($("#ddlcampomostrar").val() == "-1") {
    //            $("#txtdescripcionCampo").val('');
    //            $("#txtorden").val('');
    //            $("#txtlongitud").val('');
    //            $("#txttipodato").val('');
    //            $("#chkPK").attr("checked", false);
    //            $("#chkIdentity").attr("checked", false);
    //            $("#chkPN").attr("checked", false);
    //            $("#chkdefault").attr("checked", false);
    //            $("#txtvalorDefault").val("");
    //            $("#txtdescripcionCampo").val('');
    //            // $("#ddlNombreCampo").val("-1");
    //            $("#txtposiciocolumna").val('');
    //            $("#chkuso").attr("checked", false);
    //        } else {


    //            $.ajax({
    //                type: "POST",
    //                url: "Mnt_Plantilla.aspx/Listar_Campos_Informacion_x_Tabla",
    //                data: "{'tabla': '" + $("#txttabladestino").val().replace(/'/g, "&#39").replace(/"/g, "&#34") + "'," +
    //                           "'columna': '" + $("#ddlcampomostrar").val().replace(/'/g, "&#39").replace(/"/g, "&#34") + "'," +
    //                           "'idcliente': '" + window.parent.parent.parent.idCliente + "'}",
    //                contentType: "application/json; charset=utf-8",
    //                dataType: "json",
    //                success: function (result) {
    //                    $("#txtdescripcionCampo").val(result.d[0].COLUMN_NAME);
    //                    $("#txtorden").val(result.d[0].ORDINAL_POSITION);
    //                    $("#txtlongitud").val(result.d[0].CHARACTER_MAXIMUM_LENGTH);
    //                    $("#txttipodato").val(result.d[0].DATA_TYPE);

    //                    if (result.d[0].PrimaryKey != 0) {
    //                        $("#chkPK").attr("checked", true);
    //                    } else {
    //                        $("#chkPK").attr("checked", false);
    //                    }

    //                    if (result.d[0].is_identity != 0) {
    //                        $("#chkIdentity").attr("checked", true);
    //                    } else {
    //                        $("#chkIdentity").attr("checked", false);
    //                    }

    //                    BaseDatos = result.d[0].TABLE_CATALOG;
    //                    Tabla = result.d[0].TABLE_NAME;
    //                    TablaFK = result.d[0].Table_Foreign;

    //                    if (result.d[0].IS_NULLABLE == "YES") {
    //                        $("#chkPN").attr("checked", true);
    //                    } else {
    //                        $("#chkPN").attr("checked", false);
    //                    }

    //                    if (result.d[0].COLUMN_DEFAULT != "") {
    //                        $("#chkdefault").attr("checked", true);
    //                        $("#txtvalorDefault").val(result.d[0].COLUMN_DEFAULT);
    //                    } else {
    //                        $("#chkdefault").attr("checked", false);
    //                        $("#txtvalorDefault").val("");
    //                    }
    //                },
    //                error: function (xhr, err, thrErr) {
    //                    MostrarErrorAjax(xhr, err, thrErr);
    //                }
    //            });

    //        }

    //    });

    function CargarTreeTablaRelacion() {
        var treeData;
        $.ajax({
            type: "POST",
            url: "Mnt_Plantilla.aspx/TreeRelacionTabla",
            data: "{'pTabla': '" + $("#hdfTabla").val() + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (resultado) {
                treeData = resultado.d;
                var treeData2 = JSON.parse(treeData);
                $("#divTreeTablasRelacion").dynatree({
                    checkbox: true,
                    selectMode: 3,
                    children: treeData2,
                    cookieId: "dynatree-Cb3",
                    idPrefix: "dynatree-Cb3-",
                    fx: { height: "toggle", duration: 200 },
                    onSelect: function (select, node) {
                        node.data.select = select;
                    }
                });

            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }


    //    function Listar_CampoFK_x_Tabla(accion, valor) {

    //        $.ajax({
    //            type: "POST",
    //            url: "Mnt_Plantilla.aspx/Listar_Campo_FK_x_Tabla",
    //            data: "{'tabla': '" + $("#txtTablaBase").val().replace(/'/g, "&#39").replace(/"/g, "&#34") + "'," +
    //                           "'idcliente': '" + window.parent.parent.parent.idCliente + "'}",
    //            contentType: "application/json; charset=utf-8",
    //            dataType: "json",
    //            success: function (result) {

    //                if (result.d.length != 0) {

    //                    $("#ddlcampoforaneo").empty();
    //                    $("#ddlcampoforaneo").append("<option value='-1'>--Selecione--</option>");
    //                    $("#ddlcampoforaneo").removeAttr('disabled');
    //                    for (var i = 0; i < result.d.length; i++) {
    //                        $("#ddlcampoforaneo").append("<option value='" + result.d[i].constraint_name + "'>" + result.d[i].ForeignKey + "</option>");
    //                    }

    //                    if (accion == "UPD") {
    //                        $("#ddlcampoforaneo").val(valor);
    //                    }

    //                } else {
    //                    $("#ddlcampoforaneo").empty();
    //                }

    //            },
    //            error: function (xhr, err, thrErr) {
    //                MostrarErrorAjax(xhr, err, thrErr);
    //            }
    //        });

    //    };

    //    $("#ddlNombreCampo").bind('change', function () {

    //        if ($("#ddlNombreCampo").val() == "-1") {

    //            Limpiar_Campos();

    //        } else {
    //            if ($("#ddlNombreCampo").val() == "-2") {

    //                $("#txtdescripcionCampo").val('');
    //                $("#txtorden").val('');
    //                $("#txtlongitud").val('');
    //                $("#txttipodato").val('');
    //                $("#chkPK").attr("checked", false);
    //                $("#chkIdentity").attr("checked", false);
    //                $("#chkPN").attr("checked", false);
    //                $("#chkdefault").attr("checked", false);
    //                $("#txtvalorDefault").val("");
    //                $("#txtdescripcionCampo").val('');

    //                $("#txtposiciocolumna").val('');
    //                $("#chkuso").attr("checked", false);

    //                $("#txtTablaBase").val("");
    //                $("#ddlcampoforaneo").empty();
    //                $("#txttabladestino").val("");
    //                $("#ddlcampomostrar").empty();
    //                $("#txtTablaBase").attr('disabled', 'disabled');
    //                $("#ddlcampoforaneo").attr('disabled', 'disabled');
    //                $("#txttabladestino").attr('disabled', 'disabled');
    //                $("#ddlcampomostrar").attr('disabled', 'disabled');
    //                $("#txtTablaBase").val($("#hdfTabla").val());

    //                Listar_CampoFK_x_Tabla("", "");

    //            } else {

    //                $("#txtTablaBase").val("");
    //                $("#ddlcampoforaneo").empty();
    //                $("#txttabladestino").val("");
    //                $("#ddlcampomostrar").empty();
    //                $("#txtTablaBase").attr('disabled', 'disabled');
    //                $("#ddlcampoforaneo").attr('disabled', 'disabled');
    //                $("#txttabladestino").attr('disabled', 'disabled');
    //                $("#ddlcampomostrar").attr('disabled', 'disabled');


    //                $.ajax({
    //                    type: "POST",
    //                    url: "Mnt_Plantilla.aspx/Listar_Campos_Informacion_x_Tabla",
    //                    data: "{'tabla': '" + $("#hdfTabla").val().replace(/'/g, "&#39").replace(/"/g, "&#34") + "'," +
    //                           "'columna': '" + $("#ddlNombreCampo").val().replace(/'/g, "&#39").replace(/"/g, "&#34") + "'," +
    //                           "'idcliente': '" + window.parent.parent.parent.idCliente + "'}",
    //                    contentType: "application/json; charset=utf-8",
    //                    dataType: "json",
    //                    success: function (result) {
    //                        $("#txtdescripcionCampo").val(result.d[0].COLUMN_NAME);
    //                        $("#txtorden").val(result.d[0].ORDINAL_POSITION);
    //                        $("#txtlongitud").val(result.d[0].CHARACTER_MAXIMUM_LENGTH);
    //                        $("#txttipodato").val(result.d[0].DATA_TYPE);

    //                        if (result.d[0].PrimaryKey != 0) {
    //                            $("#chkPK").attr("checked", true);
    //                        } else {
    //                            $("#chkPK").attr("checked", false);
    //                        }

    //                        if (result.d[0].is_identity != 0) {
    //                            $("#chkIdentity").attr("checked", true);
    //                        } else {
    //                            $("#chkIdentity").attr("checked", false);
    //                        }

    //                        BaseDatos = result.d[0].TABLE_CATALOG;
    //                        Tabla = result.d[0].TABLE_NAME;
    //                        TablaFK = result.d[0].Table_Foreign;

    //                        if (result.d[0].IS_NULLABLE == "YES") {
    //                            $("#chkPN").attr("checked", true);
    //                        } else {
    //                            $("#chkPN").attr("checked", false);
    //                        }

    //                        if (result.d[0].COLUMN_DEFAULT != "") {
    //                            $("#chkdefault").attr("checked", true);
    //                            $("#txtvalorDefault").val(result.d[0].COLUMN_DEFAULT);
    //                        } else {
    //                            $("#chkdefault").attr("checked", false);
    //                            $("#txtvalorDefault").val("");
    //                        }
    //                    },
    //                    error: function (xhr, err, thrErr) {
    //                        MostrarErrorAjax(xhr, err, thrErr);
    //                    }
    //                });
    //            }
    //        }
    //    });

    function Limpiar_Campos() {

        $("#txtdescripcionCampo").val('');
        $("#txtorden").val('');
        $("#txtLongitud").val('');
        $("#txttipodato").val('');
        $("#chkPK").attr("checked", false);
        $("#chkIdentity").attr("checked", false);
        $("#chkPN").attr("checked", false);
        $("#chkdefault").attr("checked", false);
        $("#txtvalorDefault").val("");
        $("#txtdescripcionCampo").val('');
        $("#ddlNombreCampo").val("-1");
        $("#txtposiciocolumna").val('');
        $("#chkuso").attr("checked", false);

        $("#txtTablaBase").val("");
        $("#ddlcampoforaneo").empty();
        $("#txttabladestino").val("");
        $("#ddlcampomostrar").empty();
        $("#txtTablaBase").attr('disabled', 'disabled');
        $("#ddlcampoforaneo").attr('disabled', 'disabled');
        $("#txttabladestino").attr('disabled', 'disabled');
        $("#ddlcampomostrar").attr('disabled', 'disabled');

    }

    function CerroMensaje() {
        BloquearPagina(false);
        if ($("#hdfCodigo").val() == "") {
            $("#txtnombre").val("");
            $("#txtdescripcion").val("");
            $("#txtEntidad").val("");
            $("#txtposicionfila").val("");
            $("#txtIdentificador").val("");
            //            $("#hdfEstado").val("");
            $("#hdfEntidad").val("");
            $("#hdfTabla").val("");
            $("#grid").data("kendoGrid").dataSource.data([]);
            $("#gridCampos").hide();
        }
        else {
            window.parent.tab.tabs("remove", indiceTab);
        }
    }

    $("#btnCerrar").live("click", function () {
        window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));
    });

    var arrayCampoId = [];
    var arrayNombre = [];
    var arrayDescripcion = [];
    var arrayServidor = [];
    var arrayBD = [];
    var arrayTabla = [];
    var arrayCampo = [];
    var arrayLongitud = [];
    var arrayTipo = [];
    var arrayOrden = [];
    var arraySerFor = [];
    var arrayBDFor = [];
    var arrayTablaFor = [];
    var arrayCampoFor = [];
    var arrayPK = [];
    var arrayPN = [];
    var arrayOblig = [];
    var arrayIdent = [];
    var arrayisDefault = [];
    var arrayDefault = [];
    var arrayPosicion = [];
    var arrayUso = [];
    var arrayAccion = [];
    var arrayCampoIden = [];

    var arrayLongitudCampo = [];
    var arrayUsoPrc = [];

    var arrayFormatos = [];

    function Registro_Plantilla() {

        var Codigo = $("#hdfCodigo").val();
        var Nombre = $("#txtnombre").val().replace(/'/g, "").replace(/\\/g, "");
        var Descrip = $("#txtdescripcion").val().replace(/'/g, "").replace(/\\/g, "");
        var Entidad = $("#hdfEntidad").val();
        var Posicionfila = $("#txtposicionfila").val() != "" ? $("#txtposicionfila").val().replace(/'/g, "&#39").replace(/\\/g, "\\\\") : 0;
        var Identificador = $("#txtIdentificador").val() != "" ? $("#txtIdentificador").val().replace(/'/g, "&#39").replace(/\\/g, "\\\\") : "";
        var Separador = $.trim($("#txtSeparador").val()).replace(/'/g, "&#39").replace(/\\/g, "\\\\");
        var btEst = false;
        if ($('#chActivo').is(':checked')) {
            btEst = true;
        }


        var grid = $("#grid").data("kendoGrid");
        var datasource = grid.dataSource;
        var data = grid.dataSource.data();

        if (data.length <= 0) {
            alerta("Debe agregar los campos que se utilizaran en la plantilla.");
            return true;
        }

        arrayCampoId = [];
        arrayAccion = [];
        arrayNombre = [];
        arrayTabla = [];
        arrayPosicion = [];
        arrayCampoIden = [];
        arrayLongitudCampo = [];
        arrayUsoPrc = [];
        arrayFormatos = [];

        var fila = "";
        var indPos = 0;
        var indDes = 0;
        //        if ($("#hdfUsaLongProc").val() == "1") {
        var existe = 0;

        var Descripcion = "";
        var i = 0;
        for (i = 0; i < data.length; i++) {
            var long = data[i].Longitud == null || data[i].Longitud == "" ? 0 : data[i].Longitud;
            var pos = data[i].Posicion == null ? "" : data[i].Posicion;
            Descripcion = data[i].Descripcion == null || data[i].Descripcion == "" ? "" : data[i].Descripcion;

            if ($("#hdfUsaLongProc").val() == "1") {
                if (data[i].Uso == "SI" && long == 0) {
                    existe = 1;
                    fila = i + 1;
                    break;
                }
            }
            if (data[i].Uso == "SI" && pos == "") {
                indPos = 1;
                fila = i + 1;
                break;
            }
            if (data[i].Uso == "SI" && Descripcion == "") {
                indDes = 1;
                fila = i + 1;
                break;
            }


        }
        if (existe == 1) {
            if (!confirm("Está intentando guardar campos sin longitud fila[" + fila + "]. La plantilla es utilizada para un proceso que utiliza longitud de campo. Desea grabar de todos modos?")) {
                return true;
            }
        }

        if (indPos == 1) {
            alerta("Está intentando guardar campos sin posición. Porfavor configure la posición del campo de la fila [" + fila + "].");
            return true;

        }
        if (indDes == 1) {
            alerta("Está intentando guardar campos sin descripción. Porfavor configure la descripción del campo de la fila [" + fila + "].");
            return true;

        }

        ////        }

        //        var indPos = 0;
        //        var indDes = 0;
        //        fila = "";
        //        var Descripcion = "";
        //        for (var i = 0; i < data.length; i++) {
        //            var pos = data[i].Posicion == null ? "" : data[i].Posicion;
        //            var Descripcion = data[i].Descripcion == null || data[i].Descripcion == "" ? "" : data[i].Descripcion;

        //            console.log(data[i].Uso+" - "+pos);
        //            if (data[i].Uso == "SI" && pos == "") {
        //                indPos = 1;
        //                fila = i + 1;
        //                break;
        //            }
        //            if (data[i].Uso == "SI" && Descripcion == "") {
        //                indDes = 1;
        //                fila = i + 1;
        //                break;
        //            }
        //        }

        //        if (indPos == 1) {
        //            alerta("Esta intentando guardar campos sin posición. Porfavor Configure la posición de el campo de la fila [" + fila + "].")
        //            return true;

        //        }
        //        if (indDes == 1) {
        //            alerta("Esta intentando guardar campos sin descripción. Porfavor Configure la descripción de el campo de la fila [" + fila + "].")
        //            return true;

        //        }

        for (i = 0; i < data.length; i++) {
            arrayCampoId.push(data[i].id);
            arrayAccion.push(data[i].Accion);
            arrayNombre.push(data[i].Campo);
            arrayTabla.push(data[i].Tabla);
            arrayPosicion.push(data[i].Posicion);
            arrayCampoIden.push(data[i].Ubicacion != null || data[i].Ubicacion != "" ? data[i].Ubicacion : "");
            arrayDescripcion.push(data[i].Descripcion);
            arrayLongitudCampo.push(data[i].Longitud == null || data[i].Longitud == "" ? 0 : data[i].Longitud);
            arrayUsoPrc.push(data[i].Uso);
            arrayFormatos.push(data[i].Formato);
        }




        $("#dvCargando").show();

        $.ajax({
            type: "POST",
            url: "Mnt_Plantilla.aspx/Guardar",
            data: JSON.stringify({
                'pCod': Codigo,
                'pNom': Nombre,
                'pDescripcion': Descrip,
                'pEntidad': Entidad,
                'pPosicionfila': Posicionfila,
                'pIdentificador': Identificador,
                'pSeparador': Separador,
                'pNombreCampo': arrayNombre,
                'pTabla': arrayTabla,
                'pAccion': arrayAccion,
                'pId': arrayCampoId,
                'pPosicion': arrayPosicion,
                'pCampoIdent': arrayCampoIden,
                'pLongitudCampo': arrayLongitudCampo,
                'pUsoPrc': arrayUsoPrc,
                'pDescripcionCampo': arrayDescripcion,
                'pFormatos': arrayFormatos,
                'pBtVig': btEst
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                $("#dvCargando").hide();
                if (msg.d == "") {
                    window.parent.ActualizarGrilla();
                    Mensaje("<br/><h1>Se guardó Correctamente.</h1><br/>", document, CerroMensaje);
                }
                else {

                    alerta(msg.d);
                    BloquearPagina(false);

                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });

    }

    $("#btnGuardar").live("click", function () {

        var Codigo = $("#hdfCodigo").val();
        var Nombre = $("#txtnombre").val().replace(/'/g, "").replace(/\\/g, "");
        var Descripcion = $("#txtdescripcion").val().replace(/'/g, "").replace(/\\/g, "");
        var Entidad = $("#hdfEntidad").val();
        var Posicionfila = $("#txtposicionfila").val();
        var Identificador = $("#txtIdentificador").val();

        if ($.trim(Nombre) == "") {
            alerta("El nombre de la Plantilla es un campo obligatorio");
            $("#txtnombre").focus();
            return;
        }

        if ($.trim(Descripcion) == "") {
            alerta("La descripción de la Plantilla es un campo obligatorio");
            $("#txtdescripcion").focus();
            return;
        }

        if ($.trim(Entidad) == "") {
            alerta("La Entidad de la Plantilla es un campo obligatorio");
            $("#txtEntidad").focus();
            return;
        }

        //        if ($.trim(Posicionfila) == "") {
        //            alerta("La Posición de la fila de la Plantilla es un campo obligatorio");
        //            $("#txtposicionfila").focus();
        //            return;
        //        } else {

        //            if ($.trim(Posicionfila) <= 1) {
        //                alerta("La Posición de la fila debe ser mayor a 1");
        //                $("#txtposicionfila").focus();
        //                return;
        //            }
        //        }

        //        if ($.trim(Identificador) == "") {
        //            alerta("El identificador de la Plantilla es un campo obligatorio");
        //            $("#txtIdentificador").focus();
        //            return;
        //        }

        Registro_Plantilla();
        //Validar_CamposFK_Grid();

    });

    if ($("#txtEntidad").length > 0) {



        $("#txtEntidad").autocomplete({
            minLength: 0,
            source: function (request, response) {
                $("#txtEntidad").val($("#txtEntidad").val().replace(/\\/g, ""));
                $.ajax({
                    type: "POST",
                    url: "Mnt_Plantilla.aspx/Search_Entidad",
                    data: "{'nombre': '" + $("#txtEntidad").val().replace(/'/g, "&#39").replace(/"/g, "&#34") + "'," +
                           "'idCliente': '" + window.parent.parent.parent.idCliente + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        response($.map(result.d, function (item) {
                            return {
                                label: item.vcDes,
                                cod: item.P_inCod,
                                Tabla: item.vcTab
                            };
                        }));
                    },
                    error: function (xhr, err, thrErr) {
                        MostrarErrorAjax(xhr, err, thrErr);
                    }
                });
            },
            focus: function (event, ui) {
                $("#txtEntidad").val(ui.item.label);
                return false;
            },
            select: function (event, ui) {
                $("#hdfEntidad").val('');
                $("#hdfTabla").val('');
                $("#txtEntidad").val('');
                $("#ddlNombreCampo").empty();

                $("#txtEntidad").val(ui.item.label);
                $("#hdfEntidad").val(ui.item.cod);
                $("#hdfTabla").val(ui.item.Tabla);
                $("#gridCampos").show();
                return false;
            }
        })
        .data("autocomplete")._renderItem = function (ul, item) {
            return $("<li></li>")
			    .data("item.autocomplete", item)
			    .append("<a>" + item.cod + "=" + item.label + "</a>")
			    .appendTo(ul);
        };
    }

    function Cargar_CamposPK_FK() {
        $.ajax({
            type: "POST",
            url: "Mnt_Plantilla.aspx/AgregarCamposPK_FK",
            data: JSON.stringify({
                'pTabla': $("#hdfTabla").val()
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.d.length != 0) {
                    var i;
                    for (i = 0; i < result.d.length; i++) {
                        var campo;
                        var tabla;
                        var ubicacion;
                        var idcampo;
                        var accion;
                        var identificador;
                        var descripcion;

                        if (result.d[i].COLUMN_NAME != "PK" || result.d[i].COLUMN_NAME != "FK") {

                            idcampo = result.d[i].COLUMN_DEFAULT;
                            ubicacion = "";
                            tabla = result.d[i].TABLE_NAME;
                            campo = result.d[i].COLUMN_NAME;
                            accion = "UPD";
                            identificador = "";
                            descripcion = "";

                        } else {
                            idcampo = result.d[i].COLUMN_DEFAULT;
                            ubicacion = "";
                            tabla = result.d[i].TABLE_NAME;
                            campo = result.d[i].COLUMN_NAME;
                            accion = "INS";
                            identificador = "";
                            descripcion = "";
                        }

                        var grid = $("#grid").data("kendoGrid");
                        var datasource = grid.dataSource;
                        var data = grid.dataSource.data();
                        var newrecord = {
                            id: idcampo,
                            Campo: campo,
                            Tabla: tabla,
                            Uso: "SI",
                            Posicion: ubicacion,
                            Accion: accion,
                            Ubicacion: identificador,
                            Descripcion: descripcion,
                            Formato: ""
                        };
                        datasource.add(newrecord);
                    }
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }

    var id = "";
    var rowNumber = 0;
    var _longitud = $("#txtLongitud").data("kendoNumericTextBox");
    var $MensUbicacion = $("#MensUbicacion");
    $("#grid").kendoGrid({
        dataSource: {
            pageSize: 10
        },
        groupable: {
            messages: {
                empty: "Campos para el Modelo de Plantilla"
            }
        },
        //        schema: {
        //            model: {
        //                fields: {
        //                    Posicion: { type: "number" },
        //                    id: { editable: false },
        //                    Campo: { editable: false },
        //                    Tabla: { editable: false },
        //                    Uso: { editable: false },
        //                    Accion: { editable: false }
        //                }
        //            }
        //        },
        editable: false,
        sortable: false,
        pageable: {
            refresh: false,
            pageSizes: true,
            messages: {
                itemsPerPage: "ítems por página",
                display: "{0}-{1} de {2} ítems",
                empty: ""
            },
            pageSizes: [10, 25, 50]
        },
        dataBound: resetRowNumber,
        toolbar: [{
            text: "Agregar Campos",
            className: "k-grid-custom"
        }],
        columns: [

                        {
                            hidden: true,
                            title: "",
                            width: 90,
                            template: "#= renderNumber(data) #"
                        }, {
                            hidden: true,
                            field: "id",
                            tittle: "id"
                        },
                        {
                            sortable: false,
                            field: "Campo",
                            title: "Campo",
                            width: 100,
                            headerAttributes: { style: "text-align: center; width: 100px;" }
                        }, {
                            sortable: false,
                            field: "Descripcion",
                            title: "Descripción",
                            width: 100,
                            headerAttributes: { style: "text-align: center; width: 100px;" }
                        }, {
                            sortable: false,
                            field: "Tabla",
                            title: "Tabla",
                            width: 120,
                            headerAttributes: { style: "text-align: center; width: 120px;" }
                        }, {
                            sortable: false,
                            field: "Uso",
                            title: "Uso",
                            width: 50
                        }, {
                            sortable: false,
                            field: "Posicion",
                            title: "Posición",
                            width: 50,
                            headerAttributes: { style: "text-align: center; width: 50px;" }
                        }, {
                            sortable: false,
                            hidden: true,
                            field: "Accion",
                            title: "Acción",
                            width: 50
                        }, {
                            sortable: false,
                            hidden: true,
                            field: "Ubicacion",
                            title: "Identificador/Hoja",
                            width: 50,
                            headerAttributes: { style: "text-align: center; width: 50px;" }
                        },
                        {
                            sortable: false,
                            hidden: true,
                            field: "Longitud",
                            title: "Longitud",
                            width: 50,
                            headerAttributes: { style: "text-align: center; width: 50px;" }
                        },
                        {
                            sortable: false,
                            hidden: true,
                            field: "Formato",
                            title: "Formato",
                            width: 50,
                            headerAttributes: { style: "text-align: center; width: 50px;" }
                        },
                      {
                          width: 100,
                          command: [
                               {
                                   name: "Actualizar",
                                   click: function (e) {
                                       accion = "Actualizar";
                                       e.preventDefault();
                                       var tr = $(e.currentTarget).closest("tr");

                                       var data = $("#grid").data("kendoGrid").dataItem(tr);
                                       id = $("td:eq(0)", tr).text();

                                       var bool = data.Uso == "SI" ? true : false;

                                       $("#chkUso").attr('checked', bool);
                                       $("#txtdescripcionCampo").val(data.Descripcion);
                                       $("#txtposicioncolu").val(data.Posicion);
                                       $("#txtubicacion").val(data.Ubicacion);
                                       //                                       var longitud = $("#txtLongitud").data("kendoNumericTextBox");
                                       if (data.Longitud != undefined) {
                                           _longitud.value(data.Longitud);
                                       }
                                       else {
                                           _longitud.value("");
                                       }
                                       $MensUbicacion.append("<p>Ubicación del Campo " + data.Campo + " de la tabla " + data.Tabla + "</p>");

                                       MostrarPanelUbicacion(id);
                                       if (data.Formato == "") {
                                           $("#trFormatoCampo").hide();
                                           $("#ddlTipoFormato").val(-1);
                                       } else {
                                           $("#trFormatoCampo").show();
                                           $("#tbFormatoTexto").hide();
                                           $("#tbFormatoFecha").hide();
                                           if (data.Formato == "dd/MM/yyyy" || data.Formato == "yyyyMMdd") { //formato fecha
                                               $("#ddlTipoFormato").val(2);
                                               $("#tbFormatoFecha").show();
                                               $("#ddlFormatosFecha").val(data.Formato);
                                           } else { //Formato decimal
                                               $("#ddlTipoFormato").val(1);
                                               $("#tbFormatoTexto").show();
                                               $("#txtFormatoTexto").val(data.Formato);
                                           }
                                       }
                                   }
                               }

                                , {
                                    name: "Eliminar",
                                    click: function (e) {
                                        e.preventDefault();
                                        $("#lblMsjConfirmacion").text("¿Está seguro de eliminar el registro?");
                                        $('#divMsgConfirmar').dialog({
                                            title: "¡Alerta!",
                                            modal: true,
                                            width: 330,
                                            buttons: {
                                                "Si": function () {
                                                    var tr = $(e.currentTarget).closest("tr");
                                                    var data = $("#grid").data("kendoGrid").dataItem(tr);
                                                    id = $("td:eq(0)", tr).text();
                                                    if (data.id != "") {
                                                        arrayEliminados.push(data.id);
                                                    }

                                                    var grid = $("#grid").data("kendoGrid");
                                                    var datos = grid.dataSource.at(parseInt(id - 1));
                                                    grid.dataSource.remove(datos);
                                                    $(this).dialog("close");
                                                },
                                                "Cancelar": function () {
                                                    $(this).dialog("close");
                                                }
                                            }
                                        });
                                    }
                                }
                        ]
                      }]
    });

    function MostrarPanel() {
        var dlg2 = $("#PanelCampos").dialog({
            title: 'Relación de tablas por la entidad',
            resizable: false,
            modal: true,
            width: 600,
            autoOpen: true
        }).dialog('open');

        dlg2.dialog("option", "buttons", {
            "Agregar": function () {
                Cargar_Tree_Grilla();
                $(this).dialog("close");
            },
            "Cerrar": function () {
                $(this).dialog("close");

                return true;
            }
        });
    }

    //    var $txtposicioncolu = $("#txtposicioncolu"), $txtubicacion = $("#txtubicacion"), $txtLongitud = $("#txtLongitud"),
    //                      $MensUbicacion = $("#MensUbicacion"), $txtdescripcionCampo = $("#txtdescripcionCampo");
    ////    $todos = [].add($txtposicioncolu).add($txtubicacion).add($txtLongitud).add($MensUbicacion).add($txtdescripcionCampo);



    function MostrarPanelUbicacion(id) {


        var dlg = $("#PanelCampoUbicacion").dialog({
            title: 'Ubicacion de los Campos',
            resizable: false,
            modal: true,
            width: 400,
            autoOpen: true,
            close: function () {

                _longitud.value(0);
                console.log(_longitud.value());
                $("#MensUbicacion").empty();
                $MensUbicacion.html("");
                //                dlg.dialog("close");
                return false;
            }
        }).dialog('open');
        dlg.dialog("option", "buttons", {
            "Guardar": function () {
                var grid = $("#grid").data("kendoGrid");
                var data = grid.dataSource.at(parseInt(id - 1));

                var uso = "NO";
                if ($("#chkUso").is(":checked")) {
                    uso = "SI";
                }
                //                data.set("Descripcion", $("#txtdescripcionCampo").val() != "" ? $("#txtdescripcionCampo").val() : "");
                //                data.set("Posicion", $("#txtposicioncolu").val() != "" ? $("#txtposicioncolu").val() : "");
                //                data.set("Ubicacion", $("#txtubicacion").val() != "" ? $("#txtubicacion").val() : "");
                data.set("Descripcion", $("#txtdescripcionCampo").val() != "" ? $("#txtdescripcionCampo").val() : "");
                data.set("Posicion", $("#txtposicioncolu").val() != "" ? $("#txtposicioncolu").val() : "");
                data.set("Ubicacion", $("#txtubicacion").val() != "" ? $("#txtubicacion").val() : "");
                data.set("Longitud", _longitud.value() != "" ? _longitud.value() : "");
                data.set("Uso", uso);

                var setFormato = "";
                switch ($("#ddlTipoFormato").val()) {
                    case "-1":
                        setFormato = "";
                        break;
                    case "1":
                        setFormato = $("#txtFormatoTexto").val();
                        break;
                    case "2":
                        setFormato = $("#ddlFormatosFecha").val();
                        break;
                    default:
                        setFormato = "";
                        break;
                }
                data.set("Formato", setFormato);

                $MensUbicacion.html("");


                $("#txtLongitud").attr("aria-valuenow", 0);
                _longitud.value(0);
                //console.log(_longitud.value());
                //console.log(_longitud);
                dlg.dialog("close");
                return false;

            },
            "Cerrar": function () {
                $MensUbicacion.html("");
                _longitud.value(0);
                //console.log(_longitud.value());
                dlg.dialog("close");
                return false;
            }
        });
    }


    function Cargar_Tree_Grilla() {

        $("#grid").data("kendoGrid").dataSource.data([]);

        var rootNode = $("#divTreeTablasRelacion").dynatree("getRoot");
        var nodosSeleccionados = rootNode.tree.getSelectedNodes().join(",");
        nodosSeleccionados = nodosSeleccionados.replace(/'/g, "");

        var cadena = nodosSeleccionados.split(",");
        var cad = "";

        if (cadena != "") {
            var i;
            for (i = 0; i < cadena.length; i++) {

                cad = cadena[i].replace("DynaTreeNode<", "");
                cad = cad.substring(0, cad.indexOf(">"));

                var campo;
                var tabla;
                var ubicacion;
                var idcampo;
                var accion;
                var identificador;
                var descripcion;

                if (cad.indexOf("&") != -1) {

                    var valores = cad.split("&");

                    idcampo = valores[0];
                    ubicacion = valores[1];
                    tabla = valores[2];
                    campo = valores[3];
                    accion = "UPD";
                    identificador = valores[4];
                    descripcion = valores[5];

                } else {
                    campo = cad.substring(cad.indexOf("-") + 1, cad.length);
                    tabla = cad.substring(0, cad.indexOf("-"));
                    ubicacion = 0;
                    idcampo = 0;
                    accion = "INS";
                    identificador = "";
                    descripcion = "";
                }

                var grid = $("#grid").data("kendoGrid");
                var datasource = grid.dataSource;
                var data = grid.dataSource.data();

                var validacion = cad.substring(cad.indexOf("-") + 1, cad.length);
                if (validacion == "PT") {
                } else {
                    if (validacion == "ST") {
                    } else {
                        if (validacion == "TT") {
                        } else {
                            if (validacion == "CT") {
                            } else {
                                var newrecord = {
                                    id: idcampo,
                                    Campo: campo,
                                    Tabla: tabla,
                                    Uso: "SI",
                                    Posicion: ubicacion,
                                    Accion: accion,
                                    Ubicacion: identificador,
                                    Descripcion: descripcion,
                                    Formato: ""
                                };

                                var j;
                                for (j = 0; j < arrCampos.length; j++) {
                                    if (arrCampos[j].Campo == newrecord.Campo) {
                                        newrecord.Descripcion = arrCampos[j].Descripcion;
                                        newrecord.Uso = arrCampos[j].Uso;
                                        newrecord.Posicion = arrCampos[j].Posicion;
                                        newrecord.Ubicacion = arrCampos[j].Ubicacion;
                                        newrecord.Longitud = arrCampos[j].Longitud;
                                        newrecord.Formato = "";
                                    }
                                }
                                datasource.add(newrecord);
                            }
                        }
                    }
                }

            }

        } else {
            alerta("No se ha seleccionado ningún elemento para cargar en la grilla de Campos");
        }

    }

    $("#grid").on("click", ".k-grid-custom", function () {
        accion = "Guardar";
        if ($("#hdfTabla").val() != "") {
            MostrarPanel();
            ActualizarValoresMemoria();

            if ($("#hdfAccion").val() == "INS") {
                CargarTreeTablaRelacion();
            } else {
                if ($("#hdfAccion").val() == "UPD") {
                    Cargar_Tree_Campos();
                }
            }

        } else {
            alerta("Debe Seleccionar una entidad si desea cargar campos para la Plantilla");
        }

    });

    function ActualizarValoresMemoria() {
        arrCampos = [];

        var grid = $("#grid").data("kendoGrid");
        var datasource = grid.dataSource;
        var i;
        for (i = 0; i < datasource._data.length; i++) {
            var datos = datasource._data;
            arrCampos.push({ id: datos[i].id, Campo: datos[i].Campo, Descripcion: datos[i].Descripcion, Uso: datos[i].Uso, Posicion: datos[i].Posicion,
                Ubicacion: datos[i].Ubicacion, Longitud: datos[i].Longitud
            });
        }
    }

    var arrayEliminados = [];

    function Cargar_Tree_Campos() {
        var treeData;
        $.ajax({
            type: "POST",
            url: "Mnt_Plantilla.aspx/CargarData_Tree",
            data: "{'idPlantilla': '" + $("#hdfCodigo").val().replace(/'/g, "&#39").replace(/"/g, "&#34") + "'," +
                  "'tabla': '" + $("#hdfTabla").val() + "'," +
                  "'idcliente': '" + window.parent.parent.parent.idCliente + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                treeData = result.d;
                var treeData2 = JSON.parse(treeData);
                $("#divTreeTablasRelacion").dynatree({
                    checkbox: true,
                    selectMode: 3,
                    children: treeData2,
                    cookieId: "dynatree-Cb3",
                    idPrefix: "dynatree-Cb3-",
                    fx: { height: "toggle", duration: 200 },
                    onSelect: function (select, node) {
                        if (select == false) {
                            var valor = node.data.key;
                            if (valor.indexOf("&") != -1) {
                                var datos = valor.split("&");
                                arrayEliminados.push(datos[0]);
                            }
                        }
                        node.data.select = select;
                    }
                });
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }

    function Cargar_Grilla_Campos() {
        $.ajax({
            type: "POST",
            url: "Mnt_Plantilla.aspx/Listar_Campos_x_Plantilla",
            data: "{'idPlantilla': '" + $("#hdfCodigo").val().replace(/'/g, "&#39").replace(/"/g, "&#34") + "'," +
                               "'idcliente': '" + window.parent.parent.parent.idCliente + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.d.length != 0) {
                    $("#gridCampos").show();
                    var datos = result.d;
                    var grid = $("#grid").data("kendoGrid");
                    var datasource = grid.dataSource;
                    var data = grid.dataSource.data();

                    var i;
                    for (i = 0; i < datos.length; i++) {

                        var newrecord = {
                            id: datos[i].IdCampo,
                            Campo: datos[i].NombreCampo,
                            Tabla: datos[i].Tabla,
                            Posicion: datos[i].PosicionColumna,
                            Ubicacion: datos[i].Identificador,
                            //                            Uso: "SI",
                            Uso: datos[i].Uso,
                            Accion: "UPD",
                            Descripcion: datos[i].DescripcionCampo,
                            Longitud: datos[i].LongitudCampoPlantilla,
                            Formato: datos[i].Formato
                        };
                        datasource.add(newrecord);
                    }

                } else {
                    $("#gridCampos").hide();
                    alerta("No se encontraron campo vinculados a esta Plantilla");
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }

    var BaseDatos;
    var Tabla;
    var TablaFK;
    var accion;
    //    function Agregar_Campo_Grilla() {

    //        var grid = $("#grid").data("kendoGrid");
    //        var datasource = grid.dataSource;

    //        var data = grid.dataSource.data();
    //        var dataCampo = $("#txtdescripcionCampo").val();
    //        var poscol;

    //        var CamF = "";
    //        if ($("#ddlcampoforaneo").val() != null) {
    //            CamF = $("#ddlcampoforaneo").val();
    //        } else {
    //            CamF = "";
    //        }

    //        var uso = "";
    //        if ($("#chkuso").is(':checked') == true) {
    //            uso = "SI";
    //        } else {
    //            uso = "NO";
    //        }

    //        if ($("#txtposiciocolumna").val() == "") {
    //            poscol = 0;
    //        } else {
    //            poscol = $("#txtposiciocolumna").val();
    //        }

    //        console.log("Accion:" + accion);
    //        if (accion == "Guardar") {
    //            var opcion = 0;

    //            if (data.length != 0) {
    //                for (var i = 0; i < data.length; i++) {

    //                    if (dataCampo == data[i].Campo && Tabla == data[i].Tabla && BaseDatos == data[i].BD) {
    //                        opcion = opcion + 1;
    //                    }
    //                }

    //                if (opcion == 0) {
    //                    var newrecord = {
    //                        Campo: dataCampo,
    //                        Servidor: "",
    //                        BD: BaseDatos,
    //                        Tabla: Tabla,
    //                        Longitud: $("#txtlongitud").val(),
    //                        Tipo: $("#txttipodato").val(),
    //                        Orden: $("#txtorden").val(),
    //                        SF: "",
    //                        BDF: "",
    //                        TF: TablaFK,
    //                        CF: CamF,
    //                        PK: $("#chkPK").is(':checked'),
    //                        PN: $("#chkPN").is(':checked'),
    //                        Identity: $("#chkIdentity").is(':checked'),
    //                        isValorDefecto: $("#chkdefault").is(':checked'),
    //                        ValorDefecto: $("#txtvalorDefault").val(),
    //                        Uso: uso,
    //                        Posicion: poscol,
    //                        Accion: "INS"
    //                    };
    //                    datasource.add(newrecord);
    //                } else {
    //                    alerta("Ya se agrego el campo seleccionado");
    //                }
    //            } else {
    //                var newrecord = {
    //                    Campo: dataCampo,
    //                    Servidor: "",
    //                    BD: BaseDatos,
    //                    Tabla: Tabla,
    //                    Longitud: $("#txtlongitud").val(),
    //                    Tipo: $("#txttipodato").val(),
    //                    Orden: $("#txtorden").val(),
    //                    SF: "",
    //                    BDF: "",
    //                    TF: TablaFK,
    //                    CF: CamF,
    //                    PK: $("#chkPK").is(':checked'),
    //                    PN: $("#chkPN").is(':checked'),
    //                    Identity: $("#chkIdentity").is(':checked'),
    //                    isValorDefecto: $("#chkdefault").is(':checked'),
    //                    ValorDefecto: $("#txtvalorDefault").val(),
    //                    Uso: uso,
    //                    Posicion: poscol,
    //                    Accion: "INS"
    //                };
    //                datasource.add(newrecord);
    //            }
    //        } else {
    //            if (accion == "Actualizar") {
    //                var grid = $("#grid").data("kendoGrid");
    //                var data = grid.dataSource.at(parseInt(id - 1));

    //                data.set("Servidor", "");
    //                data.set("Longitud", $("#txtlongitud").val());
    //                data.set("Tipo", $("#txttipodato").val());
    //                data.set("Orden", $("#txtorden").val());
    //                data.set("SF", "");
    //                data.set("BDF", "");
    //                //   data.set("TF", "");
    //                data.set("CF", CamF);
    //                data.set("PK", $("#chkPK").is(':checked'));
    //                data.set("PN", $("#chkPN").is(':checked'));
    //                data.set("Identity", $("#chkIdentity").is(':checked'));
    //                data.set("isValorDefecto", $("#chkdefault").is(':checked'));
    //                data.set("ValorDefecto", $("#txtvalorDefault").val());
    //                data.set("Uso", uso);
    //                data.set("Posicion", $("#txtposiciocolumna").val());
    //                $("#PanelCampos").dialog("close");
    //            }
    //        }
    //        Limpiar_Campos();
    //    };

    $("#ddlTipoFormato").change(function () {
        if ($(this).val() == "-1") {
            $("#trFormatoCampo").hide();
        } else {
            $("#trFormatoCampo").show();
            $("#tbFormatoTexto").hide();
            $("#tbFormatoFecha").hide();
            if ($(this).val() == "1") {
                $("#tbFormatoTexto").show();
            } else if ($(this).val() == "2") {
                $("#tbFormatoFecha").show();
            }
        }
    });
});

function resetRowNumber(e) {
    rowNumber = 0;
}

function renderNumber(data) {
    return ++rowNumber;
}

function fnMostrarDatos(valor) {
    $("#hdfTecnicoResponsable").val(valor);
}