import Searchbar from "./Searchbar";

import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Tooltip,
  CircularProgress,
} from "@mui/material";

import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import NewspaperIcon from "@mui/icons-material/Newspaper";

const Appbar = ({ onButtonClick, setQuery, preferMode, loading }) => {
  return (
    <Box sx={{ flexGrow: 1, display: "block" }}>
      <AppBar position="fixed">
        <Toolbar>
          {loading ? (
            <CircularProgress sx={{ mr: 1 }} color="inherit" size={24} />
          ) : (
            <NewspaperIcon sx={{ fontSize: "2rem", paddingRight: "10px" }} />
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Headlines
          </Typography>

          <Tooltip title={preferMode ? "Light Mode" : "Dark Mode"}>
            <IconButton sx={{ ml: 1 }} onClick={onButtonClick} color="inherit">
              {preferMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Tooltip>

          <Searchbar setQuery={setQuery} />

          {/* <Avatar>OP</Avatar> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Appbar;
