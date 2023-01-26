function startTimeOnKeyPress(event) {
	var key = window.event ? event.keyCode : event.which;
	if (event.keyCode === 8) {
		if (event.target.value.length > 4) {
			return false;
		} else {
			return true;
		}
	} else if (key < 47 || key > 58 ) {
		return false;
	} else {
		if (event.target.value.length > 4) {
			return false;
		} else {
			return true;
		}
	}
}
function endTimeOnKeyPress(event) {
	var key = window.event ? event.keyCode : event.which;
	if (event.keyCode === 8) {
		if (event.target.value.length > 4) {
			return false;
		} else {
			return true;
		}
	} else if (key < 47 || key > 58 ) {
		return false;
	} else {
		if (event.target.value.length > 4) {
			return false;
		} else {
			return true;
		}
	}
}

function goBack() {
	window.history.back();
}

function tesurl(S) {
	alert(s);
}

function searchByIdOrgaValidateForm() {
	var num = document.forms["searchByIdOrgaForm"]["mOrgaId"].value;
	if (num == "") {
		document.getElementById("searchByIdOrgaId").textContent = "Este campo es necesario.";
		return false;
	} else if (!parseInt(num)) {
		document.getElementById("searchByIdOrgaId").textContent = "Ingrese un número válido.";
		return false;
	} else {
		document.getElementById("searchByIdOrgaId").textContent = "";
		return true;
	}
}

function addClient() {
	var cliId = document.forms["cliForm"]["cliId"].value;
	var cliName = document.forms["cliForm"]["cliName"].value;
	var cliEst = document.forms["cliForm"]["cliEst"].value;
	var cliCulture = document.forms["cliForm"]["cliCulture"].value;
	var clilogo = document.forms["cliForm"]["clilogo"].value;

	if (cliId.trim().length > 0) {
		if (!parseInt(cliId)) {
			document.getElementById("cliIdError").textContent = "Ingrese un número válido.";
			return false;
		} else {
			document.getElementById("cliIdError").textContent = "";
		}
		document.getElementById("cliIdError").textContent = "";
	} else {
		document.getElementById("cliIdError").textContent = "Requerido";
		return false;
	}

	if (cliName.trim() != "") {
		document.getElementById("cliNameError").textContent = "";
	} else {
		document.getElementById("cliNameError").textContent = "Requerido";
		return false;
	}

	if (cliEst.trim().length > 0) {
		document.getElementById("cliEstError").textContent = "";
	} else {
		document.getElementById("cliEstError").textContent = "Seleccione";
		return false;
	}

	if (cliCulture.trim().length > 0) {
		document.getElementById("cliCultureError").textContent = "";
	} else {
		document.getElementById("cliCultureError").textContent = "Seleccione";
		return false;
	}

	if (clilogo.trim().length) {

		if (clilogo.match(/jpg.*/) || clilogo.match(/jpeg.*/)
				|| clilogo.match(/png.*/) || clilogo.match(/ico.*/)) {
			document.getElementById("clilogoError").textContent = "";

		} else {
			document.getElementById("clilogoError").textContent = "Seleccione un Logo válido";
			return false;
		}
	} else {
		document.getElementById("clilogoError").textContent = "Seleccione Logo";
		return false;
	}
	return true;
}

$(document).ready(function() {
	$('.dropdown-menu-bg li a').addClass('button-group-bg');
});

function addMOrga() {
	var orgId = document.forms["orgForm"]["orgId"].value;
	var orgName = document.forms["orgForm"]["orgName"].value;
	var orgCODORG = document.forms["orgForm"]["orgCODORG"].value;
	var orgNOMORG = document.forms["orgForm"]["orgNOMORG"].value;

	var oRGAvcCORPER = document.forms["orgForm"]["oRGAvcCORPERId"].value;
	var oRGAvcCORJFT = document.forms["orgForm"]["oRGAvcCORJFTId"].value;
	var oRGACodInt2 = document.forms["orgForm"]["oRGACodInt2Id"].value;

	var date = document.forms["orgForm"]["date"].value;
	var oRGAdaFECINIdate = document.forms["orgForm"]["oRGAdaFECINIdate"].value;

	if (orgId.trim().length > 0) {
		if (!parseInt(orgId)) {
			document.getElementById("orgIdError").textContent = "Ingrese un número válido.";
			return false;
		} else {
			document.getElementById("orgIdError").textContent = "";
		}
		document.getElementById("orgIdError").textContent = "";
	} else {
		document.getElementById("orgIdError").textContent = "Requerido";
		return false;
	}

	if (orgName.trim().length > 0) {
		document.getElementById("orgNameError").textContent = "";
	} else {
		document.getElementById("orgNameError").textContent = "Seleccione";
		return false;
	}

	if (orgCODORG.trim().length > 0) {
		document.getElementById("orgCODORGError").textContent = "";
	} else {
		document.getElementById("orgCODORGError").textContent = "Requerido";
		return false;
	}

	if (orgNOMORG.trim().length > 0) {
		document.getElementById("orgNOMORGError").textContent = "";
	} else {
		document.getElementById("orgNOMORGError").textContent = "Requerido";
		return false;
	}

	if (oRGAvcCORPER.trim().length > 0) {
		document.getElementById("oRGAvcCORPERError").textContent = "";
	} else {
		document.getElementById("oRGAvcCORPERError").textContent = "Requerido";
		return false;
	}

	if (oRGAvcCORJFT.trim().length > 0) {
		document.getElementById("oRGAvcCORJFTError").textContent = "";
	} else {
		document.getElementById("oRGAvcCORJFTError").textContent = "Requerido";
		return false;
	}

	if (oRGACodInt2.trim().length > 0) {
		document.getElementById("oRGACodInt2Error").textContent = "";
	} else {
		document.getElementById("oRGACodInt2Error").textContent = "Requerido";
		return false;
	}

	var obj = JSON.parse(stringToDate(date));
	var message = obj.resMessage;// alert(message);
	if (JSON.parse(obj.status)) {
		if (new Date(obj.data).getTime() >= getDate().getTime()) {
			document.getElementById("dateError").textContent = "";
		} else {
			document.getElementById("dateError").textContent = "No se permiten fechas anteriores";
			return false;
		}
	} else {
		document.getElementById("dateError").textContent = message;
		return false;
	}

	var dateOrga = JSON.parse(stringToDate(oRGAdaFECINIdate));
	var message = dateOrga.resMessage;// alert(message);
	if (JSON.parse(dateOrga.status)) {
		if (new Date(dateOrga.data).getTime() >= getDate().getTime()) {
			document.getElementById("oRGAdaFECINIError").textContent = "";
		} else {
			document.getElementById("oRGAdaFECINIError").textContent = "No se permiten fechas anteriores";
			return false;
		}
	} else {
		document.getElementById("oRGAdaFECINIError").textContent = message;
		return false;
	}

	return true;
}
function changeValueInHiddenBoxAddMEmpl(){
	var clientId = document.getElementById("clientSelect").value;
	var mOrgaSelect = document.getElementById("mOrgaSelect").value;
	document.getElementById("mOrgaFK").value=clientId;
	document.getElementById("mOrgaPK").value=mOrgaSelect;
}
function addMEmpl() {
	var clientId = document.getElementById("clientSelect").value;
	var mOrgaSelect = document.getElementById("mOrgaSelect").value;
	document.getElementById("mOrgaFK").value=clientId;
	document.getElementById("mOrgaPK").value=mOrgaSelect;
	
	
	var mempl = document.forms["addMEmplForm"]["memplId"].value;
	var vcNOMEMP = document.forms["addMEmplForm"]["vcNOMEMP"].value;
	var vcUBIFIS = document.forms["addMEmplForm"]["vcUBIFIS"].value;
	var date = document.forms["addMEmplForm"]["date"].value;
	var vcCORPER = document.forms["addMEmplForm"]["vcCORPER"].value;
	var vcCORJFT = document.forms["addMEmplForm"]["vcCORJFT"].value;
	var eMPLCodInt2 = document.forms["addMEmplForm"]["eMPLCodInt2"].value;
	
	if (mOrgaSelect.trim().length > 0) {
		document.getElementById("morgaError").textContent = "";
	} else {
		document.getElementById("morgaError").textContent = "Seleccione Organización";
		return false;
	}
	
	if (mempl.trim().length > 0) {
		document.getElementById("memplError").textContent = "";
	} else {
		document.getElementById("memplError").textContent = "Requerido";
		return false;
	}
	if (vcNOMEMP.trim().length > 0) {
		document.getElementById("vcNOMEMPError").textContent = "";
	} else {
		document.getElementById("vcNOMEMPError").textContent = "Requerido";
		return false;
	}
	
	if (vcUBIFIS.trim().length > 0) {
		document.getElementById("vcUBIFISError").textContent = "";
	} else {
		document.getElementById("vcUBIFISError").textContent = "Requerido";
		return false;
	}
	
	if (vcCORPER.trim().length > 0) {
		document.getElementById("vcCORPERError").textContent = "";
	} else {
		document.getElementById("vcCORPERError").textContent = "Requerido";
		return false;
	}
	
	if (vcCORJFT.trim().length > 0) {
		document.getElementById("vcCORJFTError").textContent = "";
	} else {
		document.getElementById("vcCORJFTError").textContent = "Requerido";
		return false;
	}
	if (eMPLCodInt2.trim().length > 0) {
		document.getElementById("eMPLCodInt2Error").textContent = "";
	} else {
		document.getElementById("eMPLCodInt2Error").textContent = "Requerido";
		return false;
	}
	
	var obj = JSON.parse(stringToDate(date));
	var message = obj.resMessage;// alert(message);
	if (JSON.parse(obj.status)) {
		if (new Date(obj.data).getTime() >= getDate().getTime()) {
			document.getElementById("dateError").textContent = "";
		} else {
			document.getElementById("dateError").textContent = "No se permiten fechas anteriores";
			return false;
		}
	} else {
		document.getElementById("dateError").textContent = message;
		return false;
	}
	return true;
	 
}//memplId close method


/*
 * This method is use for saving client dash board employee details
 */
function addMEmpl2() {
	
	
	var mempl = document.forms["addMEmplForm"]["memplId"].value;
	var vcNOMEMP = document.forms["addMEmplForm"]["vcNOMEMP"].value;
	var vcUBIFIS = document.forms["addMEmplForm"]["vcUBIFIS"].value;
	var date = document.forms["addMEmplForm"]["date"].value;
	var vcCORPER = document.forms["addMEmplForm"]["vcCORPER"].value;
	var vcCORJFT = document.forms["addMEmplForm"]["vcCORJFT"].value;
	var eMPLCodInt2 = document.forms["addMEmplForm"]["eMPLCodInt2"].value;
	
	if (mempl.trim().length > 0) {
		document.getElementById("memplError").textContent = "";
	} else {
		document.getElementById("memplError").textContent = "Requerido";
		return false;
	}
	if (vcNOMEMP.trim().length > 0) {
		document.getElementById("vcNOMEMPError").textContent = "";
	} else {
		document.getElementById("vcNOMEMPError").textContent = "Requerido";
		return false;
	}
	
	if (vcUBIFIS.trim().length > 0) {
		document.getElementById("vcUBIFISError").textContent = "";
	} else {
		document.getElementById("vcUBIFISError").textContent = "Requerido";
		return false;
	}
	
	if (vcCORPER.trim().length > 0) {
		document.getElementById("vcCORPERError").textContent = "";
	} else {
		document.getElementById("vcCORPERError").textContent = "Requerido";
		return false;
	}
	
	if (vcCORJFT.trim().length > 0) {
		document.getElementById("vcCORJFTError").textContent = "";
	} else {
		document.getElementById("vcCORJFTError").textContent = "Requerido";
		return false;
	}
//	if (eMPLCodInt2.trim().length > 0) {
//		document.getElementById("eMPLCodInt2Error").textContent = "";
//	} else {
//		document.getElementById("eMPLCodInt2Error").textContent = "Requerido";
//		return false;
//	}
	
	var obj = JSON.parse(stringToDate(date));
	var message = obj.resMessage;// alert(message);
	if (JSON.parse(obj.status)) {
		if (new Date(obj.data).getTime() >= getDate().getTime()) {
			document.getElementById("dateError").textContent = "";
		} else {
			document.getElementById("dateError").textContent = "No se permiten fechas anteriores";
			return false;
		}
	} else {
		document.getElementById("dateError").textContent = message;
		return false;
	}
	
	return true;
	 
}//memplId close method



function stringToDate(date) {
	// dd-MM-yyyy to MM-dd-yyyy
	var responseArr;
	var status = false;
	var data;
	var resMessage = "success";
	if (date.trim().length == 10) {
		if (date.trim().split('-').length == 3) {
			var dateArr = date.split('-');
			var month = dateArr[1];
			var day = dateArr[0];
			var year = dateArr[2];
			data = new Date(month + "-" + day + "-" + year);
			if (isNaN(data.getTime())) {
				status = false;
				resMessage = "Enter valid date";
				return responseArr = '{"status":"' + status + '","data":"'
						+ data + '","resMessage":"' + resMessage + '"}';
			} else {
				status = true;
			}
		} else {
			resMessage = "Enter valid formatted date";
		}
	} else {
		resMessage = "Enter valid date";
	}
	return responseArr = '{"status":"' + status + '","data":"' + data
			+ '","resMessage":"' + resMessage + '"}';
}

function getDate() {
	var date = new Date();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	var year = date.getFullYear();
	return new Date(month + "-" + day + "-" + year);

}

function updateClient() {

	var genCliName = document.forms["updateClientForm"]["genCliName"].value;
	var genCliStatus = document.forms["updateClientForm"]["genCliStatus"].value;

	if (genCliName.trim().length > 0) {
		document.getElementById("genCliNameError").textContent = "";
	} else {
		document.getElementById("genCliNameError").textContent = "Requerido";
		return false;
	}
	if (genCliStatus.trim().length > 0) {
		document.getElementById("genCliStatusError").textContent = "";
	} else {
		document.getElementById("genCliStatusError").textContent = "Requerido";
		return false;
	}
	return true;
}

function searchByIdClient() {
	var id = document.forms["searchByIdClientForm"]["id"].value;

	if (id.trim().length > 0) {
		document.getElementById("idError").textContent = "";
	} else {
		document.getElementById("idError").textContent = "Este campo es necesario.";
		return false;
	}
	return true;
}

function searchByIdMempl() {
	var id = document.forms["searchByIdMemplForm"]["id"].value;

	if (id.trim().length > 0) {
		document.getElementById("idError").textContent = "";
	} else {
		document.getElementById("idError").textContent = "Este campo es necesario.";
		return false;
	}
	return true;
}

function getDeviceCode(value) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("deviceCode").innerHTML = this.responseText;
			console.log(this.responseText);
		}
	};
	xhttp.open("GET", "get-device-code?id=" + value, true);
	xhttp.send();
}

function addGlyphicon() {
	document.getElementById("glyphicondashboard").remoceClass = "fa fa-dashboard";
	document.getElementById("glyphicondashboard").className = "fa fa-reorder";

}

function removeGlyphicon() {
	document.getElementById("glyphicondashboard").remoceClass = "fa fa-reorder";
	document.getElementById("glyphicondashboard").className = "fa fa-dashboard";
}

function loadClienId() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		var selectobject = document.getElementById("adminClientId");
		for (var i = 0; i < selectobject.length; i++) {
			selectobject.remove(i);
		}
		if (this.readyState == 4 && this.status == 200) {
			jsonArr = JSON.parse(this.responseText);
			for ( var key in jsonArr) {

				var select = document.getElementById("adminClientId");
				var option = document.createElement("option");
				option.text = jsonArr[key];
				option.value = key;
				select.add(option);
			}
		}
	};

	xhttp.open("GET", "get-client-id", true);
	xhttp.send();
}//




function findAllAdminUsers() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			console.log(this.responseText);

		}
	};
	xhttp.open("GET", "get-all-admin-user", true);
	xhttp.send();
}

function editMOrga() {

	var oRGAvcCODORG = document.forms["editMOrgaForm"]["oRGAvcCODORG"].value;
	// var oRGAvcNOMORG = document.forms["editMOrgaForm"]["oRGAvcNOMORG"].value;
	var oRGAvcCORPER = document.forms["editMOrgaForm"]["oRGAvcCORPER"].value;
	var oRGAvcCORJFT = document.forms["editMOrgaForm"]["oRGAvcCORJFT"].value;
	var oRGACodInt2 = document.forms["editMOrgaForm"]["oRGACodInt2"].value;
	var date = document.forms["editMOrgaForm"]["date"].value;

	if (oRGAvcCODORG.trim().length > 0) {
		document.getElementById("oRGAvcCODORGError").textContent = "";
	} else {
		document.getElementById("oRGAvcCODORGError").textContent = "Requerido.";
		return false;
	}
	/*
	 * if(oRGAvcNOMORG.trim().length>0){
	 * document.getElementById("oRGAvcNOMORGError").textContent = ""; }else{
	 * document.getElementById("oRGAvcNOMORGError").textContent = "Required.";
	 * return false; }
	 */
	if (oRGAvcCORPER.trim().length > 0) {
		document.getElementById("oRGAvcCORPERError").textContent = "";
	} else {
		document.getElementById("oRGAvcCORPERError").textContent = "Requerido.";
		return false;
	}

	if (oRGAvcCORJFT.trim().length > 0) {
		document.getElementById("oRGAvcCORJFTError").textContent = "";
	} else {
		document.getElementById("oRGAvcCORJFTError").textContent = "Requerido.";
		return false;
	}

	if (oRGACodInt2.trim().length > 0) {
		document.getElementById("oRGACodInt2Error").textContent = "";
	} else {
		document.getElementById("oRGACodInt2Error").textContent = "Requerido.";
		return false;
	}

	var obj = JSON.parse(stringToDate(date));
	var message = obj.resMessage;// alert(message);
	if (JSON.parse(obj.status)) {
		document.getElementById("dateError").textContent = "";
	} else {

		document.getElementById("dateError").textContent = message;
		return false;
	}

	return true;
}

function editMEmpl() {
	var oRGAPinCODINT = document.forms["editMEmplForm"]["oRGAPinCODINT"].value;
	var eMPLvcUBIFIS = document.forms["editMEmplForm"]["eMPLvcUBIFIS"].value;
	var eMPLvcCORPER = document.forms["editMEmplForm"]["eMPLvcCORPER"].value;
	var eMPLvcCORJFT = document.forms["editMEmplForm"]["eMPLvcCORJFT"].value;
	var date = document.forms["editMEmplForm"]["date"].value;

	if (oRGAPinCODINT.trim().length > 0) {
		document.getElementById("oRGAPinCODINTError").textContent = "";
	} else {
		document.getElementById("oRGAPinCODINTError").textContent = "Requerido.";
		return false;
	}

	if (eMPLvcUBIFIS.trim().length > 0) {
		document.getElementById("eMPLvcUBIFISError").textContent = "";
	} else {
		document.getElementById("eMPLvcUBIFISError").textContent = "Requerido.";
		return false;
	}

	if (eMPLvcCORPER.trim().length > 0) {
		document.getElementById("eMPLvcCORPERError").textContent = "";
	} else {
		document.getElementById("eMPLvcCORPERError").textContent = "Requerido.";
		return false;
	}

	if (eMPLvcCORJFT.trim().length > 0) {
		document.getElementById("eMPLvcCORJFTError").textContent = "";
	} else {
		document.getElementById("eMPLvcCORJFTError").textContent = "Requerido.";
		return false;
	}
	var obj = JSON.parse(stringToDate(date));
	var message = obj.resMessage;// alert(message);
	if (JSON.parse(obj.status)) {
		document.getElementById("dateError").textContent = "";
	} else {
		document.getElementById("dateError").textContent = message;
		return false;
	}
	return true;
}

function editDevice() {
	var modelvar = document.forms["editDeviceForm"]["model"].value;
	var date = document.forms["editDeviceForm"]["date"].value;
	var finEst = document.forms["editDeviceForm"]["finEst"].value;
	if (modelvar.trim().length > 0) {
		document.getElementById("modelError").textContent = "";
	} else {
		document.getElementById("modelError").textContent = "Requerido.";
		return false;
	}
	if (finEst.trim().length > 0) {
		document.getElementById("finEstError").textContent = "";
	} else {
		document.getElementById("finEstError").textContent = "Requerido.";
		return false;
	}
	var obj = JSON.parse(stringToDate(date));
	var message = obj.resMessage;
	if (JSON.parse(obj.status)) {
		document.getElementById("dateError").textContent = "";
	} else {
		document.getElementById("dateError").textContent = message;
		return false;
	}
	return true;
}
function newMEmpl() {
	var oRGAPinCODINT = document.forms["newMEmplForm"]["oRGAPinCODINT"].value;
	var eMPLvcUBIFIS = document.forms["newMEmplForm"]["eMPLvcUBIFIS"].value;
	var eMPLvcCORPER = document.forms["newMEmplForm"]["eMPLvcCORPER"].value;
	var eMPLvcCORJFT = document.forms["newMEmplForm"]["eMPLvcCORJFT"].value;
	var date = document.forms["newMEmplForm"]["date"].value;

	if (oRGAPinCODINT.trim().length > 0) {
		document.getElementById("oRGAPinCODINTError").textContent = "";
	} else {
		document.getElementById("oRGAPinCODINTError").textContent = "Requerido.";
		return false;
	}

	if (eMPLvcUBIFIS.trim().length > 0) {
		document.getElementById("eMPLvcUBIFISError").textContent = "";
	} else {
		document.getElementById("eMPLvcUBIFISError").textContent = "Requerido.";
		return false;
	}

	if (eMPLvcCORPER.trim().length > 0) {
		document.getElementById("eMPLvcCORPERError").textContent = "";
	} else {
		document.getElementById("eMPLvcCORPERError").textContent = "Requerido.";
		return false;
	}

	if (eMPLvcCORJFT.trim().length > 0) {
		document.getElementById("eMPLvcCORJFTError").textContent = "";
	} else {
		document.getElementById("eMPLvcCORJFTError").textContent = "Requerido.";
		return false;
	}
	var obj = JSON.parse(stringToDate(date));
	var message = obj.resMessage;// alert(message);
	if (JSON.parse(obj.status)) {
		document.getElementById("dateError").textContent = "";
	} else {
		document.getElementById("dateError").textContent = message;
		return false;
	}
	return true;
}
/*
 * function registerAdminUser() { var adminEmail =
 * document.getElementById("adminEmail").value; var adminUserName =
 * document.getElementById("adminUserName").value; var adminPassword =
 * document.getElementById("adminPassword").value; var adminConfirmPass =
 * document.getElementById("adminConfirmPass").value;
 * 
 * if (adminEmail.trim().length > 0) {
 * document.getElementById("adminEmailError").textContent = ""; } else {
 * document.getElementById("adminEmailError").textContent = "Required Email id."
 * return false; } if (adminUserName.trim().length > 0) {
 * document.getElementById("adminUserNameError").textContent = ""; } else {
 * document.getElementById("adminUserNameError").textContent = "Required Email
 * id." return false; }
 * 
 * return false; }
 */

function applicationBlocked(value) {
	var valueArr = value.trim().split('=');
	var id = valueArr[0];
	var flag = valueArr[1];
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			reloadPage();
		}
	};
	xhttp.open("GET",
			"blocked-application-chacked?id=" + id + "&value=" + flag, true);
	xhttp.send();
	if (flag == "true") {
		document.getElementById("appBlockedRes").textContent = "App bloqueada exitosamente."
	} else if (flag == "false") {
		document.getElementById("appBlockedRes").textContent = "App desbloqueada exitosamente."
	}
}

function applicationInstallBlocked(value) {
	
	//var chack=document.getElementById("blockInstallationId").value;
	
	var valueArr = value.trim().split('=');
	var id = valueArr[0];
	var flag = valueArr[1];
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("applicationInstallRes").textContent = "Cambio satisfactorio."
			reloadPage();
		}
	};
	xhttp.open("GET", "application-installation-blocked?id=" + id + "&value="
			+ flag, true);
	xhttp.send();
}

function applicationUninstallBlocked(value) {
	var valueArr = value.trim().split('=');
	var id = valueArr[0];
	var flag = valueArr[1];

	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("applicationUninstallRes").textContent = "Cambio satisfactorio."
			reloadPage();
		}
	};
	xhttp.open("GET", "application-uninstallation-blocked?id=" + id + "&value="
			+ flag, true);
	xhttp.send();
}

// page reload function
function reloadPage() {
	setTimeout(function() {
		location.reload();
	}, 2000);
}

function startAppliOnTime(id) {
	var t = document.getElementById('allApplicationTable');
	var rows = t.rows; // rows collection -
	var timeFormat = /^([0-9]{2})\:([0-9]{2})$/;
	// https://developer.mozilla.org/en-US/docs/Web/API/HTMLTableElement
	for (var i = 0; i < rows.length; i++) {
		rows[i].onclick = function() {
			var cells = this.cells; // cells collection
			var start = cells[7].children[0].value;
			var end = cells[8].children[0].value;
			var newStartDate= new Date("May 26, 2016 " + start);
			var newEndDate= new Date("May 26, 2016 " + end);
			var startFlag=timeFormat.test(start);
			var endFlag=timeFormat.test(end);
			
			//alert(startFlag+"  "+endFlag);
			
			//alert(startFlag);
			//alert(startFlag=="false");
			/*if(startFlag="false"){
				//alert("33333333333333");
				document.getElementById("ffff").textContent = "Invalid time formate";
					document.getElementById("startAppliOnTimeRes").style.display = "none";
			}*/
		
			if("Invalid Date"==newStartDate){
				document.getElementById("startAppliOnTimeRes").textContent = "Hora de inicio no válida"
			}else if("Invalid Date"==newEndDate){
				document.getElementById("startAppliOnTimeRes").textContent = "Hora de fin no válida"
			}else if (start.length == 0) {
				document.getElementById("startAppliOnTimeRes").textContent = "Por favor, ingresa la hora hora de inicio."
			} else if (end.length == 0) {
				document.getElementById("startAppliOnTimeRes").textContent = "Por favor, ingresa la hora hora fin."
			} else if(start>end){
				document.getElementById("startAppliOnTimeRes").textContent = "La hora de inicio debe ser menor que la hora de fin (formato de hora 24 h.)"
			}else if(startFlag==false){
				document.getElementById("startAppliOnTimeRes").textContent = "Formato de hora inicio no válido";
					//document.getElementById("startAppliOnTimeRes").style.display = "none";
			}else if(endFlag==false){
				document.getElementById("startAppliOnTimeRes").textContent = "Formato de hora fin no válido";
					//document.getElementById("startAppliOnTimeRes").style.display = "none";
			}else {
				var xhttp = new XMLHttpRequest();
				xhttp.onreadystatechange = function() {
					if (this.readyState == 4 && this.status == 200) {
						document.getElementById("startAppliOnTimeRes").textContent = "Cambio satisfactorio."
						timeBlockedFirebase();
						reloadPage();
					}
				};
				xhttp.open("GET", "application-blocked-time?id=" + id
						+ "&startTime=" + start + "&endTime=" + end, true);
				xhttp.send();
			}

		}
	}
}

function userRegiste() {
	var pinCod = document.forms["userRegisteForm"]["pinCod"].value;
	var description = document.forms["userRegisteForm"]["description"].value;
	var userName = document.forms["userRegisteForm"]["userName"].value;
	var email = document.forms["userRegisteForm"]["email"].value;
	var password = document.forms["userRegisteForm"]["password"].value;

	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	var flag = re.test(String(email).toLowerCase());

	if (pinCod.trim().length > 0) {
		if (!parseInt(pinCod)) {
			document.getElementById("pinCodError").textContent = "Ingrese un número válido.";
			return false;
		} else {
			document.getElementById("pinCodError").textContent = "";
		}
		document.getElementById("pinCodError").textContent = "";
	} else {
		document.getElementById("pinCodError").textContent = "Requerido";
		return false;
	}

	if (description.trim().length > 0) {
		document.getElementById("descriptionError").textContent = "";
	} else {
		document.getElementById("descriptionError").textContent = "Requerido";
		return false;
	}

	if (userName.trim().length > 0) {
		document.getElementById("userNameError").textContent = "";
	} else {
		document.getElementById("userNameError").textContent = "Requerido";
		return false;
	}

	if (email.trim().length > 0) {
		if (flag.toString() == "false") {
			document.getElementById("emailError").textContent = "Ingrese un correo válido.";
			return false;
		} else {
			document.getElementById("emailError").textContent = "";
		}
		document.getElementById("emailError").textContent = "";
	} else {
		document.getElementById("emailError").textContent = "Requerido";
		return false;
	}

	if (password.trim().length > 0) {
		document.getElementById("passwordError").textContent = "";
	} else {
		document.getElementById("passwordError").textContent = "Requerido";
		return false;
	}
	return true;
}

function uploadSEGUsu() {
	var vcNom = document.forms["editSEGUsuarioForm"]["vcNomId"].value;
	var correo = document.forms["editSEGUsuarioForm"]["correoId"].value;
	var guidAD = document.forms["editSEGUsuarioForm"]["guidADId"].value;
	var chatActivo = document.forms["editSEGUsuarioForm"]["chatActivoId"].value;
	var date = document.forms["editSEGUsuarioForm"]["date"].value;
	var userImage = document.forms["editSEGUsuarioForm"]["userImageId"].value;
	var correoBK = document.forms["editSEGUsuarioForm"]["correoBKId"].value;

	if (userImage.trim().length != 0) {
		if (userImage.match(/jpg.*/) || userImage.match(/jpeg.*/)
				|| userImage.match(/png.*/) || userImage.match(/ico.*/)) {
			document.getElementById("userImageError").textContent = "";
		} else {
			document.getElementById("userImageError").textContent = "Seleccione una imagen válida";
			return false;
		}
	}

	if (vcNom.trim().length > 0) {
		document.getElementById("vcNomError").textContent = "";
	} else {
		document.getElementById("vcNomError").textContent = "Requerido";
		return false;
	}

	if (correo.trim().length > 0) {
		document.getElementById("correoError").textContent = "";
	} else {
		document.getElementById("correoError").textContent = "Requerido";
		return false;
	}

	if (guidAD.trim().length > 0) {
		document.getElementById("guidADError").textContent = "";
	} else {
		document.getElementById("guidADError").textContent = "Requerido";
		return false;
	}

	if (chatActivo.trim().length > 0) {
		document.getElementById("chatActivoError").textContent = "";
	} else {
		document.getElementById("chatActivoError").textContent = "Requerido";
		return false;
	}
	if (chatActivo.trim().length > 0) {
		document.getElementById("chatActivoError").textContent = "";
	} else {
		document.getElementById("chatActivoError").textContent = "Requerido";
		return false;
	}

	if (correoBK.trim().length > 0) {
		document.getElementById("correoBKError").textContent = "";
	} else {
		document.getElementById("correoBKError").textContent = "Requerido";
		return false;
	}

	return true;
}


function findMOrgaByClientId(){
	var clientId = document.getElementById("clientSelect").value;
	
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		var selectobject = document.getElementById("mOrgaSelect");
		for (var i = 0; i < selectobject.length; i++) {
			selectobject.remove(i);
		}
		var selectobject = document.getElementById("mEmplSelect");
		for (var i = 0; i < selectobject.length; i++) {
			selectobject.remove(i);
		}
		if (this.readyState == 4 && this.status == 200) {
			jsonArr = JSON.parse(this.responseText);
			for ( var key in jsonArr) {
				var select = document.getElementById("mOrgaSelect");
				var option = document.createElement("option");
				option.text = jsonArr[key];
				option.value = key;
				select.add(option);
			}
		}
	};
	xhttp.open("GET", "get-morga-by-cli-id?id="+clientId, true);
	xhttp.send();
}


function findMOrgaByClientId2(){
	var clientId = document.getElementById("clientSelect").value;
	
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		var selectobject = document.getElementById("mOrgaSelect");
		for (var i = 0; i < selectobject.length; i++) {
			selectobject.remove(i);
		}
		
		if (this.readyState == 4 && this.status == 200) {
			jsonArr = JSON.parse(this.responseText);
			for ( var key in jsonArr) {
				var select = document.getElementById("mOrgaSelect");
				var option = document.createElement("option");
				option.text = jsonArr[key];
				option.value = key;
				select.add(option);
			}
		}
	};
	xhttp.open("GET", "get-morga-by-cli-id?id="+clientId, true);
	xhttp.send();
}

function findMEmplByMOrgaId(){
	var morgaId = document.getElementById("mOrgaSelect").value;
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		var selectobject = document.getElementById("mEmplSelect");
		for (var i = 0; i < selectobject.length; i++) {
			selectobject.remove(i);
		}
		if (this.readyState == 4 && this.status == 200) {
			if(this.responseText.length>0){
			jsonArr = JSON.parse(this.responseText);
			for ( var key in jsonArr) {
				var select = document.getElementById("mEmplSelect");
				var option = document.createElement("option");
				option.text = jsonArr[key];
				option.value = key;
				select.add(option);
			}}
		}
	};
	xhttp.open("GET", "get-mempl-by-morga-id?id="+morgaId, true);
	xhttp.send();
}

function findMEmploByMOrgaIdAndCliId(){
	var morgaId = document.getElementById("mOrgaSelect").value;
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		var selectobject = document.getElementById("mEmplSelect");
		for (var i = 0; i < selectobject.length; i++) {
			selectobject.remove(i);
		}
		if (this.readyState == 4 && this.status == 200) {
			if(this.responseText.length>0){
			jsonArr = JSON.parse(this.responseText);
			for ( var key in jsonArr) {
				var select = document.getElementById("mEmplSelect");
				var option = document.createElement("option");
				option.text = jsonArr[key];
				option.value = key;
				select.add(option);
			}}
		}
	};
	xhttp.open("GET", "get-mempl-by-morga-id?id="+morgaId, true);
	xhttp.send();
	
}


function registerClientUser(){
	var pkclieentId = document.getElementById("clientSelect").value;
	var mEmpl = document.getElementById("mEmplSelect").value;
	
	document.getElementById("fMempl").value =pkclieentId;	
	document.getElementById("mEmplId").value =mEmpl;
	var mOrga = document.getElementById("mOrgaSelect").value;
	
	var pinCod = document.forms["clientRegisteForm"]["pinCod"].value;
	var description = document.forms["clientRegisteForm"]["description"].value;
	var userName = document.forms["clientRegisteForm"]["userName"].value;
	var email = document.forms["clientRegisteForm"]["email"].value;
	var password = document.forms["clientRegisteForm"]["password"].value;

	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	var flag = re.test(String(email).toLowerCase());

	if (pinCod.trim().length > 0) {
		if (!parseInt(pinCod)) {
			document.getElementById("pinCodError").textContent = "Ingrese un número válido.";
			return false;
		} else {
			document.getElementById("pinCodError").textContent = "";
		}
		document.getElementById("pinCodError").textContent = "";
	} else {
		document.getElementById("pinCodError").textContent = "Requerido";
		return false;
	}

	if (mOrga.trim().length > 0) {
		document.getElementById("selectMEmplError").textContent = "";
	} else {
		document.getElementById("selectMEmplError").textContent = "Seleccione empleado";
		return false;
	}
	
	
	if (pkclieentId.trim().length > 0) {
		document.getElementById("selectMEmplError").textContent = "";
	} else {
		document.getElementById("selectMEmplError").textContent = "Seleccione empleado";
		return false;
	}
	 

	if (mEmpl.trim().length > 0) {
		document.getElementById("selectMEmplError").textContent = "";
	} else {
		document.getElementById("selectMEmplError").textContent = "Seleccione empleado";
		return false;
	}
	if (description.trim().length > 0) {
		document.getElementById("descriptionError").textContent = "";
	} else {
		document.getElementById("descriptionError").textContent = "Requerido";
		return false;
	}

	if (userName.trim().length > 0) {
		document.getElementById("userNameError").textContent = "";
	} else {
		document.getElementById("userNameError").textContent = "Requerido";
		return false;
	}

	if (email.trim().length > 0) {
		if (flag.toString() == "false") {
			document.getElementById("emailError").textContent = "Ingrese un correo válido.";
			return false;
		} else {
			document.getElementById("emailError").textContent = "";
		}
		document.getElementById("emailError").textContent = "";
	} else {
		document.getElementById("emailError").textContent = "Requerido";
		return false;
	}

	if (password.trim().length > 0) {
		document.getElementById("passwordError").textContent = "";
	} else {
		document.getElementById("passwordError").textContent = "Requerido";
		return false;
	}
	return true;
}//registerClientUser

function registerClientUserDash(){
	var pinCod = document.forms["clientRegisteForm"]["pinCod"].value;
	var description = document.forms["clientRegisteForm"]["description"].value;
	var userName = document.forms["clientRegisteForm"]["userName"].value;
	var email = document.forms["clientRegisteForm"]["email"].value;
	var password = document.forms["clientRegisteForm"]["password"].value;

	var pkclieentId = document.getElementById("mEmplSelect").value;
	var memplpk=document.getElementById("mEmplPk").value=pkclieentId;
	
	//
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	var flag = re.test(String(email).toLowerCase());

	if (memplpk.trim().length > 0) {
		document.getElementById("selectMEmplError").textContent = "";
	} else {
		document.getElementById("selectMEmplError").textContent = "Seleccione empleado";
		return false;
	}
	
	
	if (pinCod.trim().length > 0) {
		if (!parseInt(pinCod)) {
			document.getElementById("pinCodError").textContent = "Ingrese un número válido";
			return false;
		} else {
			document.getElementById("pinCodError").textContent = "";
		}
		document.getElementById("pinCodError").textContent = "";
	} else {
		document.getElementById("pinCodError").textContent = "Requerido";
		return false;
	}


	if (description.trim().length > 0) {
		document.getElementById("descriptionError").textContent = "";
	} else {
		document.getElementById("descriptionError").textContent = "Requerido";
		return false;
	}

	if (userName.trim().length > 0) {
		document.getElementById("userNameError").textContent = "";
	} else {
		document.getElementById("userNameError").textContent = "Requerido";
		return false;
	}

	if (email.trim().length > 0) {
		if (flag.toString() == "false") {
			document.getElementById("emailError").textContent = "Ingrese un correo válido.";
			return false;
		} else {
			document.getElementById("emailError").textContent = "";
		}
		document.getElementById("emailError").textContent = "";
	} else {
		document.getElementById("emailError").textContent = "Requerido";
		return false;
	}

	if (password.trim().length > 0) {
		document.getElementById("passwordError").textContent = "";
	} else {
		document.getElementById("passwordError").textContent = "Requerido";
		return false;
	}
	return true;
}

function ifExistUserNameEmail(){
	
	var userName = document.forms["forgotPasswordForm"]["userName"].value;
	var email = document.forms["forgotPasswordForm"]["email"].value;
	


	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	var flag = re.test(String(email).toLowerCase());
	
	if (userName.trim().length > 0) {
		document.getElementById("errorMessageVerify").textContent = "";
	}else{
		document.getElementById("errorMessageVerify").textContent = "Requerido";
		return false;
	}
	if (email.trim().length > 0) {
		if (flag.toString() == "false") {
			document.getElementById("errorMessageVerify").textContent = "Ingrese un correo válido.";
			return false;
		} else {
			document.getElementById("errorMessageVerify").textContent = "";
		}
		document.getElementById("errorMessageVerify").textContent = "";
	} else {
		document.getElementById("errorMessageVerify").textContent = "Se requiere el correo";
		return false;
	}
	
	
	var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");
	 
	var jsonData={};
	jsonData.userName=userName;
	jsonData.email=email;
	$.ajax({
        url : '/MDMBackend/verify-username-email',
        type: 'POST',
       
        contentType: "application/json; charset=utf-8",
        processData: false,
        data:JSON.stringify(jsonData),
        beforeSend:function(xhr) {
        	xhr.setRequestHeader(header, token);
        },  
        success: function(data,status,xhr){
        	
        	if(status=="success"&&data=="true"){
        		$(".verifyPasswordDiv").hide();
        		$(".forgotPasswordDiv").show();
        		document.getElementById("hiddenUserName").value=userName;
        		document.getElementById("errorMessage").textContent = "";
        	}else{
        		document.getElementById("errorMessageVerify").textContent = "Usuario o correo no válidos";
        	}
        	
        },
        error: function(xhr,status,e){
        	console.log(status+"                "+e);
        }
    });
	
	return true;
}

function hideAndShowDiv(){
	$(".verifyPasswordDiv").show();
	$(".forgotPasswordDiv").hide();
}
function forgotPassword(){
	var userName=document.getElementById("hiddenUserName").value;
	var password=document.getElementById("passwordId").value
	var rePassword=document.getElementById("rePasswordId").value
	
	if(password.trim()==rePassword.trim()) {
		document.getElementById("forgotPasswordResponseId").textContent = "";
		
		var jsonData={};
		jsonData.userName=userName;
		jsonData.password=password;
		var token = $("meta[name='_csrf']").attr("content");
		var header = $("meta[name='_csrf_header']").attr("content");
		
		$.ajax({
	        url : '/MDMBackend/forgot-password',
	        type: 'POST',
	       
	        contentType: "application/json; charset=utf-8",
	        processData: false,
	        data:JSON.stringify(jsonData),
	        beforeSend:function(xhr) {
	        	xhr.setRequestHeader(header, token);
	        },  
	        success: function(data,status,xhr){
	        	if(status=="success"&&data=="true"){
	        		//alert-success-message
	        		$(".alert-success-message").show();
	        	}
	        },
	        error: function(xhr,status,e){
	        	console.log(status+"                "+e);
	        }
	    });
	}else{
		document.getElementById("forgotPasswordResponseId").textContent = "Las contraseñase no coinciden";
	}
}



function uploaduserImage(){
	var imageFile=document.getElementById("imageFile").value;
	if (imageFile.trim().length != 0) {
		if (imageFile.match(/jpg.*/) || imageFile.match(/jpeg.*/)
				|| imageFile.match(/png.*/) || imageFile.match(/ico.*/)) {
			$('#errorMessage').hide();
		} else {
			$('#errorMessage').show();
			$('#seccessMessage').hide();
			return false;
		}
	}else{
		$('#seccessMessage').hide();
		$('#errorMessage').show();
		return false;
	}
	var pinCodId=document.getElementById("pinCodId").value;
	var userId=document.getElementById("userId").value=pinCodId;
	
	var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");
	var form = $('#fileUploadForm')[0];
    var data = new FormData(form);
   
    
	$.ajax({
        url : '/MDMBackend/upload-user-image',
        type : 'POST',
        data:data,
        enctype: 'multipart/form-data',
        processData: false, 
        contentType: false,
        cache: false,
        timeout: 600000,
        beforeSend:function(xhr) {
        	xhr.setRequestHeader(header, token);
        },  
        success: function(data,status,xhr){
        	$('#seccessMessage').show();
        },
        error: function(xhr,status,e){
        	console.log(status+"    "+e);
        }
    });
	
	return true;
}

function uploadClientLogo(){
	var imageFile=document.getElementById("imageFile").value;
	if (imageFile.trim().length != 0) {
		if (imageFile.match(/jpg.*/) || imageFile.match(/jpeg.*/)
				|| imageFile.match(/png.*/) || imageFile.match(/ico.*/)) {
			$('#errorMessage').hide();
		} else {
			$('#errorMessage').show();
			$('#seccessMessage').hide();
			return false;
		}
	}else{
		$('#seccessMessage').hide();
		$('#errorMessage').show();
		return false;
	}
	
	var pinCodCli=document.getElementById("pinCodCli").value;
	var clientId=document.getElementById("clientId").value=pinCodCli;
	
	
	var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");
	var form = $('#fileUploadForm')[0];
    var data = new FormData(form);
	$.ajax({
        url : '/MDMBackend/upload-client-long',
        type : 'POST',
        data:data,
        enctype: 'multipart/form-data',
        processData: false, 
        contentType: false,
        cache: false,
        timeout: 600000,
        beforeSend:function(xhr) {
        	xhr.setRequestHeader(header, token);
        },  
        success: function(data,status,xhr){
        	$('#seccessMessage').show();
        },
        error: function(xhr,status,e){
        	console.log(status+"    "+e);
        }
    });
	return false;
}

function remoteReset(imei){
	//alert(imei);
	var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");
	if(confirm("¿Está seguro de que desea resetear remotamente? !\nUna vez que resetee, todos los datos y configuraciones del dispositivo se borrarán y el dispositivo se restaurará por completo. !")){
		$.ajax({
	        url : '/MDMBackend/firebase/remontreset',
	        type: 'POST',
	       
	        contentType: "application/json; charset=utf-8",
	        processData: false,
	        data:JSON.stringify(imei),
	        
	        beforeSend:function(xhr) {
	        	xhr.setRequestHeader(header, token);
	        },  
	        success: function(data,status,xhr){
	        	
	        },
	        error: function(xhr,status,e){
	        	console.log(status+"                "+e);
	        }
	    });
	}	
	
}


function factoryReset(imei) {
	var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");

	if (confirm("¿Está seguro de que desea hacer reseteo de fábrica? !\nUna vez que resetee, todos los datos y configuraciones del dispositivo se borrarán y el dispositivo se restaurará por completo.")) {
		$.ajax({
			url : '/MDMBackend/firebase/factoryreset',
			type : 'POST',

			contentType : "application/json; charset=utf-8",
			processData : false,
			data : JSON.stringify(imei),

			beforeSend : function(xhr) {
				xhr.setRequestHeader(header, token);
			},
			success : function(data, status, xhr) {

			},
			error : function(xhr, status, e) {
				console.log(status + "                " + e);
			}
		});
	}
}


function backup(imei){
	var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");
	if (confirm("¿Est� seguro de realizar una copia de seguridad?")) {
		$.ajax({
			url : '/MDMBackend/firebase/backup',
			type : 'POST',

			contentType : "application/json; charset=utf-8",
			processData : false,
			data : JSON.stringify(imei),

			beforeSend : function(xhr) {
				xhr.setRequestHeader(header, token);
			},
			success : function(data, status, xhr) {

			},
			error : function(xhr, status, e) {
				console.log(status + "                " + e);
			}
		});
	}
}

function applicationBlockedFirebase(imei){
	var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");
		$.ajax({
        url : '/MDMBackend/firebase/blocked',
        type: 'POST',
       
        contentType: "application/json; charset=utf-8",
        processData: false,
        data:JSON.stringify(imei),
        
        beforeSend:function(xhr) {
        	xhr.setRequestHeader(header, token);
        },  
        success: function(data,status,xhr){
        	
        },
        error: function(xhr,status,e){
        	console.log(status+"                "+e);
        }
    });
	
}

function timeBlockedFirebase(){
	var imeiNumber=document.getElementById ("pvcCodIMEIIdValue").textContent;
	var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");
		$.ajax({
        url : '/MDMBackend/firebase/timeblocked',
        type: 'POST',
       
        contentType: "application/json; charset=utf-8",
        processData: false,
        data:JSON.stringify(imeiNumber),
        
        beforeSend:function(xhr) {
        	xhr.setRequestHeader(header, token);
        },  
        success: function(data,status,xhr){
        	
        },
        error: function(xhr,status,e){
        	console.log(status+"                "+e);
        }
    });
}
function pleaseEditDevice(){
	alert("Edite por favor el dispositivo");
}