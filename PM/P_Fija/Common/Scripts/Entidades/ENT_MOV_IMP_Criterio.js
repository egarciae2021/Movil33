//<script type="text/javascript" src="ENT_SEG_Usuario.js"></script>
//document.write("<script type='text/javascript' src='ENT_SEG_Usuario.js'></script>");
//$("head").append('<script type="text/javascript" src="ENT_SEG_Usuario.js"></script>');
//$.getScript("ENT_SEG_Usuario.js", function (data, estado) {
//var ENT_SEG_Usuario : ENT_SEG_Usuario;

    function ENT_SEG_Usuario(P_inCod, vcNom) {
        this.P_inCod = P_inCod;
        this.vcNom = vcNom;
    }
    function ENT_GEN_Nivel(P_inCodNiv, vcNomNiv) {
        this.P_inCodNiv = P_inCodNiv;
        this.vcNomNiv = vcNomNiv;
    }
    function ENT_GEN_Empleado(P_vcCod, vcNom) {
        this.P_vcCod = P_vcCod;
        this.vcNom = vcNom;
    }
    function ENT_MOV_Linea(P_vcNum) {
        this.P_vcNum = P_vcNum;
    }
    function ENT_GEN_Organizacion(P_inCodOrg, vcNomOrg) {
        this.P_inCodOrg = -1;
        this.vcNomOrg = vcNomOrg;
    }
    function ENT_GEN_CentroCosto(P_vcCodCenCos, vcNomCenCos) {
        this.P_vcCodCenCos = P_vcCodCenCos;
        this.vcNomCenCos = vcNomCenCos;
    }
    function ENT_GEN_Pais(P_vcCodPai, vcNomPai) {
        this.P_vcCodPai = P_vcCodPai;
        this.vcNomPai = vcNomPai;
    }
    function ENT_GEN_ServicioGlobal(P_vcCod, vcNom) {
        this.P_vcCod = P_vcCod;
        this.vcNom = vcNom;
    }
    function ENT_GEN_Servicio(P_inCod, vcNom) {
        this.P_inCod = P_inCod;
        this.vcNom = vcNom;
    }
    function ENT_MOV_IMP_TipoLlamada(P_inCod, vcNom) {
        this.P_inCod = P_inCod;
        this.vcNom = vcNom;
    }
    function ENT_MOV_IMP_TipoTelefonia(P_inCod, vcNom) {
        this.P_inCod = P_inCod;
        this.vcNom = vcNom;
    }
    function ENT_GEN_Operador(P_inCodOpe, vcCodOpe) {
        this.P_inCodOpe = P_inCodOpe;
        this.vcCodOpe = vcCodOpe;
    }
    function ENT_GEN_Ciudad(P_vcCodCiu, vcNomCiu) {
        this.P_vcCodCiu = P_vcCodCiu;
        this.vcNomCiu = vcNomCiu;
    }
    function ENT_GEN_Empresa(P_vcCodEmp, vcRazSoc) {
        this.P_vcCodEmp = P_vcCodEmp;
        this.vcRazSoc = vcRazSoc;
    }
    function ENT_GEN_Sucursal(P_vcCod, vcNom) {
        this.P_vcCod = P_vcCod;
        this.vcNom = vcNom;
    }
    function ENT_MOV_Cuenta(P_vcCod, vcNom) {
        this.P_vcCod = P_vcCod;
        this.vcNom = vcNom;
    }
    function ENT_MOV_IMP_Criterio(P_inCodCri, vcNomCri, btCom, vcFecCrea, inTipCon, vcTipCon, inTipSum, inTipOfiOrg, vcPorDiaIni, vcPorDiaFin, vcPorHorIni, vcPorHorFin, vcPorTieIni, vcPorTieFin, inNumCri, 
                                  vcTab, vcNomTab) {
        this.P_inCodCri = P_inCodCri;
        this.vcNomCri = vcNomCri;
        this.Usuario = new ENT_SEG_Usuario();
        this.btCom = btCom;
        this.vcFecCrea = vcFecCrea;
        this.inTipCon = inTipCon;
        this.vcTipCon = vcTipCon;
        this.inTipSum = inTipSum;
        this.NivelSumario = new ENT_GEN_Nivel();
        this.AreaSumario = new ENT_GEN_Organizacion();
        this.PaisSumario = new ENT_GEN_Pais();
        this.NivelRanking = new ENT_GEN_Nivel();
        this.Empleados = [];
        this.Lineas = [];
        this.inTipOfiOrg = inTipOfiOrg;
        this.Organizaciones = [];
        this.CentrosCostos = [];
        this.vcPorDiaIni = vcPorDiaIni;
        this.vcPorDiaFin = vcPorDiaFin;
        this.vcPorHorIni = vcPorHorIni;
        this.vcPorHorFin = vcPorHorFin;
        this.vcPorTieIni = vcPorTieIni;
        this.vcPorTieFin = vcPorTieFin;
        this.Global = new ENT_GEN_ServicioGlobal();
        this.Servicios = [];
        this.Numeros = [];
        this.Paises = [];
        this.Ciudades = [];
        this.Empresas = [];
        this.Operadores = [];
        this.TipoLlamada = new ENT_MOV_IMP_TipoLlamada();
        this.TipoTelefonia = new ENT_MOV_IMP_TipoTelefonia();
        this.SucursalesOrigen = [];
        this.OperadorCuenta = new ENT_GEN_Operador();
        this.Cuentas = [];
        this.inNumCri = inNumCri;
        this.vcTab = vcTab;
        this.vcNomTab = vcNomTab;
    }
//});