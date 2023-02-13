\echo 'Delete and recreate local_provisions db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE local_provisions;
CREATE DATABASE local_provisions;
\connect local_provisions

\i LP-schema.sql
\i LP-seed.sql


\echo 'Delete and recreate local_provisions_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE local_provions_test;
CREATE DATABASE local_provisions_test;
\connect local_provisions_test

\i LP-schema.sql
