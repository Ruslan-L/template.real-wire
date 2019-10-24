let condition = 0;

function clickMenu() {
    let _elmMenu = document.body.querySelector('.main-menu-element');

    (condition === 0) ? visible() : hidden() ;

    function hidden() {
        _elmMenu.setAttribute('hidden', '');
        _elmMenu.removeAttribute('visible');
        condition = 0;
    }
    function visible() {
        _elmMenu.setAttribute('visible', '');
        _elmMenu.removeAttribute('hidden');
        condition = 1;
    }
}