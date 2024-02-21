import { RatingTypeWithId } from "src/models/tool-rating";

export function getAverageRating(ratings: RatingTypeWithId[]) {
    if (ratings.length === 0) return 0;
    const total = ratings.reduce((acc, rating) => acc + rating.rating, 0);
    return total / ratings.length;
}