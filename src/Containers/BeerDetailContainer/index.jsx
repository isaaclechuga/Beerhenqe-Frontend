import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";

import {
  requestPublicNavigation,
  requestPublicFooter,
  requestPublicBeerImages,
  requestPublicBeers,
} from "../../React/ReduxSaga/Actions/Site";

import Navigation from "../../Components/Navigation";
import Footer from "../../Components/Footer";

const BeerDetailContainer = () => {
  const { id } = useParams();
  const beerId = Number(id);
  const dispatch = useDispatch();

  const { beers, beerImages, navigation, footer, language } = useSelector(
    (state) => state.site,
  );

  const beer = beers.find((b) => b.id === beerId);

  useEffect(() => {
    const lang = language || "es";

    dispatch(requestPublicNavigation(lang));
    dispatch(requestPublicFooter(lang));

    if (!beers?.length) {
      dispatch(requestPublicBeers(lang));
    }

    if (beerId) {
      dispatch(requestPublicBeerImages(lang, beerId));
    }
  }, [dispatch, language, beerId]);

  if (!beers?.length) {
    return (
      <>
        <Navigation navigation={navigation} />
        <Box sx={{ px: 4, mt: 6 }}>
          <Typography>Cargando cerveza...</Typography>
        </Box>
        <Footer items={footer} />
      </>
    );
  }

  if (!beer) {
    return (
      <>
        <Navigation navigation={navigation} />
        <Box sx={{ px: 4, mt: 6 }}>
          <Typography>Cerveza no encontrada</Typography>
        </Box>
        <Footer items={footer} />
      </>
    );
  }

  const images = beerImages.filter(
    (img) => img.beerId === beerId && img.isPrimary,
  );

  const mainImage =
    images.find((img) =>
      language === "en" ? img.imageUrlEn : img.imageUrlEs,
    ) || images[0];

  const imageUrl =
    language === "en" ? mainImage?.imageUrlEn : mainImage?.imageUrlEs;

  return (
    <>
      <Navigation navigation={navigation} />

      <Box sx={{ px: 4, mt: 6 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 6,
            alignItems: "start",
          }}
        >
          <Box>
            {imageUrl ? (
              <Box
                component="img"
                src={imageUrl}
                alt={beer.name}
                sx={{
                  width: "100%",
                  maxWidth: 420,
                  objectFit: "contain",
                }}
              />
            ) : (
              <Box
                sx={{
                  width: 420,
                  height: 420,
                  backgroundColor: "#f5f5f5",
                }}
              />
            )}
          </Box>

          <Box>
            <Typography
              sx={{
                fontWeight: 900,
                letterSpacing: "2px",
                textTransform: "uppercase",
                fontSize: "1.6rem",
              }}
            >
              {beer.name}
            </Typography>

            <Typography
              sx={{
                mt: 1,
                fontWeight: 700,
                color: "#b8860b",
              }}
            >
              {beer.abv}% ABV &nbsp;•&nbsp; {beer.ibu} IBU
            </Typography>

            <Typography sx={{ mt: 3, lineHeight: 1.6 }}>
              {beer.description}
            </Typography>

            <Box sx={{ mt: 5 }}>
              <Box
                sx={{
                  display: "inline-block",
                  px: 4,
                  py: 1.5,
                  backgroundColor: "#000",
                  color: "#fff",
                  fontWeight: 800,
                  cursor: "pointer",
                }}
              >
                Agregar al carrito
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Footer items={footer} />
    </>
  );
};

export default BeerDetailContainer;
