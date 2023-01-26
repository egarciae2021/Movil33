var miRaiz = document.getElementById("hdfMiRaiz").value;
//alert(miRaiz);



var MostrarAcuerdo = false;
if (window.parent.location.href != window.location.href) {
    window.top.location.href = window.location.href;
}



$(function() {
    //alert("Login\n" + BrowserDetect.browser + ", " + BrowserDetect.version);
    if (BrowserDetect.browser == "Explorer" && BrowserDetect.version < 9) {
        $("#dvBrowserDetect").show();
    } else {
        $("#dvContenido").show();
    }
});