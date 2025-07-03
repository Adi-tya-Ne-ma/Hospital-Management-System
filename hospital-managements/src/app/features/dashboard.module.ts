import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule for Angular features
import { DashboardRedirectComponent } from './dashboard-redirect.component'; // Import the standalone component

const routes: Routes = [
  { path: '', component: DashboardRedirectComponent } // Route for redirection
];

@NgModule({
  imports: [
    CommonModule, // Import CommonModule for Angular directives
    RouterModule.forChild(routes), // Configure child routes
    DashboardRedirectComponent // Import the standalone component
  ],
  exports: [RouterModule] // Export RouterModule for use in other modules
})
export class DashboardModule {}