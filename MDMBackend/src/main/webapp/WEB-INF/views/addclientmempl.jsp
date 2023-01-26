<%@ page language="java" isErrorPage="false"
	contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>

<div class="panel panel-default">
	<div class="panel-heading app-heading">
		<span class="lead"><i class="fa fa-plus"></i>&nbsp; Empleado</span>
	</div>
	<form:form name="addMEmplForm" commandName="memplCmdAdd"
		action="add-mempl" method="POST" onsubmit="return addMEmpl2()">
		
		
		 <div class="row form-group" style="margin-top: 20px;">
			<div class="col-xs-12 col-sm-2 col-md-2"></div>
			<div class="col-xs-12 col-sm-2 col-md-2">
				<label class="control-label">Organización<font class="redFont">*</font></label>
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4">
				<form:hidden path="mOrga.mOrgaPK.finCodCli"/>
				<form:select path="mOrga.mOrgaPK.oRGAPinCODINT" class="form-control"
					 id="mOrgaSelect">
					<c:forEach var="client" items="${morgatlist}">
						<form:option value="${client.key}" label="${client.value}" />
					</c:forEach>
				</form:select>
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4">
				<p id="morgaError" class="redFont"></p>
			</div>
		</div> 
		
		<div class="row form-group" style="margin-top: 10px;">
			<div class="col-xs-12 col-sm-2 col-md-2"></div>
			<div class="col-xs-12 col-sm-2 col-md-2">
				<label class="control-label">Código empleado<font
					class="redFont">*</font></label>
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4">
				<form:input path="mEmplPK.eMPLPvcCODEMP" class="form-control"
					id="memplId" />
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4">
				<p id="memplError" class="redFont">${responseMessage}</p>
			</div>
		</div>

	
		<div class="row form-group" style="margin-top: 10px;">
			<div class="col-xs-12 col-sm-2 col-md-2"></div>
			<div class="col-xs-12 col-sm-2 col-md-2">
				<label class="control-label">Nombre Empleado</label>
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4">
				<form:input path="eMPLvcNOMEMP" class="form-control"
					id="vcNOMEMP" />
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4">
				<p id="vcNOMEMPError" class="redFont"></p>
			</div>
		</div>
		<div class="row form-group" style="margin-top: 10px;">
			<div class="col-xs-12 col-sm-2 col-md-2"></div>
			<div class="col-xs-12 col-sm-2 col-md-2">
				<label class="control-label">Ubicación<font
					class="redFont">*</font></label>
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4">
				<form:input path="eMPLvcUBIFIS" class="form-control"
					id="vcUBIFIS" />
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4">
				<p id="vcUBIFISError" class="redFont"></p>
			</div>
		</div>
		<div class="row form-group" style="margin-top: 10px;">
			<div class="col-xs-12 col-sm-2 col-md-2"></div>
			<div class="col-xs-12 col-sm-2 col-md-2">
				<label class="control-label">Estado<font
					class="redFont">*</font></label>
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4">
				<form:radiobutton path="eMPLbtEST" value="true" selected="selected" />
				Activo
				<form:radiobutton path="eMPLbtEST" value="false" />
				Inactivo
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4">
				<p id="cliEstError" class="redFont"></p>
			</div>
		</div>
		<div class="row form-group">
			<div class="col-xs-12 col-sm-2 col-md-2"></div>
			<div class="col-xs-12 col-sm-2 col-md-2">
				<label class="control-label">Fecha inicio<font
					class="redFont">*</font></label>
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4">
				<form:input path="eMPLdaFECINI" class="form-control"
					value="${currentDate}" id="date" placeholder="22-08-2018" />
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4">
				<p id="dateError" class="redFont"></p>
			</div>
		</div>
		
		<div class="row form-group">
			<div class="col-xs-12 col-sm-2 col-md-2"></div>
			<div class="col-xs-12 col-sm-2 col-md-2">
				<label class="control-label">Correo personal<font
					class="redFont">*</font></label>
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4">
				<form:input path="eMPLvcCORPER" class="form-control"
					 id="vcCORPER" />
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4">
				<p id="vcCORPERError" class="redFont"></p>
			</div>
		</div>
		<div class="row form-group">
			<div class="col-xs-12 col-sm-2 col-md-2"></div>
			<div class="col-xs-12 col-sm-2 col-md-2">
				<label class="control-label">Correo jefatura<font
					class="redFont">*</font></label>
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4">
				<form:input path="eMPLvcCORJFT" class="form-control"
					 id="vcCORJFT" />
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4">
				<p id="vcCORJFTError" class="redFont"></p>
			</div>
		</div>
		
		
		<div class="row form-group" style="display: none;">
			<div class="col-xs-12 col-sm-2 col-md-2"></div>
			<div class="col-xs-12 col-sm-2 col-md-2">
				<label class="control-label">CodInt<font
					class="redFont">*</font></label>
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4">
				<form:input path="eMPLCodInt2" class="form-control"
					 id="eMPLCodInt2" />
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4">
				<p id="eMPLCodInt2Error" class="redFont"></p>
			</div>
		</div>
		
		<div class="row form-group form-submit-button" style="margin-top: 30px;">
			<div class="col-xs-12 col-sm-2 col-md-2"></div>
			<div class="col-xs-12 col-sm-3 col-md-3">
				 <input type="submit" class="btn btn-success btn-block input-sm "
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