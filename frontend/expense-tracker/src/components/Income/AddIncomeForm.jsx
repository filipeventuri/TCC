import React, { useState } from "react";
import Input from "../Inputs/Input";
import EmojiPickerPopup from "../EmojiPickerPopup";

const AddIncomeForm = ({ onAddIncome }) => {
  const [income, setIncome] = useState({
    source: "",
    amount: "",
    date: "",
    icon: "",
  });

  const handleChange = (key, value) => setIncome({ ...income, [key]: value });

  const handleSubmit = () => {
    const adjustedDate =
      income.date && !income.date.includes("T")
        ? `${income.date}T12:00:00` 
        : income.date;

  
    const numericAmount = parseFloat(String(income.amount).replace(",", "."));

    const formattedIncome = {
      ...income,
      amount: numericAmount, 
      date: adjustedDate,
    };

    onAddIncome(formattedIncome);
  };

  return (
    <div>
      <EmojiPickerPopup
        icon={income.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />

      <div className="flex flex-col w-full mt-3">
        <label className="text-sm text-black">Fonte</label>

        <select
          value={income.source}
          onChange={({ target }) => handleChange("source", target.value)}
          className="input-box"
        >
          <option value="">Selecione a fonte</option>
          <option value="Salário">Salário</option>
          <option value="Aposta">Aposta</option>
          <option value="Presente">Presente</option>
          <option value="Investimento">Investimento</option>
          <option value="Freela">Freela</option>
          <option value="Outros">Outros</option>
        </select>
      </div>

      <Input
        value={income.amount}
        onChange={({ target }) => handleChange("amount", target.value)}
        label="Valor (R$)"
        type="text" 
        placeholder="Ex: 3500,00"
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
          Adicionar Receita
        </button>
      </div>
    </div>
  );
};

export default AddIncomeForm;

