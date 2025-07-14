export default class Hotel {

	public hname:string;
	public address:string;
	public city:string;
	public stars:number;
	public roomprice:number;
	public id:number;

	constructor(hname:string,address:string,city:string,stars:number,roomprice:number,id:number) {
		this.hname = hname;
		this.address = address;
		this.city = city;
		this.stars = stars;
		this.roomprice = roomprice;
		this.id = id;
	}
}
