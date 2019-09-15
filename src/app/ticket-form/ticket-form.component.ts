import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ticket } from '../backend.service';

@Component({
  selector: 'app-ticket-form',
  templateUrl: './ticket-form.component.html',
  styleUrls: ['./ticket-form.component.scss']
})
export class TicketFormComponent implements OnInit {
  @Input() ticket: Ticket;
  @Output() onTicketSubmitted = new EventEmitter<Ticket>();

  form: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    this.buildForm();
  }

  ngOnInit() {
    if (this.ticket) this.form.patchValue(this.ticket);
  }

  buildForm() {
    this.form = this.fb.group({
      id: [''],
      description: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])],
      assigneeId: [''],
      completed: [false]
    });
  }

  onSubmit(formData: Ticket) {
    if (this.form.valid) this.onTicketSubmitted.emit(formData);
  }

  getErrorMessage() {
    return this.form.controls.description.hasError('required') ? 'You must enter a value' :
        this.form.controls.description.hasError('minlength') ? 'Please enter at least 3 characters' :
            '';
  }
}
