const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const createError = require("http-errors");
const User = require("../models/user");
const Exercise = require("../models/exercise");
const uploadCloud = require("../config/cloudinary");

const { 
  isLoggedIn,
  isNotLoggedIn,
  validationLoggin,
} = require("../helpers/middlewares");


  // USER

  router.get("/profile/:id", isLoggedIn(), (req, res, next) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        res.status(400).json({message: "Specified id is not valid"});
        return;
    }
    User.findById(req.params.id)
    .then(userFound => {
      console.log(userFound, 'user found')
        res.status(200).json(userFound);
    })
    .catch(error => {
        res.json(error)
    })
})
//create exercise


router.post(
    "/profile/:id/add-video",
    isLoggedIn(),
    async (req, res, next) => {
     const { title, description, url, intensity, muscle } = req.body;
     const user = req.session.currentUser;
      try {
        const exerciseExist = await Exercise.findOne({ url: url });
        console.log(exerciseExist, 'existe el ejercicio');   
        if (exerciseExist !== null) {
          return next(createError(400))
        } else {

        const newExercise = await Exercise.create({
          title,
          description,
          url,
          intensity,
          muscle,
        });
        res.status(200).json(newExercise);
        const updatedUser = await User.findOneAndUpdate(
          user._id,
          { $addToSet: { exerciseCreated: newExercise } },
          { new: true }
        ) 
       req.session.currentUser = updatedUser;
       res.status(200).json(updatedUser);
        }
      } catch(error) {
        next(error)
      }
    }
  );  



//show all videos
router.get("/videos", isLoggedIn(), (req, res, next) => {
  
    Exercise.find()
    .then(allExercises => {
      res.status(200).json(allExercises)
    })
    .catch(error => {
      res.json(error)
    })
});

//video details
router.get("/videos/:id", isLoggedIn(), (req, res, next) => {
    
    Exercise.findById(req.params.id)
    .then(exerciseFound => {
        res.status(200).json(exerciseFound);
    })
    .catch(error => {
        res.json(error)
    })
})

//add to favourite
router.post("/videos/favourites/:id", isLoggedIn(), async (req, res, next) => {
  try {
    const exercise_id = req.params.id; console.log('ok id ejercicio',exercise_id )
    const user = req.session.currentUser; console.log('ok id usuario',user._id)
    const updatedUser = await User.findOneAndUpdate(
        user._id,
        { $addToSet: { favourite: exercise_id } },
        { new: true }
      ) 
     req.session.currentUser = updatedUser;
     res.status(200).json(updatedUser);
  } catch (error) {console.log(error)}
});

//get favourites list
router.get("/videos/favourites/:id", isLoggedIn(), (req, res, next) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)){
      res.status(400).json({message: "Specified id is not valid"});
      return;
  }
  User.findById(req.params.id).populate('favourite')
    .then(userFound => {
        res.status(200).json(userFound.favourite);
    })
    .catch(error => {
        res.json(error)
    })
})


//delete from favourite
router.delete("/videos/favourites/:id", isLoggedIn(), async (req, res, next) => {
  try {
    const exercise_id = req.params.id;
    const updatedUser = await User.findByIdAndUpdate(
      req.session.currentUser._id,
      { $pull: { favourite: exercise_id } },
      { new: true }
      ) 
     req.session.currentUser = updatedUser;
     res.status(200).json(updatedUser);
  } catch (error) {console.log(error)}
});

//edit exercise
router.put('/videos/:id/edit', (req, res, next)=>{
  if(!mongoose.Types.ObjectId.isValid(req.params.id)){
      res.status(400).json({message: "Specified id is not valid"});
      return;
  }

  Exercise.findByIdAndUpdate(req.params.id, req.body)
  .then (() => {
      res.status(200).json({message: `This exercise is updated successfully`})
  })
      .catch(error => {
      res.json(error)
  })    
})


//delete exercise
router.delete("/videos/:id", (req, res, next) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)){
      res.status(400).json({message: "Specified id is not valid"});
      return;
  }

  Exercise.findByIdAndRemove(req.params.id)
  .then(() => {
      res.status(200).json({message: `This exercise was removed successfully.`})
  })
  .catch(error => {
      res.json(error)
  })
});

//exercise done/completed by user
router.post("/videos/completed/:id", isLoggedIn(), async (req, res, next) => {
  try {
    const exercise_id = req.params.id; console.log('ok id ejercicio',exercise_id )
    const user = req.session.currentUser; console.log('ok id usuario',user._id)
    const updatedUser = await User.findOneAndUpdate(
        user._id,
        { $addToSet: { completed: exercise_id } },
        { new: true }
      ) 
     req.session.currentUser = updatedUser;
     res.status(200).json(updatedUser);
  } catch (error) {console.log(error)}
});



 //EDIT USER
router.put('/profile/:id/edit', isLoggedIn(), /*uploadCloud.single("imgPath"),*/ (req, res, next)=>{
  
  const { username , /*email,*/ weight, goal,  /*previousImg*/ } = req.body;
  //  if(!req.file || req.file === '' || req.file === undefined){
  //   imgPath = previousImg
  // }else{
  //   imgPath = req.file.url 
  // } 
  User.findByIdAndUpdate(req.params.id, {$set:{username, /*email,*/ weight, goal, /*imgPath: req.file.url*/}}, {new: true})
  .then (() => {
      res.status(200).json({message: `Your profile is updated successfully`})
  })
      .catch(error => {
      res.json(error)
  })    
})


  module.exports = router;