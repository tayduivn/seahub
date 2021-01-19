(this["webpackJsonpseahub-frontend"]=this["webpackJsonpseahub-frontend"]||[]).push([[7],{1127:function(t,e,a){t.exports=a(1297)},1128:function(t,e,a){},1297:function(t,e,a){"use strict";a.r(e);var n=a(54),i=a(5),o=a(6),r=a(8),s=a(7),l=a(0),c=a.n(l),d=a(23),h=a.n(d),m=a(3),u=a(4),f=a(9),p=a(1),g=a(79),b=a(15),v=a(70),E=a(42),O=a(12),R=a.n(O),y=a(73);R.a.locale(window.app.config.lang);var w=function(t){Object(r.a)(a,t);var e=Object(s.a)(a);function a(t){var n;return Object(i.a)(this,a),(n=e.call(this,t)).onMouseEnter=function(){n.setState({active:!0})},n.onMouseLeave=function(){n.setState({active:!1})},n.onItemRestore=function(t){t.preventDefault(),n.props.onItemRestore(n.props.item)},n.state={active:!1},n}return Object(o.a)(a,[{key:"render",value:function(){var t=this.props.item,e=y.a.getUrl({type:"download_historic_file",filePath:p.jb,objID:t.rev_file_id}),a="".concat(p.jc,"profile/").concat(encodeURIComponent(t.creator_email),"/"),n="".concat(p.jc,"repo/").concat(p.qb,"/history/files/?obj_id=").concat(t.rev_file_id,"&commit_id=").concat(t.commit_id,"&p=").concat(p.jb),i="".concat(p.jc,"repo/text_diff/").concat(p.qb,"/?commit=").concat(t.commit_id,"&p=").concat(p.jb);return c.a.createElement(l.Fragment,null,c.a.createElement("tr",{onMouseEnter:this.onMouseEnter,onMouseLeave:this.onMouseLeave,className:this.state.active?"tr-highlight":""},c.a.createElement("td",null,c.a.createElement("time",{datetime:t.time,is:"relative-time",title:R()(t.ctime).format("llll")},R()(t.ctime).fromNow()),0===this.props.index&&Object(p.nb)("(current version)")),c.a.createElement("td",null,c.a.createElement("img",{className:"avatar",src:t.creator_avatar_url,alt:""})," ",c.a.createElement("a",{href:a,target:"_blank",className:"username"},t.creator_name)),c.a.createElement("td",null,u.a.bytesToSize(t.size)),c.a.createElement("td",null,this.state.active&&c.a.createElement(j,{index:this.props.index,downloadUrl:e,viewUrl:n,diffUrl:i,onItemRestore:this.onItemRestore,canDownload:this.props.canDownload,canCompare:this.props.canCompare}))))}}]),a}(c.a.Component),j=function(t){Object(r.a)(a,t);var e=Object(s.a)(a);function a(t){var n;return Object(i.a)(this,a),(n=e.call(this,t)).dropdownToggle=function(){n.setState({dropdownOpen:!n.state.dropdownOpen})},n.state={dropdownOpen:!1},n}return Object(o.a)(a,[{key:"render",value:function(){var t=this.props,e=t.index,a=t.downloadUrl,n=t.viewUrl,i=(t.diffUrl,t.onItemRestore),o=(t.canCompare,t.canDownload);return c.a.createElement(m.l,{isOpen:this.state.dropdownOpen,toggle:this.dropdownToggle,direction:"down",className:"mx-1 old-history-more-operation"},c.a.createElement(m.o,{tag:"i",className:"fa fa-ellipsis-v",title:Object(p.nb)("More Operations"),"data-toggle":"dropdown","aria-expanded":this.state.dropdownOpen}),c.a.createElement(m.n,{className:"drop-list",right:!0},0!==e&&c.a.createElement("a",{href:"#",onClick:i},c.a.createElement(m.m,null,Object(p.nb)("Restore"))),o&&c.a.createElement("a",{href:a},c.a.createElement(m.m,null,Object(p.nb)("Download"))),c.a.createElement("a",{href:n},c.a.createElement(m.m,null,Object(p.nb)("View")))))}}]),a}(c.a.PureComponent),_=w,L=(a(136),a(93),a(106),a(1128),function(t){Object(r.a)(a,t);var e=Object(s.a)(a);function a(t){var n;return Object(i.a)(this,a),(n=e.call(this,t)).listNewHistoryRecords=function(t,e){g.a.listFileHistoryRecords(t,1,e).then((function(t){if(!t.data)throw n.setState({isLoading:!1}),Error("There is an error in server.");n.initNewRecords(t.data)}))},n.listOldHistoryRecords=function(t,e){f.a.listOldFileHistoryRecords(t,e).then((function(t){if(!t.data)throw n.setState({isLoading:!1}),Error("There is an error in server.");n.initOldRecords(t.data)}))},n.onScrollHandler=function(t){var e=t.target.clientHeight,a=t.target.scrollHeight,i=e+t.target.scrollTop+1>=a,o=n.state.hasMore;i&&o&&n.reloadMore()},n.reloadMore=function(){if(!n.state.isReloadingData)if(p.tc){var t=n.state.currentPage+1;n.setState({currentPage:t,isReloadingData:!0}),g.a.listFileHistoryRecords(p.jb,t,p.a).then((function(t){n.updateNewRecords(t.data)}))}else{var e=n.state.nextCommit,a=n.state.filePath,i=n.state.oldFilePath;n.setState({isReloadingData:!0}),i?f.a.listOldFileHistoryRecords(p.qb,i,e).then((function(t){n.updateOldRecords(t.data,i)})):f.a.listOldFileHistoryRecords(p.qb,a,e).then((function(t){n.updateOldRecords(t.data,a)}))}},n.onItemRestore=function(t){var e=t.commit_id,a=t.path;g.a.revertFile(a,e).then((function(t){t.data.success&&(n.setState({isLoading:!0}),n.refershFileList())}))},n.onSearchedClick=function(t){u.a.handleSearchedItemClick(t)},n.state={historyList:[],currentPage:1,hasMore:!1,nextCommit:void 0,filePath:"",oldFilePath:"",isLoading:!0,isReloadingData:!1},n}return Object(o.a)(a,[{key:"componentDidMount",value:function(){p.tc?this.listNewHistoryRecords(p.jb,p.a):this.listOldHistoryRecords(p.qb,p.jb)}},{key:"initNewRecords",value:function(t){var e=this;if(t.total_count<5)if(t.data.length){var a=t.data[t.data.length-1].commit_id,n=t.data[t.data.length-1].path,i=t.data[t.data.length-1].old_path;n=i||n,f.a.listOldFileHistoryRecords(p.qb,n,a).then((function(a){if(!a.data)throw e.setState({isLoading:!1}),Error("There is an error in server.");e.setState({historyList:t.data.concat(a.data.data.slice(1,a.data.data.length)),isLoading:!1})}))}else f.a.listOldFileHistoryRecords(p.qb,p.jb).then((function(t){if(!t.data)throw e.setState({isLoading:!1}),Error("There is an error in server.");e.setState({historyList:t.data.data,isLoading:!1})}));else this.setState({historyList:t.data,currentPage:t.page,hasMore:t.total_count>p.a*this.state.currentPage,isLoading:!1})}},{key:"initOldRecords",value:function(t){var e=this;t.data.length?this.setState({historyList:t.data,nextCommit:t.next_start_commit,filePath:t.data[t.data.length-1].path,oldFilePath:t.data[t.data.length-1].rev_renamed_old_path,isLoading:!1}):(this.setState({nextCommit:t.next_start_commit}),this.state.nextCommit?f.a.listOldFileHistoryRecords(p.qb,p.jb,this.state.nextCommit).then((function(t){e.initOldRecords(t.data)})):this.setState({isLoading:!1}))}},{key:"updateNewRecords",value:function(t){this.setState({historyList:[].concat(Object(n.a)(this.state.historyList),Object(n.a)(t.data)),currentPage:t.page,hasMore:t.total_count>p.a*this.state.currentPage,isReloadingData:!1})}},{key:"updateOldRecords",value:function(t,e){var a=this;t.data.length?this.setState({historyList:[].concat(Object(n.a)(this.state.historyList),Object(n.a)(t.data)),nextCommit:t.next_start_commit,filePath:t.data[t.data.length-1].path,oldFilePath:t.data[t.data.length-1].rev_renamed_old_path,isReloadingData:!1}):(this.setState({nextCommit:t.next_start_commit}),this.state.nextCommit&&f.a.listOldFileHistoryRecords(p.qb,e,this.state.nextCommit).then((function(t){a.updateOldRecords(t.data,e)})))}},{key:"refershFileList",value:function(){var t=this;p.tc?g.a.listFileHistoryRecords(p.jb,1,p.a).then((function(e){t.initNewRecords(e.data)})):f.a.listOldFileHistoryRecords(p.qb,p.jb).then((function(e){t.initOldRecords(e.data)}))}},{key:"render",value:function(){var t=this;return c.a.createElement(l.Fragment,null,c.a.createElement("div",{id:"header",className:"old-history-header"},c.a.createElement("div",{className:"logo"},c.a.createElement(v.a,{showCloseSidePanelIcon:!1})),c.a.createElement("div",{className:"toolbar"},c.a.createElement(E.a,{onSearchedClick:this.onSearchedClick}))),c.a.createElement("div",{id:"main",onScroll:this.onScrollHandler},c.a.createElement("div",{className:"old-history-main"},c.a.createElement(l.Fragment,null,c.a.createElement("a",{href:"javascript:window.history.back()",className:"go-back",title:"Back"},c.a.createElement("span",{className:"fas fa-chevron-left"})),c.a.createElement("h2",null,c.a.createElement("span",{className:"file-name"},p.ib)," ",Object(p.nb)("History Versions"))),c.a.createElement(l.Fragment,null,c.a.createElement("table",{className:"commit-list"},c.a.createElement("thead",null,c.a.createElement("tr",null,c.a.createElement("th",{width:"40%"},Object(p.nb)("Time")),c.a.createElement("th",{width:"30%"},Object(p.nb)("Modifier")),c.a.createElement("th",{width:"25%"},Object(p.nb)("Size")),c.a.createElement("th",{width:"5%"}))),!this.state.isLoading&&c.a.createElement("tbody",null,this.state.historyList.map((function(e,a){return c.a.createElement(_,{key:a,item:e,index:a,canDownload:p.n,canCompare:p.l,onItemRestore:t.onItemRestore})})))),(this.state.isReloadingData||this.state.isLoading)&&c.a.createElement(b.a,null),this.state.nextCommit&&!this.state.isLoading&&!this.state.isReloadingData&&c.a.createElement(m.c,{className:"get-more-btn",onClick:this.reloadMore},Object(p.nb)("More"))))))}}]),a}(c.a.Component));h.a.render(c.a.createElement(L,null),document.getElementById("wrapper"))}},[[1127,1,0]]]);
//# sourceMappingURL=fileHistoryOld.chunk.js.map