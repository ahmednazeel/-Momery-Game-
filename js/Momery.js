
// Select The Start Game Button
document.querySelector('.control-button span').onclick = function(){
    let yourName = prompt('What Your Name ');
    let name = document.querySelector('.name span');
    if (yourName === null || yourName ===""){
        name.innerHTML = 'UnKnown'
    }else{
        name.innerHTML = yourName
    }
    // Remove Splash Screen
    document.querySelector('.control-button').remove()
};

// Effect duration
let duration = 1000;
let bolcksContainer = document.querySelector('.memory-game-blocks');
let blocks = Array.from(bolcksContainer.children);
// create range of keys
let orderRange =[...Array(blocks.length).keys()];
// add order css property to game blocks
shuffile(orderRange);

blocks.forEach( (block , index) => {
    block.style.order = orderRange[index];
    block.addEventListener('click',function(){
        flipBlock(block)
    })
});
function flipBlock(SelectedBlock){
    // add class => is-flipped
    SelectedBlock.classList.add('is-flipped');
    let allFilppedBlocks =blocks.filter(filppedBlock => filppedBlock.classList.contains('is-flipped'));
    if(allFilppedBlocks.length === 2){
        stopClicking()
        chickMatchedBlocks(allFilppedBlocks[0],allFilppedBlocks[1])
    };
};
function stopClicking(){
    bolcksContainer.classList.add('no-clicking');
    setTimeout(()=>{
        bolcksContainer.classList.remove('no-clicking');
    },duration);
};
// chick matched blocks
function chickMatchedBlocks(firstBlock, secondBlock){
    let triesElement = document.querySelector('.tries span');
    if (firstBlock.dataset.technology === secondBlock.dataset.technology){
        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');
        firstBlock.classList.add('has-match');
        secondBlock.classList.add('has-match');
        document.getElementById("success").play()
    }else{
        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1; 
        setTimeout(() => {
            firstBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');
        },duration);
        document.getElementById("fail").play()
    }

}
// shuffile function
function shuffile(array){
    //setting vars
    let current = array.length,
        temp,
        random;
    while(current > 0){
        random = Math.floor(Math.random() * current)
        current--;
        //#__=> [1] SAVE CURRENT ELEMENT IN STASH
        temp = array[current];
        //#__=> [2] CURRENT ELEMENT = RONDOM ELEMENT
        array[current] = array[random]
        //#__=> [3] RONDOM ELEMENT = GET ELEMENT FORM STASH
        array[random]= temp
    };
    return array;
};
