import React from "react";
import "../styles/AccountLedger.css";
import { BalanceTable } from "./BalanceTable";
import { Limits } from "./Limits";
import { Notices } from "./Notices";
import { Transactions } from "./Transactions";

export function AccountLedger() {
  // Set up initial transactions to be displayed on initial render

  return (
    <>
      <div className="MainContent">
        <BalanceTable />
        <Limits />
        <Notices />
        <Transactions />
      </div>
    </>
  );
}
