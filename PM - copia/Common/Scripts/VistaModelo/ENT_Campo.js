function ENT_Campo() {
    var oCampo = this;
    var MetodoObtener;
    //----------------------------Vista Modelo-----------------------------------------
    this.P_inCod = ko.observable(-1);
    this.F_inCodEnt = ko.observable(-1);
    this.vcNom = ko.observable("");
    this.vcNomAlias = ko.observable("");
    this.vcDes = ko.observable("");
    this.vcTab = ko.observable("");
    this.F_inTipDat = ko.observable(-1);
    this.btVig = ko.observable(true);
    this.lstCampo = ko.observableArray([]);

    this.P_inCod.subscribe(function (value) {
    });

    this.ListarPorEntidad = function (p_IdEntidad, p_ValorDefecto, p_SatisfactoriaListar, p_ErrorListar) {
        var Metodo = raiz("Common/WebService/General.asmx/CampoListarPorEntidad");
        var Data = {
            p_IdEntidad: p_IdEntidad,
            p_ValorDefecto: p_ValorDefecto
        };
        MetodoListar = p_SatisfactoriaListar;
        MetodoWeb(Metodo, JSON.stringify(Data), this.SatisfactoriaListar, p_ErrorListar);
    }
    this.SatisfactoriaListar = function (p_lstCampo) {
        oCampo.lstCampo(p_lstCampo);

        if (MetodoObtener != null && MetodoObtener != undefined)
            MetodoObtener(this);
    }
};