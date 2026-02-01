import { all, fork } from "redux-saga/effects";
import {
  watchPublicBanners,
  watchPublicBeerImages,
  watchPublicBeers,
  watchPublicFeaturedBeers,
  watchPublicFooter,
  watchPublicHome,
  watchPublicNavigation,
  watchPublicPage,
  watchPublicSeo,
} from "./Site";

export default function* rootSaga() {
  yield all([
    fork(watchPublicHome),
    fork(watchPublicNavigation),
    fork(watchPublicBeers),
    fork(watchPublicBeerImages),
    fork(watchPublicFeaturedBeers),
    fork(watchPublicFooter),
    fork(watchPublicBanners),
    fork(watchPublicSeo),
    fork(watchPublicPage),
  ]);
}
