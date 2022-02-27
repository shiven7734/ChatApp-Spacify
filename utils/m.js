const moment=require('moment');

function format(uname,text){

    return {
        uname,
        text,
        time:moment().format('hh:mm p')
    }
}


module.exports=format;