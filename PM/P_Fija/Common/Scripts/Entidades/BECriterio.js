    function ENT_GEN_Organizacion(P_inCodOrg, vcNomOrg) {
        this.P_inCodOrg = -1;
        this.vcNomOrg = vcNomOrg;
    }



    function BECriterio(P_inCodCri, vcNomCri, btCom, vcFecCrea, inTipCon, vcTipCon, inTipSum, inTipOfiOrg, vcPorDiaIni, vcPorDiaFin, vcPorHorIni, vcPorHorFin, vcPorTieIni, vcPorTieFin, inNumCri, 
                                  vcTab) {

        this.AreaSumario = new ENT_GEN_Organizacion();
        this.Organizaciones = new Array();
       
    }
//});