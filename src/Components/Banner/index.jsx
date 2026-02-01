import { Box, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const Banner = ({ items }) => {
  if (!items || items.length === 0) return null;

  return (
    <Box sx={{ px: 2, mt: 6 }}>
      {items.map((banner) => (
        <Box
          key={banner.id}
          component={NavLink}
          to={banner.targetUrl}
          sx={{
            display: "block",
            textDecoration: "none",
            color: "#fff",
            borderRadius: 1,
            overflow: "hidden",
            mb: 4,

            background: banner.imageUrl
              ? `linear-gradient(
                  rgba(0,0,0,0.7),
                  rgba(0,0,0,0.9)
                ), url(${banner.imageUrl})`
              : "linear-gradient(135deg, #1a0000, #000)",

            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Box
            sx={{
              py: 6,
              px: 4,
              textAlign: "center",
            }}
          >
            <Typography
              sx={{
                fontWeight: 900,
                letterSpacing: "2px",
                color: "#d4af37",
                mb: 1,
              }}
            >
              {banner.title}
            </Typography>

            <Typography
              sx={{
                fontSize: "0.95rem",
                color: "#f5f5f5",
              }}
            >
              {banner.subTitle}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default Banner;
