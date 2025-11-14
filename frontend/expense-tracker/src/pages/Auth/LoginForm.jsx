import React, { useContext, useEffect, useState } from "react";
import AuthLayout from "../../components/Layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/UserContext";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Por favor entre com um endereço de e-mail válido.");
      return;
    }

    if (!password) {
      setError("Por favor digite a senha.");
      return;
    }

    setError("");

    
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Algo deu errado, tente novamente.");
      }
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-white">Bem-vindo ao Minha Wallet</h3>
        <p className="text-xs text-white mt-[5px] mb-6">
          Por favor digite seus dados para acessar sua conta.
        </p>

        <form onSubmit={handleLogin}>
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Endereço de e-mail"
            placeholder="filipe@example.com"
            type="text"
          />

          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Senha"
            placeholder="Mínimo 8 digitos"
            type="password"
          />

          {error && <p className="text-white-500 text-xs pb-2.5">{error}</p>}

          <button type="submit" className="btn-primary">
            Acessar
          </button>

          <p className="text-[13px] text-white mt-3">
            Você não tem uma conta?{" "}
            <Link className="font-medium text-orange-100 underline" to="/signup">
              Cadastrar
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default LoginForm;
