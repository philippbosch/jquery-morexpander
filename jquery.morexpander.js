(function($) {
    $.fn.morexpander = function(options) {
        options = $.extend({}, $.morexpander.defaults, options);
        $(this).bind('click', function(e) {
            e.preventDefault();
            if ($(this).data('running')) {
                return;
            }
            var link = this;
            $(this).data('running',true);
            var $moreContainer;
            if (!$(link).parent().prev().is('.more-container')) {
                $moreContainer = $('<div>').attr('class', 'more-container');
                var $linkContainer = $(link).parent();
                $moreContainer.load($(link).attr('href') + ' .main-content', function(data) {
                    $moreContainer.hide();
                    $linkContainer.before($moreContainer);
                    $moreContainer.css('opacity', 0).slideDown(options['transitionDuration']).animate({'opacity': 1}, options['transitionDuration']);
                    $(link).data('running',false);
                });
                $(link).text(options['lessLabel']);
            } else {
                $moreContainer = $(link).parent().prev('.more-container');
                $moreContainer.animate({'opacity': 0}, options['transitionDuration']).slideUp(options['transitionDuration'], function() {
                    $moreContainer.remove();
                });
                $(link).text(options['moreLabel']);
                $(link).data('running',false);
            }
        });
        
    };
    $.morexpander = {
        'defaults': {
            'transitionDuration': 250,
            'moreLabel': 'mehr …',
            'lessLabel': 'weniger …'
        }
    };
})(jQuery);
