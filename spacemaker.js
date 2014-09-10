function space(el, after) {
    after = after || 4;
    var v = el.value.replace(/[^\dA-Z]/g, ''),
        reg = new RegExp(".{" + after + "}", "g")
        el.value = v.replace(reg, function (a, b, c) {
            return a + ' ';
        });
}

var el = document.getElementById('cc_number');
el.addEventListener('keyup', function () {
    space(this, 4);
});
