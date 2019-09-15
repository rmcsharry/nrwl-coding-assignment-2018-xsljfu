import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ticket, BackendService, User } from '../backend.service';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-ticket-form',
  templateUrl: './ticket-form.component.html',
  styleUrls: ['./ticket-form.component.scss']
})
export class TicketFormComponent implements OnInit {
  @Input() ticket: Ticket;
  @Output() onTicketSubmitted = new EventEmitter<Ticket>();
  users$: Observable<User[]>;

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private backendService: BackendService,
    private snackBar: MatSnackBar
  ) {
    this.buildForm();
  }

  ngOnInit() {
    if (this.ticket) this.form.patchValue(this.ticket);
    this.users$ = this.backendService.users();
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
    if (this.form.valid) {
      this.snackBar.open('Hot diggity, it saved!', 'x', { duration: 3000 });
      this.onTicketSubmitted.emit(formData);
    };
  }

  getErrorMessage() {
    return this.form.controls.description.hasError('required') ? 'You must enter a value' :
        this.form.controls.description.hasError('minlength') ? 'Please enter at least 3 characters' :
            '';
  }
}
