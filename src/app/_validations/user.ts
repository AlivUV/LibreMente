const emailValidation = (email: string) => {
  const studentRegExp = /^[a-z]{1,30}@unadvirtual.edu.co$/;
  const teacherRegExp = /^[a-z.]{1,30}@unad.edu.co$/;

  return studentRegExp.test(email) || teacherRegExp.test(email);
};

const nameValidation = (name: string) => {
  return /^[a-zA-ZÀ-ÿ\u00f1\u00d1]{1,64}$/.test(name);
};

export const passwordValidation = (password: string) => {
  let errors: string[] = [];

  if (password.length < 8) {
    errors.push("La contraseña debe tener al menos 8 caracteres");
  }
  if (!/[a-z\u00f1]/.test(password)) {
    errors.push("La contraseña debe incluir una letra minúscula");
  }
  if (!/[A-Z\u00d1]/.test(password)) {
    errors.push("La contraseña debe incluir una letra mayúscula");
  }
  if (!/\d/.test(password)) {
    errors.push("La contraseña debe incluir un número");
  }

  return errors;
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
  const validationStatus = { status: 200, errors: {} };
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
  {
    const passwordErrors = passwordValidation(password);
    if (passwordErrors) {
      validationStatus.status = 400;
      validationStatus.errors = {
        ...validationStatus.errors,
        password: passwordErrors,
      };
    }
  }
  if (password !== confirmPassword) {
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
