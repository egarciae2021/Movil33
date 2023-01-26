var altoPagina = 0;
$(document).ready(function () {

    $("#cronograma").css('display', 'none');
    altoPagina = $(window).height();

    var dataDDL = [{ text: "Cod. Empleado", value: "EMPL_P_vcCODEMP" },
                { text: "Área", value: "ORGA_vcNOMORG" },
                { text: "Nombre Empleado", value: "EMPL_vcNOMEMP" },
    ];

    $("#ddlFacBusEmpleado").kendoDropDownList({
        optionLabel: {
            text: "Seleccione el Filtro...",
            value: ""
        },
        dataSource: dataDDL,
        dataTextField: "text",
        dataValueField: "value"
    });

    enlacesLoad();
    $("#generalCarrito").show();
    function enlacesLoad() {
        $("#generalCarrito").show();
        $(".tap").removeClass("tapSelect");
        $("#tapTicket").addClass("tapSelect");
        $("#detalleTaps > div").hide(0, function () {
            $("#pSelecTicket").fadeIn(200);
        });



        $('.tabDesc').hover(function () {
            $(this).animate({ marginRight: '10px', marginLeft: '15px' }, 300);

        }, function () {
            $(this).animate({ marginRight: '0px', marginLeft: '2px' }, 300);
        });

        $('.tabDesc').click(function () {
            $('.tabDesc').removeClass("tabSelect");
            $(this).addClass("tabSelect");
        });

        $("#tapTicket").click(function () {
            $(".tap").removeClass("tapSelect");
            $("#tapTicket").addClass("tapSelect");
            $("#detalleTaps > div").hide(0, function () {
                $("#pSelecTicket").fadeIn(200);
            });
        });

        $("#tapDetalle").click(function () {
            $(".tap").removeClass("tapSelect");
            $("#tapDetalle").addClass("tapSelect");
            $("#detalleTaps > div").hide(0, function () {
                $("#pSelecDetalle").fadeIn(200);
            });
        });



        $('.tap').hover(function () {
            $(this).animate({ marginRight: '10px', marginLeft: '30px' }, 300);

        }, function () {
            $(this).animate({ marginRight: '0px', marginLeft: '20px' }, 300);
        });
    }


    $("#grEmpleados").kendoGrid({
        dataSource: {
            data: {},
            pageSize: 10
        },
        //              dataBound: onDataBound,
        selectable: "single",
        sortable: false,

        pageable: {

            pageSizes: 5,
            buttonCount: 6,
            messages: {
                itemsPerPage: "ítems por página",
                display: "{0}-{1} de {2} ítems",
                empty: ""
            }
        },
        columns: [
                            { field: "P_vcCod", title: "Código", width: "50px" },
                            { field: "vcNom", title: "Nombres y Apellidos", width: "100px" },
                            { field: "Area.vcNomOrg", title: "Área", width: "100px" },
                            {
                                command: [
                                   {
                                       className: "k-button",
                                       //                                       name: "edit",
                                       text: "Ver",
                                       //style: "text-align: center; font-size: 6px",
                                       click: function (e) {

                                           // e.target is the DOM element representing the button
                                           var tr = $(e.target).closest("tr"); // get the current table row (tr)
                                           // get the data bound to the current table row                          
                                           var data = this.dataItem(tr);
                                           //console.log(data.uid);
                                           //var dataRow = $('#gridFormaPago').data("kendoGrid").dataSource.getByUid(uid);
                                           Actualizar_Item(data);
                                       }
                                   }], title: "&nbsp;", width: "50px"
                            }
                        ]
    });


    //    function onDataBound() {
    //        var trs = $(".k-selectable > tbody > tr");
    //        for (var i = 0; i < trs.length; i++) {
    //            if (trs[i].cells[5].innerText == 'false') {
    //                $(trs[i]).css("background-color", "#E5E5E5");
    //                $(trs[i]).css("font-weight", "bold");

    //            }
    //        }
    //    }




    //Cargando La Grilla vacia para que sea visualizada en la primera carga
    function cargar_empleados(_filtro, _valor) {


        $.ajax({
            type: "POST",
            url: "Fac_ConsultasAdmin.aspx/getListaEmpleado",
            data: JSON.stringify({
                'filtro': _filtro, 'valor': _valor
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {

                var resul = data.d;
                if (data.d.length > 0) {



                    var dataSource = new kendo.data.DataSource({
                        //                      data: JSON.parse(resul[1]),
                        data: data.d,
                        pageSize: 10
                    });



                    var gridele = $("#grEmpleados").data("kendoGrid");
                    gridele.setDataSource(dataSource);
                    gridele.select("tr:eq(1)");

                }

            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }

        });
    }

    //Busqueda de Empleados deacuerdo al criterio seleccionado
    $("#btnFacBusEmpleado").click(function () {

        var _filtro = $("#ddlFacBusEmpleado").val();
        var _valor = $("#txtFacBusEmpleado").val();
        cargar_empleados(_filtro, _valor);

    });

    //    var pagina = "../Consultar/Con_Fac_CronogramaPagos.aspx?Adm=" + adm + "&IdEmpl=";
    //    var pagina = "";
    //    var window = $("#cronograma");


    //    if (!window.data("kendoWindow")) {
    //        window.kendoWindow({
    //            width: "1200px",
    //            heigth: "800px",
    //            position: {
    //                top: 100,
    //                left: 200
    //            },
    //            //            content: pagina,
    //            iframe: true,
    //            modal: true,
    //            resizable: false,
    //            actions: ["Close"],
    //            title: "Cronograma de Pagos",
    //            close: function () {
    //                $("#cronograma").hide();
    //            }
    //        });
    //    }



    //Para cargar el pop up de Editar
    function Actualizar_Item(data) {

        if (data != null) {
            $("#cronograma").css('display', 'block');
            $("#cronograma").show();
            var $pagina = "../Consultar/Con_Fac_CronogramaPagos.aspx?Adm=" + 1 + "&IdEmpl=" + data.P_vcCod;


            $("#ifCronograma").attr("src", $pagina);

            Modal = $('#cronograma').dialog({
                title: "Cronograma de Pagos",
                width: "780px",
                modal: true,
                resizable: false
            });

            Modal.dialog("option", "buttons", {
                "Cerrar": function () {
                    $(this).dialog("close");
                    return true;
                }
            });

            //            var window = $("#cronograma");
            //            var window = $("#cronograma").data("kendoWindow");
            //            window.content(pagina);
            //            centrar_PopUp();
            //            window.open();
            //            console.log(pagina);
            //            //            window.data("kendoWindow").open();
            //            window.kendoWindow({
            //                width: "1200px",
            //                heigth: "800px",
            //                position: {
            //                    top: 100,
            //                    left: 200
            //                },
            //                content: pagina,
            //                iframe: true,
            //                modal: true,
            //                resizable: false,
            //                actions: ["Close"],
            //                title: "Cronograma de Pagos",
            //                close: function () {
            //                    $("#cronograma").hide();
            //                }
            //            });
        }


    }

    function centrar_PopUp() {
        var dialog = $("#cronograma").data("kendoWindow");
        dialog.center();
    }


    function redirect(pagina) {
        //location.href = "http://localhost:63096/" + pagina;
        window.open("http://localhost:63096/" + pagina, '_blank');
    }

    $("#btnCerrar").click(function () {
        var Nametab = window.parent.tabschild[window.parent.tabPrincipal.tabs("option", "selected")].id;
        var Accord = window.parent.$("#" + Nametab);
        Accord.tabs("remove", Accord.tabs("option", "selected"));
    });
});
