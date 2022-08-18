import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ccountry } from '../ccountry'
import{ ccovidservice } from '../ccovidservice.service'
declare var $ : any
@Component({
  selector: 'app-searchcountry',
  templateUrl: './searchcountry.component.html',
  styleUrls: ['./searchcountry.component.css']
})
export class SearchcountryComponent implements OnInit {

  ccountries: Array<Ccountry> = [];
  searchcountry: Array<Ccountry> = [];
  idd: number;
  country: string;
  infected:string;
  recovered:string;
  deceased:string
  countryObj: Ccountry;
  statusCode: number;
  errorStatus: string;
  objCcountry:any={}

  @Input()
  Ccountry: Ccountry;
  constructor(private routes: ActivatedRoute, private ccovidservice: ccovidservice) { 
    ccovidservice.pnameFromkey=this.country
    ccovidservice.pidFromkey=this.infected
  }

  ngOnInit(): void {
    this.openSpinnerPopUp()
    this.ccovidservice.getAllCountryList()
    .subscribe(vari => {
   

      console.log(vari);
      const data = vari;
      this.objCcountry=vari
      console.log(this.objCcountry)
      console.log(data);

        this.idd = 0;
        data.forEach((element: any) => {
          console.log(element);


          this.idd++;
          this.countryObj = new Ccountry();
          //console.log('hh'+data[this.idd].country)
          this.countryObj.country = data[this.idd].country;
          this.countryObj.infected = data[this.idd].infected;
          // this.playerObj.name = element["name"];
          this.countryObj.recovered=data[this.idd].recovered;
          // console.log( this.playerObj.pid );
          this.countryObj.deceased=data[this.idd].deceased
          ;
          // console.log(this.playerObj);



          this.ccountries.push(this.countryObj);
          this.closeSpinnerPopUp()
          //  console.log(this.cplayers);


        });
      });
     
  }

  onKey(event: any) {


    //this.openSpinnerPopUp()
    if (event.keyCode == 13) {
      this.ccountries = [];
      this.country = event.target.value;

      console.log('countryname', this.country);
      this.ccovidservice.pnameFromkey=this.country;
      console.log(this.ccovidservice.pnameFromkey);


      this.ccovidservice.getCountryList(this.country)
        .subscribe(vari => {
          // console.log(country);
          const data = vari;

          this.idd = 0;
          data.forEach((element: any) => {

            this.idd++;
            this.countryObj = new Ccountry();
            console.log(this.ccovidservice.pnameFromkey +'khdvbdk');
            
            if(data[this.idd].country.toUpperCase()===this.ccovidservice.pnameFromkey.toUpperCase()){
            this.countryObj.country = data[this.idd].country;
            this.countryObj.infected = data[this.idd].infected;
            // this.countryObj.name = element["name"];
            this.countryObj.recovered=data[this.idd].recovered

            this.countryObj.deceased=data[this.idd].deceased
            this.ccountries.push(this.countryObj);
            this.searchcountry.push(this.countryObj);
            console.log(this.countryObj.infected);
            this.ccovidservice.pidFromkey=this.countryObj.infected;
            console.log("mc id:"+this.ccovidservice.pidFromkey);


            console.log(this.searchcountry);}

          });
        });
    }
    // setTimeout( () =>{
    //   //that.messageSuccess = false;
    //   this.closeSpinnerPopUp()
    // },3000);
   //this.closeSpinnerPopUp()
  }
  addToFavoriteList(ccountry: Ccountry) {
    console.log(ccountry);
    
    this.ccovidservice.addCountryToFavoriteList(ccountry).subscribe(
      {next:data=>
        {console.log(data);

    },
    error:e=>
    {this.errorStatus = `${e.status}`;
    const errorMsg = `${e.error.message}`;
    this.statusCode = parseInt(this.errorStatus, 10);}})
  }
  addToFavorite(ccountry: Ccountry) {
    console.log(ccountry)
    this.addToFavoriteList(ccountry);
    console.log("clicked add to favourite...");

  }
  deleteFromFavourite(ccountry: Ccountry){
    console.log("clicked deleted to favourite...");
    console.log(ccountry);
    this.ccovidservice.deleteCountryFromFavouriteList(ccountry).subscribe(data=>{console.log(data);
    })
  }


 openSpinnerPopUp() {
    $("#spinner").modal('show');
}

 closeSpinnerPopUp() {
    $("#spinner").modal('hide');
}
}

