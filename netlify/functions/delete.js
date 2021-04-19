const faunadb = require('faunadb');
const q = faunadb.query;

exports.handler = async (event, context) => {
  try {
    console.log('Function `delete` invoked');
    const client = new faunadb.Client({
      secret: process.env.FAUNADB_SERVER_SECRET
    });
    const id = JSON.parse(event.body);
    // delete document
    const response = await client.query(q.Delete(q.Ref(`classes/todos/${id}`)))
    return {
      statusCode: 200,
      body: JSON.stringify(response)
    }
  } catch (error) {
    console.log('error', error)
    return {
      statusCode: 400,
      body: JSON.stringify(error)
    }
  }
}
