function MOV_CAM_SubContrato() {
    var oSubContrato = this;
    var MetodoObtener;
    //----------------------------Vista Modelo-----------------------------------------
    this.IdSubContrato = ko.observable(-1);
    this.IdCliente = ko.observable(0);
    this.RutaSubContrato = ko.observable("").extend({ required: true });
    this.IdEstado = ko.observable(1);
    this.IdSubContratoEditado = ko.observable(-1);

    this.RutaSubContratoResumen = ko.observable("").extend({ required: true }); //ECONDEÑA  12/07/2016
    this.IdSubContratoEditadoResumen = ko.observable(-1);

    this.Inicio = function (IdSubContrato) {
        this.IdSubContratoEditado(IdSubContrato);
        //this.IdSubContratoResumenEditado(IdSubContrato);
    };

    this.InicioResumen = function (IdSubContrato) {
        this.IdSubContratoEditadoResumen(IdSubContrato);
    };

    this.IdSubContratoEditado.subscribe(function (value) {
        if (value != "") {
            oSubContrato.Obtener(value);
        }
    });

    this.IdSubContratoEditadoResumen.subscribe(function (value) {
        if (value != "") {
            oSubContrato.ObtenerResumen(value);
        }
    });

    this.Limpiar = function () {
        this.IdSubContrato(-1);
        this.RutaSubContrato("");
        this.IdEstado(1);
        this.RutaSubContratoResumen("");
    };

    this.Cargar = function (p_SubContrato) {
        this.IdSubContrato(p_SubContrato.IdSubContrato);
        this.IdCliente(p_SubContrato.IdCliente);
        this.RutaSubContrato(p_SubContrato.RutaSubContrato);
        this.IdEstado(p_SubContrato.IdEstado);

        oSubContrato.CargarEstadoControles(p_SubContrato);
    };

    this.CargarEstadoControles = function (p_SubContrato) {
        var inPri = p_SubContrato.RutaSubContrato.indexOf("\\");
        var inSeg = p_SubContrato.RutaSubContrato.indexOf(".");
        if (p_SubContrato.RutaSubContrato != "" && p_SubContrato.RutaSubContrato != "NoEncontrado") {
            $("#lblRutaContrato").html(p_SubContrato.RutaSubContrato.substring(inPri, inSeg - inPri + 1));
            $("#ifContrato").attr("src", raiz(p_SubContrato.RutaSubContrato));
        } else {
            $("#btnDescargar").button("option", "disabled", true);
            $("#ifContrato").attr("src", "");
            $("#lblRutaContrato").html("");
            if (p_SubContrato.RutaSubContrato == "NoEncontrado") {
                $("#lblRutaContrato").html("Archivo no encontrado, ha sido movido o eliminado.");
            }
        }
    };

    this.CargarResumen = function (p_SubContrato) {
        this.IdSubContrato(p_SubContrato.IdSubContrato);
        this.IdCliente(p_SubContrato.IdCliente);
        this.RutaSubContratoResumen(p_SubContrato.RutaSubContratoResumen);
        this.IdEstado(p_SubContrato.IdEstado);

        oSubContrato.CargarEstadoControlesResumen(p_SubContrato);
    };

    this.CargarEstadoControlesResumen = function (p_SubContrato) {
        var inPri = p_SubContrato.RutaSubContratoResumen.indexOf("\\");
        var inSeg = p_SubContrato.RutaSubContratoResumen.indexOf(".");
        if (p_SubContrato.RutaSubContratoResumen != "" && p_SubContrato.RutaSubContratoResumen != "NoEncontrado") {
            $("#lblRutaContratoResumen").html(p_SubContrato.RutaSubContratoResumen.substring(inPri, inSeg - inPri + 1));
            $("#ifContratoResumen").attr("src", raiz(p_SubContrato.RutaSubContratoResumen));
        } else {
            $("#btnDescargar").button("option", "disabled", true);
            $("#ifContratoResumen").attr("src", "");
            $("#lblRutaContratoResumen").html("");
            if (p_SubContrato.RutaSubContratoResumen == "NoEncontrado") {
                $("#lblRutaContratoResumen").html("Archivo no encontrado, ha sido movido o eliminado.");
            }
        }
    };
    //---------------------------------------------------------------------------------

    //----------------------------Modelo-----------------------------------------
    //Se implementa la CRUD, llamadas al servidor, envio y recepcion de datos, 
    //estos metodos podran ser llamados de multiples paginas de forma analoga 
    //como el codebehind llama a los metodos de las clases de la capa de negocio
    this.Guardar = function (p_SatisfactoriaGuardar, p_ErrorGuardar) {
        var Metodo = raiz("P_Movil/Configurar/Cam_Conf_ContratoUsuario.aspx/Guardar");
        var Data = {
            p_oSubContrato: ko.toJSON(this) //Serializa JSON MODELO
        };
        MetodoWeb(Metodo, JSON.stringify(Data), p_SatisfactoriaGuardar, p_ErrorGuardar);
    };
    this.Obtener = function (p_IdSubContrato, p_SatisfactoriaObtener, p_ErrorObtener) {
        var Metodo = raiz("P_Movil/Configurar/Cam_Conf_ContratoUsuario.aspx/Mostrar");
        var Data = {
            p_IdSubContrato: p_IdSubContrato //Serializa JSON MODELO
        };
        MetodoObtener = p_SatisfactoriaObtener;
        MetodoWeb(Metodo, JSON.stringify(Data), this.SatisfactoriaMostrar, p_ErrorObtener);
    };
    this.SatisfactoriaMostrar = function (p_SubContrato) {
        oSubContrato.Cargar(p_SubContrato);
        if (MetodoObtener != null && MetodoObtener != undefined) {
            MetodoObtener(this);
        }
    };

    this.ObtenerResumen = function (p_IdSubContrato, p_SatisfactoriaObtener, p_ErrorObtener) {
        var Metodo = raiz("P_Movil/Configurar/Cam_Conf_ContratoUsuarioResumen.aspx/Mostrar");
        var Data = {
            p_IdSubContrato: p_IdSubContrato //Serializa JSON MODELO
        };
        MetodoObtener = p_SatisfactoriaObtener;
        MetodoWeb(Metodo, JSON.stringify(Data), this.SatisfactoriaMostrarResumen, p_ErrorObtener);
    };
    this.SatisfactoriaMostrarResumen = function (p_SubContrato) {
        oSubContrato.CargarResumen(p_SubContrato);
        if (MetodoObtener != null && MetodoObtener != undefined) {
            MetodoObtener(this);
        }
    };
    //---------------------------------------------------------------------------
}
