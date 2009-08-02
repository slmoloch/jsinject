/*globals 
    InjectionTest, 
    TestCase, 
    JsInject, 
    Bar, 
    Foo, 
    Rabbit,
    DisposableRabbit,
    assertNotNull,
    assertEquals,
    assertNull,
    assertNotSame,
    assertSame,
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
    containerBuilder.Register("bar", function(c) {return new Foo();});
    
    try
    {
        var container = containerBuilder.Create();
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

InjectionTest.prototype.testInstanceIsNotReusedWithinContainer = function() 
{
    var containerBuilder = new JsInject.ContainerBuilder();
    containerBuilder.Register("bar", function(c) {return new Bar();});
    var container = containerBuilder.Create(); 

    var bar1 = container.Resolve("bar");
    var bar2 = container.Resolve("bar");
    
    assertNotSame(bar1, bar2);
};

InjectionTest.prototype.testInstanceIsReusedWithinContainer = function() 
{
    var containerBuilder = new JsInject.ContainerBuilder();
    containerBuilder.Register("bar", function(c) {return new Bar();}).Reused();
    var container = containerBuilder.Create(); 

    var bar1 = container.Resolve("bar");
    var bar2 = container.Resolve("bar");
    
    assertSame(bar1, bar2);
};

InjectionTest.prototype.testContainerOwnedNotReusedInstancesAreDisposed = function() 
{
    var containerBuilder = new JsInject.ContainerBuilder();
    containerBuilder.Register("DisposableRabbit", function(c) {return new DisposableRabbit();}).Owned();
    var container = containerBuilder.Create(); 

    var rabbit = container.Resolve("DisposableRabbit");
  
    container.Dispose();
    
    assertEquals(true, rabbit.disposed);
};

InjectionTest.prototype.testContainerOwnedAndReusedInstancesAreDisposed = function() 
{
    var containerBuilder = new JsInject.ContainerBuilder();
    containerBuilder.Register("DisposableRabbit", function(c) {return new DisposableRabbit();}).Reused().Owned();
    var container = containerBuilder.Create(); 

    var rabbit = container.Resolve("DisposableRabbit");
  
    container.Dispose();
    
    assertEquals(true, rabbit.disposed);
};

InjectionTest.prototype.testConsumerOwnedNotReusedInstancesAreNotDisposed = function() 
{
    var containerBuilder = new JsInject.ContainerBuilder();
    containerBuilder.Register("DisposableRabbit", function(c) {return new DisposableRabbit();});
    var container = containerBuilder.Create(); 

    var rabbit = container.Resolve("DisposableRabbit");
  
    container.Dispose();
    
    assertEquals(false, rabbit.disposed);
};

InjectionTest.prototype.testConsumerOwnedReusedInstancesAreDisposed = function() 
{
    var containerBuilder = new JsInject.ContainerBuilder();
    containerBuilder.Register("DisposableRabbit", function(c) {return new DisposableRabbit();}).Reused();
    var container = containerBuilder.Create(); 

    var rabbit = container.Resolve("DisposableRabbit");
  
    container.Dispose();
    
    assertEquals(true, rabbit.disposed);
};