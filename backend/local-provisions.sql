\echo 'Delete and recreate local-provisions db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE local-provisions;
CREATE DATABASE local-provisions;
\connect local-provisions

\i LP-schema.sql


\echo 'Delete and recreate local-provisions_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE local-provions_test;
CREATE DATABASE local-provisions_test;
\connect local-provisions_test

\i LP-schema.sql
