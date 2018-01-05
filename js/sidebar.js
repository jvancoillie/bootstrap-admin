(function ($) {
    'use strict';

    $.fn.sidebar = function () {

        var sidebarElement = $('.sidebar'),
            contentSidebarElement = $('.content-sidebar'),
            toggleNavBarButton = $('.sidebar-toggle'),

            subNavElement = $('.sub-nav'),
            subNavItemElement = $('.sub-nav-item'),
            toggleSubNavElement = $('.sub-nav > a'),
            sidebarOverlay = $('.sidebar-overlay'),


            collapse = function () {
                sidebarElement.addClass('collapsed');
                contentSidebarElement.addClass('collapsed');
            },

            expand = function () {
                sidebarElement.removeClass('collapsed');
                contentSidebarElement.removeClass('collapsed');
            },

            bindMenuBehavior = function () {
                toggleNavBarButton.on('click', function (e) {
                    if (sidebarElement.hasClass('collapsed')) {
                        window.localStorage.setItem('bootstrap-sidebar-toggle', 'expanded');
                        expand();
                    } else {
                        window.localStorage.setItem('bootstrap-sidebar-toggle', 'collapsed');
                        collapse();
                    }
                });

                toggleSubNavElement.on('click', function (e) {
                    e.preventDefault();

                    const $subNav = $(this).closest(subNavElement);
                    const $subNavParents = $(this).parents(subNavElement);

                    const $subNavItem = $subNav.find(subNavItemElement);
                    const $NavParemts = $subNavItem.parents('nav');

                    sidebarElement.find(subNavElement).not($subNav).not($subNavParents).removeClass('open');


                    $subNav.toggleClass('open');

                    if (isCompact()) {
                        sidebarElement.find(subNavItemElement).not($subNavItem).not($NavParemts).fadeOut('fast');
                        $subNavItem.fadeToggle('fast');

                    }
                    else {
                        sidebarElement.find(subNavItemElement).not($subNavItem).not($NavParemts).slideUp('fast');

                        $subNav.hasClass('open') ?
                            $subNavItem.slideDown('fast') :
                            $subNavItem.slideUp('fast');
                    }

                    // Check if sidebar has at least one open NavGroup
                    if (sidebarElement.hasClass('collapsed') && sidebarElement.find('.sub-nav.open').length) {
                        sidebarOverlay.addClass('active');
                    }
                    else {
                        sidebarOverlay.removeClass('active');
                    }

                });

                sidebarOverlay.on('click', function() {
                    if (isCompact()) {
                        sidebarElement.find(subNavItemElement).filter(':visible').fadeOut('fast');
                        sidebarElement.find(subNavElement).removeClass('open');
                        $(this).removeClass('active');
                    }
                });

            },
            initTooltips = function() {
                sidebarElement.find(' .navbar-nav > .nav-item > .nav-link').each(function() {
                    console.log('find');
                    const $link = $(this);
                    const title = $link.find('> span').text();

                    if (!title) {
                        return;
                    }

                    $link.tooltip({
                        placement: 'right',
                        title: title,
                        trigger: 'manual'
                    });

                    $link.hover(function() {

                        if (!isCompact()) {
                            return;
                        }

                        $link.tooltip('show');
                    }, function() {
                        $link.tooltip('hide');
                    });

                    $link.on('focus', function() {
                        if (!isCompact()) {
                            return;
                        }

                        $link.tooltip('show');
                    });


                    $link.on('click blur', function() {
                        $link.tooltip('hide');
                    });
                });


            },

            isCompact = function () {
                return (sidebarElement.hasClass('collapsed'));
            },

            loadFromLocalStorage = function () {
                if (window.localStorage.getItem('bootstrap-sidebar-toggle') === 'collapsed') {
                    collapse();
                }
            },

            init = function () {
                // Bind Top level hamburger menu with menu behavior;
                bindMenuBehavior();
                loadFromLocalStorage();
                // initTooltips();
            };


        init();

        return $.fn.sidebar.self;
    };
}(jQuery));