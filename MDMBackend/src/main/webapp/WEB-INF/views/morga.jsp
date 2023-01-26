<%@ page language="java" isErrorPage="false"
	contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>

<div class="panel panel-default">
	<div class="panel-heading  app-heading">
		<span class="lead"><i class="fa fa-search"></i>&nbsp;Organización </span>
	</div>
	<div style="margin: 20px;">
		<p id="searchByIdOrgaId" style="color: red">${MOrgaMessage}</p>
		<form onsubmit="return searchByIdOrgaValidateForm()"
			action="search-by-id-morga" name="searchByIdOrgaForm">
			<div class="input-group" style="width: 33%">
				<input type="text" class="form-control input-group-lg"
					placeholder="Buscar" name="mOrgaId">
				<div class="input-group-btn">
					<button style="padding: 9px" class="btn btn-default" type="Search">
						<i class="glyphicon glyphicon-search"></i>
					</button>
				</div>
			</div>
		</form>
	</div>
	<hr>
	<c:if test="${searchByIdOrga!=null}">
		<table class="table table-hover">
			<thead>
				<tr>
					<th scope="col">#</th>
					<th scope="col">Id Organización</th>
					<th scope="col">Código</th>
					<th scope="col">Nombre</th>
					<th scope="col">Correo Personal</th>
					<th scope="col">Correo Jefatura</th>
					<th scope="col">Fecha Inicio</th>
					<th scope="col">Estado</th>
					<th scope="col">CodInt</th>
					<th colspan="4" style="text-align: center;">Acción</th>
				</tr>
			</thead>
			<tbody>
					<tr class="form-submit-button">
					<td><%=1%>.</td>
					<td>${searchByIdOrga.mOrgaPK.oRGAPinCODINT}</td>
					<td>${searchByIdOrga.oRGAvcCODORG}</td>
					<td>${searchByIdOrga.oRGAvcNOMORG}</td>
					<td>${searchByIdOrga.oRGAvcCORPER}</td>
					<td>${searchByIdOrga.oRGAvcCORJFT}</td>
					<%-- <td>${searchByIdOrga.oRGAdaFECINI}</td> --%>
					
					<fmt:formatDate	value="${searchByIdOrga.oRGAdaFECINI}" pattern="dd-MM-yyyy"
																		var="myDate" />
					<td>${myDate}</td>
					<td>${searchByIdOrga.oRGAbtEST}</td>
					<td>${searchByIdOrga.oRGACodInt2}</td>
					<td><a
						href="<c:url value='/edit-morga?id=${searchByIdOrga.mOrgaPK.oRGAPinCODINT}' />"
						class="btn btn-success custom-width "><i class="fa fa-edit"></i>&nbsp;Editar</a></td>
					<td><a
						href="<c:url value='/all-mempl-id?id=${searchByIdOrga.mOrgaPK.oRGAPinCODINT}'/>"
						class="btn btn-success custom-width"><i class="fa fa-eye"></i>&nbsp;Ver Empleados</a></td>
					<td>
						<c:choose>
							<c:when test="${searchByIdOrga.oRGAbtEST=='true'}">
								<a	href="<c:url value='/delete-morga?id=${searchByIdOrga.mOrgaPK.oRGAPinCODINT}' />"
									class="btn btn-danger custom-width"><i class="fa fa-trash-o"></i>&nbsp;Eliminar</a>
							</c:when>
							<c:otherwise>
							</c:otherwise>
						</c:choose>
					</td>
				</tr>
			</tbody>
		</table>
	</c:if>
</div>
<script type="text/javascript">
	$(document).ready( function () {
		$("#mainnav-menu li").removeClass("active-sub active");
		$("#mainnav-menu li").removeClass("active-link");
		$("#menu_busqueda_organizacion").parent().parent().addClass("active-sub active");
		$("#menu_busqueda_organizacion").addClass("active-link");
	});
</script>