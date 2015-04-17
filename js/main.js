requirejs(["domain/ViewModel"], function (ViewModel) {
    var viewmodel;

    viewmodel = new ViewModel();
    ko.applyBindings(viewmodel);
});