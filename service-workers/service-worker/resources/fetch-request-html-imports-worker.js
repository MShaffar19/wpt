importScripts('/common/utils/get-host-info.sub.js');
var host_info = get_host_info();

self.addEventListener('fetch', function(event) {
    var url = event.request.url;
    if (url.indexOf('dummy-dir') == -1) {
      return;
    }
    var result = 'mode=' + event.request.mode +
      ' credentials=' + event.request.credentials;
    if (url == host_info.HTTPS_ORIGIN + '/dummy-dir/same.html') {
      event.respondWith(new Response(
        result +
        '<link id="same-same" rel="import" ' +
        'href="' + host_info.HTTPS_ORIGIN + '/dummy-dir/same-same.html">' +
        '<link id="same-other" rel="import" ' +
        ' href="' + host_info.HTTPS_REMOTE_ORIGIN +
        '/dummy-dir/same-other.html">'));
    } else if (url == host_info.HTTPS_REMOTE_ORIGIN + '/dummy-dir/other.html') {
      event.respondWith(new Response(
        result +
        '<link id="other-same" rel="import" ' +
        ' href="' + host_info.HTTPS_ORIGIN + '/dummy-dir/other-same.html">' +
        '<link id="other-other" rel="import" ' +
        ' href="' + host_info.HTTPS_REMOTE_ORIGIN +
        '/dummy-dir/other-other.html">'));
    } else {
      event.respondWith(new Response(result));
    }
  });
