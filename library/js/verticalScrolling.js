function verticalScrolling()
{
    jQuery('[data-target]').on('click', function (e) 
    {
        e.preventDefault();
        jQuery('html').stop(true, false);
        goToScreen(jQuery(this));
    });
}

function goToScreen( object ) 
{
    var destination = object.attr('data-target');
    var effect      = object.attr('data-effect');
    var time        = object.attr('data-time');
    var callback    = object.attr('data-callback');
    
    // destination control
    if (destination.search(/^[\.#]/gi) > -1) {
        // object
        destination = jQuery(object.attr('data-target'));
    } else if ( object.attr('data-target').search(/^\d.*/) > -1 )  {
        // position
        destination = object.attr('data-target').replace(/\D+/g, '');
    } else {
        // convert object
        destination = jQuery('.' + object.attr('data-target'));
    }
    
    var effects = [
        'swing', 'linear', 'easeInQuad', 'easeOutQuad', 'easeInOutQuad', 'easeInCubic',
        'easeOutCubic', 'easeInOutCubic', 'easeInQuart', 'easeOutQuart', 'easeInOutQuart',
        'easeInQuint', 'easeOutQuint', 'easeInOutQuint', 'easeInExpo', 'easeOutExpo',
        'easeInOutExpo', 'easeInSine', 'easeOutSine', 'easeInOutSine', 'easeInCirc',
        'easeOutCirc', 'easeInOutCirc', 'easeInElastic', 'easeOutElastic', 'easeOutElastic',
        'easeInBack', 'easeOutBack', 'easeInOutBack', 'easeInBounce', 'easeOutBounce', 'easeInOutBounce'
    ];
 
    if (destination > -1) {
        var value = destination;
        jQuery('.activePage').removeClass('activePage');
    } else {
        var value = destination.offset().top;
        jQuery('.activePage').removeClass('activePage');
        destination.addClass('activePage');
    }

    jQuery('html').animate
    (
        {
            scrollTop: value
        },
        time || 600,
        effect === 'random' ?  effects[Math.floor((Math.random() * (effects.length)) + 1)] : effects[0],
        function () {
            eval(callback);
        }
    );
    
    jQuery(window).resize(function ()
    {
        jQuery( 'html' ).stop( true,false );
        jQuery( 'html' ).scrollTop( jQuery( '.activePage' ).offset().top )
    });
}
