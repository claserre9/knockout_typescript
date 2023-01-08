import * as ko from "knockout";
import TimeSheetLine from "./TimeSheetLine";
import axios from "axios";
import {flattenData} from "./Utils";


export default class TimeSheet {
    public id = ko.observable()
    public timesheets = ko.observableArray([])

    public showResult = ko.observable(false)

    constructor() {
        this.init()
    }
    init() {
        axios.get("http://localhost:8123/timesheets")
            .then((timesheets) => {
                for (const timesheet of timesheets.data) {
                    this.timesheets.push(
                        (new TimeSheetLine())
                            .id(timesheet.id)
                            .hour(timesheet.hour)
                            .chosenProject(timesheet.chosenProject)
                    )
                }
            })
    }


    public addTimeSheetLine() {
        this.timesheets.push(new TimeSheetLine())
    }

    public removeTimeSheetLine(data, index) {
        let timesheets = this.timesheets()
        console.log(data.id())
        axios.get(`/timesheets/${data.id()}`)
            .then((r)=>{
                axios.delete(`/timesheets/${r.data.id}`, data).then(r => console.log(r.data))
            })
            .catch(console.log)
        // axios.delete(`/timesheets/${data.id()}`).then(r => console.log(r.data))
        timesheets.splice(index, 1)
        this.timesheets(timesheets)
    }

    public resetTimeSheets() {

        for (const timesheetLine of this.timesheets()) {
            axios.delete(`/timesheets/${timesheetLine.id()}`).then(r => console.log(r.data))
        }
        this.timesheets([])

    }

    public submitTimeSheets(formElement) {
        // this.resetTimeSheets()
        const results = flattenData(this.result())
        for (const data of results) {

            axios.get(`/timesheets/${data.id}`)
                .then((r)=>{
                axios.put(`/timesheets/${r.data.id}`, data).then(r => console.log(r.data))
            }).catch(() =>{
                axios.post("/timesheets", data).then(r => console.log(r.data))
            })

        }

        this.showResult(true)

    }

    public result() {
        let newTs = ko.toJS(this.timesheets)

        ko.utils.arrayMap(newTs, function (t: any) {
            delete t.project
        })

        return newTs

    }

    public totalHours() {
        const initialValue = 0;
        return this.timesheets().reduce(
            (accumulator: number, currentValue: { hour: () => any }) => accumulator + Number(currentValue.hour()),
            initialValue
        )
    }
}
