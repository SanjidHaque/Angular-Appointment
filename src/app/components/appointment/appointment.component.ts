import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import * as moment from 'moment';
import {TimeSlot} from '../../models/time-slot.model';
import {Appointment} from '../../models/appointment.model';
import {AppointmentService} from '../../services/appointment.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
  addNewAppointmentForm: FormGroup;
  minDate: Date;

  timeSlots: TimeSlot[] = [];
  appointments: Appointment[] = [];

  constructor(private appointmentService: AppointmentService) { }

  ngOnInit() {
    this.timeSlots = this.appointmentService.getAllTimeSlots();
    this.appointments = this.appointmentService.getAllAppointments();
    this.minDate = new Date();

    this.addNewAppointmentForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      age: new FormControl('', [Validators.required, Validators.min(1)]),
      date: new FormControl(),
      timeSlot: new FormControl('', Validators.required),
    });
  }


  filterFreeTimeSlots() {
    this.timeSlots = this.appointmentService.getAllTimeSlots();
    let date = this.addNewAppointmentForm.controls['date'].value.toLocaleString();
    date = date.split(',')[0];

    const appointments = this.appointments.filter(x => x.Date === date);
    if (appointments !== undefined) {

      appointments.forEach( appointment => {
        if (appointment.TimeSlot === '4:00 - 5:00') {
          this.timeSlots = this.timeSlots.filter(x => x.Time !== '4:00 - 5:00');
        }
        if (appointment.TimeSlot === '5:00 - 6:00') {
          this.timeSlots = this.timeSlots.filter(x => x.Time !== '5:00 - 6:00');
        }
        if (appointment.TimeSlot === '6:00 - 7:00') {
          this.timeSlots = this.timeSlots.filter(x => x.Time !== '6:00 - 7:00');
        }
      });
    }

  }

  addNewAppointment() {
    let date = this.addNewAppointmentForm.controls['date'].value.toLocaleString();
    date = date.split(',')[0];

    const appointment = new Appointment(
      this.addNewAppointmentForm.controls['firstName'].value,
      this.addNewAppointmentForm.controls['lastName'].value,
      this.addNewAppointmentForm.controls['email'].value,
      this.addNewAppointmentForm.controls['phoneNumber'].value,
      this.addNewAppointmentForm.controls['address'].value,
      this.addNewAppointmentForm.controls['age'].value,
      date,
      this.addNewAppointmentForm.controls['timeSlot'].value
    );

    this.appointments.push(appointment);
    this.appointmentService.appointments.push(appointment);
    this.timeSlots = this.appointmentService.getAllTimeSlots();
    this.reset();
  }

  reset() {
    this.addNewAppointmentForm.reset();
    this.addNewAppointmentForm.markAsPristine();
    this.addNewAppointmentForm.markAsUntouched();
  }
}
