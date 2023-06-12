module.exports = ({ env }) => ({
  // enable a plugin that doesn't require any configuration
  i18n: true,
  tinymce:{
    enabled:true
  },
  // enable a custom plugin
  'golfbox-api': {
    // my-plugin is going to be the internal name used for this plugin
    enabled: true,
    resolve: './src/plugins/golfbox-api',
    config: {
      // user plugin config goes here
    },
  },
  "fuzzy-search": {
    enabled: true,
    config: {
      contentTypes: [
        {
          uid: "api::author.author",
          modelName: "author",
          transliterate: true,
          fuzzysortOptions: {
            characterLimit: 300,
            threshold: -600,
            limit: 10,
            keys: [
              {
                name: "name",
                weight: 100,
              },
            ],
          },
        },
        {
          uid: "api::blog.blog",
          modelName: "blog",
          queryConstraints: {
            where: {
              $and: [
                {
                  publishedAt: { $notNull: true },
                },
              ],
            },
          },
          fuzzysortOptions: {
            characterLimit: 500,
            keys: [
              {
                name: "title",
                weight: 200,
              },
              {
                name: "slug",
                weight: -200,
              },
            ],
          },
        },
      ],
    },
  },
});