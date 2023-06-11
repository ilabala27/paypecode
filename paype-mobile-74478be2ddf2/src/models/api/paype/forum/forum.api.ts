import { constructQuery } from "@utilis/methods/string.method";
import { ForumAxios } from "./forum.axios";


interface request {
    url?: string | any;
    header?: object | any;
    body?: object | any;
    params?: object | any;
    query?: object | any;
}

const ForumApis = {
    // ### Story
    createStory: ({ body }: request) => ForumAxios.post(`/story`, body),
    getStoryWithStrict: ({ query }: request) => ForumAxios.get(`/story/and${constructQuery(query)}`),
}

export default ForumApis