//registration and initialization

//main module registration code; an IIEF
let ApplicationInitModule = function() {
    var registeredModules = [];
  
    return {
        registerModule: function(module) {
            registeredModules.push(module);
        },
        getAppModulesCount: function() {
            return registeredModules.length;
        },
        removeRegisteredModule: function(index) {
            registeredModules.splice(index, 1);
        },
        initializeAllModules: function() {
            for (var module in registeredModules) {
                registeredModules[module].initialize();
            }
        },

    };
}();


//thin abstraction layer to connect modules with the main module registration code
//a singleton IIEF (immediately invoked function expression)
//called SANDBOX
module.exports = (function GlobalApp() {
    let registerModule = ApplicationInitModule.registerModule;
    return {
        registerModule: registerModule
    };
})();