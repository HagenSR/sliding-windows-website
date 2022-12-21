-- FUNCTION: api_functions.retrieve_tiff(integer)

-- DROP FUNCTION IF EXISTS api_functions.retrieve_tiff(integer);

CREATE OR REPLACE FUNCTION api_functions.retrieve_tiff(
	tiff_id integer)
    RETURNS bytea
    LANGUAGE 'sql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
SELECT tiff_image FROM geotiff_cache WHERE geotiff_cache.tiff_id = tiff_id;
$BODY$;

ALTER FUNCTION api_functions.retrieve_tiff(integer)
    OWNER TO postgres;