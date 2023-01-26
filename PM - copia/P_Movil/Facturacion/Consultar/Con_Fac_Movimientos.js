var oCulturaUsuario;
$(document).on('ready', function () {

    oCulturaUsuario = window.parent.parent.oCulturaUsuario;

    kendo.culture("es-PE");
    $("#grdMovCliente").kendoGrid({
        //        dataSource: {},
        //        groupable: false,
        //        sortable: true,
        //        navigatable: true,
        height: 300,
        width: 850,
        //        selectable: "single",
        //        reorderable: false,
        //        resizable: true,
        //        pageable: true,
        dataSource: {},
        groupable: false,
        sortable: true,
        navigatable: true,
        columns: [
                {
                    field: "VcFecha",
                    headerAttributes: {
                        "class": "table-header-cell",
                        style: "text-align: center;"
                    },
                    attributes: {
                        "class": "table-cell",
                        style: "text-align: center;"
                    },
                    width: "100px",
                    title: "Fecha"
                },
                {
                    field: "VcConceptoPago",
                    headerAttributes: {
                        "class": "table-header-cell",
                        style: "text-align: center;"
                    },
                    attributes: {
                        "class": "table-cell",
                        style: "text-align: left;"
                    },
                    width: "550px",
                    title: "Concepto"

                },
                {
                    field: "DcMontoPagado",
                    headerAttributes: {
                        "class": "table-header-cell",
                        style: "text-align: center;"
                    },
                    attributes: {
                        "class": "table-cell",
                        style: "text-align: right;"
                    },
                    width: "100px",
                    title: "Monto (" + oCulturaUsuario.Moneda.vcSimMon + ")"
                }],
        pageable: {
            refresh: false,
            pageSizes: false,
            //            numeric: false,
            //            previousNext: false,

            messages: {
                itemsPerPage: "ítems por página",
                display: "{0}-{1} de {2} ítems",
                empty: "",
                first: "Ir a primera página",
                last: "Ir a última página",
                next: "Ir a página siguiente",
                previous: "Ir a página anterior"
            }
        }

    });
    $("#txtValor").keydown(function (event) {
        if (event.keyCode == 13) {
            event.preventDefault();
        }
    });

    Inicio();
    function Inicio() {
        $("#TextBox1").hide();
        $("#tbExportar").hide();
        var admin = $("#hdfAdmin").val();
        if (admin == 0 && $("#hdfOrganizacion").val() == "") {
            $("#grdMov").hide();
            $("#tblUsuario").hide();
            $("tr td .ocul").hide();
            $("#dvContenedorTecRes").hide();
        }

        //JHERRERA 20141015: Validación de datos por defecto
        var _valor = $("#hdfEmpleado").val();
        if (_valor != "") {
            buscarValor_bpTecnicoResponsable = _valor;
            validarDatosAjax_bpTecnicoResponsable = true;
            $('#bpTecnicoResponsable_grid').trigger('reloadGrid');
            if ($("#hdfTecnicoResponsable").val() != "") {
                CargarInfoSaldo();
                CargarGrilla();
            }
        }
        //-->
    }



    //    $("#ddlFiltro").on('change', function (e) {
    //        var valor = this.value;
    //        console.log(valor);
    //        var filtro = $("#txtValor");
    //        if (valor == "") {
    //            filtro.val('');
    //        }

    //    });

    $("#ddlCntMov").on('change', function () {
        var admin = $("#hdfAdmin").val();
        //        var _filtro;
        var _valor;

        if (admin == 1) {
            //            _filtro = $("#ddlFiltro").val();
            _valor = $("#hdfTecnicoResponsable").val();
            cargar_DatosEmpleado(_valor);
        }
        else if (admin == 0) {
            //            _filtro = "b.IdEmpleado";
            _valor = $("#hdfEmpleado").val();
            CargarInfoSaldo();
            CargarGrilla();
        }
    });


    //    $("#btnBuscar").click(function () {

    //        var admin = $("#hdfAdmin").val();
    //        var _filtro;
    //        var _valor;

    //        if (admin == 1) {
    //            _filtro = $("#ddlFiltro").val();
    //            _valor = $("#txtValor").val();
    //            cargar_DatosEmpleado(_filtro, _valor);
    //        }
    //        else if (admin == 0) {
    //            _filtro = "b.IdEmpleado";
    //            _valor = $("#hdfEmpleado").val();
    //            CargarGrilla();
    //        }

    //    });

    $('#btnExcel').click(function () {
        var _filtro = $("#hdfFiltro").val();
        var _valor = $("#hdfValor").val();
        var _cnt = $("#hdfCnt").val();
        var _idSolicitud = $("#ddlSolicitud").val();
        var _adm = $("#hdfAdmin").val();
        var _codEmpleado = $("#lblCodigoEmpleado").text();

        if (_filtro == "" || _filtro == null || _valor == "" || _valor == null || _cnt == "" || _cnt == null || _codEmpleado == null || _codEmpleado == "" || _codEmpleado == "(Desconocido)") {
            //            e.preventDefault();
            alerta("Primero debe buscar por algun filtro");
            return;
        }
        //        else {
        //            fnExportar(_filtro, _valor, _cnt, _adm,_codEmpleado);
        //        }
    });


    //    function fnExportar(_filtro, _valor, _cnt, _adm,_codEmpleado) {
    //        window.location.href = "Con_Fac_Movimientos.aspx?Exportar=1&filtro=" + _filtro + "&valor=" + _valor + "&cnt=" + _cnt + "&adm=" + _adm+"&codEmpleado="+_codEmpleado+"&inTipOri="+$("#hdfinTipOri").val();
    //    }

    function resizeGridKendo() { 


    }

    $(window).resize(function () {
        resizeGridKendo();
    });

});
function fnMostrarDatos(valor) {
    //$("#hdfTecnicoResponsable").val(valor);
    if (valor != "") {
        cargar_DatosEmpleado(valor);
        $("#hdfTecnicoResponsable").val(valor);
    } else {
        cargarDatosDesconocido();
    }
}
function cargarDatosDesconocido() {
    $("#lblCodigoEmpleado").text("(Desconocido)");
    $("#lblNombreEmpleado").text("(Desconocido)");
    $("#lblArea").text("(Desconocido)");
    $("#lblCCosto").text("(Desconocido)");
    $("#spMensaje").text("Los filtros no coinciden");
    $("#spMensaje").css({ color: '#CC0000' });

    var dataSource = new kendo.data.DataSource({
        data: "{}",
        pageSize: 10
    });

    var admin = $("#hdfAdmin").val();
    grilla = $("#grdMovCliente").data("kendoGrid");
    grilla.setDataSource(dataSource);
    $("#tbExportar").hide();
}
function cargar_DatosEmpleado(_valor) {
    $.ajax({
        type: "POST",
        url: "Con_Fac_Movimientos.aspx/getEmpleado",
        data: JSON.stringify({
            'IdEmpleado': _valor,
            "inTipOri": $("#hdfinTipOri").val()
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data.d.P_vcCod != null) {
                $("#spMensaje").text("");
                $("#lblCodigoEmpleado").text(data.d.P_vcCod);
                $("#lblNombreEmpleado").text(data.d.vcNom);
                $("#lblArea").text(data.d.Area.vcNomOrg);
                $("#lblCCosto").text(data.d.CentroCosto.vcNomCenCos);
                CargarInfoSaldo();
                CargarGrilla();

                if (data.d.btVig == true) {
                    $("#spMensaje").text("Empleado activo");
                    $("#spMensaje").css({ color: '#003F59' }); //#4297d7
                } else {
                    $("#spMensaje").text("Empleado cesado");
                    $("#spMensaje").css({ color: '#CC0000' });
                }
            }
            else {
                cargarDatosDesconocido();
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
    }

 function CargarInfoSaldo(){
        var admin = $("#hdfAdmin").val();
        var _valor;

        if (admin == 1) {
            _valor = $("#hdfTecnicoResponsable").val();
        }
        else if (admin == 0) {
            _valor =  $("#hdfEmpleado").val();
        }
        var _cnt = $("#ddlCntMov").val();

        $("#hdfValor").val(_valor);
        $("#hdfCnt").val(_cnt);

        $.ajax({
            type: "POST",
            url: "Con_Fac_Movimientos.aspx/GetInfoSaldo",
            data: JSON.stringify({
                'valor': _valor,
                "inTipOri": $("#hdfinTipOri").val()
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data.d.length > 0) {
                    var Fecha = data.d[0].VcFecha;
                    var Saldo = 0;
                    $("#lblFecha").text(Fecha);


                    if (data.d[0].DcSaldo.indexOf(",") >= 0) {
                        if (window.parent.oCulturaUsuario.vcSimDec.toString() == ',') {
                            Saldo = Saldo + parseFloat(ParseFloatMultiPais(data.d[0].DcSaldo.replace(',', ''), window.parent.oCulturaUsuario));
                        } else {
                            Saldo = Saldo + parseFloat(ParseFloatMultiPais(data.d[0].DcSaldo, window.parent.oCulturaUsuario));
                        }
                        
                    }
                    else {
                        if (window.parent.oCulturaUsuario.vcSimDec.toString() == ',') {
                            Saldo = Saldo + parseFloat(ParseFloatMultiPais(data.d[0].DcSaldo, window.parent.oCulturaUsuario));
                        } else {
                            Saldo = Saldo + parseFloat(data.d[0].DcSaldo);
                        }

                    }
                    //$("#lblSaldo").text(kendo.toString(Saldo, "c" + window.parent.oCulturaUsuario.dcNumDec.toString()));
                    $("#lblSaldo").text(oCulturaUsuario.Moneda.vcSimMon + "" + FormatoNumero(Saldo, window.parent.oCulturaUsuario));
                }
                else {

                    $("#lblFecha").text("(Desconocido)");
                    $("#lblSaldo").text("(Desconocido)");
                    var admin = $("#hdfAdmin").val();
                    if (admin == 0) {
                        $("#spMensaje").text("Usted no ha realizado Movimientos.");
                    }
                    else {
                        $("#spMensaje").text("El empleado no ha realizado Movimientos.");
                    }

                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
 }
 function CargarGrilla() {
        var admin = $("#hdfAdmin").val();
//        var _filtro;
        var _valor;

        if (admin == 1) {
//            _filtro = $("#ddlFiltro").val();
            _valor = $("#hdfTecnicoResponsable").val();
        }
        else if (admin == 0) {
//            _filtro = "EMPL_P_vcCODEMP";
            _valor =  $("#hdfEmpleado").val();
        }
        var _cnt = $("#ddlCntMov").val();

//        $("#hdfFiltro").val(_filtro);
        $("#hdfValor").val(_valor);
        $("#hdfCnt").val(_cnt);

        $.ajax({
            type: "POST",
            url: "Con_Fac_Movimientos.aspx/GetListaMovimientos",
            data: JSON.stringify({
                'valor': _valor,
                'cnt': _cnt,
                "inTipOri": $("#hdfinTipOri").val()
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                var grilla;
                if (data.d.length > 0) {
                    var dataSource = new kendo.data.DataSource({
                        data: data.d,
                        pageSize: _cnt
                    });

                        grilla = $("#grdMovCliente").data("kendoGrid");
                        grilla.setDataSource(dataSource);
                        $("#tbExportar").show();
                }
                else {
 
                   
                     var admin = $("#hdfAdmin").val();
                    if (admin == 0) {
                       $("#spMensaje").text("Usted no ha realizado Movimientos.");
                    }
                    else
                    {
                     $("#spMensaje").text("El empleado no ha realizado Movimientos.");
                    }
//                    var Movimientos={
//                        'VcFecha':"",
//                        "VcConceptoPago":"",
//                        "DcMontoPagado":""
//                    }
                    dataSource = new kendo.data.DataSource({
                        data: "{}",
                        pageSize: _cnt
                    });
                        grilla = $("#grdMovCliente").data("kendoGrid");
                        grilla.setDataSource(dataSource);
                        $("#tbExportar").hide();
                       
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });

    }
