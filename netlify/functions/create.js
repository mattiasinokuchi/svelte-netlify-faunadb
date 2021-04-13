const faunadb = require('faunadb')
const q = faunadb.query

exports.handler = async (event, context) => {
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

  return createP
    .then(
      function (response) {
        console.log(response.ref);
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
