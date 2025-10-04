import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LucideAngularModule, Home, Users, Briefcase } from 'lucide-angular';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, CommonModule, LucideAngularModule],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
  log(item: string) {
    console.log('Navigate to:', item);
  }

  loggedinUser: any = localStorage.getItem('loggedinUser');

  constructor() {
    console.log(this.loggedinUser);
  }

  protected readonly HomeIcon = Home;
  protected readonly UsersIcon = Users;
  protected readonly BriefcaseIcon = Briefcase;

  isCollapsed = false;

  menuItems = [
    { label: 'Home', icon: this.HomeIcon, link: 'dashboard', active: true },
    { label: 'Employees', icon: this.UsersIcon, link: 'employee', active: false },
    { label: 'Leave', icon: this.BriefcaseIcon, link: 'leave', active: false },
  ];

  user = {
    name: this.loggedinUser.employeeName,
    email: this.loggedinUser.emailId,
  };

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
