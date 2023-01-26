<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Servidores.aspx.cs" Inherits="PcSistelMovil2Web.Monitor.Servidores" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">

    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>Monitor | PCSistel Aprovisionamiento 3.3</title>

    <script src="../Content/js/shared/jquery-1.11.3.js"></script>

    <link rel="shortcut icon" href="../Content/img/favicon.png" type="image/x-icon" />
    <link href="../Content/css/shared/fonts.css" rel="stylesheet" type="text/css" />
    <link href="../Content/css/shared/bootstrap.min.css" rel="stylesheet" />
    <link href="../Content/css/shared/nifty.min.css" rel="stylesheet" />
    <link href="../Content/css/shared/nifty-demo-icons.min.css" rel="stylesheet" />
    <link href="../Content/css/shared/pace.min.css" rel="stylesheet" />
    <script type="text/javascript" src="../Content/js/shared/pace.min.js"></script>
    <link href="../Content/css/shared/nifty-demo.min.css" rel="stylesheet" />
    <link href="../Content/css/shared/font-awesome.min.css" rel="stylesheet" />
    <link href="../Content/css/shared/spinkit.min.css" rel="stylesheet" />

    <script src="../Content/js/shared/jquery.sparkline.min.js"></script>


    <script src="../Content/js/shared/vue.js"></script>
    <%--<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.8/vue.min.js"></script>--%>
    <script src="../Content/js/shared/vue-resource.min.js"></script>
    <script src="../Content/js/shared/vue-tables-2.min.js"></script>



    <%--<link href="https://cdn.datatables.net/1.10.19/css/jquery.dataTables.min.css" rel="stylesheet" />--%>
    <%--<link href="../Content/css/shared/dataTables.bootstrap.css" rel="stylesheet" />
    <link href="../Content/css/shared/responsive.dataTables.min.css" rel="stylesheet" />--%>





    <script src="../Content/js/shared/dataTables/jquery.dataTables.js"></script>
    <script src="../Content/js/shared/dataTables/dataTables.bootstrap.js"></script>
    <script src="../Content/js/shared/dataTables/dataTables.responsive.min.js"></script>


    <script type="text/javascript" src="<%=Web.GeneralMantenimiento.UtilitarioWeb.ObtienePublicacionSignalR("Scripts/jquery.signalR-2.2.3.min.js")%>"></script>
    <script type="text/javascript" src="<%=Web.GeneralMantenimiento.UtilitarioWeb.ObtienePublicacionSignalR("signalr/hubs")%>"></script>

    <style>
        body {
            overflow: auto;
            overflow-x: hidden;
            background-color: white !important;
        }

        .btn-success {
            cursor: hand;
            cursor: pointer;
        }

        .btn-seleccionado {
            background-color: #5F892D !important;
            color: white;
        }

        .btn-bloqueado {
            cursor: default !important;
        }

        .VueTables__search-field > input {
            width: 400px !important;
        }

        .clsSemaforo {
              width: 24px;
              display: block;
              margin: 0 auto;
        }

    </style>
</head>
<body>
    <script src="<%=Web.GeneralMantenimiento.UtilitarioWeb.ObtieneVersionArchivoEstatico("Parametros.js") %>"></script>
    <script src="<%=Web.GeneralMantenimiento.UtilitarioWeb.ObtieneVersionArchivoEstatico("Servidores.js") %>" type="text/javascript"></script>
    <script src="<%=Web.GeneralMantenimiento.UtilitarioWeb.ObtieneVersionArchivoEstatico("ServidoresSignalR.js") %>" type="text/javascript"></script>

    <form id="form1" runat="server">
        <asp:HiddenField ID="hfpathSignalRPCSistel" runat="server" />
        <div id="" class="">

            <div style="position: absolute; right: 10px; top: 10px; z-index: 999999999;">
                <i id="btnFullScreen" class="fa fa-arrows-alt" style="font-size: 18px; cursor: hand; cursor: pointer;"></i>
                <i id="btnDefaultScreen" class="fa fa-compress" style="font-size: 18px; cursor: hand; cursor: pointer; display: none;"></i>
            </div>

            <div id="dvColumnaServidores" class="col-md-2" style="background-color: #E9F2F8; padding-top: 10px; overflow-y: auto; overflow-x: hidden;">

                <div class="col-sm-12  col-md-12">
                    <div id="app_servidores">
                        <servidor-item
                            v-for="servidor in serverList"
                            v-bind:servidor="servidor">
                        </servidor-item>

                    </div>

                </div>
            </div>

            <div id="dvColumnaInformativa" class="col-md-10" style="display: none;">
                <div class="panel panel-body text-center">
                    <div class="panel-heading">
                        <h3>(Seleccione un servidor)</h3>
                    </div>
                    <div class="panel-body">
                        <p>
                            En esta sección se mostrarán la lista de base de datos, servicios y IIS según cada servidor configurado.
                        </p>
                    </div>
                </div>
            </div>

            <div id="dvColumnaLoading" class="col-md-10" style="display: none;">

                <div class="panel panel-body text-center">
                    <div class="panel-heading">
                    </div>
                    <div class="panel-body">
                        <div class="sk-wave">
                            <div class="sk-rect sk-rect1"></div>
                            <div class="sk-rect sk-rect2"></div>
                            <div class="sk-rect sk-rect3"></div>
                            <div class="sk-rect sk-rect4"></div>
                            <div class="sk-rect sk-rect5"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="dvColumnaElementos" class="col-md-10" style="display: none;">

                <h1 id="tituloServer" class="page-header text-overflow">...</h1>
                <hr class="new-section-xs" />

                <div class="row" id="pieDiscos">
                </div>

                <hr class="new-section-xs" />

                <div class="row">
                    <div class="radio" style="margin-left: 10px;">

                        <!-- Inline radio buttons -->
                        <input id="demo-inline-form-radio" class="magic-radio" type="radio" name="inline-form-radio" checked="" value="iis">
                        <label for="demo-inline-form-radio">IIS (<span id="spTotalIIS"></span>)</label>

                        <input id="demo-inline-form-radio-2" class="magic-radio" type="radio" name="inline-form-radio" value="bd">
                        <label for="demo-inline-form-radio-2">Base de Datos (<span id="spTotalBD"></span>)</label>

                        <input id="demo-inline-form-radio-3" class="magic-radio" type="radio" name="inline-form-radio" value="servicios">
                        <label for="demo-inline-form-radio-3">Servicios Windows (<span id="spTotalServicios"></span>)</label>

                    </div>
                </div>

                <%--<hr class="new-section-xs" />--%>

                <div class="row">
                    <%--<table id="dtElementos" class="display" width="100%"></table>--%>

                    <div id="appElementos_IIS">
                        <v-client-table :columns="columns" :data="data" :options="options">
                            <%--<span slot="__group_meta" slot-scope="{value,data}">
                              {value} has {data.countries} countries and a population of {data.Estado} million
                            </span>--%>

                            <%--<template slot="Estado" scope="props" v-html="template">
                                <img src=${props.row.Estado} />
                            </template>--%>

                        </v-client-table>
                    </div>

                    <div id="appElementos_Services">
                        <v-client-table :columns="columns" :data="data" :options="options">
                        </v-client-table>
                    </div>

                    <div id="appElementos_BD">
                        <v-client-table :columns="columns" :data="data" :options="options">
                        </v-client-table>
                    </div>

                </div>


            </div>

        </div>

    </form>
</body>
</html>
