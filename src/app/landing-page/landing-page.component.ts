import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as $ from 'jquery';
import Swal from 'sweetalert2';
import { CommonService } from '../common.service';
import { LoaderService } from '../loader.service';
import { ViewChild, ElementRef } from '@angular/core';




@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  requestApiForm: FormGroup; 
  contactUsForm: FormGroup;
  @ViewChild('closeRequestApiModal') closeRequestApiModal: ElementRef;
  @ViewChild('contactUsModal') contactUsModal: ElementRef;
  constructor(private commonService: CommonService, private spinner: LoaderService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.requestApiForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
      url: ['', Validators.required],
      description: ['', Validators.required],
      termsAndConditions: ['', Validators.required]
    })


    this.contactUsForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
      url: ['', Validators.required],
      description: ['', Validators.required],
      termsAndConditions: ['', Validators.required]
    })

  }

  closeModal() {
    this.closeRequestApiModal.nativeElement.click();
  }

  closeContactUsModal() {
    this.contactUsModal.nativeElement.click();
  }

  onSubmitRequestApi() {
    if (this.requestApiForm.invalid) {
      Swal.fire("Info", "Please check your data", "info");
    } else {
      this.spinner.showOrHide(true);
      this.commonService.postRequestApi(this.requestApiForm.value).subscribe(success => {
        this.spinner.showOrHide(false);
        if (success['status'] == "success") {
          Swal.fire("Success", success['message'], "success");
          this.requestApiForm.reset();
          this.closeRequestApiModal.nativeElement.click();
        } else if (success['status'] == "failure") {
          Swal.fire("Failure", success['message'], "error");
        }

      }, error => {
        this.spinner.showOrHide(false);
        if (error.error.error == "invalid_token") {
          Swal.fire("Info", "Session Expired", "info"); 
        }
      })
    }

  }


  onSubmitContactUsDetails() {
    if (this.contactUsForm.invalid) {
      Swal.fire("Info", "Please check your data", "info");
    } else {
      this.spinner.showOrHide(true);
      this.commonService.postContactUsApi(this.contactUsForm.value).subscribe(success => {
        this.spinner.showOrHide(false);
        if (success['status'] == "success") {
          Swal.fire("Success", success['message'], "success");
          this.contactUsForm.reset();
          this.contactUsModal.nativeElement.click();
        } else if (success['status'] == "failure") {
          Swal.fire("Failure", success['message'], "error");
        }

      }, error => {
        this.spinner.showOrHide(false);
        if (error.error.error == "invalid_token") {
          Swal.fire("Info", "Session Expired", "info");
        }
      })
    }
  }

}

