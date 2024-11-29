import { Time } from '@angular/common';
import { ThisReceiver } from '@angular/compiler';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Chart from 'chart.js/auto';
import { AddService } from 'src/app/add.service';
import { AddServiceService } from 'src/app/services/add-service.service';
import { LocationService } from 'src/app/services/location.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent {
  id: any;
  chart: any = [];
  Label: string[] = ['', '', '', ''];
  chartData: number[] = [];
  readyForService: number = 0;
  pendingService: number = 0;
  readyForDelivery: number = 0;
  delivered: number = 0;
  completedService: number = 0;
  totalService: number = 0;
  data: any[] = [];
  filteredData: any = [];
  currentDate: Date = new Date();
  currentTime: Date = new Date()
  intervalId: any;
  latitude: number | undefined;
  longitude: number | undefined;
  city: string | undefined;
  state: string | undefined;
  country: string | undefined;
  error: string | undefined;
  adminId: any;
  currentFilter: string = '';
  chartInstance: any;
  hideStatusContainer: boolean = false;
  showNoData:boolean=true;

  constructor(
    private addService: AddServiceService,
    private route: Router,
    private _shared: SharedService,
    private router: ActivatedRoute
  ) { }


  ngOnInit() {
    this.currentFilter='today';
    this.filterServices();
  }
  // updateTime(): void {
  //   // this.id = this.router.snapshot.paramMap.get('id');
  //   this.intervalId = setInterval(() => {
  //     this.currentTime = new Date();
  //   }, 1000);
  // }
  filterServices() {
    this.addService.getService().subscribe((res: any) => {
      this.data = res;
    });
  }

  // countByStatus() {
  //   this.readyForService = this.data.filter((x: any) => x.service_status === 'Ready for service').length;
  //   console.log('Number of required:', this.readyForService);
  //   this.pendingService = this.data.filter((x: any) => x.service_status === 'Service in progress').length;
  //   console.log('Number of required:', this.pendingService);
  //   this.readyForDelivery = this.data.filter((x: any) => x.service_status === 'Ready for delivery').length;
  //   console.log('Number of required:', this.readyForDelivery);
  //   this.delivered = this.data.filter((x: any) => x.service_status === 'delivered').length;
  //   console.log('Number of required:', this.readyForDelivery);
  //   this.completedService = this.data.filter((x: any) => x.service_status === 'Service completed').length
  //   console.log('Number of required:', this.completedService);
  //   this.totalService = this.data.length;
  //   this.chartData = [this.readyForService, this.pendingService, this.delivered, this.readyForDelivery];
  // }

  generateChart() {
    if (this.totalService === 0) {
      this.hideStatusContainer = false;
      this.showNoData = true;
  
      // Destroy the existing chart instance if it exists
      if (this.chartInstance) {
        this.chartInstance.destroy();
        this.chartInstance = null; // Reset the instance
      }
    } else {
      this.hideStatusContainer = true;
      this.showNoData = false;
  
      // Destroy the existing chart instance if it exists
      if (this.chartInstance) {
        this.chartInstance.destroy();
        this.chartInstance = null; // Reset the instance
      }
  
      this.chart = document.getElementById('myChart') as HTMLCanvasElement;
  
      // Create a new chart instance
      this.chartInstance = new Chart(this.chart, {
        type: 'bar',
        data: {
          labels: this.Label,
          datasets: [
            {
              label: '# of services',
              data: this.chartData,
              backgroundColor: ['red', 'orange', 'blue', 'green'],
              borderColor: 'black',
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }  

  onFilterChange() {
    switch (this.currentFilter) {
      case 'today':
        this.filterDataByToday();
        break;
      case 'week':
        this.filterDataByThisWeek();
        break;
      case 'month':
        this.filterDataByThisMonth();
        break;
      case 'year':
        this.filterDataByThisYear();
        break;
    }
  }

  filterDataByToday() {
    this.currentFilter = 'today';
    const today = new Date().toISOString().split('T')[0];
    this.readyForService = 0;
    this.pendingService = 0;
    this.readyForDelivery = 0;
    this.data.forEach((item: { service_status: string; service_date: string; status_change_date: string }) => {
      if (item.service_status === 'Ready for service' && item.service_date === today) {
        this.readyForService++;
      } else if (item.service_status === 'Service in progress' && item.status_change_date === today) {
        this.pendingService++;
      } else if (item.service_status === 'Ready for delivery' && item.status_change_date === today) {
        this.readyForDelivery++;
      }
    });
    this.totalService = this.readyForService + this.pendingService + this.readyForDelivery;
    this.chartData = [this.readyForService, this.pendingService, this.delivered, this.readyForDelivery];
    this.generateChart();
  }

  filterDataByThisWeek() {
    this.currentFilter = 'week';
    const today = new Date();
    const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay())).toISOString().split('T')[0];
    const lastDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 6)).toISOString().split('T')[0];
    this.readyForService = 0;
    this.pendingService = 0;
    this.readyForDelivery = 0;
    this.filteredData = this.data.filter((item: { service_date: string; status_change_date: string; service_status: string }) => {
      const serviceDateInRange = item.service_date >= firstDayOfWeek && item.service_date <= lastDayOfWeek;
      const statusChangeDateInRange = item.status_change_date && item.status_change_date >= firstDayOfWeek && item.status_change_date <= lastDayOfWeek;

      if (item.service_status === 'Ready for service' && serviceDateInRange) {
        this.readyForService++;
      } else if (item.service_status === 'Service in progress' && statusChangeDateInRange) {
        this.pendingService++;
      } else if (item.service_status === 'Ready for delivery' && statusChangeDateInRange) {
        this.readyForDelivery++;
      }
      return serviceDateInRange || statusChangeDateInRange;
    });
    this.totalService = this.readyForService + this.pendingService + this.readyForDelivery;
    this.chartData = [this.readyForService, this.pendingService, this.delivered, this.readyForDelivery];
    this.generateChart();
  }

  filterDataByThisMonth() {
    this.currentFilter = 'month';
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0];
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString().split('T')[0];
    this.readyForService = 0;
    this.pendingService = 0;
    this.readyForDelivery = 0;
    this.filteredData = this.data.filter((item: { service_date: string; status_change_date: string; service_status: string }) => {
      const serviceDateInRange = item.service_date >= firstDayOfMonth && item.service_date <= lastDayOfMonth;
      const statusChangeDateInRange = item.status_change_date && item.status_change_date >= firstDayOfMonth && item.status_change_date <= lastDayOfMonth;
      if (item.service_status === 'Ready for service' && serviceDateInRange) {
        this.readyForService++;
      } else if (item.service_status === 'Service in progress' && statusChangeDateInRange) {
        this.pendingService++;
      } else if (item.service_status === 'Ready for delivery' && statusChangeDateInRange) {
        this.readyForDelivery++;
      }
      return serviceDateInRange || statusChangeDateInRange;
    });
    this.totalService = this.readyForService + this.pendingService + this.readyForDelivery;
    this.chartData = [this.readyForService, this.pendingService, this.delivered, this.readyForDelivery];
    this.generateChart();

  }
  filterDataByThisYear() {
    this.currentFilter = 'year';
    const today = new Date();
    const firstDayOfYear = new Date(today.getFullYear(), 0, 1).toISOString().split('T')[0];
    const lastDayOfYear = new Date(today.getFullYear(), 11, 31).toISOString().split('T')[0];
    this.readyForService = 0;
    this.pendingService = 0;
    this.readyForDelivery = 0;
    this.filteredData = this.data.filter((item: { service_date: string; status_change_date: string; service_status: string }) => {
      const serviceDateInRange = item.service_date >= firstDayOfYear && item.service_date <= lastDayOfYear;
      const statusChangeDateInRange = item.status_change_date && item.status_change_date >= firstDayOfYear && item.status_change_date <= lastDayOfYear;
      if (item.service_status === 'Ready for service' && serviceDateInRange) {
        this.readyForService++;
      } else if (item.service_status === 'Service in progress' && statusChangeDateInRange) {
        this.pendingService++;
      } else if (item.service_status === 'Ready for delivery' && statusChangeDateInRange) {
        this.readyForDelivery++;
      }
      return serviceDateInRange || statusChangeDateInRange;
    });
    this.totalService = this.readyForService + this.pendingService + this.readyForDelivery;
    this.chartData = [this.readyForService, this.pendingService, this.delivered, this.readyForDelivery];
    this.generateChart();
  }
  ngOnDestroy(): void {
      // Destroy the chart instance if it exists
      if (this.chartInstance) {
        this.chartInstance.destroy();
        this.chartInstance = null; // Reset the instance
      }
    
      if (this.intervalId) {
        clearInterval(this.intervalId);
      }
    }
  }


