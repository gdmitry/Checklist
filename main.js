require.config({
    paths: {
        'text':
        'lib/text',
        'Model': './modules/Model',
        'DataService': './modules/DataService',
        'Checklist': './modules/Checklist',
        'ViewModel': "./modules/ViewModel",
        'LocalStorage': "../dev/modules/LocalStorage"
    }
});

requirejs(["ViewModel"], function (ViewModel) {
    var viewmodel;

    viewmodel = new ViewModel();
    ko.applyBindings(viewmodel);
});