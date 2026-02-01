import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";

import {
  requestPublicBeers,
  requestPublicNavigation,
  requestPublicFooter,
  requestPublicBeerImages,
} from "../../React/ReduxSaga/Actions/Site";

import Navigation from "../../Components/Navigation";
import BeerCard from "../../Components/BeerCard";
import Footer from "../../Components/Footer";

const BeersContainer = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { beers, beerImages, navigation, footer, language } = useSelector(
    (state) => state.site,
  );

  useEffect(() => {
    const lang = language || "es";

    dispatch(requestPublicNavigation(lang));
    dispatch(requestPublicBeers(lang));
    dispatch(requestPublicFooter(lang));
  }, [dispatch, language]);

  useEffect(() => {
    if (!beers?.length) return;

    const lang = language || "es";

    beers.forEach((beer) => {
      dispatch(requestPublicBeerImages(lang, beer.id));
    });
  }, [beers, dispatch, language]);

  return (
    <>
      <Navigation navigation={navigation} />

      <Box sx={{ px: 3, mt: 6 }}>
        <Typography
          sx={{
            fontWeight: 900,
            letterSpacing: "3px",
            textTransform: "uppercase",
            mb: 4,
          }}
        >
          Cervezas
        </Typography>

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
          {beers?.map((beer) => {
            const image = beerImages?.find(
              (img) => img.beerId === beer.id && img.isPrimary,
            );

            return (
              <BeerCard
                key={beer.id}
                beer={beer}
                imageUrl={
                  language === "en"
                    ? (image?.imageUrlEn ?? null)
                    : (image?.imageUrlEs ?? null)
                }
                onClick={() => history.push(`/beer/${beer.id}`)}
              />
            );
          })}
        </Box>
      </Box>

      <Footer items={footer} />
    </>
  );
};

export default BeersContainer;
