const express = require("express");
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

router.post(
    "/profile/add-video",
    isLoggedIn(),
    async (req, res, next) => {
      const { title, description, url, intensity, muscle } = req.body;
  
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
        res.json(newExercise);
      }
        // res.redirect("all-events");
      } catch (error) {
        next(error);
      }
      // User.findOneAndUpdate(
      //   { _id: req.session.currentUserInfo._id },
      //   { $push: { exercise: exercise.id } },
      //   { new: true }
      // ).then((user) => console.log("The exercise was created!"));
    }
  );  

  //EDIT USER

  // router.get("/profile/edit", isLoggedIn(), uploadCloud.single("imageUrl"), async (req, res, next) => {
  //   await User.findOne({ _id: req.session.currentUserInfo._id })
  //     .then((user) => {
  //       res.render("user/edit-user", { user });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // });
  
  // const imgPath = req.file.url;

  // router.post("/user/edit", withAuth, async (req, res, next) => {
  //   const {
  //     fullname,
  //     password,
  //     repeatPassword,
  //     user,
  //     email,
  //     description,
  //   } = req.body;
  
  //   try {
  //     if (password.length < 8) {
  //       res.render("user/edit", {
  //         errorMessage: "Your password should have at least 8 characters",
  //       });
  //       return;
  //     } else if (password !== repeatPassword) {
  //       res.render("user/edit", {
  //         errorMessage: "Your passwords are not matching",
  //       });
  //       return;
  //     } else if (fullname.length === "") {
  //       res.render("user/edit", {
  //         errorMessage: "Your match will need to know how to call you ;)",
  //       });
  //       return;
  //     } else if (description.length < 10) {
  //       res.render("user/edit", {
  //         errorMessage: "Tell your future match a bit more about yourself!",
  //       });
  //       return;
  //     }
  //     const salt = await bcrypt.genSaltSync(10);
  //     const hashPass = await bcrypt.hashSync(password, salt);
  
  //     await User.findByIdAndUpdate(
  //       req.query.user_id,
  //       {
  //         $set: {
  //           fullname,
  //           password: hashPass,
  //           repeatPassword,
  //           email,
  //           description,
  //         },
  //       },
  //       { new: true }
  //     );
  
  //     res.redirect("/myprofile");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // });
  


  module.exports = router;