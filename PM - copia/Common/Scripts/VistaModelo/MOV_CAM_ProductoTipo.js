function MOV_CAM_ProductoTipo() {
    var oProductoTipo = this;
    var MetodoObtener;
    //----------------------------Vista Modelo-----------------------------------------
    this.IdTipoProducto = ko.observable(-1);
    this.IdCliente = ko.observable(-1);
    this.Descripcion = ko.observable("");
    this.IdEntidad = ko.observable(-1);
    this.IdProducto = ko.observable(-1);
    this.ServicioMensual = ko.observable(false);
    this.Ilimitado = ko.observable(false);
    this.IdEstado = ko.observable(-1);
    this.Vigente = ko.observable(true);
    this.IdProductoTipoEditado = ko.observable(-1);
    this.Entidad = new ENT_Entidad();
    this.Producto = new MOV_CAM_Producto();

    this.Inicio = function (IdContrato) {
        this.IdProductoTipoEditado(IdContrato);
        this.Entidad.ListarSoloCampana("<Seleccione una entidad>");
    }

    this.IdProductoTipoEditado.subscribe(function (value) {
        if (value != "")
            oProductoTipo.Obtener(value);
    });

    this.IdEntidad.subscribe(function (value) {
        this.Producto.ListarPorEntidad(value, "<Seleccione un producto>");
    });

    this.Limpiar = function () {
        this.IdTipoProducto(-1);
        this.IdCliente(-1);
        this.Descripcion("");
        this.IdEntidad(-1);
        this.IdCampo(-1);
        this.ServicioMensual(false);
        this.Ilimitado(false);
        this.IdEstado(-1);
        this.Vigente(true);
        this.IdProductoTipoEditado(-1);
    };

    this.Cargar = function (p_ProductoTipo) {
        this.IdTipoProducto(p_ProductoTipo.IdTipoProducto);
        this.IdCliente(p_ProductoTipo.IdCliente);
        this.Descripcion(p_ProductoTipo.Descripcion);
        this.IdEntidad(p_ProductoTipo.IdEntidad);
        this.IdCampo(p_ProductoTipo.IdCampo);
        this.ServicioMensual(p_ProductoTipo.ServicioMensual);
        this.Ilimitado(p_ProductoTipo.Ilimitado);
        this.IdEstado(p_ProductoTipo.IdEstado);
        this.Vigente(p_ProductoTipo.Vigente);
        this.IdProductoTipoEditado(p_ProductoTipo.IdProductoTipoEditado);
    };    
    //----------------------------Modelo-----------------------------------------
    //Se implementa la CRUD, llamadas al servidor, envio y recepcion de datos, 
    //estos metodos podran ser llamados de multiples paginas de forma analoga 
    //como el codebehind llama a los metodos de las clases de la capa de negocio
    this.Guardar = function (p_SatisfactoriaGuardar, p_ErrorGuardar) {
        var Metodo = raiz("P_Movil/Administrar/Mantenimiento/Cam_Mnt_Producto.aspx/Guardar");
        var Data = {
            p_oProductoTipo: ko.toJSON(this) //Serializa JSON MODELO
        };
        MetodoWeb(Metodo, JSON.stringify(Data), p_SatisfactoriaGuardar, p_ErrorGuardar);
    }
    this.Obtener = function (p_IdTipoProducto, p_SatisfactoriaObtener, p_ErrorObtener) {
        var Metodo = raiz("P_Movil/Administrar/Mantenimiento/Cam_Mnt_Producto.aspx/Mostrar");
        var Data = {
            p_IdTipoProducto: p_IdTipoProducto //Serializa JSON MODELO
        };
        MetodoObtener = p_SatisfactoriaObtener;
        MetodoWeb(Metodo, JSON.stringify(Data), this.SatisfactoriaMostrar, p_ErrorObtener);
    }
    this.SatisfactoriaMostrar = function (p_TipoProducto) {
        oProductoTipo.Cargar(p_TipoProducto);
        if (MetodoObtener != null && MetodoObtener != undefined)
            MetodoObtener(this);
    }
    //---------------------------------------------------------------------------
};