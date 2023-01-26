<%@ page language="java" isErrorPage="false"
	contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>

<div class="panel panel-default">
	<div class="panel-heading  app-heading">
		<span class="lead"><i class="fa fa-search"></i>&nbsp;Cliente</span>
	</div>
	<div style="margin: 20px;">
		<p id="idError" style="color: red">${responseMessage}</p>
		<form name="searchByIdClientForm" action="search-by-id-client"
			onsubmit="return searchByIdClient()">
			<div class="input-group" style="width: 33%">
				<input type="text" class="form-control input-group-lg"
					placeholder="Buscar" name="id">
				<div class="input-group-btn">
					<button style="padding: 9px" class="btn btn-default" type="Search">
						<i class="glyphicon glyphicon-search"></i>
					</button>
				</div>
			</div>
		</form>
	</div>
	<hr>
	<c:if test="${genClientData!=null}">
		<table class="table table-hover">
			<thead>
				<tr>
					<th>Nro.</th>
					<th>Id Cliente</th>
					<th>Nombre</th>
					<th>Estado</th>
					<th colspan="3"></th>

				</tr>
			</thead>
			<tbody>
				<tr class="form-submit-button">
					<td>1.</td>
					<td>${genClientData.pinCodCli}</td>
					<td>${genClientData.vcNomCli}</td>
					<td>${genClientData.btEst}</td>
					<td><a
						href="<c:url value='/edit-genclient?id=${genClientData.pinCodCli}'/>"
						class="btn btn-success custom-width"><i class="fa fa-edit"></i>&nbsp;Editar</a></td>
					<td><a
						href="<c:url value='/find-morga-id?id=${genClientData.pinCodCli}'/>"
						class="btn btn-success custom-width"><i class="fa fa-eye"></i>&nbsp;Ver Organización</a></td>
					<td>
						<c:choose>
							<c:when test="${genClientData.btEst==1}">
								<a href="<c:url value='/delete-genclient?id=${genClientData.pinCodCli}'/>"
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
		$("#menu_busqueda_cliente").parent().parent().addClass("active-sub active");
		$("#menu_busqueda_cliente").addClass("active-link");
	});
</script>