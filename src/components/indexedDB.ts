export interface User {
  name: string;
  surname: string;
  email: string;
  points: number;
  id: IDBValidKey;
}

export interface UserCreate {
  name: string;
  surname: string;
  email: string;
  points: number;
}

export interface UserUpdate {
  name?: string;
  surname?: string;
  email?: string;
  points?: number;
}

export class Database {
  private db!: IDBDatabase;

  private static property: Database;

  constructor() {
    if (!Database.property) {
      Database.property = this;
    }
    return Database.property;
  }

  public async init(dbName: string, version?: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const iDB = window.indexedDB;
      const openRequest = iDB.open(dbName, version);

      openRequest.onupgradeneeded = () => {
        Database.createDatabase(openRequest);
      };
      openRequest.onsuccess = () => {
        this.db = openRequest.result;
        resolve();
      };
      openRequest.onerror = () => {
        reject(openRequest.error);
      };
    });
  }

  private static createDatabase(openReq: IDBOpenDBRequest) {
    const database = openReq.result;
    const store = database.createObjectStore('Insamedkv', { keyPath: 'id', autoIncrement: true });
    store.createIndex('name', 'name');
    store.createIndex('surname', 'surname');
    store.createIndex('email', 'email');
    store.createIndex('points', 'points');
  }

  public async create(record: UserCreate): Promise<User> {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction('Insamedkv', 'readwrite');
      const store = transaction.objectStore('Insamedkv');
      const result = store.add({});

      result.onsuccess = () => {
        const newRecord: User = {
          ...record, id: result.result,
        };
        const recorded = store.put(newRecord);
        recorded.onsuccess = () => {
          resolve(newRecord);
        };
        recorded.onerror = () => {
          reject(recorded.error);
        };
      };
    });
  }

  public async update(id: IDBValidKey, updateData: UserUpdate): Promise<void> {
    const user = await this.searchById(id); // async await promise
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction('Insamedkv', 'readwrite');
      const store = transaction.objectStore('Insamedkv');
      Object.assign(user, updateData);
      const putResult = store.put(user);

      putResult.onsuccess = () => {
        resolve();
      };
      putResult.onerror = () => {
        reject(putResult.error);
      };
    });
  }

  public async searchById(id: IDBValidKey): Promise<User> {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction('Insamedkv', 'readonly');
      const store = transaction.objectStore('Insamedkv');
      const finded = store.get(id);

      finded.onsuccess = () => {
        resolve(finded.result);
      };
      finded.onerror = () => {
        reject(finded.error);
      };
    });
  }

  public async filter(): Promise<User []> {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction('Insamedkv', 'readonly');
      const store = transaction.objectStore('Insamedkv');
      const result = store.index('points').openCursor(null, 'prev');
      const resData: User[] | PromiseLike<User[]> = [];

      result.onsuccess = () => {
        const cursor = result.result;
        if (cursor) {
          const currentValue: User = cursor.value;
          if (cursor.value.points > 0) {
            resData.push(currentValue);
          }
          cursor.continue();
        }
      };
      transaction.oncomplete = () => {
        resolve(resData);
      };
      transaction.onerror = () => {
        reject();
      };
    });
  }

  public async readAll(): Promise<User []> {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction('Insamedkv', 'readonly');
      const store = transaction.objectStore('Insamedkv');
      const result = store.getAll();

      transaction.oncomplete = () => {
        resolve(result.result);
      };
      transaction.onerror = () => {
        reject();
      };
    });
  }
}
