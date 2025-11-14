import React from "react";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import { Tooltip } from "react-tooltip";
import moment from "moment";
import "react-tooltip/dist/react-tooltip.css";

const RecentTransactions = ({ transactions }) => {
  const now = moment();

  const recent = transactions
    ? transactions
        .filter((item) => {
          const d = moment(item?.date);
          if (!d.isValid()) return false; 
          const hoursDiff = now.diff(d, "hours");
          return hoursDiff >= 0 && hoursDiff <= 48;
        })
        .sort((a, b) => moment(b.date).valueOf() - moment(a.date).valueOf()) 
        .slice(0, 5)
    : [];

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Transações recentes</h5>
      </div>

      <div className="mt-6">
        {recent.length === 0 ? (
          <div className="text-sm text-slate-500">Nenhuma transação recente encontrada.</div>
        ) : (
          recent.map((item) => {
            const titleText = item.type === "expense" ? item.category : item.source;

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

                ${item.details
                  ? `<div style="margin-top: 2px;">Descrição: ${item.details}</div>`
                  : ""
                }
              </div>
            `;

            return (
              <div
                key={item._id}
                data-tooltip-id={`tt-${item._id}`}
                data-tooltip-place="top"
                data-tooltip-float="true"
                data-tooltip-html={tooltipHtml}
              >
                <TransactionInfoCard
                  title={titleText}
                  icon={item.icon}
                  date={moment(item.date).format("Do MMM YYYY")}
                  amount={item.amount}
                  type={item.type}
                  hideDeleteBtn
                />
                <Tooltip
                  id={`tt-${item._id}`}
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
          })
        )}
      </div>
    </div>
  );
};

export default RecentTransactions;

