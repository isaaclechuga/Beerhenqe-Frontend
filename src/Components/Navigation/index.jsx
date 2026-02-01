import { Box } from "@mui/material";
import { NavLink } from "react-router-dom";

const Navigation = ({ navigation }) => {
  if (!navigation || navigation.length === 0) return null;

  return (
    <Box
      sx={{
        display: "flex",
        gap: 4,
        px: 3,
        py: 2,
        backgroundColor: "#000",
        borderBottom: "1px solid #1f1f1f",
      }}
    >
      {navigation.map((item) => (
        <NavLink
          key={item.id}
          to={item.url}
          style={({ isActive }) => ({
            textDecoration: "none",
            fontWeight: 700,
            letterSpacing: "1px",
            color: isActive ? "#d4af37" : "#f5f5f5",
          })}
        >
          {item.label}
        </NavLink>
      ))}
    </Box>
  );
};

export default Navigation;
