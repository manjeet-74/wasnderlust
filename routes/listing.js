const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

const listingController = require("../controllers/listings.js");

router
  .route("/")
  .get(wrapAsync(listingController.index)) //index route
  .post(
    //create route
    isLoggedIn,
    validateListing,
    wrapAsync(listingController.createListing)
  );

//NEW ROUTE
router.get("/new", isLoggedIn, listingController.renderNewForm);

router
  .route("/:id")
  //show route
  .get(wrapAsync(listingController.showListing))
  //update route
  .put(
    isLoggedIn,
    validateListing,
    isOwner,
    wrapAsync(listingController.updateListing)
  )
  .delete(
    //delete
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.deleteListing)
  );

//EDIT ROUTE
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

module.exports = router;
