function MOV_CAM_FinanciamientoTipo() {
    var oFinanciamientoTipo = this;
    var MetodoObtener;
    var FinancSituacion = "1";
    //----------------------------Vista Modelo-----------------------------------------
    this.IdTipoFinanciamiento = ko.observable(-1);
    this.IdCliente = ko.observable(0);
    this.Codigo = ko.observable("");
    this.Descripcion = ko.observable("").extend({ required: true });
    this.DescripcionCorta = ko.observable("");
    this.inCodTip = ko.observable(-1); //agregado 13-02-2014 wapumayta

    this.PagoContado = ko.observable();
    this.PeriodoGracia = ko.observable();
    this.CuotasDobles = ko.observable();
    this.MesesCuotasDobles = ko.observable("");
    this.CuotaQuincena = ko.observable(false);
    this.Interes = ko.observable(false);
    this.TipoInteres = ko.observable("");
    this.TasaInteres = ko.observable("");
    this.IdEstado = ko.observable(1);
    this.IdFinanciamientoTipoEditado = ko.observable(-1);
    this.lstTipoInteres = ko.observableArray([]);
    //Pago Contado
    this.MaximoCuotas = ko.observable();
    this.MinimoCuotas = ko.observable();
    this.Cuotas = ko.observable();
    this.MesesCuotas = ko.observable();
    //PeriodoGracia
    this.MaximoMesesPeriodoGracia = ko.observable();
    this.MinimoMesesPeriodoGracia = ko.observable();
    this.MesesPeriodoGracia = ko.observable();
    //Cuota Quincena
    this.MaximoCuotaPrimeraQuincena = ko.observable();
    this.MinimoCuotaPrimeraQuincena = ko.observable();
    this.CuotaPrimeraQuincena = ko.observable();
    //Cuotas Dobles
    this.MaximoCuotas = ko.observable();
    this.MinimoCuotas = ko.observable();



    this.Inicio = function (IdTipoFinanciamiento, Situacion) {
        this.IdFinanciamientoTipoEditado(IdTipoFinanciamiento);
        //if (FinancEnUso == "1") {
        //    enUso = true;
        //}
        FinancSituacion = Situacion;
    }

    this.IdFinanciamientoTipoEditado.subscribe(function (value) {
        oFinanciamientoTipo.ListarTipoInteres();
        if (value != "")
            oFinanciamientoTipo.Obtener(value);
        else {
        }
    });

    this.Limpiar = function () {
        this.IdTipoFinanciamiento(-1);
        this.Codigo("");
        this.Descripcion("");
        this.DescripcionCorta("");
        this.PagoContado(false);
        this.PeriodoGracia(false);
        this.CuotasDobles(false);
        this.MesesCuotasDobles("");
        this.CuotaQuincena(false);
        this.Interes(false);
        this.TipoInteres("");
        this.TasaInteres("");
        this.IdEstado(1);
        //Nuevos
        this.MaximoCuotas = ko.observable('');
        this.MinimoCuotas = ko.observable('');
        this.Cuotas = ko.observable('');
        this.MesesCuotas = ko.observable('');
        this.MaximoMesesPeriodoGracia = ko.observable('');
        this.MinimoMesesPeriodoGracia = ko.observable('');
        this.MesesPeriodoGracia = ko.observable('');
        this.MaximoCuotaPrimeraQuincena = ko.observable('');
        this.MinimoCuotaPrimeraQuincena = ko.observable('');
        this.CuotaPrimeraQuincena = ko.observable('');
        this.MaximoCuotas = ko.observable('');
        this.MinimoCuotas = ko.observable('');
        //13-02-2014
        this.inCodTip = ko.observable(-1);
    };

    this.Cargar = function (p_FinanciamientoTipo) {
        this.IdTipoFinanciamiento(p_FinanciamientoTipo.IdTipoFinanciamiento);
        this.Codigo(p_FinanciamientoTipo.Codigo);
        this.Descripcion(p_FinanciamientoTipo.Descripcion);
        this.DescripcionCorta(p_FinanciamientoTipo.DescripcionCorta);
        this.PagoContado(p_FinanciamientoTipo.PagoContado);
        this.PeriodoGracia(p_FinanciamientoTipo.PeriodoGracia);
        this.CuotasDobles(p_FinanciamientoTipo.CuotasDobles);
        this.MesesCuotasDobles(p_FinanciamientoTipo.MesesCuotasDobles);
        this.CuotaQuincena(p_FinanciamientoTipo.CuotaQuincena);
        this.Interes(p_FinanciamientoTipo.Interes);
        this.TipoInteres(p_FinanciamientoTipo.TipoInteres);
        this.TasaInteres(p_FinanciamientoTipo.TasaInteres);
        this.IdEstado(p_FinanciamientoTipo.IdEstado);
        //Nuevos
        this.MaximoCuotas(p_FinanciamientoTipo.MaximoCuotas);
        this.MinimoCuotas(p_FinanciamientoTipo.MinimoCuotas);
        this.Cuotas(p_FinanciamientoTipo.Cuotas);
        this.MesesCuotas(p_FinanciamientoTipo.MesesCuotas);
        this.MaximoMesesPeriodoGracia(p_FinanciamientoTipo.MaximoMesesPeriodoGracia);
        this.MinimoMesesPeriodoGracia(p_FinanciamientoTipo.MinimoMesesPeriodoGracia);
        this.MesesPeriodoGracia(p_FinanciamientoTipo.MesesPeriodoGracia);
        this.MaximoCuotaPrimeraQuincena(p_FinanciamientoTipo.MaximoCuotaPrimeraQuincena);
        this.MinimoCuotaPrimeraQuincena(p_FinanciamientoTipo.MinimoCuotaPrimeraQuincena);
        this.CuotaPrimeraQuincena(p_FinanciamientoTipo.CuotaPrimeraQuincena);
        this.MaximoCuotas(p_FinanciamientoTipo.MaximoCuotas);
        this.MinimoCuotas(p_FinanciamientoTipo.MinimoCuotas);
        //13-02-2014
        this.inCodTip(p_FinanciamientoTipo.inCodTip);

        oFinanciamientoTipo.CargarEstadoControles(p_FinanciamientoTipo);
    };

    this.CargarEstadoControles = function (p_FinanciamientoTipo) {

        //Pago contado
        if (p_FinanciamientoTipo.PagoContado == true) {
            document.getElementById('trPagoContadoDefinicion').style.display = 'none';
            document.getElementById('trCuotasDobles').style.display = 'none';
            document.getElementById('trCuotaQuincena').style.display = 'none';
            document.getElementById('trIntereses').style.display = 'none';
            document.getElementById('trPagoContadoDefinicionMeses1').style.display = 'none';
            //document.getElementById('trPagoContadoDefinicionMeses2').style.display = 'none';
        } else {
            $("#lstMesesPagoContado").empty();
            if (p_FinanciamientoTipo.MinimoCuotas != '0' && p_FinanciamientoTipo.MaximoCuotas != '0') {
                $($("input[name='rblstPagoContado']")[0]).attr("checked", true);
                document.getElementById('trPagoContadoDefinicionRango').style.display = '';
                $("#txtPagonContado").val('');
            } else if (p_FinanciamientoTipo.Cuotas != '0') {
                $($("input[name='rblstPagoContado']")[1]).attr("checked", true);
                document.getElementById('trPagoContadoDefinicionPredefinido').style.display = '';
                $("#txtPagoContadoMinimo").val('');
                $("#txtPagoContadoMaximo").val('');
            } else if (p_FinanciamientoTipo.MesesCuotas != '') {
                $($("input[name='rblstPagoContado']")[2]).attr("checked", true);
                document.getElementById('trPagoContadoDefinicionMeses1').style.display = '';
                //document.getElementById('trPagoContadoDefinicionMeses2').style.display = '';
                $("#txtPagoContadoMinimo").val('');
                $("#txtPagoContadoMaximo").val('');
                $("#txtPagonContado").val('');
                if (p_FinanciamientoTipo.MesesCuotas != "") {
                    var splMeses = p_FinanciamientoTipo.MesesCuotas.split(",")
                    var arNomMesSelect = [];
                    for (var i = 0; i < splMeses.length; i++) {
                        var vcMes = oFinanciamientoTipo.NombreMes(splMeses[i]).substring(0, 3);
                        //$("#lstMesesPagoContado").append($("<option></option>").attr("value", splMeses[i]).text(vcMes)); //comentado 10/12/2013 wapumayta
                        $("#chkMesCuota-" + splMeses[i]).attr("checked", true);
                        arNomMesSelect.push(vcMes);
                    }
                    arValTipos = splMeses;
                    $("#ddlMesesPagoCuotas").data("kendoComboBox").text(arNomMesSelect.join(",").toString());
                }

                $('#chkPeriodoGracia')[0].disabled = true;
            } else {
                $($("input[name='rblstPagoContado']")[3]).attr("checked", true);
                $("#txtPagoContadoMinimo").val('');
                $("#txtPagoContadoMaximo").val('');
                $("#txtPagonContado").val('');
            }
        }

        //Periodo de gracia
        if (p_FinanciamientoTipo.PeriodoGracia == true) {
            document.getElementById('trPeriodoGraciaNota').style.display = '';
            document.getElementById('trPeriodoGraciaDefinicion').style.display = '';
            if (p_FinanciamientoTipo.MinimoMesesPeriodoGracia != '0' && p_FinanciamientoTipo.MaximoMesesPeriodoGracia != '0') {
                $($("input[name='rblstTipoPeriodoGracia']")[0]).attr("checked", true);
                document.getElementById('trMaximoMesesPeriodoGracia').style.display = '';
                $("#txtMesesPeriodoGracia").val('');
            }
            if (p_FinanciamientoTipo.MesesPeriodoGracia != '0') {
                $($("input[name='rblstTipoPeriodoGracia']")[1]).attr("checked", true);
                document.getElementById('trMesesPeriodoGracia').style.display = '';
                $("#txtMinimoMesesPeriodoGracia").val('');
                $("#txtMaximoMesesPeriodoGracia").val('');
            }
        } else {
            //document.getElementById('#trPeriodoGraciaDefinicion').style.display = 'none';
        }

        //Cuotas dobles
        if (p_FinanciamientoTipo.PagoContado == false && p_FinanciamientoTipo.CuotasDobles == true) {
            //document.getElementById('trMesesCuotasDobles').style.display = '';
            document.getElementById('trMes').style.display = '';
        } else {
            //document.getElementById('trMesesCuotasDobles').style.display = 'none';
            document.getElementById('trMes').style.display = 'none';
            $("#txtMes").val("");
            $("#lstbMesesCuotasDobles").empty();
        }
        $("#lstbMesesCuotasDobles").empty();
        if (p_FinanciamientoTipo.MesesCuotasDobles != "" && p_FinanciamientoTipo.MesesCuotasDobles != null) {
            var splMeses = p_FinanciamientoTipo.MesesCuotasDobles.split(",")
            var arNomMesSelect = [];
            for (var i = 0; i < splMeses.length; i++) {
                var vcMes = oFinanciamientoTipo.NombreMes(splMeses[i]).substring(0, 3);
                //$("#lstbMesesCuotasDobles").append($("<option></option>").attr("value", splMeses[i]).text(vcMes)); //comentado 10-12-2013 wapumayta
                $("#chkMesDobles-" + splMeses[i]).attr("checked", true);
                arNomMesSelect.push(vcMes);
            }
            arMesesCuotasDobles = splMeses;
            $("#ddlMesesCuotasDobles").data("kendoComboBox").text(arNomMesSelect.join(",").toString());
        }

        //Cuotas quincena
        if (p_FinanciamientoTipo.PagoContado == false && p_FinanciamientoTipo.CuotaQuincena == true) {
            document.getElementById('trCuotaQuincenaDefinicion').style.display = '';
            if (p_FinanciamientoTipo.MinimoCuotaPrimeraQuincena != '' && p_FinanciamientoTipo.MinimoCuotaPrimeraQuincena != null && p_FinanciamientoTipo.MaximoCuotaPrimeraQuincena != '' && p_FinanciamientoTipo.MaximoCuotaPrimeraQuincena != null) {
                $($("input[name='rblstTipoCuotaQuincena']")[0]).attr("checked", true);
                document.getElementById('trPorcentajeMaximoCuotaPrimeraQuincena').style.display = '';
            }
            if (p_FinanciamientoTipo.CuotaPrimeraQuincena != '' && p_FinanciamientoTipo.CuotaPrimeraQuincena != null) {
                $($("input[name='rblstTipoCuotaQuincena']")[1]).attr("checked", true);
                document.getElementById('trPorcentajeCuotaPrimeraQuincena').style.display = '';
            }
        } else {
            document.getElementById('trCuotaQuincenaDefinicion').style.display = 'none';
        }

        //Intereses
        if (p_FinanciamientoTipo.PagoContado == false && p_FinanciamientoTipo.Interes == true) {
            document.getElementById('trTipoInteres').style.display = '';
            document.getElementById('trTasaInteres').style.display = '';

        } else {
            document.getElementById('trTipoInteres').style.display = 'none';
            document.getElementById('trTasaInteres').style.display = 'none';

            $("#txtTasaInteres").val("");
        }

        $.uniform.update();

        this.BloquearEdicion(FinancSituacion);
    };

    this.NombreMes = function (pMes) {
        var vcMes = "";

        switch (pMes) {
            case "1":
                return "Enero";
            case "2":
                return "Febrero";
            case "3":
                return "Marzo";
            case "4":
                return "Abril";
            case "5":
                return "Mayo";
            case "6":
                return "Junio";
            case "7":
                return "Julio";
            case "8":
                return "Agosto";
            case "9":
                return "Setiembre";
            case "10":
                return "Octubre";
            case "11":
                return "Noviembre";
            case "12":
                return "Diciembre";
        }
    }

    //---------------------------------------------------------------------------------

    //----------------------------Modelo-----------------------------------------
    //Se implementa la CRUD, llamadas al servidor, envio y recepcion de datos, 
    //estos metodos podran ser llamados de multiples paginas de forma analoga 
    //como el codebehind llama a los metodos de las clases de la capa de negocio
    this.Guardar = function (p_SatisfactoriaGuardar, p_ErrorGuardar) {
        var Metodo = raiz("P_Movil/Administrar/Mantenimiento/Cam_Mnt_Financiamiento.aspx/Guardar");
        var Data = {
            p_oFinanciamientoTipo: ko.toJSON(this) //Serializa JSON MODELO
        };
        MetodoWeb(Metodo, JSON.stringify(Data), p_SatisfactoriaGuardar, p_ErrorGuardar);
    }
    this.Obtener = function (p_IdTipoFinanciamiento, p_SatisfactoriaObtener, p_ErrorObtener) {
        var Metodo = raiz("P_Movil/Administrar/Mantenimiento/Cam_Mnt_Financiamiento.aspx/Mostrar");
        var Data = {
            p_IdTipoFinanciamiento: p_IdTipoFinanciamiento //Serializa JSON MODELO
        };
        MetodoObtener = p_SatisfactoriaObtener;
        MetodoWeb(Metodo, JSON.stringify(Data), this.SatisfactoriaMostrar, p_ErrorObtener);
    }
    this.SatisfactoriaMostrar = function (p_FinanciamientoTipo) {
        oFinanciamientoTipo.Cargar(p_FinanciamientoTipo);
        if (MetodoObtener != null && MetodoObtener != undefined)
            MetodoObtener(this);
    }
    this.ListarTipoInteres = function () {
        var Metodo = raiz("P_Movil/Administrar/Mantenimiento/Cam_Mnt_Financiamiento.aspx/ListarTipoInteres");
        var Data = {};
        MetodoWeb(Metodo, JSON.stringify(Data), this.SatisfactoriaListarTipoInteres, null);
    }
    this.SatisfactoriaListarTipoInteres = function (TipoInteres) {
        oFinanciamientoTipo.lstTipoInteres(TipoInteres);
    }

    //---------------------------------------------------------------------------

    //nuevo
    this.BloquearEdicion = function (situacion) {
        //alert("bloquear - " + bloqueado);
        //if ($(".btnNormal").length > 0)
        //    $(".btnNormal").button("option", "disabled", bloqueado);

        //INFO TIPOS
        //1 = permite edicion
        //0 = informacion, controles deshabilitados, sin botones
        //2 = financiamiento no se puede editar, boton guardar deshabilitado, muestra mensaje

        if (situacion == "0") {
            $("input").attr("disabled", "disabled");
            $("select").attr("disabled", "disabled");
            $("textarea").attr("disabled", "disabled");
            $("#dvAcciones").hide();

            $("#dvMesesPagoCuotas").hide();
            $("#txtMesesPagoCuotas").val($("#ddlMesesPagoCuotas")[0].value);
            $("#dvTexMesesPagoCuotas").show();

        } else if (situacion == "2") {
            $("input").attr("disabled", "disabled");
            $("select").attr("disabled", "disabled");
            $("textarea").attr("disabled", "disabled");
            $("#btnGuardar").button("option", "disabled", true);
            $("#dvMensaje").show();
            $("#lblMensaje").text("No se puede editar el financiamiento por que está siendo usado en un tipo de solicitud.");

            $("#dvMesesPagoCuotas").hide();
            $("#txtMesesPagoCuotas").val($("#ddlMesesPagoCuotas")[0].value);
            $("#dvTexMesesPagoCuotas").show();



            //            var combobox = $("#ddlMesesPagoCuotas").data("kendoComboBox");
            //            combobox.enable(false);
            //            //            $("#ddlMesesPagoCuotas").kendoComboBox({ enabled: false });
            //            $("#ddlMesesPagoCuotas").attr("disabled", "disabled");
        }
        //else {
        //    $("input").removeAttr("disabled");
        //    $("select").removeAttr("disabled");
        //    $("textarea").removeAttr("disabled");
        //}
        $.uniform.update();
    }
};

