"use strict";

//hidding menu elements that do not fit in menu width
//processing center logo
function menuHideExtraElements() {

    //cleaneng changed elements
    jQuery('.sf-more-li, .sf-logo-li').remove();
    var windowWidth = jQuery('body').innerWidth();

    jQuery('.sf-menu').each(function() {
        var $thisMenu = jQuery(this);
        var $menuWraper = $thisMenu.closest('.mainmenu_wrapper');
        $menuWraper.attr('style', '');
        if (windowWidth > 991) {
            //grab all main menu first level items
            var $menuLis = $menuWraper.find('.sf-menu > li');
            $menuLis.removeClass('sf-md-hidden');

            var $headerLogoCenter = $thisMenu.closest('.header_logo_center');
            var logoWidth = 0;
            var summaryLiWidth = 0;

            if ($headerLogoCenter.length) {
                var $logo = $headerLogoCenter.find('.logo');
                // 30/2 - left and right margins
                logoWidth = $logo.outerWidth(true) + 70;
            }

            if (false) {
                var wrapperWidth = $menuWraper.outerWidth(true);
                $menuLis.each(function(index) {
                    var elementWidth = jQuery(this).outerWidth();
                    summaryLiWidth += elementWidth;
                    if (summaryLiWidth >= (wrapperWidth - logoWidth)) {
                        var $newLi = jQuery('<li class="sf-more-li"><a>...</a><ul class="sub-menu"></ul></li>');
                        jQuery('ul.children').addClass('sub-menu');
                        jQuery($menuLis[index - 1]).before($newLi);
                        var newLiWidth = jQuery($newLi).outerWidth(true);
                        var $extraLiElements = $menuLis.filter(':gt(' + (index - 2) + ')');
                        $extraLiElements.clone().appendTo($newLi.find('ul'));
                        $extraLiElements.addClass('sf-md-hidden');
                        return false;
                    }
                });
            }

            //processing center logo
            if ($headerLogoCenter.length) {
                var $menuLisVisible = $headerLogoCenter.find('.sf-menu > li:not(.sf-md-hidden)');
                var menuLength = $menuLisVisible.length;
                var summaryLiVisibleWidth = 0;
                $menuLisVisible.each(function() {
                    summaryLiVisibleWidth += jQuery(this).outerWidth();
                });

                var centerLi = Math.floor(menuLength / 2);
                if ((menuLength % 2 === 0)) {
                    centerLi--;
                }
                var $liLeftFromLogo = $menuLisVisible.eq(centerLi);
                $liLeftFromLogo.after('<li class="sf-logo-li"></li>');
                $headerLogoCenter.find('.sf-logo-li').width(logoWidth);
                var liLeftRightDotX = $liLeftFromLogo.offset().left + $liLeftFromLogo.outerWidth();
                var logoLeftDotX = windowWidth / 2 - logoWidth / 2;
                var menuLeftOffset = liLeftRightDotX - logoLeftDotX;
                $menuWraper.css({
                    'left': -menuLeftOffset
                })
            }

        } // > 991
    }); //sf-menu each
} //menuHideExtraElements

function initMegaMenu() {
    var $megaMenu = jQuery('.mainmenu_wrapper .mega-menu');
    if ($megaMenu.length) {
        var windowWidth = jQuery('body').innerWidth();
        if (windowWidth > 991) {
            $megaMenu.each(function() {
                var $thisMegaMenu = jQuery(this);
                //temporary showing mega menu to propper size calc
                $thisMegaMenu.css({
                    'display': 'block',
                    'left': 'auto'
                });
                var thisWidth = $thisMegaMenu.outerWidth();
                var thisOffset = $thisMegaMenu.offset().left;
                var thisLeft = (thisOffset + (thisWidth / 2)) - windowWidth / 2;
                $thisMegaMenu.css({
                    'left': -thisLeft,
                    'display': 'none'
                });
                if (!$thisMegaMenu.closest('ul').hasClass('nav')) {
                    $thisMegaMenu.css('left', '');
                }
            });
        }
    }
}

function pieChart() {
    //circle progress bar
    if (jQuery().easyPieChart) {

        jQuery('.chart').each(function() {

            var $currentChart = jQuery(this);
            var imagePos = $currentChart.offset().top;
            var topOfWindow = jQuery(window).scrollTop();
            if (imagePos < topOfWindow + 900) {

                var size = $currentChart.data('size') ? $currentChart.data('size') : 270;
                var line = $currentChart.data('line') ? $currentChart.data('line') : 20;
                var bgcolor = $currentChart.data('bgcolor') ? $currentChart.data('bgcolor') : '#ffffff';
                var trackcolor = $currentChart.data('trackcolor') ? $currentChart.data('trackcolor') : '#c14240';
                var speed = $currentChart.data('speed') ? $currentChart.data('speed') : 3000;

                $currentChart.easyPieChart({
                    barColor: trackcolor,
                    trackColor: bgcolor,
                    scaleColor: false,
                    scaleLength: false,
                    lineCap: 'butt',
                    lineWidth: line,
                    size: size,
                    rotate: 0,
                    animate: speed,
                    onStep: function(from, to, percent) {
                        jQuery(this.el).find('.percent').text(Math.round(percent));
                    }
                });
            }
        });
    }
}

function affixSidebarInit() {
    var $affixAside = jQuery('.affix-aside');
    if ($affixAside.length) {

        //on stick and unstick event
        $affixAside.on('affix.bs.affix', function(e) {
            var affixWidth = $affixAside.width() - 1;
            var affixLeft = $affixAside.offset().left;
            $affixAside
                .width(affixWidth)
                .css("left", affixLeft);
        }).on('affix-top.bs.affix affix-bottom.bs.affix', function(e) {
            $affixAside.css({
                "width": "",
                "left": ""
            });
        });

        //counting offset
        var offsetTop = $affixAside.offset().top - jQuery('.page_header').height();
        var offsetBottom = jQuery('.page_footer').outerHeight(true) + jQuery('.page_copyright').outerHeight(true);

        $affixAside.affix({
            offset: {
                top: offsetTop,
                bottom: offsetBottom
            },
        });

        jQuery(window).on('resize', function() {
            $affixAside.css({
                "width": "",
                "left": ""
            });

            if ($affixAside.hasClass('affix')) {
                //returning sidebar in top position if it is sticked because of unexpacted behavior
                $affixAside.removeClass("affix").css("left", "").addClass("affix-top");
            }

            var offsetTop = jQuery('.page_topline').outerHeight(true) +
                jQuery('.page_toplogo').outerHeight(true) +
                jQuery('.page_breadcrumbs').outerHeight(true) +
                jQuery('.page_header').outerHeight(true);
            var offsetBottom = jQuery('.page_footer').outerHeight(true) + jQuery('.page_copyright').outerHeight(true);

            $affixAside.data('bs.affix').options.offset.top = offsetTop;
            $affixAside.data('bs.affix').options.offset.bottom = offsetBottom;

            $affixAside.affix('checkPosition');

        });

    } //eof checking of affix sidebar existing
}

function mobileLS() {
    var windowWidth = jQuery('body').innerWidth();
    if (windowWidth < 1400) {
        jQuery(".mobile-ls").removeClass('ds').addClass('ls');
    }
    if (windowWidth > 1399) {
        jQuery(".mobile-ls").removeClass('ls').addClass('ds');
    }
}

//function that initiating template plugins on document.ready event
function documentReadyInit() {
    ////////////
    //mainmenu//
    ////////////
    if (jQuery().scrollbar) {
        jQuery('[class*="scrollbar-"]').scrollbar();
    }
    if (jQuery().superfish) {
        jQuery('ul.sf-menu').superfish({
            popUpSelector: 'ul:not(.mega-menu ul), .mega-menu ',
            delay: 700,
            animation: {
                opacity: 'show',
                marginTop: 0
            },
            animationOut: {
                opacity: 'hide',
                marginTop: -15
            },
            speed: 200,
            speedOut: 200,
            disableHI: false,
            cssArrows: true,
            autoArrows: true,
            onInit: function() {
                var $thisMenu = jQuery(this);
                $thisMenu.find('.sf-with-ul').after('<span class="sf-menu-item-mobile-toggler"/>');
                $thisMenu.find('.sf-menu-item-mobile-toggler').on('click', function(e) {
                    var $parentLi = jQuery(this).parent();
                    if ($parentLi.hasClass('sfHover')) {
                        $parentLi.superfish('hide');
                    }
                });
            }
        });
        jQuery('ul.sf-menu-side').superfish({
            popUpSelector: 'ul:not(.mega-menu ul), .mega-menu ',
            delay: 500,
            animation: {
                opacity: 'show',
                height: 100 + '%'
            },
            animationOut: {
                opacity: 'hide',
                height: 0
            },
            speed: 400,
            speedOut: 300,
            disableHI: false,
            cssArrows: true,
            autoArrows: true
        });
    }

    //toggle mobile menu
    jQuery('.toggle_menu').on('click', function() {
        jQuery('.toggle_menu').toggleClass('mobile-active');
        jQuery('.page_header').toggleClass('mobile-active');
    });

    jQuery('.mainmenu a').on('click', function() {
        if (!jQuery(this).hasClass('sf-with-ul')) {
            jQuery('.toggle_menu').toggleClass('mobile-active');
            jQuery('.page_header').toggleClass('mobile-active');
        }
    });

    //side header processing
    var $sideHeader = jQuery('.page_header_side');
    if ($sideHeader.length) {
        var $body = jQuery('body');
        jQuery('.toggle_menu_side').on('click', function() {
            if (jQuery(this).hasClass('header-slide')) {
                $sideHeader.toggleClass('active-slide-side-header');
            } else {
                if (jQuery(this).parent().hasClass('header_side_right')) {
                    $body.toggleClass('active-side-header slide-right');
                } else {
                    $body.toggleClass('active-side-header');
                }
            }
        });
        // toggle sub-menus visibility on menu-side-click
        jQuery('ul.menu-side-click').find('li').each(function() {
            var $thisLi = jQuery(this);
            //toggle submenu only for menu items with submenu
            if ($thisLi.find('ul').length) {
                $thisLi
                    .append('<span class="activate_submenu"></span>')
                    .find('.activate_submenu')
                    .on('click', function() {
                        var $thisSpan = jQuery(this);
                        if ($thisSpan.parent().hasClass('active-submenu')) {
                            $thisSpan.parent().removeClass('active-submenu');
                            return;
                        }
                        $thisLi.addClass('active-submenu').siblings().removeClass('active-submenu');
                    });
            } //eof sumbenu check
        });
        //hidding side header on click outside header
        jQuery('body').on('click', function(e) {
            if (!jQuery(e.target).closest('.page_header_side').length) {
                $sideHeader.removeClass('active-slide-side-header');
                $body.removeClass('active-side-header slide-right');
            }
        });
    } //sideHeader check

    //1 and 2/3/4th level mainmenu offscreen fix
    var MainWindowWidth = jQuery(window).width();
    jQuery(window).on('resize', function() {
        MainWindowWidth = jQuery(window).width();
    });
    //2/3/4 levels
    jQuery('.mainmenu_wrapper .sf-menu').on('mouseover', 'ul li', function() {

        if (MainWindowWidth > 991) {
            var $this = jQuery(this);
            // checks if third level menu exist         
            var subMenuExist = $this.find('ul').length;
            if (subMenuExist > 0) {
                var subMenuWidth = $this.find('ul, div').first().width();
                var subMenuOffset = $this.find('ul, div').first().parent().offset().left + subMenuWidth;
                // if sub menu is off screen, give new position
                if ((subMenuOffset + subMenuWidth) > MainWindowWidth) {
                    var newSubMenuPosition = subMenuWidth + 0;
                    $this.find('ul, div').first().css({
                        left: -newSubMenuPosition,
                    });
                } else {
                    $this.find('ul, div').first().css({
                        left: '100%',
                    });
                }
            }
        }
        //1st level
    }).on('mouseover', '> li', function() {
        if (MainWindowWidth > 991) {
            var $this = jQuery(this);
            var subMenuExist = $this.find('ul').length;
            if (subMenuExist > 0) {
                var subMenuWidth = $this.find('ul').width();
                var subMenuOffset = $this.find('ul').parent().offset().left;
                // if sub menu is off screen, give new position
                if ((subMenuOffset + subMenuWidth) > MainWindowWidth) {
                    var newSubMenuPosition = MainWindowWidth - (subMenuOffset + subMenuWidth);
                    $this.find('ul').first().css({
                        left: newSubMenuPosition,
                    });
                }
            }
        }
    });

    /////////////////////////////////////////
    //single page localscroll and scrollspy//
    /////////////////////////////////////////
    var navHeight = jQuery('.page_header').outerHeight(true);
    if (jQuery('.mainmenu_wrapper').length) {
        jQuery('body').scrollspy({
            target: '.mainmenu_wrapper',
            offset: navHeight
        })
    }
    if (jQuery('.mainmenu_side_wrapper').length) {
        jQuery('body').scrollspy({
            target: '.mainmenu_side_wrapper',
            offset: navHeight
        });
    }
    if (jQuery().localScroll) {
        jQuery('.mainmenu_wrapper > ul, .mainmenu_side_wrapper > ul, #land').localScroll({
            duration: 900,
            easing: 'easeInOutQuart',
            offset: -navHeight + 10
        });
    }

    //toTop
    if (jQuery().UItoTop) {
        jQuery().UItoTop({
            easingType: 'easeOutQuart'
        });
    }

    //parallax
    if (jQuery().parallax) {
        jQuery('.parallax').parallax("50%", 0.01);
    }

    // Date Time Picker
    jQuery('[id ^= id-date]').each(function() {
        var datePicker = jQuery(this);
        datePicker.datetimepicker({
            pickDate: datePicker.data('pick-date'),
            pickTime: datePicker.data('pick-time'),
            useSeconds: false,
            language: datePicker.data('language'),
            debug: false,
        });
    });

    // Smooth scrolling for slider button
    if (jQuery().localScroll) {
        jQuery('.mainmenu_wrapper > ul, .mainmenu_side_wrapper > ul, #land, .scroll_button_wrap').localScroll({
            duration: 900,
            easing: 'easeInOutQuart',
            offset: -navHeight + 10
        });
    }

    if (jQuery().localScroll) {
        jQuery('.divided-content').localScroll({
            duration: 900,
            easing: 'easeInOutQuart',
            offset: -navHeight + 10
        });
    }

    //prettyPhoto
    if (jQuery().prettyPhoto) {
        jQuery("a[data-gal^='prettyPhoto']").prettyPhoto({
            hook: 'data-gal',
            theme: 'facebook' /* light_rounded / dark_rounded / light_square / dark_square / facebook / pp_default*/
        });
    }

    ////////////////////////////////////////
    //init Twitter Bootstrap JS components//
    ////////////////////////////////////////
    //bootstrap carousel
    if (jQuery().carousel) {
        jQuery('.carousel').carousel();
    }
    //bootstrap tab - show first tab 
    jQuery('.nav-tabs').each(function() {
        jQuery(this).find('a').first().tab('show');
    });
    jQuery('.tab-content').each(function() {
        jQuery(this).find('.tab-pane').first().addClass('fade in');
    });
    //bootstrap collapse - show first tab 
    jQuery('.panel-group').each(function() {
        jQuery(this).find('a').first().filter('.collapsed').trigger('click');
    });
    //tooltip
    if (jQuery().tooltip) {
        jQuery('[data-toggle="tooltip"]').tooltip();
    }

    //Video
    (function() {
        if (document.querySelector('.slide-video')) {
            var $videobg = document.querySelector('.slide-video');
            var $src = $videobg.querySelector('source').dataset.src;
            var $time = $videobg.querySelector('source').dataset.time;

            if ($videobg.paused) {
                $videobg.querySelector('source').src = $src;
                $videobg.load();
                $videobg.currentTime = 0;
                $videobg.volume = 0;
                $videobg.play();
                $videobg.addEventListener('timeupdate', function() {
                    if (this.currentTime >= $time) {
                        $videobg.currentTime = 0;
                        $videobg.volume = 0;
                        $videobg.play();
                    }
                });
            }

            jQuery('.slides').on('classChanged', 'li:first', function() {
                $videobg.currentTime = 0;
                $videobg.volume = 0;
                $videobg.play();
            });
        }
    })();

    ////////////////
    //owl carousel//
    ////////////////
    if (jQuery().owlCarousel) {
        jQuery('.owl-carousel').each(function() {
            var $carousel = jQuery(this);
            var loop = $carousel.data('loop') ? $carousel.data('loop') : false;
            var margin = ($carousel.data('margin') || $carousel.data('margin') == 0) ? $carousel.data('margin') : 30;
            var nav = $carousel.data('nav') ? $carousel.data('nav') : false;
            var dots = $carousel.data('dots') ? $carousel.data('dots') : false;
            var themeClass = $carousel.data('themeclass') ? $carousel.data('themeclass') : 'owl-theme';
            var center = $carousel.data('center') ? $carousel.data('center') : false;
            var items = $carousel.data('items') ? $carousel.data('items') : 4;
            var autoplay = $carousel.data('autoplay') ? $carousel.data('autoplay') : false;
            var autoplayTimeout = $carousel.data('autoplaytimeout') ? $carousel.data('autoplaytimeout') : 5000;
            var responsiveXs = $carousel.data('responsive-xs') ? $carousel.data('responsive-xs') : 1;
            var responsiveSm = $carousel.data('responsive-sm') ? $carousel.data('responsive-sm') : 2;
            var responsiveMd = $carousel.data('responsive-md') ? $carousel.data('responsive-md') : 3;
            var responsiveLg = $carousel.data('responsive-lg') ? $carousel.data('responsive-lg') : 4;
            var filters = $carousel.data('filters') ? $carousel.data('filters') : false;
            var navContainer = $carousel.data('nav-container') ? $carousel.data('nav-container') : false;

            if (filters) {
                $carousel.after($carousel.clone().addClass('owl-carousel-filter-cloned'));
                jQuery(filters).on('click', 'a', function(e) {
                    //processing filter link
                    e.preventDefault();
                    if (jQuery(this).hasClass('selected')) {
                        return;
                    }
                    var filterValue = jQuery(this).attr('data-filter');
                    jQuery(this).siblings().removeClass('selected active');
                    jQuery(this).addClass('selected active');

                    //removing old items
                    $carousel.find('.owl-item').length;
                    for (var i = $carousel.find('.owl-item').length - 1; i >= 0; i--) {
                        $carousel.trigger('remove.owl.carousel', [1]);
                    }
                    //adding new items
                    var $filteredItems = jQuery($carousel.next().find(' > ' + filterValue).clone());
                    $filteredItems.each(function() {
                        $carousel.trigger('add.owl.carousel', jQuery(this));
                        jQuery(this).addClass('scaleAppear');
                    });

                    $carousel.trigger('refresh.owl.carousel');

                    //reinit prettyPhoto in filtered OWL carousel
                    if (jQuery().prettyPhoto) {
                        $carousel.find("a[data-gal^='prettyPhoto']").prettyPhoto({
                            hook: 'data-gal',
                            theme: 'facebook' /* light_rounded / dark_rounded / light_square / dark_square / facebook / pp_default*/
                        });
                    }
                });

            } //filters

            $carousel.owlCarousel({
                    loop: loop,
                    margin: margin,
                    nav: nav,
                    autoplay: autoplay,
                    autoplayTimeout: autoplayTimeout,
                    dots: dots,
                    themeClass: themeClass,
                    center: center,
                    items: items,
                    navContainer: navContainer,
                    responsive: {
                        0: {
                            items: responsiveXs
                        },
                        767: {
                            items: responsiveSm
                        },
                        992: {
                            items: responsiveMd
                        },
                        1200: {
                            items: responsiveLg
                        }
                    },
                })
                .addClass(themeClass);
            if (center) {
                $carousel.addClass('owl-center');
            }
        });

    } //eof owl-carousel

    //comingsoon counter
    if (jQuery().countdown) {
        //today date plus month for demo purpose
        var demoDate = new Date();
        demoDate.setMonth(demoDate.getMonth() + 1);
        jQuery('#comingsoon-countdown').countdown({
            until: demoDate
        });
    }

    /////////////////////////////////////////////////
    //PHP widgets - contact form, search, MailChimp//
    /////////////////////////////////////////////////

    //search modal
    jQuery(".search_modal_button").on('click', function(e) {
        e.preventDefault();
        jQuery('#search_modal').modal('show').find('input').first().focus();
    });
    //search form processing
    jQuery('form.searchform, .search-form').on('submit', function(e) {

        var $form = jQuery(this);
        var $searchModal = jQuery('#search_modal');
        $searchModal.find('div.searchform-respond').remove();

        //checking on empty values
        jQuery($form).find('[type="text"], [type="search"]').each(function(index) {
            if (!(jQuery(this).val().trim()).length) {
                jQuery(this).addClass('invalid').on('focus', function() {
                    jQuery(this).removeClass('invalid')
                });
            }
        });
        //if one of form fields is empty - exit
        if ($form.find('[type="text"], [type="search"]').hasClass('invalid')) {
            e.preventDefault();
        }

    });

    //background image teaser
    jQuery(".bg_teaser").each(function() {
        var $teaser = jQuery(this);
        var imagePath = $teaser.find("img").first().attr("src");
        if (imagePath) {
            $teaser.css("background-image", "url(" + imagePath + ")");
        }
        if (!$teaser.find('.bg_overlay').length) {
            $teaser.prepend('<div class="bg_overlay"/>');
        }
    });

} //eof documentReadyInit

//function that initiating template plugins on window.load event
function windowLoadInit() {
    //chart
    pieChart();

    //flexslider
    if (jQuery().flexslider) {
        var $introSlider = jQuery(".intro_section .flexslider");
        $introSlider.each(function(index) {
            var $currentSlider = jQuery(this);
            var autoplay = $currentSlider.data('slideshow') ? $currentSlider.data('slideshow') : false;
            var slideshowSpeed = $currentSlider.data('slideshowspeed') ? $currentSlider.data('slideshowspeed') : 5000;
            var nav = ($currentSlider.data('nav') !== 'undefined') ? $currentSlider.data('nav') : true;
            var dots = ($currentSlider.data('dots') !== 'undefined') ? $currentSlider.data('dots') : true;
            $currentSlider.flexslider({
                    animation: "fade",
                    pauseOnHover: true,
                    slideshow: autoplay,
                    useCSS: true,
                    controlNav: dots,
                    directionNav: nav,
                    prevText: ">",
                    nextText: "<",
                    smoothHeight: false,
                    slideshowSpeed: slideshowSpeed,
                    animationSpeed: 600,
                    start: function(slider) {
                        slider.find('.slide_description').children().css({
                            'visibility': 'hidden'
                        });
                        slider.find('.flex-active-slide .slide_description').children().each(function(index) {
                            var self = jQuery(this);
                            var animationClass = !self.data('animation') ? 'fadeInRight' : self.data('animation');
                            setTimeout(function() {
                                self.addClass("animated " + animationClass);
                            }, index * 200);
                        });
                        slider.find('.flex-control-nav').find('a').each(function() {
                            jQuery(this).html('0' + jQuery(this).html());
                        });
                    },
                    after: function(slider) {
                        slider.find('.flex-active-slide .slide_description').children().each(function(index) {
                            var self = jQuery(this);
                            var animationClass = !self.data('animation') ? 'fadeInRight' : self.data('animation');
                            setTimeout(function() {
                                self.addClass("animated " + animationClass);
                            }, index * 200);
                        });
                    },
                    end: function(slider) {
                        slider.find('.slide_description').children().each(function() {
                            var self = jQuery(this);
                            var animationClass = !self.data('animation') ? 'fadeInRight' : self.data('animation');
                            self.removeClass('animated ' + animationClass).css({
                                'visibility': 'hidden'
                            });
                        });
                    },

                })
                //wrapping nav with container
                .find('.flex-control-nav')
                .wrap('<div class="container nav-container"/>')
        }); //intro_section flex slider

        jQuery(".flexslider").each(function(index) {
            var $currentSlider = jQuery(this);
            //exit if intro slider already activated 
            if ($currentSlider.find('.flex-active-slide').length) {
                return;
            }
            $currentSlider.flexslider({
                animation: "fade",
                useCSS: true,
                controlNav: true,
                directionNav: false,
                prevText: ">",
                nextText: "<",
                smoothHeight: false,
                slideshowSpeed: 5000,
                animationSpeed: 800,
            })
        });
    }

    ////////////////////
    //header processing/
    ////////////////////
    //stick header to top
    //wrap header with div for smooth sticking
    var $header = jQuery('.page_header').first();
    if ($header.length) {
        //hiding main menu 1st levele elements that do not fit width
        menuHideExtraElements();
        //mega menu
        initMegaMenu();
        var headerHeight = $header.outerHeight();
        $header.wrap('<div class="page_header_wrapper"></div>').parent().css({
            height: headerHeight
        }); //wrap header for smooth stick and unstick
        var $headerWrapper = $header.parent();

        //get offset
        var headerOffset = 0;
        //check for sticked template headers
        headerOffset = $header.offset().top;

        //for boxed layout - show or hide main menu elements if width has been changed on affix
        jQuery($header).on('affixed-top.bs.affix affixed.bs.affix affixed-bottom.bs.affix', function(e) {
            if ($header.hasClass('affix-top')) {
                $header.parent().removeClass('affix-wrapper affix-bottom-wrapper').addClass('affix-top-wrapper');
            } else if ($header.hasClass('affix')) {
                $header.parent().removeClass('affix-top-wrapper affix-bottom-wrapper').addClass('affix-wrapper');
            } else if ($header.hasClass('affix-bottom')) {
                $header.parent().removeClass('affix-wrapper affix-top-wrapper').addClass('affix-bottom-wrapper');
            } else {
                $header.parent().removeClass('affix-wrapper affix-top-wrapper affix-bottom-wrapper');
            }
            menuHideExtraElements();
            initMegaMenu();
        });

        //if header has different height on afixed and affixed-top positions - correcting wrapper height
        jQuery($header).on('affixed-top.bs.affix', function() {
            $header.parent().css({
                height: headerHeight
            });
        });

        jQuery($header).affix({
            offset: {
                top: headerOffset,
                bottom: 0
            }
        });
    }

    //aside affix
    affixSidebarInit();

    jQuery('body').scrollspy('refresh');

    //animation to elements on scroll
    if (jQuery().appear) {
        jQuery('.to_animate').appear();
        jQuery('.to_animate').filter(':appeared').each(function(index) {
            var self = jQuery(this);
            var animationClass = !self.data('animation') ? 'fadeInUp' : self.data('animation');
            var animationDelay = !self.data('delay') ? 210 : self.data('delay');
            setTimeout(function() {
                self.addClass("animated " + animationClass);
            }, index * animationDelay);
        });

        jQuery('body').on('appear', '.to_animate', function(e, $affected) {
            jQuery($affected).each(function(index) {
                var self = jQuery(this);
                var animationClass = !self.data('animation') ? 'fadeInUp' : self.data('animation');
                var animationDelay = !self.data('delay') ? 210 : self.data('delay');
                setTimeout(function() {
                    self.addClass("animated " + animationClass);
                }, index * animationDelay);
            });
        });

        //counters init on scroll
        jQuery('.counter').appear();
        jQuery('.counter').filter(':appeared').each(function(index) {
            if (jQuery(this).hasClass('counted')) {

            } else {
                jQuery(this).countTo().addClass('counted');
            }
        });
        jQuery('body').on('appear', '.counter', function(e, $affected) {
            jQuery($affected).each(function(index) {
                if (jQuery(this).hasClass('counted')) {

                } else {
                    jQuery(this).countTo().addClass('counted');
                }

            });
        });

        //bootstrap animated progressbar
        if (jQuery().progressbar) {
            jQuery('.progress .progress-bar').appear();
            jQuery('.progress .progress-bar').filter(':appeared').each(function(index) {
                jQuery(this).progressbar({
                    transition_delay: 300
                });
            });
            jQuery('body').on('appear', '.progress .progress-bar', function(e, $affected) {
                jQuery($affected).each(function(index) {
                    jQuery(this).progressbar({
                        transition_delay: 300
                    });
                });
            });
            //animate progress bar inside bootstrap tab
            jQuery('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
                jQuery(jQuery(e.target).attr('href')).find('.progress .progress-bar').progressbar({
                    transition_delay: 300
                });
            });
        }
    } //appear check

    //flickr
    if (jQuery().jflickrfeed) {
        var $flickr = jQuery("#flickr, .flickr_ul");
        if ($flickr.length) {
            $flickr.each(function() {
                var $thisFlickrUl = jQuery(this);
                if (!(jQuery(this).hasClass('flickr_loaded'))) {
                    var id = $thisFlickrUl.data('flickr-id') ? $thisFlickrUl.data('flickr-id') : 8;
                    var limit = $thisFlickrUl.data('flickr-number') ? $thisFlickrUl.data('flickr-number') : '131791558@N04';
                    $thisFlickrUl.jflickrfeed({
                        flickrbase: "http://api.flickr.com/services/feeds/",
                        limit: limit,
                        qstrings: {
                            id: id
                        },
                        itemTemplate: '<a href="{{image_b}}" data-gal="prettyPhoto[pp_gal]"><li><img alt="{{title}}" src="{{image_s}}" /></li></a>'
                    }, function(data) {
                        $thisFlickrUl.find('a').prettyPhoto({
                            hook: 'data-gal',
                            theme: 'facebook'
                        });
                    }).addClass('flickr_loaded');
                }

            })

        }
    }

    //video images preview
    jQuery('.embed-placeholder').each(function() {
        jQuery(this).on('click', function(e) {
            e.preventDefault();
            var $thisLink = jQuery(this);
            if ($thisLink.attr('href') == '' || $thisLink.attr('href') == '#') {
                $thisLink.replaceWith($thisLink.data('iframe').replace(/&amp/g, '&').replace(/$lt;/g, '<').replace(/&gt;/g, '>').replace(/$quot;/g, '"')).trigger('click');
            } else {
                $thisLink.replaceWith('<iframe class="embed-responsive-item" src="' + $thisLink.attr('href') + '?rel=0&autoplay=1' + '"></iframe>');
            }
        });
    });

    // init Isotope

    jQuery('.isotope_container').each(function(index) {
        var $container = jQuery(this);
        var layoutMode = ($container.hasClass('masonry-layout')) ? 'masonry' : 'fitRows';
        $container.isotope({
            percentPosition: true,
            layoutMode: layoutMode,
            masonry: {}
        });

        var $filters = jQuery(this).attr('data-filters') ? jQuery(jQuery(this).attr('data-filters')) : $container.prev().find('.filters');
        // bind filter click
        if ($filters.length) {
            $filters.on('click', 'a', function(e) {
                e.preventDefault();
                var filterValue = jQuery(this).attr('data-filter');
                $container.isotope({
                    filter: filterValue
                });
                jQuery(this).siblings().removeClass('selected active');
                jQuery(this).addClass('selected active');
            });
        }
    });

    // layout Isotope after each image loads
    jQuery('.isotope_container').imagesLoaded().progress(function() {
        jQuery('.isotope_container').isotope('layout');
    });

    //Unyson or other messages modal
    var $messagesModal = jQuery('#messages_modal');
    if ($messagesModal.find('ul').length) {
        $messagesModal.modal('show');
    }

    //page preloader
    jQuery(".preloader_img, .preloader_css").fadeOut(800);
    setTimeout(function() {
        jQuery(".preloader").fadeOut(800, function() {});
    }, 200);

    mobileLS();

} //eof windowLoadInit

jQuery(document).ready(function() {
    documentReadyInit();
}); //end of "document ready" event


jQuery(window).on('load', function() {
    windowLoadInit();
}); //end of "window load" event

jQuery(window).on('resize', function() {

    mobileLS();

    jQuery('body').scrollspy('refresh');

    //header processing
    menuHideExtraElements();
    initMegaMenu();
    var $header = jQuery('.page_header').first();
    //checking document scrolling position
    if ($header.length && !jQuery(document).scrollTop() && $header.first().data('bs.affix')) {
        $header.first().data('bs.affix').options.offset.top = $header.offset().top;
    }
    jQuery(".page_header_wrapper").css({
        height: $header.first().outerHeight()
    }); //editing header wrapper height for smooth stick and unstick

});

//wrap forms select field corretcion (disable first choise)
jQuery('.wrap-forms').find('select option:first-of-type').attr("disabled", "disabled").addClass('default-selected');

jQuery(window).on('scroll', function() {
    //circle progress bar
    pieChart();
});

//Replace search widget placeholder
jQuery('.search-form').find('.search-field').attr("placeholder", "Search Keyword");

//Replace "=" in Cryptocurrency plugin
jQuery('.pricelist td:first-child').each(function() {
    var $this = jQuery(this);
    var text = $this.text();
    text = text.replace('=', '');
    $this.text(text);
    $this.after('<td class="equally">=</td>');
});

jQuery('.calculator input:first-child').each(function() {
    var text = jQuery(this)[0].nextSibling;
    text.nodeValue = text.nodeValue.replace('=', '');
    jQuery(text).wrap('<span class="cur"></span>');
    var $this = jQuery('.cur');
    $this.after('<span class="equally">=</span>');
});

// ScrollMagic
var controller = new ScrollMagic.Controller();
var revealElements = document.getElementsByClassName("anim-heading");
for (var i = 0; i < revealElements.length; i++) {
    new ScrollMagic.Scene({
            triggerElement: revealElements[i],
            offset: 150,
            triggerHook: 0.8,
        })
        .setClassToggle(revealElements[i], "visible")
        .addTo(controller);
}

//Button Animation
jQuery(function() {
    jQuery('.animated_button')
        .on('mouseenter', function(e) {
            var parentOffset = jQuery(this).offset(),
                relX = e.pageX - parentOffset.left,
                relY = e.pageY - parentOffset.top;
            jQuery(this).find('span.hover-style').css({
                top: relY,
                left: relX
            })
        })
        .on('mouseout', function(e) {
            var parentOffset = jQuery(this).offset(),
                relX = e.pageX - parentOffset.left,
                relY = e.pageY - parentOffset.top;
            jQuery(this).find('span.hover-style').css({
                top: relY,
                left: relX
            })
        })
        .append('<span class="hover-style"></span>');

});

//add child element to footer widget title
jQuery('.page_footer').find('.widget-title').append('<span class="short_line"><span></span></span>');

jQuery('.post-type-archive .services-grid .read-more').html('Read more');