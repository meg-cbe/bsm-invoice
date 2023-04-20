import React, { useState, useEffect } from "react"
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai"
import { v4 as uuidv4 } from "uuid"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export default function MakingTable({
    description,
    setDescription,
    gold,
    setGold,
    rate,
    setRate,
    amount,
    setAmount,
    hsn, setHsn,
    list,
    setList,
    total,
    setTotal,
}) {
    const [isEditing, setIsEditing] = useState(false)

    // Submit form function
    const handleSubmit = (e) => {
        e.preventDefault()

        if (!description || !gold || !rate || !hsn) {
            toast.error("Please fill in all inputs")
        } else {
            const newItems = {
                id: uuidv4(),
                description,
                gold,
                rate,
                hsn,
                amount,
            }
            setDescription("")
            setGold(0)
            setRate(0)
            setAmount("")
            setList([...list, newItems])
            setIsEditing(false)
        }
    }

    // Calculate items amount function
    useEffect(() => {
        const calculateAmount = (amount) => {

            let total = parseFloat(gold) * parseFloat(rate)
            setAmount(total.toFixed(3))
        }

        calculateAmount(amount)
    }, [amount, gold, rate, setAmount])

    // Calculate total amount of items in table
    useEffect(() => {
        let rows = document.querySelectorAll(".amount")
        let sum = 0

        for (let i = 0; i < rows.length; i++) {
            if (rows[i].className === "amount") {
                sum += isNaN(rows[i].innerHTML) ? 0 : parseFloat(rows[i].innerHTML)
                setTotal(sum.toFixed(3))
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
        setGold(editingRow.gold)
        setRate(editingRow.rate)
    }

    // Delete function
    const deleteRow = (id) => setList(list.filter((row) => row.id !== id))

    return (
        <>
            <ToastContainer position="top-right" theme="colored" />

            <form onSubmit={handleSubmit}>
                {/* <div className="flex flex-col">
                    <label htmlFor="description">Item description</label>

                    <select
                        id="description"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    >
                        <option>select description</option>
                        <option value="NEW GOLD ORNAMENTS 22CT">NEW GOLD ORNAMENTS 22CT</option>
                        <option value="NEW GOLD ORNAMENTS 24CT">NEW GOLD ORNAMENTS 24CT</option>
                        <option value="pending">Pending</option>
                        <option value="denied">Denied</option>
                    </select>
                </div> */}
                <div className="flex flex-col">
                    <label htmlFor="newText">Description</label>
                    <input
                        type="text"
                        name="newText"
                        id="newText"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>


                <div className="md:grid grid-cols-4 gap-10">
                    <div className="flex flex-col">
                        <label htmlFor="hsn">HSN/SAC</label>
                        <select
                            name="Hsn"
                            id="hsn"
                            value={hsn}
                            onChange={(e) => setHsn(e.target.value)}>
                            <option disabled>HSN/SAC</option>
                            <option value="711319">711319</option>
                            <option value="998346">998346</option>
                            <option value="998892">998892</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="gold">Gold Wgt</label>
                        <input
                            type="number"
                            step={0.001}
                            name="Gold"
                            id="gold"
                            placeholder="Gold"
                            value={gold}
                            onChange={(e) => setGold(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="rate">Rate</label>
                        <input
                            type="number"
                            name="Rate"
                            id="rate"
                            placeholder="Rate"
                            value={rate}
                            onChange={(e) => setRate(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="amount">Total wastage</label>
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

            <table width="100%" className="mb-10">
                <thead>
                    <tr className="bg-gray-100 p-1">
                        <td className="font-bold">Description</td>
                        <td className="font-bold">Gold</td>
                        <td className="font-bold">Rate</td>
                        <td className="font-bold">Amount</td>
                    </tr>
                </thead>
                {list.map(({ id, description, gold, rate, amount }) => (
                    <React.Fragment key={id}>
                        <tbody>
                            <tr className="h-10">
                                <td>{description}</td>
                                <td>{gold}</td>
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
