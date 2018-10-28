import { InMemoryDbService } from 'angular-in-memory-web-api';

import { ProjectDashboardDb } from 'app/fake-db/dashboard-project';
import { AnalyticsDashboardDb } from 'app/fake-db/dashboard-analytics';

import { ContactsFakeDb } from 'app/fake-db/contacts';
import { NetworksFakeDb } from 'app/fake-db/networks';

import { ProfileFakeDb } from 'app/fake-db/profile';
import { SearchFakeDb } from 'app/fake-db/search';

import { QuickPanelFakeDb } from 'app/fake-db/quick-panel';

import { LoginFakeDb } from 'app/fake-db/login';

export class FakeDbService implements InMemoryDbService
{
    createDb(): any
    {
        return {
            // Dashboards
            'project-dashboard-projects' : ProjectDashboardDb.projects,
            'project-dashboard-widgets'  : ProjectDashboardDb.widgets,
            'analytics-dashboard-widgets': AnalyticsDashboardDb.widgets,

            // Contacts
            'contacts-contacts': ContactsFakeDb.contacts,
            'contacts-user'    : ContactsFakeDb.user,

            // Contacts
            'networks-networks': NetworksFakeDb.networks,
            'networks-user'    : NetworksFakeDb.network,


            // Profile
            'profile-timeline'     : ProfileFakeDb.timeline,
            'profile-photos-videos': ProfileFakeDb.photosVideos,
            'profile-about'        : ProfileFakeDb.about,

            // Search
            'search-classic': SearchFakeDb.classic,
            'search-table'  : SearchFakeDb.table,

            // Quick Panel
            'quick-panel-notes' : QuickPanelFakeDb.notes,
            'quick-panel-events': QuickPanelFakeDb.events,

            'login': LoginFakeDb.user
        };
    }
}
