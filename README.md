# imageZoom

This is s short application to show a zoomed picture of your image while hovering the original one. While hovering an image, you will instantly see a zoomed part of the image your mouse is hovering.

To use the code, you have to init give your html code a structure like that:
'<div class="zoom-area">
	<div class="image-wrapper" data-image-wrapper>
		<div class="image-container" data-image-container>
			<img
				src="<YOUR-IMG-SRC>"
				data-zoom
				data-zoom-position="<POS-TO-SHOW-ZOOMED-IMG>"
				data-zoom-factor="<ZOOMED-IMG-FACTOR>"
				data-image-width="<IMG-WIDTH>"
				data-equal-zoom-image-size="<SAME-SIZE-OR-NOT>"
			/>
		</div>
  	</div>
</div>'

The data-zoom attribute-position attribute defines the position where the zoomed image while be displayed relative to the original image.
The data-zoom-factor defines the zooming factor.
The data-image-width defines the width of the original image.
And the data-equal-zoom-image-size defines, whether the zoomed image container should have the same size as the original image container or not.

To initiate the image zoom just call $("[data-image-wrapper]").ImageZoom() after the DOM is ready.

You can also se the demo.html.
