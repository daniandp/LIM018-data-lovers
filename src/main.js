import data from "./data/pokemon/pokemon.js";
import { sortData, filterData, computeStats, searchData } from "./data.js";

//Almacenando la data en una variable
const pokemons = data.pokemon;

//Llamando al div pokemonInfo
let pokemonInfo = document.querySelector("#pokemonInfo");

//Por cada objeto del array que muestre la info especificada "card"
function showInfo(dataPokemon) {
  pokemonInfo.innerHTML = "";
  dataPokemon.forEach(function (pokemon) {
    //Creamos el divpokeInfo donde estarán los datos de los pokémon
    const divPokemon = document.createElement("div");
    //Le agregamos clase al nuevo div
    divPokemon.setAttribute("class", "pokeInfo");
    //Agregamos todos los datos de los pokémon al nuevo div
    divPokemon.innerHTML += `<img src = ${pokemon.img} alt="pokemon's image"> <h3>${pokemon.name}</h3> <p>${pokemon.num}</p> <p>${pokemon.type}</p>`;
    //Enviamos el div class pokeInfo al div pokemonInfo
    pokemonInfo.appendChild(divPokemon);
  });
}
// Se muestran los pokémon en el navegador
showInfo(pokemons);

//Traemos al select donde están A-Z Z-A
let pokemonOrder = document.getElementById("alphabeticalOrder");

//Al escoger una opción (change) se muestran los pokémon ordenados alfabéticamente
pokemonOrder.addEventListener("change", function (e) {
  let alphabeticOrder = e.target.value;
  const sortedData = sortData(pokemons, alphabeticOrder);
  showInfo(sortedData);
});

//Traemos al select donde están las opciones de tipo de pokémon
let pokeTypes = document.getElementById("pokeTypes");

//Al escoger una opción (change) se muestran los tipos de pokémon escogidos
pokeTypes.addEventListener("change", function (e) {
  let typePokemon = e.target.value;
  const filteredData = filterData(pokemons, typePokemon);
  showInfo(filteredData);
});

//PANTALLA 2
//Traemos los elementos para mostrar a los pokémon por %
let pokePercentage = document.getElementById("pokePercentage");
let secondScreen = document.querySelector(".secondScreen");
let hiddenScreen = document.querySelector(".hiddenScreen");

//div padre de divPercen y de imgPokedex
let divPokedex = document.createElement("div");
divPokedex.setAttribute("class", "divPokedex");
secondScreen.appendChild(divPokedex);

//Hijo 1 de divPokedex. Creamos el divPercen para mostrar el porcentaje
let divPercen = document.createElement("div"); //
divPercen.setAttribute("class", "divPercen");
divPokedex.appendChild(divPercen);

//Al escoger una opción (change) se muestran el porcentaje de pokémon escogidos
pokePercentage.addEventListener("change", function (e) {
  let pokemonPercen = e.target.value;
  const percenData = computeStats(pokemons, pokemonPercen); // Este valor es de tipo string
  document.querySelector(".banner").style.display = "none";
  hiddenScreen.classList.remove("hiddenScreen");
  if (pokemonPercen) {
    divPercen.innerHTML = `<p class="text">This is the percentage of Pokemon from type ${pokemonPercen}:</p> <h4 class="text"> ${percenData} </h4>`;
  }
});

//Hijo 2 de divPokedex
let imgPokedex = document.createElement("img");
imgPokedex.setAttribute("class", "imgPokedex");
imgPokedex.src = "imagen/pokedex.png";
divPokedex.appendChild(imgPokedex);

//Hermano de divPokedex. Creamos el divImg para mostrar imagen
let divImg = document.createElement("div");
divImg.setAttribute("class", "divImg");
secondScreen.appendChild(divImg);

let img = document.createElement("img");
img.src = "imagen/pokemonpokedex.png";
divImg.appendChild(img);

//Traemos a la barra de búsqueda
let searchBar = document.querySelector("#searchBar");

//Que la barra busque los pokémon al escribir
searchBar.addEventListener("input", function (e) {
  let searchingBar = e.target.value;
  const searchedData = searchData(pokemons, searchingBar);
  if (searchedData.length === 0) {
    alert("Sorry trainer, Pokemon doesn't exist");
  } else {
    showInfo(searchedData);
  }
});

//Traemos a todos los select y al botón de limpiar
let selectors = document.querySelectorAll(".selectors");
let cleanButton = document.querySelector("button");
let selectorsValues = ["Order by", "Filter by", "% Types"];

//Botón de limpiar
cleanButton.addEventListener("click", () => {
  for (let i = selectors.length - 1; i >= 0; i--) {
    selectors[i].value = selectorsValues[i];
  }
  showInfo(pokemons);
  document.querySelector(".banner").style.display = "block";
  hiddenScreen.classList.add("hiddenScreen");
});



