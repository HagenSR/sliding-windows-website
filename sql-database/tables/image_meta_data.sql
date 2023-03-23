CREATE TABLE image_meta_data(
    meta_id serial primary key,
    tiff_sha_256 text,
    tiff_image_id int references bytea_images(tiff_image_id),
    window_size int,
    created_date timestamp default now(),
    last_accessed timestamp default now(),
    sliding_windows_operation int references sliding_windows_operations(op_id),
    file_name text, 
    bounding_box geometry
);
