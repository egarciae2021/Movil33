<%@ page language="java" isErrorPage="false"
	contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<c:choose>
	<c:when test="${allDevicesList.size()>0}">
		<div class="panel panel-default  table-responsive-md">
			<div class="panel-heading app-heading">
				<span class="lead"><i class="fa fa-table"></i>&nbsp;Lista de Equipos</span>
			</div>
			<div style="padding:10px ; border:0px solid black;overflow-x:auto;">
			<table id="allDeviceTable" class="table table-hover table-condensed table-responsive text-nowrap">
				<thead>
					<tr>
						<th>#</th>
						<th>IMEI</th>
						<th>Empleado</th>
						<th>Modelo</th>
						<!-- <th>inEst</th> -->
						<th>Fecha</th>
						<th>Estado</th>
						<th>Acción</th>
						<th>Acción</th>
						<th>Acción</th>
						<th>Acción</th>
						<!-- 
						<th>Acción</th>
						<th>Acción</th>
						<th>Acción</th>
						 -->

					</tr>
				</thead>
				
				<tbody>
					<%
						int count = 1;
					%>
					<c:forEach items="${allDevicesList}" var="devicesResponse">
						<tr class="form-submit-button">
							<td><%=count++%>.</td>
							<td>
								<c:choose>
									<c:when test="${devicesResponse.btVig==true}">
										<a title="Click para ver el detalle de aplicaciones" class="appliEMI" style="text-decoration: underline;" href="all-application?IMEI=${devicesResponse.mOVDispositivoPK.pvcCodIMEI}">${devicesResponse.mOVDispositivoPK.pvcCodIMEI}</a> 
								</c:when>
									<c:otherwise>
										<a title="Click para ver el detalle de aplicaciones" class="appliEMI" onclick="pleaseEditDevice()" href="#">${devicesResponse.mOVDispositivoPK.pvcCodIMEI}</a>
									</c:otherwise>
								</c:choose>
							</td>
							<td>${devicesResponse.mEmpl.eMPLvcNOMEMP}</td>
							<td>${devicesResponse.finCodModDis.vcNom}</td>
							<%-- <td>${devicesResponse.finEst.pinCod}</td> --%>
							<fmt:formatDate
								value="${devicesResponse.dtFecIng}" pattern="dd-MM-yyyy"
									var="myDate" />
							<td>${myDate}</td>
							<td>
								<c:choose>
									<c:when test="${devicesResponse.btVig==true}">
										Activo 
									</c:when>
									<c:otherwise>
										Inactivo
									</c:otherwise>
								</c:choose>
							</td>
							<td><a
								href="<c:url value='/edit-device-page?id=${devicesResponse.mOVDispositivoPK.pvcCodIMEI}' />"
								class="btn btn-success custom-width"><i class="fa fa-edit"></i>&nbsp;Editar</a>
							</td>
							<td>
								<c:choose>
									<c:when test="${devicesResponse.btVig==true}">
										<a	href="<c:url value='/delete-device?id=${devicesResponse.mOVDispositivoPK.pvcCodIMEI}' />"
											class="btn btn-danger custom-width"><i class="fa fa-trash-o"></i>&nbsp;Eliminar</a>
									</c:when>
									<c:otherwise>
									</c:otherwise>
								</c:choose>
							</td>
							
							<td>
								<c:choose>
									<c:when test="${devicesResponse.btVig==true}">
								<a	href="#" onclick="activarTodo(1, ${devicesResponse.mOVDispositivoPK.pvcCodIMEI})"
								data-toggle="modal" data-target="#applicationBlockedModal" 
								class="btn btn-success custom-width"><i class="fa fa-check-square-o"></i>&nbsp;Activar Bloqueo (Todos)</a>
								</c:when>
									<c:otherwise>
									</c:otherwise>
								</c:choose>
							</td>
							<td>
								<c:choose>
									<c:when test="${devicesResponse.btVig==true}">
								<a	href="#" onclick="activarTodo(0, ${devicesResponse.mOVDispositivoPK.pvcCodIMEI})"
								data-toggle="modal" data-target="#applicationBlockedModal" 
								class="btn btn-success custom-width"><i class="fa fa-square-o"></i>&nbsp;Desactivar Bloqueo (Todos)</a>
								</c:when>
									<c:otherwise>
									</c:otherwise>
								</c:choose>
							</td>
							<%-- 
								<td>
									<c:choose>
										<c:when test="${devicesResponse.btVig==true}">
									<a	href="#" onclick="remoteReset(${devicesResponse.mOVDispositivoPK.pvcCodIMEI})"
									class="btn btn-success custom-width"><i class="fa fa-share"></i>&nbsp;Reseteo Remoto</a>
									</c:when>
										<c:otherwise>
										</c:otherwise>
									</c:choose>
								</td>
								<td>
									<c:choose>
										<c:when test="${devicesResponse.btVig==true}">
											<a href="#" onclick="factoryReset(${devicesResponse.mOVDispositivoPK.pvcCodIMEI})"
											class="btn btn-success custom-width"><i class="fa fa-share"></i>&nbsp;Reseteo de Fábrica</a>
										</c:when>
										<c:otherwise>
										</c:otherwise>
									</c:choose>
								</td>
								<td>
									<c:choose>
										<c:when test="${devicesResponse.btVig==true}">
											<a href="#" onclick="backup(${devicesResponse.mOVDispositivoPK.pvcCodIMEI})"
											class="btn btn-success custom-width"><i class="glyphicon glyphicon-arrow-down"></i>&nbsp;Copia de Seguridad</a>
										</c:when>
										<c:otherwise>
										</c:otherwise>
									</c:choose>
								</td>
							 --%>
						</tr>
					</c:forEach>
				</tbody>
				
			</table>
			</div>
		</div>
	</c:when>
	<c:otherwise>
		<div class="panel panel-default">
			<div class="panel-heading app-heading">
				<span class="lead"><i class="fa fa-table"></i>&nbsp;Lista de Equipos </span>
			</div>
			<div class="alert alert-info" style="margin: 10px;">
				<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
				<strong>Info!</strong> No hay registros.
			</div>
		</div>
	</c:otherwise>
</c:choose>


 <!-- Modal for  applicationBlockedModal-->
  <div class="modal fade" id="applicationBlockedModal" role="dialog" >
    <div class="modal-dialog modal-sm" >
      <div class="modal-content" style="background-color: #c6ecc6;">
        <div class="modal-header" style="background-color: #007b5e; color: white;">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Mensaje</h4>
        </div>
        <div class="modal-body">
           <h4 id="appBlockedRes"></h4>
        </div>
        <div class="modal-footer getDevicePopUp">
          <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
  
<script type="text/javascript">
	$(document).ready( function () {
		$('#allDeviceTable').DataTable({
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
		$("#menu_inicio_equipos").parent().parent().addClass("active-sub active");
		$("#menu_inicio_equipos").addClass("active-link");
	});
	
	function activarTodo(activar, IMEI) {
		var Mensaje = "Confirme la " + (activar?"activación":"desactivación") + " masiva de las aplicaciones en este dispositivo. ¿Continuar?";
		if (confirm(Mensaje)) {	
			var flag = (activar?"true":"false");
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					if (flag == "true") {
						document.getElementById("appBlockedRes").textContent = "Apps bloqueadas exitosamente."
					} else if (flag == "false") {
						document.getElementById("appBlockedRes").textContent = "Apps desbloqueadas exitosamente."
					}
					setTimeout(function () {
						CierraPopup();	
					}, 1000);					
				}
			};			
			xhttp.open("GET","blocked-application-checked-all?imei=" + IMEI + "&value=" + flag, true);
			xhttp.send();
			document.getElementById("appBlockedRes").textContent = "Procesando...";
		}
	}
	function CierraPopup() {
		  $("#applicationBlockedModal").modal('hide');//ocultamos el modal
		  $('body').removeClass('modal-open');//eliminamos la clase del body para poder hacer scroll
		  $('.modal-backdrop').remove();//eliminamos el backdrop del modal
		}
</script>