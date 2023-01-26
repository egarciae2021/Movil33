var oCulturaUsuario;
var inFilas;
var nuAltoFila = 23.04;
var ArrayPaginacion = [];
var IdModelo = 0;

$(function () {
    oCulturaUsuario = window.parent.parent.parent.oCulturaUsuario;

    Init();

    $(window).resize(function () {
        DimPosElementos();
    });

    function Init() {
        fnCargarDatos();
    }


    NumeroInicialFilas();

})
function DimPosElementos() {
    var Ancho = $(window).width();
    var Alto = $(window).height();
    $("#tbDispositivo").setGridWidth($(window).width() - 60);
    $("#tbDispositivo").setGridHeight($(window).height() - 130);
    RecalcularColumnasGrilla("tbDispositivo", false);
    NumeroInicialFilasResize();
}
function NumeroInicialFilas() {
    ArrayPaginacion = [];
    inFilas = Math.floor(($(window).height() - 200) / nuAltoFila);

    ArrayPaginacion.push(inFilas);
    ArrayPaginacion.push(inFilas + inFilas);
    ArrayPaginacion.push(inFilas + inFilas + inFilas);
}

function NumeroInicialFilasResize() {
    inFilas = Math.floor(($(window).height() - 320) / nuAltoFila);
    inFilas = inFilas - 1;
    ActualizarPageSizeGrillasTab("tbDispositivo", inFilas);

}

function fnCargarDatos() {
    var columnas = [
                {
                    name: 'LINEA', label: 'Linea', index: 'LINEA', width: 60, hidden: false, align: "center"
                },
                { name: 'IMEI', label: 'IMEI', index: 'IMEI', width: 100, hidden: false, align: "center", key: true },
                {
                    name: 'EMPLEADO', label: 'Empleado', index: 'EMPLEADO', width: 120, hidden: false, align: "left"
                },
                {
                    name: 'ADMINISTRADO', label: 'Administrado?', index: 'ADMINISTRADO', width: 100, hidden: false, align: "center"
                }
                //},
                //{ name: 'EstadoDispositivo', label: 'Estado Dispositivo', index: 'EstadoDispositivo', width: 60, hidden: false, align: "left" },
                ,
                { name: 'FECSINCRONIZA', label: 'Ult. Sincronización', index: 'FECSINCRONIZA', hidden: false, align: "center", width: 100 },
                { name: 'DIFSINCRONIZA', label: 'Tiempo Transc.', index: 'DIFSINCRONIZA', hidden: false, align: "center", width: 100 },
                { name: 'SEMAFORO', label: 'Semáforo', index: 'SEMAFORO', hidden: false, align: "center", width: 60 },

    ];
    //debugger;
    var IdModelo = $("#hdfIdModelo").val();
    var vcTecnico = $("#hdfvcTecnico").val();
    $.ajax({
        type: "POST",
        url: "MDM_DispositivoVista.aspx/ListarDispositivos",
        data: "{'inIdModelo': '" + IdModelo + "', 'invcTecnico': '" + vcTecnico + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function (result) {
            //debugger;
            if ($(result.d).length > 0) {
                var resul = result.d;
                if (resul[0] == "1") {
                    Mensaje("<br/><h1>No existe registros en los parámetros seleccionados.</h1>", document, null);
                    //                $("#dvGrupoCuenta").hide();
                    //                $("#dvPanel").hide();
                    $("#dvDispositivoVista").hide();
                } else {
                    $("#dvDispositivoVista").show();
                    var datos = JSON.parse(resul[1]);
                    //debugger;
                    for (var i = 0; i < datos.length; i++) {
                        //if (datos[i].SEMAFORO == "VERDE") { datos[i].SEMAFORO = '<label value="A VERDE"><span class="fa fa-circle" style="font-size: 30px; color: #33FF3F"></span></label>'; }
                        //else if (datos[i].SEMAFORO == "AMARILLO") { datos[i].SEMAFORO = '<label value="B AMARILLO"><span class="fa fa-circle" style="font-size: 30px; color: #FFF933"></span></label>'; }
                        //else if (datos[i].SEMAFORO == "NARANJA") { datos[i].SEMAFORO = '<label value="C NARANJA"><span class="fa fa-circle" style="font-size: 30px; color: #FE9A00"></span></label>'; }
                        //else if (datos[i].SEMAFORO == "ROJO") { datos[i].SEMAFORO = '<label value="D ROJO"><span class="fa fa-circle" style="font-size: 30px; color: #FE2E00"></span></label>'; }
                        if (datos[i].SEMAFORO == "VERDE") { datos[i].SEMAFORO = '<span class="fa fa-circle" style="font-size: 30px; color: #33FF3F"></span>'; }
                        else if (datos[i].SEMAFORO == "AMARILLO") { datos[i].SEMAFORO = '<span class="fa fa-circle" style="font-size: 30px; color: #FFF933"></span>'; }
                        else if (datos[i].SEMAFORO == "NARANJA") { datos[i].SEMAFORO = '<span class="fa fa-circle" style="font-size: 30px; color: #FE9A00"></span>'; }
                        else if (datos[i].SEMAFORO == "ROJO") { datos[i].SEMAFORO = '<span class="fa fa-circle" style="font-size: 30px; color: #FE2E00"></span>'; }
                        
                    }
                }

                tbGrupoCuenta = $("#tbDispositivo").jqGrid({
                    datatype: "local",
                    colModel: columnas,
                    data: datos,
                    sortname: "IdDispositivo",
                    sortorder: "asc",
                    width: $(window).width() - 60,
                    height: $(window).height() - 130,
                    loadtext: 'Cargando datos...',
                    recordtext: "{0} - {1} de {2} elementos",
                    emptyrecords: 'No hay resultados',
                    pgtext: 'Pág: {0} de {1}',
                    rownumbers: true,
                    //gridview: true,
                    //rowNum: 10000,
                    rowList: [10, 20, 50, 100],
                    rowNum: inFilas,
                    shrinkToFit: true,
                    viewrecords: true,
                    hidegrid: false,
                    sortable: true,
                   // caption: "",
                    pager: "#PaginadorDispositivo"
                }).navGrid("#PaginadorDispositivo", { edit: false, add: false, search: false, del: false });
            } else {
                Mensaje("<br/><h1>No existe registros en los parámetros seleccionados.</h1>", document, null);
                //                $("#dvGrupoCuenta").hide();
                //                $("#dvPanel").hide();
                $("#dvDispositivoVista").hide();
            }

        }, // ==============================================================================================================================
        error: function (xhr, err, thrErr) {
            // ==============================================================================================================================
            MostrarErrorAjax(xhr, err, thrErr);
            // ==============================================================================================================================
        }
    });
}