import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';

import { AuthService } from 'angularx-social-login';

@Component({
    selector   : 'projects',
    templateUrl: './projects.component.html',
    styleUrls  : ['./projects.component.scss'],
    animations : fuseAnimations
})
export class ProjectsComponent
{
    itemValue = '';
    items: Observable<any[]>;

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

        // this.items = db.list('items').valueChanges();
    }

    /**
     * On init
     */
    ngOnInit(): void
    {

    }

    onSubmit() {
        //this.db.list('/items').push({ content: this.itemValue });
        this.itemValue = '';
    }
}
