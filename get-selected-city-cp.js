"use strict";

import { handleForm } from "./handle-form.js";

export const getSelectedCityCP = async () => {
  try {
    const { selectedCity, insertedPostalCode } = await handleForm();
    // console.log(selectedCity, insertedPostalCode);

    // Devolvemos los valores insertados en el formulario
    return { selectedCity, insertedPostalCode };
  } catch (error) {
    console.error(error);
  }
};
