// EXPRESS BOILERPLATE
// DEPENDENCIES
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Yoga = require('./models/yoga-poses.js');
require('dotenv').config();
const methodOverride = require("method-override")
// MIDDLEWARE

// DATABASE CONNECTION 

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Mongo error/success
const db = mongoose.connection
db.on('error', (err) => console.log(`${err.message} MongoDB Not Running!`))
db.on('connected', () => console.log('mongo connected'))
db.on('disconnected', () => console.log('mongo disconnected'))

// MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));
//tells express to try to match requests with files in the directory called 'public'

app.use(methodOverride('_method'));
// method-override 


//INDEX
app.get('/yoga-guide', (req, res) => {
  Yoga.find({}, (error, allYoga) => {
      res.render('index.ejs', {
          yogas: allYoga,
      });
  });

  // res.render('index.ejs')
});

// NEW
app.get('/yoga-guide/new', (req, res) => {
  res.render('new.ejs');
});

// //DELETE
// app.delete('/products/:id', (req, res) => {
// // res.send('deleting....')
// Product.findByIdAndDelete(req.params.id, (err, deletedProduct) => {
//     // findIdAndDelete will delete a document with a given id
//     if(err) {
//         console.log(err)
//         res.send(err)

//     }
//     else {
//         // redirect to the index page if the delete is successful
//         console.log(deletedProduct)
//         res.redirect('/products')

//     }
// })
// }
// )

//UPDATE
// app.put('/products/:id', (req, res) => {
// let's make out route actually update the model 
// console.log(req.body)
// if (req.body.readyToEat === "on") {
//   req.body.readyToEat = true
// } else {
//   req.body.readyToEat = false
// }

// Product.findByIdAndUpdate(req.params.id, req.body, { new: true,}, 
// (err, updatedProduct) => {
//   // findByIdAndUpdate updates a fruit with a given id
//   // the new option means we wait get the updated fruit returned 
//   // without this flag, we will get the fruit before it was modified

//   if(err) {
//     console.log(err)
//     res.send(err)
//   } else {
//     console.log(updatedProduct)
//     // redirect to the index route 
//     res.redirect('/products/' + req.params.id)
//   }

// })
// })






// CREATE
app.post('/yoga-guide', (req, res)=>{
//     // if(req.body.readyToEat === 'on'){ //if checked, req.body.readyToEat is set to 'on'
//     //     req.body.readyToEat = true;
//     // } else { //if not checked, req.body.readyToEat is undefined
//     //     req.body.readyToEat = false;
//     // }
  
  Yoga.create(req.body, (error, createdYoga)=>{
      if (error){
        console.log(error);
        res.send(error);
      }
      else{
        res.redirect('/yoga-guide')
      }
  });
});

// EDIT
app.get('/yoga-guide/:id/edit', (req, res) => {
// res.render('edit.ejs')
Yoga.findById(req.params.id, (err, foundYoga) => {
if(err) {
  console.log(err)
  res.send(err)
} else {
  // make the edit form show the existing data 
  res.render('edit.ejs', {
    yoga: foundYoga
  })
}
})
})

// SHOW
app.get('/yoga-guide/:id', (req, res) => {
  Yoga.findById(req.params.id, (err, foundYoga)=>{
      res.render('show.ejs', {
          yoga: foundYoga
      });
  });
});


// BUY BUTTON
// user will click and then be redirected to the show page 
// app.put('/products/:id/buy', (req, res) => {


// Product.findByIdAndUpdate(req.params.id, 
// (err, boughtProduct) => {
//   if(err) {
//     console.log(err)
//     res.send(err)
//   } else {
//     console.log(boughtProduct) 
//     boughtProduct.quantity -= 10
  

// boughtProduct.save((err, boughtProduct) => {
//   if(err) {
//     console.log(err)
//     res.send(err)
//   } else {
//     res.redirect('/products')
//   }
//   })
// }
// })
// })







// PORT
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Yoga Server is listening on port ${PORT}`);
});