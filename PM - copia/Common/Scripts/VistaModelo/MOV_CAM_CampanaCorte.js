function MOV_CAM_CampanaCorte() {
    var oCampanaCorte = this;
    var MetodoObtener;
    //----------------------------Vista Modelo-----------------------------------------
    this.IdCorte = ko.observable(-1);
    this.IdCampana = ko.observable(-1).extend({ required: true });
    this.NumeroPedidos = ko.observable(0);
    this.Situacion = ko.observable("").extend({ required: true });
    this.MOV_CAM_CampanaCorteDetalle = ko.observableArray([]);
    this.MOV_CAM_CampanaCorteDetallePers = ko.observableArray([]);
    this.IdCampanaCorteEditado = ko.observable(-1);

    this.Inicio = function (IdCorte) {
        this.IdCampanaCorteEditado(IdCorte);
    }

    this.IdCampanaCorteEditado.subscribe(function (value) {
        if (value != "")
            oCampanaCorte.Obtener(value);
        else {

        }
    });

    this.IdCampana.subscribe(function (value) {
        if (value != "-1" && oCampanaCorte.Situacion() != "-1" && oCampanaCorte.IdCorte() == -1)
            oCampanaCorte.ListarPedidosIniciales($("#ddlCampana").val(), $("#ddlSituacion").val());
        else if (value == "-1" && oCampanaCorte.IdCampana() != "-1" || oCampanaCorte.IdCorte() == -1)
            $("#tblPedidosElegidos").jqGrid('clearGridData');
    });

    this.Situacion.subscribe(function (value) {
        if (value != "-1" && oCampanaCorte.IdCampana() != "-1" && oCampanaCorte.IdCorte() == -1)
            oCampanaCorte.ListarPedidosIniciales($("#ddlCampana").val(), $("#ddlSituacion").val());
        else if (value == "-1" && oCampanaCorte.IdCampana() != "-1" || oCampanaCorte.IdCorte() == -1)
            $("#tblPedidosElegidos").jqGrid('clearGridData');
    });

    this.Limpiar = function () {
        this.IdCorte(-1);
        this.IdCampana(-1);
        this.NumeroPedidos(0);
        this.Situacion("");
        this.MOV_CAM_CampanaCorteDetalle.removeAll();
        this.MOV_CAM_CampanaCorteDetallePers.removeAll();
    };

    this.MostrarColumnasNecesarias = function () {
        if (this.Situacion() == "Nuevo") {
            $("#tblPedidosElegidos").jqGrid('hideCol', ["Linea"]);
            $("#tblPedidosElegidos").jqGrid('showCol', ["NomMod"]);
        }
        else if (this.Situacion() == "Baja") {
            $("#tblPedidosElegidos").jqGrid('showCol', ["Linea"]);
            $("#tblPedidosElegidos").jqGrid('hideCol', ["NomMod"]);
        }
        else {
            $("#tblPedidosElegidos").jqGrid('showCol', ["Linea", "NomMod"]);
        }
    }

    this.Cargar = function (p_CampanaCorte) {
        this.IdCorte(p_CampanaCorte.IdCorte);
        this.IdCampana(p_CampanaCorte.IdCampana);
        this.NumeroPedidos(p_CampanaCorte.NumeroPedidos);
        this.Situacion(p_CampanaCorte.Situacion);
        this.MOV_CAM_CampanaCorteDetalle(p_CampanaCorte.MOV_CAM_CampanaCorteDetalle);
        this.MOV_CAM_CampanaCorteDetallePers(p_CampanaCorte.MOV_CAM_CampanaCorteDetallePers);
        //oCampanaCorte.ActualizarGrillaPers();
        oCampanaCorte.MostrarColumnasNecesarias();
    };

    this.ActualizarGrillaPers = function () {
        if (this.MOV_CAM_CampanaCorteDetallePers().length == 0) {
            alerta("No hay Pedidos para esta campaña y situación")
            return;
        }

        for (var i = 0; i < this.MOV_CAM_CampanaCorteDetallePers().length; i++) {
            var datos = this.MOV_CAM_CampanaCorteDetallePers()[i]
            var DatosPedido = [{
                'IdDetallePedido': datos.IdDetallePedido,
                'IdPedido': datos.IdPedido,
                'NumeroPedido': datos.NumeroPedido,
                'vcCodCue': datos.IdCuenta,
                'vcNomCue': datos.vcNomCue,
                'EMPL_vcNOMEMP': datos.vcNomEmp,
                'vcCodEmp': datos.vcCodEmp,
                'FechaPedido': datos.FechaPedido,
                'CodigoPedido': datos.CodigoPedido,
//                'ORGA_vcNOMORG': datos.vcNomOrg,
                'CCOS_vcNOMCCO': datos.vcNomCCO,
                'Linea': datos.Linea,
                'NomMod': datos.NomMod,
                'NomPlan': datos.NomPlan,
                'MontoTotalNoServicios': datos.MontoTotalNoServicios,
                'MontoTotalServicios': datos.MontoTotalServicios,
                'MesesContrato': datos.MesesContrato
            }];
            oCampanaCorte.AgregarDetalle(-1, DatosPedido[0]);
        }

    }

    this.AgregarDetalle = function (p_IdCorte, p_DatosPedido) {
        var inAct = 1;
        var ids = $("#tblPedidosElegidos").jqGrid('getDataIDs');
        for (var i = 0; i < ids.length; i++) {
            var datosIni = $("#tblPedidosElegidos").jqGrid('getRowData', ids[i]);
            if (datosIni.IdDetallePedido == p_DatosPedido.IdDetallePedido) {
                inAct = 0;
            }
        }

        if (inAct == 1) {
            //$("#tblPedidosElegidos").addRowData(p_DatosPedido.IdDetallePedido, p_DatosPedido);
            var data = { "IdCorte": p_IdCorte, "IdDetallePedido": p_DatosPedido.IdDetallePedido, "IdCuenta": p_DatosPedido.vcCodCue };
            this.MOV_CAM_CampanaCorteDetalle.push(data);
        }
    }

    this.QuitarDetalle = function (p_IdDetallePedido) {
        this.MOV_CAM_CampanaCorteDetalle.remove(
            function (item) {
                return item.IdDetallePedido === eval(p_IdDetallePedido)
        });
    }

    this.ObtenerNumeroPedidos = function () {
        var rows = $("#tblPedidosElegidos").jqGrid('getRowData');
        inNumeroPedidos = 0;
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            inNumeroPedidos = inNumeroPedidos + eval(rows[i].NumeroPedidos);
        }
        this.NumeroPedidos(inNumeroPedidos);
    }

    //---------------------------------------------------------------------------------

    //----------------------------Modelo-----------------------------------------
    //Se implementa la CRUD, llamadas al servidor, envio y recepcion de datos, 
    //estos metodos podran ser llamados de multiples paginas de forma analoga 
    //como el codebehind llama a los metodos de las clases de la capa de negocio
    this.Guardar = function (p_SatisfactoriaGuardar, p_ErrorGuardar) {
        var Metodo = raiz("P_Movil/Administrar/Cam_CortesNuevo.aspx/Guardar");
        var Data = {
            p_oCampanaCorte: ko.toJSON(this) //Serializa JSON MODELO
        };
        MetodoWeb(Metodo, JSON.stringify(Data), p_SatisfactoriaGuardar, p_ErrorGuardar);
    }
    this.Obtener = function (p_IdCorte, p_SatisfactoriaObtener, p_ErrorObtener) {
        var Metodo = raiz("P_Movil/Administrar/Cam_CortesNuevo.aspx/Mostrar");
        var Data = {
            p_IdCorte: p_IdCorte, //Serializa JSON MODELO
            inPagTam: $('#tblPedidosElegidos').getGridParam("rowNum"), //Serializa JSON MODELO
            inPagAct: parseInt($('#tblPedidosElegidos').getGridParam("page")) //Serializa JSON MODELO
        };
        MetodoObtener = p_SatisfactoriaObtener;
        MetodoWeb(Metodo, JSON.stringify(Data), this.SatisfactoriaMostrar, p_ErrorObtener);
    }
    this.SatisfactoriaMostrar = function (p_CampanaCorte) {
        oCampanaCorte.Cargar(p_CampanaCorte);
        $(".btnNormal").button({});
        if (MetodoObtener != null && MetodoObtener != undefined)
            MetodoObtener(this);
    }
    this.ListarPedidosIniciales = function (vcIdCampana, vcNomSit) {
        $('#tblPedidosElegidos').setGridParam({ page: 1 }); //.trigger('reloadGrid');
        $("#tblPedidosElegidos").trigger("reloadGrid");

        //        var Metodo = raiz("P_Movil/Administrar/Cam_CortesNuevo.aspx/ListarPedidosIniciales");
        //        var Data = {
        //            vcIdCampana: vcIdCampana,
        //            vcNomSit: vcNomSit
        //        };
        //        MetodoWeb(Metodo, JSON.stringify(Data), this.SatisfactoriaListarPedidosIniciales, null);
    }
//    this.SatisfactoriaListarPedidosIniciales = function (Pedidos) {
//        oCampanaCorte.MOV_CAM_CampanaCorteDetallePers(Pedidos.MOV_CAM_CampanaCorteDetallePers);
//        oCampanaCorte.ActualizarGrillaPers();
//    }
    this.ObtenerDetalles = function (vcPedidos, vcSit) {
        var Metodo = raiz("P_Movil/Administrar/Cam_CortesNuevo.aspx/ObtenerDetalles");
        var Data = {
            vcPedidos: vcPedidos,
            vcSituacion: vcSit
        };
        MetodoWeb(Metodo, JSON.stringify(Data), this.SatisfactoriaObtenerDetalles, null);
    }
    this.SatisfactoriaObtenerDetalles = function (Pedidos) {
        oCampanaCorte.MOV_CAM_CampanaCorteDetallePers(Pedidos.MOV_CAM_CampanaCorteDetallePers);
        oCampanaCorte.ActualizarGrillaPers();
    }

    //---------------------------------------------------------------------------
};