const SearchEngineClientFactory = require('search-engine-clients').SearchEngineClientFactory;

exports.searchByData = async (req, res, next) => {
    const { query } = req.query;
    try {
        const searchEngineClient = SearchEngineClientFactory.createSearchEngineClient();
        const result = await searchEngineClient.searchText(query);
        res.json(result);
    } catch (err) {
        next(err);
    }
  };
