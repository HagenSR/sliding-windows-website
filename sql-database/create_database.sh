shopt -s expand_aliases
psql sliding_windows_website -f tables/bytea_images.sql
psql sliding_windows_website -f tables/sliding_windows_operations.sql
psql sliding_windows_website -f tables/image_meta_data.sql
psql sliding_windows_website -f other/insert_operations.sql
psql sliding_windows_website -f other/create_index.sql
psql sliding_windows_website -f function/check_for_geotiff.sql
psql sliding_windows_website -f function/insert_geotiff.sql
psql sliding_windows_website -f function/retrieve_tiff.sql