import {
  LuLayoutDashboard,
  LuHandCoins,
  LuWalletMinimal,
  LuLogOut,
  LuArrowLeftRight
} from "react-icons/lu";


export const SIDE_MENU_DATA = [
  {
     
    id: "01",
    label: "Dashboard",
    icon: LuLayoutDashboard,
    path: "/dashboard",
    name: "Dashboard"
  },
  {
    id: "02",
    label: "Income",
    icon: LuWalletMinimal,
    path: "/income",
    name: "Receita"
  },
  {
    id: "03",
    label: "Expense",
    icon: LuHandCoins,
    path: "/expense",
    name: "Despesas"
  },
  {
    id: "04",
    label: "Cashflow",
    icon: LuArrowLeftRight,
    path: "/cashflow",
    name: "Fluxo de Caixa"
  },
  
  {
    id: "06",
    label: "Logout",
    icon: LuLogOut,
    path: "logout",
    name: "Sair"
  },
];
