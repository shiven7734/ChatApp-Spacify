const users=[];




function usern(id,uname,space){

    const user={id,uname,space};
    users.push(user);
    return user;

}

function userl(id){
    const i= users.findIndex(user=>user.id==id);

    if(i!==-1){
        return users.splice(i,1)[0];
    }
}
function getr(space){
    return users.filter(user=>user.space===space);
}
function get(id){
    return users.find(user=>user.id==id);
}

module.exports={
    usern,get,userl,getr
};

