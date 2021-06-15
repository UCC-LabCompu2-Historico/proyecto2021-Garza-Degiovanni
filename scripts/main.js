window.addEventListener('load', function(){
	document.getElementById('empezar').addEventListener('click', start);
	document.getElementById('cantidad').addEventListener('change', movil);
	document.getElementById('calcular').addEventListener('click', calcular);



	// Inicializando el menu al recargar la pagina
	document.getElementById('cantidad').value = '1movil';
})

let boxVal = document.getElementById('cantidad').value;

/**
 Descripción
 Nombre de la función
 Nombre del primer parámetro y que tipo es y que contiene
 Nombre del segundo parámetro y que tipo es y que contiene
 Valor que retorna
 */
function start(){
	let elems = document.getElementsByClassName('oculto');

	while (elems.length > 0){
		elems[0].classList.remove('oculto')
	}

	document.getElementById('empezar').classList.add('oculto');
}

/**
 si seleccionamos 1 movil, los datos para el movil 2 se oculta, sino se muestra
 Nombre de la función: movil
 Valor que retorna: ninguno, se muestra para ingresr datos
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
 calculamos el val
 Nombre de la función
 Nombre del primer parámetro y que tipo es y que contiene
 Nombre del segundo parámetro y que tipo es y que contiene
 Valor que retorna
 */

function calcular(){

	// Obtiene valores de inputs 

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
    	// alert('WRONG IN COLUMN 1');
    	return;
    } else if (isOneError == 'missing'){
    	// alert('MISSING IN COLUMN 1');
    	return;
    }

	if (boxVal == '2movil'){
		isTwoError = variables(v2, x2, t2, units2, '2');
		if(isTwoError == 'wrong'){
    		// alert('WRONG IN COLUMN 2');
    		return;
    	} else if (isTwoError == 'missing'){
    		// alert('MISSING IN COLUMN 2');
    		return;
    	}
	}

	document.getElementById('automru').classList.add('oculto');


	brush.clearRect(0, 0, artist.width, artist.height);
	drawRectangle(0, 0, artist.width, artist.height, '#FFFFFF');
	drawGraph({x: 50, y: artist.height - 50}, (artist.width - 50), 30, Number(document.getElementById('t1').value), Number(document.getElementById('x1').value), Number(document.getElementById('t2').value), Number(document.getElementById('x2').value));
}


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
  // Checks what's null and what isn't
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

    	document.getElementById('v'+whichProblem).value = v;
  } else if (!x){
    	x = v * t;

		if (document.getElementById('units-x' + whichProblem).value == 'km'){
    		x = meterKilometerConverter(v, 'm');
    	}
    	document.getElementById('x'+whichProblem).value = x;
  } else if(!t){
    	t = x / v;

		if (document.getElementById('units-t' + whichProblem).value == 'h'){
    		x = hoursSecondsConverter(v, 's');
    	}
    	document.getElementById('t'+whichProblem).value = t;
  } 
  else {
  	if (v * t != x){
  		console.log('wrong!');
  		return 'wrong';
  	}
  }
  return 'correct';
}


// Converters
function meterKilometerConverter(value, unit= 'km'){
	if (unit == 'km'){
		return value * 1000;
	}
	return value / 1000;
}

function hoursSecondsConverter(value, unit= 'h'){
	if (unit == 'h'){
		return value * 3600;
	}
	return value / 3600;
}

function mpsKphConverter(value, unit= 'km/hs'){
	if (unit == 'km/hs'){
		return value / 3.6;
	}
	return value * 3.6;
}



// CANVAS STUFF :themffYay:


var artist = document.getElementById('tv');
artist.width = 700;
artist.height = 400;
var brush = artist.getContext('2d');


function drawRectangle(x, y, width, height, color){
	brush.beginPath();
	brush.rect(x, y, width, height);
	brush.stroke();
	brush.fillStyle = color;
	brush.fill();
	brush.closePath();
}

function drawLine(pos1, pos2, color = '#000000', lWidth = 2){
	brush.beginPath();
	brush.moveTo(pos1.x, pos1.y);
	brush.lineTo(pos2.x, pos2.y);
	brush.strokeStyle = color;
	brush.lineWidth = lWidth;
	brush.stroke();
	brush.closePath();
}

function drawText(pos, text, fontSize, color){
	brush.font = fontSize + 'px Arial';
	brush.fillStyle = color;
	brush.fillText(text, pos.x, pos.y);
}

function randColor(){
    var colorNum = ['0','1',"2","3","4","5","6","7","8","9","A","B","C","D","E","F"];
    var color = "#";
    for(var i = 0; i < 6 ; i++){
        color = color + colorNum[Math.floor(Math.random()*16)];
    }
    return color;
  }

function drawGraph(start, x, y, x1, y1, x2= 0, y2= 0){

	let xMax = (x1 > x2 ? x1 : x2);
	let yMax = (y1 > y2 ? y1 : y2);

	// Axis
	drawLine({x: start.x, y: start.y}, {x: x, y: start.y});
	drawLine({x: start.x, y: start.y}, {x: start.x, y: y});


	// Line 1
	bigBoyY = start.y - (y + 30);
	drawLine({x: start.x, y: start.y}, {x: (x1/xMax) * (x - start.x), y: (1 - (y1/yMax)) * bigBoyY + (y + 30)}, '#000077', 2);

	// Hashes and Cuts
	for (let i = 1; i <= 5; i++){
		
		// x hashes
		hash = (x / 5) - 10;
		xVal = xMax / 5;
		drawLine({x: hash * i, y: start.y + 7}, {x: hash * i, y: start.y - 7});
		drawText({x: hash * i - 10, y: start.y + 25}, (xVal * i).toFixed(1), 15, '#000000');


		// y hashes
		hash = start.y / 5 - 10;
		yVal = yMax / 5;
		drawLine({x: start.x - 7, y: hash * i}, {x: start.x + 7, y: hash * i});;
		drawText({x: start.x - 40, y: hash * i + 5}, (yVal * (6 - i)).toFixed(1), 15, '#000000');

	}
	drawText({x: start.x - 30, y: y - 5}, 'Distance (' + document.getElementById('units-x1').value + ')', 15, '#000');
	drawText({x: artist.width - 70, y: artist.height - y}, 'Time (' + document.getElementById('units-t1').value + ')', 15, '#000');
	drawText({x: artist.width - 100, y: y - 5}, 'v1 = ' + (y1/x1).toFixed(1) + ' ' + document.getElementById('units-v1').value , 15, '#000');
	drawText({x: start.x - 30, y: (start.y / 5 - 10) * 6 + 5}, '0.0', 18, '#000000');
	if (boxVal == '2movil'){
		drawLine({x: start.x, y: start.y}, {x: (x2/xMax) * (x - start.x), y: (1 - (y2/yMax)) * bigBoyY + (y + 30)}, '#007700', 2);
		drawText({x: artist.width - 100, y: y + 15}, 'v2 = ' + (y2/x2).toFixed(1) + ' ' + document.getElementById('units-v2').value , 15, '#000');

	}
}
