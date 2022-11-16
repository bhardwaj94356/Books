import express from "express"
import mysql from "mysql"
import cors from 'cors'

const app = express()

const db = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "5677",
    database : "test"
})

app.use(express.json())
app.use(cors())

app.get("/", (req,res) => {
    res.json("Hello, this is the backend")
})

app.get("/books", (req,res) => {
    const q = "select * from books"
    db.query(q,(err,data) => {
        if(err) return res.json("Oops, there seems to be an error in backend connection")
        return res.json(data)
    })
})

app.post("/books", (req,res) => {
    const q = "insert into books (`title`,`description`,`cover`,`price`) values (?)"
    const values = [
        req.body.title,
        req.body.description,
        req.body.cover,
        req.body.price,
    ]

    db.query(q, [values], (err, data) => {
        if(err) return res.json("Opps, there is problem")
        return res.json("Book added successfully")
    })
})

app.delete("/books/:id", (req,res) => {
    const bookId = req.params.id;
    const q = "delete from books where id = ?"

    db.query(q, [bookId], (err,data) => {
        if(err) return res.json("Opps, there is problem")
        return res.json("Book deleted successfully")
    })
})

app.put("/books/:id", (req,res) => {
    const bookId = req.params.id;
    const q = "update books set `title` = ?, `description` = ?, `cover` = ?, `price` = ? where id = ?"

    const values = [
        req.body.title,
        req.body.description,
        req.body.cover,
        req.body.price,
    ]

    db.query(q, [...values, bookId], (err,data) => {
        if(err) return res.json("Opps, there is problem")
        return res.json("Book Updated successfully")
    })
})

app.listen(8000, ()=>{
    console.log("Connected to backend!")
})