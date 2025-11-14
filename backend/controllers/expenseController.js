const xlsx = require('xlsx');
const Expense = require("../models/Expense");

exports.addExpense = async (req, res) => {
  const userId = req.user?.id || req.body.userId;

  try {
    const { icon, category, amount, date, details } = req.body;

   
    if (!category || !amount || !date) {
      return res.status(400).json({ message: "All fields are required." });
    }
      const newExpense = new Expense({
      userId,
      icon,
      category,
      amount,
      details: details || "",
      date: new Date(date)})
    

    await newExpense.save();
    res.status(200).json(newExpense);
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor." });
  }
};


exports.getAllExpenses = async (req, res) => {
  const userId = req.user.id;

  try {
    const expenses = await Expense.find({ userId }).sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor." });
  }
};

exports.getN8NExpense = async (req, res) => {
  try {
    const { userId } = req.body; 

    if (!userId) {
      return res.status(400).json({ message: "O campo userId é obrigatório." });
    }

    
    const expenses = await Expense.find({ userId }).sort({ date: -1 });

    res.json(expenses);
  } catch (error) {
    console.error("Erro ao buscar expenses para n8n:", error);
    res.status(500).json({ message: "Erro no servidor." });
  }
};


exports.deleteExpense = async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: "Despesa deletada." });
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor." });
  }
};



