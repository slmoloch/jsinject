/*globals JsInject*/

JsInject = {};

JsInject.Container = function() { 
    this.serviceEntries = [];
};

JsInject.Container.prototype.Register = function(name, factory, scope) {
    if(this.Registered(name))
    {
        throw "Factory with name '" + name + "' alredy registered";
    }
    
    this.serviceEntries[name] = {factory: factory, scope: scope, instance: null};
};

JsInject.Container.prototype.Resolve = function(name, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9)
{
    return this.ResolveInternal(name, true, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9);
};

JsInject.Container.prototype.TryResolve = function(name, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) 
{
    return this.ResolveInternal(name, false, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9);
};

JsInject.Container.prototype.ResolveInternal = function(name, throwIfNotRegistered, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
    if(!this.Registered(name))
    {
        if(throwIfNotRegistered)
        {
            throw "Factory with name '" + name + "' is not registered";
        }
        else
        {
            return null;
        }
    }
    
    var entry = this.serviceEntries[name];  
    if(entry.scope === "container")
    {
        if(entry.instance === null)
        {
            entry.instance = entry.factory(this, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9);
        }
        
        return entry.instance;
    }

    return entry.factory(this, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9);
};

JsInject.Container.prototype.Registered = function(name) {
	return this.serviceEntries[name] !== undefined;
};

// Factory registration
JsInject.Registration = function(name, factory) 
{ 
    this.name = name;
    this.factory = factory;
    this.scope = "none";
};

JsInject.Registration.prototype.Reused = function() 
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
        var registration = this.registrations[x];
        
        container.Register(registration.name, registration.factory, registration.scope);
    }
    
    return container;
};