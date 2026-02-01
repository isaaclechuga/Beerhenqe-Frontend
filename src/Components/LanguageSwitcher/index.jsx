import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

const MotionBox = motion.create(Box);

const languages = [
  { code: "es", label: "ES" },
  { code: "en", label: "EN" },
];

const LanguageSwitcher = ({ current = "es", onChange }) => {
  return (
    <MotionBox
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      sx={{
        display: "flex",
        gap: 1,
        alignItems: "center",
        border: "1px solid #1f1f1f",
        backgroundColor: "#000",
        px: 1.5,
        py: 0.5,
      }}
    >
      {languages.map((lang) => (
        <Typography
          key={lang.code}
          onClick={() => onChange(lang.code)}
          sx={{
            cursor: "pointer",
            fontWeight: 900,
            letterSpacing: "1px",
            fontSize: "0.8rem",
            px: 1,
            py: 0.3,
            color: current === lang.code ? "#d4af37" : "#777",
            borderBottom:
              current === lang.code
                ? "2px solid #d4af37"
                : "2px solid transparent",
            "&:hover": {
              color: "#f5f5f5",
            },
          }}
        >
          {lang.label}
        </Typography>
      ))}
    </MotionBox>
  );
};

export default LanguageSwitcher;
