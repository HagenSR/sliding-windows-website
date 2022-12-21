-- FUNCTION: api_functions.insert_geotiff(bytea)

-- DROP FUNCTION IF EXISTS api_functions.insert_geotiff(bytea);

CREATE OR REPLACE FUNCTION api_functions.insert_geotiff(
	image bytea)
    RETURNS integer
    LANGUAGE 'sql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
INSERT INTO geotiff_cache(tiff_sha_256, tiff_image) VALUES (digest(image, 'sha256'), image) RETURNING tiff_id;
$BODY$;

ALTER FUNCTION api_functions.insert_geotiff(bytea)
    OWNER TO postgres;