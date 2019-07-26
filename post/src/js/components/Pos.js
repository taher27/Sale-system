import React, {} from "react";
import "./App.css";
import Header from "./Header";
import io from "socket.io-client";
import axios from "axios";
import moment from "moment";
import { Modal, Button } from "react-bootstrap";
import LivePos from "./LivePos";

const HOST = "http://localhost:80";
let socket = io.connect(HOST);

class Pos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            quantity: 1,
            id: 0,
            open: true,
            close: false,
            addItemModal: false,
            checkOutModal: false,
            amountDurModal: false,
            totalPayment: 0,
            total: 0,
            changeDue: 0,
            name: "",
            price: 0
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handlePrice = this.handlePrice.bind(this);
        this.handlePayment = this.handlePayment.bind(this);
        this.handleQuantityChange = this.handleQuantityChange.bind(this);
        this.handleCheckOut = this.handleCheckOut.bind(this);
    }

    componentDidUpdate() {
        if(this.state.items.length !== 0) {
            socket.emit("update-live-cart", this.state.items);
        }
    }
    handleSubmit = e => {
        e.preventDefault();
        this.setState({ addItemModal: false });

        const currentItem = {
            id: this.state.id++,
            name: this.state.name,
            price: this.state.price,
            quantity: this.state.quantity
        };
        var items = this.state.items;
        items.push(currentItem);
        this.setState({ items: items });
    };
}