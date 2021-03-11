const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const path = require('path');


const app = express();

//bodyparser middleware
app.use(bodyParser.urlencoded({ extended: true }));


//static folder
app.use(express.static(path.join(__dirname, 'public')));

//signup route
app.post('/signup', (Req, res) => {
const{ Navn, email, postnummer} = Req.body;


//make sure fields are filled 

if(!Navn || !email || !postnummer){
    res.redirect('/failed.html');
    return;
}

// Construct req data 

const data = {
    members: [
        {
            email_address: email, 
            status: 'subscribed', 
            merge_fields: {
                FNAME: Navn,
                POSTNUMMER: postnummer,
            }
        }
    ]
};

const postData = JSON.stringify(data);

 

const options = {
    url: 'https://us1.api.mailchimp.com/3.0/lists/bb90272f39',
    method: 'POST',
    headers: {
        Authorization:'auth 9effddbb368b96eb63afb49f093dfa28-us1'
    }, 
    body: postData
};

request(options, (err, response, body) =>{
if (err) {
    res.redirect('/failed.html');
} else{
    if (response.statusCode === 200) {
        res.redirect('/succes.html')
    } else {
        res.redirect('/failed.html')
    }
}
});


});




const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on ${PORT}`));

