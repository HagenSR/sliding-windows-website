-- FUNCTION: api_functions.insert_geotiff(bytea)

-- DROP FUNCTION IF EXISTS api_functions.insert_geotiff(bytea);

CREATE OR REPLACE FUNCTION api_functions.insert_geotiff(
	image_base64 text)
    RETURNS integer
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $$
DECLARE decoded text := decode(image_base64, "base64");
BEGIN
INSERT INTO geotiff_cache(tiff_sha_256, tiff_image) 
VALUES (digest(decoded, 'sha256'), decoded) RETURNING tiff_id;
END;
$$;

ALTER FUNCTION api_functions.insert_geotiff(bytea)
    OWNER TO postgres;