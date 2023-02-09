
--DROP FUNCTION api_functions.get_meta_data(int);
CREATE OR REPLACE FUNCTION api_functions.get_meta_data(tiff_id int) RETURNS TABLE(
        meta_id int,
        tiff_sha_256 text,
        tiff_image_id int,
        window_size int,
        created_date timestamp,
        last_accessed timestamp,
        sliding_windows_operation int,
        file_name text,    
        bounding_box text
    ) LANGUAGE plpgsql AS $$ BEGIN -- Select latest code files. Because of the serial nature of submissionID, we can use max(subid) to 
    -- find the latest submission.
    RETURN QUERY
SELECT image_meta_data.meta_id,
    image_meta_data.tiff_sha_256,
    image_meta_data.tiff_image_id,
    image_meta_data.window_size,
    image_meta_data.created_date,
    image_meta_data.last_accessed,
    image_meta_data.sliding_windows_operation,
    image_meta_data.file_name,
    ST_asgeojson(image_meta_data.bounding_box)
FROM image_meta_data
WHERE image_meta_data.tiff_image_id = tiff_id;
end;
$$;
ALTER FUNCTION api_functions.get_meta_data(int) OWNER TO postgres;