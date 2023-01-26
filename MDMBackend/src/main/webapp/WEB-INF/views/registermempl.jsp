<%@ page language="java" isErrorPage="false"
	contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"  %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>

<div class="panel panel-default">
	<!-- Default panel contents -->
	<div class="panel-heading  app-heading">
		<span class="lead"><i class="fa fa-plus"></i>&nbsp;Nuevo Empleado</span>
	</div>
	<div class="edit-company" align="center">
		<form:form method="POST" commandName="mEmplCmd" action="add-admin-mempl" name="newMEmplForm"
			onsubmit="return newMEmpl()">
			<div class="row form-group" style="margin-top: 10px;">
				<div class="col-xs-12 col-sm-2 col-md-2"></div>
				<div class="col-xs-12 col-sm-2 col-md-2">
					
					<label class="edit" for="focusedInput">Código<font class="redFont">*</font></label>
				</div>
				<div class="col-xs-12 col-sm-4 col-md-4">
					<form:hidden path="mOrga.mOrgaPK.finCodCli" value="6"/>
						<form:hidden path="mOrga.mOrgaPK.oRGAPinCODINT" value="8" />
					<form:input path="mEmplPK.eMPLPvcCODEMP"
						 class="form-control input-sm"  id="oRGAPinCODINT" />
				</div>
					<div class="col-xs-12 col-sm-4 col-md-4">
						<p class="redFont" id="oRGAPinCODINTError"></p>
					</div>
			</div>
			<div class="row form-group" style="margin-top: 10px;">
				<div class="col-xs-12 col-sm-2 col-md-2"></div>
				<div class="col-xs-12 col-sm-2 col-md-2">
					<label class="edit" for="focusedInput">Nombre</label>
				</div>
				<div class="col-xs-12 col-sm-4 col-md-4">
					<form:input path="eMPLvcNOMEMP"
							class="form-control input-sm"  id="eMPLvcNOMEMP"/>
				</div>
					<div class="col-xs-12 col-sm-4 col-md-4">
						<p class="redFont" id="eMPLvcNOMEMPError"></p>
					</div>
			</div>
			<div class="row form-group" style="margin-top: 10px;">
				<div class="col-xs-12 col-sm-2 col-md-2"></div>
				<div class="col-xs-12 col-sm-2 col-md-2">
					<label class="edit" for="focusedInput">Ubicación<font class="redFont">*</font></label>
				</div>
				<div class="col-xs-12 col-sm-4 col-md-4">
					<form:input path="eMPLvcUBIFIS"
							class="form-control input-sm" id="eMPLvcUBIFIS"/>
				</div>
					<div class="col-xs-12 col-sm-4 col-md-4">
						<p class="redFont" id="eMPLvcUBIFISError"></p>
					</div>
			</div>
			<div class="row form-group" style="margin-top: 10px;">
				<div class="col-xs-12 col-sm-2 col-md-2"></div>
				<div class="col-xs-12 col-sm-2 col-md-2">
					<label class="edit" for="focusedInput">Correo Personal<font class="redFont">*</font></label>
				</div>
				<div class="col-xs-12 col-sm-4 col-md-4">
					<form:input path="eMPLvcCORPER"
							class="form-control input-sm"  id="eMPLvcCORPER"/>
				</div>
					<div class="col-xs-12 col-sm-4 col-md-4">
						<p class="redFont" id="eMPLvcCORPERError"></p>
					</div>
			</div>
			<div class="row form-group" style="margin-top: 10px;">
				<div class="col-xs-12 col-sm-2 col-md-2"></div>
				<div class="col-xs-12 col-sm-2 col-md-2">
					<label class="edit" for="focusedInput">Correo Jefatura<font class="redFont">*</font></label>
				</div>
				<div class="col-xs-12 col-sm-4 col-md-4">
					<form:input path="eMPLvcCORJFT"
							class="form-control input-sm" id="eMPLvcCORJFT" />
				</div>
					<div class="col-xs-12 col-sm-4 col-md-4">
						<p class="redFont" id="eMPLvcCORJFTError"></p>
					</div>
			</div>
			
			<div class="row form-group" style="margin-top: 10px;">
				<div class="col-xs-12 col-sm-2 col-md-2"></div>
				<div class="col-xs-12 col-sm-2 col-md-2">
					<label class="edit" for="focusedInput">Fecha Inicio<font class="redFont">*</font></label>
				</div>
				<div class="col-xs-12 col-sm-4 col-md-4">
				<%-- 	<fmt:formatDate	value="${currentDate}" pattern="dd-MM-yyyy"
																		var="myDate" /> --%>
					 <form:input path="eMPLdaFECINI"
							class="form-control input-sm" value="${currentDate}"  id="date" placeholder="27-07-2018"/>
				</div>
				<div class="col-xs-12 col-sm-4 col-md-4">
						<p class="redFont" id="dateError"></p>
				</div>
			</div>
			<div class="row form-group" style="margin-top: 10px;">
				<div class="col-xs-12 col-sm-2 col-md-2"></div>
				<div class="col-xs-12 col-sm-2 col-md-2">
					<label class="edit" for="focusedInput">Estado<font class="redFont">*</font></label>
				</div>
				<div class="col-xs-12 col-sm-4 col-md-4">
					<form:select path="eMPLbtEST" class="form-control input-sm" >
						<form:option value="True">True</form:option>
						<form:option value="False">False</form:option>
					</form:select>
				</div>
					<div class="col-xs-12 col-sm-4 col-md-4">
						<p class="redFont"></p>
					</div>
			</div>
			<div class="row form-group" style="margin-top: 10px;">
				<div class="col-xs-12 col-sm-2 col-md-2"></div>
				<div class="col-xs-12 col-sm-2 col-md-2">
					<label class="edit" for="focusedInput">CodInt</label>
				</div>
				<div class="col-xs-12 col-sm-4 col-md-4">
					<form:input path="eMPLCodInt2"
							class="form-control input-sm"  />
				</div>
					<div class="col-xs-12 col-sm-4 col-md-4">
						<p class="redFont"></p>
					</div>
			</div>
			
			<div class="row form-group form-submit-button" style="margin-top: 10px;">
				<div class="col-xs-12 col-sm-2 col-md-2"></div>
				<div class="col-xs-12 col-sm-3 col-md-3">
					 <input type="submit" class="btn btn-success btn-block input-sm"
						value="Grabar">
					<input type="hidden"
						name="${_csrf.parameterName}" value="${_csrf.token}" />
				</div>
				<div class="col-xs-12 col-sm-3 col-md-3">
					<!-- <input type="reset" class="btn btn btn-danger btn-block input-sm" value="Cancle"> -->
					<form:button type="reset" class="btn btn btn-danger btn-block input-sm">Cancelar</form:button>
				</div>
				<div class="col-xs-12 col-sm-4 col-md-4"></div>
			</div> 
		</form:form>
	</div>
</div>