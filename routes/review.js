const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const Review = require("../models/reviews.js");
const {
  validateReview,
  isLoggedIn,
  isOwner,
  isReviewAuthor,
} = require("../middleware.js");

const reviewsController = require("../controllers/reviews.js");

// REVIEWS
//get review route
router.get("/", reviewsController.getReviews);

//POST REVIEW ROUTE
router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(reviewsController.postReviews)
);

//DELETE REVIEW ROUTE
router.delete(
  "/:reviewId",
  isReviewAuthor,
  wrapAsync(reviewsController.destroyReview)
);

module.exports = router;
