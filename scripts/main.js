window.addEventListener('load', function(){
	document.getElementById('empezar').addEventListener('click', start);
	document.getElementById('cantidad').addEventListener('change', movil);
	document.getElementById('calcular').addEventListener('click', calcular);



	// Inicializando el menu al recargar la pagina
	document.getElementById('cantidad').value = '1movil';
})

let boxVal = document.getElementById('cantidad').value;

function start(){
	let elems = document.getElementsByClassName('oculto');

	while (elems.length > 0){
		elems[0].classList.remove('oculto')
	}

	document.getElementById('empezar').classList.add('oculto');
}


function movil(){

	boxVal = document.getElementById('cantidad').value;

	if (boxVal == '1movil'){
		document.getElementsByClassName('columna2')[0].classList.add('columna2-oculto');
	}

	else{
		document.getElementsByClassName('columna2')[0].classList.remove('columna2-oculto');
	}
}

function calcular(){
	let v1 = document.getElementById('v1').value;
	let x1 = document.getElementById('x1').value;
	let t1 = document.getElementById('t1').value;
	
	let x2 = document.getElementById('x2').value;
	let v2 = document.getElementById('v2').value;
	let t2 = document.getElementById('t2').value;



	if (boxVal == '1movil'){
		// Calcula cuando hay 1 movil
	}
	else {
		// Calcula cuando hay 2 moviles
	}

	console.log('Hola estoy tratando de calcular');
	
}
