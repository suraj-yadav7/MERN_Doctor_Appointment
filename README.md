<!-- Backend -->
-> The backend follows MVC architecture so there should be proper folder, file system
-> Required folders routes, config, controllers, middlewares, models
-> if try to find your by id in UserData(model).findOne({_id.userId}),
 don't call directly like email type UserData(model).findOne({userId}) it will return first id data 