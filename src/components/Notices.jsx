import React from "react";
import { useAccountLedgerContainer } from "../containers/accountLedger.container";

export function Notices() {
  const { displayNotice, inAgreedOverdraft, highBalance } =
    useAccountLedgerContainer();
  return (
    <>
      <div
        style={{
          width: "80%",
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: "15px",
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
        {inAgreedOverdraft && <p>You are in your agreed overdraft</p>}
        {highBalance && (
          <p>
            Your balance is at least £4,000, consider saving some of this for a
            rainy day :)
          </p>
        )}
      </div>
    </>
  );
}
