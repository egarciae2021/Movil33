function MOV_CAM_CreditoConfiguracion() {
    var oCreditoConfiguracion = this;
    var MetodoObtener;
    //----------------------------Vista Modelo-----------------------------------------
    this.IdCreditoConfiguracion = ko.observable(-1);
    this.IdCliente = ko.observable(0);
    this.CreditoGrupo = ko.observable("").extend({ required: true });
    this.Cuota = ko.observable("").extend({ required: true }); ;
    this.IdEstado = ko.observable(1);
    this.IdCreditoConfiguracionEditado = ko.observable(-1);
    this.lstAsignacionCredito = ko.observableArray([]);
    this.lstCuota = ko.observableArray([]);

    this.Inicio = function (IdCreditoConfiguracion) {
        this.IdCreditoConfiguracionEditado(IdCreditoConfiguracion);
    }

    this.IdCreditoConfiguracionEditado.subscribe(function (value) {
        oCreditoConfiguracion.ListarAsignacionCredito();
        oCreditoConfiguracion.ListarCuota();
        if (value != "")
            oCreditoConfiguracion.Obtener(value);
        else {
        }
    });

    this.Limpiar = function () {
        this.IdCreditoConfiguracion(-1);
        this.CreditoGrupo("");
        this.Cuota("");
        this.IdEstado(1);
        this.IdCreditoConfiguracionEditado(-1);
    };

    this.Cargar = function (p_CreditoConfiguracion) {
        this.IdCreditoConfiguracion(p_CreditoConfiguracion.IdCreditoConfiguracion);
        this.IdCliente(p_CreditoConfiguracion.IdCliente);
        this.CreditoGrupo(p_CreditoConfiguracion.CreditoGrupo);
        this.Cuota(p_CreditoConfiguracion.Cuota);
        this.IdEstado(p_CreditoConfiguracion.IdEstado);
    };
    //---------------------------------------------------------------------------------

    //----------------------------Modelo-----------------------------------------
    //Se implementa la CRUD, llamadas al servidor, envio y recepcion de datos, 
    //estos metodos podran ser llamados de multiples paginas de forma analoga 
    //como el codebehind llama a los metodos de las clases de la capa de negocio
    this.Guardar = function (p_SatisfactoriaGuardar, p_ErrorGuardar) {
        var Metodo = raiz("P_Movil/Configurar/Cam_Conf_Credito.aspx/Guardar");
        var Data = {
            p_oCreditoConfiguracion: ko.toJSON(this) //Serializa JSON MODELO
        };
        MetodoWeb(Metodo, JSON.stringify(Data), p_SatisfactoriaGuardar, p_ErrorGuardar);
    }
    this.Obtener = function (p_IdCreditoConfiguracion, p_SatisfactoriaObtener, p_ErrorObtener) {
        var Metodo = raiz("P_Movil/Configurar/Cam_Conf_Credito.aspx/Mostrar");
        var Data = {
            p_IdCreditoConfiguracion: p_IdCreditoConfiguracion //Serializa JSON MODELO
        };
        MetodoObtener = p_SatisfactoriaObtener;
        MetodoWeb(Metodo, JSON.stringify(Data), this.SatisfactoriaMostrar, p_ErrorObtener);
    }
    this.SatisfactoriaMostrar = function (p_CreditoConfiguracion) {
        oCreditoConfiguracion.Cargar(p_CreditoConfiguracion);
        if (MetodoObtener != null && MetodoObtener != undefined)
            MetodoObtener(this);
    }
    this.ListarAsignacionCredito = function () {
        var Metodo = raiz("P_Movil/Configurar/Cam_Conf_Credito.aspx/ListarAsignacionCredito");
        var Data = {};
        MetodoWeb(Metodo, JSON.stringify(Data), this.SatisfactoriaListarAsignacionCredito, null);
    }
    this.SatisfactoriaListarAsignacionCredito = function (asignacioncredito) {
        oCreditoConfiguracion.lstAsignacionCredito(asignacioncredito);
    }
    this.ListarCuota = function () {
        var Metodo = raiz("P_Movil/Configurar/Cam_Conf_Credito.aspx/ListarCuota");
        var Data = {};
        MetodoWeb(Metodo, JSON.stringify(Data), this.SatisfactoriaListarCuota, null);
    }
    this.SatisfactoriaListarCuota = function (cuota) {
        oCreditoConfiguracion.lstCuota(cuota);
    }
    //---------------------------------------------------------------------------
};