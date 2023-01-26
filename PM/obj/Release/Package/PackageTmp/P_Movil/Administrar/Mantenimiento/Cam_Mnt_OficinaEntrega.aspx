<%@ Page Language="VB" AutoEventWireup="false" Inherits="P_Movil_Administrar_Mantenimiento_Cam_Mnt_OficinaEntrega" Codebehind="Cam_Mnt_OficinaEntrega.aspx.vb" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../../../Common/Styles/Uniform/default/css/uniform.default.min.css" rel="stylesheet" type="text/css" />
    <script src="../../../Common/Scripts/json2.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/knockout-2.3.0.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/KnockoutValidation/knockout.validation.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/KnockoutValidation/Localization/es-ES.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/JqueryUI/jquery-ui.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jqGrid/i18n/grid.locale-es.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/jquery.uniform.min.js" type="text/javascript"></script>
    <script src="../../../Common/Scripts/Utilitario.js" type="text/javascript"></script>
    <script src="Cam_Mnt_OficinaEntrega.js" type="text/javascript"></script>
    <%--<script type="text/javascript"></script>--%>
</head>
<body>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hdfIdOficina" runat="server"/>
        <asp:HiddenField ID="hdfIdCliente" runat="server"/>
        <div id="dvContenido">
            <div id="dvCampos" class="dvPanel">
                <table>
                    <tr style="display:none;">
                        <td class="tdEtiqueta">
                            <asp:Label ID="lblActivo" runat="server" text="Activo"></asp:Label>
                        </td>
                        <td>
                            <input id="chkEstado" type="checkbox"/>
                        </td>
                    </tr>
<%--                    <tr>
                        <td class="tdEtiqueta">
                            <asp:Label ID="lblPaisCab" runat="server" Text="Pais"></asp:Label>                        
                        </td>
                        <td class="">
                            <asp:DropDownList ID="ddlPais" runat="server">
                                <asp:ListItem Text="Peru" ></asp:ListItem>
                            </asp:DropDownList>
                        </td>
                    </tr>--%>
                    <tr>
                        <td class="tdEtiqueta">
                            <asp:Label ID="lblCiudadCab" runat="server" Text="Departamento"></asp:Label>                        
                        </td>
                        <td class="">
                            <%--<asp:DropDownList ID="ddlCiudad" runat="server"></asp:DropDownList>--%>
                            <select id="ddlCiudad">				
		                        <option value="01">AMAZONAS</option>					
		                        <option value="02">ANCASH</option>					
		                        <option value="03">APURIMAC</option>					
		                        <option value="04">AREQUIPA</option>					
		                        <option value="05">AYACUCHO</option>					
		                        <option value="06">CAJAMARCA</option>					
		                        <option value="07">CALLAO</option>					
		                        <option value="08">CUSCO</option>					
		                        <option value="09">HUANCAVELICA</option>					
		                        <option value="10">HUANUCO</option>					
		                        <option value="11">ICA</option>					
		                        <option value="12">JUNIN</option>					
		                        <option value="13">LA LIBERTAD</option>					
		                        <option value="14">LAMBAYEQUE</option>					
		                        <option value="15" selected="selected">LIMA</option>					
		                        <option value="16">LORETO</option>					
		                        <option value="17">MADRE DE DIOS</option>					
		                        <option value="18">MOQUEGUA</option>					
		                        <option value="19">PASCO</option>					
		                        <option value="20">PIURA</option>					
		                        <option value="21">PUNO</option>					
		                        <option value="22">SAN MARTIN</option>					
		                        <option value="23">TACNA</option>					
		                        <option value="24">TUMBES</option>					
		                        <option value="25">UCAYALI</option>							
		                     </select>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdEtiqueta">
                            <asp:Label ID="lblProvinciaCab" runat="server" Text="Provincia"></asp:Label>                        
                        </td>
                        <td class="">
<%--                            <asp:DropDownList ID="ddlProvincia" runat="server"></asp:DropDownList>--%>
                            <select id="ddlProvincia">			
		                        <option value="05"> CAÑETE</option>				
		                        <option value="02">BARRANCA</option>				
		                        <option value="03">CAJATAMBO</option>				
		                        <option value="04">CANTA</option>				
		                        <option value="06">HUARAL</option>				
		                        <option value="07">HUAROCHIRI</option>				
		                        <option value="08">HUAURA</option>				
		                        <option value="01" selected="selected">LIMA</option>				
		                        <option value="09">OYON</option>				
		                        <option value="10">YAUYOS</option>					
		                    </select>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdEtiqueta">
                            <asp:Label ID="lblDistritoCab" runat="server" Text="Distrito"></asp:Label>                        
                        </td>
                        <td class="">
<%--                            <asp:DropDownList ID="ddlDistrito" runat="server"></asp:DropDownList>--%>
                            <select id="ddlDistrito">
		                        <option value="0101">LIMA</option>
                                <option value="0102">ANCON</option>
                                <option value="0103">ATE</option>
                                <option value="0104">BARRANCO</option>
                                <option value="0105">BREÐA</option>
                                <option value="0106">CARABAYLLO</option>
                                <option value="0107">CHACLACAYO</option>
                                <option value="0108">CHORRILLOS</option>
                                <option value="0109">CIENEGUILLA</option>
                                <option value="0110">COMAS</option>
                                <option value="0111">EL AGUSTINO</option>
                                <option value="0112">INDEPENDENCIA</option>
                                <option value="0113">JESUS MARIA</option>
                                <option value="0114">LA MOLINA</option>
                                <option value="0115">LA VICTORIA</option>
                                <option value="0116">LINCE</option>
                                <option value="0117">LOS OLIVOS</option>
                                <option value="0118">LURIGANCHO</option>
                                <option value="0119">LURIN</option>
                                <option value="0120">MAGDALENA DEL MAR</option>
                                <option value="0121">MAGDALENA VIEJA</option>
                                <option value="0122">MIRAFLORES</option>
                                <option value="0123">PACHACAMAC</option>
                                <option value="0124">PUCUSANA</option>
                                <option value="0125">PUENTE PIEDRA</option>
                                <option value="0126">PUNTA HERMOSA</option>
                                <option value="0127">PUNTA NEGRA</option>
                                <option value="0128">RIMAC</option>
                                <option value="0129">SAN BARTOLO</option>
                                <option value="0130">SAN BORJA</option>
                                <option value="0131">SAN ISIDRO</option>
                                <option value="0132">SAN JUAN DE LURIGANCHO</option>
                                <option value="0133">SAN JUAN DE MIRAFLORES</option>
                                <option value="0134">SAN LUIS</option>
                                <option value="0135">SAN MARTIN DE PORRES</option>
                                <option value="0136">SAN MIGUEL</option>
                                <option value="0137">SANTA ANITA</option>
                                <option value="0138">SANTA MARIA DEL MAR</option>
                                <option value="0139">SANTA ROSA</option>
                                <option value="0140">SANTIAGO DE SURCO</option>
                                <option value="0141">SURQUILLO</option>
                                <option value="0142">VILLA EL SALVADOR</option>
                                <option value="0143">VILLA MARIA DEL TRIUNFO
                                </option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdEtiqueta">
                            <asp:Label ID="lblDescripcionCab" runat="server" text="Descripción"></asp:Label>
                        </td>
                        <td>
                            <asp:TextBox ID="txtDescripcion" runat="server" Width="300px" Text="Sede Central"></asp:TextBox>                    
                        </td>
                    </tr>
                    <tr>
                        <td class="tdEtiqueta">
                            <asp:Label ID="txtDireccionCompletaCab" runat="server" text="Dirección"></asp:Label>
                        </td>
                        <td>
                            <asp:TextBox ID="txtDireccionCompleta" runat="server" Width="450px"  Text="AV. República de Panamá 3055"></asp:TextBox>                    
                        </td>
                    </tr>
                    <tr>
                        <td class="tdEtiqueta">
                            <asp:Label ID="lblPersonaContactoCab" runat="server" text="Persona Contacto"></asp:Label>
                        </td>
                        <td>
                            <asp:TextBox ID="txtPersonaContacto" runat="server" Width="400px" Text="Edgar Quispe"></asp:TextBox>                    
                        </td>
                    </tr>
                    <tr>
                        <td class="tdEtiqueta">
                            <asp:Label ID="lblReferenciaCab" runat="server" text="Referencia"></asp:Label>
                        </td>
                        <td>
                            <asp:TextBox ID="txtReferencia" runat="server" Width="500px"></asp:TextBox>                    
                        </td>
                    </tr>
                    <tr>
                        <td class="tdEtiqueta">
                            <asp:Label ID="lblTelefonoCab" runat="server" text="Telefono de contacto"></asp:Label>
                        </td>
                        <td>
                            <asp:TextBox ID="txtTelefono" runat="server" Width="500px" Text="2655455 #5454"></asp:TextBox>                    
                        </td>
                    </tr>
                    <tr>
                        <td class="tdEtiqueta">
                            <asp:Label ID="lblHorarioAtencionCab" runat="server" text="Horario de atención"></asp:Label>
                        </td>
                        <td>
                            <asp:TextBox ID="txtHorarioAtencion" runat="server" Width="500px" Text="LUN A VIE: DE 9 AM. A 6 PM. SAB: DE 9:30 AM. A 12:30 M."></asp:TextBox>                    
                        </td>
                    </tr>
                    <tr>
                        <td class="tdEtiqueta">
                            <asp:Label ID="lblRepartoDirectoCab" runat="server" text="Reparto Directo"></asp:Label>
                        </td>
                        <td>
                            <input id="chkRepartoDirecto" type="checkbox"/>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdEtiqueta">
                            <asp:Label ID="lblTipoEnvioCab" runat="server" text="Tipo de Envio"></asp:Label>
                        </td>
                        <td>
				            <div style="font-size:8pt; margin-top:3px;">
					            <label>
						            <input type="radio" name="rblstTipoEnvio" value="L" checked="checked"/> Local
					            </label>
					            <label>
						            <input type="radio" name="rblstTipoEnvio" value="R"/> Remoto
					            </label>
				            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdEtiqueta">
                            <asp:Label ID="lblAsociacionCab" runat="server" text="Asociación"></asp:Label>
                        </td>
                        <td>
				            <div style="font-size:8pt; margin-top:3px;">
					            <label>
						            <input type="radio" name="rblstAsociacion" value="A" /> Área
					            </label>
					            <label>
						            <input type="radio" name="rblstAsociacion" value="C" checked="checked"/> Centro de Costo
					            </label>
				            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdEtiqueta">
                            <asp:Label ID="lblAsociacionAreaCab" runat="server" text="Areas"></asp:Label>
                            <asp:Label ID="lblAsociacionCentroCostoCab" runat="server" text="Centros de costo"></asp:Label>
                        </td>
                        <td>
                            <div id="btnAsociar" class="btnNormal">
                                <%--<asp:Image ID="Image1" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />--%>
                                <a>Asociar</a>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
            <div id="dvAcciones" style="margin-top:2px;">
                <div id="btnGuardar" class="btnNormal">
                    <asp:Image ID="imgGuardar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Guardar.png" />
                    <a>Guardar</a>
                </div>
                <div id="btnCerrar" class="btnNormal">
                    <asp:Image ID="imgCerrar" runat="server" ImageUrl="~/Common/Images/Mantenimiento/Salir.gif" />
                    <a>Cerrar</a>
                </div>
            </div>
        </div>
        <div id="dvArea" style="display:none;padding:0px; margin:0px;">
            <iframe id="ifArea" width="730" height="470" frameborder="0" style="padding:0px; margin:0px;"></iframe>
        </div>
        <div id="dvCCO" style="display:none;padding:0px; margin:0px;">
            <iframe id="ifCCO" width="470" height="340" frameborder="0" style="padding:0px; margin:0px;"></iframe>
        </div>
    </form>
</body>
</html>
