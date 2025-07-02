export default class Contact {

	public firstname:string;
	public lastname:string;
	public email:string;
	public phone:string;
	public id:number;
	
	constructor(firstname:string,lastname:string,email:string,phone:string,id:number) {
		this.firstname = firstname;
		this.lastname = lastname;
		this.email = email;
		this.phone = phone;
		this.id = id;
	}
}