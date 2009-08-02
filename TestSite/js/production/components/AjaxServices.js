function AjaxServices() {}

AjaxServices.prototype.GetCurrentDate = function(success)
{
    success({CurrentDate: "" + new Date()});
};