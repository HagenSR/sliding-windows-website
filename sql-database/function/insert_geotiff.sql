-- FUNCTION: api_functions.insert_geotiff(bytea)
--DROP FUNCTION IF EXISTS api_functions.insert_geotiff(bytea, bytea, int, int);
CREATE OR REPLACE FUNCTION api_functions.insert_geotiff(
        image_base64 bytea,
        image_sha text,
        win_size int,
        oper_id int,
        file_name text,
        min_x double precision,
        min_y double precision,
        max_x double precision,
        max_y double precision
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
        sliding_windows_operation, 
        file_name,
        min_x,
        min_y,
        max_x,
        max_y
    )
VALUES (
        image_sha,
        image_id,
        win_size,
        oper_id,
        file_name,
        min_x,
        min_y,
        max_x,
        max_y
    );
return image_id;
END;
$$;
ALTER FUNCTION api_functions.insert_geotiff(bytea, text, int, int, text, double precision, double precision, double precision, double precision) OWNER TO postgres;