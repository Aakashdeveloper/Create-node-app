import express from 'express';
const app = express();
const port = 7600;

// Static file path
app.use(express.static(__dirname+'/public'));
// Html or view file
app.set('views','./src/views');
// template engine
app.set('view engine','ejs');

app.get('/',(req,res) => {
    res.send('<h1>On home page</h1>')
});

app.get('/about',(req,res) => {
    res.send('<h1>On about Page</h1>')
});


app.listen(port,(err)=>{
    console.log(`server is running on port ${port}`)
});
