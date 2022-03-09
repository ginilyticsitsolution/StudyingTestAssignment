import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { CouresVideoListComponent } from './components/coures-video-list/coures-video-list.component';
import { AuthGuard } from './auth/auth.guard';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: SigninComponent },
  { path: 'register', component: SignupComponent },
  { path: 'profile', component: UserProfileComponent, canActivate:[AuthGuard] },
  { path: 'course', component: CourseListComponent, canActivate:[AuthGuard] },
  { path: 'course/:id', component: CouresVideoListComponent, canActivate:[AuthGuard] },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {}