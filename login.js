$(function () {
  //注册和登录切换
  $("#login a").on("click", function () {
    $("#login").hide().siblings("#register").show();
  });
  $("#register a").on("click", function () {
    $("#register").hide().siblings("#login").show();
  });

  //自定义验证规则
  let form = layui.form;
  form.verify({
    username: function (value, item) {
      //value：表单的值、item：表单的DOM对象
      if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
        return "用户名不能有特殊字符";
      }
      if (/(^\_)|(\__)|(\_+$)/.test(value)) {
        return "用户名首尾不能出现下划线'_'";
      }
      if (/^\d+\d+\d$/.test(value)) {
        return "用户名不能全为数字";
      }

      //如果不想自动弹出默认提示框，可以直接返回 true，这时你可以通过其他任意方式提示（v2.5.7 新增）
      if (value === "xxx") {
        alert("用户名不能为敏感词");
        return true;
      }
    },

    //我们既支持上述函数式的方式，也支持下述数组的形式
    //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
    pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    repwd: function () {
      const pwd = $(".pwd").val();
      const pwdAgain = $(".pwdag").val();
      return pwd !== pwdAgain && "与输入的密码不一致";
    },
  });
  //注册按钮
  $(".myForm").on("submit", function (e) {
    e.preventDefault();
    let data = $(this).serialize();
    axios({
      url: "http://ajax.frontend.itheima.net/api/reguser",
      data: data,
      method: "POST",
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
    $("#login").show().siblings("#register").hide();
  });
  //登录功能
  $("#login .layui-form").on("submit", function (e) {
    e.preventDefault();
    let data = $(this).serialize();
    axios({
      method: "post",
      data: data,
      url: "http://ajax.frontend.itheima.net/api/login",
    })
      .then((response) => {
        console.log(response);
        if (response.data.status == 0) {
          alert("登陆成功");
          window.location.href = "./index.html";
        } else {
          alert("用户名或者密码不正确，请重新输入");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
