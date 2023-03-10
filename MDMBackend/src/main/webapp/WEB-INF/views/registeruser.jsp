<%@ page language="java" isErrorPage="false"
	contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>

<div class="panel panel-default">
	<div class="panel-heading  app-heading">
		<span class="lead"><i class="fa fa-plus"></i>&nbsp;Nuevo Usuario</span>
	</div>
		<form:form name="userRegisteForm" commandName="SEGUsuarioDTOCmd" method="Post" >
			<c:if test="${responseMessage!=null}">
				<div class="row form-group" style="margin-top: 20px;">
					<div class="col-xs-12 col-sm-12 col-md-12">
						<p align="center" class="redFont"><strong>Advertencia! </strong>&nbsp;${responseMessage}</p>
					</div>
				</div>
			</c:if>
		<div class="row form-group" style="margin-top: 20px;">
			<div class="col-xs-12 col-sm-2 col-md-2"></div>
			<div class="col-xs-12 col-sm-2 col-md-2">
				<label class="control-label">Nombre Empleado<font class="redFont">*</font></label>
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4">
				<form:select path="mEmpl.mEmplPK.eMPLPvcCODEMP" class="form-control"
					id="orgName">
					<c:forEach var="client" items="${mEmplName}">
						<form:option value="${client.key}" label="${client.value}" />
					</c:forEach>
				</form:select>
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4">
				<p class="redFont"></p>
			</div>
		</div>
		<div class="row form-group" style="margin-top: 10px;">
			<div class="col-xs-12 col-sm-2 col-md-2"></div>
			<div class="col-xs-12 col-sm-2 col-md-2">
				<label class="control-label">Id Usuario<font class="redFont">*</font></label>
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4">
				<form:input path="sEGUsuarioPK.pinCod" class="form-control" id="pinCod"/>
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4">
				<p class="redFont" id="pinCodError"></p>
			</div>
		</div>
		<div class="row form-group" style="margin-top: 10px;">
			<div class="col-xs-12 col-sm-2 col-md-2"></div>
			<div class="col-xs-12 col-sm-2 col-md-2">
				<label class="control-label">Descripci?n Usuario<font class="redFont">*</font></label>
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4">
				<form:input path="vcNom" class="form-control" id="description"/>
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4">
				<p class="redFont" id="descriptionError"></p>
			</div>
		</div>
		<div class="row form-group" style="margin-top: 10px;">
			<div class="col-xs-12 col-sm-2 col-md-2"></div>
			<div class="col-xs-12 col-sm-2 col-md-2">
				<label class="control-label">Nombre Usuario<font class="redFont">*</font></label>
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4">
				<form:input path="vcUsu" class="form-control" id="userName"/>
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4">
				<p class="redFont" id="userNameError"></p>
			</div>
		</div>
		<div class="row form-group" style="margin-top: 10px;">
			<div class="col-xs-12 col-sm-2 col-md-2"></div>
			<div class="col-xs-12 col-sm-2 col-md-2">
				<label class="control-label">Correo<font class="redFont">*</font></label>
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4">
				<form:input path="correo" class="form-control" id="email"/>
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4">
				<p class="redFont" id="emailError"></p>
			</div>
		</div>
		<div class="row form-group" style="margin-top: 10px;">
			<div class="col-xs-12 col-sm-2 col-md-2"></div>
			<div class="col-xs-12 col-sm-2 col-md-2">
				<label class="control-label">Contrase?a<font class="redFont">*</font></label>
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4">
				<form:password path="vcPas" class="form-control" id="password"/>
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4">
				<p class="redFont" id="passwordError"></p>
			</div>
		</div>
		
		<div class="row form-group form-submit-button" style="margin-top: 30px;">
			<div class="col-xs-12 col-sm-2 col-md-2"></div>
			<div class="col-xs-12 col-sm-3 col-md-3">
				 <input type="submit" class="btn btn-success btn-block input-sm"
					value="Registrar" onclick="return userRegiste()">
			</div>
			<div class="col-xs-12 col-sm-3 col-md-3">
				<form:button type="reset" class="btn btn btn-danger btn-block input-sm">Cancelar</form:button>
				<input type="hidden"
						name="${_csrf.parameterName}" value="${_csrf.token}" />
					<input type="hidden" name="cToken" value="${sToken}"> 
					<form:hidden path="btReinicia" value="false"/>
					<form:hidden path="btBloqueo" value="false"/>
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4"></div>
		</div> 
	</form:form>
</div>