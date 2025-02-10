import { logincp } from "../global.js";
import { login } from "../login.js";
import { select } from "../main.js";

export function showUserinfo(dataUser) {
  const div = document.createElement("header");
  div.className = "user header";
  const name = document.createElement("span");
  name.className = "username";
  const logOut = document.createElement("button");
  logOut.innerHTML = "Log Out";
  logOut.className = "log-out";
  name.innerText = `Welcome,  ${dataUser.firstName} ${dataUser.lastName}!`;
  div.append(name, logOut);
  select.append(div);
  logOut.addEventListener("click", () => {
    localStorage.removeItem("jwt-token");
    select.innerHTML = logincp;
    login();
  });
}

export function ShowAditau(info) {
  const divskill = document.createElement("div");
  divskill.className = "rows";
  const divAutdit = UpDown(
    info.totalUp,
    info.totalDown,
    info.auditRatio.toFixed(1)
  );
  const divlevel = showLiver(info.transactions[0].amount);

  console.log(info);

  const divXp = showXp(info.totalXp.aggregate.sum.amount);
  divskill.append(divAutdit, divlevel, divXp);
  select.append(divskill);
}

function UpDown(up, down, audit) {
  const maxR = Math.max(up, down);
  const divAutdit = document.createElement("div");
  divAutdit.className = "card";
  const text = document.createElement("div");
  text.className = "titleRatio";
  text.innerText = "Audits ratio";
  const svgup = createdSvg(
    "rect",
    {
      width: `${(up / maxR) * 95}%`,
      fill: "#6160FF",
      x: "7",
      y: "8",
      height: "10px",
      rx: "5",
      ry: "5",
    },
    "Done"
  );
  const svgdown = createdSvg(
    "rect",
    {
      width: `${(down / maxR) * 95}%`,
      fill: "#F9B824",
      x: "7",
      y: "8",
      height: "10px",
      rx: "5",
      ry: "5",
    },
    "Received"
  );
  const auditRatio = document.createElement("div");
  auditRatio.className = "rank-audit";
  auditRatio.classList.add("audit");
  auditRatio.innerHTML = audit;
  divAutdit.append(text, svgup, svgdown, auditRatio);
  return divAutdit;
}

function createdSvg(elemet, attr, text) {
  const div = document.createElement("div");
  div.className = "rank-audit";
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.classList.add("svg")
  const rect = document.createElementNS("http://www.w3.org/2000/svg", elemet);
  for (let key in attr) {
    rect.setAttribute(key, attr[key]);
  }
  const medium = document.createElement("span");
  medium.className = "text";
  medium.innerText = text;
  svg.append(rect);
  div.append(svg, medium);
  return div;
}

function showLiver(level) {
  const divAutdit = document.createElement("div");
  divAutdit.className = "card";
  const divlevel = document.createElement("div");
  divlevel.className = "user-level";
  const text = document.createElement("div");
  text.innerText = "Your Level";
  text.className = "titleRatio titlelevel";
  const levele = document.createElement("div");
  levele.innerText = level;
  levele.className = "level";
  divlevel.append(text, levele);
  divAutdit.append(divlevel);
  return divAutdit;
}

function showXp(xp) {
  const divAutdit = document.createElement("div");
  divAutdit.className = "card";
  const divlevel = document.createElement("div");
  divlevel.className = "user-xp";
  const text = document.createElement("div");
  text.innerText = "XP Board";
  text.className = "titleRatio titlelevel";
  const span = document.createElement("span");
  span.innerHTML = "Total Xp";
  span.style.fontSize = "1rem";
  const levele = document.createElement("div");
  levele.className = "level xp";
  levele.innerText = formatSize(xp);
  levele.append(span);
  divlevel.append(text, levele);
  divAutdit.append(divlevel);
  return divAutdit;
}

function formatSize(value) {
  if (value < 1000) {
    return `${value}B`;
  } else if (value >= 1000 && value < 1000000) {
    return `${(value / 1000).toFixed(2)}KB`;
  } else {
    return `${(value / 1000000).toFixed(2)}MB`;
  }
}
