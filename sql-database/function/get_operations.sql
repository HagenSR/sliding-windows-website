-- FUNCTION: api_functions.insert_geotiff(bytea)
--DROP FUNCTION IF EXISTS api_functions.insert_geotiff(bytea, bytea, int, int);
CREATE OR REPLACE FUNCTION api_functions.get_operations() RETURNS TABLE(
        op_id int,
        op_desc text
    ) LANGUAGE 'plpgsql' COST 100 VOLATILE PARALLEL UNSAFE AS $$ --DECLARE decoded text := decode(image_base64, 'base64');
BEGIN RETURN QUERY
SELECT sliding_windows_operations.op_id,
    sliding_windows_operations.op_desc
FROM sliding_windows_operations;
END;
$$;
ALTER FUNCTION api_functions.get_operations() OWNER TO postgres;