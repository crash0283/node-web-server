const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine','hbs');


// app.use((req,res,next)=>{
//     var now = new Date().toString();
//     var log = `${now}: ${req.method}: ${req.url}`;
//     console.log(log);
//     fs.appendFile('server.log',log + '\n', (err)=>{
//         if(err) {
//             console.log('Unable to append to server.log');
//         }
//     });
//     next();
// });

// app.use((req,res,next)=> {
//     res.render('maintenance.hbs',{
//         beBack: "We'll be back",
//         underMaintenance: "Site Under Maintenance"
//     })
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('currentYear',()=>{
    return new Date().getFullYear();

});

hbs.registerHelper('screamIt',(text)=>{
   return text.toUpperCase(); 
});

app.get('/',(request,response)=>{
    response.render('home.hbs',{
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to the Home Page!'
    })
});

app.get('/about',(request,response)=>{
    response.render('about.hbs',{
        pageTitle: 'About Page',

    });
});

app.get('/projects',(req,res)=> {
    res.render('projects.hbs',{
        pageTitle: 'Projects Page'
    });
})

app.get('/bad',(request,response)=>{
    response.send({
        errorMessage: 'Unable to fetch request!'
    });
})

app.listen(port,()=>{
    console.log(`Server is up at ${port}`);
});