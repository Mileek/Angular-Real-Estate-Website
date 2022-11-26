import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {
@ViewChild('Form') addProprtyForm: NgForm; //wykorzystuje się żeby nie trzeba było przekazywać Form jako parametr akcji, np w onSubmit(Form: NgForm)
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  onBack(){
    this.router.navigate(['/']);
  }
  onSubmit(){
    console.log("Udało się zapisać formę !");
    console.log(this.addProprtyForm);
  }

}