import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';


@Component({
  selector: 'modal-saved-changes',
  template: `
<div class="modal-body modal-success">
	<div class="row" style="text-align: center;">
		<div class="col">
			<span>
				Canvis guardats
			</span>
		</div>
	</div>
</div>
  `
})
export class ModalSavedChangesComponent {

	// title: string;
	private assignaturaSubmit: any;
	private bsModalRef: BsModalRef;

	constructor(
		public modalSavedChangesRef: BsModalRef) {
		setTimeout(() => {
			this.modalSavedChangesRef.hide();
		}, 1500);
	}
}