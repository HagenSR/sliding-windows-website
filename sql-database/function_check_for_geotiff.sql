CREATE OR REPLACE FUNCTION api_functions.check_for_geotiff(
	file_bytes bytea)
    RETURNS boolean
    LANGUAGE 'sql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
SELECT EXISTS(SELECT FROM geotiff_cache WHERE tiff_sha_256 = digest(file_bytes, 'sha256'));
$BODY$;

ALTER FUNCTION api_functions.check_for_geotiff(bytea)
    OWNER TO postgres;
