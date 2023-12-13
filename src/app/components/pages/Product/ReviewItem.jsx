// ReviewItem.js
import React from "react";
import { selectUser } from "../../../redux-store/authenticationSlice";
import { useSelector } from "react-redux";
import ReportReviewButton from "./ReportReviewButton";
import DeleteReviewButton from "./DeleteReviewButton";

const ReviewItem = ({
  review,
  index,
  generateStars,
  currentReviews,
  onDeleteReview,
}) => {
  const user = useSelector(selectUser);
  const { firstname, lastname, date, rating, title, comment, id, email } =
    review;
  const isCurrentUserReview = user?.username === email;

  return (
    <div>
      <li className="flex gap-5 md:gap-10">
        <div className="space-y-1 min-w-[120px]">
          <div className="text-customDarkGrey font-semibold">
            {firstname} {lastname}
          </div>
          <div className="text-customMediumGrey">{date}</div>
          <ReportReviewButton reviewId={id} />
        </div>
        <div className="space-y-1 pt-1">
          <div className="flex">{generateStars(rating)}</div>
          <div>
            <b className="text-customDark">{title}</b>
          </div>
          <div>{comment}</div>
          {isCurrentUserReview && (
            <DeleteReviewButton reviewId={id} onDeleteReview={onDeleteReview} />
          )}
        </div>
      </li>
      {index !== currentReviews.length - 1 && <hr className="my-6" />}
    </div>
  );
};

export default ReviewItem;
