/* TODO: inserite il codice JavaScript necessario a completare il MHW! */

function Selected(event){
	const bottone= event.currentTarget;
	const checkbox = bottone.querySelector('.checkbox');
	const path_unchecked = checkbox.src; //path = tutti i checkbox con src uguale ad unchecked
	const griglia = bottone.parentNode

	const grid = griglia.querySelectorAll('div');

	for(let check of grid){
		const spunta = check.querySelector(".checkbox");
		spunta.src = "images/unchecked.png";
		check.classList.add('opacita');
		check.classList.remove('hidden');
	}
	bottone.classList.remove('opacita');
	bottone.classList.add('hidden');
	checkbox.src= "images/checked.png";

	const path_checked = checkbox.src;

	const struttura = griglia.parentNode;

	controlloRisposte(struttura, path_checked);
}


function controlloRisposte(struttura, checked){

	let i=0;

	const grid = struttura.querySelectorAll(".choice-grid");
	for(let griglia of grid){
		const image = griglia.querySelectorAll(".checkbox");
		for(let check of image){
			if(check.src === checked)
				i++;
		}
	}

	if(i===3){
        let j=0;
        const id=[];
        
		for(let griglia of grid){
			const list_div = griglia.querySelectorAll(".choice-grid div");

            //list_div ==> 27 div
            //ciclo di 27 div
            //checked = src immagine
			for(let div of list_div){
				const img = div.querySelectorAll(".checkbox");
				
                for(let images of img){
                    if(images.src === checked){
                        const parent = images.parentNode;
                        id[j] = parent.dataset.choiceId;
                        j++;
                        
                        break;
                    }
                }

				div.removeEventListener('click', Selected);
			}
		}
        risultatoTest(id);
	}

}


function risultatoTest(id){
	let max = 0;
	let cont =0;
	let uscita = 0;

	for(let i =0; i<id.length; i++){
		for(j=0; j<id.length; j++){
			if(id[i]===id[j]){
				cont ++;
			}
		}
		if(cont > max){
			max = cont;
			uscita = id[i];
		}
		cont=0;

	}

	sezioneFinale(uscita);

}


function sezioneFinale(string){
	const result = document.querySelector('#result');
	result.classList.remove('none');
	const title = document.createElement('h1');
	title.textContent = RESULTS_MAP[string].title;
	const testo = document.createElement('div');
	testo.textContent = RESULTS_MAP[string].contents;
	const ricomincia = document.createElement('span');
	ricomincia.textContent = 'Ricomincia il quiz';
	ricomincia.classList.add('ritorno');

	result.appendChild(title);
	result.appendChild(testo);
	result.appendChild(ricomincia);

	ricomincia.addEventListener('click', Return);
}


function Return(event){

	const result=document.querySelector('#result');
	const lista = result.childNodes;

	
	result.removeChild(lista[2]);
	result.removeChild(lista[1]);
	result.removeChild(lista[0]);
	

	result.classList.add('none');

	for(let bottoni of button){
		bottoni.classList.remove('opacita');
		bottoni.classList.remove('hidden');
		const div = bottoni.querySelectorAll(".checkbox");
		for(let img of div)
			img.src = "images/unchecked.png";
		
	}

	for(let bottoni of button)
		bottoni.addEventListener('click', Selected);	



}



const button= document.querySelectorAll('.choice-grid div');

for(let bottoni of button){
	bottoni.addEventListener('click', Selected);	
}


