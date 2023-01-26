function getGraficoCosto() {
    var NumDecimales = txt_numdecimales.GetText();
    var SimDec = txt_SimDec.GetText();
    var SepMil = txt_SepMil.GetText();
    var options = {
        chart: {
            renderTo: 'grafico_costo',
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
            spacingBottom: 40,
            spacingLeft: 0,
            width: 500
        },
        credits: {
            enabled: false
        },
    exporting: {
        enabled: false
  },

        title: {
            text: 'Servicios - ' + txt_empresa.GetText(),
            style: {
                        font: "normal 12px Verdana",
                        color: '#4572A7'
                    }
        },
        labels: {
            items: [{
                html: 'Costo Total: ' + txt_costototal.GetText(),
                style: {
                    left: '180px',
                    top: '285px',
                    fontSize: '11px',
                    width: '200px',
                    height: '15px',
                    color: '#000000',
                    fontWeight: 'bold'
                }
            }]
        },
        tooltip: {
            formatter: function () {
                return '<b>' + this.point.name + '</b>: ' + Highcharts.numberFormat(this.y, NumDecimales, SimDec, SepMil);
            }  
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                color: '#000000',
                formatter: function () {
                    return '<b>' + this.point.name + '</b>: ' + Highcharts.numberFormat(this.percentage.toFixed(NumDecimales), NumDecimales, SimDec, SepMil) + ' %';
                }
            },
            showInLegend: true
        }
    },
    legend: {
        labelFormatter: function () {
            return '<b>' + this.name + '</b>[' + Highcharts.numberFormat(this.y, NumDecimales, SimDec, SepMil) + ']';
        },
        layout: 'horizontal',
        style: {
            font: "normal 22px Verdana",
            color: '#4572A7'
        },
        itemStyle: {
            fontSize: '10px'
        }
    },
    series: [{
        type: 'pie'
    }]
};

$("#div_ajax2").html('<img src="~/../images/loader.gif">Generando Gráfico...');

$.ajax({
  type: "POST",
  dataType: "json",
  data: "{'sp':'SP_GET_COSTO_X_ORGANIZACION_RAD','codigo':'" + txt_codigo.GetText() + "','argumento':'COSTO','tabla':'" + txt_tabla.GetText() + "', 'telefonia': '" + txt_telefonia.GetText() + "'}",
  contentType: "application/json; charset=utf-8",
  url: "resumen_datos.aspx/getDatos",
  success: function (items) {
    
    var obj = JSON.parse(items.d);
    var series = { data: [] };

    try {

      $("#div_ajax2").hide();

      $.each(obj, function (itemNo, item) {
        series.data.push([itemNo, item]);
      });

      options.series.push(series);
      chart = new Highcharts.Chart(options);
    }
    catch (error) {
      //alert(error);
    }

    
  },
  cache: false,
  //error: function (XMLHttpRequest, textStatus, errorThrown) { alert(errorThrown); }
  error: function (XMLHttpRequest, textStatus, errorThrown) {
          MostrarErrorAjax(XMLHttpRequest, "getDatos", errorThrown);
      }
 });
}