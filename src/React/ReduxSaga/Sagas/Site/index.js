import { call, put, takeLatest } from "redux-saga/effects";
import {
  REQUEST_PUBLIC_HOME,
  RESPONSE_PUBLIC_HOME,
  REQUEST_PUBLIC_NAVIGATION,
  RESPONSE_PUBLIC_NAVIGATION,
  REQUEST_PUBLIC_BEERS,
  RESPONSE_PUBLIC_BEERS,
  REQUEST_PUBLIC_BEER_IMAGES,
  RESPONSE_PUBLIC_BEER_IMAGES,
  REQUEST_PUBLIC_FEATURED_BEERS,
  RESPONSE_PUBLIC_FEATURED_BEERS,
  REQUEST_PUBLIC_FOOTER,
  RESPONSE_PUBLIC_FOOTER,
  REQUEST_PUBLIC_BANNERS,
  RESPONSE_PUBLIC_BANNERS,
  REQUEST_PUBLIC_SEO,
  RESPONSE_PUBLIC_SEO,
  REQUEST_PUBLIC_PAGE,
  RESPONSE_PUBLIC_PAGE,
  SITE_DATA_FETCH_FAILED,
} from "../../Constants";
import Site from "../../../../Libraries/Site";

function* handlePublicHome(action) {
  try {
    const response = yield call(Site.getHome, action.payload.lang);

    yield put({
      type: RESPONSE_PUBLIC_HOME,
      payload: { response },
    });
  } catch (error) {
    yield put({
      type: SITE_DATA_FETCH_FAILED,
      payload: { error, source: "HOME" },
    });
  }
}

function* handlePublicNavigation(action) {
  try {
    const response = yield call(Site.getNavigation, action.payload.lang);

    yield put({
      type: RESPONSE_PUBLIC_NAVIGATION,
      payload: { response },
    });
  } catch (error) {
    yield put({
      type: SITE_DATA_FETCH_FAILED,
      payload: { error, source: "NAVIGATION" },
    });
  }
}

function* handlePublicBeers(action) {
  try {
    const response = yield call(Site.getBeers, action.payload.lang);

    yield put({
      type: RESPONSE_PUBLIC_BEERS,
      payload: { response },
    });
  } catch (error) {
    yield put({
      type: SITE_DATA_FETCH_FAILED,
      payload: { error, source: "BEERS" },
    });
  }
}

function* handlePublicBeerImages(action) {
  try {
    const response = yield call(
      Site.getBeerImages,
      action.payload.lang,
      action.payload.beerId
    );

    yield put({
      type: RESPONSE_PUBLIC_BEER_IMAGES,
      payload: { response },
    });
  } catch (error) {
    yield put({
      type: SITE_DATA_FETCH_FAILED,
      payload: { error, source: "BEER_IMAGES" },
    });
  }
}

function* handlePublicFeaturedBeers(action) {
  try {
    const response = yield call(Site.getFeaturedBeers, action.payload.lang);

    yield put({
      type: RESPONSE_PUBLIC_FEATURED_BEERS,
      payload: { response },
    });
  } catch (error) {
    yield put({
      type: SITE_DATA_FETCH_FAILED,
      payload: { error, source: "FEATURED_BEERS" },
    });
  }
}

function* handlePublicFooter(action) {
  try {
    const response = yield call(Site.getFooter, action.payload.lang);

    yield put({
      type: RESPONSE_PUBLIC_FOOTER,
      payload: { response },
    });
  } catch (error) {
    yield put({
      type: SITE_DATA_FETCH_FAILED,
      payload: { error, source: "FOOTER" },
    });
  }
}

function* handlePublicBanners(action) {
  try {
    const response = yield call(Site.getBanners, action.payload.lang);

    yield put({
      type: RESPONSE_PUBLIC_BANNERS,
      payload: { response },
    });
  } catch (error) {
    yield put({
      type: SITE_DATA_FETCH_FAILED,
      payload: { error, source: "BANNERS" },
    });
  }
}

function* handlePublicSeo(action) {
  try {
    const response = yield call(Site.getSeo, action.payload.lang);

    yield put({
      type: RESPONSE_PUBLIC_SEO,
      payload: { response },
    });
  } catch (error) {
    yield put({
      type: SITE_DATA_FETCH_FAILED,
      payload: { error, source: "SEO" },
    });
  }
}

function* handlePublicPage(action) {
  try {
    const response = yield call(
      Site.getPage,
      action.payload.lang,
      action.payload.pageCode
    );

    yield put({
      type: RESPONSE_PUBLIC_PAGE,
      payload: { response },
    });
  } catch (error) {
    yield put({
      type: SITE_DATA_FETCH_FAILED,
      payload: { error, source: "PAGE" },
    });
  }
}

export function* watchPublicHome() {
  yield takeLatest(REQUEST_PUBLIC_HOME, handlePublicHome);
}

export function* watchPublicNavigation() {
  yield takeLatest(REQUEST_PUBLIC_NAVIGATION, handlePublicNavigation);
}

export function* watchPublicBeers() {
  yield takeLatest(REQUEST_PUBLIC_BEERS, handlePublicBeers);
}

export function* watchPublicBeerImages() {
  yield takeLatest(REQUEST_PUBLIC_BEER_IMAGES, handlePublicBeerImages);
}

export function* watchPublicFeaturedBeers() {
  yield takeLatest(REQUEST_PUBLIC_FEATURED_BEERS, handlePublicFeaturedBeers);
}

export function* watchPublicFooter() {
  yield takeLatest(REQUEST_PUBLIC_FOOTER, handlePublicFooter);
}

export function* watchPublicBanners() {
  yield takeLatest(REQUEST_PUBLIC_BANNERS, handlePublicBanners);
}

export function* watchPublicSeo() {
  yield takeLatest(REQUEST_PUBLIC_SEO, handlePublicSeo);
}

export function* watchPublicPage() {
  yield takeLatest(REQUEST_PUBLIC_PAGE, handlePublicPage);
}
