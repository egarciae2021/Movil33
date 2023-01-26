
function servicio(P_inCod, vcCodSer, vcNom, vcGlo, btEst, btAgrConfPlaSal) {
    this.P_inCod = P_inCod;
    this.vcCodSer = vcCodSer;
    this.vcNom = vcNom;
    this.TipoServicio = new setTipoServicio();
    this.vcGlo = vcGlo;
    this.btEst = btEst;
    this.btAgrConfPlaSal = btAgrConfPlaSal;
}

function setTipoServicio(P_inCod) {
    this.P_inCod = P_inCod;
}

//function seleccionarGlobal() {
//    var ddl = document.getElementById("ddlGlobal");
//    var ddltext = ddl.options[ddl.selectedIndex].text;
//    var ddlval = ddl.value;
//    alert(ddltext + " " + ddlval);
//};

$(function () {

    $("#txtCodigo").keypress(ValidarCodigoVarChar);
    $("#txtNombre").keypress(ValidarAlfaNumericoConEspacios);
    //$("#ddlGlobal").data("kendoComboBox");
    var indiceTab = window.parent.tab.tabs("option", "selected");

    $('#txtTipoServicio').live("keypress", function (e) {
        return ValidarAlfaNumericoConEspaciosYCaracteres(e);
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

    ActivarCombokendo("#ddlGlobal", "200");

    function CerroMensaje() {
        BloquearPagina(false);
        if ($("#hdfServicio").val() == "") {//Nuevo
            $("#txtCodigo").val("");
            $("#txtNombre").val("");
            $("#txtTipoServicio").val("");
            $("#hdfTipoServicio").val("");
            //$("#ddlGlobal").val("0");
            //$("#ddlGlobal").data("kendoComboBox").value("-1");
        }
        else {//Edicion
            window.parent.tab.tabs("remove", indiceTab);
        }
    }



    $("#btnCerrar").live("click", function () {
        window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));
    }); //boton cerrar JSILUPU - JUL2013


    $(".btnNormal").button();

    var vcCodSer = $("#hdfServicio").val();
    var Selecciono;
    if ($("#txtTipoServicio").length > 0) {
        $("#txtTipoServicio").autocomplete({
            minLength: 0,
            source: function (request, response) {
                $.ajax({
                    type: "POST",
                    url: "Mnt_Servicio.aspx/ListarTipoServicioPorCodigoNombre",
                    data: "{'vcCriterio': '" + $("#txtTipoServicio").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92") + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        response($.map(result.d, function (item) {
                            return {
                                label: item.vcNom.replace(/&#39/g, "'").replace(/&#92/g, "\\").replace(/&#34/g, '"'),
                                P_inCod: item.P_inCod
                            };
                        }));
                    },
                    error: function (xhr, err, thrErr) {
                        MostrarErrorAjax(xhr, err, thrErr);
                    }
                });
            },
            focus: function (event, ui) {
                $("#txtTipoServicio").val(ui.item.label);
                return false;
            },
            select: function (event, ui) {
                Selecciono = true;
                $("#txtTipoServicio").val(ui.item.label);
                $("#hdfTipoServicio").val(ui.item.P_inCod);
                $("#ddlGlobal").focus();
                return false;
            },
            change: function (event, ui) {
                if (!Selecciono || !ui.item) {
                    $("#hdfTipoServicio").val("");
                    $("#txtTipoServicio").val('');
                }
                return false;
            },
            open: function (event, ui) {
                Selecciono = false;
                return false;
            }
        })
        .data("autocomplete")._renderItem = function (ul, item) {
        return $("<li></li>")
             .data("item.autocomplete", item)
             .append("<a>" + item.P_inCod + "=" + item.label + "</a>")
             .appendTo(ul);
             };
        }
    $("#btnGuardar").click(function (event) {
        var Servicio = new servicio();
        Servicio.vcCodSer = $("#txtCodigo").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92");
        Servicio.vcNom = $("#txtNombre").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92");
        Servicio.TipoServicio.P_inCod = parseInt($("#hdfTipoServicio").val());
        var ddl = document.getElementById("ddlGlobal");
        Servicio.vcGlo = ddl.options[ddl.selectedIndex].text;

        if ($("#txtCodigo").val() == "") {
            alerta("El Código es un campo obligatorio.");
            $("#txtCodigo").focus();
            return;
        }
        if ($("#txtNombre").val() == "") {
            alerta("El Nombre es un campo obligatorio.");
            $("#txtNombre").focus();
            return;
        }
        if ($("#hdfTipoServicio").val() == "") {
            alerta("El Tipo de Servicio es un campo obligatorio.");
            $("#hdfTipoServicio").focus();
            return;
        }
        if (Servicio.vcGlo == "<-Seleccione un Global->") {
            alerta("El Global es un campo obligatorio.");
            $("#ddlGlobal").focus();
            return;
        }

        var vcCodSer;
        if ($("#hdfServicio").val() == "") {
            vcCodSer = 0;
        } else {
            vcCodSer = parseInt($("#hdfServicio").val());
            Servicio.P_inCod = vcCodSer;
        }

        Servicio.btEst = $('#chActivo').is(':checked');
        Servicio.btAgrConfPlaSal = $('#chkAgrConfPlaSal').is(':checked');

        var oServicio = JSON.stringify(Servicio);

        $.ajax({
            type: "POST",
            url: "Mnt_Servicio.aspx/Guardar",
            //data: "{'oCompania': '" + oCompania + "'}",

            data: "{'oServicio': '" + oServicio + "'," +
                                           "'vcCodSer': '" + vcCodSer + "'}", //.replace(/'/g, "&#39")

            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.d == "0") {
                    window.parent.ActualizarGrilla();
                    Mensaje("<br/><h1>Servicio guardado</h1><br/><h2>" + Servicio.vcCodSer + "</h2>", document, CerroMensaje);
                }
                else {
                    alerta("El Código del servicio ya ha sido registrado anteriormente, no se pudo grabar el registro");
                    BloquearPagina(false);
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
                BloquearPagina(false);
            }
        });
    });

    $("input[name='ddlGlobal_input']").attr("disabled", true);
    $("#txtCodigo").focus();
});


function validarEspaciosEnBlancoAlInicio(id) {
    var valor = $("#"+id.toString()+"").val();
    $("#" + id.toString() + "").val($.trim(valor));
}

//function seleccion() {
//    //var DropdownList = document.getElementById('<%=ddlGlobal %>');
//    var ddl = document.getElementById("ddlGlobal");
//    var SelectedIndex = ddl.selectedIndex;
//    var SelectedValue = ddl.value;
//    var SelectedText = ddl.options[ddl.selectedIndex].text;

//    alert('Index ' + SelectedIndex + ' Value ' + SelectedValue + ' Text ' + SelectedText);
//    //alert('Index: ' + SelectedIndex + ' Selected Value: ' + SelectedValue + ' Selected Text: ' + SelectedText);
//}

