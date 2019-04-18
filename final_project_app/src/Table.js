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
	const { classes, titles, attributes, rows } = props;
	let id = 0;
	return (
		<Paper className={classes.root}>
			<Table className={classes.table}>
				<TableHeadElement titles={titles}/>
				<TableBody>
					{rows.map(row => (
						<TableRowElement attributes={attributes} key={id++} row={row}/>
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