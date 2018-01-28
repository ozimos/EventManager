export default {
  up: queryInterface => queryInterface.addConstraint('Centers', ['name', 'country', 'state', 'lga'], {
    type: 'unique',
    name: 'Centers_unique'
  }),
  down: queryInterface => queryInterface.removeConstraint('Centers', 'Centers_unique', {
    type: 'unique',
    name: 'Centers_unique'
  })
};
