const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

// nodeMongoCrud  wa4IIAK4cRaosP8b



const uri = "mongodb+srv://nodeMongoCrud:wa4IIAK4cRaosP8b@cluster0.3ftktcj.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run() {
    try {
        const userCollection = client.db('nodeMongoCrud').collection('users')
        // const user = { name: 'Shorif', email: 'shorif@gmail.com' }
        // const result = await userCollection.insertOne(user);
        // console.log(result);


        //user get 
        app.get('/users', async (req, res) => {
            const query = {};
            const cousor = userCollection.find(query);
            const users = await cousor.toArray();
            res.send(users)
        })

        //specially get one user
        app.get('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const user = await userCollection.findOne(query);
            res.send(user)
        })

        app.post('/users', async (req, res) => {
            const user = req.body;
            console.log(user);
            const result = await userCollection.insertOne(user);
            res.send(result)
        })


        app.put('/users/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) }
            const user = req.body;
            console.log(user);
            const option = { upsert: true }
            const updateUser = {
                $set: {
                    name: user.name,
                    addres: user.addres,
                    email: user.email,
                    status: 'pending'
                },

            }
            const result = await userCollection.updateOne(filter, updateUser, option)
            console.log(result);
            res.send(result)

        })

        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id);
            const query = { _id: new ObjectId(id) }
            const result = await userCollection.deleteOne(query)
            console.log(result);
            res.send(result)
        })


    }
    finally {

    }

}

run().catch(err => console.log(err));


app.listen(port, () => {
    console.log(`Our node mongodb CRUD run on : ${port}`);
})