"use strict";

export const handleForm = async () => {
  return new Promise((resolve) => {
    // seleccionamos el form
    const selectionForm = document.querySelector("#selectionForm");

    // escuchamos el evento submit del formulario
    selectionForm.addEventListener("submit", (e) => {
      //prevenimos el envío del formulario
      e.preventDefault();

      //Creamos el objeto FormData
      const values = new FormData(e.target);

      const selectedProvince = values.get("selectProvince");
      const selectedCity = values.get("selectCity");
      const insertedPostalCode = values.get("postalCode");

      const selection = {
        selectedProvince,
        selectedCity,
        insertedPostalCode,
      };

      resolve(selection);
    });
  });
};
