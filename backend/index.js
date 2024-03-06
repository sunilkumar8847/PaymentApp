//index.js
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json())

const rootRouter = require('./routes/index'); 
// const app = express();

app.use('/api/v1',rootRouter);  //all the requests that are coming '/api/v1 ' go to 'rootRouter'
app.listen(3000, ()=>{
    console.log("I am listening");
});

