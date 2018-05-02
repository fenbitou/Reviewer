/**
 * 设置双向同步滚动
 * 
 * @export
 * @param {any} src 监听的文本框
 * @param {any} dest 同步滚动文本框 
 */
export function scrollEditor(src, dest) {
    src.addEventListener('scroll', monopoly(function (evt) { update(src, dest) }));
    dest.addEventListener('scroll', monopoly(function (evt) { update(dest, src) }));
}

function update(src, dest) {
    var scrollRange = src.scrollHeight - src.clientHeight;
    var p = src.scrollTop / scrollRange;
    dest.scrollTop = p * (dest.scrollHeight - dest.clientHeight);
}

// 获得允许调用该函数的权限，排斥其他函数的调用
function monopoly(fn, duration) {
    duration = duration || 100;
    var ret = function () {
        if (!monopoly.permit) {
            monopoly.permit = fn;
        }
        if (monopoly.permit === fn) {
            clearTimeout(monopoly.permitTimer);
            monopoly.permitTimer = setTimeout(function () {
                delete monopoly.permit;
            }, duration);
            return fn.apply(this, arguments);
        }
    };
    return ret;
}