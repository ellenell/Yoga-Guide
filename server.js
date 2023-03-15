// EXPRESS BOILERPLATE
// DEPENDENCIES
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Yoga = require('./models/yoga-poses.js');
require('dotenv').config();
const methodOverride = require("method-override")
const yogaController = require('./controllers/yoga-poses.js')
const usersController = require('./controllers/users.js')
const session = require('express-session')


const SESSION_SECRET = process.env.SESSION_SECRET
console.log('Here is the session secret')
console.log(SESSION_SECRET)
// now we can set up our session with our secret 
app.use(session({
    secret: SESSION_SECRET, 
    resave: false, 
    saveUnitialized: false 
}))

// MIDDLEWARE
// DATABASE CONNECTION 
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// MONGO SUCCESS/ERROR
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

// CONTROLLER
app.use('/yoga-guide', yogaController)

app.use('/users', usersController)

// //INDEXS
// // HOMEPAGE
// app.get('/', (req, res) => {
//   Yoga.find({}, (error, allYoga) => {
//       res.render('index.ejs', {
//           yogas: allYoga,
//       });
//   });
// });


// // GUIDE
// app.get('/yoga-guide', (req, res) => {
//   Yoga.find({}, (error, allYoga) => {
//       res.render('types.ejs', {
//           yogas: allYoga,
//       });
//   });
// });


// // BEGINNER
// app.get('/yoga-guide/beginner/', (req, res) => {
//   Yoga.find({}, (error, allYoga) => {
//       res.render('beginner.ejs', {
//           yogas: allYoga,
//       });
//   });
// });

// // INTERMEDIATE
// app.get('/yoga-guide/intermediate/', (req, res) => {
//   Yoga.find({}, (error, allYoga) => {
//       res.render('intermediate.ejs', {
//           yogas: allYoga,
//       });
//   });
// });

// // ADVANCED
// app.get('/yoga-guide/advanced/', (req, res) => {
//   Yoga.find({}, (error, allYoga) => {
//       res.render('hard.ejs', {
//           yogas: allYoga,
//       });
//   });
// });

// // NEW
// app.get('/yoga-guide/new', (req, res) => {
//   res.render('new.ejs');
// });

// // YOGA TYPES
// // app.get('/yoga-guide/types', (req, res) => {
// //   res.render('types.ejs');
// // });

// // DELETE
// app.delete('/yoga-guide/:id', (req, res) => {
// // res.send('deleting....')
// Yoga.findByIdAndDelete(req.params.id, (err, deletedYoga) => {
//     // findIdAndDelete will delete a document with a given id
//     if(err) {
//         console.log(err)
//         res.send(err)

//     }
//     else {
//         // redirect to the index page if the delete is successful
//         console.log(deletedYoga)
//         res.redirect('/yoga-guide')

//     }
// })
// }
// )

// // app.delete('/yoga-guide/:id', async (req, res) => {
// //   try {
// //     const deletedYoga = await Post.findByIdAndDelete(req.params.id);
// //     res.redirect('/yoga-guide');
// //   } catch (err) {
// //     console.error(err);
// //     res.redirect('/yoga-guide');
// //   }
// // });



// // UPDATE
// app.put('/yoga-guide/:id', (req, res) => {
// // let's make out route actually update the model 
// console.log(req.body)

// Yoga.findByIdAndUpdate(req.params.id, req.body, { new: true,}, 
// (err, updatedYoga) => {
//   // findByIdAndUpdate updates a fruit with a given id
//   // the new option means we wait get the updated fruit returned 
//   // without this flag, we will get the fruit before it was modified

//   if(err) {
//     console.log(err)
//     res.send(err)
//   } else {
//     console.log(updatedYoga)
//     // redirect to the id page route 
//     res.redirect('/yoga-guide/' + req.params.id)
//   }

// })
// })


// // CREATE
// app.post('/yoga-guide/', (req, res)=>{
// //     // if(req.body.readyToEat === 'on'){ //if checked, req.body.readyToEat is set to 'on'
// //     //     req.body.readyToEat = true;
// //     // } else { //if not checked, req.body.readyToEat is undefined
// //     //     req.body.readyToEat = false;
// //     // }
  
//   Yoga.create(req.body, (error, createdYoga)=>{
//       if (error){
//         console.log(error);
//         res.send(error);
//       }
//       else{
//         res.redirect('/yoga-guide/')
//       }
//   });
// });

// // EDIT
// app.get('/yoga-guide/:id/edit', (req, res) => {
// // res.render('edit.ejs')
// Yoga.findById(req.params.id, (err, foundYoga) => {
// if(err) {
//   console.log(err)
//   res.send(err)
// } else {
//   // make the edit form show the existing data 
//   res.render('edit.ejs', {
//     yoga: foundYoga
//   })
// }
// })
// })

// // SHOW
// app.get('/yoga-guide/:id/', (req, res) => {
//   Yoga.findById(req.params.id, (err, foundYoga)=>{
//       res.render('show.ejs', {
//           yoga: foundYoga
//       });
//   });
// });




// PORT
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Yoga Server is listening on port ${PORT}`);
});