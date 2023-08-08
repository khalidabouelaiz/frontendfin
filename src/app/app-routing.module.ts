import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { AdminComponent } from './admin/admin.component';
import { DashbordComponent } from './adminn/dashbord/dashbord.component';
import { DefaultComponent } from './adminn/default/default.component';
import { PostsComponent } from './adminn/posts/posts.component';
import { AppComponent } from './app.component';
import { DashbComponent } from './dashb/dashb.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeClientComponent } from './home-client/home-client.component';
import { HomeClientnumComponent } from './home-clientnum/home-clientnum.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { DebutComponent } from './debut/debut.component';
import { EmployerComponent } from './employer/employer.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { CreateCreationemployerComponent } from './create-creationemployer/create-creationemployer.component';

const routes: Routes = [
  { path: '', redirectTo: 'debut', pathMatch: 'full' },
  { path: 'debut', component: DebutComponent },
  { path: 'aboutUS', component: AboutUsComponent },
  { path: 'home', component: AppComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'dashb', component: DashbComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'homeclient', component: HomeClientComponent },
  { path: 'homeclientnum', component: HomeClientnumComponent },
  { path: 'acceuil', component: AcceuilComponent },
  { path: 'employer', component: EmployerComponent },
  { path: 'creationemployer', component: CreateCreationemployerComponent },

  {
    path: 'adminn',
    component: DefaultComponent,
    children: [
      {
        path: '',
        component: DashbordComponent,
      },
      { path: 'posts', component: PostsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
})
export class AppRoutingModule {}
