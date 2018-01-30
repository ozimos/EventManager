export default {
  up: (queryInterface) => {
    queryInterface.addConstraint('Users', ['userName'], {
      type: 'unique',
      name: 'userName'
    });
    queryInterface.addConstraint('Users', ['email'], {
      type: 'unique',
      name: 'email'
    });
  },
  down: (queryInterface) => {
    queryInterface.removeConstraint('Users', 'userName');
    queryInterface.removeConstraint('Users', 'email');
  }
};