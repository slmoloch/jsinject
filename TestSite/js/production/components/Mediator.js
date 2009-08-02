function Mediator(ajaxServices, messageControl, triggerButton) 
{
    this.ajaxServices = ajaxServices;
    this.messageControl = messageControl;
    this.triggerButton = triggerButton;
    
    
    var me = this;
    
    this.triggerButton.OnTrigger = function () { me.Trigger(); };
}

Mediator.prototype.Load = function()
{
    this.triggerButton.Load();
};

Mediator.prototype.Trigger = function()
{
    var me = this;
    
    this.ajaxServices.GetCurrentDate(function (data) {
           me.messageControl.Render(data);
        });
};