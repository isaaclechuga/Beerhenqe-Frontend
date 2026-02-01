import { Box } from "@mui/material";
import { useHistory } from "react-router-dom";
import BeerCard from "../BeerCard";

const FeaturedBeers = ({ featuredBeers, beers }) => {
  const history = useHistory();

  if (!featuredBeers?.length || !beers?.length) return null;

  return (
    <Box sx={{ px: 3, mt: 6 }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(2, 1fr)",
            sm: "repeat(3, 1fr)",
            md: "repeat(4, 1fr)",
          },
          gap: 4,
        }}
      >
        {featuredBeers.map((featured) => {
          const fullBeer = beers.find((b) => b.id === featured.id);
          if (!fullBeer) return null;

          return (
            <BeerCard
              key={featured.id}
              beer={fullBeer}
              imageUrl={featured.imageUrl}
              onClick={() => history.push(`/beer/${featured.id}`)}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default FeaturedBeers;
