/**
 * "Rules of Optimization:
 *     Rule 1: Don't do it.
 *     Rule 2 (for experts only): Don't do it yet.”
 *
 * ~ Michael A. Jackson
 */

(function () {
    'use strict';

    require.config({
        baseUrl: 'js',
        paths: {
            jquery: 'vendor/jquery/jquery.min'
        }
    });

    require(['jquery'], function ($) {
        $.noConflict();

        $(document).ready(onReady);

        return;

        function onReady() {
            $.get('get_feed.php',
                {
                    screen_name: 'ValeraRozuvan',
                    count: 5
                },
                processResponse
            );
        }

        function processResponse(data) {
            var feed;

            try {
                feed = JSON.parse(data);
            } catch (error) {
                console.log(error);

                return;
            }

            renderFeed(feed);
        }

        function renderFeed(feed) {
            var listEl = $('<ol />');

            $.each(feed, function (index, value) {
                var itemEl, linkEl, tweetUrl, tweetText;

                if (!value || !value.user || !value.user.screen_name || !value.id_str || !value.text) {
                    console.log('ERROR: Tweet with index ' + index + ' is missing data.');

                    return;
                }

                tweetUrl = 'https://twitter.com/' + value.user.screen_name + '/status/' + value.id_str;
                tweetText = value.text;

                itemEl = $('<li />');
                linkEl = $('<a />', {
                    name: 'link',
                    href: tweetUrl,
                    text: tweetText
                });

                itemEl.append(linkEl);
                listEl.append(itemEl);
            });

            $('#tweets').empty().append(listEl);
        }
    });
}).call(this);
