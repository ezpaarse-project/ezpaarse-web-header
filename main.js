(function() {
  'use strict';

  if (window.jQuery) {
    init(window.jQuery);
  } else {
    loadJqueryAndInvokeInit();
  }

  function init ($) {
    var ressourcesUrl = 'https://header.ezpaarse.org';

    $.ajax({
      url: ressourcesUrl + '/public/css/style-min.css',
      success: function(data) {

        $('head').append('<style>' + data + '</style>');

        $.ajax({
          url: ressourcesUrl + '/views/header.view.html',
          success: function(_data) {
            var prependToTarget = 'body';

            var $webHeader =
              $(jQuery.parseHTML(_data))
              .filter('#pkepEzpaarseHeader')
              .find('img').each(rewriteImgUrl).end()
              .prependTo($(prependToTarget))
              .find('[href*="#"]').click(preventDefaultEvent).end()
              .find('[href*="' + window.location.hostname + '"]').addClass('disabled').click(
              preventDefaultEvent).end()
              ;

            window.location.hostname === 'www.inist.fr' && $webHeader.find('#pkepLogoEzpaarse').remove();
          },
          error: function(jqXHR, textStatus, errorThrown) {
            console.error(textStatus, errorThrown);
          }

        });
      }
    });

    function rewriteImgUrl () {
      $(this).attr('src', function(index, attr) {
        return attr.replace(/^(?!http)(?:\/?([^/#"]+))+$/i, ressourcesUrl + '/public/img/$1');
      });
    }

  }


  function loadJqueryAndInvokeInit () {
    var script = document.createElement('script');
    script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js';
    script.onload = function() {
      init(window.jQuery.noConflict());
      document.head.removeChild(script);
    };
    document.head.appendChild(script);

  }

  function preventDefaultEvent (e) {
    e.preventDefault();
  }

}());
