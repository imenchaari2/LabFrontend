import {Component, OnInit, OnDestroy, AfterViewInit} from "@angular/core";
import {NavigationService} from "../../services/navigation.service";
import {ThemeService} from "../../services/theme.service";
import {Subscription} from "rxjs";
import {ILayoutConf, LayoutService} from "app/shared/services/layout.service";
import {JwtAuthService} from "app/shared/services/auth/jwt-auth.service";
import {MemberService} from "../../services/labServices/memberService";
import {Member} from "../../models/member";

@Component({
    selector: "app-sidebar-side",
    templateUrl: "./sidebar-side.component.html"
})
export class SidebarSideComponent implements OnInit, OnDestroy, AfterViewInit {
    public menuItems: any[];
    public hasIconTypeMenuItem: boolean;
    public iconTypeMenuTitle: string;
    private menuItemsSub: Subscription;
    public layoutConf: ILayoutConf;
    base64Data: any;
    photo: any;
    member: any;
    memberName: any;

    constructor(
        private navService: NavigationService,
        public themeService: ThemeService,
        private layout: LayoutService,
        public jwtAuth: JwtAuthService,
        public memberService: MemberService,
    ) {
    }

    ngOnInit() {
        this.iconTypeMenuTitle = this.navService.iconTypeMenuTitle;
        this.menuItemsSub = this.navService.menuItems$.subscribe(menuItem => {
            this.menuItems = menuItem;
            //Checks item list has any icon type.
            this.hasIconTypeMenuItem = !!this.menuItems.filter(
                item => item.type === 'icon'
            ).length;
        });
        this.layoutConf = this.layout.layoutConf;
        this.member = this.jwtAuth.getUser();
        console.log(this.jwtAuth.getUser())
        this.getMemberById(this.member.id);
    }

    private getMemberById(id: string) {
        this.memberService.getMemberById(id).subscribe(value => {
            if (!!value) {
                this.photo = 'data:image/jpeg;base64,' + value.photo.data;
                if (value.role === 'ROLE_ADMIN') {
                    this.memberName = 'ADMIN';
                } else {
                    this.memberName = value.fullName;
                }
            }
        });
    }

    ngAfterViewInit() {
    }

    ngOnDestroy() {
        if (this.menuItemsSub) {
            this.menuItemsSub.unsubscribe();
        }
    }

    toggleCollapse() {
        if (
            this.layoutConf.sidebarCompactToggle
        ) {
            this.layout.publishLayoutChange({
                sidebarCompactToggle: false
            });
        } else {
            this.layout.publishLayoutChange({
                // sidebarStyle: "compact",
                sidebarCompactToggle: true
            });
        }
    }
}
