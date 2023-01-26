
$(function () {

    $(".btnNormal").button();


    //---------Modal Multisucursal--------------------


    var tbSucursales = $("#gridsucursal").jqGrid({
        sortable: true,
        datatype: "local",
        colModel: [
                       { name: 'codsuc', index: 'codsuc', label: 'Cod. Sucursal', hidden: true, width: 60, align: 'center', sortable: true },
                       { name: 'sucursal', index: 'sucursal', label: 'Sucursal', hidden: false, width: 280, align: 'left', sortable: true },
                       { name: 'codfac', index: 'codfac', label: 'Cod. Facilidad', hidden: true, width: 60, align: 'left', sortable: true },
                        { name: 'facilidad', index: 'facilidad', label: 'Facilidad', hidden: false, width: 200, align: 'left', sortable: true },

   	                  ],
        ondblClickRow: function (id) {

        },
        //pagination: true,
        rowNum: 100,
        viewrecords: true,
        loadtext: 'Cargando datos...',
        recordtext: "{0} - {1} de {2} ",
        emptyrecords: 'No hay resultados',
        sortname: "codsuc", //sortname: idTabla, //Default SortColumn
        sortorder: "asc", //Default SortOrder.
        rownumbers: true,
        shrinkToFit: false,
        width: 550,
        height: 130
        //caption: "Servidores"

    }).navGrid("#pager", { edit: false, add: false, search: false, del: false });


    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "Sin_Sucursales.aspx/CargarDetalleSucursales",
        data: "{}",
        dataType: "json",
        success: function (result) {
            var lsdetallesucu = result.d;


            for (var i = 0; i < lsdetallesucu.length; i++) {
                var datarow = { codsuc: lsdetallesucu[i].codsuc, sucursal: lsdetallesucu[i].sucursal, codfac: lsdetallesucu[i].codfac, facilidad: lsdetallesucu[i].facilidad };
                $("#gridsucursal").jqGrid('addRowData', lsdetallesucu[i].codsuc, datarow);
            }


            $("#gridsucursal").trigger("reloadGrid");
        },
        error: function (result) {
            alert("Error");
        }
    });
    /////////////////////////////////////////////////




    $('#ddlsucursal2').change(function () {


        $('#ddlfacilidad2').html('');

        var codsucursal2 = $('#ddlsucursal2').val();

        if (codsucursal2 != "0") {
            $.ajax({
                type: "POST",
                url: "Sin_Configura.aspx/GetFacilidades",
                data: "{'codigo': '" + codsucursal2 + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    for (var i = 0; i < result.d.length; i++) {
                        $("#ddlfacilidad2").append($("<option></option>").attr("value", result.d[i].Value).text(result.d[i].Display));
                    }

                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        }
    });


    $('#ddlsucursal2').change();



    $('#btnAgregar').click(function () {


        var codsucursal2 = $('#ddlsucursal2').val();
        var nomsuc = $("#ddlsucursal2 option:selected").text();
        var codfac = $('#ddlfacilidad2').val();
        var nomfac = $("#ddlfacilidad2 option:selected").text();




        if (codsucursal2 == "" || nomfac == "") {
            return;
        }

        var datos = $('#gridsucursal').jqGrid('getGridParam', 'data');

        for (var i = 0; i < datos.length; i++) {

            if (datos[i].codsuc == codsucursal2) {
                alert("La Sucursal seleccionada ya se encuentra agregada.");
                return;
            }
        }

        var datarow = { codsuc: codsucursal2, sucursal: nomsuc, codfac: codfac, facilidad: nomfac };

        $("#gridsucursal").jqGrid('addRowData', codsucursal2, datarow);
        $("#gridsucursal").trigger("reloadGrid");
    });


    $('#btnQuitar').click(function () {
        var id = $("#gridsucursal").jqGrid('getGridParam', 'selrow');
        $('#gridsucursal').jqGrid('delRowData', id);
        $("#gridsucursal").trigger("reloadGrid");
    });


    $("#btnCerrar").click(function () {
        window.parent.$("#dvSucursales").dialog("close");
    });

    $("#btnGuardar").click(function () {

        //Agregado para Empleados por Anexo
        //Agregado para Empleados por Anexo
        var dtSucursales = $('#gridsucursal').jqGrid('getGridParam', 'data');
        var XML_Sucursales = "<?xml version=\"1.0\" encoding=\"iso-8859-1\"?><TABLE>";


        if (dtSucursales.length < 1) {
            alert("No hay datos para guardar.");
            return;
        }

        for (var i = 0; i < dtSucursales.length; i++) {

            var vcTabla = 'Anexo';
            var vcTipo = 'Facilidad';
            var vcCondicion = dtSucursales[i].codsuc;
            var vcValor = dtSucursales[i].codfac;

            if (vcCondicion == "" || vcValor == "") {
                continue;
            }


            XML_Sucursales += "<DATA SINDE_TABLA=\"" + vcTabla + "\" SINDE_TIPO=\"" + vcTipo + "\" SINDE_CONDICION=\"" + vcCondicion + "\" SINDE_VALOR=\"" + vcValor + "\"/>";
        }

        XML_Sucursales += "</TABLE>";



        $.ajax({
            type: "POST",
            url: "Sin_Sucursales.aspx/Guardar",
            data: "{'XML_Sucursales': '" + XML_Sucursales + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.d == 0) {
                    Mensaje("<br/><h1>Datos Grabados</h1><br/>", document, CerroMensaje);
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

    function CerroMensaje() {
        //window.parent.$("#dvSucursales").dialog("close");
    }

});

