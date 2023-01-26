<%@ page language="java" isErrorPage="false"
	contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>


<c:choose>
	<c:when test="${allMEmpl.size()>0}">
		<div class="panel panel-default table-responsive-md">
			<div class="panel-heading app-heading">
				<span class="lead" ><i class="fa fa-table"></i>&nbsp;Lista de Empleados</span>
			</div>
			<div style="padding:10px ; border:0px solid black;overflow-x:auto;">
			<table id="generateDeviceCodeTable" >
				<thead>
					<tr>
						<th>Nro.</th>
						<th>Id Empleado</th>
						<th>Nombre Empleado</th>
						<th>Fecha creación</th>
						<th>Acción</th>
					</tr>
				</thead>
				<tbody>
					<%
						int count = 1;
					%>
					<c:forEach items="${allMEmpl}" var="emplResponse">
						<tr class="form-submit-button">
							<td><%=count++%>.</td>
							<td>${emplResponse.mEmplPK.eMPLPvcCODEMP}</td>
							<td>${emplResponse.eMPLvcNOMEMP}</td>
							<td>${emplResponse.eMPLdaFECINI}</td>
							<td><a	href="#" onclick="getDeviceCode('${emplResponse.mEmplPK.eMPLPvcCODEMP}=${emplResponse.mEmplPK.finCodCli}')"  
								 data-toggle="modal" data-target="#myModal"
							 class="btn btn-info custom-width">
									<i class="fa fa-mobile-phone"></i>&nbsp;Obtener Código</a></td>
						</tr>
					</c:forEach>
				</tbody>
			</table>
			</div>
		</div>
	</c:when>
	<c:otherwise>
	
		<div class="panel panel-default">
			<div class="panel-heading">
				<span class="lead">Lista de Empleados </span>
			</div>
			<div class="alert alert-info" style="margin: 10px;">
				<a href="#" class="close" data-dismiss="alert" 
				aria-label="close">&times;</a>
				<strong>Info!</strong> No hay registros.
			</div>
		</div>
	</c:otherwise>
</c:choose>


  <!-- Modal -->
  <div class="modal fade" id="myModal" role="dialog" >
    <div class="modal-dialog modal-sm" >
      <div class="modal-content" style="background-color: white;">
        <div class="modal-header" style="background-color: #03A9F4; color: white;">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title"> Código Equipo</h4>
        </div>
        <div class="modal-body">
          <p   id="deviceCode"></p>
        </div>
        <div class="modal-footer getDevicePopUp">
          <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
        </div>
      </div>
    </div>
  </div>
  
  <script type="text/javascript">

			$(document).ready( function () {
				$('#generateDeviceCodeTable').DataTable({
					"language": {
			            "lengthMenu": "_MENU_ registros por p&aacute;gina",
			            "sSearch":        "Buscar:",
			            "zeroRecords": "Sin resultado",
			            "info": "Mostrando _PAGE_ de _PAGES_",
			            "infoEmpty": "No hay registros",
			            "infoFiltered": "(Filtro de _MAX_ registros en total)",
			            "paginate": {
			                "previous": "Anterior",
			                "next":"Siguiente"
			              }
			        }
				});

				$("#mainnav-menu li").removeClass("active-sub active");
				$("#mainnav-menu li").removeClass("active-link");
				$("#menu_generarcodigo").addClass("active-sub active");
				
			});
			
</script>