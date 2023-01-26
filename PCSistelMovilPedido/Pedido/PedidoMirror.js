$(function () {
    $("#btnVolverPedidos").hide();

    $("#grid1").kendoGrid({
        dataSource: {
            data: datosGrilla,
            pageSize: 7,
            group: {
                field: "Estado", aggregates: [{ field: "Equipo", aggregate: "count" },
                                                { field: "PrecioEquipo", aggregate: "sum" },
                                                { field: "PrecioPlan", aggregate: "sum"}]
            },
            aggregate: [{ field: "Equipo", aggregate: "count" },
                        { field: "PrecioEquipo", aggregate: "sum" },
                        { field: "PrecioPlan", aggregate: "sum"}]
        },
        sortable: false,
        scrollable: false,
        pageable: {
            refresh: true,
            pageSizes: true,
            messages: {
                itemsPerPage: "ítems por página",
                display: "{0}-{1} de {2} ítems",
                empty: ""
            }
        },
        columns: [{ field: "idDetallePedido", title: "idDetallePedido", hidden: true },
                    { field: "NumeroItem", title: "Ítem", hidden: true },
                    { field: "Equipo", title: "Descripción", footerTemplate: "Total equipos: #=count#", groupFooterTemplate: "Total: #=count#" },
                    { field: "PrecioEquipo", title: "Precio Equipo", footerTemplate: '<div style="float:right">Total: #=sum#</div>', groupFooterTemplate: '<div style="float:right">Precio: #=sum#</div>', attributes: { style: "text-align: right" }, format: "{0:#,#.00}" },
                    { field: "Plan", title: "Plan" },
                    { field: "PrecioPlan", title: "Precio Plan", footerTemplate: '<div style="float:right">Total: #=sum#</div>', groupFooterTemplate: '<div style="float:right">Precio: #=sum#</div>', attributes: { style: "text-align: right"} },
                    { field: "Numero", title: "Número"}]
    });

});