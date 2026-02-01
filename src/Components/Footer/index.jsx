import { Box, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const Footer = ({ items }) => {
  if (!items || items.length === 0) return null;

  return (
    <Box
      component="footer"
      sx={{
        mt: 8,
        px: 3,
        py: 4,
        background: "linear-gradient(180deg, #000, #0b0b0b)",
        borderTop: "1px solid #1f1f1f",
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 4,
          flexWrap: "wrap",
          mb: 3,
        }}
      >
        {items.map((item) => (
          <NavLink
            key={item.id}
            to={item.url}
            style={{
              textDecoration: "none",
              color: "#bdbdbd",
              fontSize: "0.9rem",
              letterSpacing: "1px",
            }}
          >
            {item.label}
          </NavLink>
        ))}
      </Box>

      <Typography
        sx={{
          fontSize: "0.75rem",
          color: "#666",
          letterSpacing: "1px",
        }}
      >
        © {new Date().getFullYear()} Beerhenqe. Todos los derechos reservados.
      </Typography>
    </Box>
  );
};

export default Footer;
