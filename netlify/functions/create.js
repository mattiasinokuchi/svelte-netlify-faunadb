const faunadb = require('faunadb')
const q = faunadb.query

exports.handler = async (event, context) => {
  try {
    const client = new faunadb.Client({
      secret: process.env.FAUNADB_SERVER_SECRET
    })

    console.log('Function `create` invoked');

    const response = await client
      .query(
        q.Create(
          q.Collection('test'), { data: { testField: 'testValue' } }
        )
      )

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
