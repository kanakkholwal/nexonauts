
  // Example code to count words in the article content
export function countWords(articleContent) {
  articleContent = articleContent.replace(/<[^>]+>/g, ''); // Remove HTML tags
  articleContent = articleContent.replace(/[^\w\s]/gi, ''); // Remove unwanted characters
  var words = articleContent.trim().split(/\s+/); // Split into an array of words
  return words.length;
}
// Example code to calculate the read time
export function calculateReadTime(articleContent, averageReadingSpeed  = 200) {
  var wordCount = countWords(articleContent);
  var readTimeMinutes = Math.ceil(wordCount / averageReadingSpeed);
  return readTimeMinutes;
}


export const checkEnvironment = () => {
  let base_url =
    process.env.NEXT_PUBLIC_ENV === "development"
      ? "http://localhost:3000"
      : process.env.NEXT_PUBLIC_WEBSITE_URL;

  return base_url;
};