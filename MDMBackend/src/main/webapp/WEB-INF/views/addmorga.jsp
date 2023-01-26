<%@ page language="java" isErrorPage="false"
	contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>

<div class="panel panel-default">
	<div class="panel-heading app-heading">
		<span class="lead"><i class="fa fa-plus"></i>&nbsp;
			Organización</span>
	</div>
	<form:form name="orgForm" commandName="morgaCmd" action="add-morga"
		method="POST" onsubmit="return addMOrga()">
		<c:choose>
			<c:when test="${brandurl=='admin'}">
				<div class="row form-group" style="margin-top: 20px;">
					<div class="col-xs-12 col-sm-2 col-md-2"></div>
					<div class="col-xs-12 col-sm-2 col-md-2">
						<label class="control-label">Cliente<font class="redFont">*</font></label>
					</div>
					<div class="col-xs-12 col-sm-4 col-md-4">
						<form:select path="gENCliente.pinCodCli" class="form-control"
							id="orgName">
							<c:forEach var="client" items="${clientlist}">
								<form:option value="${client.key}" label="${client.value}" />
							</c:forEach>
						</form:select>
					</div>
					<div class="col-xs-12 col-sm-4 col-md-4">
						<p id="orgNameError" class="redFont"></p>
					</div>
				</div>
			</c:when>
			<c:otherwise>
				<form:hidden path="gENCliente.pinCodCli" value="${ClientId}"/>
			</c:otherwise>
		</c:choose>
		
		<div class="row form-group" style="margin-top: 20px;">
			<div class="col-xs-12 col-sm-2 col-md-2"></div>
			<div class="col-xs-12 col-sm-2 col-md-2">
				<label class="control-label">Organización Id<font
					class="redFont">*</font></label>
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4">
				<form:input path="mOrgaPK.oRGAPinCODINT" class="form-control"
					id="orgId" />
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4">
				<p id="orgIdError" class="redFont">${responseMessage}</p>
			</div>
		</div>
		
		<div class="row form-group" style="margin-top: 10px;">
			<div class="col-xs-12 col-sm-2 col-md-2"></div>
			<div class="col-xs-12 col-sm-2 col-md-2">
				<label class="control-label">Código<font
					class="redFont">*</font></label>
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4">
				<form:input path="oRGAvcCODORG" class="form-control" id="orgCODORG" />
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4">
				<p id="orgCODORGError" class="redFont"></p>
			</div>
		</div>
		<div class="row form-group" style="margin-top: 10px;">
			<div class="col-xs-12 col-sm-2 col-md-2"></div>
			<div class="col-xs-12 col-sm-2 col-md-2">
				<label class="control-label">Nombre<font
					class="redFont">*</font></label>
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4">
				<form:input path="oRGAvcNOMORG" class="form-control" id="orgNOMORG" />
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4">
				<p id="orgNOMORGError" class="redFont"></p>
			</div>
		</div>
		
		<div class="row form-group" style="margin-top: 10px;">
			<div class="col-xs-12 col-sm-2 col-md-2"></div>
			<div class="col-xs-12 col-sm-2 col-md-2">
				<label class="control-label">Estado<font
					class="redFont">*</font></label>
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4">
				<form:radiobutton path="oRGAbtEST" value="true" />
				Activo
				<form:radiobutton path="oRGAbtEST" value="false" />
				Inactivo
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4">
				<p id="cliEstError" class="redFont"></p>
			</div>
		</div>


		<div class="row form-group">
			<div class="col-xs-12 col-sm-2 col-md-2"></div>
			<div class="col-xs-12 col-sm-2 col-md-2">
				<label class="control-label">Correo personal<font
					class="redFont">*</font></label>
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4">
				<form:input path="oRGAvcCORPER" class="form-control"
					id="oRGAvcCORPERId" />
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4">
				<p id="oRGAvcCORPERError" class="redFont"></p>
			</div>
		</div>

		<div class="row form-group">
			<div class="col-xs-12 col-sm-2 col-md-2"></div>
			<div class="col-xs-12 col-sm-2 col-md-2">
				<label class="control-label">Correo jefatura<font
					class="redFont">*</font></label>
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4">
				<form:input path="oRGAvcCORJFT" class="form-control"
					id="oRGAvcCORJFTId" />
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4">
				<p id="oRGAvcCORJFTError" class="redFont"></p>
			</div>
		</div>


		<div class="row form-group">
			<div class="col-xs-12 col-sm-2 col-md-2"></div>
			<div class="col-xs-12 col-sm-2 col-md-2">
				<label class="control-label">Fecha inicio<font
					class="redFont">*</font></label>
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4">
				<form:input path="oRGAdaFECFIN" class="form-control"
					value="${currentDate}" id="date" placeholder="22-08-2018" />
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4">
				<p id="dateError" class="redFont"></p>
			</div>
		</div>

		<div class="row form-group">
			<div class="col-xs-12 col-sm-2 col-md-2"></div>
			<div class="col-xs-12 col-sm-2 col-md-2">
				<label class="control-label">Fecha fin<font
					class="redFont">*</font></label>
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4">
				<form:input path="oRGAdaFECINI" class="form-control"
					value="${currentDate}" id="oRGAdaFECINIdate"
					placeholder="22-08-2018" />
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4">
				<p id="oRGAdaFECINIError" class="redFont"></p>
			</div>
		</div>
		<div class="row form-group">
			<div class="col-xs-12 col-sm-2 col-md-2"></div>
			<div class="col-xs-12 col-sm-2 col-md-2">
				<label class="control-label">CodInt<font
					class="redFont">*</font></label>
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4">
				<form:textarea path="oRGACodInt2" class="form-control"
					id="oRGACodInt2Id" />
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4">
				<p id="oRGACodInt2Error" class="redFont"></p>
			</div>
		</div>

		<div class="row form-group form-submit-button"
			style="margin-top: 30px;">
			<div class="col-xs-12 col-sm-2 col-md-2"></div>
			<div class="col-xs-12 col-sm-3 col-md-3">
				<input type="submit" class="btn btn-success btn-block input-sm "
					value="Grabar"> <input type="hidden"
					name="${_csrf.parameterName}" value="${_csrf.token}" />
					<input type="hidden" name="cToken" value="${sToken}"> 
			</div>
			<div class="col-xs-12 col-sm-3 col-md-3" style="display: none;">
				<form:button type="reset" class="btn btn btn-danger btn-block input-sm">Cancelar</form:button>
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4"></div>
		</div>
	</form:form>
</div>

<script type="text/javascript">
	$(document).ready( function () {
		$("#mainnav-menu li").removeClass("active-sub active");
		$("#mainnav-menu li").removeClass("active-link");
		$("#menu_agregar_organizacion").parent().parent().addClass("active-sub active");
		$("#menu_agregar_organizacion").addClass("active-link");
	});
</script>