CREATE TABLE geotiff_cache(
    tiff_id serial primary key,
    tiff_image bytea,
    tiff_sha_256 bytea
);