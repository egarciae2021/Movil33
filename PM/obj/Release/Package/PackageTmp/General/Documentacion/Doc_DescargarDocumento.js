$(function () {
    $(".btnNormal").button();
   
    var hdfDatosDocumentos = $("#hdfDatosDocumentos").val();
    if (hdfDatosDocumentos != "" && hdfDatosDocumentos != "0") {
        //dvPanel.innerHTML = creaHTMLDocumentacion(hdfDatosDocumentos);
        creaHTMLDocumentacion(hdfDatosDocumentos, 'AccGeneral');
        creaHTMLDocumentacion(hdfDatosDocumentos, 'AccSolicitudes');
        creaHTMLDocumentacion(hdfDatosDocumentos, 'AccIncidencias');
        creaHTMLDocumentacion(hdfDatosDocumentos, 'AccFacturacionDetalle');
    }

    $("#btnCerrar").live("click", function () {
        fnCerrar();
    });

    $('#dvPanel a.btnNormal').mouseover(function () {
        $(this).addClass('ui-state-hover');
    }).mouseout(function () {
        $(this).removeClass('ui-state-hover');
    });

    $(".accordion").accordion({
        collapsible: true,
        autoHeight: false
    });

    //$("#AccordionJQ1").accordion("option", "active", 0);

});

function xIndexOf(Val, Str, x) {
    if (x <= (Str.split(Val).length - 1)) {
        Ot = Str.indexOf(Val);
        if (x > 1) { var i; for (i = 1; i < x; i++) { var Ot = Str.indexOf(Val, Ot + 1); } }
        return Ot;
    } else { alerta(Val + " Occurs less than " + x + " times"); return 0; }
}

function fnCerrar() {
    var indiceTab = window.parent.tabschild.tabs("option", "selected");
    window.parent.tabschild.tabs("remove", indiceTab);
}


function creaHTMLDocumentacion(datos, NombreAccordion) {
    let html = '';
    try {
        //html += '<div id="idGuias2" style="overflow: auto;"';
        //html += '   <table width="100%">';
        //html += '   <tbody>';
        //html += '       <tr><td>';
        html += '           <table width="40%">';
        html += '           <tbody>';
        documentos = datos.split(';');
        for (let i = 0; i < documentos.length; i++) {
            let datosDocumento = documentos[i].split('|');
            if (datosDocumento[6].toLowerCase() == NombreAccordion.toLowerCase()){
                let ruta = datosDocumento[2];
                if (ruta.indexOf("http") == -1) {
                    ruta = './' + ruta;
                }
                html += '           <tr>';
                html += '               <td class="tdEtiqueta">' + datosDocumento[1] + '</td>';
                html += '               <td><a href="' + ruta + '" target="_blank" class="btnNormal ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" role="button" aria-disabled="false">';
                html += '                   <span class="ui-button-text"><img src="../../Common/Images/pdf.ico" style="height:16px;width:16px;"></span>';
                html += '                   </a></td>';
                html += '           </tr>';
            }
        }
        html += '           </tbody>';
        html += '           </table>';
        //html += '       </td></tr>';
        //html += '   </tbody>';
        //html += '   </table>';
        //html += '</div>';

        $("#td" + NombreAccordion).html('');
        $("#td" + NombreAccordion).html(html);

    }
    catch (e) {
        html = 'Ocurrió un error, por favor comuníquese con el Administrador del Sistema.';
    }
    return html;
}