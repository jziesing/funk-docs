
import { LightningElement, track } from 'lwc';
import addAccount from '@salesforce/apex/funkinvoker.addAccount';

import getAccountList from '@salesforce/apex/funkinvoker.getAccountList';
// import standard toast event
import {ShowToastEvent} from 'lightning/platformShowToastEvent';


export default class Makepaymentdoc extends LightningElement {
    clickedButtonLabel;
	@track contacts;
	@track accounts;
    @track error;

	amount = 0;
	searchValue = '';
	accountsDropList = [];



	handleLoad() {
		console.log('is clicked');
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
