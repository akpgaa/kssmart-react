


export default function Table(props) {

	var Header = props.header ? props.header : []
	var data = props.data ? props.data : []
	console.log(Header, data)
	return (
		<div>
			<table class="table table-bordered " style={{ borderColor: '#1b2433' }}>
				<thead class="thead-dark  text-light text-center" style={{ background: '#1b2433' }}>
					<tr>
						{Header && Header.map((ival) => {
							return (
								<th scope="col ">{ival.label}</th>
							)
						})}

					</tr>
				</thead>
				<tbody class="text-center">

					{data && data.map((item, i) => (
						<tr >
							{Header.map((j) => (
								<td > {(typeof j.Cell === "function") ? j.Cell(item) : item[j.key]} </td>
							))}
						</tr>
					))}

				</tbody>
			</table>

		</div>
	)
}