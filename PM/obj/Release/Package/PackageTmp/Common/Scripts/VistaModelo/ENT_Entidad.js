function ENT_Entidad() {
    var oEntidad = this;
    var MetodoObtener;
    //----------------------------Vista Modelo-----------------------------------------
    this.P_inCod = ko.observable(-1);
    this.vcTab = ko.observable("");
    this.vcDes = ko.observable("");
    this.btCam = ko.observable(false);
    this.btVig = ko.observable(true);
    this.lstEntidad = ko.observableArray([]);

    this.P_inCod.subscribe(function (value) {
        
    });
    
    this.ListarSoloCampana = function (p_ValorDefecto, p_SatisfactoriaListar, p_ErrorListar) {
        var Metodo = raiz("Common/WebService/General.asmx/EntidadListarSoloCampana");
        var Data = {
            p_ValorDefecto: p_ValorDefecto
        };
        MetodoListar = p_SatisfactoriaListar;
        MetodoWeb(Metodo, JSON.stringify(Data), this.SatisfactoriaListar, p_ErrorListar);
    }
    this.SatisfactoriaListar = function (p_lstEntidad) {
        oEntidad.lstEntidad(p_lstEntidad);

        if (MetodoObtener != null && MetodoObtener != undefined)
            MetodoObtener(this);
    }
};