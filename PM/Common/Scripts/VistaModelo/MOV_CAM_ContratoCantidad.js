function MOV_CAM_ContratoCantidad(){
    var oContratoCantidad = this;
    var MetodoObtener;
    //----------------------------Vista Modelo-----------------------------------------
    this.IdTipoProducto = ko.observable(-1);
    this.Descripcion = ko.observable("");
    this.Cantidad = ko.observable(0);
}