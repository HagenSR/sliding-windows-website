GRANT SELECT, update
ON ALL SEQUENCES IN SCHEMA public
    TO sliding_windows;
GRANT SELECT, update, insert, delete
ON ALL TABLES IN SCHEMA public
    TO sliding_windows;
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA api_functions TO sliding_windows;
GRANT USAGE ON  SCHEMA api_functions TO sliding_windows;