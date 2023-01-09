GRANT USAGE, SELECT ON SEQUENCE  bytea_images_tiff_image_id_seq TO sliding_windows;
GRANT SELECT, update
ON ALL SEQUENCES IN SCHEMA public
    TO sliding_windows;