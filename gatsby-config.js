module.exports = {
  pathPrefix: "/learn-gatsby-deckgl",
  plugins: [
    'gatsby-transformer-json',
    'gatsby-transformer-csv',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data/`,
      },
    }
  ],
}