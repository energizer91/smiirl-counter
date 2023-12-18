const axios = require("axios");
const cheerio = require("cheerio");

const { COMPANY_ID = '0' } = process.env;

const handler = async () => {
  let document;

  try {
    const html = await axios.get(
      `https://www.linkedin.com/pages-extensions/FollowCompany?id=${COMPANY_ID}&counter=bottom`,
      { headers: { "User-Agent": "BetaBeep/0.1" } }
    );
    document = cheerio.load(html.data);
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error getting resource: " + e.message,
      }),
    };
  }

  const followersCount = document(".follower-count").text();

  return {
    statusCode: 200,
    body: JSON.stringify({
      number: Number(followersCount.replace(",", "")),
    }),
  };
};

module.exports = { handler };
