/*globals JsInject*/

JsInject = {};

JsInject.Container = function() { 
    this.factories = [];
};

JsInject.Container.prototype.Register = function(name, factory) {
    if(this.Registered(name))
    {
        throw "Factory with name '" + name + "' alredy registered";
    }
    
    this.factories[name] = factory;
};

JsInject.Container.prototype.Resolve = function(name, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
    if(!this.Registered(name))
    {
        throw "Factory with name '" + name + "' is not registered";
    }
    
    return this.factories[name](this, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9);
};

JsInject.Container.prototype.TryResolve = function(name) {
    if(!this.Registered(name))
    {
        return null;
    }
    
    return this.factories[name](this);
};

JsInject.Container.prototype.Registered = function(name) {
	return this.factories[name] !== undefined;
};

// Factory registration
JsInject.Registration = function(name, factory) 
{ 
    this.name = name;
    this.factory = factory;
    this.scope = "none";
};

JsInject.Registration.prototype.ReusedWithinContainer = function() 
{
    this.scope = "container";
    
    return this;
};

// Container Builder
JsInject.ContainerBuilder = function() { 
    this.registrations = [];
};

JsInject.ContainerBuilder.prototype.Register = function(name, factory) 
{
    var registration = new JsInject.Registration(name, factory);
    
    this.registrations.push(registration);
    
    return registration;
};

JsInject.ContainerBuilder.prototype.Create = function() 
{
    var container = new JsInject.Container();
    
    for (var x in this.registrations)
    {
        container.Register(this.registrations[x].name, this.registrations[x].factory);
    }
    
    return container;
};