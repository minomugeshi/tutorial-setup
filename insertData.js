const sql = require('mssql');

// 変数の定義
const Tag1 = 6; // 整数型変数
const TagName = 'fff'; // 文字列型変数
const Tag5 = 66; // 整数型変数

// SQL Serverの接続設定
const config = {
  user: 'SA',
  password: 'P@ssw0rd!',
  server: 'localhost', // データベースサーバーのアドレス
  database: 'master',
  options: {
    encrypt: true, // for Azure, false for local development
    trustServerCertificate: true // Change to true for local dev / self-signed certs
  }
};

async function insertData() {
    try {
      // データベースに接続
      await sql.connect(config);
  
      // SQLクエリの作成
      const query = `
        INSERT INTO TestTable (id, name, age)
        VALUES (@id, @name, @age)
      `;
  
      // プリペアドステートメントの作成
      const preparedStatement = new sql.PreparedStatement();
      preparedStatement.input('id', sql.Int);
      preparedStatement.input('name', sql.VarChar(50));
      preparedStatement.input('age', sql.Int);

      // プリペアドステートメントの準備
      await preparedStatement.prepare(query);

      // プリペアドステートメントの実行
      const result = await preparedStatement.execute({
        id: Tag1,
        name: TagName,
        age: Tag5
      });
  
      console.log('Data inserted successfully:', result);
      
      // プリペアドステートメントの解放
      await preparedStatement.unprepare();
    } catch (err) {
      console.error('Error inserting data:', err);
    } finally {
      // 接続のクローズ
      await sql.close();
    }
  }
  
// データ挿入関数の実行
insertData();
