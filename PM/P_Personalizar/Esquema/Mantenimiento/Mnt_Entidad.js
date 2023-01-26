
$(function () {
    var indiceTab = 0; //window.parent.tab.tabs("option", "selected");
    var pagina = "";
    var NumeroOpcion = 1;
    var Titulo = "Nueva Opcion";
    var Opcion = "";
    var CargoItem = false;
    var lstTablas;
    var lstCampos;
    var Tabla;

    IniciarPagina();
    $(".btnNormal").button();

    function IniciarPagina() {
        $("#ddlTipoOrigen").focus();
        //    $(".tdEtiqueta").css("width", "80px");
    }

    CargarTiposDatos();

    $("#tblCampo").jqGrid({
        datatype: "local",
        colModel: [
        { name: 'P_inCod', index: 'P_inCod', label: 'Codigo', width: 60, hidden: true },
        { name: 'F_inCodEnt', index: 'F_inCodEnt', label: 'Codigo Entidad', width: 60, hidden: true },
        { name: 'inOrd', index: 'inOrd', label: 'Orden', width: 35 },
        { name: 'vcNom', index: 'vcNom', label: 'Nombre', width: 100 },
        { name: 'vcNomAlias', index: 'vcNomAlias', label: 'Alias', width: 100 },
        { name: 'vcDes', index: 'vcDes', label: 'Descripcion', width: 150 },
                { name: 'vcTab', index: 'vcTab', label: 'Tabla', width: 150 },
                { name: 'vcForKey', index: 'vcForKey', label: 'vcForKey', width: 100, hidden: true },
                { name: 'vcTabFor', index: 'vcTabFor', label: 'Tabla Foranea', width: 100 },
                { name: 'vcPriKeyFor', index: 'vcPriKeyFor', label: 'vcPriKeyFor', width: 100, hidden: true },
                { name: 'btOrd', index: 'btOrd', label: 'btOrd', width: 30, hidden: true },
                { name: 'btFil', index: 'btFil', label: 'btFil', width: 30, hidden: true },
                { name: 'btVis', index: 'btVis', label: 'Visible', width: 37, hidden: true },
                { name: 'inLar', index: 'inLar', label: 'inLar', width: 30, hidden: true },
                { name: 'btIdPri', index: 'btIdPri', label: 'btIdPri', width: 30, hidden: true },
                { name: 'btIdIde', index: 'btIdIde', label: 'btIdIde', width: 30, hidden: true },
                { name: 'btEliLog', index: 'btEliLog', label: 'btEliLog', width: 30, hidden: true },
                { name: 'btEliDep', index: 'btEliDep', label: 'btEliDep', width: 30, hidden: true },
                { name: 'inTipDat', index: 'inTipDat', label: 'inTipDat', width: 30, hidden: true },
                { name: 'vcValVer', index: 'vcValVer', label: 'vcValVer', width: 30, hidden: true },
                { name: 'vcValFal', index: 'vcValFal', label: 'vcValFal', width: 30, hidden: true },
                { name: 'btVig', index: 'btVig', label: 'btVig', width: 30, hidden: true }
                ],
        sortname: "P_inCod", //Default SortColumn
        sortorder: "asc", //Default SortOrder.
        width: "750",
        height: "250",
        rownumbers: true,
        caption: "Campos",
        ondblClickRow: function (id) { $("#btnModificar").click(); }
    });
    $("#tblCampo").jqGrid('bindKeys', { "onEnter": function (id) { $("#btnModificar").click(); }, "onSpace": function (id) { $("#btnModificar").click(); } });


    function BloquearPagina(bloqueado) {
        $(".btnNormal").button("option", "disabled", bloqueado);
        if (bloqueado) {
            $("input").attr("disabled", "disabled");
            $("select").attr("disabled", "disabled");
        }
        else {
            $("input").removeAttr("disabled");
            $("select").removeAttr("disabled");
        }
    }

    /**************************************************  EVENTOS  ******************************************************/
    $("#btnCerrarCampo").click(function (event) {
        $('#divCampo').dialog("close");
    });

    $("#ddlTipoDato").change(function () {
        MostrarLogico();
    });

    $("#ddlCampos").change(function () {
        CargarDatosDelCampo();
    });

    $("#ddlTablaBase").change(function () {
        CargarLlaves();
    });

    $("#ddlCampoForaneo").change(function () {
        CargarLlaveEspecifica();
    });

    $("#ddlCampoMostrar").change(function () {
        MostrarDescripcion();
    });

    $("#btnAgregar").click(function () {
        //Valida...
        if ($("#ddlTabla").val() == null) {
            alert('Seleccione primero una tabla');
            return;
        }
        if ($("#ddlCampos").val() == null) {
            alert('No existen campos disponibles');
            return;
        }
        AgregarModificar(-1, "Agregar Campo");
    });

    $("#btnCerrar").click(function (event) {
        window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));
    });

    $("#ddlTipoOrigen").change(function () {
        ActualizarListaTablas();
    });

    $("#ddlTabla").change(function () {
        CargarDatosEntidad();
    });


    $("#btnGuardarCampo").click(function (event) {
        fnGuardarCampo();
    });

    $("#btnModificar").click(function () {
        var id = $("#tblCampo").jqGrid('getGridParam', 'selrow');
        if (id) {
            AgregarModificar(id, "Modificar Campo");
        }
        else {
            alerta("Seleccione un Campo");
        }
    });

    $("#btnEliminar").click(function () {
        var id = $("#tblCampo").jqGrid('getGridParam', 'selrow');

        if (id) {
            $("#tblCampo").jqGrid('delRowData', id);
        }
        else {
            alerta("Seleccione un Campo");
        }
    });


    $("#btnGuardar").click(function (event) {
        GuardarEntidad();
    });


    $("#btnProcedimientos").click(function () {
        //Valida...
        MostrarProcedimientos();
    });

    $("#btnEjecutarSP").click(function (event) {
        EjecutarStoreProcedure();
    });

    $("#btnCerrarSP").click(function (event) {
        $('#divProcedimientos').dialog("close");
    });

    $("#ddlTipoProcedimiento").change(function () {
        MostrarStoreProcedure();
    });


    // ****************************************************************************************************************



});








/*************************************************  VARIABLES   *****************************************************/
var tbDetalle;
var indexCampo = 0;
var ListaLlaves;

/**************************************************   PATRON   ******************************************************/
function scriptsp(script) {
  this.script = script;
}

function campo(P_inCod, F_inCodEnt, inOrd, vcNom, vcNomAlias, vcDes, vcTab, vcForKey, vcTabFor, vcPriKeyFor,
               btOrd, btFil, btVis, inLar, btIdPri, btIdIde, btEliLog, btEliDep, inTipDat, vcValVer, vcValFal, btVig) {
  this.P_inCod = P_inCod;
  this.F_inCodEnt = F_inCodEnt;
  this.inOrd = inOrd;
  this.vcNom = vcNom;
  this.vcNomAlias = vcNomAlias;
  this.vcDes = vcDes;
  this.vcTab = vcTab;
  this.vcForKey = vcForKey;
  this.vcTabFor = vcTabFor;
  this.vcPriKeyFor = vcPriKeyFor;
  this.btOrd = btOrd;
  this.btFil = btFil;
  this.btVis = btVis;
  this.inLar = inLar;
  this.btIdPri = btIdPri;
  this.btIdIde = btIdIde;
  this.btEliLog = btEliLog;
  this.btEliDep = btEliDep;
  this.inTipDat = inTipDat;
  this.vcValVer = vcValVer;
  this.vcValFal = vcValFal;
  this.btVig = btVig;
}

function entidad(P_inCod, vcTab, vcDes, vcURLMan, vcURLRep, vcFor, vcEsq, vcNomRep, vcURLIco, btNue,
               btEdi, btEli, btExp, btImp, btBus, btOrd, btOrdCol, btCar, btVig) {
  this.P_inCod = P_inCod;
  this.vcTab = vcTab;
  this.vcDes = vcDes;
  this.vcURLMan = vcURLMan;
  this.vcURLRep = vcURLRep;
  this.vcFor = vcFor;
  this.vcEsq = vcEsq;
  this.vcNomRep = vcNomRep;
  this.vcURLIco = vcURLIco;
  this.btNue = btNue;
  this.btEdi = btEdi;
  this.btEli = btEli;
  this.btExp = btExp;
  this.btImp = btImp;
  this.btBus = btBus;
  this.btOrd = btOrd;
  this.btOrdCol = btOrdCol;
  this.btCar = btCar;
  this.btVig = btVig;
  //this.Campos = new Array();
  this.Campos = [];
}


/************************************************** FUNCIONES ******************************************************/
LimpiarDatos = function () {
    $("#txtDescripcion").val('');
    $("#txtUrl").val('');
    $("#chkNuevo").attr('checked', false);
    $("#chkEliminar").attr('checked', false);
    $("#chkImprimir").attr('checked', false);
    $("#chkOrdenar").attr('checked', false);
    $("#chkCampoDinamico").attr('checked', false);
    $("#chkEditar").attr('checked', false);
    $("#chkExportar").attr('checked', false);
    $("#chkBuscar").attr('checked', false);
    $("#chkOrdenarColumna").attr('checked', false);
    $("#chkVigente").attr('checked', false);
    //Limpiar Detalle de Campos...
    LimpiarDetalleCampos();
};

LimpiarDetalleCampos = function () {
    //Limpiar Detalle de Campos...
    var rowIds = $('#tblCampo').jqGrid('getDataIDs');
    var i = 0;
    for (i = 0, len = rowIds.length; i < len; i++) {
        var currRow = rowIds[i];
        $('#tblCampo').jqGrid('delRowData', currRow);
    }
};

MostrarLogico = function () {
    if ($("#ddlTipoDato").val() == 'Logico') {
        $(".tipologico").show();
    }
    else {
        $(".tipologico").hide();
    }
};



MostrarDescripcion = function () {
    $("#txtDescripcionCampo").val($("#ddlCampoMostrar").val());
    $("#txtAlias").val($("#ddlCampoMostrar").val());
};



CargarLlaveEspecifica = function () {
    if (ListaLlaves != null) {
        $.each(ListaLlaves, function () {
            if ($("#ddlCampoForaneo").val() == this.vcForKey) {
                $("#txtTablaDestino").val(this.vcTabFor);
                $("#hfPrimaryKeyTR").val(this.vcPriKeyFor);
                CargarCamposMostrar(this.vcTabFor);
                return;
            }
        });
    }
};




ObtieneUltimoOrden = function () {
    var inMaximo = 0;
    var Filas = $("#tblCampo").getGridParam("data");
    $(Filas).each(function () {
        if (inMaximo < parseInt(this.inOrd,0)) {
            inMaximo = parseInt(this.inOrd,0);
        }
    });
    $("#txtOrdenCampo").val(inMaximo + 1);
    //  $.ajax({
    //    type: "POST",
    //    url: "Mnt_Entidad.aspx/ObtenerUltimoOrden",
    //    data: "{'Tabla': '" + $("#ddlTabla").val() + "'," +
    //             "'TipoOrigen': '" + $("#ddlTipoOrigen").val() + "'}",
    //    contentType: "application/json; charset=utf-8",
    //    dataType: "json",
    //    success: function (result) {
    //      var inOrd = result.d;
    //      $("#txtOrdenCampo").val(inOrd);
    //    },
    //    error: function (xhr, err, thrErr) {
    //      alert(xhr.responseText);
    //      MostrarErrorAjax(xhr, err, thrErr);
    //    }
    //  });
};




CargarLlaves = function () {
    //Limpiar Datos...
    $("#ddlCampoForaneo").html('');
    $("#txtTablaDestino").val('');
    $("#hfPrimaryKeyTR").val('');
    $("#ddlCampoMostrar").html('');
    //Cargar...
    $.ajax({
        type: "POST",
        url: "Mnt_Entidad.aspx/ListarLlaves",
        data: "{'Tabla': '" + $("#ddlTablaBase").val() + "'," +
                           "'TipoOrigen': '" + $("#ddlTipoOrigen").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            ListaLlaves = result.d;
            $.each(ListaLlaves, function () {
                $("#ddlCampoForaneo").append($("<option></option>").attr("value", this.vcForKey).text(this.vcForKey));
            });
            if (ListaLlaves == null || ListaLlaves == '') {
                //Quitar el campo OTRO...
                $("#ddlCampos option[value='OTRO']").remove();
                $(".otrocampo").hide();
                CargarDatosDelCampo();
            }
            else {
                CargarLlaveEspecifica();
            }

        },
        error: function (xhr, err, thrErr) {
            alert(xhr.responseText);
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });

};




CargarTablasBase = function () {

    if ($("#ddlCampos").val() != 'OTRO') {
        return;
    }

    $("#ddlTablaBase").html('');

    //Cargar...
    $.ajax({
        type: "POST",
        url: "Mnt_Entidad.aspx/ListarTablasBase",
        data: "{'Tabla': '" + $("#ddlTabla").val() + "'," +
                           "'TipoOrigen': '" + $("#ddlTipoOrigen").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            lstCampos = result.d;

            $.each(lstCampos, function () {
                $("#ddlTablaBase").append($("<option></option>").attr("value", this.vcTab).text(this.vcTab));
            });

            CargarLlaves();

        },
        error: function (xhr, err, thrErr) {
            alert(xhr.responseText);
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });

};



CargarDatosDelCampo = function () {
    CargarTablasBase();
    if (indexCampo == -1 && $("#ddlCampos").val() != null && $("#ddlCampos").val() == 'OTRO') { //Nuevo
        $(".otrocampo").show();
    }
    else {
        $(".otrocampo").hide();
        $("#txtDescripcionCampo").val($("#ddlCampos").val());
        $("#txtAlias").val($("#ddlCampos").val());
        //Obtener Datos...
        $.ajax({
            type: "POST",
            url: "Mnt_Entidad.aspx/ObtieneDatosCampo",
            data: "{'Tabla': '" + $("#ddlTabla").val() + "'," +
              "'TipoOrigen': '" + $("#ddlTipoOrigen").val() + "'," +
              "'Campo':'" + $("#ddlCampos").val() + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                Campo = result.d;
                if (indexCampo == -1) {
                    $("#chkLlavePrimaria").attr('checked', false);
                    $("#chkIdentity").attr('checked', false);
                    if (Campo != null) {
                        //alert(Campo.btIdPri);
                        $("#chkLlavePrimaria").attr('checked', Campo.btIdPri);
                        $("#chkIdentity").attr('checked', Campo.btIdIde);
                        //alert('stop');
                    }
                }

            },
            error: function (xhr, err, thrErr) {
                alert(xhr.responseText);
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }
};


CargarCamposMostrar = function (vcTabla) {
    $("#ddlCampoMostrar").html('');
    //Cargar...
    $.ajax({
        type: "POST",
        url: "Mnt_Entidad.aspx/ListarCamposRealAll",
        data: "{'Tabla': '" + vcTabla + "'," +
                           "'TipoOrigen': '" + $("#ddlTipoOrigen").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            lstCampos = result.d;
            $.each(lstCampos, function () {
                if (this.vcNom != 'OTRO') {
                    $("#ddlCampoMostrar").append($("<option></option>").attr("value", this.vcNom).text(this.vcNom));
                }
            });
            MostrarDescripcion();
        },
        error: function (xhr, err, thrErr) {
            alert(xhr.responseText);
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });

};

CargarListaCamposReal = function () {

    $("#ddlCampos").html('');

    //Cargar...
    $.ajax({
        type: "POST",
        url: "Mnt_Entidad.aspx/ListarCamposReal",
        data: "{'Tabla': '" + $("#ddlTabla").val() + "'," +
                           "'TipoOrigen': '" + $("#ddlTipoOrigen").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            lstCampos = result.d;

            $.each(lstCampos, function () {
                $("#ddlCampos").append($("<option></option>").attr("value", this.vcNom).text(this.vcNom));
            });


            CargarDatosDelCampo();

        },
        error: function (xhr, err, thrErr) {
            alert(xhr.responseText);
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });

};


ActualizarListaTablas = function () {

    $("#ddlTabla").html("");
    $("#txtTabla").show();

    if ($("#ddlTipoOrigen").val() == 99) {
        $("#lblMensajeTabla").text('');
        return;
    }

    $.ajax({
        type: "POST",
        url: "Mnt_Entidad.aspx/ListarTablasReales",
        data: "{'TipoOrigen': " + $("#ddlTipoOrigen").val() + "}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            lstTablas = result.d;
            $.each(lstTablas, function () {
                $("#ddlTabla").append($("<option></option>").attr("value", this.vcTab).text(this.vcTab));
                inicio = false;
            });
            if (lstTablas.length == 0) {
                $("#txtTabla").hide();
            }

            CargarDatosEntidad();

        },
        error: function (xhr, err, thrErr) {
            alert(xhr.responseText);
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
};

CargarTiposDatos = function () {
    $("#ddlTipoDato").html('');
    //Cargar...
    $.ajax({
        type: "POST",
        url: "Mnt_Entidad.aspx/ListarTipoDatos",
        data: "{'TipoOrigen': '" + $("#ddlTipoOrigen").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            lstCampos = result.d;
            $.each(lstCampos, function () {
                $("#ddlTipoDato").append($("<option></option>").attr("value", this.vcNom).text(this.vcNom));
            });
            MostrarLogico();
        },
        error: function (xhr, err, thrErr) {
            alert(xhr.responseText);
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
};

CargarDatosEntidad = function () {

    //Validar si existe y cargar valores...
    $.ajax({
        type: "POST",
        url: "Mnt_Entidad.aspx/ObtieneEntidad",
        data: "{'Tabla': '" + $("#ddlTabla").val() + "'," +
                           "'TipoOrigen': '" + $("#ddlTipoOrigen").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            Tabla = result.d;
            if (Tabla != null && Tabla.P_inCod > 0) {

                $("#hdfEntidad").val(Tabla.P_inCod);

                $("#lblMensajeTabla").text('TABLA CREADA');
                $("#lblMensajeTabla").css({ 'color': 'black' });

                //Carga datos ******************************************************
                $("#txtDescripcion").val(Tabla.vcDes);
                $("#txtUrl").val(Tabla.vcURLMan);

                $("#chkNuevo").attr('checked', Tabla.btNue);
                $("#chkEliminar").attr('checked', Tabla.btEli);
                $("#chkImprimir").attr('checked', Tabla.btImp);
                $("#chkOrdenar").attr('checked', Tabla.btOrd);
                $("#chkCampoDinamico").attr('checked', Tabla.btCar);
                $("#chkEditar").attr('checked', Tabla.btEdi);
                $("#chkExportar").attr('checked', Tabla.btExp);
                $("#chkBuscar").attr('checked', Tabla.btBus);
                $("#chkOrdenarColumna").attr('checked', Tabla.btOrdCol);
                $("#chkVigente").attr('checked', Tabla.btVig);

                //Carga detalle de Campos...
                LLenarGrillaCampos($("#ddlTabla").val());

                //Carga lista de campos reales...
                CargarListaCamposReal();
            }
            else {
                $("#hdfEntidad").val('');
                $("#lblMensajeTabla").text('NO SE HA CREADO LA TABLA');
                $("#lblMensajeTabla").css({ 'color': 'red' });
                LimpiarDatos();

                //Carga lista de campos reales...
                CargarListaCamposReal();
            }

        },
        error: function (xhr, err, thrErr) {
            alert(xhr.responseText);
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
};

LLenarGrillaCampos = function (vcTabla) {
    LimpiarDetalleCampos();

    //Cargar...
    $.ajax({
        type: "POST",
        url: "Mnt_Entidad.aspx/ObtieneCampos",
        data: "{'Tabla': '" + vcTabla + "'," +
                           "'TipoOrigen': '" + $("#ddlTipoOrigen").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            lstCampos = result.d;

            $.each(lstCampos, function () {

                $("#tblCampo").jqGrid('addRowData', this.P_inCod, { id: this.P_inCod,
                    'P_inCod': this.P_inCod,
                    'F_inCodEnt': this.F_inCodEnt,
                    'vcNom': this.vcNom,
                    'vcNomAlias': this.vcNomAlias,
                    'vcDes': this.vcDes,
                    'vcTab': this.vcTab,
                    'vcForKey': this.vcForKey,
                    'vcTabFor': this.vcTabFor,
                    'vcPriKeyFor': this.vcPriKeyFor,
                    'btOrd': this.btOrd,
                    'btFil': this.btFil,
                    'btVis': this.btVis,
                    'inLar': this.inLar,
                    'btIdPri': this.btIdPri,
                    'btIdIde': this.btIdIde,
                    'btEliLog': this.btEliLog,
                    'btEliDep': this.btEliDep,
                    'inTipDat': this.inTipDat,
                    'vcValVer': this.vcValVer,
                    'vcValFal': this.vcValFal,
                    'btVig': this.btVig,
                    'inOrd': this.inOrd
                });

            });


        },
        error: function (xhr, err, thrErr) {
            alert(xhr.responseText);
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });


};


ObtieneCampo = function () {
    var Campo;
    Campo = new campo();
    if ($("#hdfOpcion").val() == "") {
        Opcion.P_inCod = "-1";
    }
    else {
        Opcion.P_inCod = $("#hdfOpcion").val();
    }

    Opcion.vcNom = $("#txtNombre").val();
    Opcion.vcURL = $("#txtUrl").val();
    Opcion.inEst = 1;
    Opcion.inOrd = $("#txtOrden").val();
    Opcion.inTipOri = $("#ddlTipoOrigen").val();
    Opcion.vcTab = $("#ddlTabla option:selected").text();
    if (Opcion.vcTab == 'OTRO') {
        Opcion.vcTab = $("#txtTabla").val();
    }

    var Filas = $("#tblItem").getGridParam("data");
    $(Filas).each(function () {
        Item = new item();
        Item.P_inCod = this.P_inCod;
        Item.vcNom = this.vcNom;
        Item.vcURL = this.vcURL;
        Item.inEst = 1;
        Item.inOrd = this.inOrd;
        Item.inTipOri = this.inTipOri;
        Item.vcTab = this.vcTab;
        Opcion.Items.push(Item);
    });

    return Opcion;
};

GuardarEntidad = function () {

    var i = 0;
    var ErrorValOpcion = false;
    var Entidad = new entidad();

    if ($("#hdfEntidad").val() == '') {
        Entidad.P_inCod = "-1";
    }
    else {
        Entidad.P_inCod = $("#hdfEntidad").val();
    }

    Entidad.btBus = $("#chkBuscar").is(":checked");
    Entidad.btCar = $("#chkCampoDinamico").is(":checked");
    Entidad.btEdi = $("#chkEditar").is(":checked");
    Entidad.btEli = $("#chkEliminar").is(":checked");
    Entidad.btExp = $("#chkExportar").is(":checked");
    Entidad.btImp = $("#chkImprimir").is(":checked");
    Entidad.btNue = $("#chkNuevo").is(":checked");
    Entidad.btOrd = $("#chkOrdenar").is(":checked");
    Entidad.btOrdCol = $("#chkOrdenarColumna").is(":checked");
    Entidad.btVig = $("#chkVigente").is(":checked");

    Entidad.vcDes = $("#txtDescripcion").val();
    Entidad.vcTab = $("#ddlTabla").val();
    Entidad.vcURLMan = $("#txtUrl").val();
    Entidad.vcNomRep = '';
    Entidad.vcURLIco = '';
    Entidad.vcURLRep = '';
    Entidad.vcEsq = '';
    Entidad.vcFor = '';

    var Filas = $("#tblCampo").getGridParam("data");
    $(Filas).each(function () {
        Campo = new campo();
        Campo.P_inCod = this.P_inCod;
        Campo.F_inCodEnt = this.F_inCodEnt;
        Campo.vcNom = this.vcNom;
        Campo.vcNomAlias = this.vcNomAlias;
        Campo.vcDes = this.vcDes;
        Campo.vcTab = this.vcTab;
        Campo.vcForKey = this.vcForKey;
        Campo.vcTabFor = this.vcTabFor;
        Campo.vcPriKeyFor = this.vcPriKeyFor;
        Campo.btOrd = this.btOrd;
        Campo.btFil = this.btFil;
        Campo.btVis = this.btVis;
        Campo.inLar = this.inLar;
        Campo.btIdPri = this.btIdPri;
        Campo.btIdIde = this.btIdIde;
        Campo.btEliLog = this.btEliLog;
        Campo.btEliDep = this.btEliDep;
        Campo.inTipDat = this.inTipDat;
        Campo.vcValVer = this.vcValVer;
        Campo.vcValFal = this.vcValFal;
        Campo.btVig = this.btVig;
        Campo.inOrd = this.inOrd;
        Campo.btIdPri = this.btIdPri;
        Entidad.Campos.push(Campo);
    });

    i = 0;

    if ($("#ddlTipoOrigen").val() == 99) {
        alert('Seleccione un Tipo de Origen');
        $("#ddlTipoOrigen").focus();
        return;
    }

    if ($.trim($("#txtDescripcion").val()) == '') {
        alert('Ingrese alguna descripción');
        $("#txtDescripcion").val('');
        $("#txtDescripcion").focus();
        return;
    }

    if ($(Filas).length == 0) {
        alert('Debe ingresar campos para la respectiva Entidad');
        $("#btnAgregar").focus();
        return;
    }

    var oEntidad = JSON.stringify(Entidad);
    BloquearPagina(true);
    $.ajax({
        type: "POST",
        url: "Mnt_Entidad.aspx/Guardar",
        data: "{'oEntidad': '" + oEntidad + "','TipoOrigen':'" + $("#ddlTipoOrigen").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {

            //$("#ddlTipoOrigen").val('0');
            //ActualizarListaTablas();
            CargarDatosEntidad();

            Mensaje("<br/><h1>Entidad Guardada</h1><br/><h2>" + Entidad.vcDes + "</h2>", document, CerroMensaje);
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
            BloquearPagina(false);
        }
    });


    function BloquearPagina(bloqueado) {
        $(".btnNormal").button("option", "disabled", bloqueado);
        if (bloqueado) {
            $("input").attr("disabled", "disabled");
            $("select").attr("disabled", "disabled");
        }
        else {
            $("input").removeAttr("disabled");
            $("select").removeAttr("disabled");
        }
    }

    function CerroMensaje() {
        BloquearPagina(false);
    }


};


fnGuardarCampo = function () {
    var Campo = new campo();
    Campo.P_inCod = 0;
    Campo.F_inCodEnt = 0;
    Campo.btEliDep = $("#chkEliminarDepedencia").is(":checked");
    Campo.btEliLog = $("#chkEliminarLogica").is(":checked");
    Campo.btFil = $("#chkFiltrarCampo").is(":checked");
    Campo.btIdIde = $("#chkIdentity").is(":checked");
    Campo.btIdPri = $("#chkLlavePrimaria").is(":checked");
    Campo.btOrd = $("#chkOrdenarCampo").is(":checked");
    Campo.btVig = $("#chkbtVig").is(":checked");
    Campo.btVis = $("#chkVisibleCampo").is(":checked");
    Campo.inLar = $("#txtLargoCampo").val();
    Campo.inOrd = $("#txtOrdenCampo").val();

    switch ($("#ddlTipoDato").val()) {
        case 'Texto': Campo.inTipDat = 1; break;
        case 'Fecha': Campo.inTipDat = 2; break;
        case 'Fecha y hora': Campo.inTipDat = 3; break;
        case 'Moneda': Campo.inTipDat = 4; break;
        case 'Numerico': Campo.inTipDat = 5; break;
        case 'Logico': Campo.inTipDat = 6; break;
    }

    Campo.vcDes = $("#txtDescripcionCampo").val();
    Campo.vcNomAlias = $("#txtAlias").val();

    if ($("#ddlCampos").val() == 'OTRO') {
        Campo.vcNom = $("#ddlCampoMostrar").val();
        Campo.vcTab = $("#ddlTablaBase").val();
        Campo.vcForKey = $("#txtLargoCampo").val();
        Campo.vcTabFor = $("#txtTablaDestino").val();
        Campo.vcPriKeyFor = $("#hfPrimaryKeyTR").val();
    }
    else {
        Campo.vcNom = $("#ddlCampos").val();
        Campo.vcTab = $("#ddlTabla").val();
        Campo.vcForKey = '';
        Campo.vcTabFor = '';
        Campo.vcPriKeyFor = '';
    }

    if ($("#ddlTipoDato").val() == 'Logico') {
        Campo.vcValVer = $("#txtValorVerdadero").val();
        Campo.vcValFal = $("#txtValorFalso").val();
    }
    else {
        Campo.vcValVer = '';
        Campo.vcValFal = '';
    }

    if (Campo.vcNomAlias == '') {
        alerta("Ingrese el nombre del alias, es un campo obligatorio");
        $("#txtAlias").focus();
        return;
    }
    if (Campo.inOrd == '' || Campo.inOrd == '0') {
        alerta("Ingrese un valor en Orden, es un campo obligatorio");
        $("#txtOrdenCampo").focus();
        return;
    }
    if (Campo.inLar == '' || Campo.inLar == '0') {
        alerta("Ingrese un valor en Largo, es un campo obligatorio");
        $("#txtLargoCampo").focus();
        return;
    }
    if ($("#ddlTipoDato").val() == 'Logico') {
        if (Campo.vcValVer == '') {
            alerta("Ingrese un valor en 'Valor Verdadero', es un campo obligatorio");
            $("#txtValorVerdadero").focus();
            return;
        }
        if (Campo.vcValFal == '') {
            alerta("Ingrese un valor en 'Valor Falso', es un campo obligatorio");
            $("#txtValorFalso").focus();
            return;
        }
    }

    if (indexCampo == -1) {
        var Filas = $("#tblCampo").getGridParam("data");
        var ExisteCampo = false;

        //Valida si existe el ALIAS...
        $(Filas).each(function () {
            if (Campo.vcNomAlias.toLowerCase() == this.vcNomAlias.toLowerCase()) {
                ExisteCampo = true;
            }
        });
        if (ExisteCampo) {
            alerta("Usted ya agrego este ALIAS, ingrese otro");
            $("#txtAlias").focus();
            return;
        }

        //Valida si existe el Orden...
        $(Filas).each(function () {
            if (Campo.inOrd == this.inOrd) {
                ExisteCampo = true;
            }
        });
        if (ExisteCampo) {
            alerta("Usted ya agrego numero de orden, ingrese otro");
            $("#txtOrdenCampo").focus();
            return;
        }

        $("#tblCampo").jqGrid('addRowData', Campo.inOrd, { id: Campo.inOrd,
            'P_inCod': Campo.P_inCod,
            'inOrd': Campo.inOrd,
            'vcNom': Campo.vcNom,
            'vcTab': Campo.vcTab,
            'vcDes': Campo.vcDes,
            'vcForKey': Campo.vcForKey,
            'btEliDep': Campo.btEliDep,
            'btEliLog': Campo.btEliLog,
            'btFil': Campo.btFil,
            'btIdIde': Campo.btIdIde,
            'btIdPri': Campo.btIdPri,
            'btOrd': Campo.btOrd,
            'btVig': Campo.btVig,
            'btVis': Campo.btVis,
            'F_inCodEnt': Campo.F_inCodEnt,
            'inLar': Campo.inLar,
            'inTipDat': Campo.inTipDat,
            'vcNomAlias': Campo.vcNomAlias,
            'vcPriKeyFor': Campo.vcPriKeyFor,
            'vcTabFor': Campo.vcTabFor,
            'vcValFal': Campo.vcValFal,
            'vcValVer': Campo.vcValVer
        });


    }

    else {

        $("#tblCampo").jqGrid('setRowData', indexCampo, {
            'vcDes': Campo.vcDes,
            'btEliDep': Campo.btEliDep,
            'btEliLog': Campo.btEliLog,
            'btFil': Campo.btFil,
            'btOrd': Campo.btOrd,
            'btVig': Campo.btVig,
            'btVis': Campo.btVis,
            'inLar': Campo.inLar,
            'inTipDat': Campo.inTipDat,
            'vcValFal': Campo.vcValFal,
            'vcValVer': Campo.vcValVer
        });
    }

    $('#divCampo').dialog("close");

};

MostrarProcedimientos = function () {

    if ($("#ddlTabla").val() == null) {
        alert('Seleccione primero una tabla');
        return;
    }

    MostrarStoreProcedure();

    $('#divProcedimientos').dialog({
        title: 'Scripts -> Procedimientos Almacenados',
        width: 600,
        modal: true,
        resizable: false
    });
};

AgregarModificar = function (id, titulo) {
    indexCampo = id;
    if (id == -1) {//Nuevo
        $(".trNuevo").show();
        $(".trEditar").hide();

        $("#chkOrdenarCampo").attr('checked', true);
        $("#chkVisibleCampo").attr('checked', true);
        $("#chkEliminarDepedencia").attr('checked', true);
        $("#chkFiltrarCampo").attr('checked', true);
        $("#chkEliminarLogica").attr('checked', false);
        $("#chkbtVig").attr('checked', true);

        $("#txtPorDefecto").val('0');
        $("#txtLargoCampo").val('150');
        $("#ddlTipoDato").val('Texto');
        $(".tipologico").hide();
        $("#txtValorVerdadero").val('SI');
        $("#txtValorFalso").val('NO');

        //Valida si existen campos
        var Filas = $("#tblCampo").getGridParam("data");
        var strOpcion = '';
        $("#ddlCampos option").each(function () {
            //alert('opcion ' + $(this).text() + ' valor ' + $(this).attr('value'))
            strOpcion = $(this).attr('value');
            $(Filas).each(function () {
                if (strOpcion == this.vcNom) {
                    $("#ddlCampos option[value='" + strOpcion + "']").remove();
                }
            });
        });

        if ($("#ddlCampos").val() == 'OTRO') {
            $("#txtDescripcionCampo").val($("#ddlCampoMostrar").val());
            $("#txtAlias").val($("#ddlCampoMostrar").val());
        }
        else {
            $("#txtDescripcionCampo").val($("#ddlCampos").val());
            $("#txtAlias").val($("#ddlCampos").val());
        }

        CargarDatosDelCampo();

        //Obtener el Ultimo Orden...
        ObtieneUltimoOrden();

    }
    else {//Editar

        var datos = $("#tblCampo").jqGrid('getRowData', id);

        $("#txtDescripcionCampo").val(datos.vcDes);
        $("#txtAlias").val(datos.vcNomAlias);
        $("#txtOrdenCampo").val(datos.inOrd);
        $("#txtLargoCampo").val(datos.inLar);

        $("#chkOrdenarCampo").attr('checked', $.parseJSON(datos.btOrd));
        $("#chkVisibleCampo").attr('checked', $.parseJSON(datos.btVis));
        $("#chkEliminarDepedencia").attr('checked', $.parseJSON(datos.btEliDep));
        $("#chkEliminarLogica").attr('checked', $.parseJSON(datos.btEliLog));
        $("#chkFiltrarCampo").attr('checked', $.parseJSON(datos.btFil));
        $("#chkbtVig").attr('checked', $.parseJSON(datos.btVig));

        var strTipoDato = 'Texto';
        switch (datos.inTipDat) {
            case '1': strTipoDato = 'Texto'; break;
            case '2': strTipoDato = 'Fecha'; break;
            case '3': strTipoDato = 'Fecha y hora'; break;
            case '4': strTipoDato = 'Moneda'; break;
            case '5': strTipoDato = 'Numerico'; break;
            case '6': strTipoDato = 'Logico'; break;
        }
        $("#ddlTipoDato").val(strTipoDato);
        if (strTipoDato == 'Logico') {
            $("#txtValorVerdadero").val(datos.vcValVer);
            $("#txtValorFalso").val(datos.vcValFal);
            $(".tipologico").show();
        }
        else {
            $("#txtValorVerdadero").val('SI');
            $("#txtValorFalso").val('NO');
            $(".tipologico").hide();
        }

        $("#txtDescripcionCampo").focus();

        $(".trNuevo").hide();
        $(".otrocampo").hide();
        $(".trEditar").show();
    }

    $('#divCampo').dialog({
        title: titulo,
        width: 480,
        modal: true,
        resizable: false
    });
};

EjecutarStoreProcedure = function () {

    if ($.trim($("#txtScript").val()) == '') {
        alert('Debe ingresar algun script');
        $("#txtScript").focus();
        return;
    }

    var ScriptSP = new scriptsp();
    ScriptSP.script = document.getElementById("txtScript").value;

    var oScript = JSON.stringify(ScriptSP);

    $.ajax({
        type: "POST",
        url: "Mnt_Entidad.aspx/EjecutarScript",
        data: "{'TipoOrigen':'" + $("#ddlTipoOrigen").val() + "','oScript':'" + oScript + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {

            if (result.d != 0) {
                //Resultado Correcto...
                alert('Script ejecutado correctamente');
            }
            else {
                alert('No se ejecutó el script');
            }

        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
            BloquearPagina(false);
        }
    });

};

MostrarStoreProcedure = function () {

    $('#btnEjecutarSP').show();

    switch ($('#ddlTipoProcedimiento').val()) {
        case 'INSERCION': break;
        case 'ACTUALIZACION': break;
        case 'ELIMINACION': break;
        case 'LISTADO': break;
        case 'BUSQUEDA': break;
        case 'ENTIDAD': $('#btnEjecutarSP').hide(); break;
    }

    var Tabla = $('#ddlTabla').val();

    $.ajax({
        type: "POST",
        url: "Mnt_Entidad.aspx/ObtenerStoreProcedure",
        data: "{'Tabla': '" + Tabla + "','TipoOrigen':'" + $("#ddlTipoOrigen").val() + "','TipoSP':'" + $('#ddlTipoProcedimiento').val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            $('#txtScript').val(result.d);

            if ($('#txtScript').val().indexOf('ALTER PROCEDURE') > 0) {
                $("#txtScript").css({ color: "#FF0000", background: "#F5ECA6" });
            }
            else {
                $("#txtScript").css({ color: "#000000", background: "#FFFFFF" });
            }


        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
            BloquearPagina(false);
        }
    });
};