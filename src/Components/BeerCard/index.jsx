import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

const MotionBox = motion.create(Box);

const BeerCard = ({ beer, imageUrl, onClick }) => {
  if (!beer) return null;

  return (
    <MotionBox
      onClick={onClick}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
      sx={{
        cursor: "pointer",
      }}
    >
      <Box
        sx={{
          width: "100%",
          aspectRatio: "1 / 1",
          backgroundColor: "#f5f5f5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {imageUrl ? (
          <Box
            component="img"
            src={imageUrl}
            alt={beer.name}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              transition: "filter 0.25s ease",
              "&:hover": {
                filter: "brightness(1.08)",
              },
            }}
          />
        ) : (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              backgroundColor: "#eaeaea",
            }}
          />
        )}
      </Box>

      <Box sx={{ mt: 1.5, textAlign: "center" }}>
        <Typography
          sx={{
            fontWeight: 900,
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            fontSize: "0.9rem",
            color: "#111",
          }}
        >
          {beer.name}
        </Typography>

        <Typography
          sx={{
            fontSize: "0.75rem",
            fontWeight: 700,
            letterSpacing: "0.8px",
            color: "#b8860b",
            mt: 0.5,
          }}
        >
          {beer.abv}% ABV &nbsp;•&nbsp; {beer.ibu} IBU
        </Typography>

        <Typography
          sx={{
            fontSize: "0.78rem",
            color: "#555",
            lineHeight: 1.4,
            mt: 0.8,
          }}
        >
          {beer.description}
        </Typography>
      </Box>
    </MotionBox>
  );
};

export default BeerCard;
