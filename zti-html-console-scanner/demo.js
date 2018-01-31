;(function () {
    let scanner = window.scanner;
    scanner.set({printCommands: false});
    scanner.addCommand("test", function (params) {
        if (params[scanner.defaultKey] === undefined) {return}
        let s = "";
        params[scanner.defaultKey].forEach(value => {
            s += value + " ";
        });
        scanner.print(s.trim());
    });
})();