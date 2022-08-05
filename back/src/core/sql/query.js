const Connection = require("./connection");
const _promise = require("promise");
const DATABASE = require("../../config").DATABASE;

const getConnection = () => {
  const connection = Connection.getPool(DATABASE.CONNECTION_POOL_NAME);
  return connection.getConnection((err, conn) => {
    return conn;
  });
};

const execute = (query, values, options = {}) => {
  /**
  This function will prepare queries and execute them
  * @params
  query: query to execute with dynamic field values replaced by ?
  values: values to escape and bind in the query
  Caution: There should not be any ? in any string else it will also get replaced and it will throw error
  * @author Ankit Himanshu
  */
  return new _promise(function(resolve, reject) {
    const dbName = (typeof options.db !== "undefined") ? options.db : DATABASE.CONNECTION_POOL_NAME;
    const connection = Connection.getPool(dbName);
    try {
      console.log(`[SQL QUERY EXECUTING]:[${values}] ${query}`);
      connection.getConnection(function(err, connection) {
        if (err) {
          // Logger.error(err);
          throw err;
        }
        connection.query(query, values, function(error, results, fields) {
          if (error) {
            // Logger.error(error);
            throw error;
          }
          // Logger.info("RAW QUERY: " + this.sql);
          // Don't use the connection after this line, it has been returned to the pool.
          connection.release();

          resolve(results);

        });
      });
    } catch (e) {
      reject(e);
    }

  });
}

const executeQuery = (config = {}, callback) => {
  /*

  This function will prepare queries and execute them
  @params:
  query: query to execute with dynamic field values replaced by ?
  values: values to escape and bind in the query
  Caution: There should not be any ? in any string else it will also get replaced and it will throw error

  */
  const dbName = (typeof config.options.db !== "undefined") ? config.options.db : config.CONNECTION_POOL_NAME;
  const connection = Connection.getPool(dbName);
  config.options.tag = config.options.tag || "NO_TAG";
  console.log(`[SQL QUERY EXECUTING]:[${config.options.tag}] ${config.query}`);
  connection.getConnection(function(err, connection) {
    if (err) {
      // Logger.error(err);
      console.log(err);
      return callback(err, connection);
    }
    return callback(null, {query: connection.query(config.query, config.values), connection});
  });
}

const log = (log_query, data, table_name, id) =>{
  let query = "INSERT INTO tc_query_logs set `table_name`=?,`query`=?,`data`=?,`model_id`=?";
  Query.execute(query, [ table_name, log_query, data, id ]);
}

module.exports = executeQuery;