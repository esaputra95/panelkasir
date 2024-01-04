import { FC } from 'react'
import {  StudyGroup } from '../../../../interfaces/schedule/ClassInformationInterface'
import FullCalendar from '@fullcalendar/react';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';

type TableType = {
    dataClassInformation: StudyGroup
}

const TableClassInformation: FC<TableType> = (props) => {
    const {
        dataClassInformation
    } = props

    const businessHours = {
        startTime: '07:00',
        endTime: '21:00'
    };

    return (
        <div className="w-full">
            <FullCalendar
                plugins={[resourceTimeGridPlugin]}
                initialView="resourceTimeGridDay"
                resources={dataClassInformation.room}
                events={dataClassInformation.event}
                businessHours={businessHours}
                slotDuration="00:30:00"
                headerToolbar={{
                    left: 'prev,next',
                    center: 'title',
                    right: 'resourceTimeGridWeek,resourceTimeGridDay'
                }}
            />
        </div>
    )
}

export default TableClassInformation