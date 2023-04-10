import React, { useState } from 'react'
import Axios from 'axios';
import './App.css';

function App() {
    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [phone, setPhone] = useState("")
    const [website, setWebsite] = useState("")
    const [company, setCompany] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();

        await Axios.post('http://localhost:4000/insert', {
            name: name,
            username: username,
            email: email,
            address: address,
            phone: phone,
            website: website,
            Company: company
        })
    }

    return (

        <div className='App'>
            <header className='App-header'>
                <div className='"logIn-form"'>
                    <form onSubmit={handleSubmit}>
                        <p>  First Name</p>
                        <input className='Name' type="text" placeholder='First Name' onChange={(e) => { setName(e.target.value) }} />
                        <p>User Name</p>
                        <input className='UserName' type="text" placeholder='User Name' onChange={(e) => { setUsername(e.target.value) }} />
                        <p>Email</p>
                        <input className='Email' type="text" placeholder='Email' onChange={(e) => { setEmail(e.target.value) }} />
                        <p>City</p>
                        <input className='Address' type="text" placeholder='City' onChange={(e) => { setAddress(e.target.value) }} />
                        <p>Phone Number</p>
                        <input className='Phone' type="text" placeholder='Phone Number' onChange={(e) => { setPhone(e.target.value) }} />
                        <p>Website</p>
                        <input className='Website' type="text" placeholder='Website' onChange={(e) => { setWebsite(e.target.value) }} />
                        <p>Company</p>
                        <input className='Company' type="text" placeholder='Company' onChange={(e) => { setCompany(e.target.value) }} />
                        <button className='text-center' type='Submit'>Submit the Form</button>
                    </form>
                </div>
            </header>

        </div>
    )
}

export default App;