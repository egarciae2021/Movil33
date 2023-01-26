function ENT_MOV_IMP_Campo(P_inCodCam, inPos, inLon, vcDesSer) {
    this.P_inCodCam = P_inCodCam;
    this.inPos = inPos;
    this.inLon = inLon;
    this.vcDesSer = vcDesSer;
    this.Servicio = new ENT_GEN_Servicio();
    this.TipoServicioImportacion = new ENT_MOV_IMP_TipoServicioImportacion();
}