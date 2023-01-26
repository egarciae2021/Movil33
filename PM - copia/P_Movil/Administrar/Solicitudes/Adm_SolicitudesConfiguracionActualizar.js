var tbCamposDestino;
//var lstCondicionesDestino = new Array();

$(function () {

    var inRow = 1;
    var inNumSolicitudes = 0;
    if ($("#hdfCodTipSol").val() != "") {
        inNumSolicitudes = $("#hdfNumSolicitudes").val();
    }

    $("#btnAgregarDestino").live("click", function () {
        var ListaActivos = '';
        var vcCampo = "";

        vcCampo = $("#ddlCampoSolicitudOrigen").val();
        if (vcCampo == "") {
            alerta("Seleccione un campo de la solicitud");
            return;
        }
        var vcDescripcion = $("#ddlCampoSolicitudOrigen option:selected").text();
        var vIdEntidad = '';
        var NombreEntidadReferencia = '';
        var vIdCamPK = '';
        var vIdCamDes = '';
        var NombreCampoDesc = '';
        var TamanoCampoRef = '';

        vIdEntidad = $("#ddlEntidadReferenciaDestino").val();
        NombreEntidadReferencia = $("#ddlEntidadReferenciaDestino option:selected").text();
        vIdCamDes = $("#ddlCampoEntidadDestino").val();
        NombreCampoDesc = $("#ddlCampoEntidadDestino option:selected").text();

        var lstCamposConsultaPri = Object.keys(CamposDestino);
        var i = 0;
        for (i = 0; i < $(lstCamposConsultaPri).length; i++) {
            var btPri = CamposDestino[lstCamposConsultaPri[i]].btIdPri;
            if (btPri == "True") {
                vIdCamPK = CamposDestino[lstCamposConsultaPri[i]].P_inCod;
            }
        }
        TamanoDato = "8000";
        //validaciones
        if (vIdEntidad == "-1") {
            alerta("Seleccione una entidad");
            return;
        }
        if (vIdCamPK == '') {
            alerta("La entidad seleccionada no posee un campo PK");
            return;
        }


        var textoAgregar = $("#lblBotonAgregarDestino").text();
        var ids = tbCamposDestino.getDataIDs();
        var biExiste = 0;
        for (i = 0; i < ids.length; i++) {
            //if ((tbCamposDestino.getRowData(ids[i]))["Campo"] == vcCampo) {
            //    biExiste = 1;
            //    break;
            //}
            if ((tbCamposDestino.getRowData(ids[i]))["NomEntidad"] == NombreEntidadReferencia &&
                (tbCamposDestino.getRowData(ids[i]))["NomCamDes"] == NombreCampoDesc) {
                biExiste = 1;
                break;
            }
        }
        if (inRow == 1) { inRow = parseInt(inRow) + parseInt(ids.length); } //agregado 06-01-2015
        if (textoAgregar != "Agregar") { biExiste = 0; }
        if (biExiste == 0) {
            if (textoAgregar == "Agregar") { //agregar nuevo campo
                var datos = {
                    Idd: "in_" + (inRow.toString().length == '1' ? '0' + inRow.toString() : inRow.toString()),
                    Campo: vcCampo,
                    Descripcion: vcDescripcion,
                    IdTipoDato: "",
                    TipoDato: "",
                    Tamano: "",
                    IdEntidad: vIdEntidad,
                    NomEntidad: NombreEntidadReferencia,
                    IdCamPK: vIdCamPK,
                    IdCamDes: vIdCamDes,
                    NomCamDes: NombreCampoDesc,
                    Activo: 'True',
                    ListaActivos: ListaActivos
                };
                tbCamposDestino.jqGrid('addRowData', datos.Idd, datos);

                ////var vcEstadoProcesos = Object.keys(arTipSol.EstadoProceso);
                ////for (i = 0; i < vcEstadoProcesos.length; i++) {
                ////    arTipSol.EstadoProceso[vcEstadoProcesos[i]].Campos[vcCampo] = {};
                ////    arTipSol.EstadoProceso[vcEstadoProcesos[i]].Campos[vcCampo] = { Campo: vcCampo, Descripcion: vcDescripcion, Visible: '-1', Editable: '-1', Obligatorio: '-1', IdCampo: "0" };
                ////}

                ////var datosAcciones = {
                ////    vcCampo: vcCampo,
                ////    vcDescripcion: vcDescripcion,
                ////    ddlVisible: "-1",
                ////    ddlEditable: "-1",
                ////    ddlObligatorio: "-1",
                ////    Activo: 'True'
                ////};
                ////tbCamposEstadoProceso.jqGrid('addRowData', vcCampo, datosAcciones);

                ////if (LongDat[$("#ddlTipoDato").prop('selectedIndex')] != 9) {
                ////    //$("#ddlValor").append($('<option></option>').val(vcCampo).html(vcDescripcion));
                ////    //fnSortDropDownListByText("ddlValor");
                ////    fnAgregarParametro("0", vcCampo, vcDescripcion, "0", "0");

                ////    //dialog referencia
                ////    $("#ddlCampoTipSolDestino").append($('<option></option>').val(vcCampo).html(vcDescripcion));
                ////    fnSortDropDownListByText("ddlCampoTipSol");
                ////}

                inRow = inRow + 1;
            } else { //editar campo



                var datos = {
                    Idd: idRowCampoEdicion,
                    Campo: vcCampo,
                    CampoSolicitud: vcCampo,
                    Descripcion: vcDescripcion,
                    IdTipoDato: $("#ddlTipoDato").val(),
                    TipoDato: $("#ddlTipoDato option:selected").text(),
                    Tamano: TamanoDato.replace(/ /g, ""),
                    IdEntidad: vIdEntidad,
                    NomEntidad: NombreEntidadReferencia,
                    IdCamPK: vIdCamPK,
                    IdCamDes: vIdCamDes,
                    NomCamDes: NombreCampoDesc,
                    Activo: 1,
                    ListaActivos: ListaActivos
                };
                tbCamposDestino.jqGrid('setRowData', idRowCampoEdicion, datos);

                //actualizar el combo de parametros ddlValor
                //                $("#ddlValor option[value='" + vcCampo + "']").remove();
                //                $("#ddlValor").append($('<option></option>').val(vcCampo).html(vcDescripcion));
                //                fnSortDropDownListByText("ddlValor");
                ////$('#ddlParametrosApr option[value="{' + vcCampo + '}"]').text('vcDescripcion');
                ////$('#ddlParametrosPro option[value="{' + vcCampo + '}"]').text('vcDescripcion');
                ////$('#ddlParametrosUmbApr option[value="{' + vcCampo + '}"]').text('vcDescripcion');
                ////$('#ddlParametrosUmbPro option[value="{' + vcCampo + '}"]').text('vcDescripcion');
                ////$('#ddlParametrosEnvOper option[value="{' + vcCampo + '}"]').text('vcDescripcion');
                ////fnSortDropDownListByText("ddlParametrosApr");
                ////fnSortDropDownListByText("ddlParametrosPro");
                ////fnSortDropDownListByText("ddlParametrosUmbApr");
                ////fnSortDropDownListByText("ddlParametrosUmbPro");
                ////fnSortDropDownListByText("ddlParametrosEnvOper");

                //actualizar combo en dialog referencia
                $("#ddlCampoTipSolDestino option[value='" + vcCampo + "']").remove();
                $("#ddlCampoTipSolDestino").append($('<option></option>').val(vcCampo).html(vcDescripcion));
                fnSortDropDownListByText("ddlCampoTipSolDestino");
                //actuzlizar grid tbParametros
                ////var ids = tbParametros.getDataIDs();
                ////for (j = 0; j < ids.length; j++) {
                ////    var row = tbParametros.getRowData(ids[j]);
                ////    if (valRowCampoEdicion == row.IdCampo) {
                ////        var datos = { Clave: row.Clave, IdCampo: vcCampo, vcCampo: vcDescripcion };
                ////        tbParametros.jqGrid('setRowData', row.Clave, datos);
                ////    }
                ////}
                //actualizar grid tbCamposEstadoProceso
                ////var ids = tbCamposEstadoProceso.getDataIDs();
                ////for (j = 0; j < ids.length; j++) {
                ////    var row = tbCamposEstadoProceso.getRowData(ids[j]);
                ////    if (vcCampo == row.vcCampo) {
                ////        var datosAcciones = {
                ////            vcCampo: vcCampo,
                ////            vcDescripcion: vcDescripcion
                ////        };
                ////        tbCamposEstadoProceso.jqGrid('setRowData', vcCampo, datosAcciones);
                ////    }
                ////}
                //actualizar arTipSol
                ////var vcEstadoProcesos = Object.keys(arTipSol.EstadoProceso);
                ////for (i = 0; i < vcEstadoProcesos.length; i++) {
                ////    var vcCampos = Object.keys(arTipSol.EstadoProceso[vcEstadoProcesos[i]].Campos);
                ////    for (j = 0; j < vcCampos.length; j++) {
                ////        if (vcCampo == vcCampos[j]) {
                ////            arTipSol.EstadoProceso[vcEstadoProcesos[i]].Campos[vcCampo].Descripcion = vcDescripcion;
                ////            //var copyVisible = arTipSol.EstadoProceso[vcEstadoProcesos[i]].Campos[valRowCampoEdicion].Visible;
                ////            //var copyEditable = arTipSol.EstadoProceso[vcEstadoProcesos[i]].Campos[valRowCampoEdicion].Editable;
                ////            //var copyObligatorio = arTipSol.EstadoProceso[vcEstadoProcesos[i]].Campos[valRowCampoEdicion].Obligatorio;
                ////            //var copyIdCampo = arTipSol.EstadoProceso[vcEstadoProcesos[i]].Campos[valRowCampoEdicion].IdCampo;
                ////            //delete arTipSol.EstadoProceso[vcEstadoProcesos[i]].Campos[valRowCampoEdicion];
                ////            //arTipSol.EstadoProceso[vcEstadoProcesos[i]].Campos[vcCampo] = {};
                ////            //arTipSol.EstadoProceso[vcEstadoProcesos[i]].Campos[vcCampo] = { Campo: vcCampo, Descripcion: vcDescripcion, Visible: copyVisible, Editable: copyEditable, Obligatorio: copyObligatorio, IdCampo: copyIdCampo };
                ////        }
                ////    }
                ////}

                ////$("#txtCampo").attr("disabled", false);
                ////$("#txtTamanoDato").attr("disabled", false);
                ////$("#ddlTipoDato").attr("disabled", false);
                $("#lblBotonAgregarDestino").text("Agregar");
                $("#lblBotonQuitarDestino").text("Quitar");
                $("#imgAgregarDestino").attr('src', '../../../Common/Images/Mantenimiento/add_16x16.gif');
                $("#imgQuitarDestino").attr('src', '../../../Common/Images/Mantenimiento/Quitar.png');

                idRowCampoEdicion = '';

                //Eliminar las condiciones del campo seleccionado y volver a añadir
                ////lstCondiciones = jQuery.grep(lstCondiciones, function (val) {
                ////    if (val.IdCampo != $("#txtCampo").val()) {
                ////        return val;
                ////    }
                ////});
            }
            //Agregar Condiciones 

            var vcCodTipSol = "-1";
            if ($("#hdfCodTipSol").val() != "") { vcCodTipSol = $("#hdfCodTipSol").val(); }

            $.each($(".CampoCondicionDestino"), function () {
                if ($(this).val() != "-1") {
                    var iNumCond = $(this).attr("id").split("_")[1];
                    var DatosCondicion = new CampoReferenciaCondicion();
                    DatosCondicion.IdCondicion = "0";
                    DatosCondicion.IdSolicitudTipo = vcCodTipSol;
                    DatosCondicion.IdEntidad = $("#ddlEntidadReferenciaDestino").val();
                    DatosCondicion.IdCampo = $("#ddlCampoEntidadDestino").val();
                    DatosCondicion.IdCamEnt = $(this).val();
                    DatosCondicion.IdSimboloCondicion = $("#ddlSimboloCondicionDestino_" + iNumCond).val();
                    DatosCondicion.IdCampoRelacion = '';
                    DatosCondicion.ValorCampoRelacion = '';
                    DatosCondicion.NombreCampoRelacion = '';
                    DatosCondicion.TextoCondicion = '';
                    if (DatosCondicion.IdSimboloCondicion == "8" || DatosCondicion.IdSimboloCondicion == "9") { //no requiere valor para NULL o NOT NULL o BIT
                        DatosCondicion.IdCampoTipSol = '';
                        DatosCondicion.NombreCampoTipSol = '';
                        DatosCondicion.TextoCondicion = '';
                    } else if (CamposDestino[$(this).val()].F_inTipDat == "6") {
                        DatosCondicion.IdCampoTipSol = '';
                        DatosCondicion.NombreCampoTipSol = '';
                        DatosCondicion.TextoCondicion = '';
                        DatosCondicion.ValorCampoRelacion = $("#ddlValorCondicionDestino_" + iNumCond).val();
                    } else if ($("#hdfValorCondicionDestino_" + iNumCond).val() == '' && $("#hdfValorCampRelacDestino_" + iNumCond).val() == '') { //se ingresó un valor estático
                        DatosCondicion.IdCampoTipSol = '';
                        DatosCondicion.NombreCampoTipSol = '';
                        DatosCondicion.TextoCondicion = $("#txtValorCondicionDestino_" + iNumCond).val();
                    } else if ($("#hdfValorCondicionDestino_" + iNumCond).val() != '' && $("#hdfValorCampRelacDestino_" + iNumCond).val() == '') { //campo de la solicitud
                        DatosCondicion.IdCampoTipSol = $("#hdfValorCondicionDestino_" + iNumCond).val();
                        DatosCondicion.NombreCampoTipSol = $("#hdfValorCondicionDestino_" + iNumCond).val();
                        DatosCondicion.TextoCondicion = '';
                    } else if ($("#hdfValorCondicionDestino_" + iNumCond).val() != '' && $("#hdfValorCampRelacDestino_" + iNumCond).val() != '') { //relacion con otra entidad
                        DatosCondicion.IdCampoTipSol = '';
                        DatosCondicion.NombreCampoTipSol = '';
                        DatosCondicion.TextoCondicion = '';
                        DatosCondicion.IdCampoRelacion = $("#hdfValorCampRelacDestino_" + iNumCond).val();
                        DatosCondicion.ValorCampoRelacion = $("#hdfValorCondicionDestino_" + iNumCond).val();
                        DatosCondicion.NombreCampoRelacion = $("#txtValorCondicionDestino_" + iNumCond).val();
                    }
                    lstCondicionesDestino.push(DatosCondicion);
                }
            });
            ////$("#txtCampo").val("");
            ////$("#txtDescripcion").val("");
            //$("#ddlTipoDato").val("-1");
            ////$('#ddlTipoDato option:first-child').attr("selected", "selected");
            ////$("#lstPicklist").empty();
            ////VerificarTamano();
            $("#ddlCampoSolicitudOrigen").focus();
            DimPosElementos();
            //Limpiar div referencia
            LimpiarDivReferenciaDestino();
        } else {
            alerta("El campo ingresado ya existe.");
            $("#ddlCampoSolicitudOrigen").focus();
        }
        CargarEstilosControles();
    });

    $("#btnQuitarDestino").live("click", function () {
        var textoQuitar = $("#lblBotonQuitarDestino").text();
        if (textoQuitar == "Quitar" || textoQuitar == "Desactivar" || textoQuitar == "Activar") {
            if (tbCamposDestino.getGridParam('selrow')) {
                var row; var rowNomAdj;
                row = tbCamposDestino.getRowData(tbCamposDestino.getGridParam('selrow'));

                ////if (inNumSolicitudes == 0 || row["IdCampo"] == '0' || row["IdCampo"] == '-1') { //Es un campo nuevo o un tipo sin solicitudes creadas
                    tbCamposDestino.delRowData(tbCamposDestino.getGridParam('selrow')); //eliminar de campo
                    //eliminar Condicion
                    lstCondicionesDestino = jQuery.grep(lstCondicionesDestino, function (cond) {
                        if (cond.IdCampo != row["Campo"]) {
                            return cond;
                        }
                    });
                ////} else { //Es un campo existen el la tabla actual, se desacitva o tipo ya tiene solicitudes creadas
                ////    var colModels = tbCamposDestino.getGridParam("colModel");
                ////    var i;
                ////    for (i in colModels) {
                ////        if (textoQuitar == "Desactivar") {
                ////            if (colModels[i].name != 'Activo') {
                ////                tbCamposDestino.jqGrid('setCell', row["Idd"], i, '', { color: '#cd0a0a' });
                ////            } else {
                ////                tbCamposDestino.jqGrid('setCell', row["Idd"], i, 'False', { color: '#cd0a0a' });
                ////            }
                ////            $("#lblBotonQuitarDestino").text("Activar");
                ////        } else {
                ////            if (colModels[i].name != 'Activo' && colModels[i].name != 'rn') {
                ////                tbCamposDestino.jqGrid('setCell', row["Idd"], i, '', { color: '#363636' });
                ////            } else if (colModels[i].name == 'Activo') {
                ////                tbCamposDestino.jqGrid('setCell', row["Idd"], i, 'True', { color: '#363636' });
                ////            } else {
                ////                tbCamposDestino.jqGrid('setCell', row["Idd"], i, '', { color: '#2e6e9e' });
                ////            }
                ////            //$("#lblBotonQuitarDestino").text("Desactivar");
                ////        }
                ////    }
                ////}

                ////if (textoQuitar == "Activar") {
                ////    //$("#ddlValor").append($("<option></option>").val(row["Campo"]).text(row["Descripcion"]));
                ////    //fnSortDropDownListByText("ddlValor");
                ////    ///fnAgregarParametro("0", row["Campo"], row["Descripcion"], "0", "0");
                ////    $("#ddlCampoTipSolDestino").append($("<option></option>").val(row["Campo"]).text(row["Descripcion"]));
                ////    fnSortDropDownListByText("ddlCampoTipSolDestino");
                ////} else {
                ////    //eliminar de parametros
                ////    //                    $("#ddlValor option[value='" + row["Campo"] + "']").remove();
                ////    //                    fnSortDropDownListByText("ddlValor");
                ////    //fnQuitarParametro(row["Campo"]);
                ////    //eliminar de dialog referencia
                ////    $("#ddlCampoTipSolDestino option[value='" + row["Campo"] + "']").remove();
                ////    fnSortDropDownListByText("ddlCampoTipSolDestino");
                ////}
                //eliminar de parametros
                //                $("#ddlValor option[value='" + row["Campo"] + "']").remove();
                //                fnSortDropDownListByText("ddlValor");
                //                fnQuitarParametrosEnSeccionMensajes(row["Campo"]);
                ////fnQuitarParametro(row["Campo"]);
                //eliminar de dialog referencia
                ////$("#ddlCampoTipSolDestino option[value='" + row["Campo"] + "']").remove();
                ////fnSortDropDownListByText("ddlCampoTipSolDestino");
            } else {
                alerta("Debe seleccionar una fila");
            }
        } else {
            CancelarEdicionCampoDestino();
        }
    });



    ////Editar campo
    //function EditarCampoDestino(IdRow, Nombre, Descripcion, TipoDato, Tamano, Entidad, Campo, IdCampo, Activo, ListaActivos) {
    //    $("#hdfCampoActivo").val(Activo);
    //    idRowCampoEdicion = IdRow.toString();
    //    valRowCampoEdicion = Nombre.toString();
    //    //deshabilitar controles no editables
    //    ////$("#txtCampo").attr("disabled", true);
    //    //        if (inNumSolicitudes > 0 || $("#hdfCodTipSol").val() == "31" || $("#hdfCodTipSol").val() == "30") {

    //    //botones
    //    $("#lblBotonAgregarDestino").text("Actualizar");
    //    $("#lblBotonQuitarDestino").text("Cancelar");
    //    $("#imgAgregarDestino").attr('src', '../../../Common/Images/Mantenimiento/Guardar.png');
    //    $("#imgQuitarDestino").attr('src', '../../../Common/Images/Mantenimiento/Salir.gif');

    //    $("#ddlCampoSolicitudOrigen").val(Nombre);
    //    //$("#txtDescripcion").val(Descripcion);
    //    //$("#ddlTipoDato").val(TipoDato);
    //    ////VerificarTamano();
    //    $("#txtTamanoDato").removeClass("txtBusqueda");
    //    $("#txtTamanoDato").val(Tamano);
    //    //tipo dato referencia
    //    ///if (TipoDato == "10") {
    //    $("#ddlEntidadReferenciaDestino").val(Entidad);
    //    $.ajax({
    //        type: "POST",
    //        url: "Adm_SolicitudesConfiguracion.aspx/ListarCampoEntidadReferenciaDestino",
    //        data: "{'inCodEnt': '" + Entidad + "'}",
    //        contentType: "application/json; charset=utf-8",
    //        dataType: "json",
    //        success: function (result) {
    //            CamposDestino = []; EntidadRelacionDestino = [];
    //            eval(result.d);
    //            var valueddl, textoddl;
    //            $("#ddlCampoEntidadDestino").html('');
    //            var lstKeysCampos = Object.keys(CamposDestino);
    //            var i = 0;
    //            for (i = 0; i < $(lstKeysCampos).length; i++) {
    //                valueddl = CamposDestino[lstKeysCampos[i]].P_inCod;
    //                textoddl = CamposDestino[lstKeysCampos[i]].vcDes;
    //                $("#ddlCampoEntidadDestino").append($('<option></option>').val(valueddl).html(textoddl));
    //            }
    //            $("#ddlCampoEntidadDestino").val(Campo); //set campo
    //            //Cargar condiciones
    //            numCondicion = 0;
    //            valCondicionActual = '';
    //            lstNumCond = [];
    //            $("#tdCondicionesDestino").html('');
    //            var inNumContCreados = numCondicion;
    //            if (lstCondicionesDestino.length > 0) {
    //                var i = 0;
    //                for (i = 0; i < lstCondicionesDestino.length; i++) {
    //                    if (lstCondicionesDestino[i].IdCampo == Nombre) {
    //                        NuevaCondicionDestino();
    //                        $("#ddlCampoEntidadCondicionDestino_" + inNumContCreados).val(lstCondicionesDestino[i].IdCamEnt);
    //                        $("#ddlCampoEntidadCondicionDestino_" + inNumContCreados).change();
    //                        $("#ddlSimboloCondicionDestino_" + inNumContCreados).val(lstCondicionesDestino[i].IdSimboloCondicion);
    //                        //Actualizado el 26/05/2014
    //                        if (lstCondicionesDestino[i].ValorCampoRelacion != '' && lstCondicionesDestino[i].IdCampoRelacion != '') { //campo relacionado a otra entidad
    //                            $("#txtValorCondicionDestino_" + inNumContCreados).val(lstCondicionesDestino[i].NombreCampoRelacion);
    //                            $("#hdfValorCondicionDestino_" + inNumContCreados).val(lstCondicionesDestino[i].ValorCampoRelacion);
    //                            $("#hdfValorCampRelacDestino_" + inNumContCreados).val(lstCondicionesDestino[i].IdCampoRelacion);
    //                        } else if (lstCondicionesDestino[i].IdCampoTipSol != '' && lstCondicionesDestino[i].NombreCampoTipSol != '') { //campo de la solicitud
    //                            $("#txtValorCondicionDestino_" + inNumContCreados).val($("#ddlCampoTipSolDestino option[value='" + lstCondicionesDestino[i].NombreCampoTipSol + "']").text());
    //                            $("#hdfValorCondicionDestino_" + inNumContCreados).val(lstCondicionesDestino[i].NombreCampoTipSol);
    //                        } else if (lstCondicionesDestino[i].TextoCondicion != '') { //campo estático
    //                            $("#txtValorCondicionDestino_" + inNumContCreados).val(lstCondicionesDestino[i].TextoCondicion);
    //                        } else if (lstCondicionesDestino[i].ValorCampoRelacion != '' && lstCondicionesDestino[i].IdCampoRelacion == '') { //para campo lógico
    //                            $("#ddlValorCondicionDestino_" + inNumContCreados).val(lstCondicionesDestino[i].ValorCampoRelacion);
    //                        }
    //                        inNumContCreados = parseInt(inNumContCreados) + 1;
    //                    }
    //                }
    //            }
    //            //if (inNumSolicitudes > 0 || $("#hdfCodTipSol").val() == "31" || $("#hdfCodTipSol").val() == "30") {//edicion de tipo con al menos una solicitud creada
    //            if (inNumSolicitudes > 0 || ($("#hdfPersonalizada").val() == "true" && $("#hdfSoportaEdicion").val() == "1")) {//edicion de tipo con al menos una solicitud creada
    //                ////DeshabilitarDivReferencia();
    //            } else {
    //                NuevaCondicionDestino();
    //            }
    //        },
    //        error: function (xhr, err, thrErr) {
    //            MostrarErrorAjax(xhr, err, thrErr);
    //        }
    //    });
    //    ////} else if (TipoDato == "8") {
    //    ////    var lstTamano = Tamano.split(",");
    //    ////    $('#lstPicklist').html('');
    //    ////    var lstEstado = ListaActivos.split(",");
    //    ////    var i = 0;
    //    ////    for (i = 0; i < lstTamano.length; i++) {
    //    ////        if (lstEstado[i] == '0') {
    //    ////            $('#lstPicklist').append('<option value="' + lstTamano[i] + '" estado="' + lstEstado[i] + '" style="color: #cd0a0a;">' + lstTamano[i] + '</option>');
    //    ////        } else {
    //    ////            $('#lstPicklist').append('<option value="' + lstTamano[i] + '" estado="' + lstEstado[i] + '">' + lstTamano[i] + '</option>');
    //    ////        }
    //    ////    }
    //    ////    //if (IdCampo != '0' && IdCampo != '-1') {
    //    ////    //    //$("#tblPicklistButtons").hide();
    //    ////    //    $("#btnPicklistEditar").button("option", "disabled", true);
    //    ////    //    $("#btnPicklistEliminar").button("option", "disabled", true);
    //    ////    //}
    //    ////}
    //}
    //function CancelarEdicionCampoDestino() {
    //    $("#tbCamposDestino").jqGrid('resetSelection'); //limpiar seleccoin en grilla //agregado 05-01-2015
    //    //habilitar controles no editables
    //    //botones
    //    $("#txtCampo").attr("disabled", false);
    //    $("#txtTamanoDato").attr("disabled", false);
    //    $('#ddlTipoDato').prop('disabled', false);
    //    //$("#btnQuitar").button("option", "disabled", true); //comentado 05-01-2015
    //    //        if ($("#hdfCodTipSol").val() == "31" || $("#hdfCodTipSol").val() == "30") { //con solicitudes // activar edicion 10-10-2014 wapumayta
    //    if ($("#hdfPersonalizada").val() == "true" && $("#hdfSoportaEdicion").val() == "1") { //con solicitudes // activar edicion 10-10-2014 wapumayta
    //        $("#btnAgregar").button("option", "disabled", true); //10-10-2014 wapumayta
    //        $("#btnQuitar").button("option", "disabled", true);

    //        $("#txtCampo").attr("readonly", true);
    //        $("#txtDescripcion").attr("readonly", true);
    //        $('#ddlTipoDato').prop('disabled', true);
    //    }
    //    $("#lblBotonAgregarDestino").text("Agregar");
    //    $("#lblBotonQuitarDestino").text("Quitar");
    //    $("#imgAgregarDestino").attr('src', '../../../Common/Images/Mantenimiento/add_16x16.gif');
    //    $("#imgQuitarDestino").attr('src', '../../../Common/Images/Mantenimiento/Quitar.png');

    //    //limpiar
    //    $("#txtCampo").val('');
    //    $("#txtDescripcion").val('');
    //    $("#ddlTipoDato").val('-1');
    //    $("#lstPicklist").empty();
    //    ////VerificarTamano();
    //    $("#txtCampo").focus();
    //    DimPosElementos();
    //    idRowCampoEdicion = '';
    //    valRowCampoEdicion = '';
    //    LimpiarDivReferenciaDestino();
    //}





    DimPosElementos();

    setTimeout(function () {
        CargarCamposSolicitud();
    }, 1000);

});





function LimpiarDivReferenciaDestino() {
    $("#ddlEntidadReferenciaDestino").val("-1");
    $("#tdCondicionesDestino").html('');
    $("#ddlCampoEntidadDestino").html('');
    $("#ddlCampoSolicitudOrigen").val('');
    $("#ddlCampoEntidadDestino").append($("<option></option>").val("-2").html("Seleccione Entidad"));
}


function CargarCamposSolicitud() {
    $("#ddlCampoSolicitudOrigen").html("");
    $("#ddlCampoTipSolDestino").html("");
    $('#ddlCampoSolicitudOrigen').append('<option value="">Seleccione</option>');
    var IdTipoSolicitud = $("#hdfCodTipSol").val();

    if ($("#hdfPersonalizada").val() == 'true') {
        var vcCampos = tbCampos.getDataIDs();
        var inNumCam = 0;
        for (j = 0; j < vcCampos.length; j++) {
            if (true) {

            }
            var rowCampos = tbCampos.getRowData(vcCampos[j]);
            $('#ddlCampoSolicitudOrigen').append('<option value="' + rowCampos.Campo + '">' + rowCampos.Descripcion + '</option>');
            $('#ddlCampoTipSolDestino').append('<option value="' + rowCampos.Campo + '">' + rowCampos.Descripcion + '</option>');
        }

        $('#ddlCampoSolicitudOrigen').append('<option value="vcResponsable">Responsable de Aprobación</option>');
        $('#ddlCampoSolicitudOrigen').append('<option value="inTecnicoAsignado">Especialista Asignado</option>');
        $('#ddlCampoSolicitudOrigen').append('<option value="inTecnicoProcesar">Especialista Proceso</option>');
        $('#ddlCampoSolicitudOrigen').append('<option value="daFechaPorAprobarApr">Fecha Por Aprobar</option>');
        $('#ddlCampoSolicitudOrigen').append('<option value="daFechaAprobadaApr">Fecha Aprobado</option>');
        $('#ddlCampoSolicitudOrigen').append('<option value="daFechaEnProcesoPro">Fecha En Proceso</option>');
        $('#ddlCampoSolicitudOrigen').append('<option value="daFechaCulminadaPro">Fecha Culminado</option>');

        $('#ddlCampoTipSolDestino').append('<option value="vcResponsable">Responsable de Aprobación</option>');
        $('#ddlCampoTipSolDestino').append('<option value="inTecnicoAsignado">Especialista Asignado</option>');
        $('#ddlCampoTipSolDestino').append('<option value="inTecnicoProcesar">Especialista Proceso</option>');
        $('#ddlCampoTipSolDestino').append('<option value="daFechaPorAprobarApr">Fecha Por Aprobar</option>');
        $('#ddlCampoTipSolDestino').append('<option value="daFechaAprobadaApr">Fecha Aprobado</option>');
        $('#ddlCampoTipSolDestino').append('<option value="daFechaEnProcesoPro">Fecha En Proceso</option>');
        $('#ddlCampoTipSolDestino').append('<option value="daFechaCulminadaPro">Fecha Culminado</option>');
        

    }
    else {
        $('#ddlCampoSolicitudOrigen').append('<option value="vcCodigo">Código Solicitud</option>');
        $('#ddlCampoSolicitudOrigen').append('<option value="vcDesSol">Descripción Solicitud</option>');
        $('#ddlCampoSolicitudOrigen').append('<option value="F_vcCodEmp">Empleado</option>');
        $('#ddlCampoSolicitudOrigen').append('<option value="dcMonto">Monto</option>');
        $('#ddlCampoSolicitudOrigen').append('<option value="F_inCodModDis">Modelo Inicial</option>');
        $('#ddlCampoSolicitudOrigen').append('<option value="inCodMod_Fin">Modelo Final</option>');
        $('#ddlCampoSolicitudOrigen').append('<option value="F_vcCodDis">Dispositivo Inicial</option>');
        $('#ddlCampoSolicitudOrigen').append('<option value="vcCodIMEI_Fin">Dispositivo Final</option>');
        $('#ddlCampoSolicitudOrigen').append('<option value="F_vcNumLin">Línea Inicial</option>');
        $('#ddlCampoSolicitudOrigen').append('<option value="vcNumLin_Fin">Línea Final</option>');
        $('#ddlCampoSolicitudOrigen').append('<option value="inCodPlan_Ini">Plan Inicial</option>');
        $('#ddlCampoSolicitudOrigen').append('<option value="inCodPlan_Fin">Plan Final</option>');
        $('#ddlCampoSolicitudOrigen').append('<option value="vcResponsable">Responsable de Aprobación</option>');
        $('#ddlCampoSolicitudOrigen').append('<option value="inTecnicoAsignado">Especialista Asignado</option>');
        $('#ddlCampoSolicitudOrigen').append('<option value="inTecnicoProcesar">Especialista Proceso</option>');
        $('#ddlCampoSolicitudOrigen').append('<option value="daFechaPorAprobarApr">Fecha Por Aprobar</option>');
        $('#ddlCampoSolicitudOrigen').append('<option value="daFechaAprobadaApr">Fecha Aprobado</option>');
        $('#ddlCampoSolicitudOrigen').append('<option value="daFechaEnProcesoPro">Fecha En Proceso</option>');
        $('#ddlCampoSolicitudOrigen').append('<option value="daFechaCulminadaPro">Fecha Culminado</option>');
        $('#ddlCampoSolicitudOrigen').append('<option value="vcObservacion">Observación</option>');

        $('#ddlCampoTipSolDestino').append('<option value="vcCodigo">Código Solicitud</option>');
        $('#ddlCampoTipSolDestino').append('<option value="vcDesSol">Descripción Solicitud</option>');
        $('#ddlCampoTipSolDestino').append('<option value="F_vcCodEmp">Empleado</option>');
        $('#ddlCampoTipSolDestino').append('<option value="dcMonto">Monto</option>');
        $('#ddlCampoTipSolDestino').append('<option value="F_inCodModDis">Modelo Inicial</option>');
        $('#ddlCampoTipSolDestino').append('<option value="inCodMod_Fin">Modelo Final</option>');
        $('#ddlCampoTipSolDestino').append('<option value="F_vcCodDis">Dispositivo Inicial</option>');
        $('#ddlCampoTipSolDestino').append('<option value="vcCodIMEI_Fin">Dispositivo Final</option>');
        $('#ddlCampoTipSolDestino').append('<option value="F_vcNumLin">Línea Inicial</option>');
        $('#ddlCampoTipSolDestino').append('<option value="vcNumLin_Fin">Línea Final</option>');
        $('#ddlCampoTipSolDestino').append('<option value="inCodPlan_Ini">Plan Inicial</option>');
        $('#ddlCampoTipSolDestino').append('<option value="inCodPlan_Fin">Plan Final</option>');
        $('#ddlCampoTipSolDestino').append('<option value="vcResponsable">Responsable de Aprobación</option>');
        $('#ddlCampoTipSolDestino').append('<option value="inTecnicoAsignado">Especialista Asignado</option>');
        $('#ddlCampoTipSolDestino').append('<option value="inTecnicoProcesar">Especialista Proceso</option>');
        $('#ddlCampoTipSolDestino').append('<option value="daFechaPorAprobarApr">Fecha Por Aprobar</option>');
        $('#ddlCampoTipSolDestino').append('<option value="daFechaAprobadaApr">Fecha Aprobado</option>');
        $('#ddlCampoTipSolDestino').append('<option value="daFechaEnProcesoPro">Fecha En Proceso</option>');
        $('#ddlCampoTipSolDestino').append('<option value="daFechaCulminadaPro">Fecha Culminado</option>');
        $('#ddlCampoTipSolDestino').append('<option value="vcObservacion">Observación</option>');

    }
}