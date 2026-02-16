const params = new URLSearchParams(window.location.search);
if (!params.has('noredirect')) {
    window.location.href = 'http://192.168.0.103:3000'
}