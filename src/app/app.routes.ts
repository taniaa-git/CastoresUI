import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ContainerComponent } from './container/container.component';
import { InventoryComponent } from './inventory/inventory.component';
import { OutputsComponent } from './outputs/outputs.component';
import { HistoryComponent } from './history/history.component';
import { InputsComponent } from './inputs/inputs.component';

export const routes: Routes = [
    {
      path: '',
      component: ContainerComponent,
      children: [
        { path: 'inventory', component: InventoryComponent },
        { path: 'outputs', component: OutputsComponent },
        { path: 'history', component: HistoryComponent },
        { path: 'inputs', component: InputsComponent },
        { path: '', redirectTo: 'inventory', pathMatch: 'full' }
      ]
      
    }, { path: 'login', component: LoginComponent }
  ];