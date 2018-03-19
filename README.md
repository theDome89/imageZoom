# imageZoom

This is s short application to show a zoomed picture of your image while hovering the original one. While hovering an image, you will instantly see a zoomed part of the image your mouse is hovering.

To use the code, you have to init give your html code a structure like that:
<div class="zoom-area">
			<div class="image-wrapper" data-image-wrapper>
				<div class="image-container" data-image-container>
					<img
						src="https://cdn.pixabay.com/photo/2017/08/31/05/36/new-york-2699520_1280.jpg"
						data-zoom
						data-zoom-position="right"
						data-zoom-factor="2"
						data-image-width="300"
						data-equal-zoom-image-size="true"
					/>
				</div>
  </div>
</div>

The data-zoom attribute-position attribute defines the position where the zoomed image while be displayed relative to the original image.
The data-zoom-factor defines the zooming factor.
The data-image-width defines the width of the original image.
And the data-equal-zoom-image-size defines, whether the zoomed image container should have the same size as the original image container or not.

To initiate the image zoom just call $("[data-image-wrapper]").ImageZoom() after the DOM is ready.

You can also se the demo.html.
