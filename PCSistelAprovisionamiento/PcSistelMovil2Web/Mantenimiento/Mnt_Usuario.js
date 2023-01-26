var _Empleado;
var EsTecnicoSolicitud = false;
var EsTecnicoIncidencia = false;
var EsSupervisorAtencion = false;
var buscarValor = '';
function seg_usuario(P_inCod, vcNom, vcUsu, vcPas, F_vcCodEmp, F_vcCodInt, Dni, Mail, F_vcCodSuc, btBloqueo, btReinicia, vcHoras) {

    this.P_inCod = P_inCod;
    this.vcNom = vcNom;
    this.vcUsu = vcUsu;
    this.vcPas = vcPas;
    this.F_vcCodEmp = F_vcCodEmp;
    this.F_vcCodInt = F_vcCodInt;
    this.F_vcCodSuc = F_vcCodSuc;
    this.Dni = Dni;
    this.Mail = Mail;

    // ===============================================================================================================
    // MODULO DE SEGURIDAD
    // ===============================================================================================================
    this.btBloqueo = btBloqueo;
    this.btReinicia = btReinicia;
    this.vcHoras = vcHoras;
    // ===============================================================================================================
    // ===============================================================================================================

}

function apr_Usuario(IdUsuario, Usuario, Clave, Correo, Nombre, Apellidos, IdOperador, Btvig) {
    this.IdUsuario = IdUsuario;
    this.Usuario = Usuario;
    this.Clave = Clave;
    this.Correo = Correo;
    this.Nombre = Nombre;
    this.Apellidos = Apellidos;  
    this.Operador = new setOperador();
    this.Btvig = Btvig;
}

function setOperador(IdOperador, Codigo, Descripcion) {
    this.IdOperador = IdOperador;
    this.Codigo = Codigo;
    this.Descripcion = Descripcion;

}


function CargarTreePerfiles() {
    var treeData;
    var idUsuario = $("#hdfCodigo").val();
    $.ajax({
        type: "POST",
        url: "Mnt_Usuario.aspx/ObtenerPerfilTree",
        data: "{'pIdUsuario': '" + idUsuario + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultado) {
            treeData = resultado.d;
            var treeData2 = JSON.parse(treeData[0]);
            $.each(treeData2, function () {
                switch (this.key) {
                    case "42":
                        if (this.select == true) {
                            EsTecnicoSolicitud = true;
                            $("#lblNombrePerfilTecSol").text('"' + this.title + '"');
                            $("#accOpcionesGenerales").find('h3').filter(':contains(Solicitudes)').show();
                        }
                        break;
                    case "50":
                        if (this.select == true) {
                            EsTecnicoIncidencia = true;
                            $("#accOpcionesGenerales").find('h3').filter(':contains(Incidencias)').show();
                        }
                        break;
                    case "59":
                        if (this.select == true) {
                            EsSupervisorAtencion = true;
                            $("#accOpcionesGenerales").find('h3').filter(':contains(Atenciones)').show();
                        }
                        break;
                }
            });

            $("#divTreePerfil").dynatree({
                checkbox: true,
                selectMode: 3,
                children: treeData2,
                cookieId: "dynatree-Cb3",
                idPrefix: "dynatree-Cb3-",
                //fx: { height: "toggle", duration: 200 },
                onSelect: function (select, node) {
                    //#region Temporizador - 28/10/2014 wapuamyta
                    //actualizar lista de temporazadores según perfil
                 
                    //#endregion
                    switch (node.data.key) {
                        case "42":
                            //Tecnico Solicitudes
                            if (select == true) {
                                $("#accOpcionesGenerales").find('h3').filter(':contains(Solicitudes)').show();
                                EsTecnicoSolicitud = true;
                            }
                            else {
                                $("#accOpcionesGenerales").find('h3').filter(':contains(Solicitudes)').hide();
                                if (EsTecnicoSolicitud) {
                                    //Quitar perfil técnico solicitudes
                                    $('#divConQuitarPerfilTecSol').dialog({
                                        title: "Quitar perfil " + $("#lblNombrePerfilTecSol").text(),
                                        modal: true,
                                        resize: false,
                                        buttons: {
                                            "Si": function () {
                                                node.data.select = select;
                                                $(this).dialog("close");
                                                EsTecnicoSolicitud = false;
                                            },
                                            "No": function () {
                                                node.data.select = true;
                                                $("#divTreePerfil").dynatree("getTree").selectKey(node.data.key);
                                                $(this).dialog("close");
                                            }
                                        }
                                    });
                                }
                            }
                            break;
                        case "50":
                            //Tecnico de Incidencias
                            if (select == true) {
                                EsTecnicoIncidencia = true;
                                $("#accOpcionesGenerales").find('h3').filter(':contains(Incidencias)').show();
                            }
                            else {
                                if ($("#hdfCodigo").val() != "") {
                                    $.ajax({
                                        type: "POST",
                                        url: "Mnt_SEG_Usuario.aspx/VerificarEliminarTecnico",
                                        data: "{'prIdUsuario': '" + $("#hdfCodigo").val() +
                                             "','prIdTecnico': '" + $("#hdfIdTecnicoSupervisor").val() + "'}",
                                        contentType: "application/json; charset=utf-8",
                                        dataType: "json",
                                        success: function (result) {

                                            var miCod = result.d.split('|')[0];
                                            var miMensaje = result.d.split('|')[1];

                                            if (miCod != 'OK') {
                                                alertaExterna(miMensaje);
                                                return;
                                            }

                                            $.ajax({
                                                type: "POST",
                                                url: "Mnt_SEG_Usuario.aspx/DesactivarTecnico",
                                                data: "{'prIdUsuario': '" + $("#hdfCodigo").val() +
                                             "','prIdTecnico': '" + $("#hdfIdTecnicoSupervisor").val() + "'}",
                                                contentType: "application/json; charset=utf-8",
                                                dataType: "json",
                                                success: function (result) {

                                                    var miCod = result.d.split('|')[0];
                                                    var miMensaje = result.d.split('|')[1];

                                                    if (miCod == 'OK') {
                                                        alertaExterna(miMensaje);
                                                        $("#accOpcionesGenerales").find('h3').filter(':contains(Incidencias)').hide();
                                                        EsTecnicoIncidencia = false;
                                                        return;
                                                    }
                                                    else {
                                                        alertaExterna(miMensaje);
                                                        return;
                                                    }

                                                },
                                                error: function (xhr, err, thrErr) {
                                                    MostrarErrorAjax(xhr, err, thrErr);
                                                    BloquearPagina(false);
                                                }
                                            });

                                        },
                                        error: function (xhr, err, thrErr) {
                                            MostrarErrorAjax(xhr, err, thrErr);
                                            BloquearPagina(false);
                                        }
                                    });
                                } else {
                                    $("#accOpcionesGenerales").find('h3').filter(':contains(Incidencias)').hide();
                                    EsTecnicoIncidencia = false;
                                }
                            }
                            break;
                        case "59":
                            //Supervisor de Atenciones
                            if (select == true) {
                                $("#accOpcionesGenerales").find('h3').filter(':contains(Atenciones)').show();
                                EsSupervisorAtencion = true;
                            }
                            else {
                                $("#accOpcionesGenerales").find('h3').filter(':contains(Atenciones)').hide();
                                EsSupervisorAtencion = false;
                            }
                            break;
                        default: break;
                    }
                }
            });
   
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}
// ===============================================================================================
$(function () {

    $(window).resize(function (a, c) {
        var Alto = $(window).height();
        if (Alto < 500) {
            $("#dvArea").css({ height: Alto - 20, Width: 750 });
        }

    });

    var indiceTab = window.parent.tab.tabs("option", "selected");

    $("#btnAgregarOrga").click(function () {
        var Alto = $(window).height();
        var $width = 740;
        var $height = 505;
        if (Alto < 500) {
            $height = Alto - 20;
            $width = 750;
        }

        var $Pagina = '../../../P_Movil/Consultar/Con_SeleccionArea.aspx?Tipo=1&Multiple=0';
        $("#ifArea").attr("src", $Pagina);
        Modal = $('#dvArea').dialog({
            title: "Seleccionar área",
            width: $width,
            height: $height,
            modal: true
            //,resizable: false       
        });
    });


    //Ocultar grupos de opciones por defecto...
    $("#accOpcionesGenerales").accordion("option", "active", 1);
    $("#accOpcionesGenerales").find('h3').filter(':contains(Solicitudes)').hide();
    $("#accOpcionesGenerales").find('h3').filter(':contains(Incidencias)').hide();
    $("#accOpcionesGenerales").find('h3').filter(':contains(Atenciones)').hide();


    if ($("#hdfEsTecResp").val() == "3") {
        //alert("no editable por se técnico responsable");
        $("#dvMensaje1").show();
        $("#lblEsTecResp").text("* No se puede quitar este perfil. Usuario es Técnico Responsable de un tipo de solicitud. ");
    } else if ($("#hdfEsTecResp").val() == "2") {
        $("#dvMensaje1").show();
        $("#lblEsTecResp").text("* No se puede quitar este perfil. Usuario tiene solicitudes asignadas en estado \"En Proceso\"");
    } else {
        $("#dvMensaje1").hide();
    }

    //JHERRERA 20150120: Se valida si el usuario es responsable de aprobación
    if ($("#hdfEsResApro").val() == "4") {
        $("#dvMensaje2").show();
        $("#lblEsResApro").text("** No se puede quitar este perfil. Usuario es 'Responsable De Aprobación' de tipo 'Usuario Específico' de un tipo de solicitud.");
    } else {
        $("#dvMensaje2").hide();
    }

    CargarTreePerfiles();
    if ($("#hdfCodigo").val() == 1) {



        $("#txtvcUsu").prop("disabled", true);
        $("#txtCodSuc").prop("disabled", true);
        $("#tbImagen").hide();


        $("#chkAtenciones_EsOperador").prop("disabled", true);

        $("#lstOperador").prop("disabled", true);
    }


    $(".btnNormal").button();

    if ($("#hdfEsllamadaExterna").val() == "0") {
        var indiceTab = window.parent.tab.tabs("option", "selected");
    }

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

    $(".accordion").accordion({
        collapsible: true,
        autoHeight: false
    });

    $(".btnNormal").button({});


    // ================================================================================================================================
    // MODULO DE SEGURIDAD
    // ================================================================================================================================


    $("#txtvcPas").attr("disabled", true);
    $("#txtConfirmarContrasena").attr("disabled", true);
    $("#txtvcPas").css({ "background": "#BDBDBD" });
    $("#txtConfirmarContrasena").css({ "background": "#BDBDBD" });

    $('#chEditar').click(function () {
        if (!$(this).is(':checked')) {
            $("#txtvcPas").css({ "background": "#BDBDBD" });
            $("#txtvcPas").attr("disabled", true);
            $("#txtConfirmarContrasena").css({ "background": "#BDBDBD" });
            $("#txtConfirmarContrasena").attr("disabled", true);
            return;
        } else {
            $("#txtvcPas").css({ "background": "#E0F8F7" });
            $("#txtvcPas").attr("disabled", false);
            $("#txtConfirmarContrasena").css({ "background": "#E0F8F7" });
            $("#txtConfirmarContrasena").attr("disabled", false);
            $("#txtvcPas").select();
            return;
        }
    });

    // ================================================================================================================================

    if ($('#hdfCodigo').val().length == 0) {

        $("#txtvcPas").css({ "background": "#E0F8F7" });
        $("#txtvcPas").attr("disabled", false);

        $("#txtConfirmarContrasena").css({ "background": "#E0F8F7" });
        $("#txtConfirmarContrasena").attr("disabled", false);

        $('#filaCheckEditar').hide();
    }
    // ================================================================================================================================
    $("#txtvcUsu").focus();

    // ================================================================================================================================
    // GUARDAR
    // ================================================================================================================================
    $("#btnGuardar").live("click", function () {

        BloquearPagina(true);
        //var rootNode = $("#divTree").dynatree("getRoot");
        var nodosSelecionadosPerfil = $("#divTreePerfil").dynatree("getRoot").tree.getSelectedNodes().join(",");
        nodosSelecionadosPerfil = nodosSelecionadosPerfil.replace(/'/g, "");

        debugger;
        if ($.trim($("#txtvcUsu").focus()) == "") {
            alertaExterna("El Usuario es un campo obligatorio.");
            BloquearPagina(false);
            $("#txtvcUsu").focus();
            return;
        };

        if ($.trim($("#txtvcPas").val()) == "") {
            alertaExterna("La Contraseña es un campo obligatorio.");
            BloquearPagina(false);
            $("#txtvcPas").focus();
            return;
        };

        if ($.trim($("#txtvcPas").val()) != "") {
            if ($.trim($("#txtvcPas").val()) != $.trim($("#txtConfirmarContrasena").val())) {
                alertaExterna("La contraseña ingresada no coinciden.");
                BloquearPagina(false);
                $("#txtConfirmarContrasena").focus();
                return;
            };
        }

        if ($.trim($("#txtnombre").val()) == "") {
            alertaExterna("El Nombre de usuario es un campo obligatorio.");
            BloquearPagina(false);
            $("#txtnombre").focus();
            return;
        };

        if ($.trim($("#txtape").val()) == "") {
            alertaExterna("El Apellido de usuario es un campo obligatorio.");
            BloquearPagina(false);
            $("#txtape").focus();
            return;
        };

        if ($.trim($("#txtCorreo").val()) == "") {
            alertaExterna("El Correo es un campo obligatorio.");
            BloquearPagina(false);
            $("#txtCorreo").focus();
            return;
        };

        if ($.trim($("#txtCorreo").val()) != "") {
            if (!validarEmail2($.trim($("#txtCorreo").val()))) {
                alertaExterna("El Formato del correo no es valido.");
                BloquearPagina(false);
                $("#txtCorreo").focus();
                return;
            }
            if ($.trim($("#txtCorreo").val()) != $.trim($("#txtConfirmarCorreo").val())) {
                alertaExterna("Los correos ingresados no coinciden.");
                BloquearPagina(false);
                $("#txtConfirmarCorreo").focus();
                return;
            }
        }

        if (nodosSelecionadosPerfil == "") {
            alertaExterna("Debe seleccionar mínimo un perfil.");
            BloquearPagina(false);
            return;
        }

        var Seg_usuario = new seg_usuario();
        var APR_Usuario = new apr_Usuario


        if ($("#hdfCodigo").val() == "") {
            APR_Usuario.IdUsuario = "-1";
        }
        else {
            APR_Usuario.IdUsuario = $("#hdfCodigo").val();
        }


        if ($.trim($("#hdfCodOperador").val()) == "0") 
        {
            alertaExterna("Debe vincular el usuario a un Operador.");
            BloquearPagina(false);
            return;
        }


        APR_Usuario.Usuario = $.trim($("#txtvcUsu").val());
        APR_Usuario.Clave = $.trim($("#txtvcPas").val())
        APR_Usuario.Correo = $.trim($("#txtCorreo").val())
        APR_Usuario.Nombre = $.trim($("#txtnombre").val());
        APR_Usuario.Apellidos = $.trim($("#txtape").val());
        APR_Usuario.Operador.IdOperador = $.trim($("#hdfCodOperador").val());
        APR_Usuario.Btvig = $('#chkEstado').is(':checked')

        APR_Usuario.Usuario = APR_Usuario.Usuario.replace(/'/g, "&#39").replace(/\\/g, "&#40").replace(/"/g, "&#34");
        APR_Usuario.Clave = APR_Usuario.Clave.replace(/'/g, "&#39").replace(/\\/g, "&#40").replace(/"/g, "&#34");
        APR_Usuario.Correo = APR_Usuario.Correo.replace(/'/g, "&#39").replace(/\\/g, "&#40").replace(/"/g, "&#34");
        APR_Usuario.Nombre = APR_Usuario.Nombre.replace(/'/g, "&#39").replace(/\\/g, "&#40").replace(/"/g, "&#34");

        var oAPR_Usuario = JSON.stringify(APR_Usuario);
        var btVig = $('#chkEstado').is(':checked');


        var ListaPerfiles = new Array();
        ListaPerfiles = nodosSelecionadosPerfil.split(",");
        var XML_Perfiles = "<?xml version=\"1.0\" encoding=\"iso-8859-1\"?><TABLE>";
        var idPerfil = "";
        var IdUsuario = 1;
        for (i = 0; i < ListaPerfiles.length; i++) {

            idPerfil = ListaPerfiles[i];
            idPerfil = idPerfil.replace("DynaTreeNode<", "");
            idPerfil = idPerfil.substring(0, idPerfil.indexOf(">"));

            XML_Perfiles += '<Perfil IdPerfil=\"' + idPerfil + '\" IdUsuario=\"' + APR_Usuario.IdUsuario + '"\ />'
        }
        XML_Perfiles += "</TABLE>";



        $.ajax({
            type: "POST",
            url: "Mnt_Usuario.aspx/Guardar",
            data: "{'oEntidad': '" + oAPR_Usuario +
            "','pXMLPerfil': '" + XML_Perfiles +
            "','btVig': '" + 1 + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {

                if (result.d == '1') {
                    BloquearPagina(false);
                    alertaExterna("El usuario Ya existe en la base de datos");
                    $("#txtvcUsu").focus();
                    return;
                }
                else {
                    if ($("#hdfEsllamadaExterna").val() != "1") {
                        window.parent.ActualizarGrilla();
                    }
                    Mensaje("<br/><h1>Registro guardado</h1><h2>" + $.trim($("#txtvcUsu").val()) + "</h2>", document, CerroMensaje);
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
                BloquearPagina(false);
            }
        });
    });

    function CerroMensaje() {
        BloquearPagina(false);

        window.parent.tab.tabs("remove", indiceTab);

        if ($("#hdfEstado").val() == "") {
            $("#txtNombre").val("");
            $("#txtNombre").focus();
        }
        else {
            window.parent.tab.tabs("remove", indiceTab);
        }

    }

    $("#btnCerrar").live("click", function () {

        if ($("#hdfEsllamadaExterna").val() == "1") {
            window.parent.fnVolverAEmpleado();
        }
        else {
            window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));
        }
    });

    $("#txtvcUsu").focus();


    if ($("#hdfEsllamadaExterna").val() == "1") {
        fnEsLlamadaExterna();
    }

    $('#btnQuitarOperador').live('click', function () {
        $('#txtoperador').val("");
        $('#hdfCodOperador').val("0");
    });

    $('#grid').jqGrid({
        sortable: true,
        datatype: BuscarOperador,
        jsonReader:
                      {
                          root: 'Items',
                          page: 'PaginaActual',
                          total: 'TotalPaginas',
                          records: 'TotalRegistros',
                          repeatitems: true,
                          cell: 'Row',
                          IdEquipo: 'IdEquipo'
                      },
        colModel: [
                    { name: 'IdOperador', index: 'IdOperador', label: 'ID', hidden: true, width: 60 },
                    { name: 'Codigo', index: 'Codigo', label: 'Código', width: 60 },
                    { name: 'Descripcion', index: 'Descripcion', label: 'Descripción' },
                    { name: 'IdOperadorMovil', index: 'IdOperadorMovil', label: 'IdOperadorMovil', hidden: true }
                 ],
        pager: '#pager',
        loadtext: 'Cargando datos...',
        recordtext: '{0} - {1} de {2} elementos',
        emptyrecords: 'No hay resultados',
        pgtext: 'Pág: {0} de {1}',
        rowNum: 10,
        rowList: [10, 20, 30],
        viewrecords: true,
        multiselect: false,
        sortorder: "asc",
        width: 450,
        height: '255',
        rownumbers: true,

        onSelectRow: function (id) {
            IdEquipo = id;
        },
        ondblClickRow: function (id) {
            IdEquipo = id;
            $('#btnAsignarOperador').click();
        }
    }).navGrid('#pager', { edit: false, add: false, search: false, del: false });


    $("#BtnAddOperador").click(function () {

        $('#grid').trigger('reloadGrid');


        var dlgusuarios = $('#div_modal_Operador').dialog({
            title: 'Búsqueda de Operador',
            width: 470,
            height: 420,
            modal: true,
            resizable: false,
            position: ['center'],
            autoOpen: true
        });

    })


    $('#btnAsignarOperador').live('click', function () {

        var id = $("#grid").jqGrid('getGridParam', 'selrow');

        if (id) {
            var datos = $("#grid").jqGrid('getRowData', id);
            var IdOperador = datos['IdOperador'];
            var Descripcion = datos['Descripcion'];
            var IdOperadorMovil = datos['IdOperadorMovil'];

            if (IdOperadorMovil != "-1") {
                $("#hdfCodOperador").val(IdOperador);
                $("#txtoperador").val(Descripcion);
                $('#div_modal_Operador').dialog('close');
            }
            else {                
                alertaExterna("El Operador Telefónico no tiene código equivalente en móvil.");
            }
        }
        else {            
            alertaExterna("Seleccione un registro.");
        }
    });

    $('#btnCancelar').live('click', function () {
        $('#div_modal_Operador').dialog('close');
    });

    $('#txtbusqueda').keydown(function (event) {
        buscarValor = $('#txtbusqueda').val();
        $('#grid').trigger('reloadGrid');
    });

});


var tbGridSolicitudes;
var vcIdBusqueda = "";
var totalChecks;
var totalChkLeer, totalChkCrear, totalChkEditar, totalChkEliminar;
var vValorControlActual = '';


function fnMostrarDatos(valor) {
    vcIdBusqueda = valor;
    $("#tbGridSolicitud").trigger("reloadGrid");
}



function usuarioElegido(usuarioElegido) {
    $('#txtUsuarioSupervisor').val(usuarioElegido);
};



function fnEsLlamadaExterna() {

    $(".esLlamadaExterna").css({ "display": "none" });
    window.parent.fnMostrarPanelEmp();
}



function BuscarOperador() {

    $.ajax({
        url: "Mnt_Usuario.aspx/BuscarOperador",

        data: "{'filtro':'" + buscarValor.replace(/'/g, '&#39') + "'," +
                 "'campoordenar':'" + $('#grid').getGridParam("sortname") + "'," +
                 "'orden':'" + $('#grid').getGridParam("sortorder") + "'," +
                 "'inPagTam':'" + $('#grid').getGridParam('rowNum') + "'," +
                 "'inPagAct':'" + parseInt($('#grid').getGridParam('page')) + "'}",

        dataType: 'json',
        type: 'post',
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            $('#grid').jqGrid('clearGridData');
            if (result.d.Items.length > 0) {
                $('#grid')[0].addJSONData(result.d);
            }

            //                indexcombo = $("#ddlEquipo option:selected").index();
            //                $("#grid").jqGrid('setSelection', indexcombo+1, true);
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}