import { HubConnectionBuilder, LogLevel } from "@aspnet/signalr";

export const getHubConnection = (uri) =>
  new HubConnectionBuilder()
    .withUrl(uri, {
      accessTokenFactory: () => `${localStorage.getItem("Zermat.Token")}`,
    })
    .configureLogging(LogLevel.Error)
    .build();
