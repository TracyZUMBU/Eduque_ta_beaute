const express = require ('express');
const app = express ();
const router = require ('./routes/index')
const bodyParser = require ('body-parser')
const connection = require('./conf')
var cors = require('cors')
const morgan = require('morgan')
const port = 8000


app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use("/user", router.user)
app.use("/admin", router.admin)
app.use("/register", router.register)



app.listen(port, () => {
    console.log (`listening on port ${port}`)
})
