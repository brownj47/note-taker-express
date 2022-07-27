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
        const notes = JSON.parse(data)
        const newNote = {
            title:req.body.title, 
            text: req.body.text, 
            id: notes.length+1
        }
        notes.push(newNote)
        console.log(notes)
        fs.writeFile('./db/db.json', JSON.stringify(notes), err => console.log(err))
    })
    res.json({ok:true})
})

app.delete('/api/notes/:id', (req, res)=> {
    console.log(req.params.id)
    const clickedID = Number(req.params.id)
    fs.readFile('./db/db.json','utf8', (err, data) => {
        if (err){
            console.log(err)
        }
        const notes = JSON.parse(data)
        const notesFiltered = notes.filter(function(note){
            return note.id !== clickedID
        })
        console.log(notesFiltered)
        fs.writeFile('./db/db.json', JSON.stringify(notesFiltered), err => console.log(err))
    })
    res.json({ok:true})
})


app.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`)
})