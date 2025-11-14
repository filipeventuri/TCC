import React from "react";
import CustomPieChart from "../Charts/CustomPieChart";

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {
  const COLORS = ["#875CF5", "#FA2C37", "#FF6900"];

  const balanceData = [
    { name: "Saldo", amount: Number(totalBalance || 0) },
    { name: "Gasto total", amount: Number(totalExpense || 0) },
    { name: "Renda total", amount: Number(totalIncome || 0) },
  ];

  return (
    <div className="card">
      <div className="flex items-center justify-between ">
        <h5 className="text-lg">Visão geral</h5>
      </div>

      <CustomPieChart
        data={balanceData}
        label="Saldo"
        totalAmount={Number(totalBalance || 0)} 
        colors={COLORS}
        showTextAnchor
      />
    </div>
  );
};

export default FinanceOverview;
