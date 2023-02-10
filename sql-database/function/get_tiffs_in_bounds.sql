CREATE FUNCTION api_functions.get_tiffs_in_bounds(
    min_x double precision,
    min_y double precision,
    max_x double precision,
    max_y double precision
) RETURNS TABLE(
    meta_id int,
    tiff_sha_256 text,
    tiff_image_id int,
    window_size int,
    created_date timestamp,
    last_accessed timestamp,
    sliding_windows_operation int,
    file_name text,
    geo_json text
) LANGUAGE plpgsql AS $$ BEGIN RETURN QUERY
SELECT image_meta_data.meta_id,
    image_meta_data.tiff_sha_256,
    image_meta_data.tiff_image_id,
    image_meta_data.window_size,
    image_meta_data.created_date,
    image_meta_data.last_accessed,
    image_meta_data.sliding_windows_operation,
    image_meta_data.file_name,
    st_asgeojson(image_meta_data.bounding_box)
FROM image_meta_data
WHERE ST_Within(
        image_meta_data.bounding_box,
        ST_MakeEnvelope(min_x, min_y, max_x, max_y, 4326)
    );
END;
$$;