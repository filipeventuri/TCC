import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const CustomBarChart = ({ data }) => {
  
  const getBarColor = (index) => {
    return index % 2 === 0 ? "#875cf5" : "#cfbefd";
  };

  
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      
      const rawValue = payload[0]?.payload?.amount ?? 0;
      const value = parseFloat(String(rawValue).replace(/[^\d.-]/g, "")) || 0;

      
      const formattedValue = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

      return (
        <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
          <p className="text-xs font-semibold text-purple-800 mb-1">
            {payload[0]?.payload?.category || "Sem categoria"}
          </p>
          <p className="text-sm text-gray-600">
            Valor:{" "}
            <span className="text-sm font-medium text-gray-900">
              {formattedValue}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-orange-50 mt-6 p-4 rounded-xl">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid stroke="none" />
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#555" }} stroke="none" />
          <YAxis tick={{ fontSize: 12, fill: "#555" }} stroke="none" />
          <Tooltip content={CustomTooltip} />

          <Bar dataKey="amount" radius={[10, 10, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={index} fill={getBarColor(index)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
