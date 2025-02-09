import { logincp } from "./global.js";
import { GetData } from "./graphql/fetch.js";
import { showUserinfo } from "./graphql/make.js";
import { login } from "./login.js";
export const select = document.getElementById("section");
const jwt = localStorage.getItem("jwt-token");
if (jwt) {
  GetData(jwt);
} else {
  select.innerHTML = logincp;
  login();
}
