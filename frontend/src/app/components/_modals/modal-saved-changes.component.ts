import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';


@Component({
  selector: 'modal-saved-changes',
  template: `
<div class="modal-body">
	<div class="row">
		<div class="col-12">
			<span>
				<strong>
					Canvis guardats
				</strong>
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