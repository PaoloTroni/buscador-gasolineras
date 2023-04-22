import { getApiData } from "./get-api-data.js";
import { filterData } from "./filtered-data.js";
const header = document.querySelector("header");
const pNota = document.createElement("p");
const pFecha = document.createElement("p");

// const optionProvinces = document.getElementById("#provinces");
// select.value = "hola";

// pNota.textContent = fuelStationsInfoFiltered[3][Localidad];

header.appendChild(pNota);
header.appendChild(pFecha);

// Llamada a la función asíncrona para pintar datos provenientes del fetch en el HTML

async function loadContent() {
  try {
    const filteredData = await filterData(); // Usamos await para esperar a que se resuelva la promesa
    const notes = await getApiData();
    const { nota, fecha } = notes;
    const latitude = filteredData[7].latitude;
    const longitude = filteredData[7].longitude;

    const linkMaps = document.getElementById("prueba");

    linkMaps.innerHTML = `<a href="https://www.google.com/maps?q=${latitude},${longitude}" target="_blank">Abrir en Google Maps</a>`;

    console.log("Array con la información filtrada:", filteredData);
    pNota.textContent = `Información del Gobierno de España: "${nota}"`;
    pFecha.textContent = `Fecha: ${fecha}`;
  } catch (error) {
    console.error("Hubo un fallo:", error);
  }
}

loadContent();

// const myArray = ["Item 1", "Item 2", "Item 3"];
// const myList = document.getElementById("myList");

// for (let i = 0; i < myArray.length; i++) {
//   const listItem = document.createElement("li");
//   listItem.textContent = myArray[i];
//   myList.appendChild(listItem);
// }

// Usando appendChild() se evita la reconstrucción del contenido HTML de myList en cada iteración del bucle, lo que puede mejorar el rendimiento en escenarios donde se agregan muchos elementos al DOM.
