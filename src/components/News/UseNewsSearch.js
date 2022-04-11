import { useEffect, useState } from "react";
import axios from "axios";

export default function useNewsSearch(query, pageNumber) {
  const [news, setNews] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  //console log news on news change
  useEffect(() => {
    console.log(news);
  }, [news]);

  //set news to be empty array when query changes
  useEffect(() => {
    setNews([]);
  }, [query]);

  useEffect(() => {
    setLoading(true);
    setError(false);

    const route = query
      ? `https://news-api-david.herokuapp.com/everything/${query}/${pageNumber}`
      : `https://news-api-david.herokuapp.com/headlines/ca/${pageNumber}`;
    axios
      .get(route)

      .then((res) => {
        setNews((previousnews) => [...previousnews, ...res.data["articles"]]);
        setLoading(false);
        setHasMore(
          res.data["totalResults"] - pageNumber * 12 > 0 && pageNumber < 8
        );
      })
      .catch((e) => setError(true));
  }, [query, pageNumber]);

  return { loading, error, news, hasMore };
}
