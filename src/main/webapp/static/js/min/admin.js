var Admin=function(){var e={};return{loadConversations:function(a){$.ajax("/search",{data:{query:"",format:"json"},success:function(b){_.each(b.conversations.conversation,function(b){e[b.jid]=b});Admin.renderConversations(_.values(e));a&&a()}})},renderConversations:function(a){var b=$("#conversations"),g=b.find(".conversationTemplate"),e=b.find(".expandedTemplate"),q=b.find(".detailTemplate");_.each(a,function(a){var h=a.slides.slide;_.isArray(h)||(h=[h]);var d=g.clone().removeClass("template").appendTo(b);
d.find(".author").text(a.author);d.find(".slideCount").text(h.length);d.find(".title").text(a.title);d.find(".activityCount").text(1E5);d.find(".jid").text(a.jid);d.find(".progress").attr({value:0,max:1});var f=moment(a.created,["M/d/YYYY H:m:s a","d/M/YYYY H:m:s a","ddd MMM D H:m:s YYYY"]);a.created=f;d.find(".creation").text(f.format("DD-MMM-YYYY, h:mm a"));d.find(".expand").click(function(){var a=e.clone().removeClass("template").appendTo(d.find(".expandedContainer").empty()),b=0,g=d.find(".progress").attr("max",
h.length),k=function(){g.attr("value",b)},f=0,l=a.find(".activityCount"),c={},m=a.find(".uniqueAuthors"),n={},r=a.find(".uniqueObservers");_.each(h,function(a){$.ajax("/describeHistory",{data:{source:a.id,format:"json"},complete:function(){b+=1;k()},success:function(a){f+=parseInt(a.historyDescription.canvasContentCount);_.each(a.historyDescription.uniquePublishers.publisher,function(a){c[a.name]+=a.activityCount});_.each(a.historyDescription.uniqueOccupants.occupant,function(a){c[a.name]+=1});l.text(f);
m.text(_.keys(c).length);r.text(_.keys(n).length);Admin.relayout()}})});a.find(".inspect").click(function(){var a=q.clone().removeClass("template").appendTo(d.find(".detailContainer").empty());b=0;k();var g=Date.now(),f=0,c=[],e=function(b){b="graph_"+(b||_.random(1E8));$("<div />",{"class":"timeOnSlide",id:b}).appendTo(a);return"#"+b},l=e(),p=[],m=e(),n=function(a){var b=d3.layout.histogram()(p).map(function(a){return{date:new Date(a.x),value:a.y}});MG.data_graphic({title:"Activity over time",data:b,
width:400,height:200,target:a})};_.each(h,function(d){$.ajax("/fullClientHistory",{data:{source:d.id},complete:function(){b+=1;k()},success:function(b){var e=[];$(b).find("message").each(function(a,b){var c=$(b).attr("timestamp"),c=parseInt(c);g=Math.min(c,g);f=Math.max(c,f);e.push({value:parseInt(d.index),date:new Date(c)});p.push(c)});c.push(e);MG.data_graphic({title:"Activity by slide",data:c,width:400,height:200,target:l});n(m);a.find(".min").text(moment(g).format("DD-MMM-YYYY, h:mm a"));a.find(".max").text(moment(f).format("DD-MMM-YYYY, h:mm a"));
a.find(".span").text(moment.duration(f-g).humanize());Admin.relayout()}})})});Admin.relayout()})});b.isotope({itemSelector:".tile",layoutMode:"packery"})},initializeControls:function(){var a=$("#conversationFilters").find(".author"),b=$("#conversations");a.find("input").on("input",function(){var a=$(this).val();b.isotope({itemSelector:".tile",layoutMode:"packery",filter:function(){return $(this).find(".author").text()==a}})})},relayout:function(){$("#conversations").isotope("layout")}}}();
$(function(){Admin.loadConversations();Admin.initializeControls()});