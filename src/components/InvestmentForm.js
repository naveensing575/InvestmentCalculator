// InvestmentForm.js
import React, { useState } from "react";
import InvestmentTable from "./InvestmentTable";

export default function InvestmentForm() {
  let [currentSavings, setCurrentSavings] = useState(0);
  const [yearlyContribution, setYearlyContribution] = useState(0);
  const [expectedReturn, setExpectedReturn] = useState(0);
  const [duration, setDuration] = useState(0);
  const [data, setData] = useState([]);

  const resetHandler = () => {
    setCurrentSavings(0);
    setYearlyContribution(0);
    setExpectedReturn(0);
    setDuration(0);
    setData([]);
  };

  const calculateHandler = (e) => {
    e.preventDefault();
    const yearlyData = [];

    for (let i = 0; i < duration; i++) {
      const yearlyInterest = currentSavings * (expectedReturn / 100);
      currentSavings += yearlyInterest + parseFloat(yearlyContribution);
      yearlyData.push({
        year: i + 1,
        yearlyInterest: yearlyInterest,
        savingsEndOfYear: parseFloat(currentSavings), // Parse as float or parseInt(currentSavings) for integer
        yearlyContribution: parseFloat(yearlyContribution),
        totalInterest:
          currentSavings -
          (parseFloat(currentSavings) - parseFloat(yearlyContribution)),
      });
    }
    setData(yearlyData);
  };

  return (
    <div>
      <form className="form" onSubmit={calculateHandler}>
        <div className="input-group">
          <p>
            <label htmlFor="current-savings">Current Savings ($)</label>
            <input
              type="number"
              id="current-savings"
              value={currentSavings}
              onChange={(e) => setCurrentSavings(e.target.value)}
            />
          </p>
          <p>
            <label htmlFor="yearly-contribution">Yearly Savings ($)</label>
            <input
              type="number"
              id="yearly-contribution"
              value={yearlyContribution}
              onChange={(e) => setYearlyContribution(e.target.value)}
            />
          </p>
        </div>
        <div className="input-group">
          <p>
            <label htmlFor="expected-return">
              Expected Interest (% per year)
            </label>
            <input
              type="number"
              id="expected-return"
              value={expectedReturn}
              onChange={(e) => setExpectedReturn(e.target.value)}
            />
          </p>
          <p>
            <label htmlFor="duration">Investment Duration (years)</label>
            <input
              type="number"
              id="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </p>
        </div>
        <p className="actions">
          <button type="reset" className="buttonAlt" onClick={resetHandler}>
            Reset
          </button>
          <button type="submit" className="button">
            Calculate
          </button>
        </p>
      </form>
      <InvestmentTable data={data} />
    </div>
  );
}
