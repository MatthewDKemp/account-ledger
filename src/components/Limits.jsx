import React from "react";
import CurrencyFormat from "react-currency-format";
import { useAccountLedgerContainer } from "../containers/accountLedger.container";

export function Limits() {
  const { overdraftLimit, highBalancePrompt } = useAccountLedgerContainer();
  return (
    <>
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
    </>
  );
}
