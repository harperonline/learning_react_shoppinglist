const apiRequest = async (url = '', optionsObj = null, errMsg = null) => {
    try {
        const reponse = await fetch (url, optionsObj); //optionsObj details request type, POST etc
        if(!reponse.ok) throw Error('Please reload the app');
    }catch (err) {
        errMsg = err.message;
    } finally {
        return errMsg;
    }
}

export default apiRequest;