CREATE TABLE geotiff_cache(
    tiff_id serial primary key,
    tiff_image raster,
    tiff_sha_256 uuid
);