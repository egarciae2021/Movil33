function ENT_MOV_Dispositivo(P_vcCodIMEI, inCodModDis, inEst, vcDes, dtFecIng, dtFecUltCam, dtFecProCam, inNumMesProCam, vcObs, F_inCodTip) {
    this.P_vcCodIMEI = P_vcCodIMEI;
    this.inCodModDis = inCodModDis;
    this.inEst = inEst;
    this.vcDes = vcDes;
    this.dtFecIng = dtFecIng;
    this.dtFecUltCam = dtFecUltCam;
    this.dtFecProCam = dtFecProCam;
    this.inNumMesProCam = inNumMesProCam;
    this.vcObs = vcObs;
    this.ModeloDispositivo = new ENT_MOV_ModeloDispositivo();
    this.F_inCodTip = F_inCodTip;
}