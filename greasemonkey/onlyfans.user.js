// ==UserScript==
// @name        OnlyFans Downloader
// @namespace   me.jgao.onlyfans
// @version     1.0.0
// @description Add buttons for downloading OnlyFans images and videos
// @author      jgao
// @match       https://onlyfans.com/*
// @run-at      document-end
// @grant       none
// @downloadURL https://jgao.me/greasemonkey/onlyfans.user.js
// ==/UserScript==

function processPostElement(post) {
    // div class="post_body"
    //      div class="post_media"
    //      div class="post_tools"
    //      div class="post_title"

    // retrive the image/video link first
    var link = null;
    if (post.children[0].className == 'post_media') { // not text post
        var media = post.children[0];
        if (media.children[0].className == 'post_img') { // image post
            link = media.children[0].children[0].href;
        }
        if (media.children[0].className == 'post_img_big') { // video post
            link = media.children[0].children[0].children[1].children[0].src;
        }
        console.log(link);
        // append a download button to post_tools div
        var button = document.createElement('a');
        button.setAttribute('download', '');
        button.setAttribute('href', link);
        button.innerText = 'Download';
        var tools = post.children[1];
        tools.appendChild(button);
    }
}

setTimeout(function(){
    var posts = document.getElementsByClassName('post_body');
    Array.prototype.forEach.call(posts, processPostElement);
}, 2000);
