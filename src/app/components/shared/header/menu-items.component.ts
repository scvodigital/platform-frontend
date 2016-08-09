import { Component, Input } from '@angular/core';
import { Control } from '@angular/common';

import { ROUTER_DIRECTIVES } from '@angular/router';

import { MaterializeDirective } from 'angular2-materialize';

@Component({
    selector: '[menu-items]',
    templateUrl: 'app/components/shared/header/menu-items.component.html',
    directives: [ROUTER_DIRECTIVES, MaterializeDirective],
})
export class MenuItemsComponent {
    @Input('menu-items') menuType: string = '';
    public navigationMenu: Object;

    constructor() {
        this.navigationMenu = [
            {
                'title': 'Home',
                'path': '/'
            },
            {
                'title': 'Running your organisation',
                'path': '/running-your-organisation',
                'contents': [
                    {
                        'title': 'Finance',
                        'path': '/running-your-organisation/finance',
                        'term_id': 13
                    },
                    {
                        'title': 'Business management',
                        'path': '/running-your-organisation/business-management',
                        'term_id': 14
                    },
                    {
                        'title': 'Governance',
                        'path': '/running-your-organisation/governance',
                        'term_id': 15
                    },
                    {
                        'title': 'Funding',
                        'path': '/running-your-organisation/funding',
                        'term_id': 16
                    },
                    {
                        'title': 'Legislation & regulation',
                        'path': '/running-your-organisation/legislation-regulation',
                        'term_id': 17
                    },
                ]
            },
            {
                'title': 'Employability',
                'path': '/employability',
                'contents': [
                    {
                        'title': 'Community Jobs Scotland',
                        'path': '/employability/community-jobs-scotland',
                        'term_id': 19
                    },
                    {
                        'title': 'Disability equality internships',
                        'path': '/employability/disability-equality-internships',
                        'term_id': 20
                    },
                    {
                        'title': 'Past employability schemes',
                        'path': '/employability/past-employability-schemes',
                        'term_id': 21
                    }
                ]
            },
            {
                'title': 'Services',
                'path': '/services',
                'term_id': 43,
                'contents': [
                    {
                        'title': 'SCVO membership',
                        'path': '/services/scvo-membership'
                    },
                    {
                        'title': 'Good HQ',
                        'path': '/services/good-hq'
                    },
                    {
                        'title': 'Office space',
                        'path': '/services/office-space'
                    },
                    {
                        'title': 'Credit Union',
                        'path': '/services/credit-union'
                    },
                    {
                        'title': 'Third Force News',
                        'path': '/services/third-force-news'
                    },
                    {
                        'title': 'Goodmoves',
                        'path': '/services/goodmoves'
                    },
                    {
                        'title': 'Funding Scotland',
                        'path': '/services/funding-scotland'
                    },
                    {
                        'title': 'Payroll',
                        'path': '/services/payroll'
                    },
                    {
                        'title': 'Digital participation',
                        'path': '/services/digital-participation'
                    },
                    {
                        'title': 'Scottish Accessible Information Forum',
                        'path': '/services/scottish-accessible-information-forum'
                    },
                    {
                        'title': 'Professional networks',
                        'path': '/services/professional-networks'
                    },
                    {
                        'title': 'Affiliate deals',
                        'path': '/services/affiliate-deals'
                    }
                ]
            },
            {
                'title': 'Events & training',
                'path': '/events',
                'contents': [
                    {
                        'title': 'Scottish Charity Awards',
                        'path': '/events/scottish-charity-awards'
                    },
                    {
                        'title': 'The Gathering',
                        'path': '/events/the-gathering'
                    },
                    {
                        'title': 'Training courses',
                        'path': '/training/search'
                    }
                ]
            },
            {
                'title': 'Policy',
                'path': '/policy',
                'contents': [
                    {
                        'title': 'Blogs',
                        'path': '/policy/blogs',
                        'term_id': 38
                    },
                    {
                        'title': 'Consultation responses',
                        'path': '/policy/consultation-responses',
                        'term_id': 39
                    },
                    {
                        'title': 'Briefings & reports',
                        'path': '/policy/briefings-reports',
                        'term_id': 41
                    },
                    {
                        'title': 'Policy committee',
                        'path': '/policy/policy-committee',
                        'term_id': 42
                    }
                ]
            },
            {
                'title': 'About',
                'path': '/about-us',
                'term_id': 50,
                'class': 'right'
            },
            {
                'title': 'Contact',
                'path': '/contact-us',
                'class': 'right'
            },
            {
                'title': 'Media',
                'path': '/media-centre',
                'class': 'right'
            },
            {
                'title': 'Join',
                'path': '/join-scvo',
                'class': 'right'
            }
        ]
    }
}
