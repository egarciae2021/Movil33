function ENT_MOV_FAC_Comprobante(IdComprobante, IdEmpleado, IdTipoProceso, IdTipoProducto, Periodo, Periodo1, NumeroCorrelativo, FechaEmision,
                                NumeroSerie, NumeroComprobante, TipoDocumentoIdentidad, NumeroDocumentoIdentidad, FechaEmision, NumeroSerie,
                                NumeroComprobante, TipoDocumentoIdentidad, NumeroDocumentoIdentidad, Nombre, ImporteTotal, IdTipoLinea, NumeroCuenta,
                                EstadoCobro) {
    this.IdComprobante = IdComprobante;
    this.IdEmpleado = IdEmpleado;
    this.IdTipoProceso = IdTipoProceso;
    this.IdTipoProducto = IdTipoProducto;
    this.Periodo = Periodo;
    this.Periodo1 = Periodo1;
    this.NumeroCorrelativo = NumeroCorrelativo;
    this.NumeroDocumentoIdentidad = NumeroDocumentoIdentidad;
    this.FechaEmision = FechaEmision;
    this.NumeroSerie = NumeroSerie;
    this.NumeroComprobante = NumeroComprobante;
    this.TipoDocumentoIdentidad = TipoDocumentoIdentidad;
    this.NumeroDocumentoIdentidad = NumeroDocumentoIdentidad;
    this.Nombre = Nombre;
    this.ImporteTotal = ImporteTotal;
    this.IdTipoLinea = IdTipoLinea;
    this.NumeroCuenta = NumeroCuenta;
    this.EstadoCobro = EstadoCobro;
    this.LstComprobanteDetalle = [];
}