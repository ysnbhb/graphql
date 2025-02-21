import { GetData } from "./graphql/fetch.js";
import { select } from "./main.js";

export async function login() {
  document.head.querySelector("title").innerText = "sign up";
  select.style.alignItems = "center";
  document.getElementById("form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const user = document.getElementById("user");
    const password = document.getElementById("password");
    const auth = btoa(`${user.value}:${password.value}`);
    const respons = await fetch(
      "https://learn.zone01oujda.ma/api/auth/signin",
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (respons.ok) {
      const data = await respons.json();
      localStorage.setItem("jwt-token", data);
      GetData(data);
    } else {
      const text = await respons.json();
      alert(text.error);
    }
  });
}
