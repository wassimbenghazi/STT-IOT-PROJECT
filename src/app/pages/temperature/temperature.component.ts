import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Chart } from 'angular-highcharts';
import { FirebaseService } from 'src/app/firebase.service';
import { element } from 'protractor';

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.scss']
})
export class TemperatureComponent implements OnInit {
  
  constructor(private firebase:FirebaseService) { }
  highcharts = Highcharts;
  listTemp=[]
  chartList=[]
  boolSpinner=true
  boolcharts=false
  chart1 = new Chart({

    title: {
        text: 'Température'
    },

    subtitle: {
        text: 'cuisine'
    },

    yAxis: {
        title: {
            text: '°C'
        }
    },

    xAxis: {
        accessibility: {
            rangeDescription: 'heure'
        }
    },

    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },

    plotOptions: {
        series: {
            label: {
                connectorAllowed: false
            },
           
        }
    },

    series: [{
      type: 'line',
        name: 'Température',
        data: [[2,22.2],[6,25],[7,24],[9,23.6],[10,21.1],[11,18],[12,26],[13,24.6]]
    }],

    responsive: {
        rules: [{
            condition: {
                maxWidth: 1000
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'right',
                    verticalAlign: 'top'
                }
            }
        }]
    }

});
   
afficherchart(){ 
    for (let element of this.listTemp) {
    console.log(element); 
    let chartx:any
    chartx = new Chart({

     title: {
         text: 'Température'
     },
 
     subtitle: {
         text: element.name
     },
 
     yAxis: {
         title: {
             text: '°C'
         }
     },
 
     xAxis: { 
        title: {
            text: 'Date'
        },
         type: 'datetime',
         accessibility: {
             rangeDescription: 'heure'
         }
     },
 
     legend: {
         layout: 'vertical',
         align: 'right',
         verticalAlign: 'middle'
     },
 
     plotOptions: {
         series: {
             label: {
                 connectorAllowed: false
             },
            
         }
     },
 
     series: [{
       type: 'line',
         name: 'Température',
         data: element.data.sort((a, b) => {
            return <any>new Date(b[0]) - <any>new Date(a[0]) ;
          })
     }],
 
     responsive: {
         rules: [{
             condition: {
                 maxWidth: 1000
             },
             chartOptions: {
                 legend: {
                     layout: 'horizontal',
                     align: 'right',
                     verticalAlign: 'top'
                 }
             }
         }]
     }
 
                        });
     this.chartList.push(chartx)
     console.log("chart list boucle : " ,this.chartList)
   }
   this.boolcharts=true

}

async delay() {
    await new Promise(resolve => { 
        this.listTemp =this.firebase.getAllTempObjects()
        console.log("list temp " , this.listTemp)}).then(()=>{this.afficherchart()  
            this.boolcharts = true 
            this.boolSpinner=false});
}
  ngOnInit() {//   this.firebase.getAllDevices()
    let chartx:any
    this.listTemp =this.firebase.getAllTempObjects()
    console.log("list temp " , this.listTemp)
    
    
    this.boolSpinner=false
    
    
 
  }

}
