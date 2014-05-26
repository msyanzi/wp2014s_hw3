(function(){
	
	// 初始化parse
	Parse.initialize("3AzS8TR5wC6tl9Jz259FhAdt5D23WeqRG6ivpWUm","x79sI7wtsNye6TLhJMQEmUFjMv6dc4xde2U9yjtU");
	
	// template engine 函數
	var e={};["loginView","evaluationView","updateSuccessView"].forEach(function(t){templateCode=document.getElementById(t).text;e[t]=doT.template(templateCode)});
	var t={loginRequiredView:function(e){
		return function(){var t=Parse.User.current();
			if(t){e()}
				else{window.location.hash="login/"+window.location.hash}
			}
		}
	};

	// handler 控制 navbar 顯示 button
	var n={navbar:function(){
		var e=Parse.User.current();
		if(e){document.getElementById("loginButton").style.display="none";
			document.getElementById("logoutButton").style.display="block";
			document.getElementById("evaluationButton").style.display="block"}

		else{document.getElementById("loginButton").style.display="block";
			document.getElementById("logoutButton").style.display="none";
			document.getElementById("evaluationButton").style.display="none"}

			document.getElementById("logoutButton").addEventListener("click",function(){Parse.User.logOut();n.navbar();window.location.hash="login/"})
		}
		,evaluationView:t.loginRequiredView(function(){
			
			// parse 初始化
			var t=Parse.Object.extend("Evaluation");
			var n=Parse.User.current();
			var r=new Parse.ACL;
			
			// parse ACL 讀寫權限
			r.setPublicReadAccess(false);
			r.setPublicWriteAccess(false);
			r.setReadAccess(n,true);
			r.setWriteAccess(n,true);
			
			// handler, parse query
			var i=new Parse.Query(t);
			i.equalTo("user",n);
			i.first({success:function(i){window.EVAL=i;if(i===undefined){
				// TAhelp.js
				var s=TAHelp.getMemberlistOf(n.get("username")).filter(function(e){
					//檢查這個user之前有沒有提交過的peer review, 沒有的話加一個0,0,0,0, 排除自己
					return e.StudentId!==n.get("username")?true:false}).map(function(e){e.scores=["0","0","0","0"];return e})
			}
				// 檢查是否已評分
				else{var s=i.toJSON().evaluations}
					document.getElementById("content").innerHTML=e.evaluationView(s);
					document.getElementById("evaluationForm-submit").value=i===undefined?"送出表單":"修改表單";
					document.getElementById("evaluationForm").addEventListener("submit",function(){for(var o=0;o<s.length;o++){for(var u=0;u<s[o].scores.length;u++){
					var a=document.getElementById("stu"+s[o].StudentId+"-q"+u);
					var f=a.options[a.selectedIndex].value;s[o].scores[u]=f}}
					if(i===undefined){i=new t;i.set("user",n);i.setACL(r)}console.log(s);i.set("evaluations",s);
					i.save(null,{success:function(){document.getElementById("content").innerHTML=e.updateSuccessView()},error:function(){}})},false)},error:function(e,t){}})}),loginView:function(t){
			var r=function(e){
				
			// TAhelp.js
			var t=document.getElementById(e).value;
				return TAHelp.getMemberlistOf(t)===false?false:true
			};
			
			// show the style
			var i=function(e,t,n){
				if(!t()){
					document.getElementById(e).innerHTML=n;
					document.getElementById(e).style.display="block"}
				else{document.getElementById(e).style.display="none"}
			};			

			var s=function(){n.navbar();window.location.hash=t?t:""};
			var o=function(){
					// reconfirm password 
					var e=document.getElementById("form-signup-password");
					var t=document.getElementById("form-signup-password1");
					var n=e.value===t.value?true:false;i("form-signup-message",function(){return n},"Passwords don't match.");
					return n
			};
					// check signin ID
					document.getElementById("content").innerHTML=e.loginView();
					document.getElementById("form-signin-student-id").addEventListener("keyup",function(){i("form-signin-message",function(){return r("form-signin-student-id")},"The student is not one of the class students.")});
					document.getElementById("form-signin").addEventListener("submit",function(){
						
						// don't have this student ID
						if(!r("form-signin-student-id")){
							alert("The student is not one of the class students.");
							return false}
							
							//parse user login
							Parse.User.logIn(
								document.getElementById("form-signin-student-id").value,
								document.getElementById("form-signin-password").value,
							{success:function(e){s()},error:function(e,t){i("form-signin-message",function(){return false},"Invaild username or password.")}})},false);
					
					// check signup	ID
					document.getElementById("form-signup-student-id").addEventListener("keyup",function(){i("form-signup-message",function(){return r("form-signup-student-id")},"The student is not one of the class students.")});
					document.getElementById("form-signup-password1").addEventListener("keyup",o);
					document.getElementById("form-signup").addEventListener("submit",function(){
						
						// don't have this student ID
						if(!r("form-signup-student-id")){
							alert("The student is not one of the class students.");
							return false}var e=o();
							if(!e){return false}
							
							// create a new user
							var t=new Parse.User;
							t.set("username",document.getElementById("form-signup-student-id").value);
							t.set("password",document.getElementById("form-signup-password").value);
							t.set("email",document.getElementById("form-signup-email").value);
							t.signUp(null,{success:function(e){s()},error:function(e,t){i("form-signup-message",function(){return false},t.message)}})},false)}};
					
					//router
					var r=Parse.Router.extend({routes:{"":"indexView","peer-evaluation/":"evaluationView","login/*redirect":"loginView"}
						,indexView:n.evaluationView,evaluationView:n.evaluationView,loginView:n.loginView});
					
					//讓 router 活起來
					this.Router=new r;
					Parse.history.start();
})();
