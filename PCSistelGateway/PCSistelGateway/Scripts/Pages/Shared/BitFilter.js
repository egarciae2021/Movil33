function BitFilterRebind($element) {
    $element.find('[data-bit-filter="select-operador"]').each(function (i, e) {
        var $this = $(this);
        var $inputOperador = $this.find('[name^="BP-FILTER-OPE-"]');
        var $optionOperador = $this.find('[data-bit-filter-operador="' + $inputOperador.val() + '"]');
        if (!$optionOperador || $optionOperador.length == 0) {
            $optionOperador = $this.find('[data-bit-filter-operador]').first();
        }
        $optionOperador.closest('ul').prev().html($optionOperador.html());
    });

    function mostarValorDateRangePicker(start, end) {
        this.element.find('span').html(start.format('DD/MM/YYYY') + ' - ' + end.format('DD/MM/YYYY'));
        this.element.closest('.bf-daterange').find('input[type="hidden"]').first().val(start.format('DD/MM/YYYY'))
        this.element.closest('.bf-daterange').find('input[type="hidden"]').last().val(end.format('DD/MM/YYYY'))
    }

    $element.find('.bf-daterangepicker').daterangepicker({
        "opens": "center",
        locale: { cancelLabel: 'Borrar', applyLabel: 'Aceptar', customRangeLabel : 'Customizable'},
        ranges: {
            'Hoy': [moment(), moment()],
            'Ayer': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Últimos 7 Días': [moment().subtract(6, 'days'), moment()],
            'Últimos 30 Días': [moment().subtract(29, 'days'), moment()],
            'Este Mes': [moment().startOf('month'), moment().endOf('month')],
            'Último Mes': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        }
    }, mostarValorDateRangePicker);

    $('.bf-daterangepicker').on('cancel.daterangepicker', function (ev, picker) {
        $(this).closest('.bf-daterange').find('span').html('');
        $(this).closest('.bf-daterange').find('.form-control').val('')
        
    });
}

function BitFilterInit($element) {
    $($element).on('click', '[data-bit-filter-operador]', function () {
        var $this = $(this);
        var $parentUl = $this.closest('ul');
        $parentUl.prev().html($this.html()); //button
        if ($parentUl.next().attr('name').indexOf('BP-FILTER-OPE-') != 0) {
            console.log("Error en configuración de filtros: Hidden de operador mal ubicado");
        } else {
            $parentUl.next().val($this.attr('data-bit-filter-operador'));
        }
    })

    $($element).on('keyup', '[name^="BP-FILTER-VAL-"]', function (e) {
        if (e.keyCode == 13) {
            $(this).closest('[data-type="bit-filter"]').find('[data-bit-filter="submit"]').click();
        }
    })

    var paginationData = [];

    $($element).on('click', '[data-bit-filter="submit"]', function () {
        var $this = $(this);
        var $bitFilter = $this.closest('[data-type="bit-filter"]');

        var sourceUrl = $bitFilter.data('bf-source-url');
        var method = $bitFilter.data('bf-method') || 'GET';
        var blockId = $bitFilter.data('bf-block-id');
        var formData = $bitFilter.find('[name]').serializeArray();

        var data = formData.concat(paginationData);
        paginationData = [];

        $this.closest('table').find('tbody').addClass('bf-cargando');

        $.ajax({
            method: method,
            url: sourceUrl,
            data: data
        }).done(function (resultHtml) {
            var $html;

            if (blockId) {
                $html = $(resultHtml).find('[data-type="bit-filter"][data-bf-block-id="' + blockId + '"]');
            } else {
                $html = $(resultHtml).find('[data-type="bit-filter"]').first();
            }

            $bitFilter.replaceWith($html);
            RebindJquery($html);
        }).fail(function () {
            alert("Ha ocurrido un error al cargar los datos.");
            $this.closest('table').find('tbody').removesClass('bf-cargando');
        });
    })
    $($element).on('click', '[data-bit-filter="reset"]', function () {
        var $this = $(this);
        $this.parent().parent().find('[name^=BP-FILTER-VAL]').val('');
        $this.parent().parent().find('.bf-daterangepicker span').text('');
    })

    $($element).on('click', '.pagination a', function (e) {
        var $this = $(this);
        var $bitFilter = $this.closest('[data-type="bit-filter"]');
        if ($bitFilter.length > 0) {
            e.preventDefault();
            var paginationUrl = $this.attr('href');
            paginationData = ObtenerParametrosUrl(paginationUrl);
            $bitFilter.find('[data-bit-filter="submit"]').click();
        }
    })

    function ObtenerParametrosUrl(url) {
        var query = url.split('?')[1] || '';
        var re = /([^&=]+)=?([^&]*)/g;
        var decodeRE = /\+/g;  // Regex for replacing addition symbol with a space
        var decode = function (str) { return decodeURIComponent(str.replace(decodeRE, " ")); };
        var params = [], e;
        while (e = re.exec(query)) {
            var k = decode(e[1]), v = decode(e[2]);
            /*if (k.substring(k.length - 2) === '[]') {
                k = k.substring(0, k.length - 2);
                (params[k] || (params[k] = [])).push(v); //?
            }
            else*/
            params.push({ name: k, value: v })
        }
        return params;
    }

    BitFilterRebind($element)
}

BitFilterInit($(document));

