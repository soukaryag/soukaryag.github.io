var app = require('express')();

app.get('/',function(request,response){
   response.sendFile(__dirname+'/index.html');
});

app.listen('8000');