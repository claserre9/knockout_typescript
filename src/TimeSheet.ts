import * as ko from "knockout";
import TimeSheetLine from "./TimeSheetLine";

export default class TimeSheet {
    public timesheets = ko.observableArray([])

    public showResult = ko.observable(false)

    public addTimeSheetLine() {
        this.timesheets.push(new TimeSheetLine())
    }

    public removeTimeSheetLine(index){
        let timesheets = this.timesheets()
        timesheets.splice(index, 1)
        this.timesheets(timesheets)
    }

    public resetTimeSheets() {
        this.timesheets([])
    }

    public submitTimeSheets() {
        this.showResult(true)

    }

    public result (){
        let newTs = ko.toJS(this.timesheets)
        ko.utils.arrayMap(newTs, function (t: any ) {
            delete t.project
        })

        newTs = ko.utils.arrayFilter(newTs, function (t: any) {
            return ko.toJS(t)
        })

        return newTs

    }

    public totalHours() {
        const initialValue = 0;
        return this.timesheets().reduce(
            (accumulator: number, currentValue: { hour: () => any }) => accumulator + Number(currentValue.hour()) ,
            initialValue
        )
    }
}
