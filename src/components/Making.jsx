import { useState, useRef, useEffect } from "react"
import TableForm from "./MakingTable"
import ReactToPrint from "react-to-print"
import './style.css'
import companyLogo from './bsm logo.png'
import moment from 'moment'

function Making() {

    const [invoiceNumber, setInvoiceNumber] = useState("")
    const [refNumber, setRefNumber] = useState("")
    const [invoiceDate, setInvoiceDate] = useState("")
    const [description, setDescription] = useState("")
    const [gold, setGold] = useState(0)
    const [goldSmith, setGoldSmith] = useState("")
    const [goldName, setGoldName] = useState("")
    const [goldPan, setGoldPan] = useState("")

    const [hsn, setHsn] = useState("")
    const [address, setAddress] = useState("")
    const [rate, setRate] = useState(0)
    const [amount, setAmount] = useState("")
    const [list, setList] = useState([])
    const [total, setTotal] = useState(0)
    const [isClicked, setIsClicked] = useState(false)
    const [width] = useState(641)
    let tds = total ? (parseFloat(total).toFixed(2) / 100 * 1) : 0
    let gst = total ? (parseFloat(total).toFixed(2) / 100 * 2.5) : 0
    let grandWithTax = parseFloat(total) * ((100 + 5) / 100);
    let totalGst = total ? (parseFloat(total).toFixed(2) / 100 * 5) : 0
    const componentRef = useRef()
    let smithArray = ["RANJIT", "BAPAN KHANRA", "DEBAJISH BERA", "KAUSIK JANA", "BISWAJIT PARYA", "PRAFULLA MAL", "KHOKAN SAMANTA", "BARUN KUMAR DAS"]
    let panArray = ["EOQPS7148F", "DJGPK6392M", "CUAPD9535P", "ATBPJ2384E", "DJBPP3942K", "EOVPM6983J", "LNKPS9756D", "BVLPD6515N"]

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
    function floatInWords(num) {
        var splittedNum = num.toString().split('.')
        var nonDecimal = splittedNum[0]
        var decimal = splittedNum[1]
        var value = price_in_words(Number(nonDecimal)) + " and " + price_in_words(Number(decimal)) + " paise";
        return value
    }
    let renderList = list?.map((l, i) => {
        return (
            <tr key={i}>
                <td colspan="1" className="border-right font-13"><span>{i + 1}</span></td>
                <td colspan="4" className="border-right font-13">{l.description}</td>
                <td colspan="1" className="border-right font-13">{l.hsn}</td>
                <td colspan="1" className="border-right font-13">{l.gold}</td>
                <td colspan="1" className="border-right font-13">{l.rate}</td>
                <td colspan="1" className="border-right font-13">{l.amount}</td>
            </tr>
        )
    })

    return (
        <>
            <main style={{ fontSize: "14px", display: 'flex', padding: '15px' }} >
                <section style={{ maxWidth: '600px', width: '100%' }}>
                    <div className="bg-white p-5 rounded shadow">
                        <div className="flex flex-col justify-center">

                            <article className="md:grid grid-cols-3 gap-10">
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
                                        placeholder="Invoice date"
                                        autoComplete="off"
                                        value={invoiceDate}
                                        onChange={(e) => setInvoiceDate(e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="invoiceNumber">Reference Number</label>
                                    <input
                                        required
                                        type="text"
                                        name="referenceNumber"
                                        id="referenceNumber"
                                        placeholder="Reference Number"
                                        autoComplete="off"
                                        value={refNumber}
                                        onChange={(e) => setRefNumber(e.target.value)}
                                    />
                                </div>
                            </article>
                            <article className="note">
                                {
                                    !isClicked && <div className="flex flex-col">
                                        <label htmlFor="goldSmith">Gold Smiths list</label>

                                        <select
                                            id="goldSmith"
                                            name="goldSmith"
                                            value={goldSmith}
                                            onChange={(e) => setGoldSmith(e.target.value)}
                                        >
                                            <option value={null}>select description</option>
                                            <option value={0}>RANJIT</option>
                                            <option value={1}>BAPAN KHANRA</option>
                                            <option value={2}>DEBAJISH BERA</option>
                                            <option value={3}>KAUSIK JANA</option>
                                            <option value={4}>BISWAJIT PARYA</option>
                                            <option value={5}>PRAFULLA MAL</option>
                                            <option value={6}>KHOKAN SAMANTA</option>
                                            <option value={7}>BARUN KUMAR DAS</option>
                                        </select>
                                    </div>
                                }
                                {
                                    isClicked && <article className="md:grid grid-cols-2 gap-10">

                                        <div className="flex flex-col">
                                            <label htmlFor="goldName">Goldsmith Name</label>
                                            <input
                                                required
                                                type="text"
                                                name="goldName"
                                                id="goldName"
                                                placeholder="Goldsmith Name"
                                                autoComplete="off"
                                                value={goldName}
                                                onChange={(e) => setGoldName(e.target.value)}
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="goldPan">Goldsmith PAN</label>
                                            <input
                                                required
                                                type="text"
                                                name="goldPan"
                                                id="goldPan"
                                                placeholder="Goldsmith PAN"
                                                autoComplete="off"
                                                value={goldPan}
                                                onChange={(e) => setGoldPan(e.target.value)}
                                            />
                                        </div>
                                    </article>
                                }
                                <div>
                                    <button
                                        onClick={(e) => { handleClick(e) }}
                                        className="mb-5 bg-red-500 text-white font-bold py-2 px-5 rounded shadow border-2 border-red-500 hover:bg-transparent hover:text-red-500 transition-all duration-300">
                                        {isClicked ? "Cancel" : "Add new Goldsmith"}
                                    </button>
                                </div>
                            </article>
                            <article>
                                <div className="flex flex-col">
                                    <label htmlFor="address">Gold smith address</label>
                                    <input
                                        required
                                        type="text"
                                        name="address"
                                        id="address"
                                        placeholder="Address"
                                        autoComplete="off"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                </div>
                            </article>

                            {/* This is our table form */}
                            <article>
                                <TableForm
                                    description={description}
                                    setDescription={setDescription}
                                    gold={gold}
                                    setGold={setGold}
                                    hsn={hsn}
                                    setHsn={setHsn}
                                    rate={rate}
                                    setRate={setRate}
                                    amount={amount}
                                    setAmount={setAmount}
                                    list={list}
                                    setList={setList}
                                    total={total}
                                    setTotal={setTotal}
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

                <div ref={componentRef} className="page" size="A4">
                    <div className="main-div3 border">
                        <div style={{ marginLeft: "60px" }} className="first-div center-align">
                            <img className="peack" src={companyLogo} alt="bird" />
                        </div>
                        <div style={{ marginRight: "80px" }} className="center-align" >
                            <h2 className="title">BSM JEWELS MANUFACTURE</h2>
                            <p className="head-address">No : 251, 1st Floor, Telungu Street, Coimbatore - 641 001, TamilNadu.</p>
                            <p className="head-address16">98423 34904, 90920 65916</p>
                            <p className="gst">GSTin : 33BQMPS3126A1Z5, PAN NO: BQMPS3126A</p>
                        </div>
                    </div>
                    <div className="second-div border">
                        <p className="head-address left width-20" colspan="2">No : CB/{invoiceNumber}</p>
                        <p className="head-address width-20" colspan="3">COOLIEE BILL</p>
                        <p className="head-address right width-20" colspan="2">Date : {invoiceDate ? moment(invoiceDate).format("DD-MM-YYYY") : ""}</p>

                    </div>
                    <div className=" border font-13 flex-between" style={{ padding: "5px 10px" }}>
                        <div>
                            <p style={{ fontSize: "12px" }}>M/S. {(!isClicked && goldSmith !== null) ? smithArray[goldSmith] : goldName}</p>
                            <p style={{ fontSize: "12px" }}>PAN : {(!isClicked && goldSmith !== null) ? panArray[goldSmith] : goldPan}</p>
                            <p style={{ marginBottom: 0, fontSize: "14px" }}>{address}</p>
                            <p style={{ marginTop: "5px", marginBottom: 0 }}>GSTin: UnRegistered</p>
                        </div>
                        <div>
                            <p>Ref :{refNumber}</p>
                            <p>Date:{invoiceDate ? moment(invoiceDate).format("DD-MM-YYYY") : ""}</p>
                        </div>
                    </div>
                    <table className="center-align">
                        <tbody>
                            <tr className="row border">
                                <th colspan="1" className="border width-10 font-14">
                                    S.No.
                                </th>
                                <th colspan="4" className="border width-50 font-14">
                                    Description
                                </th>
                                <th colspan="1" className="border width-10 font-14">
                                    SAC Code.
                                </th>
                                <th colspan="1" className="border width-10 font-14">
                                    Gold Wgt(Gms)
                                </th>
                                <th colspan="1" className="border width-10 font-14">
                                    Rate/Gms(Rs)
                                </th>
                                <th colspan="1" className="border width-10 font-14">
                                    Total Value(Rs)
                                </th>
                            </tr>
                            {list && renderList}

                            <tr>
                                <td colspan="1" className="border-right"></td>
                                <td colspan="4" className="border-right"></td>
                                <td colspan="1" className="border-right"></td>
                                <td colspan="1" className="border-right"></td>
                                <td colspan="1" className="border-right"></td>
                                <td colspan="1" className="border-right"></td>
                            </tr>
                            <tr>
                                <td colspan="1" className="border-right"></td>
                                <td colspan="4" className="border-right"></td>
                                <td colspan="1" className="border-right"></td>
                                <td colspan="1" className="border-right"></td>
                                <td colspan="1" className="border-right"></td>
                                <td colspan="1" className="border-right"></td>
                            </tr>
                            <tr className="border-bottom">
                                <td colspan="1" className="border-right"></td>
                                <td colspan="4" className="border-right"></td>
                                <td colspan="1" className="border-right"></td>
                                <td colspan="1" className="border-right"></td>
                                <td colspan="1" className="border-right"></td>
                                <td colspan="1" className="border-right"></td>
                            </tr>
                            <tr className="row ">
                                <td colspan="6" className="bot-white in-let" >(Rs. {floatInWords(parseFloat(total).toFixed(2))} Only)</td>
                                <td colspan="1" className="border-right">Sub Total</td>
                                <td colspan="1" className="border-right"></td>
                                <td className="border-right font-13">{total ? parseFloat(total).toFixed(2) : 0}</td>
                            </tr>
                            <tr className="row ">
                                <td colspan="6" className="bot-white"></td>
                                <td colspan="1" className="border-right">TDS</td>
                                <td colspan="1" className="border-right"></td>
                                <td className="border-right font-13">{tds.toFixed(2)}</td>
                            </tr>
                            <tr className="row ">
                                <td className="extra" colspan="6">
                                    <div className="border extra-div2">
                                        <div className="right-border-only width-90 flex-col-center">
                                            <p>SAC Code</p>
                                            <p>{hsn}</p>
                                        </div>
                                        <div className="right-border-only width-90 flex-col-center">
                                            <p>Taxable Value</p>
                                            <p>{total ? parseFloat(total).toFixed(2) : 0}</p>
                                        </div>
                                        <div className="width-50 mini" >
                                            <div className="right-border-only width-100 center-align">
                                                <div className="border-bottom pad-5">Central Tax</div>
                                                <div style={{ fontSize: "12px" }}>
                                                    <div>
                                                        <p className="margin-0">
                                                            Rate
                                                            2.5%
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="margin-0"> Amount {gst.toFixed(2)}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="width-100 center-align">
                                                <div className="border-bottom pad-5">State Tax</div>
                                                <div style={{ fontSize: "12px" }}>
                                                    <div>
                                                        <p className="margin-0">
                                                            Rate
                                                            2.5%
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="margin-0">
                                                            Amount {gst.toFixed(2)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </td>

                                <td colspan="1" className="border-right"></td>
                                <td colspan="1" className="border-right"></td>
                                <td className="border-right"></td>
                            </tr>

                            <tr className="row ">
                                <td colspan="6" className="bot-white height-30"></td>
                                <td colspan="1" className="border-right"></td>
                                <td colspan="1" className="border-right"></td>
                                <td className="border-right"></td>
                            </tr>
                            <tr className="row ">
                                <td colspan="6" className="bot-white"></td>
                                <td colspan="1" className="border-right"></td>
                                <td colspan="1" className="border-right"></td>
                                <td className="border-right"></td>
                            </tr>

                            <tr className="row">
                                <td colspan="6" className="bot-white"></td>
                                <td colspan="1" className="border-right font-13">Total</td>
                                <td colspan="1" className="border-right"></td>
                                <td className="border-right font-13">{total ? (parseFloat(grandWithTax) - tds).toFixed(2) : 0}</td>
                            </tr>
                            <tr className="row ">
                                <td colspan="6" className="bot-white bot-bor-hidden"></td>
                                <td colspan="1" className="border-right"></td>
                                <td colspan="1" className="border-right"></td>
                                <td className="border-right"></td>
                            </tr>
                            <tr className="row ">
                                <td colspan="6" style={{ textAlign: "initial", position: "relative", top: "10px", left: "10px" }} className="bot-white bot-bor-hidden">GST Payable on RCM Rs. {totalGst.toFixed(2)}</td>
                                <td colspan="1" className="border-right"></td>
                                <td colspan="1" className="border-right"></td>
                                <td className="border-right"></td>
                            </tr>

                            <tr className="row border height-80">
                                <td colspan="4" className="width-20 bottom left pad-left">Signature</td>
                                <td colspan="1" className="width-60 bottom">E. & O.E.</td>
                                <td colspan="4" className="width-20 bottom right pad-right">Authorised Signatory</td>
                            </tr>
                            <tr className="row border">
                                <td colspan="9" className="extra">
                                    No E-way bill is required to be generated as the Goods covered under this Invoice are exempted as
                                    per Serial No.4 & 5 to the Annexure to Rule 138(14) of the CGST Rules 2017
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </div>

            </main>
        </>
    )
}

export default Making
