import { RatingTypeWithId } from "src/models/tool-rating";

export function getAverageRating(ratings: RatingTypeWithId[]) {
    const total = ratings.reduce((acc, rating) => acc + rating.rating, 0);
    return total / ratings.length;
}