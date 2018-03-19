(function (jQuery) {

    $.fn.ImageZoom = function () {
      var counter = 0;
        return this.each(function () {
          counter++;
          // set an id of 8 characters for every single element
          $(this).attr('id', counter.toString().padStart(8, '0'));

            // get the zoomable element
            var zoomableElement = $(this).find('[data-zoom]');

            // get all necessary parameters
            var position = zoomableElement.attr('data-zoom-position'),
                width = zoomableElement.attr('data-image-width'),
                factor,
                equalZoomSize = zoomableElement.attr('data-equal-zoom-image-size'),
                containerId = $(this).attr('id'),
                moveVertical,
                moveHorizontal;

            // check if the zoom image should be displayed in a container as big as the container of the original image
            if(equalZoomSize === 'true') {
                // if so first validate the defined factor attribute and define the horizontal and vertical movement and then set the dimensions
                factor = validateDefinedFactor($('#' + containerId + ' [data-image-container] img'), parseInt(zoomableElement.attr('data-zoom-factor')));
                // set the width of the image wrapper, that contains the zoomable image
                $('#' + containerId).width(width + 'px');
            }else{
                // otherwise first set the dimensions and then validate the defined factor attribute and define the horizontal and vertical movement
                // set the width of the image wrapper, that contains the zoomable image
                $('#' + containerId).width(width + 'px');
                factor = validateDefinedFactor($('#' + containerId + ' [data-image-container] img'), parseInt(zoomableElement.attr('data-zoom-factor')));
            }

            // set the hover state
            $('#' + containerId + ' [data-image-container] img').hover(function () {
                // if there is already an image, that shows the original one zoomed exit the function
                if ($(this).parent('[data-image-container]').children('[data-zoom-container]').length > 0) {
                    return false;
                }

                // get the html content to show in the zoom
                var imgContainerContent = $('#' + containerId + ' [data-image-container]').html();

                // create a new DOM element to show the zoomed image and append it to the correct zoom image container
                $('<div class="zoom-image-container" data-zoom-container>' + imgContainerContent + '</div>').appendTo($(this).parent('[data-image-container]'));

                // prepare the zooming container and set all relevant parameters
                zoomingContainerSetup($(this));

                // update the position in the zoom image
                $(this).mousemove(function (e) {
                    var pos = $(this).parent('[data-image-container]').position();
                    var leftPos = -(e.pageX - pos.left),
                        topPos = -(e.pageY - pos.top);
                    $('#' + containerId + ' [data-zoom-container] img').css({
                        'left': leftPos * moveHorizontal,
                        'top': topPos * moveVertical
                    });
                });

            }, function () {
                // just remove the zoom image if the mouse leaves the original image and the zoom image
                $(this).parent('[data-image-container]').mouseleave(function() {
                    $(this).find('[data-zoom-container]').remove();
                });
            });

            // create a validation image to get the natural image sizes of the original image and to define the horizontal and vertical movement
            function getValidationImage(imgZoomElement) {
                // create a new image for the zoom
                validationImage = new Image();
                validationImage.src = imgZoomElement.attr('src');

                // get the horizontal and vertical movement factor for the zoom image
                validationImage.onload = function () {
                    moveHorizontal = (this.width / imgZoomElement.width()) - factor;
                    moveVertical = (this.height / imgZoomElement.height()) - factor;
                }

                return validationImage;
            }

            // check if the defined factor is a valid setting
            function validateDefinedFactor(imgZoomElement, factor) {
                // set up a new image to be able to validate the factor
                var validationImage = getValidationImage(imgZoomElement);

                var zoomedWidth = imgZoomElement.width() * factor,
                    zoomedHeight = imgZoomElement.height() * factor;

                // we cannot zoom more than the dimension of the original image
                if(zoomedWidth > validationImage.naturalWidth) {
                    factor = Math.floor(validationImage.naturalWidth/imgZoomElement.width());
                }else if(zoomedHeight > validationImage.naturalHeight) {
                    factor = Math.floor(validationImage.naturalHeight/imgZoomElement.height());
                }

                return factor;
            }

            function zoomingContainerSetup(imgZoomElement) {
                // set up a new image to be able to get the natural image height and the natural image width of the original image
                var validationImage = getValidationImage(imgZoomElement);
                var zoomedWidth = imgZoomElement.width() * factor,
                    zoomedHeight = imgZoomElement.height() * factor;

                // get the ratio depending on the the natural image width and the real image width
                var ratio = validationImage.naturalWidth/width;

                // set the correct css to show the zoomed image on the right position
                switch(position) {
                  case 'left':
                    $('[data-zoom-container]').css({
                        'right': width + 'px'
                    });
                    break;
                  case 'right':
                    $('[data-zoom-container]').css({
                        'left': width + 'px'
                    });
                    break;
                  case 'top':
                    $('[data-zoom-container]').css({
                        'top': (((validationImage.naturalHeight/ratio)*(-factor))-30)
                    });
                    break;
                  case 'bottom':
                  default:
                    $('[data-zoom-container]').css({
                        'top': (validationImage.naturalHeight/ratio)
                    });
                    break;
                };

                // set the new width and height
                $('[data-zoom-container]').width(zoomedWidth).height(zoomedHeight);
            }
        });
    };

})(jQuery);
