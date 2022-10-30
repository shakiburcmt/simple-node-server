const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, MongoCursorInUseError } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send("Simple Node Server Running")
})

app.use(cors());
// to avoid express post body is undefined
app.use(express.json())

const users = [
    { id: 1, name: "Mariam", email: 'mariam@gmail.com' },
    { id: 2, name: "Ayesha", email: 'ayesha@gmail.com' },
    { id: 3, name: "Humayra", email: 'humayra@gmail.com' }
];

// username: dbUser1
// password: Ok4tYN2fy5FZFwSl


// mongodb
// nicher ta mongodb website theke ashche
const uri = "mongodb+srv://dbUser1:Ok4tYN2fy5FZFwSl@cluster0.i7ulodc.mongodb.net/?retryWrites=true&w=majority";
// nicher ta local server theke ashche
// const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const userCollection = client.db('simpleNode').collection('users');
        // const user = { name: 'Safa', email: 'safa@gmail.com' }
        // const result = await userCollection.insertOne(user);
        // console.log(result);

        app.get('/users', async (req, res) => {
            const cursor = userCollection.find({});
            const users = await cursor.toArray();
            res.send(users)
        })

        // nicher line a async na dile await error dekhabe karon await only async function e chole
        app.post('/users', async (req, res) => {
            console.log('Post API called');
            const user = req.body;
            // user.id = users.length + 1;
            // users.push(user);
            // console.log(user);
            const result = await userCollection.insertOne(user);
            console.log(result);
            user._id = result.insertedId;
            res.send(user);
        })
    }
    finally {

    }
}
run().catch(err => console.log(err))


// app.get('/users', (req, res) => {
//     if (req.query.name) {
//         // filter users by query
//         const search = req.query.name;
//         const filtered = users.filter(usr => usr.name.toLowerCase().indexOf(search) >= 0)
//         res.send(filtered);
//     }
//     else {
//         res.send(users);
//     }
// })

// // to get data from client side
// app.post('/users', (req, res) => {
//     console.log('Post API called');
//     const user = req.body;
//     user.id = users.length + 1;
//     users.push(user);
//     // info ashbe req e and return kora hobe res diye
//     // console.log(req.body);
//     console.log(user);
//     res.send(user)
// })

app.listen(port, () => {
    console.log(`Simple node server running on ${port}`);
})