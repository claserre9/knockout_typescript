"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ko = require("knockout");
var TimeSheetLine = /** @class */ (function () {
    function TimeSheetLine() {
        this.project = ko.observableArray(["Project 1", "Project 2", "Project 3", "Project 4", "Project 5"]);
        this.hour = ko.observable(0);
        this.chosenProject = ko.observable();
        this.handleDragOver = function (data, event) {
        };
        this.handleDrop = function (data, event) {
            event.preventDefault();
            var draggedElement = document.querySelector("#".concat(event.dataTransfer.getData("text/plain")));
            var context = ko.contextFor(event.target);
            var draggedElementData = ko.dataFor(draggedElement);
            var dropZoneElementData = ko.dataFor(event.target);
            var timesheets = context.$parent.timesheets();
            var draggedElementPosition = ko.utils.arrayIndexOf(timesheets, draggedElementData);
            var dropZoneElementPosition = ko.utils.arrayIndexOf(timesheets, dropZoneElementData);
            timesheets.splice(dropZoneElementPosition, 0, timesheets.splice(draggedElementPosition, 1)[0]);
            context.$parent.timesheets(timesheets);
            return false;
        };
    }
    TimeSheetLine.prototype.handleDragStart = function (data, event) {
        event.dataTransfer.setData("text/plain", event.target.id);
        event.dropEffect = "move";
        return true;
    };
    return TimeSheetLine;
}());
exports.default = TimeSheetLine;
//# sourceMappingURL=TimeSheetLine.js.map