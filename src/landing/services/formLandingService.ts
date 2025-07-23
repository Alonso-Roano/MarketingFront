
class LandingService{
/*     form:any;
constructor(form:any){
    this.form=form;
}
getForm(id:string){
return this.form
} */

getRefresToken(){
  
}
getUserId(){
    const user=JSON.parse(localStorage.getItem("auth")??'')
    if(!user) return null
    return user.user?.id
}
}

export default LandingService;