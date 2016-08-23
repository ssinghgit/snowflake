var exports = {};
 
export const EmployeeSearchText = "Employee Search";
 
export const views = {
            employeeSearchView : "EmployeeSearchView",
            calendarView : "CalendarView"
};
 
export const DB = {
                  PREFIX:null,
			dataconn:null,
            databaseName : "mbkDB99.db",
            databaseLocation : "../db/mbkDB.db"
};
 
export const SQL = {
            checkEmployeeTableExists : 'SELECT count(*) as counter FROM sqlite_master WHERE type="table" AND name="Employees"',
            createEmployeeTable : 'CREATE TABLE IF NOT EXISTS Employees( en VARCHAR(10) PRIMARY KEY NOT NULL, fn VARCHAR(100), ln VARCHAR(100), og VARCHAR(100), tt VARCHAR(50),lg VARCHAR(20), em VARCHAR(120), ts INTEGER ); ',
            dropEmployeeTable : 'DROP TABLE IF EXISTS Employees;',
            selectMaxTimestamp : 'SELECT max(ts) as mts,count(*) as counter FROM Employees',
            deleteAll:'delete from Employees'
};
 
//module.exports = Object.freeze(exports);
 