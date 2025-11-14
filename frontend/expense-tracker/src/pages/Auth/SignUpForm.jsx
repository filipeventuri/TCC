import React, { useContext, useState } from "react";
import AuthLayout from "../../components/Layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import { API_PATHS } from "../../utils/apiPaths";
import uploadImage from "../../utils/uploadImage";
import { UserContext } from "../../context/UserContext";
import axiosInstance from "../../utils/axiosInstance";

const SignUpForm = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();


  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";

    if (!fullName) {
      setError("Digite seu nome.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Digite seu e-mail.");
      return;
    }

    if (!phone) {
      setError("Digite seu celular.");
      return;
    }

    if (!password) {
      setError("Digite sua senha.");
      return;
    }

    setError("");

    
    try {
      
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        phone,
        password,
        profileImageUrl,
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
      <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-white">Cadastre uma nova conta</h3>
        <p className="text-xs text-white mt-[5px] mb-6">
          Junte-se a plataforma, digitando seus dados abaixo.
        </p>

        <form onSubmit={handleSignUp}>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-2">
            <Input
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label="Nome completo"
              placeholder="Marcelo"
              type="text"
            />
            </div>
           
            <div className="col-span-2">
             <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Endereço de e-mail"
              placeholder="marcelo@example.com"
              type="text"
            />
            </div>
            
            <div className="col-span-2">
              <Input
              value={phone}
              onChange={({ target }) => setPhone(target.value)}
              label="DDD + Celular"
              placeholder="75992561765"
              type="text"/>
              </div>
            

            <div className="col-span-2">
              <Input
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                label="Senha"
                placeholder="Mínimo 8 Caracteres"
                type="password"
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

          <button type="submit" className="btn-primary">
            Cadastrar
          </button>

          <p className="text-[13px] text-white mt-3">
           Já tem uma conta?{" "}
            <Link className="font-medium text-orange-50 underline" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUpForm;
