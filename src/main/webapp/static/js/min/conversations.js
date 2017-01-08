var Conversations=function(){var f="",g=[],c={},k=0,l="",r=0,n=!1,y=[],K=void 0,z=void 0,B=function(){var a=!1,b=!1;return{checkIsBanned:function(d,e){var c=b,h=A(d);1==e&&(b=a=!1);!a&&h&&(b=a=!0,warningAlert("Banned","You have been banned from contributing publically to this class because you published some inappropriate content that is deemed to be contrary to the expectations of the university.\r\nThe content has been deleted on every screen, but the instructor has a record of your action.\r\nYou must contact your instructor in order to be reinstated as a contributing member of the classroom community."));
1==c&&0==h&&(a=b=!1,successAlert("Unbanned","The instructor has unbanned you.  You are once again permitted to contribute publicly in this class."));$("#publicMode").prop("disabled",b).toggleClass("btn-raised disabled",b)},reset:function(){b=a=!1}}}();$(function(){z=$("#searchResults");K=z.find(".searchResultItem").clone();z.empty()});var L=function(){var a={},b={},d=function(b){b in a||(a[b]={bucket:0,line:_.map(_.range(l),function(){return 0})})},e=function(b){b=b.name;d(b);a[b].bucket+=1},q=function(a){a.line.pop();
a.line.unshift(a.bucket);a.bucket=0},h,f=function(a){return a.id in b&&b[a.id].group.members.length==a.members.length},g,k=function(d){var e=Conversations.getGroupsFor(d);g=g||$("#thumbScrollContainer");var h=g.find(sprintf("#slideContainer_%s",d.id));h&&h.find(".slideThumbnailNumber").text(sprintf("%s/%s",d.index+1,c.slides.length));_.every(e,f)||n(d,h);_.each(e,function(d){var e=b[d.id];e&&e.update([a[d.id].line])})},l=1800;setInterval(function(){_.each(a,q)},500);setInterval(function(){d("anyPrivate");
d("anyPublic");b.anyPrivate=b.anyPrivate||{};b.anyPublic=b.anyPublic||{};h&&h.length||(h=$("#conversationActivity"));WorkQueue.enqueue(function(){_.each(c.slides,k);0==h.find("svg").length&&(b.anyPublic.update=SparkLine.svg(h,[a.anyPublic.line,a.anyPrivate.line],50,26,1E3,1E3,500,1E3));b&&"anyPublic"in b&&"update"in b.anyPublic&&b.anyPublic.update([a.anyPublic.line,a.anyPrivate.line])})},1E3);Progress.stanzaReceived.thumbnailSparkline=function(a){if("theme"==a.type){switch(a.author){case "private":e({name:"anyPrivate"});
break;case "public":e({name:"anyPublic"})}e({name:a.author})}_.each(a.audiences,e)};var m=function(a,b,d){a.groupSets.length||(a=sprintf("/thumbnailDataUri/%s",a.id),$.ajax({url:a,beforeSend:function(a){a.overrideMimeType("text/plain; charset=x-user-defined")},dataType:"text"}).done(function(a){Date.now();WorkQueue.enqueue(function(){d.attr("src",a)})}))},n=function(e,c){var h=c.find(".groupSlideContainer");0==h.length&&(h=$("<div />").addClass("groupSlideContainer").appendTo(c),c.addClass("groupSlide").find("img").attr("src",
p));_.each(Conversations.getCurrentGroups(),function(e){d(e.id);var c=sprintf("group_%s",e.id),q=h.find("#"+c);0==q.length&&(q=$("<div />",{id:c,"class":"thumbGroup"}).append($("<span />",{text:e.members.length,"class":"count"})).appendTo(h),e.id in b||(b[e.id]={}),b[e.id].update=SparkLine.svg(q,[a[e.id].line],80,15,1E3,1E3,500,1E3));b[e.id].group=e;q.find(".count").text(e.members.length)})},p=function(a,b){var d=$("<canvas />");d.width=a;d.height=b;d.attr("width",a);d.attr("height",b);var e=d[0].getContext("2d");
e.rect(0,0,a,b);e.fillStyle="white";e.fill();return d[0].toDataURL()}(320,240);return{paint:function(a,b){if(a){b=b||$("#thumbScrollContainer");var d=b.find(sprintf("#slideContainer_%s",a.id));if(!a.groupSets.length){var e=d.find("img");m(a,d,e)}}},clearCache:function(){a={};b={}}}}(),T=function(a){return!("slides"in c)||"slides"in a&&_.some(a,function(a,d){var e=c.slides[d];return e&&"id"in e&&"id"in a&&"index"in a&&"index"in e&&e.id==a.id&&e.index==a.index?!1:!0})},M=function(a,b,d){var e=b.height(),
c=b.find(sprintf("#slideContainer_%s",a.id));c.find("img");var h=c.position().top,c=h+c.height(),f=0<=c&&h<=e;0==0+e+h+c?(_.delay(function(){M(a,b,d)},1E3),f=!1):f&&d()},E=function(){var a=$("#slideContainer"),b=$("#thumbScrollContainer"),d=_.filter(c.slides,"exposed");_.each(_.filter(d,function(a){return 0==$(sprintf("#slideContainer_%s",a.id)).length}),function(b){a.append(U(b)[0])});_.each(_.filter(d,function(a){var b=_.map(d,C);$(".slideButtonContainer").filter(function(a,d){var e=$(d).attr("id");
return!_.includes(b,e)}).remove()}));var e=_.fromPairs(_.map(c.slides,function(a){return[C(a),a.index]}));$(".slideButtonContainer").sort(function(a,b){var d=$(a).attr("id"),c=$(b).attr("id");return e[d]-e[c]}).detach().appendTo(a);_.each(d,function(a){M(a,b,function(){N(a.id)})});var f=$("#slideControls");f.empty();t("prevSlideButton","Prev Page","fa-angle-left",O,f);t("nextSlideButton","Next Page","fa-angle-right",O,f);t("addSlideButton","Add Page","fa-plus",m,f);t("addGroupSlideButton","Add Group Slide",
"fa-group",m,f);D(k);$(".thumbnail:not(.groupSlide)").map(function(){var a=$(this);0>=a.width()&&(a.width(DeviceConfiguration.preferredSizes.thumbColumn.width),a.css({width:sprintf("%spx",a.width())}));a.height(.75*a.width())});Progress.call("onLayoutUpdated")},P=function(a){var b=c.permissions;changePermissionsOfConversation(c.jid.toString(),{studentCanOpenFriends:b.studentCanOpenFriends,studentCanPublish:a,usersAreCompulsorilySynced:b.usersAreCompulsorilySynced,studentsMayBroadcast:b.studentsMayBroadcast,
studentsMayChatPublicly:b.studentsMayChatPublicly})},F=function(a){var b=c.permissions;changePermissionsOfConversation(c.jid.toString(),{studentCanOpenFriends:b.studentCanOpenFriends,studentCanPublish:b.studentCanPublish,usersAreCompulsorilySynced:a,studentsMayBroadcast:b.studentsMayBroadcast,studentsMayChatPublicly:b.studentsMayChatPublicly})},Q=function(){return c.permissions.usersAreCompulsorilySynced},u=function(){n=!0;G()},v=function(){"permissions"in c&&!m(c)&&c.permissions.usersAreCompulsorilySynced||
(n=!1,G())},G=function(){n?($("#enableSync").addClass("activePrivacy active"),$("#disableSync").removeClass("activePrivacy active")):($("#enableSync").removeClass("activePrivacy active"),$("#disableSync").addClass("activePrivacy active"));$("#followTeacherCheckbox").prop("checked",n)},H=function(a){_.find(a.slides,function(a){return a.id==k})&&(y=[],_.each(Conversations.getCurrentGroups(),function(a){_.includes(a.members,UserSettings.getUsername())&&y.push(a)}))},N=function(a){a=_.find(c.slides,["id",
parseInt(a)]);L.paint(a)},R=function(){if("slides"in c&&0<k){var a=_.find(c.slides,function(a){return a.id==k}),b=_.find(c.slides,function(b){return b.index==a.index+1});void 0!=b&&"id"in b&&p(b.id.toString())}},S=function(){if("slides"in c&&0<k){var a=_.find(c.slides,function(a){return a.id==k}),b=_.find(c.slides,function(b){return b.index==a.index-1});void 0!=b&&"id"in b&&p(b.id.toString())}},w=function(){var a=window.location.origin,b=sprintf("/join?conversation=%s&slide=%s",l,k),d=sprintf("/projector/%s",
l);$("#shareLink").html($("<a/>",{href:b,text:a+b}));$("#projectorLink").html($("<a/>",{href:d,text:a+d})).on("click",bounceAnd(function(){var a=document.documentElement;(a.requestFullScreen||a.webkitRequestFullScreen||a.mozRequestFullScreen).call(a);DeviceConfiguration.setCurrentDevice("projector");return!1}));""==l||0==k?($("#projectorViewLink").empty(),$("#slideDeepLink").empty(),$("#conversationDeepLink").empty(),$("#conversationAnalysis").empty(),$("#oneNoteExport").empty()):($("#projectorViewLink").html($("<a/>",
{href:sprintf("/board?conversationJid=%s&slideId=%s&showTools=false&unique=true",l,k),text:"Project this conversation"})),$("#conversationAnalysis").html($("<a/>",{href:sprintf("/dashboard?source=%s",l),text:"Dashboard for this conversation"})),$("#slideDeepLink").html($("<a/>",{href:sprintf("/board?conversationJid=%s&slideId=%s&unique=true",l,k),text:"DeepLink this page"})),$("#conversationDeepLink").html($("<a/>",{href:sprintf("/board?conversationJid=%s&unique=true",l),text:"Deeplink this conversation"})),
$("#oneNoteExport").html($("<a/>",{href:sprintf("/saveToOneNote/%s",l),text:"Export this conversation"})));Conversations.shouldModifyConversation()?$("#editConversation").unbind("click").click(function(){$.jAlert({title:"edit Conversation",iframe:sprintf("/editConversation?conversationJid=%s&unique=true&links=false",l),width:"100%"})}).show():$("#editConversation").unbind("click").hide()},V=function(a){var b=m(a),d=$("#studentsCanPublishCheckbox");d.off("change");d.prop("checked",a.permissions.studentCanPublish);
d.prop("disabled",!b);if(b)d.on("change",function(){P(d.is(":checked"))});var e=$("#studentsMustFollowTeacherCheckbox");e.off("change");e.prop("checked",a.permissions.usersAreCompulsorilySynced);e.prop("disabled",!b);var c=$("#followTeacherCheckbox");c.off("change");c.prop("checked",n);if(b)e.on("change",function(){F(e.is(":checked"))});else c.on("change",function(){var a=n,b=c.is(":checked");a!=b&&(b?u():v())});c.prop("disabled",a.permissions.usersAreCompulsorilySynced);b?($("#syncButtons").hide(),
$(".syncCheckbox").hide()):($("#syncButtons").show(),$(".syncCheckbox").show())},X=function(a){if(a.jid==c.jid){!m(a)&&a.permissions.usersAreCompulsorilySynced&&u();V(a);updateConversationHeader();w();G();var b=_.find(a.slides,function(a){return a.id==k}),d=_.find(a.slides,function(a){return sprintf("%s",a.id)==r}),e=!1;if(e=b?!b.exposed:!0)(b=d||_.find(_.orderBy(a.slides,"index"),function(a){return a.exposed}))?p(b.id.toString()):window.location=sprintf("/conversationSearch?q=%s",encodeURIComponent(a.title));
T(a)&&E()}W(a)},W=function(a){g=g.map(function(b){return b.jid==a.jid?a:b});x()},m=function(a){a||(a=c);return"jid"in a?"author"in a&&a.author.toLowerCase()==UserSettings.getUsername().toLowerCase()||"UserSettings"in window&&_.some(UserSettings.getUserGroups(),function(a){var d=a.name?a.name:a.value;return"special"==(a.key?a.key:a.ouType)&&"superuser"==d})?!0:!1:!1},A=function(a){a||(a=c);return"blacklist"in a&&_.includes(a.blacklist,UserSettings.getUsername())},I=function(a){a||(a=c);var b="subject"in
a?a.subject.toLowerCase().trim():"nosubject";return"subject"in a&&"deleted"!=b&&("author"in a&&a.author==UserSettings.getUsername()||_.some(UserSettings.getUserGroups(),function(a){var e=a.name?a.name:a.value;return"special"==(a.key?a.key:a.type)&&"superuser"==e||e.toLowerCase().trim()==b}))?!0:!1},x=function(){try{var a=_.sortBy(g.filter(function(a){return I(a)}),function(a){return new Date(a.creation)}).reverse().map(Y),b=$("#searchResults");0<_.size(a)?b.html(unwrap(a)):b.html($("<div/>",{text:"No search results found"}))}catch(d){console.log("refreshConversationSearchResults",
d)}},t=function(a,b,d,e,f){e(c)&&f.append($("<button/>",{id:a,"class":sprintf("toolbar fa %s btn-icon nmt",d),name:a,type:"button"}).append($("<div class='icon-txt' />",{text:b})))},Z=function(){if(m()){var a=c.jid,b=c.slides.filter(function(a){return a.id==k})[0].index+1;addSlideToConversationAtIndex(c.jid.toString(),b);Progress.conversationDetailsReceived.JoinAtIndexIfAvailable=function(d){"jid"in d&&d.jid==a&&"slides"in d&&(d=_.find(d.slides,function(a){return a.index==b&&a.id!=k}),p(d.id.toString()))}}},
O=function(){return!0},J=function(){return _.find(c.slides,function(a){return a.id.toString()==k.toString()})},p=function(a){var b=!1;Conversations.isAuthor()?b=!0:Q()?a==r&&(b=!0):b=!0;if(b){if(a!=k)try{Progress.call("beforeLeavingSlide",[a]);k=a;D(a);delete Progress.conversationDetailsReceived.JoinAtIndexIfAvailable;loadSlide(a);if(void 0!=window&&"history"in window&&"pushState"in window.history){var d=window.location,b=c,e=J(),f=sprintf("%s//%s%s",d.protocol,d.host,d.pathname);void 0!=b&&"jid"in
b&&void 0!=e&&"id"in e&&(f=sprintf("%s?conversationJid=%s&slideId=%s&unique=true&showTools=%s",f,b.jid.toString(),e.id.toString(),UserSettings.getIsInteractive().toString()));window.history.replaceState({path:f,url:f},f,f)}void 0!=e&&"id"in e&&void 0!=document&&"title"in document&&(document.title=sprintf("MeTL - %s",e.id.toString()));H(c);Progress.call("afterJoiningSlide",[a])}catch(h){console.log(h)}}else alert("You must remain on the current page")},D=function(a){$(".slideButtonContainer").removeClass("activeSlide");
a=$(sprintf("#slideContainer_%s",a));a.addClass("activeSlide");a=a.find(".slideThumbnailNumber").text();$("#currentSlide").text(a)},C=function(a){return sprintf("slideContainer_%s",a.id)},U=function(a){var b=a.index+1,d=$("<div/>",{id:C(a),"class":"slideButtonContainer"});$("<img/>",{id:sprintf("slideButton_%s",a.id),"class":"thumbnail",alt:sprintf("Page %s",b),title:sprintf("Page %s (%s)",b,a.id)}).on("click",function(b){v();p(a.id.toString())}).appendTo(d);$("<span/>",{text:sprintf("%s/%s",a.index+
1,c.slides.length),"class":"slideThumbnailNumber"}).appendTo($("<div/>").addClass("slide-count").appendTo(d));return d},Y=function(a){var b=function(b){return sprintf("%s_%s",b,a.jid)},d=a.jid.toString(),c=K.clone();c.attr("id",b("conversation")).on("click",bounceAnd(function(c){var e=c.target.parentElement.parentElement.id;c.target.parentElement.id!=b("extraConversationTools")&&e!=b("extraConversationTools")&&(l=d,c=a.slides.filter(function(a){return 0==a.index})[0],B.reset(),hideBackstage(),Progress.call("onConversationJoin",
[a]),p(c.id.toString()))}));c.find(".searchResultTopRow");c.find(".searchResultMiddleRow");c.find(".teacherConversationTools").attr("id",b("extraConversationTools"));c.find(".conversationTitle").attr("id",b("conversationTitle")).text(a.title);c.find(".conversationAuthor").text(a.author);c.find(".conversationSubject").text(a.subject);c.find(".conversationCreated").text(a.created);m(a)?(c.find(".conversationEditButton").attr("id",b("conversationEditLink")).attr("href",sprintf("/editConversation?conversationJid=%s",
a.jid)),c.find(".conversationRename").attr("id",b("conversationRenameSubmit")).attr("name",b("conversationRenameSubmit")).on("click",function(){requestRenameConversationDialogue(d)}),c.find(".conversationShare").attr("id",b("conversationChangeSubjectSubmit")).attr("name",b("conversationChangeSubjectSubmit")).on("click",function(){requestChangeSubjectOfConversationDialogue(d)}),c.find(".conversationDelete").attr("id",b("conversationDelete")).attr("name",b("conversationDelete")).on("click",function(){requestDeleteConversationDialogue(d)})):
c.find(".teacherConversationTools").remove();"jid"in a&&l.trim().toLowerCase()==a.jid.toString().trim().toLowerCase()&&c.addClass("activeConversation");return c};Progress.newConversationDetailsReceived.Conversations=function(a){if(-1<a.title.indexOf(f)||-1<a.author.indexOf(f))g=_.filter(g,function(b){return b.jid!=a.jid}),g.push(a),x()};Progress.conversationsReceived.Conversations=function(a){g=a;x()};Progress.syncMoveReceived.Conversations=function(a){console.log("actOn",a);(Conversations.getIsSyncedToTeacher()||
m(c)||!UserSettings.getIsInteractive())&&"slides"in c&&0<c.slides.filter(function(b){return b.id.toString()==a.toString()}).length&&WorkQueue.enqueue(function(){"slides"in c&&0<c.slides.filter(function(b){return b.id.toString()==a.toString()}).length&&(r=a,p(a));return!1})};Progress.conversationDetailsReceived.Conversations=function(a){try{console.log("received conversation:",a);var b="";"jid"in c&&(b=c.jid.toString().toLowerCase());"jid"in a&&l&&a.jid.toString().toLowerCase()==l.toLowerCase()&&(I(a)?
(c=a,c.jid.toString().toLowerCase()!=b&&(Progress.call("onConversationJoin"),B.checkIsBanned(a,!0),L.clearCache()),H(a)):(c={},l=""));X(a);B.checkIsBanned(a);!_.some(g,function(b){return b.jid==a.jid})&&m(a)&&(g.push(a),x())}catch(d){console.log("exception in actOnConversationDetails",d),updateStatus(sprintf("FAILED: ReceiveConversationDetails exception: %s",d))}Progress.call("onLayoutUpdated")};Progress.currentSlideJidReceived.Conversations=function(a){console.log("currentSlideJid received:",a);
k=a;D(a);w();H(c)};Progress.currentConversationJidReceived.Conversations=function(a){console.log("currentConversationJid received:",a);l=a;w()};$(function(){$("#slideControls").on("click","#prevSlideButton",S).on("click","#nextSlideButton",R).on("click","#addGroupSlideButton",function(){GroupBuilder.showAddGroupSlideDialog()}).on("click","#addSlideButton",Z);$("#thumbScrollContainer").on("scroll",_.throttle(E,500));$("#conversations").click(function(){showBackstage("conversations")});$("#importConversationButton").on("click",
bounceAnd(function(){importConversation()}));$("#createConversationButton").on("click",bounceAnd(function(){createConversation(sprintf("%s created on %s",UserSettings.getUsername(),Date()))}));$("#myConversationsButton").on("click",bounceAnd(function(){getSearchResult(UserSettings.getUsername())}));$("#searchButton").on("click",bounceAnd(function(){getSearchResult(f)}));var a=function(a){f=this.value;13==a.which&&(a.stopPropagation(),getSearchResult(f))},b=$("#searchForConversationBox");_.forEach(["blur",
"change","focus","keydown","select"],function(c){b.on(c,a)});$("<div />",{text:"share",id:"shareButton","class":"icon-txt"}).on("click",bounceAnd(function(){$("#shareContainer").toggle();w()})).appendTo($("#shareButton"));$("#closeSharingButton").on("click",bounceAnd(function(){$("#shareContainer").toggle()}))});return{inConversation:function(){return 0<Conversations.getCurrentConversationJid().length},isAuthor:function(){return Conversations.inConversation()?UserSettings.getUsername()==Conversations.getCurrentConversation().author:
!1},getCurrentGroup:function(){return _.clone(y)},getGroupsFor:function(a){return a?_.map(_.sortBy(_.flatMap(a.groupSets,function(a){return a.groups}),"timestamp"),function(a,c){a.title=c+1;return a}):[]},getCurrentGroups:function(){return Conversations.getGroupsFor(J())},addGroupSlide:function(a,b,d){if(m()){d=d||[];var e=c.jid,f=c.slides.filter(function(a){return a.id==k})[0].index+1;addGroupSlideToConversationAtIndex(c.jid.toString(),f,a,d,b);Progress.conversationDetailsReceived.JoinAtIndexIfAvailable=
function(a){if("jid"in a&&a.jid==e&&"slides"in a){a=_.find(a.slides,function(a){return a.index==f&&a.id!=k});var b=sprintf("groupWork_%s",a.id),c=UserSettings.getUsername(),b={type:"grade",name:sprintf("GroupSlide %s",a.id),description:"Auto generated grade for group work on group slide.",audiences:[],author:c,location:b,id:sprintf("%s_%s_%s",b,c,(new Date).getTime().toString()),gradeType:"text",visible:!1,timestamp:0};sendStanza(b);F(!0);p(a.id.toString())}}}},getCurrentTeacherSlide:function(){return r},
getCurrentSlideJid:function(){return k},getCurrentSlide:J,getCurrentConversationJid:function(){return"jid"in c?c.jid.toString():l},getCurrentConversation:function(){return c},getIsSyncedToTeacher:function(){return n},getIsSyncedToTeacherDescriptor:function(){return n?"sync on":"sync off"},getConversationModeDescriptor:function(){return c&&c.permissions&&c.permissions.studentCanPublish?"collaboration enabled":"collaboration disabled"},enableSyncMove:u,disableSyncMove:v,toggleSyncMove:function(){n?
v():u()},setStudentsCanPublish:P,getStudentsCanPublish:function(){return c.permissions.studentCanPublish},setStudentsMustFollowTeacher:F,getStudentsMustFollowTeacher:Q,shouldDisplayConversation:I,shouldPublishInConversation:function(a){a||(a=c);return"permissions"in a&&"studentCanPublish"in a.permissions&&(m(a)||a.permissions.studentCanPublish)&&!A(a)?!0:!1},shouldModifyConversation:m,overrideAllocation:function(a){m()&&overrideAllocation(Conversations.getCurrentConversationJid(),a)},goToNextSlide:R,
goToPrevSlide:S,goToSlide:p,updateThumbnail:N,getIsBanned:A,refreshSlideDisplay:E}}();function updateThumb(f){Conversations.updateThumbnail(f)}function unwrap(f){return _.map(f,"0")}function receiveCurrentSlide(f){Progress.call("currentSlideJidReceived",[f])}function receiveCurrentConversation(f){Progress.call("currentConversationJidReceived",[f])}function receiveConversationDetails(f){Progress.call("conversationDetailsReceived",[f])}
function receiveSyncMove(f){(Conversations.getIsSyncedToTeacher()||Conversations.shouldModifyConversation())&&Progress.call("syncMoveReceived",[f])}function receiveNewConversationDetails(f){Progress.call("newConversationDetailsReceived",[f])}function receiveConversations(f){Progress.call("conversationsReceived",[f])}function receiveAttendance(f){Progress.call("attendanceReceived",[f])}function receiveGroupsProviders(f){Progress.call("groupProvidersReceived",[f])}
function receiveOrgUnitsFromGroupsProviders(f){Progress.call("orgUnitsReceived",[f]);"orgUnits"in f&&f.orgUnits.length&&_.forEach(f.orgUnits,function(g){g=_.cloneDeep(g);delete g.groupSets;delete g.members;getGroupSetsForOrgUnit(f.groupsProvider,g)})}
function receiveGroupSetsForOrgUnit(f){Progress.call("groupSetsReceived",[f]);"groupSets"in f&&f.groupSets.length&&_.forEach(f.groupSets,function(g){var c=_.cloneDeep(f.orgUnit);delete c.members;delete c.groupSets;g=_.cloneDeep(g);delete g.members;delete g.groups;getGroupsForGroupSet(f.groupsProvider,c,g)})}function receiveGroupsForGroupSet(f){Progress.call("groupsReceived",[f])};
