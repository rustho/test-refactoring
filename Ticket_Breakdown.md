# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

Ticket 1: Update Agent table to include customID for Facilities
    Implementation details: 
        CustomId will be uniq string field
    Acceptance Criteria: 
        Object from db contains customId
        we can update, remove, create this field
        other services can use this field;

Ticket 2: Update getShiftsByFacility function include Agent customID
    Implementation details: 
        Function getShiftsByFacility return metadata which contains customId
    Acceptance Criteria: 
        function getShiftsByFacility work as in past
        function getShiftsByFacility also return in Agent metadata customId from object Agent


Ticket 3: Update generateReport function to use Agent custom IDs
    Implementation details: 
        Function generateReport return in report customId instead db Id
    Acceptance Criteria: 
        function generateReport work as in past
        function generateReport also return in ID - customId from Agent

Also Ticket 4: Facility UI for managing Agent custom IDs
    Implementation details: 
        Need update or create UI for managing Agent custom ID
    Acceptance Criteria: 
        Manager can create, update, edit Agent customId
        We have validation for this field
        Agent changed after requests to BE
