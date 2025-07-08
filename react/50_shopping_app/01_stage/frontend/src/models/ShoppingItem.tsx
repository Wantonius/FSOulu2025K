export default class ShoppingItem {

	public type:string;
	public count:number;
	public price:number;
	public id:string;
	
	constructor(type:string,count:number,price:number,id:string) {
		this.type = type;
		this.count = count;
		this.price = price;
		this.id = id;
	}
}