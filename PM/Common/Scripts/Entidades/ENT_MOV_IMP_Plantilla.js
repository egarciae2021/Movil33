function ENT_MOV_IMP_Plantilla(P_inCodPla, inCodNum, vcNom, Operador, inTipArc, vcTipArc, btTodHojPla, btVig, inTilTel) {
    this.P_inCodPla = P_inCodPla;
    this.inCodNum = inCodNum;
    this.vcNom = vcNom;
    this.Operador = new ENT_GEN_Operador();
    this.inTipArc = inTipArc;
    this.PlantillaDetalles = [];    
    this.btTodHojPla = btTodHojPla;
    this.btVig = btVig;
    this.inTilTel = inTilTel;
}