-- Revert zoru:users from pg

BEGIN;

DROP TABLE flipr.users;

COMMIT;
