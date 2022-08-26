const Express = require('express');
const BodyParser = require('body-parser');
const ejs = require('ejs')

const app = Express();
app.use(Express.static(__dirname+"/public"));
app.use(BodyParser.urlencoded({extended:true}))
app.set('view engine','ejs');

app.get("/",(req,res) => {
    res.render('index');
})

app.listen(process.env.port||1234,()=>{
    console.log("Listening on port 1234");
})