import NewsList from "./components/News/NewsList";
import Appbar from "./components/UI/Appbar";
import BackToTop from "./components/UI/BackToTop";
import useNewsSearch from "./components/News/UseNewsSearch";

import { useState, useEffect, useCallback, useMemo } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Alert, Snackbar, CssBaseline, useMediaQuery } from "@mui/material";
import { debounce } from "lodash";

function App() {
  const [atBottom, setAtBottom] = useState(false);
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    //determine if at bottom of the page
    Math.ceil(window.innerHeight + window.scrollY) >=
    document.documentElement.scrollHeight
      ? setAtBottom(true)
      : setAtBottom(false);
    //determine if scrolled at least 400 to show back-to-top button
    window.scrollY > 400 ? setShowScroll(true) : setShowScroll(false);
  };

  //determine if user prefers dark mode
  const [preferMode, setPreferMode] = useState(
    useMediaQuery("(prefers-color-scheme: dark)")
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: preferMode ? "dark" : "light",
        },
      }),
    [preferMode]
  );

  const [query, setQuery] = useState("");
  const [first, setFirst] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    setPageNumber(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setFirst(true);
  }, [query]);

  const { loading, error, news, hasMore } = useNewsSearch(query, pageNumber);

  const handleQueryChange = useCallback(debounce(setQuery, 1000), []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Appbar
        onButtonClick={() => setPreferMode(!preferMode)}
        setQuery={handleQueryChange}
        preferMode={preferMode}
        loading={loading}
      />

      <NewsList
        news={news}
        ready={loading && first} //loading skeleton when news is empty
        incrementPage={() => {
          if (!loading && hasMore) {
            setFirst(false);
            setPageNumber(pageNumber + 1);
          }
        }} //infinite scrolling
      />

      <BackToTop show={showScroll} />
      <div>
        <br />
        {!hasMore && atBottom && (
          <Snackbar open="open">
            <Alert severity="info" sx={{}}>
              You've reach the end.
            </Alert>
          </Snackbar>
        )}
      </div>
      <div>
        <br />
        {error && (
          <Snackbar open="open">
            <Alert severity="info" sx={{}}>
              Errors.
            </Alert>
          </Snackbar>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
