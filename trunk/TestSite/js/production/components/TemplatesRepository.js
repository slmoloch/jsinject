function TemplatesRepository() { }

TemplatesRepository.prototype.GetTemplateForMessage = function()
{
    return "Dynamic message. CurrentDate: <b>{$T.CurrentDate}</b>";
};

