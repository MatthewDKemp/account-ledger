import React from "react";
import CurrencyFormat from "react-currency-format";
import Table from "react-bootstrap/Table";
import { useAccountLedgerContainer } from "../containers/accountLedger.container";

export function Transactions() {
  const {
    invalidDate,
    dateError,
    invalidAmount,
    amountError,
    balanceArray,
    recordTransaction,
  } = useAccountLedgerContainer();
  return (
    <>
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
                  marginRight: "auto",
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
                  marginRight: "auto",
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
              Date
            </th>
            <th
              style={{
                width: "33.33%",
              }}
            >
              Amount
            </th>
            <th
              style={{
                width: "33.33%",
              }}
            >
              Balance
            </th>
          </tr>
        </thead>
        <tbody>
          {balanceArray.map((item) => {
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
    </>
  );
}
