$(function () {

    var lstOficina;
    var idSetInterval;
    var timeoutHnd;
    var Ancho = $(window).width();

    function ListaDepartamento(lstDepartamento) {
        $.each(lstDepartamento, function () {
            $("#ddlDepartamento").append($("<option></option>").attr("value", this.P_vcCodCiu).text(this.vcNomCiu));
        });
        CargarOficinaPorCampana();
    }

    $("#ddlPais").change(function () {
        $("#ddlDepartamento").html("");
        $("#ddlProvincia").html("");
        $("#ddlDistrito").html("");

        $("#ddlDepartamento").attr("disabled", "disabled");
        $("#ddlProvincia").attr("disabled", "disabled");
        $("#ddlDistrito").attr("disabled", "disabled");
        $("#ddlProvincia").append($("<option></option>").attr("value", "-1").text("<Seleccione un Departamento>"));
        $("#ddlDistrito").append($("<option></option>").attr("value", "-1").text("<Seleccione una Provincia>"));

        if ($("#ddlPais").val() != "-1") {
            var Metodo = raiz("Common/WebService/General.asmx/ListarDepartamento");
            var Data = {
                IdPais: $("#ddlPais").val()
            };
            MetodoWeb(Metodo, JSON.stringify(Data), ListaDepartamento, null);

            $("#ddlDepartamento").removeAttr("disabled");
        }
        else {
            $("#ddlDepartamento").append($("<option></option>").attr("value", "-1").text("<Seleccione un País>"));
        }
    });

    function ListaProvincia(lstProvincia) {
        $.each(lstProvincia, function () {
            $("#ddlProvincia").append($("<option></option>").attr("value", this.IdProvincia).text(this.Nombre));
        });
        CargarOficinaPorCampana();
    }

    $("#ddlDepartamento").change(function () {
        $("#ddlProvincia").html("");
        $("#ddlDistrito").html("");

        $("#ddlProvincia").attr("disabled", "disabled");
        $("#ddlDistrito").attr("disabled", "disabled");
        $("#ddlDistrito").append($("<option></option>").attr("value", "-1").text("<Seleccione una Provincia>"));

        if ($("#ddlDepartamento").val() != "-1") {
            var Metodo = raiz("Common/WebService/General.asmx/ListarProvincia");
            var Data = {
                IdDepartamento: $("#ddlDepartamento").val(),
                IdPais: $("#ddlPais").val()
            };
            MetodoWeb(Metodo, JSON.stringify(Data), ListaProvincia, null);

            $("#ddlProvincia").removeAttr("disabled");
        }
        else {
            $("#ddlProvincia").append($("<option></option>").attr("value", "-1").text("<Seleccione un Departamento>"));
            CargarOficinaPorCampana();
        }
    });

    function ListaDistrito(lstDistrito) {
        $.each(lstDistrito, function () {
            $("#ddlDistrito").append($("<option></option>").attr("value", this.IdDistrito).text(this.Nombre));
        });
        CargarOficinaPorCampana();
    }

    $("#ddlProvincia").change(function () {
        $("#ddlDistrito").html("");
        $("#ddlDistrito").attr("disabled", "disabled");

        if ($("#ddlProvincia").val() != "-1") {
            var Metodo = raiz("Common/WebService/General.asmx/ListarDistrito");
            var Data = {
                IdProvincia: $("#ddlProvincia").val()
            };
            MetodoWeb(Metodo, JSON.stringify(Data), ListaDistrito, null);

            $("#ddlDistrito").removeAttr("disabled");
        }
        else {
            $("#ddlDistrito").append($("<option></option>").attr("value", "-1").text("<Seleccione una Provincia>"));
            CargarOficinaPorCampana();
        }
    });

    $("#ddlDistrito").change(function () {
        CargarOficinaPorCampana();
    });

    $("#txtOficina").keyup(function () {
        if (timeoutHnd) {
            clearTimeout(timeoutHnd);
        }
        timeoutHnd = setTimeout(CargarOficinaPorCampana, 500);
    });

    $("#txtDireccion").keyup(function () {
        if (timeoutHnd) {
            clearTimeout(timeoutHnd);
        }
        timeoutHnd = setTimeout(CargarOficinaPorCampana, 500);
    });

    $("#ddlPais").val("51"); //SOLO VALIDO POR AHORA PARA PERU
    $("#ddlPais").change(); //SOLO VALIDO POR AHORA PARA PERU

    function SeleccionoOficina(id) {

    }
    var modeloOficina = [
        { name: 'IdOficina', index: 'IdOficina', label: 'IdOficina', hidden: true, width: 70, align: 'left' },
        { name: 'Descripcion', index: 'Descripcion', label: 'Oficina', hidden: false, key: true, width: 250, align: 'left' },
        { name: 'NombrePais', index: 'NombrePais', label: 'País', hidden: true, key: true, width: 100, align: 'left' },
        { name: 'NombreCiudad', index: 'NombreCiudad', label: 'Departamento', hidden: false, key: true, width: 100, align: 'left' },
        { name: 'NombreProvincia', index: 'NombreProvincia', label: 'Provincia', hidden: false, width: 100, align: 'left' },
        { name: 'NombreDistrito', index: 'NombreDistrito', label: 'Distrito', hidden: false, width: 120, align: 'left' },
        { name: 'DireccionCompleta', index: 'DireccionCompleta', label: 'Dirección', hidden: false, width: 350, align: 'left'}];

    var tblOficina = JQGrid("#tblOficina", "", "local", modeloOficina, 671, 330, "rowId", true, null, SeleccionoOficina);

    //            $(window).resize(function () {
    //                Dimensionar();
    //            });
    //            function Dimensionar() {
    //                var Ancho = $(window).width(); //
    //                var Alto = $(window).height(); //
    //                if (Ancho < 753)
    //                    Ancho = 753;
    //                if (Alto < 330)
    //                    Alto = 330;
    //                $("#tblOficina").setGridWidth(Ancho - 263); //
    //                $("#tblOficina").setGridHeight(Alto - 253); //
    //            }

    function CargarOficinaPorCampana() {
        var Metodo = "Adm_OficinaSeleccion.aspx/ListaOficinaPorCampana";
        var Data = {
            IdCampana: $("#hdfCampana").val(),
            Oficina: $("#txtOficina").val(),
            IdPais: $("#ddlPais").val(),
            IdDepartamento: $("#ddlDepartamento").val(),
            IdProvincia: $("#ddlProvincia").val(),
            IdDistrito: $("#ddlDistrito").val(),
            Direccion: $("#txtDireccion").val()
        };
        MetodoWeb(Metodo, JSON.stringify(Data), SatisfactoriaCargarOficina, null);
    }
    function SatisfactoriaCargarOficina(lst) {
        var i;
        i = 0;
        lstOficina = lst;
        tblOficina.jqGrid('clearGridData');
        if ($(lstOficina).length > 0) {
            idSetInterval = setInterval(function () {
                tblOficina.jqGrid('addRowData', lstOficina[i].IdOficina, lstOficina[i]);
                i++;

                if (i == $(lstOficina).length) {
                    clearInterval(idSetInterval);
                }

            }, 1);
        }
        //                for (var i = 0; i < $(lstOficina).length; i++)
        //                    $("#tblOficina").jqGrid('addRowData', lstOficina[i].IdOficina, lstOficina[i]);
    }
    $("#btnCerrar").click(function () {
        window.parent.CerrarDialogo();
    });
    $("#btnAgregarSeleccion").click(function () {
        var i;
        var lstOficina = new Array();
        var lstIdOficina = tblOficina.jqGrid('getGridParam', 'selarrrow').toString().split(',');

        for (i = 0; i < $(lstIdOficina).length; i++) {
            lstOficina.push(tblOficina.jqGrid('getRowData', lstIdOficina[i]));
        }

        window.parent.CargarOficina(lstOficina);
    });
});