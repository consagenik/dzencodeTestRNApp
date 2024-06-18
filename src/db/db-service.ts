import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';

import DBAddCommentRequest from './entities/DBAddCommentRequest';
import DBComment from './entities/DBComment';

enablePromise(true);

function blobToBase64(blob: Blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

async function insertFile(
  db: SQLiteDatabase,
  fileName: string,
  filePath: string,
): Promise<number> {
  return new Promise<number>(async (resolve, reject) => {
    try {
      const data = await fetch(filePath);
      const blobData = await data.blob();
      const base64Data = await blobToBase64(blobData);
      const query = 'INSERT INTO files (file_name, file_data) VALUES (?, ?)';
      const params = [fileName, base64Data];

      db.transaction(function (txn) {
        txn.executeSql(
          query,
          params,
          function (tx, res) {
            resolve(res.insertId);
          },
          function (error) {
            console.log('Failed to insert:', error);
            reject(error);
          },
        );
      });
    } catch (error) {
      reject(error);
    }
  });
}

export async function getDBConnection() {
  return openDatabase({name: 'mydatabase.db', location: 'default'});
}

export const createTable = async (db: SQLiteDatabase) => {
  const commentsQuery = `
    CREATE TABLE IF NOT EXISTS comments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      text TEXT NOT NULL,
      avatarFileId INTEGER NOT NULL,
      userName TEXT NOT NULL,
      email TEXT NOT NULL,
      homePage TEXT NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(avatarFileId) REFERENCES files(id)
    )
  `;

  const filesQuery = `
    CREATE TABLE IF NOT EXISTS files (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      file_name TEXT NOT NULL,
      file_data BLOB NOT NULL
    )
  `;

  await db.executeSql(commentsQuery);
  await db.executeSql(filesQuery);
};

export async function getDBCommentsQuantity(
  db: SQLiteDatabase,
): Promise<number> {
  return new Promise<number>(async (resolve, reject) => {
    const query = 'SELECT COUNT(*) FROM comments';

    db.transaction(function (txn) {
      txn.executeSql(
        query,
        [],
        function (tx, res) {
          resolve(Object.values(res.rows.item(0))[0] as number);
        },
        function (error) {
          console.log('Failed to fetch comments:', error);
          reject();
        },
      );
    });
  });
}

export async function getComments(
  db: SQLiteDatabase,
  sortBy = 'createdAt',
  sortOrder: 'DESC' | 'ASC' = 'DESC',
  page: number = 0,
): Promise<DBComment[]> {
  const commentsPerPage = 25;

  return new Promise<DBComment[]>(async (resolve, reject) => {
    const query = `
      SELECT comments.*, files.file_name, files.file_data
      FROM comments
      JOIN files ON comments.avatarFileId = files.id
      ORDER BY comments.${sortBy} ${sortOrder}
      LIMIT ${commentsPerPage} OFFSET ${commentsPerPage * page}
    `;

    db.transaction(function (txn) {
      txn.executeSql(
        query,
        [],
        function (tx, res) {
          const transformedResults = res?.rows.raw().map(row => ({
            id: row.id,
            text: row.text,
            avatar: {
              file_name: row.file_name,
              file_data: row.file_data,
            },
            userName: row.userName,
            email: row.email,
            homePage: row.homePage,
            comments: [], // TODO Add related comments
            createdAt: row.createdAt,
          }));

          resolve(transformedResults);
        },
        function (error) {
          console.log('Failed to fetch comments:', error);
          reject();
        },
      );
    });
  });
}

export async function getCommentById(
  db: SQLiteDatabase,
  id: number,
): Promise<DBComment> {
  return new Promise<DBComment>(async (resolve, reject) => {
    const query = `
      SELECT comments.*, files.file_name, files.file_data
      FROM comments
      JOIN files ON comments.avatarFileId = files.id
      WHERE comments.id = ?
    `;
    const params = [id];

    db.transaction(function (txn) {
      txn.executeSql(
        query,
        params,
        function (tx, res) {
          const row = res?.rows.raw()[0];

          const transformedResults = {
            id: row.id,
            text: row.text,
            avatar: {
              file_name: row.file_name,
              file_data: row.file_data,
            },
            userName: row.userName,
            email: row.email,
            homePage: row.homePage,
            comments: [], // TODO Add related comments
            createdAt: row.createdAt,
          };

          resolve(transformedResults);
        },
        function (error) {
          console.log('Failed to fetch comment:', error);
          reject();
        },
      );
    });
  });
}

export async function addComment(
  db: SQLiteDatabase,
  data: DBAddCommentRequest,
): Promise<DBComment> {
  const query = `
    INSERT INTO comments (
      "text",
      avatarFileId,
      userName,
      email,
      homePage
    ) VALUES (?, ?, ?, ?, ?)
  `;

  const avatarFileId: number = await insertFile(
    db,
    data.avatar.fileName,
    data.avatar.filePath,
  );

  const params = [
    data.text,
    avatarFileId,
    data.userName,
    data.email,
    data.homePage,
  ];

  const response = await new Promise(async (resolve, reject) => {
    db.transaction(function (txn) {
      txn.executeSql(
        query,
        params,
        function (tx, res) {
          resolve(res);
        },
        function (error) {
          console.log('Failed to create comment:', error);
          reject();
        },
      );
    });
  });

  const commentQuery = `
      SELECT comments.*, files.file_name, files.file_data
      FROM comments
      JOIN files ON comments.avatarFileId = files.id
      WHERE comments.id = ?
    `;
  // @ts-ignore
  const commentParams = [response.insertId];

  return await new Promise(async (resolve, reject) => {
    db.transaction(function (txn) {
      txn.executeSql(
        commentQuery,
        commentParams,
        function (tx, res) {
          const row = res?.rows.raw()[0];

          const transformedResults = {
            id: row.id,
            text: row.text,
            avatar: {
              file_name: row.file_name,
              file_data: row.file_data,
            },
            userName: row.userName,
            email: row.email,
            homePage: row.homePage,
            comments: [], // TODO Add related comments
            createdAt: row.createdAt,
          };

          resolve(transformedResults);
        },
        function (error) {
          console.log('Failed to fetch comment:', error);
          reject();
        },
      );
    });
  });
}
