var data = [
    {
        title: "Bolsa 1",
        key: "1"
    },
    {
        title: "Bolsa 2",
        key: "2"
    },
    {
        title: "Bolsa 3",
        key: "3",
        children: [
            {
                title: "Bolsa 2",
                key: "2"
            },
            {
                title: "Bolsa 2",
                key: "2"
            },
            {
                title: "Bolsa 2",
                key: "2"
            }
        ]
    },
    {
        title: "Bolsa 4",
        key: "4"
    },
    {
        title: "Bolsa 5",
        key: "5"
    }
];


$(function () {
    InicializarElementos();
    InicializarEventos();
});

function InicializarElementos() {
    $(".boton").button();




        $.ajax({
            type: "POST",
            url: "SOA_Mnt_Bolsas.aspx/obtenerBolsasNivelcero_tree",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (resultado) {
                var resul = resultado.d;

    //            $("#treebolsas").dynatree({
    //                selectmode: 3,
    //                children: data,
    //                idprefix: "tree-",
    //                fx: { height: "toggle", duration: 200 },
    //                onselect: function (select, node) {
    //                    node.data.select = select;
    //                }
                //            });

                $("#treeBolsas").dynatree({
                    selectMode: 3,
                    children: resul,
                    idPrefix: "tree-",
                    fx: { height: "toggle", duration: 200 },
                    onSelect: function (select, node) {
                        node.data.select = select;
                    }
                });


            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
}

function InicializarEventos() {


}