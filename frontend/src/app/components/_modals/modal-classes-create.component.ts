import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';


@Component({
  selector: 'modal-classes-create',
  template: `
<div class="modal-body modal-danger">
	<div class="row" style="text-align: center;">
		<div class="col">
			<div class="clearfix">
				<span>
					No s'ha seleccionat cap alumne
				</span>
			</div>
		</div>
	</div>
</div>
  `,
  styles: [`
	.modal-danger {
		background-clip: padding-box;
		border: 1px solid rgba(0,0,0,.2);
		border-radius: .3rem;
		outline: 0;
		background-color: #f8d7da;
		color: #721C25;
		border-color: #F4C6CB;
	}
  `]
})
export class ModalClassesCreateComponent {

	constructor(
		public modalClassesCreatesRef: BsModalRef) {
		setTimeout(() => {
			this.modalClassesCreatesRef.hide();
		}, 1500);
	}
}