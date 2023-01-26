//<script type="text/javascript" src="ENT_SEG_Usuario.js"></script>
//document.write("<script type='text/javascript' src='ENT_SEG_Usuario.js'></script>");
//$("head").append('<script type="text/javascript" src="ENT_SEG_Usuario.js"></script>');
//$.getScript("ENT_SEG_Usuario.js", function (data, estado) {
//var ENT_SEG_Usuario : ENT_SEG_Usuario;

function ENT_GEN_Operador(P_inCodOpe, vcCodOpe)
{
    this.P_inCodOpe = P_inCodOpe;
    this.vcCodOpe = vcCodOpe;
}
function ENT_GEN_Empleado(P_vcCod, vcNom)
{
    this.P_vcCod = P_vcCod;
    this.vcNom = vcNom;
}
function ENT_MOV_Linea(P_vcNum)
{
    this.P_vcNum = P_vcNum;
}
function ENT_GEN_Organizacion(P_inCodOrg, vcNomOrg)
{
    this.P_inCodOrg = -1;
    this.vcNomOrg = vcNomOrg;
}
function ENT_GEN_CentroCosto(P_vcCodCenCos, vcNomCenCos)
{
    this.P_vcCodCenCos = P_vcCodCenCos;
    this.vcNomCenCos = vcNomCenCos;
}
function ENT_MOV_Cuenta(P_vcCod, vcNom)
{
    this.P_vcCod = P_vcCod;
    this.vcNom = vcNom;
}
function ENT_MOV_ModeloDispositivo(P_inCod, vcNom)
{
    this.P_inCod = P_inCod;
    this.vcNom = vcNom;
}

function ENT_MOV_Historicos(vcPorDiaIni, vcPorDiaFin, inLinTip, inCodEst, inNumHis)
{
    this.OperadorCuenta = new ENT_GEN_Operador();
    this.CentrosCostos = [];
    this.Empleados = [];
    this.Lineas = [];
    this.Organizaciones = [];
    this.Operadores = [];
    this.Cuentas = [];
    this.Modelos = [];
    this.vcPorDiaIni = vcPorDiaIni;
    this.vcPorDiaFin = vcPorDiaFin;
    this.inLinTip = inLinTip;
    this.inCodEst = inCodEst;
    this.inNumHis = inNumHis;
}
//});