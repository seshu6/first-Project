import { Component, OnInit } from '@angular/core';
import $ from 'jquery';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ViewChild, ElementRef } from '@angular/core';
import { CommonService } from '../common.service';
import { LoaderService } from '../loader.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-privacy-and-policies',
  templateUrl: './privacy-and-policies.component.html',
  styleUrls: ['./privacy-and-policies.component.css']
})
export class PrivacyAndPoliciesComponent implements OnInit {
  showOrHideLegalAndPolicies:boolean = true;
  contactUsForm: FormGroup;
@ViewChild('contactUsModal') contactUsModal: ElementRef;
  constructor(private formBuilder:FormBuilder,private commonService: CommonService,private spinner: LoaderService) { }

  ngOnInit() {
    $("html body").animate({scrollTop:0}); 
    this.contactUsForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
      url: ['', Validators.required],
      description: ['', Validators.required],
      termsAndConditions: ['', Validators.required]
    })
  }

  closeContactUsModal() {
    this.contactUsModal.nativeElement.click();
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
