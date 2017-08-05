ASP.NET Identity
----------------
https://aspnetidentity.codeplex.com/SourceControl/latest#Readme.markdown


Startup
-------
	app.CreatePerOwinContext<ApplicationUserManager>(ApplicationUserManager.Create)
	app.CreatePerOwinContext<ApplicationSignInManager>(ApplicationSignInManager.Create)
	app.UseCookieAuthentication(
		DefaultAuthenticationTypes.ApplicationCookie
	)

	
IdentifyConfig
--------------
	ApplicationUserManager
		static ApplicationUserManager Create(options, owinContext)
			userManager = new ApplicationUserManager(store)
				.UserValidator = {RequireUniqueEmail}
				.PasswordValidator = {RequiredLength=6, Require...}
			
	
Sign Up Page
------------
	SignUp
		user = new ApplicationUser()
		ApplicationUserManager.Create(user, password) // sets HashPassword, add to db ???
		return user
	SignIn(user)
		IAuthenticationManager.SignOut(ExternalCookie) // ???
		identity = ApplicationUserManager.CreateIdentity(user, ApplicationCookie)
		IAuthenticationManager.SignIn(identity)


Sign In Page
------------
	SignInStatus SignInManager.PasswordSignIn(email, password)
		user = userManager.FindByName(username)
		if userManager.CheckPassword(user, password)
			userManager.ResetAccessFailedCount(user.Id)
			return SignInOrTwoFactor(user)
		
		
		
		
IdentityHelper
--------------




status = Identification.SignUp(profile, password)
if (status.Succeeded)
	Identification.SignIn(username, password)
