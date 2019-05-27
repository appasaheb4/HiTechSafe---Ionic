import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';
import { CallNumber } from '@ionic-native/call-number';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Geolocation } from '@ionic-native/geolocation';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';

   
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { HelpPage } from '../pages/help/help';
import { ProfilePage } from '../pages/profile/profile';
import { RoutehistoryPage } from '../pages/routehistory/routehistory';
import { GridviewPage } from '../pages/gridview/gridview';
import { GridviewallPage } from '../pages/gridviewall/gridviewall';
import { GridviewofflinePage } from '../pages/gridviewoffline/gridviewoffline';
import { MapviewPage } from '../pages/mapview/mapview';
import { ReportPage } from '../pages/report/report';
import { ReportidlePage } from '../pages/reportidle/reportidle';
import { ReportspeedPage } from '../pages/reportspeed/reportspeed';
import { ReportsummaryPage } from '../pages/reportsummary/reportsummary';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { MapviewallPage } from '../pages/mapviewall/mapviewall';
import { MapviewofflinePage } from '../pages/mapviewoffline/mapviewoffline';
import { ReportsummaryshowgridPage } from '../pages/reportsummaryshowgrid/reportsummaryshowgrid';
import { ReportspeedShowdataPage } from '../pages/reportspeed-showdata/reportspeed-showdata';
import { ChangepasswordPage } from '../pages/changepassword/changepassword';
import { RoadhistrymapviewPage } from '../pages/roadhistrymapview/roadhistrymapview';
import { MapviewdistanceshowPage } from '../pages/mapviewdistanceshow/mapviewdistanceshow';
import { ReportidelshowdataPage } from '../pages/reportidelshowdata/reportidelshowdata';  
 
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GridviewallproProvider } from '../providers/gridviewallpro/gridviewallpro';
import { ReportsummaryproProvider } from '../providers/reportsummarypro/reportsummarypro';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,LoginPage,HelpPage,ProfilePage,RoutehistoryPage,GridviewPage,GridviewallPage,GridviewofflinePage,
    MapviewPage,ReportPage,ReportidlePage,ReportspeedPage,ReportsummaryPage,DashboardPage,MapviewallPage,
    MapviewofflinePage,ReportsummaryshowgridPage,ReportspeedShowdataPage,RoadhistrymapviewPage,MapviewdistanceshowPage,
    ReportidelshowdataPage,ChangepasswordPage
  ],
  imports: [
    BrowserModule,HttpClientModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp,{tabsPlacement: 'bottom',tabsHideOnSubPages: true})  
  ],
  bootstrap: [IonicApp],  
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,LoginPage,HelpPage,ProfilePage,RoutehistoryPage,GridviewPage,GridviewallPage,GridviewofflinePage,
    MapviewPage,ReportPage,ReportidlePage,ReportspeedPage,ReportsummaryPage,DashboardPage,MapviewallPage,
    MapviewofflinePage,ReportsummaryshowgridPage,ReportspeedShowdataPage,RoadhistrymapviewPage,MapviewdistanceshowPage,
    ReportidelshowdataPage,ChangepasswordPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
 CallNumber,  
    SocialSharing,
Geolocation,
 File,
    FileOpener,
    Transfer,
    Camera,
    FilePath,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GridviewallproProvider,
    ReportsummaryproProvider
  ]
})
export class AppModule {}
