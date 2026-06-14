/* esm.sh - three-mesh-bvh@0.7.4 */
var Ci=Object.defineProperty;var Li=(i,e)=>{for(var t in e)Ci(i,t,{get:e[t],enumerable:!0})};import{BufferAttribute as wo,Box3 as mi,FrontSide as pi}from"three";var Xt=0,vn=1,Tn=2,zi=0,Ri=1,Me=2;var wn=Math.pow(2,-24),Gt=Symbol("SKIP_GENERATION");import{BufferAttribute as Ui}from"three";function Ee(i){return i.index?i.index.count:i.attributes.position.count}function j(i){return Ee(i)/3}function De(i,e=ArrayBuffer){return i>65535?new Uint32Array(new e(4*i)):new Uint16Array(new e(2*i))}function Bn(i,e){if(!i.index){let t=i.attributes.position.count,n=e.useSharedArrayBuffer?SharedArrayBuffer:ArrayBuffer,o=De(t,n);i.setIndex(new Ui(o,1));for(let a=0;a<t;a++)o[a]=a}}function Fe(i){let e=j(i),t=i.drawRange,n=t.start/3,o=(t.start+t.count)/3,a=Math.max(0,n),s=Math.min(e,o)-a;return[{offset:Math.floor(a),count:Math.floor(s)}]}function Ne(i){if(!i.groups||!i.groups.length)return Fe(i);let e=[],t=new Set,n=i.drawRange,o=n.start/3,a=(n.start+n.count)/3;for(let c of i.groups){let r=c.start/3,u=(c.start+c.count)/3;t.add(Math.max(o,r)),t.add(Math.min(a,u))}let s=Array.from(t.values()).sort((c,r)=>c-r);for(let c=0;c<s.length-1;c++){let r=s[c],u=s[c+1];e.push({offset:Math.floor(r),count:Math.floor(u-r)})}return e}function _n(i){if(i.groups.length===0)return!1;let e=j(i),t=Ne(i).sort((a,s)=>a.offset-s.offset),n=t[t.length-1];n.count=Math.min(e-n.offset,n.count);let o=0;return t.forEach(({count:a})=>o+=a),e!==o}function Yt(i,e,t,n,o){let a=1/0,s=1/0,c=1/0,r=-1/0,u=-1/0,f=-1/0,p=1/0,l=1/0,d=1/0,h=-1/0,A=-1/0,b=-1/0;for(let m=e*6,x=(e+t)*6;m<x;m+=6){let y=i[m+0],v=i[m+1],g=y-v,T=y+v;g<a&&(a=g),T>r&&(r=T),y<p&&(p=y),y>h&&(h=y);let w=i[m+2],_=i[m+3],B=w-_,P=w+_;B<s&&(s=B),P>u&&(u=P),w<l&&(l=w),w>A&&(A=w);let I=i[m+4],S=i[m+5],M=I-S,E=I+S;M<c&&(c=M),E>f&&(f=E),I<d&&(d=I),I>b&&(b=I)}n[0]=a,n[1]=s,n[2]=c,n[3]=r,n[4]=u,n[5]=f,o[0]=p,o[1]=l,o[2]=d,o[3]=h,o[4]=A,o[5]=b}function Sn(i,e=null,t=null,n=null){let o=i.attributes.position,a=i.index?i.index.array:null,s=j(i),c=o.normalized,r;e===null?(r=new Float32Array(s*6*4),t=0,n=s):(r=e,t=t||0,n=n||s);let u=o.array,f=o.offset||0,p=3;o.isInterleavedBufferAttribute&&(p=o.data.stride);let l=["getX","getY","getZ"];for(let d=t;d<t+n;d++){let h=d*3,A=d*6,b=h+0,m=h+1,x=h+2;a&&(b=a[b],m=a[m],x=a[x]),c||(b=b*p+f,m=m*p+f,x=x*p+f);for(let y=0;y<3;y++){let v,g,T;c?(v=o[l[y]](b),g=o[l[y]](m),T=o[l[y]](x)):(v=u[b+y],g=u[m+y],T=u[x+y]);let w=v;g<w&&(w=g),T<w&&(w=T);let _=v;g>_&&(_=g),T>_&&(_=T);let B=(_-w)/2,P=y*2;r[A+P+0]=w+B,r[A+P+1]=B+(Math.abs(w)+B)*wn}}return r}function D(i,e,t){return t.min.x=e[i],t.min.y=e[i+1],t.min.z=e[i+2],t.max.x=e[i+3],t.max.y=e[i+4],t.max.z=e[i+5],t}function Ce(i){let e=-1,t=-1/0;for(let n=0;n<3;n++){let o=i[n+3]-i[n];o>t&&(t=o,e=n)}return e}function Le(i,e){e.set(i)}function ze(i,e,t){let n,o;for(let a=0;a<3;a++){let s=a+3;n=i[a],o=e[a],t[a]=n<o?n:o,n=i[s],o=e[s],t[s]=n>o?n:o}}function It(i,e,t){for(let n=0;n<3;n++){let o=e[i+2*n],a=e[i+2*n+1],s=o-a,c=o+a;s<t[n]&&(t[n]=s),c>t[n+3]&&(t[n+3]=c)}}function lt(i){let e=i[3]-i[0],t=i[4]-i[1],n=i[5]-i[2];return 2*(e*t+t*n+n*e)}var Z=32,Vi=(i,e)=>i.candidate-e.candidate,J=new Array(Z).fill().map(()=>({count:0,bounds:new Float32Array(6),rightCacheBounds:new Float32Array(6),leftCacheBounds:new Float32Array(6),candidate:0})),jt=new Float32Array(6);function In(i,e,t,n,o,a){let s=-1,c=0;if(a===0)s=Ce(e),s!==-1&&(c=(e[s]+e[s+3])/2);else if(a===1)s=Ce(i),s!==-1&&(c=ki(t,n,o,s));else if(a===2){let r=lt(i),u=1.25*o,f=n*6,p=(n+o)*6;for(let l=0;l<3;l++){let d=e[l],b=(e[l+3]-d)/Z;if(o<Z/4){let m=[...J];m.length=o;let x=0;for(let v=f;v<p;v+=6,x++){let g=m[x];g.candidate=t[v+2*l],g.count=0;let{bounds:T,leftCacheBounds:w,rightCacheBounds:_}=g;for(let B=0;B<3;B++)_[B]=1/0,_[B+3]=-1/0,w[B]=1/0,w[B+3]=-1/0,T[B]=1/0,T[B+3]=-1/0;It(v,t,T)}m.sort(Vi);let y=o;for(let v=0;v<y;v++){let g=m[v];for(;v+1<y&&m[v+1].candidate===g.candidate;)m.splice(v+1,1),y--}for(let v=f;v<p;v+=6){let g=t[v+2*l];for(let T=0;T<y;T++){let w=m[T];g>=w.candidate?It(v,t,w.rightCacheBounds):(It(v,t,w.leftCacheBounds),w.count++)}}for(let v=0;v<y;v++){let g=m[v],T=g.count,w=o-g.count,_=g.leftCacheBounds,B=g.rightCacheBounds,P=0;T!==0&&(P=lt(_)/r);let I=0;w!==0&&(I=lt(B)/r);let S=1+1.25*(P*T+I*w);S<u&&(s=l,u=S,c=g.candidate)}}else{for(let y=0;y<Z;y++){let v=J[y];v.count=0,v.candidate=d+b+y*b;let g=v.bounds;for(let T=0;T<3;T++)g[T]=1/0,g[T+3]=-1/0}for(let y=f;y<p;y+=6){let T=~~((t[y+2*l]-d)/b);T>=Z&&(T=Z-1);let w=J[T];w.count++,It(y,t,w.bounds)}let m=J[Z-1];Le(m.bounds,m.rightCacheBounds);for(let y=Z-2;y>=0;y--){let v=J[y],g=J[y+1];ze(v.bounds,g.rightCacheBounds,v.rightCacheBounds)}let x=0;for(let y=0;y<Z-1;y++){let v=J[y],g=v.count,T=v.bounds,_=J[y+1].rightCacheBounds;g!==0&&(x===0?Le(T,jt):ze(T,jt,jt)),x+=g;let B=0,P=0;x!==0&&(B=lt(jt)/r);let I=o-x;I!==0&&(P=lt(_)/r);let S=1+1.25*(B*x+P*I);S<u&&(s=l,u=S,c=v.candidate)}}}}else console.warn(`MeshBVH: Invalid build strategy value ${a} used.`);return{axis:s,pos:c}}function ki(i,e,t,n){let o=0;for(let a=e,s=e+t;a<s;a++)o+=i[a*6+n*2];return o/t}var ft=class{constructor(){this.boundingData=new Float32Array(6)}};function Mn(i,e,t,n,o,a){let s=n,c=n+o-1,r=a.pos,u=a.axis*2;for(;;){for(;s<=c&&t[s*6+u]<r;)s++;for(;s<=c&&t[c*6+u]>=r;)c--;if(s<c){for(let f=0;f<3;f++){let p=e[s*3+f];e[s*3+f]=e[c*3+f],e[c*3+f]=p}for(let f=0;f<6;f++){let p=t[s*6+f];t[s*6+f]=t[c*6+f],t[c*6+f]=p}s++,c--}else return s}}function En(i,e,t,n,o,a){let s=n,c=n+o-1,r=a.pos,u=a.axis*2;for(;;){for(;s<=c&&t[s*6+u]<r;)s++;for(;s<=c&&t[c*6+u]>=r;)c--;if(s<c){let f=i[s];i[s]=i[c],i[c]=f;for(let p=0;p<6;p++){let l=t[s*6+p];t[s*6+p]=t[c*6+p],t[c*6+p]=l}s++,c--}else return s}}function L(i,e){return e[i+15]===65535}function z(i,e){return e[i+6]}function R(i,e){return e[i+14]}function O(i){return i+8}function k(i,e){return e[i+6]}function ut(i,e){return e[i+7]}var Dn,Mt,Zt,Fn,Oi=Math.pow(2,32);function Kt(i){return"count"in i?1:1+Kt(i.left)+Kt(i.right)}function Nn(i,e,t){return Dn=new Float32Array(t),Mt=new Uint32Array(t),Zt=new Uint16Array(t),Fn=new Uint8Array(t),Ue(i,e)}function Ue(i,e){let t=i/4,n=i/2,o="count"in e,a=e.boundingData;for(let s=0;s<6;s++)Dn[t+s]=a[s];if(o)if(e.buffer){let s=e.buffer;Fn.set(new Uint8Array(s),i);for(let c=i,r=i+s.byteLength;c<r;c+=32){let u=c/2;L(u,Zt)||(Mt[c/4+6]+=t)}return i+s.byteLength}else{let s=e.offset,c=e.count;return Mt[t+6]=s,Zt[n+14]=c,Zt[n+15]=65535,i+32}else{let s=e.left,c=e.right,r=e.splitAxis,u;if(u=Ue(i+32,s),u/4>Oi)throw new Error("MeshBVH: Cannot store child pointer greater than 32 bits.");return Mt[t+6]=u/4,u=Ue(u,c),Mt[t+7]=r,u}}function Hi(i,e){let t=(i.index?i.index.count:i.attributes.position.count)/3,n=t>2**16,o=n?4:2,a=e?new SharedArrayBuffer(t*o):new ArrayBuffer(t*o),s=n?new Uint32Array(a):new Uint16Array(a);for(let c=0,r=s.length;c<r;c++)s[c]=c;return s}function qi(i,e,t,n,o){let{maxDepth:a,verbose:s,maxLeafTris:c,strategy:r,onProgress:u,indirect:f}=o,p=i._indirectBuffer,l=i.geometry,d=l.index?l.index.array:null,h=f?En:Mn,A=j(l),b=new Float32Array(6),m=!1,x=new ft;return Yt(e,t,n,x.boundingData,b),v(x,t,n,b),x;function y(g){u&&u(g/A)}function v(g,T,w,_=null,B=0){if(!m&&B>=a&&(m=!0,s&&(console.warn(`MeshBVH: Max depth of ${a} reached when generating BVH. Consider increasing maxDepth.`),console.warn(l))),w<=c||B>=a)return y(T+w),g.offset=T,g.count=w,g;let P=In(g.boundingData,_,e,T,w,r);if(P.axis===-1)return y(T+w),g.offset=T,g.count=w,g;let I=h(p,d,e,T,w,P);if(I===T||I===T+w)y(T+w),g.offset=T,g.count=w;else{g.splitAxis=P.axis;let S=new ft,M=T,E=I-T;g.left=S,Yt(e,M,E,S.boundingData,b),v(S,M,E,b,B+1);let N=new ft,V=I,$=w-E;g.right=N,Yt(e,V,$,N.boundingData,b),v(N,V,$,b,B+1)}return g}}function Cn(i,e){let t=i.geometry;e.indirect&&(i._indirectBuffer=Hi(t,e.useSharedArrayBuffer),_n(t)&&!e.verbose&&console.warn('MeshBVH: Provided geometry contains groups that do not fully span the vertex contents while using the "indirect" option. BVH may incorrectly report intersections on unrendered portions of the geometry.')),i._indirectBuffer||Bn(t,e);let n=e.useSharedArrayBuffer?SharedArrayBuffer:ArrayBuffer,o=Sn(t),a=e.indirect?Fe(t):Ne(t);i._roots=a.map(s=>{let c=qi(i,o,s.offset,s.count,e),r=Kt(c),u=new n(32*r);return Nn(0,c,u),u})}import{Vector3 as tt,Matrix4 as zn,Line3 as Rn}from"three";import{Vector3 as Wi}from"three";var W=class{constructor(){this.min=1/0,this.max=-1/0}setFromPointsField(e,t){let n=1/0,o=-1/0;for(let a=0,s=e.length;a<s;a++){let r=e[a][t];n=r<n?r:n,o=r>o?r:o}this.min=n,this.max=o}setFromPoints(e,t){let n=1/0,o=-1/0;for(let a=0,s=t.length;a<s;a++){let c=t[a],r=e.dot(c);n=r<n?r:n,o=r>o?r:o}this.min=n,this.max=o}isSeparated(e){return this.min>e.max||e.min>this.max}};W.prototype.setFromBox=(function(){let i=new Wi;return function(t,n){let o=n.min,a=n.max,s=1/0,c=-1/0;for(let r=0;r<=1;r++)for(let u=0;u<=1;u++)for(let f=0;f<=1;f++){i.x=o.x*r+a.x*(1-r),i.y=o.y*u+a.y*(1-u),i.z=o.z*f+a.z*(1-f);let p=t.dot(i);s=Math.min(p,s),c=Math.max(p,c)}this.min=s,this.max=c}})();var Rs=(function(){let i=new W;return function(t,n){let o=t.points,a=t.satAxes,s=t.satBounds,c=n.points,r=n.satAxes,u=n.satBounds;for(let f=0;f<3;f++){let p=s[f],l=a[f];if(i.setFromPoints(l,c),p.isSeparated(i))return!1}for(let f=0;f<3;f++){let p=u[f],l=r[f];if(i.setFromPoints(l,o),p.isSeparated(i))return!1}}})();import{Triangle as Zi,Vector3 as X,Line3 as pt,Sphere as Ki,Plane as $i}from"three";import{Vector3 as ot,Vector2 as Xi,Plane as Gi,Line3 as Yi}from"three";var ji=(function(){let i=new ot,e=new ot,t=new ot;return function(o,a,s){let c=o.start,r=i,u=a.start,f=e;t.subVectors(c,u),i.subVectors(o.end,o.start),e.subVectors(a.end,a.start);let p=t.dot(f),l=f.dot(r),d=f.dot(f),h=t.dot(r),b=r.dot(r)*d-l*l,m,x;b!==0?m=(p*l-h*d)/b:m=0,x=(p+m*l)/d,s.x=m,s.y=x}})(),Et=(function(){let i=new Xi,e=new ot,t=new ot;return function(o,a,s,c){ji(o,a,i);let r=i.x,u=i.y;if(r>=0&&r<=1&&u>=0&&u<=1){o.at(r,s),a.at(u,c);return}else if(r>=0&&r<=1){u<0?a.at(0,c):a.at(1,c),o.closestPointToPoint(c,!0,s);return}else if(u>=0&&u<=1){r<0?o.at(0,s):o.at(1,s),a.closestPointToPoint(s,!0,c);return}else{let f;r<0?f=o.start:f=o.end;let p;u<0?p=a.start:p=a.end;let l=e,d=t;if(o.closestPointToPoint(p,!0,e),a.closestPointToPoint(f,!0,t),l.distanceToSquared(p)<=d.distanceToSquared(f)){s.copy(l),c.copy(p);return}else{s.copy(f),c.copy(d);return}}}})(),Ln=(function(){let i=new ot,e=new ot,t=new Gi,n=new Yi;return function(a,s){let{radius:c,center:r}=a,{a:u,b:f,c:p}=s;if(n.start=u,n.end=f,n.closestPointToPoint(r,!0,i).distanceTo(r)<=c||(n.start=u,n.end=p,n.closestPointToPoint(r,!0,i).distanceTo(r)<=c)||(n.start=f,n.end=p,n.closestPointToPoint(r,!0,i).distanceTo(r)<=c))return!0;let A=s.getPlane(t);if(Math.abs(A.distanceToPoint(r))<=c){let m=A.projectPoint(r,e);if(s.containsPoint(m))return!0}return!1}})();var Ji=1e-15;function Ve(i){return Math.abs(i)<Ji}var H=class extends Zi{constructor(...e){super(...e),this.isExtendedTriangle=!0,this.satAxes=new Array(4).fill().map(()=>new X),this.satBounds=new Array(4).fill().map(()=>new W),this.points=[this.a,this.b,this.c],this.sphere=new Ki,this.plane=new $i,this.needsUpdate=!0}intersectsSphere(e){return Ln(e,this)}update(){let e=this.a,t=this.b,n=this.c,o=this.points,a=this.satAxes,s=this.satBounds,c=a[0],r=s[0];this.getNormal(c),r.setFromPoints(c,o);let u=a[1],f=s[1];u.subVectors(e,t),f.setFromPoints(u,o);let p=a[2],l=s[2];p.subVectors(t,n),l.setFromPoints(p,o);let d=a[3],h=s[3];d.subVectors(n,e),h.setFromPoints(d,o),this.sphere.setFromPoints(this.points),this.plane.setFromNormalAndCoplanarPoint(c,e),this.needsUpdate=!1}};H.prototype.closestPointToSegment=(function(){let i=new X,e=new X,t=new pt;return function(o,a=null,s=null){let{start:c,end:r}=o,u=this.points,f,p=1/0;for(let l=0;l<3;l++){let d=(l+1)%3;t.start.copy(u[l]),t.end.copy(u[d]),Et(t,o,i,e),f=i.distanceToSquared(e),f<p&&(p=f,a&&a.copy(i),s&&s.copy(e))}return this.closestPointToPoint(c,i),f=c.distanceToSquared(i),f<p&&(p=f,a&&a.copy(i),s&&s.copy(c)),this.closestPointToPoint(r,i),f=r.distanceToSquared(i),f<p&&(p=f,a&&a.copy(i),s&&s.copy(r)),Math.sqrt(p)}})();H.prototype.intersectsTriangle=(function(){let i=new H,e=new Array(3),t=new Array(3),n=new W,o=new W,a=new X,s=new X,c=new X,r=new X,u=new X,f=new pt,p=new pt,l=new pt,d=new X;function h(A,b,m){let x=A.points,y=0,v=-1;for(let g=0;g<3;g++){let{start:T,end:w}=f;T.copy(x[g]),w.copy(x[(g+1)%3]),f.delta(s);let _=Ve(b.distanceToPoint(T));if(Ve(b.normal.dot(s))&&_){m.copy(f),y=2;break}let B=b.intersectLine(f,d);if(!B&&_&&d.copy(T),(B||_)&&!Ve(d.distanceTo(w))){if(y<=1)(y===1?m.start:m.end).copy(d),_&&(v=y);else if(y>=2){(v===1?m.start:m.end).copy(d),y=2;break}if(y++,y===2&&v===-1)break}}return y}return function(b,m=null,x=!1){this.needsUpdate&&this.update(),b.isExtendedTriangle?b.needsUpdate&&b.update():(i.copy(b),i.update(),b=i);let y=this.plane,v=b.plane;if(Math.abs(y.normal.dot(v.normal))>1-1e-10){let g=this.satBounds,T=this.satAxes;t[0]=b.a,t[1]=b.b,t[2]=b.c;for(let B=0;B<4;B++){let P=g[B],I=T[B];if(n.setFromPoints(I,t),P.isSeparated(n))return!1}let w=b.satBounds,_=b.satAxes;e[0]=this.a,e[1]=this.b,e[2]=this.c;for(let B=0;B<4;B++){let P=w[B],I=_[B];if(n.setFromPoints(I,e),P.isSeparated(n))return!1}for(let B=0;B<4;B++){let P=T[B];for(let I=0;I<4;I++){let S=_[I];if(a.crossVectors(P,S),n.setFromPoints(a,e),o.setFromPoints(a,t),n.isSeparated(o))return!1}}return m&&(x||console.warn("ExtendedTriangle.intersectsTriangle: Triangles are coplanar which does not support an output edge. Setting edge to 0, 0, 0."),m.start.set(0,0,0),m.end.set(0,0,0)),!0}else{let g=h(this,v,p);if(g===1&&b.containsPoint(p.end))return m&&(m.start.copy(p.end),m.end.copy(p.end)),!0;if(g!==2)return!1;let T=h(b,y,l);if(T===1&&this.containsPoint(l.end))return m&&(m.start.copy(l.end),m.end.copy(l.end)),!0;if(T!==2)return!1;if(p.delta(c),l.delta(r),c.dot(r)<0){let M=l.start;l.start=l.end,l.end=M}let w=p.start.dot(c),_=p.end.dot(c),B=l.start.dot(c),P=l.end.dot(c),I=_<B,S=w<P;return w!==P&&B!==_&&I===S?!1:(m&&(u.subVectors(p.start,l.start),u.dot(c)>0?m.start.copy(p.start):m.start.copy(l.start),u.subVectors(p.end,l.end),u.dot(c)<0?m.end.copy(p.end):m.end.copy(l.end)),!0)}}})();H.prototype.distanceToPoint=(function(){let i=new X;return function(t){return this.closestPointToPoint(t,i),t.distanceTo(i)}})();H.prototype.distanceToTriangle=(function(){let i=new X,e=new X,t=["a","b","c"],n=new pt,o=new pt;return function(s,c=null,r=null){let u=c||r?n:null;if(this.intersectsTriangle(s,u))return(c||r)&&(c&&u.getCenter(c),r&&u.getCenter(r)),0;let f=1/0;for(let p=0;p<3;p++){let l,d=t[p],h=s[d];this.closestPointToPoint(h,i),l=h.distanceToSquared(i),l<f&&(f=l,c&&c.copy(i),r&&r.copy(h));let A=this[d];s.closestPointToPoint(A,i),l=A.distanceToSquared(i),l<f&&(f=l,c&&c.copy(A),r&&r.copy(i))}for(let p=0;p<3;p++){let l=t[p],d=t[(p+1)%3];n.set(this[l],this[d]);for(let h=0;h<3;h++){let A=t[h],b=t[(h+1)%3];o.set(s[A],s[b]),Et(n,o,i,e);let m=i.distanceToSquared(e);m<f&&(f=m,c&&c.copy(i),r&&r.copy(e))}}return Math.sqrt(f)}})();var U=class{constructor(e,t,n){this.isOrientedBox=!0,this.min=new tt,this.max=new tt,this.matrix=new zn,this.invMatrix=new zn,this.points=new Array(8).fill().map(()=>new tt),this.satAxes=new Array(3).fill().map(()=>new tt),this.satBounds=new Array(3).fill().map(()=>new W),this.alignedSatBounds=new Array(3).fill().map(()=>new W),this.needsUpdate=!1,e&&this.min.copy(e),t&&this.max.copy(t),n&&this.matrix.copy(n)}set(e,t,n){this.min.copy(e),this.max.copy(t),this.matrix.copy(n),this.needsUpdate=!0}copy(e){this.min.copy(e.min),this.max.copy(e.max),this.matrix.copy(e.matrix),this.needsUpdate=!0}};U.prototype.update=(function(){return function(){let e=this.matrix,t=this.min,n=this.max,o=this.points;for(let u=0;u<=1;u++)for(let f=0;f<=1;f++)for(let p=0;p<=1;p++){let l=1*u|2*f|4*p,d=o[l];d.x=u?n.x:t.x,d.y=f?n.y:t.y,d.z=p?n.z:t.z,d.applyMatrix4(e)}let a=this.satBounds,s=this.satAxes,c=o[0];for(let u=0;u<3;u++){let f=s[u],p=a[u],l=1<<u,d=o[l];f.subVectors(c,d),p.setFromPoints(f,o)}let r=this.alignedSatBounds;r[0].setFromPointsField(o,"x"),r[1].setFromPointsField(o,"y"),r[2].setFromPointsField(o,"z"),this.invMatrix.copy(this.matrix).invert(),this.needsUpdate=!1}})();U.prototype.intersectsBox=(function(){let i=new W;return function(t){this.needsUpdate&&this.update();let n=t.min,o=t.max,a=this.satBounds,s=this.satAxes,c=this.alignedSatBounds;if(i.min=n.x,i.max=o.x,c[0].isSeparated(i)||(i.min=n.y,i.max=o.y,c[1].isSeparated(i))||(i.min=n.z,i.max=o.z,c[2].isSeparated(i)))return!1;for(let r=0;r<3;r++){let u=s[r],f=a[r];if(i.setFromBox(u,t),f.isSeparated(i))return!1}return!0}})();U.prototype.intersectsTriangle=(function(){let i=new H,e=new Array(3),t=new W,n=new W,o=new tt;return function(s){this.needsUpdate&&this.update(),s.isExtendedTriangle?s.needsUpdate&&s.update():(i.copy(s),i.update(),s=i);let c=this.satBounds,r=this.satAxes;e[0]=s.a,e[1]=s.b,e[2]=s.c;for(let l=0;l<3;l++){let d=c[l],h=r[l];if(t.setFromPoints(h,e),d.isSeparated(t))return!1}let u=s.satBounds,f=s.satAxes,p=this.points;for(let l=0;l<3;l++){let d=u[l],h=f[l];if(t.setFromPoints(h,p),d.isSeparated(t))return!1}for(let l=0;l<3;l++){let d=r[l];for(let h=0;h<4;h++){let A=f[h];if(o.crossVectors(d,A),t.setFromPoints(o,e),n.setFromPoints(o,p),t.isSeparated(n))return!1}}return!0}})();U.prototype.closestPointToPoint=(function(){return function(e,t){return this.needsUpdate&&this.update(),t.copy(e).applyMatrix4(this.invMatrix).clamp(this.min,this.max).applyMatrix4(this.matrix),t}})();U.prototype.distanceToPoint=(function(){let i=new tt;return function(t){return this.closestPointToPoint(t,i),t.distanceTo(i)}})();U.prototype.distanceToBox=(function(){let i=["x","y","z"],e=new Array(12).fill().map(()=>new Rn),t=new Array(12).fill().map(()=>new Rn),n=new tt,o=new tt;return function(s,c=0,r=null,u=null){if(this.needsUpdate&&this.update(),this.intersectsBox(s))return(r||u)&&(s.getCenter(o),this.closestPointToPoint(o,n),s.closestPointToPoint(n,o),r&&r.copy(n),u&&u.copy(o)),0;let f=c*c,p=s.min,l=s.max,d=this.points,h=1/0;for(let b=0;b<8;b++){let m=d[b];o.copy(m).clamp(p,l);let x=m.distanceToSquared(o);if(x<h&&(h=x,r&&r.copy(m),u&&u.copy(o),x<f))return Math.sqrt(x)}let A=0;for(let b=0;b<3;b++)for(let m=0;m<=1;m++)for(let x=0;x<=1;x++){let y=(b+1)%3,v=(b+2)%3,g=m<<y|x<<v,T=1<<b|m<<y|x<<v,w=d[g],_=d[T];e[A].set(w,_);let P=i[b],I=i[y],S=i[v],M=t[A],E=M.start,N=M.end;E[P]=p[P],E[I]=m?p[I]:l[I],E[S]=x?p[S]:l[I],N[P]=l[P],N[I]=m?p[I]:l[I],N[S]=x?p[S]:l[I],A++}for(let b=0;b<=1;b++)for(let m=0;m<=1;m++)for(let x=0;x<=1;x++){o.x=b?l.x:p.x,o.y=m?l.y:p.y,o.z=x?l.z:p.z,this.closestPointToPoint(o,n);let y=o.distanceToSquared(n);if(y<h&&(h=y,r&&r.copy(n),u&&u.copy(o),y<f))return Math.sqrt(y)}for(let b=0;b<12;b++){let m=e[b];for(let x=0;x<12;x++){let y=t[x];Et(m,y,n,o);let v=n.distanceToSquared(o);if(v<h&&(h=v,r&&r.copy(n),u&&u.copy(o),v<f))return Math.sqrt(v)}}return Math.sqrt(h)}})();var et=class{constructor(e){this._getNewPrimitive=e,this._primitives=[]}getPrimitive(){let e=this._primitives;return e.length===0?this._getNewPrimitive():e.pop()}releasePrimitive(e){this._primitives.push(e)}};var ke=class extends et{constructor(){super(()=>new H)}},q=new ke;import{Box3 as Qi}from"three";var Oe=class{constructor(){this.float32Array=null,this.uint16Array=null,this.uint32Array=null;let e=[],t=null;this.setBuffer=n=>{t&&e.push(t),t=n,this.float32Array=new Float32Array(n),this.uint16Array=new Uint16Array(n),this.uint32Array=new Uint32Array(n)},this.clearBuffer=()=>{t=null,this.float32Array=null,this.uint16Array=null,this.uint32Array=null,e.length!==0&&this.setBuffer(e.pop())}}},F=new Oe;var nt,mt,dt=[],Jt=new et(()=>new Qi);function Un(i,e,t,n,o,a){nt=Jt.getPrimitive(),mt=Jt.getPrimitive(),dt.push(nt,mt),F.setBuffer(i._roots[e]);let s=He(0,i.geometry,t,n,o,a);F.clearBuffer(),Jt.releasePrimitive(nt),Jt.releasePrimitive(mt),dt.pop(),dt.pop();let c=dt.length;return c>0&&(mt=dt[c-1],nt=dt[c-2]),s}function He(i,e,t,n,o=null,a=0,s=0){let{float32Array:c,uint16Array:r,uint32Array:u}=F,f=i*2;if(L(f,r)){let l=z(i,u),d=R(f,r);return D(i,c,nt),n(l,d,!1,s,a+i,nt)}else{let P=function(S){let{uint16Array:M,uint32Array:E}=F,N=S*2;for(;!L(N,M);)S=O(S),N=S*2;return z(S,E)},I=function(S){let{uint16Array:M,uint32Array:E}=F,N=S*2;for(;!L(N,M);)S=k(S,E),N=S*2;return z(S,E)+R(N,M)},l=O(i),d=k(i,u),h=l,A=d,b,m,x,y;if(o&&(x=nt,y=mt,D(h,c,x),D(A,c,y),b=o(x),m=o(y),m<b)){h=d,A=l;let S=b;b=m,m=S,x=y}x||(x=nt,D(h,c,x));let v=L(h*2,r),g=t(x,v,b,s+1,a+h),T;if(g===2){let S=P(h),E=I(h)-S;T=n(S,E,!0,s+1,a+h,x)}else T=g&&He(h,e,t,n,o,a,s+1);if(T)return!0;y=mt,D(A,c,y);let w=L(A*2,r),_=t(y,w,m,s+1,a+A),B;if(_===2){let S=P(A),E=I(A)-S;B=n(S,E,!0,s+1,a+A,y)}else B=_&&He(A,e,t,n,o,a,s+1);return!!B}}import{Vector3 as Vn}from"three";var Dt=new Vn,qe=new Vn;function kn(i,e,t={},n=0,o=1/0){let a=n*n,s=o*o,c=1/0,r=null;if(i.shapecast({boundsTraverseOrder:f=>(Dt.copy(e).clamp(f.min,f.max),Dt.distanceToSquared(e)),intersectsBounds:(f,p,l)=>l<c&&l<s,intersectsTriangle:(f,p)=>{f.closestPointToPoint(e,Dt);let l=e.distanceToSquared(Dt);return l<c&&(qe.copy(Dt),c=l,r=p),l<a}}),c===1/0)return null;let u=Math.sqrt(c);return t.point?t.point.copy(qe):t.point=qe.clone(),t.distance=u,t.faceIndex=r,t}import{Vector3 as K,Vector2 as Ft,Triangle as te,DoubleSide as to,BackSide as eo}from"three";var ht=new K,xt=new K,yt=new K,ee=new Ft,ne=new Ft,ie=new Ft,On=new K,Hn=new K,qn=new K,oe=new K;function no(i,e,t,n,o,a){let s;return a===eo?s=i.intersectTriangle(n,t,e,!0,o):s=i.intersectTriangle(e,t,n,a!==to,o),s===null?null:{distance:i.origin.distanceTo(o),point:o.clone()}}function io(i,e,t,n,o,a,s,c,r){ht.fromBufferAttribute(e,a),xt.fromBufferAttribute(e,s),yt.fromBufferAttribute(e,c);let u=no(i,ht,xt,yt,oe,r);if(u){n&&(ee.fromBufferAttribute(n,a),ne.fromBufferAttribute(n,s),ie.fromBufferAttribute(n,c),u.uv=te.getInterpolation(oe,ht,xt,yt,ee,ne,ie,new Ft)),o&&(ee.fromBufferAttribute(o,a),ne.fromBufferAttribute(o,s),ie.fromBufferAttribute(o,c),u.uv1=te.getInterpolation(oe,ht,xt,yt,ee,ne,ie,new Ft)),t&&(On.fromBufferAttribute(t,a),Hn.fromBufferAttribute(t,s),qn.fromBufferAttribute(t,c),u.normal=te.getInterpolation(oe,ht,xt,yt,On,Hn,qn,new K),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));let f={a,b:s,c,normal:new K,materialIndex:0};te.getNormal(ht,xt,yt,f.normal),u.face=f,u.faceIndex=a}return u}function bt(i,e,t,n,o){let a=n*3,s=a+0,c=a+1,r=a+2,u=i.index;i.index&&(s=u.getX(s),c=u.getX(c),r=u.getX(r));let{position:f,normal:p,uv:l,uv1:d}=i.attributes,h=io(t,f,p,l,d,s,c,r,e);return h?(h.faceIndex=n,o&&o.push(h),h):null}import{Vector2 as ae,Vector3 as Nt,Triangle as We}from"three";function C(i,e,t,n){let o=i.a,a=i.b,s=i.c,c=e,r=e+1,u=e+2;t&&(c=t.getX(c),r=t.getX(r),u=t.getX(u)),o.x=n.getX(c),o.y=n.getY(c),o.z=n.getZ(c),a.x=n.getX(r),a.y=n.getY(r),a.z=n.getZ(r),s.x=n.getX(u),s.y=n.getY(u),s.z=n.getZ(u)}var se=new Nt,re=new Nt,ce=new Nt,Wn=new ae,Xn=new ae,Gn=new ae;function oo(i,e,t,n){let o=e.getIndex().array,a=e.getAttribute("position"),s=e.getAttribute("uv"),c=o[t*3],r=o[t*3+1],u=o[t*3+2];se.fromBufferAttribute(a,c),re.fromBufferAttribute(a,r),ce.fromBufferAttribute(a,u);let f=0,p=e.groups,l=t*3;for(let h=0,A=p.length;h<A;h++){let b=p[h],{start:m,count:x}=b;if(l>=m&&l<m+x){f=b.materialIndex;break}}let d=null;return s&&(Wn.fromBufferAttribute(s,c),Xn.fromBufferAttribute(s,r),Gn.fromBufferAttribute(s,u),n&&n.uv?d=n.uv:d=new ae,We.getInterpolation(i,se,re,ce,Wn,Xn,Gn,d)),n?(n.face||(n.face={}),n.face.a=c,n.face.b=r,n.face.c=u,n.face.materialIndex=f,n.face.normal||(n.face.normal=new Nt),We.getNormal(se,re,ce,n.face.normal),d&&(n.uv=d),n):{face:{a:c,b:r,c:u,materialIndex:f,normal:We.getNormal(se,re,ce,new Nt)},uv:d}}function Yn(i,e,t,n,o,a){let{geometry:s,_indirectBuffer:c}=i;for(let r=n,u=n+o;r<u;r++)bt(s,e,t,r,a)}function jn(i,e,t,n,o){let{geometry:a,_indirectBuffer:s}=i,c=1/0,r=null;for(let u=n,f=n+o;u<f;u++){let p;p=bt(a,e,t,u),p&&p.distance<c&&(r=p,c=p.distance)}return r}function Zn(i,e,t,n,o,a,s){let{geometry:c}=t,{index:r}=c,u=c.attributes.position;for(let f=i,p=e+i;f<p;f++){let l;if(l=f,C(s,l*3,r,u),s.needsUpdate=!0,n(s,l,o,a))return!0}return!1}function Kn(i,e=null){e&&Array.isArray(e)&&(e=new Set(e));let t=i.geometry,n=t.index?t.index.array:null,o=t.attributes.position,a,s,c,r,u=0,f=i._roots;for(let l=0,d=f.length;l<d;l++)a=f[l],s=new Uint32Array(a),c=new Uint16Array(a),r=new Float32Array(a),p(0,u),u+=a.byteLength;function p(l,d,h=!1){let A=l*2;if(c[A+15]===65535){let m=s[l+6],x=c[A+14],y=1/0,v=1/0,g=1/0,T=-1/0,w=-1/0,_=-1/0;for(let B=3*m,P=3*(m+x);B<P;B++){let I=n[B],S=o.getX(I),M=o.getY(I),E=o.getZ(I);S<y&&(y=S),S>T&&(T=S),M<v&&(v=M),M>w&&(w=M),E<g&&(g=E),E>_&&(_=E)}return r[l+0]!==y||r[l+1]!==v||r[l+2]!==g||r[l+3]!==T||r[l+4]!==w||r[l+5]!==_?(r[l+0]=y,r[l+1]=v,r[l+2]=g,r[l+3]=T,r[l+4]=w,r[l+5]=_,!0):!1}else{let m=l+8,x=s[l+6],y=m+d,v=x+d,g=h,T=!1,w=!1;e?g||(T=e.has(y),w=e.has(v),g=!T&&!w):(T=!0,w=!0);let _=g||T,B=g||w,P=!1;_&&(P=p(m,d,g));let I=!1;B&&(I=p(x,d,g));let S=P||I;if(S)for(let M=0;M<3;M++){let E=m+M,N=x+M,V=r[E],$=r[E+3],St=r[N],Pt=r[N+3];r[l+M]=V<St?V:St,r[l+M+3]=$>Pt?$:Pt}return S}}}function G(i,e,t){let n,o,a,s,c,r,u=1/t.direction.x,f=1/t.direction.y,p=1/t.direction.z,l=t.origin.x,d=t.origin.y,h=t.origin.z,A=e[i],b=e[i+3],m=e[i+1],x=e[i+3+1],y=e[i+2],v=e[i+3+2];return u>=0?(n=(A-l)*u,o=(b-l)*u):(n=(b-l)*u,o=(A-l)*u),f>=0?(a=(m-d)*f,s=(x-d)*f):(a=(x-d)*f,s=(m-d)*f),!(n>s||a>o||((a>n||isNaN(n))&&(n=a),(s<o||isNaN(o))&&(o=s),p>=0?(c=(y-h)*p,r=(v-h)*p):(c=(v-h)*p,r=(y-h)*p),n>r||c>o)||((r<o||o!==o)&&(o=r),o<0))}function $n(i,e,t,n,o,a){let{geometry:s,_indirectBuffer:c}=i;for(let r=n,u=n+o;r<u;r++){let f=c?c[r]:r;bt(s,e,t,f,a)}}function Jn(i,e,t,n,o){let{geometry:a,_indirectBuffer:s}=i,c=1/0,r=null;for(let u=n,f=n+o;u<f;u++){let p;p=bt(a,e,t,s?s[u]:u),p&&p.distance<c&&(r=p,c=p.distance)}return r}function Qn(i,e,t,n,o,a,s){let{geometry:c}=t,{index:r}=c,u=c.attributes.position;for(let f=i,p=e+i;f<p;f++){let l;if(l=t.resolveTriangleIndex(f),C(s,l*3,r,u),s.needsUpdate=!0,n(s,l,o,a))return!0}return!1}function ti(i,e,t,n,o){F.setBuffer(i._roots[e]),Xe(0,i,t,n,o),F.clearBuffer()}function Xe(i,e,t,n,o){let{float32Array:a,uint16Array:s,uint32Array:c}=F,r=i*2;if(L(r,s)){let f=z(i,c),p=R(r,s);Yn(e,t,n,f,p,o)}else{let f=O(i);G(f,a,n)&&Xe(f,e,t,n,o);let p=k(i,c);G(p,a,n)&&Xe(p,e,t,n,o)}}var so=["x","y","z"];function ei(i,e,t,n){F.setBuffer(i._roots[e]);let o=Ge(0,i,t,n);return F.clearBuffer(),o}function Ge(i,e,t,n){let{float32Array:o,uint16Array:a,uint32Array:s}=F,c=i*2;if(L(c,a)){let u=z(i,s),f=R(c,a);return jn(e,t,n,u,f)}else{let u=ut(i,s),f=so[u],l=n.direction[f]>=0,d,h;l?(d=O(i),h=k(i,s)):(d=k(i,s),h=O(i));let b=G(d,o,n)?Ge(d,e,t,n):null;if(b){let y=b.point[f];if(l?y<=o[h+u]:y>=o[h+u+3])return b}let x=G(h,o,n)?Ge(h,e,t,n):null;return b&&x?b.distance<=x.distance?b:x:b||x||null}}import{Box3 as ro,Matrix4 as co}from"three";var le=new ro,At=new H,gt=new H,Ct=new co,ni=new U,fe=new U;function ii(i,e,t,n){F.setBuffer(i._roots[e]);let o=Ye(0,i,t,n);return F.clearBuffer(),o}function Ye(i,e,t,n,o=null){let{float32Array:a,uint16Array:s,uint32Array:c}=F,r=i*2;if(o===null&&(t.boundingBox||t.computeBoundingBox(),ni.set(t.boundingBox.min,t.boundingBox.max,n),o=ni),L(r,s)){let f=e.geometry,p=f.index,l=f.attributes.position,d=t.index,h=t.attributes.position,A=z(i,c),b=R(r,s);if(Ct.copy(n).invert(),t.boundsTree)return D(i,a,fe),fe.matrix.copy(Ct),fe.needsUpdate=!0,t.boundsTree.shapecast({intersectsBounds:x=>fe.intersectsBox(x),intersectsTriangle:x=>{x.a.applyMatrix4(n),x.b.applyMatrix4(n),x.c.applyMatrix4(n),x.needsUpdate=!0;for(let y=A*3,v=(b+A)*3;y<v;y+=3)if(C(gt,y,p,l),gt.needsUpdate=!0,x.intersectsTriangle(gt))return!0;return!1}});for(let m=A*3,x=(b+A)*3;m<x;m+=3){C(At,m,p,l),At.a.applyMatrix4(Ct),At.b.applyMatrix4(Ct),At.c.applyMatrix4(Ct),At.needsUpdate=!0;for(let y=0,v=d.count;y<v;y+=3)if(C(gt,y,d,h),gt.needsUpdate=!0,At.intersectsTriangle(gt))return!0}}else{let f=i+8,p=c[i+6];return D(f,a,le),!!(o.intersectsBox(le)&&Ye(f,e,t,n,o)||(D(p,a,le),o.intersectsBox(le)&&Ye(p,e,t,n,o)))}}import{Matrix4 as ao,Vector3 as pe}from"three";var ue=new ao,je=new U,Lt=new U,lo=new pe,fo=new pe,uo=new pe,po=new pe;function oi(i,e,t,n={},o={},a=0,s=1/0){e.boundingBox||e.computeBoundingBox(),je.set(e.boundingBox.min,e.boundingBox.max,t),je.needsUpdate=!0;let c=i.geometry,r=c.attributes.position,u=c.index,f=e.attributes.position,p=e.index,l=q.getPrimitive(),d=q.getPrimitive(),h=lo,A=fo,b=null,m=null;o&&(b=uo,m=po);let x=1/0,y=null,v=null;return ue.copy(t).invert(),Lt.matrix.copy(ue),i.shapecast({boundsTraverseOrder:g=>je.distanceToBox(g),intersectsBounds:(g,T,w)=>w<x&&w<s?(T&&(Lt.min.copy(g.min),Lt.max.copy(g.max),Lt.needsUpdate=!0),!0):!1,intersectsRange:(g,T)=>{if(e.boundsTree)return e.boundsTree.shapecast({boundsTraverseOrder:_=>Lt.distanceToBox(_),intersectsBounds:(_,B,P)=>P<x&&P<s,intersectsRange:(_,B)=>{for(let P=_,I=_+B;P<I;P++){C(d,3*P,p,f),d.a.applyMatrix4(t),d.b.applyMatrix4(t),d.c.applyMatrix4(t),d.needsUpdate=!0;for(let S=g,M=g+T;S<M;S++){C(l,3*S,u,r),l.needsUpdate=!0;let E=l.distanceToTriangle(d,h,b);if(E<x&&(A.copy(h),m&&m.copy(b),x=E,y=S,v=P),E<a)return!0}}}});{let w=j(e);for(let _=0,B=w;_<B;_++){C(d,3*_,p,f),d.a.applyMatrix4(t),d.b.applyMatrix4(t),d.c.applyMatrix4(t),d.needsUpdate=!0;for(let P=g,I=g+T;P<I;P++){C(l,3*P,u,r),l.needsUpdate=!0;let S=l.distanceToTriangle(d,h,b);if(S<x&&(A.copy(h),m&&m.copy(b),x=S,y=P,v=_),S<a)return!0}}}}}),q.releasePrimitive(l),q.releasePrimitive(d),x===1/0?null:(n.point?n.point.copy(A):n.point=A.clone(),n.distance=x,n.faceIndex=y,o&&(o.point?o.point.copy(m):o.point=m.clone(),o.point.applyMatrix4(ue),A.applyMatrix4(ue),o.distance=A.sub(o.point).length(),o.faceIndex=v),n)}function si(i,e=null){e&&Array.isArray(e)&&(e=new Set(e));let t=i.geometry,n=t.index?t.index.array:null,o=t.attributes.position,a,s,c,r,u=0,f=i._roots;for(let l=0,d=f.length;l<d;l++)a=f[l],s=new Uint32Array(a),c=new Uint16Array(a),r=new Float32Array(a),p(0,u),u+=a.byteLength;function p(l,d,h=!1){let A=l*2;if(c[A+15]===65535){let m=s[l+6],x=c[A+14],y=1/0,v=1/0,g=1/0,T=-1/0,w=-1/0,_=-1/0;for(let B=m,P=m+x;B<P;B++){let I=3*i.resolveTriangleIndex(B);for(let S=0;S<3;S++){let M=I+S;M=n?n[M]:M;let E=o.getX(M),N=o.getY(M),V=o.getZ(M);E<y&&(y=E),E>T&&(T=E),N<v&&(v=N),N>w&&(w=N),V<g&&(g=V),V>_&&(_=V)}}return r[l+0]!==y||r[l+1]!==v||r[l+2]!==g||r[l+3]!==T||r[l+4]!==w||r[l+5]!==_?(r[l+0]=y,r[l+1]=v,r[l+2]=g,r[l+3]=T,r[l+4]=w,r[l+5]=_,!0):!1}else{let m=l+8,x=s[l+6],y=m+d,v=x+d,g=h,T=!1,w=!1;e?g||(T=e.has(y),w=e.has(v),g=!T&&!w):(T=!0,w=!0);let _=g||T,B=g||w,P=!1;_&&(P=p(m,d,g));let I=!1;B&&(I=p(x,d,g));let S=P||I;if(S)for(let M=0;M<3;M++){let E=m+M,N=x+M,V=r[E],$=r[E+3],St=r[N],Pt=r[N+3];r[l+M]=V<St?V:St,r[l+M+3]=$>Pt?$:Pt}return S}}}function ri(i,e,t,n,o){F.setBuffer(i._roots[e]),Ze(0,i,t,n,o),F.clearBuffer()}function Ze(i,e,t,n,o){let{float32Array:a,uint16Array:s,uint32Array:c}=F,r=i*2;if(L(r,s)){let f=z(i,c),p=R(r,s);$n(e,t,n,f,p,o)}else{let f=O(i);G(f,a,n)&&Ze(f,e,t,n,o);let p=k(i,c);G(p,a,n)&&Ze(p,e,t,n,o)}}var mo=["x","y","z"];function ci(i,e,t,n){F.setBuffer(i._roots[e]);let o=Ke(0,i,t,n);return F.clearBuffer(),o}function Ke(i,e,t,n){let{float32Array:o,uint16Array:a,uint32Array:s}=F,c=i*2;if(L(c,a)){let u=z(i,s),f=R(c,a);return Jn(e,t,n,u,f)}else{let u=ut(i,s),f=mo[u],l=n.direction[f]>=0,d,h;l?(d=O(i),h=k(i,s)):(d=k(i,s),h=O(i));let b=G(d,o,n)?Ke(d,e,t,n):null;if(b){let y=b.point[f];if(l?y<=o[h+u]:y>=o[h+u+3])return b}let x=G(h,o,n)?Ke(h,e,t,n):null;return b&&x?b.distance<=x.distance?b:x:b||x||null}}import{Box3 as ho,Matrix4 as xo}from"three";var de=new ho,vt=new H,Tt=new H,zt=new xo,ai=new U,me=new U;function li(i,e,t,n){F.setBuffer(i._roots[e]);let o=$e(0,i,t,n);return F.clearBuffer(),o}function $e(i,e,t,n,o=null){let{float32Array:a,uint16Array:s,uint32Array:c}=F,r=i*2;if(o===null&&(t.boundingBox||t.computeBoundingBox(),ai.set(t.boundingBox.min,t.boundingBox.max,n),o=ai),L(r,s)){let f=e.geometry,p=f.index,l=f.attributes.position,d=t.index,h=t.attributes.position,A=z(i,c),b=R(r,s);if(zt.copy(n).invert(),t.boundsTree)return D(i,a,me),me.matrix.copy(zt),me.needsUpdate=!0,t.boundsTree.shapecast({intersectsBounds:x=>me.intersectsBox(x),intersectsTriangle:x=>{x.a.applyMatrix4(n),x.b.applyMatrix4(n),x.c.applyMatrix4(n),x.needsUpdate=!0;for(let y=A,v=b+A;y<v;y++)if(C(Tt,3*e.resolveTriangleIndex(y),p,l),Tt.needsUpdate=!0,x.intersectsTriangle(Tt))return!0;return!1}});for(let m=A,x=b+A;m<x;m++){let y=e.resolveTriangleIndex(m);C(vt,3*y,p,l),vt.a.applyMatrix4(zt),vt.b.applyMatrix4(zt),vt.c.applyMatrix4(zt),vt.needsUpdate=!0;for(let v=0,g=d.count;v<g;v+=3)if(C(Tt,v,d,h),Tt.needsUpdate=!0,vt.intersectsTriangle(Tt))return!0}}else{let f=i+8,p=c[i+6];return D(f,a,de),!!(o.intersectsBox(de)&&$e(f,e,t,n,o)||(D(p,a,de),o.intersectsBox(de)&&$e(p,e,t,n,o)))}}import{Matrix4 as yo,Vector3 as xe}from"three";var he=new yo,Je=new U,Rt=new U,bo=new xe,Ao=new xe,go=new xe,vo=new xe;function fi(i,e,t,n={},o={},a=0,s=1/0){e.boundingBox||e.computeBoundingBox(),Je.set(e.boundingBox.min,e.boundingBox.max,t),Je.needsUpdate=!0;let c=i.geometry,r=c.attributes.position,u=c.index,f=e.attributes.position,p=e.index,l=q.getPrimitive(),d=q.getPrimitive(),h=bo,A=Ao,b=null,m=null;o&&(b=go,m=vo);let x=1/0,y=null,v=null;return he.copy(t).invert(),Rt.matrix.copy(he),i.shapecast({boundsTraverseOrder:g=>Je.distanceToBox(g),intersectsBounds:(g,T,w)=>w<x&&w<s?(T&&(Rt.min.copy(g.min),Rt.max.copy(g.max),Rt.needsUpdate=!0),!0):!1,intersectsRange:(g,T)=>{if(e.boundsTree){let w=e.boundsTree;return w.shapecast({boundsTraverseOrder:_=>Rt.distanceToBox(_),intersectsBounds:(_,B,P)=>P<x&&P<s,intersectsRange:(_,B)=>{for(let P=_,I=_+B;P<I;P++){let S=w.resolveTriangleIndex(P);C(d,3*S,p,f),d.a.applyMatrix4(t),d.b.applyMatrix4(t),d.c.applyMatrix4(t),d.needsUpdate=!0;for(let M=g,E=g+T;M<E;M++){let N=i.resolveTriangleIndex(M);C(l,3*N,u,r),l.needsUpdate=!0;let V=l.distanceToTriangle(d,h,b);if(V<x&&(A.copy(h),m&&m.copy(b),x=V,y=M,v=P),V<a)return!0}}}})}else{let w=j(e);for(let _=0,B=w;_<B;_++){C(d,3*_,p,f),d.a.applyMatrix4(t),d.b.applyMatrix4(t),d.c.applyMatrix4(t),d.needsUpdate=!0;for(let P=g,I=g+T;P<I;P++){let S=i.resolveTriangleIndex(P);C(l,3*S,u,r),l.needsUpdate=!0;let M=l.distanceToTriangle(d,h,b);if(M<x&&(A.copy(h),m&&m.copy(b),x=M,y=P,v=_),M<a)return!0}}}}}),q.releasePrimitive(l),q.releasePrimitive(d),x===1/0?null:(n.point?n.point.copy(A):n.point=A.clone(),n.distance=x,n.faceIndex=y,o&&(o.point?o.point.copy(m):o.point=m.clone(),o.point.applyMatrix4(he),A.applyMatrix4(he),o.distance=A.sub(o.point).length(),o.faceIndex=v),n)}function ye(){return typeof SharedArrayBuffer<"u"}import{Box3 as Vt,Matrix4 as To}from"three";var Ut=new F.constructor,be=new F.constructor,it=new et(()=>new Vt),wt=new Vt,Bt=new Vt,Qe=new Vt,tn=new Vt,en=!1;function ui(i,e,t,n){if(en)throw new Error("MeshBVH: Recursive calls to bvhcast not supported.");en=!0;let o=i._roots,a=e._roots,s,c=0,r=0,u=new To().copy(t).invert();for(let f=0,p=o.length;f<p;f++){Ut.setBuffer(o[f]),r=0;let l=it.getPrimitive();D(0,Ut.float32Array,l),l.applyMatrix4(u);for(let d=0,h=a.length;d<h&&(be.setBuffer(a[f]),s=Y(0,0,t,u,n,c,r,0,0,l),be.clearBuffer(),r+=a[d].length,!s);d++);if(it.releasePrimitive(l),Ut.clearBuffer(),c+=o[f].length,s)break}return en=!1,s}function Y(i,e,t,n,o,a=0,s=0,c=0,r=0,u=null,f=!1){let p,l;f?(p=be,l=Ut):(p=Ut,l=be);let d=p.float32Array,h=p.uint32Array,A=p.uint16Array,b=l.float32Array,m=l.uint32Array,x=l.uint16Array,y=i*2,v=e*2,g=L(y,A),T=L(v,x),w=!1;if(T&&g)f?w=o(z(e,m),R(e*2,x),z(i,h),R(i*2,A),r,s+e,c,a+i):w=o(z(i,h),R(i*2,A),z(e,m),R(e*2,x),c,a+i,r,s+e);else if(T){let _=it.getPrimitive();D(e,b,_),_.applyMatrix4(t);let B=O(i),P=k(i,h);D(B,d,wt),D(P,d,Bt);let I=_.intersectsBox(wt),S=_.intersectsBox(Bt);w=I&&Y(e,B,n,t,o,s,a,r,c+1,_,!f)||S&&Y(e,P,n,t,o,s,a,r,c+1,_,!f),it.releasePrimitive(_)}else{let _=O(e),B=k(e,m);D(_,b,Qe),D(B,b,tn);let P=u.intersectsBox(Qe),I=u.intersectsBox(tn);if(P&&I)w=Y(i,_,t,n,o,a,s,c,r+1,u,f)||Y(i,B,t,n,o,a,s,c,r+1,u,f);else if(P)if(g)w=Y(i,_,t,n,o,a,s,c,r+1,u,f);else{let S=it.getPrimitive();S.copy(Qe).applyMatrix4(t);let M=O(i),E=k(i,h);D(M,d,wt),D(E,d,Bt);let N=S.intersectsBox(wt),V=S.intersectsBox(Bt);w=N&&Y(_,M,n,t,o,s,a,r,c+1,S,!f)||V&&Y(_,E,n,t,o,s,a,r,c+1,S,!f),it.releasePrimitive(S)}else if(I)if(g)w=Y(i,B,t,n,o,a,s,c,r+1,u,f);else{let S=it.getPrimitive();S.copy(tn).applyMatrix4(t);let M=O(i),E=k(i,h);D(M,d,wt),D(E,d,Bt);let N=S.intersectsBox(wt),V=S.intersectsBox(Bt);w=N&&Y(B,M,n,t,o,s,a,r,c+1,S,!f)||V&&Y(B,E,n,t,o,s,a,r,c+1,S,!f),it.releasePrimitive(S)}}return w}var Ae=new U,di=new mi,Bo={strategy:0,maxDepth:40,maxLeafTris:10,useSharedArrayBuffer:!1,setBoundingBox:!0,onProgress:null,indirect:!1,verbose:!0},st=class i{static serialize(e,t={}){t={cloneBuffers:!0,...t};let n=e.geometry,o=e._roots,a=e._indirectBuffer,s=n.getIndex(),c;return t.cloneBuffers?c={roots:o.map(r=>r.slice()),index:s?s.array.slice():null,indirectBuffer:a?a.slice():null}:c={roots:o,index:s?s.array:null,indirectBuffer:a},c}static deserialize(e,t,n={}){n={setIndex:!0,indirect:!!e.indirectBuffer,...n};let{index:o,roots:a,indirectBuffer:s}=e,c=new i(t,{...n,[Gt]:!0});if(c._roots=a,c._indirectBuffer=s||null,n.setIndex){let r=t.getIndex();if(r===null){let u=new wo(e.index,1,!1);t.setIndex(u)}else r.array!==o&&(r.array.set(o),r.needsUpdate=!0)}return c}get indirect(){return!!this._indirectBuffer}constructor(e,t={}){if(e.isBufferGeometry){if(e.index&&e.index.isInterleavedBufferAttribute)throw new Error("MeshBVH: InterleavedBufferAttribute is not supported for the index attribute.")}else throw new Error("MeshBVH: Only BufferGeometries are supported.");if(t=Object.assign({...Bo,[Gt]:!1},t),t.useSharedArrayBuffer&&!ye())throw new Error("MeshBVH: SharedArrayBuffer is not available.");this.geometry=e,this._roots=null,this._indirectBuffer=null,t[Gt]||(Cn(this,t),!e.boundingBox&&t.setBoundingBox&&(e.boundingBox=this.getBoundingBox(new mi)));let{_indirectBuffer:n}=this;this.resolveTriangleIndex=t.indirect?o=>n[o]:o=>o}refit(e=null){return(this.indirect?si:Kn)(this,e)}traverse(e,t=0){let n=this._roots[t],o=new Uint32Array(n),a=new Uint16Array(n);s(0);function s(c,r=0){let u=c*2,f=a[u+15]===65535;if(f){let p=o[c+6],l=a[u+14];e(r,f,new Float32Array(n,c*4,6),p,l)}else{let p=c+32/4,l=o[c+6],d=o[c+7];e(r,f,new Float32Array(n,c*4,6),d)||(s(p,r+1),s(l,r+1))}}}raycast(e,t=pi){let n=this._roots,o=this.geometry,a=[],s=t.isMaterial,c=Array.isArray(t),r=o.groups,u=s?t.side:t,f=this.indirect?ri:ti;for(let p=0,l=n.length;p<l;p++){let d=c?t[r[p].materialIndex].side:u,h=a.length;if(f(this,p,d,e,a),c){let A=r[p].materialIndex;for(let b=h,m=a.length;b<m;b++)a[b].face.materialIndex=A}}return a}raycastFirst(e,t=pi){let n=this._roots,o=this.geometry,a=t.isMaterial,s=Array.isArray(t),c=null,r=o.groups,u=a?t.side:t,f=this.indirect?ci:ei;for(let p=0,l=n.length;p<l;p++){let d=s?t[r[p].materialIndex].side:u,h=f(this,p,d,e);h!=null&&(c==null||h.distance<c.distance)&&(c=h,s&&(h.face.materialIndex=r[p].materialIndex))}return c}intersectsGeometry(e,t){let n=!1,o=this._roots,a=this.indirect?li:ii;for(let s=0,c=o.length;s<c&&(n=a(this,s,e,t),!n);s++);return n}shapecast(e){let t=q.getPrimitive(),n=this.indirect?Qn:Zn,{boundsTraverseOrder:o,intersectsBounds:a,intersectsRange:s,intersectsTriangle:c}=e;if(s&&c){let p=s;s=(l,d,h,A,b)=>p(l,d,h,A,b)?!0:n(l,d,this,c,h,A,t)}else s||(c?s=(p,l,d,h)=>n(p,l,this,c,d,h,t):s=(p,l,d)=>d);let r=!1,u=0,f=this._roots;for(let p=0,l=f.length;p<l;p++){let d=f[p];if(r=Un(this,p,a,s,o,u),r)break;u+=d.byteLength}return q.releasePrimitive(t),r}bvhcast(e,t,n){let{intersectsRanges:o,intersectsTriangles:a}=n,s=q.getPrimitive(),c=this.geometry.index,r=this.geometry.attributes.position,u=this.indirect?h=>{let A=this.resolveTriangleIndex(h);C(s,A*3,c,r)}:h=>{C(s,h*3,c,r)},f=q.getPrimitive(),p=e.geometry.index,l=e.geometry.attributes.position,d=e.indirect?h=>{let A=e.resolveTriangleIndex(h);C(f,A*3,p,l)}:h=>{C(f,h*3,p,l)};if(a){let h=(A,b,m,x,y,v,g,T)=>{for(let w=m,_=m+x;w<_;w++){d(w),f.a.applyMatrix4(t),f.b.applyMatrix4(t),f.c.applyMatrix4(t),f.needsUpdate=!0;for(let B=A,P=A+b;B<P;B++)if(u(B),s.needsUpdate=!0,a(s,f,B,w,y,v,g,T))return!0}return!1};if(o){let A=o;o=function(b,m,x,y,v,g,T,w){return A(b,m,x,y,v,g,T,w)?!0:h(b,m,x,y,v,g,T,w)}}else o=h}return ui(this,e,t,o)}intersectsBox(e,t){return Ae.set(e.min,e.max,t),Ae.needsUpdate=!0,this.shapecast({intersectsBounds:n=>Ae.intersectsBox(n),intersectsTriangle:n=>Ae.intersectsTriangle(n)})}intersectsSphere(e){return this.shapecast({intersectsBounds:t=>e.intersectsBox(t),intersectsTriangle:t=>t.intersectsSphere(e)})}closestPointToGeometry(e,t,n={},o={},a=0,s=1/0){return(this.indirect?fi:oi)(this,e,t,n,o,a,s)}closestPointToPoint(e,t={},n=0,o=1/0){return kn(this,e,t,n,o)}getBoundingBox(e){return e.makeEmpty(),this._roots.forEach(n=>{D(0,new Float32Array(n),di),e.union(di)}),e}};import{LineBasicMaterial as _o,BufferAttribute as hi,Box3 as So,Group as Po,MeshBasicMaterial as Io,Object3D as Mo,BufferGeometry as Eo}from"three";var xi=new So,nn=class extends Mo{get isMesh(){return!this.displayEdges}get isLineSegments(){return this.displayEdges}get isLine(){return this.displayEdges}constructor(e,t,n=10,o=0){super(),this.material=t,this.geometry=new Eo,this.name="MeshBVHRootHelper",this.depth=n,this.displayParents=!1,this.bvh=e,this.displayEdges=!0,this._group=o}raycast(){}update(){let e=this.geometry,t=this.bvh,n=this._group;if(e.dispose(),this.visible=!1,t){let o=this.depth-1,a=this.displayParents,s=0;t.traverse((l,d)=>{if(l>=o||d)return s++,!0;a&&s++},n);let c=0,r=new Float32Array(24*s);t.traverse((l,d,h)=>{let A=l>=o||d;if(A||a){D(0,h,xi);let{min:b,max:m}=xi;for(let x=-1;x<=1;x+=2){let y=x<0?b.x:m.x;for(let v=-1;v<=1;v+=2){let g=v<0?b.y:m.y;for(let T=-1;T<=1;T+=2){let w=T<0?b.z:m.z;r[c+0]=y,r[c+1]=g,r[c+2]=w,c+=3}}}return A}},n);let u,f;this.displayEdges?f=new Uint8Array([0,4,1,5,2,6,3,7,0,2,1,3,4,6,5,7,0,1,2,3,4,5,6,7]):f=new Uint8Array([0,1,2,2,1,3,4,6,5,6,7,5,1,4,5,0,4,1,2,3,6,3,7,6,0,2,4,2,6,4,1,5,3,3,5,7]),r.length>65535?u=new Uint32Array(f.length*s):u=new Uint16Array(f.length*s);let p=f.length;for(let l=0;l<s;l++){let d=l*8,h=l*p;for(let A=0;A<p;A++)u[h+A]=d+f[A]}e.setIndex(new hi(u,1,!1)),e.setAttribute("position",new hi(r,3,!1)),this.visible=!0}}},on=class i extends Po{get color(){return this.edgeMaterial.color}get opacity(){return this.edgeMaterial.opacity}set opacity(e){this.edgeMaterial.opacity=e,this.meshMaterial.opacity=e}constructor(e=null,t=null,n=10){e instanceof st&&(n=t||10,t=e,e=null),typeof t=="number"&&(n=t,t=null),super(),this.name="MeshBVHHelper",this.depth=n,this.mesh=e,this.bvh=t,this.displayParents=!1,this.displayEdges=!0,this._roots=[];let o=new _o({color:65416,transparent:!0,opacity:.3,depthWrite:!1}),a=new Io({color:65416,transparent:!0,opacity:.3,depthWrite:!1});a.color=o.color,this.edgeMaterial=o,this.meshMaterial=a,this.update()}update(){let e=this.bvh||this.mesh.geometry.boundsTree,t=e?e._roots.length:0;for(;this._roots.length>t;){let n=this._roots.pop();n.geometry.dispose(),this.remove(n)}for(let n=0;n<t;n++){let{depth:o,edgeMaterial:a,meshMaterial:s,displayParents:c,displayEdges:r}=this;if(n>=this._roots.length){let f=new nn(e,a,o,n);this.add(f),this._roots.push(f)}let u=this._roots[n];u.bvh=e,u.depth=o,u.displayParents=c,u.displayEdges=r,u.material=r?a:s,u.update()}}updateMatrixWorld(...e){let t=this.mesh,n=this.parent;t!==null&&(t.updateWorldMatrix(!0,!1),n?this.matrix.copy(n.matrixWorld).invert().multiply(t.matrixWorld):this.matrix.copy(t.matrixWorld),this.matrix.decompose(this.position,this.quaternion,this.scale)),super.updateMatrixWorld(...e)}copy(e){this.depth=e.depth,this.mesh=e.mesh,this.bvh=e.bvh,this.opacity=e.opacity,this.color.copy(e.color)}clone(){return new i(this.mesh,this.bvh,this.depth)}dispose(){this.edgeMaterial.dispose(),this.meshMaterial.dispose();let e=this.children;for(let t=0,n=e.length;t<n;t++)e[t].geometry.dispose()}};import{Box3 as sn,Vector3 as Do}from"three";var kt=new sn,yi=new sn,_t=new Do;function bi(i){switch(typeof i){case"number":return 8;case"string":return i.length*2;case"boolean":return 4;default:return 0}}function Fo(i){return/(Uint|Int|Float)(8|16|32)Array/.test(i.constructor.name)}function No(i,e){let t={nodeCount:0,leafNodeCount:0,depth:{min:1/0,max:-1/0},tris:{min:1/0,max:-1/0},splits:[0,0,0],surfaceAreaScore:0};return i.traverse((n,o,a,s,c)=>{let r=a[3]-a[0],u=a[4]-a[1],f=a[5]-a[2],p=2*(r*u+u*f+f*r);t.nodeCount++,o?(t.leafNodeCount++,t.depth.min=Math.min(n,t.depth.min),t.depth.max=Math.max(n,t.depth.max),t.tris.min=Math.min(c,t.tris.min),t.tris.max=Math.max(c,t.tris.max),t.surfaceAreaScore+=p*1.25*c):(t.splits[s]++,t.surfaceAreaScore+=p*1)},e),t.tris.min===1/0&&(t.tris.min=0,t.tris.max=0),t.depth.min===1/0&&(t.depth.min=0,t.depth.max=0),t}function Co(i){return i._roots.map((e,t)=>No(i,t))}function Lo(i){let e=new Set,t=[i],n=0;for(;t.length;){let o=t.pop();if(!e.has(o)){e.add(o);for(let a in o){if(!o.hasOwnProperty(a))continue;n+=bi(a);let s=o[a];s&&(typeof s=="object"||typeof s=="function")?Fo(s)||ye()&&s instanceof SharedArrayBuffer||s instanceof ArrayBuffer?n+=s.byteLength:t.push(s):n+=bi(s)}}}return n}function zo(i){let e=i.geometry,t=[],n=e.index,o=e.getAttribute("position"),a=!0;return i.traverse((s,c,r,u,f)=>{let p={depth:s,isLeaf:c,boundingData:r,offset:u,count:f};t[s]=p,D(0,r,kt);let l=t[s-1];if(c)for(let d=u,h=u+f;d<h;d++){let A=i.resolveTriangleIndex(d),b=3*A,m=3*A+1,x=3*A+2;n&&(b=n.getX(b),m=n.getX(m),x=n.getX(x));let y;_t.fromBufferAttribute(o,b),y=kt.containsPoint(_t),_t.fromBufferAttribute(o,m),y=y&&kt.containsPoint(_t),_t.fromBufferAttribute(o,x),y=y&&kt.containsPoint(_t),console.assert(y,"Leaf bounds does not fully contain triangle."),a=a&&y}if(l){D(0,r,yi);let d=yi.containsBox(kt);console.assert(d,"Parent bounds does not fully contain child."),a=a&&d}}),a}function Ro(i){let e=[];return i.traverse((t,n,o,a,s)=>{let c={bounds:D(0,o,new sn)};n?(c.count=s,c.offset=a):(c.left=null,c.right=null),e[t]=c;let r=e[t-1];r&&(r.left===null?r.left=c:r.right=c)}),e[0]}import{Ray as Uo,Matrix4 as Vo,Mesh as ko}from"three";function rn(i,e,t){return i===null||(i.point.applyMatrix4(e.matrixWorld),i.distance=i.point.distanceTo(t.ray.origin),i.object=e,i.distance<t.near||i.distance>t.far)?null:i}var cn=new Uo,Ai=new Vo,Oo=ko.prototype.raycast;function Ho(i,e){if(this.geometry.boundsTree){if(this.material===void 0)return;Ai.copy(this.matrixWorld).invert(),cn.copy(i.ray).applyMatrix4(Ai);let t=this.geometry.boundsTree;if(i.firstHitOnly===!0){let n=rn(t.raycastFirst(cn,this.material),this,i);n&&e.push(n)}else{let n=t.raycast(cn,this.material);for(let o=0,a=n.length;o<a;o++){let s=rn(n[o],this,i);s&&e.push(s)}}}else Oo.call(this,i,e)}function qo(i){return this.boundsTree=new st(this,i),this.boundsTree}function Wo(){this.boundsTree=null}import{DataTexture as _i,FloatType as ts,UnsignedIntType as es,RGBAFormat as ns,RGIntegerFormat as is,NearestFilter as _e,BufferAttribute as os}from"three";import{DataTexture as Xo,FloatType as ge,IntType as ve,UnsignedIntType as Te,ByteType as gi,UnsignedByteType as vi,ShortType as Go,UnsignedShortType as Yo,RedFormat as jo,RGFormat as Zo,RGBAFormat as an,RedIntegerFormat as Ko,RGIntegerFormat as $o,RGBAIntegerFormat as ln,NearestFilter as Ti}from"three";function Jo(i){switch(i){case 1:return"R";case 2:return"RG";case 3:return"RGBA";case 4:return"RGBA"}throw new Error}function Qo(i){switch(i){case 1:return jo;case 2:return Zo;case 3:return an;case 4:return an}}function wi(i){switch(i){case 1:return Ko;case 2:return $o;case 3:return ln;case 4:return ln}}var Ot=class extends Xo{constructor(){super(),this.minFilter=Ti,this.magFilter=Ti,this.generateMipmaps=!1,this.overrideItemSize=null,this._forcedType=null}updateFrom(e){let t=this.overrideItemSize,n=e.itemSize,o=e.count;if(t!==null){if(n*o%t!==0)throw new Error("VertexAttributeTexture: overrideItemSize must divide evenly into buffer length.");e.itemSize=t,e.count=o*n/t}let a=e.itemSize,s=e.count,c=e.normalized,r=e.array.constructor,u=r.BYTES_PER_ELEMENT,f=this._forcedType,p=a;if(f===null)switch(r){case Float32Array:f=ge;break;case Uint8Array:case Uint16Array:case Uint32Array:f=Te;break;case Int8Array:case Int16Array:case Int32Array:f=ve;break}let l,d,h,A,b=Jo(a);switch(f){case ge:h=1,d=Qo(a),c&&u===1?(A=r,b+="8",r===Uint8Array?l=vi:(l=gi,b+="_SNORM")):(A=Float32Array,b+="32F",l=ge);break;case ve:b+=u*8+"I",h=c?Math.pow(2,r.BYTES_PER_ELEMENT*8-1):1,d=wi(a),u===1?(A=Int8Array,l=gi):u===2?(A=Int16Array,l=Go):(A=Int32Array,l=ve);break;case Te:b+=u*8+"UI",h=c?Math.pow(2,r.BYTES_PER_ELEMENT*8-1):1,d=wi(a),u===1?(A=Uint8Array,l=vi):u===2?(A=Uint16Array,l=Yo):(A=Uint32Array,l=Te);break}p===3&&(d===an||d===ln)&&(p=4);let m=Math.ceil(Math.sqrt(s))||1,x=p*m*m,y=new A(x),v=e.normalized;e.normalized=!1;for(let g=0;g<s;g++){let T=p*g;y[T]=e.getX(g)/h,a>=2&&(y[T+1]=e.getY(g)/h),a>=3&&(y[T+2]=e.getZ(g)/h,p===4&&(y[T+3]=1)),a>=4&&(y[T+3]=e.getW(g)/h)}e.normalized=v,this.internalFormat=b,this.format=d,this.type=l,this.image.width=m,this.image.height=m,this.image.data=y,this.needsUpdate=!0,this.dispose(),e.itemSize=n,e.count=o}},we=class extends Ot{constructor(){super(),this._forcedType=Te}},Bi=class extends Ot{constructor(){super(),this._forcedType=ve}},Be=class extends Ot{constructor(){super(),this._forcedType=ge}};var Si=class{constructor(){this.index=new we,this.position=new Be,this.bvhBounds=new _i,this.bvhContents=new _i,this._cachedIndexAttr=null,this.index.overrideItemSize=3}updateFrom(e){let{geometry:t}=e;if(rs(e,this.bvhBounds,this.bvhContents),this.position.updateFrom(t.attributes.position),e.indirect){let n=e._indirectBuffer;if(this._cachedIndexAttr===null||this._cachedIndexAttr.count!==n.length)if(t.index)this._cachedIndexAttr=t.index.clone();else{let o=De(Ee(t));this._cachedIndexAttr=new os(o,1,!1)}ss(t,n,this._cachedIndexAttr),this.index.updateFrom(this._cachedIndexAttr)}else this.index.updateFrom(t.index)}dispose(){let{index:e,position:t,bvhBounds:n,bvhContents:o}=this;e&&e.dispose(),t&&t.dispose(),n&&n.dispose(),o&&o.dispose()}};function ss(i,e,t){let n=t.array,o=i.index?i.index.array:null;for(let a=0,s=e.length;a<s;a++){let c=3*a,r=3*e[a];for(let u=0;u<3;u++)n[c+u]=o?o[r+u]:r+u}}function rs(i,e,t){let n=i._roots;if(n.length!==1)throw new Error("MeshBVHUniformStruct: Multi-root BVHs not supported.");let o=n[0],a=new Uint16Array(o),s=new Uint32Array(o),c=new Float32Array(o),r=o.byteLength/32,u=2*Math.ceil(Math.sqrt(r/2)),f=new Float32Array(4*u*u),p=Math.ceil(Math.sqrt(r)),l=new Uint32Array(2*p*p);for(let d=0;d<r;d++){let h=d*32/4,A=h*2,b=h;for(let m=0;m<3;m++)f[8*d+0+m]=c[b+0+m],f[8*d+4+m]=c[b+3+m];if(L(A,a)){let m=R(A,a),x=z(h,s),y=4294901760|m;l[d*2+0]=y,l[d*2+1]=x}else{let m=4*k(h,s)/32,x=ut(h,s);l[d*2+0]=x,l[d*2+1]=m}}e.image.data=f,e.image.width=u,e.image.height=u,e.format=ns,e.type=ts,e.internalFormat="RGBA32F",e.minFilter=_e,e.magFilter=_e,e.generateMipmaps=!1,e.needsUpdate=!0,e.dispose(),t.image.data=l,t.image.width=p,t.image.height=p,t.format=is,t.type=es,t.internalFormat="RG32UI",t.minFilter=_e,t.magFilter=_e,t.generateMipmaps=!1,t.needsUpdate=!0,t.dispose()}import{BufferAttribute as dn,BufferGeometry as Ie,Vector3 as Wt,Vector4 as mn,Matrix4 as hn,Matrix3 as cs}from"three";var rt=new Wt,ct=new Wt,at=new Wt,Pi=new mn,Se=new Wt,fn=new Wt,Ii=new mn,Mi=new mn,Pe=new hn,Ei=new hn;function Ht(i,e){if(!i&&!e)return;let t=i.count===e.count,n=i.normalized===e.normalized,o=i.array.constructor===e.array.constructor,a=i.itemSize===e.itemSize;if(!t||!n||!o||!a)throw new Error}function qt(i,e=null){let t=i.array.constructor,n=i.normalized,o=i.itemSize,a=e===null?i.count:e;return new dn(new t(o*a),o,n)}function Ni(i,e,t=0){if(i.isInterleavedBufferAttribute){let n=i.itemSize;for(let o=0,a=i.count;o<a;o++){let s=o+t;e.setX(s,i.getX(o)),n>=2&&e.setY(s,i.getY(o)),n>=3&&e.setZ(s,i.getZ(o)),n>=4&&e.setW(s,i.getW(o))}}else{let n=e.array,o=n.constructor,a=n.BYTES_PER_ELEMENT*i.itemSize*t;new o(n.buffer,a,i.array.length).set(i.array)}}function as(i,e,t){let n=i.elements,o=e.elements;for(let a=0,s=o.length;a<s;a++)n[a]+=o[a]*t}function Di(i,e,t){let n=i.skeleton,o=i.geometry,a=n.bones,s=n.boneInverses;Ii.fromBufferAttribute(o.attributes.skinIndex,e),Mi.fromBufferAttribute(o.attributes.skinWeight,e),Pe.elements.fill(0);for(let c=0;c<4;c++){let r=Mi.getComponent(c);if(r!==0){let u=Ii.getComponent(c);Ei.multiplyMatrices(a[u].matrixWorld,s[u]),as(Pe,Ei,r)}}return Pe.multiply(i.bindMatrix).premultiply(i.bindMatrixInverse),t.transformDirection(Pe),t}function un(i,e,t,n,o){Se.set(0,0,0);for(let a=0,s=i.length;a<s;a++){let c=e[a],r=i[a];c!==0&&(fn.fromBufferAttribute(r,n),t?Se.addScaledVector(fn,c):Se.addScaledVector(fn.sub(o),c))}o.add(Se)}function ls(i,e={useGroups:!1,updateIndex:!1,skipAttributes:[]},t=new Ie){let n=i[0].index!==null,{useGroups:o=!1,updateIndex:a=!1,skipAttributes:s=[]}=e,c=new Set(Object.keys(i[0].attributes)),r={},u=0;t.clearGroups();for(let f=0;f<i.length;++f){let p=i[f],l=0;if(n!==(p.index!==null))throw new Error("StaticGeometryGenerator: All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.");for(let d in p.attributes){if(!c.has(d))throw new Error('StaticGeometryGenerator: All geometries must have compatible attributes; make sure "'+d+'" attribute exists among all geometries, or in none of them.');r[d]===void 0&&(r[d]=[]),r[d].push(p.attributes[d]),l++}if(l!==c.size)throw new Error("StaticGeometryGenerator: Make sure all geometries have the same number of attributes.");if(o){let d;if(n)d=p.index.count;else if(p.attributes.position!==void 0)d=p.attributes.position.count;else throw new Error("StaticGeometryGenerator: The geometry must have either an index or a position attribute");t.addGroup(u,d,f),u+=d}}if(n){let f=!1;if(!t.index){let p=0;for(let l=0;l<i.length;++l)p+=i[l].index.count;t.setIndex(new dn(new Uint32Array(p),1,!1)),f=!0}if(a||f){let p=t.index,l=0,d=0;for(let h=0;h<i.length;++h){let A=i[h],b=A.index;if(s[h]!==!0)for(let m=0;m<b.count;++m)p.setX(l,b.getX(m)+d),l++;d+=A.attributes.position.count}}}for(let f in r){let p=r[f];if(!(f in t.attributes)){let h=0;for(let A in p)h+=p[A].count;t.setAttribute(f,qt(r[f][0],h))}let l=t.attributes[f],d=0;for(let h=0,A=p.length;h<A;h++){let b=p[h];s[h]!==!0&&Ni(b,l,d),d+=b.count}}return t}function fs(i,e){if(i===null||e===null)return i===e;if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function us(i){let{index:e,attributes:t}=i;if(e)for(let n=0,o=e.count;n<o;n+=3){let a=e.getX(n),s=e.getX(n+2);e.setX(n,s),e.setX(n+2,a)}else for(let n in t){let o=t[n],a=o.itemSize;for(let s=0,c=o.count;s<c;s+=3)for(let r=0;r<a;r++){let u=o.getComponent(s,r),f=o.getComponent(s+2,r);o.setComponent(s,r,f),o.setComponent(s+2,r,u)}}return i}var pn=class{constructor(e){this.matrixWorld=new hn,this.geometryHash=null,this.boneMatrices=null,this.primitiveCount=-1,this.mesh=e,this.update()}update(){let e=this.mesh,t=e.geometry,n=e.skeleton,o=(t.index?t.index.count:t.attributes.position.count)/3;if(this.matrixWorld.copy(e.matrixWorld),this.geometryHash=t.attributes.position.version,this.primitiveCount=o,n){n.boneTexture||n.computeBoneTexture(),n.update();let a=n.boneMatrices;!this.boneMatrices||this.boneMatrices.length!==a.length?this.boneMatrices=a.slice():this.boneMatrices.set(a)}else this.boneMatrices=null}didChange(){let e=this.mesh,t=e.geometry,n=(t.index?t.index.count:t.attributes.position.count)/3;return!(this.matrixWorld.equals(e.matrixWorld)&&this.geometryHash===t.attributes.position.version&&fs(e.skeleton&&e.skeleton.boneMatrices||null,this.boneMatrices)&&this.primitiveCount===n)}},Fi=class{constructor(e){Array.isArray(e)||(e=[e]);let t=[];e.forEach(n=>{n.traverseVisible(o=>{o.isMesh&&t.push(o)})}),this.meshes=t,this.useGroups=!0,this.applyWorldTransforms=!0,this.attributes=["position","normal","color","tangent","uv","uv2"],this._intermediateGeometry=new Array(t.length).fill().map(()=>new Ie),this._diffMap=new WeakMap}getMaterials(){let e=[];return this.meshes.forEach(t=>{Array.isArray(t.material)?e.push(...t.material):e.push(t.material)}),e}generate(e=new Ie){let t=[],{meshes:n,useGroups:o,_intermediateGeometry:a,_diffMap:s}=this;for(let c=0,r=n.length;c<r;c++){let u=n[c],f=a[c],p=s.get(u);!p||p.didChange(u)?(this._convertToStaticGeometry(u,f),t.push(!1),p?p.update():s.set(u,new pn(u))):t.push(!0)}if(a.length===0){e.setIndex(null);let c=e.attributes;for(let r in c)e.deleteAttribute(r);for(let r in this.attributes)e.setAttribute(this.attributes[r],new dn(new Float32Array(0),4,!1))}else ls(a,{useGroups:o,skipAttributes:t},e);for(let c in e.attributes)e.attributes[c].needsUpdate=!0;return e}_convertToStaticGeometry(e,t=new Ie){let n=e.geometry,o=this.applyWorldTransforms,a=this.attributes.includes("normal"),s=this.attributes.includes("tangent"),c=n.attributes,r=t.attributes;!t.index&&n.index&&(t.index=n.index.clone()),r.position||t.setAttribute("position",qt(c.position)),a&&!r.normal&&c.normal&&t.setAttribute("normal",qt(c.normal)),s&&!r.tangent&&c.tangent&&t.setAttribute("tangent",qt(c.tangent)),Ht(n.index,t.index),Ht(c.position,r.position),a&&Ht(c.normal,r.normal),s&&Ht(c.tangent,r.tangent);let u=c.position,f=a?c.normal:null,p=s?c.tangent:null,l=n.morphAttributes.position,d=n.morphAttributes.normal,h=n.morphAttributes.tangent,A=n.morphTargetsRelative,b=e.morphTargetInfluences,m=new cs;m.getNormalMatrix(e.matrixWorld),n.index&&t.index.array.set(n.index.array);for(let x=0,y=c.position.count;x<y;x++)rt.fromBufferAttribute(u,x),f&&ct.fromBufferAttribute(f,x),p&&(Pi.fromBufferAttribute(p,x),at.fromBufferAttribute(p,x)),b&&(l&&un(l,b,A,x,rt),d&&un(d,b,A,x,ct),h&&un(h,b,A,x,at)),e.isSkinnedMesh&&(e.applyBoneTransform(x,rt),f&&Di(e,x,ct),p&&Di(e,x,at)),o&&rt.applyMatrix4(e.matrixWorld),r.position.setXYZ(x,rt.x,rt.y,rt.z),f&&(o&&ct.applyNormalMatrix(m),r.normal.setXYZ(x,ct.x,ct.y,ct.z)),p&&(o&&at.transformDirection(e.matrixWorld),r.tangent.setXYZW(x,at.x,at.y,at.z,Pi.w));for(let x in this.attributes){let y=this.attributes[x];y==="position"||y==="tangent"||y==="normal"||!(y in c)||(r[y]||t.setAttribute(y,qt(c[y])),Ht(c[y],r[y]),Ni(c[y],r[y]))}return e.matrixWorld.determinant()<0&&us(t),t}};var gn={};Li(gn,{bvh_distance_functions:()=>yn,bvh_ray_functions:()=>bn,bvh_struct_definitions:()=>An,common_functions:()=>xn});var xn=`

// A stack of uint32 indices can can store the indices for
// a perfectly balanced tree with a depth up to 31. Lower stack
// depth gets higher performance.
//
// However not all trees are balanced. Best value to set this to
// is the trees max depth.
#ifndef BVH_STACK_DEPTH
#define BVH_STACK_DEPTH 60
#endif

#ifndef INFINITY
#define INFINITY 1e20
#endif

// Utilities
uvec4 uTexelFetch1D( usampler2D tex, uint index ) {

	uint width = uint( textureSize( tex, 0 ).x );
	uvec2 uv;
	uv.x = index % width;
	uv.y = index / width;

	return texelFetch( tex, ivec2( uv ), 0 );

}

ivec4 iTexelFetch1D( isampler2D tex, uint index ) {

	uint width = uint( textureSize( tex, 0 ).x );
	uvec2 uv;
	uv.x = index % width;
	uv.y = index / width;

	return texelFetch( tex, ivec2( uv ), 0 );

}

vec4 texelFetch1D( sampler2D tex, uint index ) {

	uint width = uint( textureSize( tex, 0 ).x );
	uvec2 uv;
	uv.x = index % width;
	uv.y = index / width;

	return texelFetch( tex, ivec2( uv ), 0 );

}

vec4 textureSampleBarycoord( sampler2D tex, vec3 barycoord, uvec3 faceIndices ) {

	return
		barycoord.x * texelFetch1D( tex, faceIndices.x ) +
		barycoord.y * texelFetch1D( tex, faceIndices.y ) +
		barycoord.z * texelFetch1D( tex, faceIndices.z );

}

void ndcToCameraRay(
	vec2 coord, mat4 cameraWorld, mat4 invProjectionMatrix,
	out vec3 rayOrigin, out vec3 rayDirection
) {

	// get camera look direction and near plane for camera clipping
	vec4 lookDirection = cameraWorld * vec4( 0.0, 0.0, - 1.0, 0.0 );
	vec4 nearVector = invProjectionMatrix * vec4( 0.0, 0.0, - 1.0, 1.0 );
	float near = abs( nearVector.z / nearVector.w );

	// get the camera direction and position from camera matrices
	vec4 origin = cameraWorld * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec4 direction = invProjectionMatrix * vec4( coord, 0.5, 1.0 );
	direction /= direction.w;
	direction = cameraWorld * direction - origin;

	// slide the origin along the ray until it sits at the near clip plane position
	origin.xyz += direction.xyz * near / dot( direction, lookDirection );

	rayOrigin = origin.xyz;
	rayDirection = direction.xyz;

}
`;var yn=`

float dot2( vec3 v ) {

	return dot( v, v );

}

// https://www.shadertoy.com/view/ttfGWl
vec3 closestPointToTriangle( vec3 p, vec3 v0, vec3 v1, vec3 v2, out vec3 barycoord ) {

    vec3 v10 = v1 - v0;
    vec3 v21 = v2 - v1;
    vec3 v02 = v0 - v2;

	vec3 p0 = p - v0;
	vec3 p1 = p - v1;
	vec3 p2 = p - v2;

    vec3 nor = cross( v10, v02 );

    // method 2, in barycentric space
    vec3  q = cross( nor, p0 );
    float d = 1.0 / dot2( nor );
    float u = d * dot( q, v02 );
    float v = d * dot( q, v10 );
    float w = 1.0 - u - v;

	if( u < 0.0 ) {

		w = clamp( dot( p2, v02 ) / dot2( v02 ), 0.0, 1.0 );
		u = 0.0;
		v = 1.0 - w;

	} else if( v < 0.0 ) {

		u = clamp( dot( p0, v10 ) / dot2( v10 ), 0.0, 1.0 );
		v = 0.0;
		w = 1.0 - u;

	} else if( w < 0.0 ) {

		v = clamp( dot( p1, v21 ) / dot2( v21 ), 0.0, 1.0 );
		w = 0.0;
		u = 1.0-v;

	}

	barycoord = vec3( u, v, w );
    return u * v1 + v * v2 + w * v0;

}

float distanceToTriangles(
	// geometry info and triangle range
	sampler2D positionAttr, usampler2D indexAttr, uint offset, uint count,

	// point and cut off range
	vec3 point, float closestDistanceSquared,

	// outputs
	inout uvec4 faceIndices, inout vec3 faceNormal, inout vec3 barycoord, inout float side, inout vec3 outPoint
) {

	bool found = false;
	vec3 localBarycoord;
	for ( uint i = offset, l = offset + count; i < l; i ++ ) {

		uvec3 indices = uTexelFetch1D( indexAttr, i ).xyz;
		vec3 a = texelFetch1D( positionAttr, indices.x ).rgb;
		vec3 b = texelFetch1D( positionAttr, indices.y ).rgb;
		vec3 c = texelFetch1D( positionAttr, indices.z ).rgb;

		// get the closest point and barycoord
		vec3 closestPoint = closestPointToTriangle( point, a, b, c, localBarycoord );
		vec3 delta = point - closestPoint;
		float sqDist = dot2( delta );
		if ( sqDist < closestDistanceSquared ) {

			// set the output results
			closestDistanceSquared = sqDist;
			faceIndices = uvec4( indices.xyz, i );
			faceNormal = normalize( cross( a - b, b - c ) );
			barycoord = localBarycoord;
			outPoint = closestPoint;
			side = sign( dot( faceNormal, delta ) );

		}

	}

	return closestDistanceSquared;

}

float distanceSqToBounds( vec3 point, vec3 boundsMin, vec3 boundsMax ) {

	vec3 clampedPoint = clamp( point, boundsMin, boundsMax );
	vec3 delta = point - clampedPoint;
	return dot( delta, delta );

}

float distanceSqToBVHNodeBoundsPoint( vec3 point, sampler2D bvhBounds, uint currNodeIndex ) {

	uint cni2 = currNodeIndex * 2u;
	vec3 boundsMin = texelFetch1D( bvhBounds, cni2 ).xyz;
	vec3 boundsMax = texelFetch1D( bvhBounds, cni2 + 1u ).xyz;
	return distanceSqToBounds( point, boundsMin, boundsMax );

}

// use a macro to hide the fact that we need to expand the struct into separate fields
#define	bvhClosestPointToPoint(		bvh,		point, faceIndices, faceNormal, barycoord, side, outPoint	)	_bvhClosestPointToPoint(		bvh.position, bvh.index, bvh.bvhBounds, bvh.bvhContents,		point, faceIndices, faceNormal, barycoord, side, outPoint	)

float _bvhClosestPointToPoint(
	// bvh info
	sampler2D bvh_position, usampler2D bvh_index, sampler2D bvh_bvhBounds, usampler2D bvh_bvhContents,

	// point to check
	vec3 point,

	// output variables
	inout uvec4 faceIndices, inout vec3 faceNormal, inout vec3 barycoord,
	inout float side, inout vec3 outPoint
 ) {

	// stack needs to be twice as long as the deepest tree we expect because
	// we push both the left and right child onto the stack every traversal
	int ptr = 0;
	uint stack[ BVH_STACK_DEPTH ];
	stack[ 0 ] = 0u;

	float closestDistanceSquared = pow( 100000.0, 2.0 );
	bool found = false;
	while ( ptr > - 1 && ptr < BVH_STACK_DEPTH ) {

		uint currNodeIndex = stack[ ptr ];
		ptr --;

		// check if we intersect the current bounds
		float boundsHitDistance = distanceSqToBVHNodeBoundsPoint( point, bvh_bvhBounds, currNodeIndex );
		if ( boundsHitDistance > closestDistanceSquared ) {

			continue;

		}

		uvec2 boundsInfo = uTexelFetch1D( bvh_bvhContents, currNodeIndex ).xy;
		bool isLeaf = bool( boundsInfo.x & 0xffff0000u );
		if ( isLeaf ) {

			uint count = boundsInfo.x & 0x0000ffffu;
			uint offset = boundsInfo.y;
			closestDistanceSquared = distanceToTriangles(
				bvh_position, bvh_index, offset, count, point, closestDistanceSquared,

				// outputs
				faceIndices, faceNormal, barycoord, side, outPoint
			);

		} else {

			uint leftIndex = currNodeIndex + 1u;
			uint splitAxis = boundsInfo.x & 0x0000ffffu;
			uint rightIndex = boundsInfo.y;
			bool leftToRight = distanceSqToBVHNodeBoundsPoint( point, bvh_bvhBounds, leftIndex ) < distanceSqToBVHNodeBoundsPoint( point, bvh_bvhBounds, rightIndex );//rayDirection[ splitAxis ] >= 0.0;
			uint c1 = leftToRight ? leftIndex : rightIndex;
			uint c2 = leftToRight ? rightIndex : leftIndex;

			// set c2 in the stack so we traverse it later. We need to keep track of a pointer in
			// the stack while we traverse. The second pointer added is the one that will be
			// traversed first
			ptr ++;
			stack[ ptr ] = c2;
			ptr ++;
			stack[ ptr ] = c1;

		}

	}

	return sqrt( closestDistanceSquared );

}
`;var bn=`

#ifndef TRI_INTERSECT_EPSILON
#define TRI_INTERSECT_EPSILON 1e-5
#endif

// Raycasting
bool intersectsBounds( vec3 rayOrigin, vec3 rayDirection, vec3 boundsMin, vec3 boundsMax, out float dist ) {

	// https://www.reddit.com/r/opengl/comments/8ntzz5/fast_glsl_ray_box_intersection/
	// https://tavianator.com/2011/ray_box.html
	vec3 invDir = 1.0 / rayDirection;

	// find intersection distances for each plane
	vec3 tMinPlane = invDir * ( boundsMin - rayOrigin );
	vec3 tMaxPlane = invDir * ( boundsMax - rayOrigin );

	// get the min and max distances from each intersection
	vec3 tMinHit = min( tMaxPlane, tMinPlane );
	vec3 tMaxHit = max( tMaxPlane, tMinPlane );

	// get the furthest hit distance
	vec2 t = max( tMinHit.xx, tMinHit.yz );
	float t0 = max( t.x, t.y );

	// get the minimum hit distance
	t = min( tMaxHit.xx, tMaxHit.yz );
	float t1 = min( t.x, t.y );

	// set distance to 0.0 if the ray starts inside the box
	dist = max( t0, 0.0 );

	return t1 >= dist;

}

bool intersectsTriangle(
	vec3 rayOrigin, vec3 rayDirection, vec3 a, vec3 b, vec3 c,
	out vec3 barycoord, out vec3 norm, out float dist, out float side
) {

	// https://stackoverflow.com/questions/42740765/intersection-between-line-and-triangle-in-3d
	vec3 edge1 = b - a;
	vec3 edge2 = c - a;
	norm = cross( edge1, edge2 );

	float det = - dot( rayDirection, norm );
	float invdet = 1.0 / det;

	vec3 AO = rayOrigin - a;
	vec3 DAO = cross( AO, rayDirection );

	vec4 uvt;
	uvt.x = dot( edge2, DAO ) * invdet;
	uvt.y = - dot( edge1, DAO ) * invdet;
	uvt.z = dot( AO, norm ) * invdet;
	uvt.w = 1.0 - uvt.x - uvt.y;

	// set the hit information
	barycoord = uvt.wxy; // arranged in A, B, C order
	dist = uvt.z;
	side = sign( det );
	norm = side * normalize( norm );

	// add an epsilon to avoid misses between triangles
	uvt += vec4( TRI_INTERSECT_EPSILON );

	return all( greaterThanEqual( uvt, vec4( 0.0 ) ) );

}

bool intersectTriangles(
	// geometry info and triangle range
	sampler2D positionAttr, usampler2D indexAttr, uint offset, uint count,

	// ray
	vec3 rayOrigin, vec3 rayDirection,

	// outputs
	inout float minDistance, inout uvec4 faceIndices, inout vec3 faceNormal, inout vec3 barycoord,
	inout float side, inout float dist
) {

	bool found = false;
	vec3 localBarycoord, localNormal;
	float localDist, localSide;
	for ( uint i = offset, l = offset + count; i < l; i ++ ) {

		uvec3 indices = uTexelFetch1D( indexAttr, i ).xyz;
		vec3 a = texelFetch1D( positionAttr, indices.x ).rgb;
		vec3 b = texelFetch1D( positionAttr, indices.y ).rgb;
		vec3 c = texelFetch1D( positionAttr, indices.z ).rgb;

		if (
			intersectsTriangle( rayOrigin, rayDirection, a, b, c, localBarycoord, localNormal, localDist, localSide )
			&& localDist < minDistance
		) {

			found = true;
			minDistance = localDist;

			faceIndices = uvec4( indices.xyz, i );
			faceNormal = localNormal;

			side = localSide;
			barycoord = localBarycoord;
			dist = localDist;

		}

	}

	return found;

}

bool intersectsBVHNodeBounds( vec3 rayOrigin, vec3 rayDirection, sampler2D bvhBounds, uint currNodeIndex, out float dist ) {

	uint cni2 = currNodeIndex * 2u;
	vec3 boundsMin = texelFetch1D( bvhBounds, cni2 ).xyz;
	vec3 boundsMax = texelFetch1D( bvhBounds, cni2 + 1u ).xyz;
	return intersectsBounds( rayOrigin, rayDirection, boundsMin, boundsMax, dist );

}

// use a macro to hide the fact that we need to expand the struct into separate fields
#define	bvhIntersectFirstHit(		bvh,		rayOrigin, rayDirection, faceIndices, faceNormal, barycoord, side, dist	)	_bvhIntersectFirstHit(		bvh.position, bvh.index, bvh.bvhBounds, bvh.bvhContents,		rayOrigin, rayDirection, faceIndices, faceNormal, barycoord, side, dist	)

bool _bvhIntersectFirstHit(
	// bvh info
	sampler2D bvh_position, usampler2D bvh_index, sampler2D bvh_bvhBounds, usampler2D bvh_bvhContents,

	// ray
	vec3 rayOrigin, vec3 rayDirection,

	// output variables split into separate variables due to output precision
	inout uvec4 faceIndices, inout vec3 faceNormal, inout vec3 barycoord,
	inout float side, inout float dist
) {

	// stack needs to be twice as long as the deepest tree we expect because
	// we push both the left and right child onto the stack every traversal
	int ptr = 0;
	uint stack[ BVH_STACK_DEPTH ];
	stack[ 0 ] = 0u;

	float triangleDistance = INFINITY;
	bool found = false;
	while ( ptr > - 1 && ptr < BVH_STACK_DEPTH ) {

		uint currNodeIndex = stack[ ptr ];
		ptr --;

		// check if we intersect the current bounds
		float boundsHitDistance;
		if (
			! intersectsBVHNodeBounds( rayOrigin, rayDirection, bvh_bvhBounds, currNodeIndex, boundsHitDistance )
			|| boundsHitDistance > triangleDistance
		) {

			continue;

		}

		uvec2 boundsInfo = uTexelFetch1D( bvh_bvhContents, currNodeIndex ).xy;
		bool isLeaf = bool( boundsInfo.x & 0xffff0000u );

		if ( isLeaf ) {

			uint count = boundsInfo.x & 0x0000ffffu;
			uint offset = boundsInfo.y;

			found = intersectTriangles(
				bvh_position, bvh_index, offset, count,
				rayOrigin, rayDirection, triangleDistance,
				faceIndices, faceNormal, barycoord, side, dist
			) || found;

		} else {

			uint leftIndex = currNodeIndex + 1u;
			uint splitAxis = boundsInfo.x & 0x0000ffffu;
			uint rightIndex = boundsInfo.y;

			bool leftToRight = rayDirection[ splitAxis ] >= 0.0;
			uint c1 = leftToRight ? leftIndex : rightIndex;
			uint c2 = leftToRight ? rightIndex : leftIndex;

			// set c2 in the stack so we traverse it later. We need to keep track of a pointer in
			// the stack while we traverse. The second pointer added is the one that will be
			// traversed first
			ptr ++;
			stack[ ptr ] = c2;

			ptr ++;
			stack[ ptr ] = c1;

		}

	}

	return found;

}
`;var An=`
struct BVH {

	usampler2D index;
	sampler2D position;

	sampler2D bvhBounds;
	usampler2D bvhContents;

};
`;var wa=An,Ba=yn,_a=`
	${xn}
	${bn}
`;export{vn as AVERAGE,gn as BVHShaderGLSL,Xt as CENTER,Me as CONTAINED,H as ExtendedTriangle,Be as FloatVertexAttributeTexture,Ri as INTERSECTED,Bi as IntVertexAttributeTexture,st as MeshBVH,on as MeshBVHHelper,Si as MeshBVHUniformStruct,zi as NOT_INTERSECTED,U as OrientedBox,Tn as SAH,Fi as StaticGeometryGenerator,we as UIntVertexAttributeTexture,Ot as VertexAttributeTexture,Ho as acceleratedRaycast,qo as computeBoundsTree,Wo as disposeBoundsTree,Lo as estimateMemoryInBytes,Co as getBVHExtremes,Ro as getJSONStructure,oo as getTriangleHitPointInfo,Ba as shaderDistanceFunction,_a as shaderIntersectFunction,wa as shaderStructs,zo as validateBounds};
//# sourceMappingURL=three-mesh-bvh.bundle.mjs.map