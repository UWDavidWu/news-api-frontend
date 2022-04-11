import { Button } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const BackToTop = ({ show }) => {
  return (
    <div>
      {show && (
        <Button
          className="back-to-top"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          sx={{
            display: "flex",
            position: "fixed",
            right: "20px",
            bottom: "0px",
          }}
          variant="contained"
          size="large"
        >
          <KeyboardArrowUpIcon fontSize="large" />
        </Button>
      )}
    </div>
  );
};

export default BackToTop;
