import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';

import { AuthService } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';

@Component({
    selector   : 'login',
    templateUrl: './login.component.html',
    styleUrls  : ['./login.component.scss'],
    animations : fuseAnimations
})
export class LoginComponent implements OnInit
{
    loginForm: FormGroup;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private _httpClient: HttpClient
    )
    {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar   : {
                    hidden: true
                },
                toolbar  : {
                    hidden: true
                },
                footer   : {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {

        this.authService.signOut();
    }

    signInWithGoogle(): void {
        this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
            (userData) => { //on success
              console.log(userData);
              this.router.navigate(['/dashboard']);
              /*this._httpClient.post('/uaas', {...userData})
                .subscribe((response: any) => {
                  localStorage.removeItem('autho_token');
                  if(response.header.get('Authorization')) {
                    localStorage.setItem('autho_token', response.header.get('Authorization'));
                  }
                  this.router.navigate(['/dashboard']);
              });*/
            }
        );
    }
}
