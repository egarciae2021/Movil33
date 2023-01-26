<%@ page language="java" isErrorPage="false"
	contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
	<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"  %>
	<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
	<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
<%@ page trimDirectiveWhitespaces="true" %>
<!-- <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"> -->
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN"
 "http://www.w3.org/TR/html4/strict.dtd">
<html class="html-margin">
<head>
<meta name="_csrf" content="${_csrf.token}" />
<meta name="_csrf_header" content="${_csrf.headerName}" />
<meta http-equiv="Content-type" content="text/html; charset=ISO-8859-1" />
<link type=”text/css” href=”style.css” />


<noscript>
    <div style="position: fixed; top: 0px; left: 0px; z-index: 3000; 
                height: 100%; width: 100%; background-color: #FFFFFF">
       <p style="margin-left: 10px; text-align: center;color: red; font-size: x-large;">
        Se requiere JavaScript para navegar. Su navegador no es compatible con JavaScript o está siendo bloqueado. <br>
		Habilite JavaScript en su navegador o use uno que lo soporte.</p>
    </div>
</noscript>
<link rel="shortcut icon" href="static/images/faviconlogo.ico" type="image/x-icon" />
<%@include file="navbar.jsp"%>

<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>PCSistel MDM</title>
<link href="static/css/apps.css" rel="stylesheet"></link>
<link href="static/css/accordioncss.css" rel="stylesheet"></link>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
  <script src="static/js/mdmapps.js"></script>
	<link rel="stylesheet" type="text/css"
	href="//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.2.0/css/font-awesome.css" />
		
		<link rel="stylesheet" href="https://cdn.datatables.net/1.10.19/css/jquery.dataTables.min.css">
		<script src="https://cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js"></script>
	
	<link href="static/css/nifty.min.css" rel="stylesheet">
	<link href="static/css/nifty-demo-icons.min.css" rel="stylesheet">

<script>
	//Page.Title = "Some New Title";
</script>
<style>
	#mainnav <li .arrow:before {
		transition: all 0.3s;
	}

	#mainnav li .arrow:before {
		content: '';
		border-style: solid;
		border-width: 0.1em 0.1em 0 0;
		display: inline-block;
		height: 0.4em;
		left: 0;
		position: relative;
		top: 0;
		width: 0.4em;
		-webkit-transform: rotate(45deg);
		transform: rotate(45deg);
	}
</style>
</head>
<section style="height: 800px;">

<div class="container-fluid " 
	style="padding-right: 0 !important; padding-left: 0 !important; margin-top: 58px;">
	
	<div class="row">
		<div class="col-xs-12 col-sm-12 col-md-12 div-body">
			<div class="row">
				<div style="position: absolute; left: 0px; width: 230px;">
					<%@include file="accordionadmin.jsp"%>
				</div>
				<div class="" id="mainbody" style="margin-left: 230px; ">
					<jsp:include page="${pageName}"/>
				</div>
				
			</div>
		</div>
	</div>
</div>
</section>
<script src="static/js/nifty.min.js"></script>	
<script>
		$(document).ready( function () {
		  	$(window).resize(function () {
				DimPosElementos();
			});
			DimPosElementos();
		});

		function DimPosElementos(){
			var ancho = $(window).width();
		  	$("#mainbody").width(ancho-240);
		}

	</script>
	
</html>
<%@include file="footer.jsp"%>