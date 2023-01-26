function UsuarioAD(Guid, DisplayName) {
    this.Guid = Guid;
    this.DisplayName = DisplayName;
}

function isIE() { //Vefiricar Version del Internet Explorer
    var myNav = navigator.userAgent.toLowerCase();
    return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
}
// ==========================================================================================
//  LOAD
// ==========================================================================================
$(function () {

    // ==========================================================================================
    // HINOPE
    // ==========================================================================================
    //    $(".accordion").accordion({
    //        collapsible: true,
    //        autoHeight: false
    //    });
    var tabOpciones = $("#tabOpciones").tabs({});

    DimPosElementos();

    $(window).resize(function () {
        DimPosElementos();
    });


    function DimPosElementos() {
        var Ancho = $(window).width();
        var Alto = $(window).height();
        //alert(1);

        //$("#tabOpciones").setGridHeight(Alto - HeigthGrilla1);
        $("#tabOpciones").height(Alto - 40);


        //$("#grid").setGridHeight($(window).height() - 185 - MargenFiltro * MargenHeight);
        $("#tblCampo").setGridHeight(Alto - 300);

        //alert(Alto);
        if (Alto < 300) {
            $("#gview_tblCampo").hide();
            $("#divImportarUsuarios").hide();
        }
        else {
            $("#gview_tblCampo").show();
            $("#divImportarUsuarios").show();
        }
    }



    var $pagina = "ImportarUsuario.aspx";
    $("#ifrCargaUsuario").attr("src", $pagina);

    $("#btnCargar").hide();

    $("input:checkbox,input:radio,input:file").uniform();

    $(".uploader").css("width", "270px");
    $(".filename").css("width", "165px");

    $("#btnCargarCli").click(function () {

        $("#btnCargar").click();

    });

    // ==========================================================================================
    // HINOPE
    // ==========================================================================================
    $("#txtUsuario").val('');
    $("#txtPassword").val('');

    $(".btnNormal").button();

    if (isIE() == 6) {
        $("#btnMostrarUsuarios").css('width', '150px');
        $("#btnMostrarUsuarios").css('display', 'inline-block');
    }

    $("#tblCampo").jqGrid({
        sortable: true,
        datatype: "local",
        colModel: [
            { name: 'strGuid', index: 'strGuid', label: 'Guid', width: '60', hidden: true },
            { name: 'NombreCompleto', index: 'NombreCompleto', label: 'Nombre', width: '250' },
            { name: 'Usuario', index: 'Usuario', label: 'Usuario', width: '150' },
            { name: 'Descripcion', index: 'Descripcion', label: 'Descripción', width: '150' }
        ],
        sortname: "strGuid", //Default SortColumn
        sortorder: "asc", //Default SortOrder.
        width: "750",
        height: "350",
        viewrecords: true,
        rownumbers: true,
        multiselect: true,
        autowidth: false,
        shrinkToFit: true,
        caption: "Usuarios",
        sortable: function (permutation) {
            //var colModels = $("#grid").getGridParam("colModel");
            //alert(colModels);
        },
        afterInsertRow: function (rowid, aData, rowelem) {
            if (aData.Descripcion == '(Ya existe)') {
                var colModels = $("#tblCampo").getGridParam("colModel");

                var i;
                for (i in colModels) {
                    $("#tblCampo").jqGrid('setCell', rowid, i, '', { color: 'blue' });
                }
            }
        }
    });
    $("#tblCampo").jqGrid();

    $("#tdUsuarios").hide();

    $('#txtPassword').live("keypress", function (e) {
        if (e.keyCode == 13) {
            MostrarUsuarios();
            return false; // prevent the button click from happening
        }
    });

    $("#btnMostrarUsuarios").click(function (event) {

        //        if ($.trim($("#txtUsuario").val()) == '') {
        //            alert('No se ha configurado la ruta del servidor LDAP');
        //            return;
        //        }

        $("#txtPassword").val('');
        $("#txtUsuario").focus();
        $('#divCredencial').dialog({
            title: 'Ingrese credenciales de acceso al Directorio Activo',
            width: 340,
            modal: true,
            resizable: false
        });
    });


    $("#btnAceptarCredencial").click(function (event) {
        MostrarUsuarios();
    });
    $("#btnCerrarCredencial").click(function (event) {
        $('#divCredencial').dialog("close");
    });

    $("#divImportarUsuarios").click(function (event) {
        ImportarUsuarios();
    });



    DimPosElementos();

});

var lstCampos;

function MostrarUsuarios() {


    var usuario = $("#txtUsuario").val();
    var pwd = $("#txtPassword").val();

    usuario = $.trim(usuario.replace(/'/g, ""));
    pwd = $.trim(pwd.replace(/'/g, ""));

    if (usuario == '') {
        alert('Debe ingresar el usuario');
        $("#txtUsuario").focus();
        return;
    }

    if (pwd == '') {
        alert('Debe ingresar el password');
        $("#txtPassword").focus();
        return;
    }
    
    $('#divCredencial').dialog("close");
    $('#divCargando').dialog({
        title: 'Cargando...',
        height:110,
        modal: true,
        resizable: false
    });

    usuario = usuario.replace("\\", "\\\\");

    //Cargar...
    $.ajax({
        type: "POST",
        url: "ImportarUsuarioAD.aspx/MostrarUsuarios",
        data: "{'vcUser': '" + usuario + "'," +
                           "'vcPwd': '" + pwd + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {

            $("#tdUsuarios").show();
            lstCampos = result.d;
            $('#tblCampo').jqGrid('clearGridData');

            var inContador = 0;
            $.each(lstCampos, function () {
                inContador = inContador + 1;
                $("#tblCampo").jqGrid('addRowData', this.strGuid, { id: this.strGuid,
                    'Guid': this.strGuid,
                    'NombreCompleto': this.NombreCompleto,
                    'Usuario': this.Usuario,
                    'Descripcion': this.Descripcion
                });

            });

            $('#divCargando').dialog("close");

        },
        error: function (xhr, err, thrErr) {
            $('#divCargando').dialog("close");
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });

}

function ImportarUsuarios() {

    var idsSel = $("#tblCampo").jqGrid('getGridParam', 'selarrrow');
    if (idsSel == '')
    {
        alert('Seleccione un usuario como mínimo');
        return;
    }

    $('#divCargando').dialog({
        title: 'Importando...',
        height: 110,
        modal: true,
        resizable: false
    });

    //Cargar...
    $.ajax({
        type: "POST",
        url: "ImportarUsuarioAD.aspx/ImportarUsuarios",
        data: "{'vcUser': '" + $("#txtUsuario").val() + "'," +
              "'vcPwd': '" + $("#txtPassword").val() + "','vcGuid': '" + idsSel + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {

            if (result.d == 'ok')
            {
                alert('Usuarios Importados');
            }

            $("#tdUsuarios").hide();
            $('#divCargando').dialog("close");

        },
        error: function (xhr, err, thrErr) {
            $('#divCargando').dialog("close");
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });


}