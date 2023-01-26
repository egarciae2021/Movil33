        $(function () {
            
            window.parent.tblLlamada = $("#tbConsulta").jqGrid({
                //sortable: true,
                datatype: function () {
                    $.ajax({
                        url: "Con_Resumen.aspx/Listar", //PageMethod
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
                colModel: [{ name: 'vcCod', index: 'vcCod', label: 'Meses', width: '80' },
                           { name: 'vcRenBas', index: 'vcRenBas', label: 'Renta Basica', width: '70' },
                           { name: 'vcLoc', index: 'vcLoc', label: 'Locales', width: '60' },
   		                   { name: 'vcDDN', index: 'vcDDN', label: 'Nacionales', width: '70' },
   		                   { name: 'vcCEL', index: 'vcCEL', label: 'Movil', width: '80' },
   		                   { name: 'vcDDI', index: 'vcDDI', label: 'Internacional', width: '80' },
   		                   { name: 'vcOtrCar', index: 'vcOtrCar', label: 'Otros Cargos', width: '55' },
   		                   { name: 'vcImp', index: 'vcImp', label: 'Impuestos', width: '70' },
   		                   { name: 'vcTot', index: 'vcTot', label: 'Total' }
   	                      ],
                loadtext: 'Cargando datos...',
                recordtext: "{0} - {1} de {2} elementos",
                emptyrecords: 'No hay resultados para los criterios seleccionados',
                viewrecords: true, //Show the RecordCount in the pager.
                multiselect: false,
                sortname: "vcCod", //Default SortColumn
                sortorder: "asc", //Default SortOrder.
                width: $(window).width() - 20,
                height: $(window).height() - 170,
                rownumbers: true,
                shrinkToFit: false
            }).navGrid("#Paginador", { edit: false, add: false, search: false, del: false });
                        
        });