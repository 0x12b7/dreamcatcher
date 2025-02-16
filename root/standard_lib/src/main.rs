use std::*;

struct Product {
    name: String,
    price: u128,
    stock: u128
}

impl Product {
    pub fn new(name: String, price: u128, stock: u128) -> Product {
        return Product {
            name: name,
            price: price,
            stock: stock
        };
    }

    pub fn is_registered(self) -> bool {
        return true;
    }
}

fn main() {
    let mut car = Product::new("Car".to_string(), 20, 700);
    if (car.is_registered()) {
        println!("CAR_IS_REGISTERED");
    }
}