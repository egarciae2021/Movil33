<%@ page language="java" isErrorPage="false"
	contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>

<div class="panel panel-default">
	<!-- Default panel contents -->
	<div class="panel-heading  app-heading">
		<span class="lead"><i class="fa fa-pencil-square-o"></i>&nbsp;Organización </span>
	</div>
	
	<div class="edit-company" align="center">
		<form:form method="POST" commandName="mOrgaDTO" name="editMOrgaForm" action="edit-morga"
			onsubmit="return editMOrga()">
			
		<div class="row form-group" style="margin-top: 20px;">
			<div class="col-xs-12 col-sm-2 col-md-2"></div>
			<div class="col-xs-12 col-sm-2 col-md-2">
				<label class="edit" for="focusedInput">ID:<font class="redFont">*</font></label>
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4">
				<form:hidden path="mOrgaPK.finCodCli" value="${edit_morga.mOrgaPK.finCodCli}" />
				<form:input path="mOrgaPK.oRGAPinCODINT" class="form-control input-sm"
							value="${edit_morga.mOrgaPK.oRGAPinCODINT}" id="id" readonly="true"/>
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4">
				<p class="redFont" id="idError"></p>
			</div>
		</div>
		
		<div class="row form-group" style="margin-top: 10px;">
			<div class="col-xs-12 col-sm-2 col-md-2"></div>
			<div class="col-xs-12 col-sm-2 col-md-2">
				<label class="edit" for="focusedInput">Código:<font class="redFont">*</font></label>
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4">
				<form:input path="oRGAvcCODORG" class="form-control input-sm"
						id="oRGAvcCODORG"	value="${edit_morga.oRGAvcCODORG}"  />
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4">
				<p class="redFont" id="oRGAvcCODORGError"></p>
			</div>
		</div>
		
		<div class="row form-group" style="margin-top: 10px;">
			<div class="col-xs-12 col-sm-2 col-md-2"></div>
			<div class="col-xs-12 col-sm-2 col-md-2">
				<label class="edit" for="focusedInput">Nombre:</label>
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4">
				<form:input path="oRGAvcNOMORG" class="form-control input-sm"
							value="${edit_morga.oRGAvcNOMORG}" id="oRGAvcNOMORG" />
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4">
				<p class="redFont" id="oRGAvcNOMORGError"></p>
			</div>
		</div>
		
		<div class="row form-group" style="margin-top: 10px;">
			<div class="col-xs-12 col-sm-2 col-md-2"></div>
			<div class="col-xs-12 col-sm-2 col-md-2">
				<label class="edit" for="focusedInput">Correo personal:<font class="redFont">*</font></label>
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4">
				<form:input path="oRGAvcCORPER" class="form-control input-sm"
							value="${edit_morga.oRGAvcCORPER}" id="oRGAvcCORPER" />
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4">
				<p class="redFont" id="oRGAvcCORPERError"></p>
			</div>
		</div>
		
		<div class="row form-group" style="margin-top: 10px;">
			<div class="col-xs-12 col-sm-2 col-md-2"></div>
			<div class="col-xs-12 col-sm-2 col-md-2">
				<label class="edit" for="focusedInput">Correo jefatura:<font class="redFont">*</font></label>
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4">
				<form:input path="oRGAvcCORJFT" class="form-control input-sm"
							value="${edit_morga.oRGAvcCORJFT}" id="oRGAvcCORJFT" />
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4">
				<p class="redFont" id="oRGAvcCORJFTError"></p>
			</div>
		</div>
		<div class="row form-group" style="margin-top: 10px;">
			<div class="col-xs-12 col-sm-2 col-md-2"></div>
			<div class="col-xs-12 col-sm-2 col-md-2">
				<label class="edit" for="focusedInput">Fecha Inicio:<font class="redFont">*</font></label>
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4">
				<fmt:formatDate	value="${edit_morga.oRGAdaFECINI}" pattern="dd-MM-yyyy"
							var="myDate" />
					 <form:input path="oRGAdaFECINI"
							class="form-control input-sm" value="${myDate}" id="date" placeholder="27-07-2018"/>
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4">
				<p class="redFont" id="dateError"></p>
			</div>
		</div>
		
		 <div class="row form-group" style="margin-top: 10px;">
			<div class="col-xs-12 col-sm-2 col-md-2"></div>
			<div class="col-xs-12 col-sm-2 col-md-2">
				<label class="edit" for="focusedInput">Estado:<font class="redFont">*</font></label>
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4">
				<form:select path="oRGAbtEST" class="form-control input-sm">
               		 <form:option value="True">Activo</form:option>
                	<form:option value="False">Inactivo</form:option>
                </form:select>
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4">
				<p class="redFont"></p>
			</div>
		</div>
		
		
		<div class="row form-group" style="margin-top: 10px;">
			<div class="col-xs-12 col-sm-2 col-md-2"></div>
			<div class="col-xs-12 col-sm-2 col-md-2">
				<label class="edit" for="focusedInput">CodInt:<font class="redFont">*</font></label>
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4">
				<form:input path="oRGACodInt2" class="form-control input-sm"
							value="${edit_morga.oRGACodInt2}" id="oRGACodInt2" />
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4">
				<p class="redFont" id="oRGACodInt2Error"></p>
			</div>
		</div>
		
		
		
		<div class="row form-group form-submit-button" style="margin-top: 30px;">
				<div class="col-xs-12 col-sm-2 col-md-2"></div>
				<div class="col-xs-12 col-sm-3 col-md-3">
					 <input type="submit" class="btn btn-success btn-block input-sm"
						value="Grabar">
					<input type="hidden"
						name="${_csrf.parameterName}" value="${_csrf.token}" />
						<input type="hidden" name="cToken" value="${sToken}"> 
				</div>
				<div class="col-xs-12 col-sm-3 col-md-3">
					<form:button type="reset" class="btn btn btn-danger btn-block input-sm">Cancelar</form:button>
				</div>
				<div class="col-xs-12 col-sm-4 col-md-4"></div>
			</div> 
		</form:form>
	</div>
</div>