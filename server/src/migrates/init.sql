DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

CREATE TABLE "products" (
  "id" SERIAL PRIMARY KEY,
  "sort_id" float,
  "type_sale" varchar,
  "name" varchar,
  "description" varchar,
  "price" float,
  "vat" float,
  "price_vat" float,
  "inventory" float,
  "unit" varchar,
  "size" varchar,
  "lot_number" varchar,
  "remark" varchar,
  "type_product" varchar,
  "created_at" timestamp,
  "updated_at" timestamp
);

DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "email" varchar,
  "password" varchar,
  "first_name" varchar,
  "last_name" varchar,
  "roles" float,
  "remark" varchar,
  "session" varchar,
  "created_at" timestamp,
  "updated_at" timestamp
);