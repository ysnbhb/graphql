import { select } from "../main.js";

let cumulativeXP = 0;
const width = 680;
const height = 303;

export function creatPath(trans) {
  const div = document.createElement("div");
  div.className = "card path";

  const dataPoints = trans.map((transaction) => {
    cumulativeXP += transaction.amount;
    return {
      date: new Date(transaction.createdAt),
      name: transaction.object.name,
      xp: cumulativeXP,
    };
  });

  if (dataPoints.length === 0) return;

  const endTime = dataPoints[dataPoints.length - 1].date;
  const startTime = dataPoints[0].date;
  const maxXP = dataPoints[dataPoints.length - 1].xp;

  const pathData = dataPoints
    .map((point, index) => {
      const x = scaleX(point.date, endTime, startTime);
      const y = scaleY(point.xp, maxXP);
      return `${index === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

  path.setAttribute("d", pathData);
  path.setAttribute("stroke", "#ffff");
  path.setAttribute("fill", "transparent");
  path.setAttribute("stroke-width", "3");

  // ✅ Make SVG Responsive
  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "100%");
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  svg.setAttribute("preserveAspectRatio", "xMidYMid meet");

  svg.append(path);
  div.append(svg);
  return div;
}


export function CreateNext(data) {
  const div = document.createElement("div");
  div.className = "next";
  const divpath = creatPath(data.transaction);
  div.append(divpath);
  select.append(div);
}

function scaleX(date, endDate, startDate) {
  const timeRange = endDate - startDate;
  const timePosition = date - startDate;
  return (timePosition / timeRange) * width;
}

function scaleY(xp, maxXP) {
  return height - (xp / maxXP) * height;
}
