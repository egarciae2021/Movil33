

  <style>
    #mainnav-menu i.arrow {
      margin-top: -1px !important;
      margin-right: -5px !important;
  }
  </style>

    <div id="mainnav" style="background-color: white; max-width: 230px;">
        <!--<div class="mainnav-brand">
            <a href="#" class="brand">
                
                <img id="LogoCliente2" alt="PCSistel" class="brand-icon" src="static/images/logo-visual-soft.png" style="height:56px;width:200px;">
                
            </a>
            <a href="#" class="mainnav-toggle"><i class="pci-cross pci-circle icon-lg"></i></a>
        </div>-->
        <div id="mainnav-menu-wrap">
            <div class="nano has-scrollbar">
                <div class="nano-content" tabindex="0" style="right: -17px;">
                    <!--Profile Widget-->
                    <!--================================-->
                    <div id="mainnav-profile" class="mainnav-profile">
                        <div class="profile-wrap text-center">
                            <div class="pad-btm">
                                
                                <a href="javascript:fnVerPerfilImagen();">
                                    <img id="imgUsuario" class="img-circle img-md" src="static/images/user.png" style="height:65px;width:65px;">
                                </a>
                                
                            </div>
                            <a href="#profile-nav" class="box-block collapsed" data-toggle="collapse" aria-expanded="false">
                                <span class="pull-right dropdown-toggle">
                                    <i class="dropdown-caret"></i>
                                </span>
                                <p class="mnp-name"><span id="lblNombreUsuario" title="Usuario">${userNamePrincipal}</span></p>
                            </a>
                        </div>
                        <div id="profile-nav" class="list-group bg-trans collapse" aria-expanded="false" style="height: 0px;">

                            <form id="logout" action="logout" method="post" >
                                <input style="margin-bottom: 20px;" type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
                                <a   href="javascript:document.getElementById('logout').submit()" class="list-group-item">
                                    <i class="demo-pli-unlock icon-lg icon-fw"></i> Cerrar sesi&oacute;n
                                </a>
                              </form>
                        </div>
                    </div>

                    <!--Shortcut buttons-->
                    <!--================================-->
                    <div id="mainnav-shortcut" class="hidden">
                        <ul class="list-unstyled shortcut-wrap">
                            <li class="col-xs-3" data-content="My Profile" data-original-title="" title="">
                                <a class="shortcut-grid" href="#">
                                    <div class="icon-wrap icon-wrap-sm icon-circle bg-mint">
                                        <i class="demo-pli-male"></i>
                                    </div>
                                </a>
                            </li>
                            <li class="col-xs-3" data-content="Messages" data-original-title="" title="">
                                <a class="shortcut-grid" href="#">
                                    <div class="icon-wrap icon-wrap-sm icon-circle bg-warning">
                                        <i class="demo-pli-speech-bubble-3"></i>
                                    </div>
                                </a>
                            </li>
                            <li class="col-xs-3" data-content="Activity" data-original-title="" title="">
                                <a class="shortcut-grid" href="#">
                                    <div class="icon-wrap icon-wrap-sm icon-circle bg-success">
                                        <i class="demo-pli-thunder"></i>
                                    </div>
                                </a>
                            </li>
                            <li class="col-xs-3" data-content="Lock Screen" data-original-title="" title="">
                                <a class="shortcut-grid" href="#">
                                    <div class="icon-wrap icon-wrap-sm icon-circle bg-purple">
                                        <i class="demo-pli-lock-2"></i>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <!--================================-->
                    <!--End shortcut buttons-->
                    
                      <ul id="mainnav-menu" class="list-group" >
                          <li class="list-header"><a href="admin">MDM</a></li> 
                          <li>
                              <a href="javascript:console.log()">
                                <i class="fa fa-dashboard" style="font-size: 18px; width: 24px;"></i> 
                                <span class="menu-title">Inicio</span> 
                                <i class="arrow"></i>
                              </a>
                              <ul aria-expanded="true" class="collapse">
                                <!--<li id="menu_inicio_cliente" class="">
                                  <a href="all-client">Cliente</a>
                                </li>-->
                                <li id="menu_inicio_organizacion" class="">
                                  <a href="all-morga">Organizaci&oacute;n</a>
                                </li>
                                <li id="menu_inicio_empleados" class="">
                                  <a href="all-mempl">Empleados</a>
                                </li>
                                <li id="menu_inicio_equipos" class="">
                                    <a href="all-devices">Equipos</a>
                                </li>
                              </ul>
                          </li>
                          <li>
                              <a href="javascript:console.log()" aria-expanded="false">
                                <i class="fa fa-plus" style="font-size: 18px; width: 24px;"></i> 
                                <span class="menu-title">Agregar</span> 
                                <i class="arrow"></i>
                              </a>
                              <ul aria-expanded="false"> 
                                <!--<li id="menu_agregar_cliente" class="">
                                    <a href="add-client">Cliente</a>
                                </li>-->
                                <li id="menu_agregar_organizacion" class="">
                                    <a href="add-morga">Organizaci&oacute;n</a>
                                </li>
                                <li id="menu_agregar_empleado" class="">
                                    <a href="add-mempl">Empleado</a>
                                </li>
                              </ul>
                          </li>
                          <li>
                              <a href="javascript:console.log()" aria-expanded="false">
                                <i class="fa fa-search" style="font-size: 18px; width: 24px;"></i> 
                                <span class="menu-title">B&uacute;squedas</span> 
                                <i class="arrow"></i>
                              </a>
                              <ul aria-expanded="false" class=""> 
                                  <!--<li id="menu_busqueda_cliente" class="">
                                      <a href="search-by-id-client-p">Cliente</a>
                                  </li>-->
                                  <li id="menu_busqueda_organizacion" class="">
                                      <a href="search-by-id-morga-p">Organizaci&oacute;n</a>
                                  </li>
                                  <li id="menu_busqueda_empleado" class="">
                                      <a href="search-by-id-mempl-p">Empleado</a>
                                  </li>
                              </ul>
                          </li>

                          <li id="menu_generarcodigo">
                              <a href="generate-device-code" aria-expanded="false">
                                <i class="fa fa-mobile-phone" style="font-size: 18px; width: 24px;"></i> 
                                <span class="menu-title">Generar C&oacute;digo</span>
                              </a>
                          </li>

                          <li>
                              <a href="javascript:console.log()" aria-expanded="false">
                                <i class="fa fa-cog" style="font-size: 18px; width: 24px;"></i> 
                                <span class="menu-title">Configuraci&oacute;n</span> 
                                <i class="arrow"></i>
                              </a>
                              <ul aria-expanded="false" class=""> 
                                  <li id="menu_configuracion_listausuario" class="">
                                      <a href="all-client-user">Lista Usuario</a>
                                  </li>
                                  <li id="menu_configuracion_agregarusuario" class="">
                                      <a href="add-client-user">Agregar Usuario</a>
                                  </li>
                              </ul>
                          </li>

                        </ul>

                                        
                </div>
                <div class="nano-pane" style="display: none;"><div class="nano-slider" style="height: 824px; transform: translate(0px, 0px);"></div></div>
            </div>
        </div>
    </div>



<script>
    $(document).ready( function () {
      var alto = $(window).height();
      $("#mainnav").height(alto-60);
    });
</script>
























              
</div>
  
  
  
  

<!-- <!-- model show all admin user -->
<div class="modal fade" id="showAdminUser" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    Add .modal-dialog-centered to .modal-dialog to vertically center the modal
    <div class="modal-dialog modal-dialog-centered modal-dialog-centered-important" role="document" >
        <div class="modal-content row modal-content-h-w" >
            <div class="modal-header app-heading"  class="col-xs-12 col-sm-4 col-md-4">
                 <span><i class="fa fa-table"></i>&nbsp;List of User</span>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
            	
            </div>
            
            <div class="modal-footer  getDevicePopUp">
         		 <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                 <button type="button" class="btn btn-success">Register</button>
       		 </div>           
        </div>
    </div>
</div>



<div class="modal fade" id="newClientUser" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    Add .modal-dialog-centered to .modal-dialog to vertically center the modal
    <div class="modal-dialog modal-dialog-centered modal-dialog-centered-important" role="document" >
        <div class="modal-content row modal-content-h-w" >
            <div class="modal-header app-heading"  class="col-xs-12 col-sm-4 col-md-4">
                 <span><i class="fa fa-plus"></i>&nbsp;New User</span>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
               <div class="row main" style="padding-left: 20px;padding-right: 20px;">
				<div class="main-login main-center">
					<form class="" method="post" action="#">
						<div class="form-group">
							<label for="name" class="cols-sm-2 control-label">Client name</label>
							<div class="cols-sm-10">
								<div class="input-group">
									<select id="clientClientId" name="clientId" class="form-control "></select>
								</div>
							</div>
						</div>
						<div class="form-group">
							<label for="name" class="cols-sm-2 control-label">Your Name</label>
							<div class="cols-sm-10">
								<div class="input-group">
									<span class="input-group-addon"><i class="fa fa-user fa" aria-hidden="true"></i></span>
									<input type="text" class="form-control" name="name" id="cliname"  placeholder="Enter your Name"/>
								</div>
							</div>
						</div>

						<div class="form-group">
							<label for="email" class="cols-sm-2 control-label">Your Email</label>
							<div class="cols-sm-10">
								<div class="input-group">
									<span class="input-group-addon"><i class="fa fa-envelope fa" aria-hidden="true"></i></span>
									<input type="text" class="form-control" name="email" id="cliemail"  placeholder="Enter your Email"/>
								</div>
							</div>
						</div>

						<div class="form-group">
							<label for="username" class="cols-sm-2 control-label">Username</label>
							<div class="cols-sm-10">
								<div class="input-group">
									<span class="input-group-addon"><i class="fa fa-users fa" aria-hidden="true"></i></span>
									<input type="text" class="form-control" name="username" id="cliusername"  placeholder="Enter your Username"/>
								</div>
							</div>
						</div>

						<div class="form-group">
							<label for="password" class="cols-sm-2 control-label">Password</label>
							<div class="cols-sm-10">
								<div class="input-group">
									<span class="input-group-addon"><i class="fa fa-lock fa-lg" aria-hidden="true"></i></span>
									<input type="password" class="form-control" name="password" id="clipassword"  placeholder="Enter your Password"/>
								</div>
							</div>
						</div>

						<div class="form-group">
							<label for="confirm" class="cols-sm-2 control-label">Confirm Password</label>
							<div class="cols-sm-10">
								<div class="input-group">
									<span class="input-group-addon"><i class="fa fa-lock fa-lg" aria-hidden="true"></i></span>
									<input type="password" class="form-control" name="confirm" id="cliconfirm"  placeholder="Confirm your Password"/>
								</div>
							</div>
						</div>
						
					</form>
				</div>
			</div>
            </div>
            
            <div class="modal-footer  getDevicePopUp">
         		 <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                 <button type="button" class="btn btn-success">Register</button>
       		 </div>           
        </div>
    </div>
