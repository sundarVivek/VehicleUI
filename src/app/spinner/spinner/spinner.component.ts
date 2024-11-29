import { ChangeDetectorRef, Component } from '@angular/core';
import { SpinnerService } from '../spinner.service';
import { state } from '@angular/animations';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {
  showSpinner = false;

  constructor(private _spinner: SpinnerService, private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.callSPinner();
  }

  callSPinner() {
    this._spinner.getSpinnerObservable().subscribe(
      (status) => this.showSpinner = status === 'start');
    this.cd.detectChanges();
  }
}
