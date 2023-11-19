type Message = {
    msg: string;
    path: string;
}
export const handleMessageErrors = async (data:Message[]) => {
    console.log('dsini');
    
    let message = ''
    for (const value of data) {
        message+= value.msg
    }
    console.log(message);
    
    return message
}