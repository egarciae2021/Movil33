function MOV_CAM_CorteConfiguracion() {
    var oCorteConfiguracion = this;
    var MetodoObtener;
    //----------------------------Vista Modelo-----------------------------------------
    this.IdCorteConfiguracion = ko.observable(-1);
    this.IdCliente = ko.observable(0);
    this.IdOperador = ko.observable("").extend({ required: true });
    this.Frecuencia = ko.observable("");
    this.NumeroCortes = ko.observable("");
    this.DiasAntiguedadPedido = ko.observable(0).extend({ required: true });
    this.Correos = ko.observable("");
    this.RutaExportacion = ko.observable("");
    this.NombreArchivo = ko.observable("");
    this.IdEstado = ko.observable(1);
    this.IdCorteConfiguracionEditado = ko.observable(-1);

    this.Inicio = function (IdCorteConfiguracion) {
        this.IdCorteConfiguracionEditado(IdCorteConfiguracion);
    }

    this.IdCorteConfiguracionEditado.subscribe(function (value) {
        if (value != "")
            oCorteConfiguracion.Obtener(value);
        else {
        }
    });

    this.Limpiar = function () {
        this.IdCorteConfiguracion(-1);
        this.IdOperador(-1);
        this.Frecuencia("");
        this.NumeroCortes("");
        this.DiasAntiguedadPedido(0);
        this.Correos("");
        this.RutaExportacion("");
        this.NombreArchivo("");
        this.IdEstado(1);
    };

    this.Cargar = function (p_CorteConfiguracion) {
        this.IdCorteConfiguracion(p_CorteConfiguracion.IdCorteConfiguracion);
        this.IdCliente(p_CorteConfiguracion.IdCliente);
        this.IdOperador(p_CorteConfiguracion.IdOperador);
        this.Frecuencia(p_CorteConfiguracion.Frecuencia);
        this.NumeroCortes(p_CorteConfiguracion.NumeroCortes);
        this.DiasAntiguedadPedido(p_CorteConfiguracion.DiasAntiguedadPedido);
        this.Correos(p_CorteConfiguracion.Correos);
        this.RutaExportacion(p_CorteConfiguracion.RutaExportacion);
        this.NombreArchivo(p_CorteConfiguracion.NombreArchivo);
        this.IdEstado(p_CorteConfiguracion.IdEstado);

        oCorteConfiguracion.CargarEstadoControles(p_CorteConfiguracion);
    };

    this.CargarEstadoControles = function (p_CorteConfiguracion) {
        if (p_CorteConfiguracion.Frecuencia == -1) {
            this.Frecuencia("");
            $("#txtFrecuencia")[0].disabled = true;
        } else
            this.Frecuencia(p_CorteConfiguracion.Frecuencia);
        if (p_CorteConfiguracion.NumeroCortes == -1) {
            this.NumeroCortes("");
            $("#txtNumeroCortes")[0].disabled = true;
        } else
            this.NumeroCortes(p_CorteConfiguracion.NumeroCortes);

    };
    //---------------------------------------------------------------------------------

    //----------------------------Modelo-----------------------------------------
    //Se implementa la CRUD, llamadas al servidor, envio y recepcion de datos, 
    //estos metodos podran ser llamados de multiples paginas de forma analoga 
    //como el codebehind llama a los metodos de las clases de la capa de negocio
    this.Guardar = function (p_SatisfactoriaGuardar, p_ErrorGuardar) {
        var Metodo = raiz("P_Movil/Configurar/Cam_Conf_Cortes.aspx/Guardar");
        var Data = {
            p_oCorteConfiguracion: ko.toJSON(this) //Serializa JSON MODELO
        };
        MetodoWeb(Metodo, JSON.stringify(Data), p_SatisfactoriaGuardar, p_ErrorGuardar);
    }
    this.Obtener = function (p_IdCorteConfiguracion, p_SatisfactoriaObtener, p_ErrorObtener) {
        var Metodo = raiz("P_Movil/Configurar/Cam_Conf_Cortes.aspx/Mostrar");
        var Data = {
            p_IdCorteConfiguracion: p_IdCorteConfiguracion //Serializa JSON MODELO
        };
        MetodoObtener = p_SatisfactoriaObtener;
        MetodoWeb(Metodo, JSON.stringify(Data), this.SatisfactoriaMostrar, p_ErrorObtener);
    }
    this.SatisfactoriaMostrar = function (p_CorteConfiguracion) {
        oCorteConfiguracion.Cargar(p_CorteConfiguracion);
        if (MetodoObtener != null && MetodoObtener != undefined)
            MetodoObtener(this);
    }
    //---------------------------------------------------------------------------
};