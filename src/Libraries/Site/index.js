import GraphqlHandler from "../GraphqlHandler";
import { ENVIROMENT_URL } from "../../React/ReduxSaga/Constants";

class Site {
  static getHome(lang = "es") {
    return GraphqlHandler.openRequestGraphQlQuery(
      ENVIROMENT_URL,
      `(@autodeclare){
        publicHome(lang:$lang){
          code
          message
          items{
            title
            subtitle
            body
            imageUrl
          }
        }
      }`,
      true,
      { "lang!String": lang }
    );
  }

  static getNavigation(lang = "es") {
    return GraphqlHandler.openRequestGraphQlQuery(
      ENVIROMENT_URL,
      `(@autodeclare){
      publicNavigation(lang:$lang){
        code
        message
        items{
          id
          parentId
          label
          url
          icon
          orderIndex
        }
      }
    }`,
      true,
      { "lang!String": lang }
    );
  }

  static getBeers(lang = "es") {
    return GraphqlHandler.openRequestGraphQlQuery(
      ENVIROMENT_URL,
      `(@autodeclare){
        publicBeers(lang:$lang){
          code
          message
          items{
            id
            name
            description
            abv
            ibu
          }
        }
      }`,
      true,
      { "lang!String": lang }
    );
  }

  static getBeerImages(lang = "es", beerId) {
    return GraphqlHandler.openRequestGraphQlQuery(
      ENVIROMENT_URL,
      `(@autodeclare){
      publicBeerImages(lang:$lang, beerId:$beerId){
        code
        message
        items{
          id
          beerId
          imageUrlEs
          imageUrlEn
          isPrimary
          orderIndex
        }
      }
    }`,
      true,
      {
        "lang!String": lang,
        "beerId!Int": beerId,
      }
    );
  }

  static getFeaturedBeers(lang = "es") {
    return GraphqlHandler.openRequestGraphQlQuery(
      ENVIROMENT_URL,
      `(@autodeclare){
        publicFeaturedBeers(lang:$lang){
          code
          message
          items{
            id
            name
            imageUrl
          }
        }
      }`,
      true,
      { "lang!String": lang }
    );
  }

  static getFooter(lang = "es") {
    return GraphqlHandler.openRequestGraphQlQuery(
      ENVIROMENT_URL,
      `(@autodeclare){
      publicFooter(lang:$lang){
        code
        message
        items{
          id
          parentId
          label
          url
          orderIndex
        }
      }
    }`,
      true,
      { "lang!String": lang }
    );
  }

  static getBanners(lang = "es") {
    return GraphqlHandler.openRequestGraphQlQuery(
      ENVIROMENT_URL,
      `(@autodeclare){
      publicBanners(lang:$lang){
        code
        message
        items{
          id
          title
          subTitle
          imageUrl
          targetUrl
          orderIndex
        }
      }
    }`,
      true,
      { "lang!String": lang }
    );
  }

  static getSeo(lang = "es") {
    return GraphqlHandler.openRequestGraphQlQuery(
      ENVIROMENT_URL,
      `(@autodeclare){
      publicSeo(lang:$lang){
        code
        message
        items{
          pageCode
          title
          description
          keyWords
        }
      }
    }`,
      true,
      { "lang!String": lang }
    );
  }

  static getPage(lang = "es", pageCode) {
    return GraphqlHandler.openRequestGraphQlQuery(
      ENVIROMENT_URL,
      `(@autodeclare){
        publicPage(lang:$lang, pageCode:$pageCode){
          code
          message
          items{
            title
            body
          }
        }
      }`,
      true,
      {
        "lang!String": lang,
        "pageCode!String": pageCode,
      }
    );
  }
}

export default Site;
