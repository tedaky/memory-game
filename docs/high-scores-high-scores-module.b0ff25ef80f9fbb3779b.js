(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{dmTi:function(t,n,c){"use strict";c.r(n),c.d(n,"HighScoresModule",function(){return V});var e=c("SVse"),a=c("s7LF"),o=c("iInd"),r=c("TSSN"),i=c("OaSA"),s=c("quSY"),b=c("/cQC"),l=c("8Y7J"),u=c("Esqy"),m=c("tfa/"),h=c("TLEJ"),g=c("PDjf"),d=c("Q2Ze"),f=c("ZTz/"),p=c("Dxy4"),C=c("UhP/");function R(t,n){if(1&t){const t=l.Sb();l.Rb(0,"button",16),l.Yb("click",function(){return l.mc(t),l.ac().profiler.profile()}),l.vc(1),l.bc(2,"translate"),l.Qb()}2&t&&(l.Ab(1),l.xc(" ",l.cc(2,1,"PROFILE")," "))}function w(t,n){if(1&t){const t=l.Sb();l.Rb(0,"button",17),l.Yb("click",function(n){return l.mc(t),l.ac().clear(n)}),l.vc(1),l.bc(2,"translate"),l.Qb()}2&t&&(l.Ab(1),l.xc(" ",l.cc(2,1,"CLEAR")," "))}function A(t,n){if(1&t&&(l.Rb(0,"mat-option",18),l.vc(1),l.bc(2,"number"),l.Qb()),2&t){const t=n.$implicit,c=l.ac();l.gc("value",t),l.Ab(1),l.xc(" ",l.dc(2,2,t,"1.0",c.translate.currentLang)," ")}}function S(t,n){if(1&t&&(l.Rb(0,"mat-option",18),l.vc(1),l.bc(2,"number"),l.Qb()),2&t){const t=n.$implicit,c=l.ac();l.gc("value",t),l.Ab(1),l.xc(" ",l.dc(2,2,t,"1.0",c.translate.currentLang)," ")}}function v(t,n){if(1&t&&(l.Rb(0,"th",19),l.vc(1),l.bc(2,"translate"),l.Qb()),2&t){const t=l.ac();l.Ab(1),l.xc("",l.cc(2,1,t.column),":")}}function O(t,n){if(1&t&&(l.Rb(0,"td",20),l.vc(1),l.bc(2,"number"),l.Qb()),2&t){const t=n.index,c=l.ac();l.Ab(1),l.xc(" ",l.dc(2,1,t+1,"1.0",c.translate.currentLang)," ")}}function M(t,n){if(1&t&&(l.Rb(0,"td",21),l.vc(1),l.bc(2,"number"),l.Qb()),2&t){const t=l.ac();l.Ab(1),l.xc(" ",l.dc(2,1,1,"1.0",t.translate.currentLang)," ")}}function Q(t,n){1&t&&(l.Rb(0,"th",19),l.vc(1),l.bc(2,"translate"),l.Qb()),2&t&&(l.Ab(1),l.xc("",l.cc(2,1,"TIME"),":"))}function y(t,n){if(1&t&&(l.Rb(0,"td",20),l.vc(1),l.bc(2,"number"),l.bc(3,"number"),l.bc(4,"number"),l.bc(5,"number"),l.Qb()),2&t){const t=n.$implicit,c=l.ac();l.Ab(1),l.Ac(" ",l.dc(2,4,t.complete.hours,"2.0",c.translate.currentLang)," : ",l.dc(3,8,t.complete.minutes,"2.0",c.translate.currentLang)," : ",l.dc(4,12,t.complete.seconds,"2.0",c.translate.currentLang)," : ",l.dc(5,16,t.complete.milliseconds,"3.0",c.translate.currentLang)," ")}}function D(t,n){if(1&t&&(l.Rb(0,"td",21),l.vc(1),l.bc(2,"number"),l.bc(3,"number"),l.bc(4,"number"),l.bc(5,"number"),l.Qb()),2&t){const t=l.ac();l.Ab(1),l.Ac(" ",l.dc(2,4,0,"2.0",t.translate.currentLang)," : ",l.dc(3,8,0,"2.0",t.translate.currentLang)," : ",l.dc(4,12,3,"2.0",t.translate.currentLang)," : ",l.dc(5,16,0,"3.0",t.translate.currentLang)," ")}}function P(t,n){1&t&&(l.Rb(0,"th",19),l.vc(1),l.bc(2,"translate"),l.Qb()),2&t&&(l.Ab(1),l.xc("",l.cc(2,1,"FLIPS"),":"))}function _(t,n){if(1&t&&(l.Rb(0,"td",20),l.vc(1),l.Qb()),2&t){const t=n.$implicit;l.Ab(1),l.wc(t.flips)}}function L(t,n){if(1&t&&(l.Rb(0,"td",21),l.vc(1),l.bc(2,"number"),l.Qb()),2&t){const t=l.ac();l.Ab(1),l.xc(" ",l.dc(2,1,12,"1.0",t.translate.currentLang)," ")}}function x(t,n){if(1&t&&l.Mb(0,"tr",22),2&t){const t=l.ac();l.gc("@fadeAnimation",t.fade)}}function k(t,n){if(1&t&&l.Mb(0,"tr",23),2&t){const t=l.ac();l.gc("@fadeAnimation",t.fade)}}function I(t,n){if(1&t&&l.Mb(0,"tr",24),2&t){const t=l.ac();l.rc("display",0===t.scores.length?"table-row":"none"),l.gc("@fadeAnimation",t.fade)}}function F(t,n){1&t&&(l.Rb(0,"mat-card",0),l.Rb(1,"mat-card-title"),l.vc(2),l.bc(3,"translate"),l.Qb(),l.Qb()),2&t&&(l.Ab(2),l.wc(l.cc(3,1,"COMING_SOON")))}const E=function(){return[2,3,4]},T=function(){return[2,4,6]};let H=(()=>{class t{constructor(t,n,c,e,a){this.changeDetectionRef=t,this.highScores=n,this.game=c,this.profiler=e,this.translate=a,this.column="RANK",this.displayColumns=["column1","column2","column3"],this.title="HIGH_SCORES",this.showClear=!0,this.comingSoon=!1,this.count=this.game.count.value,this.match=this.game.match.value,this.mode=this.game.mode.value}get scores(){return this.highScores.scores}inputChange(t){this.highScores.dataChange.emit("filtered")}makeNewScores(){this.newScores=this.highScores.getScoresBy(this.count,this.match,this.mode),this.newScores=this.highScores.sort(this.newScores)}initialiseDataChange(){this.sub=this.highScores.dataChange.subscribe(t=>{"string"==typeof t&&(this.makeNewScores(),this.dataSource.data=this.newScores||this.scores,this.changeDetectionRef.markForCheck())})}initialiseDataSource(){this.dataSource=new i.o(this.scores),this.inputChange()}clear(t){t.preventDefault(),this.highScores.clear()}ngOnInit(){this.initialiseDataChange(),this.initialiseDataSource()}ngOnDestroy(){this.fade=!0,this.sub&&this.sub instanceof s.a&&this.sub.unsubscribe()}}return t.\u0275fac=function(n){return new(n||t)(l.Lb(l.h),l.Lb(u.a),l.Lb(m.a),l.Lb(h.a),l.Lb(r.e))},t.\u0275cmp=l.Fb({type:t,selectors:[["app-high-scores"]],decls:42,vars:25,consts:[[1,"mat-elevation-z2"],["mat-flat-button","","color","warn","type","button",3,"click",4,"ngIf"],["mat-flat-button","","color","primary","type","button",3,"click",4,"ngIf"],[3,"ngModel","ngModelChange","selectionChange"],[3,"value",4,"ngFor","ngForOf"],["mat-table","",3,"dataSource"],["matColumnDef","column1"],["mat-header-cell","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["mat-footer-cell","",4,"matFooterCellDef"],["matColumnDef","column2"],["matColumnDef","column3"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],["mat-footer-row","",3,"display",4,"matFooterRowDef"],["class","mat-elevation-z2",4,"ngIf"],["mat-flat-button","","color","warn","type","button",3,"click"],["mat-flat-button","","color","primary","type","button",3,"click"],[3,"value"],["mat-header-cell",""],["mat-cell",""],["mat-footer-cell",""],["mat-header-row",""],["mat-row",""],["mat-footer-row",""]],template:function(t,n){1&t&&(l.Rb(0,"mat-card",0),l.Rb(1,"mat-card-title"),l.vc(2),l.bc(3,"translate"),l.uc(4,R,3,3,"button",1),l.uc(5,w,3,3,"button",2),l.Qb(),l.Qb(),l.Rb(6,"mat-card",0),l.Rb(7,"mat-card-title"),l.vc(8),l.bc(9,"translate"),l.Qb(),l.Rb(10,"mat-card-content"),l.Rb(11,"mat-form-field"),l.Rb(12,"mat-label"),l.vc(13),l.bc(14,"translate"),l.Qb(),l.Rb(15,"mat-select",3),l.Yb("ngModelChange",function(t){return n.match=t})("selectionChange",function(t){return n.inputChange(t)}),l.uc(16,A,3,6,"mat-option",4),l.Qb(),l.Qb(),l.Rb(17,"mat-form-field"),l.Rb(18,"mat-label"),l.vc(19),l.bc(20,"translate"),l.Qb(),l.Rb(21,"mat-select",3),l.Yb("ngModelChange",function(t){return n.count=t})("selectionChange",function(t){return n.inputChange(t)}),l.uc(22,S,3,6,"mat-option",4),l.Qb(),l.Qb(),l.Qb(),l.Qb(),l.Rb(23,"mat-card",0),l.Rb(24,"mat-card-content"),l.Rb(25,"table",5),l.Pb(26,6),l.uc(27,v,3,3,"th",7),l.uc(28,O,3,5,"td",8),l.uc(29,M,3,5,"td",9),l.Ob(),l.Pb(30,10),l.uc(31,Q,3,3,"th",7),l.uc(32,y,6,20,"td",8),l.uc(33,D,6,20,"td",9),l.Ob(),l.Pb(34,11),l.uc(35,P,3,3,"th",7),l.uc(36,_,2,1,"td",8),l.uc(37,L,3,5,"td",9),l.Ob(),l.uc(38,x,1,1,"tr",12),l.uc(39,k,1,1,"tr",13),l.uc(40,I,1,3,"tr",14),l.Qb(),l.Qb(),l.Qb(),l.uc(41,F,4,3,"mat-card",15)),2&t&&(l.Ab(2),l.xc(" ",l.cc(3,15,n.title)," "),l.Ab(2),l.gc("ngIf",!n.profiler.environment),l.Ab(1),l.gc("ngIf",n.showClear),l.Ab(3),l.wc(l.cc(9,17,"FILTER_SCORES")),l.Ab(5),l.wc(l.cc(14,19,"CARDS_TO_MATCH")),l.Ab(2),l.gc("ngModel",n.match),l.Ab(1),l.gc("ngForOf",l.hc(23,E)),l.Ab(3),l.wc(l.cc(20,21,"UNIQUE_CARDS_COUNT")),l.Ab(2),l.gc("ngModel",n.count),l.Ab(1),l.gc("ngForOf",l.hc(24,T)),l.Ab(3),l.gc("dataSource",n.dataSource),l.Ab(13),l.gc("matHeaderRowDef",n.displayColumns),l.Ab(1),l.gc("matRowDefColumns",n.displayColumns),l.Ab(1),l.gc("matFooterRowDef",n.displayColumns),l.Ab(1),l.gc("ngIf",n.comingSoon))},directives:[g.a,g.e,e.l,g.b,d.b,d.e,f.a,a.e,a.g,e.k,i.n,i.c,i.i,i.b,i.e,i.k,i.m,i.g,p.b,C.g,i.h,i.a,i.d,i.j,i.l,i.f],pipes:[r.d,e.e],styles:["[_nghost-%COMP%]{display:block;padding:8px}mat-card[_ngcontent-%COMP%]{background-color:hsla(0,0%,100%,.5);margin-bottom:16px}mat-card[_ngcontent-%COMP%]:last-of-type{margin-bottom:0}mat-form-field[_ngcontent-%COMP%]:first-of-type{margin-right:16px}button[_ngcontent-%COMP%]{float:right;margin-top:-8px}table[_ngcontent-%COMP%]{background-color:hsla(0,0%,100%,0);width:100%}table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%], table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{padding-left:24px;padding-right:24px;min-width:110px}table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:first-of-type, table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:first-of-type{min-width:50px;padding-right:0}table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:last-of-type, table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:last-of-type{min-width:35px;padding-left:0}"],data:{animation:[b.a]},changeDetection:0}),t})();const N=[{component:H,path:""}];let Y=(()=>{class t{}return t.\u0275mod=l.Jb({type:t}),t.\u0275inj=l.Ib({factory:function(n){return new(n||t)},imports:[[o.d.forChild(N)],o.d]}),t})();var J=c("GgtF"),j=c("sYis"),G=c("r8aD"),U=c("wBeG");let V=(()=>{class t extends J.a{constructor(t,n){super(),this.langChange(t,n,"HighScoresModule")}}return t.\u0275mod=l.Jb({type:t,bootstrap:[H]}),t.\u0275inj=l.Ib({factory:function(n){return new(n||t)(l.Vb(U.a),l.Vb(r.e))},providers:[{provide:G.a,useValue:"high-scores"}],imports:[[e.c,a.b,Y,j.a,o.d,r.c.forChild(G.b)]]}),t})()}}]);
//# sourceMappingURL=high-scores-high-scores-module.b0ff25ef80f9fbb3779b.js.map