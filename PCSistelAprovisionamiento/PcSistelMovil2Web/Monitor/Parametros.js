var Parametro_Servicios = [
    '*PCSistelX*', ''
];

var Parametro_BaseDatos = [
    'MOV_*', '', ''
];

var Parametro_IIS = [
    'PCMX*', 'GFMX*', 'PAYBACKX*',''
];



function matchRuleShort(str, rule) {
    return new RegExp("^" + rule.split("*").join(".*") + "$").test(str);
}
