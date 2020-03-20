import md5 from "md5";

export const utils = {
    methods:{
        getGravatar(member){
            return 'https://www.gravatar.com/avatar/'+md5(member.email)+'?d=robohash' ;
        }
    }
};
