/*globals $*/
function TriggerButton() {}

TriggerButton.prototype.Load = function()
{
    var me = this;
    
    var button = $("#triggerButton");
     
    button.click(function() { me.FireTrigger(); return false; });
};

TriggerButton.prototype.FireTrigger = function()
{
    if(this.OnTrigger !== undefined)
    {
        this.OnTrigger();
    }
};