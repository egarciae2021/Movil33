<%@ page language="java" isErrorPage="false"
	contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>

<c:choose>
	<c:when test="${allMEmpl.size()>0}">
		<div class="panel panel-default table-responsive-md">
			<div class="panel-heading  app-heading">
				<span class="lead"><i class="fa fa-table"></i>&nbsp;Lista de Empleados</span>
			</div>
			<div class="panel-body">
			<div style="padding:10px ; border:0px solid black;overflow-x:auto;">
				<table id="allMEmplTable" class="table table-hover table-condensed table-responsive text-nowrap">
					<thead>
						<tr >
							<th>#</th>
							<th>Id</th>
							<%--<th>Código Área</th> --%>
							<th>Nombre Empleado</th>
							<th>Ubicación</th>
							<th>Correo Personal</th>
							<th>Correo Jefatura</th>
							<th>Fecha Inicio</th>
							<th>Estado</th>
							<%--<th>CodIntT</th> --%>
							<th>Acción</th>
							<th>Acción</th>
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
								<%--<td>${emplResponse.mOrga.mOrgaPK.oRGAPinCODINT}</td> --%>
								<td>${emplResponse.eMPLvcNOMEMP}</td>
								<td>${emplResponse.eMPLvcUBIFIS}</td>
								<td>${emplResponse.eMPLvcCORPER}</td>
								<td>${emplResponse.eMPLvcCORJFT}</td>
								<fmt:formatDate	value="${emplResponse.eMPLdaFECINI}" pattern="dd-MM-yyyy"
																		var="myDate" />
								<td>${myDate}</td>
								<td>
									<c:choose>
										<c:when test="${emplResponse.eMPLbtEST==true}">
											Activo
										</c:when>
										<c:otherwise>
											Inactivo
										</c:otherwise>
									</c:choose>
								</td>
								<%--<td>${emplResponse.eMPLCodInt2}</td>--%>
								<td><a
									href="<c:url value='/edit-memplp?id=${emplResponse.mEmplPK.eMPLPvcCODEMP}' />"
									class="btn btn-success custom-width"><i class="fa fa-edit"></i>&nbsp;Editar</a></td>
								<td><a
									href="<c:url value='/all-devices-id?id=${emplResponse.mEmplPK.eMPLPvcCODEMP}' />"
									class="btn btn-success custom-width"><i class="fa fa-eye">&nbsp;</i>Ver dispositivos</a></td>
								<td>
									<c:choose>
										<c:when test="${emplResponse.eMPLbtEST==true}">
											<a	href="<c:url value='/delete-mempl?id=${emplResponse.mEmplPK.eMPLPvcCODEMP}' />"
											class="btn btn-danger custom-width"><i class="fa fa-trash-o"></i>&nbsp;Eliminar</a>
										</c:when>
										<c:otherwise>
										</c:otherwise>
									</c:choose>
									
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
				<span class="lead"><i class="fa fa-table"></i>&nbsp;Lista de Empleados </span>
			</div>
			<div class="alert alert-info" style="margin: 10px;">
				<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
				<strong>Info!</strong> No hay registros.
			</div>
		</div>
	</c:otherwise>
</c:choose>
<script type="text/javascript">
	$(document).ready( function () {
		$('#allMEmplTable').DataTable({
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
		$("#menu_inicio_empleados").parent().parent().addClass("active-sub active");
		$("#menu_inicio_empleados").addClass("active-link");
	});
</script>