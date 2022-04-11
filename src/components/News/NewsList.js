import News from "./News";

import { useEffect } from "react";
import { Skeleton, Grid } from "@mui/material";
import { useInView } from "react-intersection-observer";

const NewsList = ({ news, ready, incrementPage }) => {
  const { ref, inView } = useInView();

  useEffect(() => {
    incrementPage();
  }, [inView]);

  return (
    <div style={{ paddingTop: "100px" }}>
      <Grid container spacing={4} justify="center">
        {ready ? (
          <>
            {[...Array(12)].map(() => (
              <Grid item xs={12} sm={6} lg={4}>
                <Skeleton animation="wave" variant="rectangular" height={300} />
                <Skeleton animation="wave" variant="rectangular" height={75} />
                <Skeleton animation="wave" variant="rectangular" height={125} />
              </Grid>
            ))}
          </>
        ) : (
          <>
            {news.map(($, index) => {
              return (
                <Grid
                  ref={news.length === index + 1 ? ref : null}
                  item
                  xs={12}
                  sm={6}
                  lg={4}
                >
                  <News key={index} $={$} />
                </Grid>
              );
            })}
          </>
        )}
      </Grid>
    </div>
  );
};

export default NewsList;
