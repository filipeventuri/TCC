// import moment from "moment";
// import { LuArrowRight } from "react-icons/lu";
// import TransactionInfoCard from "../Cards/TransactionInfoCard";

// const ExpenseTransactions = ({transactions, onSeeMore}) => {

  
//   return (
//     <div className="card">
//       <div className="flex items-center justify-between ">
//         <h5 className="text-lg">Gastos</h5>

//         {/* <button className="card-btn" onClick={onSeeMore}>
//           Ver tudo <LuArrowRight className="text-base" />
//         </button> */}
//       </div> 

//       <div className="mt-6">
//         {transactions?.slice(0,5)?.map((expense) => (
//           <TransactionInfoCard
//             key={expense._id}
//             title={expense.category}
//             icon={expense.icon}
//             date={moment(expense.date).format("Do MMM YYYY")}
//             amount={expense.amount}
//             type="expense"
//             hideDeleteBtn
//           />
//         ))}
       
//       </div>
      
//     </div>
//   );
// };

// export default ExpenseTransactions;

import moment from "moment";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import TransactionInfoCard from "../Cards/TransactionInfoCard";

const ExpenseTransactions = ({ transactions, onSeeMore }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between ">
        <h5 className="text-lg">Despesas</h5>
      </div>

      <div className="mt-6">
        {transactions?.slice(0, 5)?.map((expense) => {
          const titleText = expense.category;

          const tooltipHtml = `
            <div style="
              padding: 8px 12px;
              background: white;
              font-size: 14px;
              font-family: sans-serif;
              color: #333;
            ">
              <div style="font-weight: 600; color: #7b3fe4;">
                ${titleText}
              </div>

              ${expense.details
                ? `<div style="margin-top: 2px;">Descrição: ${expense.details}</div>`
                : ""
              }
            </div>
          `;

          return (
            <div
              key={expense._id}
              data-tooltip-id={`exp-${expense._id}`}
              data-tooltip-place="top"
              data-tooltip-float="true"
              data-tooltip-html={tooltipHtml}
            >
              <TransactionInfoCard
                title={titleText}
                icon={expense.icon}
                date={moment(expense.date).format("Do MMM YYYY")}
                amount={expense.amount}
                type="expense"
                hideDeleteBtn
              />
              <Tooltip
                id={`exp-${expense._id}`}
                float={true}
                style={{
                background: "rgba(255,255,255,0.95)",
                borderRadius: "30px",
                border: "none",
                padding: "12px 18px",
                color: "#333",
                fontSize: "14px",
                fontFamily: "sans-serif",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  }}
/>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExpenseTransactions;
