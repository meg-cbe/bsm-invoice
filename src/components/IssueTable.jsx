import React, { useState, useEffect } from "react"
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai"
import { v4 as uuidv4 } from "uuid"
import "react-toastify/dist/ReactToastify.css"

export default function IssueTable({
    description,
    setDescription,
    gold,
    setGold,
    touch,
    setTouch,
    waste,
    setWaste,
    stone,
    setStone,
    pure,
    setPure,
    list,
    setList,
    option,
    setOption

}) {
    const [isEditing, setIsEditing] = useState(false)
    const [milliGram, setMilliGram] = useState("")
    const [isClicked, setIsClicked] = useState(false)
    // Submit form function
    const handleSubmit = (e) => {
        e.preventDefault()

        const newItems = {
            id: uuidv4(),
            description,
            gold,
            touch,
            waste,
            stone,
            pure,
            option
        }
        setDescription("select description")
        setOption("Select Option")
        setGold("")
        setTouch("")
        setStone("")
        setWaste("")
        setIsClicked(false)
        setList([...list, newItems])
        setIsEditing(false)
        setMilliGram("")

    }

    let handleClick = (e)=>{
        e.preventDefault();
        setIsClicked(!isClicked)
    }

    // Calculate items amount function
    useEffect(() => {
        const calculateAmount = () => {
            let stoneWeight;
            let total;
            let totalWithWaste;
            stoneWeight = stone ? parseFloat(gold) - parseFloat(stone) : parseFloat(gold)
            totalWithWaste = waste ? parseFloat(stoneWeight) + parseFloat(waste) : parseFloat(stoneWeight)
            total = (parseFloat(totalWithWaste) * parseFloat(touch)) / 100
            setPure(total.toFixed(3))
        }

        const calculateWastage = () => {

            if (option === "Receipt") {
                let weight;
                let value;
                weight = stone ? parseFloat(gold) - parseFloat(stone) : parseFloat(gold)
                value = (parseFloat(weight) * parseFloat(milliGram)) / 100
                setWaste(value.toFixed(3))

            }
        }
        if (milliGram) {
            calculateWastage()
        }
        calculateAmount()
    }, [gold, touch, waste, option, milliGram, setWaste, setPure, stone])

    // Calculate total amount of items in table
    useEffect(() => {
        // let rows = document.querySelectorAll(".amount")
        // let sum = 0
        // for (let i = 0; i < rows.length; i++) {
        //     if (rows[i].className === "amount") {
        //         sum += isNaN(rows[i].innerHTML) ? 0 : parseFloat(rows[i].innerHTML)
        //         setTotal(sum.toFixed(3))
        //     }
        // }
    })

    // Edit function
    const editRow = (id) => {
        const editingRow = list.find((row) => row.id === id)
        setList(list.filter((row) => row.id !== id))
        setIsEditing(true)
        setStone(editingRow.stone)
        setDescription(editingRow.description)
        setOption(editingRow.option)
        setGold(editingRow.gold)
        setTouch(editingRow.touch)
        setWaste(editingRow.waste)
        setMilliGram("")
    }

    // Delete function
    const deleteRow = (id) => {
        setList(list.filter((row) => row.id !== id))
    }

    return (
        <>

            <form onSubmit={handleSubmit}>
                <div className="flex flex-col md:mt-2">
                    <label htmlFor="Option">Option</label>
                    <select
                        id="Option"
                        name="Option"
                        value={option}
                        onChange={(e) => setOption(e.target.value)}>
                        <option disabled>Select Option</option>
                        <option value="Issue">Issue</option>
                        <option value="Receipt">Receipt</option>

                    </select>
                </div>
                <div className="flex flex-col md:mt-2">
                    <div className="flex flex-row" style={{
                        alignItems:"center"
                    }}>
                       {isClicked &&  <div className="flex flex-col" style={{
                            width:"65%"
                        }}>

                            <label htmlFor="newText">Particulars</label>
                            <input
                                type="text"
                                name="newText"
                                id="newText"
                                placeholder="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>}
                       <div>
                       <button 
                       onClick={(e)=>{handleClick(e)}}
                       className="mb-5 bg-red-500 text-white font-bold py-2 px-5 rounded shadow border-2 border-red-500 hover:bg-transparent hover:text-red-500 transition-all duration-300">
                            {isClicked ? "Cancel" : "New Item"}
                        </button>
                       </div>
                    </div>

                </div>
                {
                    !isClicked && <div className="flex flex-col md:mt-2">
                    <label htmlFor="description">Particulars</label>
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
                    </select>
                </div>
                }

                <div className="md:grid grid-cols-4 gap-5">
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

                    {
                        option === "Receipt" && <div className="flex flex-col">
                            <label htmlFor="milliGram">Milli Gram</label>
                            <input
                                type="number"
                                step={0.001}
                                name="milliGram"
                                id="milliGram"
                                placeholder="milliGram"
                                value={milliGram}
                                onChange={(e) => setMilliGram(e.target.value)}
                            />
                        </div>
                    }

                    {
                        option === "Receipt" && <div className="flex flex-col">
                            <label htmlFor="stone">Stone</label>
                            <input
                                type="number"
                                step={0.001}
                                name="Stone"
                                id="stone"
                                placeholder="Stone"
                                value={stone}
                                onChange={(e) => setStone(e.target.value)}
                            />
                        </div>
                    }

                    <div className="flex flex-col">
                        <label htmlFor="touch">Touch</label>
                        <input
                            type="number"
                            step={0.001}
                            name="Touch"
                            id="touch"
                            placeholder="Touch"
                            value={touch}
                            onChange={(e) => setTouch(e.target.value)}
                        />
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
                        <td className="font-bold">Stone</td>
                        <td className="font-bold">Touch</td>
                        <td className="font-bold">Wastage</td>
                        <td className="font-bold">Pure</td>
                    </tr>
                </thead>
                {list.map(({ id, description, gold, stone, touch, waste, pure }) => (
                    <React.Fragment key={id}>
                        <tbody>
                            <tr className="h-10">
                                <td>{description}</td>
                                <td>{gold}</td>
                                <td>{stone}</td>
                                <td>{touch}</td>
                                <td>{waste}</td>
                                <td>{pure}</td>
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
                    {/* Rs. {total.toLocaleString()} */}
                </h2>
            </div>
        </>
    )
}
