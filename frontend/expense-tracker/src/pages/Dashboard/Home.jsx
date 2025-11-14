import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/Layouts/DashboardLayout";

import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import { IoMdCard } from "react-icons/io";

import { useNavigate } from "react-router-dom";
import InfoCard from "../../components/Cards/InfoCard";
import { useUserAuth } from "../../hooks/useUserAuth";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { addThousandsSeparator } from "../../utils/helper";
import RecentTransactions from "../../components/Dashboard/RecentTransactions";
import FinanceOverview from "../../components/Dashboard/FinanceOverview";
import ExpenseTransactions from "../../components/Dashboard/ExpenseTransactions";
import Last30DaysExpenses from "../../components/Dashboard/Last30DaysExpenses";
import RecentIncome from "../../components/Dashboard/RecentIncome";
import RecentIncomeWithChart from "../../components/Dashboard/RecentIncomeWithChart";

const Home = () => {
  useUserAuth();

  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(true); // <-- nova flag

  const fetchDashboardData = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get(`${API_PATHS.DASHBOARD.GET_DATA}`);

      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong. Please try again.", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <DashboardLayout activeMenu="Dashboard">

      {showModal && (
  <div
    className="fixed inset-0 flex items-center justify-center backdrop-blur-md z-[200]"
    onClick={() => {
      setShowModal(false);
      localStorage.setItem("aiModalShown", "true");
    }}
  >
    <div
      className="bg-white p-6 rounded-3xl shadow-xl max-w-[380px] w-[90%] text-center"
      style={{ fontFamily: "sans-serif" }}
      onClick={(e) => e.stopPropagation()}
    >
      <h3 className="text-xl font-semibold" style={{ color: "#ff9800" }}>
        👋 Ei! Você sabia?
      </h3>

      <p className="mt-2 text-gray-700">
        Agora você pode mandar seus gastos e rendas pelo WhatsApp!
        Fala com a nossa IA, manda áudio, texto ou foto do comprovante,
        e ela registra tudo automaticamente na sua conta. 💸✨
      </p>

      <a
        href="https://wa.me/557185360550?text=Ol%C3%A1%2C%20Minha%20Wallet.%0AGostaria%20de%20entender%20quais%20comandos%20utilizar%20para%20intera%C3%A7%C3%A3o%20via%20whatsapp"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-block bg-[#ff9800] text-white px-6 py-2 rounded-full shadow-lg hover:opacity-90 transition-all"
      >
        📲 Usar pelo WhatsApp
      </a>

      <button
        onClick={() => {
          setShowModal(false);
          localStorage.setItem("aiModalShown", "true");
        }}
        className="mt-3 block text-sm text-gray-600 hover:underline"
      >
        Fechar
      </button>
    </div>
  </div>
)}



      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  <InfoCard
    icon={<IoMdCard />}
    label="Saldo"
    value={dashboardData?.totalBalance || 0}
    color="bg-primary"
  />

  <InfoCard
    icon={<LuWalletMinimal />}
    label="Receita total"
    value={dashboardData?.totalIncome || 0}
    color="bg-orange-500"
  />

  <InfoCard
    icon={<LuHandCoins />}
    label="Despesa Total"
    value={dashboardData?.totalExpenses || 0}
    color="bg-red-500"
  />
</div>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <RecentTransactions
            transactions={dashboardData?.recentTransactions}
            onSeeMore={() => navigate("/expense")}
          />

          <FinanceOverview
            totalBalance={dashboardData?.totalBalance || 0}
            totalIncome={dashboardData?.totalIncome || 0}
            totalExpense={dashboardData?.totalExpenses || 0}
          />

          <ExpenseTransactions
            transactions={dashboardData?.last30DaysExpenses?.transactions || []}
            onSeeMore={() => navigate("/expense")}
          />

          <Last30DaysExpenses
            data={dashboardData?.last30DaysExpenses?.transactions || []}
          />

          <RecentIncomeWithChart
            data={dashboardData?.last60DaysIncome?.transactions?.slice(0, 4) || []}
            totalIncome={dashboardData?.totalIncome || 0}
          />

          <RecentIncome
            transactions={dashboardData?.last60DaysIncome?.transactions || []}
            onSeeMore={() => navigate("/income")}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;
