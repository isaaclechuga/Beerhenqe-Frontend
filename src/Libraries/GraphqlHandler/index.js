const graphql = window.graphql;
//import { register } from "../httpRequestsInterceptor";

class GraphqlHandler {
  static graphConfiguration = (uri) => {
    const headers = { "Content-Type": "application/json" };
    if (localStorage.getItem("Zermat.Token")) {
      headers.Authorization = `Bearer ${localStorage.getItem("Zermat.Token")}`;
    }
    return graphql(uri, {
      method: "POST",
      headers,
      asJSON: true,
    });
  };

  static openRequestGraphQlQuery(
    uri,
    queryString,
    autodeclare = false,
    params = {}
  ) {
    if (autodeclare) {
      const autoDeclareInstruction =
        this.graphConfiguration(uri).query(queryString);
      return autoDeclareInstruction(params); //graphql().query(queryString)(params)
    } else return this.graphConfiguration(uri).query(queryString)(); //graphql().query(queryString)()
  }

  static openRequestGraphQlMutation(
    uri,
    mutationString,
    autodeclare = false,
    params = {}
  ) {
    if (autodeclare) {
      const autoDeclareInstruction =
        this.graphConfiguration(uri).mutate(mutationString); //graphql().mutate(mutationString)(params)
      return autoDeclareInstruction(params);
    } else return this.graphConfiguration(uri).mutate(mutationString)(); //graphql().mutate(mutationString)()
  }
}

export default GraphqlHandler;
