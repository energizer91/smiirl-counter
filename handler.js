const cheerio = require("cheerio");

const { COMPANY_ID } = process.env;

const handler = async () => {
  let document;

  try {
    const res = await fetch(
      `https://www.linkedin.com/pages-extensions/FollowCompany?id=${COMPANY_ID}&counter=bottom`
    );
    const html = await res.text();
    document = cheerio.load(html);
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
