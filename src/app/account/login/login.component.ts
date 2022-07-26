import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgControlStatusGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  returnUrl:string;

  constructor(private location:Location,private formBuilder: FormBuilder, private accountService:AccountService , private router:Router,private activatedRoute:ActivatedRoute,private toast:ToastrService) {}

  ngOnInit(): void {
    this.returnUrl=this.activatedRoute.snapshot.queryParams['returnUrl'] || '/shop';
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators
        .pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]],
      password: ['', [Validators.required, Validators
        .pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$')]],
      rememberMe: new FormControl<Boolean | null>(null)
    });


  }


 

  onSubmit() {
    let values = this.loginForm.value
    localStorage.setItem('rem', this.loginForm.get('rememberMe').value);
    this.accountService.login(this.loginForm.value).subscribe({
      next: () => {
      // this.location.back();
        this.router.navigateByUrl(this.returnUrl);
      } ,
      error: (error) => console.log(error)
    })
  }


}


