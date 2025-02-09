import { query } from "./graphql.js";
import { ShowAditau, showUserinfo } from "./make.js";

export async function GetData(jwt) {
  document.querySelector("section").innerHTML = "";
  const respons = await fetch(
    "https://learn.zone01oujda.ma/api/graphql-engine/v1/graphql",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    }
  );
  const data = await respons.json();
  console.log(data.data);

  if (data.errors) {
    localStorage.removeItem("jwt-token");
    window.location.reload();
  }
  showUserinfo(data.data.user[0]);
  ShowAditau(data.data.user[0]);
}
