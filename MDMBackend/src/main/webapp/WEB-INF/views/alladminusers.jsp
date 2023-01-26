<%@ page language="java" isErrorPage="false"
	contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>

<c:choose>
	<c:when test="${allUsers.size()>0}">
	<div class="panel panel-default table-responsive-md">
	<div class="panel-heading app-heading">
		<span class="lead"><i class="fa fa-table"></i>&nbsp;Lista de Usuarios</span>
	</div>
	<div class="panel-body" >
		<div style="padding:10px ; border:0px solid black;overflow-x:auto;">
		<table id="allAdminUserTable" class="table table-hover table-condensed table-responsive text-nowrap" >
		<thead>
			<tr>
				<th scope="col">#</th>
				<th scope="col">ID</th>
				<th scope="col">Nombre</th>
				<th scope="col">Usuario</th>
				<th scope="col">CodInt</th>
				<th scope="col">Correo</th>
				<th scope="col">Guid Active Directory</th>
				<th scope="col">Estado</th>
				<th scope="col">Chat</th>
				<th scope="col">CorreoBK</th>
				<th scope="col">Imagen</th>
				<th >Acción</th>
				<th>Acción</th>
			</tr>
		</thead>
		<tbody>
			<%int count = 1;%>
			<c:forEach items="${allUsers}" var="userResponse">
				<tr class="form-submit-button">
					<td><%=count++%>.</td>
					<td>${userResponse.sEGUsuarioPK.pinCod}</td>
					<td>${userResponse.vcNom}</td>
					<td>${userResponse.vcUsu}</td>
					<td>${userResponse.fvcCodInt}</td>
					<td>${userResponse.correo}</td>
					<td>${userResponse.guidAD}</td>
					<td>${userResponse.btEst}</td>
					<td>${userResponse.chatActivo}</td>
					<td>${userResponse.correoBK}</td>
					<td>
						
						<img src="${userResponse.image}" height="50px" width="50px"/> 
					</td>
					<td><a
						href="<c:url value='/edit-user?id=${userResponse.sEGUsuarioPK.pinCod}'/>"
						class="btn btn-success custom-width "><i class="fa fa-edit"></i>&nbsp;Edit</a></td>
					<td>
						<c:choose>
							<c:when test="${userResponse.btEst=='true'}">
								<a	href="<c:url value='/delete-user?id=${userResponse.sEGUsuarioPK.pinCod}'/>"
									class="btn btn-danger custom-width"><i class="fa fa-trash-o"></i>&nbsp;Remove</a>
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
				<span class="lead"><i class="fa fa-table"></i>&nbsp;List of Admin User</span>
			</div>
			<div class="alert alert-info" style="margin: 10px;">
				<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
				<strong>Info!</strong> records not found.
			</div>
		</div>
	</c:otherwise>
</c:choose>

<script type="text/javascript">
	$(document).ready( function () {
		$('#allAdminUserTable').DataTable();
	});
</script>