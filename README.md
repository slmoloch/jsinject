JsInject is IOC (dependency injection) container for your JS applications. Inspired by Funq (http://funq.codeplex.com/) for .NET platform.

It is very light weight (3.4 kBytes not minified), fast, effective and simple.

Example of usage:

Instantiation with dependencies: 
```javascript
InjectionTest.prototype.testInstantiation = function() { var containerBuilder = new JsInject.ContainerBuilder(); containerBuilder.Register("bar", function(c) {return new Bar();}); containerBuilder.Register("foo", function(c) {return new Foo(c.Resolve("bar"));});

var container = containerBuilder.Create(); 

var foo = container.Resolve("foo");

assertNotNull(foo);
assertNotNull(foo.GetBar());
};
```

Instantiation of single instance of object (singleton) 
```javascript
InjectionTest.prototype.testInstanceIsReusedWithinContainer = function() { var containerBuilder = new JsInject.ContainerBuilder(); containerBuilder.Register("bar", function(c) {return new Bar();}).Reused(); var container = containerBuilder.Create();

var bar1 = container.Resolve("bar");
var bar2 = container.Resolve("bar");

assertSame(bar1, bar2);
}; 
```

Instantiation with parameter 

```javascript
InjectionTest.prototype.testResolveWithParameter = function() { var containerBuilder = new JsInject.ContainerBuilder();

containerBuilder.Register("Rabbit", function(c, weight) {return new Rabbit(weight);});

var container = containerBuilder.Create(); 

var rabbit = container.Resolve("Rabbit", 55);

assertNotNull(rabbit);
assertEquals(55, rabbit.GetWeight());
}; 
```
