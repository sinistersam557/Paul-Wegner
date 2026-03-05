const express = require('express')
const PORT = process.env.PORT || 3000;

const pgClient = require('./connections/pgClient')

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: false}))

//DEfine the WeBroot for ouR App
app.use(express.static('./client'))

app.get("/", (req, res) => {
    res.send("Server is Running")
})

//GET method
app.get("/api/items", (req, res) => {
    const id = parseInt(req.query.userid)
    if (typeof id !== 'number') {
        res.status(400).json({message: "Not a Valid User Id"})
    }
    const query = `
        SELECT *, item_id as "_id", is_complete as "isComplete"
        FROM bucketlist.items 
        WHERE user_id = ${id}
        ORDER BY timestamp_created ASC
        `
    pgClient.query(query)
    .then(data => {
        res.json({data: data.rows, message: "success"})
    })
    .catch(err => {
        console.error("Error Getting Items from DB:", err)
    })
})

/* //GET a specific item
app.get("/api/items/:id", (req, res) => {
    const { id } = req.params
}) */

//POST method
app.post("/api/items", (req, res) => {
    console.log(req.body)
    const { user_id, description } = req.body
    if (description && user_id) {
        const query = `
            INSERT INTO bucketlist.items (user_id, description) 
            VALUES (${user_id}, '${description}') 
            RETURNING *, item_id as "_id", is_complete as "isComplete"
            `
        pgClient.query(query)
        .then(data => {
            res.status(201).json({data: data.rows[0], message: "success"})
        })
        .catch(err => {
            console.error('Issue Adding Bucketlist Item:', err)
            res.status(400).json({message: "Inserting Record Failed"})
        })
    } else {
        res.status(400).json({ message: "Failure: New Item NOT Created"})
    }
})

//PUT method
app.put("/api/items", (req, res) => {
    const user_id = parseInt(req.query.user_id)
    const item_id = parseInt(req.query.item_id)
    if ( item_id && (typeof item_id == 'number') ) {
        const query = `
            UPDATE bucketlist.items 
            SET is_complete = NOT is_complete 
            WHERE item_id = ${item_id} 
            AND user_id = ${user_id} 
            RETURNING *
            `
        pgClient.query(query)
        .then(data => {
            res.json({data: data.rows[0], message: `success updating ${item_id}`})
        })
        .catch(err => {
            console.error('Issue Updating Item:', err)
            res.status(400).json({message: "Error in Updating Item"})
        })
    }
})

//DELETE method
app.delete("/api/items", (req, res) => {
    const user_id = parseInt(req.query.user_id)
    const item_id = parseInt(req.query.item_id)
    if ( !item_id && (typeof item_id != 'number') ) {
        res.json({message: "Please Provide Valid item_id"})
    }
    const query = `
        DELETE FROM bucketlist.items
        WHERE item_id = ${item_id}
        AND user_id = ${user_id}
        RETURNING *
    `
    pgClient.query(query)
    .then(data => {
        if (data.rows.length) res.json({message: "success", data: data.rows})
        else res.json({message: "Item was not found in the system"})
    })
    .catch(err => {
        console.error("Error Deleting Item:", err)
        res.status(400).json({message: "Error Deleting Item"})
    })

})

//Error Handling
app.use((err, req, res, next) => {
    console.error('Unhandled Error:', err.message)
    res.status(500).json({ message: 'Internal Server Error', error: err.message })
})

//Route not Found
app.use((request, response) => {
    response.status(404).send("The Page You are Looking For, Doesn't Exist")
})

//Listening
app.listen(PORT, ()=> console.log(`Basic server listening on port:${PORT}`))