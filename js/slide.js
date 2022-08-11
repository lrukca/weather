'use strict';
const wrapper = document.getElementById("wrapper");
const swipper = document.getElementById("swipper");

// 자바스크립트 모바일 이벤트 touchmove, touchend
let left_wrap = wrapper.getBoundingClientRect().left;
let hei = wrapper.offsetHeight;
let len = swipper.children.length;
let ul_wid = hei * len;
let per = hei / (window.innerHeight / 20);
window.addEventListener('resize', () => {
    left_wrap = wrapper.getBoundingClientRect().left;
    hei = wrapper.offsetHeight;
    ul_wid = hei * len;
    per = hei / (window.innerHeight / 20);
});
let pos = {prev: 0, now: 0, ul: 0};
let order;
wrapper.addEventListener('touchmove', startSlider, false);
wrapper.addEventListener('touchend', adSlider, false);

function startSlider(e){
    e = e || window.event;
    e.preventDefault();
    // console.log(e.changedTouches[0]);
    pos.prev = e.changedTouches[0].clientX - left_wrap;
    if(pos.prev > pos.now){
        // 오른쪽으로 움직임
        pos.ul += per;
    }else{
        // 왼쪽으로 움직임
        pos.ul -= per;
    }
    moveSlider();
    pos.now = pos.prev;
}

function moveSlider(){
    swipper.style.transform = `translateX(${pos.ul}px`;
}

function adSlider(){
    // console.log("떨어짐");
    order = Math.round(pos.ul / hei);
    pos.ul = order * hei;
    if(pos.ul > 0){pos.ul = 0;}
    if(pos.ul < -(ul_wid - hei)){
        pos.ul = -(ul_wid - hei);
    }
    moveSlider();
}