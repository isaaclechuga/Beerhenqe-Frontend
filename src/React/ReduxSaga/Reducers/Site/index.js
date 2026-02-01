import {
  RESPONSE_PUBLIC_HOME,
  RESPONSE_PUBLIC_NAVIGATION,
  RESPONSE_PUBLIC_BEERS,
  RESPONSE_PUBLIC_BEER_IMAGES,
  RESPONSE_PUBLIC_FEATURED_BEERS,
  RESPONSE_PUBLIC_FOOTER,
  RESPONSE_PUBLIC_BANNERS,
  RESPONSE_PUBLIC_SEO,
  RESPONSE_PUBLIC_PAGE,
} from "../../Constants";

const initialState = {
  home: null,
  navigation: [],
  beers: [],
  beerImages: [],
  featuredBeers: [],
  footer: [],
  banners: [],
  seo: [],
  page: null,

  error: false,
};

export default function site(state = initialState, action) {
  switch (action.type) {
    case RESPONSE_PUBLIC_HOME: {
      const res = action.payload.response.publicHome;

      if (res.code === 200) {
        return {
          ...state,
          home: res.items[0],
          error: false,
        };
      }

      return { ...state, error: true };
    }

    case RESPONSE_PUBLIC_NAVIGATION: {
      const res = action.payload.response.publicNavigation;

      if (res.code === 200) {
        return {
          ...state,
          navigation: res.items,
          error: false,
        };
      }

      return { ...state, error: true };
    }

    case RESPONSE_PUBLIC_BEERS: {
      const res = action.payload.response.publicBeers;

      if (res.code === 200) {
        return {
          ...state,
          beers: res.items,
          error: false,
        };
      }

      return { ...state, error: true };
    }

    case RESPONSE_PUBLIC_BEER_IMAGES: {
      const res = action.payload.response.publicBeerImages;

      if (res.code === 200) {
        const newItems = res.items;

        return {
          ...state,
          beerImages: [
            ...state.beerImages.filter(
              (img) =>
                !newItems.some(
                  (newImg) =>
                    newImg.beerId === img.beerId &&
                    newImg.orderIndex === img.orderIndex,
                ),
            ),
            ...newItems,
          ],
          error: false,
        };
      }

      return { ...state, error: true };
    }

    case RESPONSE_PUBLIC_FEATURED_BEERS: {
      const res = action.payload.response.publicFeaturedBeers;

      if (res.code === 200) {
        return {
          ...state,
          featuredBeers: res.items,
          error: false,
        };
      }

      return { ...state, error: true };
    }

    case RESPONSE_PUBLIC_FOOTER: {
      const res = action.payload.response.publicFooter;

      if (res.code === 200) {
        return {
          ...state,
          footer: res.items,
          error: false,
        };
      }

      return { ...state, error: true };
    }

    case RESPONSE_PUBLIC_BANNERS: {
      const res = action.payload.response.publicBanners;

      if (res.code === 200) {
        return {
          ...state,
          banners: res.items,
          error: false,
        };
      }

      return { ...state, error: true };
    }

    case RESPONSE_PUBLIC_SEO: {
      const res = action.payload.response.publicSeo;

      if (res.code === 200) {
        return {
          ...state,
          seo: res.items,
          error: false,
        };
      }

      return { ...state, error: true };
    }

    case RESPONSE_PUBLIC_PAGE: {
      const res = action.payload.response.publicPage;

      if (res.code === 200) {
        return {
          ...state,
          page: res.items[0],
          error: false,
        };
      }

      return { ...state, error: true };
    }

    default:
      return state;
  }
}
