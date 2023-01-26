
var flag_cambiolinea = false;

var GrillaSolicitud = {


    getEmpleado: function (_tipo, _codigo) {
        return getAjax("Adm_SolicitudMasiva.aspx/getEmpleado", "{'tipo':'" + _tipo + "', 'codigo':'" + _codigo + "'}").then(function (_data) {
            return _data.d;
        });
    },

    onChangeLinea: function (id, val) {
        //Cargar datos de empleado de esa linea...
        if (val != null && val != "") {
            GrillaSolicitud.getEmpleado("lin", val).then(function (_data) {
                if (_data != null && _data.length > 0) {
                    var datos = _data.split('|');
                    flag_cambiolinea = true;
                    $("#my").jexcel('setValue', $("#8-" + id[1]), datos[0], true);
                    $("#my").jexcel('setValue', $("#9-" + id[1]), datos[1], true);
                    $("#my").jexcel('setValue', $("#10-" + id[1]), datos[2], true);
                    $("#my").jexcel('setValue', $("#11-" + id[1]), datos[3], true);


                    $("#my").jexcel('setValue', $("#7-" + id[1]), datos[4], true);

                    flag_cambiolinea = false;

                    //var listaCombo = listaComboRoamingTotal.filter(function (x) {
                    //    if (val == x.split('|')[0]) {
                    //        return x;
                    //    }
                    //}).map(function (x) { return x.split('|')[1]; });
                    //$('#my').jexcel('setSourceRowColumn', row, posColIMEIActual, listaCombo);

                }
            });
        }
    },


    onChangeEmpleado: function (id, val) {
        //Cargar datos de empleado de esa linea...
        if (val != null && val != "") {
            GrillaSolicitud.getEmpleado("emp", val).then(function (_data) {
                if (_data != null && _data.length > 0) {
                    var datos = _data.split('|');
                    $("#my").jexcel('setValue', $("#9-" + id[1]), datos[1], true);
                    $("#my").jexcel('setValue', $("#10-" + id[1]), datos[2], true);
                    $("#my").jexcel('setValue', $("#11-" + id[1]), datos[3], true);
                }
            });
        }
    },

    onChangePaquete: function (id, val) {
        var row = parseInt(id[1]);
        var col = parseInt(id[0]);
        //Actualizar detalle paquete...  
        var listaComboRoamingDetalle = listaComboRoamingTotal.filter(function (x) {
            if (val == x.split('|')[0]) {
                return x;
            }
        }).map(function (x) { return x.split('|')[1]; });
        $('#my').jexcel('setSourceRowColumn', row, posColDetallePaquete, listaComboRoamingDetalle);
    },

    onChangeTipoSolicitud: function (id, val) {
        var row = parseInt(id[1]);
        var col = parseInt(id[0]);


        switch (val) {
            case "Cambio Equipo/Plan/Cuenta":
                $('#my').jexcel('setReadOnly', row, posColLinea, false);
                $('#my').jexcel('setReadOnly', row, posColIMEIActual, true);
                $('#my').jexcel('setReadOnly', row, posColPaquete, true);
                $('#my').jexcel('setReadOnly', row, posColDetallePaquete, true);

                $('#my').jexcel('setReadOnly', row, posColCodEmpleado, true);
                $('#my').jexcel('setReadOnly', row, posColModelo, false);
                $('#my').jexcel('setReadOnly', row, posColColor, false);
                $('#my').jexcel('setReadOnly', row, posColNuevoNumero, true);
                $('#my').jexcel('setReadOnly', row, posColSerieSIMNuevo, true);
                $('#my').jexcel('setReadOnly', row, posColIMEINuevo, false);
                $('#my').jexcel('setReadOnly', row, posColNuevoPlan, false);
                $('#my').jexcel('setReadOnly', row, posColNuevaCuenta, false);
                $('#my').jexcel('setReadOnly', row, posColSeguro, false);
                $('#my').jexcel('setReadOnly', row, posColPlazo, false);
                $('#my').jexcel('setReadOnly', row, posColBloquearIMEI, true);
                break;

            case "Nuevo":
                $('#my').jexcel('setReadOnly', row, posColLinea, true);
                $('#my').jexcel('setReadOnly', row, posColIMEIActual, true);
                $('#my').jexcel('setReadOnly', row, posColPaquete, true);
                $('#my').jexcel('setReadOnly', row, posColDetallePaquete, true);

                $('#my').jexcel('setReadOnly', row, posColCodEmpleado, false);
                $('#my').jexcel('setReadOnly', row, posColSerieSIMNuevo, true);
                $('#my').jexcel('setReadOnly', row, posColModelo, false);
                $('#my').jexcel('setReadOnly', row, posColColor, false);
                $('#my').jexcel('setReadOnly', row, posColNuevoNumero, false);
                $('#my').jexcel('setReadOnly', row, posColIMEINuevo, false);
                $('#my').jexcel('setReadOnly', row, posColNuevoPlan, false);
                $('#my').jexcel('setReadOnly', row, posColNuevaCuenta, false);

                $('#my').jexcel('setReadOnly', row, posColSeguro, false);
                $('#my').jexcel('setReadOnly', row, posColPlazo, false);
                $('#my').jexcel('setReadOnly', row, posColBloquearIMEI, true);
                break;

            case "Suspensión Temporal": 
            case "Suspensión":
                $('#my').jexcel('setReadOnly', row, posColBloquearIMEI, false);
                $('#my').jexcel('setReadOnly', row, posColLinea, false);
                $('#my').jexcel('setReadOnly', row, posColCodEmpleado, true);
                $('#my').jexcel('setReadOnly', row, posColIMEIActual, true);
                $('#my').jexcel('setReadOnly', row, posColPaquete, true);
                $('#my').jexcel('setReadOnly', row, posColDetallePaquete, true);
                $('#my').jexcel('setReadOnly', row, posColModelo, true);
                $('#my').jexcel('setReadOnly', row, posColColor, true);
                $('#my').jexcel('setReadOnly', row, posColNuevoNumero, true);
                $('#my').jexcel('setReadOnly', row, posColSerieSIMNuevo, true);
                $('#my').jexcel('setReadOnly', row, posColIMEINuevo, true);
                $('#my').jexcel('setReadOnly', row, posColNuevoPlan, true);
                $('#my').jexcel('setReadOnly', row, posColNuevaCuenta, true);
                $('#my').jexcel('setReadOnly', row, posColSeguro, true);
                $('#my').jexcel('setReadOnly', row, posColPlazo, true);
                break;

            case "Baja":            
            case "Reactivación Servicio":
                $('#my').jexcel('setReadOnly', row, posColLinea, false);
                $('#my').jexcel('setReadOnly', row, posColCodEmpleado, true);
                $('#my').jexcel('setReadOnly', row, posColIMEIActual, true);
                $('#my').jexcel('setReadOnly', row, posColPaquete, true);
                $('#my').jexcel('setReadOnly', row, posColDetallePaquete, true);
                $('#my').jexcel('setReadOnly', row, posColModelo, true);
                $('#my').jexcel('setReadOnly', row, posColColor, true);
                $('#my').jexcel('setReadOnly', row, posColNuevoNumero, true);
                $('#my').jexcel('setReadOnly', row, posColSerieSIMNuevo, true);
                $('#my').jexcel('setReadOnly', row, posColIMEINuevo, false);
                $('#my').jexcel('setReadOnly', row, posColNuevoPlan, true);
                $('#my').jexcel('setReadOnly', row, posColNuevaCuenta, true);

                $('#my').jexcel('setReadOnly', row, posColSeguro, true);
                $('#my').jexcel('setReadOnly', row, posColPlazo, true);

                $('#my').jexcel('setReadOnly', row, posColBloquearIMEI, true);
                break;

            case "Cambio de Número":
                $('#my').jexcel('setReadOnly', row, posColLinea, false);
                $('#my').jexcel('setReadOnly', row, posColCodEmpleado, true);
                $('#my').jexcel('setReadOnly', row, posColIMEIActual, true);
                $('#my').jexcel('setReadOnly', row, posColPaquete, true);
                $('#my').jexcel('setReadOnly', row, posColDetallePaquete, true);
                $('#my').jexcel('setReadOnly', row, posColModelo, true);
                $('#my').jexcel('setReadOnly', row, posColColor, true);
                $('#my').jexcel('setReadOnly', row, posColNuevoNumero, false);
                $('#my').jexcel('setReadOnly', row, posColSerieSIMNuevo, true);
                $('#my').jexcel('setReadOnly', row, posColIMEINuevo, true);
                $('#my').jexcel('setReadOnly', row, posColNuevoPlan, true);
                $('#my').jexcel('setReadOnly', row, posColNuevaCuenta, false);
                $('#my').jexcel('setReadOnly', row, posColSeguro, true);
                $('#my').jexcel('setReadOnly', row, posColPlazo, true);
                $('#my').jexcel('setReadOnly', row, posColBloquearIMEI, true);
                break;

            case "Adquisición SIM":
                $('#my').jexcel('setReadOnly', row, posColLinea, false);
                $('#my').jexcel('setReadOnly', row, posColCodEmpleado, true);
                $('#my').jexcel('setReadOnly', row, posColIMEIActual, true);
                $('#my').jexcel('setReadOnly', row, posColPaquete, true);
                $('#my').jexcel('setReadOnly', row, posColDetallePaquete, true);
                $('#my').jexcel('setReadOnly', row, posColModelo, true);
                $('#my').jexcel('setReadOnly', row, posColColor, true);
                $('#my').jexcel('setReadOnly', row, posColNuevoNumero, true);
                $('#my').jexcel('setReadOnly', row, posColSerieSIMNuevo, false);
                $('#my').jexcel('setReadOnly', row, posColIMEINuevo, true);
                $('#my').jexcel('setReadOnly', row, posColNuevoPlan, true);
                $('#my').jexcel('setReadOnly', row, posColNuevaCuenta, true);
                $('#my').jexcel('setReadOnly', row, posColSeguro, true);
                $('#my').jexcel('setReadOnly', row, posColPlazo, true);
                $('#my').jexcel('setReadOnly', row, posColBloquearIMEI, true);
                break;

            case "Activación de Roaming":
                $('#my').jexcel('setReadOnly', row, posColLinea, false);
                $('#my').jexcel('setReadOnly', row, posColCodEmpleado, true);
                $('#my').jexcel('setReadOnly', row, posColIMEIActual, true);
                $('#my').jexcel('setReadOnly', row, posColPaquete, false);
                $('#my').jexcel('setReadOnly', row, posColDetallePaquete, false);
                $('#my').jexcel('setReadOnly', row, posColModelo, true);
                $('#my').jexcel('setReadOnly', row, posColColor, true);
                $('#my').jexcel('setReadOnly', row, posColNuevoNumero, true);
                $('#my').jexcel('setReadOnly', row, posColSerieSIMNuevo, true);
                $('#my').jexcel('setReadOnly', row, posColIMEINuevo, true);
                $('#my').jexcel('setReadOnly', row, posColNuevoPlan, true);
                $('#my').jexcel('setReadOnly', row, posColNuevaCuenta, true);
                $('#my').jexcel('setReadOnly', row, posColSeguro, true);
                $('#my').jexcel('setReadOnly', row, posColPlazo, true);
                $('#my').jexcel('setReadOnly', row, posColBloquearIMEI, true);
                break;

            case "Reparación":
            case "Reposición":
            case "Préstamo Equipo":
                $('#my').jexcel('setReadOnly', row, posColLinea, false);
                $('#my').jexcel('setReadOnly', row, posColCodEmpleado, true);
                $('#my').jexcel('setReadOnly', row, posColIMEIActual, true);
                $('#my').jexcel('setReadOnly', row, posColPaquete, true);
                $('#my').jexcel('setReadOnly', row, posColDetallePaquete, true);
                $('#my').jexcel('setReadOnly', row, posColModelo, true);
                $('#my').jexcel('setReadOnly', row, posColColor, true);
                $('#my').jexcel('setReadOnly', row, posColNuevoNumero, true);
                $('#my').jexcel('setReadOnly', row, posColSerieSIMNuevo, true);
                $('#my').jexcel('setReadOnly', row, posColIMEINuevo, false);
                $('#my').jexcel('setReadOnly', row, posColNuevoPlan, true);
                $('#my').jexcel('setReadOnly', row, posColNuevaCuenta, true);
                $('#my').jexcel('setReadOnly', row, posColSeguro, true);
                $('#my').jexcel('setReadOnly', row, posColPlazo, true);
                $('#my').jexcel('setReadOnly', row, posColBloquearIMEI, true);

                break;

            default:
                $('#my').jexcel('setReadOnly', row, posColLinea, false);
                $('#my').jexcel('setReadOnly', row, posColIMEIActual, false);
                $('#my').jexcel('setReadOnly', row, posColBloquearIMEI, true);
                //$('#my').jexcel('setReadOnly', row, posColPaquete, false);
                //$('#my').jexcel('setReadOnly', row, posColDetallePaquete, false);
                break;

        }
        

    },

    onchangeCell: function (obj, cel, val) {
        // Get the cell position x, y
        //debugger;

        var id = $(cel).prop('id').split('-');
        switch (parseInt(id[0])) {
            case posColLinea: //Linea
                GrillaSolicitud.onChangeLinea(id, val);
                break;
            case posColCodEmpleado: //CodEmpleado
                if (flag_cambiolinea == false) {
                    GrillaSolicitud.onChangeEmpleado(id, val);
                }
                break;
            case posColPaquete: //Paquete
                GrillaSolicitud.onChangePaquete(id, val);
                break;
            case posColTipoSolicitud: //TipoSolicitud
                GrillaSolicitud.onChangeTipoSolicitud(id, val);
                break;
            default:
        }
    },




};


