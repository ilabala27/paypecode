import { Auth } from 'aws-amplify';
import appConfig from '@config/app.config';

export const awsConfigure = () => {
    Auth.configure({
        Auth: {
            ...appConfig.aws
        }
    })
}
