"use strict";
// Importamos el objeto con los códigos de las provincias
import { provincesCode } from "./provinces-code.js";
import { handleForm } from "./handle-form.js";

const getURL = async () => {
  try {
    const { selectedProvince } = await handleForm();
    const url = `https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/FiltroProvincia/${provincesCode[selectedProvince]}`;

    // Devolvemos la URL que se usará en el fetch
    return url;
  } catch (error) {
    console.error(error);
  }
};

// Hacemos la función asíncrona donde vamos a trabajar los datos que recibimos del Fetch
export async function getApiData() {
  try {
    // Llamamos a la función getURL para obtener la URL del fetch
    const dataGasStationsSpain = await getURL();
    // Fetch y datos relativos a la respuesta
    const response = await fetch(dataGasStationsSpain);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    // Sacamos la información global que nos interesa (data) del json de la respuesta
    const data = await response.json();

    // console.log("Todos datos de todas las gasolineras de la provincia:", data);

    // Empezamos a sacar los datos en el detalle
    const fecha = data.Fecha;
    const nota = data.Nota;

    // Ese es el dato que más nos interesa trabajar - un array de objetos
    const fuelStationsInfo = data.ListaEESSPrecio;

    // Hacemos una primera iteración en el Array para sacar un array de strings con los municipios

    // Iniciamos el array de municipios, que inicia vacío
    const cities = [];

    // Empezamos el ciclo donde vamos primero a comprobar si el array de ciudades ya no contiene el nombre del municipio. En caso no incluya, entonces, añadimos el nombre de la ciudad
    for (let i = 0; i < fuelStationsInfo.length; i++) {
      if (!cities.includes(fuelStationsInfo[i]["Municipio"])) {
        cities.push(fuelStationsInfo[i]["Municipio"]);
      }
    }

    // console.log("Todos municipios de las provincias:", cities);

    // retornamos los datos que nos interesan para poder usar en otros archivos

    return { nota, fecha, fuelStationsInfo, cities };
  } catch (error) {
    console.error(error);
  }
}

// Para hacer consultas a la pagina de gasolineras de España hay que consultar esa página de ayuda
// https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/help

// listado por comunidades autonomas
// https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/Listados/ComunidadesAutonomas/

// listado por provincias
// https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/Listados/Provincias/

// listado de productos
// https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/Listados/ProductosPetroliferos/
