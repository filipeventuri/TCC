import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import RecentTransactions from "../../components/Dashboard/RecentTransactions";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const RecentTransactionsPage = () => {
  useUserAuth();
  const navigate = useNavigate();

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTransactions = async () => {
    if (loading) return;
    setLoading(true);

    try {

      const [incomeRes, expenseRes] = await Promise.all([
        axiosInstance.get(API_PATHS.INCOME.GET_ALL_INCOME),
        axiosInstance.get(API_PATHS.EXPENSE.GET_ALL_EXPENSE),
      ]);

      if (incomeRes.data || expenseRes.data) {
        const allTransactions = [
          ...incomeRes.data.map((i) => ({ ...i, type: "income" })),
          ...expenseRes.data.map((e) => ({ ...e, type: "expense" })),
        ];

        
        const sorted = allTransactions.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        setTransactions(sorted);
      }
    } catch (error) {
      console.error("Erro ao buscar transações:", error);
      toast.error("Não foi possível carregar as transações.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <DashboardLayout activeMenu="Transactions">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div>
            <RecentTransactions
              transactions={transactions}
              onSeeMore={() => navigate("/transactions/all")}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RecentTransactionsPage;
