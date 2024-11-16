const User = require("../models/user");

module.exports.singupPage = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      console.log(registeredUser);

      req.flash("success", "Welcome to Wanderlust");
      res.redirect("/listings");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

module.exports.renderSignupPage = (req, res) => {
  res.render("users/signup.ejs");
};

module.exports.renderLoginPage = (req, res) => {
  res.render("users/login.ejs");
};

module.exports.loginPage = (req, res) => {
  req.flash("success", "Welcome to Wanderlust!"); // Set custom success message
  const redirectUrl = res.locals.redirectUrl || "/listings"; // Use saved URL or default
  res.redirect(redirectUrl);
};

module.exports.logoutSession = (req, res) => {
  req.logout((error) => {
    if (error) {
      return next(error);
    } else {
      req.flash("success", "You are logged out now!!");
      res.redirect("/listings");
    }
  });
};
