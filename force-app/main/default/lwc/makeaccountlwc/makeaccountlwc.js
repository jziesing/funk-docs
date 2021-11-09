import { LightningElement, track } from 'lwc';
import addAccount from '@salesforce/apex/funkinvoker.addAccount';

import getAccountList from '@salesforce/apex/funkinvoker.getAccountList';
// import standard toast event
import {ShowToastEvent} from 'lightning/platformShowToastEvent';


export default class Makeaccountlwc extends LightningElement {
    clickedButtonLabel;
	@track contacts;
	@track accounts;
    @track error;

	amount = 0;
	searchValue = '';


	getAccountList({}).then(result => {
			// set @track contacts variable with return contact list from server
			console.log('success');
			console.log(result);
			this.accounts = result;
		})
		.catch(error => {
			console.log('errorr');
			const event = new ShowToastEvent({
				title: 'Error',
				variant: 'error',
				message: error.body.message,
			});
			this.dispatchEvent(event);
			// reset contacts var with null
			this.accounts = null;
		});

	get options() {
		return getAccountList({}).then(result => {
				// set @track contacts variable with return contact list from server
				console.log('success');
				console.log(result);
				this.accounts = result;
				console.log(this.accounts);
				return this.accounts;
			})
			.catch(error => {
				console.log('errorr');
				const event = new ShowToastEvent({
					title: 'Error',
					variant: 'error',
					message: error.body.message,
				});
				this.dispatchEvent(event);
				// reset contacts var with null
				this.accounts = null;
				return this.accounts;
    		});
	}



	handleChange(event) {
        this.searchValue = event.detail.value;
    }



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
