-- Run as Admin User
-- DROP SCHEMA bucketlist CASCADE;
-- CREATE SCHEMA bucketlist AUTHORIZATION acc;

CREATE TABLE bucketlist.USERS
(
  USER_ID  serial      PRIMARY KEY,
  USERNAME VARCHAR(30) NULL    ,
  TIMESTAMP_CREATED timestamp    NOT NULL DEFAULT current_timestamp,
);

CREATE TABLE bucketlist.ITEMS
(
  ITEM_ID           serial       PRIMARY KEY,
  DESCRIPTI0N       VARCHAR(100) NOT NULL,
  IS_COMPLETE       BOOLEAN      NOT NULL DEFAULT false,
  TIMESTAMP_CREATED timestamp    NOT NULL DEFAULT current_timestamp,
  USER_ID           serial       NOT NULL,
);



ALTER TABLE bucketlist.ITEMS
  ADD CONSTRAINT FK_USERS_TO_ITEMS
    FOREIGN KEY (USER_ID)
    REFERENCES USERS (USER_ID);