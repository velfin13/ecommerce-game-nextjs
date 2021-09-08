import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { loginAPI, resetPasswordAPI } from "../../../api/user";
import useAuth from "../../../hooks/useAuth";

const { Input } = Form;

const LoginForm = (props) => {
  /* extraer data de useAuth */
  const { login } = useAuth();

  const { showRegisterForm, onCloseModal } = props;
  const [loading, setLoading] = useState(false);

  /* configuracion del formik */
  const formit = useFormik({
    initialValues: initialValues(),
    validationSchema: yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      const response = await loginAPI(formData);

      if (response?.jwt) {
        login(response.jwt);
        onCloseModal();
      } else {
        toast.error("El correo o la contraseña es incorrecto");
      }

      setLoading(false);
    },
  });

  const resetPassword = () => {
    formit.setErrors({});
    const validateEmail = yup
      .string()
      .required("El email es requerido")
      .email();
    if (!validateEmail.isValidSync(formit.values.identifier)) {
      formit.setErrors({ identifier: true });
    } else {
      resetPasswordAPI(formit.values.identifier);
    }
  };

  return (
    <Form className="login-form" onSubmit={formit.handleSubmit}>
      <Input
        name="identifier"
        type="text"
        placeholder="Correo electronico"
        onChange={formit.handleChange}
        error={formit.errors.identifier}
      />
      <Input
        name="password"
        type="password"
        placeholder="Contraseña"
        onChange={formit.handleChange}
        error={formit.errors.password}
      />
      <div className="actions">
        <Button basic type="button" onClick={showRegisterForm}>
          Registrase
        </Button>
        <div>
          <Button type="submit" className="submit" loading={loading}>
            Iniciar Sesión
          </Button>
          <Button type="button" onClick={resetPassword}>
            ¿Has olvidado la contraseña?
          </Button>
        </div>
      </div>
    </Form>
  );
};

const initialValues = () => {
  return {
    identifier: "",
    password: "",
  };
};

const validationSchema = () => {
  return {
    identifier: yup.string().email("email invalido").required(true),
    password: yup.string().required(true),
  };
};

export default LoginForm;
