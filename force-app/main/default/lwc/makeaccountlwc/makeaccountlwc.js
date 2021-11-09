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
	accountsDropList = [];


	get options() {
		return getAccountList({}).then(result => {
				// set @track contacts variable with return contact list from server
				console.log('raww');
				console.log(result);
				this.accounts = JSON.parse(result);
				console.log('success');
				console.log(this.accounts);
				for(let i=0; i<this.accounts.length; i++) {
					this.accountsDropList.push({ label: this.accounts[i].name, value: this.accounts[i].id});
				}
				console.log(this.accountsDropList);

				return this.accountsDropList;
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
