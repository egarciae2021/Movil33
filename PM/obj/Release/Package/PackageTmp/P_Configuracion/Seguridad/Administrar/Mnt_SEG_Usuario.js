var _Empleado;
var EsTecnicoSolicitud = false;
var EsTecnicoIncidencia = false;
var EsSupervisorAtencion = false;
var isEdit = false;
var anchoDia_ = 70;
var ancho_ = 21; //'17px'; //15

var busquedaorga = 1;
var cnt_orga = 0;
var roweliminar = -1;

function seg_usuario(P_inCod, vcNom, vcUsu, vcPas, vcConfPas, F_vcCodEmp, F_vcCodInt, Dni, Mail, ConfMail, F_vcCodSuc, btBloqueo, btReinicia, vcHoras, ConfiguracionUsuario) {

    this.P_inCod = P_inCod;
    this.vcNom = vcNom;
    this.vcUsu = vcUsu;
    this.vcPas = vcPas;
    this.vcConfPas = vcConfPas;
    this.F_vcCodEmp = F_vcCodEmp;
    this.F_vcCodInt = F_vcCodInt;
    this.F_vcCodSuc = F_vcCodSuc;
    this.Dni = Dni;
    this.Mail = Mail;
    this.ConfMail = ConfMail;
    // ===============================================================================================================
    // MODULO DE SEGURIDAD
    // ===============================================================================================================
    this.btBloqueo = btBloqueo;
    this.btReinicia = btReinicia;
    this.vcHoras = vcHoras;
    this.ConfiguracionUsuario = [{ IdPagina: '', Titulo: '', URL: '', inEst: false, IdLicencia: -1, TipoNivel: '-1' }];
    // ===============================================================================================================
    // ===============================================================================================================

}
// ===============================================================================================================
// BUSCAR HORARIO
// ===============================================================================================================
function Buscar_HoraAcceso(vcDia, num_) {    
    var vcCodHora = vcDia.substr(0, 2) + (num_ <= 9 ? "0" + num_ : "" + num_);   
    var idHoras = $("#hdf_idHoras").val();
    idHoras = idHoras + (idHoras.length > 0 ? ',' : '') + vcCodHora;
    $("#hdf_idHoras").val(idHoras);     
}

// ===========================================================================================================
// MARCAR DIA
// ===========================================================================================================
function Marcar_Dia(vcDia) {
    
    for (i = 1; i <= 24; i++) {
        
        var check = "#check_" + i + "_" + vcDia;

        var vcCodHora = vcDia.substr(0, 2) + (i <= 9 ? "0" + i : "" + i);

        //alert($(check).is(":checked"));
        if (!$(check).is(":checked")) {

            $(check).prop('checked', true);

            Buscar_HoraAcceso(vcDia, i);

        } else {
            // FALSA - RETIRAMOS
            // ===========================================================================================================
            var txtidHora = $("#hdf_idHoras").val();
            var mySplitResult = txtidHora.split(",");
            var txtidHora_nuevo = '';
            
            $(check).prop('checked', false);

            for (ii = 0; ii < mySplitResult.length; ii++) {
                //alert(mySplitResult[ii]);
                if (vcCodHora != mySplitResult[ii]) {
                    txtidHora_nuevo = txtidHora_nuevo + (txtidHora_nuevo.length > 0 ? ',' : '') + mySplitResult[ii];
                }
            }

            $("#hdf_idHoras").val(txtidHora_nuevo);
        }
            
       
       
    }

}
// ===============================================================================================================
// ASIGNAR HORA ACCESO
// ===============================================================================================================
function Asignar_HoraAcceso(vcDia, num_) {

    var check = "#check_" + num_ + "_" + vcDia;
    var vcCodHora = vcDia.substr(0,2) + ( num_ <= 9 ? "0" + num_ : "" + num_ );

            // ===================================================================================================
            var idHora = vcCodHora;
            var txtidHora = $("#hdf_idHoras").val();

            // TRUE - AGREGAMOS
            if ($(check).is(':checked')) {
                txtidHora = txtidHora + (txtidHora.length > 0 ? ',' : '') + idHora;
                $("#hdf_idHoras").val(txtidHora);
            } else {
                // FALSA - RETIRAMOS
                // ===========================================================================================================
                var txtidHora = $("#hdf_idHoras").val();
                var mySplitResult = txtidHora.split(",");
                var txtidHora_nuevo = '';

                for (i = 0; i < mySplitResult.length; i++) {
                    //alert(mySplitResult[i]);
                    if (idHora != mySplitResult[i]) {
                        txtidHora_nuevo = txtidHora_nuevo + (txtidHora_nuevo.length > 0 ? ',' : '') + mySplitResult[i];
                    }
                }

                $("#hdf_idHoras").val(txtidHora_nuevo);
//                // ===========================================================================================================
            }

//        }, // ====================================================================================================
//        error: function (xhr, err, thrErr) {
//            // ===================================================================================================
//            MostrarErrorAjax(xhr, err, thrErr);
//            // ===================================================================================================
//        }
//    });
    // ===========================================================================================================


}
// ===================================================================================================================================================
// HORARIO ACCESO SISTEMA
// ===================================================================================================================================================

function Horario_AccesoSistema() {
    ModalNuevo = $('#Mod_HorarioAcceso').dialog({
        title: "Horario de Acceso al Sistema",
        width: ((24 * (ancho_ + 5)) + (anchoDia_ + 5)) + 23, //600 + 30 + 42,
        height: 325,
        closeOnEscape: false,
        dialogClass: "no-close",
        modal: true,
        resizable: false,
        // ===================================================================================================================================================
        // inicio cargamos horario de acceso al sistema
        // ===================================================================================================================================================
        open: function (event, ui) {

            //$(".ui-dialog-titlebar-close", ui.dialog).hide();

            // ===================================================================================================================================================
            // validamos si ya se cargo el horario incial - error 1505
            // ===================================================================================================================================================
            if ($('#hdf_flagCargaHorario').val() == '0') {

                $('#hdf_flagCargaHorario').val('1');

                $("#tbNumeros3").jqGrid('clearGridData');

                $.ajax({
                    type: "POST",
                    url: "Mnt_SEG_Usuario.aspx/Listar_HorarioAcceso",
                    data: "{'prCriterio': '" + $('#hdfCodigo').val() + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        //buscando = false;
                        if ($(result.d).length > 0) {
                            var i;
                            for (i = 0; i < $(result.d).length; i++) {
                                //alert(result.d[i].Horario_in1);
                                $("#tbNumeros3").jqGrid('addRowData', result.d[i].Horario_vcDia, result.d[i]);
                            }
                        }
                        else {
                            //Mensaje("<br/><h1>No se encontraron registros</h1><br/>", document, cerroMensaje);
                            // alerta("No se encontraron campos en el Archivo");
                        }
                    },
                    error: function (xhr, err, thrErr) {
                        MostrarErrorAjax(xhr, err, thrErr);
                    }

                });
            }

        }
        ,
        // ===================================================================================================================================================
        buttons: {
            "Quitar Todos": function () {
                // ===================================================================================================================================================                
                //alert($("#hdf_idHoras").val());
                var i;
                for (i = 1; i <= 7; i++) {
                    // ==============================================================================================================================
                    var vcNomDia = '';

                    if (i == 1) { vcNomDia = 'Domingo'; }
                    if (i == 2) { vcNomDia = 'Lunes'; }
                    if (i == 3) { vcNomDia = 'Martes'; }
                    if (i == 4) { vcNomDia = 'Miércoles'; }
                    if (i == 5) { vcNomDia = 'Jueves'; }
                    if (i == 6) { vcNomDia = 'Viernes'; }
                    if (i == 7) { vcNomDia = 'Sabado'; }

                    var nuDia;
                    for (nuDia = 1; nuDia <= 24; nuDia++) {
                        $("#check_" + nuDia + "_" + vcNomDia).prop('checked', false);
                        //alert("#check_" + nuDia + "_" + vcNomDia);
                    }
                    // ==============================================================================================================================
                }
                $("#hdf_idHoras").val('');
                // ===================================================================================================================================================
            },
            "Terminar": function () {
                // ===================================================================================================================================================                
                //alert($("#hdf_idHoras").val());
                $(this).dialog("close");
                // ===================================================================================================================================================
            }

        }
    });
}

function IngresarEmpleadoUnico(empleado) {//Carga del empleado seleccionado del formulario respectivo
    $("#lstEmpleado").html("");
    _Empleado = empleado;
    $("#lstEmpleado").append($("<option></option>").attr("value", _Empleado.P_vcCod).text(_Empleado.vcNom));

    //Asociar Area, Sucursal y correo:
    //alert($.trim($("#lstEmpleado").val()));

    $.ajax({
        type: "POST",
        url: "Mnt_SEG_Usuario.aspx/ObtenerDatosEmpleado",
        data: "{'vcCodEmpleado': '" + _Empleado.P_vcCod + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.d != null) {
                var oENT_GEN_Empleado = result.d;                

                $("#txtCorreo").val(oENT_GEN_Empleado.Correo);
                $("#txtCorreo").attr("disabled", "disabled");
                $("#txtCodSuc").val(oENT_GEN_Empleado.vcSucursal);
                $("#hdfCodSucBusqueda").val(oENT_GEN_Empleado.vcCodSucursal);
                //                if (oENT_GEN_Empleado.Correo != "") {
                //                    if ($("#hdfEsllamadaExterna").val() == "1") {
                //                        $(".esLlamadaExterna").css({ "display": "none" });
                //                        $(".esConfirmPas").css({ "display": "none" });
                //                    } else {
                //                        $(".esConfirmPas").show();
                //                        $("#txtConfirmacionCorreo").attr("disabled", false);
                //                        $("#txtConfirmacionCorreo").focus();                    
                //                    }
                //                } else {
                //                    $(".esConfirmPas").hide();
                //                    $("#txtConfirmacionCorreo").attr("disabled", true);
                //                }
                if (oENT_GEN_Empleado.Correo == "") {
                    $("#txtCorreo").removeAttr("disabled");
                    $("#txtCorreo").focus();
                    //$("#txtEditarCorreo").text("Aceptar");
                    //$("#btnEditarCorreo").show();
                    $("#txtConfirmacionCorreo").val('');
                    $("#txtConfirmacionCorreo").removeAttr("disabled");
                    $(".esConfirmPas").show();
                    $(".esLlamadaExterna").show();
                    //$("#txtConfirmacionCorreo").attr("disabled", true);
                } else {
                    $("#txtConfirmacionCorreo").val(oENT_GEN_Empleado.Correo);
                    $(".esLlamadaExterna").show();
                    $(".esConfirmPas").show();
                    $("#txtConfirmacionCorreo").attr("disabled", true);

                    //$("#txtCorreo").attr("disabled", false);
                    //$("#txtConfirmacionCorreo").attr("disabled", false);

                    //$("#txtEditarCorreo").text("Editar");
                }
                //$("#txtCodInt").val(oENT_GEN_Empleado.Area.vcNomOrg);
                //$("#hdfCodIntBusqueda").val(oENT_GEN_Empleado.Area.vcCodInt);

                //$("#cbeOrganizacion_spControl").html(oENT_GEN_Empleado.Area.vcNomOrg);
                //$("#cbeOrganizacion_hdControl").val(oENT_GEN_Empleado.Area.vcCodInt);

            }
            else {

            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function CargarTreePerfiles() {
    var treeData;
    var idUsuario = $("#hdfCodigo").val();
    $.ajax({
        type: "POST",
        url: "Mnt_SEG_Usuario.aspx/ObtenerPerfilTree",
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
                        } else {
                            //JHERRERA 20150120: Se valida si el usuario es responsable de aprobación
                            if ($("#hdfEsResApro").val() == "4" && $("#hdfEsTecResp").val() == "0") {
                                this.select = true;
                                isEdit = true;
                                $("#accOpcionesGenerales").find('h3').filter(':contains(Solicitudes)').show();
                                CargaDatosTecnicoSolicitud();
                            }
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
                    obtenerTemporizadorPorPerfil(true);
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
                                                alerta(miMensaje);
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
                                                        alerta(miMensaje);
                                                        $("#accOpcionesGenerales").find('h3').filter(':contains(Incidencias)').hide();
                                                        EsTecnicoIncidencia = false;
                                                        return;
                                                    }
                                                    else {
                                                        alerta(miMensaje);
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
            obtenerTemporizadorPorPerfil();
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}
// ===============================================================================================
$(function () {

    //FPASTOR: Logica para renderizar texto de áreas
    let codigosArea = $('#TextBoxCodigoAreas').val();
    let nombresArea = $('#TextBoxNombreAreas').val();

    let arrCodigoArea = codigosArea.split(',');
    let arrNombreArea = nombresArea.split(',');

    $('#cbeOrganizacion_hdControl').val(codigosArea);

    const arrObjetosArea = [];
    arrCodigoArea.forEach(function (value, index) {
        arrObjetosArea.push({ codigo: value, nombre: arrNombreArea[index] });
    });

    const cbeOrganizacion = document.getElementById('cbeOrganizacion_spControl');
    arrObjetosArea.forEach(function (value) {
        const span = document.createElement('span');
        span.innerText = value.nombre;
        span.id = value.codigo;
        span.classList.add('lui');

        span.addEventListener('click', function () {
            let vcCodigo = this.id;
            let $width = 810;
            let $height = 560;
            let $Pagina = raiz('General/Administrar/Mantenimiento/Mnt_Organizacion.aspx?view=1&Par=ORGA_P_inCODINT&Cod=' + vcCodigo);
            window.parent.parent.$('#iframe_modal').width($width - 10);
            window.parent.parent.$('#iframe_modal').height($height - 30);
            window.parent.parent.$('#iframe_modal').attr('src', $Pagina);
            let dlgOrganizacion = window.parent.parent.$('#div_modal').dialog({
                title: 'Organización',
                width: $width,
                height: $height,
                modal: true,
                resizable: false
            });
        });

        const br = document.createElement('br');

        cbeOrganizacion.appendChild(span);
        cbeOrganizacion.appendChild(br);
    });

    const contenedor_cbeOrganizacion = document.querySelector('#contenedor_cbeOrganizacion div');
    if (arrObjetosArea.length > 1) {
        contenedor_cbeOrganizacion.style.height = '50px';
    }


    $(window).resize(function (a, c) {
        var Alto = $(window).height();
        if (Alto < 500) {
            $("#dvArea").css({ height: Alto - 20, Width: 750 });
        }

        //        var poArea = $("#dvArea:first").position()


        //        alerta("_Posición: Izquierda: " + poArea.left + ", Arriba: " + poArea.top + "; _Tamaño: Ancho: " + Ancho + ", Alto: " + Alto);
        //        //        alerta($("#dvArea:first").position());

        //        $("#dvArea:first").position({
        //            "top": "50%",
        //            "left": "50%"
        //        });
    });

    try {

        // ========================================================================================================================
        // HORARIO
        // ========================================================================================================================        
        var align_ = 'center';
        var tbNumeros3 = $("#tbNumeros3").jqGrid({
            datatype: "local",
            colModel: [ //0
                {name: 'Horario_vcDia', index: 'Horario_vcDia', label: 'Día', hidden: false, width: anchoDia_, sortable: false,
                formatter: function (value, options, rData) {
                    return "<a  href='#' onclick='Marcar_Dia(this.id)' id='" + rData.Horario_vcDia + "' >" + rData.Horario_vcDia + "</a>";
                }
            },
            // ========================================================================================================================    
                   {name: 'Horario_in1', index: 'Horario_in1', label: '00', hidden: false, width: ancho_, sortable: false, align: align_,
                   formatter: function (value, options, rData) {
                       return "<input " + (rData.Horario_in1 == '0' ? '' : 'checked') + " name='" + rData.Horario_vcDia + "' onclick='Asignar_HoraAcceso(this.name,1)'  type='checkbox' id='check_1_" + rData.Horario_vcDia + "' />";
                   }
               },
                   { name: 'Horario_in2', index: 'Horario_in2', label: '01', hidden: false, width: ancho_, sortable: false, align: align_,
                       formatter: function (value, options, rData) {
                           return "<input " + (rData.Horario_in2 == '0' ? '' : 'checked') + " name='" + rData.Horario_vcDia + "' onclick='Asignar_HoraAcceso(this.name,2)'  type='checkbox' id='check_2_" + rData.Horario_vcDia + "' />";
                       }
                   },
                   { name: 'Horario_in3', index: 'Horario_in3', label: '02', hidden: false, width: ancho_, sortable: false, align: align_,
                       formatter: function (value, options, rData) {
                           return "<input " + (rData.Horario_in3 == '0' ? '' : 'checked') + " name='" + rData.Horario_vcDia + "' onclick='Asignar_HoraAcceso(this.name,3)'  type='checkbox' id='check_3_" + rData.Horario_vcDia + "' />";
                       }
                   },
                   { name: 'Horario_in4', index: 'Horario_in4', label: '03', hidden: false, width: ancho_, sortable: false, align: align_,
                       formatter: function (value, options, rData) {
                           return "<input " + (rData.Horario_in4 == '0' ? '' : 'checked') + "  name='" + rData.Horario_vcDia + "' onclick='Asignar_HoraAcceso(this.name,4)'  type='checkbox' id='check_4_" + rData.Horario_vcDia + "' />";
                       }
                   },
                   { name: 'Horario_in5', index: 'Horario_in5', label: '04', hidden: false, width: ancho_, sortable: false, align: align_,
                       formatter: function (value, options, rData) {
                           return "<input  " + (rData.Horario_in5 == '0' ? '' : 'checked') + " name='" + rData.Horario_vcDia + "' onclick='Asignar_HoraAcceso(this.name,5)'  type='checkbox' id='check_5_" + rData.Horario_vcDia + "' />";
                       }
                   },
            // ========================================================================================================================    
            // ========================================================================================================================    
                   {name: 'Horario_in6', index: 'Horario_in6', label: '05', hidden: false, width: ancho_, sortable: false, align: align_,
                   formatter: function (value, options, rData) {
                       return "<input  " + (rData.Horario_in6 == '0' ? '' : 'checked') + " name='" + rData.Horario_vcDia + "' onclick='Asignar_HoraAcceso(this.name,6)'  type='checkbox' id='check_6_" + rData.Horario_vcDia + "' />";
                   }
               },
                   { name: 'Horario_in7', index: 'Horario_in7', label: '06', hidden: false, width: ancho_, sortable: false, align: align_,
                       formatter: function (value, options, rData) {
                           return "<input " + (rData.Horario_in7 == '0' ? '' : 'checked') + "  name='" + rData.Horario_vcDia + "' onclick='Asignar_HoraAcceso(this.name,7)'  type='checkbox' id='check_7_" + rData.Horario_vcDia + "' />";
                       }
                   },
                   { name: 'Horario_in8', index: 'Horario_in8', label: '07', hidden: false, width: ancho_, sortable: false, classes: 'css_fondoHorario', align: align_,
                       formatter: function (value, options, rData) {
                           return "<input " + (rData.Horario_in8 == '0' ? '' : 'checked') + "  name='" + rData.Horario_vcDia + "' onclick='Asignar_HoraAcceso(this.name,8)'  type='checkbox' id='check_8_" + rData.Horario_vcDia + "' />";
                       }
                   },
                   { name: 'Horario_in9', index: 'Horario_in9', label: '08', hidden: false, width: ancho_, sortable: false, classes: 'css_fondoHorario', align: align_,
                       formatter: function (value, options, rData) {
                           return "<input " + (rData.Horario_in9 == '0' ? '' : 'checked') + "  name='" + rData.Horario_vcDia + "' onclick='Asignar_HoraAcceso(this.name,9)'  type='checkbox' id='check_9_" + rData.Horario_vcDia + "' />";
                       }
                   },
                   { name: 'Horario_in10', index: 'Horario_in10', label: '09', hidden: false, width: ancho_, sortable: false, classes: 'css_fondoHorario', align: align_,
                       formatter: function (value, options, rData) {
                           return "<input " + (rData.Horario_in10 == '0' ? '' : 'checked') + "  name='" + rData.Horario_vcDia + "' onclick='Asignar_HoraAcceso(this.name,10)'  type='checkbox' id='check_10_" + rData.Horario_vcDia + "' />";
                       }
                   },
            // ========================================================================================================================    
            // ========================================================================================================================    
                   {name: 'Horario_in11', index: 'Horario_in11', label: '10', hidden: false, width: ancho_, sortable: false, classes: 'css_fondoHorario', align: align_,
                   formatter: function (value, options, rData) {
                       return "<input  " + (rData.Horario_in11 == '0' ? '' : 'checked') + " name='" + rData.Horario_vcDia + "' onclick='Asignar_HoraAcceso(this.name,11)' type='checkbox' id='check_11_" + rData.Horario_vcDia + "' />";
                   }
               },
                   { name: 'Horario_in12', index: 'Horario_in12', label: '11', hidden: false, width: ancho_, sortable: false, classes: 'css_fondoHorario', align: align_,
                       formatter: function (value, options, rData) {
                           return "<input  " + (rData.Horario_in12 == '0' ? '' : 'checked') + " name='" + rData.Horario_vcDia + "' onclick='Asignar_HoraAcceso(this.name,12)' type='checkbox' id='check_12_" + rData.Horario_vcDia + "' />";
                       }
                   },
                   { name: 'Horario_in13', index: 'Horario_in13', label: '12', hidden: false, width: ancho_, sortable: false, classes: 'css_fondoHorario', align: align_,
                       formatter: function (value, options, rData) {
                           return "<input  " + (rData.Horario_in13 == '0' ? '' : 'checked') + " name='" + rData.Horario_vcDia + "' onclick='Asignar_HoraAcceso(this.name,13)' type='checkbox' id='check_13_" + rData.Horario_vcDia + "' />";
                       }
                   },
                   { name: 'Horario_in14', index: 'Horario_in14', label: '13', hidden: false, width: ancho_, sortable: false, classes: 'css_fondoHorario', align: align_,
                       formatter: function (value, options, rData) {
                           return "<input " + (rData.Horario_in14 == '0' ? '' : 'checked') + "  name='" + rData.Horario_vcDia + "' onclick='Asignar_HoraAcceso(this.name,14)' type='checkbox' id='check_14_" + rData.Horario_vcDia + "' />";
                       }
                   },
                   { name: 'Horario_in15', index: 'Horario_in15', label: '14', hidden: false, width: ancho_, sortable: false, classes: 'css_fondoHorario', align: align_,
                       formatter: function (value, options, rData) {
                           return "<input  " + (rData.Horario_in15 == '0' ? '' : 'checked') + " name='" + rData.Horario_vcDia + "' onclick='Asignar_HoraAcceso(this.name,15)' type='checkbox' id='check_15_" + rData.Horario_vcDia + "' />";
                       }
                   },
            // ========================================================================================================================    
            // ========================================================================================================================    
                   {name: 'Horario_in16', index: 'Horario_in16', label: '15', hidden: false, width: ancho_, sortable: false, classes: 'css_fondoHorario', align: align_,
                   formatter: function (value, options, rData) {
                       return "<input " + (rData.Horario_in16 == '0' ? '' : 'checked') + "  name='" + rData.Horario_vcDia + "' onclick='Asignar_HoraAcceso(this.name,16)' type='checkbox' id='check_16_" + rData.Horario_vcDia + "' />";
                   }
               },
                   { name: 'Horario_in17', index: 'Horario_in17', label: '16', hidden: false, width: ancho_, sortable: false, classes: 'css_fondoHorario', align: align_,
                       formatter: function (value, options, rData) {
                           return "<input " + (rData.Horario_in17 == '0' ? '' : 'checked') + "  name='" + rData.Horario_vcDia + "' onclick='Asignar_HoraAcceso(this.name,17)' type='checkbox' id='check_17_" + rData.Horario_vcDia + "' />";
                       }
                   },
                   { name: 'Horario_in18', index: 'Horario_in18', label: '17', hidden: false, width: ancho_, sortable: false, classes: 'css_fondoHorario', align: align_,
                       formatter: function (value, options, rData) {
                           return "<input " + (rData.Horario_in18 == '0' ? '' : 'checked') + "  name='" + rData.Horario_vcDia + "' onclick='Asignar_HoraAcceso(this.name,18)' type='checkbox' id='check_18_" + rData.Horario_vcDia + "' />";
                       }
                   },
                   { name: 'Horario_in19', index: 'Horario_in19', label: '18', hidden: false, width: ancho_, sortable: false, classes: 'css_fondoHorario', align: align_,
                       formatter: function (value, options, rData) {
                           return "<input " + (rData.Horario_in19 == '0' ? '' : 'checked') + "  name='" + rData.Horario_vcDia + "' onclick='Asignar_HoraAcceso(this.name,19)' type='checkbox' id='check_19_" + rData.Horario_vcDia + "' />";
                       }
                   },
                   { name: 'Horario_in20', index: 'Horario_in20', label: '19', hidden: false, width: ancho_, sortable: false, classes: 'css_fondoHorario', align: align_,
                       formatter: function (value, options, rData) {
                           return "<input " + (rData.Horario_in20 == '0' ? '' : 'checked') + "  name='" + rData.Horario_vcDia + "' onclick='Asignar_HoraAcceso(this.name,20)' type='checkbox' id='check_20_" + rData.Horario_vcDia + "' />";
                       }
                   },
            // ========================================================================================================================    
            // ========================================================================================================================    
                   {name: 'Horario_in21', index: 'Horario_in21', label: '20', hidden: false, width: ancho_, sortable: false, align: align_,
                   formatter: function (value, options, rData) {
                       return "<input " + (rData.Horario_in21 == '0' ? '' : 'checked') + "  name='" + rData.Horario_vcDia + "' onclick='Asignar_HoraAcceso(this.name,21)' type='checkbox' id='check_21_" + rData.Horario_vcDia + "' />";
                   }
               },
                   { name: 'Horario_in22', index: 'Horario_in22', label: '21', hidden: false, width: ancho_, sortable: false, align: align_,
                       formatter: function (value, options, rData) {
                           return "<input " + (rData.Horario_in22 == '0' ? '' : 'checked') + "  name='" + rData.Horario_vcDia + "' onclick='Asignar_HoraAcceso(this.name,22)' type='checkbox' id='check_22_" + rData.Horario_vcDia + "' />";
                       }
                   },
                   { name: 'Horario_in23', index: 'Horario_in23', label: '22', hidden: false, width: ancho_, sortable: false, align: align_,
                       formatter: function (value, options, rData) {
                           return "<input " + (rData.Horario_in23 == '0' ? '' : 'checked') + "  name='" + rData.Horario_vcDia + "' onclick='Asignar_HoraAcceso(this.name,23)' type='checkbox' id='check_23_" + rData.Horario_vcDia + "' />";
                       }
                   },

                   { name: 'Horario_in24', index: 'Horario_in24', label: '23', hidden: false, width: ancho_, sortable: false, align: align_,
                       formatter: function (value, options, rData) {
                           return "<input " + (rData.Horario_in24 == '0' ? '' : 'checked') + "  name='" + rData.Horario_vcDia + "' onclick='Asignar_HoraAcceso(this.name,24)' type='checkbox' id='check_24_" + rData.Horario_vcDia + "' />";
                       }
                   },
            ],
            sortname: "Horario_vcDia",
            sortorder: "asc",
            width: (24 * (ancho_ + 5)) + (anchoDia_ + 5) + 1,
            height: (23 * 7) + 1,
            shrinkToFit: false,
            rownumbers: false,
            //caption: "Seleccione",
            beforeSelectRow: function (rowid, e) {
                return false;
            },
            onRightClickRow: function (rowid, iRow, iCol, e) {
                $("#tbNumeros3").jqGrid("resetSelection");
                return;
            }
        });




    } catch (e) {
        alerta(e);
    }

    $("#btnAgregarOrga").click(function () {
        busquedaorga = 1;
        var Alto = $(window).height();
        var Ancho = $(window).width();
        var $width = 949.2;
        var $height = 517.2;
        if (Alto < 500) {
            $height = Alto - 60;
            $width = Ancho - 40;
        }

        var $Pagina = '../../../P_Movil/Consultar/Con_SeleccionArea.aspx?Tipo=1&Multiple=1';
        $("#ifArea").attr("src", $Pagina);
        Modal = $('#dvArea').dialog({
            title: "Seleccionar área",
            width: $width,
            height: $height,
            modal: true
            //,resizable: false       
        });
    });


    $("#btnAgregarOrga2").click(function () {
        busquedaorga = 2;
        var Alto = $(window).height();
        var $width = 740;
        var $height = 525;
        if (Alto < 500) {
            $height = Alto - 20;
            $width = 750;
        }

        var $Pagina = '../../../P_Movil/Consultar/Con_SeleccionArea.aspx?Tipo=1&Multiple=1&UnPanel=1';
        $("#ifArea").attr("src", $Pagina);
        Modal = $('#dvArea').dialog({
            title: "Seleccionar área",
            width: $width,
            height: $height,
            modal: true
            //,resizable: false       
        });
    });

    //$("#btnAgregaArea").click(function () {
    //    var data = { inCodint: "0", vcCodint: $("#hdCodintTecnico").val(), vcCodorg: $("#hdCodOrgTecnico").val(), vcNomorg: $("#hdNomOrgTecnico").val(), btQuitar: "True" };
    //    debugger;
    //    var existe = false;
    //    if ($("#hdCodintTecnico").val() != "") {
    //        var ids = $("#tbGridSolicitudesArea").jqGrid("getDataIDs");
    //        for (var i = 0; i < ids.length; i++) {
    //            var myRow = $("#tbGridSolicitudesArea").jqGrid('getRowData', ids[i]);
    //            if ($("#hdCodintTecnico").val() === myRow.vcCodint) {
    //                existe = true;
    //            }
    //        }
    //    } else {
    //        alerta("Seleccionar área para asociar al técnico", "Usuario", null, "warning");
    //        return;
    //    }
        
    //    if(!existe){
    //        $("#tbGridSolicitudesArea").jqGrid('addRowData', cnt_orga, data);
    //        cnt_orga++;
    //    } else {
    //        alerta("El área seleccionada ya ha sido asociada", "Usuario", null, "warning");
    //        return;
    //    }
        
    //});

    $("#btnQuitaArea").click(function () {
        if(roweliminar > -1){
            $('#tbGridSolicitudesArea').jqGrid('delRowData', roweliminar);
            cnt_orga--;
            roweliminar = -1;
        } else {
            alerta("Seleccione un área para desasociar", "Usuario", null, "warning");
        }
        
    });

    //Ocultar grupos de opciones por defecto...
    $("#accOpcionesGenerales").accordion("option", "active", 1);
    $("#accOpcionesGenerales").find('h3').filter(':contains(Solicitudes)').hide();
    $("#accOpcionesGenerales").find('h3').filter(':contains(Incidencias)').hide();
    $("#accOpcionesGenerales").find('h3').filter(':contains(Atenciones)').hide();


    if ($("#hdfEsTecResp").val() == "3") {
        //alert("no editable por se técnico responsable");
        $("#dvMensaje1").show();
        if ($("#hdfEsResApro").val() != "0") {
            $("#lblEsTecResp").text("* No se puede quitar este perfil. Usuario es Espacilasita Responsable y es 'Responsable De Aprobación' de tipo 'Usuario Específico' de un tipo de solicitud.");
        } else {
            $("#lblEsTecResp").text("* No se puede quitar este perfil. Usuario es Espacilasita Responsable de un tipo de solicitud. ");
        }
    } else if ($("#hdfEsTecResp").val() == "2") {
        $("#dvMensaje1").show();
        $("#lblEsTecResp").text("* No se puede quitar este perfil. Usuario tiene solicitudes asignadas en estado \"En Proceso\"");
    } else {
        $("#dvMensaje1").hide();
    }

    //JHERRERA 20150120: Se valida si el usuario es responsable de aprobación
    if ($("#hdfEsResApro").val() == "4" && $("#hdfEsTecResp").val() == "0") {
        $("#dvMensaje2").show();
        $("#lblEsResApro").text("** No se puede quitar este perfil. Usuario es 'Responsable De Aprobación' de tipo 'Usuario Específico' de un tipo de solicitud.");
    } else {
        $("#dvMensaje2").hide();
    }

    IniciarPagina();
    CargarTreePerfiles();
    if ($("#hdfCodigo").val() == 1) {
        $("#btnAgregarOrga").prop("disabled", true);
        $("#btnQuitarOrganizacion").prop("disabled", true);
        $("#btnEmpleado").prop("disabled", true);
        $("#btnQuitarEmpleado").prop("disabled", true);
        $("#txtvcUsu").prop("disabled", true);
        $("#txtCodSuc").prop("disabled", true);
        $("#tbImagen").hide();
        $("#imgBuscarUsuarioSupervisor").prop("disabled", true);
        $("#imgBuscarUsuarioSupervisorBorrar").prop("disabled", true);
        //        $("#imgAgregarBolsa").prop("disabled", true);
        $("#imgQuitarBolsa").prop("disabled", true);
        $("#chkAtenciones_EsOperador").prop("disabled", true);
        $("#ddlNiveles").prop("disabled", true);
        $("#ddlBolsasParaAsinar").prop("disabled", true);
        $("#ddlBolsasAsignadas").prop("disabled", true);
        $("#txtUsuarioSupervisor").prop("disabled", true);
        $("#lstEmpleado").prop("disabled", true);
    }
    ValidarNumeroEnCajaTexto("txtDni", ValidarSoloNumero);
    ValidarNumeroEnCajaTexto("txtP_inCod", ValidarEnteroPositivo);

    IniciarPagina();
    $(".btnNormal").button();

    if ($("#hdfEsllamadaExterna").val() == "0") {
        var indiceTab = window.parent.tab.tabs("option", "selected");
    }


    //$("#txtNombre").focus();
    function IniciarPagina() {
        //TODO...
        var e = $('#txtF_vcCodEmp').val().split("=");
        $("#lstEmpleado").html("");
        $("#lstEmpleado").append($("<option></option>").attr("value", e[0]).text($('#txtF_vcCodEmp').val()));

        //alert($("#txtCorreo").val());

        if ($.trim($("#txtF_vcCodEmp").val()) != "" && $.trim($("#txtCorreo").val()) != "") {
            $("#txtCorreo").attr('disabled', 'disabled');
            $("#txtConfirmacionCorreo").attr('disabled', 'disabled');
        }
        else {
            $("#txtCorreo").removeAttr("disabled");
            $("#txtConfirmacionCorreo").removeAttr("disabled");
            $(".esConfirmPas").show();
        }
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

    $("#btnEmpleado").click(function () {
        var Alto = $(window).height();
        var Ancho = $(window).width();
        var $width = 740;
        var $height = 505;
        if (Alto < 500) {
            $height = Alto - 60;
            $width = 750;
        }

        var $Pagina = '../../../P_Movil/Consultar/Con_SeleccionArea.aspx?Tipo=2&Multiple=0';
        $("#ifArea").attr("src", $Pagina);
        Modal = $('#dvArea').dialog({
            title: "Seleccionar empleado",
            width: $width,
            height: $height,
            modal: true,
            resizable: false
        });
    });

    $("#btnQuitarEmpleado").click(function () {
        $("#lstEmpleado").html("");
        $("#lstEmpleado").append($("<option></option>").attr("value", "").text(""));
        $('#txtF_vcCodEmp').val("");

        //Manuel Tenorio
        $("#txtCorreo").removeAttr("disabled");
        $("#txtCorreo").val("");
        $("#txtConfirmacionCorreo").removeAttr("disabled");
        $("#txtConfirmacionCorreo").val("");
        //$("#btnEditarCorreo").show();
        //$("#txtEditarCorreo").text("Aceptar");
    });

    $("#btnQuitarOrganizacion").click(function () {
        $("#cbeOrganizacion_spControl").html("");
        $("#cbeOrganizacion_hdControl").val("");
    });


    //    $("#txtvcNom").focusout(function () {
    //        $("#txtvcNom").val($("#txtvcNom").val().replace(/\\/g, ""));
    //    });

    //    $("#txtvcUsu").focusout(function () {
    //        $("#txtvcUsu").val($("#txtvcUsu").val().replace(/\\/g, ""));
    //    });

    $("#txtCorreo").focusout(function () {
        $("#txtCorreo").val($("#txtCorreo").val().replace(/\\/g, ""));
    });

    // ================================================================================================================================
    // MODULO DE SEGURIDAD
    // ================================================================================================================================


    $("#txtvcPas").attr("disabled", true);
    $("#txtConfirmar").attr("disabled", true);
    $("#txtvcPas").css({ "background": "#BDBDBD" });
    $("#txtConfirmar").css({ "background": "#BDBDBD" });

    $('#chEditar').click(function () {
        if (!$(this).is(':checked')) {
            $("#txtvcPas").css({ "background": "#BDBDBD" });
            $("#txtConfirmar").css({ "background": "#BDBDBD" });
            $("#txtvcPas").attr("disabled", true);
            $("#txtConfirmar").attr("disabled", true);

            return;
        } else {
            $("#txtvcPas").css({ "background": "#E0F8F7" });
            $("#txtConfirmar").css({ "background": "#E0F8F7" });
            $("#txtvcPas").attr("disabled", false);
            $("#txtConfirmar").attr("disabled", false);
            $("#txtvcPas").select();
            return;
        }
    });

    // ================================================================================================================================

    if ($('#hdfCodigo').val().length == 0) {

        $("#txtvcPas").css({ "background": "#E0F8F7" });
        $("#txtConfirmar").css({ "background": "#E0F8F7" });
        $("#txtvcPas").attr("disabled", false);
        $("#txtConfirmar").attr("disabled", false);
        $('#filaCheckEditar').hide();
    }
    // ================================================================================================================================
    $("#txtvcUsu").focus();


    function validarEmail2(valor) {
        var ExpRegular = /(\w+)(\.?)(\w*)(\@{1})(\w+)(\.?)(\w*)(\.{1})(\w{2,3})/;

        if (ExpRegular.test(valor)) {
            return true;
        }
        else {
            return false;
        }
    }

    function fValidaExistenciaEmail(email) {
        ExisteEmail = false;

        $.ajax({
            type: "POST",
            url: "Mnt_SEG_Usuario.aspx/ValidaExistenciaEmail",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: "{'email','" + email + "'}",
            success: function (result) {
                if (result.d == '1') {
                    alert('Existe');
                    ExisteEmail = true;
                }
            }
        });

        return ExisteEmail;
    }

    // ================================================================================================================================
    // GUARDAR
    // ================================================================================================================================
    $("#btnGuardar").live("click", function () {
        // alert($("#hdf_idHoras").val());
        //        return
        //        if ($("#hdfArchivo").val() == "") {
        //            alerta("Seleccione una imagen");
        //            return;
        //        }


        //var rootNode = $("#divTree").dynatree("getRoot");
        BloquearPagina(true);

        var CorreoPersonal = $("#txtCorreo").val().replace(/'/g, "&#39").replace(/"/g, "&#34").replace(/\\/g, "&#92");
        if ($.trim(CorreoPersonal) == "") {
            alerta("Debe ingresar un correo.", "Usuario", null, "warning");
            BloquearPagina(false);
            $("#txtCorreo").focus();
            return;
        }

        if (CorreoPersonal != "") {
            if (validarEmail2($.trim(CorreoPersonal)) == false) {
                alerta("El valor ingresado del correo no es válido.", "Usuario", null, "warning");
                BloquearPagina(false);
                $("#txtCorreo").focus();
                return;
            }
        }

        if ($.trim($("#txtCorreo").val()) != $.trim($("#txtConfirmacionCorreo").val())) {
            alerta("Los correos no coinciden.", "Usuario", null, "warning");
            BloquearPagina(false);
            $("#txtConfirmacionCorreo").focus();
            return;
        }


        var nodosSelecionadosPerfil = $("#divTreePerfil").dynatree("getRoot").tree.getSelectedNodes().join(",");
        nodosSelecionadosPerfil = nodosSelecionadosPerfil.replace(/'/g, "");
        if (nodosSelecionadosPerfil == "" && $("#hdfPerfilesOcultos").val() == "0") {
            alerta("Debe seleccionar mínimo un perfil.", "Usuario", null, "warning");
            BloquearPagina(false);
            return;
        }
        var nodosSelecionadosGrupo = '';
        //var nodosSelecionadosGrupo = $("#divTreeGrupo").dynatree("getRoot").tree.getSelectedNodes().join(",");
        //nodosSelecionadosGrupo = nodosSelecionadosGrupo.replace(/'/g, "");

        var nodosSelecionadosPolitica = '';
        // nodosSelecionadosPolitica  = $("#divTreePolitica").dynatree("getRoot").tree.getSelectedNodes().join(",");
        // nodosSelecionadosPolitica = nodosSelecionadosPolitica.replace(/'/g, "");

        var Seg_usuario = new seg_usuario();

        if ($("#hdfCodigo").val() == "") {
            Seg_usuario.P_inCod = "-1";
        }
        else {
            Seg_usuario.P_inCod = $("#hdfCodigo").val();
        }

        var oEmp;
        if (_Empleado == null) {
            oEmp = $('#txtF_vcCodEmp').val().split("=");
        }
        else {
            oEmp = _Empleado.vcNom.split("=");
        }
        if (oEmp.length > 1) {
            if (oEmp[1] == null || oEmp[1] == "") {
                Seg_usuario.vcNom = $.trim($("#txtvcUsu").val());
            }
            else {
                Seg_usuario.vcNom = oEmp[1];
            }
        }
        else {
            Seg_usuario.vcNom = $.trim($("#txtvcUsu").val());
        }


        Seg_usuario.vcUsu = $.trim($("#txtvcUsu").val());
        Seg_usuario.vcPas = $.trim($("#txtvcPas").val());
        Seg_usuario.vcConfPas = $.trim($("#txtConfirmar").val());
        Seg_usuario.F_vcCodEmp = $.trim($("#txtF_vcCodEmp").val());
        Seg_usuario.F_vcCodInt = $.trim($("#cbeOrganizacion_hdControl").val());
        Seg_usuario.F_vcCodSuc = $.trim($("#hdfCodSucBusqueda").val());
        Seg_usuario.Dni = $.trim($("#txtDni").val());
        Seg_usuario.Mail = $.trim($("#txtCorreo").val());
        Seg_usuario.ConfMail = $.trim($("#txtConfirmacionCorreo").val());


        Seg_usuario.vcUsu = Seg_usuario.vcUsu.replace(/'/g, "&#39").replace(/\\/g, "&#40").replace(/"/g, "&#34");
        Seg_usuario.vcPas = Seg_usuario.vcPas.replace(/'/g, "&#39").replace(/\\/g, "&#40").replace(/"/g, "&#34");
        Seg_usuario.vcPas = Seg_usuario.vcPas.replace(/'/g, "&#39").replace(/\\/g, "&#40").replace(/"/g, "&#34");
        Seg_usuario.vcPas = Seg_usuario.vcPas.replace(/'/g, "&#39").replace(/\\/g, "&#40").replace(/"/g, "&#34");
        Seg_usuario.vcPas = Seg_usuario.vcPas.replace(/'/g, "&#39").replace(/\\/g, "&#40").replace(/"/g, "&#34");

        Seg_usuario.vcConfPas = Seg_usuario.vcConfPas.replace(/'/g, "&#39").replace(/\\/g, "&#40").replace(/"/g, "&#34");
        Seg_usuario.vcConfPas = Seg_usuario.vcConfPas.replace(/'/g, "&#39").replace(/\\/g, "&#40").replace(/"/g, "&#34");
        Seg_usuario.vcConfPas = Seg_usuario.vcConfPas.replace(/'/g, "&#39").replace(/\\/g, "&#40").replace(/"/g, "&#34");
        Seg_usuario.vcConfPas = Seg_usuario.vcConfPas.replace(/'/g, "&#39").replace(/\\/g, "&#40").replace(/"/g, "&#34");

        Seg_usuario.vcNom = Seg_usuario.vcNom.replace(/'/g, "&#39").replace(/\\/g, "&#40").replace(/"/g, "&#34");
        Seg_usuario.Dni = Seg_usuario.Dni.replace(/'/g, "&#39").replace(/\\/g, "&#40").replace(/"/g, "&#34");
        Seg_usuario.Mail = Seg_usuario.Mail.replace(/'/g, "&#39").replace(/\\/g, "&#40").replace(/"/g, "&#34");
        Seg_usuario.ConfMail = Seg_usuario.ConfMail.replace(/'/g, "&#39").replace(/\\/g, "&#40").replace(/"/g, "&#34");

        // ===============================================================================================================
        // MODULO DE SEGURIDAD
        // ===============================================================================================================

        Seg_usuario.vcHoras = $.trim($("#hdf_idHoras").val());

        if ($("#chBloqueo").is(':checked'))
        { Seg_usuario.btBloqueo = true; }
        else { Seg_usuario.btBloqueo = false; }

        if ($("#chReiniciar").is(':checked'))
        { Seg_usuario.btReinicia = true; }
        else { Seg_usuario.btReinicia = false; }

        // ===============================================================================================================
        // ===============================================================================================================

        if ($.trim(Seg_usuario.vcNom) == "") {
            alerta("El Nombre de usuario es un campo obligatorio.", "Usuario", null, "warning");
            BloquearPagina(false);
            $("#txtvcNom").focus();
            return;
        }

        if ($.trim(Seg_usuario.vcUsu) == "") {
            alerta("El Usuario es un campo obligatorio.", "Usuario", null, "warning");
            BloquearPagina(false);
            $("#txtvcUsu").focus();
            return;
        }

        if ($("#hdf_esLDAP").val() != "1") { //agregado 07-08-2015 wapumayta
            if ($.trim(Seg_usuario.vcPas) == "") {
                alerta("La contraseña es un campo obligatorio.", "Usuario", null, "warning");
                BloquearPagina(false);
                $("#txtvcPas").focus();
                return;
            }
            if ($.trim(Seg_usuario.vcPas) != $.trim(Seg_usuario.vcConfPas)) {
                alerta("La contraseña ingresada no coincide.", "Usuario", null, "warning");
                BloquearPagina(false);
                $("#txtvcPas").focus();
                return;
            }
        }
        //        if (nodosSelecionadosPerfil == "") {
        //            alerta("Debe seleccionar al menos un Perfil para el usuario.");
        //            BloquearPagina(false);
        //            $("#divTreePerfil").focus();
        //            return;
        //        };
        //        if (nodosSelecionadosGrupo == "") {
        //            alerta("Debe serleccionar al menos un Grupo para el usuario:");
        //            BloquearPagina(false);
        //            $("#divTreeGrupo").focus();
        //            return
        //        };
        if ($.trim(Seg_usuario.Mail) != "") {
            if (validarEmail2($.trim(Seg_usuario.Mail)) == false) {
                alerta("Revisar el formato del Correo del Usuario xxxxx@xxx.xxx", "Usuario", null, "warning");
                BloquearPagina(false);
                $("#txtCorreo").focus();
                return;
            }
            if ($.trim(Seg_usuario.ConfMail) != "") {
                if (validarEmail2($.trim(Seg_usuario.ConfMail)) == false) {
                    alerta("Revisar el formato ingresado en el confirmar correo xxxxx@xxx.xxx", "Usuario", null, "warning");
                    BloquearPagina(false);
                    $("#txtCorreo").focus();
                    return;
                }
            }
            if ($.trim(Seg_usuario.Mail) != $.trim(Seg_usuario.ConfMail)) {
                alerta("El correo ingresado no coincide.", "Usuario", null, "warning");
                BloquearPagina(false);
                $("#txtConfirmacionCorreo").focus();
                return;
            }

            //Aqui poner validacion de existencia de correo para Nuevo.
            if (fValidaExistenciaEmail($.trim(Seg_usuario.Mail)) == true) {
                alerta("El correo ingresado ya fue asignado a otro usuario.", "Usuario", null, "warning");
                BloquearPagina(false);
                $("#txtCorreo").focus();
                $("#txtConfirmacionCorreo").val('');
                return
            }
        }

        var codEmpleado;
        if (_Empleado == null) {
            var e = $('#txtF_vcCodEmp').val().split("=");
            codEmpleado = e[0];
        }
        else {
            codEmpleado = _Empleado.P_vcCod;
        }

        Seg_usuario.F_vcCodEmp = codEmpleado; //agregado 28/03/2014 wapumayta
        //alert(Seg_usuario.F_vcCodEmp + " - " + Seg_usuario.F_vcCodInt);

        if (nodosSelecionadosPerfil.indexOf('<3>') >= 0) {
            //Contiene el perfil Usuario...
            if (Seg_usuario.F_vcCodEmp == "" && Seg_usuario.F_vcCodInt == "") {
                alerta("Debe seleccionar Empleado en la opción de Cuenta", "Usuario", null, "warning");
                BloquearPagina(false);
                return;
            }

        }
        else {

            if (Seg_usuario.F_vcCodEmp == "" && Seg_usuario.F_vcCodInt == "") {
                alerta("Debe seleccionar un Área o un Empleado en la opción de Cuenta", "Usuario", null, "warning");
                BloquearPagina(false);
                return;
            }

        }

        
        Seg_usuario.ConfiguracionUsuario[0].IdPagina = $("#ddlPaginaPrincipal").val();
        Seg_usuario.ConfiguracionUsuario[0].TipoNivel = $("#ddlNivelProducto").val();

        var oSeg_usuario = JSON.stringify(Seg_usuario);

        var btVig = $('#chkEstado').is(':checked');

        var btDobleFactor = $('#chkDobleFactor').is(':checked');


        //Datos de Solicitudes ***************************************************************************************************************************************
        var XMLUsuGruTipSol = "";
        if (EsTecnicoSolicitud) {
            XMLUsuGruTipSol = "<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?><ROOT>";
            var vcIds = tbGridSolicitudes.getDataIDs();
            for (i = 0; i < vcIds.length; i++) {
                var row = tbGridSolicitudes.getRowData(vcIds[i]);
                if ($("#chkLeer_" + row.IdTipSel)[0].checked == true || $("#chkCrear_" + row.IdTipSel)[0].checked == true || $("#chkEditar_" + row.IdTipSel)[0].checked == true ||
                    $("#chkEliminar_" + row.IdTipSel)[0].checked == true) {
                    XMLUsuGruTipSol += "<DATA F_inUsu=\"" + vcIdBusqueda + "\" F_inTipSol=\"" + row.IdTipSel + "\" biLeer=\"" + $("#chkLeer_" + row.IdTipSel)[0].checked + "\" biCrear=\"";
                    XMLUsuGruTipSol += $("#chkCrear_" + row.IdTipSel)[0].checked + "\" biEditar=\"" + $("#chkEditar_" + row.IdTipSel)[0].checked + "\" biEliminar=\"";
                    XMLUsuGruTipSol += $("#chkEliminar_" + row.IdTipSel)[0].checked + "\"/>";
                }
            }
            XMLUsuGruTipSol += "</ROOT>";
        }
        //************************************************************************************************************************************************************

        //Datos de AreaTecnico ***************************************************************************************************************************************
        var XMLAreaTecnico = "";
        if (EsTecnicoSolicitud) {
            XMLAreaTecnico = "<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?><ROOT>";
            var vcIds = tbGridSolicitudesArea.getDataIDs();
            for (i = 0; i < vcIds.length; i++) {
                var row = tbGridSolicitudesArea.getRowData(vcIds[i]);                
                XMLAreaTecnico += "<DATA F_inUsu=\"" + vcIdBusqueda + "\" F_vcCodint=\"" + row.vcCodint + "\"/>";
                
            }
            XMLAreaTecnico += "</ROOT>";
        }
        //************************************************************************************************************************************************************


        //Datos de Incidencias ***************************************************************************************************************************************
        var varXMLIncidencia = "";
        if (EsTecnicoIncidencia) {
            var Bolsas = $("#ddlBolsasAsignadas option");
            varXMLIncidencia = '<?xml version="1.0" encoding="iso-8859-1"?><TABLE>';
            if (Bolsas.length == 0) {
                varXMLIncidencia = "";
                alerta("Debe seleccionar por lo menos una bolsa de incidencias", "Usuario", null, "warning");

                //                if (!$("#accOpcionesGenerales").find('h3').filter(':contains(Incidencias)').hasClass("ui-state-active")) {
                //                    $("#accOpcionesGenerales").find('h3').filter(':contains(Incidencias)').click();
                //                }


                BloquearPagina(false);
                return;
            }
            else {
                var i;
                for (i = 0; i < Bolsas.length; i++) {
                    varXMLIncidencia = varXMLIncidencia + '<BOLSA><IdBolsa>' + $(Bolsas[i]).val().split('-')[0].toString() + '</IdBolsa></BOLSA>';
                }
                varXMLIncidencia = varXMLIncidencia + '</TABLE>';
            }
            var idUsuarioSupervisor;
            if ($.trim($("#txtUsuarioSupervisor").val()) == "")
            { idUsuarioSupervisor = "0"; }
            else
            { idUsuarioSupervisor = $("#txtUsuarioSupervisor").val().split('-')[0].toString(); }
        }
        //************************************************************************************************************************************************************


        //Datos de Atenciones ****************************************************************************************************************************************
        var EsOperadorAtenciones = 0;
        if ($("#chkAtenciones_EsOperador").is(':checked')) {
            EsOperadorAtenciones = 1;
        }
        //************************************************************************************************************************************************************

        var miIdTemporizador;
        var miIdPerfilTemporizador;

        if ($("#chkActivarTemporizador").prop("checked") && $("#ddlTemporizador").val() == '-1') {
            alerta("Debe seleccionar un temporizador válido.", "Usuario", null, "warning");
            BloquearPagina(false);
            return;
        }
        if ($("#chkActivarTemporizador").prop("checked") && $("#ddlTemporizador").val() != null) {
            miIdTemporizador = $("#ddlTemporizador").val().split("-")[0];
            miIdPerfilTemporizador = $("#ddlTemporizador").val().split("-")[1];
        } else {
            miIdTemporizador = -1;
            miIdPerfilTemporizador = -1;
        }
        //
        $.ajax({
            type: "POST",
            url: "Mnt_SEG_Usuario.aspx/Guardar",
            data: "{'oEntidad': '" + oSeg_usuario +
            "','pXMLPerfil': '" + nodosSelecionadosPerfil +
            "','pXMLGrupo': '" + nodosSelecionadosGrupo +
            "','pXMLPolitica': '" + nodosSelecionadosPolitica +
            "','btVig': '" + btVig +
            "','pCodEmpleado': '" + codEmpleado +
            "','vcRuta': '" + $("#hdfArchivo").val() +
            "','XMLUsuGruTipSol': '" + XMLUsuGruTipSol +
            "','XMLAreaTecnico': '" + XMLAreaTecnico +
            "','prXmlBolsas': '" + varXMLIncidencia +
            "','prIdUsuarioSupervisor': '" + idUsuarioSupervisor +
            "','prEsOperadorAtenciones': '" + EsOperadorAtenciones +
            "','prIdOperadorAtencion': '" + $("#hdIdOperadorAtencion").val() +
            "','prIdPerfilOrigen': '" + miIdPerfilTemporizador + //agregado 29-10-2014 wapumayta
            "','btDobleFactor': '" + btDobleFactor +
            "','prIdTemporizador': '" + miIdTemporizador + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {

                if (result.d != '') {
                    BloquearPagina(false);
                    alerta(result.d);
                    $("#txtvcUsu").focus();
                    return;
                }
                else {
                    if ($("#hdfEsllamadaExterna").val() != "1") {
                        window.parent.ActualizarGrilla();
                    }
                    Mensaje("<br/><h1>Registro guardado</h1><br><h2>" + $.trim($("#txtvcUsu").val()) + "</h2>", document, CerroMensaje);
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

        if ($("#hdfEsllamadaExterna").val() == "1") {
            window.parent.fnVolverAEmpleadoReload();
        }
        else {
            if ($("#hdfEstado").val() == "") {
                $("#txtNombre").val("");
                $("#txtNombre").focus();
            }
            else {
                window.parent.tab.tabs("remove", indiceTab);
            }
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


    //    $("#txtCodInt").autocomplete({
    //        minLength: 0,
    //        source: function (request, response) {
    //            $.ajax({
    //                type: "POST",
    //                url: "../../../Common/WebService/General.asmx/ListarAreas",
    //                data: "{'maxFilas': '" + 100 + "'," +
    //                               "'vcNomAre': '" + $("#txtCodInt").val() + "'," + "'idCliente': '" + $("#hdfCodCliente").val() + "'}",
    //                contentType: "application/json; charset=utf-8",
    //                dataType: "json",
    //                success: function (result) {
    //                    response($.map(result.d, function (item) {
    //                        return {
    //                            label: item.Nombre,
    //                            inCodInt: item.CodInt
    //                        }
    //                    }));
    //                },
    //                cache: false,
    //                error: function (XMLHttpRequest, textStatus, errorThrown) {
    //                    alert(errorThrown);
    //                }
    //            });
    //        },
    //        focus: function (event, ui) {
    //            $("#txtCodInt").val(ui.item.label);
    //            return false;
    //        },
    //        select: function (event, ui) {
    //            Selecciono = true;
    //            $("#txtCodInt").val(ui.item.label);
    //            $("#hdfCodIntBusqueda").val(ui.item.inCodInt);
    //            return false;
    //        },
    //        change: function (event, ui) {
    //            if (!Selecciono)
    //                $("#hdfCodIntBusqueda").val("");
    //            return false;
    //        },
    //        open: function (event, ui) {
    //            Selecciono = false;
    //            return false;
    //        }
    //    });


    $("#txtCodSuc").autocomplete({
        minLength: 0,
        source: function (request, response) {
            $.ajax({
                type: "POST",
                url: "../../../Common/WebService/General.asmx/ListarSucursalPorUsuario",
                data: "{'maxFilas': '" + 100 + "'," +
                               "'vcNomSuc': '" + $("#txtCodSuc").val() + "'," + "'idCliente': '" + $("#hdfCodCliente").val() + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    response($.map(result.d, function (item) {
                        return {
                            label: item.vcNom,
                            vcCodSuc: item.P_vcCod
                        };
                    }));
                },
                cache: false,
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alerta(errorThrown);
                }
            });
        },
        focus: function (event, ui) {
            $("#txtCodSuc").val(ui.item.label);
            return false;
        },
        select: function (event, ui) {
            Selecciono = true;
            $("#txtCodSuc").val(ui.item.label);
            $("#hdfCodSucBusqueda").val(ui.item.vcCodSuc);
            return false;
        },
        change: function (event, ui) {
            if (!Selecciono)
            { $("#hdfCodSucBusqueda").val(""); }
            return false;
        },
        open: function (event, ui) {
            Selecciono = false;
            return false;
        }
    });


    $("#txtvcNom").focus();
    CargaImagenUsuario();

    if ($("#hdfPerfilesOcultos").val() == "0") { //agreagdo 14-01-2015 wapumayta
        CargaDatosTecnicoSolicitud();
    }

    if ($("#hdfEsllamadaExterna").val() == "1") {
        fnEsLlamadaExterna();
    }


    fnLoadTemporizador();

    $("#ddlNivelProducto").change(function () {
        fnObtenerDatosPaginaPorNivel();
    });

    $("input[type=password]").each(function () {
        //debugger;
        AgregarMensajeValidacionContrasenia(this, true, 4, 2);
    });
    
});

function CargaImagenUsuario() {
    var $pagina = "CargarImagenUsuario.aspx?CodUsu=" + $("#hdfCodigo").val();
    $("#ifrCargaImagen").attr("src", $pagina);
}

var tbGridSolicitudes;

var tbGridSolicitudesArea;

var vcIdBusqueda = "";
var totalChecks;
var totalChkLeer, totalChkCrear, totalChkEditar, totalChkEliminar;
var vValorControlActual = '';

function CargaDatosTecnicoSolicitud() {

    var idUsuario = '-1';
    if ($("#hdfCodigo").val() != "") {
        idUsuario = $("#hdfCodigo").val();
    }

    tbGridSolicitudesArea = $("#tbGridSolicitudesArea").jqGrid({
        sortable: true,
        datatype: function () {
            $.ajax({
                url: "Mnt_SEG_Usuario.aspx/ListarAreas", //PageMethod
                data: "{'vcIdUsuario':'" + idUsuario + "'}",
                dataType: "json",
                type: "post",
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    //debugger;
                    lstFilas = result.d;
                    cnt_orga = lstFilas.length;
                    tbGridSolicitudesArea.jqGrid('clearGridData');
                    if (lstFilas.length > 0) {
                        //fnHabilitarCheckboxTodos(idUsuario);

                        //$("#tbGridSolicitudesArea").setGridHeight($(window).height() - 410);

                        j = 0;

                        //totalChecks = $(lstFilas).length;
                        //totalChkLeer = totalChecks;
                        //totalChkCrear = totalChecks;
                        //totalChkEditar = totalChecks;
                        //totalChkEliminar = totalChecks;

                        idSetIntervalFilas2 = setInterval(function () {
                            tbGridSolicitudesArea.jqGrid('addRowData', j, lstFilas[j]);

                        //    if (lstFilas[j] != undefined) {
                        //        if ($("#chkLeer_" + lstFilas[j].IdTipSel)[0].checked == false)
                        //        { totalChkLeer = totalChkLeer - 1; }
                        //        if ($("#chkCrear_" + lstFilas[j].IdTipSel)[0].checked == false)
                        //        { totalChkCrear = totalChkCrear - 1; }
                        //        if ($("#chkEditar_" + lstFilas[j].IdTipSel)[0].checked == false)
                        //        { totalChkEditar = totalChkEditar - 1; }
                        //        if ($("#chkEliminar_" + lstFilas[j].IdTipSel)[0].checked == false)
                        //        { totalChkEliminar = totalChkEliminar - 1; }
                        //    }

                            j = j + 1;
                            if (j == $(lstFilas).length) {
                                clearInterval(idSetIntervalFilas2);
                                //fnVerificarCheckTodos();
                            }
                        }, 1);

                    } else {
                        //fnDeshabilitarCheckboxTodos();
                        //$("#tbGridSolicitudesArea").setGridHeight(0);
                    }
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
                    id: "inCodint"
                },
        colModel: [{ name: 'inCodint', Campo: 'inCodint', label: 'inCodint', hidden: true, width: 50, key: true },
                   { name: 'vcCodint', Campo: 'vcCodint', label: 'vcCodint', hidden: true, width: 50 },
                   { name: 'vcCodorg', Campo: 'vcCodorg', label: 'Cód. Area', hidden: false, width: 150 },
                   { name: 'vcNomorg', Campo: 'vcNomorg', label: 'Nombre Area', hidden: false, width: 250 }
                            //{
                            //    name: 'chkLeer', index: 'chkLeer', label: 'Leer', hidden: false, width: 60, align: 'center', editable: true, sortable: false,
                            //    formatter: function (value, options, rData) {
                            //        if (rData.biLeer == "True") {
                            //            return "<input  id='chkLeer_" + rData.IdTipSel + "' type='checkbox' class='HabilitarLeer' checked='checked' " + rData.vcDisabled + "/>";
                            //        } else {
                            //            return "<input id='chkLeer_" + rData.IdTipSel + "' type='checkbox' class='HabilitarLeer' " + rData.vcDisabled + "/>";
                            //        }
                            //    }
                            //},
                            
                ],
        titulo: 'Área',
        loadtext: 'Cargando datos...',
        emptyrecords: 'No hay resultados',
        sortname: "Idd", //sortname: idTabla, //Default SortColumn
        sortorder: "asc", //Default SortOrder.
        height: "auto",
        width: "450",
        rownumbers: true,
        shrinkToFit: false,
        caption: "Áreas asociadas",
        beforeSelectRow: function (rowid, e) {
            roweliminar = parseInt(rowid);
            return true;
        }
    });


    //TABLA GENERAL
    tbGridSolicitudes = $("#tbGridSolicitudes").jqGrid({
        sortable: true,
        datatype: function () {
            $.ajax({
                url: "Mnt_SEG_Usuario.aspx/Listar", //PageMethod
                data: "{'vcIdUsuario':'" + idUsuario + "'}",
                dataType: "json",
                type: "post",
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    lstFilasSol = result.d;
                    tbGridSolicitudes.jqGrid('clearGridData');
                    if (lstFilasSol.length > 0) {
                        fnHabilitarCheckboxTodos(idUsuario);

                        //$("#tbGridSolicitudes").setGridHeight($(window).height() - 230);
                        $("#tbGridSolicitudes").setGridHeight($(window).height() - 410);

                        k = 0;

                        //agregado - 14/05/2014 - wapumayta
                        totalChecks = $(lstFilasSol).length;
                        totalChkLeer = totalChecks;
                        totalChkCrear = totalChecks;
                        totalChkEditar = totalChecks; 
                        totalChkEliminar = totalChecks;

                        idSetIntervalFilas = setInterval(function () {
                            tbGridSolicitudes.jqGrid('addRowData', k, lstFilasSol[k]);

                            //comentado 14/05/2014 - wapumayta
                            //if (lstFilas[j] != undefined) {
                            //    if ($("#chkTodosLeer").is(':checked') == true)
                            //        $("#chkLeer_" + lstFilas[j].IdTipSel)[0].checked = true;
                            //    if ($("#chkTodosCrear").is(':checked') == true)
                            //        $("#chkCrear_" + lstFilas[j].IdTipSel)[0].checked = true;
                            //    if ($("#chkTodosEditar").is(':checked') == true)
                            //        $("#chkEditar_" + lstFilas[j].IdTipSel)[0].checked = true;
                            //    if ($("#chkTodosEliminar").is(':checked') == true)
                            //        $("#chkEliminar_" + lstFilas[j].IdTipSel)[0].checked = true;
                            //}

                            //agregado - 14/05/2014 - wapumayta
                            if (lstFilasSol[k] != undefined) {
                                if ($("#chkLeer_" + lstFilasSol[k].IdTipSel)[0].checked == false)
                                { totalChkLeer = totalChkLeer - 1; }
                                if ($("#chkCrear_" + lstFilasSol[k].IdTipSel)[0].checked == false)
                                { totalChkCrear = totalChkCrear - 1; }
                                if ($("#chkEditar_" + lstFilasSol[k].IdTipSel)[0].checked == false)
                                { totalChkEditar = totalChkEditar - 1; }
                                if ($("#chkEliminar_" + lstFilasSol[k].IdTipSel)[0].checked == false)
                                { totalChkEliminar = totalChkEliminar - 1; }
                            }

                            k = k + 1;
                            if (k == $(lstFilasSol).length) {
                                clearInterval(idSetIntervalFilas);
                                fnVerificarCheckTodos();
                            }
                        }, 1);

                    } else {
                        fnDeshabilitarCheckboxTodos();
                        $("#tbGridSolicitudes").setGridHeight(0);
                    }
                    //                    if ($(result.d).length > 0) {
                    //                        $("#btnGuardar").button("option", "disabled", false);
                    //                    } else {
                    //                        $("#btnGuardar").button("option", "disabled", true);
                    //                    }
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
                id: "P_inCodSol"
            },
        colModel: [{ name: 'IdTipSel', Campo: 'IdTipSel', label: 'IdTipSel', hidden: true, width: 50, key: true },
                            { name: 'vcNomTipSel', Campo: 'vcNomTipSel', label: 'Descripción', hidden: false, width: 300 },
                            { name: 'chkLeer', index: 'chkLeer', label: 'Leer', hidden: false, width: 60, align: 'center', editable: true, sortable: false,
                                formatter: function (value, options, rData) {
                                    if (rData.biLeer == "True") {
                                        return "<input  id='chkLeer_" + rData.IdTipSel + "' type='checkbox' class='HabilitarLeer' checked='checked' " + rData.vcDisabled + "/>";
                                    } else {
                                        return "<input id='chkLeer_" + rData.IdTipSel + "' type='checkbox' class='HabilitarLeer' " + rData.vcDisabled + "/>";
                                    }
                                }
                            },
                            { name: 'chkCrear', index: 'chkCrear', label: 'Asignar', hidden: false, width: 60, align: 'center', editable: true, sortable: false,
                                formatter: function (value, options, rData) {
                                    if (rData.biCrear == "True") {
                                        return "<input id='chkCrear_" + rData.IdTipSel + "' type='checkbox' class='HabilitarEditar chkCrear' checked='checked' " + rData.vcDisabled + "/>";
                                    } else {
                                        return "<input id='chkCrear_" + rData.IdTipSel + "' type='checkbox' class='HabilitarEditar chkCrear' " + rData.vcDisabled + "/>";
                                    }
                                }
                            },
                            { name: 'chkEditar', index: 'chkEditar', label: 'Procesar', hidden: false, width: 60, align: 'center', editable: true, sortable: false,
                                formatter: function (value, options, rData) {
                                    if (rData.biEditar == "True") {
                                        return "<input id='chkEditar_" + rData.IdTipSel + "' type='checkbox' class='HabilitarEditar chkEditar' checked='checked' " + rData.vcDisabled + "/>";
                                    } else {
                                        return "<input id='chkEditar_" + rData.IdTipSel + "' type='checkbox' class='HabilitarEditar chkEditar' " + rData.vcDisabled + "/>";
                                    }
                                }
                            },
                            { name: 'chkEliminar', index: 'chkEliminar', label: 'Anular', hidden: false, width: 60, align: 'center', editable: true, sortable: false,
                                formatter: function (value, options, rData) {
                                    if (rData.biEliminar == "True") {
                                        return "<input id='chkEliminar_" + rData.IdTipSel + "' type='checkbox' class='HabilitarEditar chkEliminar' checked='checked' " + rData.vcDisabled + "/>";
                                    } else {
                                        return "<input id='chkEliminar_" + rData.IdTipSel + "' type='checkbox' class='HabilitarEditar chkEliminar' " + rData.vcDisabled + "/>";
                                    }
                                }
                            }
                ],
        titulo: 'Especialista',
        loadtext: 'Cargando datos...',
        emptyrecords: 'No hay resultados',
        sortname: "Idd", //sortname: idTabla, //Default SortColumn
        sortorder: "asc", //Default SortOrder.
        height: "auto",
        width: "620",
        rownumbers: true,
        shrinkToFit: false,
        caption: "Tipos de Solicitud",
        beforeSelectRow: function (rowid, e) {
            return false;
        }
    });

    if (!isEdit) {
        $("#tbGridSolicitudes_chkLeer").append("<input type='checkbox' id='chkTodosLeer' />");
        $("#tbGridSolicitudes_chkCrear").append("<input type='checkbox' id='chkTodosCrear' />");
        $("#tbGridSolicitudes_chkEditar").append("<input type='checkbox' id='chkTodosEditar' />");
        $("#tbGridSolicitudes_chkEliminar").append("<input type='checkbox' id='chkTodosEliminar' />");
    }

    $("#tbGridSolicitudes").setCaption('Tipos de Solicitud');
    fnLimpiarCheckboxTodos();
    fnMostrarDatos("");




    function fnLimpiarCheckboxTodos() {
        $("#chkTodosLeer")[0].checked = false;
        $("#chkTodosCrear")[0].checked = false;
        $("#chkTodosEditar")[0].checked = false;
        $("#chkTodosEliminar")[0].checked = false;
    }

    function fnDeshabilitarCheckboxTodos() {
        $("#chkTodosLeer").prop('disabled', true);
        $("#chkTodosCrear").prop('disabled', true);
        $("#chkTodosEditar").prop('disabled', true);
        $("#chkTodosEliminar").prop('disabled', true);
    }

    function fnHabilitarCheckboxTodos(idUsuario) {
        if (idUsuario == "1") {
            $("#chkTodosLeer").prop('disabled', true);
            $("#chkTodosCrear").prop('disabled', true);
            $("#chkTodosEditar").prop('disabled', true);
            $("#chkTodosEliminar").prop('disabled', true);
        } else {
            $("#chkTodosLeer").prop('disabled', false);
            $("#chkTodosCrear").prop('disabled', false);
            $("#chkTodosEditar").prop('disabled', false);
            $("#chkTodosEliminar").prop('disabled', false);
        }
    }

    $("#chkTodosLeer").change(function () {
        var vcIds = tbGridSolicitudes.getDataIDs();

        if ($("#chkTodosLeer").is(':checked') == true) {
            for (i = 0; i < vcIds.length; i++) {
                var row = tbGridSolicitudes.getRowData(vcIds[i]);
                $("#chkLeer_" + row.IdTipSel)[0].checked = true;
            }
            totalChkLeer = totalChecks;
        } else {
            for (i = 0; i < vcIds.length; i++) {
                var row = tbGridSolicitudes.getRowData(vcIds[i]);

                var biEditarC = "0";
                if ($("#chkCrear_" + row.IdTipSel).is(':checked') == true) {
                    biEditarC = "1";
                }   
                if ($("#chkEditar_" + row.IdTipSel).is(':checked') == true) {
                    biEditarC = "1";
                }
                if ($("#chkEliminar_" + row.IdTipSel).is(':checked') == true) {
                    biEditarC = "1";
                }
                if (biEditarC == "1") {
                    $("#chkLeer_" + row.IdTipSel)[0].checked = true;
                } else {
                    $("#chkLeer_" + row.IdTipSel)[0].checked = false;
                    totalChkLeer = totalChkLeer - 1;
                }
            }
        }

        fnVerificarCheckTodos();
    });
    $("#chkTodosCrear").change(function () {
        var vcIds = tbGridSolicitudes.getDataIDs();

        if ($("#chkTodosCrear").is(':checked') == true) {
            for (i = 0; i < vcIds.length; i++) {
                var row = tbGridSolicitudes.getRowData(vcIds[i]);
                $("#chkCrear_" + row.IdTipSel)[0].checked = true;
            }
            totalChkCrear = totalChecks;
            for (i = 0; i < vcIds.length; i++) {
                var row = tbGridSolicitudes.getRowData(vcIds[i]);
                $("#chkLeer_" + row.IdTipSel)[0].checked = true;
            }
            totalChkLeer = totalChecks;
        } else {
            for (i = 0; i < vcIds.length; i++) {
                var row = tbGridSolicitudes.getRowData(vcIds[i]);
                $("#chkCrear_" + row.IdTipSel)[0].checked = false;
            }
            totalChkCrear = 0;
        }
        fnVerificarCheckTodos();
    });
    $("#chkTodosEditar").change(function () {
        var vcIds = tbGridSolicitudes.getDataIDs();

        if ($("#chkTodosEditar").is(':checked') == true) {
            for (i = 0; i < vcIds.length; i++) {
                var row = tbGridSolicitudes.getRowData(vcIds[i]);
                $("#chkEditar_" + row.IdTipSel)[0].checked = true;
            }
            totalChkEditar = totalChecks;
            for (i = 0; i < vcIds.length; i++) {
                var row = tbGridSolicitudes.getRowData(vcIds[i]);
                $("#chkLeer_" + row.IdTipSel)[0].checked = true;
            }
            totalChkLeer = totalChecks;
        } else {
            for (i = 0; i < vcIds.length; i++) {
                var row = tbGridSolicitudes.getRowData(vcIds[i]);
                $("#chkEditar_" + row.IdTipSel)[0].checked = false;
            }
            totalChkEditar = 0;
        }
        fnVerificarCheckTodos();
    });
    $("#chkTodosEliminar").change(function () {
        var vcIds = tbGridSolicitudes.getDataIDs();

        if ($("#chkTodosEliminar").is(':checked') == true) {
            for (i = 0; i < vcIds.length; i++) {
                var row = tbGridSolicitudes.getRowData(vcIds[i]);
                $("#chkEliminar_" + row.IdTipSel)[0].checked = true;
            }
            totalChkEliminar = totalChecks;
            for (i = 0; i < vcIds.length; i++) {
                var row = tbGridSolicitudes.getRowData(vcIds[i]);
                $("#chkLeer_" + row.IdTipSel)[0].checked = true;
            }
            totalChkLeer = totalChecks;
        } else {
            for (i = 0; i < vcIds.length; i++) {
                var row = tbGridSolicitudes.getRowData(vcIds[i]);
                $("#chkEliminar_" + row.IdTipSel)[0].checked = false;
            }
            totalChkEliminar = 0;
        }
        fnVerificarCheckTodos();
    });

    $(".HabilitarLeer").live("click", function () {
        var vcIdControl = $(this).attr('id');
        var vcIdTipSel = vcIdControl.substring(vcIdControl.indexOf("_") + 1);
        var biEditar = "0";

        if ($("#" + vcIdControl).is(':checked') == false) {
            if ($("#chkCrear_" + vcIdTipSel).is(':checked') == true) {
                biEditar = "1";
            }
            if ($("#chkEditar_" + vcIdTipSel).is(':checked') == true) {
                biEditar = "1";
            }
            if ($("#chkEliminar_" + vcIdTipSel).is(':checked') == true) {
                biEditar = "1";
            }
            if (biEditar == "1") {
                $("#chkLeer_" + vcIdTipSel)[0].checked = true;
            } else {
                totalChkLeer = totalChkLeer - 1;
            }
        } else {
            totalChkLeer = totalChkLeer + 1;
        }

        fnVerificarCheckTodos();
    });

    $(".HabilitarEditar").live("click", function () {
        var vcIdControl = $(this).attr('id');
        var vcIdTipSel = vcIdControl.substring(vcIdControl.indexOf("_") + 1);

        if ($("#" + vcIdControl).is(':checked')) {
            if ($("#chkLeer_" + vcIdTipSel)[0].checked != true) {
                $("#chkLeer_" + vcIdTipSel)[0].checked = true;
                totalChkLeer = totalChkLeer + 1;
            }

            if ($(this).hasClass("chkCrear")) {
                totalChkCrear = totalChkCrear + 1;
            }
            if ($(this).hasClass("chkEditar")) {
                totalChkEditar = totalChkEditar + 1;
            }
            if ($(this).hasClass("chkEliminar")) {
                totalChkEliminar = totalChkEliminar + 1;
            }
        } else {
            if ($(this).hasClass("chkCrear")) {
                totalChkCrear = totalChkCrear - 1;
            }
            if ($(this).hasClass("chkEditar")) {
                totalChkEditar = totalChkEditar - 1;
            }
            if ($(this).hasClass("chkEliminar")) {
                totalChkEliminar = totalChkEliminar - 1;
            }
        }

        fnVerificarCheckTodos();
    });

}

function fnMostrarDatos(valor) {
    vcIdBusqueda = valor;
    $("#tbGridSolicitud").trigger("reloadGrid");
}


//agregado 14-05-2014 wapumayta
function fnVerificarCheckTodos() {
    if (totalChkLeer == totalChecks)
    { $("#chkTodosLeer")[0].checked = true; }
    else
    { $("#chkTodosLeer")[0].checked = false; }
    if (totalChkCrear == totalChecks)
    { $("#chkTodosCrear")[0].checked = true; }
    else
    { $("#chkTodosCrear")[0].checked = false; }
    if (totalChkEditar == totalChecks)
    { $("#chkTodosEditar")[0].checked = true; }
    else
    { $("#chkTodosEditar")[0].checked = false; }
    if (totalChkEliminar == totalChecks)
    { $("#chkTodosEliminar")[0].checked = true; }
    else
    { $("#chkTodosEliminar")[0].checked = false; }

    //alert(totalChkLeer + ", " + totalChkCrear + ", " + totalChkEditar + "," + totalChkEliminar);
}



//OPCIONES INCIDENCIAS *************************************************************************************************************************************
var esTecnicoDialog;
$(function () {

    if ($("#hdfPerfilesOcultos").val() == '1') {
        $($("#AccordionJQ1 h3")[2]).hide();
    }

    $("#imgBuscarUsuarioSupervisor").click(function () {
        esTecnicoDialog = false;
        var $width = 730;
        var $height = 480; //455;
        var $Pagina = '../../../P_Movil/AdministrarTickets/AdmTck_BuscarUsuario.aspx';
        $("#ifArea").attr("src", $Pagina);
        Modal = $('#dvArea').dialog({
            title: "Seleccionar usuario",
            width: $width,
            height: $height,
            modal: true,
            resizable: false
        });
    });

    $("#ddlNiveles").change(function () {
        obtenerBolsa_porNivel();
    });

    $("#imgAgregarBolsa").click(function () {
        agregarBolsaEscalar();
    });

    $("#imgQuitarBolsa").click(function () {
        removerBolsaEscalar();
    });

    $("#btnEditarCorreo").live("click", function () {
        var vAccion = $("#txtEditarCorreo").text();
        if (vAccion == 'Editar') {
            $("#txtCorreo").attr("disabled", false);
            $("#txtConfirmacionCorreo").attr("disabled", true);
            $("#txtEditarCorreo").text("Aceptar");
            $("#txtCorreo").focus();
        } else {
            $("#txtCorreo").attr("disabled", true);
            $("#txtConfirmacionCorreo").attr("disabled", false);
            $("#txtEditarCorreo").text("Editar");
            $("#txtConfirmacionCorreo").focus();
        }
    });

    if ($("#hdfIdTecnicoSupervisor").val() == "0") {
        $("#EsChkActivar").css("display", "none");
        loadRegistrar();
    }
    else {
        loadEditar();
    }


    $("#imgBuscarUsuarioSupervisorBorrar").click(function () {
        $("#txtUsuarioSupervisor").val("");
    });


    // ================================================================================================
    // MODULO DE SEGURIDAD
    // ================================================================================================

    // ================================================================================================
    // CHECK DESBLOQUEAR
    // ================================================================================================
    $("#btnDesbloqear").click(function (event) {

        var fecBloqueo = $("#txtBloqueo").val();

        // ================================================================================================

        var vcCodUsu = $("#hdfCodigo").val();


        var url_ = "";
        var data = "";
        var fecha = new Date();
        var fecha_ = "";

        // ================================================================================================

        if (fecBloqueo == '') {
            if (!confirm("El usuario " + $("#txtvcNom").val() + " esta Habilitado. \n¿Desea InHabilitarlo?"))
            { return; }
            else {

                if (fecha.getDay() < 10) {
                    fecha_ = '0';
                    fecha_ = fecha_ + fecha.getDay() + "/";
                }
                if (fecha.getMonth() < 10) {
                    fecha_ = fecha_ + '0';
                    fecha_ = fecha_ + (fecha.getMonth() + 1) + "/";
                    fecha_ = fecha_ + fecha.getFullYear() + " ";
                }
                if (fecha.getHours() < 10) {
                    fecha_ = fecha_ + '0';
                    fecha_ = fecha_ + fecha.getHours() + ":";
                }
                if (fecha.getMinutes() < 10) {
                    fecha_ = fecha_ + '0';
                    fecha_ = fecha_ + fecha.getMinutes() + ":";
                }
                if (fecha.getSeconds() < 10) {
                    fecha_ = fecha_ + '0';
                    fecha_ = fecha_ + fecha.getSeconds();
                }
            }
        }
        // ================================================================================================

        $.ajax({
            type: "POST",
            url: "Mnt_SEG_Usuario.aspx/Desbloquear_Usuario",
            data: "{'vcCodUsu': '" + vcCodUsu.replace(/'/g, "&#39") + "'}",

            contentType: "application/json; charset=utf-8",
            dataType: "json",
            // ================================================================================================
            success: function (result) {
                if (result.d == "-1") {
                    alerta("Se desbloqueo al usuario " + $("#txtvcNom").val().replace(/'/g, "&#39") + " con exito.");
                    $("#txtBloqueo").val('');
                    $("#txtInentos").val('0');
                } else if (result.d == "0") {
                    alerta("Se bloqueo al usuario " + $("#txtvcNom").val().replace(/'/g, "&#39") + " con exito.");
                    $("#txtBloqueo").val(fecha_);
                }

            },
            // ================================================================================================
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
                //BloquearPagina(false);
            }
        });

    });

    // ================================================================================================
    // CHECK REINCIAR CLAVE
    // ================================================================================================

    //    $("#btnReiniciarClave").click(function (event) {

    //        var fecBloqueo = $("#txtBloqueo").val();

    //        // ================================================================================================

    //        var vcCodUsu = $("#hdfCodigo").val();


    //        var url_ = "";
    //        var data = "";
    //        var fecha = new Date();
    //        var fecha_ = "";

    //        // ================================================================================================

    //        if (fecBloqueo != '---') {
    //            alerta('El usuario esta bloqueado, no se puede reiniciar la clave');
    //            return;
    //        } else if ($("#txtvcPas").val().substr(0, 4) == 'TMP_') {
    //            if (!confirm("El usuario " + $("#txtvcNom").val() + " tiene clave temporal registrada.  \n¿Desea regresar su clave anterior?"))
    //                return;
    //        } else {
    //            if (!confirm("Esta seguro de reiniciar la clave al usuario " + $("#txtvcNom").val() + ".  \n¿Desea continuar?"))
    //                return;
    //        }
    //        // ================================================================================================

    //        $.ajax({
    //            type: "POST",
    //            url: "Mnt_SEG_Usuario.aspx/Reiniciar_Usuario",
    //            data: "{'vcCodUsu': '" + vcCodUsu.replace(/'/g, "&#39") + "','vcNomUsu':'" + $("#txtvcNom").val().replace(/'/g, "&#39") + "','vcCriterio':'" + $("#txtvcPas").val().substr(0, 4) + "'}",

    //            contentType: "application/json; charset=utf-8",
    //            dataType: "json",
    //            // ================================================================================================
    //            success: function (result) {
    //                Mensaje("<br/><h2>" + result.d + "</h2>", document, CerroMensaje);
    //                //alerta(result.d);

    //            },
    //            // ================================================================================================
    //            error: function (xhr, err, thrErr) {
    //                MostrarErrorAjax(xhr, err, thrErr);
    //                //BloquearPagina(false);
    //            }
    //        });

    //    });
    // ================================================================================================
    // ================================================================================================

    if ($("#hdf_esLDAP").val() == "1") {
        $("#filaContrasena").hide();
        $("#filaConfirmar").hide();
    }

    if ($("#hdf_esAdmin").val() == "1") {

        $("#filaBloqueo").hide();
        $("#filaReiniciar").hide();
        $("#btnHorario").hide();

    } else {
        $("#btnHorario").show();
        $("#filaBloqueo").show();
        $("#filaReiniciar").show();
    }

    //alert($("#hdf_esAdmin").val());
});

function loadEditar() {

    $.ajax({
        type: "POST",
        url: "../../../P_Movil/SolicitudesAtencion/SOA_Mnt_Tecnico.aspx/ListarTecnico_conBolsasAsignadas",
        data: "{'prIdTecnicoSupervisor': '" + $("#hdfIdTecnicoSupervisor").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultado) {
            var resul = resultado.d;

            $("#txtUsuarioSupervisor").val(resul.UsuarioSupervisor);
            if (resul.EsActivo) {
                $("#chkActivo").attr("checked", "checked");
                $("#EsChkActivar").css("display", "none");
            }

            if (resul.BolsasAsignadas != undefined) {
                var i;
                for (i = 0; i < resul.BolsasAsignadas.length; i++) {
                    $("#ddlBolsasAsignadas").append("<option value='" + resul.BolsasAsignadas[i].IdBolsa.toString() + "-" + resul.BolsasAsignadas[i].IdNivel.toString() + "' >" + resul.BolsasAsignadas[i].Nombre.toString() + "</option>");
                }
            }


            $.ajax({
                type: "POST",
                url: "../../../P_Movil/SolicitudesAtencion/SOA_Mnt_Bolsas.aspx/ListarNivel",
                data: "{'prIdNivel': '-1'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (resultado) {
                    var resul = resultado.d;

                    var i;
                    for (i = 0; i < resul.length; i++) {
                        $("#ddlNiveles").append("<option value='" + resul[i].IdNivel.toString() + "-" + resul[i].Orden.toString() + "' >" + resul[i].Nombre.toString() + "</option>");
                    }

                    obtenerBolsa_porNivel();


                },
                error: function (xhr, err, thrErr) {
                    MostrarErrorAjax(xhr, err, thrErr);
                }
            });


        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });

}

function loadRegistrar() {

    $.ajax({
        type: "POST",
        url: "../../../P_Movil/SolicitudesAtencion/SOA_Mnt_Bolsas.aspx/ListarNivel",
        data: "{'prIdNivel': '-1'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultado) {
            var resul = resultado.d;
            
            var i;
            for (i = 0; i < resul.length; i++) {
                $("#ddlNiveles").append("<option value='" + resul[i].IdNivel.toString() + "-" + resul[i].Orden.toString() + "' >" + resul[i].Nombre.toString() + "</option>");
            }

            obtenerBolsa_porNivel();


        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });

}

function obtenerBolsa_porNivel() {

    $.ajax({
        type: "POST",
        url: "../../../P_Movil/SolicitudesAtencion/SOA_Mnt_Bolsas.aspx/ListarBolsa_porNivelExacto",
        data: "{'prIdNivel': '" + $("#ddlNiveles").val().split('-')[0].toString() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultado) {
            var resul = resultado.d;
            $("#ddlBolsasParaAsinar").html("");
            var i;
            for (i = 0; i < resul.length; i++) {
                var existe = false;
                var n;
                for (n= 0; n < $("#ddlBolsasAsignadas option").length; n++) {
                    if (resul[i].IdBolsa.toString() == $($("#ddlBolsasAsignadas option")[n]).val().split('-')[0]) {
                        existe = true;
                        break;
                    }
                }
                if (existe) {
                    continue;
                }
                $("#ddlBolsasParaAsinar").append("<option value='" + resul[i].IdBolsa.toString() + "-" + resul[i].IdNivel.toString() + "' >" + resul[i].Nombre.toString() + "</option>");
            }

        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });

}

function usuarioElegido(usuarioElegido) {
    $('#txtUsuarioSupervisor').val(usuarioElegido);
}

function agregarBolsaEscalar() {
    if ($("#ddlBolsasParaAsinar option").length > 0) {
        $("#ddlBolsasAsignadas").append("<option value='" + $("#ddlBolsasParaAsinar").val().toString() + "'>" + $("#ddlBolsasParaAsinar option:selected").text().toString() + " (" + $("#ddlNiveles option:selected").text().toString() + ")" + "</option>");
        $("#ddlBolsasParaAsinar option[value=" + $("#ddlBolsasParaAsinar").val() + "]").remove();
    }
}

function removerBolsaEscalar() {
    if ($("#ddlBolsasAsignadas option:selected").length > 0) {
        if ($("#ddlNiveles").val().split('-')[0] == $("#ddlBolsasAsignadas").val().split('-')[1]) {
            $("#ddlBolsasParaAsinar").append("<option value='" + $("#ddlBolsasAsignadas").val().toString() + "'>" + $("#ddlBolsasAsignadas option:selected").text().toString().substring(0, $("#ddlBolsasAsignadas option:selected").text().indexOf('(')) + "</option>");
        }
        $("#ddlBolsasAsignadas option[value=" + $("#ddlBolsasAsignadas").val() + "]").remove();
    }
}

//********************************************************************************************************************************************************************************

function IngresarAreaUnico(area) {//Carga el area seleccionada

    if(busquedaorga == 1){
        $("#cbeOrganizacion_spControl").html(area.vcNomOrg.split("=")[1]);
        $("#cbeOrganizacion_hdControl").val(area.P_inCodOrg);
    } else {
        $("#ControlBusquedaEnlace_spControl").html(area.vcNomOrg.split("=")[1]);
        $("#ControlBusquedaEnlace_hdControl").val(area.P_inCodOrg);
        $("#hdCodOrgTecnico").val(area.vcNomOrg.split("=")[0]);
        $("#hdNomOrgTecnico").val(area.vcNomOrg.split("=")[1]);
        $("#hdCodintTecnico").val(area.P_inCodOrg);


    }
    /*
    if ($("#txtCorreo").html() == "") { 
        $("#txtCorreo").removeAttr("disabled");
        $("#txtCorreo").focus();
    }
    $(".esConfirmPas").show();
    $("#txtConfirmacionCorreo").attr("disabled", true);
    $("#txtEditarCorreo").text("Aceptar");
    $("#btnEditarCorreo").show();
    */
}

//CARGA DE AREAS MULTIPLES
function IngresarAreas(areas) {
    //Creo listas separadas para hacer mas facil el usar .join y crear una lista separada por comas.
    const listaCodigosArea = [];
    const listaNombreArea = [];
    //Implementación individual en del mantenimiento seg_usuarios
    $(areas).each(function () {
        var Area = this;

        Area.vcCodInt = Area.P_inCodOrg;
        Area.P_inCodOrg = -1; // Area.vcNomOrg.split("=")[0];

        var codorg = Area.vcNomOrg.split("=")[0];
        var nomorg = Area.vcNomOrg.split("=")[1];

        listaCodigosArea.push(Area.vcCodInt);
        listaNombreArea.push(nomorg);

        var data = { inCodint: "0", vcCodint: Area.vcCodInt, vcCodorg: codorg, vcNomorg: nomorg, btQuitar: "True" };
        
        var existe = false;
        if (Area.vcCodInt != "" && Area.vcCodInt>-1) {
            var ids = $("#tbGridSolicitudesArea").jqGrid("getDataIDs");
            for (var i = 0; i < ids.length; i++) {
                var myRow = $("#tbGridSolicitudesArea").jqGrid('getRowData', ids[i]);
                if (Area.vcCodInt === myRow.vcCodint) {
                    existe = true;
                }
            }
        }
        //else {
        //    alerta("Seleccionar área para asociar al técnico", "Usuario", null, "warning");
        //    return;
        //}

        if (!existe && Area.vcCodInt > -1) {
            $("#tbGridSolicitudesArea").jqGrid('addRowData', cnt_orga, data);
            cnt_orga++;
        }
        //else {
        //    alerta("El área seleccionada ya ha sido asociada", "Usuario", null, "warning");
        //    return;
        //}

    });

    //Genero la lista separada por comas para poder almacenarla en base de datos.
    let codigosAreaSeparadosPorComas = listaCodigosArea.join(',');
    //let nombresAreaSeparadosPorComas = listaNombreArea.join(',');

    const cbeOrganizacion = document.getElementById('cbeOrganizacion_spControl');
    cbeOrganizacion.innerHTML = '';
    listaNombreArea.forEach(function (element, index) {
        //debugger;
        const span = document.createElement('span');
        span.innerText = element;
        span.classList.add('lui');
        span.id = codigosAreaSeparadosPorComas.split(',')[index];

        span.addEventListener('click', function () {
            
            let vcCodigo = this.id;
            let $width = 810;
            let $height = 560;
            let $Pagina = raiz('General/Administrar/Mantenimiento/Mnt_Organizacion.aspx?view=1&Par=ORGA_P_inCODINT&Cod=' + vcCodigo);
            window.parent.parent.$('#iframe_modal').width($width - 10);
            window.parent.parent.$('#iframe_modal').height($height - 30);
            window.parent.parent.$('#iframe_modal').attr('src', $Pagina);
            let dlgOrganizacion = window.parent.parent.$('#div_modal').dialog({
                title: 'Organización',
                width: $width,
                height: $height,
                modal: true,
                resizable: false
            });
        });

        const br = document.createElement('br');

        cbeOrganizacion.appendChild(span);
        cbeOrganizacion.appendChild(br);
    });

    const contenedor_cbeOrganizacion = document.querySelector('#contenedor_cbeOrganizacion div');
    if (listaCodigosArea.length > 1) {
        contenedor_cbeOrganizacion.style.height = '50px';
    }

    //$("#cbeOrganizacion_spControl").html(nombresAreaSeparadosPorComas);
    $("#cbeOrganizacion_hdControl").val(codigosAreaSeparadosPorComas);
}

function fnEsLlamadaExterna(){
    $(".esLlamadaExterna").css({ "display": "none" });
    $(".esConfirmPas").css({ "display": "none" });
    window.parent.fnMostrarPanelEmp();
    if ($("#hdfCodigo").val() == "") {
        $("#accOpcionesGenerales").find('h3').filter(':contains(Temporizador)').hide();
    }
}

function fnLoadTemporizador() {

    $("#chkActivarTemporizador").change(function () {
        $("#txtTiempoTemporizador").val("");
        $("#chkReiniciarTemporizado").prop("checked", false);
        if ($(this).prop("checked")) {
            $(".esTemporizadorActivo").css("display", "block");
            obtenerTemporizadorPorPerfil();
        }
        else {
            $(".esTemporizadorActivo").css("display", "none");
        }
    });

    $("#ddlTemporizador").change(function () {

        if ($(this).val() == "-1") {
            $("#txtTiempoTemporizador").val("");
            $("#chkReiniciarTemporizado").prop("checked", false);
        }
        else {
            fnObtenerTemporizador();
        }

    });

    if ($("#hdfIdTemporizador").val() == "-1") {
        $("#chkActivarTemporizador").prop("checked", false);
        $(".esTemporizadorActivo").css("display", "none");
    } else {
        $("#chkActivarTemporizador").prop("checked", true);
        $(".esTemporizadorActivo").css("display", "block");
        obtenerTemporizadorPorPerfil();
    }
}

function fnObtenerTemporizador() {
    var idTemporizador = $("#ddlTemporizador").val() == -1 ? -1 : $("#ddlTemporizador").val().split("-")[0];
    $.ajax({
        type: "POST",
        url: "Mnt_Perfil.aspx/ObtenerTemporizador",
        data: "{'prIdTemporizador': '" + idTemporizador + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultado) {
            var resul = resultado.d;

            if (resul.length > 0) {
                $("#txtTiempoTemporizador").val(resul[0].Tiempo);
                $("#chkReiniciarTemporizado").prop("checked", resul[0].ReiniciarConAccion);
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });
}

function obtenerTemporizadorPorPerfil(esSelDyna) {
    var oTree = $("#divTreePerfil").dynatree("getRoot").tree;
    if (oTree == undefined) {
        return;
    }
    var nodosPerfil = oTree.getSelectedNodes().join(",");
    nodosPerfil = nodosPerfil.replace(/'/g, "");
    if (nodosPerfil == "") {
        return;
    }

    $.ajax({
        type: "POST",
        url: "Mnt_SEG_Usuario.aspx/obtenerTemporizadorPorPerfil",
        data: "{'pXMLPerfil': '" + nodosPerfil + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (resultado) {
            var resul = resultado.d;

            if (resul.length > 0) {
                //if ($("#ddlTemporizador option").length == 0) { //canga load
                if (esSelDyna == undefined || esSelDyna == false || esSelDyna == null) {//carga o changes
                    fnActivarDivTemp();
                    $("#ddlTemporizador").html("");
                    $("#ddlTemporizador").append("<option value='-1'>--Seleccione--</option>");

                    var i;
                    for (i = 0; i < resul.length; i++) {
                        //$("#ddlTemporizador").append("<option value='" + resul[i].IdTemporizador + "'>" + resul[i].Descripcion + " (" + resul[i].NombrePerfilOrigen + ")</option>")

                        if (resul[i].IdTemporizador == $("#hdfIdTemporizador").val()) {
                            $("#ddlTemporizador").append("<option selected = 'selected' value='" + resul[i].IdTemporizador + "-" + resul[i].IdPerfilOrigen + "'>" + resul[i].Descripcion + " (" + resul[i].NombrePerfilOrigen + ")" + "</option>");
                        }
                        else {
                            $("#ddlTemporizador").append("<option value='" + resul[i].IdTemporizador + "-" + resul[i].IdPerfilOrigen + "'>" + resul[i].Descripcion + " (" + resul[i].NombrePerfilOrigen + ")" + "</option>");
                        }
                        //$("#ddlTemporizador").append($("<option></option>").val(resul[i].IdTemporizador + "-" + resul[i].IdPerfilOrigen).text(resul[i].Descripcion + " (" + resul[i].NombrePerfilOrigen + ")"));
                    }

                    if ($("#hdfIdTemporizador").val() != "-1") {
                        //$("#ddlTemporizador").val($("#hdfIdTemporizador").val()); //comentado 29-10-2014 wapumayta
                        //$("#ddlTemporizador").val($("#hdfIdTemporizador").val() + "-" + $("#hdfIdPerfilTemporizador").val());
                        fnObtenerTemporizador();
                    }
                } else {//validar existencia de temporizador luego de quitar perfil
                    if (!$("#chkActivarTemporizador").is(":checked")) {
                        return;
                    }
                    var idTemporActual = $("#ddlTemporizador").val();
                    var existeTempor = false;
                    var i;
                    for (i = 0; i < resul.length; i++) {
                        if (resul[i].IdTemporizador + "-" + resul[i].IdPerfilOrigen == idTemporActual || idTemporActual == -1) {
                            existeTempor = true;
                        }
                    }
                    if (existeTempor) {
                        //cargar todos los nuevos temporizadores
                        $("#ddlTemporizador").html("");
                        $("#ddlTemporizador").append("<option value='-1'>--Seleccione--</option>");
                        var i;
                        for (i = 0; i < resul.length; i++) {
                            $("#ddlTemporizador").append("<option value='" + resul[i].IdTemporizador + "-" + resul[i].IdPerfilOrigen + "'>" + resul[i].Descripcion + " (" + resul[i].NombrePerfilOrigen + ")" + "</option>");
                        }
                        //seleccionar el temporizador actual (no hay cambios en pestaña temporizador)
                        $("#ddlTemporizador").val(idTemporActual);
                    } else { //se ha quitado el perfil asociado al temporizador actual
                        //deasctivar el temporizador
                        fnDesactivarDivTemp();
                        $("#chkActivarTemporizador").removeAttr("disabled");
                        alerta("El temporizador actual se ha quitado por estar asociado al perfil que se ha quitado.");
                        //$("#dvConfirmQuitarTemporizador").dialog({
                        //    title: "Temporizador seleccionado asociado a perfil",
                        //    resize: false,
                        //    modal: true,
                        //    buttons: {
                        //        "Si": function () {
                        //            //deasctivar el temporizador
                        //            fnDesactivarDivTemp();
                        //            $(this).close();
                        //        },
                        //        "No": function () {
                        //            //volver a seleccionar el nodo con el perfil
                        //            $("#divTreePerfil").dynatree("getTree").selectKey(idNod);
                        //            $(this).close();
                        //        }
                        //    }
                        //});
                    }
                }
            }
            else {
                fnDesactivarDivTemp();
            }
        },
        error: function (xhr, err, thrErr) {
            MostrarErrorAjax(xhr, err, thrErr);
        }
    });

}

function fnDesactivarDivTemp() {
    $(".esTemporizadorActivo").css("display", "none");
    $("#chkActivarTemporizador").prop("checked", false);
    $("#chkActivarTemporizador").attr("disabled", "disabled");

    $("#txtTiempoTemporizador").val("");
    $("#chkReiniciarTemporizado").prop("checked", false);
}

function fnActivarDivTemp() {
    if ($("#hdfIdTemporizador").val() != "-1") {
        $(".esTemporizadorActivo").css("display", "block");
        $("#chkActivarTemporizador").prop("checked", true);
    }
    $("#chkActivarTemporizador").removeAttr("disabled");
}

function fnObtenerDatosPaginaPorNivel() {
    var p_IdNivel = '-1';
    p_IdNivel = $("#ddlNivelProducto").val();
    $("#ddlPaginaPrincipal").html("");

    if (p_IdNivel != "-1") {
        $.ajax({
            type: "POST",
            url: "Mnt_SEG_Usuario.aspx/ObtenerDatosPaginaPorNivel",
            data: "{'p_IdNivel': '" + p_IdNivel + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (resultado) {
                var resul = resultado.d;
                if (resul.length > 0) {
                    for (let i = 0; i < resul.length; i++) {
                        $("#ddlPaginaPrincipal").append("<option value='" + resul[i][0] + "'>" + resul[i][1] + "</option>");
                    }
                }
                else {
                    alerta("No hay datos en el nivel seleccionado.");
                }
            },
            error: function (xhr, err, thrErr) {
                MostrarErrorAjax(xhr, err, thrErr);
            }
        });
    }
}

