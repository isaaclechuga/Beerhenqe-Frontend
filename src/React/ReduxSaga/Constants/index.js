export const ENVIROMENT_URL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_STAGE === "prod"
      ? "https://www.zermatusa.com/graphql"
      : import.meta.env.VITE_STAGE === "qa"
        ? "http://www.zermatusa.biz/graphql"
        : "http://10.10.1.16:8082/graphql"
    : import.meta.env.VITE_STAGE === "dev"
      ? "https://localhost:44323/graphql"
      : import.meta.env.VITE_STAGE === "qa"
        ? "http://www.zermatusa.biz/graphql"
        : "https://localhost:44323/graphql";

// errores
export const DATA_FETCH_FAILED = "DATA_FETCH_FAILED";

// pagina
export const REQUEST_PUBLIC_HOME = "REQUEST_PUBLIC_HOME";
export const RESPONSE_PUBLIC_HOME = "RESPONSE_PUBLIC_HOME";
export const REQUEST_PUBLIC_NAVIGATION = "REQUEST_PUBLIC_NAVIGATION";
export const RESPONSE_PUBLIC_NAVIGATION = "RESPONSE_PUBLIC_NAVIGATION";
export const REQUEST_PUBLIC_BEERS = "REQUEST_PUBLIC_BEERS";
export const RESPONSE_PUBLIC_BEERS = "RESPONSE_PUBLIC_BEERS";
export const REQUEST_PUBLIC_BEER_IMAGES = "REQUEST_PUBLIC_BEER_IMAGES";
export const RESPONSE_PUBLIC_BEER_IMAGES = "RESPONSE_PUBLIC_BEER_IMAGES";
export const REQUEST_PUBLIC_FEATURED_BEERS = "REQUEST_PUBLIC_FEATURED_BEERS";
export const RESPONSE_PUBLIC_FEATURED_BEERS = "RESPONSE_PUBLIC_FEATURED_BEERS";
export const REQUEST_PUBLIC_FOOTER = "REQUEST_PUBLIC_FOOTER";
export const RESPONSE_PUBLIC_FOOTER = "RESPONSE_PUBLIC_FOOTER";
export const REQUEST_PUBLIC_BANNERS = "REQUEST_PUBLIC_BANNERS";
export const RESPONSE_PUBLIC_BANNERS = "RESPONSE_PUBLIC_BANNERS";
export const REQUEST_PUBLIC_SEO = "REQUEST_PUBLIC_SEO";
export const RESPONSE_PUBLIC_SEO = "RESPONSE_PUBLIC_SEO";
export const REQUEST_PUBLIC_PAGE = "REQUEST_PUBLIC_PAGE";
export const RESPONSE_PUBLIC_PAGE = "RESPONSE_PUBLIC_PAGE";
export const SITE_DATA_FETCH_FAILED = "SITE_DATA_FETCH_FAILED";
