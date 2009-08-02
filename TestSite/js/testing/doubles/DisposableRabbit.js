function DisposableRabbit()
{
    this.disposed = false;
}

DisposableRabbit.prototype.Dispose = function()
{
    this.disposed = true;
};