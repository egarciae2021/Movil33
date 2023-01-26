var SimMil = ",";
var SimDec = ".";
var NumDec = "2";
var oCulturaUsuario;

var inFilas;
var nuAltoFila = 23.04;
var ArrayPaginacion = [];

function fnDimencionarGrilla() {
    var Ancho = $(window).width();
    var Alto = $(window).height();

    $("#tbSumario").setGridWidth($(window).width() - 12);
    //$("#tbSumario").setGridHeight($(window).height() - 100);

}


$(function () {
    NumeroInicialFilas();
    //cultura (configuracion regional)
    oCulturaUsuario = window.parent.parent.parent.parent.oCulturaUsuario;
    SimMil = oCulturaUsuario.vcSimSepMil;
    NumDec = oCulturaUsuario.dcNumDec;
    SimDec = oCulturaUsuario.vcSimDec;

    window.parent.parent.ventanaSumario = location;

    var colModelSumOrgaNivel = [{ name: 'ORGA_P_inCODINT', index: 'ORGA_P_inCODINT', label: 'Codigo', width: '60', frozen: true },
                                        { name: 'ORGA_vcNOMORG', index: 'ORGA_vcNOMORG', label: window.parent.parent.Criterio.NivelSumario.vcNomNiv, width: '150', frozen: true },
   		                                { name: 'inNumLlaLoc', index: 'inNumLlaLoc', label: 'FIJA/Llam', width: '70', align: 'Right', formatter: "currency", formatoptions: { thousandsSeparator: SimMil, decimalPlaces: 0} },
   		                                { name: 'vcDurLlaLoc', index: 'vcDurLlaLoc', label: 'FIJA/Dura.', width: '70', align: 'Center' },
   		                                { name: 'inDurReaLlaLoc', index: 'inDurReaLlaLoc', label: 'FIJA/DuraRea.', sortable: false, hidden: true },
                                        { name: 'dcCosLlaLoc', index: 'dcCosLlaLoc', label: 'FIJA/Costo', width: '70', align: 'Right', formatter: "currency", formatoptions: { decimalSeparator: SimDec, thousandsSeparator: SimMil, decimalPlaces: parseInt(NumDec)} },
   		                                { name: 'inNumLlaCel', index: 'inNumLlaCel', label: 'CEL/Llam', width: '70', align: 'Right', formatter: "currency", formatoptions: { thousandsSeparator: SimMil, decimalPlaces: 0} },
   		                                { name: 'vcDurLlaCel', index: 'vcDurLlaCel', label: 'CEL/Dura.', width: '70', align: 'Center' },
   		                                { name: 'inDurReaLlaCel', index: 'inDurReaLlaCel', label: 'CEL/DuraRea.', sortable: false, hidden: true },
   		                                { name: 'dcCosLlaCel', index: 'dcCosLlaCel', label: 'CEL/Costo', width: '70', align: 'Right', formatter: "currency", formatoptions: { decimalSeparator: SimDec, thousandsSeparator: SimMil, decimalPlaces: parseInt(NumDec)} },
   		                                { name: 'inNumLlaDdn', index: 'inNumLlaDdn', label: 'DDN/Llam', hidden: true, width: '70', align: 'Right', formatter: "currency", formatoptions: { thousandsSeparator: SimMil, decimalPlaces: 0} },
   		                                { name: 'vcDurLlaDdn', index: 'vcDurLlaDdn', label: 'DDN/Dura', hidden: true, width: '70', align: 'Center' },
   		                                { name: 'inDurReaLlaDdn', index: 'inDurReaLlaDdn', label: 'DDN/DuraRea.', sortable: false, hidden: true },
   		                                { name: 'dcCosLlaDdn', index: 'dcCosLlaDdn', label: 'DDN/Costo', hidden: true, width: '70', align: 'Right', formatter: "currency", formatoptions: { decimalSeparator: SimDec, thousandsSeparator: SimMil, decimalPlaces: parseInt(NumDec)} },
   		                                { name: 'inNumLlaDdi', index: 'inNumLlaDdi', label: 'DDI/Llam', width: '70', align: 'Right', formatter: "currency", formatoptions: { thousandsSeparator: SimMil, decimalPlaces: 0} },
   		                                { name: 'vcDurLlaDdi', index: 'vcDurLlaDdi', label: 'DDI/Dura.', width: '70', align: 'Center' },
   		                                { name: 'inDurReaLlaDdi', index: 'inDurReaLlaDdi', label: 'DDI/DuraRea.', sortable: false, hidden: true },
   		                                { name: 'dcCosLlaDdi', index: 'dcCosLlaDdi', label: 'DDI/Costo', width: '70', align: 'Right', formatter: "currency", formatoptions: { decimalSeparator: SimDec, thousandsSeparator: SimMil, decimalPlaces: parseInt(NumDec)} },
   		                                { name: 'inNumSRCel', index: 'inNumSRCel', label: 'SRCEL/Num.', sortable: false, hidden: true },
   		                                { name: 'dcCosLlaSRCel', index: 'dcCosLlaSRCel', label: 'SRCEL/Costo', width: '70', align: 'Right', formatter: "currency", formatoptions: { decimalSeparator: SimDec, thousandsSeparator: SimMil, decimalPlaces: parseInt(NumDec)} },
   		                                { name: 'inNumLlaTot', index: 'inNumLlaTot', label: 'TOT/Llam', width: '70', align: 'Right', formatter: "currency", formatoptions: { thousandsSeparator: SimMil, decimalPlaces: 0} },
   		                                { name: 'vcDurLlaTot', index: 'vcDurLlaTot', label: 'TOT/Dura.', width: '70', align: 'Center' },
   		                                { name: 'inDurReaLlaTot', index: 'inDurReaLlaTot', label: 'TOT/DuraRea.', sortable: false, hidden: true },
   		                                { name: 'dcCosLlaTot', index: 'dcCosLlaTot', label: 'TOT/Costo', width: '70', align: 'Right', formatter: "currency", formatoptions: { decimalSeparator: SimDec, thousandsSeparator: SimMil, decimalPlaces: parseInt(NumDec)} }
   	                                   ];

    var colModelSumOrgaArea = [{ name: 'ORGA_P_inCODINT', index: 'ORGA_P_inCODINT', label: 'Codigo', width: '60', frozen: true },
                                        { name: 'ORGA_vcNOMORG', index: 'ORGA_vcNOMORG', label: 'Organización', width: '150', frozen: true },
   		                                { name: 'inNumLlaLoc', index: 'inNumLlaLoc', label: 'FIJA/Llam', width: '70', align: 'Right', formatter: "currency", formatoptions: { thousandsSeparator: SimMil, decimalPlaces: 0} },
   		                                { name: 'vcDurLlaLoc', index: 'vcDurLlaLoc', label: 'FIJA/Dura.', width: '70', align: 'Center' },
   		                                { name: 'inDurReaLlaLoc', index: 'inDurReaLlaLoc', label: 'FIJA/DuraRea.', sortable: false, hidden: true },
   		                                { name: 'dcCosLlaLoc', index: 'dcCosLlaLoc', label: 'FIJA/Costo', width: '70', align: 'Right', formatter: "currency", formatoptions: { decimalSeparator: SimDec, thousandsSeparator: SimMil, decimalPlaces: parseInt(NumDec)} },
   		                                { name: 'inNumLlaCel', index: 'inNumLlaCel', label: 'CEL/Llam', width: '70', align: 'Right', formatter: "currency", formatoptions: { thousandsSeparator: SimMil, decimalPlaces: 0} },
   		                                { name: 'vcDurLlaCel', index: 'vcDurLlaCel', label: 'CEL/Dura.', width: '70', align: 'Center' },
   		                                { name: 'inDurReaLlaCel', index: 'inDurReaLlaCel', label: 'CEL/DuraRea.', sortable: false, hidden: true },
   		                                { name: 'dcCosLlaCel', index: 'dcCosLlaCel', label: 'CEL/Costo', width: '70', align: 'Right', formatter: "currency", formatoptions: { decimalSeparator: SimDec, thousandsSeparator: SimMil, decimalPlaces: parseInt(NumDec)} },
   		                                { name: 'inNumLlaDdn', index: 'inNumLlaDdn', label: 'DDN/Llam', hidden: true, width: '70', align: 'Right', formatter: "currency", formatoptions: { thousandsSeparator: SimMil, decimalPlaces: 0} },
   		                                { name: 'vcDurLlaDdn', index: 'vcDurLlaDdn', label: 'DDN/Dura', hidden: true, width: '70', align: 'Center' },
   		                                { name: 'inDurReaLlaDdn', index: 'inDurReaLlaDdn', label: 'DDN/DuraRea.', sortable: false, hidden: true },
   		                                { name: 'dcCosLlaDdn', index: 'dcCosLlaDdn', label: 'DDN/Costo', hidden: true, width: '70', align: 'Right', formatter: "currency", formatoptions: { decimalSeparator: SimDec, thousandsSeparator: SimMil, decimalPlaces: parseInt(NumDec)} },
   		                                { name: 'inNumLlaDdi', index: 'inNumLlaDdi', label: 'DDI/Llam', width: '70', align: 'Right', formatter: "currency", formatoptions: { thousandsSeparator: SimMil, decimalPlaces: 0} },
   		                                { name: 'vcDurLlaDdi', index: 'vcDurLlaDdi', label: 'DDI/Dura.', width: '70', align: 'Center' },
   		                                { name: 'inDurReaLlaDdi', index: 'inDurReaLlaDdi', label: 'DDI/DuraRea.', sortable: false, hidden: true },
   		                                { name: 'dcCosLlaDdi', index: 'dcCosLlaDdi', label: 'DDI/Costo', width: '70', align: 'Right', formatter: "currency", formatoptions: { decimalSeparator: SimDec, thousandsSeparator: SimMil, decimalPlaces: parseInt(NumDec)} },
   		                                { name: 'inNumSRCel', index: 'inNumSRCel', label: 'SRCEL/Num.', sortable: false, hidden: true },
   		                                { name: 'dcCosLlaSRCel', index: 'dcCosLlaSRCel', label: 'SRCEL/Costo', width: '70', align: 'Right', formatter: "currency", formatoptions: { decimalSeparator: SimDec, thousandsSeparator: SimMil, decimalPlaces: parseInt(NumDec)} },
   		                                { name: 'inNumLlaTot', index: 'inNumLlaTot', label: 'TOT/Llam', width: '70', align: 'Right', formatter: "currency", formatoptions: { thousandsSeparator: SimMil, decimalPlaces: 0} },
   		                                { name: 'vcDurLlaTot', index: 'vcDurLlaTot', label: 'TOT/Dura.', width: '70', align: 'Center' },
   		                                { name: 'inDurReaLlaTot', index: 'inDurReaLlaTot', label: 'TOT/DuraRea.', sortable: false, hidden: true },
   		                                { name: 'dcCosLlaTot', index: 'dcCosLlaTot', label: 'TOT/Costo', width: '70', align: 'Right', formatter: "currency", formatoptions: { decimalSeparator: SimDec, thousandsSeparator: SimMil, decimalPlaces: parseInt(NumDec)} }
   	                                   ];

    var colModelSumLinea = [{ name: 'LLAM_P_vcCODEXT', index: 'LLAM_P_vcCODEXT', label: 'Linea', width: '100', frozen: true },
                                    { name: 'inCodEmp', index: 'inCodEmp', label: 'Linea', width: '70', hidden: true, frozen: true },
   		                            { name: 'LLAM_vcNOMEMP', index: 'LLAM_vcNOMEMP', label: 'Empleado', width: '200', frozen: true },
   		                            { name: 'inNumLlaLoc', index: 'inNumLlaLoc', label: 'FIJA/Llam', width: '70', align: 'Right', formatter: "currency", formatoptions: { thousandsSeparator: SimMil, decimalPlaces: 0} },
   		                            { name: 'vcDurLlaLoc', index: 'vcDurLlaLoc', label: 'FIJA/Dura.', width: '70', align: 'Center' },
   		                            { name: 'inDurReaLlaLoc', index: 'inDurReaLlaLoc', label: 'FIJA/DuraRea.', sortable: false, hidden: true },
   		                            { name: 'dcCosLlaLoc', index: 'dcCosLlaLoc', label: 'FIJA/Costo', width: '70', align: 'Right', formatter: "currency", formatoptions: { decimalSeparator: SimDec, thousandsSeparator: SimMil, decimalPlaces: parseInt(NumDec)} },
   		                            { name: 'inNumLlaCel', index: 'inNumLlaCel', label: 'CEL/Llam', width: '70', align: 'Right', formatter: "currency", formatoptions: { thousandsSeparator: SimMil, decimalPlaces: 0} },
   		                            { name: 'vcDurLlaCel', index: 'vcDurLlaCel', label: 'CEL/Dura.', width: '70', align: 'Center' },
   		                            { name: 'inDurReaLlaCel', index: 'inDurReaLlaCel', label: 'CEL/DuraRea.', sortable: false, hidden: true },
   		                            { name: 'dcCosLlaCel', index: 'dcCosLlaCel', label: 'CEL/Costo', width: '70', align: 'Right', formatter: "currency", formatoptions: { decimalSeparator: SimDec, thousandsSeparator: SimMil, decimalPlaces: parseInt(NumDec)} },
   		                            { name: 'inNumLlaDdn', index: 'inNumLlaDdn', label: 'DDN/Llam', hidden: true, width: '70', align: 'Right', formatter: "currency", formatoptions: { thousandsSeparator: SimMil, decimalPlaces: 0} },
   		                            { name: 'vcDurLlaDdn', index: 'vcDurLlaDdn', label: 'DDN/Dura', hidden: true, width: '70', align: 'Center' },
   		                            { name: 'inDurReaLlaDdn', index: 'inDurReaLlaDdn', label: 'DDN/DuraRea.', sortable: false, hidden: true },
   		                            { name: 'dcCosLlaDdn', index: 'dcCosLlaDdn', label: 'DDN/Costo', hidden: true, width: '70', align: 'Right', formatter: "currency", formatoptions: { decimalSeparator: SimDec, thousandsSeparator: SimMil, decimalPlaces: parseInt(NumDec)} },
   		                            { name: 'inNumLlaDdi', index: 'inNumLlaDdi', label: 'DDI/Llam', width: '70', align: 'Right', formatter: "currency", formatoptions: { thousandsSeparator: SimMil, decimalPlaces: 0} },
   		                            { name: 'vcDurLlaDdi', index: 'vcDurLlaDdi', label: 'DDI/Dura.', width: '70', align: 'Center' },
   		                            { name: 'inDurReaLlaDdi', index: 'inDurReaLlaDdi', label: 'DDI/DuraRea.', sortable: false, hidden: true },
   		                            { name: 'dcCosLlaDdi', index: 'dcCosLlaDdi', label: 'DDI/Costo', width: '70', align: 'Right', formatter: "currency", formatoptions: { decimalSeparator: SimDec, thousandsSeparator: SimMil, decimalPlaces: parseInt(NumDec)} },
   		                            { name: 'inNumSRCel', index: 'inNumSRCel', label: 'SRCEL/Num.', sortable: false, hidden: true },
   		                            { name: 'dcCosLlaSRCel', index: 'dcCosLlaSRCel', label: 'SRCEL/Costo', width: '70', align: 'Right', formatter: "currency", formatoptions: { decimalSeparator: SimDec, thousandsSeparator: SimMil, decimalPlaces: parseInt(NumDec)} },
   		                            { name: 'inNumLlaTot', index: 'inNumLlaTot', label: 'TOT/Llam', width: '70', align: 'Right', formatter: "currency", formatoptions: { thousandsSeparator: SimMil, decimalPlaces: 0} },
   		                            { name: 'vcDurLlaTot', index: 'vcDurLlaTot', label: 'TOT/Dura.', width: '70', align: 'Center' },
   		                            { name: 'inDurReaLlaTot', index: 'inDurReaLlaTot', label: 'TOT/DuraRea.', sortable: false, hidden: true },
   		                            { name: 'dcCosLlaTot', index: 'dcCosLlaTot', label: 'TOT/Costo', width: '70', align: 'Right', formatter: "currency", formatoptions: { decimalSeparator: SimDec, thousandsSeparator: SimMil, decimalPlaces: parseInt(NumDec)} }
   	                               ];

    var colModelSumEmpleado = [{ name: 'LLAM_vcCODEMP', index: 'LLAM_vcCODEMP', label: 'Código', width: '70', frozen: true },
   		                            { name: 'LLAM_vcNOMEMP', index: 'LLAM_vcNOMEMP', label: 'Empleado', width: '200', frozen: true },
   		                            { name: 'inNumLlaLoc', index: 'inNumLlaLoc', label: 'FIJA/Llam', width: '70', align: 'Right', formatter: "currency", formatoptions: { thousandsSeparator: SimMil, decimalPlaces: 0} },
   		                            { name: 'vcDurLlaLoc', index: 'vcDurLlaLoc', label: 'FIJA/Dura.', width: '70', align: 'Center' },
   		                            { name: 'inDurReaLlaLoc', index: 'inDurReaLlaLoc', label: 'FIJA/DuraRea.', sortable: false, hidden: true },
   		                            { name: 'dcCosLlaLoc', index: 'dcCosLlaLoc', label: 'FIJA/Costo', width: '70', align: 'Right', formatter: "currency", formatoptions: { decimalSeparator: SimDec, thousandsSeparator: SimMil, decimalPlaces: parseInt(NumDec)} },
   		                            { name: 'inNumLlaCel', index: 'inNumLlaCel', label: 'CEL/Llam', width: '70', align: 'Right', formatter: "currency", formatoptions: { thousandsSeparator: SimMil, decimalPlaces: 0} },
   		                            { name: 'vcDurLlaCel', index: 'vcDurLlaCel', label: 'CEL/Dura.', width: '70', align: 'Center' },
   		                            { name: 'inDurReaLlaCel', index: 'inDurReaLlaCel', label: 'CEL/DuraRea.', sortable: false, hidden: true },
   		                            { name: 'dcCosLlaCel', index: 'dcCosLlaCel', label: 'CEL/Costo', width: '70', align: 'Right', formatter: "currency", formatoptions: { decimalSeparator: SimDec, thousandsSeparator: SimMil, decimalPlaces: parseInt(NumDec)} },
   		                            { name: 'inNumLlaDdn', index: 'inNumLlaDdn', label: 'DDN/Llam', hidden: true, width: '70', align: 'Right', formatter: "currency", formatoptions: { thousandsSeparator: SimMil, decimalPlaces: 0} },
   		                            { name: 'vcDurLlaDdn', index: 'vcDurLlaDdn', label: 'DDN/Dura.', hidden: true, width: '70', align: 'Center' },
   		                            { name: 'inDurReaLlaDdn', index: 'inDurReaLlaDdn', label: 'DDN/DuraRea.', sortable: false, hidden: true },
   		                            { name: 'dcCosLlaDdn', index: 'dcCosLlaDdn', label: 'DDN/Costo', hidden: true, width: '70', align: 'Right', formatter: "currency", formatoptions: { decimalSeparator: SimDec, thousandsSeparator: SimMil, decimalPlaces: parseInt(NumDec)} },
   		                            { name: 'inNumLlaDdi', index: 'inNumLlaDdi', label: 'DDI/Llam', width: '70', align: 'Right', formatter: "currency", formatoptions: { thousandsSeparator: SimMil, decimalPlaces: 0} },
   		                            { name: 'vcDurLlaDdi', index: 'vcDurLlaDdi', label: 'DDI/Dura.', width: '70', align: 'Center' },
   		                            { name: 'inDurReaLlaDdi', index: 'inDurReaLlaDdi', label: 'DDI/DuraRea.', sortable: false, hidden: true },
   		                            { name: 'dcCosLlaDdi', index: 'dcCosLlaDdi', label: 'DDI/Costo', width: '70', align: 'Right', formatter: "currency", formatoptions: { decimalSeparator: SimDec, thousandsSeparator: SimMil, decimalPlaces: parseInt(NumDec)} },
   		                            { name: 'inNumSRCel', index: 'inNumSRCel', label: 'SRCEL/Num.', sortable: false, hidden: true },
   		                            { name: 'dcCosLlaSRCel', index: 'dcCosLlaSRCel', label: 'SRCEL/Costo', width: '70', align: 'Right', formatter: "currency", formatoptions: { decimalSeparator: SimDec, thousandsSeparator: SimMil, decimalPlaces: parseInt(NumDec)} },
   		                            { name: 'inNumLlaTot', index: 'inNumLlaTot', label: 'TOT/Llam', width: '70', align: 'Right', formatter: "currency", formatoptions: { thousandsSeparator: SimMil, decimalPlaces: 0} },
   		                            { name: 'vcDurLlaTot', index: 'vcDurLlaTot', label: 'TOT/Dura.', width: '70', align: 'Center' },
   		                            { name: 'inDurReaLlaTot', index: 'inDurReaLlaTot', label: 'TOT/DuraRea.', sortable: false, hidden: true },
   		                            { name: 'dcCosLlaTot', index: 'dcCosLlaTot', label: 'TOT/Costo', width: '70', align: 'Right', formatter: "currency", formatoptions: { decimalSeparator: SimDec, thousandsSeparator: SimMil, decimalPlaces: parseInt(NumDec)} }
   	                               ];

    var colModelSumCCO = [{ name: 'CCOS_P_vcCODCCO', index: 'CCOS_P_vcCODCCO', label: 'Código', width: '70', frozen: true },
   		                            { name: 'CCOS_vcNOMCCO', index: 'CCOS_vcNOMCCO', label: 'Centro de Costo', width: '150', frozen: true },
   		                            { name: 'inNumLlaLoc', index: 'inNumLlaLoc', label: 'FIJA/Llam', width: '70', align: 'Right', formatter: "currency", formatoptions: { thousandsSeparator: SimMil, decimalPlaces: 0} },
   		                            { name: 'vcDurLlaLoc', index: 'vcDurLlaLoc', label: 'FIJA/Dura.', width: '70', align: 'Center' },
   		                            { name: 'inDurReaLlaLoc', index: 'inDurReaLlaLoc', label: 'FIJA/DuraRea.', sortable: false, hidden: true },
   		                            { name: 'dcCosLlaLoc', index: 'dcCosLlaLoc', label: 'FIJA/Costo', width: '70', align: 'Right', formatter: "currency", formatoptions: { decimalSeparator: SimDec, thousandsSeparator: SimMil, decimalPlaces: parseInt(NumDec)} },
   		                            { name: 'inNumLlaCel', index: 'inNumLlaCel', label: 'CEL/Llam', width: '70', align: 'Right', formatter: "currency", formatoptions: { thousandsSeparator: SimMil, decimalPlaces: 0} },
   		                            { name: 'vcDurLlaCel', index: 'vcDurLlaCel', label: 'CEL/Dura.', width: '70', align: 'Center' },
   		                            { name: 'inDurReaLlaCel', index: 'inDurReaLlaCel', label: 'CEL/DuraRea.', sortable: false, hidden: true },
   		                            { name: 'dcCosLlaCel', index: 'dcCosLlaCel', label: 'CEL/Costo', width: '70', align: 'Right', formatter: "currency", formatoptions: { decimalSeparator: SimDec, thousandsSeparator: SimMil, decimalPlaces: parseInt(NumDec)} },
   		                            { name: 'inNumLlaDdn', index: 'inNumLlaDdn', label: 'DDN/Llam', hidden: true, width: '70', align: 'Right', formatter: "currency", formatoptions: { thousandsSeparator: SimMil, decimalPlaces: 0} },
   		                            { name: 'vcDurLlaDdn', index: 'vcDurLlaDdn', label: 'DDN/Dura', hidden: true, width: '70', align: 'Center' },
   		                            { name: 'inDurReaLlaDdn', index: 'inDurReaLlaDdn', label: 'DDN/DuraRea.', sortable: false, hidden: true },
   		                            { name: 'dcCosLlaDdn', index: 'dcCosLlaDdn', label: 'DDN/Costo', hidden: true, width: '70', align: 'Right', formatter: "currency", formatoptions: { decimalSeparator: SimDec, thousandsSeparator: SimMil, decimalPlaces: parseInt(NumDec)} },
   		                            { name: 'inNumLlaDdi', index: 'inNumLlaDdi', label: 'DDI/Llam', width: '70', align: 'Right', formatter: "currency", formatoptions: { thousandsSeparator: SimMil, decimalPlaces: 0} },
   		                            { name: 'vcDurLlaDdi', index: 'vcDurLlaDdi', label: 'DDI/Dura.', width: '70', align: 'Center' },
   		                            { name: 'inDurReaLlaDdi', index: 'inDurReaLlaDdi', label: 'DDI/DuraRea.', sortable: false, hidden: true },
   		                            { name: 'dcCosLlaDdi', index: 'dcCosLlaDdi', label: 'DDI/Costo', width: '70', align: 'Right', formatter: "currency", formatoptions: { decimalSeparator: SimDec, thousandsSeparator: SimMil, decimalPlaces: parseInt(NumDec)} },
   		                            { name: 'inNumSRCel', index: 'inNumSRCel', label: 'SRCEL/Num.', sortable: false, hidden: true },
   		                            { name: 'dcCosLlaSRCel', index: 'dcCosLlaSRCel', label: 'SRCEL/Costo', width: '70', align: 'Right', formatter: "currency", formatoptions: { decimalSeparator: SimDec, thousandsSeparator: SimMil, decimalPlaces: parseInt(NumDec)} },
   		                            { name: 'inNumLlaTot', index: 'inNumLlaTot', label: 'TOT/Llam', width: '70', align: 'Right', formatter: "currency", formatoptions: { thousandsSeparator: SimMil, decimalPlaces: 0} },
   		                            { name: 'vcDurLlaTot', index: 'vcDurLlaTot', label: 'TOT/Dura.', width: '70', align: 'Center' },
   		                            { name: 'inDurReaLlaTot', index: 'inDurReaLlaTot', label: 'TOT/DuraRea.', sortable: false, hidden: true },
   		                            { name: 'dcCosLlaTot', index: 'dcCosLlaTot', label: 'TOT/Costo', width: '70', align: 'Right', formatter: "currency", formatoptions: { decimalSeparator: SimDec, thousandsSeparator: SimMil, decimalPlaces: parseInt(NumDec)} }
   	                               ];

    var colModelSumNumero = [{ name: 'LLAM_P_vcCODSUC', index: 'LLAM_P_vcCODSUC', label: 'Sucursal', width: '60', frozen: true },
                                    { name: 'LLAM_P_vcNUMTEL', index: 'LLAM_P_vcNUMTEL', label: 'Numero', width: '100', frozen: true },
   		                            { name: 'LLAM_vcNOMTEL', index: 'LLAM_vcNOMTEL', label: 'Nombre', width: '200', frozen: true },
   		                            { name: 'inNumLlaLoc', index: 'inNumLlaLoc', label: 'FIJA/Llam', width: '70', hidden: true },
   		                            { name: 'vcDurLlaLoc', index: 'vcDurLlaLoc', label: 'FIJA/Dura.', width: '70', hidden: true },
   		                            { name: 'inDurReaLlaLoc', index: 'inDurReaLlaLoc', label: 'FIJA/DuraRea.', sortable: false, hidden: true },
   		                            { name: 'dcCosLlaLoc', index: 'dcCosLlaLoc', label: 'FIJA/Costo', width: '70', hidden: true },
   		                            { name: 'inNumLlaCel', index: 'inNumLlaCel', label: 'CEL/Llam', width: '70', hidden: true },
   		                            { name: 'vcDurLlaCel', index: 'vcDurLlaCel', label: 'CEL/Dura.', width: '70', hidden: true },
   		                            { name: 'inDurReaLlaCel', index: 'inDurReaLlaCel', label: 'CEL/DuraRea.', sortable: false, hidden: true },
   		                            { name: 'dcCosLlaCel', index: 'dcCosLlaCel', label: 'CEL/Costo', width: '70', hidden: true },
   		                            { name: 'inNumLlaDdn', index: 'inNumLlaDdn', label: 'DDN/Llam', hidden: true, width: '70', hidden: true },
   		                            { name: 'vcDurLlaDdn', index: 'vcDurLlaDdn', label: 'DDN/Dura', hidden: true, width: '70', hidden: true },
   		                            { name: 'inDurReaLlaDdn', index: 'inDurReaLlaDdn', label: 'DDN/DuraRea.', sortable: false, hidden: true },
   		                            { name: 'dcCosLlaDdn', index: 'dcCosLlaDdn', label: 'DDN/Costo', hidden: true, width: '70', hidden: true },
   		                            { name: 'inNumLlaDdi', index: 'inNumLlaDdi', label: 'DDI/Llam', width: '70', hidden: true },
   		                            { name: 'vcDurLlaDdi', index: 'vcDurLlaDdi', label: 'DDI/Dura.', width: '70', hidden: true },
   		                            { name: 'inDurReaLlaDdi', index: 'inDurReaLlaDdi', label: 'DDI/DuraRea.', sortable: false, hidden: true },
   		                            { name: 'dcCosLlaDdi', index: 'dcCosLlaDdi', label: 'DDI/Costo', width: '70', hidden: true },
   		                            { name: 'inNumSRCel', index: 'inNumSRCel', label: 'SRCEL/Num.', sortable: false, hidden: true },
   		                            { name: 'dcCosLlaSRCel', index: 'dcCosLlaSRCel', label: 'SRCEL/Costo', width: '70', hidden: true },
   		                            { name: 'inNumLlaTot', index: 'inNumLlaTot', label: 'TOT/Llam', width: '70', align: 'Right', formatter: "currency", formatoptions: { thousandsSeparator: SimMil, decimalPlaces: 0} },
   		                            { name: 'vcDurLlaTot', index: 'vcDurLlaTot', label: 'TOT/Dura.', width: '70', align: 'Center' },
   		                            { name: 'inDurReaLlaTot', index: 'inDurReaLlaTot', label: 'TOT/DuraRea.', sortable: false, hidden: true },
   		                            { name: 'dcCosLlaTot', index: 'dcCosLlaTot', label: 'TOT/Costo', width: '70', align: 'Right', formatter: "currency", formatoptions: { decimalSeparator: SimDec, thousandsSeparator: SimMil, decimalPlaces: parseInt(NumDec)} }
   	                               ];

    var colModelSumFrecuLlam = [{ name: 'LLAM_P_vcCODSUC', index: 'LLAM_P_vcCODSUC', label: 'Sucursal', width: '60', frozen: true },
                                        { name: 'LLAM_P_vcNUMTEL', index: 'LLAM_P_vcNUMTEL', label: 'Numero', width: '100', frozen: true },
   		                                { name: 'LLAM_vcNOMTEL', index: 'LLAM_vcNOMTEL', label: 'Nombre', width: '200', frozen: true },
   		                                { name: 'inNumLin', index: 'inNumLin', label: 'Lineas', width: '60', sortable: true, frozen: true, align: 'Right', formatter: "currency", formatoptions: { decimalSeparator: SimDec, thousandsSeparator: SimMil, decimalPlaces: 0} },
   		                                { name: 'inNumLlaLoc', index: 'inNumLlaLoc', label: 'FIJA/Llam', width: '70', hidden: true },
   		                                { name: 'vcDurLlaLoc', index: 'vcDurLlaLoc', label: 'FIJA/Dura.', width: '70', hidden: true },
   		                                { name: 'inDurReaLlaLoc', index: 'inDurReaLlaLoc', label: 'FIJA/DuraRea.', sortable: false, hidden: true },
   		                                { name: 'dcCosLlaLoc', index: 'dcCosLlaLoc', label: 'FIJA/Costo', width: '70', hidden: true },
   		                                { name: 'inNumLlaCel', index: 'inNumLlaCel', label: 'CEL/Llam', width: '70', hidden: true },
   		                                { name: 'vcDurLlaCel', index: 'vcDurLlaCel', label: 'CEL/Dura.', width: '70', hidden: true },
   		                                { name: 'inDurReaLlaCel', index: 'inDurReaLlaCel', label: 'CEL/DuraRea.', sortable: false, hidden: true },
   		                                { name: 'dcCosLlaCel', index: 'dcCosLlaCel', label: 'CEL/Costo', width: '70', hidden: true },
   		                                { name: 'inNumLlaDdn', index: 'inNumLlaDdn', label: 'DDN/Llam', hidden: true, width: '70', hidden: true },
   		                                { name: 'vcDurLlaDdn', index: 'vcDurLlaDdn', label: 'DDN/Dura', hidden: true, width: '70', hidden: true },
   		                                { name: 'inDurReaLlaDdn', index: 'inDurReaLlaDdn', label: 'DDN/DuraRea.', sortable: false, hidden: true },
   		                                { name: 'dcCosLlaDdn', index: 'dcCosLlaDdn', label: 'DDN/Costo', hidden: true, width: '70', hidden: true },
   		                                { name: 'inNumLlaDdi', index: 'inNumLlaDdi', label: 'DDI/Llam', width: '70', hidden: true },
   		                                { name: 'vcDurLlaDdi', index: 'vcDurLlaDdi', label: 'DDI/Dura.', width: '70', hidden: true },
   		                                { name: 'inDurReaLlaDdi', index: 'inDurReaLlaDdi', label: 'DDI/DuraRea.', sortable: false, hidden: true },
   		                                { name: 'dcCosLlaDdi', index: 'dcCosLlaDdi', label: 'DDI/Costo', width: '70', hidden: true },
   		                                { name: 'inNumSRCel', index: 'inNumSRCel', label: 'SRCEL/Num.', sortable: false, hidden: true },
   		                                { name: 'dcCosLlaSRCel', index: 'dcCosLlaSRCel', label: 'SRCEL/Costo', width: '70', hidden: true },
   		                                { name: 'inNumLlaTot', index: 'inNumLlaTot', label: 'TOT/Llam', width: '70', align: 'Right', formatter: "currency", formatoptions: { thousandsSeparator: SimMil, decimalPlaces: 0} },
   		                                { name: 'vcDurLlaTot', index: 'vcDurLlaTot', label: 'TOT/Dura.', width: '70', align: 'Center' },
   		                                { name: 'inDurReaLlaTot', index: 'inDurReaLlaTot', label: 'TOT/DuraRea.', sortable: false, hidden: true },
   		                                { name: 'dcCosLlaTot', index: 'dcCosLlaTot', label: 'TOT/Costo', width: '70', align: 'Right', formatter: "currency", formatoptions: { decimalSeparator: SimDec, thousandsSeparator: SimMil, decimalPlaces: parseInt(NumDec)} }
   	                                   ];

    var colModelSumOperador = [{ name: 'LLAM_inCODOPE', index: 'LLAM_inCODOPE', label: 'Codigo', width: '100', frozen: true },
   		                            { name: 'COMP_vcNOMCIA', index: 'COMP_vcNOMCIA', label: 'Operador', width: '200', frozen: true },
   		                            { name: 'inNumLlaLoc', index: 'inNumLlaLoc', label: 'FIJA/Llam', width: '70', align: 'Right', formatter: "currency", formatoptions: { thousandsSeparator: SimMil, decimalPlaces: 0} },
   		                            { name: 'vcDurLlaLoc', index: 'vcDurLlaLoc', label: 'FIJA/Dura.', width: '70', align: 'Center' },
   		                            { name: 'inDurReaLlaLoc', index: 'inDurReaLlaLoc', label: 'FIJA/DuraRea.', sortable: false, hidden: true },
   		                            { name: 'dcCosLlaLoc', index: 'dcCosLlaLoc', label: 'FIJA/Costo', width: '70', align: 'Right', formatter: "currency", formatoptions: { decimalSeparator: SimDec, thousandsSeparator: SimMil, decimalPlaces: parseInt(NumDec)} },
   		                            { name: 'inNumLlaCel', index: 'inNumLlaCel', label: 'CEL/Llam', width: '70', align: 'Right', formatter: "currency", formatoptions: { thousandsSeparator: SimMil, decimalPlaces: 0} },
   		                            { name: 'vcDurLlaCel', index: 'vcDurLlaCel', label: 'CEL/Dura.', width: '70', align: 'Center' },
   		                            { name: 'inDurReaLlaCel', index: 'inDurReaLlaCel', label: 'CEL/DuraRea.', sortable: false, hidden: true },
   		                            { name: 'dcCosLlaCel', index: 'dcCosLlaCel', label: 'CEL/Costo', width: '70', align: 'Right', formatter: "currency", formatoptions: { decimalSeparator: SimDec, thousandsSeparator: SimMil, decimalPlaces: parseInt(NumDec)} },
   		                            { name: 'inNumLlaDdn', index: 'inNumLlaDdn', label: 'DDN/Llam', hidden: true, width: '70', align: 'Right', formatter: "currency", formatoptions: { thousandsSeparator: SimMil, decimalPlaces: 0} },
   		                            { name: 'vcDurLlaDdn', index: 'vcDurLlaDdn', label: 'DDN/Dura', hidden: true, width: '70', align: 'Center' },
   		                            { name: 'inDurReaLlaDdn', index: 'inDurReaLlaDdn', label: 'DDN/DuraRea.', sortable: false, hidden: true },
   		                            { name: 'dcCosLlaDdn', index: 'dcCosLlaDdn', label: 'DDN/Costo', hidden: true, width: '70', align: 'Right', formatter: "currency", formatoptions: { decimalSeparator: SimDec, thousandsSeparator: SimMil, decimalPlaces: parseInt(NumDec)} },
   		                            { name: 'inNumLlaDdi', index: 'inNumLlaDdi', label: 'DDI/Llam', width: '70', align: 'Right', formatter: "currency", formatoptions: { thousandsSeparator: SimMil, decimalPlaces: 0} },
   		                            { name: 'vcDurLlaDdi', index: 'vcDurLlaDdi', label: 'DDI/Dura.', width: '70', align: 'Center' },
   		                            { name: 'inDurReaLlaDdi', index: 'inDurReaLlaDdi', label: 'DDI/DuraRea.', sortable: false, hidden: true },
   		                            { name: 'dcCosLlaDdi', index: 'dcCosLlaDdi', label: 'DDI/Costo', width: '70', align: 'Right', formatter: "currency", formatoptions: { decimalSeparator: SimDec, thousandsSeparator: SimMil, decimalPlaces: parseInt(NumDec)} },
   		                            { name: 'inNumSRCel', index: 'inNumSRCel', label: 'SRCEL/Num.', sortable: false, hidden: true },
   		                            { name: 'dcCosLlaSRCel', index: 'dcCosLlaSRCel', label: 'SRCEL/Costo', width: '70', align: 'Right', formatter: "currency", formatoptions: { decimalSeparator: SimDec, thousandsSeparator: SimMil, decimalPlaces: parseInt(NumDec)} },
   		                            { name: 'inNumLlaTot', index: 'inNumLlaTot', label: 'TOT/Llam', width: '70', align: 'Right', formatter: "currency", formatoptions: { thousandsSeparator: SimMil, decimalPlaces: 0} },
   		                            { name: 'vcDurLlaTot', index: 'vcDurLlaTot', label: 'TOT/Dura.', width: '70', align: 'Center' },
   		                            { name: 'inDurReaLlaTot', index: 'inDurReaLlaTot', label: 'TOT/DuraRea.', sortable: false, hidden: true },
   		                            { name: 'dcCosLlaTot', index: 'dcCosLlaTot', label: 'TOT/Costo', width: '70', align: 'Right', formatter: "currency", formatoptions: { decimalSeparator: SimDec, thousandsSeparator: SimMil, decimalPlaces: parseInt(NumDec)} }
   	                               ];

    var colModelSumPais = [{ name: 'LLAM_vcCODPAI', index: 'LLAM_vcCODPAI', label: 'Codigo', width: '100', frozen: true },
   		                            { name: 'PAIS_vcNOMPAI', index: 'PAIS_vcNOMPAI', label: 'Pais', width: '200', frozen: true },
   		                            { name: 'inNumLlaLoc', index: 'inNumLlaLoc', label: 'FIJA/Llam', width: '70', align: 'Right', formatter: "currency", formatoptions: { thousandsSeparator: SimMil, decimalPlaces: 0} },
   		                            { name: 'vcDurLlaLoc', index: 'vcDurLlaLoc', label: 'FIJA/Dura.', width: '70', align: 'Center' },
   		                            { name: 'inDurReaLlaLoc', index: 'inDurReaLlaLoc', label: 'FIJA/DuraRea.', sortable: false, hidden: true },
   		                            { name: 'dcCosLlaLoc', index: 'dcCosLlaLoc', label: 'FIJA/Costo', width: '70', align: 'Right', formatter: "currency", formatoptions: { decimalSeparator: SimDec, thousandsSeparator: SimMil, decimalPlaces: parseInt(NumDec)} },
   		                            { name: 'inNumLlaCel', index: 'inNumLlaCel', label: 'CEL/Llam', width: '70', align: 'Right', formatter: "currency", formatoptions: { thousandsSeparator: SimMil, decimalPlaces: 0} },
   		                            { name: 'vcDurLlaCel', index: 'vcDurLlaCel', label: 'CEL/Dura.', width: '70', align: 'Center' },
   		                            { name: 'inDurReaLlaCel', index: 'inDurReaLlaCel', label: 'CEL/DuraRea.', sortable: false, hidden: true },
   		                            { name: 'dcCosLlaCel', index: 'dcCosLlaCel', label: 'CEL/Costo', width: '70', align: 'Right', formatter: "currency", formatoptions: { decimalSeparator: SimDec, thousandsSeparator: SimMil, decimalPlaces: parseInt(NumDec)} },
   		                            { name: 'inNumLlaDdn', index: 'inNumLlaDdn', label: 'DDN/Llam', hidden: true, width: '70', align: 'Right', formatter: "currency", formatoptions: { thousandsSeparator: SimMil, decimalPlaces: 0} },
   		                            { name: 'vcDurLlaDdn', index: 'vcDurLlaDdn', label: 'DDN/Dura', hidden: true, width: '70', align: 'Center' },
   		                            { name: 'inDurReaLlaDdn', index: 'inDurReaLlaDdn', label: 'DDN/DuraRea.', sortable: false, hidden: true },
   		                            { name: 'dcCosLlaDdn', index: 'dcCosLlaDdn', label: 'DDN/Costo', hidden: true, width: '70', align: 'Right', formatter: "currency", formatoptions: { decimalSeparator: SimDec, thousandsSeparator: SimMil, decimalPlaces: parseInt(NumDec)} },
   		                            { name: 'inNumLlaDdi', index: 'inNumLlaDdi', label: 'DDI/Llam', width: '70', align: 'Right', formatter: "currency", formatoptions: { thousandsSeparator: SimMil, decimalPlaces: 0} },
   		                            { name: 'vcDurLlaDdi', index: 'vcDurLlaDdi', label: 'DDI/Dura.', width: '70', align: 'Center' },
   		                            { name: 'inDurReaLlaDdi', index: 'inDurReaLlaDdi', label: 'DDI/DuraRea.', sortable: false, hidden: true },
   		                            { name: 'dcCosLlaDdi', index: 'dcCosLlaDdi', label: 'DDI/Costo', width: '70', align: 'Right', formatter: "currency", formatoptions: { decimalSeparator: SimDec, thousandsSeparator: SimMil, decimalPlaces: parseInt(NumDec)} },
   		                            { name: 'inNumSRCel', index: 'inNumSRCel', label: 'SRCEL/Num.', sortable: false, hidden: true },
   		                            { name: 'dcCosLlaSRCel', index: 'dcCosLlaSRCel', label: 'SRCEL/Costo', width: '70', formatter: "currency", formatoptions: { decimalSeparator: SimDec, thousandsSeparator: SimMil, decimalPlaces: parseInt(NumDec)} },
   		                            { name: 'inNumLlaTot', index: 'inNumLlaTot', label: 'TOT/Llam', width: '70', align: 'Right', formatter: "currency", formatoptions: { thousandsSeparator: SimMil, decimalPlaces: 0} },
   		                            { name: 'vcDurLlaTot', index: 'vcDurLlaTot', label: 'TOT/Dura.', width: '70', align: 'Center' },
   		                            { name: 'inDurReaLlaTot', index: 'inDurReaLlaTot', label: 'TOT/DuraRea.', sortable: false, hidden: true },
   		                            { name: 'dcCosLlaTot', index: 'dcCosLlaTot', label: 'TOT/Costo', width: '70', align: 'Right', formatter: "currency", formatoptions: { decimalSeparator: SimDec, thousandsSeparator: SimMil, decimalPlaces: parseInt(NumDec)} }
   	                               ];

    var colModelSumCiudad = [{ name: 'LLAM_vcCODPAI', index: 'LLAM_vcCODPAI', label: 'Codigo pais', width: '60', hidden: true, frozen: true },
                                    { name: 'PAIS_vcNOMPAI', index: 'PAIS_vcNOMPAI', label: 'Pais', width: '100', frozen: true },
   		                            { name: 'LLAM_vcCODCIU', index: 'LLAM_vcCODCIU', label: 'Codigo Ciudad', width: '60', hidden: true, frozen: true },
   		                            { name: 'CIUD_vcNOMCIU', index: 'CIUD_vcNOMCIU', label: 'Ciudad', width: '100', frozen: true },
   		                            { name: 'inNumLlaLoc', index: 'inNumLlaLoc', label: 'FIJA/Llam', width: '70', align: 'Right', formatter: "currency", formatoptions: { thousandsSeparator: SimMil, decimalPlaces: 0} },
   		                            { name: 'vcDurLlaLoc', index: 'vcDurLlaLoc', label: 'FIJA/Dura.', width: '70', align: 'Center' },
   		                            { name: 'inDurReaLlaLoc', index: 'inDurReaLlaLoc', label: 'FIJA/DuraRea.', sortable: false, hidden: true },
   		                            { name: 'dcCosLlaLoc', index: 'dcCosLlaLoc', label: 'FIJA/Costo', width: '70', align: 'Right', formatter: "currency", formatoptions: { decimalSeparator: SimDec, thousandsSeparator: SimMil, decimalPlaces: parseInt(NumDec)} },
   		                            { name: 'inNumLlaCel', index: 'inNumLlaCel', label: 'CEL/Llam', width: '70', align: 'Right', formatter: "currency", formatoptions: { thousandsSeparator: SimMil, decimalPlaces: 0} },
   		                            { name: 'vcDurLlaCel', index: 'vcDurLlaCel', label: 'CEL/Dura.', width: '70', align: 'Center' },
   		                            { name: 'inDurReaLlaCel', index: 'inDurReaLlaCel', label: 'CEL/DuraRea.', sortable: false, hidden: true },
   		                            { name: 'dcCosLlaCel', index: 'dcCosLlaCel', label: 'CEL/Costo', width: '70', align: 'Right', formatter: "currency", formatoptions: { decimalSeparator: SimDec, thousandsSeparator: SimMil, decimalPlaces: parseInt(NumDec)} },
   		                            { name: 'inNumLlaDdn', index: 'inNumLlaDdn', label: 'DDN/Llam', hidden: true, width: '70', align: 'Right', formatter: "currency", formatoptions: { thousandsSeparator: SimMil, decimalPlaces: 0} },
   		                            { name: 'vcDurLlaDdn', index: 'vcDurLlaDdn', label: 'DDN/Dura', hidden: true, width: '70', align: 'Center' },
   		                            { name: 'inDurReaLlaDdn', index: 'inDurReaLlaDdn', label: 'DDN/DuraRea.', sortable: false, hidden: true },
   		                            { name: 'dcCosLlaDdn', index: 'dcCosLlaDdn', label: 'DDN/Costo', hidden: true, width: '70', align: 'Right', formatter: "currency", formatoptions: { decimalSeparator: SimDec, thousandsSeparator: SimMil, decimalPlaces: parseInt(NumDec)} },
   		                            { name: 'inNumLlaDdi', index: 'inNumLlaDdi', label: 'DDI/Llam', width: '70', align: 'Right', formatter: "currency", formatoptions: { thousandsSeparator: SimMil, decimalPlaces: 0} },
   		                            { name: 'vcDurLlaDdi', index: 'vcDurLlaDdi', label: 'DDI/Dura.', width: '70', align: 'Center' },
   		                            { name: 'inDurReaLlaDdi', index: 'inDurReaLlaDdi', label: 'DDI/DuraRea.', sortable: false, hidden: true },
   		                            { name: 'dcCosLlaDdi', index: 'dcCosLlaDdi', label: 'DDI/Costo', width: '70', align: 'Right', formatter: "currency", formatoptions: { decimalSeparator: SimDec, thousandsSeparator: SimMil, decimalPlaces: parseInt(NumDec)} },
   		                            { name: 'inNumSRCel', index: 'inNumSRCel', label: 'SRCEL/Num.', sortable: false, hidden: true },
   		                            { name: 'dcCosLlaSRCel', index: 'dcCosLlaSRCel', label: 'SRCEL/Costo', width: '70', align: 'Right', formatter: "currency", formatoptions: { decimalSeparator: SimDec, thousandsSeparator: SimMil, decimalPlaces: parseInt(NumDec)} },
   		                            { name: 'inNumLlaTot', index: 'inNumLlaTot', label: 'TOT/Llam', width: '70', align: 'Right', formatter: "currency", formatoptions: { thousandsSeparator: SimMil, decimalPlaces: 0} },
   		                            { name: 'vcDurLlaTot', index: 'vcDurLlaTot', label: 'TOT/Dura.', width: '70', align: 'Center' },
   		                            { name: 'inDurReaLlaTot', index: 'inDurReaLlaTot', label: 'TOT/DuraRea.', sortable: false, hidden: true },
   		                            { name: 'dcCosLlaTot', index: 'dcCosLlaTot', label: 'TOT/Costo', width: '70', align: 'Right', formatter: "currency", formatoptions: { decimalSeparator: SimDec, thousandsSeparator: SimMil, decimalPlaces: parseInt(NumDec)} }
   	                               ];

    var colModelSumFecha = [{ name: 'vcFec', index: 'vcFec', label: 'Fecha', width: '80', frozen: true },
   		                            { name: 'inNumLlaLoc', index: 'inNumLlaLoc', label: 'FIJA/Llam', width: '70', align: 'Right', formatter: "currency", formatoptions: { thousandsSeparator: SimMil, decimalPlaces: 0} },
   		                            { name: 'vcDurLlaLoc', index: 'vcDurLlaLoc', label: 'FIJA/Dura.', width: '70', align: 'Center' },
   		                            { name: 'inDurReaLlaLoc', index: 'inDurReaLlaLoc', label: 'FIJA/DuraRea.', sortable: false, hidden: true },
   		                            { name: 'dcCosLlaLoc', index: 'dcCosLlaLoc', label: 'FIJA/Costo', width: '70', align: 'Right', formatter: "currency", formatoptions: { decimalSeparator: SimDec, thousandsSeparator: SimMil, decimalPlaces: parseInt(NumDec)} },
   		                            { name: 'inNumLlaCel', index: 'inNumLlaCel', label: 'CEL/Llam', width: '70', align: 'Right', formatter: "currency", formatoptions: { thousandsSeparator: SimMil, decimalPlaces: 0} },
   		                            { name: 'vcDurLlaCel', index: 'vcDurLlaCel', label: 'CEL/Dura.', width: '70', align: 'Center' },
   		                            { name: 'inDurReaLlaCel', index: 'inDurReaLlaCel', label: 'CEL/DuraRea.', sortable: false, hidden: true },
   		                            { name: 'dcCosLlaCel', index: 'dcCosLlaCel', label: 'CEL/Costo', width: '70', align: 'Right', formatter: "currency", formatoptions: { decimalSeparator: SimDec, thousandsSeparator: SimMil, decimalPlaces: parseInt(NumDec)} },
   		                            { name: 'inNumLlaDdn', index: 'inNumLlaDdn', label: 'DDN/Llam', hidden: true, width: '70', align: 'Right', formatter: "currency", formatoptions: { thousandsSeparator: SimMil, decimalPlaces: 0} },
   		                            { name: 'vcDurLlaDdn', index: 'vcDurLlaDdn', label: 'DDN/Dura', hidden: true, width: '70', align: 'Center' },
   		                            { name: 'inDurReaLlaDdn', index: 'inDurReaLlaDdn', label: 'DDN/DuraRea.', sortable: false, hidden: true },
   		                            { name: 'dcCosLlaDdn', index: 'dcCosLlaDdn', label: 'DDN/Costo', hidden: true, width: '70', align: 'Right', formatter: "currency", formatoptions: { decimalSeparator: SimDec, thousandsSeparator: SimMil, decimalPlaces: parseInt(NumDec)} },
   		                            { name: 'inNumLlaDdi', index: 'inNumLlaDdi', label: 'DDI/Llam', width: '70', align: 'Right', formatter: "currency", formatoptions: { thousandsSeparator: SimMil, decimalPlaces: 0} },
   		                            { name: 'vcDurLlaDdi', index: 'vcDurLlaDdi', label: 'DDI/Dura.', width: '70', align: 'Center' },
   		                            { name: 'inDurReaLlaDdi', index: 'inDurReaLlaDdi', label: 'DDI/DuraRea.', sortable: false, hidden: true },
   		                            { name: 'dcCosLlaDdi', index: 'dcCosLlaDdi', label: 'DDI/Costo', width: '70', align: 'Right', formatter: "currency", formatoptions: { decimalSeparator: SimDec, thousandsSeparator: SimMil, decimalPlaces: parseInt(NumDec)} },
   		                            { name: 'inNumSRCel', index: 'inNumSRCel', label: 'SRCEL/Num.', sortable: false, hidden: true },
   		                            { name: 'dcCosLlaSRCel', index: 'dcCosLlaSRCel', label: 'SRCEL/Costo', width: '70', align: 'Right', formatter: "currency", formatoptions: { decimalSeparator: SimDec, thousandsSeparator: SimMil, decimalPlaces: parseInt(NumDec)} },
   		                            { name: 'inNumLlaTot', index: 'inNumLlaTot', label: 'TOT/Llam', width: '70', align: 'Right', formatter: "currency", formatoptions: { thousandsSeparator: SimMil, decimalPlaces: 0} },
   		                            { name: 'vcDurLlaTot', index: 'vcDurLlaTot', label: 'TOT/Dura.', width: '70', align: 'Center' },
   		                            { name: 'inDurReaLlaTot', index: 'inDurReaLlaTot', label: 'TOT/DuraRea.', sortable: false, hidden: true },
   		                            { name: 'dcCosLlaTot', index: 'dcCosLlaTot', label: 'TOT/Costo', width: '70', align: 'Right', formatter: "currency", formatoptions: { decimalSeparator: SimDec, thousandsSeparator: SimMil, decimalPlaces: parseInt(NumDec)} }
   	                               ];

    var colModelSumHora = [{ name: 'vcHor', index: 'vcHor', label: 'Hora', width: '100', frozen: true, align: 'Center' },
   		                            { name: 'inNumLlaLoc', index: 'inNumLlaLoc', label: 'FIJA/Llam', width: '70', align: 'Right', formatter: "currency", formatoptions: { thousandsSeparator: SimMil, decimalPlaces: 0} },
   		                            { name: 'vcDurLlaLoc', index: 'vcDurLlaLoc', label: 'FIJA/Dura.', width: '70', align: 'Center' },
   		                            { name: 'inDurReaLlaLoc', index: 'inDurReaLlaLoc', label: 'FIJA/DuraRea.', sortable: false, hidden: true },
   		                            { name: 'dcCosLlaLoc', index: 'dcCosLlaLoc', label: 'FIJA/Costo', width: '70', align: 'Right', formatter: "currency", formatoptions: { decimalSeparator: SimDec, thousandsSeparator: SimMil, decimalPlaces: parseInt(NumDec)} },
   		                            { name: 'inNumLlaCel', index: 'inNumLlaCel', label: 'CEL/Llam', width: '70', align: 'Right', formatter: "currency", formatoptions: { thousandsSeparator: SimMil, decimalPlaces: 0} },
   		                            { name: 'vcDurLlaCel', index: 'vcDurLlaCel', label: 'CEL/Dura.', width: '70', align: 'Center' },
   		                            { name: 'inDurReaLlaCel', index: 'inDurReaLlaCel', label: 'CEL/DuraRea.', sortable: false, hidden: true },
   		                            { name: 'dcCosLlaCel', index: 'dcCosLlaCel', label: 'CEL/Costo', width: '70', align: 'Right', formatter: "currency", formatoptions: { decimalSeparator: SimDec, thousandsSeparator: SimMil, decimalPlaces: parseInt(NumDec)} },
   		                            { name: 'inNumLlaDdn', index: 'inNumLlaDdn', label: 'DDN/Llam', hidden: true, width: '70', align: 'Right', formatter: "currency", formatoptions: { thousandsSeparator: SimMil, decimalPlaces: 0} },
   		                            { name: 'vcDurLlaDdn', index: 'vcDurLlaDdn', label: 'DDN/Dura', hidden: true, width: '70', align: 'Center' },
   		                            { name: 'inDurReaLlaDdn', index: 'inDurReaLlaDdn', label: 'DDN/DuraRea.', sortable: false, hidden: true },
   		                            { name: 'dcCosLlaDdn', index: 'dcCosLlaDdn', label: 'DDN/Costo', hidden: true, width: '70', align: 'Right', formatter: "currency", formatoptions: { decimalSeparator: SimDec, thousandsSeparator: SimMil, decimalPlaces: parseInt(NumDec)} },
   		                            { name: 'inNumLlaDdi', index: 'inNumLlaDdi', label: 'DDI/Llam', width: '70', align: 'Right', formatter: "currency", formatoptions: { thousandsSeparator: SimMil, decimalPlaces: 0} },
   		                            { name: 'vcDurLlaDdi', index: 'vcDurLlaDdi', label: 'DDI/Dura.', width: '70', align: 'Center' },
   		                            { name: 'inDurReaLlaDdi', index: 'inDurReaLlaDdi', label: 'DDI/DuraRea.', sortable: false, hidden: true },
   		                            { name: 'dcCosLlaDdi', index: 'dcCosLlaDdi', label: 'DDI/Costo', width: '70', align: 'Right', formatter: "currency", formatoptions: { decimalSeparator: SimDec, thousandsSeparator: SimMil, decimalPlaces: parseInt(NumDec)} },
   		                            { name: 'inNumSRCel', index: 'inNumSRCel', label: 'SRCEL/Num.', sortable: false, hidden: true },
   		                            { name: 'dcCosLlaSRCel', index: 'dcCosLlaSRCel', label: 'SRCEL/Costo', width: '70', align: 'Right', formatter: "currency", formatoptions: { decimalSeparator: SimDec, thousandsSeparator: SimMil, decimalPlaces: parseInt(NumDec)} },
   		                            { name: 'inNumLlaTot', index: 'inNumLlaTot', label: 'TOT/Llam', width: '70', align: 'Right', formatter: "currency", formatoptions: { thousandsSeparator: SimMil, decimalPlaces: 0} },
   		                            { name: 'vcDurLlaTot', index: 'vcDurLlaTot', label: 'TOT/Dura.', width: '70', align: 'Center' },
   		                            { name: 'inDurReaLlaTot', index: 'inDurReaLlaTot', label: 'TOT/DuraRea.', sortable: false, hidden: true },
   		                            { name: 'dcCosLlaTot', index: 'dcCosLlaTot', label: 'TOT/Costo', width: '70', align: 'Right', formatter: "currency", formatoptions: { decimalSeparator: SimDec, thousandsSeparator: SimMil, decimalPlaces: parseInt(NumDec)} }
   	                               ];

    var colModelSum = { "1": colModelSumOrgaNivel,
        "2": colModelSumOrgaArea,
        "3": colModelSumLinea,
        "4": colModelSumEmpleado,
        "5": colModelSumCCO,
        "6": colModelSumNumero,
        "7": colModelSumFrecuLlam,
        "8": colModelSumOperador,
        "9": colModelSumPais,
        "10": colModelSumCiudad,
        "11": colModelSumFecha,
        "12": colModelSumHora
    };

    window.parent.parent.tbSumario = $("#tbSumario").jqGrid({
        datatype: function () {
            $.ajax({
                url: "Con_SumarioLista.aspx/Listar", //PageMethod
                data: "{'inPagTam':'" + $('#tbSumario').getGridParam("rowNum") + "'," + //Tamaño de pagina
                               "'inPagAct':'" + parseInt($('#tbSumario').getGridParam("page")) + "'," + //Pagina actual
                               "'vcOrdCol':'" + $('#tbSumario').getGridParam("sortname") + "'," + //Nombre de columna ordenado
                               "'vcTipOrdCol':'" + $('#tbSumario').getGridParam("sortorder") + "'," +
                               "'oCriterio':'" + JSON.stringify(window.parent.parent.Criterio) + "'," +
                               "'inTipSum':'" + $('#hdfTipoSumario').val() + "'," +
                               "'vcValSum': '" + $('#hdfValorSumario').val() + "'}", //Tabla
                dataType: "json",
                type: "post",
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    $("#tbSumario")[0].addJSONData(result.d);
                    //$("#tbSumario").jqGrid('setCaption', 'Sumario');
                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });
        },
        jsonReader: //Set the jsonReader to the JQGridJSonResponse squema to bind the data.
                {
                root: "Items",
                page: "PaginaActual",
                total: "TotalPaginas",
                records: "TotalRegistros",
                repeatitems: true,
                cell: "Row",
                id: "ID"
            },
        colModel: colModelSum[$("#hdfTipoSumario").val()],
        pager: "#Paginador", //Pager.
        rowNum: inFilas, // PageSize.
        rowList: ArrayPaginacion, //Variable PageSize DropDownList. 
        viewrecords: true, //Show the RecordCount in the pager.
        multiselect: false,
        rownumbers: true,
        caption: "Sumario",
        shrinkToFit: false,
        height:"100%",
        onRightClickRow: function (rowid, iRow, iCol, e) {
        },
        ondblClickRow: function (id) {
        },
        gridComplete: function () {
            fnDimencionar();
        }
    }).navGrid("#Paginador", { edit: false, add: false, search: false, del: false });

    $("#tbSumario").jqGrid('setFrozenColumns');

    $(window).resize(function () {
        fnDimencionarGrilla();
    });
});


function fnDimencionar() {
    var Ancho = $(window).width();
    var Alto = $(window).height();

    $("#tbSumario").setGridWidth(Ancho - 10);
    //$("#tbSumario").setGridHeight(Alto -90);

}

function NumeroInicialFilas() {

    if (esIe8()) {
        inFilas = Math.floor(($(window).height() - 130) / nuAltoFila);
    }
    else {
        inFilas = Math.floor(($(window).height() - 110) / nuAltoFila);
    }


    ArrayPaginacion.push(inFilas);
    ArrayPaginacion.push(inFilas + inFilas);
    ArrayPaginacion.push(inFilas + inFilas + inFilas);
}