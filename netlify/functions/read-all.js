/* Import faunaDB sdk */
const faunadb = require('faunadb')
const q = faunadb.query


exports.handler = async (event, context) => {
  try {
    console.log('Function `read-all` invoked')
    const client = new faunadb.Client({
      secret: process.env.FAUNADB_SERVER_SECRET
    });
    let collections = []; 
    await client
      .paginate(q.Collections())
      .map(ref => q.Get(ref))
      .each(page => {
        collections = collections.concat(page);
      });
      return {
        statusCode: 200,
        body: JSON.stringify(collections)
      }
  } catch(error) {
    console.log(error);
    return {
      statusCode: 400,
      body: JSON.stringify(error)
    }
  }
}
