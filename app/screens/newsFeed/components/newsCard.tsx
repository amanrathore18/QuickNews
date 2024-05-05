import Skeleton from 'app/components/skeleton';
import {COLORS} from 'app/theme/theme.style';
import moment from 'moment'; // Library for date formatting
import React from 'react'; // React to create components
import {Image, StyleSheet, Text, View} from 'react-native'; // React Native components

// Define the NewsCard component props
interface NewsCardProps {
  article?: NewsArticle; // The news article data
  loading?: boolean;
}

// The NewsCard component renders a single news article card
const NewsCard: React.FC<NewsCardProps> = props => {
  const {article, loading} = props;

  if (loading) {
    return (
      <View style={styles.card}>
        <Skeleton style={styles.cardImage} />

        <View style={styles.cardContent}>
          <Skeleton height={18} width={'80%'} />
          <Skeleton height={18} width={'60%'} style={styles.mt5} />
          <Skeleton height={16} width={'20%'} style={styles.mt12} />
          <Skeleton height={13} width={'90%'} style={styles.mt12} />
          <Skeleton height={13} width={'90%'} style={styles.mt8} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      {article?.urlToImage ? (
        // Add padding to the whole card including the image
        <View style={styles.cardImageContainer}>
          <Image source={{uri: article.urlToImage}} style={styles.cardImage} />
        </View>
      ) : (
        <View style={styles.imagePlaceholder} />
      )}
      <View style={styles.cardContent}>
        <Text style={styles.title}>{article?.title}</Text>
        <Text style={styles.publishedAt}>
          {moment(article?.publishedAt).format('MMMM Do, YYYY')}
        </Text>
        {article?.description && (
          <Text style={styles.description}>
            {article.description.length > 100
              ? article.description.substring(0, 100) + '...'
              : article.description}
          </Text>
        )}
      </View>
    </View>
  );
};

// Styles for the NewsCard component
const styles = StyleSheet.create({
  card: {
    margin: 10, // Outer margin
    borderWidth: 1, // Border thickness
    borderRadius: 10, // Increased border radius for smoother corners
    overflow: 'hidden', // Prevent content from spilling out
    backgroundColor: COLORS.white, // Background color for the card
    elevation: 3, // Shadow for Android
    shadowColor: COLORS.black, // Shadow color for iOS
    shadowOffset: {width: 0, height: 2}, // Shadow offset
    shadowOpacity: 0.25, // Shadow opacity
    shadowRadius: 3.84, // Shadow radius
    padding: 10, // Added padding to the entire card
  },
  cardImageContainer: {
    borderRadius: 10, // Same border radius as the card
    overflow: 'hidden', // Ensure no overflow
  },
  cardImage: {
    width: '100%',
    height: 180,
  },
  cardContent: {
    padding: 10, // Padding around the content
  },
  title: {
    fontSize: 18, // Increased font size for title
    fontWeight: 'bold', // Bold text
  },
  publishedAt: {
    fontSize: 14, // Slightly smaller font for date
    color: COLORS.darkGray, // Grey color
    marginTop: 5, // Margin above the date
    marginBottom: 10, // Margin below the date
  },
  description: {
    fontSize: 14, // Font size for description
    color: COLORS.darkerGray, // Dark grey color
  },
  imagePlaceholder: {
    width: '100%', // Full width
    height: 180, // Same height as the image
    backgroundColor: COLORS.mediumLightGray, // Light grey background for the placeholder
  },
  mt5: {
    marginTop: 5,
  },
  mt12: {
    marginTop: 12,
  },
  mt8: {
    marginTop: 8,
  },
});

export default NewsCard; // Export the NewsCard component
