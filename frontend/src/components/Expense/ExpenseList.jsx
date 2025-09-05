import React, { useState } from "react";
import { LuDownload, LuChevronDown, LuChevronUp } from "react-icons/lu";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import moment from "moment";

const ExpenseList = ({ transactions, onDelete, onDownload }) => {
  const [expanded, setExpanded] = useState({});

  // Group transactions by category
  const groupedByCategory = transactions?.reduce((acc, expense) => {
    if (!acc[expense.category]) acc[expense.category] = [];
    acc[expense.category].push(expense);
    return acc;
  }, {});

  const toggleExpand = (category) => {
    setExpanded((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  return (
    <div className="card">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-lg font-semibold">Expense Categories</h5>

        <button className="card-btn flex items-center gap-2" onClick={onDownload}>
          <LuDownload className="text-base" />
          <span>Download</span>
        </button>
      </div>

      {/* Category Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(groupedByCategory || {}).map(([category, expenses]) => {
          const totalAmount = expenses.reduce((sum, exp) => sum + exp.amount, 0);

          return (
            <div
              key={category}
              className="rounded-2xl shadow-md border bg-white p-5 transition hover:shadow-lg"
            >
              {/* Category Header */}
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleExpand(category)}
              >
                <div>
                  <h6 className="text-lg font-bold text-gray-800">{category}</h6>
                  <p className="text-sm text-gray-500">
                    Total: <span className="font-medium">₹{totalAmount}</span>
                  </p>
                </div>

                <div className="text-gray-500">
                  {expanded[category] ? <LuChevronUp /> : <LuChevronDown />}
                </div>
              </div>

              {/* Expenses list */}
              {expanded[category] && (
                <div className="mt-4 space-y-3">
                  {expenses.map((expense) => (
                    <TransactionInfoCard
                      key={expense._id}
                      title={expense.description || expense.category}
                      amount={expense.amount}
                      date={moment(expense.date).format("DD MMM YYYY")}
                      type="expense"
                      icon={expense.icon}
                      description={expense.description}
                      onDelete={() => onDelete(expense._id)}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExpenseList;
