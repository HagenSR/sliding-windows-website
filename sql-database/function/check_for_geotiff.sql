--DROP FUNCTION IF EXISTS api_functions.check_for_geotiff(bytea);
CREATE OR REPLACE FUNCTION api_functions.check_for_geotiff(
        original_tiff_sha bytea,
        win_size int,
        oper_id int
    ) RETURNS boolean LANGUAGE 'sql' COST 100 VOLATILE PARALLEL UNSAFE AS $BODY$
SELECT EXISTS(
        SELECT
        FROM image_meta_data
        WHERE tiff_sha_256 = original_tiff_sha
            and window_size = win_size
            and sliding_windows_operation = oper_id
    );
$BODY$;
ALTER FUNCTION api_functions.check_for_geotiff(bytea) OWNER TO postgres;