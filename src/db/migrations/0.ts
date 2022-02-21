import type { Pool } from "pg";

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

CREATE SEQUENCE public.global_id_seq;

CREATE OR REPLACE FUNCTION public.generate_user_id()
    RETURNS bigint
    LANGUAGE 'plpgsql'
AS $BODY$
DECLARE
    our_epoch bigint := 1314220021721;
    seq_id bigint;
    now_millis bigint;
    -- the id of this DB shard, must be set for each
    -- schema shard you have - you could pass this as a parameter too
    shard_id int := 1;
    result bigint:= 0;
BEGIN
    SELECT nextval('public.global_id_seq') % 1024 INTO seq_id;

    SELECT FLOOR(EXTRACT(EPOCH FROM clock_timestamp()) * 1000) INTO now_millis;
    result := (now_millis - our_epoch) << 23;
    result := result | (shard_id << 10);
    result := result | (seq_id);
	return result;
END;
$BODY$;
`);

export const down = (_: Pool) => {
	throw new Error("We are already at the lowest migration possible!");
};
