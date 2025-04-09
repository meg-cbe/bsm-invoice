import React, { useState, useEffect } from "react"
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai"
import { v4 as uuidv4 } from "uuid"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export default function SalesTable({
  fontSize,
  description,
  setDescription,
  hsn,
  setHsn,
  gst,
  setGst,
  pcs,
  setPcs,
  touch,
  setTouch,
  gweight,
  setGweight,
  nweight,
  setNweight,
  rate,
  setRate,
  amount,
  setAmount,
  list,
  setList,
  total,
  setTotal,
  nSum,
  setNsum,
  gSum,
  setGsum,
  pSum,
  setPsum
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [newAmount, setNewAmount] = useState(0)

  // Submit form function
  const handleSubmit = (e) => {
    e.preventDefault()

    if(description !== "Hallmark Charge"){
      if (!description || !hsn || !gst || !pcs || !nweight || !gweight || !rate || !touch) {
        toast.error("Please fill in all inputs")
      } else {
        const newItems = {
          id: uuidv4(),
          description,
          hsn,
          gst,
          pcs,
          touch,
          gweight,
          nweight,
          rate,
          amount,
        }
        setDescription("")
        setHsn(0)
        setGst(0)
        setPcs(0)
        setTouch("")
        setGweight(0)
        setNweight(0)
        setRate(0)
        setAmount("")
        setList([...list, newItems])
        setIsEditing(false)
      }
    }else{
      const newItems = {
        id: uuidv4(),
        description,
        hsn,
        gst,
        pcs,
        touch,
        gweight,
        nweight,
        rate,        
        amount,
      }
      setDescription("")
      setHsn(0)
      setGst(0)
      setPcs(0)
      setTouch('')
      setGweight(0)
      setNweight(0)
      setRate(0)
      setAmount("")
      setList([...list, newItems])
      setIsEditing(false)
    }
  }

  // Calculate items amount function
  useEffect(() => {
    const calculateAmount = (amount) => {

      let total = parseFloat(rate * nweight)
      if(description === "Hallmark Charge"){
        setAmount(parseFloat(newAmount).toFixed(2))
      }else{
        setAmount(total.toFixed(2))
      }
    }

    calculateAmount(amount)
  }, [amount, rate, setAmount, description, newAmount, nweight])

  // Calculate total amount of items in table
  useEffect(() => {
    let rows = document.querySelectorAll(".amount")
    let nrows = document.querySelectorAll(".nw")
    let grows = document.querySelectorAll(".gw")
    let prows = document.querySelectorAll(".pcs")

    let sum = 0
    let nsum = 0
    let gsum = 0
    let psum = 0

    for (let i = 0; i < rows.length; i++) {
      if (rows[i].className === "amount") {
        sum += isNaN(rows[i].innerHTML) ? 0 : parseFloat(rows[i].innerHTML)
        setTotal(sum.toFixed(2))
      }
    }
    for (let i = 0; i < nrows.length; i++) {
      if (nrows[i].className === "nw") {
        nsum += isNaN(nrows[i].innerHTML) ? 0 : parseFloat(nrows[i].innerHTML)
        setNsum(nsum.toFixed(3))
      }
    }
    for (let i = 0; i < grows.length; i++) {
      if (grows[i].className === "gw") {
        gsum += isNaN(grows[i].innerHTML) ? 0 : parseFloat(grows[i].innerHTML)
        setGsum(gsum.toFixed(3))
      }
    }
    for (let i = 0; i < prows.length; i++) {
      if (prows[i].className === "pcs") {
        psum += isNaN(prows[i].innerHTML) ? 0 : parseInt(prows[i].innerHTML)
        setPsum(psum)
      }
    }

  })

  // Edit function
  const editRow = (id) => {
    const editingRow = list.find((row) => row.id === id)
    setList(list.filter((row) => row.id !== id))
    setIsEditing(true)
    setDescription(editingRow.description)
    setHsn(editingRow.hsn)
    setGst(editingRow.gst)
    setPcs(editingRow.pcs)
    setTouch(editingRow.touch)
    setGweight(editingRow.gweight)
    setNweight(editingRow.nweight)
    setRate(editingRow.rate)
  }

  // Delete function
  const deleteRow = (id) => setList(list.filter((row) => row.id !== id))

  return (
    <>
      <ToastContainer position="top-right" theme="colored" />

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:mt-16">
          <label htmlFor="description">Item description</label>

          <select
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          >
            <option disabled>select description</option>
            <option value="NEW GOLD ORNAMENTS">NEW GOLD ORNAMENTS</option>
            <option value="Fancy Haram">Fancy Haram</option>
            <option value="Fancy Necklace">Fancy Necklace</option>
            <option value="Stud Tops">Stud Tops</option>
            <option value="Ring(s)">Ring(s)</option>
            <option value="Bangle(s)">Bangle(s)</option>
            <option value="Chain(s)">Chain(s)</option>
            <option value="Braslet(s)">Braslet(s)</option>
            <option value="Mango Malai">Mango Malai</option>
            <option value="Mango Necklace">Mango Necklace</option>
            <option value="Lakshmi Kasu Malai">Lakshmi Kasu Malai</option>
            <option value="Lakshmi Kasu Necklace">Lakshmi Kasu Necklace</option>
            <option value="Hallmark Charge">Hallmark Charge</option>
          </select>
        </div>

        <div className="md:grid grid-cols-4 gap-10">
          <div className="flex flex-col">
            <label htmlFor="hsn">HSN/SAC</label>
            <select
              name="Hsn"
              id="hsn"
              value={hsn}
              onChange={(e) => setHsn(e.target.value)}>
              <option disabled>select description</option>
              <option value="711319">711319</option>
              <option value="998346">998346</option>
              <option value="998894">998894</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="gst">GST</label>
            <input
              type="number"
              name="Gst"
              id="gst"
              placeholder="Gst"
              value={gst}
              onChange={(e) => setGst(e.target.value)}
            />
          </div>
          {
            description === "Hallmark Charge" && <div className="flex flex-col">
            <label htmlFor="newAmount">Amount</label>
            <input
              type="number"
              name="newAmount"
              id="newAmount"
              placeholder="Amount"
              value={newAmount}
              onChange={(e) => setNewAmount(e.target.value)}
            />
          </div>
          }
          {description !== "Hallmark Charge" && <>
          <div className="flex flex-col">
            <label htmlFor="Pcs">PCS</label>
            <input
              type="number"
              name="Pcs"
              id="Pcs"
              placeholder="Pcs"
              value={pcs}
              onChange={(e) => setPcs(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="Touch">Touch</label>
            <input
              type="text"
              name="Touch"
              id="Touch"
              placeholder="Touch"
              value={touch}
              onChange={(e) => setTouch(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="Gweight">Gross Wt</label>
            <input
              type="number"
              name="Gweight"
              id="Gweight"
              placeholder="Gweight"
              value={gweight}
              onChange={(e) => setGweight(e.target.value)}
            />
          </div></>}

        </div>
        <div className="md:grid grid-cols-3 gap-10">
          {description !== "Hallmark Charge" && <>
          <div className="flex flex-col">
            <label htmlFor="Nweight">Net Wt</label>
            <input
              type="number"
              name="Nweight"
              id="Nweight"
              placeholder="Nweight"
              value={nweight}
              onChange={(e) => setNweight(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="Rate">Rate</label>
            <input
              type="number"
              name="Rate"
              id="Rate"
              placeholder="Rate"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
            />
          </div></>}
          <div className="flex flex-col">
            <label htmlFor="amount">Amount</label>
            <p>{amount}</p>
          </div>
        </div>
        <button
          type="submit"
          className="mb-5 bg-blue-500 text-white font-bold py-2 px-8 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300"
        >
          {isEditing ? "Editing Row Item" : "Add Table Item"}
        </button>
      </form>

      {/* Table items */}

      <table style={{ fontSize: fontSize }} width="100%" className="mb-10">
        <thead>
          <tr className="bg-gray-100 p-1">
            <td className="font-bold">Description</td>
            <td className="font-bold">hsn</td>
            <td className="font-bold">gst</td>
            <td className="font-bold">pcs</td>
            <td className="font-bold">touch</td>
            <td className="font-bold">gross wt</td>
            <td className="font-bold">net wt</td>
            <td className="font-bold">rate</td>
            <td className="font-bold">Amount</td>
          </tr>
        </thead>
        {list.map(({ id, description, hsn, gst, pcs,touch, gweight, nweight, rate, amount }) => (
          <React.Fragment key={id}>
            <tbody>
              <tr className="h-10">
                <td>{description}</td>
                <td>{hsn}</td>
                <td>{gst}</td>
                <td className="pcs">{pcs}</td>
                <td>{touch}</td>
                <td className="gw">{gweight}</td>
                <td className="nw">{nweight}</td>
                <td>{rate}</td>

                <td className="amount">{amount}</td>
                <td>
                  <button onClick={() => editRow(id)}>
                    <AiOutlineEdit className="text-green-500 font-bold text-xl" />
                  </button>
                </td>
                <td>
                  <button onClick={() => deleteRow(id)}>
                    <AiOutlineDelete className="text-red-500 font-bold text-xl" />
                  </button>
                </td>
              </tr>
            </tbody>
          </React.Fragment>
        ))}
      </table>

      <div>
        <h2 className="flex items-end justify-end text-gray-800 text-4xl font-bold">
          Rs. {total.toLocaleString()}
        </h2>
      </div>
    </>
  )
}
