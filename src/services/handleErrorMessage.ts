type Message = {
    msg: string;
    path: string;
}
export const handleMessageErrors = async (data:Message[]) => {
    let message = ''
    for (const value of data) {
        message+= value.msg
    }
    
    return message
}