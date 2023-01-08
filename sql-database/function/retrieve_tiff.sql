-- FUNCTION: api_functions.retrieve_tiff(integer)
--DROP FUNCTION IF EXISTS api_functions.retrieve_tiff(bytea);

CREATE OR REPLACE FUNCTION api_functions.retrieve_tiff(
	image_id int)
    RETURNS text
    LANGUAGE 'sql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
SELECT encode(tiff_image, 'base64') FROM bytea_images WHERE bytea_images.tiff_image_id = image_id;
$BODY$;

ALTER FUNCTION api_functions.retrieve_tiff(int)
    OWNER TO postgres;