$(function () {
    var timeoutHnd;
    function SeleccionoModelo(id) {

    }

    var modeloModeloDispositivo = [
                 { name: 'P_inCod', index: 'P_inCod', label: 'IdModeloDispositivo', hidden: true, width: 70, align: 'left' },
                 { name: 'vcNom', index: 'vcNom', label: 'Modelo', hidden: false, key: true, width: 250, align: 'left' },
                 { name: 'vcNomTipSer', index: 'vcNomTipSer', label: 'Tipo de Servicio', hidden: false, key: true, width: 200, align: 'left' }
   	            ];

    var tbModelo = JQGrid("#tblSeleccionModelo", "", "local", modeloModeloDispositivo, 550, 365, "rowId", true, null, SeleccionoModelo);
    //            tbModelo.jqGrid('filterToolbar', { searchOperators: false });

    CargarModelosPorCampana();

    function CargarModelosPorCampana() {
        var Metodo = "Adm_ModeloDispositivoSeleccion.aspx/ListaModeloDispositoPorCampana";
        var Data = {
            IdCampana: $("#hdfCampana").val(),
            Nombre: $("#txtNombre").val(),
            IdTipoServicio: $("#ddlTipoServicio").val()
        };
        MetodoWeb(Metodo, JSON.stringify(Data), SatisfactoriaCargarModeloDispositivo, null);
    }
    function SatisfactoriaCargarModeloDispositivo(lstModeloDispositivo) {
        $("#tblSeleccionModelo").jqGrid('clearGridData');
        var i = 0;
        for (i = 0; i < $(lstModeloDispositivo).length; i++) {
            $("#tblSeleccionModelo").jqGrid('addRowData', lstModeloDispositivo[i].P_inCod, lstModeloDispositivo[i]);
        }
    }

    $("#btnAgregarSeleccion").click(function () {
        var lstModeloDisposito = new Array();
        var lstIdModeloDisposito = tbModelo.jqGrid('getGridParam', 'selarrrow').toString().split(',');

        for (i = 0; i < $(lstIdModeloDisposito).length; i++) {
            lstModeloDisposito.push(tbModelo.jqGrid('getRowData', lstIdModeloDisposito[i]));
        }

        window.parent.CargarModeloDispositivo(lstModeloDisposito);
    });

    $("#btnCerrar").click(function () {
        window.parent.CerrarDialogo();
    });


    $("#txtNombre").keyup(function () {
        if (timeoutHnd) {
            clearTimeout(timeoutHnd);
        }
        timeoutHnd = setTimeout(CargarModelosPorCampana, 500);
    });

    $("#ddlTipoServicio").change(function () {
        CargarModelosPorCampana();
    });
});

