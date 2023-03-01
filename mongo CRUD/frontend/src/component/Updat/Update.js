import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';

const Update = () => {
    const storedUser = useLoaderData()
    const [user, setUser] = useState(storedUser);



    const handleUpdateUser = (event) => {
        event.preventDefault();
        console.log(user);
        fetch(`http://localhost:5000/users/${storedUser._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        }

        )
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    alert('User Updated Successfully');
                    //event.target.reset()
                }
                console.log(data)
            })
    }

    const handleInputChange = (event) => {
        const field = event.target.name;
        const value = event.target.value;
        const newUser = { ...user };
        newUser[field] = value;
        setUser(newUser)
    }

    return (
        <div>
            <h1>Please Update {storedUser?.name}</h1>
            <form onSubmit={handleUpdateUser}>
                <input type="text" defaultValue={storedUser.name} name="name" onChange={handleInputChange} placeholder='Your name' id="" required />
                <br />
                <input type="email" defaultValue={storedUser.email} name="email" onChange={handleInputChange} placeholder='Yur email' id="" required />
                <br />
                <input type="text" name="addres" defaultValue={storedUser.addres} onChange={handleInputChange} placeholder='Your address' id="" required />
                <br />
                <input type="submit" value="Update User" />
            </form>
        </div>
    );
};

export default Update;