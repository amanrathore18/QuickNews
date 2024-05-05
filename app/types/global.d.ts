export {}; // Ensure TypeScript treats this as a module

declare global {
  // Define the 'Category' interface (as existing)
  interface Category {
    id: string; // Unique identifier for the category
    label: string; // Name of the category
    assets: Record<string, any>; // Key-value pairs of assets
  }

  // Declare a global variable for 'Category' (as existing)
  var Category: Category;

  // Define the 'NewsArticle' interface
  interface NewsArticle {
    url: string; // Unique URL for the news article
    title: string; // Title of the news article
    publishedAt: string; // Publication date
    urlToImage?: string; // Optional image URL
    description?: string; // Optional description
  }

  // Optional: Define a type for an array of news articles
  type NewsArticleArray = NewsArticle[]; // Represents a list of news articles
  type NewsArticle = NewsArticle; // Represents a list of news articles
}
