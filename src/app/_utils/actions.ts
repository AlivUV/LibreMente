"use server";

export async function pruebaServerAction(formData: FormData) {
  console.log(
    "Hola, te saludo desde el servidor. Si funciona, esto es impresionante...: " +
      formData.get("Celular")
  );
}