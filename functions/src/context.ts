// Node imports
import * as util from 'util';

// Module imports
import * as admin from 'firebase-admin';
import { 
    IContext, IMenus, IRoutes, Router, IRouteMatch, 
    IPartials, Helpers, ILayouts, ILayout, IRouteResponse
} from 'scvo-router';


export class Context implements IContext {
    name: string = '';
    domains: string[] = [];
    metaData: any = {};
    menus: IMenus = {};
    routes: IRoutes = {};
    templatePartials: IPartials = {};
    uaId: string = '';
    layouts: ILayouts;

    get toJSON(): IContext {
        return {
            name: this.name,
            domains: this.domains,
            metaData: this.metaData,
            menus: this.menus,
            routes: this.routes,
            uaId: this.uaId,
            userId: this.userId,
            templatePartials: this.templatePartials,
            layouts: this.layouts
        }
    }

    private router: Router = null;

    constructor(context: IContext, public userId: any){
        Object.assign(this, context);

        // Setup our router
        this.router = new Router(this.toJSON, this.uaId, userId, true);
    }

    renderPage(uriString: string): Promise<IRouteResponse>{
        return new Promise<{ html: string, contentType: string }>((resolve, reject) => {
            this.router.execute(uriString).then((routeResponse: IRouteResponse) => {
                resolve(routeResponse);
            }).catch((err) => {
                console.error('Failed to render route', err);
                reject(err);
            });
        });
    }
}
