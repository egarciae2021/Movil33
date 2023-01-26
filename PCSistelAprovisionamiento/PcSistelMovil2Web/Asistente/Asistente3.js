$(function () {
    //console.log('Asistente3.aspx');
    //window.parent.$("#DivContacto").find(".lblMenu").css({ color: "#424242" });
    window.parent.$("#DivContacto").find(".lblMenu").css({ "text-decoration": "underline" });
    window.parent.$("#edit4").css({ "display": "" });

    //ValidarNumeroEnCajaTexto("usuatit", ValidarNoEspacio);


    //Quitar el pegar en el campo del usuario
    //$('#usuatit').bind("cut copy paste", function (e) {
    $('#usuatit').bind("paste", function (e) {
        e.preventDefault();
    });
    $("#usuatit").keypress(function (e) {
        var charCode = !e.charCode ? e.which : e.charCode;
        if (!(charCode == 8 || (charCode >= 48 && charCode <= 57) || (charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122)))
            e.preventDefault();
    })


    $("#grid").jqGrid({
        datatype: "local",
        //colNames: ['id', 'nombre', 'apellido', 'usuario', 'pass'],
        colNames: ['IdSolicitudTitular', 'Nombre', 'Apellido', 'Correo', 'Usuario'],
        colModel: [
            { name: 'IdSolicitudTitular', index: 'IdSolicitudTitular', width: 60, sorttype: "int", hidden: true },
            { name: 'Nombre', index: 'Nombre', width: 90 },
            { name: 'Apellido', index: 'Apellido', width: 160 },
            { name: 'Correo', index: 'Correo', width: 160 },
            { name: 'Usuario', index: 'Usuario', width: 80, editable: true }
        //{ name: 'Clave', index: 'Clave', width: 120 }
        ],
        pager: '#pgrid',
        height: 150,
        width: 510,
        loadtext: 'Cargando datos...',
        recordtext: '{0} - {1} de {2} elementos',
        emptyrecords: 'No hay resultados',
        pgtext: 'Pág: {0} de {1}',
        rowNum: 10,
        rowList: [10, 20, 30],
        ondblClickRow: function (id) {
            //IdEquipo2 = id;
            seleccionarTitulares(true);
        },
        viewrecords: true,
        shrinkToFit: false,
        //multiselect: true,
        caption: "Lista de Titulares"
    });

    $("#btnatras").click(function () {

        window.parent.$("#DivContacto").find(".lblMenu").css({ "text-decoration": "none" });
        window.parent.$("#edit4").css({ "display": "none" });
        var $Pagina = 'AsistenteLicencia.aspx';
        window.parent.$("#ifTemaAsistente").attr("src", $Pagina);
    });
    $("#btnsiguiente").click(function () {


        for (var i = 0; i < window.parent.Titulares.length; i++) {

            if (window.parent.Titulares[i].Usuario == "") {
                alertaExterna("El nombre de usuario para los titulares es un campo obligatorio");
                return;
            }
        }


        window.parent.$("#DivContacto").find(".lblMenu").css({ "text-decoration": "none" });
        window.parent.$("#edit4").css({ "display": "none" });
        var $Pagina = 'AsistenteSelectBD.aspx';
        window.parent.$("#ifTemaAsistente").attr("src", $Pagina);


    });

    $("#btcancelar").click(function () {
        CancelarAsistente();

    });

    $("#btnADD").click(function () {

        var id = $("#grid").jqGrid('getGridParam', 'selrow');

        if (id) {

            if ($("#usuatit").val() == "") {
                alertaExterna("Ingrese un nombre de usuario");
                $("#usuatit").focus()
                return;
            }

            if ($("#usuatit").val().toLowerCase() == "administrador") {
                alertaExterna("No puede ingresar un Usuario con nombre 'administrador', Por favor intente ingresar otro usuario.");
                $("#usuatit").focus()
                return;
            }

            $('#usuatit').val($('#usuatit').val().toString().replace(/\s+/g, '')); //Quitar espacios en blanco..

            for (var i = 0; i < window.parent.Titulares.length; i++) {
                var IdTitular = $('#idtit').val();

                if ($('#usuatit').val() != "" && $('#usuatit').val() == window.parent.Titulares[i].Usuario) {
                    alertaExterna("El usuario '" + $('#usuatit').val() + "' ya fue ingresado");
                    return;
                }


                if (IdTitular == window.parent.Titulares[i].IdSolicitudTitular) {
                    window.parent.Titulares[i].Usuario = $('#usuatit').val();
                    window.parent.Titulares[i].Clave = $('#passtit').val();
                }
            }
            $('#idtit').val("");
            $('#nombretit').val("");
            $('#apetit').val("");
            $('#txtcorreo').val("");
            $('#usuatit').val("");
            $('#passtit').val("");
            cargarTitulares();
        }
        else {
            alertaExterna('Seleccione un registro'); return;
        }






        return;


        if ($("#idtit").val() == "") {
            alertaExterna("Ingrese un id");
            $("#idtit").focus()
            return;
        }
        if ($("#nombretit").val() == "") {
            alertaExterna("Ingrese un nombre de titular");
            $("#nombretit").focus()
            return;
        }
        if ($("#apetit").val() == "") {
            alertaExterna("Ingrese un apellido");
            $("#apetit").focus()
            return;
        }
        if ($("#usuatit").val() == "") {
            alertaExterna("Ingrese un nombre de usuario");
            $("#usuatit").focus()
            return;
        }
        if ($("#passtit").val() == "") {
            alertaExterna("Ingrese una contraseña");
            $("#passtit").focus()
            return;
        }


        //*************Validando si ya fue ingresado el usuario en la lista
        for (var i = 0; i < window.parent.Titulares.length; i++) {

            if ($('#usuatit').val() == window.parent.Titulares[i].usuario) {
                alertaExterna("El usuario ya ha sido ingresado a la lista");
                return;
            }
        }
        //******************************************************************

        var Datos = new datos();
        Datos.id = $('#idtit').val();
        Datos.nombre = $('#nombretit').val();
        Datos.apellido = $('#apetit').val();
        Datos.usuario = $('#usuatit').val();
        Datos.pass = $('#passtit').val();
        window.parent.Titulares.push(Datos);

        //**********Limpia textboxt**************
        $('#idtit').val("");
        $('#nombretit').val("");
        $('#apetit').val("");
        $('#usuatit').val("");
        $('#passtit').val("");
        //***************************************
        cargarTitulares();
    });



    $("#btnDel").click(function () {
        return;

        var id = $("#grid").jqGrid('getGridParam', 'selrow');


        if (id) {
            window.parent.Titulares.splice(id - 1, 1);
            cargarTitulares();
        }
        else {
            alertaExterna('Seleccione un registro'); return;
        }

    });

    function cargarTitulares() {
        $("#grid").jqGrid("clearGridData", true);

        for (var i = 0; i < window.parent.Titulares.length; i++) {

            $("#grid").jqGrid('addRowData', i + 1, window.parent.Titulares[i]);
        }

    };


    function seleccionarTitulares(select) {


        var id = $("#grid").jqGrid('getGridParam', 'selrow');
        if (id) {
            var datos = $("#grid").jqGrid('getRowData', id);
            //var codigoEmp = datos['Codigo'];
            //ModalCodigo(codigoEmp);

            $('#idtit').val(datos['IdSolicitudTitular']);
            $('#nombretit').val(datos['Nombre']);
            $('#apetit').val(datos['Apellido']);
            $('#txtcorreo').val(datos['Correo']);
            $('#usuatit').val(datos['Usuario']);
            $('#passtit').val(datos['Clave']);




        }
        else {
            alerta('Seleccione un registro'); return;
        }

    }


    cargarTitulares();

});

var Titulares = [];

function datos(id, nombre, apellido, usuario, pass) {

    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.usuario = usuario;
    this.pass = pass;
}