import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  requestPublicHome,
  requestPublicNavigation,
  requestPublicBeers,
  requestPublicFeaturedBeers,
  requestPublicFooter,
  requestPublicBanners,
} from "../../React/ReduxSaga/Actions/Site";

// UI Components
import Header from "../../Components/Header";
import Navigation from "../../Components/Navigation";
import Hero from "../../Components/Hero";
import Banner from "../../Components/Banner";
import FeaturedBeers from "../../Components/FeaturedBeers";
import Footer from "../../Components/Footer";
import LanguageSwitcher from "../../Components/LanguageSwitcher";

const HomeContainer = () => {
  const dispatch = useDispatch();

  const { home, navigation, beers, featuredBeers, banners, footer, language } =
    useSelector((state) => state.site);

  const changeLanguage = (lang) => {
    dispatch(requestPublicHome(lang));
    dispatch(requestPublicNavigation(lang));
    dispatch(requestPublicBeers(lang));
    dispatch(requestPublicFeaturedBeers(lang));
    dispatch(requestPublicBanners(lang));
    dispatch(requestPublicFooter(lang));
  };

  useEffect(() => {
    changeLanguage(language || "es");
  }, []);

  return (
    <>
      <Header home={home}>
        <LanguageSwitcher
          current={language || "es"}
          onChange={changeLanguage}
        />
      </Header>

      <Navigation navigation={navigation} />

      <Hero data={home} />

      <Banner items={banners} />

      <FeaturedBeers featuredBeers={featuredBeers} beers={beers} />

      <Footer items={footer} />
    </>
  );
};

export default HomeContainer;
