<!-- Backend -->
-> The backend follows MVC architecture so there should be proper folder, file system
-> Required folders routes, config, controllers, middlewares, models
-> if try to find your by id in UserData(model).findOne({_id.userId}),
 don't call directly like email type UserData(model).findOne({userId}) it will return first id data 

-> example app.use('/api', authorizationUser,userDataRouter)
->The above kind of function must written below in server file because if
app.use('/api', doctorRouter) without any auth callback function is called then it will run above authorizationUser throw error 
