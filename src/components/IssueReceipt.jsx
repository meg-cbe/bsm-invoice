import { useState, useRef, useEffect } from "react"
import TableForm from "./IssueTable"
import ReactToPrint from "react-to-print"
import './style.css'
import moment from 'moment'

function IssueReceipt() {

    const [invoiceNumber, setInvoiceNumber] = useState("")
    const [invoiceDate, setInvoiceDate] = useState("")
    const [toName, setToName] = useState("")
    const [description, setDescription] = useState("select description")
    const [gold, setGold] = useState("")
    const [op, setOp] = useState(0)
    const [stone, setStone] = useState("")
    const [touch, setTouch] = useState("")
    const [pure, setPure] = useState("")
    const [option, setOption] = useState("Select Option")
    const [waste, setWaste] = useState("")
    const [list, setList] = useState([])
    const [total, setTotal] = useState("")
    const [width] = useState(641)

    const componentRef = useRef()

    useEffect(() => {
        if (window.innerWidth < width) {
            alert("Place your phone in landscape mode for the best experience")
        }
    }, [width])

    let issueList = list?.filter(l=>l.option === "Issue")
    let receiptList = list?.filter(l=>l.option === "Receipt")

    let issuePure = issueList?.map(i => i.pure).reduce((prev, next) =>  parseFloat(prev) + parseFloat(next), 0)
    let receiptPure = receiptList?.map(i => i.pure).reduce((prev, next) => parseFloat(prev) + parseFloat(next), 0)
    let totalPure = (parseFloat(issuePure) - parseFloat(receiptPure)) + parseFloat(op)
    let totalgram = (parseFloat(totalPure) / 91.7) * 100

    let renderList = issueList?.map((l, i) => {
        return (
            <tr className="height-22" key={i}>
                <td colspan="3" className="font-10 pad-left-5">{l.description}</td>
                <td colspan="2" className="font-10 pad-0">{l.gold}</td>
                <td colspan="2" className="font-10 pad-0">{l.stone === 0 ? "" : l.stone}</td>
                <td colspan="2" className="font-10 pad-0">{l.touch}</td>
                <td colspan="2" className="font-10 pad-0">{l.waste === 0 ? "" : l.waste}</td>
                <td colspan="2" className="font-10 pad-0">{l.pure}</td>
            </tr>
        )
    })
    let renderRList = receiptList?.map((l, i) => {
        return (
            <tr className="height-22" key={i}>
                <td colspan="3" className="font-10 pad-left-50">{l.description}</td>
                <td colspan="2" className="font-10 pad-0">{l.gold}</td>
                <td colspan="2" className="font-10 pad-0">{l.stone === 0 ? "" : l.stone}</td>
                <td colspan="2" className="font-10 pad-0">{l.touch}</td>
                <td colspan="2" className="font-10 pad-0">{l.waste === 0 ? "" : l.waste}</td>
                <td colspan="2" className="font-10 pad-0">{l.pure}</td>

            </tr>
        )
    })

    return (
        <>
            <main style={{ fontSize: "14px", display: 'flex', padding: '15px' }}>
                <section style={{ maxWidth: '600px', width: '100%' }}>
                    <div className="bg-white p-5 rounded shadow">
                        <div className="flex flex-col justify-center">

                            <article className="md:grid grid-cols-2 gap-10">
                                <div className="flex flex-col">
                                    <label htmlFor="invoiceNumber">No</label>
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
                                        placeholder="dd-mm-yyyy"
                                        autoComplete="off"
                                        value={invoiceDate}
                                        onChange={(e) => setInvoiceDate(e.target.value)}
                                    />
                                </div>

                            </article>
                            <article className="md:grid grid-cols-2 gap-10">

                                <div className="flex flex-col">
                                    <label htmlFor="toName">To :</label>
                                    <input
                                        required
                                        type="text"
                                        name="toName"
                                        id="toName"
                                        placeholder="To"
                                        autoComplete="off"
                                        value={toName}
                                        onChange={(e) => setToName(e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-col">
                        <label htmlFor="op">Opening Balance</label>
                        <input
                            type="number"
                            step={0.001}
                            name="op"
                            id="op"
                            placeholder="Opening Balance"
                            value={op}
                            onChange={(e) => setOp(e.target.value)}
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
                                    touch={touch}
                                    setTouch={setTouch}
                                    pure={pure}
                                    setPure={setPure}
                                    waste={waste}
                                    setWaste={setWaste}
                                    stone={stone}
                                    setStone={setStone}
                                    list={list}
                                    option={option}
                                    setOption={setOption}
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

                <div ref={componentRef} className="issue-page" size="A4">
                    <div>
                        <div style={{marginBottom:"8px"}} className="flex flex-col justify-center al-center" >
                            <h2 style={{fontWeight:600,fontSize:"10px"}}>Estimation Only</h2>
                            <div className="center-align font-10">
                                <h2 >BSM JEWELS MANUFACTURE</h2>
                            </div>
                        </div>
                        <div style={{marginBottom:"10px"}} className="second-div font-10">
                            <p style={{textTransform : "uppercase"}}  className="left" >Name : {toName}</p>
                            <p style={{textTransform : "uppercase"}}  className="right " >Date : {invoiceDate ? moment(invoiceDate).format("DD-MM-YYYY") : ""}</p>
                        </div>
                        <div style={{marginBottom:"10px"}} className="second-div font-10">
                            <p style={{textTransform : "uppercase"}}  className="left" ><b>OB(P) :</b> {op}</p>
                            <p style={{textTransform : "uppercase"}}  className="right " >No : {invoiceNumber}</p>
                        </div>
                            
                        <table className="mar-bot">
                            <tbody>
                                <tr className="row top-bot height-25" style={{textAlign:"left"}}>

                                    <th colspan="3" style={{ fontWeight: 600 }} className=" font-10">
                                        Particulars
                                    </th>
                                    <th colspan="2" style={{ fontWeight: 600 }} className="width-15 font-10">
                                        G.Wg
                                    </th>
                                    <th colspan="2" style={{ fontWeight: 600 }} className="width-15 font-10">
                                        Stone
                                    </th>
                                    <th colspan="2" style={{ fontWeight: 600 }} className="width-15 font-10">
                                        Touch
                                    </th>
                                    <th colspan="2" style={{ fontWeight: 600 }} className="width-15 font-10">
                                        Wastage
                                    </th>
                                    <th colspan="2" style={{ fontWeight: 600 }} className="width-15 font-10">
                                        Pure
                                    </th>
                                  
                                </tr>
                                
                                <tr className="font-10">
                                    <td colspan="3" className="pad-left-5" ><b>Issue</b></td>
                                    <td colspan="2" className="pad-0"></td>
                                    <td colspan="2" className="pad-0"></td>
                                    <td colspan="2" className="pad-0"></td>
                                    <td colspan="2" className="pad-0"></td>
                                    <td colspan="2" className="pad-0"></td>

                                </tr>
                                {
                                    list && renderList
                                }
                                <tr className="font-10">
                                    <td colspan="3" className="pad-left-5" ><b>Receipt</b></td>
                                    <td colspan="2" className="pad-0"></td>
                                    <td colspan="2" className="pad-0"></td>
                                    <td colspan="2" className="pad-0"></td>
                                    <td colspan="2" className="pad-0"></td>
                                    <td colspan="2" className="pad-0"></td>

                                </tr>
                                {
                                    list && renderRList
                                }
                                <tr className="gray-bottom ">
                                    <td colspan="3"  ></td>
                                    <td colspan="2"  ></td>
                                    <td colspan="2" ></td>
                                    <td colspan="2"  ></td>
                                    <td colspan="2"  ></td>
                                    <td colspan="2"  ></td>
                                </tr>
                                <tr className="height-22 center-align font-10">
                                    <td colspan="5"  ><b style={{marginRight:"15px"}}>Bal.</b> <b>Wg : {totalgram.toFixed(3)}</b></td>
                                    <td colspan="4" ><b>Pure : {totalPure.toFixed(3)}</b></td>
                                    <td colspan="4" ><b>Cash : 0.00</b></td>
                                </tr>      
                            </tbody>
                        </table>
                       <div className="flex issue-bot">
                        <p style={{fontSize:"12px"}}>Checked By</p>
                        <p style={{fontSize:"12px"}}>Signature</p>
                       </div>
                    </div>
                </div>

            </main>
        </>
    )
}

export default IssueReceipt
