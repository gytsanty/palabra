//Alerta
alert("Hola soy Santiago bienvenido a la APP-PALABRA");

//Arreglo que contiene las palabras para jugar
let arrayPalabras = ["BIBLIA", "DIOS", "MUERTE", "JESUCRISTO", "SALOMON", "ISRAEL"];
//Arreglo que contiene las ayudas de cada palabra
let ayudas = [
    "Libros que contienen la palabra de Dios",
    "Creador del universo",
    "Paga del pecado",
    "Murió en una cruz para salvarnos de la condenación eterna",
    "Nombre de un Rey",
    "Es un Pais",

]
//variable que guarda la cantidad de palabras ya jugadas
let cantPalabrasJugadas = 0;

//Variable que guarda la cantidad de intentos restantes
let intentosRestantes = 5;

//variable que guarda el indice de la Palabra actual
let posActual;

//arreglo que contiene la palabra actual con la que estoy judando
let arrayPalabraActual = [];

//Cantidad de de letras acertadas por cada jugada
let cantidadAcertadas = 0;

//Arreglo que guarda cada letra en divs
let divsPalabraActual = [];

//Cantidad de palabras que debe acertar en cada jugada.
let totalQueDebeAcertar;

//Funcion que carga la  palabra nueva para jugar
function cargarNuevaPalabra() {
    //Aumento en uno cantidad de palabras jugadas y controlo si llego a su limite
    cantPalabrasJugadas++;
    if (cantPalabrasJugadas > 6) {
        //volvemos a cargar el arreglo
        arrayPalabras = ["BIBLIA", "DIOS", "MUERTE", "JESUCRISTO", "SALOMON", "ISRAEL"];
        ayudas = [
            "Libros que contienen la palabra de Dios",
            "Creador del universo",
            "Paga del pecado",
            "Murió en una cruz para salvarnos de la condenación eterna",
            "Nombre de un Rey",
            "Es un Pais"
        ]
    }

    //Selecciono una posicion random
    posActual = Math.floor(Math.random() * arrayPalabras.length);

    //Tomamos la palabra nueva
    let palabra = arrayPalabras[posActual];
    //cantidad de letras que tiene esa palabra
    totalQueDebeAcertar = palabra.length;
    //coloco en 0 la cantidad acertadas hata el momento
    cantidadAcertadas = 0;

    //Guardamos la palabra que esta en formato string en un arreglo
    arrayPalabraActual = palabra.split('');

    //limpiamos los contenedores que quedaron cargadas con la palabra anterior
    document.getElementById("palabra").innerHTML = "";
    document.getElementById("letrasIngresadas").innerHTML = "";

    //Cargamos la cantidad de divs (letras) que tiene la palabra
    for (i = 0; i < palabra.length; i++) {
        var divLetra = document.createElement("div");
        divLetra.className = "letra";
        document.getElementById("palabra").appendChild(divLetra);
    }

    //Selecciono todos los divs de la palabra
    divsPalabraActual = document.getElementsByClassName("letra");

    //seteamos los intentos
    intentosRestantes = 5;
    document.getElementById("intentos").innerHTML = intentosRestantes;

    //Cargamos la ayuda de la pregunta
    document.getElementById("ayuda").innerHTML = ayudas[posActual];

    //elimino el elemento ya seleccionado del arreglo.
    //splice(posActual,1): A partir de la posicon posActual elimino 1 elemento
    arrayPalabras.splice(posActual, 1);
    ayudas.splice(posActual, 1);

}

//Llamada para cargar la primera palabra del juego
cargarNuevaPalabra();

//Detecto la tecla que el usuario presiona
document.addEventListener("keydown", event => {
    //Controlo si la tecla presionada es una letra
    if (isLetter(event.key)) {
        //Tomo las letras ya ingresadas hasta el momento
        let letrasIngresadas = document.getElementById("letrasIngresadas").innerHTML;
        //arma un  arreglo con las letras ingresadas
        letrasIngresadas = letrasIngresadas.split('');

        //controlo si la letra presionada ya ha sido ingresada
        if (letrasIngresadas.lastIndexOf(event.key.toUpperCase()) === -1) {
            //variable bandera para saber si la letra ingresada está en la palabra a descrubir
            let acerto = false;

            //Recorro el arreglo que ocntiene la palabra para verificar si la palabra ingresada está
            for (i = 0; i < arrayPalabraActual.length; i++) {
                if (arrayPalabraActual[i] == event.key.toUpperCase()) {//acertó
                    divsPalabraActual[i].innerHTML = event.key.toUpperCase();
                    acerto = true;
                    //Aumento en uno la cantidad de letras acertadas
                    cantidadAcertadas = cantidadAcertadas + 1;
                }
            }

            //Controlo si acertó al menos una letra
            if (acerto == true) {
                //controlamos si ya acertó todas
                if (totalQueDebeAcertar == cantidadAcertadas) {
                    //asigno a cada div de la palabra la clase pintar para ponerlo en verde cada div
                    for (i = 0; i < arrayPalabraActual.length; i++) {
                        divsPalabraActual[i].className = "letra pintar";
                    }
                }
            } else {
                //No acertó, decremento los intentos restantes
                intentosRestantes = intentosRestantes - 1;
                document.getElementById("intentos").innerHTML = intentosRestantes;

                //controlamos si ya acabó todas la oportunidades
                if (intentosRestantes <= 0) {
                    for (i = 0; i < arrayPalabraActual.length; i++) {
                        divsPalabraActual[i].className = "letra pintarError";
                    }
                }
            }

            //agrega la letra ingresada a las letras ya ingresadas que se visualizan
            document.getElementById("letrasIngresadas").innerHTML += event.key.toLocaleUpperCase() + " - ";
        }
    }
});

//Función que me determina si un caracter es una letra
function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
}