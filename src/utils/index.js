import url from "url";

export const getQuery = function(search){
    return url.parse(search,true).query;
}

// export {axios} from "./axios" 