import Contact from '../models/Contact';

interface Props {
	list:Contact[];
	removeContact(id:number):void;
}

const ContactList = (props:Props) => {

	const contactJSX = props.list.map((contact) => {
		return (
			<tr key={contact.id}>
				<td>{contact.firstname}</td>
				<td>{contact.lastname}</td>
				<td>{contact.email}</td>
				<td>{contact.phone}</td>
				<td><button onClick={() => props.removeContact(contact.id)} style={{backgroundColor:"red"}}>Remove</button></td>
			</tr>
		)
	})
	return(
		<table>
			<thead>
				<tr>
					<th>First Name</th>
					<th>Last Name</th>
					<th>Email</th>
					<th>Phone</th>
					<th>Remove</th>
				</tr>
			</thead>
			<tbody>
			{contactJSX}
			</tbody>
		</table>
	)
}

export default ContactList;