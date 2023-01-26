function MOV_CAM_Campana() {
    var oCampana = this;
    var MetodoObtener;
    //----------------------------Vista Modelo-----------------------------------------
    this.IdCampana = ko.observable(-1);
    this.IdCliente = ko.observable(-1);
    this.Codigo = ko.observable("");
    this.CodigoProveedor = ko.observable("");
    this.IdContrato = ko.observable(-1);
    this.Descripcion = ko.observable("");
    this.FechaPreventa = ko.observable("");
    this.FechaInicio = ko.observable("");
    this.FechaFin = ko.observable("");
    //this.MigrarContrato = ko.observable(false);
    this.PreventaNotificacionInicio = ko.observable(false);
    this.PreventaNotificacionDiario = ko.observable(false);
    this.PreventaNotificacionAntesInicio = ko.observable(-1);
    this.PreventaVisualizarEquipo = ko.observable(false);
    this.PreventaPreseleccionarEquipo = ko.observable(false);
    this.NuevoProducto = ko.observable(false);
    this.ModificaProducto = ko.observable(false);
    this.BajaProducto = ko.observable(false);
    this.IdCampanaConfiguracion = ko.observable(-1);
    this.IdCorteConfiguracion = ko.observable(-1);
    this.IdCreditoConfiguracion = ko.observable(-1);
    this.IdEstado = ko.observable(-1);
    this.Vigente = ko.observable(true);

    this.Limpiar = function () {
        this.IdCampana(-1);
        this.IdCliente(-1);
        this.Codigo("");
        this.CodigoProveedor("");
        this.IdContrato(-1);
        this.Descripcion("");
        this.FechaPreventa("");
        this.FechaInicio("");
        this.FechaFin("");
        //this.MigrarContrato(false);
        this.PreventaNotificacionInicio(false);
        this.PreventaNotificacionDiario(false);
        this.PreventaNotificacionAntesInicio(-1);
        this.PreventaVisualizarEquipo(false);
        this.PreventaPreseleccionarEquipo(false);
        this.NuevoProducto(false);
        this.ModificaProducto(false);
        this.BajaProducto(false);
        this.IdCampanaConfiguracion(-1);
        this.IdCorteConfiguracion(-1);
        this.IdCreditoConfiguracion(-1);
        this.IdEstado(-1);
        this.Vigencia(true);
    };

    this.Cargar = function (p_Campana) {
        this.IdCampana(p_Campana.IdCampana);
        this.IdCliente(p_Campana.IdCliente);
        this.Codigo(p_Campana.Codigo);
        this.CodigoProveedor(p_Campana.CodigoProveedor);
        this.IdContrato(p_Campana.IdContrato);
        this.Descripcion(p_Campana.Descripcion);
        this.FechaPreventa(FechaJSON(p_Campana.FechaPreventa));
        this.FechaInicio(FechaJSON(p_Campana.FechaInicio));
        this.FechaFin(FechaJSON(p_Campana.FechaFin));
        //this.MigrarContrato(p_Campana.MigrarContrato);
        this.PreventaNotificacionInicio(p_Campana.PreventaNotificacionInicio);
        this.PreventaNotificacionDiario(p_Campana.PreventaNotificacionDiario);
        this.PreventaNotificacionAntesInicio(p_Campana.PreventaNotificacionAntesInicio);
        this.PreventaVisualizarEquipo(p_Campana.PreventaVisualizarEquipo);
        this.PreventaPreseleccionarEquipo(p_Campana.PreventaPreseleccionarEquipo);
        this.NuevoProducto(p_Campana.NuevoProducto);
        this.ModificaProducto(p_Campana.ModificaProducto);
        this.BajaProducto(p_Campana.BajaProducto);
        this.IdCampanaConfiguracion(p_Campana.IdCampanaConfiguracion);
        this.IdCorteConfiguracion(p_Campana.IdCorteConfiguracion);
        this.IdCreditoConfiguracion(p_Campana.IdCreditoConfiguracion);
        this.IdEstado(p_Campana.IdEstado);
        this.Vigencia(p_Campana.Vigencia);
    };
    //---------------------------------------------------------------------------------

    //----------------------------Modelo-----------------------------------------
    //Se implementa la CRUD, llamadas al servidor, envio y recepcion de datos, 
    //estos metodos podran ser llamados de multiples paginas de forma analoga 
    //como el codebehind llama a los metodos de las clases de la capa de negocio
    this.Guardar = function (p_SatisfactoriaGuardar, p_ErrorGuardar) {
        var Metodo = raiz("P_Movil/Administrar/Mantenimiento/Cam_Mnt_Campana.aspx/Guardar");
        var Data = {
            p_oCampana: ko.toJSON(this) //Serializa JSON MODELO
        };
        MetodoWeb(Metodo, JSON.stringify(Data), p_SatisfactoriaGuardar, p_ErrorGuardar);
    }
    this.Obtener = function (p_IdCampana, p_SatisfactoriaObtener, p_ErrorObtener) {
        var Metodo = raiz("P_Movil/Administrar/Mantenimiento/Cam_Mnt_Campana.aspx/Mostrar");
        var Data = {
            p_IdCampana: p_IdCampana //Serializa JSON MODELO
        };
        MetodoObtener = p_SatisfactoriaObtener;
        MetodoWeb(Metodo, JSON.stringify(Data), this.SatisfactoriaMostrar, p_ErrorObtener);
    }
    this.SatisfactoriaMostrar = function (p_Campana) {
        oCampana.Cargar(p_Campana);
        if (MetodoObtener != null && MetodoObtener != undefined)
            MetodoObtener(this);
    }
    //---------------------------------------------------------------------------
};