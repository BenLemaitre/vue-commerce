const router = require("express").Router();
const algoliaSearch = require("algoliasearch");

const client = algoliaSearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_SECRET_KEY
);

// mongoose-algolia : sync documents to algolia db
// algoliasearch : search data in algolia db

const index = client.initIndex(process.env.ALGOLIA_INDEX);

router.post("/search", async (req, res) => {
  try {
    let result = await index.search(req.body.title);
    res.json(result.hits);
  } catch (err) {
    res.json(err.message);
  }
});

module.exports = router;
