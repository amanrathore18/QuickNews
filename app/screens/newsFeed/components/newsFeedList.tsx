import CommonStyles from 'app/theme/common.styles';
import {publicInstance} from 'app/utils/axios';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  View,
} from 'react-native';
import useSWR from 'swr';
import NewsCard from './newsCard'; // Import the NewsCard component

// Fetcher function to fetch data from the news API
const fetcher = (url: string) => publicInstance.get(url).then(res => res.data);

const NewsFeedList: React.FC = () => {
  const NEWS_API_URL = 'https://newsapi.org/v2/top-headlines';
  const PAGE_SIZE = 10; // Number of articles per page

  // State for pagination and loading
  const [page, setPage] = useState<number>(1);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false); // Pull-to-refresh state
  const [articles, setArticles] = useState<NewsArticle[]>([]);

  // Dynamic SWR key with page and page size
  const swrKey = `${NEWS_API_URL}?country=us&apiKey=${process.env.NEWS_API_KEY}&page=${page}&pageSize=${PAGE_SIZE}`;

  const {isLoading, mutate, error} = useSWR(swrKey, fetcher, {
    onSuccess: (fetchedData: {articles: NewsArticle[]}) => {
      setIsLoadingMore(false);
      if (page === 1) {
        setArticles(fetchedData.articles); // Initial data
      } else {
        setArticles(prevArticles => [...prevArticles, ...fetchedData.articles]); // Append for pagination
      }
    },
    onError: () => {
      // Reset loading state if there's an error
      setIsLoadingMore(false);
    },
  });

  const loadMore = () => {
    if (!isLoadingMore) {
      setIsLoadingMore(true);
      setPage(prevPage => prevPage + 1); // Increment page to load more data
    }
  };

  const onRefresh = () => {
    setRefreshing(true); // Set refreshing state to true
    setPage(1); // Reset page to 1
    mutate(); // Refresh the SWR data
    setArticles([]); // Clear articles to force re-fetch
    setRefreshing(false); // Reset refreshing state
  };

  if (isLoading && articles.length === 0) {
    return (
      <View style={CommonStyles.container}>
        {[0, 1, 2, 3, 4, 5].map(() => {
          return <NewsCard loading />;
        })}
      </View>
    );
  }

  // Do not display the error message if articles are already in state
  // Just ignore the error in such cases to avoid showing unnecessary error messages to users
  const shouldShowError = error && articles.length === 0;

  if (shouldShowError) {
    return (
      <View style={CommonStyles.centeredView}>
        <Text>Error fetching news: {error.message}</Text>
      </View>
    );
  }

  return (
    <View style={CommonStyles.container}>
      <FlatList
        data={articles} // List of news articles
        keyExtractor={(item, index) => `${item.url}-${index}`} // Ensure unique keys
        renderItem={({item}) => <NewsCard article={item} />} // Use NewsCard for rendering
        onEndReached={loadMore} // Trigger pagination
        onEndReachedThreshold={0.5} // Trigger at halfway down the list
        refreshControl={
          <RefreshControl
            refreshing={refreshing} // Pull-to-refresh control
            onRefresh={onRefresh} // Function to call on refresh
            colors={['#0000ff']} // Color of the refresh spinner
          />
        }
        ListFooterComponent={
          // Only show the loading indicator if loading more and there's space for more articles
          isLoadingMore && articles.length > 0 ? (
            <ActivityIndicator size="small" color="#0000ff" /> // Small indicator for pagination
          ) : null
        }
      />
    </View>
  );
};

export default NewsFeedList; // Export the NewsFeedList component
