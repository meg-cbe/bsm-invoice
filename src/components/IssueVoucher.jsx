import { useState, useRef, useEffect } from "react"
import TableForm from "./IsVoucher"
import ReactToPrint from "react-to-print"
import './style.css'
import moment from 'moment'

export default function IssueVoucher() {

  const [invoiceNumber, setInvoiceNumber] = useState("")
  const [billName, setbillName] = useState('')
  const [billAddress, setbillAddress] = useState('')
  const [billGst, setbillGst] = useState('')
  const [invoiceDate, setInvoiceDate] = useState("")
  const [description, setDescription] = useState("select description")
  const [touch, setTouch] = useState("")
  const [gweight, setGweight] = useState("")
  const [list, setList] = useState([])
  const [width] = useState(641)
  const [isClicked, setIsClicked] = useState(false)
  const [addressList, setAddressList] = useState("")

  const componentRef = useRef()

  useEffect(() => {
    if (window.innerWidth < width) {
      alert("Place your phone in landscape mode for the best experience")
    }
  }, [width])
  
  let handleClick = (e) => {
    e.preventDefault();
    setIsClicked(!isClicked)
  }

  let nameArray = ["ONLY CHAINS", "SRI BALAJI JEWELLERS",]
  let addressArray = ["359/11-13 jewel Manor Complex Ground Floor Raja Street Coimbatore-641001", "136A Kamadenu Bavan Swami Iyer New Street Coimbatore 641001",]
  let gstArray = ["33AAFFO5037J1ZA", "33AIEPB2138C1Z5"]

  let renderGst = list?.map(i => parseFloat(i.gweight)).reduce((prev, next) => prev + next, 0)
  let grandTotal = parseFloat(renderGst)

  let renderList = list?.map((l, i) => {
    return (
      <tr className="height-30" key={i}>
        <td className="border-right font-13"><span>{i + 1}</span></td>
        <td style={{ textAlign: "start" }} className="border-right font-13">{l.description}</td>
        <td className="border-right font-13">{l.touch}</td>
        <td style={{ textAlign: "end" }} className="border-right font-13">{l.gweight}</td>
      </tr>
    )
  })

  return (
    <>
      <main style={{ fontSize: "15px", display: 'flex', padding: '15px' }}>
        <section style={{ maxWidth: '650px', width: '100%' }}>
          <div className="bg-white p-5 rounded shadow">
            <div className="flex flex-col justify-center">

              <article className="md:grid grid-cols-2 gap-5">
                <div className="flex flex-col">
                  <label htmlFor="invoiceNumber">Invoice Number</label>
                  <input
                    required
                    type="text"
                    name="invoiceNumber"
                    id="invoiceNumber"
                    placeholder="Invoice Number"
                    autoComplete="off"
                    value={invoiceNumber}
                    onChange={(e) => setInvoiceNumber(e.target.value)}
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="invoiceDate">Invoice Date</label>
                  <input
                    required
                    type="date"
                    name="invoiceDate"
                    id="invoiceDate"
                    placeholder="Invoice Date"
                    autoComplete="off"
                    value={invoiceDate}
                    onChange={(e) => setInvoiceDate(e.target.value)}
                  />
                </div>
              </article>

              <article className="note">
                <div>
                  <button
                    onClick={(e) => { handleClick(e) }}
                    className="mb-5 bg-red-500 text-white font-bold py-2 px-5 rounded shadow border-2 border-red-500 hover:bg-transparent hover:text-red-500 transition-all duration-300">
                    {isClicked ? "Cancel" : "Add new Address"}
                  </button>
                </div>
                {
                  !isClicked && <div className="flex flex-col">
                    <label htmlFor="addressList">Address List</label>

                    <select
                      id="addressList"
                      name="addressList"
                      value={addressList}
                      onChange={(e) => setAddressList(e.target.value)}
                    >
                      <option value={null}>select address</option>
                      <option value={0}>ONLY CHAINS</option>
                      <option value={1}>SRI BALAJI JEWELLERS</option>

                    </select>
                  </div>
                }
                {isClicked && <article>
                  <article className="md:grid grid-cols-2 gap-5">
                    <div className="flex flex-col">
                      <label htmlFor="billName">Billing Name</label>
                      <input
                        required
                        type="text"
                        name="billName"
                        id="billName"
                        placeholder="Name"
                        autoComplete="off"
                        value={billName}
                        onChange={(e) => setbillName(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="billGst">Billing GST</label>
                      <input
                        required
                        type="text"
                        name="billGst"
                        id="billGst"
                        placeholder="GST Number"
                        autoComplete="off"
                        value={billGst}
                        onChange={(e) => setbillGst(e.target.value)}
                      />
                    </div>

                  </article>
                  <div style={{ width: "100%" }}>
                    <label htmlFor="billAddress">Billing Address</label>
                    <input
                      style={{ width: "100%" }}
                      required
                      type="text"
                      name="billAddress"
                      id="billAddress"
                      placeholder="Address"
                      autoComplete="off"
                      value={billAddress}
                      onChange={(e) => setbillAddress(e.target.value)}
                    />
                  </div>
                </article>}


              </article>

              {/* This is our table form */}
              <article>
                <TableForm
                  fontSize="12px"
                  description={description}
                  setDescription={setDescription}
                  touch={touch}
                  setTouch={setTouch}
                  gweight={gweight}
                  setGweight={setGweight}
                  list={list}
                  setList={setList}
                />
              </article>

              {/* <button
              onClick={() => setShowInvoice(true)}
              className="bg-blue-500 text-white font-bold py-2 px-8 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300"
            >
              Preview Invoice
            </button> */}
            </div>
          </div>
          <div>
            <ReactToPrint
              trigger={() => (
                <button className="bg-blue-500 ml-5 text-white font-bold py-2 px-8 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300">
                  Print / Download
                </button>
              )}
              content={() => componentRef.current}
            />
          </div>
        </section>

        {/* Invoice Preview */}

        <div ref={componentRef} style={{ paddingLeft: "10px", paddingRight: "10px" }} className="page" size="A4">
          <div style={{ position: "relative" }}>
            <p className="head-address right">(Original/Copy)</p>
            <h2 className="tax-head">ISSUE VOUCHER</h2>
          </div>
         
          <div className="border" style={{marginTop:"30px"}}>
            <div style={{ height: "130px" }} className="main-div2 ">
              <div style={{ width: "50%", height: "100%", fontSize: "13px" }}>
              <div style={{padding:"10px"}}>
                  <h2 style={{ fontWeight: 600, fontSize:"17px" }}>BSM JEWELS MANUFACTURE</h2>
                  <p >No : 251, 1st Floor, Telungu Street, Coimbatore - 641 001, TamilNadu.</p>
                  <p>98423 34904, 90920 65916</p>
                  <p >GSTin : 33BQMPS3126A1Z5, PAN NO: BQMPS3126A</p>
                </div>
               
              </div>
              <div style={{
                borderLeft: "0.5px solid",
                width: "50%",
                height: "100%",
                fontSize: "15px"
              }} className="first-div">
                 <h3 style={{
                  fontWeight: 600, paddingLeft: "10px",
                  marginBottom: "5px",
                  marginTop: "10px",
                  textDecoration: "underline"
                }}>INVOICE TO:</h3>
                <div style={{ paddingLeft: "20px", lineHeight: 1.4 }} >

                  <h2 style={{ fontWeight: 600, textTransform: "uppercase" }} className="">{(!isClicked && addressList !== null) ? nameArray[addressList] : billName}</h2>
                  <p style={{ fontSize: "14px" }}>{(!isClicked && addressList !== null) ? addressArray[addressList] : billAddress}</p>
                  <p style={{ textTransform: "uppercase" }}>GSTin : <b>{(!isClicked && addressList !== null) ? gstArray[addressList] : billGst}</b></p>
                </div>
              </div>
            </div>
          </div>
          <div className="second-div border-right">
            <p style={{ fontWeight: 600 }} className="head-address left " colspan="4">Bill No : BSM/GST/{invoiceNumber}</p>
            <p className="head-address " colspan="3"></p>
            <p style={{ fontWeight: 600 }} className="head-address right " colspan="4">Date : {invoiceDate ? moment(invoiceDate).format("DD-MM-YYYY") : ""}</p>
          </div>
          <table className="center-align" style={{height:"100%", maxHeight:"300px"}}>
            <tbody>
              <tr className="row border height-30">
                <th className="border font-13 width-8 bold-600">
                  Sr No
                </th>
                <th className="border font-13 bold-600">
                  Discription
                </th>
                <th className="border font-13 bold-600">
                  Touch
                </th>
                <th className="border font-13 width-10 bold-600">
                  Weight
                </th>
              </tr>
              {
                list && renderList
              }

              <tr >
                <td className="border-right font-14"><span></span></td>
                <td className="border-right font-14"></td>
                <td className="border-right font-14"></td>
                <td className="border-right font-14"></td>
              </tr>

              <tr className="border-bottom border-top height-30">
                <td className="border-left"></td>
                <td className=""></td>
                <td className="border-right font-14"><b>Total</b></td>
                <td className="border-right font-14">{grandTotal}</td>
              </tr>
            </tbody>
          </table>
          <div className="border border-top-non declare">
            <div className="font-14" style={{ width: "100%", position: "relative" }}>
              <div style={{ position: "absolute", right: "10px" }}>
                BSM JEWELS MANUFACTURE
              </div>
              <p style={{ position: "absolute", left: "20px", bottom: 0 }}>Customers Signature</p>
              <p style={{ position: "absolute", right: "20px", bottom: 0 }}>Authorised Signature</p>
            </div>
          </div>
          <div>
           <p>E.& O.E.</p>
           <p>All disputes subject to coimbatore jurisdiction.</p>
           <p style={{textAlign:"center"}}>Note : No E-way bill is required to be generated as the goods covered under this invoice are exempted as per serial no 150/151 to the Annexure to rule 138(14) of the CGST rules 2017</p>
        </div>
        </div>
       
      </main>
    </>
  )
}