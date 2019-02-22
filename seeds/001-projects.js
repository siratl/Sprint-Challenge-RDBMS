exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('projects')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('projects').insert([
        {
          name: 'Complete Sprint Challenge and chill for the weekend',
          description:
            'Build and Awesome API Using Node.js and Express to Manage Projects and Actions GTD Style!',
        },
      ]);
    });
};
