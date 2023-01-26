        function Actualizar() {
            location.reload();
        }
        function SinDatos() {
            $('#divMsgConfirmacion').dialog({
                title: "Aviso",
                modal: true,
                resizable: false,
                closeOnEscape: false,
                buttons: {
                    "Aceptar": function () {
                        window.parent.tabOpciones.tabs('remove', window.parent.tabOpciones.tabs('option', 'selected'));
                    }
                },
                close: function (event, ui) {
                    setTimeout(function () { window.parent.tabOpciones.tabs('remove', window.parent.tabOpciones.tabs('option', 'selected')); }, 50);                    
                }
            });
        }