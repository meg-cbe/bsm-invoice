import { useState, useRef, useEffect } from "react"
import TableForm from "./TaxTable"
import ReactToPrint from "react-to-print"
import './style.css'
import companyLogo from './bsm logo.png'
import moment from 'moment'

function SalesInvoice() {

  const [invoiceNumber, setInvoiceNumber] = useState("")
  const [billName, setbillName] = useState('')
  const [billAddress, setbillAddress] = useState('')
  const [billGst, setbillGst] = useState('')
  const [invoiceDate, setInvoiceDate] = useState("")
  const [description, setDescription] = useState("select description")
  const [hsn, setHsn] = useState('select')
  const [gst, setGst] = useState(0)
  const [pcs, setPcs] = useState("")
  const [touch, setTouch] = useState("")
  const [gweight, setGweight] = useState("")
  const [nweight, setNweight] = useState("")
  const [rate, setRate] = useState("")
  const [amount, setAmount] = useState("")
  const [list, setList] = useState([])
  const [total, setTotal] = useState(0)
  const [nSum, setNsum] = useState(0)
  const [gSum, setGsum] = useState(0)
  const [pSum, setPsum] = useState(0)
  const [width] = useState(641)
  const [isClicked, setIsClicked] = useState(false)
  const [addressList, setAddressList] = useState("")

  const componentRef = useRef()

  useEffect(() => {
    if (window.innerWidth < width) {
      alert("Place your phone in landscape mode for the best experience")
    }
  }, [width])

  function price_in_words(price) {
    var sglDigit = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"],
      dblDigit = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"],
      tensPlace = ["", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"],
      handle_tens = function (dgt, prevDgt) {
        return 0 === dgt ? "" : " " + (1 === dgt ? dblDigit[prevDgt] : tensPlace[dgt])
      },
      handle_utlc = function (dgt, nxtDgt, denom) {
        return (0 !== dgt && 1 !== nxtDgt ? " " + sglDigit[dgt] : "") + (0 !== nxtDgt || dgt > 0 ? " " + denom : "")
      };

    var str = "",
      digitIdx = 0,
      digit = 0,
      nxtDigit = 0,
      words = [];
    if (price += "", isNaN(parseInt(price))) str = "";
    else if (parseInt(price) > 0 && price.length <= 10) {
      for (digitIdx = price.length - 1; digitIdx >= 0; digitIdx--) switch (digit = price[digitIdx] - 0, nxtDigit = digitIdx > 0 ? price[digitIdx - 1] - 0 : 0, price.length - digitIdx - 1) {
        case 0:
          words.push(handle_utlc(digit, nxtDigit, ""));
          break;
        case 1:
          words.push(handle_tens(digit, price[digitIdx + 1]));
          break;
        case 2:
          words.push(0 !== digit ? " " + sglDigit[digit] + " Hundred" + (0 !== price[digitIdx + 1] && 0 !== price[digitIdx + 2] ? " and" : "") : "");
          break;
        case 3:
          words.push(handle_utlc(digit, nxtDigit, "Thousand"));
          break;
        case 4:
          words.push(handle_tens(digit, price[digitIdx + 1]));
          break;
        case 5:
          words.push(handle_utlc(digit, nxtDigit, "Lakh"));
          break;
        case 6:
          words.push(handle_tens(digit, price[digitIdx + 1]));
          break;
        case 7:
          words.push(handle_utlc(digit, nxtDigit, "Crore"));
          break;
        case 8:
          words.push(handle_tens(digit, price[digitIdx + 1]));
          break;
        case 9:
          words.push(0 !== digit ? " " + sglDigit[digit] + " Hundred" + (0 !== price[digitIdx + 1] || 0 !== price[digitIdx + 2] ? " and" : " Crore") : "")
          break;
        default:
          break;
      }
      str = words.reverse().join("")
    } else str = "";
    return str

  }

  let handleClick = (e) => {
    e.preventDefault();
    setIsClicked(!isClicked)
  }

  let nameArray = ["ONLY CHAINS", "SRI BALAJI JEWELLERS",]
  let addressArray = ["359/11-13 jewel Manor Complex Ground Floor Raja Street Coimbatore-641001", "136A Kamadenu Bavan Swami Iyer New Street Coimbatore 641001",]
  let gstArray = ["33AAFFO5037J1ZA", "33AIEPB2138C1Z5"]

  function floatInWords(num) {
    var splittedNum = num.toString().split('.')
    var nonDecimal = splittedNum[0]
    var decimal = splittedNum[1]
    var value = price_in_words(Number(nonDecimal)) + " and " + price_in_words(Number(decimal)) + " paise";
    return value
  }
  let renderGst = list?.map(i => i.gstValue).reduce((prev, next) => prev + next, 0)
  let grandTotal = parseFloat(total) + renderGst
  let roundOff = grandTotal - parseInt(grandTotal)

  // const simpleYear = moment(new Date()).format( "YY" );
  // let prevYear = parseInt(simpleYear)-1

  let renderTax = list?.map((l, i) => {
    return (
      <tr style={{textAlign:"center"}} key={i}>
        <td className="border pad-0" colspan="1">{l.hsn}</td>
        <td className="border pad-0" colspan="1">{l.amount}</td>
        <td className="border pad-0" colspan="1">{l.gst / 2}%</td>
        <td className="border pad-0" colspan="1">{(l.gstValue / 2).toFixed(2)}</td>
        <td className="border pad-0" colspan="1">{l.gst / 2}%</td>
        <td className="border pad-0" colspan="1">{(l.gstValue / 2).toFixed(2)}</td>
      </tr>
    )
  })
  let renderList = list?.map((l, i) => {
    return (
      <tr className="height-30" key={i}>
        <td colspan="1" className="border-right font-13"><span>{i + 1}</span></td>
        <td colspan="3" style={{ textAlign: "start" }} className="border-right font-13">{l.description}</td>
        <td colspan="1" className="border-right font-13">{l.hsn}</td>
        <td colspan="1" className="border-right font-13">{l.gst}%</td>
        <td colspan="1" className="border-right font-13">{l.pcs === 0 ? "" : l.pcs}</td>
        <td colspan="1" className="border-right font-13">{l.touch}</td>
        <td colspan="1" style={{ textAlign: "end" }} className="border-right font-13">{l.gweight === 0 ? "" : l.gweight}</td>
        <td colspan="1" className="border-right font-13">{l.nweight === 0 ? "" : l.nweight} {description !== "Hallmark Charge" ? "" : "gms"}</td>
        <td colspan="1" style={{ textAlign: "end" }} className="border-right font-13">{l.rate === 0 ? "" : l.rate}</td>
        <td colspan="2" style={{ textAlign: "end" }} className="border-right font-13">{l.amount}</td>
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
                      <option value={null}>select description</option>
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
                  hsn={hsn}
                  setHsn={setHsn}
                  gst={gst}
                  setGst={setGst}
                  pcs={pcs}
                  setPcs={setPcs}
                  touch={touch}
                  setTouch={setTouch}
                  gweight={gweight}
                  setGweight={setGweight}
                  nweight={nweight}
                  setNweight={setNweight}
                  rate={rate}
                  setRate={setRate}
                  amount={amount}
                  setAmount={setAmount}
                  list={list}
                  setList={setList}
                  total={total}
                  setTotal={setTotal}
                  setNsum={setNsum}
                  setGsum={setGsum}
                  setPsum={setPsum}
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

        <div ref={componentRef} style={{ paddingLeft: "20px", paddingRight: "20px" }} className="page" size="A4">
          <div style={{ position: "relative" }}>
            <p className="head-address no-top right">(Original/Copy)</p>
            <h2 className="tax-head">Receipt Voucher</h2>
          </div>
          <div style={{ marginTop: "20px" }} className="border border-bot-non">
            <div style={{ marginTop: "5px" }} className="main-div">
              <div style={{ position: "relative", width: "25%" }} className="first-div center-align">
                <img style={{ left: "70%" }} className="tax-peack ab-center" src={companyLogo} alt="bird" />
              </div>
              <div style={{ position: "relative", width: "75%" }} className="center-align" >
                <div style={{ width: "100%", left: "48%" }} className="ab-center">
                  <h2 style={{ fontWeight: 600 }} className="title">BSM JEWELS MANUFACTURE</h2>
                  <p className="head-address16">No : 251, 1st Floor, Telungu Street, Coimbatore - 641 001, TamilNadu.</p>
                  <p className="head-address16">98423 34904, 90920 65916</p>
                  <p className="gst">GSTin : 33BQMPS3126A1Z5, PAN NO: BQMPS3126A</p>
                </div>
              </div>
            </div>
          </div>
          <div className="border border-bot-non">
            <div style={{ height: "130px" }} className="main-div2 ">
              <div style={{ width: "50%", height: "100%", fontSize: "13px" }}>
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
              <div style={{
                borderLeft: "0.5px solid",
                width: "50%",
                height: "100%",
                fontSize: "15px"
              }} className="first-div"> 
                <div style={{ paddingLeft: "20px", paddingTop:"10px" }}>
                  <p><b>Invoice No : </b> BSM/{invoiceNumber}</p>
                  <p><b>Invoice Date : </b> {invoiceDate ? moment(invoiceDate).format("DD-MM-YYYY") : ""}</p>
                </div>
              </div>
            </div>
          </div>
          <table className="center-align height-500">
            <tbody>
              <tr className="row border height-30">
                <th colspan="1" className="border font-13 width-8 bold-600">
                  Sr No
                </th>
                <th colspan="3" className="border font-13 bold-600">
                  PARTICULARS
                </th>
                <th colspan="1" className="border font-13 width-10 bold-600">
                  HSN/SAC
                </th>
                <th colspan="1" className="border font-13 width-8 bold-600">
                  GST %
                </th>
                <th colspan="1" className="border font-13 width-8 bold-600">
                  PCS
                </th>
                <th colspan="1" className="border font-13 bold-600">
                  Touch
                </th>
                <th colspan="1" className="border font-13 width-10 bold-600">
                  Gross Wt.
                </th>
                <th colspan="1" className="border font-13 width-10 bold-600">
                  Net Wt.
                </th>
                <th colspan="1" className="border font-13 with-10 bold-600">
                  Rate
                </th>
                <th colspan="2" className="border font-13 width-10 bold-600">
                  Amount
                </th>
              </tr>
              {
                list && renderList
              }

              <tr >
                <td colspan="1" className="border-right font-14"><span></span></td>
                <td colspan="3" className="border-right font-14"></td>
                <td colspan="1" className="border-right font-14"></td>
                <td colspan="1" className="border-right font-14"></td>
                <td colspan="1" className="border-right font-14"></td>
                <td colspan="1" className="border-right font-14"></td>
                <td colspan="1" className="border-right font-14"></td>
                <td colspan="1" className="border-right font-14"> </td>
                <td colspan="1" className="border-right font-14"></td>
                <td colspan="2" className="border-right font-14"></td>
              </tr>

              <tr className="border-bottom border-top height-30">
                <td colspan="1" className="border-left"></td>
                <td colspan="3" className=""></td>
                <td colspan="1" className=""></td>
                <td colspan="1" className="border-right font-14"><b>Total</b></td>
                <td colspan="1" className="border-right font-12"><b>{pSum}</b></td>
                <td colspan="1" className="border-right font-12"><b></b></td>
                <td colspan="1" style={{textAlign:"end"}} className="border-right font-12"><b>{gSum}</b></td>
                <td colspan="1" className="border-right font-12"><b>{nSum}gms</b></td>
                <td colspan="1" className="border-right"></td>
                <td colspan="1" style={{textAlign:"end"}} className="border-right font-12"><b>{total}</b></td>
              </tr>
              <tr style={{ textAlign: "end" }} className="row">
                <td colspan="9" style={{ textAlign: "start", fontSize: "14px", position:"relative" }} className=" bot-white">
                  <b className="textamount">Rupees {grandTotal ? price_in_words(parseInt(grandTotal)) : ""} Only</b>
                </td>
                <td colspan="2" className="border-right font-14"><b>SGST</b></td>
                <td colspan="1" className="border-right font-14"><b>{renderGst ? (renderGst / 2).toFixed(2) : 0}</b></td>
              </tr>
              <tr style={{ textAlign: "end" }} className="row">
                <td colspan="9" className=" bot-white">

                </td>
                <td colspan="2" className="border-right font-14"><b>CGST</b></td>
                <td colspan="1" className="border-right  font-14"><b>{renderGst ? (renderGst / 2).toFixed(2) : 0}</b></td>
              </tr>
              <tr style={{ textAlign: "end" }} className="row extra">
                <td colspan="9" className=" bot-white">
                  <div className="extra-div">
                    <div className="tax-ex">
                      <table style={{ fontSize: "12px" }}>
                        <tbody>
                          <tr>
                            <th className="border " colspan="1">HSN/SAC</th>
                            <th className="border" colspan="1" >Taxable Value</th>
                            <th className="border" colspan="1">
                              CGST
                            </th>
                            <th className="border" colspan="1">
                              Amt.
                            </th>
                            <th className="border" colspan="1">
                              SGST%
                            </th>
                            <th className="border" colspan="1">
                              Amt.
                            </th>
                          </tr>
                          {renderTax && renderTax}
                        </tbody>
                      </table>
                    </div>
                    <b style={{ paddingLeft: "10px", textAlign:"start" }}>Tax Amount (in words)</b>
                    <p style={{ paddingLeft: "10px", textAlign:"start" }} className="font-14">
                      
                      Rs. {floatInWords(renderGst.toFixed(2))} Only
                    </p>
                  </div>
                </td>
                <td colspan="2" className="border-right font-14"><b>Round off</b></td>
                <td colspan="1" className="border-right font-14"><b>-{roundOff ? roundOff.toFixed(2) : 0}</b></td>
              </tr>
              <tr style={{ textAlign: "end" }} className="row">
                <td colspan="9" className=" bot-white"></td>
                <td colspan="2" className="border-right  border-bottom font-14"><b>Total</b></td>
                <td colspan="1" className="border-right dot-top-border border-bottom font-14"><b>{grandTotal ? parseInt(grandTotal).toFixed(2) : 0}</b></td>
              </tr>

            </tbody>
          </table>
          <div style={{ height: "150px" }} className="border extra-tax-div">
          </div>
          <div className="border border-top-non declare">
            <div style={{ borderRight: "0.5px solid", width: "35%", height: "100%" }} className="first-div font-14">
              <h3 style={{
                fontWeight: 600,
                paddingLeft: "10px",
                marginBottom: "5px",
                textDecoration: "underline"
              }}>Declaration:</h3>
              <div style={{ paddingLeft: "15px", paddingRight: "5px", fontSize:"13px" }}>
                <p>We declare that this invoice shows the actual price of the goods described and that all Particulars are true and correct. </p>
              </div>
            </div>
            <div className="font-14" style={{ width: "65%", position: "relative" }}>
              <div style={{ position: "absolute", right: "10px" }}>
                BSM JEWELS MANUFACTURE
              </div>
              <p style={{ position: "absolute", left: "20px", bottom: 0 }}>Customers Signature</p>
              <p style={{ position: "absolute", right: "20px", bottom: 0 }}>Authorised Signature</p>
            </div>
          </div>
        </div>

      </main>
    </>
  )
}

export default SalesInvoice
