import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

const MotionBox = motion.create(Box);

const Hero = ({ data }) => {
  if (!data) return null;

  return (
    <MotionBox
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      sx={{
        py: 10,
        px: 2,
        textAlign: "center",

        background: "radial-gradient(circle at top, #1a0000, #000)",

        color: "#f5f5f5",
      }}
    >
      <Typography
        variant="h2"
        sx={{
          fontWeight: 900,
          color: "#f5f5f5",
        }}
      >
        {data.title}
      </Typography>

      <Typography
        variant="h5"
        sx={{
          mt: 2,
          color: "#d4af37",
        }}
      >
        {data.subtitle}
      </Typography>

      <Typography
        sx={{
          mt: 3,
          maxWidth: 700,
          mx: "auto",
          color: "#cccccc",
        }}
      >
        {data.body}
      </Typography>
    </MotionBox>
  );
};

export default Hero;
