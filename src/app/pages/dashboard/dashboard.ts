import { Component } from '@angular/core';
import { toast } from 'ngx-sonner';
import { ZardButtonComponent } from '../../../../n/button/button.component';

@Component({
  selector: 'app-dashboard',
  imports: [ZardButtonComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  showToast() {
    toast.error('Something went wrong', {
      description: 'There was a problem with your request.',
    });
  }
}
