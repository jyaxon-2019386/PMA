
iniciar(); // Llama a la función iniciar() para comenzar el juego
const letras = ['A','B','C','D','F','G','H', 'I', 'J', 'K'];

// Función para iniciar el juego
function iniciar() {
    palabraEscondida = elegirPalabraAleatoria().toUpperCase(); 
    actualizarTextoElemento("pista", "Tip: " + pistas[palabraEscondida]); 
    palabraPop = "_ ".repeat(palabraEscondida.length); 
    actualizarTextoElemento("palabra", palabraPop); 
    actualizarTextoElemento("intentos", "El número de intentos es de: " + intentos);
    letrasSeleccionadas = []; 
    console.log(palabraEscondida); 
    console.log(pistas[palabraEscondida])
}

function elegirPalabraAleatoria() {
    return palabras[Math.floor(Math.random() * palabras.length)]; 
}



function comprobar(letra) {
    letra = letra.toUpperCase(); 
    palabraEscondida = palabraEscondida.toUpperCase(); 
    let resultado = "";
    let letraIncorrecta = true;

    for (let j = 0; j < palabraEscondida.length; j++) {
        if (letra == palabraEscondida[j]) {
            resultado += letra + " "; 
            letraIncorrecta = false; 
        } else {
            resultado += palabraPop[j * 2] + " "; 
        }
    }

    palabraPop = resultado; 
    actualizarTextoElemento("palabra", palabraPop); 

    if (letraIncorrecta) {
        intentos--; 
        actualizarTextoElemento("intentos", "El número de intentos es de: " + intentos); 
    }

    if (intentos == 0) {
        console.log("Letra incorrecta");
    }

    if(palabraPop.search("_") == -1) {
        console.log("letra correcta");
    }
}

