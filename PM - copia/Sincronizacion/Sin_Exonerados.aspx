<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="Sin_Exonerados.aspx.vb" Inherits=".Sin_Exonerados" %>
<%@ Register Assembly="VisualSoft.Comun.LibreriaJQ" Namespace="VisualSoft.Comun.LibreriaJQ" TagPrefix="cc1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
     

         <link href="../Common/Styles/dhtmlxtree.css" rel="stylesheet" type="text/css" />
        <script src="../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
        <script src="../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
        <script src="../Common/Scripts/dhtmlx/dhtmlxcommon.js" type="text/javascript"></script>
        <script src="../Common/Scripts/dhtmlx/dhtmlxtree.js" type="text/javascript"></script>
        <script src="../Common/Scripts/dhtmlx/ext/dhtmlxtree_json.js" type="text/javascript"></script>




    <script src="../Common/Scripts/Utilitario.js" type="text/javascript"></script>

     <script type="text/javascript">
         function MostrarErrorAjax(xhr, err, thrErr) {
             var r = null;
             if (xhr.responseText != "") {
                 r = jQuery.parseJSON(xhr.responseText);
             }
             if (r == null) {
                 r = xhr.statusText;
                 if (r == null || r == '') {
                     alerta("Error Genérico");
                 }
                 else {
                     alerta("Message: " + r + ". Codigo: " + xhr.status);
                 }
             }
             else {
                 alerta("Message: " + r.Message);
             }
             //    alert("StackTrace: " + r.StackTrace);
             //    alert("ExceptionType: " + r.ExceptionType);
             //    alert("ERROR" + xhr.d);
         }
        </script>
        <style>
        
        .dvCargando
{
    background: url('../Common/Images/Mantenimiento/Cargando.gif') no-repeat center;  
    width:100px;
    height:100px;
    top: 50%;
    left: 50%;
    z-index:100000;
    position:fixed;
    display:none;
}
        </style>

</head>
<body onkeydown="return(event.keyCode!=13)">

    <form id="form1" runat="server">
            <div id="dvCargando" class="dvCargando"></div>
            <asp:HiddenField ID="hdfCodInt" runat="server" />
            <asp:HiddenField ID="hdfTipo" runat="server" />
            <asp:HiddenField ID="hdfMultiple" runat="server" />       
            <asp:HiddenField ID="hdfEmpleadosElegidos" runat="server" />
            <table>
                <tr>
                    <td>                        
                        <cc1:TabJQ ID="TabOpciones" runat="server" CssClass="tabs" style="margin: 0px; padding: 0px;">
                            <cc1:ContenedorTabJQ Titulo="Organización" Height="360px" Width="290px">  
                                <table>
                                    <tr>
                                        <td>
                                            <div class="dhtmlxTree dvPanel" id="dvOrganizacion" style="width:260px; height:300px;overflow:auto;"></div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <asp:CheckBox ID="chkIncluirDependencia" runat="server" Text="Incluir información de dependecia"/>
                                        </td>
                                    </tr>
                                </table>
                            </cc1:ContenedorTabJQ>
                            <cc1:ContenedorTabJQ Titulo="Busqueda avanzada" Height="360px" Width="290px">
                                <br />
                                <%--<asp:TextBox ID="txtBusqueda_" runat="server"></asp:TextBox>--%>
                                <input id="txtBusqueda" type="text"/> 
                                <div id="btnBuscar" class="btnNormal">                               
                                    <asp:Image ID="imgBuscar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/lupa_16x16.png" />
                                    <a>Busqueda</a>
                                    <%--<asp:Image ID="imgBuscar" runat="server" ImageUrl="~/Scripts/images/lupa_16x16.png" />--%>
                                    <%--<a>Busqueda</a>--%>
                                </div>
                            </cc1:ContenedorTabJQ>
                        </cc1:TabJQ>                    
                    </td>
                    <td>
                        <div id="dvDatosSeleccion" style="width:100%; text-align:center; font-weight:bold;" runat="server"></div>
                        <asp:ListBox ID="lstResultado" runat="server" Height="380px" Width="180px" SelectionMode="Multiple"></asp:ListBox>
                    </td>
                    <td id="tdControles" runat="server">
                        <div id="btnDerecha" class="btnNormal" runat="server" style="width:40px;">
                            <a>></a>
                        </div>
                        <div id="btnIzquierda" class="btnNormal" runat="server" style="width:40px;">
                            <a><</a>
                        </div>
                        <div id="btnDerechaTodo" class="btnNormal" runat="server" style="width:40px;">
                            <a>>></a>
                        </div>
                        <div id="btnIzquierdaTodo" class="btnNormal" runat="server" style="width:40px;">
                            <a><<</a>
                        </div>                        
                    </td>
                    <td id="tdDatosSeleccionados" runat="server">
                        <div style="width:100%; text-align:center; font-weight:bold;">
                            Datos seleccionados
                        </div>
                        <asp:ListBox ID="lstSeleccionados" runat="server" Height="380px" Width="180px" SelectionMode="Multiple"></asp:ListBox>                    
                    </td>
                </tr>
                <tr>
                    <td>
                        <div class="dvPanel">
                            <asp:Label ID="lblEtiquetaVer" runat="server" Text="Ver"></asp:Label>
                            <asp:DropDownList ID="ddlEstado" runat="server">
                                <asp:ListItem Value="-1" Text="Todos"></asp:ListItem>
                                <asp:ListItem Value="1" Text="Vigentes" Selected="True"></asp:ListItem>
                            </asp:DropDownList>
                        </div>
                    </td>
                    <td colspan="3" align="right">
                    <table>
                    <tr>
                    <td>
                    <div id="btnAceptar" class="btnNormal" runat="server" >
                            <asp:Image ID="imgAceptar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
                            <a>Aceptar</a>
                        </div>
                    </td>
                    <td>
                     <div id="btnCancelar" class="btnNormal" runat="server">
                            <asp:Image ID="imgCancelar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
                            <a>Cancelar</a>
                        </div> 
                    </td>
                    </tr>
                    </table>
                        
                                          
                    </td>
                </tr>
            </table>         
        </form>
</body>
</html>

  <script type="text/javascript">

      var Areas;
      var Empleados;
      var Lineas;

      function area(P_inCodOrg, vcNomOrg) {
          this.P_inCodOrg = P_inCodOrg;
          this.vcNomOrg = vcNomOrg;
      }
      function empleado(P_vcCod, vcNom) {
          this.P_vcCod = P_vcCod;
          this.vcNom = vcNom;
      }
      function linea(P_vcNum) {
          this.P_vcNum = P_vcNum;
          this.Empleado = new empleado();
      }
      $(function () {
          var tree;
          var idTree = "-1";

          $(".btnNormal").button({});
          $(".btnNormal2").button({}).css({ width: '100px' });
          var tabOpciones = $("#TabOpciones").tabs({});

          inicio();
          CargarExonerados();
          var nodos

          function inicio() {

              tree = new dhtmlXTreeObject("dvOrganizacion", "100%", "100%", 0);
              tree.setImagePath("../Common/Images/Controles/dhtmlx/TreeView/");
              tree.setOnClickHandler(CargarDependecia);

              if ($("#hdfTipo").val() == "1") {//Area
                  Areas = new Array();
              }
              if ($("#hdfTipo").val() == "2") {//Empleado
                  Empleados = new Array();
              }
              else if ($("#hdfTipo").val() == "3") {//Celular
                  Lineas = new Array();
              }

              if ($("#hdfEmpleadosElegidos").val() != "" && $("#lstSeleccionados option").length == 0) {
                  var ValorAgregado = false;
                  var Empleados = $("#hdfEmpleadosElegidos").val().split(',');

                  for (var i = 0; i < Empleados.length; i++) {
                      var Existe = false;
                      $("#lstSeleccionados option").each(function () {
                          if (Empleados[i] == $(this).val()) {
                              Existe = true;
                              ValorAgregado = true;
                              return false;
                          }
                      });
                      if (!Existe) {
                          $("#lstSeleccionados").append($("<option></option>").attr("value", Empleados[i].substring(0, Empleados[i].indexOf('='))).text(Empleados[i]));
                      }
                  };
                  if (ValorAgregado) {
                      alert("Algunos items seleccionados ya han sido agregados");
                  }
                  $("#dvCargando").hide();
              }
          }

          $.ajax({
              type: "POST",
              url: "Sin_Exonerados.aspx/ListarPrincipal",
              data: "{'vcCodInt': '" + $("#hdfCodInt").val() + "'}",
              contentType: "application/json; charset=utf-8",
              dataType: "json",
              success: function (result) {

                  tree.loadJSArray(result.d);

                  $(result.d).each(function () {
                      fixImage(this[0]);
                  });
              },
              error: function (xhr, err, thrErr) {
                  MostrarErrorAjax(xhr, err, thrErr);
              }
          });


          function CargarDependecia() {

              if (idTree != tree.getSelectedItemId()) {
                  $.ajax({
                      type: "POST",
                      url: "Sin_Exonerados.aspx/ListarOrganizacion",
                      data: "{'vcCodInt': '" + tree.getSelectedItemId() + "'}",
                      contentType: "application/json; charset=utf-8",
                      dataType: "json",
                      success: function (result) {
                          var idtree = tree.getSelectedItemId();
                          var texto = tree.getAllChildless();

                          $(result.d).each(function () {
                              if (texto.indexOf(this.vcCodInt) == -1) {
                                  tree.insertNewItem(idtree, this.vcCodInt, this.vcNomOrg, 0, 0, 0, 0, '');
                                  fixImage(this.vcCodInt);
                              }
                              else {
                                  return false;
                              }
                          });
                      },
                      error: function (xhr, err, thrErr) {
                          MostrarErrorAjax(xhr, err, thrErr);
                      }
                  });
                  if (idTree != "-1") {
                      CargarDetalle(0);
                  }
              }
              idTree = tree.getSelectedItemId();
          }

          function fixImage(id) {

              //Cerrar, abrir, cerrar
              var Archivo = 'Niveles/' + (id.length / 3).toString() + '.ico'
              tree.setItemImage2(id, Archivo, Archivo, Archivo);
          }



          function CargarExonerados() {
              var MetodoListar = "ListarExonerados";

              if (MetodoListar != "") {
                  $.ajax({
                      type: "POST",
                      url: "Sin_Exonerados.aspx/" + MetodoListar,
                      data: "{}",
                      contentType: "application/json; charset=utf-8",
                      dataType: "json",
                      success: function (result) {

                          $("#lstSeleccionados").html("");

                          $(result.d).each(function () {
                              var color = "";
                              if (!this.btVig) {
                                  color = "Red";
                              }
                              $("#lstSeleccionados").append($("<option></option>").attr("value", this.P_vcCod).text(this.P_vcCod + "=" + this.vcNom).css("color", color));
                          });
                      },
                      error: function (xhr, err, thrErr) {
                          MostrarErrorAjax(xhr, err, thrErr);
                          $("#btnBuscar").button("option", "disabled", false);
                      }
                  });
              }
          }



          function CargarDetalle(tipo) {
              var MetodoListar = "";
              if ($("#hdfTipo").val() == "1") {//Empleado
                  MetodoListar = "ListarArea";
              }
              if ($("#hdfTipo").val() == "2") {//Empleado
                  MetodoListar = "ListarEmpleado";
              }
              else if ($("#hdfTipo").val() == "3") {//Celular
                  MetodoListar = "ListarLinea";
              }

              if (MetodoListar != "") {
                  $("#btnBuscar").button("option", "disabled", true);
                  $.ajax({
                      type: "POST",
                      url: "Sin_Exonerados.aspx/" + MetodoListar,
                      data: "{'vcCodInt': '" + tree.getSelectedItemId() + "'," +
                                   "'btIncDep': '" + $('#chkIncluirDependencia').is(':checked') + "'," +
                                   "'inCodEst': '" + $("#ddlEstado").val() + "'," +
                                   "'vcValBus': '" + $("#txtBusqueda").val() + "'," +
                                   "'inTip': '" + tipo + "'}",
                      contentType: "application/json; charset=utf-8",
                      dataType: "json",
                      success: function (result) {

                          $("#lstResultado").html("");
                          if ($("#hdfTipo").val() == "1") {//Area
                              $(result.d).each(function () {
                                  var color = "";
                                  if (!this.btVig) {
                                      color = "Red";
                                  }
                                  $("#lstResultado").append($("<option></option>").attr("value", this.P_inCodOrg).text(this.P_inCodOrg + "=" + this.vcNomOrg).css("color", color));
                              });
                          }
                          else if ($("#hdfTipo").val() == "2") {//Empleado
                              $(result.d).each(function () {
                                  var color = "";
                                  if (!this.btVig) {
                                      color = "Red";
                                  }
                                  $("#lstResultado").append($("<option></option>").attr("value", this.P_vcCod).text(this.P_vcCod + "=" + this.vcNom).css("color", color));
                              });
                          }
                          else if ($("#hdfTipo").val() == "3") {//Celular
                              $(result.d).each(function () {
                                  var color = "";
                                  if (!this.btVig) {
                                      color = "Red";
                                  }
                                  $("#lstResultado").append($("<option></option>").attr("value", this.P_vcNum).text(this.P_vcNum + "=" + this.Empleado.vcNom).css("color", color));
                              });
                          }
                          $("#btnBuscar").button("option", "disabled", false);
                      },
                      error: function (xhr, err, thrErr) {
                          MostrarErrorAjax(xhr, err, thrErr);
                          $("#btnBuscar").button("option", "disabled", false);
                      }
                  });
              }
          }

          $(document).ajaxStart(function () {
              $("#dvCargando").show();
          });
          $(document).ajaxStop(function () {
              $("#dvCargando").hide();
          });

          $("#ddlEstado,#chkIncluirDependencia").change(function () {
              CargarDetalle(0);
          });

          $("#btnBuscar").click(function () {
              if ($("#txtBusqueda").val() == "") {
                  alert("Ingrese un valor a buscar");
                  $("#txtBusqueda").focus();
                  return;
              }
              CargarDetalle(1);
          });

          $("#btnDerecha").click(function () {

              if ($("#lstResultado option:selected").length > 0) {
                  AgregaItems("#lstResultado option:selected");
              }
              else {
                  alert("Seleccione un item");
              }
          });
          $("#btnIzquierda").click(function () {
              if ($("#lstSeleccionados option:selected").length > 0) {
                  $("#lstSeleccionados option:selected").remove();
              }
              else {
                  alert("Seleccione un item");
              }
          });
          $("#btnDerechaTodo").click(function () {


              if ($("#lstResultado option").length > 0) {
                  //$("#lstSeleccionados").html("");
                  //$("#lstSeleccionados").html($("#lstResultado").html());
                  AgregaItems("#lstResultado option"); //$("option", "#lstResultado")
              }
              else {
                  $("#dvCargando").hide();
                  alert("No hay datos disponibles");
              }
          });
          $("#btnIzquierdaTodo").click(function () {
              if ($("#lstSeleccionados option").length > 0) {
                  $("#lstSeleccionados").html("");
              }
              else {
                  alert("No hay datos seleccionados");
              }
          });

          function AgregaItems(selector) {

              var ValorAgregado = false;
              $(selector).each(function () {
                  var Seleccionado = $(this);
                  var Existe = false;
                  $("#lstSeleccionados option").each(function () {
                      if (Seleccionado.val() == $(this).val()) {
                          Existe = true;
                          ValorAgregado = true;
                          return false;
                      }
                  });
                  if (!Existe) {
                      $("#lstSeleccionados").append($("<option></option>").attr("value", Seleccionado.val()).text(Seleccionado.html()).css("color", "black"));
                  }
              });
              if (ValorAgregado) {
                  alert("Algunos items seleccionados ya han sido agregados");
              }
              $("#dvCargando").hide();
          }


          $("#btnAceptar").click(function () {

              if ($("#hdfTipo").val() == "2") {//Empleado
                  var Empleados = new Array();
                  $("#lstSeleccionados option").each(function () {
                      var Empleado = new empleado();
                      Empleado.P_vcCod = $(this).val();
                      Empleados.push(Empleado);
                  });

                  $.ajax({
                      type: "POST",
                      url: "Sin_Exonerados.aspx/GrabarExceptos",
                      data: "{'lista': '" + JSON.stringify(Empleados) + "'}",
                      //data: Empleados,
                      contentType: "application/json; charset=utf-8",
                      dataType: "json",
                      async: false,
                      success: function (data) {
                          alert("Exceptos grabados");
                      },
                      error: function (data) {
                          alert("Error en grabar exceptos");
                          alert(postData);
                      }
                  });
                  window.parent.IngresarEmpleados(Empleados);
              }
              window.parent.Modal.dialog("close");
          });

          $("#btnCancelar").click(function () {

              window.parent.Modal.dialog("close");
          });

       
          $('#txtBusqueda').bind("keydown", function (e) {
              var n = $("#txtBusqueda").length;
              if (e.which == 13) { //Enter key
                  CargarDetalle(1);
              }
          });

      });
           
        </script>
