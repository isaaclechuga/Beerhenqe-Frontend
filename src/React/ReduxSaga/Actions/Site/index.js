import {
  REQUEST_PUBLIC_BANNERS,
  REQUEST_PUBLIC_BEER_IMAGES,
  REQUEST_PUBLIC_BEERS,
  REQUEST_PUBLIC_FEATURED_BEERS,
  REQUEST_PUBLIC_FOOTER,
  REQUEST_PUBLIC_HOME,
  REQUEST_PUBLIC_NAVIGATION,
  REQUEST_PUBLIC_PAGE,
  REQUEST_PUBLIC_SEO,
} from "../../Constants";

export const requestPublicHome = (lang) => {
  return {
    type: REQUEST_PUBLIC_HOME,
    payload: { lang },
  };
};
export const requestPublicNavigation = (lang) => {
  return {
    type: REQUEST_PUBLIC_NAVIGATION,
    payload: { lang },
  };
};
export const requestPublicBeers = (lang) => {
  return {
    type: REQUEST_PUBLIC_BEERS,
    payload: { lang },
  };
};
export const requestPublicBeerImages = (lang, beerId) => {
  return {
    type: REQUEST_PUBLIC_BEER_IMAGES,
    payload: { lang, beerId },
  };
};
export const requestPublicFeaturedBeers = (lang) => {
  return {
    type: REQUEST_PUBLIC_FEATURED_BEERS,
    payload: { lang },
  };
};
export const requestPublicFooter = (lang) => {
  return {
    type: REQUEST_PUBLIC_FOOTER,
    payload: { lang },
  };
};
export const requestPublicBanners = (lang) => {
  return {
    type: REQUEST_PUBLIC_BANNERS,
    payload: { lang },
  };
};
export const requestPublicSeo = (lang) => {
  return {
    type: REQUEST_PUBLIC_SEO,
    payload: { lang },
  };
};
export const requestPublicPage = (lang, pageCode) => {
  return {
    type: REQUEST_PUBLIC_PAGE,
    payload: { lang, pageCode },
  };
};
