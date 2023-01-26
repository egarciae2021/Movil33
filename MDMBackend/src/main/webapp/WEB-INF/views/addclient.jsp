<%@ page language="java" isErrorPage="false"
	contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>

<div class="panel panel-default">
	<div class="panel-heading app-heading">
		<span class="lead"><i class="fa fa-plus"></i>&nbsp; Cliente</span>
	</div>
	<form:form name="cliForm" commandName="genClienteCmd"
		action="add-client" method="POST" onsubmit="return addClient()">

		<div class="row form-group" style="margin-top: 20px;">
			<div class="col-xs-12 col-sm-2 col-md-2"></div>
			<div class="col-xs-12 col-sm-2 col-md-2">
				<label class="control-label">Id<font
					class="redFont">*</font></label>
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4">
				<form:input path="pinCodCli" class="form-control" id="cliId" />
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4">
				<p id="cliIdError" class="redFont">${responseMessage}</p>
			</div>
		</div>
		<div class="row form-group" style="margin-top: 10px;">
			<div class="col-xs-12 col-sm-2 col-md-2"></div>
			<div class="col-xs-12 col-sm-2 col-md-2">
				<label class="control-label">Nombre<font
					class="redFont">*</font></label>
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4">
				<form:input path="vcNomCli" class="form-control" id="cliName" />
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4">
				<p id="cliNameError" class="redFont"></p>
			</div>
		</div>
		<div class="row form-group" style="margin-top: 10px;">
			<div class="col-xs-12 col-sm-2 col-md-2"></div>
			<div class="col-xs-12 col-sm-2 col-md-2">
				<label class="control-label">Estado<font
					class="redFont">*</font></label>
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4">
				<form:select path="btEst" class="form-control" id="cliEst">
					<%-- <form:option value="" label="---select---" /> --%>
					<form:option value="1" label="True" />
					<form:option value="0" label="False" />
				</form:select>
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4">
				<p id="cliEstError" class="redFont"></p>
			</div>
		</div>
		<div class="row form-group" style="margin-top: 10px;">
			<div class="col-xs-12 col-sm-2 col-md-2"></div>
			<div class="col-xs-12 col-sm-2 col-md-2">
				<label class="control-label">Cultura<font class="redFont">*</font></label>
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4">
				<form:select path="inIdCultura.pinCodCul" class="form-control"
					id="cliCulture">
					<c:forEach var="cul" items="${genCulturaList}">
						<form:option value="${cul.key}" label="${cul.value}" />
					</c:forEach>
				</form:select>
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4">
				<p id="cliCultureError" class="redFont"></p>
			</div>

		</div>
		
		<div class="row form-group form-submit-button" style="margin-top: 30px;">
			<div class="col-xs-12 col-sm-2 col-md-2"></div>
			<div class="col-xs-12 col-sm-3 col-md-3">
				 <input type="submit" class="btn btn-success btn-block input-sm "
					value="Grabar">
			<input type="hidden" name="cToken" value="${sToken}"> 
				<input type="hidden"
					name="${_csrf.parameterName}" value="${_csrf.token}" />
			</div>
			<div class="col-xs-12 col-sm-3 col-md-3">
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
		$("#menu_agregar_cliente").parent().parent().addClass("active-sub active");
		$("#menu_agregar_cliente").addClass("active-link");
	});
</script>