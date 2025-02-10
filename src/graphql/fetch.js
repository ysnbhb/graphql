import { select } from "../main.js";
import { query } from "./graphql.js";
import { ShowAditau, showUserinfo } from "./make.js";
import { CreateNext, creatPath } from "./path.js";

export async function GetData(jwt) {
  select.innerHTML = "";
  select.style.alignItems = "";
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
  if (data.errors) {
    localStorage.removeItem("jwt-token");
    window.location.reload();
  }
  showUserinfo(data.data.user[0]);
  ShowAditau(data.data.user[0]);
  CreateNext(data.data);
}
