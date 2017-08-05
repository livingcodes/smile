<%@ Page Title... Async="true" %>

protected void Page_Load(object sender, EventArgs e) {
  // can use RegisterAsyncTask to call async code instead of using async keyword in method signature
  RegisterAsyncTask(new System.Web.UI.PageAsyncTask(() => {
    return Task.FromResult(0);
  }));
}
