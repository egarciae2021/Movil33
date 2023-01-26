function MOV_CAM_ContratoTarifa(){
    var oContratoTarifa = this;
    var MetodoObtener;
    //----------------------------Vista Modelo-----------------------------------------
    this.IdTipoProducto = ko.observable(-1);
    this.IdTipoProductoAsociado = ko.observable(-1);
    this.Descripcion = ko.observable("");
    this.Tarifa = ko.observable(0);
}