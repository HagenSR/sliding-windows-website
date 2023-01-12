export interface TiffMetaData {
    created_date: Date;
    file_name: string;
    last_accessed: Date;
    meta_id : number;
    sliding_windows_operation: number,
    tiff_image_id: number,
    tiff_sha_256: string,
    window_size: number,
}