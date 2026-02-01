const showHideLoader = (status) => {
  switch (status) {
    case 1:
      document.getElementById("loaderComponent").className = "beerhenqeLoader";
      break;
    default:
      document.getElementById("loaderComponent").className =
        "beerhenqeLoader active";
  }
};

export { showHideLoader };
