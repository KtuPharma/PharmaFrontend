import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { BackendService } from '../services/backend.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private backendService: BackendService) {}

  ngOnInit() {
    this.form = this.fb.group({
      username: new FormControl(''),
      password: new FormControl(''),
    });
  }
  
  submit() {
    if (this.form.valid) {
      this.submitEM.emit(this.form.value);
      this.backendService.testEndPoint();
    }
  }

  @Output() submitEM = new EventEmitter();
}
