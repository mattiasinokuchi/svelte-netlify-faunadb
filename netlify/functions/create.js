const faunadb = require('faunadb')
const q = faunadb.query

exports.handler = async (event, context) => {
  try {
    console.log('Function `create` invoked');
    const client = new faunadb.Client({
      secret: process.env.FAUNADB_SERVER_SECRET
    });
    const todoItem = 'This is supposed to be a thing to do...'
    const response = await client.query(
      q.Create(
        q.Collection('todos'),
        {
          data: {
            name: todoItem
          }
        }
      )
    );
    console.log(response);
    return {
      statusCode: 200,
      body: JSON.stringify(response)
    }
  } catch (error) {
    console.log(error)
    return {
      statusCode: 400,
      body: JSON.stringify(error)
    }
  }
}
