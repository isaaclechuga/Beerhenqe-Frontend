import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

const MotionBox = motion.create(Box);

const Header = ({ home, children }) => {
  if (!home) return null;

  return (
    <MotionBox
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      sx={{
        py: 3,
        px: 2,
        position: "relative",
        background: "linear-gradient(180deg, #0b0b0b, #000)",
        borderBottom: "1px solid #1f1f1f",
        textAlign: "center",
      }}
    >
      <Box sx={{ position: "absolute", top: 12, right: 16 }}>{children}</Box>

      <Typography
        variant="h6"
        sx={{
          fontWeight: 800,
          letterSpacing: "2px",
          color: "#d4af37",
        }}
      >
        {home.title}
      </Typography>

      <Typography
        sx={{
          mt: 0.5,
          fontSize: "0.9rem",
          color: "#f5f5f5",
        }}
      >
        {home.subtitle}
      </Typography>

      <Typography
        sx={{
          mt: 1,
          fontSize: "0.8rem",
          color: "#bdbdbd",
        }}
      >
        {home.body}
      </Typography>
    </MotionBox>
  );
};

export default Header;
