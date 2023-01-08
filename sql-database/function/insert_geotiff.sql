-- FUNCTION: api_functions.insert_geotiff(bytea)
-- DROP FUNCTION IF EXISTS api_functions.insert_geotiff(bytea);
CREATE OR REPLACE FUNCTION api_functions.insert_geotiff(
        image_base64 text,
        win_size int,
        oper_id int
    ) RETURNS integer LANGUAGE 'plpgsql' COST 100 VOLATILE PARALLEL UNSAFE AS $$
DECLARE decoded text := decode(image_base64, "base64");
DECLARE image_id int;
BEGIN

INSERT INTO bytea_images(tiff_image)
VALUES (decoded)
RETURNING tiff_image_id  INTO image_id;
INSERT INTO image_meta_data(
        tiff_sha_256,
        image_id,
        window_size,
        sliding_windows_operation
    )
VALUES (
        digest(decoded, 'sha256'),
        image_id,
        win_size,
        oper_id
    )
RETURNING tiff_id;
END;
$$;
ALTER FUNCTION api_functions.insert_geotiff(bytea) OWNER TO postgres;