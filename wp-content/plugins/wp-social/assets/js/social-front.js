function xs_social_sharer(t) {
    let e = t.getAttribute("data-pid"),
        a = t.getAttribute("data-key"),
        r = t.getAttribute("data-uri_hash"),
        i = t.getAttribute("data-xs-href");
    window.open(i, "xs_feed_sharer", "width=626,height=436");
    let o = {
        pid: e,
        hash: r,
        social: a
    };
    jQuery.ajax({
        data: o,
        type: "post",
        url: window.rest_api_conf.root + "wp_social/v1/shared/url",
        beforeSend: function(t) {
            t.setRequestHeader("X-WP-Nonce", window.rest_api_conf.nonce)
        },
        success: function(t) {},
        error: function(t) {}
    })
}