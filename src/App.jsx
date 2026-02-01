import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import HomeContainer from "./Containers/HomeContainer";
import BeersContainer from "./Containers/BeersContainer";
import BeerDetailContainer from "./Containers/BeerDetailContainer";

function App() {
  return (
    <Router basename="/">
      <Switch>
        <Route exact path="/" component={HomeContainer} />
        <Route path="/beers" component={BeersContainer} />

        <Route path="/beer/:id" component={BeerDetailContainer} />
        {/*}<Route path="/terms" component={TermsContainer} />
        <Route path="/checkout" component={CheckoutContainer} />*/}
      </Switch>
    </Router>
  );
}

export default App;
