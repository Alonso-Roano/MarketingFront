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
}
export default UserService;