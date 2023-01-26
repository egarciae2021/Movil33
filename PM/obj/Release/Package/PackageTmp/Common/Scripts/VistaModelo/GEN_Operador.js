function GEN_Operador() {
    var oOperador = this;
    var MetodoObtener;
    //----------------------------Vista Modelo-----------------------------------------
    this.P_inCodOpe = ko.observable(-1);
    this.vcCodOpe = ko.observable("");
    this.vcNomOpe = ko.observable("");
    this.btEst = ko.observable(true);
    this.lstOperador = ko.observableArray([]);
//    this.P_inCodOpe.subscribe(function (value) {
//    });

    this.Listar = function (p_ValorDefecto, p_SatisfactoriaListar, p_ErrorListar) {
        var Metodo = raiz("Common/WebService/General.asmx/ListarOperador");
        var Data = {
            p_ValorDefecto: p_ValorDefecto
        };
        MetodoListar = p_SatisfactoriaListar;
        MetodoWeb(Metodo, JSON.stringify(Data), this.SatisfactoriaListar, p_ErrorListar);
    }
    this.SatisfactoriaListar = function (p_Campana) {
        oOperador.lstOperador(p_Campana);

        if (MetodoObtener != null && MetodoObtener != undefined)
            MetodoObtener(this);
    }
};