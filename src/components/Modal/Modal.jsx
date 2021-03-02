import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { editProductAction } from "../../store/store";

const CustomModal = ({ type, open, onCloseHandler, id }) => {
  const dispatch = useDispatch();
	const classes = styles();
	const [name, setName] = useState("");
	const [price, setPrice] = useState("");

	const onSubmitHandler = (e) => {
		e.preventDefault();

		if (name && price) {
			type === "edit" && dispatch(editProductAction(id, name, price));

			onCloseHandler();
		}
	};

	return (
		<>
			<Modal
				className={classes.modal}
				open={open}
				onClose={onCloseHandler}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={open}>
					<Paper className={classes.paper}>
						<Typography variant="h6" component="h6" align="center">
							{type === "add" ? "Add a new product" : "Update product"}
						</Typography>
						<form onSubmit={onSubmitHandler} className={classes.form}>
							<TextField
								className={classes.input}
								fullWidth
								margin="dense"
								variant="outlined"
								size="small"
								type="text"
								id="name"
								label="Product name"
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
							<TextField
								className={classes.input}
								fullWidth
								margin="dense"
								size="small"
								variant="outlined"
								type="text"
								id="price"
								label="Product price"
								value={price}
								onChange={(e) => setPrice(e.target.value)}
							/>
							<Button
								variant="contained"
								size="large"
								color="primary"
								className={classes.button}
								type="submit"
							>
								Submit
							</Button>
						</form>
					</Paper>
				</Fade>
			</Modal>
		</>
	);
};

const styles = makeStyles(() => ({
	modal: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	paper: {
		height: "45vh",
		width: "30vw",
		padding: "2rem 4rem",
	},
	form: {
		width: "100%",
		marginTop: "1rem",
	},
	button: {
		width: "100%",
		marginTop: "1rem",
		height: "50px",
	},
}));

export default CustomModal;
