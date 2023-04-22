"use strict";
import { getApiData } from "./get-api-data.js";
import { getSelectedCityCP } from "./get-selected-city-cp.js";

export async function filterData() {
  try {
    // Ese es el array original que se recibirá desde el archivo get-api-data.js
    const data = await getApiData();
    const { selectedCity, insertedPostalCode } = await getSelectedCityCP();
    const { fuelStationsInfo, cities } = data;

    // console.log("GASOLINERAS:", fuelStationsInfo);

    // console.log(
    //   "a ver filho, que pasa aqui que no muestras el municipio?",
    //   selectedCity
    // );
    // console.log(
    //   "a ver filho, que pasa aqui que no muestras el CP?",
    //   insertedPostalCode
    // );

    let postalCode = insertedPostalCode;
    let city = selectedCity;
    // city = cities[10];
    // postalCode = fuelStationsInfo[0]["C.P."]; // Ese valor no puede ser convertido en número, porque en el objeto está como string
    console.log("tipo variable CP", typeof postalCode);
    console.log("CP", postalCode);

    if (
      (isNaN(postalCode) && postalCode !== "") ||
      parseInt(postalCode) < 1001 ||
      postalCode > 52006
    ) {
      console.error("Inserte un Código Postal válido para España");
    }

    // Variables de filtrado y mensaje de aviso

    if (!city && !postalCode) {
      console.warn(
        "No has seleccionado ningún municipio ni insertado ningún Código Postal. Estarás visualizando las gasolineras de toda la provincia seleccionada"
      );
    }
    // Iniciamos un array vacío donde pondremos solo la información que nos interesa, debidamente filtrada.

    const fuelStationsInfoFiltered = [];

    // Empezamos a iterar el array original
    for (let i = 0; i < fuelStationsInfo.length; i++) {
      // Filtramos solo las gasolineras con acceso al público y en base a los filtros que ha selecionado el usuario
      if (
        fuelStationsInfo[i]["Tipo Venta"] === "P" &&
        (!city || fuelStationsInfo[i]["Municipio"] === city) &&
        (!postalCode || fuelStationsInfo[i]["C.P."] === postalCode)
      ) {
        // Cambiamos con replace() la coma de los valores de latitud y longitud por un punto, para que Google Maps pueda leer estos valores ES POSIBLE QUE ESO SE PUEDA HACER DIRECTAMENTE EN EL PUSH
        fuelStationsInfo[i]["Latitud"] = fuelStationsInfo[i]["Latitud"].replace(
          ",",
          "."
        );
        fuelStationsInfo[i]["Longitud (WGS84)"] = fuelStationsInfo[i][
          "Longitud (WGS84)"
        ].replace(",", ".");

        // Empezamos a rellenar el array con la información
        fuelStationsInfoFiltered.push({
          latitude: fuelStationsInfo[i]["Latitud"],
          longitude: fuelStationsInfo[i]["Longitud (WGS84)"],
          brand: fuelStationsInfo[i]["Rótulo"],
          address: fuelStationsInfo[i]["Dirección"],
          locality: fuelStationsInfo[i]["Localidad"],
          city: fuelStationsInfo[i]["Municipio"],
          postalCode: fuelStationsInfo[i]["C.P."],
          timetable: fuelStationsInfo[i]["Horario"],
          ...(fuelStationsInfo[i]["Precio Gasolina 95 E5"] && {
            price95E5gas: fuelStationsInfo[i]["Precio Gasolina 95 E5"],
          }),
          ...(fuelStationsInfo[i]["Precio Gasolina 95 E10"] && {
            price95E10Gas: fuelStationsInfo[i]["Precio Gasolina 95 E10"],
          }),
          ...(fuelStationsInfo[i]["Precio Gasolina 95 E5 Premium"] && {
            price95E5PremiumGas:
              fuelStationsInfo[i]["Precio Gasolina 95 E5 Premium"],
          }),
          ...(fuelStationsInfo[i]["Precio Gasolina 98 E5"] && {
            price98E5gas: fuelStationsInfo[i]["Precio Gasolina 98 E5"],
          }),
          ...(fuelStationsInfo[i]["Precio Gasolina 98 E10"] && {
            price98E10gas: fuelStationsInfo[i]["Precio Gasolina 98 E10"],
          }),
          ...(fuelStationsInfo[i]["Precio Gasoleo A"] && {
            priceADiesel: fuelStationsInfo[i]["Precio Gasoleo A"],
          }),
          ...(fuelStationsInfo[i]["Precio Gasoleo B"] && {
            priceBDiesel: fuelStationsInfo[i]["Precio Gasoleo B"],
          }),
          ...(fuelStationsInfo[i]["Precio Gasoleo Premium"] && {
            priceDieselPremium: fuelStationsInfo[i]["Precio Gasoleo Premium"],
          }),
          ...(fuelStationsInfo[i]["Precio Biodiesel"] && {
            priceBioDiesel: fuelStationsInfo[i]["Precio Biodiesel"],
          }),
          ...(fuelStationsInfo[i]["Precio Gas Natural Comprimido"] && {
            priceGNC: fuelStationsInfo[i]["Precio Gas Natural Comprimido"],
          }),
          ...(fuelStationsInfo[i]["Precio Gas Natural Licuado"] && {
            priceGNL: fuelStationsInfo[i]["Precio Gas Natural Licuado"],
          }),
          ...(fuelStationsInfo[i]["Precio Gases licuados del petróleo"] && {
            priceGPL: fuelStationsInfo[i]["Precio Gases licuados del petróleo"],
          }),
          ...(fuelStationsInfo[i]["Precio Bioetanol"] && {
            priceBioEthanol: fuelStationsInfo[i]["Precio Bioetanol"],
          }),
          ...(fuelStationsInfo[i]["Precio Hidrogeno"] && {
            priceHydrogen: fuelStationsInfo[i]["Precio Hidrogeno"],
          }),
        });
      }
    }

    // console.log("Resultado final:", filterData());
    return fuelStationsInfoFiltered;
  } catch (error) {
    console.error("Hubo un fallo:", error);
  }
}
