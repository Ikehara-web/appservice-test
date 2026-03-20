const sql = require('mssql');
const { DefaultAzureCredential } = require('@azure/identity');

const port = process.env.PORT || 3000;

const server = require('http').createServer(async (req, res) => {
  try {
    const credential = new DefaultAzureCredential();

    const token = await credential.getToken("https://database.windows.net/");

    const config = {
      server: process.env.DB_SERVER,
      database: process.env.DB_NAME,
      options: {
        encrypt: true
      },
      authentication: {
        type: "azure-active-directory-access-token",
        options: {
          token: token.token
        }
      }
    };

    await sql.connect(config);
    const result = await sql.query`SELECT GETDATE() AS time`;

    res.write(`成功：${result.recordset[0].time}`);
    res.end();
  } catch (err) {
    res.write("エラー：" + err);
    res.end();
  }
});

server.listen(port);
