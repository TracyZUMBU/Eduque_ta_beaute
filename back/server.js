const express = require ('express');
const app = express ();
const router = require ('./routes/index')
const bodyParser = require ('body-parser')
const connection = require('./conf')

const port = 8000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use("/user", router.user)
app.use("/admin", router.admin)

app.get('/', (res,req) => {
    res.send('Hello')
})

app.listen(port, () => {
    console.log (`listening on port ${port}`)
})