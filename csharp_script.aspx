<%@ Page Language="C#" %>
<script runat="server">
	protected string getName() {
		string name = Request.QueryString["name"];
		return name == null || name == ""
			? "'name' Query String Not Set"
			: name;
	}
</script>
<html>
<body>
	<h1>Hello <% Response.Write( getName() ); %></h1>
</body>
</html>
