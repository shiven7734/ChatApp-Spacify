var ch=document.getElementById('chat');
var room= document.getElementById('room');
var user=document.getElementById('user');
const socket=io();
var ms=document.getElementById('ms');
var cc= document.querySelector('mes');
const {uname,space}=Qs.parse(location.search,{
    ignoreQueryPrefix:true
});



console.log(uname,space);
var btn=document.getElementById('send');

socket.emit('space', {uname,space})
socket.on('message',message=>{
    console.log(message);
    output(message);
    // cc.scrollTop=cc.scrollHeight;
})

socket.on('room',({space,users})=>{
    outputr(space);
    // outputu(users);
})

btn.addEventListener('click',(e)=>{
    e.preventDefault();
    const me=ms.value;

    socket.emit('chat',me);
    ms.value='';
})


function output(message){

    const div= document.createElement('div');
    div.classList.add('mes');
    div.innerHTML=` <p id="m">${message.uname}<span>${message.time}</span></p>
    <p id="txt">
        ${message.text};
    </p>`;
    document.querySelector('.parent').appendChild(div);
}

function outputr(space){
    room.innerText=space;

}

// function outputu(users){
//     user.innerHTML
// }