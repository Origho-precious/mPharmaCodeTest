import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import StyledTableRow from "./components/TableRow/TableRow";
import TableCol from "./components/TableCol/TableCol";
import { getProducts } from "./store/store";
import { Typography } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const App = () => {
	const dispatch = useDispatch();
	const { products } = useSelector((state) => state.app);
	const classes = styles();

	useEffect(() => {
		dispatch(getProducts());
	}, [dispatch]);

	const getLatestPrice = (date1, date2) => {
		const t1 = new Date(date1).getTime();
		const t2 = new Date(date2).getTime();

		const currentTime = new Date().getTime();

		const result = currentTime - t1 > currentTime - t2;

		return result !== true ? 0 : 1;
	};

	getLatestPrice("2019-01-01T17:16:32+00:00", "2018-11-01T17:16:32+00:00");

	return (
		<Container className={classes.root} maxWidth="lg">
			<Typography variant="h1" component="h1" className={classes.heading}>
				mPharma Products
			</Typography>
			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							<TableCol>#</TableCol>
							<TableCol>Product Name(s)</TableCol>
							<TableCol>Price(s)</TableCol>
							<TableCol>Delete</TableCol>
							<TableCol>Edit</TableCol>
						</TableRow>
					</TableHead>
					<TableBody>
						{products?.length ? (
							products.map(({ id, name, prices }, index) => (
								<StyledTableRow key={id}>
									<TableCol component="th" scope="row">
										{index + 1}
									</TableCol>
									<TableCol>{name}</TableCol>
									<TableCol>
										{
											prices[getLatestPrice(prices[0].date, prices[1].date)]
												?.price
										}
									</TableCol>
									<TableCol>
										<DeleteIcon className={classes.icon} />
									</TableCol>
									<TableCol>
										<EditIcon className={classes.icon} />
									</TableCol>
								</StyledTableRow>
							))
						) : (
							<Typography
								className={classes.noData}
								variant="h5"
								component="h5"
								align="center"
								paraghraph
							>
								No Data!
							</Typography>
						)}
					</TableBody>
				</Table>
			</TableContainer>
		</Container>
	);
};

const styles = makeStyles({
	root: {
		width: "50vw",
		margin: "2rem auto 0",
		position: "relative",
	},
	heading: {
		fontSize: "2rem",
		fontWeight: "500",
		marginBottom: "1.5rem",
		textAlign: "center",
	},
	icon: {
		cursor: "pointer",
	},
	noData: {
		position: "absolute",
		left: "50%",
		transform: "translate(-50%, 50%)",
		width: "40%",
	},
});

export default App;
