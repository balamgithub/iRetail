import { CommonModule } from '@angular/common';
import { layoutRouting } from './layout.routing';
import { LayoutComponent } from './pages/layout/layout.page';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    layoutRouting,
    CommonModule,
    TooltipModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [
  ],
  declarations: [LayoutComponent]
})
export class LayoutModule { }
