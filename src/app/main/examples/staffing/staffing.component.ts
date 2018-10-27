import { Component } from '@angular/core';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';

import { AuthService } from 'angularx-social-login';

@Component({
    selector   : 'staffing',
    templateUrl: './staffing.component.html',
    styleUrls  : ['./staffing.component.scss'],
    animations : fuseAnimations
})
export class StaffingComponent
{
    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private authService: AuthService)
    {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                footer   : {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    /**
     * On init
     */
    ngOnInit(): void
    {
    
    }
}
