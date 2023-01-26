function servicio(P_inCod, vcNom, dcCan, dcMon, vcNomRef) {
    this.P_inCod = P_inCod;
    this.vcNom = vcNom;
    this.dcCan = dcCan;
    this.dcMon = dcMon;
    this.vcNomRef = vcNomRef;
}
$(function () {
    //----------------------------------Esta runtina se obtendra del servidor------------------------------------------------------------------------                
    var Mensaje; //Este objeto vendra del servidor con el idioma usado, sera por pagina

    function mensaje(inCod, vcNom) {
        this.inCod = inCod;
        this.vcNom = vcNom;
    }

    inicioMensaje();

    function inicioMensaje() {
        Mensaje = [];
        Mensaje.push(new mensaje(1, 'No hay registros para los criterios seleccionados'));
        Mensaje.push(new mensaje(2, 'Ingrese el periodo a consultar'));
    }
    //----------------------------------------------------------------------------------------------------------------------------------------------

    $(".btnNormal").button();

    $(".DATETIME").AnyTime_picker({ format: "%m/%Y",
        labelTitle: "Periodo",
        labelHour: "Hora",
        labelMinute: "Minuto",
        labelSecond: "Segundo",
        labelYear: "Año",
        labelMonth: "Mes",
        labelDayOfMonth: "Dia",
        monthAbbreviations: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        dayAbbreviations: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado']
    });

    $("#tblResumen").jqGrid({
        datatype: "local",
        colModel: [
   		            { name: 'P_inCod', index: 'P_inCod', label: 'Codigo', width: 60, hidden: true },
   		            { name: 'vcNom', index: 'vcNom', label: 'Servicio', width: 200 },
   		            { name: 'dcMon', index: 'dcMon', label: 'Monto', width: 130, align: "right", sorttype: "float" }
   	    ],
        sortname: "P_inCod", //Default SortColumn
        sortorder: "asc", //Default SortOrder.
        width: "350",
        height: "161",
        rownumbers: true,
        caption: "Servicios",
        multiselect: true,
        ondblClickRow: function (id) { }
    });

    $("#tblResumen").jqGrid('bindKeys', { "onEnter": function (id) { }, "onSpace": function (id) { } });

    $("#btnConsultar").click(function () {
        if ($("#txtPeriodo").val() != "") {
            $.ajax({
                type: "POST",
                url: "Adm_FacturaResumen.aspx/ListarServicio",
                data: "{'inOpe': '" + window.parent.$("#ddlOperador").val() + "'," +
                       "'vcLin': '" + window.parent.Lineas + "'," +
                       "'vcPer': '" + $("#txtPeriodo").val() + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    Servicios = result.d;
                    if (Servicios.length > 0) {
                        $("#tblResumen").jqGrid('clearGridData');
                        var i = 0;
                        for (i = 0; i < Servicios.length; i++) {
                            $("#tblResumen").jqGrid('addRowData', Servicios[i].P_inCod, Servicios[i]);
                        }
                    }
                    else {
                        $("#tblResumen").jqGrid('clearGridData');
                        alert(Mensaje[0].vcNom);
                    }
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        }
        else {
            alert(Mensaje[1].vcNom);
            $("#txtPeriodo").focus();
        }
    });

    $("#btnAgregar").click(function () {
        var Filas = $("#tblResumen").getGridParam("data");
        var ids = $("#tblResumen").jqGrid('getGridParam', 'selarrrow');

        $(Filas).each(function () {
            var fila = this;
            var Servicio = new servicio();
            var Elegido = false;

            $(ids).each(function () {
                if (this == fila.id) {
                    Elegido = true;
                    return false;
                }
            });

            if (Elegido) {
                Servicio.P_inCod = "-1"; //fila.P_inCod;
                Servicio.dcCan = 1;
                Servicio.vcNomRef = fila.vcNom;
                Servicio.dcMon = fila.dcMon;

                window.parent.IngresarServicio(Servicio);
            }
        });
        window.parent.dialogo.dialog("close");
    });

    $("#btnCerrar").click(function () {
        window.parent.dialogo.dialog("close");
    });
});