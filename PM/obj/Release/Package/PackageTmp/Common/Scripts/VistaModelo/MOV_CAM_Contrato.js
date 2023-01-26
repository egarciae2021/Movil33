function MOV_CAM_Contrato() {
    var oContrato = this;
    var MetodoObtener;
    //----------------------------Vista Modelo-----------------------------------------
    this.IdContrato = ko.observable(-1);
    this.IdCliente = ko.observable(0);
    this.IdOperador = ko.observable("").extend({ required: true });
    this.Codigo = ko.observable("").extend({ maxLength: 25 });
    this.CodigoProveedor = ko.observable("").extend({ maxLength: 25 });
    this.Descripcion = ko.observable("").extend({ required: true });
    //this.FechaInicio = ko.observable("").extend({ required: true });
    this.FechaInicioAnsi = ko.observable("").extend({ required: true });
    this.FechaFinAnsi = ko.observable("");
    this.Duracion = ko.computed({
        read: function () {
            return FechaDiferenciaDDMMYYYY(this.FechaInicioAnsi(), this.FechaFinAnsi());
        },
        write: function (value) {
        },
        owner: this
    });
    this.RutaContrato = ko.observable("");
    this.RutaContratoTemporal = ko.observable("");
    this.ArchivoOriginal = ko.observable("");
    this.IdContratoConfiguracion = ko.observable(0);
    this.IdEstado = ko.observable(-1);
    this.Vigente = ko.observable("true");
    this.IdContratoEditado = ko.observable(-1);
    this.MOV_CAM_ContratoCantidad = ko.observableArray([]);
    this.MOV_CAM_ContratoTarifa = ko.observableArray([]);    
    this.Inicio = function (IdContrato) {
        this.IdContratoEditado(IdContrato);
    }

    this.IdContratoEditado.subscribe(function (value) {
        if (value != "")
            oContrato.Obtener(value);
        else {
            
        }
    });

    this.Limpiar = function () {
        this.IdOperador(-1);
        this.Codigo("");
        this.CodigoProveedor("");
        this.Descripcion("");
        this.FechaInicioAnsi("");
        this.FechaFinAnsi("");
        this.Duracion(0);
        this.RutaContrato("");
        this.RutaContratoTemporal("");
        this.ArchivoOriginal("");
        this.IdContratoConfiguracion(-1);
        this.IdEstado(-1);
        this.Vigente("true");
        this.IdContratoEditado(-1);
        this.MOV_CAM_ContratoCantidad.removeAll();
        this.MOV_CAM_ContratoTarifa.removeAll();
    };

    this.Cargar = function (p_Contrato) {
        this.IdContrato(p_Contrato.IdContrato);
        this.IdCliente(p_Contrato.IdCliente);
        this.IdOperador(p_Contrato.IdOperador);
        this.Codigo(p_Contrato.Codigo);
        this.CodigoProveedor(p_Contrato.CodigoProveedor);
        this.Descripcion(p_Contrato.Descripcion);
        //this.FechaInicioAnsi(FechaJSON(p_Contrato.FechaInicio));
        //this.FechaFinAnsi(FechaJSON(p_Contrato.FechaFin));
        this.FechaInicioAnsi(FechaJSON(p_Contrato.FechaInicio));
        this.FechaFinAnsi(FechaJSON(p_Contrato.FechaFin));
        this.Duracion(p_Contrato.Duracion);
        this.RutaContrato(p_Contrato.RutaContrato == "NoEncontrado" ? "" : p_Contrato.RutaContrato);
        this.RutaContratoTemporal(p_Contrato.RutaContrato == "NoEncontrado" ? "" : p_Contrato.RutaContratoTemporal);
        this.ArchivoOriginal(p_Contrato.RutaContrato == "NoEncontrado" ? "" : p_Contrato.ArchivoOriginal);
        this.IdContratoConfiguracion(p_Contrato.IdContratoConfiguracion);
        this.IdEstado(p_Contrato.IdEstado);
        this.Vigente(p_Contrato.Vigente);
        this.MOV_CAM_ContratoCantidad(p_Contrato.MOV_CAM_ContratoCantidad);
        this.MOV_CAM_ContratoTarifa(p_Contrato.MOV_CAM_ContratoTarifa);
        if (p_Contrato.Vigente == true) {
            document.getElementById('trEstado').style.display = 'none';
            if (p_Contrato.ExistsCampActivas.toString() == "true") {
                $('#ddlOperador')[0].disabled = true;
                $('#txtFechaInicio')[0].disabled = true;
                $('#txtFechaFin')[0].disabled = true;
            } else {
                $('#ddlOperador')[0].disabled = false;
                $('#txtFechaInicio')[0].disabled = false;
                $('#txtFechaFin')[0].disabled = false;
            }
            this.Vigente(true);
        } else {
            document.getElementById('trEstado').style.display = '';
            if (p_Contrato.ExistsCampActivas.toString() == "true") {
                $('#ddlOperador')[0].disabled = true;
                $('#txtFechaInicio')[0].disabled = true;
                $('#txtFechaFin')[0].disabled = true;
            } else {
                $('#ddlOperador')[0].disabled = false;
                $('#txtFechaInicio')[0].disabled = false;
                $('#txtFechaFin')[0].disabled = false;
            }
            this.Vigente(false);
        }
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
    this.Guardar = function (p_SatisfactoriaGuardar, p_ErrorGuardar)
    {
        var Metodo = raiz("P_Movil/Administrar/Mantenimiento/Cam_Mnt_ContratoOperador.aspx/Guardar");
        this.FechaInicioAnsi = Date2Ansi(this.FechaInicioAnsi());
        this.FechaFinAnsi = Date2Ansi(this.FechaFinAnsi());
        var Data = {
            p_oContrato: ko.toJSON(this) //Serializa JSON MODELO
        };
        MetodoWeb(Metodo, JSON.stringify(Data), p_SatisfactoriaGuardar, p_ErrorGuardar);
    }



    this.Obtener = function (p_IdContrato, p_SatisfactoriaObtener, p_ErrorObtener) {
        var Metodo = raiz("P_Movil/Administrar/Mantenimiento/Cam_Mnt_ContratoOperador.aspx/Mostrar");
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

function Date2Ansi(Fecha)
{
    try
    {
        var Fecha = Fecha.split("/");
        if (Fecha.length > 0) {
            return Fecha[2] + '' + Fecha[1] + '' + Fecha[0];
        } else {
        return Fecha;
        }

        
    }
    catch (e)
    {
        return "";
    }
}