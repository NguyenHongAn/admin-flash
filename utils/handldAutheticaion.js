import { Cookies } from "react-cookie";
// set up cookies
const cookies = new Cookies();

function getTokenInSS(req) {
  let token = null;
  // if context has request info aka Server Side
  if (req) {
    // ugly way to get cookie value from a string of values
    // good enough for demostration
    token = req.headers.cookie.replace(
      /(?:(?:^|.*;\s*)jwt\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
  } else {
    // we dont have request info aka Client Side
    token = cookies.get("jwt");
  }
  return token;
}

export default getTokenInSS;
