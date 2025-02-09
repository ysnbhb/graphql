let cumulativeXP = 0;
const width = 680;
const height = 303;

export function creatPath(trans) {
  const dataPoints = sortedData.map((transaction) => {
    cumulativeXP += transaction.amount;
    return {
      date: new Date(transaction.createdAt),
      name: transaction.object.name,
      xp: cumulativeXP,
    };
  });
  const endTime = dataPoints[dataPoints.lenght - 1].date;
  const startTime = dataPoints[0].date;
  const maxXP = dataPoints[dataPoints.length - 1].xp;
  const pathData = dataPoints
    .map((point, index) => {
      x = scaleX(point.date);
      y = scaleY(point.xp);
      return `${index === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");
}

function scaleX(date, endDate, startDate) {
  const timeRange = endDate - startDate;
  const timePosition = date - startDate;
  return (timePosition / timeRange) * width;
}

function scaleY(xp, maxXP) {
  return height - (xp / maxXP) * height;
}
