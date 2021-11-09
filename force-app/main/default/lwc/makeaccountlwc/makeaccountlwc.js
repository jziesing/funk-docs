import { LightningElement } from 'lwc';
import addAccount from '@salesforce/apex/funkinvoker.addAccount';

export default class Makeaccountlwc extends LightningElement {
    clickedButtonLabel;
	@track contacts;
	@track accounts;
    @track error;

	amount = 0;

    handleAmountChange(e) {
        this.amount = e.detail.value;
    }


	handleLoad() {
		console.log('is clicked');
		for(var i=0; i<this.amount; i++) {
			addAccount()
				.then(result => {
					console.log(result);
					this.contacts = result;
				})
				.catch(error => {
					console.log(error);
					this.error = error;
				});
		}
	}

}
