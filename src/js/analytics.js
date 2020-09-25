let count = 0;
function counter(){
    console.log(count);
    return count++;

}

document.addEventListener('dblclick' , counter);