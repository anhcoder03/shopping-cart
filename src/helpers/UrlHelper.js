export default class UrlHelper {
   readParamsFromUrl = (url) => {
      const vars = []
      const parts = url.replace(
         /[?&]+([^=&]+)=([^&]*)/gi, 
         function (m, key, value) {
            vars[key] = value
         }
      )
      return vars
   }
   readParams = (url, paramName) => {
      const vars = this.readParamsFromUrl(url)
       return vars[paramName]
   }
}