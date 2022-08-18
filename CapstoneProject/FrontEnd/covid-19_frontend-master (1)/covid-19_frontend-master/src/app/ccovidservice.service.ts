import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Ccountry } from './ccountry';
import { User } from './User';

const USER_NAME = "";


@Injectable({
  providedIn: 'root'
})
export class ccovidservice {
  
  registerEndPoint: string;
  loginendpoint:string;
  username: any;
  offset:String;
  country:string;
  pnameFromkey:String
  pidFromkey:String;
  favouritEndPoint: string;
  edituserEndPoint:string;
  updatepasswordEndPoint:string;


  constructor(private httpClient: HttpClient,  private router: Router) {
    this.registerEndPoint= 'http://localhost:8100/api/v1/userservice/register';
    this.loginendpoint='http://localhost:8100/api/v1/userservice/login';
    this.favouritEndPoint= 'http://localhost:7072/api/v1/favoriteservice';
    this.edituserEndPoint='http://localhost:7071/api/v1/userservice/update';
    this.updatepasswordEndPoint='http://localhost:7071/api/v1/userservice/changepassword'
   }

   


   //To display all countries from covidapi
  getAllCountryList(): Observable<any> {
    const url = `https://api.apify.com/v2/key-value-stores/tVaYRsPHLjNdNBu7S/records/LATEST?disableRedirect=true`;
    return this.httpClient.get(url);
  }

  //To display countryDetails in countrydetails component
  getCountryDetails(pid: String): Observable<any> {
    pid=this.pidFromkey;
    console.log(pid);

    console.log("from service class get CountryDetails() method")
    const url = `https://api.apify.com/v2/key-value-stores/tVaYRsPHLjNdNBu7S/records/LATEST?disableRedirect=true`;
    console.log(url);
    return this.httpClient.get(url);

  }


  // To searchcountryr----searching country is working now
  getCountryList(name: String): Observable<any> {
    name=this.pnameFromkey;
    console.log(name);
    this.offset='&offset=0'
    const url = `https://api.apify.com/v2/key-value-stores/tVaYRsPHLjNdNBu7S/records/LATEST?disableRedirect=true`;
     console.log(url);
    return this.httpClient.get(url);
  }

   registerUser(newUser:any) {
     console.log(newUser)
    const url = this.registerEndPoint;
    return this.httpClient.post(url, newUser);
  }

  changedetails(user:User,oldusername:any){
    console.log(oldusername+"in service changedetails")
    console.log(user.username+"inservice  changedetails")
    const url =this.edituserEndPoint+'/'+oldusername
    console.log(url)
     return this.httpClient.put(url,user)
  }
  updatePassword(user:User,username:any){
    console.log(username+"in service updatepassword")
    console.log(user.oldpassword+"inservice  updatepassword"+ user.newpassword)
    const url =this.updatepasswordEndPoint+'/'+username
    console.log(url)
     return this.httpClient.put(url,user)
  }

  // public getToken(User:any){
  //   console.log("Generating token from servise")
  //   const url = ""
  //   return this.httpClient.post(url,User)

  // }

  public getToken(User:any){
    console.log("Generating token from servise")
    const url = this.loginendpoint;
    // localStorage.setItem(this.uName, User.username);
    // console.log("username form token: "+this.uName);
    console.log("username form token: "+User.username);
   // localStorage.setItem("username",User.username);
    console.log(this.username);
    let x=localStorage.getItem("username");
    console.log(x);
   // environment.USER_NAME=User.username
   // console.log(environment.USER_NAME+"eni")
    localStorage.setItem(USER_NAME,User.username)
    let y=localStorage.getItem(USER_NAME)
    console.log("y--"+y);

    // console.log("username form token: ");
    // localStorage.setItem('currentUser', JSON.stringify({ token: "jwt will come later", username: User.username }));
    console.log(url);
    return this.httpClient.post(url,User)

  }

  //To remove token from localstorage
  logout() {
    sessionStorage.removeItem(USER_NAME);
    sessionStorage.clear();
    localStorage.removeItem('token');
    localStorage.clear();
    // console.log("Log out:"+USER_NAME);
    console.log("logged out from ccovidcervice");
  }
  addCountryToFavoriteList(ccountry: Ccountry) {
    console.log("Calling addPlayerToFavourite from service class");
    this.username = localStorage.getItem(USER_NAME);
    console.log(this.username);
    if(this.username==null){
      const url = "";
    return this.httpClient.post(url, ccountry)
    }
    else{
      const url = this.favouritEndPoint + "/user/" + this.username + "/country";
    return this.httpClient.post(url, ccountry)
       }
  }

  deleteCountryFromFavouriteList(ccountry:Ccountry){
    // this.ccovidservice.de
    console.log("Calling deletePlayerfromFavouritelist from service class");
    this.username=localStorage.getItem(USER_NAME);
    this.country=ccountry.country;
    const url = this.favouritEndPoint + "/user/" + this.username +"/"+this.country;
    console.log("delete url:-"+url);
    return this.httpClient.delete(url)

  }
  getFavoriteList(): Observable<Ccountry[]> {
    console.log("getFavourite from service class");
    this.username = localStorage.getItem(USER_NAME);
    const url = this.favouritEndPoint + "/user/" + this.username + "/country";
    return this.httpClient.get<Ccountry[]>(url);

  }
}

