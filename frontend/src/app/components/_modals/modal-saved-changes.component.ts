import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';


@Component({
  selector: 'modal-saved-changes',
  template: `
<div class="modal-body modal-success">
	<div class="row" style="text-align: center;">
		<div class="col">
			<div class="clearfix">
				<span>
					Canvis guardats
				</span>
			</div>
		</div>
	</div>
</div>
  `,
  styles: [`
	.modal-success {
		background-clip: padding-box;
		border: 1px solid rgba(0,0,0,.2);
		border-radius: .3rem;
		outline: 0;
		background-color: #d4edda;
		color: #155724;
		border-color: #c3e6cb;
	}
  `]
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