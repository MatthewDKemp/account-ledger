import React from "react";
import CurrencyFormat from "react-currency-format";
import Table from "react-bootstrap/Table";
import { useAccountLedgerContainer } from "../containers/accountLedger.container";

export function BalanceTable() {
  const { overdraftLimit, balance } = useAccountLedgerContainer();
  return (
    <>
      <b>
        <u>Account Summary</u>
      </b>
      <Table
        bordered
        style={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}
      >
        <thead>
          <tr>
            <th
              style={{
                width: "33.33%",
              }}
            >
              Overdraft{" "}
            </th>
            <th
              style={{
                width: "33.33%",
              }}
            >
              Current Balance{" "}
            </th>
            <th
              style={{
                width: "33.33%",
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
    </>
  );
}
