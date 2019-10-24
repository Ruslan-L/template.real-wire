'use strict'

let x = 0;

function clickSlide(where, number) {
    
    let _elmSlide = document.body.querySelector('.section-header-wrapper'); // Slide window

    let _elmBack = document.body.querySelector('.back');    // Back button
    let _elmForward = document.body.querySelector('.forward'); // Forward button

    // Slide status block
    let _elmCircle = document.querySelector('.section-header-interface'); 
    let quaCircle = _elmCircle.children.length;

    _elmCircle.children[x].classList.remove('active'); // Delete active circle

    // Determine how much to move the slide
    if (where === 'back') {
        x -= number;
    } else if (where === 'forward') {
        x += number;
    } else if (where === 'circle') {
        x = number;
    }

    _elmCircle.children[x].classList.add('active'); // Add active circle

    _elmSlide.setAttribute('style', `transform: translateX(-${x}00%);`); // Move the slide

    // Hidden and visible buttons for moving slides
    (x === 0) ? hidden(_elmBack) : visible(_elmBack) ;
    (x === --quaCircle) ?  hidden(_elmForward) : visible(_elmForward) ;

    function hidden(elm) {
        elm.setAttribute('hidden', '');
        elm.removeAttribute('visible');
    }
    function visible(elm) {
        elm.setAttribute('visible', '');
        elm.removeAttribute('hidden');
    }
}