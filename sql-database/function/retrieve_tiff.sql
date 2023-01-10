-- FUNCTION: api_functions.retrieve_tiff(integer)
--DROP FUNCTION IF EXISTS api_functions.retrieve_tiff(int);
CREATE OR REPLACE FUNCTION api_functions.retrieve_tiff(image_id int) RETURNS bytea LANGUAGE 'sql' COST 100 VOLATILE PARALLEL UNSAFE AS $BODY$

UPDATE image_meta_data
SET last_accessed = now()
WHERE tiff_image_id = image_id;

SELECT tiff_image
FROM bytea_images
WHERE bytea_images.tiff_image_id = image_id;
$BODY$;
ALTER FUNCTION api_functions.retrieve_tiff(int) OWNER TO postgres;