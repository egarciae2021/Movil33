const carritoModule = (function () {

    function arrayObjectIndexOf(myArray, searchTerm, property) {
        for (let i = 0, len = myArray.length; i < len; i++) {
            if (myArray[i][property] == searchTerm) return i
        }
        return -1
    }

    function listPedidos() {
        if (localStorage['detallePedido'] == null)
            return

        detallePedido = JSON.parse(localStorage.getItem('detallePedido'))

        if (detallePedido.length == 0)
            return

        $('#pedido-badge, #cantidad-pedido').css('display', '').text(detallePedido.length)

        let url = $('#pedido-badge').data('url')

        detallePedido.forEach(x => {
            let model = { EquipoId: x.EquipoId }
            $.ajax({
                type: 'POST',
                url: url,
                data: model,
                success: function (data) {
                    let index = arrayObjectIndexOf(detallePedido, data.EquipoId, 'EquipoId')

                    let textHtml = '<li class="available" data-equipo-id="' + data.EquipoId + '"><a>' +
                        '<div class="notice-icon">' +
                        '<i class="fa fa-mobile"></i>' +
                        '</div>' +
                        '<div>' +
                        '<span class="name">' +
                        '<span class="name">' +
                        '<strong>' + data.Nombre + '</strong>' +
                        '<a href="#" class="remove-pedido text-danger pull-right"><i class="fa fa-trash fa-2x "></i></a>' +
                        '<span class="time small" data-cantidad="' + data.EquipoId + '">Cantidad: ' + detallePedido[index].Cantidad + '</span>' +
                        '</span>' +
                        '</div>' +
                        '</a></li>'

                    $('ul#shopping-cart').append(textHtml)
                },
                error: function () {
                    console.error('error')
                }
            })
        })

        updateUrl(detallePedido)
    }

    function deletePedidos() {
        localStorage.removeItem('detallePedido')
        $('#pedido-badge').css('display', 'none')

        $('ul#shopping-cart').html('')

        let $btn = $('#make-pedido')
        let url = $btn.data('href')
        $btn.attr('href', url)
        $btn.find('span').removeClass('text-success')

        listPedidos()
    }

    function updateUrl(detallePedido) {
        let $btn = $('#make-pedido')
        let url = $btn.data('href')
        if (detallePedido.length == 0) {
            $btn.attr('href', url)
            $btn.find('span').removeClass('text-success')
        }
        else {
            let strLst = ''
            for (let i = 0; i < detallePedido.length; i++) {
                strLst += detallePedido[i].EquipoId + ',' + detallePedido[i].Cantidad + (detallePedido.length == i + 1 ? '' : ';')
            }
            $btn.attr('href', url + '?l=' + strLst)
            $btn.find('span').addClass('text-success')
        }
    }

    function deletePedido(equipoId) {
        try {
            if (localStorage['detallePedido'] == null)
                return false
            let detallePedido = JSON.parse(localStorage.getItem('detallePedido'))
            let detallePedidoResult = []

            for (let i = 0; i < detallePedido.length; i++) {
                if (detallePedido[i].EquipoId != equipoId) {
                    detallePedidoResult.push(detallePedido[i])
                }
            }
            localStorage.setItem('detallePedido', JSON.stringify(detallePedidoResult))

            return true
        } catch (e) {
            return false
        }
    }

    return {
        listPedido: function () {
            listPedidos()
        },
        deletePedido: function (equipoId) {
            deletePedido(equipoId)
        },
        deletePedidos: function () {
            deletePedidos()
        },
        updateUrl: function (detallePedido) {
            updateUrl(detallePedido)
        }
    }
}())

$(function () {

    carritoModule.listPedido()

    $(document).on('click', '.new-pedido', function () {
        let $this = $(this)
        $('#modal-equipoId, #modal-cantidad').val('')
        let equipoId = $this.data('equipo-id')
        let nombre = $this.data('nombre')
        let cantidadMaxima = $this.data('max')
        $('#modal-pedido-titulo').text(nombre)
        $('#modal-equipoId').val(equipoId)
        $('#modal-cantidad').attr('max', cantidadMaxima)
    })

    $('#add-pedido').on('click', function () {
        let $this = $(this)
        let url = $this.data('url') //'@Url.Action("GetEquipo", "Json")'

        let datail = {
            EquipoId: $('#modal-equipoId').val(),
            Cantidad: $('#modal-cantidad').val()
        }
        let cantidadMaxima = parseInt($('#modal-cantidad').attr('max'))
        if (datail.Cantidad > cantidadMaxima) {
            datail.Cantidad = cantidadMaxima
        }

        if (datail == 0 || datail == null) {

        }

        let model = { EquipoId: datail.EquipoId }

        let detallePedido = []
        if (localStorage['detallePedido'] != null) {
            detallePedido = JSON.parse(localStorage.getItem('detallePedido'))
        }

        let index = arrayObjectIndexOf(detallePedido, datail.EquipoId, 'EquipoId')

        let existe = false

        if (index == -1) {
            detallePedido.push(datail)
        } else {
            existe = true
            detallePedido[index].Cantidad = datail.Cantidad
        }

        localStorage.setItem('detallePedido', JSON.stringify(detallePedido))

        $('#pedido-badge, #cantidad-pedido').css('display', '').text(detallePedido.length)

        $.ajax({
            type: 'POST',
            url: url,
            data: model,
            success: function (data) {
                if (existe) {
                    $('[data-cantidad=' + data.EquipoId + ']').text('Cantidad: ' + detallePedido[index].Cantidad)
                } else {
                    let textHtml = '<li class="available" data-equipo-id="' + datail.EquipoId + '"><a>' +
                        '<div class="notice-icon">' +
                        '<i class="fa fa-mobile"></i>' +
                        '</div>' +
                        '<div>' +
                        '<span class="name">' +
                        '<strong>' + data.Nombre + '</strong>' +
                        '<a href="#" class="remove-pedido text-danger pull-right"><i class="fa fa-trash fa-2x "></i></a>' +
                        '<span class="time small" data-cantidad="' + data.EquipoId + '">Cantidad: ' + datail.Cantidad + '</span>' +
                        '</span>' +
                        '</div>' +
                        '</a></li>'

                    $('ul#shopping-cart').append(textHtml)
                }
            },
            error: function () {
                console.error('error')
            }
        })

        $('#modal-pedido').modal('hide')

        carritoModule.updateUrl(detallePedido)
    })

    $(document).on('click', '.remove-pedido', function () {
        let $li = $(this).closest('li')
        let equipoId = $li.data('equipo-id')
        console.log(equipoId)
        if (carritoModule.deletePedido(equipoId)) {
            $li.remove()
        }

        if (localStorage['detallePedido'] == null)
            return

        let detallePedido = JSON.parse(localStorage.getItem('detallePedido'))

        if (detallePedido.length == 0) {
            $('#pedido-badge').css('display', 'none')
            $('#cantidad-pedido').css('display', '').text(detallePedido.length)
        } else {
            $('#pedido-badge, #cantidad-pedido').css('display', '').text(detallePedido.length)
        }

        carritoModule.updateUrl(detallePedido)
    })
})