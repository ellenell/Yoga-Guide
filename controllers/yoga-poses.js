const express = require('express');
const router = express.Router()
const Yoga = require('../models/yoga-poses.js');

// custom middleware to require authentication on routes 
const authRequired = (req, res, next) => {
	console.log(req.session.currentUser)
	if (req.session.currentUser) {
		// a user is signed in 
		next() 
		// next is part of express
		// it does what it says 
		// i.e., go on to the next thing
	} else {
		// if there is no user 
		res.redirect('/users/register/')
		// res.redirect('/users/signin')
	}
}

//INDEXS
// HOMEPAGE
router.get('/home/', authRequired, (req, res) => {
  Yoga.find({}, (error, allYoga) => {
      res.render('index.ejs', {
          yogas: allYoga,
      });
  });
});


// GUIDE
router.get('/', authRequired, (req, res) => {
  Yoga.find({}, (error, allYoga) => {
      res.render('types.ejs', {
          yogas: allYoga,
      });
  });
});


// BEGINNER
router.get('/beginner/', (req, res) => {
  Yoga.find({}, (error, allYoga) => {
      res.render('beginner.ejs', {
          yogas: allYoga,
      });
  });
});

// INTERMEDIATE
router.get('/intermediate/', (req, res) => {
  Yoga.find({}, (error, allYoga) => {
      res.render('intermediate.ejs', {
          yogas: allYoga,
      });
  });
});

// ADVANCED
router.get('/advanced/', (req, res) => {
  Yoga.find({}, (error, allYoga) => {
      res.render('hard.ejs', {
          yogas: allYoga,
      });
  });
});

// NEW
router.get('/new', (req, res) => {
  res.render('new.ejs');
});

// YOGA TYPES
// app.get('/yoga-guide/types', (req, res) => {
//   res.render('types.ejs');
// });

// DELETE
router.delete('/:id', (req, res) => {
// res.send('deleting....')
Yoga.findByIdAndDelete(req.params.id, (err, deletedYoga) => {
    // findIdAndDelete will delete a document with a given id
    if(err) {
        console.log(err)
        res.send(err)

    }
    else {
        // redirect to the index page if the delete is successful
        console.log(deletedYoga)
        res.redirect('/yoga-guide')

    }
})
}
)

// app.delete('/yoga-guide/:id', async (req, res) => {
//   try {
//     const deletedYoga = await Post.findByIdAndDelete(req.params.id);
//     res.redirect('/yoga-guide');
//   } catch (err) {
//     console.error(err);
//     res.redirect('/yoga-guide');
//   }
// });



// UPDATE
router.put('/:id', (req, res) => {
// let's make out route actually update the model 
console.log(req.body)

Yoga.findByIdAndUpdate(req.params.id, req.body, { new: true,}, 
(err, updatedYoga) => {
  // findByIdAndUpdate updates a fruit with a given id
  // the new option means we wait get the updated fruit returned 
  // without this flag, we will get the fruit before it was modified

  if(err) {
    console.log(err)
    res.send(err)
  } else {
    console.log(updatedYoga)
    // redirect to the id page route 
    res.redirect('/yoga-guide/' + req.params.id)
  }

})
})


// CREATE
router.post('/', (req, res)=>{
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
        res.redirect('/yoga-guide/')
      }
  });
});

// EDIT
router.get('/:id/edit', authRequired, (req, res) => {
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
router.get('/:id/', (req, res) => {
  Yoga.findById(req.params.id, (err, foundYoga)=>{
      res.render('show.ejs', {
          yoga: foundYoga
      });
  });
});


module.exports = router