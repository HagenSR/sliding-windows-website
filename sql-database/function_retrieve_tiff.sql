-- FUNCTION: api_functions.retrieve_tiff(integer)
DROP FUNCTION IF EXISTS api_functions.retrieve_tiff(bytea);

CREATE OR REPLACE FUNCTION api_functions.retrieve_tiff(
	tiff_sha bytea)
    RETURNS text
    LANGUAGE 'sql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
SELECT encode(tiff_image, 'base64') FROM geotiff_cache WHERE geotiff_cache.tiff_sha_256 = tiff_sha;
$BODY$;

ALTER FUNCTION api_functions.retrieve_tiff(bytea)
    OWNER TO postgres;