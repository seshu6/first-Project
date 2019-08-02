import { Component, OnInit } from '@angular/core';
import { TwoStepsVerificationService } from '../two-steps-verification.service';
import Swal from 'sweetalert2';
import { LoaderService } from '../loader.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-activation-link',
  templateUrl: './activation-link.component.html',
  styleUrls: ['./activation-link.component.css']
})
export class ActivationLinkComponent implements OnInit {
  activationEmailLink: string;
  urlSplitter: string[] = [];
  constructor(private twoStepsVerification: TwoStepsVerificationService, private route: Router, private spinner: LoaderService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.activationEmailLink = params.email;
    })
    this.userActivationLink();
  }

  userActivationLink() {
    this.urlSplitter = this.route.url.split("/");
    if (this.urlSplitter[1] == "link") {
      this.twoStepsVerification.postUserActivation(this.activationEmailLink).subscribe(success => {
        if (success['status'] == "success") {
          Swal.fire({
            title: 'Success',
            text: success['message'],
            type: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3fc3ee',
            confirmButtonText: 'Login'
          }).then(data => {
            // if(data.value){

            // }
            this.route.navigate(['login'])
          })
        } else {
          Swal.fire({
            title: 'Error',
            text: success['message'],
            type: 'error',
            showCancelButton: false,
            confirmButtonColor: '#3fc3ee',
            confirmButtonText: 'Login'
          }).then(data => {
            this.route.navigate(['login'])
          })
        }

      }, error => {
        console.log("success", error);
      })
    } else {
      this.route.navigate([this.route.url]);
    }


  }


}
