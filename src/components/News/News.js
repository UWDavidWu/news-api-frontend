import { useState } from "react";
import {
  Skeleton,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  CardHeader,
  Typography,
} from "@mui/material";

const News = ({ $ }) => {
  const [isloaded, setIsloaded] = useState(false);

  return (
    <Card
      sx={{
        ["@media (min-width:768px)"]: {
          ":hover": {
            transition: "all 0.2s ease-in-out",
            transform: "translateY(-10px)",
            boxShadow: 10,
          },
        },
      }}
    >
      <CardActionArea
        sx={{
          ["@media (min-width:768px)"]: {
            ":hover img": {
              transform: "scale(1.1)",
              filter: "brightness(1)",
            },
          },
        }}
        href={$.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Skeleton
          sx={{ display: isloaded ? "none" : "block" }}
          animation="wave"
          variant="rectangular"
          height={400}
        />
        <div className="img-container" style={{ overflow: "hidden" }}>
          <CardMedia
            sx={{
              ["@media (min-width:768px)"]: {
                filter: "brightness(80%)",
              },
              display: isloaded ? "block" : "none",
              transition: "all 0.2s ease-in-out",
            }}
            onLoad={() => setIsloaded(true)}
            component="img"
            height={300}
            image={
              $.urlToImage ||
              "https://thumbs.dreamstime.com/b/simple-illustration-image-unavailable-icon-image-unavailable-icon-123950183.jpg"
            }
          />
        </div>
        <CardHeader
          title={$.source.name}
          subheader={$.publishedAt.slice(0, -1).split("T")[0]}
        />

        <CardContent>
          <Typography gutterBottom variant="h6">
            {$.title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default News;
