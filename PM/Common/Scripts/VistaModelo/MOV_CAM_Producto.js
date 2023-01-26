function MOV_CAM_Producto() {
    var oProducto = this;
    var MetodoObtener;
    //----------------------------Vista Modelo-----------------------------------------
    this.P_inCod = ko.observable(-1);
    this.vcDes = ko.observable("");
    this.btVig = ko.observable(true);
    this.lstProducto = ko.observableArray([]);

    this.ListarPorEntidad = function (p_IdEntidad, p_ValorDefecto, p_SatisfactoriaListar, p_ErrorListar) {
        var Metodo = raiz("Common/WebService/General.asmx/ProductoListarPorEntidad");
        var Data = {
            p_IdEntidad: p_IdEntidad,
            p_ValorDefecto: p_ValorDefecto
        };
        MetodoListar = p_SatisfactoriaListar;
        MetodoWeb(Metodo, JSON.stringify(Data), this.SatisfactoriaListar, p_ErrorListar);
    }
    this.SatisfactoriaListar = function (p_lstProducto) {
        oProducto.lstProducto(p_lstProducto);

        if (MetodoObtener != null && MetodoObtener != undefined)
            MetodoObtener(this);
    }
};