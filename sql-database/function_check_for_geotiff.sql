--DROP FUNCTION IF EXISTS api_functions.check_for_geotiff(bytea);

CREATE OR REPLACE FUNCTION api_functions.check_for_geotiff(
	tiff_sha bytea)
    RETURNS boolean
    LANGUAGE 'sql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
SELECT EXISTS(SELECT FROM geotiff_cache WHERE tiff_sha_256 = tiff_sha);
$BODY$;

ALTER FUNCTION api_functions.check_for_geotiff(bytea)
    OWNER TO postgres;