<%@ page language="java" isErrorPage="false"
	contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>


<div class="panel panel-default">
	<!-- Default panel contents -->
	<div class="panel-heading  app-heading admin-page-heading" style="padding: 15px;">
		<div><span class="lead"><i class="fa fa-dashboard"></i>&nbsp;Dashboard</span>
			<a class="pull-right" href="admin">
             	<i style="font-size:30px;" class="fa fa-refresh"></i>
       		</a>
		</div>
	</div>
	<div class="panel-group mdm-admin-panel-group">
		<div class="row">
		<%-- 	<div class="col-xs-12 col-sm-4 col-md-4">
				<div class="panel panel-default panel1">
		      		<div class="panel-heading">
		      			<div><i class="fa fa-group"></i>
		      				Clientes
		      			</div>
		      		</div>
		      		<div class="panel-body">
		      			<div><span style="font-size:30px;">${adminPanel.clients}</span></div>
		      		</div>
		      		<div class="panel-footer"><i  class="fa fa-long-arrow-right"></i> </div>
		   		</div>
			</div> --%>
			<div class="col-xs-12 col-sm-4 col-md-4">
				<div class="panel panel-default panel4">
		      		<div class="panel-heading">
		      			<div><i class="fa fa-globe"></i>
		      				Organisation
		      			</div>
		      		</div>
		      		<div class="panel-body">
						<span style="font-size:30px;">${adminPanel.orga}</span>
		      		</div>
		      		<div class="panel-footer">
		      			<i  class="fa fa-long-arrow-right"></i> 
		      		</div>
		   		</div>
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4">
				<div class="panel panel-default panel2">
		      		<div class="panel-heading">
		      			<div>
		      				<i class="fa fa-mobile-phone"></i>&nbsp;Devices
		      			</div>
		      		</div>
		      		<div class="panel-body"><span style="font-size:30px;">${adminPanel.devices}</span></div>
		      		<div class="panel-footer"><i  class="fa fa-long-arrow-right"></i> </div>
		    	</div>
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4">
				<div class="panel panel-default panel3">
		     		<div class="panel-heading">
		     			<div>
		     				<i class="fa fa-group"></i>&nbsp;Employees
		     			</div>
		     		</div>
		      		<div class="panel-body"><span style="font-size:30px;">${adminPanel.mepls}</span></div>
		      		<div class="panel-footer"><i  class="fa fa-long-arrow-right"></i> </div>
		   		 </div>
			</div>
		</div>
		<div class="row">
		
			<div class="col-xs-12 col-sm-4 col-md-4">
				<div class="panel panel-default panel5">
		      		<div class="panel-heading">
		      			<div>
		      				<i class="fa fa-hdd-o"></i>
		      				Application
		      			</div>
		      		</div>
		      		<div class="panel-body">
						<span style="font-size:30px;">${adminPanel.users}</span>
					</div>
		      		<div class="panel-footer">
		      			<i  class="fa fa-long-arrow-right"></i> 
		      		</div>
		    	</div>
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4">
				<div class="panel panel-default panel6">
		     		<div class="panel-heading">
		     			<div>
		     				<i class="fa fa-file-text-o"></i>&nbsp;Users
		     			</div>
		     		</div>
		      		<div class="panel-body">
		      			<div>
							<span style="font-size:30px;">${adminPanel.users}</span>
						</div>
		      		</div>
		      		<div class="panel-footer">
		      			<i  class="fa fa-long-arrow-right"></i> 
		      		</div>
		   		 </div>
			</div>
		</div>
  	</div>
</div>