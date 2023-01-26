function MOV_CAM_Contrato() {
    var oContrato = this;
    var MetodoObtener;
    //----------------------------Vista Modelo-----------------------------------------
    this.IdContrato = ko.observable(-1);
    this.IdCliente = ko.observable(0);
    //    this.IdOperador = ko.observable("").extend({ required: true });
    //    this.Codigo = ko.observable("").extend({ maxLength: 25 });
    //    this.CodigoProveedor = ko.observable("").extend({ maxLength: 25 });
    //    this.Descripcion = ko.observable("").extend({ required: true });
    //    this.FechaInicio = ko.observable("").extend({ required: true });
    //    this.FechaFin = ko.observable("");
    //    this.Duracion = ko.computed({
    //        read: function () {
    //            return FechaDiferenciaDDMMYYYY(this.FechaInicio(), this.FechaFin());
    //        },
    //        write: function (value) {
    //        },
    //        owner: this
    //    });
    this.RutaContrato = ko.observable("");
    this.RutaContratoTemporal = ko.observable("");
    this.ArchivoOriginal = ko.observable("");
    //    this.IdContratoConfiguracion = ko.observable(0);
    //    this.IdEstado = ko.observable(0);
    //    this.Vigente = ko.observable(true);
    //    this.IdContratoEditado = ko.observable(-1);
    //    this.MOV_CAM_ContratoCantidad = ko.observableArray([]);
    //    this.MOV_CAM_ContratoTarifa = ko.observableArray([]);

    //    this.Inicio = function (IdContrato) {
    //        this.IdContratoEditado(IdContrato);
    //    }

    //    this.IdContratoEditado.subscribe(function (value) {
    //        if (value != "")
    //            oContrato.Obtener(value);
    //        else {

    //        }
    //    });

    this.Limpiar = function () {
        //        this.IdOperador(-1);
        //        this.Codigo("");
        //        this.CodigoProveedor("");
        //        this.Descripcion("");
        //        this.FechaInicio("");
        //        this.FechaFin("");
        //        this.Duracion(0);
        this.RutaContrato("");
        this.RutaContratoTemporal("");
        this.ArchivoOriginal("");
        //        this.IdContratoConfiguracion(-1);
        //        this.IdEstado(-1);
        //        this.Vigente(true);
        //        this.IdContratoEditado(-1);
        //        this.MOV_CAM_ContratoCantidad.removeAll();
        //        this.MOV_CAM_ContratoTarifa.removeAll();
    };

    this.Cargar = function (p_Contrato) {
        this.IdContrato(p_Contrato.IdContrato);
        this.IdCliente(p_Contrato.IdCliente);
        //        this.IdOperador(p_Contrato.IdOperador);
        //        this.Codigo(p_Contrato.Codigo);
        //        this.CodigoProveedor(p_Contrato.CodigoProveedor);
        //        this.Descripcion(p_Contrato.Descripcion);
        //        this.FechaInicio(FechaJSON(p_Contrato.FechaInicio));
        //        this.FechaFin(FechaJSON(p_Contrato.FechaFin));
        //        this.Duracion(p_Contrato.Duracion);
        this.RutaContrato(p_Contrato.RutaContrato);
        this.RutaContratoTemporal(p_Contrato.RutaContratoTemporal);
        this.ArchivoOriginal(p_Contrato.ArchivoOriginal);
        //        this.IdContratoConfiguracion(p_Contrato.IdContratoConfiguracion);
        //        this.IdEstado(p_Contrato.IdEstado);
        //        this.Vigente(p_Contrato.Vigente);
        //        this.MOV_CAM_ContratoCantidad(p_Contrato.MOV_CAM_ContratoCantidad);
        //        this.MOV_CAM_ContratoTarifa(p_Contrato.MOV_CAM_ContratoTarifa);
    };

    this.QuitarAdjunto = function () {
        this.RutaContrato("");
        this.RutaContratoTemporal("");
        this.ArchivoOriginal("");
    }
    this.AbrirAdjunto = function () {
        window.location.href = raiz("Common/Controladores/DescargarArchivo.ashx?archivo=" + this.RutaContratoTemporal());
    }
    //---------------------------------------------------------------------------------

    //----------------------------Modelo-----------------------------------------
    //Se implementa la CRUD, llamadas al servidor, envio y recepcion de datos, 
    //estos metodos podran ser llamados de multiples paginas de forma analoga 
    //como el codebehind llama a los metodos de las clases de la capa de negocio
    this.Guardar = function (p_SatisfactoriaGuardar, p_ErrorGuardar) {
        var Metodo = raiz("P_Movil/Facturacion/Consultar/Con_Fac_InfoCobros.aspx/Guardar");
        var Data = {
            p_oContrato: ko.toJSON(this) //Serializa JSON MODELO
        };
        MetodoWeb(Metodo, JSON.stringify(Data), p_SatisfactoriaGuardar, p_ErrorGuardar);
    }
    this.Obtener = function (p_IdContrato, p_SatisfactoriaObtener, p_ErrorObtener) {
        var Metodo = raiz("P_Movil/Facturacion/Consultar/Con_Fac_InfoCobros.aspx/Mostrar");
        var Data = {
            p_IdContrato: p_IdContrato //Serializa JSON MODELO
        };
        MetodoObtener = p_SatisfactoriaObtener;
        MetodoWeb(Metodo, JSON.stringify(Data), this.SatisfactoriaMostrar, p_ErrorObtener);
    }
    this.SatisfactoriaMostrar = function (p_Contrato) {
        oContrato.Cargar(p_Contrato);
        if (MetodoObtener != null && MetodoObtener != undefined)
            MetodoObtener(this);
    }
    //---------------------------------------------------------------------------
};

