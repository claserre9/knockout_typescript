"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ko = require("knockout");
var TimeSheetLine_1 = require("./TimeSheetLine");
var TimeSheet = /** @class */ (function () {
    function TimeSheet() {
        this.timesheets = ko.observableArray([]);
        this.showResult = ko.observable(false);
    }
    TimeSheet.prototype.addTimeSheetLine = function () {
        this.timesheets.push(new TimeSheetLine_1.default());
    };
    TimeSheet.prototype.removeTimeSheetLine = function (index) {
        var timesheets = this.timesheets();
        timesheets.splice(index, 1);
        this.timesheets(timesheets);
    };
    TimeSheet.prototype.resetTimeSheets = function () {
        this.timesheets([]);
    };
    TimeSheet.prototype.submitTimeSheets = function () {
        this.showResult(true);
    };
    TimeSheet.prototype.result = function () {
        var newTs = ko.toJS(this.timesheets);
        ko.utils.arrayMap(newTs, function (t) {
            delete t.project;
        });
        newTs = ko.utils.arrayFilter(newTs, function (t) {
            return ko.toJS(t);
        });
        return newTs;
    };
    TimeSheet.prototype.totalHours = function () {
        var initialValue = 0;
        return this.timesheets().reduce(function (accumulator, currentValue) { return accumulator + Number(currentValue.hour()); }, initialValue);
    };
    return TimeSheet;
}());
exports.default = TimeSheet;
//# sourceMappingURL=TimeSheet.js.map