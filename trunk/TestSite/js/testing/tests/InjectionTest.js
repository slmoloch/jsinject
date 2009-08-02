/*globals 
    InjectionTest, 
    TestCase, 
    JsInject, 
    Bar, 
    Foo, 
    Rabbit,
    assertNotNull,
    assertEquals,
    assertNull,
    fail */
    
InjectionTest = TestCase("InjectionTest");

InjectionTest.prototype.testInstantiation = function() 
{
    var containerBuilder = new JsInject.ContainerBuilder();
    containerBuilder.Register("bar", function(c) {return new Bar();});
    containerBuilder.Register("foo", function(c) {return new Foo(c.Resolve("bar"));});
    
    var container = containerBuilder.Create(); 

    var foo = container.Resolve("foo");

    assertNotNull(foo);
    assertNotNull(foo.GetBar());
};

InjectionTest.prototype.testDoubleRegisteringError = function() 
{
    var containerBuilder = new JsInject.ContainerBuilder();
    containerBuilder.Register("bar", function(c) {return new Bar();});
    var container = containerBuilder.Create(); 
    
    try
    {
        container.Register("bar", function(c) {return new Foo();});
        fail("Error must be thrown at this moment");
    }
    catch(err)
    {
        assertEquals("Factory with name 'bar' alredy registered", err);
    }
};

InjectionTest.prototype.testInstantiationOfUnregisteredError = function() 
{
    var containerBuilder = new JsInject.ContainerBuilder();
    var container = containerBuilder.Create(); 

    try
    {
        container.Resolve("bar");
    }
    catch(err)
    {
        assertEquals("Factory with name 'bar' is not registered", err);
    }
};

InjectionTest.prototype.testTryResolve = function() 
{
    var containerBuilder = new JsInject.ContainerBuilder();
    containerBuilder.Register("bar", function(c) {return new Bar();});
    var container = containerBuilder.Create(); 

    var bar = container.TryResolve("bar");

    assertNotNull(bar);
};

InjectionTest.prototype.testTryResolveUndefined = function() 
{
    var containerBuilder = new JsInject.ContainerBuilder();
    var container = containerBuilder.Create(); 

    var bar = container.TryResolve("bar");

    assertNull(bar);
};

InjectionTest.prototype.testResolveWithParameter = function() 
{
    var containerBuilder = new JsInject.ContainerBuilder();
    
    containerBuilder.Register("Rabbit", function(c, weight) {return new Rabbit(weight);});
    
    var container = containerBuilder.Create(); 
     
    var rabbit = container.Resolve("Rabbit", 55);

    assertNotNull(rabbit);
    assertEquals(55, rabbit.GetWeight());
};

InjectionTest.prototype.testInstanceIsReusedWithingContainer = function() 
{
    var containerBuilder = new JsInject.ContainerBuilder();
    containerBuilder.Register("bar", function(c) {return new Bar();});
    var container = containerBuilder.Create(); 

    var bar = container.TryResolve("bar");
    
    assertNotNull(bar);
    
    fail("Not implemented");
};