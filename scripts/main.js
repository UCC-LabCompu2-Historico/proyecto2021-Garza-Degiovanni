
//On Window Load Stuff
window.addEventListener('load', function(){
	document.getElementById('empezar').addEventListener('click', start);
	document.getElementById('cantidad').addEventListener('change', movil);
	document.getElementById('calcular').addEventListener('click', calcular);
	document.getElementById('limpiarC').addEventListener('click', borrar);
	document.getElementById('animar').addEventListener('click', autoAnimado);
	document.getElementById('parar-animacion').addEventListener('click', pararAnimado);

	// Inicializando el menu al recargar la pagina
	document.getElementById('cantidad').value = '1movil';

	// Get all unidad elements and attach switch function
	let unidades = document.getElementsByClassName('unidad');
	for(let i = 0; i < unidades.length; i++){
		unidades[i].addEventListener('change', function(){
			swap(unidades[i]);
		})
	}
	let intervalID;
})

/** 
	Muestra la pagina, oculta el boton de empezar
	Nombre de la función: start
	valor que retorna: undefined
*/
function start(){
	let elems = document.getElementsByClassName('oculto');

	while (elems.length > 3){
		elems[0].classList.remove('oculto');
	}

	document.getElementById('empezar').classList.add('oculto');
}

/**
 si seleccionamos 1 movil, los datos para el movil 2 se oculta, sino se muestra
 Nombre de la función: movil
 */

function movil(){

	boxVal = document.getElementById('cantidad').value;

	if (boxVal == '1movil'){
		document.getElementsByClassName('columna2')[0].classList.add('columna2-oculto');
		document.getElementById('x2').value = '';
		document.getElementById('t2').value = '';
		document.getElementById('v2').value = '';
		document.getElementById('units-v2').value = 'm/s';
	}

	else{
		document.getElementsByClassName('columna2')[0].classList.remove('columna2-oculto');
	}
}
/**
 calculamos el cambio de unidades
 Nombre de la función: calcular
 valor que retorna: muestra error en el caso que los haya ya sea para 1 o 2 moviles
 */

function calcular(){

	// Obtiene valores de inputs
	let boxVal = document.getElementById('cantidad').value;

	let v1 = document.getElementById('v1').value;
	let x1 = document.getElementById('x1').value;
	let t1 = document.getElementById('t1').value;

	let units1 = {
	  v: document.getElementById('units-v1').value,
	  x: document.getElementById('units-x1').value,
	  t: document.getElementById('units-t1').value,
	}

	let x2 = document.getElementById('x2').value;
	let v2 = document.getElementById('v2').value;
	let t2 = document.getElementById('t2').value;

	let units2 = {
	  v: document.getElementById('units-v2').value,
	  x: document.getElementById('units-x2').value,
	  t: document.getElementById('units-t2').value,
	}

	// Cambio de unidades a metros por segundo
	if (units1.v == 'km/hs'){
		v1 = mpsKphConverter(v1);
	}

	if (units1.x == 'km'){
		x1 = meterKilometerConverter(x1);
	}

	if (units1.t == 'h'){
		t1 = hoursSecondsConverter(t1);
	}

	if (units2.v == 'km/hs'){
		v2 = mpsKphConverter(v2);
	}

	if (units2.x == 'km'){
		x2 = meterKilometerConverter(x2);
	}

	if (units2.t == 'h'){
		t2 = hoursSecondsConverter(t2);
	}

	// calculando
	let isOneError = variables(v1, x1, t1, units1, '1');
	let isTwoError;
    if(isOneError == 'wrong'){
    	alert('Error en los datos del movil 1, por favor chequee y rellene los valores de vuelta');
    	return;
    } else if (isOneError == 'missing'){
    	alert('Por favor, rellene 2 casillas del movil 1');
    	return;
    }

	if (boxVal == '2movil'){
		isTwoError = variables(v2, x2, t2, units2, '2');
		if(isTwoError == 'wrong'){
    		alert('Error en los datos del movil 2, por favor chequee y rellene los valores de vuelta');
    		return;
    	} else if (isTwoError == 'missing'){
    		alert('Por favor, rellene 2 casillas del movil 2');
    		return;
    	}
	}

	document.getElementById('automru').classList.add('oculto');

	let modo = 'm/s';
	if( document.getElementById('units-v1').value == 'km/hs' ||
			document.getElementById('units-v2').value == 'km/hs'){
				modo = 'km/hs';
			}

	let graphVar1 = {
		t: null,
		x: null
	}

	let graphVar2 = {
		t: null,
		x: null
	}
	// conversion para el grafico
	if(modo == 'km/hs'){
		//line 1
		graphVar1.t = Number(document.getElementById('t1').value);
		if(document.getElementById('units-t1').value == 's'){
			graphVar1.t = hoursSecondsConverter(document.getElementById('t1').value, 's')
		}
		graphVar1.x = Number(document.getElementById('x1').value);
		if(document.getElementById('units-x1').value == 'm'){
			graphVar1.x = meterKilometerConverter(document.getElementById('x1').value, 'm');
		}

		//line 2
		graphVar2.t = Number(document.getElementById('t2').value);
		if(document.getElementById('units-t2').value == 's'){
			graphVar2.t = hoursSecondsConverter(document.getElementById('t2').value, 's')
		}
		graphVar2.x = Number(document.getElementById('x2').value);
		if(document.getElementById('units-x2').value == 'm'){
			graphVar2.x = meterKilometerConverter(document.getElementById('x2').value, 'm');
		}
	}else{
		//line 1
		graphVar1.t = Number(document.getElementById('t1').value);
		if(document.getElementById('units-t1').value == 'h'){
			graphVar1.t = hoursSecondsConverter(document.getElementById('t1').value, 'h')
		}
		graphVar1.x = Number(document.getElementById('x1').value);
		if(document.getElementById('units-x1').value == 'km'){
			graphVar1.x = meterKilometerConverter(document.getElementById('x1').value, 'km');
		}

		//line 2
		graphVar2.t = Number(document.getElementById('t2').value);
		if(document.getElementById('units-t2').value == 'h'){
			graphVar2.t = hoursSecondsConverter(document.getElementById('t2').value, 'h')
		}
		graphVar2.x = Number(document.getElementById('x2').value);
		if(document.getElementById('units-x2').value == 'km'){
			graphVar2.x = meterKilometerConverter(document.getElementById('x2').value, 'km');
		}
	}

	brush.clearRect(0, 0, artist.width, artist.height);
	drawRectangle(0, 0, artist.width, artist.height, '#FFFFFF');
	drawGraph({x: 50, y: artist.height - 50}, (artist.width - 50), 30,
		graphVar1.t,
		graphVar1.x,
		graphVar2.t,
		graphVar2.x,
		modo);
	document.getElementById('limpiarC').classList.remove('oculto');
	document.getElementById('animar').classList.remove('oculto');
	document.getElementById('parar-animacion').classList.add('oculto');
	clearInterval(intervalID);

}

/**
 Descripción: si dejamos el campo vacio mostrara error
 Nombre de la función: variables
 parametro v,x,t: (number) valor - el valor de la velocidad, distancia y tiempo
 parametro units: (string) id - si es km/hs o m/s
 parametro whichProblem: (string) id - vemos que problema se trata
 Valor que retorna: correcto si se realiza la operacion matematica, o incorrecto si no da
 */

function variables(v,x,t, units, whichProblem){
	//que falta?
  if(v == '') {
    v = null;
  }else{
    v = Number(v);
  }
  if(x == '') {
    x = null;
  }else{
    x = Number(x);
  }
  if(t == '') {
    t = null;
  }else{
    t = Number(t);
  }
  // chequea que es nulo y que no
  if( (!v && !x) ||
      (!v && !t) ||
      (!x && !t)){
    	// dos o mas variables estan faltando;
    	return 'missing';
    	// tirar error
  } else if(!v){
    	v = x / t;

    	if (units.x == 'm' && units.t == 's'){
    		document.getElementById('units-v' + whichProblem).value = 'm/s';
    	}
    	else if(units.x == 'km' && units.t == 'h'){
			document.getElementById('units-v' + whichProblem).value = 'km/hs';
    	}

    	if (document.getElementById('units-v' + whichProblem).value == 'km/hs'){
    		v = mpsKphConverter(v, 'm/s');
    	}

    	document.getElementById('v'+whichProblem).value = Math.round(v*100)/100;
  } else if (!x){
    	x = v * t;

		if (document.getElementById('units-x' + whichProblem).value == 'km'){
    		x = meterKilometerConverter(x, 'm');
    	}
    	document.getElementById('x'+whichProblem).value = Math.round(x*100)/100;
  } else if(!t){
    	t = x / v;

		if (document.getElementById('units-t' + whichProblem).value == 'h'){
    		t = hoursSecondsConverter(t, 's');
    	}
    	document.getElementById('t'+whichProblem).value = Math.round(t*100)/100;
  }
  else if (document.getElementById('t'+whichProblem).value != Math.round((x/v)*100/100)){
			t = x / v;

		if (document.getElementById('units-t' + whichProblem).value == 'h'){
    		t = hoursSecondsConverter(t, 's');
  	}
    	document.getElementById('t'+whichProblem).value = Math.round(t*100)/100;
			//alert('Hubo un error en el calculo, modificamos el tiempo para que el calculo sea el correcto, chequea los valores de vuelta');
  }
  return 'correct';
}

/**
 Descripción: si los parametros llegan aca es porque necesitan pasarse de unidades. Cambiamos de km a m o de m a km
 Nombre de la función: meterKilometerConverter
 parametro value: (number) valor - el valor de km o de m ya que este ultimo entra por default
 parametro km: (string) id - km ya que si es m entra como km por default
 Valor que retorna: el valor en m o km segun se necesite
 */

function meterKilometerConverter(value, unit = 'km'){
	if (unit == 'km'){
		return Number(value) * 1000;
	}
	return Number(value) / 1000;
}

/**
 Descripción: cambiamos de hs a seg o de seg a hs segun se necesite
 Nombre de la función: hoursSecondsConverter
 parametro value: (number) valor - el valor de horas o de segundos
 parametro h: (string) id - entra como horas pero tambien pueden ser los segundos
 Valor que retorna: el valor en hs o segundos segun se necesite
 */

function hoursSecondsConverter(value, unit= 'h'){
	if (unit == 'h'){
		return Number(value) * 3600;
	}
	return Number(value) / 3600;
}

/**
 Descripción: cambiamos de m/s a km/hs o de km/hs a m/s segun se necesite
 Nombre de la función: mpsKphConverter
 parametro value: (number) valor - el valor de m/s o de km/hs
 parametro km/hs: (string) id - unidad original
 Valor que retorna: el valor opuesto al del id
 */

function mpsKphConverter(value, unit= 'km/hs'){
	if (unit == 'km/hs'){
		return Number(value) / 3.6;
	}
	return Number(value) * 3.6;
}

/**
 Descripción: cambiamos el valor del input cuando se cambia la unidad
 Nombre de la función: swap
 parametro elem: (object) El elemento del select
 Valor que retorna: undefined
 */

function swap(elem){
	let elemNombre = elem.id.substr(6);
	let elemUnidad = document.getElementById(elemNombre);

	switch(elem.value){
		case 'km/hs':
			elemUnidad.value = Math.round(mpsKphConverter(elemUnidad.value, 'm/s') * 100)/100;
			break;
		case 'm/s':
			elemUnidad.value = Math.round(mpsKphConverter(elemUnidad.value, 'km/hs')*100)/100;
			break;
		case 'km':
			elemUnidad.value = Math.round(meterKilometerConverter(elemUnidad.value, 'm') * 100)/100;
			break;
		case 'm':
			elemUnidad.value = Math.round(meterKilometerConverter(elemUnidad.value, 'km') * 100)/100;
			break;
		case 'h':
			elemUnidad.value = Math.round(hoursSecondsConverter(elemUnidad.value, 's') * 100)/100;
			break;
		case 's':
			elemUnidad.value = Math.round(hoursSecondsConverter(elemUnidad.value, 'h') * 100)/100;
			break;
		default:
			console.log('Problema en Swap');
	}
}



// CANVAS


var artist = document.getElementById('tv');
artist.width = 700;
artist.height = 400;
var brush = artist.getContext('2d');


/**
 Descripción: dibuja un rectangulo de canvas
 Nombre de la función: drawRectangle
 parametro x: (number) valor - el valor en pixeles de la posicion de inicio de x
 parametro y: (number) valor - el valor en pixeles de la posicion de inicio de y
 parametro width: (number) valor - el valor en pixeles del ancho
 parametro height: (number) valor - el valor en pixeles de la altura
 parametro color: (string) valor - string del color en hexadecimal

 Valor que retorna: undefined
 */

function drawRectangle(x, y, width, height, color){
	brush.beginPath();
	brush.rect(x, y, width, height);
	brush.stroke();
	brush.fillStyle = color;
	brush.fill();
	brush.closePath();
}

/**
 Descripción: dibuja una linea en el canvas
 Nombre de la función: drawLine
 parametro pos1: (dict) valor - diccionario con la posicion de inicio de la linea {x, y}
 parametro pos2: (dict) valor - diccionario con la posicion final de la linea {x, y}
 parametro color: (string) valor - string del color en hexadecimal
 parametro lWidth: (number) valor - el valor en pixeles del ancho de la linea (default 2)
 Valor que retorna: undefined
 */

function drawLine(pos1, pos2, color = '#000000', lWidth = 2){
	brush.beginPath();
	brush.moveTo(pos1.x, pos1.y);
	brush.lineTo(pos2.x, pos2.y);
	brush.strokeStyle = color;
	brush.lineWidth = lWidth;
	brush.stroke();
	brush.closePath();
}

/**
 Descripción: dibuja texto en el canvas
 Nombre de la función: drawText
 parametro pos: (dict) valor - diccionario con la posicion de inicio del texto {x, y}
 parametro text: (string) valor - el texto a dibujar
 parametro fontSize: (number) valor - el valor en pixeles del tamaño de la fuente
 parametro color: (string) valor - el valor en pixeles del ancho de la linea (default 2)
 Valor que retorna: undefined
 */

function drawText(pos, text, fontSize, color){
	brush.font = fontSize + 'px Arial';
	brush.fillStyle = color;
	brush.fillText(text, pos.x, pos.y);
}

/**
 Descripción: dibuja el grafico en el canvas
 Nombre de la función: drawGraph
 parametro start: (dict) valor - posicion de inicio de los ejes {x, y}
 parametro x: (number) valor - largo del eje X
 parametro y: (number) valor - largo del eje Y
 parametro x1: (number) valor - valor del tiempo del movil 1
 parametro y1: (number) valor - valor de la distancia del movil 1
 parametro x2: (number) valor - valor del tiempo del movil 1
 parametro y2: (number) valor - valor de la distancia del movil 1
 parametro modo: (string) valor - el modo del grafico (m/s or km/hs)

 Valor que retorna: undefined
 */

function drawGraph(start, x, y, x1, y1, x2 = 0, y2 = 0, modo){

	let boxVal = document.getElementById('cantidad').value;
	let xMax = (x1 > x2 ? x1 : x2);
	let yMax = (y1 > y2 ? y1 : y2);

	// Axis
	drawLine({x: start.x, y: start.y}, {x: x, y: start.y});
	drawLine({x: start.x, y: start.y}, {x: start.x, y: y});

	// Linea 1
	bigBoyY = start.y - (y + 30);
	drawLine({x: start.x, y: start.y},
		{x: (x1/xMax) * (x - start.x) + start.x, y: (1 - (y1/yMax)) * bigBoyY + (y + 30)}, '#000077', 2);

	// Marcas y cortes
	for (let i = 1; i <= 5; i++){

		// Marcas en X
		hash = (x / 5) - 10;
		xVal = xMax / 5;
		drawLine({x: hash * i + start.x, y: start.y + 7}, {x: hash * i + start.x, y: start.y - 7});
		//dibujar tiempo
		drawText({x: hash * i - 10 + start.x, y: start.y + 25}, (xVal * i).toFixed(1), 15, '#000000');


		// Marcas en Y
		hash = start.y / 5 - 10;
		yVal = yMax / 5;
		drawLine({x: start.x - 7, y: hash * i}, {x: start.x + 7, y: hash * i});
		//dibujar distancia
		drawText({x: start.x - 40, y: hash * i + 5}, (yVal * (6 - i)).toFixed(1), 15, '#000000');

	}

	drawText(
		{x: start.x - 30, y: y - 5},
		'Distance (' + document.getElementById('units-x1').value + ')',
		15, '#000'
	);

	drawText(
		{x: artist.width - 70, y: artist.height - y - 50},
		'Time (' + document.getElementById('units-v1').value.split('/')[1] + ')',
		15, '#000'
	);


	drawText(
		{x: artist.width - 125, y: y - 5},
		'v1 = ' + Number(document.getElementById('v1').value).toFixed(2) + ' ' + document.getElementById('units-v1').value ,
		15, '#000077'
	);

	drawText({x: start.x - 30, y: (start.y / 5 - 10) * 6 + 5}, '0.0', 18, '#000000');

	//Dibuja linea 2
	if (boxVal == '2movil'){
		drawLine({x: start.x, y: start.y}, {x: (x2/xMax) * (x - start.x) + start.x, y: (1 - (y2/yMax)) * bigBoyY + (y + 30)}, '#007700', 2);

		drawText({x: artist.width - 125, y: y + 15}, 'v2 = ' + Number(document.getElementById('v2').value).toFixed(2) + ' ' + document.getElementById('units-v2').value , 15, '#007700');

	}
}

/**
 Descripción: borra el grafico en el canvas
 Nombre de la función: limpiarCanvas
 Valor que retorna: undefined
 */

function limpiarCanvas(){
	drawRectangle(0, 0, artist.width, artist.height, '#FFFFFF');
}

/**
 Descripción: animacion del auto
 Nombre de la función: autoAnimado
 Valor que retorna: undefined
 */

function autoAnimado(){
	let boxVal = document.getElementById('cantidad').value;
	let crash = new Image();
	crash.src = "images/crash.png";

	limpiarCanvas();

	if (boxVal == '1movil'){
		x = 0;
		var car = new Image();
		dx = Math.min(Math.max(1/Number(document.getElementById('t1').value),2),6) ;

		car.src = "images/autoAnimacion1.png";
		intervalID = setInterval(function(){
				if(x >= artist.width - 150){
					brush.drawImage(crash, artist.width - 110, 150, 100, 100);
					drawText({x:x1 + 100 - 25,y:388},Math.round(Number(document.getElementById('t1').value)*100)/100+bigDxUnits.split('/')[1],18,"#000000");
					dx = 0;
					clearInterval(intervalID);
          return;
				}
			x += dx;

			limpiarCanvas();

			//dibuja linea desde el inicio al final
			drawLine({x:50, y:250},{x: artist.width - 50,y:250});
			// Dibujar linea al final
			drawLine({x:artist.width - 50, y:250},{x:artist.width - 50,y:30});
			drawLine({x:artist.width - 50, y:30},{x:artist.width,y:30});

			//Dibuja marcas en el inicio y final
			drawLine({x:50, y:250},{x:50, y:270});
			drawLine({x:artist.width - 50, y:250},{x:artist.width - 50, y:270});
			//escribe texto en el punto inicial y en el punto final
			drawText({x:50 - 10,y:295},"0" + document.getElementById('units-x1').value,18,'#000000');
			drawText({x:artist.width - 50 - 20,y:295},document.getElementById('x1').value + document.getElementById('units-x1').value,18,'#000000');
			//escribe texto para las variables
			drawText({x:x + 20,y:170}, document.getElementById('v1').value + document.getElementById('units-v1').value, 18, '#000000');

			brush.drawImage(car, x, 150);
		}, 16);
	}
	else{

		let car1 = new Image();
		let car2 = new Image();
		
		car1.src = "images/autoAnimacion1.png";
		car2.src = "images/autoAnimacion2.png";
		

		x1 = 0 - 50;
		x2 = artist.width - 50;

		//distancia de choque
		//convertir a mismas unidades
		let car1Distance = Number(document.getElementById('x1').value);
		let car2Distance = Number(document.getElementById('x2').value);
		let car1Units = document.getElementById('units-x1').value;
		let car2Units = document.getElementById('units-x2').value;
		let bigDUnit = "km";

		if(car1Units != car2Units){
			if(car1Units == "m"){
				car1Distance = meterKilometerConverter(car1Distance,"m");
			}else{
				car2Distance = meterKilometerConverter(car2Distance,"m");
			}
		}else if(car1Units == "m"){
			bigDUnit = "m";
		}

		dx1 = Number(document.getElementById('v1').value);
		dx2 = Number(document.getElementById('v2').value);
		let dx1Units = document.getElementById('units-v1').value;
		let dx2Units = document.getElementById('units-v2').value;
		let bigDxUnits = "m/s";

		if(dx1Units != dx2Units){
			if(dx1Units == "km/hs"){
				dx2 = mpsKphConverter(dx2, "m/s");
			}else{
				dx1 = mpsKphConverter(dx1, "m/s");
			}
		}else if(dx1Units == "km/hs"){
			bigDxUnits = "km/hs";
		}

		let bigD = Math.max(car1Distance,car2Distance);

		//tiempo de choque
		let crashTime = bigD / (dx1 + dx2);
		let crashDistance = Math.round(crashTime * dx1 * 100) / 100;
		let crashPercentage = crashDistance/bigD;
		let crashPos = {
			x:(artist.width - 100)*crashPercentage + (50),
			y:250
		}


		intervalID = setInterval(function(){
				if(x1 >= x2 - 100){
					brush.drawImage(crash, x1 + 100 - 50, 260, 100, 100);
					drawText({x:x1 + 100 - 25,y:370},crashDistance+bigDUnit,18,"#000000");
					drawText({x:x1 + 100 - 25,y:388},Math.round(crashTime*100)/100+bigDxUnits.split('/')[1],18,"#000000");
          dx1 = 0;
					dx2 = 0;
					clearInterval(intervalID);
          return;
				}
			x1 += (crashPercentage)*3;
			x2 -= (1-crashPercentage)*3;

			//dibujar linea de comienzo, fin y choque (si es necesario)
			limpiarCanvas();

			//Dibuja linea mostrando inicio y final
			drawLine({x:50, y:250},{x:artist.width - 50,y:250});
			//Dibuja marcas en el inicio y en el final
			drawLine({x:50, y:250},{x:50, y:270});
			drawLine({x:artist.width - 50, y:250},{x:artist.width - 50, y:270});
			//Dibuja marca en el punto de choque
			drawLine(crashPos,{x:crashPos.x,y:crashPos.y+20});
			//escribe texto de punto inicial y final
			drawText({x:50 - 10,y:295},"0" + document.getElementById('units-x1').value,18,'#000000');
			drawText({x:artist.width - 50 - 20,y:295},bigD + bigDUnit,18,'#000000');
			//escribe texto para las variables
			drawText({x:x1 + 20,y:170}, document.getElementById('v1').value + document.getElementById('units-v1').value, 18, '#000000');
			drawText({x:x2 + 20,y:170}, document.getElementById('v2').value + document.getElementById('units-v2').value, 18, '#000000');

			brush.drawImage(car1, x1, 150);
			brush.drawImage(car2, x2, 150);
		}, 16);
	}

	document.getElementById('animar').classList.add('oculto');
	document.getElementById('parar-animacion').classList.remove('oculto')
}

/**
 Descripción: para la animacion y muestra el grafico
 Nombre de la función: pararAnimado()
 Valor que retorna: ninguno
 */

function pararAnimado(){
	clearInterval(intervalID);
	calcular();
}
/**
 Descripción: borra el canvas
 Nombre de la función: borrar()
 Valor que retorna: ninguno
 */
function borrar(){
	limpiarCanvas();
	clearInterval(intervalID);
	document.getElementById('parar-animacion').classList.add('oculto');
	document.getElementById('animar').classList.remove('oculto');
}