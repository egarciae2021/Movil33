<%@ page language="java" isErrorPage="false"
	contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>

<div class="panel panel-default">
	<div class="panel-heading  app-heading">
		<span class="lead"><i class="fa fa-pencil-square-o"></i>&nbsp; Cliente</span>
	</div>
	<form:form name="updateClientForm" onsubmit="return updateClient()"
		commandName="genClientCmd" action="edit-genclient" method="POST">
		<div class="row form-group" style="margin-top: 20px;">
			<div class="col-xs-12 col-sm-2 col-md-2"></div>
			<div class="col-xs-12 col-sm-2 col-md-2">
				<label class="control-label">Id<font class="redFont">*</font></label>
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4">
				<form:hidden path="inIdCultura.pinCodCul" value="${genClientRes.inIdCultura.pinCodCul}"/>
				<form:input path="pinCodCli" class="form-control"
					value="${genClientRes.pinCodCli}" readonly="true" />
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4">
				<p class="redFont"></p>
			</div>
		</div>
		<div class="row form-group" style="margin-top: 10px;">
			<div class="col-xs-12 col-sm-2 col-md-2"></div>
			<div class="col-xs-12 col-sm-2 col-md-2">
				<label class="control-label">Nombre<font
					class="redFont">*</font></label>
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4">
				<form:input path="vcNomCli" class="form-control"
					value="${genClientRes.vcNomCli}" id="genCliName" />
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4">
				<p id="genCliNameError" class="redFont"></p>
			</div>
		</div>
		<div class="row form-group" style="margin-top: 10px;">
			<div class="col-xs-12 col-sm-2 col-md-2"></div>
			<div class="col-xs-12 col-sm-2 col-md-2">
				<label class="control-label">Estado<font class="redFont">*</font></label>
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4">
				<form:select path="btEst" class="form-control input-sm" itemValue="${genClientRes.btEst}">
					<form:option value="1" >Verdadero</form:option>
					<form:option value="0">Falso</form:option>
				</form:select>
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4">
				<p id="genCliStatusError" class="redFont"></p>
			</div>
		</div>
		
		<div class="row form-group" style="margin-top: 10px;">
			<div class="col-xs-12 col-sm-2 col-md-2"></div>
			<div class="col-xs-12 col-sm-2 col-md-2">
				<label class="control-label">Logo<font class="redFont">*</font></label>
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4">
				<img alt="logo" src="${genClientRes.image}" style="height: 100px;width: 100px;" >
				<a href="#"  data-toggle="modal" data-target="#uploadLogoClient" title="Actualizar Logo" style="font-size: 30px;"><span class="glyphicon glyphicon-upload"></span></a>
			</div>
			<div class="col-xs-12 col-sm-4 col-md-4">
				<p id="genCliStatusError" class="redFont"></p>
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






<!-- <!-- image uploding toggle box  -->
<div class="modal fade" id="uploadLogoClient" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-centered-important" role="document" >
        <div class="modal-content row modal-content-h-w" >
            <div class="modal-header app-heading"  class="col-xs-12 col-sm-4 col-md-4">
                 <span><i class="glyphicon glyphicon-picture"></i>&nbsp;Actualizar Logo Cliente</span>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
            	
            	<div style="margin-bottom: 10px; margin-bottom: 10px;" id="seccessMessage">
            		<div class="alert alert-success alert-dismissible">
					  <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
					  <strong>Success!</strong> Subido correctamente.
					</div>
            	</div>
            	
            	<div style="margin-bottom: 10px; margin-bottom: 10px;" id="errorMessage">
            		<div class="alert alert-info alert-dismissible">
					    <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
					    <strong>Info!</strong> Por favor, ingrese una imagen válida.
					</div>
            	</div>
            	<form  method="POST" enctype="multipart/form-data" 
            		onsubmit="" id="fileUploadForm">
				    <div class="form-group">
				        <label>Seleccione el archivo</label> 
				        <input class="form-control" type="file" name="file" id="imageFile">
				        <input type="hidden" id="clientId" name="clientId">
				      </div>
				    <div class="modal-footer  getDevicePopUp">
		         		 <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
		                 <button type="button" class="btn btn-success" onclick="uploadClientLogo()">Subir</button>
	       			 </div>
				</form>
            </div>
        </div>
    </div>
</div>