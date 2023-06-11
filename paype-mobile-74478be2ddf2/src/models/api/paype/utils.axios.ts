import { Auth } from "aws-amplify";

export const getToken = async () => {
    try {
        return (await Auth.currentSession()).getAccessToken().getJwtToken();
    } catch (err) {
        console.log(err)
    }
}

export const getIdToken = async () => {
    try {
        return (await Auth.currentSession()).getIdToken().getJwtToken();
    } catch (err) {
        console.log(err)
    }
}
