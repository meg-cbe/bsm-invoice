import React from "react"
import {  HashRouter, Routes, Route } from "react-router-dom"
import IssueReceipt from "./components/IssueReceipt"
import Landing from "./components/Landing"
import SalesInvoice from "./components/SalesInvoice"
import TaxInvoice from "./components/TaxInvoice"
import Making from "./components/Making"
import IssueVoucher from "./components/IssueVoucher"

export default function App() {

  return (
    <HashRouter >
      <Routes>
        <Route
          path="/"
          element={
            <React.Fragment>
              <Landing />
            </React.Fragment>
          }
        ></Route>

        <Route
          path="/taxinvoice"
          element={
            <React.Fragment>
              <TaxInvoice />
            </React.Fragment>
          }
        ></Route>
        <Route
          path="/receipt"
          element={
            <React.Fragment>
              <SalesInvoice />
            </React.Fragment>
          }
        ></Route>
        <Route
          path="/issueVoucher"
          element={
            <React.Fragment>
              <IssueReceipt />
            </React.Fragment>
          }
        ></Route>
        <Route
          path="/cooliee"
          element={
            <React.Fragment>
              <Making />
            </React.Fragment>
          }
        ></Route>
        <Route
          path="/issue"
          element={
            <React.Fragment>
              <IssueVoucher />
            </React.Fragment>
          }
        ></Route>
      </Routes>
    </HashRouter>
  )
}
