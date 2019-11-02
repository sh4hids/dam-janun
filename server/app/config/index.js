const env = process.env.APP_ENV;
const port = process.env.APP_PORT;
const appCorsOrigin = process.env.APP_CORS_ORIGIN;
const shopList = {
  rokomari: {
    title: 'রকমারি.কম',
    website: 'https://www.rokomari.com',
    searchURL: 'https://www.rokomari.com/search?term=',
  },
  wafilife: {
    title: 'ওয়াফিলাইফ.কম',
    website: 'https://www.wafilife.com',
    searchURL: 'https://www.wafilife.com/search/?wpsolr_q=',
  },
  niyamahshop: {
    title: 'নিয়ামাহশপ.কম',
    website: 'https://www.niyamahshop.com',
    searchURL: 'https://www.niyamahshop.com/?wc-ajax=aws_action',
  },
  boibazar: {
    title: 'বইবাজার.কম',
    website: 'https://www.boibazar.com',
    searchURL:
      'https://www.boibazar.com/search?selected_search_type=products&searchTerm=',
  },
};

module.exports = { env, port, appCorsOrigin, shopList };
