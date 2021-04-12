/* Import faunaDB sdk */
const faunadb = require('faunadb')
const q = faunadb.query

exports.handler = (event, context) => {

  console.log('Read-all function invoked')
  /* configure faunaDB Client with our secret */

  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET
  });

  const helper = client.paginate(
    q.Match(
      q.Index('test_index'),
      'example-term'
    )
  );

  helper
    .map(function (ref) {
      return q.Get(ref)
    })
    .each(function (page) {
      console.log(page); // Logs the retrieved documents.
    });

  return helper
    .then((response) => {
      return {
        statusCode: 200,
        body: JSON.stringify(ret)
      }
    })
    .catch((error) => {
      console.log('error', error)
      return {
        statusCode: 400,
        body: JSON.stringify(error)
      }
    });
}
