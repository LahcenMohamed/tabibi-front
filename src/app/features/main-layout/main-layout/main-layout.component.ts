import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { ConfirmDialogComponent } from '../../../shared/componenets/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-main-layout',
  imports: [RouterLinkActive, MatIcon, RouterOutlet,RouterModule],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {
  /**
   *
   */
  constructor(private dialog: MatDialog) {
  }
  logOut():void{
     const dialogRef = this.dialog.open(ConfirmDialogComponent, {
              width: '400px',
              data: {
                title: 'Confirm Logout',
                message: `Are you sure you want to log out?`,
                confirmText: 'Yes',
                cancelText: 'No'
              }
            });

      dialogRef.afterClosed().subscribe(result => {
        if (result === true) {
          localStorage.removeItem('token');
          window.location.reload();
      }});
  }
}
