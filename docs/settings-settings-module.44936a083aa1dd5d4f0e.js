(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{mrZN:function(t,n,e){"use strict";e.r(n),e.d(n,"SettingsModule",(function(){return J}));var c=e("An66"),a=e("3kIJ"),i=e("1VvW"),o=e("aDqW"),s=e("bwdy"),r=e("D57K"),b=e("Pdu5"),u=e("Oe4o"),l=e("3HeJ"),g=e("kZht"),m=e("5Rl/"),p=e("5LA1"),f=e("YbVE"),h=e("bX2N"),d=e("F6wS"),O=e("hCLc"),v=e("wvDw"),y=e("EmXI"),A=e("IOEv"),w=e("pTnX");function R(t,n){if(1&t){const t=g.Sb();g.Rb(0,"button",3),g.Yb("click",(function(){return g.mc(t),g.ac().profiler.profile()})),g.vc(1),g.bc(2,"translate"),g.Qb()}2&t&&(g.Ab(1),g.xc(" ",g.cc(2,1,"PROFILE")," "))}function L(t,n){if(1&t){const t=g.Sb();g.Pb(0),g.Rb(1,"mat-card-content"),g.Rb(2,"h3"),g.vc(3),g.bc(4,"translate"),g.Qb(),g.Rb(5,"mat-slider",4),g.Yb("ngModelChange",(function(e){g.mc(t);const c=n.$implicit;return g.ac().settingOptions[c].value=e}))("input",(function(e){g.mc(t);const c=n.$implicit,a=g.ac();return a.inputChange(e,a.settingOptions[c].key)})),g.Qb(),g.Qb(),g.Ob()}if(2&t){const t=n.$implicit,e=g.ac();g.Ab(3),g.wc(g.cc(4,8,e.settingOptions[t].title)),g.Ab(2),g.gc("min",0)("thumbLabel",!0)("step",.02)("max",1)("displayWith",e.formatLabel)("tickInterval",.02)("ngModel",e.settingOptions[t].value)}}function C(t,n){if(1&t&&(g.Rb(0,"mat-option",8),g.vc(1),g.bc(2,"number"),g.Qb()),2&t){const t=n.$implicit,e=g.ac(3);g.gc("value",t),g.Ab(1),g.xc(" ",g.dc(2,2,t,"1.0",e.translate.currentLang)," ")}}const k=function(){return[2,3,4]};function M(t,n){1&t&&(g.Pb(0),g.uc(1,C,3,6,"mat-option",7),g.Ob()),2&t&&(g.Ab(1),g.gc("ngForOf",g.hc(1,k)))}function I(t,n){if(1&t&&(g.Rb(0,"mat-option",8),g.vc(1),g.bc(2,"number"),g.Qb()),2&t){const t=n.$implicit,e=g.ac(3);g.gc("value",t),g.Ab(1),g.xc(" ",g.dc(2,2,t,"1.0",e.translate.currentLang)," ")}}const Q=function(){return[2,4,6]};function E(t,n){1&t&&(g.Pb(0),g.uc(1,I,3,6,"mat-option",7),g.Ob()),2&t&&(g.Ab(1),g.gc("ngForOf",g.hc(1,Q)))}function F(t,n){if(1&t&&(g.Rb(0,"mat-option",8),g.vc(1),g.bc(2,"translate"),g.Qb()),2&t){const t=n.$implicit;g.gc("value",t),g.Ab(1),g.xc(" ",g.cc(2,2,t.toUpperCase())," ")}}const V=function(){return["memorize","regular"]};function j(t,n){1&t&&(g.Pb(0),g.uc(1,F,3,4,"mat-option",7),g.Ob()),2&t&&(g.Ab(1),g.gc("ngForOf",g.hc(1,V)))}function S(t,n){if(1&t){const t=g.Sb();g.Pb(0),g.Rb(1,"mat-card-content"),g.Rb(2,"h3"),g.vc(3),g.bc(4,"translate"),g.Qb(),g.Rb(5,"mat-form-field"),g.Rb(6,"mat-label"),g.vc(7),g.bc(8,"translate"),g.Qb(),g.Rb(9,"mat-select",5),g.Yb("ngModelChange",(function(e){g.mc(t);const c=n.$implicit;return g.ac().settingOptions[c].value=e}))("selectionChange",(function(e){g.mc(t);const c=n.$implicit,a=g.ac();return a.inputChange(e,a.settingOptions[c].key)})),g.uc(10,M,2,2,"ng-container",6),g.uc(11,E,2,2,"ng-container",6),g.uc(12,j,2,2,"ng-container",6),g.Qb(),g.Qb(),g.Qb(),g.Ob()}if(2&t){const t=n.$implicit,e=g.ac();g.Ab(3),g.wc(g.cc(4,6,e.settingOptions[t].title)),g.Ab(4),g.wc(g.cc(8,8,e.settingOptions[t].title)),g.Ab(2),g.gc("ngModel",e.settingOptions[t].value),g.Ab(1),g.gc("ngIf",3===t),g.Ab(1),g.gc("ngIf",4===t),g.Ab(1),g.gc("ngIf",5===t)}}const T=function(){return[0,1]},P=function(){return[3,4]};let D=(()=>{class t{constructor(t,n,e){this.title=t,this.value=n,this.key=e}}return Object(r.a)([Object(l.a)()],t.prototype,"title",void 0),Object(r.a)([Object(l.a)()],t.prototype,"key",void 0),Object(r.a)([Object(l.a)()],t.prototype,"value",void 0),t})(),$=(()=>{class t{constructor(t,n,e,c,a,i){this.changeDetectorRef=t,this.game=n,this.settings=e,this.language=c,this.profiler=a,this.translate=i}ngOnInit(){let t,n,e,c,a,i;this.tempRoute=b.a.Settings,this.settingLabels=["masterVolume","effectsVolume","ambientVolume","match","count","mode"],e=new D("MASTER_VOLUME",this.game.masterVolume.value,"masterVolume"),n=new D("EFFECTS_VOLUME",this.game.effectsVolume.value,"effectsVolume"),t=new D("AMBIENT_VOLUME",this.game.ambientVolume.value,"ambientVolume"),c=new D("UNIQUE_CARDS_COUNT",this.game.count.value,"count"),a=new D("CARDS_TO_MATCH",this.game.match.value,"match"),i=new D("MODE",this.game.mode.value,"mode"),this.settingOptions.push(e,n,t,a,c,i),this.sub()}ngOnDestroy(){this.subscriptions.forEach(t=>{t&&t instanceof s.a&&t.unsubscribe()})}sub(){this.settingLabels.forEach((t,n)=>{let e;e=this.game[t].subscribe(t=>{this.settingOptions[n].value=t,this.changeDetectorRef.markForCheck()}),this.subscriptions.push(e)})}formatLabel(t){return parseInt(String(100*t),10)}inputChange(t,n){this.settings.put(n,t.value).then(e=>{this.game[n].next(t.value)}).catch(t=>{console.error(t.message)})}trackBy(t,n){return t}}return t.\u0275fac=function(n){return new(n||t)(g.Lb(g.h),g.Lb(m.a),g.Lb(p.a),g.Lb(f.a),g.Lb(h.a),g.Lb(o.e))},t.\u0275cmp=g.Fb({type:t,selectors:[["app-settings"]],decls:15,vars:16,consts:[[1,"mat-elevation-z2"],["mat-flat-button","","color","warn","type","button",3,"click",4,"ngIf"],[4,"ngFor","ngForOf","ngForTrackBy"],["mat-flat-button","","color","warn","type","button",3,"click"],[3,"min","thumbLabel","step","max","displayWith","tickInterval","ngModel","ngModelChange","input"],[3,"ngModel","ngModelChange","selectionChange"],[4,"ngIf"],[3,"value",4,"ngFor","ngForOf"],[3,"value"]],template:function(t,n){1&t&&(g.Rb(0,"mat-card",0),g.Rb(1,"mat-card-title"),g.vc(2),g.bc(3,"translate"),g.uc(4,R,3,3,"button",1),g.Qb(),g.Qb(),g.Rb(5,"mat-card",0),g.Rb(6,"mat-card-title"),g.vc(7),g.bc(8,"translate"),g.Qb(),g.uc(9,L,6,10,"ng-container",2),g.Qb(),g.Rb(10,"mat-card",0),g.Rb(11,"mat-card-title"),g.vc(12),g.bc(13,"translate"),g.Qb(),g.uc(14,S,13,10,"ng-container",2),g.Qb()),2&t&&(g.Ab(2),g.xc(" ",g.cc(3,8,"SETTINGS")," "),g.Ab(2),g.gc("ngIf",!n.profiler.environment),g.Ab(3),g.wc(g.cc(8,10,"VOLUME")),g.Ab(2),g.gc("ngForOf",g.hc(14,T))("ngForTrackBy",n.trackBy),g.Ab(3),g.wc(g.cc(13,12,"GAME")),g.Ab(2),g.gc("ngForOf",g.hc(15,P))("ngForTrackBy",n.trackBy))},directives:[d.a,d.e,c.l,c.k,O.b,d.b,v.a,a.e,a.g,y.b,y.e,A.a,w.h],pipes:[o.d,c.e],styles:["mat-card[_ngcontent-%COMP%]{margin-bottom:16px}mat-card[_ngcontent-%COMP%]:last-of-type{margin-bottom:0}mat-slider[_ngcontent-%COMP%]{width:100%}"],changeDetection:0}),Object(r.a)([Object(u.a)()],t.prototype,"settingLabels",void 0),Object(r.a)([Object(u.a)()],t.prototype,"subscriptions",void 0),Object(r.a)([Object(u.a)()],t.prototype,"settingOptions",void 0),Object(r.a)([Object(l.a)()],t.prototype,"tempRoute",void 0),t})();var _=e("tLcC");const x=[{component:$,path:""}];let U=(()=>{class t{}return t.\u0275mod=g.Jb({type:t}),t.\u0275inj=g.Ib({factory:function(n){return new(n||t)},imports:[[i.d.forChild(x)],i.d]}),t})();var B=e("jyP3");let J=(()=>{class t{constructor(t,n){t.lang.subscribe(t=>{let e;e=n.use(t).subscribe(()=>{},()=>{console.error(`Language "${t}": at "SettingsModule" not found.`),n.setTranslation(t,{},!0)},()=>{e&&e instanceof s.a&&e.unsubscribe()})})}}return t.\u0275mod=g.Jb({type:t,bootstrap:[$]}),t.\u0275inj=g.Ib({factory:function(n){return new(n||t)(g.Vb(f.a),g.Vb(o.e))},providers:[{provide:B.a,useValue:"settings"}],imports:[[c.c,a.b,_.a,U,i.d,o.c.forChild(B.b)]]}),t})()}}]);
//# sourceMappingURL=settings-settings-module.44936a083aa1dd5d4f0e.js.map