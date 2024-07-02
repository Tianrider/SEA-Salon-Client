import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaRegStar, FaStar } from "react-icons/fa";

interface ReviewProps {
    name: string;
    rating: number;
    comment: string;
}

const ReviewForm: React.FC<{ addReview: (review: ReviewProps) => void }> = ({
    addReview,
}) => {
    const [rating, setRating] = useState(0);
    const [name, setName] = useState("");
    const [comment, setComment] = useState("");

    const handleStarClick = (index: number) => {
        setRating(index + 1);
    };

    const handleSubmit = () => {
        if (name && comment && rating) {
            addReview({ name, rating, comment });
            setName("");
            setRating(0);
            setComment("");
        }
    };

    return (
        <div className="flex flex-col gap-5 md:gap-10 justify-center items-center w-[90vw] md:w-full">
            <h1 className="font-bold text-3xl md:my-0 my-5">
                Leave us a Review
            </h1>
            <input
                type="text"
                placeholder="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-3 w-[70vw] md:w-[50%] rounded-lg text-black"
            />
            <div id="star" className="flex gap-5 text-3xl">
                {[...Array(5)].map((_, index) => (
                    <span
                        key={index}
                        onClick={() => handleStarClick(index)}
                        className="cursor-pointer"
                    >
                        {index < rating ? (
                            <FaStar className="text-yellow-500" />
                        ) : (
                            <FaRegStar />
                        )}
                    </span>
                ))}
            </div>
            <textarea
                placeholder="comments"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="p-3 w-[70vw] md:w-[50%] rounded-lg text-black"
            ></textarea>
            <button
                onClick={handleSubmit}
                className="bg-red-500 font-bold p-3 px-8 rounded-lg"
            >
                Submit
            </button>
        </div>
    );
};

const ReviewList: React.FC<{ reviews: ReviewProps[] }> = ({ reviews }) => {
    return (
        <div className="flex flex-col gap-4 w-full items-center">
            <h1 className="font-bold text-3xl">What other people say</h1>
            <div className="h-96 flex flex-col gap-4 overflow-y-auto">
                {reviews != null ? (
                    reviews.map((review, index) => (
                        <div
                            key={index}
                            className="bg-gray-800 text-white p-5 rounded-lg w-full max-w-lg"
                        >
                            <h2 className="font-bold text-xl">{review.name}</h2>
                            <div className="flex gap-1 text-yellow-500">
                                {[...Array(5)].map((_, starIndex) => (
                                    <span key={starIndex}>
                                        {starIndex < review.rating ? (
                                            <FaStar />
                                        ) : (
                                            <FaRegStar />
                                        )}
                                    </span>
                                ))}
                            </div>
                            <p className="break-words">{review.comment}</p>
                        </div>
                    ))
                ) : (
                    <div className="text-white">No reviews yet</div>
                )}
            </div>
        </div>
    );
};

const Review: React.FC = () => {
    const [reviews, setReviews] = useState<ReviewProps[]>([]);

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/rating`
            );
            setReviews(response.data); // Assuming the API returns an object with a 'reviews' array
        } catch (error) {
            console.error("Error fetching reviews:", error);
        }
    };

    const addReview = async (review: ReviewProps) => {
        try {
            const response = await axios.post(
                import.meta.env.VITE_API_URL + "/rating",
                review
            );
            console.log("Review added:", response.data);

            // Update the reviews state to include the newly added review
            setReviews([...reviews, review]);
        } catch (error) {
            console.error("Error adding review:", error);
        }
    };

    return (
        <div className="bg-black text-white flex md:flex-row flex-col-reverse justify-between items-center md:items-start md:px-40 py-20">
            <ReviewForm addReview={addReview} />
            <ReviewList reviews={reviews} />
        </div>
    );
};

export default Review;
