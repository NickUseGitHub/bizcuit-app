import { Connection, ConnectionOptions, ConnectionManager } from 'typeorm';

export default class DatabaseConnection {
  private connection: Connection;
  private connectionOptions: ConnectionOptions;

  constructor(connectionOptions: ConnectionOptions) {
    this.connectionOptions = connectionOptions;
  }

  async connect() {
    const connectionManager = new ConnectionManager();

    this.connection = connectionManager.create(this.connectionOptions);

    await this.connection.connect();
  }

  getConnection(): Connection {
    return this.connection;
  }

  async close() {
    this.connection.close();
  }
}
