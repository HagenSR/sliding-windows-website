from windowagg.sliding_window import SlidingWindow

with SlidingWindow("cropped.tif") as slide_window:
    # slide_window.auto_plot = self.auto_plot
    slide_window.initialize_dem()
    slide_window.aggregate_dem(2)
    slide_window.dem_slope()

    # slide_window.aggregate_dem(1)
    # slide_window.dem_slope()
