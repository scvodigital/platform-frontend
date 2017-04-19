import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from "@angular/router";
import { BrowserModule, Title } from '@angular/platform-browser';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { rootRouterConfig } from "./app.routing";

import { AngularFireModule } from 'angularfire2';
import { DndModule } from 'ng2-dnd';
import { Angulartics2Module, Angulartics2GoogleAnalytics } from 'angulartics2';
import { SlimLoadingBarService, SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { Ng2BreadcrumbModule } from 'ng2-breadcrumb/ng2-breadcrumb';
import { MaterializeDirective, MaterializeModule } from 'angular2-materialize';
import { DynamicComponentModule } from 'angular2-dynamic-component';

/* Services */
import { ElasticService } from "./services/elastic.service"
import { AppService } from "./services/app.service"
// import { MetaService } from './services/meta.service';

/* Components */
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PageComponent } from './components/page/page.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
// import { SearchInputComponent } from './components/shared/header/search-input.component';
import { FooterComponent } from './components/footer/footer.component';
import { PrivacyAndCookiesComponent } from './components/static/privacy-and-cookies.component';
import { TermsAndConditionsComponent } from './components/static/terms-and-conditions.component';

import { InlineEditComponent } from './components/shared/inline-edit/inline-edit.component';

/* Admin Components */
import { AdminComponent } from './components/admin/admin.component';
import { MenuListComponent } from './components/admin/menu-list/menu-list.component';
import { MenuEditorComponent } from './components/admin/menu-editor/menu-editor.component';
import { PageEditorComponent } from './components/admin/page-editor/page-editor.component';
import { PageListComponent } from './components/admin/page-list/page-list.component';
import { TranslationsManagerComponent } from './components/admin/translations-manager/translations-manager.component';

/* Pipes */
import { MarkdownToHtmlModule } from 'markdown-to-html-pipe';
import { MapToIterablePipe } from './pipes/map-to-iterable.pipe';
import { MarkdownPipe } from './pipes/markdown.pipe';
import { StringToDatePipe } from './pipes/string-to-date.pipe';
import { TranslatePipe } from './pipes/translate.pipe';
import { KeysPipe } from './pipes/keys.pipe';
import { ReplacePipe } from './pipes/replace.pipe';
import { SlugifyPipe } from './pipes/slugify.pipe';

/* Directives */
// none

/* Consiguration */
import { firebaseConfig } from './configuration/firebase';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(rootRouterConfig),
        AngularFireModule.initializeApp(firebaseConfig),
        Angulartics2Module.forRoot([Angulartics2GoogleAnalytics]),
        DndModule.forRoot(),
        Ng2BreadcrumbModule.forRoot(),
        ReactiveFormsModule,
        MaterializeModule,
        MarkdownToHtmlModule,
        DynamicComponentModule,
        SlimLoadingBarModule.forRoot()
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        PageComponent,
        HeaderComponent,
        MenuComponent,
        // SearchInputComponent,
        FooterComponent,
        PrivacyAndCookiesComponent,
        TermsAndConditionsComponent,
        AdminComponent,
        MenuListComponent,
        MenuEditorComponent,
        PageEditorComponent,
        InlineEditComponent,
        PageListComponent,
        TranslationsManagerComponent,
        MapToIterablePipe,
        MarkdownPipe,
        StringToDatePipe,
        TranslatePipe,
        KeysPipe,
        ReplacePipe,
        SlugifyPipe
    ],
    providers: [
        SlimLoadingBarService,
        // MetaService,
        ElasticService,
        AppService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
