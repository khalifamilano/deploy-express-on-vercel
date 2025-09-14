import express from 'express'
const app = express()
import morgan from 'morgan'
import cors from 'cors'

const notes = [
    {
      "id": "1",
      "important": true,
      "nama": "test"
    },
    {
      "id": "2",
      "important": true,
      "nama": "test1"
    },
    {
      "id": "3",
      "important": true,
      "nama": "test2"
    },
    {
      "id": "4",
      "important": true,
      "nama": "test3"
    },
    {
      "id": "f57e",
      "important": true,
      "nama": "test4"
    },
    {
      "id": "5b03",
      "important": true,
      "nama": "test5"
    }
  ]

const generateID = notes.length+1

const requestLogger = (req,res,next) =>{
  console.log('Method : ', req.method)
  console.log('Path : ', req.path)
  console.log('body : ', req.body)
  next()
}
const unknownEndPoint = (req,res) =>{
  res.status(404).send({error:"unknown endpoint"})
}
morgan.token("body",(req,res)=>{
  const body = req.body
  console.log(body)
  return JSON.stringify(body)
})
app.use(express.json())
app.use(cors())
app.use(morgan(`:method :url :status :response-time ms :body`))
app.use(express.static('public/dist'))

app.post("/api/notes",(req,res)=>{
  const body = req.body
  console.log(body)
  notes.concat({
    "id" : generateID.toString(),
    "important" : body.important,
    "name" : body.name,
  })
  res.json({
    "id" : generateID.toString(),
    "important" : body.important,
    "name" : body.name,
  })
})

app.get("/api/notes",(req,res)=>{
  res.json(notes)
})

app.get("/api/notes/:id",(req,res)=>{
  const getID = req.params.id
  const note = notes.find(note=>note.id==getID)
  res.json(note)
})

app.delete("/api/notes/:id",(req,res)=>{
  const getID = req.params.id
  const deletedNotes = notes.filter(note=>note.id!=getID)
  res.status(204).end()
})

app.use(unknownEndPoint)

const PORT = 3002
app.listen(PORT,()=>{
  console.log("testttt")
})


export default app