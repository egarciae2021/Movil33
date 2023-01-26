<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ page isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
		<script src=" static/js/loginpagejs.js" rel="stylesheet"></script>
		<link href="static/css/apps.css" rel="stylesheet"></link>
</head>
	<body>
		<div id="mainWrapper">
			<div class="login-container">
				<div class="login-card">
					<div class="login-form">
						<c:url var="loginUrl" value="/login" />
						<form action="${loginUrl}" method="post" class="form-horizontal">
							<c:if test="${param.error != null}">
								<div class="alert alert-danger">
									<p>Usuario o Contraseña incorrectos.</p>
								</div>
							</c:if>
							<c:if test="${param.logout != null}">
								<div class="alert alert-success">
									<p>Has cerrado sesión correctamente.</p>
								</div>
							</c:if>

							<div class="panel-heading app-heading">
								<span class="lead"><i class="fa fa-sign-in"></i>&nbsp;Inicio Sesión</span>
							</div>

							<div class="input-group input-sm">
								<label class="input-group-addon" for="username"><i class="fa fa-user"></i></label>
								<input type="text" class="form-control" id="username" name="ssoId" placeholder="Ingrese usuario" required>
							</div>
							<div class="input-group input-sm">
								<label class="input-group-addon" for="password"><i class="fa fa-lock"></i></label> 
								<input type="password" class="form-control" id="password" name="password" placeholder="Ingrese contraseña" required>
							</div>
							<div class="input-group input-sm">
                              <div class="checkbox">
                                <label><input type="checkbox" id="rememberme" name="remember-me"> Recordar</label>  
                              </div>
                            </div>
							<input type="hidden" name="${_csrf.parameterName}"  value="${_csrf.token}" />
								
							<div class="form-actions">
								<input type="submit"
									class="btn btn-block btn-primary btn-default" value="Ingresar"><br>
									<a href="#" id="show">Olvidó su contraseña</a>
							</div>
						</form>
					</div>
				</div>
			</div>
		
		</div>
			
		<div class="center hideform">
			 <div class="row">
    			<div class="col-sm-12" class="close-wrp">
    				<button id="close" style="float: right; border-bottom-color: white;" 
    				class="btn btn-danger btn-danger-close" onclick="hideAndShowDiv()" >X</button>
    			</div>
    		</div>
    		<div class="row" style="margin-top: 30px;">
    			<div class="col-sm-2"></div>
    			<div class="col-sm-8">
    				<form  name="forgotPasswordForm">

							<div class="panel-heading app-heading">
									<span class="lead"><i class="fa fa-sign-in"></i>&nbsp;Cambio de Contraseña</span>
							</div>

    					<p id="errorMessageVerify" class="redFont"></p>
    					<div class="alert alert-success alert-success-message" style="padding-bottom: 0;padding-top: 0">
						  <strong>Correcto!</strong> &nbsp;&nbsp; Trate de iniciar sesión con su nueva contraseña.&nbsp;
						  <b><a href="login" style= "color: #1E4DB3;">Iniciar Sesión...</a></b>
						</div>
    					<div class="verifyPasswordDiv">
    						<div class="input-group input-sm">
								<label class="input-group-addon" for="username"><i class="fa fa-user"></i></label>
								<input type="text" class="form-control" id="userName"  placeholder="Usuario">
							</div>
							<div class="input-group input-sm">
								<label class="input-group-addon" for="email"><i class="	fa fa-envelope"></i></label>
								<input  type="text" class="form-control" id="email"  placeholder="Correo" >
							</div>
							<div style="margin-top: 30px;">
								<input type="submit" class="btn btn-block btn-primary btn-default"
								 onclick="return ifExistUserNameEmail()" value="Verificar"><br>
							</div>
    					</div>
    					<div class="forgotPasswordDiv">
    						<div>
    							<p id="forgotPasswordResponseId"></p>
    						</div>
    						<div class="input-group input-sm">
    							<input type="hidden"  id="hiddenUserName">
								<label class="input-group-addon" for="pass"> <span class="glyphicon glyphicon-lock"></span></label>
								<input  type="password" class="form-control" id="passwordId"  placeholder="Contraseña" >
							</div>
							<div class="input-group input-sm" >
								<label class="input-group-addon" for="pass"> <span class="glyphicon glyphicon-lock"></span></label>
								<input  type="password" class="form-control" id="rePasswordId"  placeholder="Vuelva a ingresar contraseña" >
							</div>
							<div style="margin-top: 30px;">
								<input type="submit" class="btn btn-block btn-primary btn-default"
								 onclick="return forgotPassword()" value="Cambiar contraseña"><br>
							</div>
    					</div>
		    		</form>  
		    		<a style="float: left;"  id="show" href="login">¿Ya tiene un usuario? Conéctese aquí.</a>  				
    			</div>
    			
    			<div class="col-sm-2">
    				
    			</div>
    		</div>
		    
		</div>
	</body>
</html>
