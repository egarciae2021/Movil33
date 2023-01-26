function getNombreMes(num)
{
    var mes = "";
    switch (num)
    {
        case "01":
            mes = "ENE";
            break;

        case "02":
            mes = "FEB";
            break;

        case "03":
            mes = "MAR";
            break;

        case "04":
            mes = "ABR";
            break;

        case "05":
            mes = "MAY";
            break;

        case "06":
            mes = "JUN";
            break;

        case "07":
            mes = "JUL";
            break;

        case "08":
            mes = "AGO";
            break;

        case "09":
            mes = "SET";
            break;

        case "10":
            mes = "OCT";
            break;

        case "11":
            mes = "NOV";
            break;

        case "12":
            mes = "DIC";
            break;

        default:
            break;
    }
    return mes;
}
var colorArray = new Array('#FF3F3F', '#6C5B5F', '#00FFFF', '#0000FF', '#00FF00', '#7CA3D4', '#7E27BB', '#FFF139', '#127629', '#F6891E');
function FormatoSegundos(segundos) {
    var hours = Math.floor(segundos / 3600);
    var minutes = Math.floor((segundos - (hours * 3600)) / 60);
    var segundos = segundos - (hours * 3600) - (minutes * 60);
    var time = "";

    if (hours != 0 && hours < 10) {
        time = "0" + hours + ":";
    }

    if (hours != 0 && hours > 9) {
        time = hours + ":";
    }

    if (minutes != 0 || time !== "") {
        minutes = (minutes < 10 && time !== "") ? "0" + minutes : String(minutes);
        time += minutes + ":";
    }

    if (time === "") {
        time = segundos;
    }
    else {
        time += (segundos < 10) ? "0" + segundos : String(segundos);
    }
    return time;
}

function FormatoMiliSegundos(segundos) {
    //var hours = Math.floor(segundos / 3600);
    var hours = Math.floor(segundos / 3600000);
    //var minutes = Math.floor((segundos - (hours * 3600)) / 60);
    var minutes = Math.floor((segundos - (hours * 3600000)) / 60000);
    //var segundos = segundos - (hours * 3600) - (minutes * 60);
    var segundos = segundos - (hours * 3600000) - (minutes * 60000);
    segundos = segundos / 1000;

    var time = "";

    if (hours != 0 && hours < 10) {
        time = "0" + hours + ":";
    }

    if (hours != 0 && hours > 9) {
        time = hours + ":";
    }

    if (minutes != 0 || time !== "") {
        minutes = (minutes < 10 && time !== "") ? "0" + minutes : String(minutes);
        time += minutes + ":";
    }

    if (time === "") {
        time = segundos;
    }
    else {
        time += (segundos < 10) ? "0" + segundos : String(segundos);
    }
    return time;
}

function get_random_color() 
{
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.round(Math.random() * 15)];
    }
    return color;
}
