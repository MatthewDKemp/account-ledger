import React, { useState } from "react";
import "../styles/AccountLedger.css";
import CurrencyFormat from "react-currency-format";
import Table from "react-bootstrap/Table";

export function AccountLedger() {
  // Set up initial transactions to be displayed on the first render
  const initialTransactions = [
    { id: 1, date: "1990-01-03", amount: 50 },
    { id: 2, date: "1991-02-14", amount: -1500 },
    { id: 3, date: "1992-03-27", amount: 600 }
  ];

  // Set up some configurations for the ledger
  const startingBalance = 2000;
  const overdraftLimit = -250;
  const highBalancePrompt = 4000;

  // Define some stateful variables for use in the app
  const [transactionArray, setTransactionArray] = useState(initialTransactions);
  const [inAgreedOverdraft, setInAgreedOverdraft] = useState(false);
  const [invalidDate, setInvalidDate] = useState(false);
  const [invalidAmount, setInvalidAmount] = useState(false);
  const [dateError, setDateError] = useState("");
  const [amountError, setAmountError] = useState("");
  const [highBalance, setHighBalance] = useState(false);

  // Function called when the 'Record transaction' button is pressed
  const recordTransaction = () => {
    // Start off by assuming the inputs are not valid, will be set to true later if they are
    let validDate = false;
    let validAmount = false;
    debugger;
    // Values from the form inputs are stored as variables
    const date = document.getElementById("dateInput").value;
    const amount = Number(
      document.getElementById("amountInput").value.replace(/[^0-9.-]+/g, "")
    );

    // Check whether the date input has been provided and is during the 1990s; set varibales accordingly
    if (date.length === 0) {
      setDateError("Please enter the date of the transaction");
      setInvalidDate(true);
    } else if (date.substring(0, 4) < 1990) {
      setDateError("Date is before the 90s, don't get too nostalgic!");
      setInvalidDate(true);
    } else if (date.substring(0, 4) > 1999) {
      setDateError("Date is after the 90s, are you a time traveller?!");
      setInvalidDate(true);
    } else {
      setInvalidDate(false);
      setDateError("");
      validDate = true;
    }

    // Check whether the amount input has been provided and is between upper and lower bounds; set varibales accordingly
    if (amount === 0) {
      setAmountError("Please enter the transaction amount in pounds and pence");
      setInvalidAmount(true);
    } else if (amount > 10000 || amount < -10000) {
      setAmountError("Transaction amount must be between -£10,000 and £10,000");
      setInvalidAmount(true);
    } else {
      setInvalidAmount(false);
      setAmountError("");
      validAmount = true;
    }

    // Only execute this code block if both inputs are valid
    if (validDate && validAmount) {
      // Determine if the overdraft limit has been exceeded
      const overdraftExceeded = balance + amount < overdraftLimit;

      // If overdraft limit has not been exceeded, continue to process the new transaction. If it has, show an alert
      if (!overdraftExceeded) {
        // Determine if the balance is between the overdraft limit and 0
        setInAgreedOverdraft(balance + amount < 0);
        // Determine if the balance is at or about the high balance prompt
        setHighBalance(balance + amount >= highBalancePrompt);

        // Update the transaction array with the new data from the form inputs
        setTransactionArray(transactionArray => [
          ...transactionArray,
          {
            id: transactionArray.length + 1,
            date: date,
            amount: amount
          }
        ]);

        // Clear the form inputs
        document.getElementById("dateInput").value = "";
        document.getElementById("amountInput").value = "";
      } else {
        alert("Transaction amount exceeds overdraft limit");
      }
    }
    console.log(transactionArray);
    console.log(inAgreedOverdraft);
  };

  // Sort transactions in date order, oldest first
  transactionArray.sort((a, b) => {
    const dateA = new Date(a.date),
      dateB = new Date(b.date);
    return dateA - dateB;
  });

  // Create new array with original date and amount values plus running total for balance
  const balanceArray = transactionArray.map((x, i) => ({
    date: x.date,
    amount: x.amount,
    balance: transactionArray
      .slice(0, i + 1)
      .map(({ amount }) => amount)
      .reduce((x, y) => x + y, startingBalance)
  }));

  // Sort new array by date, newest first
  balanceArray.sort((a, b) => {
    const dateA = new Date(a.date),
      dateB = new Date(b.date);
    return dateB - dateA;
  });

  // Define balance constant based on balance value of the most recent transaction based on date
  const balance = balanceArray[0].balance;

  // Determine if to display a low or high balance section
  const displayNotice = inAgreedOverdraft || highBalance;

  return (
    <>
      <div className="MainContent">
        <b>
          <u>Account Summary</u>
        </b>
        <Table bordered style={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}>
          <thead>
            <tr>
              <th
                style={{
                  width: "33.33%"
                }}
              >
                Overdraft{" "}
              </th>
              <th
                style={{
                  width: "33.33%"
                }}
              >
                Current Balance{" "}
              </th>
              <th
                style={{
                  width: "33.33%"
                }}
              >
                Available Balance{" "}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <CurrencyFormat
                  value={Math.abs(overdraftLimit)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"£"}
                />
              </td>
              <td>
                {" "}
                <CurrencyFormat
                  value={balance}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"£"}
                />
              </td>
              <td>
                {" "}
                <CurrencyFormat
                  value={balance + Math.abs(overdraftLimit)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"£"}
                />
              </td>
            </tr>
          </tbody>
        </Table>
        <b>
          <u>Account Limits</u>
        </b>
        <div>
          <label>Agreed overdraft:</label>{" "}
          <CurrencyFormat
            value={overdraftLimit}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"£"}
          />
          <br></br>
          <label>High balance prompt:</label>{" "}
          <CurrencyFormat
            value={highBalancePrompt}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"£"}
          />
        </div>
        <div
          style={{
            width: "80%",
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: "15px"
          }}
        >
          {displayNotice && (
            <>
              <br></br>
              <b>
                <u>Account Notices</u>
              </b>
            </>
          )}
          {inAgreedOverdraft && (
            <p
              style={{
                backgroundColor: "orange",
                width: "80%",
                marginLeft: "auto",
                marginRight: "auto",
                marginBottom: "15px"
              }}
            >
              You are in your agreed overdraft
            </p>
          )}
          {highBalance && (
            <p
              style={{
                backgroundColor: "lightgreen",
                width: "80%",
                marginLeft: "auto",
                marginRight: "auto",
                marginBottom: "15px"
              }}
            >
              Your balance is at least £4,000, consider saving some of this for a rainy
              day :)
            </p>
          )}
        </div>
        <div>
          <b>
            <u>Log New Transaction</u>
          </b>

          <div>
            <div>
              <b>Transaction date:</b>
              <br></br>
              <input
                id="dateInput"
                type="date"
                style={{ height: "50px", marginBottom: "15px" }}
              />
              {invalidDate && (
                <p
                  id="dateInputError"
                  style={{
                    backgroundColor: "yellow",
                    width: "80%",
                    marginBottom: "15px",
                    marginLeft: "auto",
                    marginRight: "auto"
                  }}
                >
                  {dateError}
                </p>
              )}
            </div>
            <div>
              <b>Transaction amount (£):</b>
              <br></br>
              <input
                id="amountInput"
                type="number"
                autoComplete="off"
                style={{ height: "50px", marginBottom: "15px" }}
              />
              {invalidAmount && (
                <p
                  id="amountInputError"
                  style={{
                    backgroundColor: "yellow",
                    width: "80%",
                    marginBottom: "15px",
                    marginLeft: "auto",
                    marginRight: "auto"
                  }}
                >
                  {amountError}
                </p>
              )}
            </div>

            <button type="button" onClick={recordTransaction}>
              Record transaction
            </button>
          </div>
        </div>
        <br></br>
        <b>
          <u>Transaction List</u>
        </b>
        <Table bordered style={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}>
          <thead>
            <tr>
              <th
                style={{
                  width: "33.33%"
                }}
              >
                Date
              </th>
              <th
                style={{
                  width: "33.33%"
                }}
              >
                Amount
              </th>
              <th
                style={{
                  width: "33.33%"
                }}
              >
                Balance
              </th>
            </tr>
          </thead>
          <tbody>
            {balanceArray.map(item => {
              return (
                <tr key={item.id}>
                  <td>{item.date}</td>
                  <td>
                    <CurrencyFormat
                      value={item.amount}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"£"}
                    />
                  </td>
                  <td>
                    <CurrencyFormat
                      value={item.balance}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"£"}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </>
  );
}
