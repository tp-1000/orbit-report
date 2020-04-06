import { Component } from '@angular/core';
import { Satellite } from './satellite';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'orbit-report';
  sourceList:Satellite[];
  displayList:Satellite[];

  constructor() {
    this.sourceList = [];
    this.displayList = [];
    
    let satellitesUrl = 'https://handlers.education.launchcode.org/static/satellites.json';
 
    window.fetch(satellitesUrl).then(function(response) {
       response.json().then(function(data) {
 
          let fetchedSatellites = data.satellites;
          for(let satellite of fetchedSatellites) {    
            this.sourceList.push(new Satellite(satellite.name, satellite.type, satellite.launchDate, satellite.orbitType, satellite.operational));
          }
          this.displayList = this.sourceList.slice(0);
       }.bind(this));
    }.bind(this));
 
  };
  search(searchTerm: string): void {
    let matchingSatellites: Satellite[] = [];
    searchTerm = searchTerm.toLowerCase();
    
    for(let data of this.sourceList) {
      let name = data.name.toLowerCase();
      if(name.indexOf(searchTerm) >= 0) {
        matchingSatellites.push(data);
      }
    }

    this.displayList = matchingSatellites;
  };

}

