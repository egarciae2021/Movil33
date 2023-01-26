function MOV_CAM_Publicidad() {
    var CarpetaDominio = '';
    //var CarpetaDominio = window.top.$("#hdfCodigoDominio").val() != '' ? '\\' + window.top.$("#hdfCodigoDominio").val() : ''; //10-09-2015 wapuamyta (descomentar para activar el modo cluod)
    var oPublicidad = this;
    var MetodoObtener;
    var IdOper;
    var formato;
    var AceptaArchivos;
    var cargaInicial = true;
    //----------------------------Vista Modelo-----------------------------------------
    this.IdPublicidad = ko.observable(-1);
    this.IdCliente = ko.observable(0);
    this.IdOperador = ko.observable(-1).extend({ required: true });
    this.IdCampana = ko.observable(-1).extend({ required: true });
    this.IdFormato = ko.observable(-1).extend({ required: true });
    this.IdFormatoPrevio = ko.observable(-1).extend({ required: true });
    this.IdEstado = ko.observable(1);
    this.AceptaVariosArchivo = ko.observable(-1);
    this.ExtensionesValida = ko.observable(-1);
    this.MOV_CAM_PublicidadDetalle = ko.observableArray([]);
    this.IdPublicidadEditado = ko.observable(-1);

    this.Inicio = function (IdOperador) {
        this.IdPublicidadEditado(IdOperador);
    }
    this.IdCampana.subscribe(function (value) {
        if (value != "-1" && value != "")
            oPublicidad.ObtenerPorCampana(value);
    });

    this.ExtensionesValida.subscribe(function (value) {
        formato = value;
    });

    this.AceptaVariosArchivo.subscribe(function (value) {
        AceptaArchivos = value;
    });

    this.IdPublicidadEditado.subscribe(function (value) {
//        if (value != "")
//            oPublicidad.Obtener(value);
//        else {
//        }
    });

    this.IdFormatoPrevio.subscribe(function (value) {
        if (oPublicidad.IdFormato() == oPublicidad.IdFormatoPrevio())
            return;
        if (oPublicidad.MOV_CAM_PublicidadDetalle().length > 0) {
            confirmacion("Al cambiar el tipo de formato se quitaran las imagenes cargadas, ¿Desea continuar?", oPublicidad.CambioFormato, oPublicidad.NoCambioFormato, "Confirmación");
        }
        else {
            oPublicidad.IdFormato(value);
            if (value != "-1") {
                oPublicidad.ObtenerFormato(value);
            }
        }
    });

    this.NoCambioFormato = function () {
        $("#ddlFormato").data("kendoComboBox").value(oPublicidad.IdFormato());
        oPublicidad.IdFormatoPrevio(oPublicidad.IdFormato());
    };    

    this.CambioFormato = function () {
        oPublicidad.MOV_CAM_PublicidadDetalle([]);
        $("#ifCargarImagen").show();
        oPublicidad.IdFormato(oPublicidad.IdFormatoPrevio());
        if (oPublicidad.IdFormato() != "-1") {
            oPublicidad.ObtenerFormato(oPublicidad.IdFormato());
        }
    };

    this.IdOperador.subscribe(function (value) {    
//        if (value != "-1")
//            oPublicidad.Inicio($("#ddlOperador").val());
    });

    this.Limpiar = function () {
        this.IdPublicidad(-1);
        this.IdOperador(-1);
        this.IdCampana(-1);
        this.IdFormato(-1);
        this.IdEstado(1);
        this.MOV_CAM_PublicidadDetalle.removeAll();
    };

    this.Cargar = function (p_Publicidad) {
        this.IdPublicidad(p_Publicidad.IdPublicidad);
        this.IdCliente(p_Publicidad.IdCliente);
        this.IdOperador(p_Publicidad.IdOperador);
        $("#ddlFormato").data("kendoComboBox").value(p_Publicidad.IdFormato);
        this.IdFormatoPrevio(p_Publicidad.IdFormato);
        this.IdEstado(p_Publicidad.IdEstado);
        this.MOV_CAM_PublicidadDetalle(p_Publicidad.MOV_CAM_PublicidadDetalle);
    };

    this.CargarFormato = function (p_Publicidad) {
        this.AceptaVariosArchivo(p_Publicidad.AceptaVariosArchivo);
        this.ExtensionesValida(p_Publicidad.ExtensionesValida);

        //        this.MOV_CAM_PublicidadDetalle(p_Publicidad.MOV_CAM_PublicidadDetalle);
        //        AceptaArchivos = p_Publicidad.AceptaVariosArchivo;

        //$("#ifCargarImagen").attr("src", "../../Common/Page/Adm_CargarArchivo.aspx?Formatos=" + p_Publicidad.ExtensionesValida + "&AceptaNArchivos= " + p_Publicidad.AceptaVariosArchivo + "&FormatoTipo=Formato imagen&RutaCarpeta=Images\\Campanas\\Banner\\");
        $("#ifCargarImagen").attr("src", "../../Common/Page/Adm_CargarArchivo.aspx?Formatos=" + p_Publicidad.ExtensionesValida + "&AceptaNArchivos= " + p_Publicidad.AceptaVariosArchivo + "&FormatoTipo=Formato imagen&RutaCarpeta=Images\\Campanas\\Banner" + CarpetaDominio + "\\");

        //        if (p_Publicidad.AceptaVariosArchivo == 0) {
        //            if (oPublicidad.MOV_CAM_PublicidadDetalle().length >= 1) {
        //                $("#ifCargarImagen").hide();
        //            } else {
        //                $("#ifCargarImagen").show();
        //            }
        //        } else {
        //            $("#ifCargarImagen").show();
        //        }
    }

    this.QuitarAdjunto = function (oPublicidadDetalle) {
        oPublicidad.MOV_CAM_PublicidadDetalle.remove(oPublicidadDetalle);
        if (AceptaArchivos == 0) {
            $("#ifCargarImagen").show();
        }
        //establecer nuevos ordenes a imagenes restantes
        for (var i = 0; i < oPublicidad.MOV_CAM_PublicidadDetalle().length; i++) {
            (oPublicidad.MOV_CAM_PublicidadDetalle()[i]).Orden = (i + 1);
        }
        //if (AceptaArchivos == 0) { 
        //    
        //}
        //if ($("#ddlFormato option:selected").text() == "GIF") {
        //    
        //}
    }

    this.SubirImagen = function (oPublicidadDetalle) {
        if (oPublicidadDetalle.Orden > 1) {
            var inOrden = oPublicidadDetalle.Orden;
            (oPublicidad.MOV_CAM_PublicidadDetalle()[inOrden - 1]).Orden = (inOrden - 1);
            (oPublicidad.MOV_CAM_PublicidadDetalle()[inOrden - 2]).Orden = (inOrden);
            oPublicidad.MOV_CAM_PublicidadDetalle.sort(function(left, right) { return left.Orden == right.Orden ? 0 : (left.Orden < right.Orden ? -1 : 1) })
        }
    }

    this.BajarImagen = function (oPublicidadDetalle) {
        if (oPublicidadDetalle.Orden < oPublicidad.MOV_CAM_PublicidadDetalle().length) {
            var inOrden = oPublicidadDetalle.Orden;
            (oPublicidad.MOV_CAM_PublicidadDetalle()[inOrden - 1]).Orden = (inOrden + 1);
            (oPublicidad.MOV_CAM_PublicidadDetalle()[inOrden]).Orden = (inOrden);
            oPublicidad.MOV_CAM_PublicidadDetalle.sort(function (left, right) { return left.Orden == right.Orden ? 0 : (left.Orden < right.Orden ? -1 : 1) })
        }
    }
    //---------------------------------------------------------------------------------

    //----------------------------Modelo-----------------------------------------
    //Se implementa la CRUD, llamadas al servidor, envio y recepcion de datos, 
    //estos metodos podran ser llamados de multiples paginas de forma analoga 
    //como el codebehind llama a los metodos de las clases de la capa de negocio
    this.Guardar = function (p_SatisfactoriaGuardar, p_ErrorGuardar) {
        var Metodo = raiz("P_Movil/Configurar/Cam_Conf_CampanaBanner.aspx/Guardar");
        var Data = {
            p_oPublicidad: ko.toJSON(this) //Serializa JSON MODELO
        };
        MetodoWeb(Metodo, JSON.stringify(Data), p_SatisfactoriaGuardar, p_ErrorGuardar);
    }

    this.ObtenerPorCampana = function (p_IdCampana) {
        var Metodo = raiz("P_Movil/Configurar/Cam_Conf_CampanaBanner.aspx/MostrarPorCampana");
        var Data = {
            IdCampana: p_IdCampana
        };
        MetodoWeb(Metodo, JSON.stringify(Data), this.SatisfactoriaMostrar, null);
    }

    this.ObtenerFormato = function (p_IdFormato, p_SatisfactoriaObtenerFormato, p_ErrorObtener) {
        var Metodo = raiz("P_Movil/Configurar/Cam_Conf_CampanaBanner.aspx/MostrarFormato");
        var Data = {
            p_IdFormato: p_IdFormato
        };
        MetodoObtenerFormato = p_SatisfactoriaObtenerFormato;
        MetodoWeb(Metodo, JSON.stringify(Data), this.SatisfactoriaMostrarFormato, p_ErrorObtener);
    }

    this.SatisfactoriaObtenerPorCampana = function (p_Publicidad) {
        oPublicidad.CargarFormato(p_Publicidad);
    }

    this.SatisfactoriaMostrarFormato = function (p_Publicidad) {
        oPublicidad.CargarFormato(p_Publicidad);
        $(".btnNormal").button({});
        if (MetodoObtenerFormato != null && MetodoObtenerFormato != undefined)
            MetodoObtenerFormato(this);
    }

    this.Obtener = function (p_IdOperador, p_SatisfactoriaObtener, p_ErrorObtener) {
        var Metodo = raiz("P_Movil/Configurar/Cam_Conf_CampanaBanner.aspx/Mostrar");
        var Data = {
            p_IdOperador: p_IdOperador //Serializa JSON MODELO
        };
        MetodoObtener = p_SatisfactoriaObtener;
        MetodoWeb(Metodo, JSON.stringify(Data), this.SatisfactoriaMostrar, p_ErrorObtener);
    }

    this.SatisfactoriaMostrar = function (p_Publicidad) {
        oPublicidad.Cargar(p_Publicidad);
        $(".btnNormal").button({});
        if (MetodoObtener != null && MetodoObtener != undefined)
            MetodoObtener(this);
    }
    //---------------------------------------------------------------------------
};