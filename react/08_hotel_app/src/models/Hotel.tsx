export default class Hotel {

	public name:string;
	public address:string;
	public city:string;
	public stars:number;
	public roomprice:number;
	public id:number;

	constructor(name:string,address:string,city:string,stars:number,roomprice:number,id:number) {
		this.name = name;
		this.address = address;
		this.city = city;
		this.stars = stars;
		this.roomprice = roomprice;
		this.id = id;
	}
}
