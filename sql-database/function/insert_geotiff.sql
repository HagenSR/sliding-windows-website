-- FUNCTION: api_functions.insert_geotiff(bytea)
--DROP FUNCTION IF EXISTS api_functions.insert_geotiff(bytea, bytea, int, int);
CREATE OR REPLACE FUNCTION api_functions.insert_geotiff(
        image_base64 bytea,
        image_sha bytea,
        win_size int,
        oper_id int
    ) RETURNS integer LANGUAGE 'plpgsql' COST 100 VOLATILE PARALLEL UNSAFE AS $$ --DECLARE decoded text := decode(image_base64, 'base64');
DECLARE image_id int;
BEGIN

INSERT INTO bytea_images(tiff_image)
VALUES (image_base64)
RETURNING tiff_image_id INTO image_id;


INSERT INTO image_meta_data(
        tiff_sha_256,
        tiff_image_id,
        window_size,
        sliding_windows_operation
    )
VALUES (
        image_sha,
        image_id,
        win_size,
        oper_id
    );
return image_id;
END;
$$;
ALTER FUNCTION api_functions.insert_geotiff(bytea, bytea, int, int) OWNER TO postgres;