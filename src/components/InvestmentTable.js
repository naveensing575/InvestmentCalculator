import React from "react";
import PropTypes from "prop-types";

// Assuming you have the formatter defined here
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export default function InvestmentTable({ data }) {
  return (
    <div style={{ textAlign: "center" }}>
      {data.length !== 0 ? (
        <table className="result">
          <thead>
            <tr>
              <th>Year</th>
              <th>Total Savings</th>
              <th>Interest (Year)</th>
              <th>Total Interest</th>
              <th>Invested Capital</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.year}>
                <td>{item.year}</td>
                <td>{formatter.format(item.savingsEndOfYear)}</td>
                <td>{formatter.format(item.yearlyInterest)}</td>
                <td>{formatter.format(item.totalInterest)}</td>
                <td>{formatter.format(item.yearlyContribution)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No data to display</p>
      )}
    </div>
  );
}

InvestmentTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      year: PropTypes.number.isRequired,
      savingsEndOfYear: PropTypes.number.isRequired,
      yearlyInterest: PropTypes.number.isRequired,
      totalInterest: PropTypes.number.isRequired,
      yearlyContribution: PropTypes.number.isRequired,
    })
  ),
};
