
//On Window Load Stuff
window.addEventListener('load', function(){
	document.getElementById('empezar').addEventListener('click', start);
	document.getElementById('cantidad').addEventListener('change', movil);
	document.getElementById('calcular').addEventListener('click', calcular);
	document.getElementById('limpiarC').addEventListener('click', limpiarCanvas);
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



/** TRANSLATE
	Show Form Inputs
	Nombre de la función: start
	valor que retorna: undefined
*/
function start(){
	let elems = document.getElementsByClassName('oculto');

	while (elems.length > 1){
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

	// Calculate stuff
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
	// TRANSLATE Convert for graph
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
	//What's missing
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
  // TRANSLATE Checks what's null and what isn't
  if( (!v && !x) ||
      (!v && !t) ||
      (!x && !t)){
    	// Two or more variables are missing;
    	return 'missing';
    	// Throw error
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
  else {
  	if (v * t != x){
  		console.log('wrong!');
  		return 'wrong';
  	}
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
			elemUnidad.value = mpsKphConverter(elemUnidad.value, 'm/s');
			break;
		case 'm/s':
			elemUnidad.value = mpsKphConverter(elemUnidad.value, 'km/hs');
			break;
		case 'km':
			elemUnidad.value = meterKilometerConverter(elemUnidad.value, 'm');
			break;
		case 'm':
			elemUnidad.value = meterKilometerConverter(elemUnidad.value, 'km');
			break;
		case 'h':
			elemUnidad.value = hoursSecondsConverter(elemUnidad.value, 's');
			break;
		case 's':
			elemUnidad.value = hoursSecondsConverter(elemUnidad.value, 'h');
			break;
		default:
			console.log('Problema en Swap');
	}
}



// CANVAS STUFF


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

	// Line 1
	bigBoyY = start.y - (y + 30);
	drawLine({x: start.x, y: start.y},
		{x: (x1/xMax) * (x - start.x), y: (1 - (y1/yMax)) * bigBoyY + (y + 30)}, '#000077', 2);

	// Hashes and Cuts
	for (let i = 1; i <= 5; i++){

		// x hashes
		hash = (x / 5) - 10;
		xVal = xMax / 5;
		drawLine({x: hash * i, y: start.y + 7}, {x: hash * i, y: start.y - 7});
		//dibujar tiempo
		drawText({x: hash * i - 10, y: start.y + 25}, (xVal * i).toFixed(1), 15, '#000000');


		// y hashes
		hash = start.y / 5 - 10;
		yVal = yMax / 5;
		drawLine({x: start.x - 7, y: hash * i}, {x: start.x + 7, y: hash * i});
		//dibujar distancia

		//TRANSLATE ERASE
		//Find out if one of the units is Kilometers
		//If it is convert any meters to Kilometers
		//write thingies in km/hs and km and stuff
		drawText({x: start.x - 40, y: hash * i + 5}, (yVal * (6 - i)).toFixed(1), 15, '#000000');

	}

	drawText(
		{x: start.x - 30, y: y - 5},
		'Distance (' + document.getElementById('units-x1').value + ')',
		15, '#000'
	);

	drawText(
		{x: artist.width - 70, y: artist.height - y},
		'Time (' + document.getElementById('units-t1').value + ')',
		15, '#000'
	);


	drawText(
		{x: artist.width - 125, y: y - 5},
		'v1 = ' + Number(document.getElementById('v1').value).toFixed(2) + ' ' + document.getElementById('units-v1').value ,
		15, '#000077'
	);

	drawText({x: start.x - 30, y: (start.y / 5 - 10) * 6 + 5}, '0.0', 18, '#000000');

	if (boxVal == '2movil'){
		drawLine({x: start.x, y: start.y}, {x: (x2/xMax) * (x - start.x), y: (1 - (y2/yMax)) * bigBoyY + (y + 30)}, '#007700', 2);

		drawText({x: artist.width - 125, y: y + 15}, 'v2 = ' + Number(document.getElementById('v2').value).toFixed(2) + ' ' + document.getElementById('units-v2').value , 15, '#007700');

	}
}

/**
 Descripción: borra el grafico en el canvas
 Nombre de la función: limpiarCanvas
 Valor que retorna: undefined
 */

function limpiarCanvas(){
	brush.clearRect(0, 0, artist.width, artist.height);
}


function autoAnimado(){

	let boxVal = document.getElementById('cantidad').value;
	

	if (boxVal == '1movil'){
		x = 0;
		var img = new Image();
		dx = Number(document.getElementById('v1').value);

		img.src = "images/autoAnimacion1.png";
		intervalID = setInterval(function(){
				if(x > artist.width - img.width){
					x = 0;
				}
			x += dx;	
			calcular();
			brush.drawImage(img, x, 230);
		}, 10);
	}
	else{

		var img1 = new Image();
		var img2 = new Image();

		x1 = 0;
		x2 = artist.width - img2.width;
		img1.src = "images/autoAnimacion1.png";
		img2.src = "images/autoAnimacion2.png";

		dx1 = Number(document.getElementById('v1').value);
		dx2 = Number(document.getElementById('v2').value);
		intervalID = setInterval(function(){
				if(x1 == x2 - img2.width){
					x1 = 0;
					x2 = artist.width - img2.width;
				}
			x1 += dx1;
			x2 -= dx2;	
			calcular();
			brush.drawImage(img1, x1, 230);
			brush.drawImage(img2, x2, 230);
		}, 10);
	}

	document.getElementById('animar').classList.add('oculto');
	document.getElementById('parar-animacion').classList.remove('oculto')
}

function pararAnimado(){

	clearInterval(intervalID);
	calcular();
	document.getElementById('animar').classList.remove('oculto');
	document.getElementById('parar-animacion').classList.add('oculto')
}