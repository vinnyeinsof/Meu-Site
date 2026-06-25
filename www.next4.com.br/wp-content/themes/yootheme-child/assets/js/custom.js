document.addEventListener('wpcf7submit', function(event) {
    if ('200' == event.detail.contactFormId && event.detail.status == 'mail_sent') {
        window.location.href = "https://next4.com.br/obrigado-form-contato/";
    }
}, false);
Object


jQuery.noConflict();
(function($) {
    $(function() {
        $(document).on('click', '[data-openwhats]', function(e) {
            e.preventDefault();
            var ele = $(this).data("openwhats");
            $(ele).trigger("click");
        });
    });
})(jQuery);