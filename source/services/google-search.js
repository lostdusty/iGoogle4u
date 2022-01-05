const SerpApi = require("google-search-results-nodejs");
const { ensureEnvExists } = require("../helpers");

async function searchOnGoogle(query) {
  return new Promise((resolve, reject) => {
    const search = new SerpApi.GoogleSearch(
      ensureEnvExists("GOOGLE_SEARCH_API_KEY")
    );

    search.json(
      {
        q: query,
        location: "United States",
		safe: "active",
		num: 5,
      },
      (result) => {
        resolve(result);
      }
    );
  });
}

module.exports = {
  searchOnGoogle,
};
