
$(function () {
    $(".lblLink").css("cursor", "pointer");
    $("#imgFondo").css({ 'opacity': 0.1 });


    $(".PanelBarraNavegacion").live("mousemove", function () {
        $(this).addClass('ui-state-highlight quitarBorde');
    });
    $(".PanelBarraNavegacion").live("mouseout", function () {
        $(this).removeClass('ui-state-highlight quitarBorde');
    });

    $(".PanelBarraNavegacionItemSeleccion").live("click", function () {
        pagina = $(this).attr("url");
        var EventoClick = $(this).attr("Click");
        eval(EventoClick)();
    });

    function AbrirTab(tab, descripcion, pagina) {
        var tab1 = window.parent.tabschild[window.parent.tabPrincipal.tabs("option", "selected")].id;

        var Accord = window.parent.$("#" + tab1);

        var Id = "#" + tab;
        var $panel = Accord.find(Id);
        if (!$panel.length) {//En el caso que no exista el tab, lo crea
            var Titulo = descripcion;
            window.parent.pagina = pagina;
            Accord.tabs("add", Id, Titulo);
            window.parent.$(Id).css("width", "99%");
            window.parent.$(Id).css("height", "94%");
            window.parent.$(Id).css("margin-top", "0px");
            window.parent.$(Id).css("margin-left", "0px");
            window.parent.$(Id).css("margin-bottom", "0px");
            window.parent.$(Id).css("margin-right", "0px");
            window.parent.$(Id).css("padding-top", "0px");
            window.parent.$(Id).css("padding-left", "0px");
            window.parent.$(Id).css("padding-bottom", "0px");
            window.parent.$(Id).css("padding-right", "0px");
        }
        else { //En el caso que exista lo muestra
            Accord.tabs('select', Id);
        }
    }

    $("#lblNuevaProgramacion").click(function () {
        AbrirTab("Proceso", "Proceso", "P_Movil/Administrar/Imp_ProcesoPrincipal.aspx?inCod=23&inTip=3&inTipOri=1&inAcc=1");
    });

    $("#lblVerSolicitud").click(function () {
        AbrirTab("Administrar_Solicitudes", "Administrar Solicitudes", "P_Movil/Administrar/Adm_AdministradorSolicitudes.aspx?inCod=17&inTip=3&inTipOri=1&inAcc=1");
    });

    $("#lblVerConsulta").click(function () {
        AbrirTab("Consultas", "Consultas", "P_Movil/Consultar/Con_ConsultaPrincipal.aspx?inCod=9&inTip=2&inTipOri=1&inAcc=1");
    });


    $(".CampoEstadoSolicitud").live("mousemove", function () {
        $(this).removeClass('ui-accordion-header ui-helper-reset ui-state-default ui-corner-all');
        $(this).addClass('ui-accordion-header ui-helper-reset ui-state-hover ui-corner-all');
        var Mensaje = "";

        switch ($(this).attr("id")) {
            case "tdCambio":
                Mensaje = "Mensaje para Cambio...";
                break;
            case "tdNuevos":
                Mensaje = "Mensaje para Nuevos...";
                break;
            case "tdPerdida":
                Mensaje = "Mensaje para Perdida...";
                break;
            case "tdReposicion":
                Mensaje = "Mensaje para Reposicion...";
                break;
            case "tdReparacion":
                Mensaje = "Mensaje para Reparacion...";
                break;
        }
        $("#lblMensajeSolicitud").html(Mensaje);

    });
    $(".CampoEstadoSolicitud").live("mouseout", function () {
        $(this).removeClass('ui-accordion-header ui-helper-reset ui-state-hover ui-corner-all');
        $(this).addClass('ui-accordion-header ui-helper-reset ui-state-default ui-corner-all');
        $("#lblMensajeSolicitud").html('Seleccione alguna solicitud...');
    });
    $(".CampoEstadoSolicitud").addClass('ui-accordion-header ui-helper-reset ui-state-default ui-corner-all');
    $(".CampoEstadoSolicitud").css({ "cursor": "hand", "cursor": "pointer" });

    $(".ImagenEstadoSolicitud").css({ "height": "35px" });
    $("#lblMensajeSolicitud").html('Seleccione alguna solicitud...');


    $(".cabeceraSubTitulo").removeClass('ui-accordion-header ui-helper-reset ui-state-default ui-corner-all');
    $(".cabeceraSubTitulo").addClass('ui-accordion-header ui-helper-reset ui-state-hover ui-corner-all');
    $(".cabeceraSubTitulo").css({ "color": "#222222", "font-size": "12px", "padding-left": "10px" });

    $("#ddlPeriodo").css({ "font-size": "10px" });

    FusionCharts.setCurrentRenderer('javascript');
    /// <reference path="" />

    CargarHistorico();
    CargarServicios();
    CargarTopAreas();
    CargarTopEmpleado();


    $("#tblCampo").jqGrid({
        datatype: "local",
        colModel: [
   		          { name: 'P_inCod', index: 'P_inCod', label: 'Codigo', width: 60, hidden: true },
                { name: 'F_inCodEnt', index: 'F_inCodEnt', label: 'Codigo Entidad', width: 60, hidden: true },
   		          { name: 'inOrd', index: 'inOrd', label: 'Servicio', width: 5 },
                { name: 'vcNom', index: 'vcNom', label: 'Llamadas', width: 2 },
                { name: 'vcNom', index: 'vcNom', label: 'Duracion', width: 2 },
                { name: 'vcNom', index: 'vcNom', label: 'Costo', width: 2 }

   	          ],
        sortname: "P_inCod", //Default SortColumn
        sortorder: "asc", //Default SortOrder.
        width: "300",
        height: "100",
        rownumbers: false,
        ondblClickRow: function (id) { $("#btnModificar").click(); }
    });
    $("#tblCampo").jqGrid('bindKeys', { "onEnter": function (id) { $("#btnModificar").click(); }, "onSpace": function (id) { $("#btnModificar").click(); } });

    //window.parent.$("body").css({"overflow-y": "hidden"});
});



function CargarHistorico() {
    //var datos = $("#tbTicketsAnio").jqGrid('getRowData', id);

    var cadenaJson2 = '{      "chart": {"bgAlpha": "0,0","bgcolor": "FFFFFF",          "outcnvbasefontcolor": "666666",          "caption": "Histórico de Consumo",          "xaxisname": "Mes",          "yaxisname": "Monto",          "numberprefix": "' + $("#hdfTipoMoneda").val() + '",          "showlabels": "1",          "showvalues": "0",          "plotfillalpha": "70",          "numvdivlines": "10",          "showalternatevgridcolor": "1",          "alternatevgridcolor": "e1f5ff",          "divlinecolor": "999999",          "basefontcolor": "666666",          "canvasborderthickness": "1",          "showplotborder": "0",          "plotborderthickness": "0",          "zgapplot": "0",          "zdepth": "120",          "exetime": "1.2",          "dynamicshading": "1",          "yzwalldepth": "5",          "zxwalldepth": "5",          "xywalldepth": "5",          "canvasbgcolor": "FBFBFB",          "startangx": "0",          "startangy": "0",          "endangx": "5",          "endangy": "-25",          "divlineeffect": "bevel"      },      "categories": [          {              "category": [                  {                      "label": "Ene"                  },                  {                      "label": "Feb"                  },                  {                      "label": "Mar"                  },                  {                      "label": "Abr"                  },                  {                      "label": "May"                  },                  {                      "label": "Jun"                  },                  {                      "label": "Jul"                  },                  {                      "label": "Ago"                  },                  {                      "label": "Set"                  },                  {                      "label": "Oct"                  },                  {                      "label": "Nov"                  },                  {                      "label": "Dic"                  }              ]          }      ],      "dataset": [          {              "seriesname": "2005",              "color": "B1D1DC",              "plotbordercolor": "B1D1DC",              "renderas": "line",              "data": [                  {                      "value": "27400"                  },                  {                      "value": "29800"                  },                  {                      "value": "25800"                  },                  {                      "value": "26800"                  },                  {                      "value": "29600"                  },                  {                      "value": "32600"                  },                  {                      "value": "31800"                  },                  {                      "value": "36700"                  },                  {                      "value": "29700"                  },                  {                      "value": "31900"                  },                  {                      "value": "32900"                  },                  {                      "value": "34800"                  }              ]          },          {              "seriesname": "2006",              "color": "C8A1D1",              "plotbordercolor": "C8A1D1",              "renderas": "line",              "data": [                  {},                  {},                  {                      "value": "4500"                  },                  {                      "value": "6500"                  },                  {                      "value": "7600"                  },                  {                      "value": "6800"                  },                  {                      "value": "11800"                  },                  {                      "value": "19700"                  },                  {                      "value": "21700"                  },                  {                      "value": "21900"                  },                  {                      "value": "22900"                  },                  {                      "value": "29800"                  }              ]          }      ],      "styles": {          "definition": [              {                  "name": "captionFont",                  "type": "font",                  "size": "15"              }          ],          "application": [              {                  "toobject": "caption",                  "styles": "captionfont"              }          ]      }  }';


    var cadenaJson = '{"chart": {"animation": "1","bgAlpha":"0,0", "canvasBgAlpha":"0","legendBgAlpha":"0","caption" : "Histórico ';  //" ,"xAxisName" : "Años","yAxisName" : "Costos","numberPrefix" : "S/."},"data" :['

    var filas = [];
    /*
    for (var key in datos) {
    //alert(' name=' + key + ' value=' + datos[key]);
    if (key != 'CODIGO') {
    if (key != 'DESCRIPCION') {
    filas.push('{ "label" : "' + key + '", "value" : "' + datos[key] + '" }')
    }
    else {
    cadenaJson = cadenaJson + datos[key] + ' " ,"xAxisName" : "Años","yAxisName" : "Costos","numberPrefix" : "S/."},"data" :['
    }
    }
    }
    */

    filas.push('{ "label" : "Ene2013", "value" : "100" }');
    filas.push('{ "label" : "Feb 2013", "value" : "30" }');
    filas.push('{ "label" : "Mar 2013", "value" : "80" }');
    filas.push('{ "label" : "Abr 2013", "value" : "90" }');
    filas.push('{ "label" : "May 2013", "value" : "70" }');
    filas.push('{ "label" : "Jun 2013", "value" : "60" }');
    filas.push('{ "label" : "Jul 2013", "value" : "80" }');
    filas.push('{ "label" : "Ago 2013", "value" : "30" }');
    filas.push('{ "label" : "Set 2013", "value" : "50" }');
    filas.push('{ "label" : "Oct 2013", "value" : "60" }');
    filas.push('{ "label" : "Nov 2013", "value" : "10" }');
    filas.push('{ "label" : "Dic 2013", "value" : "80" }');


    //"bgAlpha", "0,0"
    cadenaJson = cadenaJson + ' " ,"xAxisName" : "Periodo","yAxisName" : "Costos","numberPrefix" : "' + $("#hdfTipoMoneda").val() + '"},"data" :[';

    cadenaJson = cadenaJson + filas.join(",") + "]}";
    var myChart = new FusionCharts("../Common/Scripts/FusionCharts/MSCombi3D.swf", "fschartHistorico", "520", "300", "0");
    myChart.setJSONData(cadenaJson2);
    myChart.setTransparent(true);
    myChart.render("chartHistorico");

    $("#chartHistorico").addClass('ui-corner-all');    

}

function CargarServicios() {
    var cadenaJson = '{"chart": {"pieSliceDepth":"5" , "startingAngle":"360", "animation": "1", "showlegend": "1","showlabels": "0", ';
    cadenaJson = cadenaJson + '"xAxisName" : "Años","yAxisName" : "Costos","numberPrefix" : "' + $("#hdfTipoMoneda").val() + '","bgAlpha": "0,0"},"data" :[';
    var filas = [];
    filas.push('{ "label" : "LOC", "value" : "100" }');
    filas.push('{ "label" : "CEL", "value" : "100" }');
    filas.push('{ "label" : "DDN", "value" : "100" }');
    filas.push('{ "label" : "DDI", "value" : "100" }');
    filas.push('{ "label" : "OTRO", "value" : "100" }');

    cadenaJson = cadenaJson + filas.join(",") + "]}";

    //var myChart = new FusionCharts("../Common/Scripts/FusionCharts/Doughnut3D.swf", "fschartServicios", "300", "300", "0");
    var myChart = new FusionCharts("../Common/Scripts/FusionCharts/Pie3D.swf", "fschartServicios", "300", "200", "0");
    
    myChart.setJSONData(cadenaJson);
    myChart.setTransparent(true);
    myChart.render("chartServicios");

}

function CargarTopAreas() {
    var cadenaJson = '{';
    cadenaJson = cadenaJson + ' "chart": {';
    cadenaJson = cadenaJson + '             "palette": "2","caption": "Top Ten por Areas","showlabels": "1","showvalues": "0","decimals": "0","numberprefix": "' + $("#hdfTipoMoneda").val() + '","bgAlpha": "0,0"';
    cadenaJson = cadenaJson + ' },';
    cadenaJson = cadenaJson + ' "categories": [{"category": [{"label": "Contabilidad"},{"label": "Administración"},{"label": "Sistemas"},{"label": "Ventas"},{"label": "Operaciones"}]}],';
    //cadenaJson = cadenaJson + ' "data": [{"label" : "LOC3s","value": "25601.34"},{"label" : "LO4C","value": "20148.82"},{"label" : "LOC5","value": "17372.76"},{"label" : "LOC6","value": "35407.15"},{"label" : "LOC7","value": "38105.68"}]';
    cadenaJson = cadenaJson + ' "dataset": [';
    cadenaJson = cadenaJson + '     {';
    cadenaJson = cadenaJson + '         "seriesname": "1996","showvalues": "0",';
    cadenaJson = cadenaJson + '         "data": [{"value": "38105.68","color": "00F0FF"},{"value": "35407.15","color": "FFFF00"},{"value": "25601.34","color": "FF0000"},{"value": "20148.82","color": "00FF00"},{"value": "17372.76","color": "AABBFF"}]';
    cadenaJson = cadenaJson + '     }';
    cadenaJson = cadenaJson + ' ]';
    cadenaJson = cadenaJson + '}';

    var myChart = new FusionCharts("../Common/Scripts/FusionCharts/MSBar3D.swf", "fschartTopArea", "300", "200", "0");

    myChart.setJSONData(cadenaJson);
    myChart.setTransparent(true);
    myChart.render("chartTopArea");

}

function CargarTopEmpleado() {
    var cadenaJson = '{';
    cadenaJson = cadenaJson + ' "chart": {';
    cadenaJson = cadenaJson + '             "palette": "2","caption": "Top Ten por Empleados","showlabels": "1","showvalues": "0","decimals": "0","numberprefix": "' + $("#hdfTipoMoneda").val() + '","bgAlpha": "0,0"';
    cadenaJson = cadenaJson + ' },';
    cadenaJson = cadenaJson + ' "categories": [{"category": [{"label": "Contabilidad"},{"label": "Administración"},{"label": "Sistemas"},{"label": "Ventas"},{"label": "Operaciones"}]}],';
    //cadenaJson = cadenaJson + ' "data": [{"label" : "LOC3s","value": "25601.34"},{"label" : "LO4C","value": "20148.82"},{"label" : "LOC5","value": "17372.76"},{"label" : "LOC6","value": "35407.15"},{"label" : "LOC7","value": "38105.68"}]';
    cadenaJson = cadenaJson + ' "dataset": [';
    cadenaJson = cadenaJson + '     {';
    cadenaJson = cadenaJson + '         "seriesname": "1996","showvalues": "0",';
    cadenaJson = cadenaJson + '         "data": [{"value": "38105.68","color": "00F0FF"},{"value": "35407.15","color": "FFFF00"},{"value": "25601.34","color": "FF0000"},{"value": "20148.82","color": "00FF00"},{"value": "17372.76","color": "AABBFF"}]';
    cadenaJson = cadenaJson + '     }';
    cadenaJson = cadenaJson + ' ]';
    cadenaJson = cadenaJson + '}';

    var myChart = new FusionCharts("../Common/Scripts/FusionCharts/MSBar3D.swf", "fschartTopEmpleado", "300", "200", "0");

    myChart.setJSONData(cadenaJson);
    myChart.setTransparent(true);
    myChart.render("chartTopEmpleado");

}
