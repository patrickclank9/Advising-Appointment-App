import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
	root: {
		width: '100%',
		marginTop: theme.spacing.unit * 3,
		overflowX: 'auto',
	},
	table: {
		minWidth: 700,
	},
});

let id = 0;
function createData(name, calories, fat, carbs, protein) {
	id += 1;
	return { id, name, calories, fat, carbs, protein };
}

const rows = [
	createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
	createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
	createData('Eclair', 262, 16.0, 24, 6.0),
	createData('Cupcake', 305, 3.7, 67, 4.3),
	createData('Gingerbread', 356, 16.0, 49, 3.9),
];

function TableHeadElement(props){
	const { titles } = props;
	return (
		<TableHead>
			<TableRow>
				{titles.map((title, idx) =>
					idx === 0 ?
						<TableCell key={idx}>{title}</TableCell> :
						<TableCell align="right" key={idx}>{title}</TableCell>
				)}
			</TableRow>
		</TableHead>
	);
}

const TableRowElement = (props) => {
	const { row, attributes } = props;
	return (
		<TableRow key={row.id}>
			{attributes.map((attribute, idx)=>
				idx === 0 ?
					<TableCell component="th" scope="row" key={idx}>{row[attribute]}</TableCell> :
					<TableCell align="right" key={idx}>{row[attribute]}</TableCell>
			)}
		</TableRow>
	);
};

function SimpleTable(props) {
	const { classes, titles, attributes } = props;

	return (
		<Paper className={classes.root}>
			<Table className={classes.table}>
				<TableHeadElement titles={titles}/>
				<TableBody>
					{rows.map(row => (
						<TableRowElement attributes={attributes} key={row.id} row={row}/>
					))}
				</TableBody>
			</Table>
		</Paper>
	);
}

SimpleTable.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);