(this.webpackJsonpkulttuurisomefrontend=this.webpackJsonpkulttuurisomefrontend||[]).push([[0],{38:function(e,n,t){},58:function(e,n,t){},59:function(e,n,t){},71:function(e,n,t){},72:function(e,n,t){},74:function(e,n,t){},75:function(e,n,t){},76:function(e,n,t){},77:function(e,n,t){},78:function(e,n,t){"use strict";t.r(n);var c,a,s,i,r,o,j,l,d,b,u,O,m=t(43),h=t(2),v=t(48),x=t.n(v),p=t(92),f=t(91),g=t(93),N=t(89),k=t(52),S=(t(58),t(8)),y=t(7),C=t(9),w=(t(59),t(0)),E=function(){return Object(w.jsxs)("div",{children:[Object(w.jsx)("h3",{children:"Notifications"}),Object(w.jsx)("button",{onClick:function(){return console.log("FOOBAAR")},children:"foobar"})]})},q=t(13),$=t.n(q),I=t(20),U=t(85),L=function(){var e=Object(U.a)(),n=function(){var n=Object(I.a)($.a.mark((function n(){var t;return $.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.resetStore();case 2:t=n.sent,console.log("LOGOUT RESULT",t),localStorage.clear(),window.location.assign("/");case 6:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}();return Object(w.jsxs)("div",{children:[Object(w.jsx)("h3",{children:"Profile drop options"}),Object(w.jsx)("button",{onClick:n,children:"Log out"}),Object(w.jsx)("button",{onClick:function(){return console.log("HELLOO")},children:"Hello"})]})},T=function(){var e=Object(h.useState)(!1),n=Object(S.a)(e,2),t=n[0],c=n[1],a=Object(h.useState)(!1),s=Object(S.a)(a,2),i=s[0],r=s[1],o=Object(h.useState)(!1),j=Object(S.a)(o,2),l=j[0],d=j[1];return Object(w.jsx)(w.Fragment,{children:Object(w.jsx)("nav",{className:"navbar",children:Object(w.jsxs)("div",{className:"nav-container",children:[Object(w.jsxs)(y.b,{to:"/",className:"nav-logo",children:["HalfEatenBiscuit ",Object(w.jsx)("i",{className:"fas fa-cookie-bite"})]}),Object(w.jsxs)("ul",{className:"nav-menu constant-links",children:[Object(w.jsx)("li",{className:"nav-item",children:Object(w.jsx)(y.b,{exact:!0,to:"/",activeClassName:"active",className:"nav-links",children:"Home"})}),Object(w.jsx)("li",{className:"nav-item",children:Object(w.jsx)(y.b,{exact:!0,to:"/jobmarket/queries",activeClassName:"active",className:"nav-links",children:"Jobmarket"})}),Object(w.jsx)("li",{className:"nav-item",children:Object(w.jsx)(y.b,{exact:!0,to:"/profiles",activeClassName:"active",className:"nav-links",children:"Profiles"})})]}),Object(w.jsxs)("ul",{className:t?"nav-menu hidden-links active":"nav-menu hidden-links",children:[Object(w.jsx)("li",{className:"nav-item",children:Object(w.jsx)(y.b,{exact:!0,to:"/messages",activeClassName:"active",className:"nav-links",children:"Messages"})}),Object(w.jsxs)("div",{onClick:function(){d(!1),r(!i)},tabIndex:0,className:"dropdown-container",children:[Object(w.jsx)("p",{className:"nav-links",children:"Notifications \u2206"}),Object(w.jsx)("div",{className:i?"dropdown notifications active":"notifications",children:Object(w.jsx)(E,{})})]}),Object(w.jsxs)("div",{onClick:function(){r(!1),d(!l)},tabIndex:0,className:"dropdown-container",children:[Object(w.jsx)("p",{className:"nav-links",children:"Me \u2206"}),Object(w.jsx)("div",{className:l?"dropdown profile-options active":"profile-options",children:Object(w.jsx)(L,{})})]})]}),Object(w.jsx)("div",{className:"nav-icon",onClick:function(){c(!t),r(!1),d(!1)},children:Object(w.jsx)("i",{className:t?"fas fa-times-circle":"fas fa-bars"})})]})})})},D=t(94),A=t(14),F=t(90),R=Object(F.a)(c||(c=Object(A.a)(["\n  query {\n    me {\n      username\n      jobQueries {\n        content, date\n      }\n    }\n  }\n"]))),M=Object(F.a)(a||(a=Object(A.a)(["\n  query {\n    me {\n      id\n    }\n  }\n"]))),H=Object(F.a)(s||(s=Object(A.a)(["\n  query {\n    me {\n      conversations {\n        id,\n        users {\n          username\n          }\n      }\n    }\n  }\n"]))),Q=Object(F.a)(i||(i=Object(A.a)(["\n  query ($id: ID!) {\n    findConversation(id: $id) {\n      id, \n      users {\n        id,\n        username\n      },\n      messages {\n        id\n        sender {\n          id\n        }\n        body \n      } \n    }\n  }\n"]))),J=Object(F.a)(r||(r=Object(A.a)(["\n  query {\n    allJobqueries  {\n      content\n      date\n      user {\n        username\n      }\n    }\n  }\n"]))),P=Object(F.a)(o||(o=Object(A.a)(["\n  query findUser($id: ID!){\n    findUser (id: $id) {\n      username\n    }\n  }\n"]))),B=Object(F.a)(j||(j=Object(A.a)(["\n  query {\n    allUsers {\n      id\n      username \n      jobQueries {\n        content\n      }\n    }\n  }\n"]))),G=(t(71),function(){var e=Object(D.a)(H);if(e.loading)return Object(w.jsx)("div",{children:"Loading..."});var n=e.data.me.conversations;return Object(w.jsx)("nav",{className:"msg-navigation",children:Object(w.jsx)("div",{className:"msg-nav-container",children:Object(w.jsx)("ul",{className:"msg-nav-menu",children:n.map((function(e){var n=e.users.map((function(e){return e.username})),t="../messages/".concat(e.id);return Object(w.jsx)("li",{className:"msg-nav-item",children:Object(w.jsx)(y.b,{exact:!0,to:t,activeClassName:"msg-active",className:"msg-nav-links",children:n})},e.id)}))})})})}),z=t(95),W=(t(72),Object(F.a)(l||(l=Object(A.a)(["\n  mutation login($username: String!, $password: String!) {\n    login(username: $username, password: $password)  {\n      value\n    }\n  }\n"])))),Y=Object(F.a)(d||(d=Object(A.a)(["\n  mutation createUser($username: String!, $password: String!) {\n    createUser(username: $username, password: $password) {\n      username\n    }\n}\n"]))),_=Object(F.a)(b||(b=Object(A.a)(["\n  mutation createJobquery($content: String!) {\n    createJobquery(content: $content) {\n      content\n    }\n}\n"]))),K=Object(F.a)(u||(u=Object(A.a)(["\n  mutation newConversation($receiverId: ID!) {\n    createConversation(receiverId: $receiverId) {\n      id\n    }\n  }\n"]))),V=Object(F.a)(O||(O=Object(A.a)(["\n  mutation sendMessage($id: ID!, $body: String!) {\n    sendMessage(conversationId: $id, body: $body) {\n      messages {body}\n    }\n}\n"]))),X=function(){var e=Object(z.a)(V,{onError:function(e){console.log("ERROR ON SENDING MESSAGE")}}),n=Object(S.a)(e,1)[0],t=Object(C.g)().id,c=Object(D.a)(Q,{variables:{id:t}}),a=Object(D.a)(M),s=Object(h.useState)(""),i=Object(S.a)(s,2),r=i[0],o=i[1];if(c.loading||a.loading)return Object(w.jsx)("div",{children:"Loading..."});var j=c.data.findConversation.users,l=c.data.findConversation.messages,d=c.data.findConversation.id,b=a.data.me.id;return Object(w.jsxs)("div",{className:"conversation-container",children:[Object(w.jsxs)("div",{className:"conversation-info",children:[Object(w.jsxs)("h2",{children:["Conversation ",t]}),Object(w.jsxs)("p",{children:["Participants: ",j.map((function(e){return e.username+", "}))]})]}),Object(w.jsx)("div",{className:"conversation-content",children:l.map((function(e){return e.sender.id===b?Object(w.jsx)("div",{className:"message-container user-sent",children:e.body},e.id):Object(w.jsx)("div",{className:"message-container",children:e.body},e.id)}))}),Object(w.jsx)("div",{className:"conversation-input-container",children:Object(w.jsxs)("form",{children:[Object(w.jsx)("input",{type:"text",onChange:function(e){return o(e.target.value)},value:r}),Object(w.jsx)("button",{onClick:function(e){e.preventDefault(),console.log("HANDLE SEND MESSAGE CALLED",r),n({variables:{id:d,body:r}}),o("")},children:"Send"})]})})]})},Z=(t(74),function(){return Object(w.jsx)("div",{className:"messages-container",children:Object(w.jsxs)(y.a,{children:[Object(w.jsx)("div",{className:"msg-contacts-container",children:Object(w.jsx)(G,{})}),Object(w.jsx)("div",{className:"msg-conversation-container",children:Object(w.jsx)(C.c,{children:Object(w.jsx)(C.a,{path:"/messages/:id",component:X})})})]})})}),ee=(t(38),function(){var e=Object(D.a)(J);if(e.loading)return Object(w.jsx)("div",{children:"loading..."});var n=function(){console.log("Button pressed")};return Object(w.jsx)("div",{children:Object(w.jsx)("ul",{children:e.data.allJobqueries.map((function(e){return Object(w.jsxs)("div",{className:"card",children:[Object(w.jsxs)("div",{className:"general-info-container",children:[Object(w.jsxs)("div",{className:"image-and-name-container",children:[Object(w.jsx)("div",{className:"image-container"}),Object(w.jsxs)("p",{children:[Object(w.jsx)("b",{children:e.user.username})," is looking for ",Object(w.jsx)("br",{}),"string ensemble"]})]}),Object(w.jsx)("p",{children:e.content}),Object(w.jsxs)("div",{className:"details-container",children:[Object(w.jsx)("p",{children:"250"}),Object(w.jsx)("p",{children:"Helsinki"}),Object(w.jsx)("p",{children:"16.8.2021"})]})]}),Object(w.jsxs)("div",{className:"buttons-container",children:[Object(w.jsxs)("button",{className:"card-button jq-contact-button",onClick:n,children:["Contact ",e.user.username]}),Object(w.jsx)("button",{className:"card-button more-info-button",onClick:n,children:"More info"})]})]})}))})})}),ne=function(){return Object(w.jsx)("nav",{className:"job-navigation",children:Object(w.jsx)("div",{className:"job-nav-container",children:Object(w.jsxs)("ul",{className:"job-nav-menu",children:[Object(w.jsx)("li",{className:"job-nav-item",children:Object(w.jsx)(y.b,{exact:!0,to:"/jobmarket/queries/",activeClassName:"job-active",className:"job-nav-links",children:"Queries"})}),Object(w.jsx)("li",{className:"job-nav-item",children:Object(w.jsx)(y.b,{exact:!0,to:"/jobmarket/sendquery/",activeClassName:"job-active",className:"job-nav-links",children:"Send query"})}),Object(w.jsx)("li",{className:"job-nav-item",children:Object(w.jsx)(y.b,{exact:!0,to:"/jobmarket/myqueries/",activeClassName:"job-active",className:"job-nav-links",children:"My queries"})})]})})})},te=function(){var e=Object(h.useState)(""),n=Object(S.a)(e,2),t=n[0],c=n[1],a=Object(z.a)(_,{onError:function(e){console.log("Error at create query mutation: \n",e)}}),s=Object(S.a)(a,1)[0],i=function(){var e=Object(I.a)($.a.mark((function e(n){return $.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n.preventDefault(),console.log("submit called with ".concat(t)),s({variables:{content:t}}),c("");case 4:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}();return Object(w.jsxs)("div",{children:[Object(w.jsx)("h2",{children:"Send Query"}),Object(w.jsx)("div",{children:Object(w.jsxs)("form",{onSubmit:i,children:[Object(w.jsxs)("div",{children:["content ",Object(w.jsx)("input",{value:t,onChange:function(e){var n=e.target;return c(n.value)}})]}),Object(w.jsx)("button",{type:"submit",children:"send"})]})})]})},ce=function(){var e=Object(D.a)(R);return e.loading?Object(w.jsx)("div",{children:"loading..."}):(console.log("RESULT MY QUERIES \n",e),Object(w.jsxs)("div",{children:[Object(w.jsx)("h3",{children:"My queries"}),e.data.me.jobQueries.map((function(e){return Object(w.jsx)("p",{children:e.content},e.id)}))]}))},ae=function(){return Object(w.jsx)(w.Fragment,{children:Object(w.jsx)(y.a,{children:Object(w.jsxs)("div",{className:"job-page",children:[Object(w.jsx)(ne,{}),Object(w.jsx)("div",{className:"job-pages",children:Object(w.jsxs)(C.c,{children:[Object(w.jsx)(C.a,{path:"/jobmarket/queries/",component:ee}),Object(w.jsx)(C.a,{path:"/jobmarket/sendquery/",component:te}),Object(w.jsx)(C.a,{path:"/jobmarket/myqueries/",component:ce})]})})]})})})},se=(t(75),function(){var e=Object(D.a)(B),n=Object(D.a)(M),t=Object(z.a)(K),c=Object(S.a)(t,1)[0],a=Object(C.f)();if(e.loading||n.loading)return Object(w.jsx)("div",{children:"loading..."});var s=function(){var e=Object(I.a)($.a.mark((function e(n){var t,s;return $.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("CONTACT BUTTON PRESSED FOR",n),e.next=3,c({variables:{receiverId:n}});case 3:t=e.sent,s=t.data.createConversation.id,a.push("/messages/".concat(s));case 6:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}();return Object(w.jsxs)("div",{children:[Object(w.jsx)("h1",{children:"Profiles"}),Object(w.jsx)("div",{className:"profiles-container",children:e.data.allUsers.map((function(e){var t="/profile/".concat(e.id);return Object(w.jsxs)("div",{className:"profile-container",children:[Object(w.jsx)("div",{className:"upper-container",children:Object(w.jsx)("div",{className:"profile-image-container",children:Object(w.jsx)("div",{className:"profile-image",children:Object(w.jsx)("img",{src:"https://content.thriveglobal.com/wp-content/uploads/2018/01/Happy_guy.jpg",alt:"musician",className:"profile-image"})})})}),Object(w.jsxs)("div",{className:"lower-container",children:[Object(w.jsxs)("div",{className:"name-container",children:[Object(w.jsx)("h3",{className:"profile-name",children:e.username}),Object(w.jsx)("p",{children:"violinist, saxophonist"})]}),Object(w.jsxs)("div",{className:"profiles-buttons-container",children:[Object(w.jsx)("button",{className:"profiles-button to-profile-button",onClick:function(){return a.push(t)},children:"To profile"}),e.id!==n.data.me.id?Object(w.jsxs)("button",{className:"profiles-button profiles-contact-button",onClick:function(){return s(e.id)},children:["Contact ",e.username]}):Object(w.jsxs)("button",{className:"profiles-button disabled-button",disabled:!0,children:["Contact ",e.username]})]})]})]})}))})]})}),ie="kulttuurisome-user-token",re=function(e){var n=e.setToken,t=Object(C.f)(),c=Object(h.useState)(""),a=Object(S.a)(c,2),s=a[0],i=a[1],r=Object(h.useState)(""),o=Object(S.a)(r,2),j=o[0],l=o[1],d=Object(z.a)(W,{onError:function(e){console.log("Error at sign in mutation: \n",e.graphQLErrors[0].message)}}),b=Object(S.a)(d,2),u=b[0],O=b[1];Object(h.useEffect)((function(){if(O.data){console.log("RESULT DATA USE EFFECT",O.data);var e=O.data.login.value;n(e),localStorage.setItem(ie,e),t.push("/")}}),[O.data]);var m=function(){var e=Object(I.a)($.a.mark((function e(n){return $.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n.preventDefault(),u({variables:{username:s,password:j}});case 2:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}();return Object(w.jsx)("div",{children:Object(w.jsxs)("form",{onSubmit:m,children:[Object(w.jsxs)("div",{children:["username ",Object(w.jsx)("input",{value:s,onChange:function(e){var n=e.target;return i(n.value)}})]}),Object(w.jsxs)("div",{children:["password ",Object(w.jsx)("input",{type:"password",value:j,onChange:function(e){var n=e.target;return l(n.value)}})]}),Object(w.jsx)("button",{type:"submit",children:"login"})]})})},oe=function(){var e=Object(C.f)(),n=Object(h.useState)(""),t=Object(S.a)(n,2),c=t[0],a=t[1],s=Object(h.useState)(""),i=Object(S.a)(s,2),r=i[0],o=i[1],j=Object(z.a)(Y,{onError:function(e){console.log("Error at sign up mutation: \n",e.graphQLErrors[0].message)}}),l=Object(S.a)(j,2),d=l[0],b=l[1];Object(h.useEffect)((function(){b.data&&(console.log("(sign up) RESULT DATA USE EFFECT",b.data),e.push("/signin"))}),[b.data]);var u=function(){var e=Object(I.a)($.a.mark((function e(n){return $.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n.preventDefault(),d({variables:{username:c,password:r}});case 2:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}();return Object(w.jsxs)("div",{children:[Object(w.jsx)("h2",{children:"Sign up"}),Object(w.jsxs)("form",{onSubmit:u,children:[Object(w.jsxs)("div",{children:["username ",Object(w.jsx)("input",{value:c,onChange:function(e){var n=e.target;return a(n.value)}})]}),Object(w.jsxs)("div",{children:["password ",Object(w.jsx)("input",{type:"password",value:r,onChange:function(e){var n=e.target;return o(n.value)}})]}),Object(w.jsx)("button",{type:"submit",children:"Sign up"})]})]})},je=(t(76),function(){return Object(w.jsxs)("div",{children:[Object(w.jsx)("div",{className:"title-and-links-container",children:Object(w.jsxs)("div",{className:"title-and-links",children:[Object(w.jsxs)("h1",{className:"title",children:["Hey freelancer, ",Object(w.jsx)("br",{}),"you are needed!"]}),Object(w.jsxs)("div",{className:"links",children:[Object(w.jsx)("a",{href:"../signin",className:"link signin",children:"Sign In"}),Object(w.jsx)("a",{href:"../signup",className:"link signup",children:"Sign Up"})]})]})}),Object(w.jsx)("div",{children:Object(w.jsx)("h1",{children:"About"})}),Object(w.jsx)("div",{children:Object(w.jsx)("h1",{children:"Features"})}),Object(w.jsx)("div",{children:Object(w.jsx)("h1",{children:"Footer"})})]})}),le=function(){var e=Object(D.a)(R);return e.loading?Object(w.jsx)("div",{children:"Loading..."}):Object(w.jsx)("div",{children:Object(w.jsxs)("h1",{children:["Welcome ",Object(w.jsx)("i",{children:e.data.me.username})]})})},de=function(){return Object(w.jsx)("h1",{children:"Settings"})},be=(t(77),function(){var e=Object(C.g)().id,n=Object(D.a)(P,{variables:{id:e}});return n.loading?Object(w.jsx)("div",{children:"loading..."}):(console.log(n),Object(w.jsxs)("div",{children:[Object(w.jsx)("h3",{children:"Profile"}),n.data.findUser.username]}))}),ue=function(){var e=localStorage.getItem(ie),n=Object(h.useState)(e),t=Object(S.a)(n,2),c=t[0],a=t[1];return Object(w.jsxs)(y.a,{children:[Object(w.jsx)("div",{className:"production-notice-container",children:"In development"}),c?Object(w.jsxs)(w.Fragment,{children:[Object(w.jsx)(T,{}),Object(w.jsx)("div",{className:"pages",children:Object(w.jsxs)(C.c,{children:[Object(w.jsx)(C.a,{path:"/messages",component:Z}),Object(w.jsx)(C.a,{path:"/jobmarket",component:ae}),Object(w.jsx)(C.a,{path:"/profiles",component:se}),Object(w.jsx)(C.a,{path:"/profile/:id",component:be}),Object(w.jsx)(C.a,{path:"/settings",component:de}),Object(w.jsx)(C.a,{path:"/",component:function(){return Object(w.jsx)(le,{})}})]})})]}):Object(w.jsxs)(C.c,{children:[Object(w.jsx)(C.a,{path:"/signin",component:function(){return Object(w.jsx)(re,{setToken:a})}}),Object(w.jsx)(C.a,{path:"/signup",component:function(){return Object(w.jsx)(oe,{})}}),Object(w.jsx)(C.a,{path:"/",component:je})]})]})},Oe=Object(k.a)((function(e,n){var t=n.headers,c=localStorage.getItem(ie);return{headers:Object(m.a)(Object(m.a)({},t),{},{authorization:c?"bearer ".concat(c):null})}})),me=new p.a({uri:"https://halfeatenbiscuit.herokuapp.com/graphql"}),he=new f.a({cache:new g.a,link:Oe.concat(me)});x.a.render(Object(w.jsx)(N.a,{client:he,children:Object(w.jsx)(ue,{})}),document.getElementById("root"))}},[[78,1,2]]]);
//# sourceMappingURL=main.bdd894e3.chunk.js.map