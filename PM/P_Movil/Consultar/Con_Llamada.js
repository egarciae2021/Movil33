        function Actualizar() {
            location.reload();
        }
        var SimDec = ".";
        var SimMil = ",";
        var NumDec = "2";

        var inFilas;
        var nuAltoFila = 23.04;
        var ArrayPaginacion = [];

        $(function () {
            var idCol;
            $(".btnNormal").button({});
            NumeroInicialFilas();
            //cultura (configuracion regional)
            oCulturaUsuario = window.parent.parent.parent.parent.oCulturaUsuario;
            SimMil = oCulturaUsuario.vcSimSepMil;
            NumDec = oCulturaUsuario.dcNumDec;
            SimDec = oCulturaUsuario.vcSimDec;

            inicio();

            window.parent.tblLlamada = $("#tbConsulta").jqGrid({
                //sortable: true,
                datatype: function () {
                    $.ajax({
                        url: "Con_Llamada.aspx/Listar", //PageMethod
                        data: "{'inPagTam':'" + $('#tbConsulta').getGridParam("rowNum") + "'," + //Tamaño de pagina
                               "'inPagAct':'" + parseInt($('#tbConsulta').getGridParam("page")) + "'," + //Pagina actual
                               "'vcOrdCol':'" + $('#tbConsulta').getGridParam("sortname") + "'," + //Nombre de columna ordenado
                               "'vcTipOrdCol':'" + $('#tbConsulta').getGridParam("sortorder") + "'," +
                               "'oCriterio': '" + JSON.stringify(window.parent.Criterio) + "'}", //Tabla
                        dataType: "json",
                        type: "post",
                        contentType: "application/json; charset=utf-8",
                        success: function (result) {
                            var resultado = JSON.parse(result.d);
                            $("#tbConsulta")[0].addJSONData(resultado["JQGrid"]);
                            window.parent.Criterio.vcTab = resultado["vcTab"];
                        },
                        error: function (xhr, err, thrErr) {
                            MostrarErrorAjax(xhr, err, thrErr);
                        }
                    });
                },
                jsonReader: //Set the jsonReader to the JQGridJSonResponse squema to bind the data.
                {
                root: "Items",
                page: "PaginaActual",
                total: "TotalPaginas",
                records: "TotalRegistros",
                repeatitems: true,
                cell: "Row",
                id: "ID"
            },
            colModel: [{ name: 'RowNumber', index: 'RowNumber', label: 'Id', hidden: true },
                       { name: 'vcFec', index: 'vcFec', label: 'Fecha', width: '70', formatter: function (value, options, rData) { return value.substring(6, 8) + "/" + value.substring(4, 6) + "/" + value.substring(0, 4); } },
                       { name: 'vcHor', index: 'vcHor', label: 'Hora', width: '60', align: 'Center' },
   		               { name: 'vcNumCel', index: 'vcNumCel', label: 'Celular', width: '70' },
                       { name: 'vcCodEmp', index: 'vcCodEmp', label: 'Cod. Emp.', width: '70' },
   		               { name: 'vcNomEmp', index: 'vcNomEmp', label: 'Empleado' },
   		               { name: 'vcNomOrg', index: 'vcNomOrg', label: 'Área', width: '80' },
   		               { name: 'vcCodSuc', index: 'vcCodSuc', label: 'Cod. Suc.', width: '55', align: 'Right' },
   		               { name: 'vcNumTel', index: 'vcNumTel', label: 'Número', width: '70', align: 'Right' },
   		               { name: 'vcNomTel', index: 'vcNomTel', label: 'Empresa/Persona' },
   		               { name: 'vcNomSer', index: 'vcNomSer', label: 'Servicio', width: '50' },
   		               { name: 'vcDurRea', index: 'vcDurRea', label: 'Duración', width: '60', align: 'Center' },
            //{ name: 'dcCosLla', index: 'dcCosLla', label: 'Costo', width: '60', align: 'Right' },
            //{name: 'dcCosLla', index: 'dcCosLla', label: 'Costo', width: '60', align: 'Right', formatter: "currency", formatoptions: { decimalSeparator: SimDec, thousandsSeparator: SimMil, decimalPlaces: parseInt(NumDec)} },
                       {name: 'dcCosLla', index: 'dcCosLla', label: 'Costo', width: '60', align: 'Right' },
   		               { name: 'vcGlo', index: 'vcGlo', label: 'Global', width: '40' },
   		               { name: 'vcCodPai', index: 'vcCodPai', label: 'Cod. País', width: '60', align: 'Right' },
   		               { name: 'inBytEnv', index: 'inBytEnv', label: 'Bytes env.', width: '60', align: 'Right' },
   		               { name: 'inBytRec', index: 'inBytRec', label: 'Bytes rec.', width: '60', align: 'Right' },
            //jherrera 20130507 Nueva columna
            //-------------------------------
                       {name: 'vcDesLinTip', index: 'vcDesLinTip', label: 'Tipo de Línea', width: '80' }
            //-------------------------------
   	                  ],
            pager: "#Paginador", //Pager.
            loadtext: 'Cargando datos...',
            recordtext: "{0} - {1} de {2} elementos",
            emptyrecords: 'No hay resultados para los criterios seleccionados',
            pgtext: 'Pág: {0} de {1}', //Paging input control text format.
            rowNum: inFilas, // PageSize.
            rowList: ArrayPaginacion, //Variable PageSize DropDownList. 
            viewrecords: true, //Show the RecordCount in the pager.
            multiselect: false,
            sortname: "vcFec", //Default SortColumn
            sortorder: "asc", //Default SortOrder.
            width: $(window).width() - 30,
            height: $(window).height() - 160 - 20,
            rownumbers: true,
            caption: "Llamadas",
            shrinkToFit: false,
            //viewsortcols: true,
            onSelectRow: function (id) {
                //alert(id);
            },
            sortable: function (permutation) {
                //var colModels = $("#grid").getGridParam("colModel");
                //alert(colModels);
            },
            resizeStop: function (width, index) {
                //alerta("resize column " + index + " to " + width + "pixels");
            }, //,
            onRightClickRow: function (rowid, iRow, iCol, e) {
                idCol = iCol;
            }
            //onSortCol: function(name,index){  alerta("Column Name: "+name+" Column Index: "+index); },
            //ondblClickRow: function(id){ if($("#hdfEdicion").val() == "1") EditaRegistro(id); },
        }).navGrid("#Paginador", { edit: false, add: false, search: false, del: false });

        $(window).resize(function () {
            $("#tbConsulta").setGridWidth($(window).width() - 20);
            $("#tbConsulta").setGridHeight($(window).height() - 180);
        });

        function inicio() {

        }

        $("#btnImprimir").click(function () {
            switch (parseInt($("#ddlTipoReporte").val())) {
                case 1: //Resumen de servicios por celulares / directos
                    window.parent.AbrirTab("Con_Reporte_DevExpress.aspx?Tipo=1&SubTipo=1&NumCriterio=" + window.parent.Criterio.inNumCri, "#TabLlamadas_ResSerXCelDir", "Resumen Serv. Celular");                  
                    break;
                case 2: //Resumen de servicios por empleado
                    window.parent.AbrirTab("Con_Reporte_DevExpress.aspx?Tipo=1&SubTipo=2&NumCriterio=" + window.parent.Criterio.inNumCri, "#TabLlamadas_ResSerXEmpl", "Resumen Serv. Empleado");
                    //window.parent.AbrirTab("../Administrar/Adm_ReporteDevExpress.aspx?Tipo=1&SubTipo=2&NumCriterio=" + window.parent.Criterio.inNumCri, "#TabLlamadas_ResSerXEmpl", "Resumen Serv. Empleado");
                    break;
                case 3: //Detalle de servicios por celulares / directos
                    window.parent.AbrirTab("Con_Reporte_DevExpress.aspx?Tipo=1&SubTipo=3&NumCriterio=" + window.parent.Criterio.inNumCri, "#TabLlamadas_DetSerXCelDir", "Detalle Serv. Celular");
                    break;
                case 4: //Detalle de servicios por empleado
                    window.parent.AbrirTab("Con_Reporte_DevExpress.aspx?Tipo=1&SubTipo=4&NumCriterio=" + window.parent.Criterio.inNumCri, "#TabLlamadas_DetSerXEmpl", "Detalle Serv. Empleado");
                    break;
                case 5: //Tipo de llamada por empleado
                    window.parent.AbrirTab("Con_Reporte_DevExpress.aspx?Tipo=1&SubTipo=5&NumCriterio=" + window.parent.Criterio.inNumCri, "#TabLlamadas_TipLlaXEmpl", "Tipo Llamada Empleado");
                    break;
                case 6: //Consumo por planes
                    window.parent.AbrirTab("Con_Reporte_DevExpress.aspx?Tipo=1&SubTipo=6&NumCriterio=" + window.parent.Criterio.inNumCri, "#TabLlamadas_ConsumoXPlan", "Consumo por planes");
                    break;
                case 7: //Detalle de planes dentro del plan
                    window.parent.AbrirTab("Con_Reporte_DevExpress.aspx?Tipo=1&SubTipo=7&NumCriterio=" + window.parent.Criterio.inNumCri, "#TabLlamadas_DetPlanDentroPlan", "Detalle Planes Dentro del Plan");
                    break;
                case 8: //Detalle de planes fuera del plan y/o exceso
                    window.parent.AbrirTab("Con_Reporte_DevExpress.aspx?Tipo=1&SubTipo=8&NumCriterio=" + window.parent.Criterio.inNumCri, "#TabLlamadas_DetPlanFueraExcesoPlan", "Detalle Planes Fuera del Plan y/o Exceso");
                    break;
                case 9: //RRAMOS
                    window.parent.AbrirTab("Con_ReporteExceso.aspx?Tipo=1&SubTipo=8&NumCriterio=" + window.parent.Criterio.inNumCri, "#TabLlamadas_DetPlanFueraExcesoPlan", "Detalle Planes Fuera del Plan y/o Exceso");
                    break;
            }
        });

        $('#tbConsulta').contextMenu('dvMenu', {
            onContextMenu: function (e) {
                if (idCol == 0) {
                    return false;
                }
                else {
                    return true;
                }
            },
            onShowMenu: function (e, menu) {
                var ExisteSumario = false;
                var colModels = $("#tbConsulta").getGridParam("colModel");
                var nomCol = "";
                for (i in colModels) {
                    if (i == idCol) {
                        if (colModels[i].name == "vcFec" || colModels[i].name == "vcHor" || colModels[i].name == "vcNumOri" || colModels[i].name == "vcNomEmp" || colModels[i].name == "vcCodOrg" || colModels[i].name == "vcNumDes") {
                            ExisteSumario = true;
                        }
                        break;
                    }
                }
                if (!ExisteSumario) {
                    $('#Acumula', menu).remove();
                }
                return menu;
            },
            bindings: {
                'Ascendente': function (t) {
                    if (idCol > 0) {
                        var colModels = $("#tbConsulta").getGridParam("colModel");
                        var nomCol = "";
                        for (i in colModels) {
                            if (i == idCol) {
                                nomCol = colModels[i].name;
                                break;
                            }
                        }
                        $("#tbConsulta").jqGrid("setGridParam", { sortname: nomCol, sortorder: 'asc' }).trigger('reloadGrid');
                    }
                },
                'Descendente': function (t) {
                    if (idCol > 0) {
                        var colModels = $("#tbConsulta").getGridParam("colModel");
                        var nomCol = "";
                        for (i in colModels) {
                            if (i == idCol) {
                                nomCol = colModels[i].name;
                                break;
                            }
                        }
                        $("#tbConsulta").jqGrid("setGridParam", { sortname: nomCol, sortorder: 'desc' }).trigger('reloadGrid');
                    }
                },
                'Acumula': function (t) {
                    if (idCol > 0) {
                        var colModels = $("#tbConsulta").getGridParam("colModel");
                        var nomCol = "";
                        for (i in colModels) {
                            if (i == idCol) {
                                nomCol = colModels[i].name;
                                break;
                            }
                        }
                        switch (nomCol) {
                            case "vcFec": //Fecha
                                window.parent.AbrirSumario("11");
                                break;
                            case "vcHor": //Hora
                                window.parent.AbrirSumario("12");
                                break;
                            case "vcNumOri": //Numero
                                window.parent.AbrirSumario("3");
                                break;
                            case "vcNomEmp": //Empleado
                                window.parent.AbrirSumario("4");
                                break;
                            case "vcCodOrg": //Area
                                window.parent.AbrirSumario("2");
                                break;
                            case "vcNumDes": //Numero llamado
                                window.parent.AbrirSumario("6");
                                break;
                        }
                    }
                }
            }
        });
    });

    function NumeroInicialFilas() {
        inFilas = Math.floor(($(window).height() - 170) / nuAltoFila);

        ArrayPaginacion.push(inFilas);
        ArrayPaginacion.push(inFilas + inFilas);
        ArrayPaginacion.push(inFilas + inFilas + inFilas);
    }