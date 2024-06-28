const Router = require("express");
const passport = require("passport");
const {
  home,
  formPage,
  addBlog,
  Upload,
  deleteBlog,
  editPage,
  update,
  signPage,
  addUser,
  logOut,
  loginPage,
} = require("../controllers/controller");
const { isAuth } = require("../middleware/middleware");


const router = Router();

router.get("/", isAuth, home);
router.post("/login", passport.authenticate('local', { successRedirect: "/", failureRedirect: "/login" }));
router.get("/login", loginPage);
router.post("/sign", addUser);
router.get("/signPage", signPage);
router.get("/logOut", logOut);
router.get("/formPage", formPage);
router.post("/addBlog", Upload, addBlog);
router.get("/delete", deleteBlog);
router.get("/editPage", editPage);
router.post("/editData", Upload, update);
  
module.exports = router;
