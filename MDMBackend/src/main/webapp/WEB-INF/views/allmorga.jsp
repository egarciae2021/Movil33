<%@ page language="java" isErrorPage="false"
	contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>

<c:choose>
	<c:when test="${MOrga.size()>0}">
<div class="panel panel-default">
	<div class="panel-heading app-heading">
		<span class="lead"><i class="fa fa-table"></i>&nbsp;Lista de Organización </span>
	</div>
	<div class="panel-body">
	<div style="padding:10px ; border:0px solid black; overflow-x:auto;">
		<table id="allMOrgaTable" class="table table-hover table-condensed table-responsive text-nowrap">
		<thead>
			<tr>
				<th scope="col">#</th>
				<th scope="col">Id</th>
				<th scope="col">Código</th>
				<th scope="col">Nombre</th>
				<th scope="col">Correo Personal</th>
				<th scope="col">Correo Jefatura</th>
				<th scope="col">Fecha Inicio</th>
				<th scope="col">Estado</th>
				<th scope="col">CodInt</th>
				<!-- <th colspan="4" style="text-align: center;">Action</th> -->
				<th>Acción</th>
				<th>Acción</th>
				<th>Acción</th>
			</tr>
		</thead>
		<tbody>
			<%int count = 1;%>
			<c:forEach items="${MOrga}" var="orgaResponse">
				<tr class="form-submit-button">
					<td><%=count++%>.</td>
					<td>${orgaResponse.mOrgaPK.oRGAPinCODINT}</td>
					<td>${orgaResponse.oRGAvcCODORG}</td>
					<td>${orgaResponse.oRGAvcNOMORG}</td>
					<td>${orgaResponse.oRGAvcCORPER}</td>
					<td>${orgaResponse.oRGAvcCORJFT}</td>
					<fmt:formatDate	value="${orgaResponse.oRGAdaFECINI}" pattern="dd-MM-yyyy"
																		var="myDate" />
					<td>${myDate}</td>
					<td>
						<c:choose>
							<c:when test="${orgaResponse.oRGAbtEST=='true'}">
								Activo
							</c:when>
							<c:otherwise>
								Inactivo
							</c:otherwise>
						</c:choose>
					</td>
					<td>${orgaResponse.oRGACodInt2}</td>
					<td><a
						href="<c:url value='/edit-morga?id=${orgaResponse.mOrgaPK.oRGAPinCODINT}' />"
						class="btn btn-success custom-width "><i class="fa fa-edit"></i>&nbsp;Editar</a></td>
					<td><a
						href="<c:url value='/all-mempl-id?id=${orgaResponse.mOrgaPK.oRGAPinCODINT}'/>"
						class="btn btn-success custom-width"><i class="fa fa-eye"></i>&nbsp;Ver Empleados</a></td>
					<td>
						<c:choose>
							<c:when test="${orgaResponse.oRGAbtEST=='true'}">
								<a	href="<c:url value='/delete-morga?id=${orgaResponse.mOrgaPK.oRGAPinCODINT}' />"
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
				<span class="lead"><i class="fa fa-table"></i>&nbsp;Lista de Organización</span>
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
		$('#allMOrgaTable').DataTable({
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
		$("#menu_inicio_organizacion").parent().parent().addClass("active-sub active");
		$("#menu_inicio_organizacion").addClass("active-link");
	});
</script>