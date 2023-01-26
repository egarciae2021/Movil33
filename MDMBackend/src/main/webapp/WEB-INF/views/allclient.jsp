<%@ page language="java" isErrorPage="false"
	contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<c:choose>
	<c:when test="${allClientList.size()>0}">
		<div class="panel panel-default table-responsive-md" >
			<div class="panel-heading app-heading">
				<span class="lead"><i class="fa fa-table"></i>&nbsp;Lista de Clientes</span>
			</div>
			<div style="padding:10px ; border:0px solid black;overflow-x:auto;">
			<table id="allClientTable" >
				<thead>
					<tr>			
							<th>#</th>
							<th>IdCliente</th>
							<th>Nombre</th>
							<th>Estado</th>
							<th>RUC</th>
							<th>Dirección</th>
							<th>IdCultura</th>
							<th>Logo</th>
							<th>Acción</th>
							<th>Acción</th>
							<th>Acción</th>
							
							
					</tr>
				</thead>
				<tbody>
					<%
						int count = 1;
					%>
						<c:forEach items="${allClientList}" var="clientResponse">
							 <tr class="form-submit-button">
								<td><%=count++%>.</td>
								<td>${clientResponse.pinCodCli}</td>
								<td>${clientResponse.vcNomCli}</td>
								<td>${clientResponse.btEst}</td>
								<td>${clientResponse.vcRuc}</td>
								<td>${clientResponse.vcDireccion}</td>
								<td>${clientResponse.inIdCultura.pinCodCul}</td>
								<td>	
									<img src="${clientResponse.image}" height="50px" width="50px">
								
								</td>
								
								<td><a
										href="<c:url value='/edit-genclient?id=${clientResponse.pinCodCli}' />"
										class="btn btn-success custom-width "><i class="fa fa-edit">&nbsp;Editar</i></a></td>
								<td><a
										href="<c:url value='/all-morga-id?id=${clientResponse.pinCodCli}'/>"
										class="btn btn-success custom-width"><i class="fa fa-eye"></i>&nbsp;Ver organización</a></td>
								<td>
									<c:choose>
										<c:when test="${clientResponse.btEst==1}">
											<a	href="<c:url value='/delete-genclient?id=${clientResponse.pinCodCli}' />"
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
	</c:when>
	<c:otherwise>
		<div class="panel panel-default">
			<div class="panel-heading app-heading">
				<span class="lead"><i class="fa fa-table"></i>&nbsp;Lista de Clientes </span>
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
				$('#allClientTable').DataTable({
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
				$("#menu_inicio_cliente").parent().parent().addClass("active-sub active");
				$("#menu_inicio_cliente").addClass("active-link");
			});
			
</script>