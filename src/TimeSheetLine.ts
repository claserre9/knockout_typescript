import * as ko from "knockout";
export default class TimeSheetLine{

    public project = ko.observableArray(["Project 1", "Project 2", "Project 3", "Project 4", "Project 5"])
    public hour = ko.observable(0)

    public chosenProject = ko.observable()


    public handleDragStart (data: any, event: any) {
        event.dataTransfer.setData("text/plain", event.target.id)
        event.dropEffect = "move";
        return true
    }

    public handleDragOver = function (data: any, event: any) {
    }

    public handleDrop = function (data: any, event: any) {
        event.preventDefault()
        const draggedElement = document.querySelector(`#${event.dataTransfer.getData("text/plain")}`)
        const context = ko.contextFor(event.target)
        const draggedElementData = ko.dataFor(draggedElement)
        const dropZoneElementData = ko.dataFor(event.target)

        const timesheets = context.$parent.timesheets()
        const draggedElementPosition = ko.utils.arrayIndexOf(timesheets, draggedElementData)
        const dropZoneElementPosition = ko.utils.arrayIndexOf(timesheets, dropZoneElementData)

        timesheets.splice(dropZoneElementPosition, 0, timesheets.splice(draggedElementPosition, 1)[0]);

        context.$parent.timesheets(timesheets)

        return false
    }
}
