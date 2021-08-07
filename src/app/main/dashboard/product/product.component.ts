import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { ApiCommonService } from 'src/app/service/common/api-common.service';
import { GlobalDeleteDialogComponent } from '../common/global-delete-dialog/global-delete-dialog.component';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { AddProductComponent } from './add-product/add-product.component';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  displayedColumns: string[] = ['_id', 'createdAt', 'title', 'image', 'position', 'action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  paginateStartNo = 0;

  backend_base_url = environment.base_url;

  constructor(
    private apiCommon: ApiCommonService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.apiCommon.get('product').subscribe(
      res => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    });
  }

  createDialog(): void {
    const dialogRef = this.dialog.open(AddProductComponent , {
      width: '100vw',
      height: '100vh',
      maxWidth: 'none',
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataSource.data.unshift(result);
        this.dataSource._updateChangeSubscription();
      }
    });

  }

  details(data): void {
    this.dialog.open(DetailProductComponent, {
      width: '100vw',
      height: '100vh',
      maxWidth: 'none',
      autoFocus: false,
      data: {data}
    });
  }

  delete(id): void{

    const dialogRef = this.dialog.open(GlobalDeleteDialogComponent, {
      width: '400px',
      data: {
        title: 'Product',
        url: 'product/',
        id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === id) {
        this.dataSource.data.map( (item, index) => {
          if (item._id === id) {
            this.dataSource.data.splice(index, 1);
            this.dataSource._updateChangeSubscription();
          }
        });
      }
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onPaginateChange(event) {
    this.paginateStartNo = event.pageIndex * event.pageSize;
}

}
