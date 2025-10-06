import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LucideAngularModule, Home, Users, Briefcase, Menu, User } from 'lucide-angular';
import { ZardDropdownModule } from 'n/dropdown/dropdown.module';
import { ZardDividerComponent } from 'n/divider/divider.component';
import { ZardButtonComponent } from 'n/button/button.component';

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    CommonModule,
    LucideAngularModule,
    RouterLink,
    ZardDropdownModule,
    ZardDividerComponent,
    ZardButtonComponent,
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout implements OnInit {
  loggedinUser: any;

  user = {
    name: '',
    email: '',
  };

  constructor() {
    const userString = localStorage.getItem('loggedinUser');
    if (userString) {
      this.loggedinUser = JSON.parse(userString);
      console.log(this.loggedinUser);
    }
  }

  ngOnInit() {
    if (this.loggedinUser) {
      this.user = {
        name: this.loggedinUser.employeeName,
        email: this.loggedinUser.emailId,
      };
    }
  }

  protected readonly HomeIcon = Home;
  protected readonly UsersIcon = Users;
  protected readonly BriefcaseIcon = Briefcase;
  protected readonly MenuIcon = Menu;
  protected readonly SingleUserIcon = User;

  isCollapsed = true;

  menuItems = [
    { label: 'Home', icon: this.HomeIcon, link: 'dashboard', active: true },
    { label: 'Employees', icon: this.UsersIcon, link: 'employee', active: false },
    { label: 'Leave', icon: this.BriefcaseIcon, link: 'leave', active: false },
  ];

  setActive(selectedItem: any): void {
    this.menuItems.forEach((item) => (item.active = false));
    selectedItem.active = true;
  }

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  onLogOff() {
    localStorage.removeItem('loggedinUser');
    window.location.reload();
  }

  onProfile() {
    console.log('Profile clicked');
  }

  onBilling() {
    console.log('Billing clicked');
  }

  onSettings() {
    console.log('Settings clicked');
  }

  onKeyboardShortcuts() {
    console.log('Keyboard shortcuts clicked');
  }

  onTeam() {
    console.log('Team clicked');
  }

  onNewTeam() {
    console.log('New Team clicked');
  }

  onGitHub() {
    console.log('GitHub clicked');
  }

  onSupport() {
    console.log('Support clicked');
  }

  onLogout() {
    console.log('Log out clicked');
  }
}
