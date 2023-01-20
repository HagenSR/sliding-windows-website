
import * as L from 'leaflet'
declare module 'leaflet' {
    function leafletGeotiff(url: string, options: any): any
    namespace LeafletGeotiff {
        function plotty(options: any): any
    }
}
