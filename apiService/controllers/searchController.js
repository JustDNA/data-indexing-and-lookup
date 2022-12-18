const SearchEngineClientFactory = require('search-engine-clients').SearchEngineClientFactory;

exports.searchByData = async (req, res, next) => {
    const { query } = req.query;
    try {
        const searchEngineClient = SearchEngineClientFactory.createSearchEngineClient();
        const result = await searchEngineClient.searchText(query);
        res.header("Content-Type",'application/json');
        res.send(JSON.stringify(result, null, 4));
    } catch (err) {
        next(err);
    }
  };
