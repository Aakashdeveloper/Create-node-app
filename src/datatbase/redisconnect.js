const express = require('express');
const redis = require('redis');
const app = express();

const client = redis.createClient({
    host: '127.0.0.1',
    port: 6379
})

client.set('visits',0)

app.get('/',(req,res) => {
    client.get('visits',(err,visits) => {
        res.send('Number of visit '+ visits)
        client.set('visits',parseInt(visits)+1)
    })
    
})

app.listen(6700,() => {
    console.log(`Server running on port 6700`)
})