<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
   
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
	
<html>
	<head>
		<meta name="_csrf" content="${_csrf.token}" />
		<meta name="_csrf_header" content="${_csrf.headerName}" />

		<link rel="shortcut icon" href="static/images/faviconlogo.ico" type="image/x-icon" />
		
		<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
		<title>Login - PCSistel MDM</title>
		<link href="static/css/apps.css" rel="stylesheet"></link>
		<link href="static/css/app.css" rel="stylesheet"></link>
		
		<link rel="stylesheet" type="text/css" href="//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.2.0/css/font-awesome.css" />
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
	  	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	  	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
		<script src="static/js/mdmapps.js"></script>
		<link href="static/css/nifty.min.css" rel="stylesheet">
		<noscript>
		    <div style="position: fixed; top: 0px; left: 0px; z-index: 3000; 
		                height: 100%; width: 100%; background-color: #FFFFFF">
		       <p style="margin-left: 10px; text-align: center;color: red; font-size: x-large;">
		        Se requiere JavaScript para navegar. Su navegador no es compatible con JavaScript o está siendo bloqueado. <br>
				Habilite JavaScript en su navegador o use uno que lo admita.</p>
		    </div>
		</noscript>
	</head>
	<section style="height: 500px;">
		<div class="container-fluid login-page-body"  style="padding-left: 0!important;margin-bottom:120px; padding-right:0!important; ">
		   <%@include file="login.jsp"%>
		</div>
	</section>
</html>
<jsp:include page="footer.jsp"></jsp:include>