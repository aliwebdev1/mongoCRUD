import React, { useState } from 'react';

const AddUser = () => {

    const [user, setUser] = useState({});

    const handleOnSubmit = (event) => {
        event.preventDefault();
        console.log(user);
        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.acknowledged) {
                    alert('User added Successfully');
                    event.target.reset();
                }
            })
    }

    const handleOnBlur = (event) => {
        const field = event.target.name;
        const value = event.target.value;
        const newUser = { ...user };
        newUser[field] = value;
        setUser(newUser)
    }

    return (
        <div>
            <h2>Please Add Your User</h2>
            <form onSubmit={handleOnSubmit}>
                <input type="text" name="name" onBlur={handleOnBlur} placeholder='Your name' id="" required />
                <br />
                <input type="email" name="email" onBlur={handleOnBlur} placeholder='Yur email' id="" required />
                <br />
                <input type="text" name="addres" onBlur={handleOnBlur} placeholder='Your address' id="" required />
                <br />
                <input type="submit" value="Add User" />
            </form>
        </div>
    );
};

export default AddUser;