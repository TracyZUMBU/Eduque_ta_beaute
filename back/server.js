const express = require ('express');
const app = express ();
const router = require ('./routes/index')
const bodyParser = require ('body-parser')
const connection = require('./conf')
var cors = require('cors')
const morgan = require('morgan') 
const port = process.env.PORT || 4000

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   }); 
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
