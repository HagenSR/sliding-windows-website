CREATE TABLE image_meta_data(
    meta_id serial primary key,
    tiff_sha_256 bytea,
    tiff_image_id int,
    window_size int,
    created_date timestamp default now(),
    last_accessed timestamp default now(),
    sliding_windows_operation int references sliding_windows_operations(op_id),
    file_name text
);