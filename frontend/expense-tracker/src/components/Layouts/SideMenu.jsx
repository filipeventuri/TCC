import React, { useContext } from "react";
import { SIDE_MENU_DATA } from "../../utils/data";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import CharAvatar from "../Cards/CharAvatar";
import { FaRobot } from "react-icons/fa";
import { FaFileAlt } from "react-icons/fa";


const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === "logout") {
      handelLogout();
      return;
    }

    navigate(route);
  };

  const handelLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  return (
    <div className="w-64 h-[calc(100vh-61px)]  p-5 sticky top-[61px] z-20">
      <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7">
        {user?.profileImageUrl ? (
          <img
            src={user?.profileImageUrl || ""}
            alt="Profile Image"
            className="w-20 h-20 bg-slate-400 rounded-full"
          />
        ) : (
          <CharAvatar
            fullName={user?.fullName}
            width="w-20"
            height="h-20"
            style="text-xl"
          />
        )}

        <h5 className="text-black font-medium leading-6">
          {user.fullName || ""}
        </h5>
      </div>

      <button
  className="w-full flex items-center gap-4 text-[15px] text-black bg-orange py-3 px-6 rounded-lg mb-3 hover:bg-primary hover:text-white hover:opacity-90 transition-all"
  onClick={() => window.open("https://wa.me/557185360550?text=Ol%C3%A1%2C%20Minha%20Wallet.%0AGostaria%20de%20entender%20quais%20comandos%20utilizar%20para%20intera%C3%A7%C3%A3o%20via%20whatsapp", "_blank")}
>
  <FaRobot className="text-xl animate-bounce" />
  Bot do WhatsApp
</button>

<button
  className="w-full flex items-center gap-4 text-[15px] text-black bg-orange py-3 px-6 rounded-lg mb-3 hover:bg-primary hover:text-white hover:opacity-90 transition-all"
  onClick={() =>
    window.open(
      "https://wa.me/557185360550?text=Solicitar%20relat%C3%B3rio%20financeiro",
      "_blank"
    )
  }
>
  <FaFileAlt className="text-xl" />
  Solicitar Relatório
</button>






      {SIDE_MENU_DATA.map((item, index) => (
        <button
          key={`menu_${index}`}
          className={`w-full flex items-center gap-4 text-[15px] ${
            activeMenu == item.label ? "text-white bg-primary" : ""
          } py-3 px-6 rounded-lg mb-3`}
          onClick={() => handleClick(item.path)}
        >
          <item.icon className="text-xl" />
          {item.name}
        </button>
      ))}


    </div>
  );
};

export default SideMenu;
