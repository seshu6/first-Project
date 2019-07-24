import { Component, OnInit } from '@angular/core';
import { TwoStepsVerificationService } from '../two-steps-verification.service';
import Swal from 'sweetalert2';
import { LoaderService } from '../loader.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private twoStepsVerification: TwoStepsVerificationService, private route: Router, private spinner: LoaderService) { }

  ngOnInit() {
  }


  checkPassword() {

  }
}
