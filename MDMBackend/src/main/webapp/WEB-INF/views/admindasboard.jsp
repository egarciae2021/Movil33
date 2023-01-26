<%@ page language="java" isErrorPage="false"
	contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>



<!--
	<div class="panel panel-default table-responsive-md" >
		<div class="panel-heading app-heading">
			<span class="lead"><i class="fa fa-table"></i>&nbsp;Lista de Clientes</span>
		</div>
	</div>
-->
<div class="panel panel-default">
		<div class="panel-heading app-heading">
				<span class="lead"><i class="fa fa-dashboard"></i>&nbsp;Dashboard</span>
			</div>
	<div class="panel-group mdm-admin-panel-group">
		<div class="row">
			<div class="col-xs-12 col-sm-6">
				<a href="all-morga">
					<div class="panel panel-default panel1">
						<div class="panel-heading">
							<div><i class="fa fa-group"></i>
								Organización
							</div>
						</div>
						<div class="panel-body">
							<div>
								<span style="font-size:30px;">
									${adminPanel.orga}
								</span>
							</div>
						</div>
						<div class="panel-footer"></div>
				   </div>
				</a>
			</div>
			<div class="col-xs-12 col-sm-6">
				<a href="all-mempl">
					<div class="panel panel-default panel2">
						<div class="panel-heading">
							<div>
								<i class="fa fa-mobile-phone"></i>&nbsp;Empleados
							</div>
						</div>
						<div class="panel-body"><span style="font-size:30px;">${adminPanel.mepls}</span></div>
						<div class="panel-footer"></div>
					</div>
				</a>
			</div>
		</div>
		<div class="row">

			<div class="col-xs-12 col-sm-6">
				<a href="all-devices">
					<div class="panel panel-default panel3">
						<div class="panel-heading">
							<div>
								<i class="fa fa-group"></i>&nbsp;Equipos
							</div>
						</div>
						<div class="panel-body"><span style="font-size:30px;">${adminPanel.devices}</span></div>
						<div class="panel-footer"></div>
					</div>
				</a>
			</div>
			<div class="col-xs-12 col-sm-6">
				<a href="all-client-user">
					<div class="panel panel-default panel6">
						<div class="panel-heading">
							<div>
								<i class="fa fa-file-text-o"></i>&nbsp;Usuarios
							</div>
						</div>
						<div class="panel-body">
							<div>
								<span style="font-size:30px;">${adminPanel.users}</span>
							</div>
						</div>
						<div class="panel-footer">
						</div>
					</div>
				</a>
			</div>
		</div>
  	</div>
</div>