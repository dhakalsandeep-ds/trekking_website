import React, { useState } from "react";
import "./PerProductContainer.css";

import { toast } from 'react-toastify'

export default function PerProductContainer(props) {

  const [name, setName] = useState("")
  const [numberOfPeople, setNumberOfPeople] = useState("")
  const [contactNumber, setContactNumber] = useState("")
  const [arrivalDate, setArrivalDate] = useState("")
  const [nameError, setNameError] = useState("")
  const [numberOfPeopleError, setNumberOfPeopleError] = useState('')
  const [contactNumberError, setContactNUmberError] = useState('')
  const [arrivalDateError, setArrivalDateError] = useState("")




  const { tripData } = props;





  const book = async () => {
    let errors = []

    if (numberOfPeople === "" || isNaN(numberOfPeople)) {
      errors.push("Number of people is required and must be number")
    }

    if (name === "" || !isNaN(name)) {
      errors.push("Name is required and must be string")
    }

    if (contactNumber === "" || isNaN(contactNumber) || (!isNaN(contactNumber) && (contactNumber.length !== 8 && contactNumber.length !== 10))) {
      console.log(contactNumber === "", isNaN(contactNumber))
      errors.push("Contact number is required and must be number with 10 or 8 digits.")
    }

    if (arrivalDate === "") {
      errors.push("Date to arrive is required")
    }

    console.log(errors)
    if (errors.length > 0) {
      setNameError(prev => {
        let isError = errors.includes("Name is required and must be string")
        let messages = errors.filter(p => p.includes("Name"))
        return {
          isError, messages
        }
      })

      setNumberOfPeopleError(prev => {
        let isError = errors.includes("Number of people is required and must be number")
        let messages = errors.filter(p => p.includes("Number"))
        return {
          isError, messages
        }
      })

      setContactNUmberError(prev => {

        let isError = errors.includes("Contact number is required and must be number with 10 or 8 digits.")
        let messages = errors.filter(p => p.includes("Contact"))
        console.log(isError, messages)
        return {
          isError, messages
        }
      })

      setArrivalDateError(prev => {

        let isError = errors.includes("Date to arrive is required")
        let messages = errors.filter(p => p.includes("Date"))
        console.log(isError, messages)
        return {
          isError, messages
        }
      })


      return
    }


    let headersList = {
      "Accept": "*/*",
      "Content-Type": "application/json"
    }

    let bodyContent = JSON.stringify({
      packageName: props.tripData.heading,
      name,
      numberOfPeople,
      contactNumber,
      arrivalDate,

    });
    console.log(bodyContent, "body content .")

    let response = await fetch("http://localhost:8000/bookings", {
      method: "POST",
      body: bodyContent,
      headers: headersList
    });
    console.log(response)
    if (response.status === 201) {
      let data = await response.json();
      setArrivalDate({})
      setName("")
      setNameError({})
      setArrivalDate("")
      setArrivalDateError({})
      setContactNumber("")
      setContactNUmberError({})
      setNumberOfPeople({})
      setNumberOfPeopleError({})
      toast.success(data.message)
    } else {
      toast.error("something went wrong")
    }
  }


  return (
    <div className="perProductContainer_wrapper">
      <div style={{ width: "100%" }}
        className="perProductContainer_container">
        <div style={{ width: "100%" }} className="perProductContainer_content">

          <div style={{ display: "flex" }}>
            <div style={{ flexGrow: 1 }}>
              <h1 className="ppc_tripInfo_h2">TRIP INFORMATION</h1>
              <p>Duration: {tripData.duration} days</p>

              <p>Price Rs.{tripData.price} </p>

              <p>Season:{tripData.season}</p>
            </div>
            <div className="form_container" style={{ flexGrow: 2 }}>
              <form action="" width="100%" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <h1>order now</h1>
                <div className="input_container" >
                  <div className="label">
                    package name
                  </div>
                  <div className="input">
                    <input type="text" value={tripData.heading} disabled style={{ display: 'inline-block', width: "90%" }} />
                  </div>
                </div>

                <div className="input_container" >
                  <div className="label">
                    name
                  </div>
                  <div className="input">
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} style={{ display: 'inline-block', width: "90%" }} />

                  </div>
                  {nameError.isError && nameError.messages.map(p => <p style={{ color: "red" }}>{p}</p>)}
                </div>
                <div className="input_container">
                  <div className="labe">
                    number of people
                  </div>
                  <div className="input">
                    <input type="text" value={numberOfPeople} onChange={e => setNumberOfPeople(e.target.value)} style={{ display: "inline-block", width: "90%" }} />
                  </div>
                  {numberOfPeopleError.isError && numberOfPeopleError.messages.map(p => <p style={{ color: "red" }}>{p}</p>)}
                </div>

                <div>
                  <div className="labe">
                    date to arrive
                  </div>
                  <div className="input">
                    <input type="date" value={arrivalDate} onChange={e => setArrivalDate(e.target.value)} style={{ display: "inline-block", width: "90%" }} />
                  </div>
                  {arrivalDateError.isError && arrivalDateError.messages.map(p => <p style={{ color: "red" }}>{p}</p>)}
                </div>
                <div>
                  <div className="label">
                    contact number
                  </div>
                  <div className="input">
                    <input type="text" value={contactNumber} onChange={e => setContactNumber(e.target.value)} style={{ display: "inline-block", width: "90%" }} />
                  </div>
                  {contactNumberError.isError && contactNumberError.messages.map(p => <p style={{ color: "red" }}>{p}</p>)}
                </div>

                <div>
                  <button type="submit" width="90%" style={{ height: "40px", width: "60px", backgroundColor: "#0095ff", color: "white" }} onClick={(e) => {
                    e.preventDefault()
                    book(tripData._id)
                  }}>book</button>

                </div>
              </form>


            </div>
          </div>




        </div>

      </div>
    </div>
  );
}
