function MOV_CAM_CampanaConfiguracion() {
    var oCampanaConfiguracion = this;
    var MetodoObtener;
    //----------------------------Vista Modelo-----------------------------------------
    this.IdCampanaConfiguracion = ko.observable(-1);
    this.IdCliente = ko.observable(0);
    this.CancelarPedido = ko.observable(false);
    this.CancelarPedidoDiasMax = ko.observable("");
    this.CancelarPedidoDiasMaxFin = ko.observable("");
    this.ModificarPedido = ko.observable(false);
    this.ReservarProducto = ko.observable(false);
    this.ReservarProductoDiasMax = ko.observable("");
    this.ReservarProductoDiasMaxFin = ko.observable("");
    this.FormatoCodigo = ko.observable("");
    this.MigrarContrato = ko.observable(false);
    this.LugarEntrega = ko.observable("").extend({ required: true });
    this.GenerarCodigo = ko.observable(false);
    this.IdEstado = ko.observable(1);
    this.IdCampanaConfiguracionEditado = ko.observable(-1);
    this.lstLugarEntrega = ko.observableArray([]);
    //JBALMACEDA 20160624
    this.ElegirLugarEntrega = ko.observable(false);
    this.RenovarPlan = ko.observable(false);

    //JBALMACEDA 20160708 154100
    this.GastosAdministrativos = ko.observable(false);
    this.MontoGastosAdministrativos = ko.observable("");
    this.UsarPlanesDependientes = ko.observable(false);


    //ECONDEÑA  20170714
    this.RenovarContratoVigente = ko.observable(false);
    this.MaximoMesesPermitido = ko.observable("");
    this.SoloLineasContratoVencido = ko.observable(false);
    this.SoloRenovarMontoMayor = ko.observable(false);
    this.MensajeDeRestriccion = ko.observable("");

    this.Inicio = function (IdCampanaConfiguracion) {
        this.IdCampanaConfiguracionEditado(IdCampanaConfiguracion);
    }

    this.IdCampanaConfiguracionEditado.subscribe(function (value) {
        oCampanaConfiguracion.ListarLugarEntrega();
        if (value != "")
            oCampanaConfiguracion.Obtener(value);
        else {
        }
    });

    this.Limpiar = function () {
        this.IdCampanaConfiguracion(-1);
        this.CancelarPedido(false);
        this.CancelarPedidoDiasMax("");
        this.CancelarPedidoDiasMaxFin("");
        this.ModificarPedido(false);
        this.ReservarProducto(false);
        this.ReservarProductoDiasMax("");
        this.ReservarProductoDiasMaxFin("");
        this.FormatoCodigo("");
        this.IdEstado(1);
        this.MigrarContrato(false);
        this.LugarEntrega("");
        this.GenerarCodigo(false);
        this.ElegirLugarEntrega(false);
        this.RenovarPlan(false);

        //        jbalmaceda 20160708 154200
        this.GastosAdministrativos(false);
        this.MontoGastosAdministrativos("");
        this.UsarPlanesDependientes(false);
    };

    this.Cargar = function (p_CampanaConfiguracion) {

        this.IdCampanaConfiguracion(p_CampanaConfiguracion.IdCampanaConfiguracion);
        this.IdCliente(p_CampanaConfiguracion.IdCliente);
        this.CancelarPedido(p_CampanaConfiguracion.CancelarPedido);
        this.CancelarPedidoDiasMax(p_CampanaConfiguracion.CancelarPedidoDiasMax);
        this.CancelarPedidoDiasMaxFin(p_CampanaConfiguracion.CancelarPedidoDiasMaxFin);
        this.ModificarPedido(p_CampanaConfiguracion.ModificarPedido);
        this.ReservarProducto(p_CampanaConfiguracion.ReservarProducto);
        this.ReservarProductoDiasMax(p_CampanaConfiguracion.ReservarProductoDiasMax);
        this.ReservarProductoDiasMaxFin(p_CampanaConfiguracion.ReservarProductoDiasMaxFin);
        this.FormatoCodigo(p_CampanaConfiguracion.FormatoCodigo);
        this.IdEstado(p_CampanaConfiguracion.IdEstado);
        this.MigrarContrato(p_CampanaConfiguracion.MigrarContrato);
        this.LugarEntrega(p_CampanaConfiguracion.LugarEntrega);
        this.GenerarCodigo(p_CampanaConfiguracion.GenerarCodigo);
        this.ElegirLugarEntrega(p_CampanaConfiguracion.ElegirLugarEntrega);
        this.RenovarPlan(p_CampanaConfiguracion.RenovarPlan);

        //        jbalmaceda 20160708 154200
        this.GastosAdministrativos(p_CampanaConfiguracion.GastosAdministrativos);
        this.MontoGastosAdministrativos(p_CampanaConfiguracion.MontoGastosAdministrativos);
        this.UsarPlanesDependientes(p_CampanaConfiguracion.UsarPlanesDependientes);



        oCampanaConfiguracion.CargarEstadoControles(p_CampanaConfiguracion);
    };

    this.CargarEstadoControles = function (p_CampanaConfiguracion) {
//        if (p_CampanaConfiguracion.CancelarPedido == true) {
//            document.getElementById('trCancelarPedidoDiasMax').style.display = '';
//            document.getElementById('trCancelarPedidoDiasMaxFin').style.display = '';
//        } else {
//            document.getElementById('trCancelarPedidoDiasMax').style.display = 'none';
//            document.getElementById('trCancelarPedidoDiasMaxFin').style.display = 'none';
//            $("#txtCancelarPedidoDiasMax").val("");
//            $("#txtCancelarPedidoDiasMaxFin").val("");
//        }
//        if (p_CampanaConfiguracion.ReservarProducto == true) {
//            document.getElementById('trReservarProductoDiasMax').style.display = '';
//            document.getElementById('trReservarProductoDiasMaxFin').style.display = '';
//        } else {
//            document.getElementById('trReservarProductoDiasMax').style.display = 'none';
//            document.getElementById('trReservarProductoDiasMaxFin').style.display = 'none';
//            $("#txtReservarProductoDiasMax").val("");
//            $("#txtReservarProductoDiasMaxFin").val("");
//        }
//        if (p_CampanaConfiguracion.GenerarCodigo == true) {
//            document.getElementById('trFormatoCodigo').style.display = '';
//        } else {
//            document.getElementById('trFormatoCodigo').style.display = 'none';
//            $("#txtFormatoCodigo").val("");
//        }
    };
    //---------------------------------------------------------------------------------

    //----------------------------Modelo-----------------------------------------
    //Se implementa la CRUD, llamadas al servidor, envio y recepcion de datos, 
    //estos metodos podran ser llamados de multiples paginas de forma analoga 
    //como el codebehind llama a los metodos de las clases de la capa de negocio
    this.Guardar = function (p_SatisfactoriaGuardar, p_ErrorGuardar) {
        var Metodo = raiz("P_Movil/Configurar/Cam_Conf_PoliticaCampana.aspx/Guardar");
        var Data = {
            p_oCampanaConfiguracion: ko.toJSON(this) //Serializa JSON MODELO
        };
        MetodoWeb(Metodo, JSON.stringify(Data), p_SatisfactoriaGuardar, p_ErrorGuardar);
    }
    this.Obtener = function (p_IdCampanaConfiguracion, p_SatisfactoriaObtener, p_ErrorObtener) {
        var Metodo = raiz("P_Movil/Configurar/Cam_Conf_PoliticaCampana.aspx/Mostrar");
        var Data = {
            p_IdCampanaConfiguracion: p_IdCampanaConfiguracion //Serializa JSON MODELO
        };
        MetodoObtener = p_SatisfactoriaObtener;
        MetodoWeb(Metodo, JSON.stringify(Data), this.SatisfactoriaMostrar, p_ErrorObtener);
    }
    this.SatisfactoriaMostrar = function (p_CampanaConfiguracion) {
        oCampanaConfiguracion.Cargar(p_CampanaConfiguracion);
        if (MetodoObtener != null && MetodoObtener != undefined)
            MetodoObtener(this);
    }
    this.ListarLugarEntrega = function () {
        var Metodo = raiz("P_Movil/Configurar/Cam_Conf_PoliticaCampana.aspx/ListarLugarEntrega");
        var Data = {};
        MetodoWeb(Metodo, JSON.stringify(Data), this.SatisfactoriaListarLugarEntrega, null);
    }
    this.SatisfactoriaListarLugarEntrega = function (LugarEntrega) {
        oCampanaConfiguracion.lstLugarEntrega(LugarEntrega);
    }
    //---------------------------------------------------------------------------
};
