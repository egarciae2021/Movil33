<%@ page language="java" isErrorPage="false"
	contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>

<meta http-equiv="Content-type" content="text/html; charset=ISO-8859-1" />

<c:choose>
	<c:when test="${allApplicationRes.size()>0}">
		<div class="panel panel-default table-responsive-sm">
			<div class="panel-heading  app-heading">
				<span class="lead"><i class="fa fa-table"></i>&nbsp;Lista de aplicaciones</span>
			</div>
			<div class="panel-body" >
			<div style="padding:10px ; border:0px solid black;overflow-x:auto;">
				<table id="allApplicationTable" class="table table-hover table-condensed table-responsive text-nowrap" >
					<thead>
						<tr >
							<th>#</th>
							<th>IMEI</th>
							<th>Nombre</th>
							<th>Paquete</th>
							<%--
							<th>Bloquear Instalación</th>
							<th>Bloquear Desinstalación</th>
							 --%>
							<th>Bloqueado (Sí/No)</th>
							<th>Hora inicial</th>
							<th>Hora final</th>
							<th>Acción</th>
						</tr>
					</thead>
					<tbody>
						<%
							int count = 1;
						%>
						<c:forEach items="${allApplicationRes}" var="appliResponse">
							<tr class="form-submit-button">
								<td>
									<%=count++%>.<input id="applicationID" type="hidden" value="${appliResponse.id}">
								</td>
								<td id="pvcCodIMEIIdValue"+>${appliResponse.dispositivo.mOVDispositivoPK.pvcCodIMEI}</td>
								<td>${appliResponse.appName}</td>
								<td>${appliResponse.packageName}</td>
								<%--
								<td style="text-align: center;"><!-- application Installation td start -->
									<c:choose>
										<c:when test="${appliResponse.blockInstallation==false}">
											<input type="checkbox" id="blockInstallationId" onchange="applicationInstallBlocked('${appliResponse.id}=true')"
												data-toggle="modal" data-target="#applicationInstallModal">
										</c:when>
										<c:when test="${appliResponse.blockInstallation==true}">
											<input type="checkbox" id="blockInstallationId" checked="checked" onchange="applicationInstallBlocked('${appliResponse.id}=false')"
												data-toggle="modal" data-target="#applicationInstallModal">
										</c:when>
										<c:otherwise>
										</c:otherwise>
									</c:choose>
								</td><!-- application Installation td end -->
								
								<td style="text-align: center;"><!-- application Uninstallation td start -->
									<c:choose>
										<c:when test="${appliResponse.blockUninstallation==false}">
											<input type="checkbox" onchange="applicationUninstallBlocked('${appliResponse.id}=true')"
												data-toggle="modal" data-target="#applicationUninstallModal">
										</c:when>
										<c:when test="${appliResponse.blockUninstallation==true}">
											<input type="checkbox" checked="checked"  onchange="applicationUninstallBlocked('${appliResponse.id}=false')"
												data-toggle="modal" data-target="#applicationUninstallModal">
										</c:when>
										<c:otherwise>
										</c:otherwise>
									</c:choose>
								</td><!-- application Uninstallation td end -->
								--%>
								
								<td style="text-align: center;">
									<c:choose>
										<c:when test="${appliResponse.blocked==false}">
											<input type="checkbox" onchange="applicationBlocked('${appliResponse.id}=true')"
												data-toggle="modal" data-target="#applicationBlockedModal" 
												onclick="applicationBlockedFirebase(${appliResponse.dispositivo.mOVDispositivoPK.pvcCodIMEI})">
										</c:when>
										<c:when test="${appliResponse.blocked==true}">
											<input type="checkbox" checked="checked"  onchange="applicationBlocked('${appliResponse.id}=false')"
												data-toggle="modal" data-target="#applicationBlockedModal"
												onclick="applicationBlockedFirebase(${appliResponse.dispositivo.mOVDispositivoPK.pvcCodIMEI})">
										</c:when>
										<c:otherwise>
										</c:otherwise>
									</c:choose>
								</td>
								<td>
									
									<input id="datetimepickerId"  type="text" class="form-control" size="16" onkeypress="return startTimeOnKeyPress(event)" 
									placeholder="12:00" value="${appliResponse.starTime}" onchange="startDate(this)" title="Time formate 24 hr. ( 12:00 , 13:00 )" >
								</td>
								<td>
									<input id="datetimepickerId" type="text" class="form-control" size="16" title="Time formate 24 hr. ( 12:00 , 13:00 )"
									 onkeypress="return endTimeOnKeyPress(event)"  placeholder="13:00" value="${appliResponse.endTime}"  onchange="endDate(this)" min="00:00" max="23:59">
								</td>
								<td>
									 <a	href="#"	class="btn btn-success custom-width" data-toggle="modal" data-target="#startAppliOnTimeModal"
									 	onclick="startAppliOnTime('${appliResponse.id}')">
										<i class="glyphicon glyphicon-time"></i>&nbsp;Actualizar
									</a>
								</td>
							</tr>
						</c:forEach>
					</tbody>
				</table>
				</div>
			</div>
		</div>
	</c:when>
	<c:otherwise>
		<div class="panel panel-default">
			<div class="panel-heading app-heading">
				<span class="lead"><i class="fa fa-table"></i>&nbsp;Lista de aplicaciones</span>
			</div>
			<div class="alert alert-info" style="margin: 10px;">
				<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
				<strong>Mensaje!</strong> No hay registros.
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
          <h4 class="modal-title">Aplicación Bloqueada</h4>
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
  
  
  
  
  
  
 <!-- Modal for  applicationInstallModal-->
  <div class="modal fade" id="applicationInstallModal" role="dialog" >
    <div class="modal-dialog modal-sm" >
      <div class="modal-content" style="background-color: #c6ecc6;">
        <div class="modal-header" style="background-color: #007b5e; color: white;">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Installation Application</h4>
        </div>
        <div class="modal-body">
           <h4 id="applicationInstallRes"></h4>
        </div>
        <div class="modal-footer getDevicePopUp">
          <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
  
  
  
 <!-- Modal for applicationUninstalllModal-->
  <div class="modal fade" id="applicationUninstallModal" role="dialog" >
    <div class="modal-dialog modal-sm" >
      <div class="modal-content" style="background-color: #c6ecc6;">
        <div class="modal-header" style="background-color: #007b5e; color: white;">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Uninstallation Application</h4>
        </div>
        <div class="modal-body">
           <h4 id="applicationUninstallRes"></h4>
        </div>
        <div class="modal-footer getDevicePopUp">
          <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
  
  
  
  
  
   <!-- Modal for update time -->
  <div class="modal fade" id="startAppliOnTimeModal" role="dialog" >
    <div class="modal-dialog modal-sm" >
      <div class="modal-content" style="background-color: #c6ecc6;">
        <div class="modal-header" style="background-color: #007b5e; color: white;">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Hora actualizada</h4>
        </div>
        <div class="modal-body">
        <!-- <h3 id="ffff">kkkk</h3> -->
           <h4 id="startAppliOnTimeRes"></h4>
        </div>
        <div class="modal-footer getDevicePopUp">
          <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
  
  <script type="text/javascript">
	$(document).ready( function () {
		$('#allApplicationTable').DataTable({
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
	});
</script>
