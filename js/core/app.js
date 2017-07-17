(function ($, owner) {
    //图片懒加载
    owner.imglazyload = function (id) {
        $('.ui-imglazyload').imglazyload({
            container: id,
            eventName: 'scrollEnd',
            innerScroll: true
        }).on('startload', function () {
            //$(this).css('opacity', '1');
            $(this).parent('span.lazyimgbox').css('background', '#fff');
            $('.singleimg .lazyimgbox').css({ 'min-width': 'none', 'min-height': 'none' });
        }).on('error', function (e) {
            e.preventDefault();
            $(this).parent('span.lazyimgbox').css({ 'background': '#e8e8e8 url(img/ui_placeholder.png) no-repeat center center', 'background-size': '1.5rem auto' });
            $(this).parent('.user-avatar').css({ 'background': 'url(img/ui_avatar@3x.png) no-repeat center center', 'background-size': '100%' });
        });
    };
    //Iscroll
    //owner.Scroller = function () {
    //    var myScroll;
    //    function loaded() {
    //        myScroll = new IScroll('#wrapper', {
    //            probeType: 2,
    //            scrollbars: true,//有滚动条
    //            mouseWheel: true,//允许滑轮滚动
    //            fadeScrollbars: true,//滚动时显示滚动条，默认影藏，并且是淡出淡入效果
    //            bounce: true,//边界反弹
    //            interactiveScrollbars: true,//滚动条可以拖动
    //            shrinkScrollbars: 'scale',// 当滚动边界之外的滚动条是由少量的收缩。'clip' or 'scale'.
    //            click: true,// 允许点击事件
    //            keyBindings: true,//允许使用按键控制
    //            momentum: true// 允许有惯性滑动
    //        });
    //        //滚动时
    //        myScroll.on('scroll', function () {
    //        });
    //        //滚动完毕
    //        myScroll.on('scrollEnd', function () {
    //        });
    //    }

    //    window.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
    //    window.addEventListener('DOMContentLoaded', function () { loaded();}, false);
    //    app.imglazyload($('.wrapper'));
    //};

    var myScroll, pullDownEl, pullDownOffset, pullUpEl, pullUpOffset, generatedCount = 0;
    owner.Scroller = function (now, _pulldown, _pullup, _id) {
        function loaded(pullDown, pullUp, funStart, funUp) {
            //if (myScroll == undefined || myScroll == null) {
            //    myScroll = new IScroll('#wrapper', {
            //        probeType: 2,
            //        scrollbars: true,//有滚动条 
            //        mouseWheel: true,//允许滑轮滚动
            //        interactiveScrollbars: true,//滚动条可以拖动 
            //        shrinkScrollbars: 'scale',// 当滚动边界之外的滚动条是由少量的收缩。'clip' or 'scale'.  
            //        fadeScrollbars: true,//滚动时显示滚动条，默认影藏，并且是淡出淡入效果 
            //        disableMouse: true,
            //        disablePointer: true,
            //        useTransition: true,
            //        click: true,// 允许点击事件 
            //        momentum: true// 允许有惯性滑动  
            //    });

            //    //开始滚动
            //    myScroll.on('scrollStart', function () {
            //        if (funStart && typeof funStart == 'function') {
            //            funStart();
            //        }
            //    });
            //    //滚动时  
            //    myScroll.on('scroll', function () {
            //        scroll(this, pullDown, pullUp);
            //    });
            //    //滚动完毕  
            //    myScroll.on('scrollEnd', function () {
            //        $.fn.imglazyload.detect();
            //        scrollEnd(pullDown, pullUp);
            //        myScroll.refresh();
            //    });
            //}
            myScroll = new IScroll('#wrapper', {
                probeType: 2,
                scrollbars: true,//有滚动条
                mouseWheel: true,//允许滑轮滚动
                fadeScrollbars: true,//滚动时显示滚动条，默认影藏，并且是淡出淡入效果
                bounce: true,//边界反弹
                interactiveScrollbars: true,//滚动条可以拖动
                shrinkScrollbars: 'scale',// 当滚动边界之外的滚动条是由少量的收缩。'clip' or 'scale'.
                click: true,// 允许点击事件
                keyBindings: true,//允许使用按键控制
                momentum: true// 允许有惯性滑动
            });
            //滚动时
            myScroll.on('scroll', function () {
            });
            //滚动完毕
            myScroll.on('scrollEnd', function () {
                $.fn.imglazyload.detect();
                myScroll.refresh();
            });
        };

        window.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
        if (now == undefined || now != true) {
            window.addEventListener('DOMContentLoaded', function () { setTimeout(function () { loaded(_pulldown, _pullup) }, 200); }, false);
        } else {
            setTimeout(function () {
                loaded(_pulldown, _pullup);
                myScroll.refresh();
            }, 200);
        }
        app.imglazyload(_id);
    };

    function scroll(scroller, _pulldown, _pullup) {
        if (_pulldown) {
            pullDownEl = _pulldown;
            pullDownOffset = pullDownEl.offsetHeight;
        }

        if (_pullup) {
            pullUpEl = _pullup;
            pullUpOffset = pullUpEl.offsetHeight;
        }

        if (scroller.y > 20 && !pullDownEl.hasClass('flip')) {
            pullDownEl.removeAttr('class').addClass('flip');
            pullDownEl.children('.pullDownLabel').text('松手开始更新...');
            scroller.minScrollY = 0;
        } else if (scroller.y < 20 && pullDownEl.hasClass('flip')) {
            pullDownEl.removeAttr('class');
            pullDownEl.children('.pullDownLabel').text('下拉刷新');
            scroller.minScrollY = -pullDownOffset;
        } else if (scroller.y < (scroller.maxScrollY - 5) && !pullUpEl.hasClass('flip')) {
            pullUpEl.removeAttr('class').addClass('flip');
            pullUpEl.children('.pullUpLabel').text('松手开始更新...');
            scroller.maxScrollY = scroller.maxScrollY;
        } else if (scroller.y > (scroller.maxScrollY + 5) && pullUpEl.hasClass('flip')) {
            pullUpEl.removeAttr('class');
            pullUpEl.children('.pullUpLabel').text('上拉加载更多...');
            scroller.maxScrollY = pullUpOffset;
        };
    };
    function scrollEnd(_pulldown, _pullup) {
        if (_pulldown) {
            pullDownEl = _pulldown;
            pullDownOffset = pullDownEl.offsetHeight;
        }

        if (_pullup) {
            pullUpEl = _pullup;
            pullUpOffset = pullUpEl.offsetHeight;
        }

        if (pullDownEl.hasClass('flip')) {
            pullDownEl.removeAttr('class').addClass('loading')
            pullDownEl.children('.pullDownLabel').text('正在加载...');
            pullDownAction(_pulldown);
        } else if (pullUpEl.hasClass('flip')) {
            pullUpEl.removeAttr('class').addClass('loading');
            pullUpEl.children('.pullUpLabel').text('正在加载...');
            pullUpAction(_pullup);
        };
    };
    /*下拉刷新*/
    function pullDownAction(_pulldown) {
        setTimeout(function () {
            window.location.reload();
            if (_pulldown) {
                pullDownEl = _pulldown;
            }

            pullDownEl.removeAttr('class');
            myScroll.refresh();
            pullDownEl.css('visibility', 'hidden');
        }, 1000);
    };
    /*滚动翻页*/
    function pullUpAction(_pullup) {
        setTimeout(function () {
            if (_pullup) {
                pullUpEl = _pullup;
            }

            app.ui.pullUp();
            pullUpEl.removeAttr('class');
            myScroll.refresh();
        }, 1000);
    };
    //photoswipe,查看大图
    owner.photoSwipe = function (dom) {
        var initPhotoSwipeFromDOM = function (gallerySelector) {
            var parseThumbnailElements = function (el) {
                var thumbElements = el.childNodes,
                    numNodes = thumbElements.length,
                    items = [],
                    el,
                    childElements,
                    thumbnailEl,
                    size,
                    item;

                for (var i = 0; i < numNodes; i++) {
                    el = thumbElements[i];

                    // include only element nodes
                    if (el.nodeType !== 1) {
                        continue;
                    }

                    childElements = el.children;
                    size = el.getAttribute('data-size').split('x');

                    // create slide object
                    item = {
                        src: el.getAttribute('data-href'),
                        w: parseInt(size[0], 10),
                        h: parseInt(size[1], 10),
                        author: el.getAttribute('data-author')
                    };

                    item.el = el; // save link to element for getThumbBoundsFn

                    if (childElements.length > 0) {
                        item.msrc = childElements[0].getAttribute('data-url'); // thumbnail url
                        if (childElements.length > 1) {
                            item.title = childElements[1].innerHTML; // caption (contents of figure)
                        }
                    }

                    var mediumSrc = el.getAttribute('data-med');
                    if (mediumSrc) {
                        size = el.getAttribute('data-med-size').split('x');
                        // 'medium-sized' image
                        item.m = {
                            src: mediumSrc,
                            w: parseInt(size[0], 10),
                            h: parseInt(size[1], 10)
                        };
                    }
                    // original image
                    item.o = {
                        src: item.src,
                        w: item.w,
                        h: item.h
                    };
                    items.push(item);
                }
                return items;
            };

            // find nearest parent element
            var closest = function closest(el, fn) {
                return el && (fn(el) ? el : closest(el.parentNode, fn));
            };

            var onThumbnailsClick = function (e) {
                e = e || window.event;
                e.preventDefault ? e.preventDefault() : e.returnValue = false;
                var eTarget = e.target || e.srcElement;

                var clickedListItem = closest(eTarget, function (el) {
                    return el.tagName === 'SPAN';
                });

                if (!clickedListItem) {
                    return;
                }

                var clickedGallery = clickedListItem.parentNode;

                var childNodes = clickedListItem.parentNode.childNodes,
                    numChildNodes = childNodes.length,
                    nodeIndex = 0,
                    index;

                for (var i = 0; i < numChildNodes; i++) {
                    if (childNodes[i].nodeType !== 1) {
                        continue;
                    }

                    if (childNodes[i] === clickedListItem) {
                        index = nodeIndex;
                        break;
                    }
                    nodeIndex++;
                }

                if (index >= 0) {
                    openPhotoSwipe(index, clickedGallery);
                }
                return false;
            };

            var photoswipeParseHash = function () {
                var hash = window.location.hash.substring(1),
                params = {};
                if (hash.length < 5) { // pid=1
                    return params;
                }

                var vars = hash.split('&');
                for (var i = 0; i < vars.length; i++) {
                    if (!vars[i]) {
                        continue;
                    }
                    var pair = vars[i].split('=');
                    if (pair.length < 2) {
                        continue;
                    }
                    params[pair[0]] = pair[1];
                }

                if (params.gid) {
                    params.gid = parseInt(params.gid, 10);
                }
                return params;
            };

            var openPhotoSwipe = function (index, galleryElement, disableAnimation, fromURL) {
                var pswpElement = document.querySelectorAll('.pswp')[0],
                    gallery,
                    options,
                    items;
                items = parseThumbnailElements(galleryElement);

                // define options (if needed)
                options = {
                    galleryUID: galleryElement.getAttribute('data-pswp-uid'),
                    getThumbBoundsFn: function (index) {
                        // See Options->getThumbBoundsFn section of docs for more info
                        var thumbnail = items[index].el.children[0],
                            pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                            rect = thumbnail.getBoundingClientRect();

                        return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
                    },
                    addCaptionHTMLFn: function (item, captionEl, isFake) {
                        if (!item.title) {
                            captionEl.children[0].innerText = '';
                            return false;
                        }
                        captionEl.children[0].innerHTML = item.title + '<br/><small>Photo: ' + item.author + '</small>';
                        return true;
                    }
                };

                if (fromURL) {
                    if (options.galleryPIDs) {
                        // parse real index when custom PIDs are used
                        for (var j = 0; j < items.length; j++) {
                            if (items[j].pid == index) {
                                options.index = j;
                                break;
                            }
                        }
                    } else {
                        options.index = parseInt(index, 10) - 1;
                    }
                } else {
                    options.index = parseInt(index, 10);
                }

                // exit if index not found
                if (isNaN(options.index)) {
                    return;
                }

                options.mainClass = 'pswp--minimal--dark';
                options.barsSize = { top: 0, bottom: 0 };
                options.captionEl = false;
                options.fullscreenEl = false;
                options.shareEl = false;
                options.bgOpacity = 0.98;
                options.tapToClose = true;
                options.tapToToggleControls = false,
                options.loop = false;

                if (disableAnimation) {
                    options.showAnimationDuration = 0;
                }

                // Pass data to PhotoSwipe and initialize it
                gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);

                var realViewportWidth,
                    useLargeImages = false,
                    firstResize = true,
                    imageSrcWillChange;
                gallery.listen('beforeResize', function () {
                    var dpiRatio = window.devicePixelRatio ? window.devicePixelRatio : 1;
                    dpiRatio = Math.min(dpiRatio, 2.5);
                    realViewportWidth = gallery.viewportSize.x * dpiRatio;

                    if (realViewportWidth >= 1200 || (!gallery.likelyTouchDevice && realViewportWidth > 800) || screen.width > 1200) {
                        if (!useLargeImages) {
                            useLargeImages = true;
                            imageSrcWillChange = true;
                        }
                    } else {
                        if (useLargeImages) {
                            useLargeImages = false;
                            imageSrcWillChange = true;
                        }
                    }

                    if (imageSrcWillChange && !firstResize) {
                        gallery.invalidateCurrItems();
                    }

                    if (firstResize) {
                        firstResize = false;
                    }
                    imageSrcWillChange = false;
                });

                gallery.listen('gettingData', function (index, item) {
                    if (useLargeImages) {
                        item.src = item.o.src;
                        item.w = item.o.w;
                        item.h = item.o.h;
                    } else {
                        item.src = item.m.src;
                        item.w = item.m.w;
                        item.h = item.m.h;
                    }
                });
                gallery.init();
            };

            // select all gallery elements
            var galleryElements = document.querySelectorAll(gallerySelector);
            for (var i = 0, l = galleryElements.length; i < l; i++) {
                galleryElements[i].setAttribute('data-pswp-uid', i + 1);
                galleryElements[i].onclick = onThumbnailsClick;
            }

            // Parse URL and open gallery if it contains #&pid=3&gid=1
            var hashData = photoswipeParseHash();
            if (hashData.pid && hashData.gid) {
                openPhotoSwipe(hashData.pid, galleryElements[hashData.gid - 1], true, true);
            }
        };

        initPhotoSwipeFromDOM('.photoswipe');
        return false;
    };

    owner.linkTap = function () {
        $('.link').on('tap', function () {
            location.href = $(this).data('href');
            return false;
        });
    };
    owner.viewMore = function () {
        $('.viewmore').on('tap', function () {
            $('.popup_wrap').show();
            return false;
        });
        $('.popup_download,.popup_close').on('tap', function () {
            $('.popup_wrap').hide();
            return false;
        });
    };
}(Zepto, window.app = {}));