const faunadb = require('faunadb')
const q = faunadb.query

exports.handler = async (event, context) => {
  try {
    console.log('Function `create` invoked');
    const client = new faunadb.Client({
      secret: process.env.FAUNADB_SERVER_SECRET
    });
    const object = JSON.parse(event.body);
    console.log(event.body, object);
    await client.query(
      q.Create(
        q.Collection('todos'),
        {
          data: {
            name: object.newTodo
          }
        }
      )
    );
    const response = await client.query(
      q.Paginate(q.Match(q.Index('todos')))
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
