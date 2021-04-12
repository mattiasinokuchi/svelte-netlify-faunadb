/* Import faunaDB sdk */
const faunadb = require('faunadb')
const q = faunadb.query

/* export our lambda function as named "handler" export */
exports.handler = async (event, context) => {
  /* configure faunaDB Client with our secret */
  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET
  })

  console.log('Create test function invoked');

  const createP = client.query(
    q.Create(
      q.Collection('test'),
      { data: { testField: 'testValue' } }
    )
  )

  /* construct the fauna query */
  return createP
    .then(
      function (response) {
        console.log(response.ref); // Logs the ref to the console.
        return {
          statusCode: 200,
          body: JSON.stringify(response)
        }
      }
    )
    .catch((error) => {
      console.log('error', error)
      return {
        statusCode: 400,
        body: JSON.stringify(error)
      }
    });
}
