<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
     <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
</head>
<body>


		<header id="navbar">
				<div id="navbar-container" class="boxed">
					<!--Brand logo & name-->
					<!--================================-->
					<div class="navbar-header">
						
	
					</div>
					<div id="dvContenedorLogoCliente" style="position: absolute; top: 0px; left: 0px; background-color: white;">
						<img id="LogoCliente" src="static/images/visualsoftmexico.png" style="height:59px;width:220px;">
					</div>
	
					<div class="navbar-content">
	
						<ul class="nav navbar-top-links">
	
							<li id="dropdown-user" class="dropdown">

								<a href="#" id="icoUser" style="display: none;" data-toggle="dropdown" class="dropdown-toggle text-right">
									<span class="ic-user pull-right">
										<i class="demo-pli-male"></i>
									</span>
								</a>

								<div class="dropdown-menu dropdown-menu-sm dropdown-menu-right panel-default">
									<ul class="head-list">
										<c:choose>
												<c:when test="${pageName=='welcome'}">
													<li>
														<a href="login"><i class="demo-pli-unlock icon-lg icon-fw"></i> Iniciar sesión</a>
													</li>
												</c:when>
												<c:when test="${pageName=='login'}">
													
													</c:when>
													<c:otherwise>
														<li>
															<a href="javascript:document.getElementById('logout').submit()"><i class="demo-pli-unlock icon-lg icon-fw"></i> Cerrar sesión</a>
														</li>
													</c:otherwise>
											</c:choose>
									</ul>
								</div>
							</li>
						</ul>
					</div>
					<!--================================-->
					<!--End Navbar Dropdown-->
				</div>
			</header>


</body>



<script type="text/javascript">
	$(document).ready( function () {
		setTimeout(function	() {
			$("#icoUser").show();
		}, 0);
	});
</script>


</html>