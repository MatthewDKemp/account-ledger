import { useState } from "react";

export function useAccountLedgerContainer() {
  // Set up initial transactions to be displayed on the first render
  const initialTransactions = [
    { id: 1, date: "1990-01-03", amount: 50 },
    { id: 2, date: "1991-02-14", amount: -1500 },
    { id: 3, date: "1992-03-27", amount: 600 },
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
        setTransactionArray((transactionArray) => [
          ...transactionArray,
          {
            id: transactionArray.length + 1,
            date: date,
            amount: amount,
          },
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
      .reduce((x, y) => x + y, startingBalance),
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

  return {
    overdraftLimit,
    highBalancePrompt,
    inAgreedOverdraft,
    highBalance,
    balanceArray,
    invalidDate,
    invalidAmount,
    dateError,
    amountError,
    balance,
    displayNotice,
    recordTransaction,
  };
}
