function ENT_MOV_IMP_PlantillaDetalle(P_inCodPlaDet,inNumHojCal,inTipPla,btSerCam,btTipCam,btAgrCerDDNDDI,dcCanDec,vcSimDec,vcSigImp,dcTasImp,vcSepFec,vcSepHor,vcForFec,inTipSep,vcOtrSep,vcCabIde,
                                      btConNumCel, vcFilIde1, vcFilIde2, vcFilIde3, vcPla, vcForFec1, vcForFec2, vcForFec3, vcExtDef, btIncCos, vcUniDatOri, vcUniDatDes, btVig, F_inCodSerDef,
                                      F_inCodSerPreDef, btActCos, inTipCosteo, inDirNumCel, btCabeceraFecha, vcCabeceraFecha, inDirecFecha, btInsEntrFil1, inCodSerFil1, btInsEntrFil2, inCodSerFil2,
                                      btInsEntrFil3, inCodSerFil3, blUsaPlantillaMultiple) {
    this.P_inCodPlaDet = P_inCodPlaDet;
    this.inNumHojCal = inNumHojCal;
    this.inTipPla = inTipPla;
    this.btSerCam = btSerCam;
    this.btTipCam = btTipCam;
    this.btAgrCerDDNDDI = btAgrCerDDNDDI;
    this.dcCanDec = dcCanDec;
    this.vcSimDec = vcSimDec;
    this.vcSigImp = vcSigImp;
    this.dcTasImp = dcTasImp;
    this.vcSepFec = vcSepFec;
    this.vcSepHor = vcSepHor;
    this.vcForFec = vcForFec;
    this.inTipSep = inTipSep;
    this.vcOtrSep = vcOtrSep;
    this.vcCabIde = vcCabIde;
    this.btConNumCel = btConNumCel;
    this.vcFilIde1 = vcFilIde1;
    this.vcFilIde2 = vcFilIde2;
    this.vcFilIde3 = vcFilIde3;
    this.vcPla = vcPla;
    this.vcForFec1 = vcForFec1;
    this.vcForFec2 = vcForFec2;
    this.vcForFec3 = vcForFec3;
    this.vcExtDef = vcExtDef;
    this.Zona = new ENT_GEN_Zona();
    this.btIncCos = btIncCos;
    this.Campos = [];
    this.vcUniDatOri = vcUniDatOri;
    this.vcUniDatDes = vcUniDatDes;
    this.F_inCodSerDef = F_inCodSerDef;
    this.F_inCodSerPreDef = F_inCodSerPreDef;
    this.btActCos = btActCos;
    this.inTipCosteo = inTipCosteo;

    //JHERRERA 20140809
    this.inDirNumCel = inDirNumCel;
    this.btCabeceraFecha = btCabeceraFecha;
    this.vcCabeceraFecha = vcCabeceraFecha;
    this.inDirecFecha = inDirecFecha;

    //JHERRERA 20141030
    this.btInsEntrFil1 = btInsEntrFil1;
    this.inCodSerFil1 = inCodSerFil1;
    this.btInsEntrFil2 = btInsEntrFil2;
    this.inCodSerFil2 = inCodSerFil2;
    this.btInsEntrFil3 = btInsEntrFil3;
    this.inCodSerFil3 = inCodSerFil3;
    //-->
    this.blUsaPlantillaMultiple = blUsaPlantillaMultiple;
    //JHERRERA 20141103
    this.ServiciosExcluidos = [];
    //-->

    this.PlantillaMultiple = [];
    this.PlantillaCabecera = [];

//            private int _F_inCodSerDef;
//        private int _F_inCodSerPreDef;
//        private Boolean _btActCos;


}