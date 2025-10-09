import React from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  IconButton,
  Divider,
} from "@mui/material";
import { Delete } from "@mui/icons-material";

const Cart = ({ cart, setCart }) => {
  // Remove single item by index
  const handleRemoveItem = (indexToRemove) => {
    setCart((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  // Empty the cart
  const handleEmptyCart = () => setCart([]);

  // Total price calculation
  const totalPrice = cart.reduce((acc, item) => {
    const priceNumber = Number(item.price.replace("$", ""));
    return acc + priceNumber;
  }, 0);

  return (
    <Box sx={{ p: 4, display: "flex", gap: 4, flexWrap: "wrap" }}>
      {/* Cart Items */}
      <Box sx={{ flex: 2, minWidth: 300, display: "flex", flexDirection: "column", gap: 3 }}>
        <Typography variant="h5" gutterBottom>
          Your Cart
        </Typography>
        {cart.length === 0 ? (
          <Typography variant="body1">Your cart is empty.</Typography>
        ) : (
          cart.map((item, index) => (
            <Card
              key={index}
              sx={{
                display: "flex",
                p: 2,
                gap: 2,
                alignItems: "center",
                backgroundColor: "#f5f5f5",
              }}
            >
              <CardMedia
                component="img"
                image={item.img}
                alt={item.title}
                sx={{ width: 120, height: 120, borderRadius: 1, objectFit: "cover" }}
              />
              <CardContent sx={{ flex: 1 }}>
                <Typography variant="h6">{item.title}</Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {item.price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Quantity: 1
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton
                  color="error"
                  onClick={() => handleRemoveItem(index)}
                >
                  <Delete />
                </IconButton>
              </CardActions>
            </Card>
          ))
        )}
      </Box>

      {/* Summary */}
      <Box
        sx={{
          flex: 1,
          minWidth: 250,
          p: 3,
          border: "1px solid #e0e0e0",
          borderRadius: 2,
          height: "fit-content",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Order Summary
        </Typography>
        <Divider sx={{ my: 1 }} />
        <Typography variant="body1">Items: {cart.length}</Typography>
        <Typography variant="h6">Total: ${totalPrice.toFixed(2)}</Typography>
        <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Proceed to Checkout
        </Button>
        <Button
          variant="outlined"
          color="error"
          fullWidth
          sx={{ mt: 1 }}
          onClick={handleEmptyCart}
        >
          Empty Cart
        </Button>
      </Box>
    </Box>
  );
};

export default Cart;
