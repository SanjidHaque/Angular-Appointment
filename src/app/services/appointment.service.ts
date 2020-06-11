import { Injectable } from '@angular/core';

import {TimeSlot} from '../models/time-slot.model';
import {Appointment} from '../models/appointment.model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  appointments: Appointment[] = [];
  timeSlots: TimeSlot[] = [
   new TimeSlot('4:00 - 5:00'),
   new TimeSlot('5:00 - 6:00'),
   new TimeSlot('6:00 - 7:00')
  ];

  getAllTimeSlots() {
    return this.timeSlots.slice();
  }

  getAllAppointments() {
    return this.appointments.slice();
  }
}
