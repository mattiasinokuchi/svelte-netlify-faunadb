const faunadb = require('faunadb')
const q = faunadb.query

exports.handler = async (event, context) => {
  try {
    console.log('Function `update` invoked');
    const client = new faunadb.Client({
      secret: process.env.FAUNADB_SERVER_SECRET
    });
    console.log(event.body);
    const object = JSON.parse(event.body);
    await client.query(
      q.Update(
        q.Ref(`classes/todos/${object.id}`), {
          data: {
            name: object.data
          }
        }
      )
    );
    // Get an object with an array of all documents Ref ID
    const refObj = await client
      .query(q.Paginate(q.Match(q.Ref("indexes/todos"))));
    // Get array of all documents Ref ID
    const refArr = refObj.data;
    // Create a query for all data in documents 
    const dataQuery = await refArr.map((ref) => {
      return q.Get(ref)
    });
    // Get all data in documents
    const dataArr = await client.query(dataQuery);
    return {
      statusCode: 200,
      body: JSON.stringify(dataArr)
    }
  } catch (error) {
    console.log(error)
    return {
      statusCode: 400,
      body: JSON.stringify(error)
    }
  }
}
