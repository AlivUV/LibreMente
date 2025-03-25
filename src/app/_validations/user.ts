const emailValidation = (email: string) => {
  const studentRegExp = /^[a-z]{1,30}@unadvirtual.edu.co$/;
  const teacherRegExp = /^[a-z.]{1,30}@unad.edu.co$/;

  return studentRegExp.test(email) || teacherRegExp.test(email);
};

const nameValidation = (name: string) => {
  return /^[a-zA-ZÀ-ÿ\u00f1\u00d1]{1,64}$/.test(name);
};

export const validateRegisterData = (
  profileImage: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  confirmPassword: string
): {
  status: number;
  errors?: { password?: string; confirmPassword?: string; email?: string };
} => {
  const validationStatus = { status: 0, errors: {} };
  if (!profileImage) {
    validationStatus.status = 400;
    validationStatus.errors = {
      ...validationStatus.errors,
      profileImage: "Se requiere una imagen de perfil",
    };
  }
  if (!nameValidation(firstName)) {
    validationStatus.status = 400;
    validationStatus.errors = {
      ...validationStatus.errors,
      firstName: "El nombre no puede estar vacío y solo debe incluir letras",
    };
  }
  if (!nameValidation(lastName)) {
    validationStatus.status = 400;
    validationStatus.errors = {
      ...validationStatus.errors,
      lastName: "El apellido no puede estar vacío y solo debe incluir letras",
    };
  }
  if (!password) {
    validationStatus.status = 400;
    validationStatus.errors = {
      ...validationStatus.errors,
      password: "Se requiere una contraseña",
    };
  }
  if (!(password === confirmPassword)) {
    validationStatus.status = 400;
    validationStatus.errors = {
      ...validationStatus.errors,
      confirmPassword: "La contraseña y la confirmación deben ser iguales",
    };
  }
  if (!emailValidation(email)) {
    validationStatus.status = 400;
    validationStatus.errors = {
      ...validationStatus.errors,
      email: "Correo no válido",
    };
  }

  return validationStatus;
};
