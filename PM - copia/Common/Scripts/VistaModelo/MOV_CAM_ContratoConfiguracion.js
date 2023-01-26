function MOV_CAM_Contrato() {
    var oContratoConfiguracion = this;
    var MetodoObtener;
    //----------------------------Vista Modelo-----------------------------------------
    this.IdContratoConfiguracion = ko.observable(null);
    this.IdCliente = ko.observable(-1);
    this.IdOperador = ko.observable("");
    this.VariosContratosVigentes = ko.observable(false);
    this.UsaCodigo = ko.observable(false);
    this.FormatoCodigo = ko.observable("");
    this.FechaInicio = ko.observable("");
    this.FechaFin = ko.observable("");
    this.IdEstado = ko.observable(-1);
    
    this.Cargar = function (p_Configuracion) {
        this.IdContratoConfiguracion(p_Configuracion.IdContratoConfiguracion);
        this.IdCliente(p_Configuracion.IdCliente);
        this.IdOperador(p_Configuracion.IdOperador);
        this.VariosContratosVigentes(p_Configuracion.VariosContratosVigentes);
        this.UsaCodigo(p_Configuracion.UsaCodigo);
        this.FormatoCodigo(p_Configuracion.FormatoCodigo);
        this.FechaInicio(p_Configuracion.FechaInicio);
        this.FechaFin(p_Configuracion.FechaFin);
        this.IdEstado(p_Configuracion.IdEstado);
    };
    //---------------------------------------------------------------------------------

    //----------------------------Modelo-----------------------------------------
    //Se implementa la CRUD, llamadas al servidor, envio y recepcion de datos, 
    //estos metodos podran ser llamados de multiples paginas de forma analoga 
    //como el codebehind llama a los metodos de las clases de la capa de negocio
    this.Guardar = function (p_SatisfactoriaGuardar, p_ErrorGuardar) {
        var Metodo = raiz("P_Movil/Administrar/Mantenimiento/CAM_Conf_PoliticaContrato.aspx/Guardar");
        var Data = {
            p_oContratoConfiguracion: ko.toJSON(this) //Serializa JSON MODELO
        };
        MetodoWeb(Metodo, JSON.stringify(Data), p_SatisfactoriaGuardar, p_ErrorGuardar);
    }
    this.Obtener = function (p_IdContratoConfiguracion, p_SatisfactoriaObtener, p_ErrorObtener) {
        var Metodo = raiz("P_Movil/Administrar/Mantenimiento/CAM_Conf_PoliticaContrato.aspx/Mostrar");
        var Data = {
            p_IdContratoConfiguracion: p_IdContratoConfiguracion //Serializa JSON MODELO
        };
        MetodoObtener = p_SatisfactoriaObtener;
        MetodoWeb(Metodo, JSON.stringify(Data), this.SatisfactoriaMostrar, p_ErrorObtener);
    }
    this.SatisfactoriaMostrar = function (p_Configuracion) {
        oContratoConfiguracion.Cargar(p_Configuracion);
        if (MetodoObtener != null && MetodoObtener != undefined)
            MetodoObtener(this);
    }
    //---------------------------------------------------------------------------
};