import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

export default function TestMetal() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "radial-gradient(circle at top, #1a0000, #000)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          mb: 4,
          fontWeight: 900,
          letterSpacing: "4px",
          textTransform: "uppercase",
        }}
      >
        Beerhenqe
      </Typography>

      <MotionBox
        whileHover={{
          scale: 1.15,
          boxShadow: "0 0 30px #8b0000",
        }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400 }}
        sx={{
          px: 5,
          py: 2,
          border: "2px solid #d4af37",
          cursor: "pointer",
          fontWeight: 800,
          letterSpacing: "3px",
          background: "linear-gradient(180deg, #8b0000 0%, #3a0000 100%)",
        }}
      >
        COMPRAR CERVEZA
      </MotionBox>
    </Box>
  );
}
