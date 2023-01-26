const indicatorModule = (function () {
    const valorFactura = {
        fecha: '',
        rentasLDI: 0,
        rentasLineas: 0,
        traficoLocal: 0,
        traficoMovil: 0,
        traficoLDN: 0,
        traficoLDI: 0,
        totalVoz: 0,
        arpuPromxLinea: 0
    }

    const iFinancieros = {
        paybackFinanciero: '',
        pagosUnicos: 0,
        rentaMensualPropuesta: 0,
        fcbSinIGV: 0,
        van: 0,
        vanVai: 0,
        capex: 0,
        capexIngresos: 0,
        targetPropuesto: 0,
        rentaMensualHoy: 0,
        rentaMensualPropuestaTarget: 0,
        rentaMensualHoyTarget: 0,
        totalLineaFija: 0
    }

    const initV = (v) => {
        valorFactura.fecha = !v.fecha ? 0 : v.fecha
        valorFactura.rentasLDI = !v.rentasLDI ? 0 : v.rentasLDI
        valorFactura.rentasLineas = !v.rentasLineas ? 0 : v.rentasLineas
        valorFactura.traficoLocal = !v.traficoLocal ? 0 : v.traficoLocal
        valorFactura.traficoMovil = !v.traficoMovil ? 0 : v.traficoMovil
        valorFactura.traficoLDN = !v.traficoLDN ? 0 : v.traficoLDN
        valorFactura.traficoLDI = !v.traficoLDI ? 0 : v.traficoLDI
        let suma = 0
        for (var key in valorFactura)
            suma += valorFactura[key]
        valorFactura.totalVoz = suma;
        valorFactura.arpuPromxLinea = !v.arpuPromxLinea ? 0 : v.arpuPromxLinea
    }

    const initI = (i) => {
        iFinancieros.paybackFinanciero = !i.paybackFinanciero ? '' : i.paybackFinanciero
        iFinancieros.pagosUnicos = !i.pagosUnicos ? 0 : i.pagosUnicos
        iFinancieros.rentaMensualPropuesta = !i.rentaMensualPropuesta ? 0 : i.rentaMensualPropuesta
        iFinancieros.fcbSinIGV = !i.fcbSinIGV ? 0 : i.fcbSinIGV
        iFinancieros.van = !i.van ? 0 : i.van
        iFinancieros.vanVai = !i.vanVai ? 0 : i.vanVai
        iFinancieros.capex = !i.capex ? 0 : i.capex
        iFinancieros.capexIngresos = !i.capexIngresos ? 0 : i.capexIngresos
        iFinancieros.targetPropuesto = !i.targetPropuesto ? 0 : i.targetPropuesto
        iFinancieros.rentaMensualHoy = !i.rentaMensualHoy ? 0 : i.rentaMensualHoy
        iFinancieros.rentaMensualPropuestaTarget = !i.rentaMensualPropuestaTarget ? 0 : i.rentaMensualPropuestaTarget
        iFinancieros.rentaMensualHoyTarget = !i.rentaMensualHoyTarget ? 0 : i.rentaMensualHoyTarget
        iFinancieros.totalLineaFija = !i.totalLineaFija ? 0 : i.totalLineaFija
    }

    const calcularRenta = () => {
        iFinancieros.capexIngresos = iFinancieros.capex / iFinancieros.fcbSinIGV
        iFinancieros.rentaMensualPropuestaTarget = iFinancieros.rentaMensualPropuesta / iFinancieros.targetPropuesto - 1
        iFinancieros.rentaMensualHoyTarget = iFinancieros.targetPropuesto / iFinancieros.rentaMensualHoy - 1
    }

    const calcularIndicador = () => {

    }

    let totalVozProm = 0;
    let arpPromxLinea = 0;

    return {
        init: function (i) {
            initI(i)
        }
    }
})()


$(function () {

})