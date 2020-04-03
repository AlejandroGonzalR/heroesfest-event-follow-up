CREATE DATABASE heroesfest;
CREATE ROLE server WITH LOGIN PASSWORD '1234';
GRANT ALL PRIVILEGES ON DATABASE heroesfest TO server;
\c heroesfest

CREATE TABLE heroes (
  id SERIAL PRIMARY KEY,
  name VARCHAR(60),
  surname VARCHAR(60),
  document_type VARCHAR(10),
  gender VARCHAR(10),
  institution VARCHAR(100),
  department VARCHAR(20),
  city VARCHAR(30),
  num SMALLINT,
  occupation VARCHAR(60),
  sector VARCHAR(30),
  education VARCHAR(30),
  entrepreneurship_experience VARCHAR(120),
  power VARCHAR(255),
  motivation VARCHAR(120),
  assistance VARCHAR(120),
  checkin VARCHAR(60),
  registry VARCHAR(60)
);

GRANT ALL PRIVILEGES ON TABLE heroes TO server;

\copy heroes FROM '/var/lib/postgresql/data/ASISTENTES_AL_EVENTO_HEROES_FEST.csv' DELIMITERS ',' CSV header;

ALTER TABLE heroes OWNER TO server;
COMMIT;
