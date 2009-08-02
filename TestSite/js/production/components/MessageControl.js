/*globals $*/

function MessageControl(templatesRepository)
{
    this.templatesRepository = templatesRepository;
}

MessageControl.prototype.Render = function(data)
{
    var container = $("#messageContainer");
    container.setTemplate(this.templatesRepository.GetTemplateForMessage());
    container.processTemplate(data);
};