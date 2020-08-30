import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Item} from '../../Models/item';
import{StepItemService} from '../../services/step-item.service';
import { from } from 'rxjs';
@Component({
  selector: 'app-step-item',
  templateUrl: './step-item.component.html',
  styleUrls: ['./step-item.component.scss']
})
export class StepItemComponent implements OnInit {
  public steps = [];
  public itemList:Item[] = [];
  public itemobj:Item = null;
  public currentStep:number = 0;
  public currentItem:number;
  public saveButton:string = 'Save';
  itemForm: FormGroup;
  submitted: boolean;
  constructor(private _stepItemService: StepItemService,private _formBuilder: FormBuilder, private _item: Item) { }

  ngOnInit(): void {
    this.itemForm = this._formBuilder.group(
      {
        Title:['',[Validators.required,Validators.pattern('^[a-zA-Z0-9 ]{2,50}$')]],
        Description:['',[Validators.required,Validators.pattern('^[a-zA-Z0-9 ]{2,100}$')]]
      }
    );

    this._stepItemService.getSteps()
        .subscribe(
          data =>
          {
            this.steps =[];
            data.forEach((element)=> 
            {
              this.steps.push(element.stepId);
            });
            this.currentStep = Math.min(...this.steps);
            this.getItems(this.currentStep);
          } 
        );
  }

clearItem()
{
  this.currentItem = 0;
  this.itemForm.controls['Title'].patchValue('');
  this.itemForm.controls['Description'].patchValue('');
  this.saveButton ="Save";
}
selectItem(itemId:number)
{
  this.currentItem = itemId;
  this._stepItemService.getItem(itemId).subscribe(
    data=>{
            this.itemobj = data;
            //set form
            this.itemForm.controls['Title'].patchValue(this.itemobj.title);
            this.itemForm.controls['Description'].patchValue(this.itemobj.description);
            this.saveButton ="Update";
         }
 ); 
}

getItems(stepId:number)
  {
    this._stepItemService.getItems(stepId).subscribe(
       data=>{
               this.itemList = data;
               this.clearItem();
            }
    );
  }

saveItem(data: Item): void
{
    this._stepItemService.saveItem(data).subscribe(
      data=>{
             if(data == true)
             {
                alert("Item saved successfully");
                this.getItems(this.currentStep);
             }
      }
    )
}
removeItem(itemId:number)
{
  this._stepItemService.removeItem(itemId).subscribe(
    data=>{
      if(data == true)
      {
        alert("Item removed successfully");
        this.getItems(this.currentStep);
      }
    }
  )
}

findStep(value)
{
    let _currentIndex = this.steps.indexOf(this.currentStep);
    let _currentStep; 
    if(value === 1)
    {
      _currentStep = this.steps[_currentIndex + 1];
    }
    else if(value === 0)
    {
      _currentStep = this.steps[_currentIndex - 1];
    }
    this.selectStep(_currentStep);
}

selectStep(id:number)
{
   this.currentStep = id;
   this.getItems(this.currentStep); 
}
saveStep()
{
  this._stepItemService.saveStep().subscribe(
    data =>
          {
            this.steps =[];
            data.forEach((element)=> 
            {
              this.steps.push(element.stepId);
            });
            this.currentStep = Math.max(...this.steps);
          },
          error => {
          },
          () => {
            this.getItems(this.currentStep);
         }
  );
}

removeStep(id:number)
{
  this._stepItemService.removeStep(id).subscribe(
    data =>
          {
            this.steps =[];
            data.forEach((element)=> 
            {
              this.steps.push(element.stepId);
            });
            this.currentStep = Math.min(...this.steps);
            this.getItems(this.currentStep);
          } 
  );
}


onSubmit(): void {
  if (this.itemForm.valid) {
        this._item.title = this.itemForm.value.Title;
        this._item.description = this.itemForm.value.Description;
        this._item.stepId = this.currentStep;
        if(this.currentItem > 0)this._item.itemId = this.currentItem 
        this.saveItem(this._item);
        this.itemForm.reset();
  }
  else{
    alert('form is not valid');
  }
}

}
