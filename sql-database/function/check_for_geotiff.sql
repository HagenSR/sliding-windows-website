--DROP FUNCTION IF EXISTS api_functions.check_for_geotiff(bytea, int, int);
CREATE OR REPLACE FUNCTION api_functions.check_for_geotiff(
        original_tiff_sha bytea,
        win_size int,
        oper_id int
    ) RETURNS int LANGUAGE 'plpgsql' COST 100 VOLATILE PARALLEL UNSAFE AS $$ 
BEGIN    
    RETURN (
        SELECT image_meta_data.tiff_image_id
        FROM image_meta_data
        WHERE tiff_sha_256 = original_tiff_sha
            and window_size = win_size
            and sliding_windows_operation = oper_id
        LIMIT 1
    );
END
$$;
ALTER FUNCTION api_functions.check_for_geotiff(bytea, int, int) OWNER TO postgres;