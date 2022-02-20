import redis, { Redis } from "ioredis";
import pg from "pg";
import { IConfig } from "../config/config";
import migrations from "./migrations";
import Auth from "./repository/auth";

export class DB {
  postgres: pg.Pool;
  redis: Redis;

  auth: Auth;

  constructor(config: IConfig) {
    this.postgres = new pg.Pool({
      connectionString: config.postgres,
    });
    this.redis = new redis(config.redis);

    this.auth = new Auth(this.postgres, this.redis);
  }

  async migrate() {
    let res = await this.postgres.query("select current_migration from meta");
    let currentMigration = res.rows[0]?.current_migration ?? -1;
    console.log(`Current database version: ${currentMigration}`);

    for (const migration of migrations) {
      if (migrations.indexOf(migration) > currentMigration)
        console.log(`Running migration ${migrations.indexOf(migration)}`);
      await migration.up(this.postgres);
    }
  }
}
