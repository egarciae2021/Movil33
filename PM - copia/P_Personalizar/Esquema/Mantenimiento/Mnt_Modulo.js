
            var tbDetalle;

            function modulo(P_inCod, F_inProd, inOrd, vcNom, vcURL, inTipOri, vcTab, inEst) {
              this.P_inCod = P_inCod;
              this.F_inProd = F_inProd;
              this.vcNom = vcNom;
              this.vcURL = vcURL;
              this.vcTab = vcTab;
              this.inEst = inEst;
              this.inTipOri = inTipOri;
              this.inOrd = inOrd;
              //this.Opciones = new Array();
              this.Opciones = [];
            }

            ActualizarListaTablas = function () {

                $("#ddlTabla").html("");
                $("#txtTabla").show();

                $.ajax({
                    type: "POST",
                    url: "Mnt_Modulo.aspx/ListarTablas",
                    data: "{'TipoOrigen': " + $("#ddlTipoOrigen").val() + "}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        lstTablas = result.d;
                        $.each(lstTablas, function () {
                            $("#ddlTabla").append($("<option></option>").attr("value", this.vcTab).text(this.vcTab));
                            inicio = false;
                        });
                        if (lstTablas.length == 0) {
                            $("#txtTabla").hide();
                        }
                    },
                    error: function (xhr, err, thrErr) {
                        alert(xhr.responseText);
                        MostrarErrorAjax(xhr, err, thrErr);
                    }
                });

            };

            $(function () {
                var indiceTab = window.parent.tab.tabs("option", "selected");
                var pagina = "";
                var NumeroOpcion = 1;
                var Titulo = "Nueva Opcion";
                var Opcion = "";
                var CargoItem = false;
                var lstTablas;

                IniciarPagina();

                function IniciarPagina() {
                    $("#txtNombreModulo").focus();
                    $(".tdEtiqueta").css("width", "80px");
                }

                $(".btnNormal").button();

                ValidarNumeroEnCajaTexto("txtOrden", ValidarEnteroPositivo);

                tbDetalle = $("#tbDetalle").tabs({
                    add: function (event, ui) {
                        var ifra = document.createElement('IFRAME');
                        ifra.width = "100%";
                        ifra.height = "100%";
                        ifra.setAttribute("margin-top", "0px");
                        ifra.setAttribute("margin-left", "0px");
                        ifra.setAttribute("margin-bottom", "0px");
                        ifra.setAttribute("margin-right", "0px");
                        ifra.setAttribute("padding-top", "0px");
                        ifra.setAttribute("padding-left", "0px");
                        ifra.setAttribute("padding-bottom", "0px");
                        ifra.setAttribute("padding-right", "0px");
                        ifra.src = pagina;
                        ifra.frameBorder = "0";
                        ifra.className = "SinBordes";
                        $(ui.panel).append(ifra);
                        $(this).tabs('select', '#' + ui.panel.id);
                        pagina = "";
                    }
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
                $("#btnGuardar").click(function (event) {
                    var i = 0;
                    var ErrorValOpcion = false;
                    var Modulo = new modulo();

                    if ($("#hdfModulo").val() == "") {
                        Modulo.P_inCod = "-1";
                    }
                    else {
                        Modulo.P_inCod = $("#hdfModulo").val();
                    }

                    Modulo.vcNom = $("#txtNombreModulo").val();
                    Modulo.vcURL = $("#txtUrl").val();
                    Modulo.inOrd = $("#txtOrden").val();
                    Modulo.F_inProd = $("#ddlProducto").val();
                    Modulo.inEst = 1;
                    Modulo.inTipOri = $("#ddlTipoOrigen").val();

                    var vcTabla = $("#ddlTabla").val();
                    var vcTabla2 = $("#txtTabla").val();
                    if (vcTabla == 'OTRO' && vcTabla2 == '') {
                        alerta("Ingrese el valor, es un campo obligatorio");
                        $("#txtTabla").focus();
                        return;
                    }
                    if (vcTabla == 'OTRO') {
                        Modulo.vcTab = vcTabla2;
                    }
                    else {
                        Modulo.vcTab = vcTabla;
                    }
                    if (Modulo.vcNom == "") {
                        alerta("El nombre del modulo es un campo obligatorio");
                        $("#txtNombreModulo").focus();
                        return;
                    }
                    if (Modulo.F_inProd == "-1") {
                        alerta("Seleccione un producto, es un campo obligatorio");
                        $("#ddlProducto").focus();
                        return;
                    }

                    for (i = 0; i < $("#tbDetalle").tabs("length"); i++)
                    { Modulo.Opciones.push($("iframe", "#tbDetalle")[i].contentWindow.ObtieneOpcion()); }

                    i = 0;
                    $(Modulo.Opciones).each(function () {
                        if (this.vcNom == "") {
                            alerta("Ingrese el nombre de la Opcion, es un campo obligatorio");
                            $("#tbDetalle").tabs("option", "selected", i);
                            $("iframe", "#tbDetalle")[i].contentWindow.$("#txtNombre").focus();
                            ErrorValOpcion = true;
                            return false;
                        }

                        this.vcNom = this.vcNom.replace(/'/g, "&#39");
                        i++;
                    });

                    if (ErrorValOpcion) {
                        return;
                    }

                    var oModulo = JSON.stringify(Modulo);

                    BloquearPagina(true);
                    $.ajax({
                        type: "POST",
                        url: "Mnt_Modulo.aspx/Guardar",
                        data: "{'oModulo': '" + oModulo + "'}",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (result) {
                            window.parent.ActualizarGrilla();
                            Mensaje("<br/><h1>Modulo Guardado</h1><br/><h2>" + Modulo.vcNom + "</h2>", document, CerroMensaje);
                        },
                        error: function (xhr, err, thrErr) {
                            MostrarErrorAjax(xhr, err, thrErr);
                            BloquearPagina(false);
                        }
                    });

                });

                $("#btnCerrar").click(function (event) {
                    window.parent.tab.tabs("remove", window.parent.tab.tabs("option", "selected"));
                });


                $("#ddlTipoOrigen").change(function () {
                    ActualizarListaTablas();
                });

                $("#ddlTabla").change(function () {
                    //Validar Si muestra caja de texto...
                    var vcTabla = $("#ddlTabla").val();
                    if (vcTabla == 'OTRO') {
                        $("#txtTabla").show();
                        $("#txtTabla").focus();
                    }
                    else {
                        $("#txtTabla").hide();
                    }
                });

                function CerroMensaje() {
                    BloquearPagina(false);
                    if ($("#hdfModulo").val() == "") {//Nuevo
                        $("#txtNombreModulo").val("");
                        $("#txtOrden").val("1");
                        $("#txtUrl").val("");
                        $("select#ddlTipoOrigen").prop('selectedIndex', 0);
                        $("#ddlTabla").html("");
                        $("#txtNombreModulo").focus();

                        var numTab = $("#tbDetalle").tabs("length");
                        for (i = 0; i < numTab; i++)
                        { $("#tbDetalle").tabs('remove', 0); }

                        Opcion = "";
                        Titulo = "Nueva Opcion";
                        $("#btnAgregarOpcion").click();
                    }
                    else {//Edicion
                        window.parent.tab.tabs("remove", indiceTab);
                    }
                }

                $("#btnAgregarOpcion").click(function (event) {
                    pagina = 'Mnt_Opcion.aspx?Cod=' + Opcion.toString();
                    var Id = "#" + "_Tab_Opcion" + NumeroOpcion.toString();
                    var $panel = tbDetalle.find(Id);
                    if (!$panel.length) {//En el caso que no exista el tab, lo crea
                        tbDetalle.tabs("add", Id, Titulo);
                        $(Id).css("width", "99%");
                        $(Id).css("height", "315px");
                        $(Id).css("margin-top", "0px");
                        $(Id).css("margin-left", "0px");
                        $(Id).css("margin-bottom", "0px");
                        $(Id).css("margin-right", "0px");
                        $(Id).css("padding-top", "0px");
                        $(Id).css("padding-left", "0px");
                        $(Id).css("padding-bottom", "0px");
                        $(Id).css("padding-right", "0px");
                    }
                    Titulo = "Nueva Opcion";
                    Opcion = "";
                    NumeroOpcion++;
                });

                function CargarOpcion() {
                    if ($("#hdfModulo").val() != "") {
                        if ($(lstOpciones).length > 0) {
                            $(lstOpciones).each(function () {
                                Opcion = this.P_inCod;
                                Titulo = this.vcNom;
                                $("#btnAgregarOpcion").click();
                            });
                            $("#tbDetalle").tabs("option", "selected", 0);
                        }
                        else {
                            Opcion = "";
                            Titulo = "Nueva Opcion";
                            $("#btnAgregarOpcion").click();
                        }
                    }
                    else {
                        Opcion = "";
                        Titulo = "Nueva Opcion";
                        $("#btnAgregarOpcion").click();
                    }
                }

                CargarOpcion();

            });