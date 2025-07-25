function check_instagram_cache() {
    jQuery.ajax({
        data: {
            route: "",
            _token: ""
        },
        type: "post",
        url: window.rest_config.rest_url + "wslu/v1/check_cache/instagram/",
        beforeSend: function(e) {
            e.setRequestHeader("X-WP-Nonce", rest_config.nonce)
        },
        success: function(e) {
            e.success && e.expired && fetch_and_cache_instagram_count(e.unm), console.log("Instagram data cache was initiated - ", e)
        },
        error: function(e) {},
        complete: function() {}
    })
}

function fetch_and_cache_instagram_count(e) {
    jQuery.get("https://www.instagram.com/" + e + "/?__a=1", (function(t) {
        console.log(t.graphql.user.edge_followed_by), console.log(t);
        var s = 0;
        t.graphql.user.edge_followed_by && (s = t.graphql.user.edge_followed_by), jQuery.ajax({
            type: "POST",
            url: window.rest_config.rest_url + "wslu/v1/save_cache/instagram/",
            data: {
                content: s
            },
            success: function(t) {
                console.log("Instagram data fetch for user - " + e, t)
            },
            error: function(t) {
                console.log("Instagram data fetch failed for user - " + e, t)
            }
        })
    }))
}
jQuery(document).ready((function(e) {
    var t;
    e(window).on("resize.wslu", (function() {
        let s = (t = e(".xs_social_share_widget.wslu-share-horizontal.wslu-main_content")).parent(),
            a = t.find(".wslu-share-count"),
            n = s.width(),
            o = t.find("ul").outerWidth(!0) || null;
        if (a.length && (o = a.outerWidth(!0) || null), o && o > n) {
            let s = a.length ? a.outerWidth(!0) : 0;
            temLength = s || 0;
            let o, r = t.find("ul li");
            for (let t = 0; t <= r.length; t++)
                if (temLength += e(r).eq(t).outerWidth(!0), temLength > n) {
                    temLength -= e(r).eq(t).outerWidth(!0), o = e(r).eq(t - 2).outerWidth(!0);
                    break
                }
            shareBTN = 76;
            let l = Math.floor((temLength - s) / o),
                c = shareBTN > o ? Math.ceil(shareBTN / o) : 1;
            t.find("ul li").slice(l - c).wrapAll("<div class='wslu-share-more'><ul></ul></div>")
        }
    })).trigger("resize.wslu"), t.find(".wslu-share-more").prepend('<span class="wslu-share-more-btn-close met-social met-social-cross"></span><h3 class="wslu-share-more-btn-title">Share this with:</h3>').before('<li class="wslu-share-more-btn"><a href="#"><div class="wslu-both-counter-text"><span class="wslu-share-more-btn--icon met-social met-social-share-1"></span> Share</div></a></li>'), e(".xs_social_share_widget").on("click", ".wslu-share-more-btn", (function() {
        e(this).addClass("active").next().addClass("active")
    })), e(".xs_social_share_widget").on("click", ".wslu-share-more-btn-close", (function() {
        e(this).parent().removeClass("active").prev().removeClass("active")
    })), "1" == rest_config.insta_enabled && setTimeout((function(e) {}), 1200)
}));