var left = document.getElementById('left-arrow')
var right = document.getElementById('right-arrow')
var container = document.querySelector('.container')

function leftArrow(){
    if(container.scrollLeft === 0){
        left.style.display = 'none'
    }
    else
    {
        left.style.display = 'block'
    }
}
leftArrow()


left.addEventListener('click',function(){
    container.scrollLeft -=200;
})

right.addEventListener('click',function(){
    container.scrollLeft +=200;
})

container.addEventListener('scroll',leftArrow)