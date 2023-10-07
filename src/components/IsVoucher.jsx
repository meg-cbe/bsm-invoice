import React, { useState } from "react"
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai"
import { v4 as uuidv4 } from "uuid"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export default function IsVoucher({
  fontSize,
  description,
  setDescription,
  touch,
  setTouch,
  gweight,
  setGweight,
  list,
  setList
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [isClicked, setIsClicked] = useState(false)

  // Submit form function
  const handleSubmit = (e) => {
    e.preventDefault()

      if (!description || !gweight || !touch) {
        toast.error("Please fill in all inputs")
      } else {
        const newItems = {
          id: uuidv4(),
          description,
          touch,
          gweight
        }
        setDescription("select description")
        setTouch('')
        setGweight(0)
        setIsClicked(false)
        setList([...list, newItems])
        setIsEditing(false)
      }

  }

  let handleClick = (e) => {
    e.preventDefault();
    setIsClicked(!isClicked)
  }

  let renderGst = list?.map(i => parseFloat(i.gweight)).reduce((prev, next) => prev + next, 0)
  let grandTotal = parseFloat(renderGst)
  // Edit function
  const editRow = (id) => {
    const editingRow = list.find((row) => row.id === id)
    setList(list.filter((row) => row.id !== id))
    setIsEditing(true)
    setDescription(editingRow.description)
    setTouch(editingRow.touch)
    setGweight(editingRow.gweight)
  }

  // Delete function
  const deleteRow = (id) => setList(list.filter((row) => row.id !== id))

  return (
    <>
      <ToastContainer position="top-right" theme="colored" />

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:mt-2">
          <div className="flex flex-row note" style={{
            alignItems: "center"
          }}>
            {
              !isClicked && <div className="flex flex-col md:mt-2" style={{
                width: "65%"
              }}>
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
            }
            {isClicked && <div className="flex flex-col" style={{
              width: "65%"
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
                onClick={(e) => { handleClick(e) }}
                className="mb-5 bg-red-500 text-white font-bold py-2 px-5 rounded shadow border-2 border-red-500 hover:bg-transparent hover:text-red-500 transition-all duration-300">
                {isClicked ? "Cancel" : "New Item"}
              </button>
            </div>
          </div>

        </div>


        <div className="md:grid grid-cols-2 gap-20">

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
            <label htmlFor="Gweight">Weight</label>
            <input
              type="number"
              name="Gweight"
              id="Gweight"
              placeholder="Gweight"
              value={gweight}
              onChange={(e) => setGweight(e.target.value)}
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

      <table style={{ fontSize: fontSize }} width="100%" className="mb-10">
        <thead>
          <tr className="bg-gray-100 p-1">
            <td className="font-bold">Description</td>
            <td className="font-bold">touch</td>
            <td className="font-bold">weight</td>
          </tr>
        </thead>
        {list.map(({ id, description, touch, gweight}) => (
          <React.Fragment key={id}>
            <tbody>
              <tr className="h-10">
                <td>{description}</td>
                <td>{touch}</td>
                <td>{gweight}</td>
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
          Rs. {grandTotal}
        </h2>
      </div>
    </>
  )
}
