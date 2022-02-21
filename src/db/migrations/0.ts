import { Pool } from "pg";

export const up = (db: Pool) =>
  db.query(`
create table accounts
(
    id bigint primary key,
    email text not null,
    password_hash bytea not null,
    created timestamp not null default (current_timestamp at time zone 'utc')
);

create table meta (
    current_migration int not null
);

insert into meta values (0);

`);

export const down = (_: Pool) => {
  throw new Error("We are already at the lowest migration possible!");
};
