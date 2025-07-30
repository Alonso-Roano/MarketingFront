class UserService{
    user:any
    constructor(user:any){
this.user=user
    }
    getUserId(){
        const id=this.user.user.id
        return id?id:null
    }
    getRefreshToken(){
        const refreshToken=this.user.refreshToken
        return refreshToken?refreshToken:null
    }
    getAccessToken(){
        const accessToken=this.user.accessToken
        return accessToken?accessToken:null
    }
}
export default UserService;