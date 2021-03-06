;(function () {
    'use strict';
    const scanner = {
        commandPrefix: "/",
        paramPrefix: "-",
        divider: " ",
        defaultKey: "DEFAULT",
        printCommands: true,
        commands: [],
        inputId: "commandInput",
        outputId: "mainConsole",
        paragraphClass: "cmd-line",
        set: function (options) {
            if (options.commandPrefix !== undefined) {this.commandPrefix = options.commandPrefix}
            if (options.paramPrefix !== undefined) {this.paramPrefix = options.paramPrefix}
            if (options.divider !== undefined) {this.divider = options.divider}
            if (options.defaultKey !== undefined) {this.defaultKey = options.defaultKey}
            if (options.printCommands !== undefined) {this.printCommands = options.printCommands}
            if (options.inputId !== undefined) {this.inputId = options.inputId}
            if (options.outputId !== undefined) {this.outputId = options.outputId}
            if (options.paragraphClass !== undefined) {this.paragraphClass = options.paragraphClass}
        },
        print: function (string) {
            let paragraph = document.createElement('p');
            paragraph.className = scanner.paragraphClass;
            paragraph.innerHTML = "> "+string;
            document.getElementById(scanner.outputId).appendChild(paragraph);
        },
        addCommand: function (options) {
            options.name = options.name || "CMD";
            options.consume = options.consume || function () {};
            this.commands.push({ name: options.name, consume: options.consume });
        }
    };
    // const toolClear = document.getElementById("toolClear");
    // scanner.commandPrefix = "/";
    // scanner.paramPrefix = "-";
    // scanner.divider = " ";
    // scanner.defaultKey = "DEFAULT";
    // scanner.printCommands = true;
    // scanner.commands = [];
    // scanner.inputId = "commandInput";
    // scanner.outputId = "mainConsole";
    //
    // scanner.set = function (options) {
    //     if (options.commandPrefix !== undefined) {scanner.commandPrefix = options.commandPrefix}
    //     if (options.paramPrefix !== undefined) {scanner.paramPrefix = options.paramPrefix}
    //     if (options.divider !== undefined) {scanner.divider = options.divider}
    //     if (options.defaultKey !== undefined) {scanner.defaultKey = options.defaultKey}
    //     if (options.printCommands !== undefined) {scanner.printCommands = options.printCommands}
    //     if (options.inputId !== undefined) {scanner.inputId = options.inputId}
    //     if (options.outputId !== undefined) {scanner.outputId = options.outputId}
    // };
    //
    // scanner.addCommand = function (name, consume) {
    //     let command = {};
    //     command.name = name;
    //     command.consume = consume;
    //     scanner.commands.push(command);
    // };
    //
    // scanner.print = function (string) {
    //     let paragraph = document.createElement('p');
    //     paragraph.className = scanner.paragraphClass;
    //     paragraph.innerHTML = "> "+string;
    //     document.getElementById(scanner.outputId).appendChild(paragraph);
    // };

    function process(cmdString) {
        if (!(~cmdString.indexOf(scanner.commandPrefix))) { return; }
        let fullCmd = cmdString.slice();
        cmdString = cmdString.substr(cmdString.indexOf(scanner.commandPrefix)+1).split(scanner.divider);
        let commandName = cmdString.shift();
        let commandPointer;
        scanner.commands.forEach(command => {
            if (command.name !== commandName){ return; }
            commandPointer = command;
        });
        if (commandPointer.name === undefined) { return; }
        let params = {};
        let key = scanner.defaultKey;
        cmdString.forEach(param => {
            if (param.includes(scanner.paramPrefix)) { key = param; return; }
            if (params[key]===undefined) { params[key] = []; }
            params[key].push(param);
        });
        if (commandPointer.consume === undefined) { return; }
        params.cmd = fullCmd;
        commandPointer.consume(params);
    }

    document.getElementById(scanner.inputId).addEventListener("keydown", event => {
        let commandInput = document.getElementById(scanner.inputId);
        if(event.key !== "Enter"){ return true; }
        let cmdString = commandInput.value;
        if (scanner.printCommands) { scanner.print(cmdString)}
        process(cmdString);
        commandInput.value = "";
        event.preventDefault();
    });

    // toolClear.addEventListener("click", () => {
    //     document.getElementById("mainConsole").innerHTML = '';
    //     scanner.print("");
    // });
    window.scanner = scanner;
})();



