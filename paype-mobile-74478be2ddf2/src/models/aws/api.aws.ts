import { Auth } from 'aws-amplify';

export const signUp = async (payload: any) => {
    const result = await Auth.signUp(payload);
    return result
};

export const signIn = async ({ username, password }: any) => {
    const result = await Auth.signIn(username, password);
    return result
};

export const verify = async (user: any, ans: any) => {
    const result = await Auth.sendCustomChallengeAnswer(user, ans);
    return result
};

export const signOut = async () => {
    const result = await Auth.signOut();
    return result
};