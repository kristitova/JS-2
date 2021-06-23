const express = require("express");
const bodyParser = require('body-parser');
const fs = require("fs");
var cors = require('cors')

const app = express();

app.use(bodyParser.json({ extended: true }));
app.use(express.static("."));
app.use(cors())

app.listen(3000, () => {
    console.log("server is running at port 3000!!");
});

app.get('/cartData', (req, res) => {
    fs.readFile('cart.json', 'utf-8', (err, data) => {
        res.send(data)
    })
})

app.get("/catalogData", (req, res) => {
    fs.readFile("catalogData.json", "utf-8", (err, data) => {
        res.send(data);
    });
});

app.post("/addToCart", (req, res) => {
    fs.readFile("cart.json", "utf-8", (err, data) => {
        if (err) {
            res.send('{"result": 0}');
        } else {
            const cart = JSON.parse(data);
            const item = req.body;
            item.quantity = 1;

            if (cart.length == 0) {
                cart.push(item);
            } else {
                cart.forEach((el) => {
                    if (el.id_product == item.id_product) {
                        el.quantity += 1;
                    } else {
                        cart.push(item);
                    }
                });
            }

            if (
                cart.filter(function (value) {
                    return value.id_product === item.id_product;
                }).length > 1) {
                cart.pop();
            }


            fs.writeFile("cart.json", JSON.stringify(cart), (err) => {
                if (err) {
                    res.send('{"result": 0}');
                } else {
                    res.send('{"result": 1}');
                }
            });
        }
    });
});
app.post("/deletefromcart", (req, res) => {
    fs.readFile("cart.json", "utf-8", (err, data) => {
        if (err) {
            res.send('{"result": 0}');
        } else {
            const cart = JSON.parse(data);
            const item = req.body;

            for (let i = 0; i <= cart.length - 1; i++) {
                if (cart[i].quantity == 1 && cart[i].id_product == item.id_product) {
                    let itemind = 0;
                    itemind = cart.indexOf(cart[i]);
                    cart.splice(itemind, 1);
                } else if (cart[i].quantity > 1 && cart[i].id_product == item.id_product) {
                    cart[i].quantity -= 1;
                }
            }


            fs.writeFile("cart.json", JSON.stringify(cart), (err) => {
                if (err) {
                    res.send('{"result": 0}');
                } else {
                    res.send('{"result": 1}');
                }
            });
        }
    });
});
