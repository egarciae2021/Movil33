<%@ page language="java" isErrorPage="false"
	contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>

<div class="panel panel-default">
	<!-- Default panel contents -->
	<div class="panel-heading  app-heading">
		<span class="lead"><i class="fa fa-pencil-square-o"></i>&nbsp;Usuario</span>
	</div>
	<div class="edit-company" align="center">
		<form:form method="POST" commandName="editSEGUsuarioCmd" name="editSEGUsuarioForm"
			onsubmit="return uploadSEGUsu()" >
			<div class="row form-group" style="margin-top: 20px;">
				<div class="col-xs-12 col-sm-2 col-md-2"></div>
				<div class="col-xs-12 col-sm-2 col-md-2">
					<label class="edit" for="focusedInput">IdUsuario<font class="redFont">*</font></label>
				</div>
				<div class="col-xs-12 col-sm-4 col-md-4">
					<form:hidden path="sEGUsuarioPK.finCodCli" value="${segUsuario.sEGUsuarioPK.finCodCli}"/>
					<form:input
						path="sEGUsuarioPK.pinCod" class="form-control input-sm"
						readonly="true" id="pinCodId"
						value="${segUsuario.sEGUsuarioPK.pinCod}" />
				</div>
				<div class="col-xs-12 col-sm-4 col-md-4">
					<p  class="pinCodError"></p>
				</div>
			</div>
			
			<div class="row form-group" style="margin-top: 10px;">
				<div class="col-xs-12 col-sm-2 col-md-2"></div>
				<div class="col-xs-12 col-sm-2 col-md-2">
					<label class="edit" for="focusedInput">Nombre<font class="redFont">*</font></label>
				</div>
				<div class="col-xs-12 col-sm-4 col-md-4">
					<form:input	path="vcNom" class="form-control input-sm"
						id="vcNomId"
						value="${segUsuario.vcNom}"/>
				</div>
				<div class="col-xs-12 col-sm-4 col-md-4">
					<p  class="redFont" id="vcNomError"></p>
				</div>
			</div>
			
			
			<div class="row form-group" style="margin-top: 10px;">
				<div class="col-xs-12 col-sm-2 col-md-2"></div>
				<div class="col-xs-12 col-sm-2 col-md-2">
					<label class="edit" for="focusedInput">Usuario<font class="redFont">*</font></label>
				</div>
				<div class="col-xs-12 col-sm-4 col-md-4">
					<form:input	path="vcUsu" class="form-control input-sm"
						readonly="true" id="userName"
						value="${segUsuario.vcUsu}"/>
						
						<form:hidden path="vcPas" class="form-control input-sm"
						value="${segUsuario.vcPas}"/>
				</div>
				<div class="col-xs-12 col-sm-4 col-md-4">
					<p  class="redFont"></p>
				</div>
			</div>
			
			<div class="row form-group" style="margin-top: 10px;">
				<div class="col-xs-12 col-sm-2 col-md-2"></div>
				<div class="col-xs-12 col-sm-2 col-md-2">
					<label class="edit" for="focusedInput">Correo<font class="redFont">*</font></label>
				</div>
				<div class="col-xs-12 col-sm-4 col-md-4">
					<form:input	path="correo" class="form-control input-sm"
						id="correoId" value="${segUsuario.correo}"/>
				</div>
				<div class="col-xs-12 col-sm-4 col-md-4">
					<p  class="redFont" id="correoError"></p>
				</div>
			</div>
			
			<div class="row form-group" style="margin-top: 10px;">
				<div class="col-xs-12 col-sm-2 col-md-2"></div>
				<div class="col-xs-12 col-sm-2 col-md-2">
					<label class="edit" for="focusedInput">Guid AD<font class="redFont">*</font></label>
				</div>
				<div class="col-xs-12 col-sm-4 col-md-4">
					<form:input	path="guidAD" class="form-control input-sm"
						id="guidADId"
						value="${segUsuario.guidAD}"/>
				</div>
				<div class="col-xs-12 col-sm-4 col-md-4">
					<p  class="redFont" id="guidADError"></p>
				</div>
			</div>
			
			<div class="row form-group" style="margin-top: 10px;">
					<div class="col-xs-12 col-sm-2 col-md-2"></div>
					<div class="col-xs-12 col-sm-2 col-md-2">
						<label class="edit" for="focusedInput">Estado<font class="redFont">*</font></label>
					</div>
					<div class="col-xs-12 col-sm-4 col-md-4">
							<form:select path="btEst" class="form-control input-sm" itemValue="${segUsuario.btEst}">
								<form:option value="true">Verdadero</form:option>
								<form:option value="false">Falso</form:option>
							</form:select>
					</div>
					<div class="col-xs-12 col-sm-4 col-md-4">
						<p  class="redFont"></p>
					</div>
			</div>
			<div class="row form-group" style="margin-top: 10px;">
				<div class="col-xs-12 col-sm-2 col-md-2"></div>
				<div class="col-xs-12 col-sm-2 col-md-2">
					<label class="edit" for="focusedInput">Chat<font class="redFont">*</font></label>
				</div>
				<div class="col-xs-12 col-sm-4 col-md-4">
					<form:input	path="chatActivo" class="form-control input-sm"
						value="${segUsuario.chatActivo}" id="chatActivoId" />
				</div>
				<div class="col-xs-12 col-sm-4 col-md-4">
					<p class="redFont" id="chatActivoError"></p>
				</div>
			</div>
			
			<div class="row form-group" style="margin-top: 10px;">
				<div class="col-xs-12 col-sm-2 col-md-2"></div>
				<div class="col-xs-12 col-sm-2 col-md-2">
					<label class="edit" for="focusedInput">Correo BK<font class="redFont">*</font></label>
				</div>
				<div class="col-xs-12 col-sm-4 col-md-4">
					<form:input	path="correoBK" class="form-control input-sm"
						value="${segUsuario.correoBK}" id="correoBKId" />
				</div>
				<div class="col-xs-12 col-sm-4 col-md-4">
					<p class="redFont" id="correoBKError"></p>
				</div>
			</div>
			
			<div class="row form-group" style="margin-top: 10px;">
				<div class="col-xs-12 col-sm-2 col-md-2"></div>
				<div class="col-xs-12 col-sm-2 col-md-2">
					<label class="edit" for="focusedInput">Fecha Último Acceso<font class="redFont">*</font></label>
				</div>
				<div class="col-xs-12 col-sm-4 col-md-4">
					<fmt:formatDate
						value="${segUsuario.dtFecUltAcceso}" pattern="dd-MM-yyyy"
						var="myDate" /> <form:input path="dtFecUltAcceso"
						class="form-control input-sm" value="${myDate}" id="date" placeholder="27-07-2018"/>
				</div>
				<div class="col-xs-12 col-sm-4 col-md-4">
					<p class="redFont" id="dateError"></p>
				</div>
			</div>
			
			<div class="row form-group" style="margin-top: 10px;">
				<div class="col-xs-12 col-sm-2 col-md-2"></div>
				<div class="col-xs-12 col-sm-2 col-md-2">
					<label class="edit" for="focusedInput">Imagen<font class="redFont">*</font></label>
				</div>
				<div class="col-xs-12 col-sm-4 col-md-4" align="left">
					
					<img src="${segUsuario.image}" height="100px" width="100px" />
					<a href=""  data-toggle="modal" data-target="#uploadImage" title="upload image" style="font-size: 30px;"><span class="glyphicon glyphicon-upload"></span></a>
				
				</div>
				<div class="col-xs-12 col-sm-4 col-md-4">
					<p class="redFont" id="userImageError"></p>
				</div>
			</div>
			
			<div class="row form-group form-submit-button" style="margin-top: 30px;">
				<div class="col-xs-12 col-sm-2 col-md-2"></div>
				<div class="col-xs-12 col-sm-3 col-md-3">
					 <input type="submit" class="btn btn-success btn-block input-sm "
						value="Grabar">
					<input type="hidden"
						name="${_csrf.parameterName}" value="${_csrf.token}" />
						<input type="hidden" id="cTokenId" name="cToken" value="${sToken}"> 
				</div>
				<div class="col-xs-12 col-sm-3 col-md-3">
					<form:button type="reset" class="btn btn btn-danger btn-block input-sm">Cancelar</form:button>
				</div>
				<div class="col-xs-12 col-sm-4 col-md-4"></div>
			</div> 
		</form:form>
	</div>
</div>



<!-- <!-- image uploding toggle box  -->
<div class="modal fade" id="uploadImage" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-centered-important" role="document" >
        <div class="modal-content row modal-content-h-w" >
            <div class="modal-header app-heading"  class="col-xs-12 col-sm-4 col-md-4">
                 <span><i class="glyphicon glyphicon-picture"></i>&nbsp;Subir imagen usuario</span>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
            	
            	<div style="margin-bottom: 10px; margin-bottom: 10px;" id="seccessMessage">
            		<div class="alert alert-success alert-dismissible">
					  <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
					  <strong>Correcto!</strong> Subio exitosamente.
					</div>
            	</div>
            	
            	<div style="margin-bottom: 10px; margin-bottom: 10px;" id="errorMessage">
            		<div class="alert alert-info alert-dismissible">
					    <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
					    <strong>Info!</strong> Por favor, seleccione una imagen válida.
					</div>
            	</div>
            	<form  method="POST" enctype="multipart/form-data" 
            		onsubmit="" id="fileUploadForm">
				    <div class="form-group">
				        <label>Seleccione el archivo</label> 
				        <input class="form-control" type="file" name="file" id="imageFile">
				        <input type="hidden" id="userId" name="userIdPK">
				      </div>
				    <div class="modal-footer  getDevicePopUp">
		         		 <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
		                 <button type="button" class="btn btn-success" onclick="uploaduserImage()">Subir</button>
	       			 </div>
				</form>
            </div>
        </div>
    </div>
</div>

