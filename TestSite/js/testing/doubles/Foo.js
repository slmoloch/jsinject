function Foo(bar)
{
    this.bar = bar;
}

Foo.prototype.GetBar = function()
{
    return this.bar;
};