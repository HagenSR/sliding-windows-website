// in the global namesapce "L"
declare module "leaflet-geotiff-2";
declare namespace L {
    namespace LeafletGeotiff{
        export function leafletGeotiff(url : string, options : any): TileLayer;
    }
    }