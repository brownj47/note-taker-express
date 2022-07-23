const express = require('express')
const path = require('path')
const fs = require('fs')

const PORT = process.env.PORT || 3000


const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'))

app.get('/', (req, res) => {
    console.log(__dirname)
    res.sendFile(path.join(__dirname, 'public/index.html'))
})
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'))
})

app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'db/db.json'))
})
app.post('/api/notes', (req, res) => {
    console.log(req.body)

    fs.readFile('./db/db.json','utf8', (err, data) => {
        if (err){
            console.log(err)
        }
        const notes = data
        console.log(notes)
    })
})


app.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`)
})