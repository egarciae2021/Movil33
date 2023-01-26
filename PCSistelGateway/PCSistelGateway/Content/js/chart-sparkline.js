/**
 * @Package: Complete Admin Responsive Theme
 * @Since: Complete Admin 1.0
 * This file is part of Complete Admin Responsive Theme.
 */


jQuery(function($) {

    'use strict';

    var CMPLTADMIN_SETTINGS = window.CMPLTADMIN_SETTINGS || {};

    /*--------------------------------
        Sparkline Chart
     --------------------------------*/
    CMPLTADMIN_SETTINGS.chartSparkline = function() {



        if ($.isFunction($.fn.sparkline)) {


            var myvalues = [10, 8, 5, 7, 4, 4, 7, 5, 2, 8, 3, 4, 5];
            var sidebargraph1 = [7, 6, 4, 7, 5, 3, 5, 7, 3, 4];
            var sidebargraph2 = [4, 7, 5, 5, 7, 3, 5, 7, 4, 2];

            $('.inlinesparkline').sparkline(myvalues, {
                type: 'line',
                width: '100%',
                height: '200',
                lineWidth: 2,
                lineColor: '#003245',
                fillColor: 'rgba(63,81,181,0.5)',
                highlightSpotColor: '#00C6D7',
                highlightLineColor: '#008597',
                spotRadius: 4,
            });



            var myvalues = [10,  5, 2, 8, 3, 8, 5, 7, 4, 4, 7,4, 5];

            $('.inlinesparkline2').sparkline(myvalues, {
                type: 'line',
                width: '100%',
                height: '200',
                lineWidth: 3,
                lineColor: '#003245',
                fillColor: 'rgba(63,81,181,0)',
                highlightSpotColor: '',
                highlightLineColor: '',
                spotRadius: 2,
            });


            var myvalues = [1, 2, 13, 4, 5, 16, 7, 8, 19, 10, 11];

            $('.inlinesparkline3').sparkline(myvalues, {
                type: 'line',
                width: '100%',
                height: '200',
                lineWidth: 3,
                lineColor: '#003245',
                fillColor: 'rgba(63,81,181,1)',
                highlightSpotColor: '',
                highlightLineColor: '',
                spotRadius: 2,
            });

            /* The second argument gives options such as specifying you want a bar chart */
            $('.dynamicbar').sparkline(myvalues, {
                type: 'bar',
                barColor: '#003245',
                height: '200',
                barWidth: '25',
                barSpacing: 4
            });

            // Bar charts using inline values
            $('.negativebar').sparkline([8, 4, 3, 0, -2, -6, -3, 3, -2, 4, 3, 0, -2, -6, -3, 3, -2, 4, 6, -4, 4], {
                type: 'bar',
                barColor: '#003245',
                height: '200',
                barWidth: '18',
                barSpacing: 2,
                zeroAxis: true,
                negBarColor: '#00C6D7',
                zeroColor: '#008597'
            });

            // Bar charts using inline values
            $('.stackedbar').sparkline([
                [1, 2, 2],
                [2, 4, 3],
                [4, 2, 4],
                [4, 5, 1],
                [4, 1, 2],
                [6, 6, 4],
                [2, 3, 2],
                [3, 2, 6],
                [2, 0, 2],
                [6, 2, 4],
                [7, 4, 2],
                [3, 4, 1],
                [2, 3, 2],
                [3, 2, 6],
                [2, 0, 2],
                [6, 2, 4],
                [7, 4, 2],
                [3, 4, 1],
                [3, 7, 4]
            ], {
                type: 'bar',
                barColor: '#003245',
                height: '200',
                barWidth: '18',
                barSpacing: 2,
                zeroAxis: true,
                negBarColor: '#00C6D7',
                zeroColor: '#008597',
                stackedBarColor: ['#008597', '#003245', '#00C6D7'],
            });

            // sidebar bottom graphs
            $('.sidebar_orders').sparkline(sidebargraph1, {
                type: 'bar',
                barColor: '#003245',
                height: '20',
                barWidth: '4',
                barSpacing: 1,
            });
            $('.sidebar_visitors').sparkline(sidebargraph2, {
                type: 'bar',
                barColor: '#00C6D7',
                height: '20',
                barWidth: '4',
                barSpacing: 1,
            });

            $('.playlist_song1').sparkline(sidebargraph1, {
                type: 'bar',
                barColor: '#008597',
                height: '20',
                barWidth: '4',
                barSpacing: 1,
            });
            $('.playlist_song2').sparkline(sidebargraph2, {
                type: 'bar',
                barColor: '#00C6D7',
                height: '20',
                barWidth: '4',
                barSpacing: 1,
            });
            $('.playlist_song3').sparkline(sidebargraph1, {
                type: 'bar',
                barColor: '#003245',
                height: '20',
                barWidth: '4',
                barSpacing: 1,
            });
            $('.playlist_song4').sparkline(sidebargraph2, {
                type: 'bar',
                barColor: '#008597',
                height: '20',
                barWidth: '4',
                barSpacing: 1,
            });
            $('.playlist_song5').sparkline(sidebargraph1, {
                type: 'bar',
                barColor: '#003245',
                height: '20',
                barWidth: '4',
                barSpacing: 1,
            });
            $('.playlist_song6').sparkline(sidebargraph2, {
                type: 'bar',
                barColor: '#00C6D7',
                height: '20',
                barWidth: '4',
                barSpacing: 1,
            });
            $('.playlist_song7').sparkline(sidebargraph1, {
                type: 'bar',
                barColor: '#003245',
                height: '20',
                barWidth: '4',
                barSpacing: 1,
            });
            // Bar + line composite charts
            $('#compositebar').sparkline([4, 6, 7, 7, 4, 3, 2, 4, 6, 7, 7, 4, 3, 2, 3, 1, 4, 6, 5, 9], {
                type: 'bar',
                barColor: '#003245',
                height: '200',
                barWidth: '25',
                barSpacing: 5,
            });
            $('#compositebar').sparkline([4, 1, 5, 7, 9, 9, 8, 4, 6, 7, 7, 4, 3, 2, 8, 4, 2, 5, 6, 7], {
                composite: true,
                fillColor: 'rgba(103,58,183,0.3)',
                type: 'line',
                width: '100%',
                height: '200',
                lineWidth: 2,
                lineColor: '#008597',
                highlightSpotColor: '#00C6D7',
                highlightLineColor: '#008597',
                spotRadius: 4,
            });


            // Line charts taking their values from the tag
            $('.sparkline').sparkline();

            // Larger line charts for the docs
            $('.largeline').sparkline('html', {
                type: 'line',
                height: '2.5em',
                width: '4em'
            });

            // Customized line chart
            $('#linecustom').sparkline('html', {
                height: '1.5em',
                width: '8em',
                lineColor: '#f00',
                fillColor: '#ffa',
                minSpotColor: false,
                maxSpotColor: false,
                spotColor: '#77f',
                spotRadius: 3
            });

            $('.barformat').sparkline([1, 3, 5, 3, 8], {
                type: 'bar',
                tooltipFormat: '{{value:levels}} - {{value}}',
                tooltipValueLookups: {
                    levels: $.range_map({
                        ':2': 'Low',
                        '3:6': 'Medium',
                        '7:': 'High'
                    })
                }
            });

            // Tri-state charts using inline values
            $('.sparktristate').sparkline([1, 1, 0, 1, -1, -1, 1, 1, 0, 1, -1, -1, 1, -1, 0, 0, 1, 1], {
                type: 'tristate',
                height: '200',
                posBarColor: '#003245',
                negBarColor: '#00C6D7',
                zeroBarColor: '#008597',
                barWidth: 20,
                barSpacing: 2,
                zeroAxis: true
            });

            // Composite line charts, the second using values supplied via javascript
            $('#compositeline').sparkline([8, 4, 1, 2, 6, 7, 1, 6, 2, 4, 3, 5, 6, 0, 3, 0, 4, 6, 5, 7, 6], {
                fillColor: false,
                changeRangeMin: 0,
                chartRangeMax: 10,
                type: 'line',
                width: '100%',
                height: '200',
                lineWidth: 2,
                lineColor: '#003245',
                highlightSpotColor: '#00C6D7',
                highlightLineColor: '#008597',
                spotRadius: 4,
            });

            $('#compositeline').sparkline([4, 1, 5, 4, 6, 7, 3, 5, 6, 6, 4, 2, 6, 4, 3, 2, 2, 5, 6, 3], {
                composite: true,
                fillColor: false,
                changeRangeMin: 0,
                chartRangeMax: 10,
                type: 'line',
                width: '100%',
                height: '200',
                lineWidth: 2,
                lineColor: '#008597',
                highlightSpotColor: '#00C6D7',
                highlightLineColor: '#008597',
                spotRadius: 4,
            });

            // Line charts with normal range marker
            $('#normalline').sparkline([5, 4, 0, 0, 0, 0, 1, 4, 4, 10, 10, 10, 10, 0, 0, 0, 4, 6, 5, 9, 10], {
                fillColor: false,
                normalRangeMin: -1,
                normalRangeMax: 8,
                type: 'line',
                width: '100%',
                height: '200',
                lineWidth: 2,
                lineColor: '#008597',
                highlightSpotColor: '#00C6D7',
                highlightLineColor: '#008597',
                normalRangeColor: '#eaeaea',
                spotRadius: 4,
            });


            $('#normalExample').sparkline('html', {
                fillColor: false,
                normalRangeMin: 80,
                normalRangeMax: 95,
                normalRangeColor: '#4f4'
            });

            // Discrete charts
            $('.discrete1').sparkline([4, 6, 7, 7, 4, 3, 2, 1, 4, 4, 5, 6, 7, 6, 6, 2, 4, 5, 4, 4, 5, 6, 7, 6, 6, 2, 4, 5, 2, 1, 4, 4], {
                type: 'discrete',
                width: '280',
                height: '200',
                lineColor: '#003245',
                lineHeight: 60,
                thresholdValue: 5,
                thresholdColor: '#00C6D7',
            });

            // Bullet charts
            $('.sparkbullet').sparkline([10, 12, 12, 9, 7], {
                type: 'bullet',
                height: '200',
                width: '100%',
                targetWidth: 10,
                targetColor: '#FFC107',
                performanceColor: '#eaeaea',
                rangeColors: ['#003245', '#008597', '#00C6D7 ']
            });

            // Pie charts
            $('.sparkpie').sparkline([3, 4, 1, 2], {
                type: 'pie',
                width: '100%',
                height: '200',
                sliceColors: ['#003245', '#008597', '#00C6D7', '#FFC107'],
                offset: 0,
                borderWidth: 0,
                borderColor: '#00007f'
            });





            $(".sparkboxplot").sparkline([4, 27, 34, 52, 54, 59, 61, 68, 78, 82, 85, 87, 91, 93, 100], {
                type: 'box',
                width: '100%',
                height: '200',
                raw: false,
                target: 27,
                minValue: 34,
                boxLineColor: '#008597',
                boxFillColor: '#003245',
                whiskerColor: '#00C6D7',
                medianColor: '#00C6D7',
                targetColor: '#00C6D7'
            });

        }

    };






    /******************************
     initialize respective scripts 
     *****************************/
    $(document).ready(function() {
        CMPLTADMIN_SETTINGS.chartSparkline();
    });

    $(window).resize(function() {});

    $(window).load(function() {});

});
