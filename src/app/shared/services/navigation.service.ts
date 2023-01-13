import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

interface IMenuItem {
    type: string; // Possible values: link/dropDown/icon/separator/extLink
    name?: string; // Used as display text for item and title for separator type
    state?: string; // Router state
    icon?: string; // Material icon name
    svgIcon?: string; // UI Lib icon name
    tooltip?: string; // Tooltip text
    disabled?: boolean; // If true, item will not be appeared in sidenav.
    sub?: IChildItem[]; // Dropdown items
    badges?: IBadge[];
}

interface IChildItem {
    type?: string;
    name: string; // Display text
    state?: string; // Router state
    icon?: string;  // Material icon name
    svgIcon?: string; // UI Lib icon name
    sub?: IChildItem[];
}

interface IBadge {
    color: string; // primary/accent/warn/hex color codes(#fff000)
    value: string; // Display text
}

@Injectable()
export class NavigationService {
    iconMenu: IMenuItem[] = [
        {
            name: 'DASHBOARD',
            type: 'link',
            tooltip: 'Dashboard',
            icon: 'dashboard',
            state: 'charts',
        },
        {
            name: 'Profile',
            type: 'link',
            icon: 'person_outline',
            state: 'profile'
        },
        {
            name: 'Members',
            type: 'dropDown',
            icon: 'people_outline',
            state: 'members',
            sub: [
                {name: 'Students', state: 'students'},
                {name: 'Teachers', state: 'teachers'},
            ]
        }, {
            name: 'Articles',
            type: 'link',
            icon: 'comment',
            state: 'articles'
        }, {
            name: 'Tools',
            type: 'link',
            icon: 'language',
            state: 'tools'
        }, {
            name: 'Events',
            type: 'link',
            icon: 'event_note',
            state: 'events'
        },
        {
            name: 'Log out',
            type: 'link',
            icon: 'exit_to_app',
            state: 'sessions/signin3'
        }
    ];

    separatorMenu: IMenuItem[] = [
        {
            type: 'separator',
            name: 'Custom components'
        },
        {
            name: 'DASHBOARD',
            type: 'link',
            tooltip: 'Dashboard',
            icon: 'dashboard',
            state: 'dashboard'
        },
        {
            name: 'Profile',
            type: 'link',
            icon: 'person_outline',
            state: 'profile'
        },
        {
            name: 'Members',
            type: 'dropDown',
            icon: 'people_outline',
            state: 'members',
            sub: [
                {name: 'Students', state: 'students'},
                {name: 'Teachers', state: 'teachers'},
            ]
        }, {
            name: 'Articles',
            type: 'link',
            icon: 'comment',
            state: 'articles'
        }, {
            name: 'Tools',
            type: 'link',
            icon: 'language',
            state: 'tools'
        }, {
            name: 'Events',
            type: 'link',
            icon: 'event_note',
            state: 'events'
        },
        {
            type: 'separator',
            name: 'Other components'
        },
        {
            name: 'Log out',
            type: 'link',
            icon: 'exit_to_app',
            state: 'sessions/signin3'
        }
    ];

    plainMenu: IMenuItem[] = [
        {
            name: 'DASHBOARD',
            type: 'link',
            tooltip: 'Dashboard',
            icon: 'dashboard',
            state: 'dashboard'
        },
        {
            name: 'Profile',
            type: 'link',
            icon: 'person_outline',
            state: 'profile'
        },
        {
            name: 'Members',
            type: 'dropDown',
            icon: 'list',
            state: 'members',
            sub: [
                {name: 'Students', state: 'students'},
                {name: 'Teachers', state: 'teachers'},
            ]
        }, {
            name: 'Articles',
            type: 'link',
            icon: 'comment',
            state: 'articles'
        }, {
            name: 'Tools',
            type: 'link',
            icon: 'language',
            state: 'tools'
        }, {
            name: 'Events',
            type: 'link',
            icon: 'event_note',
            state: 'events'
        },

        {
            name: 'CHARTS',
            type: 'link',
            tooltip: 'Charts',
            icon: 'show_chart',
            state: 'charts'
        },
        {
            name: 'Log out',
            type: 'link',
            icon: 'exit_to_app',
            state: 'sessions/signin3'
        }
    ];

    // Icon menu TITLE at the very top of navigation.
    // This title will appear if any icon type item is present in menu.
    iconTypeMenuTitle = 'Frequently Accessed';
    // sets iconMenu as default;
    menuItems = new BehaviorSubject<IMenuItem[]>(this.iconMenu);
    // navigation component has subscribed to this Observable
    menuItems$ = this.menuItems.asObservable();

    constructor() {
    }

    // Customizer component uses this method to change menu.
    // You can remove this method and customizer component.
    // Or you can customize this method to supply different menu for
    // different user type.
    publishNavigationChange(menuType: string) {
        switch (menuType) {
            case 'separator-menu':
                this.menuItems.next(this.separatorMenu);
                break;
            case 'icon-menu':
                this.menuItems.next(this.iconMenu);
                break;
            default:
                this.menuItems.next(this.plainMenu);
        }
    }
}
