module.exports = {
  table_name: 'user_data',
  fields: {
    email: {
      type: 'string',
      email: true
    },
    username: {
      type: 'string',
      min: 3,
      max: 20
    },
    dob: {
      type: 'date'
    }
  }
};
