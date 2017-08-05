// repeater
// control in template must have runat="server" if you want to get value on server side

<asp:repeater id="repeater" runat="server" 
   OnItemCommand="repeater_command"
   OnItemDataBound="repeater_item_bound">
<ItemTemplate>
   <input id="checkbox" type="checkbox" runat="server" value='<%# Eval("id") %>' />
   <%# Eval("first_name") %>
   <asp:button id="button" runat="server"
      commandName="join" commandArgument='<%# Eval("id") %>' />
   <asp:label id="status_label" runat="server" />
</ItemTemplate>
</asp:repeater>

// calling repeater.DataBind() on PostBack can cause exception; instead put !IsPostBack check
protected void Page_Load(object sender, EventArgs e) {
   repeater.DataSource = source;
   if (!IsPostBack)
   	repeater.DataBind();
}

protected void repeater_item_bound(object sender, RepeaterItemEventArgs e) {
   if (e.Item.ItemType == ListItemType.Item || e.Item.ItemType == ListItemType.AlternatingItem) {
      var user = (user)e.Item.DataItem;
      var status = (Label)e.Item.FindControl("status_label");
      status.Text = user.authenticated ? "Logged in" : "";
   }
}

// Command event handler does not have access to e.Item.DataItem - it's only available during data binding
// instead must use e.CommandArgument to track bound item
protected void repeater_command(object sender, RepeaterCommandEventArgs e) {
   if (e.CommandName != "join")
      return;
   var id = e.CommandArgument.to_int();
   var user = db.one<user>(id);
   user.joined = true;
   db.save(user);
}

// button clicked outside repeater, finds items that are checked
protected void delete_click(object sender, EventArgs e) {
   foreach (RepeaterItem item in repeater.Items) {
      var checkbox = item.FindControl("checkbox") as HtmlInputCheckBox;
      if (checkbox != null && checkbox.Checked) {
         checkbox.Visible = false;
         var id = checkbox.Value;
         db.delete(id);
      }
   }
}

// property
<%# Eval("name") %>

// format property
<%# Eval("start_time", "{0:h:mm tt}") %>

// item index
<%# Container.ItemIndex %>

// items count
((List<User>)repeater.DataSource).Count

// call method on strongly typed data item
<%# ((program_block)Container.DataItem).start_time.brief_time() %>
<%# (Container.DataItem as program_block).end_time.brief_time() %>

// perform logic requiring bound data
// call method from page code-behind that takes Eval as parameter
<%# get_html(Eval("name")) %>
// in page code-behind perform logic
public string get_html(string name) {
   return name.ToLower() == "casey"
      ? "Greetings " + name
      : "Intruder alert";
}

// a panel's visible property can be used to show hide a section
// item template doesn't allow if statements
<ItemTemplate>
   <asp:Panel runat="server" Visible='<%# Container.DataItem.GetType() == typeof(Ad) %>'>
      <%# Eval("Html") %>
   </asp:Panel>
</ItemTemplate>


<%-- HACK: create html placeholder after item count and then move content to placeholder with javasript --%>
<%# ((List<User>)ItemRepeater.DataSource).Count >= 4
   && Container.ItemIndex == 4
      ? "<div id='placeholder'></div>"
      : ""
%>
