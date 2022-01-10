const axios = require("axios");
const utils = require("./utils/utils");
const slackUtils = require("./utils/createSlackFile");
const cron = require("node-cron");

async function getAllOpenPositions(company) {
  const result = await axios.get(
    `http://localhost:3000/getOpenJobsInfos/${company}`
  );
  if (result && result.data) {
    return result.data.openJobs;
  } else {
    console.log(
      `Something went wrong to get all open positions for ${company}.`
    );
    return undefined;
  }
}

function filterLastWeekPositions(allOpenPositions) {
  const lastWeek = Date.now() - 604800000;
  let lastWeekOpenedPositions = [];
  allOpenPositions.map((position) => {
    if (position.publishedAt > lastWeek) {
      lastWeekOpenedPositions.push(position);
    }
  });
  return lastWeekOpenedPositions;
}

function sortPositions(positions) {
  const sortedPositions = [];
  for (let i = 0; i < positions.length; i++) {
    const index = sortedPositions
      .map((obj) => {
        return obj.department;
      })
      .indexOf(positions[i].department);
    if (index === -1) {
      sortedPositions.push({
        department: positions[i].department,
        positions: [utils.insertPosition(positions[i])],
      });
    } else {
      sortedPositions[index].positions.push(utils.insertPosition(positions[i]));
    }
  }
  return sortedPositions;
}

async function generateSlackMessages(company) {
  const openPositions = await getAllOpenPositions(company);
  const lastWeekOpenedPosition = filterLastWeekPositions(openPositions);
  const sortedPositions = sortPositions(lastWeekOpenedPosition);
  console.log(sortedPositions);
  // const slackMessage = slackUtils.formatSlackMessage(sortedPositions);
}

cron.schedule("0 9 * * 1", () => {
  const companies = ["Swile", "Backmarket", "Ledger"];

  const companyMessages = companies.map((company) => {
    return generateSlackMessages(company);
  });

  // return JSON.stringify(companyMessages);
});
