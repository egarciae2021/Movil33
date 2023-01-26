var bloqueado = false;
var serverList = [];
var elementoSeleccionado = false;
var language_Datatable = {
    "paginate": {
        "previous": 'Anterior',
        "next": 'Siguiente'
    },
    "lengthMenu": "_MENU_ registros por página",
    "zeroRecords": "No hay datos para mostrar",
    "info": "Página _PAGE_ de _PAGES_",
    "infoEmpty": "",
    "infoFiltered": "(filtered from _MAX_ total records)",
    "sSearch": "Buscar",
};

var Columnas_IIS = ['Sitio', 'DirectorioVirtual', 'Puerto', 'GrupoAplicaciones', 'Estado'];
var Columnas_BaseDatos = ['Instancia', 'Name', 'Size', 'SpaceAvailable', 'Status'];
var Columnas_Servicios = ['ServiceName', 'DisplayName', 'Status'];

var Data_IIS = [];
var Data_Services = [];
var Data_BD = [];

var dtElementos;

$(function () {

    $("#dvColumnaLoading").show();

    $("#btnFullScreen").click(function () {
        $("#btnDefaultScreen").show();
        $("#btnFullScreen").hide();
        window.top.fullScreen();
        CargarElementos();
    });
    $("#btnDefaultScreen").click(function () {
        $("#btnDefaultScreen").hide();
        $("#btnFullScreen").show();
        window.top.defaultScreen();
        CargarElementos();
    });


    $(window).resize(function () {
        resizeWindows()
    });
    resizeWindows();

    var app_servidores = new Vue({
        el: '#app_servidores',
        data: {
            serverList: serverList,
        },
    });

    $('input[type=radio][name=inline-form-radio]').change(function () {
        CargarElementos();
    });


    Vue.use(VueTables.ClientTable, {
        //compileTemplates: true,
        //highlightMatches: true,
    });

    Vue.component('estadoIIS', {
        props: ['data', 'index', 'column'],
        template: '<img class="clsSemaforo" v-bind:src="\'images/\' + data.Estado  + \'.png\'" style="width: 24px;" />',
    });

    Vue.component('estadoBD', {
        props: ['data', 'index', 'column'],
        template: '<img class="clsSemaforo" v-bind:src="\'images/estadobd_\' + data.Status  + \'.png\'" style="width: 24px;" />',
    });

    Vue.component('estadoServicioWindows', {
        props: ['data', 'index', 'column'],
        template: '<img class="clsSemaforo" v-bind:src="\'images/estadosw_\' + data.Status  + \'.png\'" style="width: 24px;" />',
    });

    new Vue({
        el: "#appElementos_IIS",
        data: {
            columns: Columnas_IIS,
            data: Data_IIS,
            options: {
                headings: {
                    DirectorioVirtual: 'Directorio Virtual',
                    GrupoAplicaciones: 'Grupo de Aplicaciones',
                },
                sortable: [],
                filterable: ['Sitio', 'DirectorioVirtual', 'GrupoAplicaciones', 'Puerto'],
                texts: {
                    filterPlaceholder: 'Ingrese un texto',
                    filter: 'Buscar:  ',
                    count: "Mostrando {from} al {to} de {count} registros|{count} registros|Un registro",
                    limit: "Registros:",
                },
                groupBy: 'Sitio',
                templates: {
                    Estado: "estadoIIS",
                    Sitio: function (h, row, index) {
                        return "";
                    },
                }
            },
        }
    });

    new Vue({
        el: "#appElementos_Services",
        data: {
            columns: Columnas_Servicios,
            data: Data_Services,
            options: {
                headings: {
                    ServiceName: 'Servicio',
                    DisplayName: 'Descripción',
                    StartType: 'Tipo de inicio',
                    Status: 'Estado',
                },
                sortable: [],
                filterable: ['ServiceName', 'DisplayName'],
                texts: {
                    filterPlaceholder: 'Ingrese un texto',
                    filter: 'Buscar:  ',
                    count: "Mostrando {from} al {to} de {count} registros|{count} registros|Un registro",
                    limit: "Registros:",
                },
                templates: {
                    Acciones: function (h, row, index) {
                        return "<span id = {row.id}>XXXX </span>";
                    },
                    Status: "estadoServicioWindows",
                }
            },
        }
    });

    new Vue({
        el: "#appElementos_BD",
        data: {
            columns: Columnas_BaseDatos,
            data: Data_BD,
            options: {
                headings: {
                    Name: 'BD',
                    Size: 'Tamaño',
                    SpaceAvailable: 'Espacio disponible',
                    Status: 'Estado',
                },
                sortable: [],
                filterable: ['Name', 'Instancia'],
                texts: {
                    filterPlaceholder: 'Ingrese un texto',
                    filter: 'Buscar:  ',
                    count: "Mostrando {from} al {to} de {count} registros|{count} registros|Un registro",
                    limit: "Registros:",
                },
                groupBy: 'Instancia',
                templates: {
                    Status: "estadoBD",
                    Instancia: function (h, row, index) {
                        return "";
                    },
                    SpaceAvailable: function (h, row, index) {
                        return Math.round((row.SpaceAvailable / 1024) * 100) / 100 + ' Mb';
                    },
                    Size: function (h, row, index) {
                        return Math.round(row.Size * 100) / 100 + ' Mb';
                    }
                }
            },
        }
    });
    //SpaceAvailable de BD is in Kb and Size is in Mb


});

function QuitarSeleccionado() {
    for (var i = 0; i < serverList.length; i++) {
        serverList[i].activo = false;
    }
}

function server_click(server) {
    if (bloqueado || server.activo) {
        return;
    }

    elementoSeleccionado = true;
    QuitarSeleccionado();
    //server.error = true;
    server.activo = true;
    bloqueado = true;
    $(".servidor").addClass("btn-bloqueado");
    $("#dvColumnaElementos").hide();
    $("#dvColumnaInformativa").hide();
    $("#dvColumnaLoading").show();


    var agregar = false;

    Data_IIS.splice(0, Data_IIS.length);
    var Fila;
    for (var i = 0; i < server.IIS_Info.length; i++) {

        agregar = false;
        for (var k = 0; k < Parametro_IIS.length; k++) {
            if (Parametro_IIS[k] != "") {
                if (matchRuleShort(server.IIS_Info[i].name.toUpperCase(), Parametro_IIS[k].toUpperCase())) {
                    agregar = true;
                    break;
                }
            }
        }
        if (agregar) {
            for (var j = 0; j < server.IIS_Info[i].Collection.length; j++) {
                Fila = {
                    Sitio: server.IIS_Info[i].name,
                    DirectorioVirtual: server.IIS_Info[i].Collection[j].path,
                    GrupoAplicaciones: server.IIS_Info[i].applicationPool,
                    Estado: server.IIS_Info[i].state,
                    Puerto: server.IIS_Info[i].bindings.Collection,
                };
                Data_IIS.push(Fila);
            }
        }
    }
    $("#spTotalIIS").html(Data_IIS.length);


    Data_Services.splice(0, Data_Services.length);
    for (var i = 0; i < server.Services.length; i++) {
        agregar = false;
        for (var j = 0; j < Parametro_Servicios.length; j++) {
            if (Parametro_Servicios[j] != "") {
                if (matchRuleShort(server.Services[i].ServiceName.toUpperCase(), Parametro_Servicios[j].toUpperCase())) {
                    agregar = true;
                    break;
                }
            }
        }
        if (agregar) {
            Data_Services.push(server.Services[i]);
        }
    }
    $("#spTotalServicios").html(Data_Services.length);


    Data_BD.splice(0, Data_BD.length);
    for (var i = 0; i < server.ServerBD.length; i++) {
        for (var j = 0; j < server.ServerBD[i].BDs.length; j++) {
            agregar = false;
            for (var k = 0; k < Parametro_BaseDatos.length; k++) {
                if (Parametro_BaseDatos[k] != "") {
                    if (matchRuleShort(server.ServerBD[i].BDs[j].Name.toUpperCase(), Parametro_BaseDatos[k].toUpperCase())) {
                        agregar = true;
                        break;
                    }
                }
            }
            if (agregar) {
                Fila = {
                    Instancia: server.ServerBD[i].Instance,
                    Name: server.ServerBD[i].BDs[j].Name,
                    Size: server.ServerBD[i].BDs[j].Size,
                    SpaceAvailable: server.ServerBD[i].BDs[j].SpaceAvailable,
                    Status: server.ServerBD[i].BDs[j].Status,
                };
                Data_BD.push(Fila);
            }
        }
    }
    $("#spTotalBD").html(Data_BD.length);

    setTimeout(function () {
        bloqueado = false;
        $("#tituloServer").html("" + server.text + "<span class='text-sm text-muted mar-no' style='font-size:14px;'> (" + server.caracteristica + ")</span>");

        $(".servidor").removeClass("btn-bloqueado");
        $("#dvColumnaLoading").hide();
        $("#dvColumnaElementos").show();

        CargarElementos();

        $("#pieDiscos").empty();

        var espaciolibre, totaldisco, espaciousado;
        var titulodisco = '';
        var colorusado = '';
        for (var i = 0; i < server.Discos.length; i++) {
            if (server.Discos[i].DriveLetter != null) {
                espaciolibre = Math.round(server.Discos[i].FreeSpace / (1024 * 1024 * 1024) * 100) / 100;
                totaldisco = Math.round(server.Discos[i].Capacity / (1024 * 1024 * 1024) * 100) / 100;
                espaciousado = Math.round((totaldisco - espaciolibre) * 100) / 100;

                if (server.Discos[i].Label == null) {
                    titulodisco = "Unidad ";
                }
                else {
                    titulodisco = server.Discos[i].Label + " ";
                }
                titulodisco += '(' + server.Discos[i].DriveLetter + ')';

                $("#pieDiscos").append('<div class="col-xs-2"><p class="text-semibold text-uppercase text-main">' + titulodisco + '</p><p><span id="demo-sparkpie-' + i + '">' + espaciousado + ',' + espaciolibre + '</span></p></div>');

                colorusado = "#26A0DA";
                if ((espaciolibre / totaldisco) < 0.1) {
                    colorusado = "#F22314";
                    //server.error = true;
                }


                $('#demo-sparkpie-' + i).sparkline('html', {
                    type: 'pie',
                    height: '50px',
                    sliceColors: [colorusado, '#E6E6E6'],
                    tooltipChartTitle: titulodisco,
                    //tooltipSuffix: ' % de uso'
                });

            }
        }



    }, 400);
}

function resizeWindows() {
    var alto = $(window).height();
    $("#dvColumnaServidores").height(alto - 10);
    $("#dvColumnaElementos").height(alto - 10);

    $("#dvColumnaElementos").css("max-height", 200);
}



Vue.component('servidor-item', {
    props: ['servidor'],
    data: function () {
        return {
            isActive: false
        };
    },
    template: ['',
        '<div v-bind:class="getClass(servidor)" v-on:click="fnServerClick(servidor)" > ',
        '   <div class="pad-all">',
        '       <p class="text-lg text-semibold">',
        '           <i class="fa fa-server" style="font-size: 18px; cursor: hand; cursor: pointer;"></i> {{servidor.text}}',
        '       </p>',
        '       <p class="mar-no">',
        '           <span class="pull-right text-bold">{{servidor.el}} de {{servidor.et}}</span> Espacio libre',
        '       </p>',
        //'       <p class="mar-no">',
        //'           <span class="pull-right text-bold">{{servidor.et}}</span> Espacio usado',
        //'       </p>',
        '       <p class="mar-no">',
        '           <span class="pull-right text-bold">{{servidor.um}}</span> Uso de memoria ({{servidor.MemoriaError}})',
        '       </p>',
        '       <p class="mar-no">',
        '           <span class="pull-right text-bold">{{servidor.historyCPU[servidor.historyCPU.length-1]}}</span> % CPU ({{servidor.CPUError}})',
        '       </p>',
        '       <p class="mar-no">',
        '           <span class="pull-right text-bold">{{servidor.eIIS}}</span> IIS (Concurrencias: {{servidor.ConexionesIIS}})',
        '       </p>',
        '       <p class="mar-no"  >',
        '           <span class="pull-right text-bold">{{servidor.eBDs}}</span> BDs',
        '       </p>',
        '       <p class="mar-no">',
        '           <span class="pull-right text-bold">{{servidor.eServicios}}</span> Servicios',
        '       </p>',
        '   </div>',
        '   <div class="pad-top text-center">',
        '       <div  v-bind:id="servidor.PSComputerName" class="sparkline-area sparklines-full-content">',
        '       </div>',
        '   </div>',
        '</div>',
        ''].join(''),
    methods: {
        getClass: function (servidor) {
            var clase = "panel  servidor";
            if (servidor.error) {
                clase += " btn-danger";
            }
            else {
                if (servidor.activo) {
                    clase += " btn-seleccionado";
                }
                else {
                    clase += " btn-success";
                }
            }
            return clase;
        },
        fnServerClick: function (server) {
            server_click(server);
            return false;
        },
    },
});




function CargarElementos() {
    $("#appElementos_IIS").hide();
    $("#appElementos_Services").hide();
    $("#appElementos_BD").hide();
    var tipoElemento = $('input[name=inline-form-radio]:checked').val();
    if (tipoElemento == "iis") {
        $("#appElementos_IIS").show();
    }
    if (tipoElemento == "bd") {
        $("#appElementos_BD").show();
    }
    if (tipoElemento == "servicios") {
        $("#appElementos_Services").show();
    }
}

function mensajeSignalRRecibido(datosServer) {
    //console.log("datosServer: ", datosServer);
    var servidor = JSON.parse(datosServer);
    //console.log("servidor: ", servidor);

    //Validar si existe servidor...
    var serverActual = null;
    for (var i = 0; i < serverList.length; i++) {
        if (serverList[i].text == servidor.CPU.PSComputerName) {
            serverActual = serverList[i];
        }
    }

    var memoriausada;
    memoriausada = Math.round((servidor.Memoria.totalvisiblememorysize - servidor.Memoria.freephysicalmemory) / (1024 * 1024)) + "Gb";
    var memoriatotal;
    memoriatotal = Math.round((servidor.Memoria.totalvisiblememorysize) / (1024 * 1024)) + "Gb";


    var activarError = fnActivarError(servidor);

    var espaciolibre = 0;
    var totaldisco = 0;


    for (var i = 0; i < servidor.Discos.length; i++) {
        if (servidor.Discos[i].DriveLetter != null) {
            espaciolibre += servidor.Discos[i].FreeSpace;
            totaldisco += servidor.Discos[i].Capacity;
        }
    }
    espaciolibre = Math.round(espaciolibre / (1024 * 1024 * 1024)) + "Gb";
    totaldisco = Math.round(totaldisco / (1024 * 1024 * 1024)) + "Gb";

    var conexionesIIS = 0;
    for (var i = 0; i < servidor.IIS_Contador.CounterSamples.length; i++) {
        if (servidor.IIS_Contador.CounterSamples[i].InstanceName == "_total") {
            if (servidor.IIS_Contador.CounterSamples[i].RawValue != null) {
                conexionesIIS = Math.ceil(servidor.IIS_Contador.CounterSamples[i].RawValue / 10);
            }
        }
    }

    if (serverActual == null) {
        serverActual = {
            "id": "1", "text": servidor.CPU.PSComputerName,
            "el": espaciolibre,
            "et": totaldisco,
            "um": memoriausada + ' de ' + memoriatotal,
            Discos: servidor.Discos,
            activo: false, error: false,
            PSComputerName: servidor.CPU.PSComputerName,
            historyCPU: [servidor.CPU.LoadPercentage],
            caracteristica: servidor.CPU.Servidor,
            IIS_Info: servidor.IIS_Info,
            Services: servidor.Services,
            ServerBD: servidor.ServerBD,
            MemoriaError: servidor.MemoriaError,
            CPUError: servidor.CPUError,
            eIIS: servidor.eIIS,
            eServicios: servidor.eServicios,
            eBDs: servidor.eBDs,
            ConexionesIIS: conexionesIIS,
            CantidadServicios: Data_Services.length,
            CantidadBDs: Data_BD.length,
        };
        serverActual.error = activarError;

        serverList.push(serverActual);
    }
    else {
        serverActual.um = memoriausada + ' de ' + memoriatotal;
        serverActual.et = totaldisco;
        serverActual.el = espaciolibre;
        if (serverActual.historyCPU.length > 20) {
            serverActual.historyCPU.shift();
        }
        serverActual.historyCPU.push(servidor.CPU.LoadPercentage);

        if (serverActual.MemoriaError != servidor.MemoriaError) {
            serverActual.MemoriaError = servidor.MemoriaError;
        }
        if (serverActual.CPUError != servidor.CPUError) {
            serverActual.CPUError = servidor.CPUError;
        }
        if (serverActual.eIIS != servidor.eIIS) {
            serverActual.eIIS = servidor.eIIS;
        }
        if (serverActual.eServicios != servidor.eServicios) {
            serverActual.eServicios = servidor.eServicios;
        }
        if (serverActual.eBDs != servidor.eBDs) {
            serverActual.eBDs = servidor.eBDs;
        }
        if (serverActual.ConexionesIIS != conexionesIIS) {
            serverActual.ConexionesIIS = conexionesIIS;
        }

        //Validar cambios de estados en IIS...
        for (var i = 0; i < servidor.IIS_Info.length; i++) {
            for (var j = 0; j < Data_IIS.length; j++) {
                if (servidor.IIS_Info[i].name == Data_IIS[j].Sitio) {
                    if (servidor.IIS_Info[i].state != Data_IIS[j].Estado) {
                        Data_IIS[j].Estado = servidor.IIS_Info[i].state;
                    }
                }
            }
        }

        //Validar cambios de estados en Servicios Windows...
        for (var i = 0; i < servidor.Services.length; i++) {
            for (var j = 0; j < Data_Services.length; j++) {
                if (servidor.Services[i].ServiceName == Data_Services[j].ServiceName) {
                    if (servidor.Services[i].Status != Data_Services[j].Status) {
                        Data_Services[j].Status = servidor.Services[i].Status;
                    }
                    break;
                }
            }
        }


        //Validar cambios de estados en Base de datos...
        for (var i = 0; i < servidor.ServerBD.length; i++) {
            for (var j = 0; j < servidor.ServerBD[i].BDs.length; j++) {
                for (var k = 0; k < Data_BD.length; k++) {
                    if (Data_BD[k].Instancia == servidor.ServerBD[i].Instance && Data_BD[k].Name == servidor.ServerBD[i].BDs[j].Name) {
                        if (Data_BD[k].Status != servidor.ServerBD[i].BDs[j].Status) {
                            Data_BD[k].Status = servidor.ServerBD[i].BDs[j].Status;
                            Data_BD[k].Size = servidor.ServerBD[i].BDs[j].Size;
                            Data_BD[k].SpaceAvailable = servidor.ServerBD[i].BDs[j].SpaceAvailable;
                        }
                        break;
                    }
                }
            }
        }



        if (serverActual.error != activarError) {
            serverActual.error = activarError;
        }
    }


    //SpaceAvailable de BD is in Kb and Size is in Mb


    $('#' + serverActual.PSComputerName).sparkline(serverActual.historyCPU, {
        type: 'line',
        width: '100%',
        height: '70',
        spotRadius: 4,
        lineWidth: 0,
        lineColor: '#DDDDDD',
        fillColor: '#E8EAED',
        spotColor: '#FFF',
        minSpotColor: '#FFB80F',
        maxSpotColor: '#F22314',
        highlightLineColor: '#0e9d81',
        highlightSpotColor: '#0e9d81',
        tooltipChartTitle: 'CPU',
        tooltipSuffix: ' % de uso'
    });

    if (!elementoSeleccionado) {
        $("#dvColumnaLoading").hide();
        $("#dvColumnaInformativa").show();
    }

    //console.log("servidor: ", servidor.CPU.PSComputerName);
    //var Servidor = datosServer

}



function fnActivarError(servidor) {
    var activarError = false;

    var espaciolibre, totaldisco, espaciousado;
    for (var i = 0; i < servidor.Discos.length; i++) {
        if (servidor.Discos[i].DriveLetter != null) {
            espaciolibre = Math.round(servidor.Discos[i].FreeSpace / (1024 * 1024 * 1024) * 100) / 100;
            totaldisco = Math.round(servidor.Discos[i].Capacity / (1024 * 1024 * 1024) * 100) / 100;
            espaciousado = Math.round((totaldisco - espaciolibre) * 100) / 100;
            if ((espaciolibre / totaldisco) < 0.1) {
                activarError = true;
            }
        }
    }


    //Memoria..
    if ((servidor.Memoria.totalvisiblememorysize - servidor.Memoria.freephysicalmemory) > 0.85 * (servidor.Memoria.totalvisiblememorysize)) {
        activarError = true;
        servidor.MemoriaError = "Alto";
    }
    else {
        servidor.MemoriaError = "Normal";
    }

    if (servidor.CPU.LoadPercentage > 90) {
        activarError = true;
        servidor.CPUError = "Alto";
    }
    else {
        servidor.CPUError = "Normal";
    }

    var agregar;

    //IIS
    servidor.eIIS = "Iniciado";
    for (var i = 0; i < servidor.IIS_Info.length; i++) {
        if (servidor.IIS_Info[i].state == "Stopped") {
            agregar = false;
            for (var j = 0; j < Parametro_IIS.length; j++) {
                if (Parametro_IIS[j] != "") {
                    if (matchRuleShort(servidor.IIS_Info[i].name.toUpperCase(), Parametro_IIS[j].toUpperCase())) {
                        agregar = true;
                        break;
                    }
                }
            }
            if (agregar) {
                activarError = true;
                servidor.eIIS = "Detenido";
                break;
            }

        }
    }

    //Servicios
    servidor.eServicios = "Iniciado";
    for (var i = 0; i < servidor.Services.length; i++) {
        if (servidor.Services[i].Status != "4") {
            agregar = false;
            for (var j = 0; j < Parametro_Servicios.length; j++) {
                if (Parametro_Servicios[j] != "") {
                    if (matchRuleShort(servidor.Services[i].ServiceName.toUpperCase(), Parametro_Servicios[j].toUpperCase())) {
                        agregar = true;
                        break;
                    }
                }
            }
            if (agregar) {
                activarError = true;
                servidor.eServicios = "Detenido";
                break;
            }
        }
    }

    //BDs
    servidor.eBDs = "Iniciado";
    for (var i = 0; i < servidor.ServerBD.length; i++) {
        for (var j = 0; j < servidor.ServerBD[i].BDs.length; j++) {
            if (servidor.ServerBD[i].BDs[j].Status != "1" && servidor.ServerBD[i].BDs[j].Status != "513") {
                agregar = false;
                for (var k = 0; k < Parametro_BaseDatos.length; k++) {
                    if (Parametro_BaseDatos[k] != "") {
                        if (matchRuleShort(servidor.ServerBD[i].BDs[j].Name.toUpperCase(), Parametro_BaseDatos[k].toUpperCase())) {
                            agregar = true;
                            break;
                        }
                    }
                }
                if (agregar) {
                    activarError = true;
                    servidor.eBDs = "Detenido";
                    break;
                }
            }
        }
    }

    return activarError;
}