<%@ page language="java" isErrorPage="false"
	contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<div class="panel panel-default">
	<!-- Default panel contents -->
	<div class="panel-heading  app-heading">
		<span class="lead"><i class="fa fa-pencil-square-o"></i>&nbsp;Equipo </span>
	</div>
	<div class="edit-company" align="center">
		<form:form method="POST" commandName="editDeviceCmd" name="editDeviceForm"
			action="edit-device" onsubmit="return editDevice()">
			<div class="row form-group" style="margin-top: 20px;">
				<div class="col-xs-12 col-sm-2 col-md-2"></div>
				<div class="col-xs-12 col-sm-2 col-md-2">
					<label class="edit" for="focusedInput">IMEI<font class="redFont">*</font></label>
				</div>
				<div class="col-xs-12 col-sm-4 col-md-4">
					<form:hidden path="mOVDispositivoPK.finCodCli" value="${editDeviceData.mOVDispositivoPK.finCodCli}"/>
					<form:hidden path="mEmpl.mEmplPK.finCodCli" value="${editDeviceData.mOVDispositivoPK.finCodCli}"/>
					<form:input
						path="mOVDispositivoPK.pvcCodIMEI" class="form-control input-sm"
						readonly="true"
						value="${editDeviceData.mOVDispositivoPK.pvcCodIMEI}" />
				</div>
				<div class="col-xs-12 col-sm-4 col-md-4">
					<p  class="redFont"></p>
				</div>
			</div>
			<div class="row form-group" style="margin-top: 10px;">
					<div class="col-xs-12 col-sm-2 col-md-2"></div>
					<div class="col-xs-12 col-sm-2 col-md-2">
						<label class="edit" for="focusedInput">Equipo activo<font class="redFont">*</font></label>
					</div>
					<div class="col-xs-12 col-sm-4 col-md-4">
							<form:select path="btVig" class="form-control input-sm">
								<form:option value="true">Activo</form:option>
								<form:option value="false">Inactivo</form:option>
							</form:select>
					</div>
					<div class="col-xs-12 col-sm-4 col-md-4">
						<p  class="redFont"></p>
					</div>
			</div>
			<div class="row form-group" style="margin-top: 10px;">
				<div class="col-xs-12 col-sm-2 col-md-2"></div>
				<div class="col-xs-12 col-sm-2 col-md-2">
					<label class="edit" for="focusedInput">Modelo<font class="redFont">*</font></label>
				</div>
				<div class="col-xs-12 col-sm-4 col-md-4">
					<form:input path="finCodModDis.vcNom"
						class="form-control input-sm" readonly="true"
						value="${editDeviceData.finCodModDis.vcNom}" id="model" />
						<form:hidden path="finCodModDis.pinCod" value="${editDeviceData.finCodModDis.pinCod}"/>
				</div>
				<div class="col-xs-12 col-sm-4 col-md-4">
					<p class="redFont" id="modelError"></p>
				</div>
			</div>
			
			<%-- <div class="row form-group" style="margin-top: 10px;">
				<div class="col-xs-12 col-sm-2 col-md-2"></div>
				<div class="col-xs-12 col-sm-2 col-md-2">
					<label class="edit" for="focusedInput">finEst<font class="redFont">*</font></label>
				</div>
				<div class="col-xs-12 col-sm-4 col-md-4">
					<form:input path="finEst.pinCod"
						class="form-control input-sm"
						value="${editDeviceData.finEst.pinCod}" id="finEst" />
				</div>
				<div class="col-xs-12 col-sm-4 col-md-4">
					<p class="redFont" id="finEstError"></p>
				</div>
			</div> --%>
			
			<div class="row form-group" style="margin-top: 10px;">
				<div class="col-xs-12 col-sm-2 col-md-2"></div>
				<div class="col-xs-12 col-sm-2 col-md-2">
					<label class="edit" for="focusedInput">Fecha factura<font class="redFont">*</font></label>
				</div>
				<div class="col-xs-12 col-sm-4 col-md-4">
					<fmt:formatDate
						value="${editDeviceData.dtFecIng}" pattern="dd-MM-yyyy"
						var="myDate" /> <form:input path="dtFecIng"
						class="form-control input-sm" value="${myDate}" id="date" placeholder="27-07-2018"/>
				</div>
				<div class="col-xs-12 col-sm-4 col-md-4">
					<p class="redFont" id="dateError"></p>
				</div>
			</div>
			<div class="row form-group form-submit-button" style="margin-top: 30px;">
				<div class="col-xs-12 col-sm-2 col-md-2"></div>
				<div class="col-xs-12 col-sm-6 col-md-6">
					 <input type="submit" class="btn btn-success btn-block input-sm "
						value="Grabar">
					<input type="hidden"
						name="${_csrf.parameterName}" value="${_csrf.token}" />
						<input type="hidden" name="cToken" value="${sToken}"> 
				</div>
				<div class="col-xs-12 col-sm-4 col-md-4"></div>
			</div> 
		</form:form>
	</div>
</div>