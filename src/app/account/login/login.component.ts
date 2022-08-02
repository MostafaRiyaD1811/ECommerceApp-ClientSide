import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgControlStatusGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private accountService:AccountService , private router:Router) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators
        .pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]],
      password: ['', [Validators.required, Validators
        .pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$')]],
      rememberMe: new FormControl<Boolean | null>(null)
    });


  }
  onSubmit() {

    this.accountService.login(this.loginForm.value).subscribe({
      next: () => {
        console.log('Login successeded!!');
        this.router.navigate(['/shop']);
      } ,
      error: (error) => console.log(error),
    })
  }

}
