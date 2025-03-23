export const emailValidation = (email: string) => {
  const regExp = /^[a-z._0-9]+@unad.edu.co$/;
  return regExp.test(email);
};

export const validateRegisterData = (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  confirmPassword: string
): {
  status: number;
  error?: { password?: string; confirmPassword?: string; email?: string };
} => {
  const validationStatus = { status: 0, error: {} };
  if (!password) {
    validationStatus.status = 400;
    validationStatus.error = {
      ...validationStatus.error,
      password: "Se requiere una contraseña",
    };
  }
  if (!(password === confirmPassword)) {
    validationStatus.status = 400;
    validationStatus.error = {
      ...validationStatus.error,
      password: "La contraseña y la confirmación deben ser iguales",
    };
  }
  if (!emailValidation(email)) {
    validationStatus.status = 400;
    validationStatus.error = {
      ...validationStatus.error,
      email: "Correo no válido",
    };
  }

  return validationStatus;
};
