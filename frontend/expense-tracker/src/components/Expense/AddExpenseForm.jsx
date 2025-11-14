import React, { useState } from "react";
import Input from "../Inputs/Input";
import EmojiPickerPopup from "../EmojiPickerPopup";

const AddExpenseForm = ({ onAddExpense }) => {
  const [income, setIncome] = useState({
    category: "",
    amount: "",
    date: "",
    details: "",
    icon: "",
  });

  const handleChange = (key, value) => setIncome({ ...income, [key]: value });

  const handleSubmit = () => {
    const adjustedDate =
      income.date && !income.date.includes("T")
        ? `${income.date}T12:00:00` 
        : income.date;

    
    const numericAmount = parseFloat(String(income.amount).replace(",", "."));

    const formattedExpense = {
      ...income,
      amount: numericAmount, 
      date: adjustedDate,
    };

    onAddExpense(formattedExpense);
  };

  return (
    <div>
      <EmojiPickerPopup
        icon={income.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />

      <Input
        value={income.category}
        onChange={({ target }) => handleChange("category", target.value)}
        label="Categoria"
        placeholder="Essencial, Emergencial e etc"
        type="text"
      />

      <Input
        value={income.amount}
        onChange={({ target }) => handleChange("amount", target.value)}
        label="Valor (R$)"
        type="text" 
        placeholder="Ex: 120,50"
      />

      <Input
        value={income.details}
        onChange={({ target }) => handleChange("details", target.value)}
        label="Descrição"
        type="text"
      />

      <Input
        value={income.date}
        onChange={({ target }) => handleChange("date", target.value)}
        label="Data"
        type="date"
      />

      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="add-btn add-btn-fill"
          onClick={handleSubmit}
        >
          Registrar Despesa
        </button>
      </div>
    </div>
  );
};

export default AddExpenseForm;

