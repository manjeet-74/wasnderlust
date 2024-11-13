const Listing = require("../models/listing");
const Review = require("../models/reviews");

module.exports.getReviews = (req, res) => {
  let { id } = req.params;
  res.redirect(`/listings/${id}`);
};
module.exports.postReviews = async (req, res, next) => {
  try {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success", "New review created!");
    res.redirect(`/listings/${listing._id}`);
  } catch (err) {
    next(err);
  }
};
module.exports.destroyReview = async (req, res, next) => {
  let { id, reviewId } = req.params;

  await Listing.findByIdAndUpdate(id, { $pull: { reviews: { reviewId } } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Review deleted!");

  res.redirect(`/listings/${id}`);
};
