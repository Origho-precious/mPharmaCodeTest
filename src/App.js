import { useState, useEffect } from "react";
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
import {
	getProducts,
	fetchInitialProducts,
	deleteProductAction,
} from "./store/store";
import { Typography } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Modal from "./components/Modal/Modal";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import moment from "moment";

const App = () => {
	const dispatch = useDispatch();
	const { products } = useSelector((state) => state.app);
	const classes = styles();
	const [modalType, setModalType] = useState("");
	const [showModal, setShowModal] = useState(false);
	const [editId, setEditId] = useState("");

	useEffect(() => {
		dispatch(fetchInitialProducts);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		dispatch(getProducts());
	}, [dispatch]);

	const getDate = (timeStamp) => moment(timeStamp).format("MMM, DD, YYYY");

	const getLatestPrice = (prices) => {
		const timeStamps = prices.map((price) => {
			return new Date(price.date).getTime();
		});

		let latestDate = Math.max(...timeStamps);

		for (let i = 0; i < timeStamps.length; i++) {
			const stamp = new Date(prices[i].date).getTime();

			if (stamp === latestDate) {
				return `#${prices[i].price}  (${getDate(prices[i].date)})`;
			}
		}
	};

	const getOldPrices = (prices) => {
		let oldPrices = [];

		const timeStamps = prices.map((price) => {
			return new Date(price.date).getTime();
		});

		let latestDate = Math.max(...timeStamps);

		for (let i = 0; i < timeStamps.length; i++) {
			const stamp = new Date(prices[i].date).getTime();

			stamp !== latestDate &&
				oldPrices.push({
					price: prices[i].price,
					date: prices[i].date,
				});
		}

		return oldPrices;
	};

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
							<TableCol>Latest Price(s)</TableCol>
							<TableCol>Old Prices</TableCol>
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
									<TableCol>{getLatestPrice(prices)}</TableCol>
									<TableCol>
										{getOldPrices(prices).length
											? getOldPrices(prices).map((price, id) => (
													<p key={id}>
														#{price.price} &nbsp; ({getDate(price.date)})
													</p>
											  ))
											: "nil"}
									</TableCol>
									<TableCol>
										<IconButton
											onClick={() => dispatch(deleteProductAction(id))}
										>
											<DeleteIcon className={classes.icon} />
										</IconButton>
									</TableCol>
									<TableCol>
										<IconButton
											onClick={() => {
												setEditId(id);
												setModalType("edit");
												setShowModal(true);
											}}
										>
											<EditIcon className={classes.icon} />
										</IconButton>
									</TableCol>
								</StyledTableRow>
							))
						) : (
							<TableBody align="center" className={classes.noData}>
								No Data!
							</TableBody>
						)}
					</TableBody>
				</Table>
			</TableContainer>
			<Button
				variant="contained"
				size="large"
				color="primary"
				className={classes.button}
				onClick={() => {
					setEditId("");
					setModalType("add");
					setShowModal(true);
				}}
			>
				Add
			</Button>
			<Modal
				onCloseHandler={() => setShowModal(false)}
				type={modalType}
				open={showModal}
				id={editId}
			/>
		</Container>
	);
};

const styles = makeStyles({
	root: {
		width: "90vw",
		minWidth: '800px',
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
	button: {
		width: "120px",
		backgroundColor: "#335D7E",
		color: "#FFF",
		marginTop: "1rem",

		"&hover": {
			backgroundColor: "#335D7E",
		},
	},
});

export default App;
