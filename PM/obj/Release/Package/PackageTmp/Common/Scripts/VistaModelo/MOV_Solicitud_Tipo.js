function MOV_Solicitud_Tipo() {
    var oSolicitudTipo = this;
    var MetodoObtener;
    //----------------------------Vista Modelo-----------------------------------------
    this.IdSolicitudTipo = ko.observable(-1);
    this.Tabla = ko.observable("").extend({ required: true });
    this.Descripcion = ko.observable("").extend({ required: true });
    this.TablaFisica = ko.observable("");
    this.Activo = ko.observable(1);
    this.CosUsuarioInicio = ko.observable(-1);
    this.CodUsuarioFin = ko.observable(-1);
//    this.MOV_CAM_CampanaCorteDetalle = ko.observableArray([]).extend({ required: true });
//    this.MOV_CAM_CampanaCorteDetallePers = ko.observableArray([]);
    this.IdSolicitudTipoEditado = ko.observable(-1);

    this.Inicio = function (IdSolicitudTipo) {
        this.IdSolicitudTipoEditado(IdSolicitudTipo);
    }

    this.IdSolicitudTipoEditado.subscribe(function (value) {
        if (value != "")
            oSolicitudTipo.Obtener(value);
        else {

        }
    });

//    this.IdCampana.subscribe(function (value) {
//        if (value != "-1" && oCampanaCorte.Situacion() != "-1" && oCampanaCorte.IdCorte() == -1)
//            oCampanaCorte.ListarPedidosIniciales($("#ddlCampana").val(), $("#ddlSituacion").val());
//    });

//    this.Situacion.subscribe(function (value) {
//        if (value != "-1" && oCampanaCorte.IdCampana() != "-1" && oCampanaCorte.IdCorte() == -1)
//            oCampanaCorte.ListarPedidosIniciales($("#ddlCampana").val(), $("#ddlSituacion").val());
//    });

    this.Limpiar = function () {
        this.IdSolicitudTipo(-1);
        this.Tabla("");
        this.Descripcion("");
        this.TablaFisica("");
        this.Activo(1);
        this.CosUsuarioInicio(-1);
        this.CodUsuarioFin(-1);
//        this.MOV_CAM_CampanaCorteDetalle.removeAll();
//        this.MOV_CAM_CampanaCorteDetallePers.removeAll();
    };

    this.Cargar = function (p_CampanaCorte) {
        this.IdSolicitudTipo(p_CampanaCorte.IdSolicitudTipo);
        this.Tabla(p_CampanaCorte.Tabla);
        this.Descripcion(p_CampanaCorte.Descripcion);
        this.TablaFisica(p_CampanaCorte.TablaFisica);
        this.Activo(p_CampanaCorte.Activo);
        this.CosUsuarioInicio(p_CampanaCorte.CosUsuarioInicio);
        this.CodUsuarioFin(p_CampanaCorte.CodUsuarioFin);
//        this.MOV_CAM_CampanaCorteDetalle(p_CampanaCorte.MOV_CAM_CampanaCorteDetalle);
//        this.MOV_CAM_CampanaCorteDetallePers(p_CampanaCorte.MOV_CAM_CampanaCorteDetallePers);
//        oSolicitudTipo.ActualizarGrillaPers();
    };

//    this.ActualizarGrillaPers = function () {
//        if (this.MOV_CAM_CampanaCorteDetallePers().length == 0) {
//            alerta("No hay Pedidos para esta campaña y situación")
//            return;
//        }

//        for (var i = 0; i < this.MOV_CAM_CampanaCorteDetallePers().length; i++) {
//            var datos = this.MOV_CAM_CampanaCorteDetallePers()[i]
//            var DatosPedido = [{
//                'IdDetallePedido': datos.IdDetallePedido,
//                'IdPedido': datos.IdPedido,
//                'NumeroPedido': datos.NumeroPedido,
//                'vcCodCue': datos.IdCuenta,
//                'vcNomCue': datos.vcNomCue,
//                'EMPL_vcNOMEMP': datos.vcNomEmp,
//                'FechaPedido': datos.FechaPedido,
//                'NumeroPedidos': datos.NumeroPedidos,
//                'ORGA_vcNOMORG': datos.vcNomOrg,
//                'CCOS_vcNOMCCO': datos.vcNomCCO,
//                'NomMod': datos.NomMod,
//                'NomPlan': datos.NomPlan,
//                'MontoTotalNoServicios': datos.MontoTotalNoServicios,
//                'MontoTotalServicios': datos.MontoTotalServicios,
//                'MesesContrato': datos.MesesContrato
//            }];
//            oCampanaCorte.AgregarDetalle(-1, DatosPedido[0]);
//        }
//    }

//    this.AgregarDetalle = function (p_IdCorte, p_DatosPedido) {
//        var inAct = 1;
//        var ids = $("#tblPedidosElegidos").jqGrid('getDataIDs');
//        for (var i = 0; i < ids.length; i++) {
//            var datosIni = $("#tblPedidosElegidos").jqGrid('getRowData', ids[i]);
//            if (datosIni.IdDetallePedido == p_DatosPedido.IdDetallePedido) {
//                inAct = 0;
//            }
//        }

//        if (inAct == 1) {
//            $("#tblPedidosElegidos").addRowData(p_DatosPedido.IdDetallePedido, p_DatosPedido);
//            var data = { "IdCorte": p_IdCorte, "IdDetallePedido": p_DatosPedido.IdDetallePedido, "IdCuenta": p_DatosPedido.vcCodCue };
//            this.MOV_CAM_CampanaCorteDetalle.push(data);
//        }
//    }

//    this.QuitarDetalle = function (p_IdDetallePedido) {
//        this.MOV_CAM_CampanaCorteDetalle.remove(
//            function (item) {
//                return item.IdDetallePedido === eval(p_IdDetallePedido)
//            });
//    }

//    this.ObtenerNumeroPedidos = function () {
//        var rows = $("#tblPedidosElegidos").jqGrid('getRowData');
//        inNumeroPedidos = 0;
//        for (var i = 0; i < rows.length; i++) {
//            var row = rows[i];
//            inNumeroPedidos = inNumeroPedidos + eval(rows[i].NumeroPedidos);
//        }
//        this.NumeroPedidos(inNumeroPedidos);
//    }

    //---------------------------------------------------------------------------------

    //----------------------------Modelo-----------------------------------------
    //Se implementa la CRUD, llamadas al servidor, envio y recepcion de datos, 
    //estos metodos podran ser llamados de multiples paginas de forma analoga 
    //como el codebehind llama a los metodos de las clases de la capa de negocio
    this.Guardar = function (p_SatisfactoriaGuardar, p_ErrorGuardar) {
        var Metodo = raiz("P_Movil/Administrar/Solicitudes/Adm_SolicitudesConfiguracion.aspx/Guardar");
        var Data = {
            p_oSolicitudTipo: ko.toJSON(this) //Serializa JSON MODELO
        };
        MetodoWeb(Metodo, JSON.stringify(Data), p_SatisfactoriaGuardar, p_ErrorGuardar);
    }
//    this.Obtener = function (p_IdCorte, p_SatisfactoriaObtener, p_ErrorObtener) {
//        var Metodo = raiz("P_Movil/Administrar/Solicitudes/Adm_SolicitudesConfiguracion.aspx/Mostrar");
//        var Data = {
//            p_IdCorte: p_IdCorte //Serializa JSON MODELO
//        };
//        MetodoObtener = p_SatisfactoriaObtener;
//        MetodoWeb(Metodo, JSON.stringify(Data), this.SatisfactoriaMostrar, p_ErrorObtener);
//    }
//    this.SatisfactoriaMostrar = function (p_CampanaCorte) {
//        oCampanaCorte.Cargar(p_CampanaCorte);
//        $(".btnNormal").button({});
//        if (MetodoObtener != null && MetodoObtener != undefined)
//            MetodoObtener(this);
//    }
//    this.ListarPedidosIniciales = function (vcIdCampana, vcNomSit) {
//        var Metodo = raiz("P_Movil/Administrar/Cam_CortesNuevo.aspx/ListarPedidosIniciales");
//        var Data = {
//            vcIdCampana: vcIdCampana,
//            vcNomSit: vcNomSit
//        };
//        MetodoWeb(Metodo, JSON.stringify(Data), this.SatisfactoriaListarPedidosIniciales, null);
//    }
//    this.SatisfactoriaListarPedidosIniciales = function (Pedidos) {
//        oCampanaCorte.MOV_CAM_CampanaCorteDetallePers(Pedidos.MOV_CAM_CampanaCorteDetallePers);
//        oCampanaCorte.ActualizarGrillaPers();
//    }
//    this.ObtenerDetalles = function (vcPedidos, vcSit) {
//        var Metodo = raiz("P_Movil/Administrar/Cam_CortesNuevo.aspx/ObtenerDetalles");
//        var Data = {
//            vcPedidos: vcPedidos,
//            vcSituacion: vcSit
//        };
//        MetodoWeb(Metodo, JSON.stringify(Data), this.SatisfactoriaObtenerDetalles, null);
//    }
//    this.SatisfactoriaObtenerDetalles = function (Pedidos) {
//        oCampanaCorte.MOV_CAM_CampanaCorteDetallePers(Pedidos.MOV_CAM_CampanaCorteDetallePers);
//        oCampanaCorte.ActualizarGrillaPers();
//    }

    //---------------------------------------------------------------------------
};