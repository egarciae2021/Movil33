/*
	aLiteral por Jose Antonio Jurado
	Version 1.0.3 (29.sep.2009)
	http://17cosas.blogspot.com
	
	La distribución está permitida siempre que aparezcan las tres líneas anteriores. Gracias.
*/
	function aLiteral(numeroArg){
		//Hasta 999 millones
		this.numero = numeroArg.replace(/[+-]/g,'');
		this.ultimaCentena = false;
		this.esNegativo = /^-/.test(numeroArg) || false;
		this.esDecimal = numeroArg.indexOf('.')>-1 || false;
		
	};
	
	aLiteral.prototype = {
		toString : function(){return this.empieza();} /*autoejecucion*/,
		
		empieza : function(){
			if (!this.check(this.numero)) return;
			
			var parteEntera = this.numero.split('.')[0]; /* parte entera */
				parteEntera = this.padLeft(parteEntera, 9, '0'); /* añadimos ceros */
			
			if (this.esDecimal) {
				var parteDecimal = this.numero.split('.')[1]; /* parte decimal */
				//parteDecimal = this.padLeft(parteDecimal,9,'0'); /* añadimos ceros */
				//if (parseFloat(parteDecimal) == 0) {this.esDecimal = !this.esDecimal;}
			}
			
			return ((this.esNegativo) ? 'menos ':'') + this.convierte(parteEntera) + ((this.esDecimal) ? ' y ' + parteDecimal + '/100' : '');
		},
		
		check : function(numArg){
//			if (!parseFloat(numArg) && numArg != "0"){
//				alert("aLiteral: " + numArg + " no es un numero válido");
//				return false;
//			}
			
			if  (!(/^[-+]?[0-9]+(\.[0-9]+)?$/.test(numArg))) {
				alert("aLiteral: " + numArg+": Caracteres no válidos"); 
				return false;
			}
			
			return true;
		},
		
		padLeft: function (cadena,tamanyo,pad){
			//p.ej. padLeft("hola",10,"$") -> $$$$$$hola
			return Array(tamanyo + 1 - cadena.length).join(pad) + cadena; /* http://www.webtoolkit.info/javascript-pad.html */
		},
		
		toUnidades: function (unidad){
			switch (unidad){
				case "1": return (this.ultimaCentena ? "uno" : "un");	break;
				case "2": return "dos"; break;
				case "3": return "tres"; break;
				case "4": return "cuatro"; break;
				case "5": return "cinco"; break;
				case "6": return "seis"; break;
				case "7": return "siete"; break;
				case "8": return "ocho"; break;
				case "9": return "nueve"; break;
			}
		},
		
		toDecenas: function (decena){			
			var ultimaCifra=decena.substr(decena.length-1,1); /* En Firefox valdría con .substr(-1,1) */
			
			var unidad=this.toUnidades(ultimaCifra);
			
			var rdo="";
			if (decena == "00") 					rdo =  "";
			if (decena >= "01" && decena<="09") 	rdo =  unidad;
			if (decena == "10") 					rdo =  "diez";
			if (decena == "11") 					rdo =  "once";
			if (decena == "12") 					rdo =  "doce";
			if (decena == "13") 					rdo =  "trece";
			if (decena == "14") 					rdo =  "catorce";
			if (decena == "15") 					rdo =  "quince";
			if (decena == "16") 					rdo =  "dieciséis"; /* por la tilde */
			if (decena >= "17" && decena <="19") 	rdo =  "dieci".concat(unidad);
			
			if (decena == "20") 					rdo =  "veinte";
			if (decena >= "21" && decena <="29") 	rdo =  "veinti".concat(unidad);
			if (decena == "22") 					rdo =  "veintidós";
			if (decena == "23") 					rdo =  "veintitrés";
			if (decena == "26") 					rdo =  "veintiséis";
			
			if (decena == "30") 					rdo =  "treinta";
			if (decena >= "31" && decena <="39") 	rdo =  "treinta y ".concat(unidad);
			
			if (decena == "40") 					rdo =  "cuarenta";
			if (decena >= "41" && decena <="49") 	rdo =  "cuarenta y ".concat(unidad);
			
			if (decena == "50") 					rdo =  "cincuenta";
			if (decena >= "51" && decena <="59") 	rdo =  "cincuenta y ".concat(unidad);
			
			if (decena == "60") 					rdo =  "sesenta";
			if (decena >= "61" && decena <="69") 	rdo =  "sesenta y ".concat(unidad);
			
			if (decena == "70") 					rdo =  "setenta";
			if (decena >= "71" && decena <="79") 	rdo =  "setenta y ".concat(unidad);
			
			if (decena == "80") 					rdo =  "ochenta";
			if (decena >= "81" && decena <="89") 	rdo =  "ochenta y ".concat(unidad);
			
			if (decena == "90") 					rdo =  "noventa";
			if (decena >= "91" && decena <="99") 	rdo =  "noventa y ".concat(unidad);
			
			return rdo;
		},
		
		toCentenas: function (numeroArg,ultimaCentenaArg){
				this.ultimaCentena=ultimaCentenaArg;
				
				numeroArg=parseFloat(numeroArg).toString(); /* así quitamos los ceros de '0001' -> '1' */
		
				var primeraCifra=numeroArg.substr(0,1);
				var centena = this.toUnidades(primeraCifra)+'cientos';
				var decenas = numeroArg.substr(1,2);
						
				// 'cientos' especiales
				if (primeraCifra == "1") centena="ciento";
				if (primeraCifra == "5") centena="quinientos";
				if (primeraCifra == "7") centena="setecientos";
				if (primeraCifra == "9") centena="novecientos";
				
				if (numeroArg == "100") centena="cien";
				
				switch (numeroArg.length){
					case 1: return this.toUnidades(numeroArg); break;
					case 2: return this.toDecenas(numeroArg); break;
					case 3: return centena+' '+this.toDecenas(decenas); break;
				}
		},
		
		convierte : function(numArg){
			if (parseFloat(numArg) == 0) return 'cero';
			
			var _1_3Cifras=numArg.substr(0,3); //millones
			var _4_6Cifras=numArg.substr(3,3); //miles
			var _7_9Cifras=numArg.substr(6,3); //centenas
		    
			var millones= this.toCentenas(_1_3Cifras,false);
			var miles	= this.toCentenas(_4_6Cifras,false);
			var centenas= this.toCentenas(_7_9Cifras,true); /* ultima centena = true */
			
			/* Filtros */
			
			millones += " millones ";
			miles += "  mil ";
			
			if (_1_3Cifras == "000") millones="";
			if (_1_3Cifras == "001") millones="un millón ";
			if (_4_6Cifras == "000") miles="";
			if (_4_6Cifras == "001") miles="mil "; /* y no 'un mil' */
			if (_7_9Cifras == "000") centenas="";
			
			return millones + miles + centenas;
		}
	}