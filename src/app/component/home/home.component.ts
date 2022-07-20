import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { MatDialog } from '@angular/material/dialog';
import { findIndex, fromEvent } from 'rxjs';
import { NgIf } from '@angular/common';
import { MatSelect } from '@angular/material/select';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Pipe, PipeTransform } from '@angular/core';

export interface UserData {
  id: number;
  email: string;
  role:string
}
const USER_DATA: UserData[] = [];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})


export class HomeComponent implements OnInit {

  length: number;
  
  personDetail = [];
  pageSize: any = '';
  tempData: any = [];
  dataSource:any;
  num=5;
  pageSizeOptions: number[] = [5, 10, 15, 20];
productsList: any
  pagedList: any
  breakpoint: number = 3; 
@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild('scrollContainer') private scrollContainer: ElementRef;
  scrolls: any;
  elementRef: any;
  sum=100;
array=[]
  constructor(private home: HomeService, public dialog: MatDialog,private renderer2: Renderer2) {
    // this.onWindowScroll()
   
// 



  }
  getYPosition(e: Event): number {
    return (e.target as Element).scrollTop;
  }
  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 800) ? 1 : 3;
        // this.productsList = <GetOrInitializeYourListHere>;
    this.home.getData().subscribe((data) => {
      this.personDetail= data;
      console.log(this.personDetail);
      this.dataSource=data.products
      // this.dataSource.paginator = this.paginator;
      console.log(this.dataSource)
      this.pagedList = this.dataSource.slice(0, this.num);
      this.length = this.dataSource.length;
     
     
    });
    
  }

  @HostListener('scroll', ['$event.target'])
    onScroll(elem:any){
  if(( elem.offsetHeight + elem.scrollTop) >=  elem.scrollHeight-50) {
    
     console.log("It's Lit");
     this.num=this.num+5
     this.pagedList = this.dataSource.slice(0, this.num);
    //  this.pageSizeOptions=[this.num,this.num+5,this.num+5]
     this.dataSource.paginator = this.paginator;
     this.length= this.pagedList.length()
     
  }
}
ngAfterViewInit(): void{
  this.pagedList
  
  // this.pageSizeOptions=[this.num,this.num+5,this.num+5]
}

  OnPageChange(event: PageEvent){
    let startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if(endIndex > this.length){
      endIndex = this.length;
    }
    this.pagedList = this.dataSource.slice(startIndex, endIndex);
  }



  
}
