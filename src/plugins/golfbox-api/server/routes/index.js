module.exports = [
  {
    method: 'GET',
    path: '/advf',
    handler: 'myController.index',
    config: {
      policies: [],
    },
  },
];
