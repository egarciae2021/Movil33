
$(function () {
    IniciarPagina();
    $(".btnNormal").button();
    function IniciarPagina() {
        $("#txtNombre").focus();
    }
    $("#btnGuardar").live("click", function () {
        var Codigo = $("#hdfCodigo").val().replace(/\\/g, "");
        var Nombre = $("#txtNombre").val().replace(/\\/g, "");
        var Archivo = $("#hdfArchivo").val();
        var Estado = $("#hdfEstadoNiv").val();

        if ($.trim(Nombre) == "") {
            window.top.alerta("El Nombre es un campo obligatorio");
            //window.top.alert("El Nombre es un campo obligatorio");
            $("#txtNombre").val("");
            $("#txtNombre").focus();
            return;
        }

        //if (Archivo == "0") {
        //    alerta("El Ícono es un campo obligatorio");
        //$("#txtNombre").focus();
        //    return;
        //}

        $("#dvCargando").show();
        //alerta("{'Codigo': '" + Codigo + "', 'Nombre': '" + Nombre + "', 'inCodEst': '" + $("#hdfEstado").val() + "'}");

        $.ajax({
            type: "POST",
            url: "Mnt_NivelOrganizacion.aspx/Guardar",
            data: "{'Codigo': '" + Codigo + "','Nombre': '" + Nombre.replace(/'/g, "&#39") + "', 'Archivo': '" + Archivo + "', 'inCodEst': '" + $("#hdfEstado").val() + "', 'estado':'" + $("#hdfEstadoNiv").val() + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                $("#dvCargando").hide();
                if (msg.d == "") {
                    window.parent.ActualizarGrilla();
                    Mensaje("<br/><h1>Nivel de Organización guardado</h1><br/>", document, CerroMensaje);
                }
                else {
                    alerta("Revisar: " + msg.d);
                }
            },
            error: function (xhr, err) {
                $("#dvCargando").hide();
                alerta("Error, Estadow: " + xhr.readyState + "\nEstado: " + xhr.status);
            }
        });
    });
    CargarIFrame($("#hdfCodigo").val());

    var indiceTab = window.parent.tab.tabs("option", "selected");
    function CerroMensaje() {
        if ($("#hdfEstado").val() == "") {
            //$("#txtCodigo").val("");
            $("#txtNombre").val("");
            //$("#txtNombre").focus();
            //$("#btneliminar").hide();
            //$("#imgIcono").hide();

            //location.reload();//problema
            CargarIFrame(0);


            //$("#flUpload").attr(Visible, true);
            //$("#btnsubir").attr(Visible, true);
            //$("#flUpload").removeAttr('visibility');
            //$("#btnsubir").removeAttr('visibility');
            //$("#flUpload").css("visibility ", "visible");
            //$("#btnsubir").css("visibility ", "visible");
        }
        else {
            //window.parent.location.reload();
            window.parent.tab.tabs("remove", indiceTab);
        }
        //window.parent.location.reload();
    }

    $("#btnCerrar").live("click", function () {
        window.parent.tab.tabs("remove", indiceTab);
    });
});


//function resetFormElement(e) {
//  e.wrap('<form>').closest('form').get(0).reset();
//  e.unwrap();
//}​;

function CargarIFrame(idnivel) {
    //var idnivel = $("#hdfCodigo").val();
    var $pagina = "CargaIcono.aspx?Id=" + idnivel;
    $("#ifCargaIcono").attr("src", $pagina);
}