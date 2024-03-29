-- FUNCTION: api_functions.insert_geotiff(bytea)
--DROP FUNCTION IF EXISTS api_functions.insert_geotiff(bytea, bytea, int, int, text, float, float, float, float);
CREATE OR REPLACE FUNCTION api_functions.insert_geotiff(
        image_base64 bytea,
        image_sha text,
        win_size int,
        d_type text,
        oper_id int,
        file_name text,
        min_x numeric,
        min_y numeric,
        max_x numeric,
        max_y numeric
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
        dtype,
        sliding_windows_operation,
        file_name,
        bounding_box
    )
VALUES (
        image_sha,
        image_id,
        win_size,
        d_type,
        oper_id,
        file_name,
        ST_MakeEnvelope(
            min_x,
            min_y,
            max_x,
            max_y,
            4326
        )
    );
return image_id;
END;
$$;
ALTER FUNCTION api_functions.insert_geotiff(
    bytea,
    text,
    int,
    text,
    int,
    text,
    numeric,
    numeric,
    numeric,
    numeric
) OWNER TO postgres;